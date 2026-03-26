---
title: "Olmo 3 Is Here!"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-21T17:39:14.000Z"
source_url: "https://kaitchup.substack.com/p/olmo-3-is-here"
word_count: 1098
estimated_read_time: 6
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi Everyone,

In this edition of The Weekly Kaitchup, I discuss:

-   Olmo 3
    
-   Eagle 3 Speculators to Easily Speed Up Inference with vLLM
    
-   AA-Omniscience: How Often LLMs Hallucinate?
    

\---

### Black Friday Subscription Discount

For Black Friday, I’m offering a **30% discount** on the yearly subscription to *The Kaitchup*:

With this subscription, you get instant access to all the AI notebooks (180+) and all the articles and tutorials (200+).

\---

## Olmo 3

AI2 has released the third generation of their fully open models: Olmo 3, which includes “Thinking” models at 7B and 32B parameters. There’s also an instruct variant of the 7B model. Intermediate checkpoints (pretraining, SFT, DPO) are available as well, all grouped in this collection:

-   **[Olmo 3 Post-training](https://huggingface.co/collections/allenai/olmo-3-post-training)**
    

They’ve also released the **full training dataset** (also in the collection above).

[The technical report is about 100 pages](https://www.datocms-assets.com/64837/1763646865-olmo_3_technical_report-1.pdf). I haven’t gone through it yet, but from a quick look, their post-training recipe seems to be an improved version of [their](https://thesalt.substack.com/p/tulu-3-the-post-training-recipe) **[TULU](https://thesalt.substack.com/p/tulu-3-the-post-training-recipe)** [pipeline](https://thesalt.substack.com/p/tulu-3-the-post-training-recipe).

I’ll cover these models in more detail in an upcoming article, focusing on the **quantized versions** I’m currently preparing with LLM Compressor.

You can already find some of my quantized models here:

-   [Quantized Olmo 3 (vLLM-compatible)](https://huggingface.co/collections/kaitchup/quantized-olmo-3)
    

### First impressions

The models look very strong. The 32B variant scores slightly below Qwen3-32B on benchmarks, even though Qwen3 is a 7-month-old model. That said, I’d trust Olmo 3’s reported scores much more as a proxy for real-world performance: AI2 has published the entire training data, so we can directly inspect how much the model was optimized toward specific benchmarks. I’ll know more next week, after spending more time with this model.

The 7B model appears to also perform below Qwen3 8B (again, that’s only according to benchmarks…). The NVFP4 version seems to preserve accuracy in my early experiments.

I’m running my own evaluations now and will add Olmo 3 to **[The Kaitchup Index](https://kaitchup.substack.com/p/the-kaitchup-index)** next week.

\---

## Eagle 3 Speculators to Easily Speed Up Inference with vLLM

Speculative decoding speeds up LLMs by using two models together. A small, cheap “speculator” model quickly drafts several next tokens in one go, and then the large “verifier” model checks that whole chunk in a single forward pass. Any tokens the verifier agrees with are accepted, so you effectively get multiple tokens for the price of one expensive step on the big model, without changing its behavior or quality. We saw how it works in this article:

Getting this to work well in practice is hard because you need a *good pair* of models. The speculator has to be fast enough to be worth using, but also similar enough to the verifier that its guesses are often correct. If it’s too weak or too different, the verifier rejects most tokens and you lose the speedup.

To help with this, Speculators is an open source toolkit from the Red Hat AI team that sits on top of vLLM and Hugging Face to make speculative decoding easier to use in production.

-   GitHub: [vllm-project/speculators](https://github.com/vllm-project/speculators)
    

Instead of hand-rolling draft models and weird configs, Speculators gives you a standard way to define, store, and deploy “speculator” models alongside your normal LLMs.

They shipped ready-made EAGLE-3 speculator models for families like Llama, Qwen, and gpt-oss, all in Hugging Face format.

-   [EAGLE-3 Speculators](https://huggingface.co/collections/RedHatAI/speculator-models)
    

> **EAGLE-style** speculators are built to predict several future tokens very efficiently and are tuned to work tightly with the verifier model so that a lot of their guesses get accepted.
> 
> Related paper: **[EAGLE: Speculative Sampling Requires Rethinking Feature Uncertainty](https://arxiv.org/abs/2401.15077)**

You can serve them with a single `vllm serve <speculator_id>` command, and they immediately give you faster inference.

[

![Math Reasoning](https://substackcdn.com/image/fetch/$s_!5XyO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffdd55d27-b24c-410d-9579-2a082911b416_567x455.png "Math Reasoning")



](https://substackcdn.com/image/fetch/$s_!5XyO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffdd55d27-b24c-410d-9579-2a082911b416_567x455.png)

\---

## AA-Omniscience: How Often LLMs Hallucinate?

AA-Omniscience is a stress test for how much language models really *know* and how honest they are about not knowing.

The authors (Artificial Analysis, well-known for its LLM evaluations) argue that most popular benchmarks reward models for guessing, which is exactly what you *don’t* want if you’re using them for law, health, finance, or engineering. So they built a new benchmark that focuses on two things: factual recall and “knowledge calibration”

*Can a model both recall the right fact and recognize when it should abstain instead of hallucinating?*

The complete evaluation dataset contains 6,000 expert-level questions from authoritative, up-to-date sources across six economically important domains: Business, Humanities & Social Sciences, Health, Law, Software Engineering, and Science/Engineering/Math.

Each question is designed to have a single correct, short answer (like a number, date, or name), and they bias toward facts that have become relevant recently, not trivia from decades ago.

The evaluation procedure is simple but strict: models get only the question. No tools, no browsing, no extra context. They’re explicitly told to answer *only if they’re confident* and otherwise say they don’t know. Answers are then graded by a separate model (Gemini 2.5 Flash with reasoning) into four buckets: correct, partially correct, incorrect, or not attempted. From those labels, the paper’s main metric, the **Omniscience Index (OI)**, is computed as 100×(correct − incorrect) / (all questions), so every wrong answer cancels out a right one. A model only gets a positive score if it delivers more correct than incorrect answers overall, meaning hallucinations are heavily punished while abstentions are neutral.

Their headline result is that this benchmark is hard. That’s good news. We need hard benchmarks! And since they are keeping 90% of the dataset private, there is a good chance that it will remain hard for a while.

Out of 36 models, only three manage a positive Omniscience Index at all. Big-name models can hit nearly 40% raw accuracy but still end up with poor OI scores because they guess too often when they’re unsure. In contrast, Claude 4.1 Opus gets a modest 36% accuracy but combines it with one of the lowest hallucination rates, giving it the top OI score of 4.8.

[

![](https://substackcdn.com/image/fetch/$s_!zOpc!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F643b8400-6baf-454d-b201-7747af7ee5fb_1490x491.png)



](https://substackcdn.com/image/fetch/$s_!zOpc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F643b8400-6baf-454d-b201-7747af7ee5fb_1490x491.png)

No single model dominates all six domains: different labs’ models lead in different areas, and even smaller or cheaper models sometimes offer better reliability per dollar than more powerful ones. Scale does help accuracy, but it doesn’t reliably fix hallucinations, and cost tends to climb with reliability, with some notable outliers that are both careful and affordable.

More details in their paper:

[AA-Omniscience: Evaluating Cross-Domain Knowledge Reliability in Large Language Models](https://arxiv.org/pdf/2511.13029)

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   ⭐Black-Box On-Policy Distillation of Large Language Models
    
-   The Path Not Taken: RLVR Provably Learns Off the Principals
    
-   Beyond English: Toward Inclusive and Scalable Multilingual Machine Translation with LLMs
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!