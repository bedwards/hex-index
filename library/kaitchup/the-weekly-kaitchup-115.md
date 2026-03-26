---
title: "The Weekly Kaitchup #115"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-24T16:28:53.000Z"
source_url: "https://kaitchup.substack.com/p/the-weekly-kaitchup-115"
word_count: 1154
estimated_read_time: 6
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup:

-   Reproducible Evaluation with vLLM
    
-   The Unexpected Qwen3-VL 2B and 32B
    
-   Continual Fine-Tuning with Memory Layers: Fine-Tune Instruct/Heavily Post-trained Models without Destroying Them?
    
-   DeepSeek-OCR: Compression→Decompression of Text As Vision Tokens
    

\---

## Reproducible Evaluation with vLLM

Reproducible evaluation is the backbone of trustworthy AI research. If the same prompt yields different probabilities just because you changed the batch size or switched from single-request to batched execution, your comparisons become noisy and misleading. You can’t reliably A/B models, diagnose regressions, or share results if “run it again” changes the answer.

Historically, vLLM and most other inference frameworks, produced different results at different batch sizes. I did a few experiments to measure the impact of this almost a year ago. People said it was “normal.” Technically, sure. But scientifically, batch size should not affect evaluation. Sampling parameters and the random seed? Yes. Batch size? No.

[

![Image](https://substackcdn.com/image/fetch/$s_!pGus!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe014bfb-fe53-4606-af26-380388ca453c_547x155.png "Image")



](https://substackcdn.com/image/fetch/$s_!pGus!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe014bfb-fe53-4606-af26-380388ca453c_547x155.png)
*Results I published in October 2024 (https://x.com/bnjmn\_marie/status/1846834917608407199)*

So, I’m thrilled that [vLLM now supports](https://x.com/vllm_project/status/1981088861506982041) **[batch-invariant inference](https://x.com/vllm_project/status/1981088861506982041)**. Flip one switch, `VLLM_BATCH_INVARIANT=1`, and you get identical results whether you run batch size 1, batch size N, or prefill with generated tokens. No more divergences in logprobs between decode paths or prefill vs. prefill+decode. The probabilities sampled from the model are exactly the same across execution modes, making side-by-side evaluations and automated test suites dramatically more reliable. No more excuses: if you publish benchmark results, we should be able to reproduce them, even at batch size > 1.

\---

## The Unexpected Qwen3-VL 2B and 32B

I thought Qwen was done with Qwen3-VL after releasing 4B and 8B models. And I published a fine-tuning guide for Qwen3-VL, anticipating as “unlikely” the release of smaller models:

Well, I was wrong!

Qwen released 2B and 32B versions:

-   [Qwen/Qwen3-VL-2B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-2B-Instruct)
    
-   [Qwen/Qwen3-VL-32B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct)
    

They perform well, but the 2B model appears much less useful than the 4B model, which already fits on many configurations.

[

![](https://substackcdn.com/image/fetch/$s_!sMqB!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32b1a2b5-5177-49df-ae68-6df3e26420cc_5358x5252.jpeg)



](https://substackcdn.com/image/fetch/$s_!sMqB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32b1a2b5-5177-49df-ae68-6df3e26420cc_5358x5252.jpeg)

### Is Qwen3-VL 32B better than Qwen3-VL 30B-A3B MoE?

Qwen doesn’t directly answer this question, but we can compare the results ourselves:

[

![](https://substackcdn.com/image/fetch/$s_!a74_!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce59e4c1-3e07-41f3-86ec-fc5ca253feb0_2668x1545.png)



](https://substackcdn.com/image/fetch/$s_!a74_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce59e4c1-3e07-41f3-86ec-fc5ca253feb0_2668x1545.png)
*Numbers extracted from model cards and compared by ChatGPT*

If you don’t care about the inference speed, the 32B version is significantly better while consuming almost the same memory.

\---

## Continual Fine-Tuning with Memory Layers: Fine-Tune Instruct/Heavily Post-trained Models without Destroying Them?

Training a model on your own data for narrow domains or tasks, while preserving the broad capabilities painstakingly instilled by the provider’s post-training, is hard. In practice, I haven’t seen a single custom fine-tuning run for a highly specific task that fully retains the original MMLU-Pro or IFEval scores.

This paper by Meta and the University of California (Berkeley) argues that catastrophic forgetting in continual fine-tuning is mostly a parameter-sharing problem, and tackles it by only updating the tiny subset of parameters that new data actually touches.

[Continual Learning via Sparse Memory Finetuning](https://arxiv.org/pdf/2510.15103)

Concretely, they plug a memory layer into a Transformer and, during fine-tuning, update only the memory slots that a batch accesses far more often than a background corpus does. A simple TF-IDF score on access counts ranks slots. The top-t gets gradients, the rest of the model stays frozen. The result is targeted plasticity with little interference.

The memory layer is a key/value pool (on the order of 1M entries) queried per token. Each token retrieves only the top-k keys (e.g., k=32 per head across a few heads), and an input-dependent gate mixes the retrieved values back into the block.

[

![](https://substackcdn.com/image/fetch/$s_!zstr!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0d73c47-789d-4b31-a60e-b8c4edd7f2a0_2000x627.png)



](https://substackcdn.com/image/fetch/$s_!zstr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0d73c47-789d-4b31-a60e-b8c4edd7f2a0_2000x627.png)
*[https://arxiv.org/pdf/2510.15103](https://arxiv.org/pdf/2510.15103)*

Their experiment setups use a ~1.3B model with one FFN replaced by a memory lookup (four heads, k=32, value dim 1024, ~1M slots). Baselines are full fine-tuning and LoRA on attention and FFN. Two continual settings are explored: learning a stream of facts (paraphrased TriviaQA) and learning from a stream of documents (Wikipedia-grounded SimpleQA). Forgetting is measured on held-out NaturalQuestions and GSM8K while the target-task learning is measured on the stream itself. *Note: SGD worked best for the sparse-update method, even when controlling for learning rate and weight decay.*

Empirically, sparse memory finetuning matches the learning of full fine-tuning (like LoRA) on the new facts/documents while dramatically reducing forgetting. After training on new facts, NaturalQuestions F1 collapses under full fine-tuning (-89%) and drops substantially with LoRA (-71%), but only declines modestly (-11%) with sparse memory updates at similar target-task gains.

They didn’t release an implementation yet. Judging how well this is received on X and other social networks, we probably won’t have to wait long before someone in the community tries to replicate and release an implementation.

\---

## DeepSeek-OCR: Compression→Decompression of Text As Vision Tokens

DeepSeek-OCR renders text-heavy content (e.g., PDFs) as an image, encodes it to a small number of vision tokens, and has a compact MoE LLM decode the text.

The model is described in this paper:

[DeepSeek-OCR: Contexts Optical Compression](https://github.com/deepseek-ai/DeepSeek-OCR/blob/main/DeepSeek_OCR_paper.pdf)

The system has two parts. DeepEncoder chains a SAM-base front end (window attention) with a 16x convolutional token compressor into a CLIP-large back end (global attention), targeting **low activation memory at high resolution** and few output tokens. The decoder is a DeepSeek-3B-MoE with ~570M activated parameters during inference. Together they form an end-to-end OCR/VLM that treats OCR as compression→decompression of text via vision tokens. The model’s architecture is based on [DeepSeek-VL2](https://huggingface.co/deepseek-ai/deepseek-vl2), which is nearly one year old!

The training corpus is document-centric. “OCR 1.0” aggregates roughly 30 M PDF pages spanning ~100 languages with weak page-level labels, plus 4 M pages with detailed layout+text annotations. It also includes ~3 M Word documents and ~20 M scene-text images transcribed by an OCR engine. “OCR 2.0” adds targeted synthetic sets: ~10 M charts paired with their canonical tables, ~5 M chemical diagrams paired with SMILES strings, and ~1 M plane-geometry drawings paired with formal solutions. A small slice of general-vision data (captioning/detection/grounding) and ~10% text-only pretraining are included to stabilize language and non-document perception. Training proceeds in two stages: the vision encoder is first trained via next-token objectives, then the full encoder-decoder is optimized end-to-end with pipeline parallelism over 20×A100-40 GB GPUs.

And it works very well!

On compression feasibility (Fox benchmark, English 600–1,300 text tokens/page), 64–100 vision tokens deliver strong decoding: with 100 tokens, precision is ~97–98% for 600–1,000 text tokens (compression ~6.7–9.7x) and ~87–92% for 1,000–1,200 (10.6–11.3x). At 64 tokens (~10.5–19.7x), precision ranges ~96.5% down to ~59% as pages grow denser. The authors note a slight underestimation due to formatting mismatches with the Fox evaluation script.

[

![](https://substackcdn.com/image/fetch/$s_!9kqv!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d776881-fb31-4fa9-9a9f-b1d3fd3c00b1_2646x1152.png)



](https://substackcdn.com/image/fetch/$s_!9kqv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d776881-fb31-4fa9-9a9f-b1d3fd3c00b1_2646x1152.png)

This was “OCR” week. Hugging Face also fully opened their **[code and pipelines for the FinePDFs dataset](https://github.com/huggingface/finepdfs).**

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

I reviewed in The Weekly Salt:

This week, we review:

-   ⭐QueST: Incentivizing LLMs to Generate Difficult Problems
    
-   BitNet Distillation
    
-   LLMs Can Get “Brain Rot”!
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!