---
title: "Deep Learning Weekly: Issue 419"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-08-28T15:00:57.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-419"
word_count: 930
estimated_read_time: 5
---

This week in deep learning, we bring you [Anthropic launches Claude for Chrome in limited beta](https://venturebeat.com/ai/anthropic-launches-claude-for-chrome-in-limited-beta-but-prompt-injection-attacks-remain-a-major-concern/), [How a 20-Year-Old Algorithm Can Help Us Understand Transformer Embeddings](https://ai.stanford.edu/blog/db-ksvd/), and [a paper on Memento: Fine-tuning LLM Agents without Fine-tuning LLMs](https://arxiv.org/abs/2508.16153).

You may also enjoy [ByteDance Seed Open-Sources VeOmni, Unlocking Any Modality Model Training](https://seed.bytedance.com/en/blog/bytedance-seed-open-sources-veomni-unlocking-any-modality-model-training), [A scalable framework for evaluating health language models](https://research.google/blog/a-scalable-framework-for-evaluating-health-language-models/), [a paper on Memp: Exploring Agent Procedural Memory](https://www.arxiv.org/abs/2508.06433), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Anthropic launches Claude for Chrome in limited beta](https://venturebeat.com/ai/anthropic-launches-claude-for-chrome-in-limited-beta-but-prompt-injection-attacks-remain-a-major-concern/)**

Anthropic has begun testing a Chrome browser extension that allows Claude to take control of users’ web browsers.

**[ByteDance Seed Open-Sources VeOmni, Unlocking Any Modality Model Training](https://seed.bytedance.com/en/blog/bytedance-seed-open-sources-veomni-unlocking-any-modality-model-training)**

To advance research and application of omni-modal LLMs, the ByteDance Seed team has unveiled and open-sourced VeOmni, a PyTorch-native omni-modal training framework.

**[Stanford study finds AI has reduced availability of entry-level programming jobs](https://siliconangle.com/2025/08/26/stanford-study-finds-ai-reduced-availability-entry-level-programming-jobs/)**

A new Stanford study suggests that the number of entry-level programming jobs in the U.S. has declined significantly since the launch of ChatGPT.

**[Google rolls out image-to-video capability to Google Vids powered by Veo 3](https://siliconangle.com/2025/08/27/google-rolls-image-video-capability-google-vids-powered-veo-3/)**

Google is updating its AI-enabled video app Google Vids to make it more accessible and powerful for teams to generate and edit video content.

## **MLOps & LLMOps**

**[101 real-world gen AI use cases with technical blueprints](https://cloud.google.com/blog/products/ai-machine-learning/real-world-gen-ai-use-cases-with-technical-blueprints)**

A guide that contains 101 architectural blueprints for various generative AI use cases.

**[8-bit Rotational Quantization: How to Compress Vectors by 4x and Improve the Speed-Quality Tradeoff of Vector Search](https://weaviate.io/blog/8-bit-rotational-quantization)**

A technical blog post about the 8-bit Rotational Quantization method, which compresses vectors by 4x, speeds up vector search, and improves search quality by combining random rotations with scalar quantization.

**[JUDE: LLM-based representation learning for LinkedIn job recommendations](https://www.linkedin.com/blog/engineering/ai/jude-llm-based-representation-learning-for-linkedin-job-recommendations)**

A post introducing JUDE, LinkedIn's production platform for generating and serving high-quality, fine-tuned LLM embeddings for job recommendations.

**[A Practical Guide for Choosing the Right Vector Database for Your AI Applications](https://milvus.io/blog/choosing-the-right-vector-database-for-your-ai-apps.md#Benchmarking-in-Practice)**

A comprehensive guide providing a practical decision framework for choosing the right vector database for AI applications.

## **Learning**

**[How a 20-Year-Old Algorithm Can Help Us Understand Transformer Embeddings](https://ai.stanford.edu/blog/db-ksvd/)**

An insightful blog post from the Stanford AI Lab explaining how a modified 20-year-old algorithm, KSVD (specifically DB-KSVD), can be effectively scaled to understand transformer embeddings.

**[A scalable framework for evaluating health language models](https://research.google/blog/a-scalable-framework-for-evaluating-health-language-models/)**

An innovative blog post detailing a scalable framework using Adaptive Precise Boolean rubrics for evaluating health language models..

**[The 10 Steps for product AI generation with Gemini 2.5 Flash](https://www.philschmid.de/gemini-image-generation-product)**

A practical guide demonstrating 10 use cases for AI image generation using Gemini 2.5 Flash.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[salesforce/causalai](https://github.com/salesforce/causalai)**

An open-source Python library for causal analysis using observational data

## **Papers & Publications**

**[Memp: Exploring Agent Procedural Memory](https://www.arxiv.org/abs/2508.06433)**

**Abstract:**

Large Language Models (LLMs) based agents excel at diverse tasks, yet they suffer from brittle procedural memory that is manually engineered or entangled in static parameters. In this work, we investigate strategies to endow agents with a learnable, updatable, and lifelong procedural memory. We propose Memp that distills past agent trajectories into both fine-grained, step-by-step instructions and higher-level, script-like abstractions, and explore the impact of different strategies for Build, Retrieval, and Update of procedural memory. Coupled with a dynamic regimen that continuously updates, corrects, and deprecates its contents, this repository evolves in lockstep with new experience. Empirical evaluation on TravelPlanner and ALFWorld shows that as the memory repository is refined, agents achieve steadily higher success rates and greater efficiency on analogous tasks. Moreover, procedural memory built from a stronger model retains its value: migrating the procedural memory to a weaker model yields substantial performance gains.

**[Memento: Fine-tuning LLM Agents without Fine-tuning LLMs](https://arxiv.org/abs/2508.16153)**

**Abstract:**

In this paper, we introduce a novel learning paradigm for Adaptive Large Language Model (LLM) agents that eliminates the need for fine-tuning the underlying LLMs. Existing approaches are often either rigid, relying on static, handcrafted reflection workflows, or computationally intensive, requiring gradient updates of LLM model parameters. In contrast, our method enables low-cost continual adaptation via memory-based online reinforcement learning. We formalise this as a Memory-augmented Markov Decision Process (M-MDP), equipped with a neural case-selection policy to guide action decisions. Past experiences are stored in an episodic memory, either differentiable or non-parametric. The policy is continually updated based on environmental feedback through a memory rewriting mechanism, whereas policy improvement is achieved through efficient memory reading (retrieval). We instantiate our agent model in the deep research setting, namely \\emph{Memento}, which attains top-1 on GAIA validation (87.88% Pass@3) and 79.40% on the test set. It reaches 66.6% F1 and 80.4% PM on the DeepResearcher dataset, outperforming the state-of-the-art training-based method, while case-based memory adds 4.7% to 9.6% absolute points on out-of-distribution tasks. Our approach offers a scalable and efficient pathway for developing generalist LLM agents capable of continuous, real-time learning without gradient updates, advancing machine learning towards open-ended skill acquisition and deep research scenarios.

**[VibeVoice Technical Report](https://arxiv.org/abs/2508.19205)**

**Abstract:**

This report presents VibeVoice, a novel model designed to synthesize long-form speech with multiple speakers by employing next-token diffusion, which is a unified method for modeling continuous data by autoregressively generating latent vectors via diffusion. To enable this, we introduce a novel continuous speech tokenizer that, when compared to the popular Encodec model, improves data compression by 80 times while maintaining comparable performance. The tokenizer effectively preserves audio fidelity while significantly boosting computational efficiency for processing long sequences. Thus, VibeVoice can synthesize long-form speech for up to 90 minutes (in a 64K context window length) with a maximum of 4 speakers, capturing the authentic conversational \`\`vibe'' and surpassing open-source and proprietary dialogue models.