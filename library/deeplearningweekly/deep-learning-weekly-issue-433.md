---
title: "Deep Learning Weekly: Issue 433"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-12-04T16:03:08.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-433"
word_count: 872
estimated_read_time: 5
---

This week in deep learning, we bring you [Introducing Mistral 3](https://mistral.ai/news/mistral-3), [MCP Explorer](https://neurips-mcp-presentation.vercel.app/), and [a paper on Agentic Bridge Framework: Closing the Gap Between Agentic Capability and Performance Benchmarks](https://openreview.net/pdf?id=Rv664iOMNv).

You may also enjoy [Laying the Foundations for Visual Intelligence](https://bfl.ai/blog/our-300m-series-b), [8 learnings from 1 year of agents](https://posthog.com/blog/8-learnings-from-1-year-of-agents-posthog-ai), [a paper on SoMi-ToM: Evaluating Multi-Perspective Theory of Mind in Embodied Social Interactions](https://arxiv.org/abs/2506.23046), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Mistral 3](https://mistral.ai/news/mistral-3)**

The Mistral team announced Mistral 3, which includes three state-of-the-art small models and Mistral Large 3 — a sparse mixture-of-experts model.

**[Laying the Foundations for Visual Intelligence—$300M Series B | Black Forest Labs](https://bfl.ai/blog/our-300m-series-b)**

Black Forest Labs raises $300M Series B at $3.25B valuation to advance visual intelligence models beyond its popular FLUX image generation platform.

**[New training method boosts AI multimodal reasoning with smaller, smarter datasets](https://venturebeat.com/ai/new-training-method-boosts-ai-multimodal-reasoning-with-smaller-smarter)**

Researchers at MiroMind AI and several Chinese universities have released OpenMMReasoner, a training framework that improves the capabilities of models in multimodal reasoning.

**[Skill Learning: Bringing Continual Learning to CLI Agents](https://www.letta.com/blog/skill-learning)**

The Letta team released Skill Learning, a way for Letta Code to dynamically learn skills over time.

## **MLOps & LLMOps**.

**[MCP Explorer](https://neurips-mcp-presentation.vercel.app/)**

An educational project for learning Anthropic’s Model Context Protocol through a narrative-driven and interactive learning experience.

**[8 learnings from 1 year of agents](https://posthog.com/blog/8-learnings-from-1-year-of-agents-posthog-ai)**

A detailed retrospective blog post sharing 8 key learnings from a year of developing PostHog AI, focusing on architectural choices like using a single LLM loop and the power of continuous model improvements.

**[OpenSearch as an agentic memory solution: Building context-aware agents using persistent memory](https://opensearch.org/blog/opensearch-as-an-agentic-memory-solution-building-context-aware-agents-using-persistent-memory/)**

A blog post that explores the memory challenges facing AI agents, introduces agentic memory’s core concepts, and demonstrates how to integrate it with your agent frameworks.

**[Build and Run Secure, Data-Driven AI Agents](https://developer.nvidia.com/blog/build-and-run-secure-data-driven-ai-agents/)**

A technical guide detailing the deployment of NVIDIA’s AI-Q Research Assistant and Enterprise RAG Blueprints, which use Nemotron NIMs and an agentic Plan-Refine-Reflect workflow on Amazon EKS.

## **Learning**

**[Evaluating honesty and lie detection techniques on a diverse suite of dishonest models](https://alignment.anthropic.com/2025/honesty-elicitation/)**

An alignment report evaluating techniques like fine-tuning and prompting to improve AI honesty and detect lies across five specialized testbed models.

**[A Rosetta Stone for AI benchmarks](https://epoch.ai/blog/a-rosetta-stone-for-ai-benchmarks)**

A statistical paper introducing a “Rosetta Stone” framework that stitches together around 40 different AI benchmarks to rigorously measure long-run capability trends and forecast future algorithmic progress.

**[Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md/)**

A guide that shows you how to understand how Codex discovers persistent guidance, author global and per-project instruction files, and verify that Codex honors your setup during real CLI runs.

**[Following the Text Gradient at Scale](https://ai.stanford.edu/blog/feedback-descent/)**

A blog post introducing Feedback Descent, a learning paradigm that uses rich, textual feedback instead of scalar rewards to guide iterative improvements in domains like molecular design and prompt optimization.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[Agentic Bridge Framework: Closing the Gap Between Agentic Capability and Performance Benchmarks](https://openreview.net/pdf?id=Rv664iOMNv)**

**Abstract:**

While agentic AI systems perform impressively on emerging capability benchmarks, existing performance evaluation suites focus on non-agentic workloads, leaving a critical gap in understanding system efficiency for multi-step, tool-using agents. We present the Agentic Bridge Framework for extracting actionable performance insights from capability evaluations through trace-level telemetry. Applying this framework to a multi-agent system on GAIA validation, we reveal that: (1) pass@N strategies provide diminishing accuracy returns; (2) search agents dominate token usage and latency, identifying web data gathering as the primary bottleneck; (3) reasoning models spend more tokens on context preservation than actual reasoning, highlighting costly inter-agent communication overhead. These findings inform critical design choices—context engineering, tool-use optimization, and phase-aware resource allocation—and illustrate how agent traces can inform reproducible performance workloads, bridging capability achievements with systems optimization for efficient agentic AI.

**[SoMi-ToM: Evaluating Multi-Perspective Theory of Mind in Embodied Social Interactions](https://arxiv.org/abs/2506.23046)**

**Abstract:**

Humans continuously infer the states, goals, and behaviors of others by perceiving their surroundings in dynamic, real-world social interactions. However, most Theory of Mind (ToM) benchmarks only evaluate static, text-based scenarios, which have a significant gap compared to real interactions. We propose the SoMi-ToM benchmark, designed to evaluate multi-perspective ToM in embodied multi-agent complex social interactions. This benchmark is based on rich multimodal interaction data generated by the interaction environment SoMi, covering diverse crafting goals and social relationships. Our framework supports multi-level evaluation: (1) first-person evaluation provides multimodal (visual, dialogue, action, etc.) input from a first-person perspective during a task for real-time state inference, (2) third-person evaluation provides complete third-person perspective video and text records after a task for goal and behavior inference. This evaluation method allows for a more comprehensive examination of a model’s ToM capabilities from both the subjective immediate experience and the objective global observation. We constructed a challenging dataset containing 35 third-person perspective videos, 363 first-person perspective images, and 1225 expert-annotated multiple-choice questions (three options). On this dataset, we systematically evaluated the performance of human subjects and several state-of-the-art large vision-language models (LVLMs). The results show that LVLMs perform significantly worse than humans on SoMi-ToM: the average accuracy gap between humans and models is 40.1% in first-person evaluation and 26.4% in third-person evaluation. This indicates that future LVLMs need to further improve their ToM capabilities in embodied, complex social interactions.