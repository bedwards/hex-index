---
title: "Choosing a GGUF Model: K-Quants, I-Quants, and Legacy Formats"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-13T15:16:25.000Z"
source_url: "https://kaitchup.substack.com/p/choosing-a-gguf-model-k-quants-i"
word_count: 1957
estimated_read_time: 10
---

[

![](https://substackcdn.com/image/fetch/$s_!qOzK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f13b070-d357-4b3a-beb2-f02fa6c3c714_1024x1024.png)



](https://substackcdn.com/image/fetch/$s_!qOzK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f13b070-d357-4b3a-beb2-f02fa6c3c714_1024x1024.png)
*Image generated with ChatGPT*

For local LLM inference, the GGUF format, introduced by llama.cpp and popularized by frontends like Ollama, is by far the most common choice.

Each major LLM release is quickly followed by a wave of community GGUF conversions on the Hugging Face Hub. Prominent curators include [Unsloth](https://huggingface.co/unsloth) and [Bartowski](https://huggingface.co/bartowski) (also: [TheBloke](https://huggingface.co/TheBloke) remains widely used), among many others. Repos often provide dozens of variants per model tuned for different memory/quality trade-offs.

For instance, Unsloth released 25 GGUF versions of Qwen3 8B and 26 versions for DeepSeek-V3.1-Terminus.

[

![](https://substackcdn.com/image/fetch/$s_!UCFf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dd91bc0-39e7-4745-b509-39821d3c8890_1018x814.png)



](https://substackcdn.com/image/fetch/$s_!UCFf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dd91bc0-39e7-4745-b509-39821d3c8890_1018x814.png)
*Unsloth’s 25 GGUF versions of [Qwen3-8B](https://huggingface.co/unsloth/Qwen3-8B-GGUF)!*

That’s a lot of choice, but beyond filename and size, there’s rarely a clear guide to accuracy, speed, or trade-offs for each format. New variants land regularly, so I wrote this guide to demystify the main GGUF-serializable formats across architectures: how they work, why their accuracy/size/throughput differ, and when to pick each one. (This guide doesn’t cover converting your own models; I’ve written about that separately.)

## “GGUF Quantization”

I introduced GGUF in this article:

> **TL;DR**
> 
> Most GGUF weight formats are blockwise.
> 
> A matrix is split into fixed-size blocks, each block is represented with compact integer parameters, and a small set of per-block parameters reconstructs approximate floating weights at inference.
> 
> The design space is defined by three choices:
> 
> -   The number of bits used for the parameters
>     
> -   The block size
>     
> -   The dequantization rule (linear scale and zero-point, multi-scale hierarchies, or non-linear/LUT-assisted schemes)
>     
> 
> The more expressive the dequantization rule, the lower the error you can achieve for the same number of bits, at some decode cost.

In the next sections, “bits/weight” refers to the effective average once overheads like block scales are included. Values are approximate and vary a little by implementation and tensor shape, but they are useful for thinking about trade-offs.

## Legacy Formats: Q\_0 and Q\_1

The legacy family of GGUF formats, Q4\_0, Q4\_1, Q5\_0, Q5\_1, Q8\_0, implements classic per-block linear quantization. A block stores n-bit weight codes and either one scale (the “\_0” variants, symmetric) or one scale plus one offset/zero-point (the “\_1” variants, asymmetric). Dequantization is a single affine transform per block.

These formats are simple to decode and therefore fast. Their weakness is representational: one affine map per block cannot model skewed or heavy-tailed weight distributions as well as newer schemes.

At 8-bit, the difference is negligible, and Q8\_0 is effectively near-lossless for most LLMs. That’s why we can still see a lot of Q8\_0 models being published on the HF Hub. At 5- and especially 4-bit, legacy formats leave measurable accuracy on the table compared with modern alternatives. They remain relevant for maximum simplicity and compatibility, and on some older devices, their very cheap decoding can still be a speed win.

A concise way to think about the legacy set is that Q8\_0 is a safe INT8 baseline, Q5\_0/1 are decent mid-range choices if you must stick to legacy, and Q4\_0/1 are largely superseded by K- and I-quants for quality per bit.

## K-quants: Modern Default for 3–6 Bits

K-quants (Q2\_K, Q3\_K, Q4\_K, Q5\_K, Q6\_K, and their mixed variants like \_S, \_M, \_L) introduce structure beyond a single affine per block. We saw how to make these models here:

The most common pattern is a two-level scheme: small blocks with their own scale and zero-point grouped into a super-block with an additional scale/offset. In practice, this behaves like a piecewise-affine approximation that captures both local and global variation with little overhead.

This is an asymmetric quantization scheme (most variants map negatives and positives to different ranges), with the exceptions of Q3\_K and Q5\_K which are symmetric. They quantize weights in fixed-size groups (32-weight blocks packed into 256-weight “super-blocks”) and apply double-quantization to the per-group scales, first computing a scale for each group, then quantizing those scales again, reducing metadata overhead and improving quality-per-bit compared to legacy formats.

The result is lower error at the same storage. For example, a typical Q4\_K lands around the mid-4s bits/weight—slightly above Q4\_0/1 once you count its extra parameters, but it achieves distinctly better fidelity. Q5\_K and Q6\_K cluster close to the original model in perplexity while remaining far smaller than FP16.

Decoding remains lightweight. The extra parameters are compact, and arithmetic is still simple integer unpacking plus a handful of multiplies and adds. On modern CPUs and GPUs, K-quants generally match or beat legacy formats in throughput because you move fewer bytes for the same quality.

The suffixes encode “mix levels” across tensors. Examples for Q4\_K:

-   Q4\_K\_S (small): Keeps almost everything at 4-bit
    
-   Q4\_K\_M (medium): Selectively raises precision for more sensitive tensors (for example, attention value projections or final layers) using 5–6 bits
    
-   Q4\_K\_L (larger): Even more relaxed than Q4\_K\_M.
    

The effective bits/weight rise accordingly, buying back quality where it matters. In practice, Q4\_K\_M is a widely useful default for 4-bit deployments (Q4\_K is also OK for large models). Q5\_K\_M is a high-quality setting that is close to imperceptible degradation for many tasks. Q6\_K is for cases where you want “almost lossless” behavior and still want memory savings.

Keep in mind that for most models, you won’t see much difference in quality between S, M, and L variants, unless you are dealing with small models (let’s say <8B models).

### The Special Case of TQ1\_0

For very large LLMs, like DeepSeek models, you may also find a TQ1\_0 version.

TQ1\_0 encodes weights that are ternary (values in {−1, 0, +1}) using a compact packing scheme. It lands around ~1.6–1.7 bits/weight depending on packing details.

## I-Quants: Pushing Quality at Lower Precision

I-quants (IQ2\_XXS, IQ2\_XS, IQ2\_S, IQ2\_M; IQ3\_XXS/XS/S/M; IQ4\_XS; IQ4\_NL) are purpose-built to hold up at 2–4 bits.

They go beyond piecewise-affine by introducing non-linear and table-assisted reconstruction. Conceptually, blocks are encoded into extremely compact codes that are decoded through small lookup tables and richer dequantization rules. This enables a more faithful fit to non-Gaussian weight distributions without expanding the bit budget.

The pay-off is quality per bit. IQ4\_XS typically bests 4-bit K-quants at similar effective size. IQ3\_XS and IQ3\_M tend to outperform their 3-bit K counterparts.

IQ2\_\* is the frontier that makes very large models fit in places they simply could not before.

The trade-off is compute: decoding involves more indexing and arithmetic than K-quants, so on many CPUs and some GPUs the tokens-per-second can be (much) lower for I-quants than for K-quants of similar size. Whether that matters depends on whether you are bandwidth-bound or compute-bound on your hardware.

The “XS/XXS/S/M” suffixes are simply presets along the aggressiveness spectrum. XXS minimizes size with the biggest quality hit within the I-quant family, XS is a balanced small setting, S and M step up bits/weight and quality.

IQ4\_NL is a special 4-bit non-linear variant that also uses smaller blocks. It targets CPU speed while retaining the non-linear benefits.

## Importance Matrices (imatrix): Data-Aware quantization

Separately from the storage format, GGUF pipelines can incorporate an [importance matrix derived from a calibration set](https://kaitchup.substack.com/p/the-impact-of-the-calibration-dataset).

The idea is straightforward: not all weights contribute equally to downstream loss. If you compute layer- and sometimes row/column-wise sensitivities, you can weight the quantization objective to protect the most consequential directions. This is especially valuable at 2–3 bits where naïve objectives fail. In practice, importance guidance can be used with legacy, K-, or I-quants. It is commonly paired with I-quants because it stabilizes the most aggressive settings, but it is not exclusive to them, and I usually make my K-quants with an importance matrix.

The key takeaway is that two models with the same label (say IQ3\_XS) can differ if one was quantized with a strong calibration set and the other was not. If the dataset used for calibration targeted a very specific domain, let’s say, law text in Thai, you will observe a lower accuracy for general English tasks. But if your calibration dataset remains “general” or not too focused, it won’t adapt your model to a particular domain.

## What Else Can GGUF Serialize?

Beyond the families above, GGUF also supports unquantized tensors (FP32/FP16/BF16) for layers you choose to leave “full-precision” and hybrid models where some matrices use different formats.

You will often encounter mixed-precision checkpoints where embeddings, final output layers, or KV projections are stored at higher precision while the bulk of MLP and attention weights use K- or I-quants.

## Accuracy, Size, and Speed of GGUF Models

### Accuracy

At 6 bits with K-quants, perplexity and downstream behavior are usually very close to the FP16 baseline, while footprint is cut by well over half.

At 5 bits, most tasks remain robust; you begin to notice small degradations on stress tests, long-horizon reasoning, and edge cases.

At 4 bits, legacy formats typically show visible drift, while Q4\_K and IQ4 narrow the gap substantially. IQ4\_XS tends to be the most accurate 4-bit option at similar size.

At 3 bits, K-quants can work for large models but quality becomes more model- and task-dependent; I-quants with a good importance calibration hold up better.

At 2 bits, I-quants are the only generally usable option and even then are best treated as fit-enablers rather than quality settings.

### Size and Speed

Throughput depends on your bottleneck. If you are bandwidth-bound, lower bits usually help more than the decode overhead hurts. If you are compute-bound, common on CPUs and some integrated GPUs, the simpler decode path of legacy or K-quants can be faster even when I-quants are smaller. This is why the “fastest” 4-bit format on a given system might be Q4\_K\_S or even Q4\_0 rather than IQ4\_XS, while on a different system, IQ4\_XS may win by fitting more of the working set in cache or VRAM.

## Choosing Formats by Scenario

On consumer GPUs with limited VRAM, start with Q4\_K (or Q4\_K\_M) when you need 4-bit and move to Q5\_K\_M if you can afford it. These settings tend to preserve quality with predictable performance and are well-optimized in mainstream runtimes. If a model almost fits, IQ4\_XS can provide the extra headroom while keeping quality high. Evaluate speed on your hardware before committing.

On CPUs, prefer K-quants for day-to-day use because they balance compression with very cheap decode. Q4\_K\_S/M and Q5\_K are strong defaults. Drop to I-quants only when you must fit a model that otherwise would not load, or when the memory reduction enables a longer context that matters more than tokens-per-second. If you need absolute speed and can tolerate the size, Q8\_0 is a pragmatic INT8 baseline with minimal accuracy loss.

On mobile and edge devices, resist the temptation to over-quantize a huge model. A smaller base model at 4–5-bit K often beats a much larger model at 2–3-bit I for end-user quality and latency, unless your application specifically benefits from the larger capacity and can tolerate slow generation. If you must go extremely small, IQ3\_XS/M and IQ2\_S/M are the best shots at keeping outputs usable.

For production workloads where regression risk is costly, aim for Q5\_K or Q6\_K first. Treat I-quants as a way to unlock otherwise impossible deployments, and keep a close eye on latency tails. When in doubt, fine-tune your choice per layer: many pipelines let you keep embeddings and the final lm\_head at 8 or 16 bits while quantizing the rest, which often buys disproportionate quality for a small size penalty.

## Practical Reference Tables

[

![](https://substackcdn.com/image/fetch/$s_!TUEV!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24b6d07f-3512-4197-bbb8-4253dacda1e3_3630x2670.png)



](https://substackcdn.com/image/fetch/$s_!TUEV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24b6d07f-3512-4197-bbb8-4253dacda1e3_3630x2670.png)

## Conclusion

GGUF’s value is choice. If you visualize quantization as a codec, legacy formats are the simple baseline encoders, K-quants are the modern general-purpose codec that hits the sweet spot of size, quality, and speed, and I-quants are the advanced codec you reach for when you must push bitrates to the edge while keeping the picture sharp. Add an importance matrix when you operate at the lowest bitrates or want extra safety on critical layers, and do not hesitate to mix precisions across the network.

Many frameworks support GGUF’s models. Here are the most popular:

-   [llama.cpp](https://github.com/ggml-org/llama.cpp)
    
-   [Ollama](https://kaitchup.substack.com/p/deploy-your-fine-tuned-langue-models) (which is a wrapper of llama.cpp)
    
-   SGLang and vLLM also support GGUFs, but are not optimized for it
    
-   Transformers can read and load GGUF, but has to dequantized them for inference (so you need as much memory as with the original model)
    

vLLM (and maybe SGLang?) depends on the implementation in Transformers, which [itself only supports a handful of popular models](https://github.com/huggingface/transformers/blob/main/src/transformers/integrations/ggml.py).