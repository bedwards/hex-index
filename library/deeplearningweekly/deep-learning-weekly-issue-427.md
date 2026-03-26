---
title: "Deep Learning Weekly: Issue 427"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-10-22T15:01:11.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-427"
word_count: 934
estimated_read_time: 5
---

This week in deep learning, we bring you [Introducing Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5), [The State of Open Models](https://www.interconnects.ai/p/state-of-open-models-2025), and [a paper on TOUCAN: Synthesizing 1.5M Tool-Agentic Data from Real-World MCP Environments](https://arxiv.org/abs/2510.01179v1).

You may also enjoy [How a Gemma model helped discover a new potential cancer therapy pathway](https://blog.google/technology/ai/google-gemma-ai-cancer-therapy-discovery/), [A Definition of AGI](https://www.agidefinition.ai/), [a paper on Training Software Engineering Agents and Verifiers with SWE-Gym](https://machinelearning.apple.com/research/training-software), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Claude Haiku 4.5 \\ Anthropic](https://www.anthropic.com/news/claude-haiku-4-5)**

Anthropic introduced Claude Haiku 4.5, the latest version of their smallest model with state-of-the-art computer-use and coding capabilities at one-third the cost.

**[How a Gemma model helped discover a new potential cancer therapy pathway](https://blog.google/technology/ai/google-gemma-ai-cancer-therapy-discovery/)**

Google launched a new 27 billion parameter foundation model for single-cell analysis built on the Gemma family of open models.

**[Method teaches generative AI models to locate personalized objects](https://news.mit.edu/2025/method-teaches-generative-ai-models-locate-personalized-objects-1016)**

Researchers from MIT and elsewhere have introduced a new training method that teaches vision-language models to localize personalized objects in a scene.

**[Introducing Veo 3.1 and advanced capabilities in Flow](https://blog.google/technology/ai/veo-updates-flow/)**

Google introduced a significantly updated version of their filmmaking tool called Veo 3.1, which brings richer audio, more narrative control, and enhanced realism.

**[Announcing Tinker - Thinking Machines Lab](https://thinkingmachines.ai/blog/announcing-tinker/)**

Thinking Machines Lab launched Tinker, a flexible API for fine-tuning language models, which provides researchers control over the algorithms and data without having to think about the complexity of distributed training.

## **MLOps & LLMOps**

**[Legacy data to RAG : Modernise Your Apps with Amazon Sagemaker Unified Studio](https://weaviate.io/blog/sagemaker-studio-rag)**

A blog post about modernizing applications by integrating Amazon SageMaker Unified Studio and Weaviate to facilitate efficient hybrid search and context-aware RAG queries on legacy data.

## **Learning**

**[The State of Open Models - by Nathan Lambert](https://www.interconnects.ai/p/state-of-open-models-2025)**

An insightful talk reflecting on the landscape of open models, discussing the dominance of Chinese AI, the fade of Llama, and strategies for steering the future direction of open-source AI.

**[A Definition of AGI](https://www.agidefinition.ai/)**

A quantifiable definition of Artificial General Intelligence (AGI) as matching a well-educated adult’s cognitive versatility, operationalized through the Cattell-Horn-Carroll theory and psychometric batteries.

**[Evaluating Gemini 2.5 Deep Think’s math capabilities](https://epoch.ai/blog/deep-think-math)**

A critical article evaluating Gemini 2.5 Deep Think’s math capabilities, noting its impressive skill in complex computations and background knowledge, but highlighting its limitations in creative problem-solving.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything)**

RAG-Anything: All-in-One RAG Framework

## **Papers & Publications**

**[TOUCAN: Synthesizing 1.5M Tool-Agentic Data from Real-World MCP Environments](https://arxiv.org/abs/2510.01179v1)**

**Abstract:**

Large Language Model (LLM) agents are rapidly emerging as powerful systems for automating tasks across domains. Yet progress in the open-source community is constrained by the lack of high quality permissively licensed tool-agentic training data. Existing datasets are often limited in diversity, realism, and complexity, particularly regarding multi-tool and multi-turn interactions. To address this gap, we introduce Toucan, the largest publicly available tool-agentic dataset to date, containing 1.5 million trajectories synthesized from nearly 500 real-world Model Context Protocols (MCPs). Unlike prior work, Toucan leverages authentic MCP environments to generate diverse, realistic, and challenging tasks with trajectories involving real tool execution. Our pipeline first produces a broad spectrum of tool-use queries using five distinct models, applies model-based quality filtering, and then generates agentic trajectories with three teacher models using two agentic frameworks. Rigorous rule-based and model-based validation ensures high-quality outputs. We also introduce three extension mechanisms to further diversify tasks and simulate multi-turn conversations. Models fine-tuned on Toucan outperform larger closed-source counterparts on the BFCL V3 benchmark and push the Pareto frontier forward on MCP-Universe Bench.

**[Training Software Engineering Agents and Verifiers with SWE-Gym](https://machinelearning.apple.com/research/training-software)**

**Abstract:**

We present SWE-Gym, the first environment for training real-world software engineering (SWE) agents. SWE-Gym contains 2,438 real-world Python task instances, each comprising a codebase with an executable runtime environment, unit tests, and a task specified in natural language. We use SWE-Gym to train language model based SWE agents, achieving up to 19% absolute gains in resolve rate on the popular SWE-Bench Verified and Lite test sets. We also experiment with inference-time scaling through verifiers trained on agent trajectories sampled from SWE-Gym. When combined with our fine-tuned SWE agents, we achieve 32.0% and 26.0% on SWE-Bench Verified and Lite, respectively, reflecting a new state-of-the-art for open-weight SWE agents. To facilitate further research, we publicly release SWE-Gym, models, and agent trajectories.

**[Diffusion Transformers with Representation Autoencoders](https://arxiv.org/abs/2510.11690)**

**Abstract:**

Latent generative modeling, where a pretrained autoencoder maps pixels into a latent space for the diffusion process, has become the standard strategy for Diffusion Transformers (DiT); however, the autoencoder component has barely evolved. Most DiTs continue to rely on the original VAE encoder, which introduces several limitations: outdated backbones that compromise architectural simplicity, low-dimensional latent spaces that restrict information capacity, and weak representations that result from purely reconstruction-based training and ultimately limit generative quality. In this work, we explore replacing the VAE with pretrained representation encoders (e.g., DINO, SigLIP, MAE) paired with trained decoders, forming what we term Representation Autoencoders (RAEs). These models provide both high-quality reconstructions and semantically rich latent spaces, while allowing for a scalable transformer-based architecture. Since these latent spaces are typically high-dimensional, a key challenge is enabling diffusion transformers to operate effectively within them. We analyze the sources of this difficulty, propose theoretically motivated solutions, and validate them empirically. Our approach achieves faster convergence without auxiliary representation alignment losses. Using a DiT variant equipped with a lightweight, wide DDT head, we achieve strong image generation results on ImageNet: 1.51 FID at 256x256 (no guidance) and 1.13 at both 256x256 and 512x512 (with guidance). RAE offers clear advantages and should be the new default for diffusion transformer training.