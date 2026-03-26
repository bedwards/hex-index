---
title: "Deep Learning Weekly: Issue 420"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-09-03T15:02:40.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-420"
word_count: 1135
estimated_read_time: 6
---

This week in deep learning, we bring you [Tencent's Hunyuan-MT translation models](https://siliconangle.com/2025/09/01/tencent-open-sources-hunyuan-mt-translation-model-series/), [Le Chat. Custom MCP connectors. Memories](https://mistral.ai/news/le-chat-mcp-connectors-memories), and [a paper on USO: Unified Style and Subject-Driven Generation via Disentangled and Reward Learning](https://arxiv.org/abs/2508.18966).

You may also enjoy [Fine-Tuning gpt-oss for Accuracy and Performance with Quantization Aware Training](https://developer.nvidia.com/blog/fine-tuning-gpt-oss-for-accuracy-and-performance-with-quantization-aware-training/), [a paper on A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers](https://arxiv.org/abs/2508.21148), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Tencent open-sources Hunyuan-MT translation model series](https://siliconangle.com/2025/09/01/tencent-open-sources-hunyuan-mt-translation-model-series/)**

Tencent open-sourced a new lineup of language models, the Hunyuan-MT series, that is optimized for translation tasks.

**[Le Chat. Custom MCP connectors. Memories.](https://mistral.ai/news/le-chat-mcp-connectors-memories)**

Mistral’s Le Chat now integrates with 20+ enterprise platforms—powered by MCP—and remembers what matters with Memories.

**[How Sakana AI's new evolutionary algorithm builds powerful AI models without expensive retraining](https://venturebeat.com/ai/how-sakana-ais-new-evolutionary-algorithm-builds-powerful-ai-models-without-expensive-retraining)**

A new evolutionary technique from Japan-based AI lab Sakana AI enables developers to augment the capabilities of AI models without costly training and fine-tuning processes.

**[MIT researchers develop AI tool to improve flu vaccine strain selection](https://news.mit.edu/2025/vaxseer-ai-tool-to-improve-flu-vaccine-strain-selection-0828)**

Researchers from MIT set out to make vaccine selection more accurate by creating an AI system designed to predict dominant flu strains and identify vaccine candidates.

**[Anthropic triples valuation to $183B in new $13B funding round](https://siliconangle.com/2025/09/02/anthropic-triples-valuation-183b-new-13b-funding-round/)**

Anthropic announced that it has raised $13 billion in funding to support its AI research and commercialization efforts.

**[Amazon launches Lens Live, an AI-powered shopping tool for use in the real world](https://techcrunch.com/2025/09/02/amazon-launches-lens-live-an-ai-powered-shopping-tool-for-use-in-the-real-world/)**

Amazon launched Lens Live, a new AI-powered upgrade to its Amazon Lens shopping feature that allows consumers to discover new products through visual search.

## **MLOps & LLMOps**

**[LangExtract + Milvus: A Practical Guide to Building a Hybrid Document Processing and Search System](https://milvus.io/blog/langextract-milvus-a-practical-guide-to-building-a-hybrid-document-processing-and-search-system.md)**

A practical tutorial demonstrating how to build a hybrid document processing and search system by combining LangExtract for structured data extraction with Milvus.

**[Anatomy of a Context Window: A Guide to Context Engineering](https://www.letta.com/blog/guide-to-context-engineering)**

A detailed blog post outlining the anatomy of an AI agent's context window, including system prompts, tools, memory blocks, and files, and how these components are managed.

**[Learn how Amazon Health Services improved discovery in Amazon search using AWS ML and GenAI](https://aws.amazon.com/blogs/machine-learning/learn-how-amazon-health-services-improved-discovery-in-amazon-search-using-aws-ml-and-gen-ai/)**

An illustrative blog post detailing how Amazon Health Services enhanced search discovery using AWS ML and generative AI.

## **Learning**

**[‘World Models,’ an Old Idea in AI, Mount a Comeback](https://www.quantamagazine.org/world-models-an-old-idea-in-ai-mount-a-comeback-20250902/)**

An exploratory article discussing the resurgence of "world models" in AI research as internal representations of reality that AI systems can use to evaluate predictions and decisions.

**[From Generalist to Specialist: Fine-Tuning Gemini for Terraform Scans & Phishing Detection](https://medium.com/google-cloud/from-generalist-to-specialist-fine-tuning-gemini-for-terraform-scans-phishing-detection-ee6043816c37)**

An article that walks through fine-tuning Gemini with two real-world demos: a Terraform security scanner, and a multimodal phishing detector.

**[Fine-Tuning gpt-oss for Accuracy and Performance with Quantization Aware Training](https://developer.nvidia.com/blog/fine-tuning-gpt-oss-for-accuracy-and-performance-with-quantization-aware-training/)**

A technical blog post detailing a fine-tuning workflow for gpt-oss models using supervised fine-tuning (SFT) on a BF16 version, followed by quantization-aware training (QAT).

## **Libraries & Code**

**[agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope)**

Agent-Oriented Programming for Building LLM Applications

**[letta-ai/letta](https://github.com/letta-ai/letta)**

A platform for building stateful agents

## **Papers & Publications**

**[USO: Unified Style and Subject-Driven Generation via Disentangled and Reward Learning](https://arxiv.org/abs/2508.18966)**

**Abstract:**

Existing literature typically treats style-driven and subject-driven generation as two disjoint tasks: the former prioritizes stylistic similarity, whereas the latter insists on subject consistency, resulting in an apparent antagonism. We argue that both objectives can be unified under a single framework because they ultimately concern the disentanglement and re-composition of content and style, a long-standing theme in style-driven research. To this end, we present USO, a Unified Style-Subject Optimized customization model. First, we construct a large-scale triplet dataset consisting of content images, style images, and their corresponding stylized content images. Second, we introduce a disentangled learning scheme that simultaneously aligns style features and disentangles content from style through two complementary objectives, style-alignment training and content-style disentanglement training. Third, we incorporate a style reward-learning paradigm denoted as SRL to further enhance the model's performance. Finally, we release USO-Bench, the first benchmark that jointly evaluates style similarity and subject fidelity across multiple metrics. Extensive experiments demonstrate that USO achieves state-of-the-art performance among open-source models along both dimensions of subject consistency and style similarity.

**[A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers](https://arxiv.org/abs/2508.21148)**

**Abstract:**

Scientific Large Language Models (Sci-LLMs) are transforming how knowledge is represented, integrated, and applied in scientific research, yet their progress is shaped by the complex nature of scientific data. This survey presents a comprehensive, data-centric synthesis that reframes the development of Sci-LLMs as a co-evolution between models and their underlying data substrate. We formulate a unified taxonomy of scientific data and a hierarchical model of scientific knowledge, emphasizing the multimodal, cross-scale, and domain-specific challenges that differentiate scientific corpora from general natural language processing datasets. We systematically review recent Sci-LLMs, from general-purpose foundations to specialized models across diverse scientific disciplines, alongside an extensive analysis of over 270 pre-/post-training datasets, showing why Sci-LLMs pose distinct demands -- heterogeneous, multi-scale, uncertainty-laden corpora that require representations preserving domain invariance and enabling cross-modal reasoning. On evaluation, we examine over 190 benchmark datasets and trace a shift from static exams toward process- and discovery-oriented assessments with advanced evaluation protocols. These data-centric analyses highlight persistent issues in scientific data development and discuss emerging solutions involving semi-automated annotation pipelines and expert validation. Finally, we outline a paradigm shift toward closed-loop systems where autonomous agents based on Sci-LLMs actively experiment, validate, and contribute to a living, evolving knowledge base. Collectively, this work provides a roadmap for building trustworthy, continually evolving artificial intelligence (AI) systems that function as a true partner in accelerating scientific discovery.

**[LLaVA-Critic-R1: Your Critic Model is Secretly a Strong Policy Model](https://arxiv.org/abs/2509.00676)**

**Abstract:**

In vision-language modeling, critic models are typically trained to evaluate outputs -- assigning scalar scores or pairwise preferences -- rather than to generate responses. This separation from policy models, which produce the responses, is so entrenched that critics are rarely considered for direct policy use. In this work, we challenge this convention. We propose to reorganize preference-labeled critic datasets into verifiable training signals and perform reinforcement learning directly on a base generative model, producing LLaVA-Critic-R1, a multimodal critic trained to optimize preference judgments while retaining full generation ability. Surprisingly, LLaVA-Critic-R1 emerges not only as a top-performing critic but also as a competitive policy model -- matching or surpassing specialized reasoning VLMs trained with in-domain data across 26 visual reasoning and understanding benchmarks, with an average gain of +5.7% over its base model (Qwen-2.5-VL-7B). Extending this approach to existing strong reasoning VLMs yields LLaVA-Critic-R1+, which further advances policy performance without sacrificing critic quality, achieving a SoTA performance of 71.9 on MMMU at the 7B scale. Finally, we show that the enhanced critic ability benefits inference: applying self-critique at test time yields an average +13.8% improvement on five representative reasoning tasks without additional training. Our results reveal that RL training on critic data can produce a unified model excelling at both evaluation and generation, offering a simple path toward scalable, self-improving multimodal systems.