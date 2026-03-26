---
title: "Deep Learning Weekly: Issue 429"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-11-05T16:45:55.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-429"
word_count: 1096
estimated_read_time: 6
---

This week in deep learning, we bring you [Introducing Aardvark: OpenAI’s agentic security researcher](https://openai.com/index/introducing-aardvark/), [Stress-testing model specs reveals character differences among language models](https://alignment.anthropic.com/2025/stress-testing-model-specs/), and [a paper on Kimi Linear: An Expressive, Efficient Attention Architecture](https://arxiv.org/abs/2510.26692).

You may also enjoy [State of AI Ethics Report Volume 7](https://brief.montrealethics.ai/p/special-edition-state-of-ai-ethics), [Beyond Standard LLMs](https://magazine.sebastianraschka.com/p/beyond-standard-llms), [a paper on LinEAS: End-to-end Learning of Activation Steering with a Distributional Loss](https://machinelearning.apple.com/research/end-to-end-learning), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[Introducing Aardvark: OpenAI’s agentic security researcher](https://openai.com/index/introducing-aardvark/)**

OpenAI announced Aardvark, an agentic security researcher powered by GPT‑5.

**[State of AI Ethics Report (SAIER) Volume 7](https://brief.montrealethics.ai/p/special-edition-state-of-ai-ethics)**

A special edition report overview discussing the State of AI Ethics in 2025, which analyzes geopolitical conflicts, societal impacts, and community-centered solutions.

**[Real-Time Text-to-SQL Behind Snowflake Intelligence](https://www.snowflake.com/en/engineering-blog/real-time-text-to-sql-snowflake-intelligence/)**

Snowflake introduced Arctic-Text2SQL-R1.5, a model purpose-built for Snowflake SQL that delivers superior accuracy and up to 3x lower latency compared to general LLMs for real-time analytics.

**[In a First, AI Models Analyze Language As Well As a Human Expert](https://www.quantamagazine.org/in-a-first-ai-models-analyze-language-as-well-as-a-human-expert-20251031/)**

Research shows that OpenAI’s o1 exhibited metalinguistic abilities by successfully analyzing complex recursion and inferring rules of newly invented phonological systems.

**[OpenAI inks $38B AI infrastructure deal with AWS](https://siliconangle.com/2025/11/03/openai-inks-38b-ai-infrastructure-deal-aws/)**

OpenAI will rent $38 billion worth of cloud infrastructure from AWS as part of a seven-year partnership.

## **MLOps & LLMOps**.

**[Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack Scale Systems](https://developer.nvidia.com/blog/scaling-large-moe-models-with-wide-expert-parallelism-on-nvl72-rack-scale-systems/)**

A technical blog post explaining how NVIDIA TensorRT-LLM’s Wide Expert Parallelism efficiently scales large Mixture-of-Experts models on GB200 NVL72 systems, achieving significant performance and cost improvements.

**[Streamlining clinical trial software configurations using Amazon Bedrock](https://aws.amazon.com/blogs/machine-learning/clario-streamlines-clinical-trial-software-configurations-using-amazon-bedrock/)**

A blog post about how Clario automates and streamlines complex clinical trial software configurations using Claude and Amazon Bedrock.

**[Build your first AI Agent with Gemini, n8n and Google Cloud Run](https://www.philschmid.de/n8n-cloud-run-gemini)**

A tutorial detailing the steps required to deploy the open-source n8n workflow automation tool on Google Cloud Run and configure a basic AI Agent.

## **Learning**

**[Stress-testing model specs reveals character differences among language models](https://alignment.anthropic.com/2025/stress-testing-model-specs/)**

A blog post detailing a methodology that stress-tested LLM specifications across 300,000 scenarios, uncovering hidden contradictions and distinct behavioral patterns among frontier models.

**[How a 7-Million Parameter Model Beats GPT, Gemini, and Claude at Reasoning](https://www.artificialintelligencemadesimple.com/p/how-a-7-million-parameter-model-beats)**

A comprehensive breakdown of the Tiny Recursive Model (TRM), a 7-million parameter architecture that achieves superior performance on hard reasoning tasks.

**[Beyond Standard LLMs](https://magazine.sebastianraschka.com/p/beyond-standard-llms)**

An explanatory article introducing several non-standard LLM architectures, including efficient linear attention hybrids, parallel text diffusion models, code world models, and small recursive transformers.

**[Teaching AI to Listen: Building the First Benchmark for Pediatric Speech Disorders](https://ai.stanford.edu/blog/slp-helm/)**

A blog post about developing SLPHelm, the first benchmark for pediatric speech disorders.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

**[sst/opencode](https://github.com/sst/opencode)**

The AI coding agent built for the terminal.

## **Papers & Publications**

**[Kimi Linear: An Expressive, Efficient Attention Architecture](https://arxiv.org/abs/2510.26692)**

**Abstract:**

We introduce Kimi Linear, a hybrid linear attention architecture that, for the first time, outperforms full attention under fair comparisons across various scenarios -- including short-context, long-context, and reinforcement learning (RL) scaling regimes. At its core lies Kimi Delta Attention (KDA), an expressive linear attention module that extends Gated DeltaNet with a finer-grained gating mechanism, enabling more effective use of limited finite-state RNN memory. Our bespoke chunkwise algorithm achieves high hardware efficiency through a specialized variant of the Diagonal-Plus-Low-Rank (DPLR) transition matrices, which substantially reduces computation compared to the general DPLR formulation while remaining more consistent with the classical delta rule. We pretrain a Kimi Linear model with 3B activated parameters and 48B total parameters, based on a layerwise hybrid of KDA and Multi-Head Latent Attention (MLA). Our experiments show that with an identical training recipe, Kimi Linear outperforms full MLA with a sizeable margin across all evaluated tasks, while reducing KV cache usage by up to 75% and achieving up to 6 times decoding throughput for a 1M context. These results demonstrate that Kimi Linear can be a drop-in replacement for full attention architectures with superior performance and efficiency, including tasks with longer input and output lengths.

**[LinEAS: End-to-end Learning of Activation Steering with a Distributional Loss](https://machinelearning.apple.com/research/end-to-end-learning)**

**Abstract:**

The growing use of generative models in daily life calls for efficient mechanisms to control their generation, to e.g., produce safe content or provide users with tools to explore style changes. Ideally, such mechanisms should require low volume of unpaired data (i.e., without explicit preference), and should be cheap, both at train and inference time, while preserving output quality. Recent research has shown that such mechanisms can be obtained by intervening exclusively on model activations, with the goal of correcting distributional differences between activations seen when using prompts from a source vs. a target set (e.g., toxic and non-toxic sentences). While cheap, these fast methods are inherently crude: their maps are tuned locally, not accounting for their impact on downstream layers, resulting in interventions that cause unintended shifts when used out-of-sample. We propose in this work linear end-to-end activation steering (LinEAS), an approach trained with a global loss that accounts simultaneously for all layer-wise distributional shifts. In addition to being more robust, the loss used to train LinEAS can be regularized with sparsifying norms, which can automatically carry out neuron selection. LinEAS only requires a handful of unpaired samples to be effective, and beats similar baselines on toxicity mitigation in language models, becoming competitive with oracle-dependent methods that have access to strong supervision. LinEAS is modality-agnostic and we empirically find that it outperforms existing activation steering methods at mitigating and including new concepts at the output of single-step text-to-image generation models.

**[Emu3.5: Native Multimodal Models are World Learners](https://arxiv.org/abs/2510.26583)**

**Abstract:**

We introduce Emu3.5, a large-scale multimodal world model that natively predicts the next state across vision and language. Emu3.5 is pre-trained end-to-end with a unified next-token prediction objective on a corpus of vision-language interleaved data containing over 10 trillion tokens, primarily derived from sequential frames and transcripts of internet videos. The model naturally accepts interleaved vision-language inputs and generates interleaved vision-language outputs. Emu3.5 is further post-trained with large-scale reinforcement learning to enhance multimodal reasoning and generation. To improve inference efficiency, we propose Discrete Diffusion Adaptation (DiDA), which converts token-by-token decoding into bidirectional parallel prediction, accelerating per-image inference by about 20x without sacrificing performance. Emu3.5 exhibits strong native multimodal capabilities, including long-horizon vision-language generation, any-to-image (X2I) generation, and complex text-rich image generation. It also exhibits generalizable world-modeling abilities, enabling spatiotemporally consistent world exploration and open-world embodied manipulation across diverse scenarios and tasks. For comparison, Emu3.5 achieves performance comparable to Gemini 2.5 Flash Image (Nano Banana) on image generation and editing tasks and demonstrates superior results on a suite of interleaved generation tasks.