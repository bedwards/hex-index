---
title: "Notes on RNJ-1, K2-V2, Devstral 2, and GLM-4.6V"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-12-12T17:53:26.000Z"
source_url: "https://kaitchup.substack.com/p/notes-on-rnj-1-k2-v2-devstral-2-and"
word_count: 1252
estimated_read_time: 7
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi everyone,

In this edition of The Weekly Kaitchup, I’ll review a subset of the models released over the past two weeks. The list is not exhaustive: I’ll only cover models I’ve actually tested, and I’ll exclude Ministral 3, which I briefly discussed last week and for which I’m preparing a dedicated article.

## RNJ-1

Currently trending #1 on the HF hub in the “text generation” category, RNJ-1 was released by [Essential AI](https://www.essential.ai/), led by Ashish Vaswani (first author of *Attention Is All You Need*, the Transformer paper).

-   [EssentialAI/rnj-1-instruct](https://huggingface.co/EssentialAI/rnj-1-instruct)
    

It’s an 8.3B decoder-only dense model with a very conventional design. It’s based on the Gemma architecture, but trained from scratch: 32 transformer blocks, rotary position embeddings, RMSNorm, and a gated MLP. Attention uses grouped-query attention. There are no architectural tricks. It also has a more common vocabulary size of 128k entries (against 262k for Gemma 3).

Pretraining was done with an 8k context window on a mixed corpus that leans toward code and STEM material. The optimizer is Muon (the new standard, it seems) with: warmup, flat phase, then cosine decay, all at fairly high global batch sizes. After this, the model is pushed through a mid-training phase that extends the context to 32k using a YaRN-style scheme and reinforces behaviour on longer sequences. On top of that, they did a sizeable supervised fine-tuning stage, again biased toward code, math, and structured QA. Again, everything looks very normal.

Where it’s different is that they stopped there. No fancy RL or DPO.

Because the SFT layer is not especially “heavy” in the alignment sense, RNJ-1-Instruct behaves like a usable chat model but still exposes the underlying base distribution enough that further fine-tuning is straightforward.

In practice, it handles typical code and math benchmarks at the level you’d expect for a well-trained 8B model with that data profile. The main reason to care, if you are an implementer, is that you get a dense 8B backbone with 32k context and a fully specified training recipe that you can easily fine-tune.

They also show this on the model card:

[

![Pass at k evals](https://substackcdn.com/image/fetch/$s_!FtIK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d5474bb-65d5-4984-bb25-b7898f43dcfb_989x590.png "Pass at k evals")



](https://substackcdn.com/image/fetch/$s_!FtIK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d5474bb-65d5-4984-bb25-b7898f43dcfb_989x590.png)

This “accuracy vs pass@k” shows that the model can find a better answer if given more tries. Good pass@k indicates that the model is a good target for RLVR methods like GRPO.

However, nothing is surprising here. Most recent models, not trained with RL, have a very similar pass@k behavior. Here are my pass@k curves for Olmo 3 7B Instruct:

[

![](https://substackcdn.com/image/fetch/$s_!Qy-G!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8024d1f7-b6f2-4eca-a268-9c0fd46601d8_690x571.png)



](https://substackcdn.com/image/fetch/$s_!Qy-G!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8024d1f7-b6f2-4eca-a268-9c0fd46601d8_690x571.png)

Nonetheless, this RNJ-1 Instruct model has very good benchmark scores (see the model card), significantly higher than Qwen3 8B Instruct. Olmo 3 7B instruct looks far behind. Let’s talk more about this next week!

\---

## K2-V2

K2-V2, from LLM360 (Mohamed bin Zayed University), is a 70B dense model. Since Llama 3.3 70B, we haven’t seen this size very often.

-   [K2-V2 Models](https://huggingface.co/collections/LLM360/k2-v2)
    

Architecturally, it’s a deep transformer stack (around 80 layers), wide hidden and MLP dimensions, grouped-query attention, rotary embeddings and RMSNorm. No MoE, no low-rank attention, no hybrid blocks. From a modelling perspective, this is “large LLaMA-style dense transformer” (LlamaForCausalLM class in Transformers, without custom code). This makes it very easy to use with all tools already supporting Llama models.

What makes K2-V2 interesting is the staged training. The first phase is standard: pretraining on TxT360, a mixture of web text, code, documents and so on, filtered and cleaned but otherwise not unusual. The second phase, which they call “Midas”, shifts the distribution toward explicitly difficult material: competition math, logic puzzles, scientific QA, long-form reasoning data.

The third stage is where the “Instruct” comes from, and it’s not the usual generic chat SFT. The dataset (TxT360-3efforts) is built so that a single prompt has three answers corresponding to low, medium and high “effort”. Those are not random samples but different reasoning depths. The model is trained to condition on this, so at inference you get something that looks very similar in spirit to GPT-OSS’s “reasoning effort”: same core model, different budget.

Public evaluations show that as you move from the base through the Midas checkpoints to the 3-effort instruct version, performance on math and logic benchmarks improves.

[

![K2-V2 GPQA results](https://substackcdn.com/image/fetch/$s_!M2KZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc482461-63b6-41c6-abfb-4dfe67c0cd81_1152x864.png "K2-V2 GPQA results")



](https://substackcdn.com/image/fetch/$s_!M2KZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc482461-63b6-41c6-abfb-4dfe67c0cd81_1152x864.png)

In contrast with RNJ-1, K2-V2 models are not trending, and no one talks about them. To me, they look very good. This could be the best sub-100B model now.

I quantized it to various 8-bit and 4-bit formats, all optimized to be very fast with vLLM:

-   [Quantized K2-V2](https://huggingface.co/collections/kaitchup/quantized-k2-v2)
    

\---

## Devstral 2

Devstral 2 is Mistral AI’s coding model. The main model is a 123B dense decoder with a 256k context window. There is also a 24B Devstral Small 2 with the same context budget and multimodal support (images as well as text), which is a bit weird to me for a coding model, but why not…

-   [Devstral 2 Models](https://huggingface.co/collections/mistralai/devstral-2)
    

Internally, they appear to follow the same general architectural pattern as other Mistral large models: deep transformer, RoPE, grouped-query attention, RMSNorm, just scaled and tuned for code.

On SWE-bench and SWE-bench Verified, Devstral 2 sits in the high range of success rates among open models, and the small 24B model performs respectably given its size. Those benchmarks are aligned with the way the model was trained: they check whether a system, driven by the model, can actually fix real issues in real repositories

If you only need a generalist model that occasionally writes a function, this is overkill. If you want “read repo, apply patch, re-run tests” as the default behaviour, Devstral 2 might be for you.

\---

## GLM-4.6V

The main variant is a ~100B-parameter vision-language model with a 128k context window. A 9B~10B “Flash” version is also available.

-   [GLM-4.6V Models](https://huggingface.co/collections/zai-org/glm-46v)
    

The architecture combines a language backbone with a vision encoder, trained jointly on interleaved image–text and video–text data, plus pure text.

The context window applies to the joint sequence. That means a single input might be a multi-page PDF flattened into tokens via an image+text pipeline, or a long video broken into frames paired with transcripts and metadata.

GLM-4.6V is particularly trained to call tools that operate on images or documents, OCR on a specific crop, retrieval over a set of pages, external code to compute something based on extracted values, and to integrate those results into its reasoning. The model’s outputs can interleave analysis, tool calls and final answers, rather than emitting a single block of text.

The numbers look good…

[

![](https://substackcdn.com/image/fetch/$s_!ZGUm!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb90b70d-0f6f-4614-93bd-87aa0bd94dfe_10101x7371.jpeg)



](https://substackcdn.com/image/fetch/$s_!ZGUm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb90b70d-0f6f-4614-93bd-87aa0bd94dfe_10101x7371.jpeg)

… but, can you spot what’s wrong in this table?

They copied numbers from previously published reports. These numbers are extremely unlikely to be comparable.

Quick test for you:

-   Pick a model
    
-   Run some benchmark with [lm-eval](https://github.com/EleutherAI/lm-evaluation-harness), let’s say AIME24, which is super common.
    
-   Now, run the same benchmark, same model, but with [evalscope](https://github.com/modelscope/evalscope/tree/main/evalscope).
    
-   Compare the numbers
    

Same benchmark, same model, completely different numbers. Why? Because “the benchmark” is really a bundle of implementation choices: prompt format, default decoding hyperparameters, inference engine, dataset preprocessing, and the post-processing used to extract the final answer from the generated text, among others.

**If you see a table full of “\*” markers and missing entries, treat every number on it as suspect.**

I’m sure the models are excellent. I use GLM models. Yet, it’s almost 2026: labs have enough compute to train multi-billion-parameter models, but apparently not enough budget or discipline to rerun the baselines they claim to outperform.

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   On GRPO Collapse in Search-R1: The Lazy Likelihood-Displacement Death Spiral
    
-   ⭐PretrainZero: Reinforcement Active Pretraining
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!