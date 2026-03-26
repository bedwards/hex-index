---
title: "DGX Spark: Use It for Fine-Tuning"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-17T16:45:13.000Z"
source_url: "https://kaitchup.substack.com/p/dgx-spark-use-it-for-fine-tuning"
word_count: 1096
estimated_read_time: 6
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup, I’ll discuss only one topic: The DGX Spark.

\---

## NVIDIA’s DGX Spark Isn’t an Inference Box

Earlier this year, NVIDIA announced the “DIGITS” project, to be commercialized (soon) as DGX Spark, a compact, all-in-one “AI” box built around a GB10 Grace Blackwell (arm64) chip with 128 GB of unified LPDDR5x memory. It’s aimed at AI workloads.

The “GPU” performance is comparable to an RTX 5070/5070 Ti, which sounds limited. The generous 128 GB helps, but the ~273 GB/s memory bandwidth is obviously the main bottleneck.

NVIDIA and partners highlight “1 PFLOP of sparse FP4 tensor performance,” a marketing figure that depends on low-precision FP4 (MXFP4/NVFP4). FP4 is still niche in practice, so that metric won’t map cleanly to most real-world workloads today, though that could change later next year.

NVIDIA sent early-access units to teams behind the most-used inference engines, including Ollama, LMSYS, llama.cpp, LM Studio, and vLLM, among others. Most of them have already published their reviews.

Some notes before we dive in:

-   Most inference stacks depend on PyTorch, with an arm64 support that is still inconsistent. As someone using the GH200 (also arm64) a lot, I can tell there are still clear gaps. The [release of PyTorch 2.9](https://pytorch.org/blog/pytorch-2-9/) this week should improve support.
    
-   Key frameworks, vLLM included, only recently began publishing arm64 wheels and documentation, so the ecosystem is still maturing. Unsloth now proposes a Docker container.
    
-   Published inference results should improve as kernels, compilers, and runtimes (PyTorch, Triton, CUDA/Transformer Engine) are optimized for arm64/Grace-Blackwell. I expect performance to improve in the coming months.
    

Let’s start with the negative points.

This review by LMSYS (the people behind SGLang) is one of the earliest and most complete regarding inference with the DGX Spark:

[NVIDIA DGX Spark In-Depth Review: A New Standard for Local AI Inference](https://lmsys.org/blog/2025-10-13-nvidia-dgx-spark/)

LMSYS measured the following throughput (tps: tokens per second; prefill/decode):

> For example, running **GPT-OSS 20B (MXFP4)** in **Ollama**, the Spark achieved **2,053 tps prefill / 49.7 tps decode**, whereas the **RTX Pro 6000 Blackwell** reached **10,108 tps / 215 tps,** roughly **4× faster**. Even the **GeForce RTX 5090** delivered **8,519 tps / 205 tps**, confirming that the Spark’s unified LPDDR5x memory bandwidth is the main limiting factor.

GPT-OSS seems like a good target model for the DGX Spark as it is “natively” MXFP4, so it is hardware accelerated… Yet, it’s also a reasoning model that may generate 10k+ tokens per prompt. At 50 tps, it takes minutes to get an answer, hours for the 120B version. I don’t think anyone serious will run GPT-OSS models on this machine.

The RTX 5090 is 4x faster, and (~30%) cheaper.

For larger models, which the DGX Sparks can run while the RTX 5090 can’t, LMSYS notes this:

> This enables large models, such as **Llama 3.1 70B**, **Gemma 3 27B**, or even **GPT-OSS 120B,** to load **directly into memory** without the traditional system-to-VRAM transfer overhead. Despite its compact form factor, the Spark successfully ran **Llama 3.1 70B (FP8)** at **803 tps prefill / 2.7 tps decode**, which is remarkable for a workstation that sits quietly on a desk.

So yes, it enables larger LLMs than consumer GPUs, but 2.7 tps means it’s too slow for most applications.

[

![Image](https://substackcdn.com/image/fetch/$s_!1C5O!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ef745b8-b218-4192-80a4-0b561515a889_4096x3319.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!1C5O!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ef745b8-b218-4192-80a4-0b561515a889_4096x3319.jpeg)

Looking at the LMSYS results, DGX Spark compares poorly for the price. Those measurements focus on per-query speed and do not exploit the system’s large unified memory, so they miss scenarios like long contexts or heavier batching.

llama.cpp reports stronger figures with batched decoding (see the discussion thread: [https://github.com/ggml-org/llama.cpp/discussions/16578](https://github.com/ggml-org/llama.cpp/discussions/16578)). However, the data is hard to interpret: there are no cross-device baselines, and the runs use specific hyperparameters that may not reflect common production settings. The note “*2025-10-15 (b6767) 5acd455 Improved decode via CUDA: Changing the CUDA scheduling strategy to spin #16585*” highlights that CUDA, PyTorch, and related components are still being optimized for this hardware.

The Register’s review ([DGX Spark, Nvidia’s tiniest supercomputer, tackles large models at solid speeds](https://www.theregister.com/2025/10/14/dgx_spark_review/)) lines up with LMSYS: without batch decoding and using llama.cpp, an RTX 3090 from 2020 is about four times faster than the DGX Spark (205 vs 57 tps).

As of today, vLLM has not published a full review. The team has only confirmed that they received an early-access unit.

[

![](https://substackcdn.com/image/fetch/$s_!reuF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1b12579-72c9-4049-ab09-97d1db19640f_580x494.png)



](https://substackcdn.com/image/fetch/$s_!reuF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1b12579-72c9-4049-ab09-97d1db19640f_580x494.png)
*https://x.com/eqhylxx/status/1977928690945360049*

**So, what is the DGX Spark actually good for?**

For inference, the value is really limited. NVIDIA sent units to many inference teams, but the results were always going to look weak against cheaper desktop GPUs or Apple-class machines. Most recent models are reasoning-heavy, so tokens-per-second matters. Few users will tolerate multi-minute responses.

Batch decoding helps, but if you need to serve multiple users, the cloud will usually be cheaper and faster. If you want to run locally, a workstation with two RTX 5090s (or more) is a better use of budget. And there are plenty of ways to compensate for the lack of memory on commodity hardware: KV-cache offloading, quantization, pruning, and so on.

Where DGX Spark makes more sense, I think, is **fine-tuning and small-scale training**, especially for models under ~8B parameters. The unified 128 GB lets you run long contexts and larger batches. That’s something a single RTX 5090 would struggle with, since it would have to offload heavily to system memory, dragging performance down. Unsloth’s quick write-up points in this direction:

[https://docs.unsloth.ai/new/fine-tuning-llms-with-nvidia-dgx-spark-and-unsloth](https://docs.unsloth.ai/new/fine-tuning-llms-with-nvidia-dgx-spark-and-unsloth)

In my experience with GH200 + Unsloth (and TRL with “activation\_offloading=True”), unified memory reduces the penalty when many tensors are offloaded during fine-tuning. The DGX Spark should offer similar advantages. It also keeps your main desktop or Mac mini free. You don’t have to tie up your everyday machine for multi-day runs, heat it up, or shorten its lifespan.

As a product, DGX Spark looks good and appears easy to set up and connect. But **would I buy one?** Probably not at the current price. A year ago, or even in May, I might have picked it up for short fine-tuning experiments and benchmarking. Today, as The Kaitchup grows and my experiments get heavier, the cloud remains my most cost-effective option.

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

I reviewed in The Weekly Salt:

-   ⭐QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs
    
-   Which Heads Matter for Reasoning? RL-Guided KV Cache Compression
    
-   Dr.LLM: Dynamic Layer Routing in LLMs
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!