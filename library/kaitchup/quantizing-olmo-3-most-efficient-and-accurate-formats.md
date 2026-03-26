---
title: "Quantizing Olmo 3: Most Efficient and Accurate Formats"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-12-02T22:37:05.000Z"
source_url: "https://kaitchup.substack.com/p/quantizing-olmo-3-most-efficient"
word_count: 182
estimated_read_time: 1
---

[

![](https://substackcdn.com/image/fetch/$s_!-uKW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab1e614e-37d0-49b0-b687-adce332beb23_846x654.png)



](https://substackcdn.com/image/fetch/$s_!-uKW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab1e614e-37d0-49b0-b687-adce332beb23_846x654.png)

Olmo 3 is a standard 7B/32B decoder-only transformer. No MoE, no exotic attention, no flashy new architecture tricks. Most of the change is in the training pipeline: in the data (Dolma 3), the midtraining mix (Dolmino), the long-context stage (Longmino), and the “thinking” stack (Dolci, SFT, DPO, RL).

In this article, I briefly go through what actually changed compared to Olmo 2, and what didn’t work.

Then I move to quantization. I quantized Olmo 3 7B and 32B with several standard recipes that are practical to run on a single consumer GPU:

-   gptq-w4a16-g128
    
-   fp8-dynamic
    
-   nvfp4
    
-   awq with custom mappings for Olmo 3
    
-   W8A8 (INT8) with SmoothQuant
    

Finally, I look at how these variants behave on benchmarks: accuracy, PASS@k, and token efficiency, plus some notes on hardware choices (RTX 5090 vs RTX 6000) and what actually matters once you run long contexts with concurrent queries.

I used the same quantization script I released last week:

I released my quantized models here:

-   [Quantized Olmo 3](https://huggingface.co/collections/kaitchup/quantized-olmo-3)
    

[Read more](https://kaitchup.substack.com/p/quantizing-olmo-3-most-efficient)