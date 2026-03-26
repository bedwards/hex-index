---
title: "Efficient LLMs at Scale: My NeurIPS Week in KV Caches, Spec Decoding, and FP4"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-12-14T20:50:09.000Z"
source_url: "https://kaitchup.substack.com/p/efficient-llms-at-scale-my-neurips"
word_count: 4751
estimated_read_time: 24
---

One week after getting back from NeurIPS in San Diego, my full report is here. I had a lot to process and write up.

If you’re not familiar with it, NeurIPS has been *the* flagship conference for AI research for years, with tracks on deep learning, optimization, theory, and a growing number of applications. Ten years ago, it already felt massive with around 4,000 participants. This year, the organizers announced more than **29,000 registrations** (including virtual attendees, and 500 people attending from the Mexico satellite venue,[1](#footnote-1) but not counting on-site late registrations). I’ve been to dozens of research conferences in my life, and I’ve never seen anything close to this scale.

Downtown San Diego, especially the “historic” Gaslamp district, was completely taken over. Every hotel lobby, bar, and restaurant seemed to be hosting some variation of the same conversation about LLMs and agents. French and US border agents at airports had the same remarks: “Are you going to THIS conference?”. I’m sure the local businesses did very well. It felt like every second table was a mini-NeurIPS in itself.

[

![](https://substackcdn.com/image/fetch/$s_!Hlnx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9aabc6e8-9557-4d4c-ac2a-e30a3d7b57e0_1225x603.png)



](https://substackcdn.com/image/fetch/$s_!Hlnx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9aabc6e8-9557-4d4c-ac2a-e30a3d7b57e0_1225x603.png)

In this article, I want to share what I took away from the week, not a complete overview of NeurIPS, it’s impossible, but a view from my corner of it. My work is mostly about *adapting* LLMs: fine-tuning, quantization, evaluation, and efficient inference. So that’s where I naturally gravitated: the sessions, posters, and hallway conversations on scaling, compression, and inference tricks. I spent (almost) no time in the more theoretical or classical computer vision tracks.[2](#footnote-2) There was also a “Machine Learning” track that I didn’t visit.

I’ll structure this report around a few themes:

-   **Highlights around three topics**
    
    -   KV Cache: The Enemy Number One
        
    -   Speculative Decoding with Trees
        
    -   FP4 at Training Time: Four Bits Are (Almost) Enough
        
-   **Good paper special mentions:**
    
    -   How to do AdamW with a batch size of 1
        
    -   How leaderboards are gamed
        
-   **Comments on Yejin Choi’s keynote, which perfectly captured the year**
    
-   ***How to survive (and enjoy) a conference as big as NeurIPS***
    

One important disclaimer: the *official* hot topic of this year was clearly **reinforcement learning**. But you won’t find much RL in this write-up. That’s partly practical: the RL area was packed, and having the kind of in-depth discussions I’d want there would have eaten most of my conference time. It’s also because I’ve already read and played with many of the RL works that interested me the most. And, maybe most importantly (and slightly against the current hype), I’m not a fan of the way RL is often being run right now for LLMs. That’s also why Yejin Choi’s talk was so interesting to me, but I’ll come back to that later below.

I’m sure you will find many other people writing online about the RL track at NeurIPS.

## Shrink This KV Cache!

The pressure for faster, cheaper inference has only grown now that reasoning-style models are becoming the norm. Users don’t want to wait minutes for an answer. But for every new token, the model has to attend over the full KV history (i.e., the KV cache). With long reasoning traces, that history can easily exceed 10,000 tokens, translating to gigabytes of tensors that must be read at every decoding step. Once you’re serving many requests in parallel, GPU memory bandwidth quickly becomes the bottleneck.

As a result, an entire mini-subfield around KV cache compression has emerged in this NeurIPS cycle.

### One recipe, many flavors

At a high level, all of these papers are doing almost the **same** thing:

1.  **Score how important each stored token (or group of tokens) is.**  
    The score is usually derived from attention, or from some learned proxy for attention.
    
2.  **Use the scores to shrink the cache.**  
    Keep the most important entries as full KV pairs, approximate or share the “borderline” ones, and drop the rest.
    
3.  **Patch up whatever was lost (only if needed).**  
    Either by:
    
    -   occasionally recomputing attention on a smaller subset of tokens,
        
    -   asking a helper model to supply missing attention weights,
        
    -   redesigning the architecture so fewer distinct values are needed in the first place, or
        
    -   exploiting structure in the domain (e.g., visual scales, semantic chunks).
        

The differences that make each paper feel “new” are mostly *engineering choices* along a few axes:

-   **What is the importance signal?**  
    Raw attention weights from a small observation window, temporally-predicted attention, reconstruction error, redundancy between key vectors, cross-layer context embeddings, or architectural priors.
    
-   **When is importance computed?**  
    Just once during prefill, online during decoding, once per reusable cache, or incrementally as you stream a million-token context.
    
-   **Do we recompute?**  
    Some methods never recompute, others occasionally recompute attention to recalibrate, and others explicitly recompute full KV for a selected subset of tokens.
    
-   **What is the granularity?**  
    Individual tokens, semantic chunks, long CoT segments, cross-layer embeddings.
    

I made several subsections to group the methods. And sorry for the low-quality photos of the posters, I’ve put them here only for illustration.

\---

### Helper models and learned predictors

**[SmallKV: Small Model Assisted Compensation of KV Cache Compression for Efficient LLM Inference](https://arxiv.org/abs/2508.02751)** takes the most literal “helper model” approach.

SmallKV starts from a standard attention-based importance signal: the large model’s cumulative attention over past tokens. Based on this, it splits history into *critical*, *marginal* and *unimportant* tokens. Critical tokens keep full K and V in the big model. Unimportant tokens are dropped.

But if you simply evict them, you lose lots of “weak but collectively important” context. SmallKV instead runs a **small LLM in parallel**, keeps its full KV cache, and aligns attention heads between big and small models on the prompt prefix. During decoding, the big model stores only **V** for marginal tokens and uses the small model’s attention scores as a proxy for how those marginal tokens should be weighted.

So, here:

-   Importance signal: true attention in the large model (plus similarity of small vs. large attention).
    
-   When: prefill + online decoding.
    
-   Patch-up: approximate missing attention with the small model rather than recomputing the big one.
    

They show that this keeps accuracy close to full KV under aggressive budgets while boosting throughput over previous eviction schemes.

[

![](https://substackcdn.com/image/fetch/$s_!vp-A!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a5789ac-07ca-48a8-8c9c-568c62b47685_1362x808.png)



](https://substackcdn.com/image/fetch/$s_!vp-A!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a5789ac-07ca-48a8-8c9c-568c62b47685_1362x808.png)

\---

Compared to the work above, **[AttentionPredictor: Temporal Patterns Matter for KV Cache Compression](https://arxiv.org/abs/2502.04077)** replaces the small LLM with a tiny **convolutional predictor** that learns to forecast attention over time.

The authors log attention maps from a base model and train a shared conv network that, given a short history of attention patterns (and some side information), predicts the next-step attention scores. At inference, you can ask this predictor, “which tokens will matter at the next step?” without paying for full attention everywhere.

Most of the time, token selection and KV compression are driven by these predictions, not by exact attention. Periodically, the model computes *true* attention, compares it to the predictor’s output, and uses that to recalibrate. So:

-   Importance signal: predicted attention scores, capturing **temporal patterns** rather than just single-step maps.
    
-   When: online during decoding, with occasional ground-truth refresh.
    
-   Patch-up: recalibration via periodic full attention.
    

Conceptually, this is extremely close to SmallKV: the big model outsources attention “intuition” to a cheaper module. The difference is that SmallKV’s helper is another LLM, while AttentionPredictor uses a specialized CNN trained just for this purpose.

[

![](https://substackcdn.com/image/fetch/$s_!_syu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11ffde9c-459f-4364-bf62-6c912f0bd6bd_1704x1039.png)



](https://substackcdn.com/image/fetch/$s_!_syu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11ffde9c-459f-4364-bf62-6c912f0bd6bd_1704x1039.png)

\---

**[KVzip: Query-Agnostic KV Cache Compression with Context Reconstruction](https://arxiv.org/abs/2505.23416)** is the same template again, but now the importance signal is **reconstruction error**.

KVzip is designed for KV reuse scenarios where you want to build a cache once (for a long document, a user profile, a system prompt) and reuse it across many future queries. Because those queries are unknown at compression time, KVzip can’t rely on query-dependent attention. Instead, it asks: “If I try to reconstruct the original context using only a subset of KV entries, which entries are indispensable?”

Practically, they use the LLM itself to reconstruct the context from candidate compressed caches and define an importance score based on how much each token’s removal hurts reconstruction. Low-impact entries are evicted.

-   Importance signal: contribution to **context reconstruction** quality, using the same LLM.
    
-   When: once per context, *before* any queries arrive.
    
-   Patch-up: none during decoding. The whole point is to avoid any per-query recomputation.
    

The core idea is still “assign an importance score and prune,” just with a different proxy for importance and a different operating point (multi-query reuse instead of single-query decoding).

[

![](https://substackcdn.com/image/fetch/$s_!AUGA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36295a95-dd6e-42e5-a73b-309a0734bbc8_1717x1212.png)



](https://substackcdn.com/image/fetch/$s_!AUGA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36295a95-dd6e-42e5-a73b-309a0734bbc8_1717x1212.png)

\---

### Training-free, decoding-time compression

**[R-KV: Redundancy-aware KV Cache Compression for Reasoning Models](https://arxiv.org/abs/2505.24133)** focuses on extremely long chain-of-thought traces from reasoning models, where a lot of the KV cache is redundant self-reflection.

R-KV still starts from attention: recent tokens attend back to earlier ones, and that gives an importance score. But it adds a second ingredient: a **redundancy score** based on similarity between key vectors. Tokens that look like near-duplicates of later ones get penalized. The joint score (importance − redundancy) drives eviction.

All decisions are made on the fly during decoding. Once a token is gone, the method doesn’t try to reconstruct it. So the recipe here is:

-   Importance signal: attention from a small observation window, corrected by redundancy in key space.
    
-   When: streaming, during decoding.
    
-   Patch-up: none.
    

For math-reasoning models, they can cut KV cache to around 10–16% of full size while matching or even slightly *exceeding* full-KV performance, thanks to noise reduction (according to the authors, but to me this sounds more like an evaluation artefact).

[

![](https://substackcdn.com/image/fetch/$s_!Gb2Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e00b325-8efc-4bd4-809f-2648e6858222_1645x1211.png)



](https://substackcdn.com/image/fetch/$s_!Gb2Z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e00b325-8efc-4bd4-809f-2648e6858222_1645x1211.png)

\---

**[ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference](https://arxiv.org/abs/2502.00299)** makes one simple but important observation: if you prune tokens independently, you often destroy local semantics (e.g., keeping only half the tokens of an in-context example).

ChunkKV still uses attention from an “observe window” of recent tokens to score earlier positions, just like many eviction baselines. The difference is that it groups tokens into **chunks** (short contiguous segments) and sums attention within each chunk. Entire chunks are kept or discarded together, ensuring that semantically coherent units survive.

They also notice that the set of important indices is similar across neighboring layers and therefore **reuse the same indices across layers** to cut computation.

In our unified view:

-   Importance signal: attention from an observe window, but aggregated at a *chunk* level.
    
-   When: online, typically after prefill or as the context grows.
    
-   Patch-up: none; the preservation comes from chunk granularity rather than recomputation.
    

Once you see it this way, ChunkKV and R-KV are really two variants of the same core idea: measure importance with attention, adjust the score (for redundancy in R-KV or for chunk structure in ChunkKV), and then prune.

[

![](https://substackcdn.com/image/fetch/$s_!PwV9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1dac65aa-6745-4ab9-9c1f-2b86ca7e0f40_968x1123.png)



](https://substackcdn.com/image/fetch/$s_!PwV9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1dac65aa-6745-4ab9-9c1f-2b86ca7e0f40_968x1123.png)

\---

**[Compress, Gather, and Recompute: REFORMing Long-Context Processing in Transformers](https://arxiv.org/abs/2506.01215)** takes the same skeleton but is more explicit about the final “patch-up” step.

REFORM handles contexts up to around a million tokens with a two-phase pipeline:

-   In the compress phase, the model reads the sequence in chunks while maintaining a small, compressed KV cache and building cross-layer context embeddings for tokens. These embeddings summarize how each token interacts across layers and heads.
    
-   In the gather + recompute phase, when a query at the end of the context needs to use earlier information, REFORM compares the query against all context embeddings, identifies the most relevant segments (with some pooling to keep contiguous spans), and recomputes full KV for just those selected tokens.
    

So, again in the shared recipe:

-   Importance signal: similarity between a query representation and pre-built context embeddings (which themselves come from attention interactions).
    
-   When: embeddings built online during the initial pass. The selection happens when we need to answer a query.
    
-   Patch-up: recompute full KV *only* for the selected segments.
    

Compared to R-KV and ChunkKV, REFORM leans harder into the “patch-up” side: it’s willing to pay extra compute later to avoid storing huge KVs now.

\---

### Modality- and architecture-aware variants

**[Memory-Efficient Visual Autoregressive Modeling with Scale-Aware KV Cache Compression](https://arxiv.org/abs/2505.19602)** introduces **ScaleKV**, which is essentially KV compression tuned to the peculiarities of visual autoregressive models like the Infinity family.

Here the key observation is that attention patterns differ drastically across **layers and scales** in a multi-scale image generator: some “drafter” layers spread attention broadly across scales, while later “refiner” layers mostly attend locally at the current resolution. ScaleKV analyzes these patterns and assigns different KV budgets per layer and scale. In practice, they can cut KV memory to about 10% of the naive baseline while preserving pixel-level fidelity.

Here:

-   Importance signal: offline statistics of attention selectivity by scale and layer.
    
-   When: before deployment; at inference, the budget is mostly fixed.
    
-   Patch-up: none; the win comes from smarter *budget allocation* rather than dynamic eviction.
    

The same core idea is still there, some KV entries matter more than others, but are exploited at a coarser, modality-aware level.

[

![](https://substackcdn.com/image/fetch/$s_!7XAU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc41e7792-2090-4957-a612-a1faeac9f7c6_1657x1035.png)



](https://substackcdn.com/image/fetch/$s_!7XAU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc41e7792-2090-4957-a612-a1faeac9f7c6_1657x1035.png)

\---

Finally, [](https://arxiv.org/abs/2510.16807)**[Improving Model Representation and Reducing KV Cache via Skip Connections with First Value Heads](https://arxiv.org/abs/2510.16807)** (SkipV1Former) bakes KV savings into the **architecture** itself.

From the second block onward, each layer in SkipV1Former reuses half of its value heads directly from the *first* layer’s values, instead of computing a full new set of Vs. So the number of distinct V projections, and therefore the amount of V cache that must be stored, drops substantially, while representation quality actually improves.

Now we’re no longer scoring tokens for eviction, but most of the value information is **shared** across layers, so why store it repeatedly?

-   Importance signal: first-layer values are important enough to reuse.
    
-   When: designed once at model construction and no runtime scoring.
    
-   Patch-up: unnecessary. The model is trained to live within a smaller KV footprint from the start.
    

Empirically, they report around 25% KV reduction with better perplexity than a standard Transformer, and close to 50% V-cache savings when combined with other tricks like Group-Query Attention.

[

![](https://substackcdn.com/image/fetch/$s_!XX5i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb2886d9-9b3f-45e8-b6fe-fb6c0c165112_1611x1122.png)



](https://substackcdn.com/image/fetch/$s_!XX5i!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb2886d9-9b3f-45e8-b6fe-fb6c0c165112_1611x1122.png)

\---

## Speculative Decoding, with Trees

After KV compression, I’ve found that *speculative decoding* was also trending: getting more tokens per second by letting a cheap process “guess ahead” and then asking a more expensive model to only check those guesses.

I went to see and discuss four papers in particular.

They differ mainly in *what* they speculate (tokens vs steps vs whole responses), *where* the candidates come from (a model vs a data structure), and *how smart* the verification is.

1.  **Classical speculative decoding** uses a small “draft” model to generate a short run of future tokens, then asks the big model to verify them in one batched pass, accepting tokens up to the first mismatch.
    
2.  The NeurIPS 2025 papers extend this by tweaking three things:
    
    -   the **structure of the guesses** (trees, suffix trees, reasoning steps, full answers),
        
    -   the **verification strategy** (exact token equality vs semantic matching vs ensembles of weak verifiers),
        
    -   and the **systems aspect** (state-space models, agentic workloads, concurrency budgets).
        
3.  Conceptually, they’re all approximating the same ideal:
    

> *“What is the longest prefix we can safely commit to, without changing the distribution of the target model?”*

Everything else, tree scan kernels, suffix trees, Weaver ensembles, Lookahead’s step-level math, is machinery to make that yes/no decision as aggressively and cheaply as possible.

\---

**[STree: Speculative Tree Decoding for Hybrid State-Space Models](https://arxiv.org/abs/2505.14969)** takes tree-based speculative decoding (as in SpecInfer-style token trees) and makes it work efficiently for state-space models (SSMs) and hybrid SSM–Transformer architectures.

Existing speculative SSM methods can backtrack state, but if you want to verify a *token tree* (multiple branches and depths), you have to unroll that tree into many sequences and run the SSM on all of them. That leads to repeated tokens, duplicated states, and big memory/latency overhead.

STree’s key move is to **pack the tree into a single sequence plus a “tree mask”**:

-   They represent a prefix token tree as a flat token sequence and a topology-aware mask that encodes which tokens lie on the path to which others. Using this mask, they derive an accumulated transition matrix that effectively “walks” the SSM along the relevant branches without recomputing states for each path.
    
-   A custom **tree scan kernel** computes outputs for all nodes of the packed tree in one pass, while caching the right intermediate activations for later backtracking.
    

The speculative decoding loop is the same as usual: a small draft model builds a token tree, the target model verifies it in bulk with the STree kernel, and an activation-replay step restores the correct state before the first rejected token. The novelty is purely in *how efficiently* they can evaluate that tree for SSMs and hybrid models.

Empirically, STree delivers higher tokens/sec and lower memory than unrolled tree baselines, and consistently beats “vanilla” speculative decoding as the tree grows deeper and temperatures increase.

[

![](https://substackcdn.com/image/fetch/$s_!d3Cn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4da0cfcf-34df-4a86-9ad4-49c2a7a6d23a_1715x1124.png)



](https://substackcdn.com/image/fetch/$s_!d3Cn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4da0cfcf-34df-4a86-9ad4-49c2a7a6d23a_1715x1124.png)

**[SuffixDecoding: Extreme Speculative Decoding for Emerging AI Applications](https://arxiv.org/abs/2411.04975)** [](https://arxiv.org/abs/2411.04975)pushes the speculative decoding idea into a model-*free* regime for agentic workloads.

Instead of a small draft model, SuffixDecoding uses a large **suffix tree** of previous outputs and current prompts:

-   It builds a global suffix tree over historical generations (plus a per-request tree for the current session), stored in cheap CPU RAM.
    
-   At each step, it matches the current suffix of the context against this tree to find long repeated patterns. Long matches imply highly predictable continuations.
    

Verification is standard speculative decoding: the big LLM verifies the speculation tree, accepts tokens up to the first mismatch, and continues.

This is very similar to STree:

-   There is a generator (now a suffix tree over logs rather than a neural draft model),
    
-   there is a verification step (the target LLM),
    
-   and there is a controller (an adaptive scheduling).
    

The paper’s real contribution is where those speculative tokens come from and which workloads this favors. On agentic applications like SWE-Bench and their internal AgenticSQL pipeline, where outputs are structured and repetitive, SuffixDecoding reaches up to 5.3x faster decoding than strong model-based approaches like EAGLE-2/3 and about 4.5x end-to-end speedup on SWE-Bench, without hurting task success.

[

![](https://substackcdn.com/image/fetch/$s_!8XWl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ea6ca68-61a7-4a3f-89f6-765bc1d88988_1380x1254.png)



](https://substackcdn.com/image/fetch/$s_!8XWl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ea6ca68-61a7-4a3f-89f6-765bc1d88988_1380x1254.png)

**[Shrinking the Generation-Verification Gap with Weak Verifiers](https://arxiv.org/abs/2506.18203)** shifts attention from the generator to the **verifier side** of the pipeline.

Most speculative decoding diagrams quietly assume a “good enough” verifier: maybe the target model itself, maybe an LLM-as-a-judge, maybe a simple matching rule. In practice, strong verifiers are expensive (humans, formal tools), and lightweight ones are noisy. This paper asks:

> If we’re going to make generation depend heavily on verification anyway, how do we build the strongest possible verifier out of weak pieces?

They introduce **Weaver**, a framework that combines many *weak* verifiers (reward models, judges, heuristic checkers) into a single, stronger verifier:

-   They treat each weak verifier as a noisy labeler and use weak supervision techniques to estimate its accuracy and bias from unlabeled data.
    
-   These estimates define **weighted ensembles** that significantly outperform naive averaging, because the system learns which verifiers are more reliable on which distributions.
    
-   To make this usable at scale, they train a compact 400M cross-encoder on the ensemble’s scores, so at test time you only run one cheap model instead of many large ones.
    

In terms of our speculative-decoding blueprint, Weaver doesn’t change the generator at all. It does:

-   Better verification → better candidate selection in repeated sampling or spec-style settings.
    
-   They show that with Weaver, Llama 3.3 70B plus verifier ensembles achieve around 87.7% average accuracy on reasoning and math tasks, roughly matching o3-mini-level performance without retraining the generator.
    

That’s still the same loop: speculative generation, then verification as the bottleneck.

[

![](https://substackcdn.com/image/fetch/$s_!-DeC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9184a94e-de10-47d1-8a6a-69497610cd90_1553x1124.png)



](https://substackcdn.com/image/fetch/$s_!-DeC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9184a94e-de10-47d1-8a6a-69497610cd90_1553x1124.png)

**[Scaling Speculative Decoding with Lookahead Reasoning](https://arxiv.org/abs/2506.19830)** zooms in on reasoning models that generate long chain-of-thoughts and asks whether token-level speculative decoding is enough.

The authors first show a theoretical ceiling: in classical token-level speculative decoding, if each drafted token is accepted with probability, the expected speedup is capped. Beyond a certain speculative block length, the probability that *all* tokens in the block are correct falls exponentially, so pushing for longer blocks doesn’t buy you more speed.

Their key observation is that reasoning models naturally organize outputs into **steps** (multi-token segments separated by, say, blank lines). That suggests a coarser-grained form of speculation:

-   A small draft model generates several *future reasoning steps* ahead (not just tokens).
    
-   The target model generates its own steps in parallel.
    
-   A **semantic verifier** compares each drafted step to the corresponding target step and accepts the longest prefix of matching steps.
    

They call this framework **Lookahead Reasoning**:

-   There is a synchronous version (generate all draft steps, then run the target in parallel) and an asynchronous version that overlaps draft, target, and verification to better exploit hardware concurrency.
    
-   They analyze step-level speedups and show that step-level and token-level speculation are *orthogonal* axes of parallelism. Under realistic assumptions about acceptance rates and draft costs, the optimal strategy is a **hybrid**: use both step-level Lookahead and token-level speculative decoding and allocate parallelism between them.
    

Verification is once again central. They experiment with:

-   LLM-as-a-judge for nuanced semantic comparison,
    
-   embedding-based similarity for cheaper approximate matching,
    
-   and “target scoring” (using the target model to score candidate steps).
    

On DeepSeek-R1-Distill and Qwen3 reasoning models, Lookahead Reasoning alone gives around 1.0–1.7x speedup while keeping accuracy within roughly 2% of the autoregressive baseline. Combining it with n-gram-based speculative decoding lifts speedups up to ~2.1x.

\---

## FP4 at Training Time

When NVIDIA announced the Blackwell generation and its support for accelerated FP4 computation, it was easy to predict that we would find a way to train models with FP4.

Two papers (and maybe more that I missed) at NeurIPS on this: **[FP4 All the Way: Fully Quantized Training of LLMs](https://arxiv.org/abs/2505.19115)** and **[Quartet: Native FP4 Training Can Be Optimal for Large Language Models](https://arxiv.org/abs/2505.14669v1)**.

Both papers start from the same recipe: pick a hardware-realistic FP4 format, carefully choose scaling and rounding so quantization noise doesn’t swamp the gradients, keep just enough higher precision where absolutely necessary (e.g., accumulators), and then show that billion-scale Llama-style models trained in FP4 match BF16 / FP8 baselines on downstream tasks.

I would suspect that some of the commercial models that we have now (like some GPT models) are already trained through, and served in, FP4 because quality is not that significantly different at a large scale, and because serving FP4 models is so much cheaper.

\---

## The Keynote that Summarized this Year of “RL”

Yejin Choi’s keynote, *“The Art of (Artificial) Reasoning”*, really felt like a “state of the union” for LLMs and reasoning: scaling laws, reinforcement learning, small vs large models, and where we’re quietly hitting walls despite all the benchmark wins.

I’ve already written elsewhere that I’m not a big fan of how RL is currently used in the post-training phase of LLMs. Choi’s talk put very clean words and evidence on that discomfort.

She walked through this tension between *scaling laws that tell us “more is more”* and what she called “jagged intelligence”: models that are superhuman on one benchmark and embarrassingly brittle on something adjacent. A lot of current RL-for-reasoning work (including RLVR-style methods) promises to “patch” our standard RL to improve LLMs. She highlighted recent results showing that, while RL can improve sampling efficiency on reasoning tasks, it often **doesn’t create new reasoning patterns**, and in some cases actually *shrinks* the space of reasoning strategies the model uses. If you read recent papers on this topic, you will find that RLVR-style training implies: narrower behavior, nicer curves, not necessarily deeper thinking. So many papers tried to improve this, this year, without succeeding much at imposing a more solid less brittle way to run RLVR.

[

![](https://substackcdn.com/image/fetch/$s_!S3pC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8493881-2150-4a67-869e-67ba0984b69f_960x700.png)



](https://substackcdn.com/image/fetch/$s_!S3pC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8493881-2150-4a67-869e-67ba0984b69f_960x700.png)

[

![](https://substackcdn.com/image/fetch/$s_!bnLS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd8014c5-f33c-40a9-90a2-639d23a67fd5_975x725.png)



](https://substackcdn.com/image/fetch/$s_!bnLS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd8014c5-f33c-40a9-90a2-639d23a67fd5_975x725.png)

This patchwork feeling is very familiar to me. Twelve years ago, when my main research area was machine translation, we were in a similar phase: dozens of papers each year proposing slight variants of the same optimization tricks, reporting small BLEU gains that rarely generalized and almost never became the baseline for the next wave of work. Then neural MT arrived around 2015–2016 and effectively reset the field. The RL ecosystem around LLMs today feels like that to me, just on a much larger scale, with much more money attached, and because of this, I’d expect a significant change in how we run reinforcement learning for LLMs by the end of 2026, rather than just patching up GRPO. When you start seeing even **name collisions** between methods (we already have two different “EPO”s, for example), that’s usually a sign that incremental local fixes are outpacing genuine conceptual progress.

[

![](https://substackcdn.com/image/fetch/$s_!QxxC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04a5faf3-ae4b-43f2-9f1e-3eb2120215d3_786x485.png)



](https://substackcdn.com/image/fetch/$s_!QxxC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04a5faf3-ae4b-43f2-9f1e-3eb2120215d3_786x485.png)

Nonetheless, for some structured tasks and short-horizon rewards, RL genuinely improves behavior while for open-ended reasoning and long chains of thought, it mostly reshapes the probability mass around the same old patterns She also emphasized alternative levers: better pre-training data for reasoning, architectures that model intermediate thoughts more explicitly, methods to distill reasoning into smaller models instead of assuming “bigger + more RL” is always the answer. In other words, she reframed RL as one ingredient in the recipe, something whose “chemistry” with the base model has to be understood, not a magic afterburner you slap on at the end.

So when I say her talk “summed up the year,” I mean it captured this strange moment where everyone is throwing RL at LLMs, the benchmark numbers mostly go up, but a lot of us have a nagging sense that something is off. My personal bet is that the way we apply RL today, late in the pipeline, on narrow reward models, with very fragile evaluators, won’t survive much longer than another year. By the end of 2026, I expect RL around LLMs to look very different: more integrated into pre-training or architecture design, more careful about what it’s actually optimizing, and less about piling on yet another post-training trick.

\---

## Other interesting papers

### Small Batch Size Training for Language Models: When Vanilla SGD Works, and Why Gradient Accumulation Is Wasteful

[This paper](https://arxiv.org/pdf/2507.07101) revisits a very common assumption: that you need large batch sizes and gradient accumulation to train language models stably and efficiently. The authors show that this assumption is mostly a consequence of how optimizers are parameterized, not a property of the models themselves.

The key idea is to think about Adam’s β₂ not as a fixed number, but in terms of a **half-life measured in tokens**. Instead of keeping β₂ constant across batch sizes, they keep the effective token half-life of the second moment fixed when changing batch size, which means β₂ is adjusted when the batch size changes. With this scaling rule, they find that batch sizes all the way down to 1 are stable, robust to hyperparameter choices, and per-FLOP competitive or better than large batch runs.

Once the optimizer is set up this way, very simple methods work well. In the small-batch regime, even **vanilla SGD without momentum** can approach the performance of Adam for LLM pretraining and fine-tuning, while storing no optimizer state. This has clear memory advantages and allows full-parameter fine-tuning at a memory cost similar to parameter-efficient methods. The paper’s practical recommendation is explicit: for most practitioners, use the **smallest batch size that maximizes device throughput**, and avoid gradient accumulation unless you are forced into it by multi-device training constraints.

[

![](https://substackcdn.com/image/fetch/$s_!1hCy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F084c5a04-c81b-4688-8a5b-c6c7cb555522_1723x1023.png)



](https://substackcdn.com/image/fetch/$s_!1hCy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F084c5a04-c81b-4688-8a5b-c6c7cb555522_1723x1023.png)

\---

### Same Task, Different Circuits: Disentangling Modality-Specific Mechanisms in VLMs

[This work](https://arxiv.org/abs/2506.09047) asks: why do vision–language models often perform better on the text version of a task than on the image version of the same task? To answer it, the authors build a set of tasks that exist in parallel textual and visual forms (for example, counting objects in an image versus counting tokens in a text), and then perform mechanistic analysis of the internal “circuits” the model uses in each modality.

They identify task-specific subgraphs (“circuits”) for visual and textual prompts and show that these circuits are **mostly disjoint across modalities**, even though they implement very similar functions when processing query tokens and generating the answer. The main differences appear in how the model processes **data tokens** (image tokens versus text tokens). Visual token representations only become well aligned with analogous textual representations in later layers, which is too late to strongly affect downstream positions.

Based on this, they propose a simple, training-free intervention: back-patching. They run the model once, record later-layer representations of visual tokens, and then patch those activations back into earlier layers in a second forward pass. This test-time change improves the handling of visual prompts and closes about one third (≈32%) of the performance gap between visual and textual variants on their benchmark, on average, without any retraining of the VLM.

[

![](https://substackcdn.com/image/fetch/$s_!6cHX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F683ed278-3c7b-423b-8c8e-51d6190bccc6_1249x681.png)



](https://substackcdn.com/image/fetch/$s_!6cHX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F683ed278-3c7b-423b-8c8e-51d6190bccc6_1249x681.png)

\---

### The Leaderboard Illusion

[This paper](https://arxiv.org/abs/2504.20879) looks at evaluation rather than models. It studies Chatbot Arena as a benchmark and shows that the current leaderboard is systematically biased by private testing practices and unequal data access.

The authors document that some providers can submit many **private variants**, observe their scores, and only keep the best ones public; for example, they identify 27 private LLM variants tested by Meta before the public Llama-4 release. This selective disclosure inflates scores for those providers relative to groups that submit fewer variants.

They also show strong **data asymmetries**. Closed models from large providers are sampled in more Arena “battles” and are removed less often, so they gather much more interaction data than open-weight models. The paper estimates that Google and OpenAI each receive around 19–20% of all Arena data, while 83 open-weight models together receive under 30%. Training on Arena-style data gives large gains: in their experiments, increasing the share of Arena data in training from 0% to 70% more than doubles the win rate on an Arena-like distribution (from about 23.5% to 49.9%), which means access to this data directly improves leaderboard rank.

The conclusion is that the leaderboard can become tuned to **Arena-specific dynamics** rather than general model quality. The paper ends with concrete proposals: prohibit post-submission score retraction, cap the number of private test variants per provider, align removal policies across proprietary and open models, use fairer sampling strategies that reduce bias in which models get evaluated, and make model removals and testing policies transparent.

[

![](https://substackcdn.com/image/fetch/$s_!oVV7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0d323df5-d218-458f-b5c0-f35b0456c0f8_825x687.png)



](https://substackcdn.com/image/fetch/$s_!oVV7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0d323df5-d218-458f-b5c0-f35b0456c0f8_825x687.png)

## How to Enjoy Large Conferences Like NeurIPS (and Survive It)

[Read more](https://kaitchup.substack.com/p/efficient-llms-at-scale-my-neurips)