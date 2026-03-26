---
title: "Deep Learning Weekly: Issue 416"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-08-06T15:02:51.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-416"
word_count: 1023
estimated_read_time: 6
---

This week in deep learning, we bring you [OpenAI's gpt-oss](https://openai.com/index/introducing-gpt-oss/), [Pretraining: Breaking Down the Modern LLM Training Pipeline](https://www.comet.com/site/blog/pretraining/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=pretraining/), and [a paper on Routine: A Structural Planning Framework for LLM Agent System in Enterprise](https://arxiv.org/html/2507.14447).

You may also enjoy [Anthropic's Claude Opus 4.1](https://www.anthropic.com/news/claude-opus-4-1), [Full-Stack Alignment: Co-Aligning AI and Institutions with Thick Models of Value](https://www.full-stack-alignment.ai/paper), [a paper on Self-Improving Language Models for Evolutionary Program Synthesis: A Case Study on ARC-AGI](https://icml.cc/virtual/2025/poster/43499), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing gpt-oss | OpenAI](https://openai.com/index/introducing-gpt-oss/)**

OpenAI just released gpt-oss-120b and gpt-oss-20b—two state-of-the-art open-weight language models that deliver strong real-world performance at low cost.

**[Claude Opus 4.1 \\ Anthropic](https://www.anthropic.com/news/claude-opus-4-1)**

Anthropic released Claude Opus 4.1, an upgrade to Claude Opus 4 on agentic tasks, real-world coding, and reasoning.

**[Genie 3: A new frontier for world models](https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/)**

The DeepMind team announced Genie 3, a general purpose world model that can generate an unprecedented diversity of interactive environments.

**[Introducing Command A Vision: Multimodal AI Built for Business](https://cohere.com/blog/command-a-vision)**

The Cohere team introduced Command A Vision, a new state-of-the-art generative model that brings enterprises leading performance across multimodal vision tasks while maintaining strong text capabilities.

## **MLOps & LLMOps**

**[Pretraining: Breaking Down the Modern LLM Training Pipeline](https://www.comet.com/site/blog/pretraining/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=pretraining/)**

The line between pretraining and fine-tuning in LLMs is increasingly blurred, making it harder to define what "training" means today. This article explores how evolving methods, inconsistent terminology, and opaque pipelines complicate understanding model behavior, emphasizing the critical role of pretraining and data curation in scaling LLMs responsibly.

**[AI judging AI: Scaling unstructured text analysis with Amazon Nova](https://aws.amazon.com/blogs/machine-learning/ai-judging-ai-scaling-unstructured-text-analysis-with-amazon-nova/)**

A practical blog post about deploying LLM jury systems on Amazon Bedrock to scale unstructured text analysis.

**[Remember this: Agent state and memory with ADK](https://cloud.google.com/blog/topics/developers-practitioners/remember-this-agent-state-and-memory-with-adk)**

A Google Cloud blog post illustrating how to implement short-term and long-term memory for AI agents using the Agent Development Kit (ADK) and Vertex AI Memory Bank.

## **Learning**

**[Full-Stack Alignment: Co-Aligning AI and Institutions with Thick Models of Value](https://www.full-stack-alignment.ai/paper)**

A research paper that proposes full-stack alignment and thick models of value as an alternative to current human-AI value alignment approaches.

**[Why, When and How to Fine-Tune a Custom Embedding Model](https://weaviate.io/blog/fine-tune-embedding-model)**

A comprehensive technical article detailing the why, when, and how of fine-tuning custom text embedding models to improve retrieval performance in RAG systems.

**[FM-Intent: Predicting User Session Intent with Hierarchical Multi-Task Learning](https://netflixtechblog.com/fm-intent-predicting-user-session-intent-with-hierarchical-multi-task-learning-94c75e18f4b8)**

A technical article describing Netflix's FM-Intent model, which utilizes hierarchical multi-task learning to predict user session intent and significantly enhance next-item recommendations.

**[If You Understand Life, You've Already Mastered Reinforcement Learning](https://yexijiang.substack.com/p/if-you-understand-life-youve-already)**

An article that demystifies the fundamental concepts of reinforcement learning by illustrating them through relatable human experiences and everyday life scenarios.

## **Libraries & Code**

**[dyad-sh/dyad](https://github.com/dyad-sh/dyad)**

Free, local, open-source AI app builder

**[EleutherAI/sparsify](https://github.com/EleutherAI/sparsify)**

Sparsify transformers with SAEs and transcoders

## **Papers & Publications**

**[Self-Improving Language Models for Evolutionary Program Synthesis: A Case Study on ARC-AGI](https://icml.cc/virtual/2025/poster/43499)**

**Abstract:**

Many program synthesis tasks prove too challenging for even state-of-the-art language models to solve in single attempts. Search-based evolutionary methods offer a promising alternative by exploring solution spaces iteratively, but their effectiveness remain limited by the fixed capabilities of the underlying generative model. We propose SOAR, a method that learns program synthesis by integrating language models into a self-improving evolutionary loop. SOAR alternates between (1) an evolutionary search that uses an LLM to sample and refine candidate solutions, and (2) a hindsight learning phase that converts search attempts into valid problem-solution pairs used to fine-tune the LLM's sampling and refinement capabilities—enabling increasingly effective search in subsequent iterations.On the challenging ARC-AGI benchmark, SOAR achieves significant performance gains across model scales and iterations, leveraging positive transfer between the sampling and refinement finetuning tasks. These improvements carry over to test-time adaptation, enabling SOAR to solve 52\\% of the public test set.

**[Routine: A Structural Planning Framework for LLM Agent System in Enterprise](https://arxiv.org/html/2507.14447)**

**Abstract:**

The deployment of agent systems in an enterprise environment is often hindered by several challenges: common models lack domain-specific process knowledge, leading to disorganized plans, missing key tools, and poor execution stability. To address this, this paper introduces Routine, a multi-step agent planning framework designed with a clear structure, explicit instructions, and seamless parameter passing to guide the agent’s execution module in performing multi-step tool-calling tasks with high stability. In evaluations conducted within a real-world enterprise scenario, Routine significantly increases the execution accuracy in model tool calls, increasing the performance of GPT-4o from 41.1% to 96.3%, and Qwen3-14B from 32.6% to 83.3%. We further constructed a Routine-following training dataset and fine-tuned Qwen3-14B, resulting in an accuracy increase to 88.2% on scenario-specific evaluations, indicating improved adherence to execution plans. In addition, we employed Routine-based distillation to create a scenario-specific, multi-step tool-calling dataset. Fine-tuning on this distilled dataset raised the model’s accuracy to 95.5%, approaching GPT-4o’s performance. These results highlight Routine’s effectiveness in distilling domain-specific tool-usage patterns and enhancing model adaptability to new scenarios. Our experimental results demonstrate that Routine provides a practical and accessible approach to building stable agent workflows, accelerating the deployment and adoption of agent systems in enterprise environments, and advancing the technical vision of AI for Process.

**[Machine Bullshit: Characterizing the Emergent Disregard for Truth in Large Language Models](https://arxiv.org/abs/2507.07484)**

**Abstract:**

Bullshit, as conceptualized by philosopher Harry Frankfurt, refers to statements made without regard to their truth value. While previous work has explored large language model (LLM) hallucination and sycophancy, we propose machine bullshit as an overarching conceptual framework that can allow researchers to characterize the broader phenomenon of emergent loss of truthfulness in LLMs and shed light on its underlying mechanisms. We introduce the Bullshit Index, a novel metric quantifying LLMs' indifference to truth, and propose a complementary taxonomy analyzing four qualitative forms of bullshit: empty rhetoric, paltering, weasel words, and unverified claims. We conduct empirical evaluations on the Marketplace dataset, the Political Neutrality dataset, and our new BullshitEval benchmark (2,400 scenarios spanning 100 AI assistants) explicitly designed to evaluate machine bullshit. Our results demonstrate that model fine-tuning with reinforcement learning from human feedback (RLHF) significantly exacerbates bullshit and inference-time chain-of-thought (CoT) prompting notably amplify specific bullshit forms, particularly empty rhetoric and paltering. We also observe prevalent machine bullshit in political contexts, with weasel words as the dominant strategy. Our findings highlight systematic challenges in AI alignment and provide new insights toward more truthful LLM behavior.