---
title: "Deep Learning Weekly: Issue 421"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-09-10T15:02:53.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-421"
word_count: 944
estimated_read_time: 5
---

This week in deep learning, we bring you [Claude can now create and use files](https://www.anthropic.com/news/create-files), [Measuring Thinking Efficiency in Reasoning Models: The Missing Benchmark](https://nousresearch.com/measuring-thinking-efficiency-in-reasoning-models-the-missing-benchmark/), and [a paper on Parallel-R1: Towards Parallel Thinking via Reinforcement Learning](https://arxiv.org/abs/2509.07980).

You may also enjoy [The UAE Showcases Its Abilities In AI Reasoning With K2 Think Model](https://www.forbes.com/sites/patrickmoorhead/2025/09/09/the-uae-showcases-its-abilities-in-ai-reasoning-with-k2-think-model/), [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/), [a paper on On the Theoretical Limitations of Embedding-Based Retrieval](https://www.arxiv.org/abs/2508.21038) and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Claude can now create and use files \\ Anthropic](https://www.anthropic.com/news/create-files)**

Claude can now create and edit Excel spreadsheets, documents, PowerPoint slide decks, and PDFs directly in Claude.ai and the desktop app

**[The UAE Showcases Its Abilities In AI Reasoning With K2 Think Model](https://www.forbes.com/sites/patrickmoorhead/2025/09/09/the-uae-showcases-its-abilities-in-ai-reasoning-with-k2-think-model/)**

The Mohamed bin Zayed University of Artificial Intelligence and the G42 technology group have just announced the open-source K2 Think reasoning model.

**[A new generative AI approach to predicting chemical reactions](https://news.mit.edu/2025/generative-ai-approach-to-predicting-chemical-reactions-0903)**

A new generative AI system developed at MIT could provide realistic predictions for a wide variety of chemical reactions, while maintaining real-world physical constraints.

**[Atlassian acquires AI browser developer The Browser Company for $610M](https://siliconangle.com/2025/09/04/atlassian-acquires-ai-browser-developer-browser-company-610m/)**

Atlassian is buying The Browser Company, a startup that develops browsers with embedded AI features, for $610M.

**[Mistral AI raises $2B led by semiconductor equipment maker ASML at $14B valuation](https://siliconangle.com/2025/09/09/mistral-ai-raises-2b-led-chip-equipment-maker-asml-14b-valuation/)**

Mistral AI announced that it has raised €1.7 billion, about $2 billion, in a Series C funding round led by Dutch semiconductor equipment manufacturer ASML.

## **MLOps & LLMOps**

**[Nano Banana + Milvus: Turning Hype into Enterprise-Ready Multimodal RAG](https://milvus.io/blog/nano-banana-milvus-turning-hype-into-enterprise-ready-multimodal-rag.md)**

A blog post demonstrating how to integrate the Nano Banana image generation model with the Milvus vector database to build an enterprise-ready multimodal RAG system.

## **Learning**

**[Measuring Thinking Efficiency in Reasoning Models: The Missing Benchmark](https://nousresearch.com/measuring-thinking-efficiency-in-reasoning-models-the-missing-benchmark/)**

A critical report about a systematic investigation into the token efficiency of Large Reasoning Models, comparing open-weight and closed-weight models across various reasoning domains.

**[Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/)**

An explanatory research publication from OpenAI arguing that language models hallucinate because current evaluation methods reward guessing.

**[Welcome EmbeddingGemma, Google's new efficient embedding model](https://huggingface.co/blog/embeddinggemma)**

An article introducing Google's EmbeddingGemma, a new efficient, state-of-the-art multilingual embedding model with 308M parameters, designed for diverse natural language applications and on-device use cases.

**[Accelerating scientific discovery with AI-powered empirical software](https://research.google/blog/accelerating-scientific-discovery-with-ai-powered-empirical-software/)**

An article about an AI system that assists scientists in writing expert-level empirical software, achieving expert-level results across diverse scientific challenges

## **Libraries & Code**

**[ethz-spylab/agentdojo](https://github.com/ethz-spylab/agentdojo)**

A dynamic environment to evaluate attacks and defenses for LLM agents.

**[meta-llama/PurpleLlama](https://github.com/meta-llama/PurpleLlama/tree/main)**

Set of tools to assess and improve LLM security.

## **Papers & Publications**

**[Parallel-R1: Towards Parallel Thinking via Reinforcement Learning](https://arxiv.org/abs/2509.07980)**

**Abstract:**

Parallel thinking has emerged as a novel approach for enhancing the reasoning capabilities of large language models (LLMs) by exploring multiple reasoning paths concurrently. However, activating such capabilities through training remains challenging, as existing methods predominantly rely on supervised fine-tuning (SFT) over synthetic data, which encourages teacher-forced imitation rather than exploration and generalization. Different from them, we propose Parallel-R1, the first reinforcement learning (RL) framework that enables parallel thinking behaviors for complex real-world reasoning tasks. Our framework employs a progressive curriculum that explicitly addresses the cold-start problem in training parallel thinking with RL. We first use SFT on prompt-generated trajectories from easier tasks to instill the parallel thinking ability, then transition to RL to explore and generalize this skill on harder problems. Experiments on various math benchmarks, including MATH, AMC23, and AIME, show that Parallel-R1 successfully instills parallel thinking, leading to 8.4% accuracy improvements over the sequential thinking model trained directly on challenging tasks with RL. Further analysis reveals a clear shift in the model's thinking behavior: at an early stage, it uses parallel thinking as an exploration strategy, while in a later stage, it uses the same capability for multi-perspective verification. Most significantly, we validate parallel thinking as a mid-training exploration scaffold, where this temporary exploratory phase unlocks a higher performance ceiling after RL, yielding a 42.9% improvement over the baseline on AIME25.

**[On the Theoretical Limitations of Embedding-Based Retrieval](https://www.arxiv.org/abs/2508.21038)**

**Abstract:**

Vector embeddings have been tasked with an ever-increasing set of retrieval tasks over the years, with a nascent rise in using them for reasoning, instruction-following, coding, and more. These new benchmarks push embeddings to work for any query and any notion of relevance that could be given. While prior works have pointed out theoretical limitations of vector embeddings, there is a common assumption that these difficulties are exclusively due to unrealistic queries, and those that are not can be overcome with better training data and larger models. In this work, we demonstrate that we may encounter these theoretical limitations in realistic settings with extremely simple queries. We connect known results in learning theory, showing that the number of top-k subsets of documents capable of being returned as the result of some query is limited by the dimension of the embedding. We empirically show that this holds true even if we restrict to k=2, and directly optimize on the test set with free parameterized embeddings. We then create a realistic dataset called LIMIT that stress tests models based on these theoretical results, and observe that even state-of-the-art models fail on this dataset despite the simple nature of the task. Our work shows the limits of embedding models under the existing single vector paradigm and calls for future research to develop methods that can resolve this fundamental limitation.

**[Hermes 4 Technical Report](https://nousresearch.com/wp-content/uploads/2025/08/Hermes_4_Technical_Report.pdf)**

**Abstract:**

We present Hermes 4, a family of hybrid reasoning models that combine structured, multi-turn reasoning with broad instruction-following ability. We describe the challenges encountered during data curation, synthesis, training, and evaluation, and outline the solutions employed to address these challenges at scale. We comprehensively evaluate across mathematical reasoning, coding, knowledge comprehension, and alignment benchmarks, and we report both quantitative performance and qualitative behavioral analysis.