---
title: "Deep Learning Weekly: Issue 425"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-10-09T15:03:10.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-425"
word_count: 969
estimated_read_time: 5
---

This week in deep learning, we bring you [RTEB: A New Standard for Retrieval Evaluation](https://huggingface.co/blog/rteb), [Building Multi-Agent Systems with Crew AI and Weaviate](https://weaviate.io/blog/building-multi-agent-systems), and [a paper on MCPMark: A Benchmark for Stress-Testing Realistic and Comprehensive MCP Use](https://www.arxiv.org/abs/2509.24002).

You may also enjoy [Introducing the Gemini 2.5 Computer Use model](https://blog.google/technology/google-deepmind/gemini-computer-use-model/), [Petri: An open-source auditing tool to accelerate AI safety research](https://alignment.anthropic.com/2025/petri/), [a paper on TaTToo: Tool-Grounded Thinking PRM for Test-Time Scaling in Tabular Reasoning](https://arxiv.org/abs/2510.06217) and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing the Gemini 2.5 Computer Use model](https://blog.google/technology/google-deepmind/gemini-computer-use-model/)**

The DeepMind team released Gemini 2.5 Computer Use, a new specialized model built on Gemini 2.5 Pro, capable of interacting with user interfaces.

**[IBM releases Granite 4 series of Mamba-Transformer language models](https://siliconangle.com/2025/10/03/ibm-releases-granite-4-series-mamba-transformer-language-models/)**

IBM open-sourced Granite 4, a series of language models that combines elements of two different neural network architectures.

**[Google launches its AI vibe-coding app Opal in 15 more countries](https://techcrunch.com/2025/10/07/google-launches-its-ai-vibe-coding-app-opal-in-15-more-countries/)**

Google is expanding access to Opal, an AI vibe-coding app which lets you create mini web apps using text prompts, to 15 more countries.

## **MLOps & LLMOps**

**[Give Your AI Agents Deep Understanding — Creating the LLMS.txt with a Multi-Agent ADK Solution](https://medium.com/google-cloud/give-your-ai-agents-deep-understanding-creating-the-llms-txt-with-a-multi-agent-adk-solution-e5ae24bbd08b)**

An article about designing and building a multi-agent system using Google’s ADK that automatically generates llms.txt files to give AI agents a structured understanding of code repositories.

**[Scaling Pinterest ML Infrastructure with Ray: From Training to End-to-End ML Pipelines](https://medium.com/pinterest-engineering/scaling-pinterest-ml-infrastructure-with-ray-from-training-to-end-to-end-ml-pipelines-4038b9e837a0)**

An article about how Pinterest extended Ray across their ML infrastructure with native data transformations, Iceberg bucket joins, and data persistence to accelerate feature development and reduce costs.

**[Building Multi-Agent Systems with Crew AI and Weaviate](https://weaviate.io/blog/building-multi-agent-systems)**

A technical blog post about building complex multi-agent systems using CrewAI for orchestration, leveraging Weaviate for enhanced knowledge retrieval and collaboration.

## **Learning**

**[Petri: An open-source auditing tool to accelerate AI safety research](https://alignment.anthropic.com/2025/petri/)**

An open-source blog post about Petri (Parallel Exploration Tool for Risky Interactions), an auditing framework that uses AI agents to accelerate safety research by testing misaligned model behaviors.

**[Practical LLM Security Advice from the NVIDIA AI Red Team](https://developer.nvidia.com/blog/practical-llm-security-advice-from-the-nvidia-ai-red-team)**

A security blog post sharing practical advice to mitigate common LLM vulnerabilities, including remote code execution, RAG access control issues, and active content rendering.

**[From Word2Vec to LLM2Vec: How to Choose the Right Embedding Model for RAG](https://milvus.io/blog/how-to-choose-the-right-embedding-model-for-rag.md)**

An in-depth guide on selecting the optimal embedding model for Retrieval-Augmented Generation by analyzing eight factors, including tokenization, dimensionality, and training data, to ensure accurate context retrieval.

**[CodeMender: an AI agent for code security](https://deepmind.google/discover/blog/introducing-codemender-an-ai-agent-for-code-security/)**

A research post introducing DeepMind’s CodeMender, an autonomous agent that automatically finds, fixes, and secures critical software vulnerabilities.

**[RTEB: A New Standard for Retrieval Evaluation](https://huggingface.co/blog/rteb)**

An article introducing the Retrieval Embedding Benchmark (RTEB), which uses a hybrid strategy of open and private datasets to reliably measure model generalization for real-world retrieval accuracy

**[​​Speech-to-Retrieval (S2R): A new approach to voice search](https://research.google/blog/speech-to-retrieval-s2r-a-new-approach-to-voice-search/)**

A research post introducing Speech-to-Retrieval (S2R), a new voice search engine architecture that interprets spoken queries directly into retrieval intent, bypassing traditional, error-prone text transcription.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[unslothai/hyperlearn](https://github.com/unslothai/hyperlearn)**

2-2000x faster ML algos, 50% less memory usage, works on all hardware - new and old.

## **Papers & Publications**

## **[MCPMark: A Benchmark for Stress-Testing Realistic and Comprehensive MCP Use](https://www.arxiv.org/abs/2509.24002)**

**Abstract:**

MCP standardizes how LLMs interact with external systems, forming the foundation for general agents. However, existing MCP benchmarks remain narrow in scope: they focus on read-heavy tasks or tasks with limited interaction depth, and fail to capture the complexity and realism of real-world workflows. To address this gap, we propose MCPMark, a benchmark designed to evaluate MCP use in a more realistic and comprehensive manner. It consists of 127 high-quality tasks collaboratively created by domain experts and AI agents. Each task begins with a curated initial state and includes a programmatic script for automatic verification. These tasks demand richer and more diverse interactions with the environment, involving a broad range of create, read, update, and delete (CRUD) operations. We conduct a comprehensive evaluation of cutting-edge LLMs using a minimal agent framework that operates in a tool-calling loop. Empirical results show that the best-performing model, gpt-5-medium, reaches only 52.56% pass@1 and 33.86% pass^4, while other widely regarded strong models, including claude-sonnet-4 and o3, fall below 30% pass@1 and 15% pass^4. On average, LLMs require 16.2 execution turns and 17.4 tool calls per task, significantly surpassing those in previous MCP benchmarks and highlighting the stress-testing nature of MCPMark.

**[TaTToo: Tool-Grounded Thinking PRM for Test-Time Scaling in Tabular Reasoning](https://arxiv.org/abs/2510.06217)**

**Abstract:**

Process Reward Models (PRMs) have recently emerged as a powerful framework for enhancing the reasoning capabilities of large reasoning models (LRMs), particularly in the context of test-time scaling (TTS). However, their potential for supervising LRMs on tabular reasoning domains remains underexplored. Through detailed empirical analyses, we identify that existing PRMs, though widely adopted for supervising text-only reasoning steps, struggle with table-specific operations such as sub-table retrieval and schema interaction, leading to critical performance bottlenecks. To address this limitation, we propose TaTToo, a novel table-grounded PRM framework that (i) reasons explicitly over tabular reasoning steps and (ii) integrates tool-based verification to provide precise reward supervision. Concretely, we first design a scalable data curation pipeline that constructs over 60k high-quality step-level annotations by integrating table verification rationales with tool-based executions. Building on the collected data, we train TaTToo with a dual-stage paradigm: cold-start supervised fine-tuning to capture tool-use reasoning patterns, followed by reinforcement learning with tool-grounded reward shaping to align our model with table-based verification. We provide a comprehensive evaluation of the policy improvement induced by our newly designed PRM. Across 5 challenging tabular reasoning benchmarks covering numerical reasoning, fact-checking, and data analysis, TaTToo improves downstream policy LRMs by 30.9% at inference, surpasses strong PRM baselines such as Qwen-2.5-Math-PRM-72B with only 8B parameters, and demonstrates strong generalizability across diverse TTS strategies.