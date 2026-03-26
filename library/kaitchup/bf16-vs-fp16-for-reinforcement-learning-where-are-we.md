---
title: "BF16 vs FP16 for Reinforcement Learning: Where Are We?"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-07T16:47:49.000Z"
source_url: "https://kaitchup.substack.com/p/bf16-vs-fp16-for-reinforcement-learning"
word_count: 1086
estimated_read_time: 6
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup, I discuss the current state of the BF16 vs FP16 debate for RL and MiniMax-M2’s “Interleaved Thinking”.

\---

### Book Update

If you’ve already purchased the book, the next update will land in your inbox on Monday. This release includes:

-   A full review of all chapters
    
-   Refreshed notebooks
    
-   A new section on NVFP4 quantization
    
-   A short chapter on efficient inference with vLLM
    

Everything is now bundled into a single 140-page PDF plus 9 companion notebooks.

One chapter is still in progress: LLM Evaluation. It’s one of the most important topics of the book. I’ll publish this chapter in December.

You can still grab the book at 30% off until November 30.

\---

### At NeurIPS

I’ll be at NeurIPS in San Diego, December 3–6. If you’re around, let’s meet up!

\---

A recent arXiv paper, “[Defeating the Training-Inference Mismatch via FP16](https://arxiv.org/abs/2510.26788)” (October 31, 2025), argues that BF16’s lower mantissa precision introduces small rounding errors during autoregressive generation, which can have a large impact during RL.

Because rollouts and training often run on different engines, for example vLLM for inference and PyTorch FSDP for training, those BF16 rounding differences cause the rollout policy to diverge from the training policy, biasing gradients, destabilizing learning with reward collapse, and creating a deployment gap. The proposed fix is to switch to FP16, which has more mantissa bits and reduces rounding error, stabilizing training without algorithmic changes.

[

![](https://substackcdn.com/image/fetch/$s_!MWEW!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ba8aecc-3287-48c1-8ef8-4c5c37030369_1644x974.png)



](https://substackcdn.com/image/fetch/$s_!MWEW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ba8aecc-3287-48c1-8ef8-4c5c37030369_1644x974.png)

Though surprising, community experiments largely corroborate the claim.

In detail, the authors trained on NVIDIA A100s using VeRL, Oat, DeepSpeed, and vLLM across GRPO and GSPO.

They attribute the training-inference mismatch to BF16 rounding differences between engines that compound with sequence length, biasing importance sampling ratios and encouraging divergence. Offline analyses report roughly 7.64 token-level KL for BF16 versus 0.32 for FP16, about a 24x reduction, and the mismatch grows with length.

On a sanity set of 1,460 MATH problems where perfect accuracy is reachable and on AIME 2024, BF16 often collapses between about 150 and 600 steps, while FP16 trains stably to near-perfect accuracy without corrective tricks.

BF16 tends to peak early and then diverge. FP16 is typically 1.5 to 2x faster to convergence. Using FP32 inference on top of BF16 training can stabilize results but at roughly three times the compute. The advantage appears tied to lower variance in likelihood ratios and the roughly 24x lower KL with FP16.

*Note: Reactions on X were all over the place: some couldn’t reproduce, some were shocked, some said “of course,” and others confirmed. I leaned on Grok to pull the relevant threads and help me summarize one thing: did people actually replicate the results? For this narrow use case involving X posts, I trust Grok more than other models.*

Many tried to replicate. I saw mostly people reporting that FP16 steadily outperforms BF16 across GRPO, GSPO, LoRA, MoE, and 14B dense models, with smooth reward curves instead of mid-training collapses.

Nonetheless, take the community’s take with a grain of salt. The only thing that really matters is what you see in your own experiments, with your own data.

Practical recommendations:

-   Start here (if you can): use FP16 end-to-end and enable loss scaling, then measure stability and evals on your stack.
    
-   Stick with BF16 if sequences are short, you are on newer GPUs that show minimal mismatch, or you hit rare FP16 overflow post-pretrain.
    

This paper made me curious about the practical impact of all the dtype casting that happens during training. In TRL with QLoRA, for example, you might load fp16 weights, cast embeddings to fp32, then cast back to bf16 for FA2 compatibility, so before training even begins, you’ve already introduced several rounds of rounding. Not catastrophic, but easy to worsen if the trainer or quantization is misconfigured (e.g., a different compute\_dtype in bitsandbytes).

Example of a TRL log for QLoRA (these changes of dtype are all done automatically):

```
skipped Embedding(151936, 2048): 296.75M params
bitsandbytes: will optimize Embedding(151936, 2048) in fp32
skipped Embedding(151936, 2048): 593.5M params
bitsandbytes: will optimize Embedding(151936, 2048) in fp32
skipped: 593.5M params
***** Running training *****
  Num examples = 15,000
  Num Epochs = 1
  Instantaneous batch size per device = 1
  Total train batch size (w. parallel, distributed & accumulation) = 16
  Gradient Accumulation steps = 16
  Total optimization steps = 100
  Number of trainable parameters = 657,195,008
Casting fp32 inputs back to torch.bfloat16 for flash-attn compatibility.
```

I’ll deep dive into this. It’s very interesting, but it won’t be easy to draw conclusions. Potential issues may only be visible with specific GPUs, PyTorch versions, etc.

\---

## MiniMax-M2’s Interleaved Thinking

MiniMax-M2 saw rapid uptake post-launch, but a lot of deployments inadvertently suppress performance. This pattern isn’t unique: Llama 4, GPT-OSS, and Gemma 3 also showed lower accuracy in third-party evaluations than in their papers, caused by issues like misconfigured chat templates, mismatched loading dtypes (BF16 vs. FP16 with Gemma 3), and buggy or non-optimized kernels.

For MiniMax-M2, the biggest pitfall is mishandling “interleaved thinking,” which for M2 means alternating explicit reasoning with tool use and carrying that reasoning forward between steps. Done correctly, this plan → act → reflect loop improves long-horizon planning, self-correction, reliability, and debuggability by preserving hypotheses, constraints, and partial conclusions rather than re-deriving them each turn.

In practice, the failure mode is losing prior-round reasoning across multi-turn interactions. A common cause is the OpenAI Chat Completions pattern, which doesn’t natively support passing reasoning content back, even though Anthropic’s API does. Many community implementations still omit sending previous “thinking” for non-Claude models. When that state is dropped, M2’s cumulative understanding breaks down, state drift rises, and planning degrades, especially in tool-heavy workflows and run-and-fix loops.

[

![Image](https://substackcdn.com/image/fetch/$s_!NK_2!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab5b7d16-d425-4256-8d30-9abad1736ec6_2000x1280.png "Image")



](https://substackcdn.com/image/fetch/$s_!NK_2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab5b7d16-d425-4256-8d30-9abad1736ec6_2000x1280.png)

Using the OpenAI-compatible interface for M2, the API returns the model’s reasoning in a separate reasoning\_details field and allows you to pass that field back in subsequent requests, maintaining a complete chain of thought through multiple tool calls for more accurate judgment and planning.

You can find code examples here:

[M2 Tool Use & Interleaved Thinking](https://platform.minimax.io/docs/guides/text-m2-function-call#openai-sdk)

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   ⭐Data-Efficient RLVR via Off-Policy Influence Guidance
    
-   INT v.s. FP: A Comprehensive Study of Fine-Grained Low-bit Quantization Formats
    
-   Parallel Loop Transformer for Efficient Test-Time Computation Scaling
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!