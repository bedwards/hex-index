---
title: "Deep Learning Weekly: Issue 424"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-10-01T15:02:41.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-424"
word_count: 977
estimated_read_time: 5
---

This week in deep learning, we bring you [OpenAI’s Sora 2](https://openai.com/index/sora-2/), [Developing an open standard for agentic commerce](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce), and [a paper on Enter the Mind Palace: Reasoning and Planning for Long-term Active Embodied Question Answering](https://arxiv.org/abs/2507.12846).

You may also enjoy [Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5), [CWM: An Open-Weights LLM for Research on Code Generation with World Models](https://ai.meta.com/research/publications/cwm-an-open-weights-llm-for-research-on-code-generation-with-world-models/), [a paper on Scaling Agents via Continual Pre-training](https://arxiv.org/abs/2509.13310) and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Sora 2 is here | OpenAI](https://openai.com/index/sora-2/)**

OpenAI released Sora 2, their flagship video and audio generation model.

**[Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)**

Anthropic unveiled Claude Sonnet 4.5, which boasts state-of-the-art coding and computer use performance, and accompanies the release of the Claude Agent SDK.

**[Introducing Liquid Nanos — frontier‑grade performance on everyday devices](https://www.liquid.ai/blog/introducing-liquid-nanos-frontier-grade-performance-on-everyday-devices)**

The Liquid AI team launched Liquid Nanos — a family of models that deliver frontier‑model quality on specialized, agentic tasks while running directly on embedded devices.

**[OpenAI adds Instant Checkout shopping feature to ChatGPT](https://siliconangle.com/2025/09/29/openai-adds-instant-checkout-shopping-feature-chatgpt/)**

OpenAI launched a new ChatGPT feature that enables users to make online purchases directly in the chatbot’s interface.

**[Vibe working: Introducing Agent Mode and Office Agent in Microsoft 365 Copilot](https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/29/vibe-working-introducing-agent-mode-and-office-agent-in-microsoft-365-copilot/)**

The Microsoft team brought “vibe working” to Microsoft 365 Copilot with Agent Mode in Office apps and Office Agent in Copilot chat.

**[Meta strikes expanded $14.2B AI infrastructure deal with CoreWeave](https://siliconangle.com/2025/09/30/meta-strikes-expanded-14-2b-ai-infrastructure-deal-coreweave/)**

Shares of CoreWeave jumped more than 11% after announcing that they signed a new multibillion-dollar agreement with Meta to provide them with AI compute infrastructure.

## **MLOps & LLMOps**

**[Why Multi-Agent Systems Need Memory Engineering](https://medium.com/mongodb/why-multi-agent-systems-need-memory-engineering-153a81f8d5be)**

An article about how shared memory infrastructure is essential for multi-agent AI systems to coordinate effectively and avoid the failures that plague stateless individual agents.

**[Developing an open standard for agentic commerce](https://stripe.com/blog/developing-an-open-standard-for-agentic-commerce)**

A foundational blog post about the Agentic Commerce Protocol (ACP), an open standard co-developed by Stripe and OpenAI that enables AI agents like ChatGPT to conduct secure, programmatic commerce transactions.

**[Sandboxing agents at the kernel level](https://www.greptile.com/blog/sandboxing-agents-at-the-kernel-level)**

A deep dive motivating kernel-level sandboxing for AI agents by analyzing the Linux open syscall and explaining how containerization technology combines mount namespaces and root changes to enforce file access control.

**[How to Integrate Computer Vision Pipelines with Generative AI and Reasoning](https://developer.nvidia.com/blog/how-to-integrate-computer-vision-pipelines-with-generative-ai-and-reasoning/)**

A technical blog detailing the NVIDIA AI Blueprint VSS 2.4 release, which integrates the Cosmos Reason VLM to improve physical world understanding, enhance Q&A using agentic knowledge graph traversal, and support edge AI deployments.

**Learning**

**[CWM: An Open-Weights LLM for Research on Code Generation with World Models](https://ai.meta.com/research/publications/cwm-an-open-weights-llm-for-research-on-code-generation-with-world-models/)**

A foundational research release about the Code World Model (CWM), designed to advance code generation research using reasoning and planning in computational environments.

**[The anatomy of a personal health agent](https://research.google/blog/the-anatomy-of-a-personal-health-agent/)**

A research blog post describing the Personal Health Agent (PHA) framework, which uses a collaborative multi-agent architecture to provide personalized, evidence-based guidance.

**[To Understand AI, Watch How It Evolves](https://www.quantamagazine.org/to-understand-ai-watch-how-it-evolves-20250924/)**

An article presenting an argument that understanding LLMs requires an evolutionary perspective, focusing on training rather than final, static internal structures.

**[Gemini Robotics 1.5 brings AI agents into the physical world](https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/)**

A post detailing the Gemini Robotics 1.5 and Gemini Robotics-ER 1.5 models, which combine in an agentic framework to enable physical robots to perceive, plan, and solve complex, multi-step physical tasks.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[scikit-learn-contrib/MAPIE](https://github.com/scikit-learn-contrib/MAPIE)**

A scikit-learn-compatible library for estimating prediction intervals and controlling risks, based on conformal predictions.

## **Papers & Publications**

**[Enter the Mind Palace: Reasoning and Planning for Long-term Active Embodied Question Answering](https://arxiv.org/abs/2507.12846)**

**Abstract:**

As robots become increasingly capable of operating over extended periods -- spanning days, weeks, and even months -- they are expected to accumulate knowledge of their environments and leverage this experience to assist humans more effectively. This paper studies the problem of Long-term Active Embodied Question Answering (LA-EQA), a new task in which a robot must both recall past experiences and actively explore its environment to answer complex, temporally-grounded questions. Unlike traditional EQA settings, which typically focus either on understanding the present environment alone or on recalling a single past observation, LA-EQA challenges an agent to reason over past, present, and possible future states, deciding when to explore, when to consult its memory, and when to stop gathering observations and provide a final answer. Standard EQA approaches based on large models struggle in this setting due to limited context windows, absence of persistent memory, and an inability to combine memory recall with active exploration. To address this, we propose a structured memory system for robots, inspired by the mind palace method from cognitive science. Our method encodes episodic experiences as scene-graph-based world instances, forming a reasoning and planning algorithm that enables targeted memory retrieval and guided navigation. To balance the exploration-recall trade-off, we introduce value-of-information-based stopping criteria that determines when the agent has gathered sufficient information. We evaluate our method on real-world experiments and introduce a new benchmark that spans popular simulation environments and actual industrial sites. Our approach significantly outperforms state-of-the-art baselines, yielding substantial gains in both answer accuracy and exploration efficiency.

**[Scaling Agents via Continual Pre-training](https://arxiv.org/abs/2509.13310)**

**Abstract:**

Large language models (LLMs) have evolved into agentic systems capable of autonomous tool use and multi-step reasoning for complex problem-solving. However, post-training approaches building upon general-purpose foundation models consistently underperform in agentic tasks, particularly in open-source implementations. We identify the root cause: the absence of robust agentic foundation models forces models during post-training to simultaneously learn diverse agentic behaviors while aligning them to expert demonstrations, thereby creating fundamental optimization tensions. To this end, we are the first to propose incorporating Agentic Continual Pre-training (Agentic CPT) into the deep research agents training pipeline to build powerful agentic foundational models. Based on this approach, we develop a deep research agent model named AgentFounder. We evaluate our AgentFounder-30B on 10 benchmarks and achieve state-of-the-art performance while retains strong tool-use ability, notably 39.9% on BrowseComp-en, 43.3% on BrowseComp-zh, and 31.5% Pass@1 on HLE.