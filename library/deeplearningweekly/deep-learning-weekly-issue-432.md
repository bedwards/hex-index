---
title: "Deep Learning Weekly: Issue 432"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-11-26T18:01:52.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-432"
word_count: 817
estimated_read_time: 5
---

This week in deep learning, we bring you [Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5), [Continuous batching from first principles](https://huggingface.co/blog/continuous_batching), and [a paper on HunyuanOCR Technical Report](https://arxiv.org/abs/2511.19575).

You may also enjoy [Introducing SAM 3D: Powerful 3D Reconstruction for Physical World Images](https://ai.meta.com/blog/sam-3d/), [Disrupting the first reported AI-orchestrated cyber espionage campaign](https://www.anthropic.com/news/disrupting-AI-espionage), [a paper on General Agentic Memory Via Deep Research](https://arxiv.org/abs/2511.18423), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Claude Opus 4.5 \\ Anthropic](https://www.anthropic.com/news/claude-opus-4-5)**

Anthropic released Claude Opus 4.5, the company’s most intelligent model yet with state-of-the-art performance in coding and agentic tasks.

**[Introducing SAM 3D: Powerful 3D Reconstruction for Physical World Images](https://ai.meta.com/blog/sam-3d/)**

The Meta AI team announced SAM 3D, a release that includes SAM 3D Objects for scene reconstruction and SAM 3D Body for human body estimation.

**[Expanding data residency access to business customers worldwide](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide/)**

OpenAI announced that eligible customers using ChatGPT Enterprise, ChatGPT Edu, or the API Platform in many global markets can now choose local data residency.

**[Fara-7B: An Efficient Agentic Model for Computer Use](https://www.microsoft.com/en-us/research/blog/fara-7b-an-efficient-agentic-model-for-computer-use/)**

The Microsoft AI team announced Fara-7B, their first agentic SLM designed specifically for computer use.

**[Olmo 3: Charting a path through the model flow to lead open-source AI](https://allenai.org/blog/olmo3)**

Ai2 releases OLMo 3, a fully open language model family with complete training data and development pipeline transparency.

**[FLUX.2: Frontier Visual Intelligence](https://bfl.ai/blog/flux-2)**

Black Forest Labs releases FLUX.2, a new image generation model with multi-reference support and 4MP resolution editing.

## **MLOps & LLMOps**.

**[Antigravity and PostgreSQL: No gravity, only vibes | by MCP Toolbox for Databases](https://medium.com/google-cloud/antigravity-and-postgresql-no-gravity-only-vibes-46a7699fd21f)**

An article about using Google Antigravity IDE and Gemini 3 with Model Context Protocol to streamline PostgreSQL database development through natural language interactions.

**[Introducing agentic search in OpenSearch: Transforming data interaction through natural language](https://opensearch.org/blog/introducing-agentic-search-in-opensearch-transforming-data-interaction-through-natural-language/)**

An introduction to agentic search in OpenSearch 3.3, which uses LLM-powered agents and tools to transform data interaction.

## **Learning**

**[Disrupting the first reported AI-orchestrated cyber espionage campaign \\ Anthropic](https://www.anthropic.com/news/disrupting-AI-espionage)**

A critical security report detailing the disruption of the first reported large-scale AI-orchestrated cyber espionage campaign, where a state-sponsored actor used Claude Code agents to execute 80-90% of the attack lifecycle.

**[Reciprocal Rank Fusion and Relative Score Fusion: Classic Hybrid Search Techniques](https://medium.com/mongodb/reciprocal-rank-fusion-and-relative-score-fusion-classic-hybrid-search-techniques-3bf91008b81d)**

An article that delves into two classic hybrid search fusion techniques: Reciprocal Rank Fusion (RRF) and Relative Score Fusion (RSF).

**[Continuous batching from first principles](https://huggingface.co/blog/continuous_batching)**

A foundational article deriving continuous batching from first principles, demonstrating how combining KV caching, chunked prefill, and ragged batching maximizes LLM serving throughput by eliminating wasteful padding.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[HunyuanOCR Technical Report](https://arxiv.org/abs/2511.19575)**

**Abstract:**

This paper presents HunyuanOCR, a commercial-grade, open-source, and lightweight (1B parameters) Vision-Language Model (VLM) dedicated to OCR tasks. The architecture comprises a Native Vision Transformer (ViT) and a lightweight LLM connected via an MLP adapter. HunyuanOCR demonstrates superior performance, outperforming commercial APIs, traditional pipelines, and larger models (e.g., Qwen3-VL-4B). Specifically, it surpasses current public solutions in perception tasks (Text Spotting, Parsing) and excels in semantic tasks (IE, Text Image Translation), securing first place in the ICDAR 2025 DIMT Challenge (Small Model Track). Furthermore, it achieves state-of-the-art (SOTA) results on OCRBench among VLMs with fewer than 3B parameters.

HunyuanOCR achieves breakthroughs in three key aspects: 1) Unifying Versatility and Efficiency: We implement comprehensive support for core capabilities including spotting, parsing, IE, VQA, and translation within a lightweight framework. This addresses the limitations of narrow “OCR expert models” and inefficient “General VLMs”. 2) Streamlined End-to-End Architecture: Adopting a pure end-to-end paradigm eliminates dependencies on pre-processing modules (e.g., layout analysis). This fundamentally resolves error propagation common in traditional pipelines and simplifies system deployment. 3) Data-Driven and RL Strategies: We confirm the critical role of high-quality data and, for the first time in the industry, demonstrate that Reinforcement Learning (RL) strategies yield significant performance gains in OCR tasks.

**[General Agentic Memory Via Deep Research](https://arxiv.org/abs/2511.18423)**

**Abstract:**

Memory is critical for AI agents, yet the widely-adopted static memory, aiming to create readily available memory in advance, is inevitably subject to severe information loss. To address this limitation, we propose a novel framework called general agentic memory (GAM). GAM follows the principle of “just-in time (JIT) compilation” where it focuses on creating optimized contexts for its client at runtime while keeping only simple but useful memory during the offline stage. To this end, GAM employs a duo-design with the following components. 1) Memorizer, which highlights key historical information using a lightweight memory, while maintaining complete historical information within a universal page-store. 2) Researcher, which retrieves and integrates useful information from the page-store for its online request guided by the pre-constructed memory. This design allows GAM to effectively leverage the agentic capabilities and test-time scalability of frontier large language models (LLMs), while also facilitating end-to-end performance optimization through reinforcement learning. In our experimental study, we demonstrate that GAM achieves substantial improvement on various memory-grounded task completion scenarios against existing memory systems.