---
title: "Deep Learning Weekly: Issue 428"
author: "Various"
publication: "Deep Learning Weekly"
publication_slug: "deeplearningweekly"
published_at: "2025-10-30T15:01:16.000Z"
source_url: "https://www.deeplearningweekly.com/p/deep-learning-weekly-issue-428"
word_count: 983
estimated_read_time: 5
---

This week in deep learning, we bring you [DeepSeek-OCR](https://deepseek.ai/blog/deepseek-ocr-context-compression), [Introducing Chronos-2: From univariate to universal forecasting](https://www.amazon.science/blog/introducing-chronos-2-from-univariate-to-universal-forecasting), and [a paper on InteractComp: Evaluating Search Agents With Ambiguous Queries](https://arxiv.org/abs/2510.24668).

You may also enjoy [Advancing Claude for Financial Services](https://www.anthropic.com/news/advancing-claude-for-financial-services), [LLM Inference Economics from First Principles](https://www.tensoreconomics.com/p/llm-inference-economics-from-first), [a paper on Concerto: Joint 2D-3D Self-Supervised Learning Emerges Spatial Representations](https://arxiv.org/abs/2510.23607), and more!

As always, happy reading and hacking. If you have something you think should be in next week’s issue, find us on Twitter: [@dl\_weekly](https://twitter.com/dl_weekly).

Until next week!

\---

## **Industry**

**[DeepSeek-OCR: Revolutionary Context Compression Through Optical 2D Mapping](https://deepseek.ai/blog/deepseek-ocr-context-compression)**

DeepSeek AI unveiled DeepSeek-OCR, an approach to compressing long contexts via optical 2D mapping.

**[Advancing Claude for Financial Services \\ Anthropic](https://www.anthropic.com/news/advancing-claude-for-financial-services)**

Anthropic expanded Claude for Financial Services with an Excel add-in, additional connectors to real-time market data and portfolio analytics, and new pre-built Agent Skills.

**[Introducing Chronos-2: From univariate to universal forecasting](https://www.amazon.science/blog/introducing-chronos-2-from-univariate-to-universal-forecasting)**

Amazon introduced Chronos-2, a foundation model designed to handle arbitrary forecasting tasks — univariate, multivariate, and covariate informed — in a zero-shot manner.

**[Grammarly transforms into AI-enabled productivity suite with Superhuman rebrand](https://siliconangle.com/2025/10/29/grammarly-transforms-ai-enabled-productivity-suite-superhuman-rebrand/)**

Grammarly, best known for AI-powered proofreading and writing, announced its rebrand to Superhuman: a full-featured AI-native productivity platform.

## **MLOps & LLMOps**.

**[LLM Tracing: The Foundation of Reliable AI Applications](https://www.comet.com/site/blog/llm-tracing/?utm_source=substack&utm_medium=email&utm_campaign=dlw&utm_content=llm-tracing/)**

An article discussing that LLM tracing is the foundation of reliable AI applications by capturing end-to-end steps to diagnose non-deterministic and semantic failures.

**[Build AI Agents Worth Keeping: The Canvas Framework](https://medium.com/mongodb/build-ai-agents-worth-keeping-the-canvas-framework-b582c40db00a)**

An article about why enterprise AI agent projects fail and how to use product-first canvas frameworks to build agents that actually reach production.

## **Learning**

**[LLM Inference Economics from First Principles](https://www.tensoreconomics.com/p/llm-inference-economics-from-first)**

A detailed article explaining LLM inference economics from first principles, focusing on how batching is the key to profitability by offsetting memory-bound costs in the token-by-token generation phase.

**[T\*: Rethinking Temporal Search for Long-Form Video Understanding](https://ai.stanford.edu/blog/tstar/)**

An article introducing the T\* temporal search algorithm, which reframes long-form video understanding as spatial search to efficiently locate relevant frames.

**[Learning from Failure to Tackle Extremely Hard Problems](https://blog.ml.cmu.edu/2025/10/27/learning-from-failure-to-tackle-extremely-hard-problems/)**

A research blog post introducing BaNEL (Bayesian Negative Evidence Learning), an algorithm that post-trains generative models efficiently using only negative reward samples to tackle extremely sparse, hard problems.

**[Post-Training Generative Recommenders with Advantage-Weighted Supervised Finetuning](https://netflixtechblog.com/post-training-generative-recommenders-with-advantage-weighted-supervised-finetuning-61a538d717a9)**

A novel study presenting Advantage-Weighted Supervised Fine-tuning (A-SFT), an algorithm for post-training generative recommenders.

**[Artificial intelligence could dramatically improve weather forecasting](https://www.sustainabilitybynumbers.com/p/artificial-intelligence-could-dramatically)**

An article about how AI could dramatically improve weather forecasting, specifically highlighting an AI-based model that successfully predicted the Indian monsoon stall, helping millions of farmers.

## **Libraries & Code**

**[comet-ml/opik](https://github.com/comet-ml/opik)**

An open-source LLM evaluation tool used to debug, evaluate, and monitor LLM applications, RAG systems, and agentic workflows with comprehensive tracing, automated evaluations, and production-ready dashboards.

## **Papers & Publications**

**[InteractComp: Evaluating Search Agents With Ambiguous Queries](https://arxiv.org/abs/2510.24668)**

**Abstract:**

Language agents have demonstrated remarkable potential in web search and information retrieval. However, these search agents assume user queries are complete and unambiguous, an assumption that diverges from reality where users begin with incomplete queries requiring clarification through interaction. Yet most agents lack interactive mechanisms during the search process, and existing benchmarks cannot assess this capability. To address this gap, we introduce InteractComp, a benchmark designed to evaluate whether search agents can recognize query ambiguity and actively interact to resolve it during search. Following the principle of easy to verify, interact to disambiguate, we construct 210 expert-curated questions across 9 domains through a target-distractor methodology that creates genuine ambiguity resolvable only through interaction. Evaluation of 17 models reveals striking failure: the best model achieves only 13.73% accuracy despite 71.50% with complete context, exposing systematic overconfidence rather than reasoning deficits. Forced interaction produces dramatic gains, demonstrating latent capability current strategies fail to engage. Longitudinal analysis shows interaction capabilities stagnated over 15 months while search performance improved seven-fold, revealing a critical blind spot. This stagnation, coupled with the immediate feedback inherent to search tasks, makes InteractComp a valuable resource for both evaluating and training interaction capabilities in search agents.

**[Concerto: Joint 2D-3D Self-Supervised Learning Emerges Spatial Representations](https://arxiv.org/abs/2510.23607)**

**Abstract:**

Humans learn abstract concepts through multisensory synergy, and once formed, such representations can often be recalled from a single modality. Inspired by this principle, we introduce Concerto, a minimalist simulation of human concept learning for spatial cognition, combining 3D intra-modal self-distillation with 2D-3D cross-modal joint embedding. Despite its simplicity, Concerto learns more coherent and informative spatial features, as demonstrated by zero-shot visualizations. It outperforms both standalone SOTA 2D and 3D self-supervised models by 14.2% and 4.8%, respectively, as well as their feature concatenation, in linear probing for 3D scene perception. With full fine-tuning, Concerto sets new SOTA results across multiple scene understanding benchmarks (e.g., 80.7% mIoU on ScanNet). We further present a variant of Concerto tailored for video-lifted point cloud spatial understanding, and a translator that linearly projects Concerto representations into CLIP’s language space, enabling open-world perception. These results highlight that Concerto emerges spatial representations with superior fine-grained geometric and semantic consistency.

**[ODKE+: Ontology-Guided Open-Domain Knowledge Extraction with LLMs](https://machinelearning.apple.com/research/odke)**

**Abstract:**

Knowledge graphs (KGs) are foundational to many AI applications, but maintaining their freshness and completeness remains costly. We present ODKE+, a production-grade system that automatically extracts and ingests millions of open-domain facts from web sources with high precision. ODKE+ combines modular components into a scalable pipeline: (1) the Extraction Initiator detects missing or stale facts, (2) the Evidence Retriever collects supporting documents, (3) hybrid Knowledge Extractors apply both pattern-based rules and ontology-guided prompting for large language models (LLMs), (4) a lightweight Grounder validates extracted facts using a second LLM, and (5) the Corroborator ranks and normalizes candidate facts for ingestion. ODKE+ dynamically generates ontology snippets tailored to each entity type to align extractions with schema constraints, enabling scalable, type-consistent fact extraction across 195 predicates. The system supports batch and streaming modes, processing over 9 million Wikipedia pages and ingesting 19 million high-confidence facts with 98.8% precision. ODKE+ significantly improves coverage over traditional methods, achieving up to 48% overlap with third-party KGs and reducing update lag by 50 days on average. Our deployment demonstrates that LLM-based extraction, grounded in ontological structure and verification workflows, can deliver trustworthiness, production-scale knowledge ingestion with broad real-world applicability.