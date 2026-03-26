---
title: "Deep Learning Weekly: Issue 434"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-12-11T16:00:36.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-434"
word_count: 932
estimated_read_time: 5
---

This week in deep learning, we bring you [Introducing: Devstral 2 and Mistral Vibe CLI](https://mistral.ai/news/devstral-2-vibe-cli), [AI Agent Orchestration Flows](https://www.comet.com/site/blog/agent-orchestration/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=agent-orchestration/), and [a paper on Z-Image: An Efficient Image Generation Foundation Model with Single-Stream Diffusion Transformer](https://arxiv.org/abs/2511.22699).

You may also enjoy [MCP support for Apigee](https://cloud.google.com/blog/products/ai-machine-learning/mcp-support-for-apigee), [Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/), [a paper on DeepCode: Open Agentic Coding](https://arxiv.org/abs/2512.07921), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing: Devstral 2 and Mistral Vibe CLI](https://mistral.ai/news/devstral-2-vibe-cli)**

Mistral released Devstral 2, a state-of-the-art open-source coding model achieving 72.2% on SWE-bench Verified, alongside Mistral Vibe CLI.

**[MCP support for Apigee](https://cloud.google.com/blog/products/ai-machine-learning/mcp-support-for-apigee)**

Google Cloud announces Model Context Protocol (MCP) support in Apigee, allowing developers to turn existing APIs into secure, governed agentic tools without code changes or managing MCP servers.

**[Claude Code is coming to Slack, and that’s a bigger deal than it sounds](https://techcrunch.com/2025/12/08/claude-code-is-coming-to-slack-and-thats-a-bigger-deal-than-it-sounds/)**

Anthropic launches Claude Code in Slack beta, letting developers delegate complete coding workflows directly from chat threads.

**[OpenAI to acquire Neptune](https://openai.com/index/openai-to-acquire-neptune/)**

OpenAI has entered into a definitive agreement to acquire neptune.ai, strengthening the tools and infrastructure that support progress in frontier research.

**[Multimodal AI provider fal nabs $140M amid rapid growth](https://siliconangle.com/2025/12/09/multimodal-ai-provider-fal-nabs-140m-amid-rapid-growth/)**

Multimodal AI startup fal raised a $140 million series D led by Sequoia, growing revenue by 300% since July with 600+ AI models for image, audio, and video generation.

**[Oboe raises $16 million from a16z for its AI-powered course generation platform](https://techcrunch.com/2025/12/10/oboe-raises-16-million-from-a16z-for-its-ai-powered-course-generation-platform/)**

Oboe, a learning startup from Anchor co-founders and former Spotify execs Nir Zicherman and Michael Mignano, has raised $16 million in Series A funding led by a16z.

## **MLOps & LLMOps**.

**[AI Agent Orchestration Flows](https://www.comet.com/site/blog/agent-orchestration/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=agent-orchestration/)**

An explanatory post defining agent orchestration as the architectural layer that manages non-deterministic control flow and the iterative Thought-Action-Observation cycle.

**[Top 5 AI Model Optimization Techniques for Faster, Smarter Inference](https://developer.nvidia.com/blog/top-5-ai-model-optimization-techniques-for-faster-smarter-inference/)**

A technical blog post detailing the top five AI model optimization techniques to improve inference speed, TCO, and scalability on NVIDIA GPUs.

## **Learning**

**[Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)**

An article analyzing Claude’s Agent Skills system as a prompt-based meta-tool architecture that modifies the conversation and execution contexts by injecting hidden instructions and changing tool permissions,

**[The AI churn wave?](https://www.growthunhinged.com/p/the-ai-churn-wave)**

A post investigating the low gross and net revenue retention rates among AI-native companies, identifying an “AI tourist problem” especially pronounced in low-priced products that see GRR as low as 23%.

**[A Technical Tour of the DeepSeek Models from V3 to V3.2](https://magazine.sebastianraschka.com/p/technical-deepseek)**

A technical article detailing the architectural evolution of DeepSeek flagship models from V3 to V3.2, focusing on the efficiency gains from DeepSeek Sparse Attention and the implementation of self-verification for improved reasoning capabilities.

**[Validating LLM-as-a-Judge Systems under Rating Indeterminacy](https://blog.ml.cmu.edu/2025/12/09/validating-llm-as-a-judge-systems-under-rating-indeterminacy/)**

An article about validating LLM judges under rating indeterminacy, proposing a framework that uses response set elicitation and multi-label agreement metrics to better select judges for evaluation tasks when multiple interpretations are valid.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[block/goose](https://github.com/block/goose)**

A local, extensible, open source AI agent that automates engineering tasks

## **Papers & Publications**

**[Z-Image: An Efficient Image Generation Foundation Model with Single-Stream Diffusion Transformer](https://arxiv.org/abs/2511.22699)**

**Abstract:**

The landscape of high-performance image generation models is currently dominated by proprietary systems, such as Nano Banana Pro and Seedream 4.0. Leading open-source alternatives, including Qwen-Image, Hunyuan-Image-3.0 and FLUX.2, are characterized by massive parameter counts (20B to 80B), making them impractical for inference, and fine-tuning on consumer-grade hardware. To address this gap, we propose Z-Image, an efficient 6B-parameter foundation generative model built upon a Scalable Single-Stream Diffusion Transformer (S3-DiT) architecture that challenges the “scale-at-all-costs” paradigm. By systematically optimizing the entire model lifecycle -- from a curated data infrastructure to a streamlined training curriculum -- we complete the full training workflow in just 314K H800 GPU hours (approx. $630K). Our few-step distillation scheme with reward post-training further yields Z-Image-Turbo, offering both sub-second inference latency on an enterprise-grade H800 GPU and compatibility with consumer-grade hardware (<16GB VRAM). Additionally, our omni-pre-training paradigm also enables efficient training of Z-Image-Edit, an editing model with impressive instruction-following capabilities. Both qualitative and quantitative experiments demonstrate that our model achieves performance comparable to or surpassing that of leading competitors across various dimensions. Most notably, Z-Image exhibits exceptional capabilities in photorealistic image generation and bilingual text rendering, delivering results that rival top-tier commercial models, thereby demonstrating that state-of-the-art results are achievable with significantly reduced computational overhead. We publicly release our code, weights, and online demo to foster the development of accessible, budget-friendly, yet state-of-the-art generative models.

**[DeepCode: Open Agentic Coding](https://arxiv.org/abs/2512.07921)**

**Abstract:**

Recent advances in large language models (LLMs) have given rise to powerful coding agents, making it possible for code assistants to evolve into code engineers. However, existing methods still face significant challenges in achieving high-fidelity document-to-codebase synthesis--such as scientific papers to code--primarily due to a fundamental conflict between information overload and the context bottlenecks of LLMs. In this work, we introduce DeepCode, a fully autonomous framework that fundamentally addresses this challenge through principled information-flow management. By treating repository synthesis as a channel optimization problem, DeepCode seamlessly orchestrates four information operations to maximize task-relevant signals under finite context budgets: source compression via blueprint distillation, structured indexing using stateful code memory, conditional knowledge injection via retrieval-augmented generation, and closed-loop error correction. Extensive evaluations on the PaperBench benchmark demonstrate that DeepCode achieves state-of-the-art performance, decisively outperforming leading commercial agents such as Cursor and Claude Code, and crucially, surpassing PhD-level human experts from top institutes on key reproduction metrics.

By systematically transforming paper specifications into production-grade implementations comparable to human expert quality, this work establishes new foundations for autonomous scientific reproduction that can accelerate research evaluation and discovery.