---
title: "Deep Learning Weekly: Issue 418"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-08-20T15:03:06.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-418"
word_count: 1031
estimated_read_time: 6
---

This week in deep learning, we bring you [Gemma 3 270M](https://developers.googleblog.com/en/introducing-gemma-3-270m/), [Best Practices for Building Agentic AI Systems: What Actually Works in Production](https://userjot.com/blog/best-practices-building-agentic-ai-systems), and [a paper on GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457).

You may also enjoy [NVIDIA Nemotron Nano 2](https://research.nvidia.com/labs/adlr/NVIDIA-Nemotron-Nano-2/), [Beyond billion-parameter burdens: Unlocking data synthesis with a conditional generator](https://research.google/blog/beyond-billion-parameter-burdens-unlocking-data-synthesis-with-a-conditional-generator/), [a paper on Technical Report: Evaluating Goal Drift in Language Model Agents](https://arxiv.org/abs/2505.02709), and more!

As always, happy reading and hacking. If you have something you think should be in next week's issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Gemma 3 270M: The compact model for hyper-efficient AI](https://developers.googleblog.com/en/introducing-gemma-3-270m/)**

Google introduced Gemma 3 270M, a compact, 270-million parameter model designed for task-specific fine-tuning.

**[NVIDIA Nemotron Nano 2](https://research.nvidia.com/labs/adlr/NVIDIA-Nemotron-Nano-2/)**

The NVIDIA team released the NVIDIA Nemotron Nano 2 family of accurate and efficient hybrid Mamba-Transformer reasoning models.

**[DINOv3: Self-supervised learning for vision at unprecedented scale](https://ai.meta.com/blog/dinov3-self-supervised-vision-model/)**

Meta released DINOv3, a generalist, state-of-the-art computer vision model trained with self-supervised learning that produces superior high-resolution visual features.

**[LFM2-VL: Efficient Vision-Language Models](https://www.liquid.ai/blog/lfm2-vl-efficient-vision-language-models)**

Liquid AI released LFM2-VL, their first series of vision-language foundation models.

**[Researchers glimpse the inner workings of protein language models](https://news.mit.edu/2025/researchers-glimpse-inner-workings-protein-language-models-0818)**

In a new study, MIT researchers use sparse autoencoders to determine what features a protein language model takes into account when making predictions.

## **MLOps & LLMOps**

**[Best Practices for Building Agentic AI Systems: What Actually Works in Production](https://userjot.com/blog/best-practices-building-agentic-ai-systems)**

A practical article about best practices for building and implementing agentic AI systems in production, covering architectural patterns, communication, error handling, and performance optimization.

**[Hands-On with VDBBench: Benchmarking Vector Databases for POCs That Match Production](https://milvus.io/blog/hands-on-with-vdbbench-benchmarking-vector-databases-for-pocs-that-match-production.md)**

A practical tutorial on evaluating vector databases for production-matching Proof of Concepts using the VDBBench tool with custom, real-world datasets.

## **Learning**

**[Beyond billion-parameter burdens: Unlocking data synthesis with a conditional generator](https://research.google/blog/beyond-billion-parameter-burdens-unlocking-data-synthesis-with-a-conditional-generator/)**

A blog post from Google detailing CTCL, a novel framework for generating privacy-preserving synthetic data using a lightweight 140M-parameter model, bypassing the need for billion-scale LLM fine-tuning and domain-specific prompt engineering.

**[From Zero to GPU: A Guide to Building and Scaling Production-Ready CUDA Kernels](https://huggingface.co/blog/kernel-builder)**

A comprehensive guide on building and scaling production-ready custom CUDA kernels for PyTorch.

**[Accelerating MoE’s with a Triton Persistent Cache-Aware Grouped GEMM Kernel](https://pytorch.org/blog/accelerating-moes-with-a-triton-persistent-cache-aware-grouped-gemm-kernel/)**

A post on optimizing Triton BF16 Grouped GEMM kernel for running training and inference on Mixture-of-Experts (MoE) models, such as DeepSeekv3.

## **Libraries & Code**

**[huggingface/aisheets](https://github.com/huggingface/aisheets)**

Build, enrich, and transform datasets using AI models with no code.

**[plastic-labs/honcho](https://github.com/plastic-labs/honcho)**

An infrastructure layer for building AI agents with social cognition and theory-of-mind capabilities.

## **Papers & Publications**

**[GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457)**

**Abstract:**

Large language models (LLMs) are increasingly adapted to downstream tasks via reinforcement learning (RL) methods like Group Relative Policy Optimization (GRPO), which often require thousands of rollouts to learn new tasks. We argue that the interpretable nature of language can often provide a much richer learning medium for LLMs, compared with policy gradients derived from sparse, scalar rewards. To test this, we introduce GEPA (Genetic-Pareto), a prompt optimizer that thoroughly incorporates natural language reflection to learn high-level rules from trial and error. Given any AI system containing one or more LLM prompts, GEPA samples system-level trajectories (e.g., reasoning, tool calls, and tool outputs) and reflects on them in natural language to diagnose problems, propose and test prompt updates, and combine complementary lessons from the Pareto frontier of its own attempts. As a result of GEPA's design, it can often turn even just a few rollouts into a large quality gain. Across four tasks, GEPA outperforms GRPO by 10% on average and by up to 20%, while using up to 35x fewer rollouts. GEPA also outperforms the leading prompt optimizer, MIPROv2, by over 10% across two LLMs, and demonstrates promising results as an inference-time search strategy for code optimization.

**[Technical Report: Evaluating Goal Drift in Language Model Agents](https://arxiv.org/abs/2505.02709)**

**Abstract:**

As language models (LMs) are increasingly deployed as autonomous agents, their robust adherence to human-assigned objectives becomes crucial for safe operation. When these agents operate independently for extended periods without human oversight, even initially well-specified goals may gradually shift. Detecting and measuring goal drift - an agent's tendency to deviate from its original objective over time - presents significant challenges, as goals can shift gradually, causing only subtle behavioral changes. This paper proposes a novel approach to analyzing goal drift in LM agents. In our experiments, agents are first explicitly given a goal through their system prompt, then exposed to competing objectives through environmental pressures. We demonstrate that while the best-performing agent (a scaffolded version of Claude 3.5 Sonnet) maintains nearly perfect goal adherence for more than 100,000 tokens in our most difficult evaluation setting, all evaluated models exhibit some degree of goal drift. We also find that goal drift correlates with models' increasing susceptibility to pattern-matching behaviors as the context length grows.

**[Thyme: Think Beyond Images](https://arxiv.org/abs/2508.11630)**

**Abstract:**

Following OpenAI's introduction of the \`\`thinking with images'' concept, recent efforts have explored stimulating the use of visual information in the reasoning process to enhance model performance in perception and reasoning tasks. However, to the best of our knowledge, no open-source work currently offers a feature set as rich as proprietary models (O3), which can perform diverse image manipulations and simultaneously enhance logical reasoning capabilities through code. In this paper, we make a preliminary attempt in this direction by introducing Thyme (Think Beyond Images), a novel paradigm for enabling MLLMs to transcend existing \`\`think with images'' approaches by autonomously generating and executing diverse image processing and computational operations via executable code. This approach not only facilitates a rich, on-the-fly set of image manipulations (e.g., cropping, rotation, contrast enhancement) but also allows for mathematical computations, all while maintaining high autonomy in deciding when and how to apply these operations. We activate this capability through a two-stage training strategy: an initial SFT on a curated dataset of 500K samples to teach code generation, followed by a RL phase to refine decision-making. For the RL stage, we manually collect and design high-resolution question-answer pairs to increase the learning difficulty, and we propose GRPO-ATS (Group Relative Policy Optimization with Adaptive Temperature Sampling), an algorithm that applies distinct temperatures to text and code generation to balance reasoning exploration with code execution precision. We conduct extensive experimental analysis and ablation studies. Comprehensive evaluations on nearly 20 benchmarks show that Thyme yields significant and consistent performance gains, particularly in challenging high-resolution perception and complex reasoning tasks.