---
title: "Why Increasing Batch Size Doesn’t Always Speed Up Training"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-07T01:56:07.000Z"
source_url: "https://kaitchup.substack.com/p/why-increasing-the-batch-size-doesnt"
word_count: 738
estimated_read_time: 4
---

[

![](https://substackcdn.com/image/fetch/$s_!g8q1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F899a242a-8444-4115-8918-e05a1350607d_1536x1024.png)



](https://substackcdn.com/image/fetch/$s_!g8q1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F899a242a-8444-4115-8918-e05a1350607d_1536x1024.png)
*Image generated with ChatGPT*

When training a language model, each training step feeds the model a batch of token sequences and uses the resulting gradients to update the parameters. Bigger batches sound appealing: they average gradients over more examples (less noise) and keep the GPU busier by processing multiple sequences in parallel.

The catch is memory. Large batches quickly exhaust GPU memory, so we often have to simulate them with gradient accumulation: run several small micro-batches (e.g., 4 examples at a time), sum their gradients, then apply a single update. Four micro-batches of 4 gives you an effective batch of 16, without ever fitting 16 examples on the GPU at once.

Intuitively, if you have enough memory, you might expect that just cranking the micro-batch up to 16 would be almost 4x faster than “4 x 4 with accumulation.” In reality, it often isn’t. Past a point, larger per-device batches can slow training down due to many reasons. The result is counterintuitive but common: higher “utilization” on paper, worse throughput on the clock. This is even more apparent when working with small devices, such as consumer GPUs.

This article explains why. We’ll walk through the **five main reasons** why big batches slow down training and show **when it actually makes sense to increase micro-batch size versus relying on gradient accumulation**.

# Reason #1: Padding Blow-Up with Variable Lengths

When a micro-batch of size *B* has sequences with lengths *L1, L2, ..., LB*, let:

*Lmax = max(L1, ..., LB)*

Most training stacks pad every sequence in that micro-batch up to *Lmax*.

We have the following:

-   Useful tokens (what you care about): *sum(Li)*
    
-   Actual number of tokens (because of padding): *B \* Lmax*
    
-   Padding waste (tokens): *B \* Lmax - sum(Li)*
    
-   Waste fraction: *1 - sum(Li) / (B \* Lmax)*
    

With batch\_size = 1, *Lmax = L1*, so waste is basically zero. With batch\_size = 8, a single long sample forces seven shorter ones to run at its length in every layer.

Let’s see with two examples.

#### Example A: 4k outlier at batch size 8

8 sequences of 8 different lengths (number of tokens) in one micro-batch:  
512, 520, 530, 560, 600, 640, 650, 4000

-   Useful tokens: 8012 (summing the length of all the sequences)
    
-   Computed tokens (all padded to 4000, the longest sequences): 8 \* 4000 = 32000
    
-   Wasted compute: 32000 - 8012 = 23988 → about 75% padding waste
    

Batch size = 1 would run each sample at its own length, so ~0% padding waste.

#### Example B: 8k outlier at batch size 8

Lengths:  
900, 950, 1000, 1050, 1100, 1150, 1200, 8000

-   Useful tokens: 15350
    
-   Computed tokens (all padded to 8000): 8 \* 8000 = 64000
    
-   Wasted compute: 64000 - 15350 = 48650 → about 76% padding waste
    

These are typical for SFT/RL training with long-tail lengths. The slowdown is harsher as max\_seq\_len grows. Can you imagine when you fine-tune for reasoning, i.e., with samples containing long reasoning traces mixed with much shorter traces? Most of the compute and memory is wasted on masked tokens.

Two facts:

1.  The expected maximum length in a batch increases as batch size *B* increases (especially with heavy-tailed, real-world data).
    
2.  A handy rule of thumb: expected padding waste per batch grows like  
    *B \* (E\[Lmax in a batch of size B\] - E\[L\])*  
    So larger *B* and wider length spread both increase padding.
    

That aligns with the observation that you may have when fine-tuning LLMs, e.g.:

-   BS=1, GA=32 → zero padding.
    
-   BS=8, GA=4 → big padding blow-ups.
    

#### How to Not Waste Memory with Padding?

We already saw how to do this in a previous article. The answer is with *packing*:

Now, TRL has several packing strategies that remove almost completely the need for padding.

> Instead of aligning sequences to a fixed length, it flattens all input sequences into a single contiguous tensor. Additional metadata, most importantly `cu_seqlens` (cumulative sequence lengths), is used to indicate where each individual sequence begins and ends.
> 
> This method is especially effective when training large models with frameworks like Hugging Face’s TRL combined with FlashAttention 2, which can compute attention in a highly optimized, segmented manner using this metadata.

In practice, I saw a 70% reduction in training time with FFD packing. If you don’t pack your sequences and train with long training samples, you are likely wasting a lot of compute.

## Reason #2: Activation Memory Pressure → More Recomputation

Peak activation memory scales roughly with `batch_size × seq_len` (and with layer count & hidden size). For instance, jumping from BS=1 → BS=8 increases live activations by ~8×. That often exceeds the comfortable headroom, so your stack enables or intensifies activation checkpointing (a.k.a., gradient checkpointing).

**Why does that hurt speed?**

[Read more](https://kaitchup.substack.com/p/why-increasing-the-batch-size-doesnt)