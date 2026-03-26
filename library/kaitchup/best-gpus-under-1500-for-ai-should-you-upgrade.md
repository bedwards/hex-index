---
title: "Best GPUs Under $1,500 for AI: Should You Upgrade?"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-17T16:31:34.000Z"
source_url: "https://kaitchup.substack.com/p/best-gpus-under-1500-for-ai-should"
word_count: 241
estimated_read_time: 2
---

[

![](https://substackcdn.com/image/fetch/$s_!gM-Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2daa3408-7d4d-44ac-9551-5716fc0b9197_1536x1024.png)



](https://substackcdn.com/image/fetch/$s_!gM-Z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2daa3408-7d4d-44ac-9551-5716fc0b9197_1536x1024.png)
*Image generated with ChatGPT*

We often see inference throughput and fine-tuning stats for consumer GPUs, but they mostly focus on the high end (RTX 4090/5090). What about more affordable cards: are they simply too slow, or too memory-constrained to run and fine-tune LLMs?

To find out, I benchmarked GPUs across the last three NVIDIA RTX generations: 3080 Ti, 3090, 4070 Ti, 4080 Super, 4090, 5080, and 5090. With the exception of the xx90 cards, these GPUs offer only 12–16 GB of VRAM.

Using vLLM, I measured throughput when the model fully fits in GPU memory and when part of it must be offloaded to system RAM. For fine-tuning, I evaluated both LoRA and QLoRA on 1.7B and 8B LLMs.

Benchmark code and logs:

I used GPUs from [RunPod (referral link)](https://runpod.io?ref=1ip9lvtj) and also report cost-efficiency based on their pricing.

[

![](https://substackcdn.com/image/fetch/$s_!8h_i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F87756e4f-6c87-4564-b6d2-b1ec1d92b93d_1200x742.png)



](https://substackcdn.com/image/fetch/$s_!8h_i!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F87756e4f-6c87-4564-b6d2-b1ec1d92b93d_1200x742.png)

## Running LLMs without High-End GPUs

To benchmark GPUs for inference throughput, use the same stack you plan to deploy. It sounds obvious, but many popular (often marketing-driven) benchmarks don’t resemble real inference frameworks, so **their numbers are speeds you’ll never hit in your use case**. If you run Ollama, benchmark with Ollama and GGUF models. If you use vanilla Hugging Face Transformers, benchmark with Transformers directly.

Different libraries ship different kernel implementations, each optimized to varying degrees for specific GPU generations.

[Read more](https://kaitchup.substack.com/p/best-gpus-under-1500-for-ai-should)