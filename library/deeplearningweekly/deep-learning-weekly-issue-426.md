---
title: "Deep Learning Weekly: Issue 426"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-10-15T15:01:15.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-426"
word_count: 864
estimated_read_time: 5
---

This week in deep learning, we bring you [Introducing Gemini Enterprise](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise), [A small number of samples can poison LLMs of any size](https://www.anthropic.com/research/small-samples-poison), and [a paper on Self-Adapting Language Models](https://arxiv.org/abs/2506.10943).

You may also enjoy [Microsoft AI’s MAI-Image-1](https://microsoft.ai/news/introducing-mai-image-1-debuting-in-the-top-10-on-lmarena/), [Agents 2.0: From Shallow Loops to Deep Agents](https://www.philschmid.de/agents-2.0-deep-agents), [a paper on Making, not Taking, the Best of N](https://cohere.com/research/papers/making-not-taking-the-best-of-n-2025-10-01), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Gemini Enterprise](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise)**

Google introduced Gemini Enterprise, a complete, AI-optimized platform that includes a no-code workbench, a centralized government framework, as well as various integrations to existing business applications.

**[Introducing MAI-Image-1, debuting in the top 10 on LMArena](https://microsoft.ai/news/introducing-mai-image-1-debuting-in-the-top-10-on-lmarena/)**

Microsoft AI announced MAI-Image-1, their first image generation model developed entirely in-house, debuting in the top 10 text-to-image models on LMArena.

**[Salesforce announces Agentforce 360 as enterprise AI competition heats up](https://techcrunch.com/2025/10/13/salesforce-announces-agentforce-360-as-enterprise-ai-competition-heats-up/)**

Salesforce announced the latest version of Agentforce 360, which includes new ways to instruct, build, and deploy AI agents.

**[Kernel raises $22M to power browser infrastructure for AI agents](https://siliconangle.com/2025/10/09/kernel-raises-22m-power-browser-infrastructure-ai-agents/)**

Kernel has raised $22 million in funding to scale its platform so AI agents can reliably navigate, persist, and use the web.

## **MLOps & LLMOps**

**[Agents 2.0: From Shallow Loops to Deep Agents](https://www.philschmid.de/agents-2.0-deep-agents)**

An architectural post about the shift from “Shallow Agents” to “Deep Agents” that utilize explicit planning, sub-agents, and persistent memory to solve complex, multi-step problems.

**[Rearchitecting Letta’s Agent Loop: Lessons from ReAct, MemGPT, & Claude Code](https://www.letta.com/blog/letta-v1-agent)**

A technical post detailing the rearchitecture of Letta’s agent loop, transitioning from older models like MemGPT to a V1 design leveraging modern LLM capabilities such as native reasoning.

**[Securing your agents with authentication and authorization](https://blog.langchain.com/agent-authorization-explainer/)**

An article on securing agents by implementing authentication and authorization (AuthN/AuthZ), addressing their dynamic access needs.

## **Learning**

**[A small number of samples can poison LLMs of any size \\ Anthropic](https://www.anthropic.com/research/small-samples-poison)**

An article about data-poisoning attacks shows that as few as 250 malicious documents can backdoor LLMs of any size, challenging the assumption that attackers need to control a percentage of training data.

**[When Good Models Go Bad](https://weaviate.io/blog/when-good-models-go-bad)**

A strategic blog post analyzing the high costs and risks of upgrading vector embedding models at scale, offering a decision framework that balances cutting-edge performance with stability and operational constraints.

**[Towards a Typology of Strange LLM Chains-of-Thought](https://www.lesswrong.com/posts/qgvSMwRrdqoDMJJnD/towards-a-typology-of-strange-llm-chains-of-thought)**

A post outlining six causes for why LLMs trained with RLVR develop strange Chains-of-Thought, including hypotheses like Spandrels and Context Refresh.

**[SuperOffload: Unleashing the Power of Large-Scale LLM Training on Superchips](https://pytorch.org/blog/superoffload-unleashing-the-power-of-large-scale-llm-training-on-superchips/)**

A research blog post introducing SuperOffload, which leverages Superchip architectures like NVIDIA GH200 to boost LLM training throughput up to 4x higher than existing offloading solutions.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[EleutherAI/sparsify](https://github.com/EleutherAI/sparsify)**

Sparsify transformers with SAEs and transcoders

## **Papers & Publications**

**[Self-Adapting Language Models](https://arxiv.org/abs/2506.10943)**

**Abstract:**

Large language models (LLMs) are powerful but static; they lack mechanisms to adapt their weights in response to new tasks, knowledge, or examples. We introduce Self-Adapting LLMs (SEAL), a framework that enables LLMs to self-adapt by generating their own finetuning data and update directives. Given a new input, the model produces a self-edit-a generation that may restructure the information in different ways, specify optimization hyperparameters, or invoke tools for data augmentation and gradient-based updates. Through supervised finetuning (SFT), these self-edits result in persistent weight updates, enabling lasting adaptation. To train the model to produce effective self-edits, we use a reinforcement learning loop with the downstream performance of the updated model as the reward signal. Unlike prior approaches that rely on separate adaptation modules or auxiliary networks, SEAL directly uses the model’s own generation to control its adaptation process. Experiments on knowledge incorporation and few-shot generalization show that SEAL is a promising step toward language models capable of self-directed adaptation.

**[Making, not Taking, the Best of N](https://cohere.com/research/papers/making-not-taking-the-best-of-n-2025-10-01)**

**Abstract:**

Obtaining high-quality generations in modern LLMs has largely been framed as a selection problem: identifying a single winning generation from a diverse pool of N samples, the Best-of-N (BoN). Yet, this approach is inherently zero-sum, discarding diverse and potentially useful information from the pool. Instead, we explore a collaborative setup, where all candidates can potentially contribute to the final winning generation. To this end, we propose Fusion-of-N (FusioN): a method that uses a general LLM judge to synthesize the most informative elements of each sample into a single final answer. We compare FusioN to BoN in two settings, (i) test-time scaling, where we sample and aggregate from a single model at test-time (ii) synthetic data generation, where we fuse samples from a pool of diverse teachers to improve a student model. We extensively benchmark both setups across 11 languages, 3 diverse tasks and varying model scales. Across the bench, FusioN consistently outperforms BoN showing versatility and robustness both in test-time scaling and in downstream gains from synthetic data generation. We also perform extensive analysis on FusioN, where it shows surprising strengths and robustness under challenging settings. These results show that we should shift how we think about evaluating and utilizing LLM generations from a monolithic measure of quality, to embracing their polylithic nature. This shift allows us to integrate diverse strengths, unlock latent potential, and achieve improvements that were previously inaccessible through selection alone.