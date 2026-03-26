---
title: "Deep Learning Weekly: Issue 422"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-09-18T15:01:47.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-422"
word_count: 903
estimated_read_time: 5
---

This week in deep learning, we bring you [The Ultimate Guide to LLM Evaluation: Metrics, Methods & Best Practices](https://www.comet.com/site/blog/llm-evaluation-guide/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-evaluation-guide/), [How to Train an LLM-RecSys Hybrid for Steerable Recs with Semantic IDs](https://eugeneyan.com/writing/semantic-ids/), and [a paper on Hierarchical Reasoning Model](https://arxiv.org/abs/2506.21734).

You may also enjoy [OpenAI's GPT-5-Codex](https://openai.com/index/introducing-upgrades-to-codex/), [Writing effective tools for AI agents—using AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents), [a paper on From CVE Entries to Verifiable Exploits: An Automated Multi-Agent Framework for Reproducing CVEs](https://arxiv.org/abs/2509.01835) and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Announcing Agent Payments Protocol (AP2)](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)**

Google announced the Agent Payments Protocol (AP2), an open protocol developed to securely initiate and transact agent-led payments across platforms.

**[Introducing upgrades to Codex | OpenAI](https://openai.com/index/introducing-upgrades-to-codex/)**

OpenAI released GPT‑5-Codex—a version of GPT‑5 further optimized for agentic coding in Codex

**[Cohere opens Paris office as EMEA hub](https://cohere.com/blog/paris-office)**

Cohere expands their presence in Europe with the official launch of a Paris office, which will serve as the central hub for operations across Europe, the Middle East, and Africa (EMEA).

**[What will AI look like in 2030?](https://epoch.ai/blog/what-will-ai-look-like-in-2030)**

A report from Epoch AI that examines infrastructure implications and future AI capabilities if AI scaling persists to 2030.

**[Workday acquires Sana Labs for $1.1B to upgrade agentic AI work experiences](https://siliconangle.com/2025/09/16/workday-acquires-sana-labs-1-1b-upgrade-agentic-ai-work-experiences/)**

Workday announced the acquisition of Sana Labs, an AI company offering enterprise knowledge and employee training tools, for about $1.1 billion.

## **MLOps & LLMOps**

**[Writing effective tools for AI agents—using AI agents \\ Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents)**

An article outlining techniques and principles for writing effective tools for AI agents, emphasizing evaluation and agent-assisted optimization to boost performance in real-world tasks.

**[How to turn Claude Code into a domain specific coding agent](https://blog.langchain.com/how-to-turn-claude-code-into-a-domain-specific-coding-agent/)**

A blog post exploring experimental configurations to transform Claude Code into a domain-specific coding agent.

**[The Rise of Subagents](https://www.philschmid.de/the-rise-of-subagents)**

An explanatory blog post discussing the increasing adoption and architecture of subagents.

**[Reducing Cold Start Latency for LLM Inference with NVIDIA Run:ai Model Streamer](https://developer.nvidia.com/blog/reducing-cold-start-latency-for-llm-inference-with-nvidia-runai-model-streamer/)**

A technical article introducing the NVIDIA Run:ai Model Streamer, an open-source SDK designed to significantly reduce cold start latency for LLM inference.

**[Build and scale adoption of AI agents for education with Strands Agents, Amazon Bedrock AgentCore, and LibreChat](https://aws.amazon.com/blogs/machine-learning/build-and-scale-adoption-of-ai-agents-for-education-with-strands-agents-amazon-bedrock-agentcore-and-librechat/)**

A practical blog post demonstrating how to build and scale sophisticated AI agents for education using Strands Agents, Amazon Bedrock AgentCore, and LibreChat.

## **Learning**

**[The Ultimate Guide to LLM Evaluation: Metrics, Methods & Best Practices](https://www.comet.com/site/blog/llm-evaluation-guide/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-evaluation-guide/)**

A comprehensive guide detailing essential LLM evaluation metrics, methods, and best practices to ensure the reliability, safety, and performance of AI-powered applications.

**[How to Train an LLM-RecSys Hybrid for Steerable Recs with Semantic IDs](https://eugeneyan.com/writing/semantic-ids/)**

A blog post detailing how to train an LLM-recommender hybrid system using semantic IDs to create steerable and explainable product recommendations that understand both natural language and item IDs.

**[Learn Your Way: Reimagining textbooks with generative AI](https://research.google/blog/learn-your-way-reimagining-textbooks-with-generative-ai/)**

A research blog post introducing "Learn Your Way," an experiment showcasing how generative AI can reimagine textbooks into personalized, multimodal learning experiences.

**[Verlog: A Multi-turn RL framework for LLM agents](https://blog.ml.cmu.edu/2025/09/15/verlog-a-multi-turn-rl-framework-for-llm-agents/)**

A research article introducing Verlog, a multi-turn reinforcement learning framework for LLM agents designed to handle long-horizon tasks with highly variable episode lengths.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope)**

Agent-Oriented Programming for Building LLM Applications

## **Papers & Publications**

**[Hierarchical Reasoning Model](https://arxiv.org/abs/2506.21734)**

**Abstract:**

Reasoning, the process of devising and executing complex goal-oriented action sequences, remains a critical challenge in AI. Current large language models (LLMs) primarily employ Chain-of-Thought (CoT) techniques, which suffer from brittle task decomposition, extensive data requirements, and high latency. Inspired by the hierarchical and multi-timescale processing in the human brain, we propose the Hierarchical Reasoning Model (HRM), a novel recurrent architecture that attains significant computational depth while maintaining both training stability and efficiency. HRM executes sequential reasoning tasks in a single forward pass without explicit supervision of the intermediate process, through two interdependent recurrent modules: a high-level module responsible for slow, abstract planning, and a low-level module handling rapid, detailed computations. With only 27 million parameters, HRM achieves exceptional performance on complex reasoning tasks using only 1000 training samples. The model operates without pre-training or CoT data, yet achieves nearly perfect performance on challenging tasks including complex Sudoku puzzles and optimal path finding in large mazes. Furthermore, HRM outperforms much larger models with significantly longer context windows on the Abstraction and Reasoning Corpus (ARC), a key benchmark for measuring artificial general intelligence capabilities. These results underscore HRM's potential as a transformative advancement toward universal computation and general-purpose reasoning systems.

**[From CVE Entries to Verifiable Exploits: An Automated Multi-Agent Framework for Reproducing CVEs](https://arxiv.org/abs/2509.01835)**

**Abstract:**

High-quality datasets of real-world vulnerabilities and their corresponding verifiable exploits are crucial resources in software security research. Yet such resources remain scarce, as their creation demands intensive manual effort and deep security expertise. In this paper, we present CVE-GENIE, an automated, large language model (LLM)-based multi-agent framework designed to reproduce real-world vulnerabilities, provided in Common Vulnerabilities and Exposures (CVE) format, to enable creation of high-quality vulnerability datasets. Given a CVE entry as input, CVE-GENIE gathers the relevant resources of the CVE, automatically reconstructs the vulnerable environment, and (re)produces a verifiable exploit. Our systematic evaluation highlights the efficiency and robustness of CVE-GENIE's design and successfully reproduces approximately 51% (428 of 841) CVEs published in 2024-2025, complete with their verifiable exploits, at an average cost of $2.77 per CVE. Our pipeline offers a robust method to generate reproducible CVE benchmarks, valuable for diverse applications such as fuzzer evaluation, vulnerability patching, and assessing AI's security capabilities.