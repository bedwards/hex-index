---
title: "MiniMax M2 and Kimi-Linear: Why Full Attention Still Wins"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-31T17:46:55.000Z"
source_url: "https://kaitchup.substack.com/p/minimax-m2-and-kimi-linear-why-full"
word_count: 1151
estimated_read_time: 6
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup, let’s talk about linear/hybrid attention vs. full attention.

\---

MiniMax just shipped an open-source, agent- and code-oriented model with about 10B parameters active out of roughly 230B.

-   [MiniMaxAI/MiniMax-M2](https://huggingface.co/MiniMaxAI/MiniMax-M2)
    

The model performs very well on benchmarks.

[

![](https://substackcdn.com/image/fetch/$s_!hknB!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6c534519-e681-44d5-bd7a-1a93e636a485_8676x3593.png)



](https://substackcdn.com/image/fetch/$s_!hknB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6c534519-e681-44d5-bd7a-1a93e636a485_8676x3593.png)

What I want to dig into is this: earlier MiniMax models aligned with the current trend toward hybrid attention (see Qwen3-Next, LFM, Granite 4.0, etc.), but with this release, they’ve **gone back to plain full attention**.

And they justify it pretty convincingly [on X](https://x.com/zpysky1125/status/1983383094607347992) ([original post in Chinese here](https://www.zhihu.com/question/1965302088260104295/answer/1966810157473335067)).

Their core claim is: full attention still wins because it’s the least fragile choice across tasks, model sizes, and inference stacks. “Efficient” attention isn’t dead, it’s just not mature enough to be the default for a system that has to do code, math, agents, multimodality, long-chain reasoning, and RL on top. The problem isn’t the theory but rather the long list of conditions that all have to line up before an “efficient” design is actually efficient in production.

If your real objective is “same quality with fewer tokens,” scaling laws usually give you safer, more predictable gains than swapping out attention.

**Hybrid attention looks good on public leaderboards, but MiniMax says it broke down on higher-order, multi-hop reasoning once they scaled the models**. To even see that, they had to build new internal proxy metrics, and even those can drift as the model or data mixture changes.

Full attention, meanwhile, sits on years of kernel and inference engineering. Linear and sparse attention don’t. To reach the theoretical crossover point where they’re clearly better, you still need:

-   low-precision state that doesn’t nuke stability,
    
-   cache-friendly layouts that match real conversational traffic,
    
-   speculative decoding paths that work with nonstandard attention.
    

Until all of those land together, the speed/price gains get eaten by IO, precision quirks, or serving constraints.

**But their most important point is about evaluation:**

When you change a primitive like attention, you should assume public benchmarks will understate the damage. You need longer, richer, sometimes slower evals to surface regressions in reasoning, agentic behavior, and RL stability. Those evals are very expensive, but without them you can’t honestly claim the model is “efficient,” because whatever you lost will be repaid later as extra engineering, extra data, or extra compute. I 100% agree with that!

[Qwen3-Next is a nice illustration. It’s an 80B model that does well on most public sets, but once you push it, it can fail hard and lose to a model ~3x smaller.](https://kaitchup.substack.com/p/running-qwen3-next-hybrid-attention) My guess is that’s also why Qwen didn’t train it past ~15T tokens. The loss probably flattened, or worse, started to degrade at scale.

So my view is: we’re stuck with full attention as the default until we have an architecture that both scales and learns better. Just making inference cheaper (linear attention), or trying to stay close to full-attention quality (hybrid attention), isn’t enough.

I was going to just say that, but Moonshot AI just dropped a new model with linear attention and very bold claims:

> -   Kimi Delta Attention: A hardware-efficient linear attention mechanism that refines the gated delta rule.
>     
> -   Kimi Linear Architecture: The first hybrid linear architecture to **surpass pure full attention quality across the board**.
>     
> -   Empirical Validation: Scaled, fair comparisons + open-sourced KDA kernels, vLLM integration, and checkpoints.
>     

[

![](https://substackcdn.com/image/fetch/$s_!XSj-!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7666c2dd-8c52-45e3-8b1d-f2ad9f51d9ee_2358x844.png)



](https://substackcdn.com/image/fetch/$s_!XSj-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7666c2dd-8c52-45e3-8b1d-f2ad9f51d9ee_2358x844.png)

-   [moonshotai/Kimi-Linear-48B-A3B-Instruct](https://huggingface.co/moonshotai/Kimi-Linear-48B-A3B-Instruct)
    

A linear-attention architecture that actually beats full attention, and already ships with specialized kernels inside one of the most used inference stacks (vLLM), is **almost the exact opposite of MiniMax’s argument.**

So let’s look closer.

In [Moonshot AI’s own report](https://github.com/MoonshotAI/Kimi-Linear/blob/master/tech_report.pdf), they claim that Kimi Linear outperforms the same model trained with multi-head latent attention (MLA) and with the original gated delta-net (GDN, basically the “linear” flavor Qwen3-Next used).

[

![](https://substackcdn.com/image/fetch/$s_!cGN0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1c3db80-d459-436d-9c67-514297cee2fe_963x918.png)



](https://substackcdn.com/image/fetch/$s_!cGN0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1c3db80-d459-436d-9c67-514297cee2fe_963x918.png)

These results are encouraging, but saying Kimi Linear *beats* full attention is overstated. If you read the tech report, you actually rediscover most of the issues MiniMax raised:

-   **Scale:** all comparisons are at ~1.4T training tokens. That’s well below the regime where fragility usually shows up.
    
-   **Baselines:** there’s no plain, well-tuned full-attention baseline. MLA is strong but not mainstream, and GDN isn’t full attention at all, so it’s hard to call this a clean win.
    
-   **Absolute scores look low:** I know we shouldn’t compare numbers published by different labs, but just to get an order of magnitude, many of their reported scores are below what Qwen3-8B, or even Qwen3-4B (non-thinking), delivers. So “better than full attention” here really means “better than the particular efficient-attention setups they tried.”
    

[

![](https://substackcdn.com/image/fetch/$s_!N5-E!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F60adc283-cdf7-486f-8f86-258853a1a9ea_709x470.png)



](https://substackcdn.com/image/fetch/$s_!N5-E!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F60adc283-cdf7-486f-8f86-258853a1a9ea_709x470.png)

This isn’t very convincing for a 48B model. Results at 1.4T tokens just aren’t enough to support the claims Moonshot AI is making, especially since they didn’t publish the scores for the checkpoint they actually released (the 5.7T-token one), neither in the report nor in the model card (they are/will be probably somewhere).

If we drop the “better than full attention” framing and look at it for what it is, though, Kimi Linear is a good model that makes long-context workloads much cheaper.

> It reduces the need for large KV caches by up to 75% and boosts decoding throughput by up to 6x for contexts as long as 1M tokens.

### More releases this week:

IBM also just released new Hybrid Attention Granite 4.0:

-   [Granite 4.0 Nano Language Models](https://huggingface.co/collections/ibm-granite/granite-40-nano-language-models)
    

There are 1B and 350M models. The performance looks OK overall:

[

![granite-4-nano-chart1](https://substackcdn.com/image/fetch/$s_!IGq3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd2d5af08-0311-4c58-8677-48c0929afbec_3448x1932.png "granite-4-nano-chart1")



](https://substackcdn.com/image/fetch/$s_!IGq3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd2d5af08-0311-4c58-8677-48c0929afbec_3448x1932.png)

*Note: This is an “average” accuracy, which is often skewed by a few benchmarks, i.e., that’s much less informative than per-benchmark accuracy and shouldn’t be seen as showing that a model is better than others.*

I later found they actually averaged the scores of an unusual selection of old benchmarks:

[

![granite-4-nano-chart3](https://substackcdn.com/image/fetch/$s_!oV2X!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c4cc3a0-2920-473d-9abe-0a9a4254c3e1_2726x926.png "granite-4-nano-chart3")



](https://substackcdn.com/image/fetch/$s_!oV2X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c4cc3a0-2920-473d-9abe-0a9a4254c3e1_2726x926.png)

[Third-party evaluation with more standard benchmarks by Artificial Analysis](https://x.com/ArtificialAnlys/status/1983611955668775411/photo/1) shows the models may underperform Qwen3 but is better than LFM2.

More details here: [Granite 4.0 Nano: Just how small can you go?](https://huggingface.co/blog/ibm-granite/granite-4-nano)

\---

Marin 32B also finished training this week. It’s a genuinely open-source model, like OLMo, trained by the Marin community. [Percy Liang even announced it as the best open-source](https://x.com/percyliang/status/1983561556127567911) **[base](https://x.com/percyliang/status/1983561556127567911)** [model so far](https://x.com/percyliang/status/1983561556127567911).

They report results using **Mean Reciprocal Rank (MRR)**, Percy has been pushing MRR over naïvely averaging benchmark scores, and I agree it’s a better signal, even if it’s not perfect:

[

![Image](https://substackcdn.com/image/fetch/$s_!ex1e!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d07d91a-f7e1-4030-bad1-8782a1a7f4bf_1477x621.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!ex1e!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d07d91a-f7e1-4030-bad1-8782a1a7f4bf_1477x621.jpeg)

The full report is a great illustration of how hard it is to train a base model from scratch: failures, bugs, restarts, and a few “this is bad but we can’t explain it so we’re shipping anyway.” Definitely worth reading:

[Marin 32B Retrospective](https://marin.readthedocs.io/en/latest/reports/marin-32b-retro/)

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   ⭐Reasoning with Sampling: Your Base Model is Smarter Than You Think
    
-   BAPO: Stabilizing Off-Policy Reinforcement Learning for LLMs via Balanced Policy Optimization with Adaptive Clipping
    
-   Knocking-Heads Attention
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!