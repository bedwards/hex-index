---
title: "Accelerate Models with Quantization: Recipes for NVFP4, GPTQ, AWQ, SmoothQuant, AutoRound, and FP8"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-24T15:02:10.000Z"
source_url: "https://kaitchup.substack.com/p/quantizing-and-running-fast-models"
word_count: 290
estimated_read_time: 2
---

[

![](https://substackcdn.com/image/fetch/$s_!L8L5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0199a7c-2725-440a-bf59-b495bf5723c6_2816x1536.png)



](https://substackcdn.com/image/fetch/$s_!L8L5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0199a7c-2725-440a-bf59-b495bf5723c6_2816x1536.png)
*Generated with Nano Banana Pro*

Running LLMs is easy. Quantizing LLMs is also easy. But running quantized LLMs? That often doesn’t work as expected. This is one of the reasons GGUF is so popular: it’s a format that can be easily run by popular frameworks like Ollama and llama.cpp.

However, if you want state-of-the-art quantization accuracy and to take advantage of highly optimized CUDA kernels for INT4, FP8, and FP4 models, you often need to get your hands a bit dirty.

In this article, I explore **six different quantization recipes** that yield models optimized to run very fast with **vLLM**. We’ve already applied most of them in previous articles using different frameworks:

-   **W4A16**: INT4 quantized weights with GPTQ, AWQ, and AutoRound, calibrated/tuned
    
-   **W8A8**: INT8 quantized weights and quantized activations, calibrated with SmoothQuant
    
-   **FP8-Dynamic**: FP8 quantized weights and *dynamically* quantized activations
    
-   **NVFP4**: FP4 quantized weights and activations, calibrated
    

All these recipes can be run on a single consumer GPU, but you’ll need a recent one (for FP8 and NVFP4 in particular), such as an RTX 50xx. I used an **[RTX 5090 (from RunPod)](https://runpod.io?ref=1ip9lvtj)** and was able to quantize 8B models. None of these recipes took more than an hour.

I also provide a **single customizable script** capable of running each of these recipes. You can find it here:

In the following sections, we’ll test each recipe with Qwen3 4B Instruct and also its Thinking variants to measure the impact on reasoning and long-sequence generation. I report both inference throughput and accuracy on popular benchmarks.

*Note: I focused on Qwen3 in this article, but I could quantize Olmo 3 with the same script. You can find my quantized Olmo 3 here (still ongoing):*

-   [Quantized Olmo 3](https://huggingface.co/collections/kaitchup/quantized-olmo-3)
    

## 6 Quantization Recipes

[Read more](https://kaitchup.substack.com/p/quantizing-and-running-fast-models)