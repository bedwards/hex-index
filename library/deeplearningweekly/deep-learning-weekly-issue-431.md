---
title: "Deep Learning Weekly: Issue 431"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-11-19T16:31:36.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-431"
word_count: 1031
estimated_read_time: 6
---

This week in deep learning, we bring you [Gemini 3](https://blog.google/products/gemini/gemini-3/#note-from-ceo), [The Definitive Guide to Agentic AI](https://www.comet.com/site/blog/ai-agents/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=ai-agents/), and [a paper on Depth Anything 3: Recovering the Visual Space from Any Views](https://arxiv.org/abs/2511.10647).

You may also enjoy [GPT-5.1](https://openai.com/index/gpt-5-1/), [Code execution with MCP: building more efficient AI agents](https://www.anthropic.com/engineering/code-execution-with-mcp), [a paper on MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling](https://arxiv.org/abs/2511.11793), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[A new era of intelligence with Gemini 3](https://blog.google/products/gemini/gemini-3/#note-from-ceo)**

Google releases Gemini 3 Pro with breakthrough reasoning scores, PhD-level performance on benchmarks, and enhanced multimodal and agentic coding capabilities.

**[Grok 4.1 | xAI](https://x.ai/news/grok-4-1)**

xAI introduced Grok 4.1, which brings significant improvements to the real-world usability of Grok.

**[GPT-5.1: A smarter, more conversational ChatGPT](https://openai.com/index/gpt-5-1/)**

OpenAI releases GPT-5.1 with adaptive reasoning, improved conversational style, and enhanced customization options for ChatGPT users.

## **MLOps & LLMOps**.

**[The Definitive Guide to Agentic AI: What AI Agents Actually Are and How to Build Them for Production](https://www.comet.com/site/blog/ai-agents/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=ai-agents/)**

Discover the core principles behind truly agentic AI systems, how to build them for production, and the reasons they often fail at scale.

**[Qdrant 1.16 - Tiered Multitenancy & Disk-Efficient Vector Search](https://qdrant.tech/blog/qdrant-1.16.x/)**

A technical update announcing Qdrant 1.16, which introduces Tiered Multitenancy, the ACORN search algorithm, and Inline Storage for disk-efficient, high-performance vector search.

**[Building an Interactive AI Agent for Lightning-Fast Machine Learning Tasks](https://developer.nvidia.com/blog/building-an-interactive-ai-agent-for-lightning-fast-machine-learning-tasks/)**

A technical blog post about building a data science agent using Nemotron Nano-9B-v2 and CUDA-X libraries, delivering massive 3x to 43x speedups for ML experimentation.

**[Code execution with MCP: building more efficient AI agents \\ Anthropic](https://www.anthropic.com/engineering/code-execution-with-mcp)**

An article detailing how adopting code execution with the Model Context Protocol (MCP) reduces token consumption and increases efficiency for AI agents managing hundreds of tools.

**[Real-time streaming for AI models and agents in OpenSearch](https://opensearch.org/blog/introducing-real-time-streaming-for-ai-models-and-agents-in-opensearch/)**

A blog post launching experimental real-time streaming capabilities in OpenSearch 3.3 via the Predict Stream and Execute Stream Agent APIs.

## **Learning**

**[Gemini 3 Prompting: Best Practices for General Usage](https://www.philschmid.de/gemini-3-prompt-practices)**

An instructional guide providing best practices for prompting Gemini 3 Pro, focusing on core principles like precise instructions, structured XML/Markdown tagging, and more.

**[Mapping LLMs with Sparse Autoencoders](https://pair.withgoogle.com/explorables/sae/)**

An explainer describing Sparse Autoencoders (SAEs) as a technique to map LLM activations into monosemantic, interpretable features, allowing researchers to understand and steer model behavior.

**[Generative UI: A rich, custom, visual interactive user experience for any prompt](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/)**

A novel research article introducing Generative UI, a capability enabling AI models to dynamically create customized, immersive visual experiences, interactive tools, and simulations based entirely on user prompts.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[opendatalab/mineru](https://github.com/opendatalab/mineru)**

Transforms complex documents like PDFs into LLM-ready markdown/JSON for your Agentic workflows.

## **Papers & Publications**

**[Depth Anything 3: Recovering the Visual Space from Any Views](https://arxiv.org/abs/2511.10647)**

**Abstract:**

We present Depth Anything 3 (DA3), a model that predicts spatially consistent geometry from an arbitrary number of visual inputs, with or without known camera poses. In pursuit of minimal modeling, DA3 yields two key insights: a single plain transformer (e.g., vanilla DINO encoder) is sufficient as a backbone without architectural specialization, and a singular depth-ray prediction target obviates the need for complex multi-task learning. Through our teacher-student training paradigm, the model achieves a level of detail and generalization on par with Depth Anything 2 (DA2). We establish a new visual geometry benchmark covering camera pose estimation, any-view geometry and visual rendering. On this benchmark, DA3 sets a new state-of-the-art across all tasks, surpassing prior SOTA VGGT by an average of 44.3% in camera pose accuracy and 25.1% in geometric accuracy. Moreover, it outperforms DA2 in monocular depth estimation. All models are trained exclusively on public academic datasets.

**[MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling](https://arxiv.org/abs/2511.11793)**

**Abstract:**

We present MiroThinker v1.0, an open-source research agent designed to advance tool-augmented reasoning and information-seeking capabilities. Unlike previous agents that only scale up model size or context length, MiroThinker explores interaction scaling at the model level, systematically training the model to handle deeper and more frequent agent-environment interactions as a third dimension of performance improvement. Unlike LLM test-time scaling, which operates in isolation and risks degradation with longer reasoning chains, interactive scaling leverages environment feedback and external information acquisition to correct errors and refine trajectories. Through reinforcement learning, the model achieves efficient interaction scaling: with a 256K context window, it can perform up to 600 tool calls per task, enabling sustained multi-turn reasoning and complex real-world research workflows. Across four representative benchmarks-GAIA, HLE, BrowseComp, and BrowseComp-ZH-the 72B variant achieves up to 81.9%, 37.7%, 47.1%, and 55.6% accuracy respectively, surpassing previous open-source agents and approaching commercial counterparts such as GPT-5-high. Our analysis reveals that MiroThinker benefits from interactive scaling consistently: research performance improves predictably as the model engages in deeper and more frequent agent-environment interactions, demonstrating that interaction depth exhibits scaling behaviors analogous to model size and context length. These findings establish interaction scaling as a third critical dimension for building next-generation open research agents, complementing model capacity and context windows.

**[Back to Basics: Let Denoising Generative Models Denoise](https://arxiv.org/abs/2511.13720)**

**Abstract:**

Today’s denoising diffusion models do not “denoise” in the classical sense, i.e., they do not directly predict clean images. Rather, the neural networks predict noise or a noised quantity. In this paper, we suggest that predicting clean data and predicting noised quantities are fundamentally different. According to the manifold assumption, natural data should lie on a low-dimensional manifold, whereas noised quantities do not. With this assumption, we advocate for models that directly predict clean data, which allows apparently under-capacity networks to operate effectively in very high-dimensional spaces. We show that simple, large-patch Transformers on pixels can be strong generative models: using no tokenizer, no pre-training, and no extra loss. Our approach is conceptually nothing more than “Just image Transformers”, or JiT, as we call it. We report competitive results using JiT with large patch sizes of 16 and 32 on ImageNet at resolutions of 256 and 512, where predicting high-dimensional noised quantities can fail catastrophically. With our networks mapping back to the basics of the manifold, our research goes back to basics and pursues a self-contained paradigm for Transformer-based diffusion on raw natural data.