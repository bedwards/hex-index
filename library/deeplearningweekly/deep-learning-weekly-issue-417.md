---
title: "Deep Learning Weekly: Issue 417"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-08-13T15:02:28.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-417"
word_count: 1082
estimated_read_time: 6
---

This week in deep learning, we bring you [How to Build Reliable AI Agent Architecture for Production](https://www.comet.com/site/blog/ai-agent-design/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=ai-agent-design), [How Much Power will Frontier AI Training Demand in 2030?](https://epoch.ai/blog/power-demands-of-frontier-ai-training), and [a paper on TextQuests: How Good are LLMs at Text-Based Video Games?](https://www.textquests.ai/).

You may also enjoy [GLM-4.5: Reasoning, Coding, and Agentic Abilities](https://z.ai/blog/glm-4.5), [From GPT-2 to gpt-oss: Analyzing the Architectural Advances](https://magazine.sebastianraschka.com/p/from-gpt-2-to-gpt-oss-analyzing-the), [a paper on OpenCUA: Open Foundations for Computer-Use Agents](https://arxiv.org/abs/2508.09123), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing GPT-5 | OpenAI](https://openai.com/index/introducing-gpt-5/)**

OpenAI released GPT-5, a significant leap in intelligence over all previous models, featuring state-of-the-art performance across coding, math, writing, health, visual perception, and more.

**[GLM-4.5: Reasoning, Coding, and Agentic Abililties](https://z.ai/blog/glm-4.5)**

The team at Z.ai introduced two new GLM family members called GLM-4.5 and GLM-4.5-Air – designed to unify reasoning, coding, and agentic capabilities into a single model.

**[Claude Sonnet 4 now supports 1M tokens of context \\ Anthropic](https://www.anthropic.com/news/1m-context)**

Claude Sonnet 4 now supports up to 1 million tokens of context on the Anthropic API.

**[Squint gets $40M in funding to accelerate human-to-machine collaboration in manufacturing](https://siliconangle.com/2025/08/12/squint-gets-40m-funding-accelerate-human-machine-collaboration-manufacturing/)**

An industrial automation startup called Squint has raised $40 million as it bids to build on a vision of “agentic manufacturing,” where humans collaborate with artificial intelligence agents.

## **MLOps & LLMOps**

**[AI Agent Design Patterns: How to Build Reliable AI Agent Architecture for Production](https://www.comet.com/site/blog/ai-agent-design/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=ai-agent-design)**

A technical blog post discussing the practical breakdown of the design principles for AI agent architecture that help to ship and scale real-world AI agents.

**[Four places where you can put LLM monitoring](https://redwoodresearch.substack.com/p/four-places-where-you-can-put-llm)**

A strategic blog post outlining four crucial locations for implementing LLM monitoring to effectively identify and mitigate dangerous or malicious AI actions.

**[Elysia: Building an end-to-end agentic RAG app](https://weaviate.io/blog/elysia-agentic-rag)**

An innovative blog post presenting Elysia, an open-source, agentic RAG framework built on a decision-tree architecture that features dynamic data display types, AI data analysis, and more.

## **Learning**

**[From GPT-2 to gpt-oss: Analyzing the Architectural Advances](https://magazine.sebastianraschka.com/p/from-gpt-2-to-gpt-oss-analyzing-the)**

An analytical article providing a detailed comparison and evolution of large language model architectures from GPT-2 to OpenAI's new open-weight gpt-oss models.

**[How Much Power will Frontier AI Training Demand in 2030?](https://epoch.ai/blog/power-demands-of-frontier-ai-training)**

A white paper summary forecasting that the electrical power demand for training frontier AI models will grow exponentially, potentially reaching 4-16 gigawatts by 2030 for individual runs and over 100 gigawatts for total AI capacity worldwide.

**[GPT-5 and the arc of progress - by Nathan Lambert](https://www.interconnects.ai/p/gpt-5-and-bending-the-arc-of-progress)**

An evaluative blog post discussing the GPT-5 release, emphasizing its role as a unified, cost-effective system that enhances OpenAI's product offering and market position.

**[7 Drop-In Replacements to Instantly Speed Up Your Python Data Science Workflows](https://developer.nvidia.com/blog/7-drop-in-replacements-to-instantly-speed-up-your-python-data-science-workflows/)**

A practical blog post about how to instantly speed up data science workflows by leveraging GPU acceleration through drop-in replacements.

**[FourCastNet 3 Enables Fast and Accurate Large Ensemble Weather Forecasting with Scalable Geometric ML](https://developer.nvidia.com/blog/fourcastnet-3-enables-fast-and-accurate-large-ensemble-weather-forecasting-with-scalable-geometric-ml/)**

A blog post on FourCastNet3 (FCN3), NVIDIA Earth-2's latest AI global weather forecasting system.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM observability tool used to debug, evaluate, monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[unslothai/unsloth](https://github.com/unslothai/unsloth)**

Fine-tuning & Reinforcement Learning for LLMs.

## **Papers & Publications**

**[TextQuests](https://www.textquests.ai/)**

**Abstract:**

Evaluating AI agents within complex, interactive environments that mirror real-world challenges is critical for understanding their practical capabilities. While existing agent benchmarks effectively assess skills like tool use or performance on structured tasks, they often do not fully capture an agent's ability to operate autonomously in exploratory environments that demand sustained, self-directed reasoning over a long and growing context. To spur the development of agents capable of more robust intrinsic reasoning over long horizons, we introduce TextQuests, a benchmark based on the Infocom suite of interactive fiction games. These text-based adventures, which can take human players over 30 hours and require hundreds of precise actions to solve, serve as an effective proxy for evaluating AI agents on focused, stateful tasks. The benchmark is specifically designed to assess an LLM agent's capacity for self-contained problem-solving by precluding the use of external tools, thereby focusing on intrinsic long-context reasoning capabilities in an exploratory environment characterized by the need for trial-and-error learning and sustained problem-solving within a single interactive session.

**[OpenCUA: Open Foundations for Computer-Use Agents](https://arxiv.org/abs/2508.09123)**

**Abstract:**

Vision-language models have demonstrated impressive capabilities as computer-use agents (CUAs) capable of automating diverse computer tasks. As their commercial potential grows, critical details of the most capable CUA systems remain closed. As these agents will increasingly mediate digital interactions and execute consequential decisions on our behalf, the research community needs access to open CUA frameworks to study their capabilities, limitations, and risks. To bridge this gap, we propose OpenCUA, a comprehensive open-source framework for scaling CUA data and foundation models. Our framework consists of: (1) an annotation infrastructure that seamlessly captures human computer-use demonstrations; (2) AgentNet, the first large-scale computer-use task dataset spanning 3 operating systems and 200+ applications and websites; (3) a scalable pipeline that transforms demonstrations into state-action pairs with reflective long Chain-of-Thought reasoning that sustain robust performance gains as data scales. Our end-to-end agent models demonstrate strong performance across CUA benchmarks. In particular, OpenCUA-32B achieves an average success rate of 34.8% on OSWorld-Verified, establishing a new state-of-the-art (SOTA) among open-source models and surpassing OpenAI CUA (GPT-4o). Further analysis confirms that our approach generalizes well across domains and benefits significantly from increased test-time computation. We release our annotation tool, datasets, code, and models to build open foundations for further CUA research.

**[Simulating Generative Social Agents via Theory-Informed Workflow Design](https://arxiv.org/abs/2508.08726)**

**Abstract:**

Recent advances in large language models have demonstrated strong reasoning and role-playing capabilities, opening new opportunities for agent-based social simulations. However, most existing agents' implementations are scenario-tailored, without a unified framework to guide the design. This lack of a general social agent limits their ability to generalize across different social contexts and to produce consistent, realistic behaviors. To address this challenge, we propose a theory-informed framework that provides a systematic design process for LLM-based social agents. Our framework is grounded in principles from Social Cognition Theory and introduces three key modules: motivation, action planning, and learning. These modules jointly enable agents to reason about their goals, plan coherent actions, and adapt their behavior over time, leading to more flexible and contextually appropriate responses. Comprehensive experiments demonstrate that our theory-driven agents reproduce realistic human behavior patterns under complex conditions, achieving up to 75% lower deviation from real-world behavioral data across multiple fidelity metrics compared to classical generative baselines. Ablation studies further show that removing motivation, planning, or learning modules increases errors by 1.5 to 3.2 times, confirming their distinct and essential contributions to generating realistic and coherent social behaviors.