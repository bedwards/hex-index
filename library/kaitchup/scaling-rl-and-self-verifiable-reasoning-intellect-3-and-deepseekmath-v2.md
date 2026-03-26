---
title: "Scaling RL and Self-Verifiable Reasoning: INTELLECT-3 and DeepSeekMath-V2"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-28T17:53:18.000Z"
source_url: "https://kaitchup.substack.com/p/scaling-rl-and-self-verifiable-reasoning"
word_count: 1496
estimated_read_time: 8
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup, I discuss:

-   INTELLECT-3: A Better GLM-4.5-Air
    
-   DeepSeekMath-V2: A New Math Model to Verify Mathematical Proof
    

\---

I’ll be at NeurIPS in San Diego next week!  
If you’d like me to attend specific talks or ask questions to certain authors, or if you have particular recommendations on what to see, let me know in the comments. I’ll mainly focus on work around quantization, PEFT, and evaluation, and I’ll share a full report with all the interesting things I learn.

Also, since San Diego is quite far from my little corner of the French countryside, I’ll probably skip my usual Monday article and publish it on Tuesday/Wednesday instead.

\---

### Black Friday Subscription Discount

For Black Friday, I’m offering a **30% discount** on the yearly subscription to *The Kaitchup*:

With this subscription, you get instant access to all the AI notebooks (180+), articles, and tutorials (200+).

\---

## INTELLECT-3: A Better GLM-4.5-Air

GLM models are very popular now as they perform well on most tasks. Among open-weight models, I prefer them over recent DeepSeek and Kimi models.

The GLM-4.5-Air is far smaller, and thus easier to run, than the GLM 4.6, but it is 4 months old! Thanks to prime intellect, we just got a very good update.

INTELLECT-3 is a 106B-parameter MoE model (12B active) trained end-to-end (not really end-to-end, but they market it like this) with RLVR on top of GLM-4.5-Air.

-   [PrimeIntellect/INTELLECT-3](https://huggingface.co/PrimeIntellect/INTELLECT-3)
    

The work is primarily about infrastructure: it exposes a production-style RL stack for long-context, tool-using models, not just a checkpoint.

The stack covers asynchronous RL, standardized environments, and large-scale sandboxed code execution, all built around open-weight models. The result is a reproducible recipe for scaling RLVR to 512 H200 GPUs with long contexts and agentic behavior. No, this recipe is not for everyone. Using prime-intellect GPU pricing, that’s ~$1,300/hour. They mentioned they used these GPUs for 2 months, so that’s nearly a $1M model, if you want to do the same in the cloud.

### RLVR stack and system design

The core engine is [prime-rl](https://github.com/PrimeIntellect-ai/prime-rl), their asynchronous off-policy RL framework that splits responsibilities across a CPU orchestrator, a trainer, and an inference pool. Training uses FSDP2-based data parallelism and torchtitan-style parallelism for MoE models. And inference uses a fleet of OpenAI-compatible vLLM servers extended to accept hot weight updates. The orchestrator is stateless and cheap: it streams rollouts from inference, forms batches, feeds the trainer, and pushes new weights back.

This async RL significantly reduces the cost of RLVR training. It leverages many of the optimizations recently pushed in vLLM for faster RL.

-   **Asynchronous off-policy RL**: inference never blocks on training. It generates rollouts from slightly stale policies while the trainer updates. The orchestrator tracks rollout “age” and discards data beyond a small off-policy horizon to keep learning stable.
    
-   **Continuous batching with in-flight weight updates**: instead of fixed batches, a pool of concurrent requests is kept full. When new weights arrive, they are swapped into the inference servers even while other rollouts are in flight. This keeps GPU utilization high at 65k+ context lengths.
    
-   **Multi-client vLLM orchestration**: each inference node is treated as a separate server, and the orchestrator round-robins requests across them, avoiding the scaling limits of vLLM’s built-in multi-node mode.
    

On the optimization side, the stack reuses the **Muon** optimizer from pretraining but adapts it to sharded gradients under FSDP via all-to-all redistribution rather than collective gathers, so optimizer state remains balanced across ranks. I have never used Muon, as it doesn’t seem to work well for PEFT methods and short fine-tuning, but it is increasing in popularity for pre-training and long post-training.

### Training recipe, algorithm, and what’s new

Training uses two SFT stages followed by RL, all with open or open-derived data.

SFT-1 targets general STEM reasoning and long-form traces. SFT-2 adds agentic SFT with tool use, stateful tasks, and extended contexts.

RL is then run on a 60-node (512 H200) cluster with grouped rollouts (multiple samples per prompt), online difficulty-based sampling, and an off-policy cap of a few steps to keep trainer and inference aligned.

The RL algorithm is a **masked token-level importance sampling** variant: log-ratio terms are applied per token only inside a fixed importance band. Tokens outside that band are masked, and rollouts are dropped if any token’s ratio is too small. This per-token, double-sided masking is the main mechanism that keeps asynchronous off-policy training stable. Ablations with related methods lacking this masking show reward collapses under similar off-policyness.

Empirically, INTELLECT-3 reaches high scores on AIME-2024/2025 and LiveCodeBench, matching or surpassing larger models on math and coding while using only 12B active parameters at inference. Benchmarks continue improving at the end of training, suggesting the recipe is compute-limited.

### Quantization

I’m quantizing the model with LLM Compressor, using all the recipes I presented here:

I’ve also found this NVFP4 version that works well (tested with the GSM8k benchmark):

-   [Firworks/INTELLECT-3-nvfp4](https://huggingface.co/Firworks/INTELLECT-3-nvfp4)
    

*Note: vLLM crashes when loading it. It doesn’t know which kernel to use.* `export VLLM_USE_FLASHINFER_MOE_FP4=1` *works. The model runs with a single RTX Pro 6000.*

\---

## DeepSeekMath-V2: A New Math Model to Verify Mathematical Proof

The paper introduces DeepSeekMath-V2, a theorem-proving model designed around self-verifiable mathematical reasoning rather than final-answer accuracy.

The first [DeepSeek Math](https://arxiv.org/abs/2402.03300) was a collection of excellent ideas, like GRPO, that are now the default in many training pipelines. Naturally, everyone is expecting a lot from this new paper/model.

With this new version, their goal was to make LLMs both generate and *critically check* natural-language proofs, so they can be used on problems where no reference solution or numeric final answer is available. To do this, the authors build a proof verifier, a meta-verifier that evaluates the verifier’s analyses, and a proof generator that learns to reason in a way that satisfies these verifiers.

-   Paper: [DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning](https://github.com/deepseek-ai/DeepSeek-Math-V2/blob/main/DeepSeekMath_V2.pdf)
    
-   Model: [deepseek-ai/DeepSeek-Math-V2](https://huggingface.co/deepseek-ai/DeepSeek-Math-V2)
    

Their first main contribution is an LLM-based proof verifier trained to identify issues in proofs and assign discrete quality scores (0, 0.5, or 1) according to expert-designed rubrics. The authors construct a “cold start” dataset by scraping proof-style contest problems from Art of Problem Solving, generating candidate proofs with a base model, and having human experts score them. They then train the verifier with reinforcement learning using rewards that enforce output format and alignment between the predicted proof score and the human label, so the verifier must both describe issues and give a calibrated overall score.

The second key contribution is meta-verification, a separate model that evaluates the verifier’s analyses themselves. This meta-verifier checks if the issues identified by the verifier actually exist in the proof and whether they justify the assigned score, again with a rubric and RL-based training. Its feedback is folded back into the verifier’s reward, so the verifier is penalized for hallucinating issues or mischaracterizing errors. The authors leverage this setup to build an automated labeling pipeline: they generate multiple verifier analyses per proof, run multiple meta-verifier passes to validate those analyses, and then assign proof labels based on consistent low or high scores, replacing human annotation in later training iterations.

Then, there is the proof generator that learns to perform *self-verification* using the verifier as a reward model.

During training, the generator is prompted to produce both a proof and a self-analysis in the same format as the verifier, including a self-assigned score. The reward combines:

1.  The verifier’s score on the proof
    
2.  How well the self-assigned score matches the verifier
    
3.  The meta-verifier’s assessment of the self-analysis
    

This setup encourages the generator to honestly acknowledge and fix errors, rather than overclaim correctness, and creates a feedback loop where better verification induces better generation and vice versa, optimized with GRPO over several iterations.

I won’t write about the evaluations shown in the report, as my knowledge of the benchmarks they used is too limited. I’d need much more time to dive into this.

We can reuse several ideas from DeepSeekMath-V2, and the model itself, for RL training:

-   Use a **verifier model** that doesn’t just say “right/wrong” but explains what is wrong and gives a rubric-based score. This could be used for code review, safety checks, or checking reasoning quality.
    
-   Add a **meta-verifier** that checks whether the verifier’s feedback is real and justified, which helps avoid fake or exaggerated error reports and makes automatic evaluation more reliable.
    
-   Train the main model with **self-verification**, where it must solve a task, then critique and score its own answer, and gets rewarded when this matches the verifier/meta-verifier. This pushes the model to be more “honest” and explicit about its own mistakes.
    
-   Combine these into an **automatic labeling pipeline**, where verifier + meta-verifier agreement is used to create training labels at scale, reducing the need for constant human annotation in many domains.
    

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   ⭐Nemotron Elastic: Towards Efficient Many-in-One Reasoning LLMs
    
-   Think-at-Hard: Selective Latent Iterations to Improve Reasoning Language Models
    
-   ATLAS: A High-Difficulty, Multidisciplinary Benchmark for Frontier Scientific Reasoning
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!