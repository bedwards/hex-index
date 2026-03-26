---
title: "Deep Learning Weekly: Issue 415"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-07-31T15:02:36.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-415"
word_count: 769
estimated_read_time: 4
---

This week in deep learning, we bring you [Evaluating Grok 4’s Math Capabilities](https://epoch.ai/blog/grok-4-math), [Introducing Letta Filesystem](https://www.letta.com/blog/letta-filesystem), and [a paper on ASPERA: A Simulated Environment to Evaluate Planning for Complex Action Execution](https://machinelearning.apple.com/research/aspera).

You may also enjoy [DeepMind's AlphaEarth Foundations](https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/), [Building and evaluating alignment auditing agents](https://alignment.anthropic.com/2025/automated-auditing/), [a paper on SensorLM: Learning the Language of Wearable Sensors](https://arxiv.org/abs/2506.09108), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[AlphaEarth Foundations helps map our planet in unprecedented detail](https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/)**

DeepMind’s new AI model integrates petabytes of Earth observation data to generate a unified data representation that revolutionizes global mapping and monitoring.

**[Introducing Letta Filesystem](https://www.letta.com/blog/letta-filesystem)**

The Letta team announced Letta Filesystem, which provides an interface for agents to organize and reference content from documents like PDFs, transcripts, documentation, and more.

**[New algorithms enable efficient machine learning with symmetric data](https://news.mit.edu/2025/new-algorithms-enable-efficient-machine-learning-with-symmetric-data-0730)**

A new study by MIT researchers shows the first method for machine learning with symmetry that is provably efficient in terms of both the amount of computation and data needed.

**[Thunderforge Brings AI Agents to Wargames](https://spectrum.ieee.org/thunderforge-ai-wargames-dod)**

The US Department of Defense is leading an experimental project, Thunderforge, to build a custom agentic system for critiquing war plans across different military domains.

**[Chinese startup Z.ai releases cost-efficient GLM-4.5 reasoning model](https://siliconangle.com/2025/07/28/chinese-startup-z-ai-releases-cost-efficient-glm-4-5-reasoning-model/)**

Z.ai, a Chinese startup, open-sourced GLM-4.5, a reasoning model that it claims is more cost-efficient than DeepSeek’s R1.

**[AI-native clinical documentation startup Ambience Healthcare raises $243M](https://siliconangle.com/2025/07/29/ai-native-clinical-documentation-startup-ambience-healthcare-raises-243m/)**

Ambience Healthcare, a provider of AI-powered clinical documentation tools, closed on $243 million in Series C funding.

## **MLOps & LLMOps**

**[Build workflows with Langchain and Weaviate v3](https://weaviate.io/blog/enterprise-workflow-langchain-weaviate)**

A practical blog post explaining how to build scalable AI workflows by combining LangChain's orchestration layer with Weaviate's vector search.

**[Traditional RAG vs. Agentic RAG—Why AI Agents Need Dynamic Knowledge to Get Smarter](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/)**

A technical blog post comparing traditional RAG with agentic RAG for AI agents, highlighting the need for dynamic knowledge.

## **Learning**

**[Building and evaluating alignment auditing agents](https://alignment.anthropic.com/2025/automated-auditing/)**

A comprehensive blog post from Anthropic about developing and evaluating LLM-based auditing agents that autonomously assess alignment issues in frontier models like Claude 4.

**[Evaluating Grok 4’s Math Capabilities](https://epoch.ai/blog/grok-4-math)**

A report about Grok 4's mathematical strengths and weaknesses, including its state-of-the-art performance in medium-hard high school math competitions and its utility for literature search.

**[Arc Virtual Cell Challenge: A Primer](https://huggingface.co/blog/virtual-cell-challenge)**

A foundational article providing the minimum context required to participate in the Arc Virtual Cell Challenge, which involves training models to predict gene silencing effects using single-cell RNA sequencing profiles.

**[Subliminal Learning: Language Models Transmit Behavioral Traits via Hidden Signals in Data](https://alignment.anthropic.com/2025/subliminal-learning/)**

A surprising blog post exploring "subliminal learning," a phenomenon where student models acquire behavioral traits from teacher models through non-semantic patterns in generated data.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[ASPERA: A Simulated Environment to Evaluate Planning for Complex Action Execution](https://machinelearning.apple.com/research/aspera)**

**Abstract:**

This work evaluates the potential of large language models (LLMs) to power digital assistants capable of complex action execution. These assistants rely on pre-trained programming knowledge to execute multi-step goals by composing objects and functions defined in assistant libraries into action execution programs. To achieve this, we develop ASPERA, a framework comprising an assistant library simulation and a human-assisted LLM data generation engine. Our engine allows developers to guide LLM generation of high-quality tasks consisting of complex user queries, simulation state and corresponding validation programs, tackling data availability and evaluation robustness challenges. Alongside the framework we release Asper-Bench, an evaluation dataset of 250 challenging tasks generated using ASPERA, which we use to show that program generation grounded in custom assistant libraries is a significant challenge to LLMs compared to dependency-free code generation.

**[SensorLM: Learning the Language of Wearable Sensors](https://arxiv.org/abs/2506.09108)**

**Abstract:**

We present SensorLM, a family of sensor-language foundation models that enable wearable sensor data understanding with natural language. Despite its pervasive nature, aligning and interpreting sensor data with language remains challenging due to the lack of paired, richly annotated sensor-text descriptions in uncurated, real-world wearable data. We introduce a hierarchical caption generation pipeline designed to capture statistical, structural, and semantic information from sensor data. This approach enabled the curation of the largest sensor-language dataset to date, comprising over 59.7 million hours of data from more than 103,000 people. Furthermore, SensorLM extends prominent multimodal pretraining architectures (e.g., CLIP, CoCa) and recovers them as specific variants within a generic architecture. Extensive experiments on real-world tasks in human activity analysis and healthcare verify the superior performance of SensorLM over state-of-the-art in zero-shot recognition, few-shot learning, and cross-modal retrieval. SensorLM also demonstrates intriguing capabilities including scaling behaviors, label efficiency, sensor captioning, and zero-shot generalization to unseen tasks.