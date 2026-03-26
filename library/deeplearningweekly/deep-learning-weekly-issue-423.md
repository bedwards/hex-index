---
title: "Deep Learning Weekly: Issue 423"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-09-24T15:02:42.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-423"
word_count: 996
estimated_read_time: 5
---

This week in deep learning, we bring you [DeepSeek-V3.1-Terminus](https://venturebeat.com/ai/deepseek-v3-1-terminus-launches-with-improved-agentic-tool-use-and-reduced), [Introduction to LLM-as-a-Judge For Evals](https://www.comet.com/site/blog/llm-as-a-judge/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-as-a-judge/), and [a paper on LIMI: Less is More for Agency](https://arxiv.org/abs/2509.17567).

You may also enjoy [Luma AI launches Ray3](https://siliconangle.com/2025/09/18/luma-ai-launches-ray3-next-gen-cinematic-video-generation-model-built-reasoning/), [The “Super Weight:” How Even a Single Parameter can Determine a Large Language Model’s Behavior](https://machinelearning.apple.com/research/the-super-weight), [a paper on Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing](https://arxiv.org/abs/2509.08721) and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[DeepSeek-V3.1-Terminus](https://venturebeat.com/ai/deepseek-v3-1-terminus-launches-with-improved-agentic-tool-use-and-reduced)**

The DeepSeek team introduced DeepSeek-V3.1-Terminus, an upgraded version of its V3.1, designed to improve language consistency and agentic tool effectiveness.

**[Luma AI launches Ray3](https://siliconangle.com/2025/09/18/luma-ai-launches-ray3-next-gen-cinematic-video-generation-model-built-reasoning/)**

Luma AI announced the launch of Ray3, a powerful text-to-video AI model with built-in reasoning, designed for high-quality cinematic visual production for professionals.

**[Strengthening our Frontier Safety Framework](https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/)**

The DeepMind team published the third iteration of their Frontier Safety Framework (FSF) — their most comprehensive approach yet to identifying and mitigating severe risks from advanced AI models.

**[Former NotebookLM devs’ new app, Huxe, taps audio to help you with news and research](https://techcrunch.com/2025/09/23/former-notebooklm-devs-new-app-huxe-taps-audio-to-help-you-with-news-and-research/)**

Former NotebookLM devs are now building an audio-first app called Huxe, which can similarly help users dive deep into topics by generating a “podcast” with multiple AI hosts.

**[Gemini comes to Google TV](https://blog.google/products/google-tv/gemini-google-tv/)**

Google introduced Gemini for TV for engaging in free-flowing conversations with your big screen.

## **MLOps & LLMOps**

**[Introduction to LLM-as-a-Judge For Evals](https://www.comet.com/site/blog/llm-as-a-judge/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-as-a-judge/)**

A guide on how to use one LLM to evaluate and score the outputs of another, the pros and cons of this approach, and the steps to getting started using LLM-as-a-Judge.

**[A postmortem of three recent issues \\ Anthropic](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)**

A comprehensive postmortem about three complex, overlapping infrastructure bugs that intermittently degraded Claude’s response quality.

**[Rapid ML experimentation for enterprises with Amazon SageMaker AI and Comet](https://aws.amazon.com/blogs/machine-learning/rapid-ml-experimentation-for-enterprises-with-amazon-sagemaker-ai-and-comet/)**

An article demonstrating a fraud detection workflow using Amazon SageMaker AI and Comet to provide enterprises with robust experiment management, reproducibility, and audit-ready logging.

**[Adding Document Understanding to Claude Code](https://www.llamaindex.ai/blog/adding-document-understanding-to-claude-code)**

A blog post detailing three methods, including using MCP and enhanced CLI commands, to equip Claude Code with document understanding capabilities for enterprise applications.

**[An Introduction to Speculative Decoding for Reducing Latency in AI Inference](https://developer.nvidia.com/blog/an-introduction-to-speculative-decoding-for-reducing-latency-in-ai-inference)**

A technical blog post introducing speculative decoding, an inference optimization technique that significantly reduces LLM latency by using a lightweight draft mechanism.

## **Learning**

**[Deep researcher with test-time diffusion](https://research.google/blog/deep-researcher-with-test-time-diffusion/)**

A blog post introducing the Test-Time Diffusion Deep Researcher (TTD-DR) framework, which imitates human research by iteratively refining a preliminary draft using retrieved information.

**[The “Super Weight:” How Even a Single Parameter can Determine a Large Language Model’s Behavior](https://machinelearning.apple.com/research/the-super-weight)**

A research highlight reveals that preserving “super weights”—an extremely small subset of parameters—is critical for maintaining LLM functionality and achieving competitive performance during model compression.

**[Diffusion Beats Autoregressive in Data-Constrained Settings](https://blog.ml.cmu.edu/2025/09/23/diffusion-beats-autoregressive-in-data-constrained-settings/)**

A post detailing research findings that masked diffusion models consistently outperform autoregressive models in data-constrained settings by extracting more value from repeated data.

**[Smol2Operator: Post-Training GUI Agents for Computer Use](https://huggingface.co/blog/smol2operator)**

A detailed article outlining a multi-phase training strategy to transform the SmolVLM2-2.2B-Instruct model into an agentic GUI coder capable of robust perception and planning.

**[Thinking, Searching, and Acting - by Nathan Lambert](https://www.interconnects.ai/p/thinking-searching-and-acting)**

An article reflecting on how modern frontier AI systems have converged on three key primitives—Thinking, Searching, and Acting.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[LIMI: Less is More for Agency](https://arxiv.org/abs/2509.17567)**

**Abstract:**

We define Agency as the emergent capacity of AI systems to function as autonomous agents actively discovering problems, formulating hypotheses, and executing solutions through self-directed engagement with environments and tools. This fundamental capability marks the dawn of the Age of AI Agency, driven by a critical industry shift: the urgent need for AI systems that don’t just think, but work. While current AI excels at reasoning and generating responses, industries demand autonomous agents that can execute tasks, operate tools, and drive real-world outcomes. As agentic intelligence becomes the defining characteristic separating cognitive systems from productive workers, efficiently cultivating machine autonomy becomes paramount. Current approaches assume that more data yields better agency, following traditional scaling laws from language modeling. We fundamentally challenge this paradigm. LIMI (Less Is More for Intelligent Agency) demonstrates that agency follows radically different development principles. Through strategic focus on collaborative software development and scientific research workflows, we show that sophisticated agentic intelligence can emerge from minimal but strategically curated demonstrations of autonomous behavior. Using only 78 carefully designed training samples, LIMI achieves 73.5% on comprehensive agency benchmarks, dramatically outperforming state-of-the-art models: Kimi-K2-Instruct (24.1%), DeepSeek-V3.1 (11.9%), Qwen3-235B-A22B-Instruct (27.5%), and GLM-4.5 (45.1%). Most strikingly, LIMI demonstrates 53.7% improvement over models trained on 10,000 samples-achieving superior agentic intelligence with 128 times fewer samples. Our findings establish the Agency Efficiency Principle: machine autonomy emerges not from data abundance but from strategic curation of high-quality agentic demonstrations.

**[Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing](https://arxiv.org/abs/2509.08721)**

**Abstract:**

Post-training language models (LMs) with reinforcement learning (RL) can enhance their complex reasoning capabilities without supervised fine-tuning, as demonstrated by DeepSeek-R1-Zero. However, effectively utilizing RL for LMs requires significant parallelization to scale-up inference, which introduces non-trivial technical challenges (e.g. latency, memory, and reliability) alongside ever-growing financial costs. We present Swarm sAmpling Policy Optimization (SAPO), a fully decentralized and asynchronous RL post-training algorithm. SAPO is designed for decentralized networks of heterogenous compute nodes, where each node manages its own policy model(s) while “sharing” rollouts with others in the network; no explicit assumptions about latency, model homogeneity, or hardware are required and nodes can operate in silo if desired. As a result, the algorithm avoids common bottlenecks in scaling RL post-training while also allowing (and even encouraging) new possibilities. By sampling rollouts “shared” across the network, it enables “Aha moments” to propagate, thereby bootstrapping the learning process. In this paper we show SAPO achieved cumulative reward gains of up to 94% in controlled experiments. We also share insights from tests on a network with thousands of nodes contributed by Gensyn community members running the algorithm on diverse hardware and models during an open-source demo.