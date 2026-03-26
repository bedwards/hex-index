---
title: "Deep Learning Weekly: Issue 430"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-11-13T16:02:08.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-430"
word_count: 724
estimated_read_time: 4
---

This week in deep learning, we bring you [Kimi K2 Thinking](https://moonshotai.github.io/Kimi-K2/thinking.html), [Nested Learning: A new ML paradigm for continual learning](https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/), and [a paper on SPICE: Self-Play In Corpus Environments Improves Reasoning](https://arxiv.org/abs/2510.24684).

You may also enjoy [Omnilingual ASR: Advancing Automatic Speech Recognition for 1,600+ Languages](https://ai.meta.com/blog/omnilingual-asr-advancing-automatic-speech-recognition/), [TabPFN-2.5 Model Report](https://priorlabs.ai/technical-reports/tabpfn-2-5-model-report), [a paper on Synthetic Socratic Debates: Examining Persona Effects on Moral Decision and Persuasion Dynamics](https://aclanthology.org/2025.emnlp-main.831/), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Kimi K2 Thinking](https://moonshotai.github.io/Kimi-K2/thinking.html)**

The Moonshot team introduced Kimi K2 Thinking, an open-source thinking model that sets new records across benchmarks that assess reasoning, coding, and agent capabilities.

**[Omnilingual ASR: Advancing Automatic Speech Recognition for 1,600+ Languages](https://ai.meta.com/blog/omnilingual-asr-advancing-automatic-speech-recognition/)**

Meta introduced Omnilingual Automatic Speech Recognition (ASR), a suite of models providing automatic speech recognition capabilities for more than 1,600 languages.

**[TabPFN-2.5 Model Report](https://priorlabs.ai/technical-reports/tabpfn-2-5-model-report)**

Prior Labs releases TabPFN-2.5, a tabular foundation model that matches complex AutoGluon ensembles while scaling to 50,000 samples and 2,000 features.

**[Anthropic and Iceland announce one of the world’s first national AI education pilots](https://www.anthropic.com/news/anthropic-and-iceland-announce-one-of-the-world-s-first-national-ai-education-pilots)**

Anthropic and Iceland’s Ministry of Education and Children announced a partnership to bring Claude to teachers across the nation, launching one of the world’s first comprehensive national AI education pilots.

**[AI-powered visual presentation platform Gamma raises $68M at $2.1B valuation](https://siliconangle.com/2025/11/10/ai-powered-visual-presentation-platform-gamma-raises-68m-2-1b-valuation/)**

Gamma announced that it has raised $68 million, led by Andreessen Horowitz, at a valuation of $2.1 billion.

## **MLOps & LLMOps**.

**[Human-in-the-Loop Review Workflows for LLM Applications & Agents](https://www.comet.com/site/blog/human-in-the-loop/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=human-in-the-loop/)**

A blog post explaining Human-in-the-Loop review workflows, including systematic tracing and structured rubric design.

**[Building powerful RAG pipelines with Docling and OpenSearch](https://opensearch.org/blog/building-powerful-rag-pipelines-with-docling-and-opensearch/)**

A technical blog post detailing how to build RAG pipelines by integrating the Docling document processing toolkit with OpenSearch for high-performance, metadata-aware vector retrieval.

**[Where to use sub-agents versus agents as tools](https://cloud.google.com/blog/topics/developers-practitioners/where-to-use-sub-agents-versus-agents-as-tools)**

A blog post explaining the key difference between sub-agents and agents as tools in multi-agent systems.

## **Learning**

**[Best LLM Observability Tools of 2025: Top Platforms & Features](https://www.comet.com/site/blog/llm-observability-tools/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-observability-tools/)**

Learn about the top LLM observability tools of 2025, including Opik, Langfuse, and Datadog, to monitor, evaluate, and optimize model performance.

**[Nested Learning: A new ML paradigm for continual learning](https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/)**

A foundational research blog introducing the Nested Learning paradigm, which unifies model architecture and optimization as interconnected problems to create continuum memory systems.

**[5 Thoughts on Kimi K2 Thinking - by Nathan Lambert](https://www.interconnects.ai/p/kimi-k2-thinking-what-it-means)**

An article providing a few quick reactions and a technical analysis of the Kimi K2 Thinking model, highlighting its strong performance and the growing influence of Chinese AI labs.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[SPICE: Self-Play In Corpus Environments Improves Reasoning](https://arxiv.org/abs/2510.24684)**

**Abstract:**

Self-improving systems require environmental interaction for continuous adaptation. We introduce SPICE (Self-Play In Corpus Environments), a reinforcement learning framework where a single model acts in two roles: a Challenger that mines documents from a large corpus to generate diverse reasoning tasks, and a Reasoner that solves them. Through adversarial dynamics, the Challenger creates an automatic curriculum at the frontier of the Reasoner’s capability, while corpus grounding provides the rich, near-inexhaustible external signal necessary for sustained improvement. Unlike existing ungrounded self-play methods that offer more limited benefits, SPICE achieves consistent gains across mathematical (+8.9%) and general reasoning (+9.8%) benchmarks on multiple model families. Our analysis reveals how document grounding is a key ingredient in SPICE to continuously generate its own increasingly challenging goals and achieve them, enabling sustained self-improvement.

**[Synthetic Socratic Debates: Examining Persona Effects on Moral Decision and Persuasion Dynamics](https://aclanthology.org/2025.emnlp-main.831/)**

**Abstract:**

As large language models (LLMs) are increasingly used in morally sensitive domains, it is crucial to understand how persona traits affect their moral reasoning and persuasive behavior. We present the first large-scale study of multi-dimensional persona effects in AI-AI debates over real-world moral dilemmas. Using a 6-dimensional persona space (age, gender, country, social class, ideology, and personality), we simulate structured debates between AI agents over 131 relationship-based cases. Our results show that personas affect initial moral stances and debate outcomes, with political ideology and personality traits exerting the strongest influence. Persuasive success varies across traits, with liberal and open personalities reaching higher consensus. While logit-based confidence grows during debates, emotional and credibility-based appeals diminish, indicating more tempered argumentation over time. These trends mirror findings from psychology and cultural studies, reinforcing the need for persona-aware evaluation frameworks for AI moral reasoning.