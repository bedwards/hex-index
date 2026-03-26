---
title: "Mistral Large 3: Not a Reasoning Model"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-12-06T00:48:16.000Z"
source_url: "https://kaitchup.substack.com/p/mistral-large-3-not-a-reasoning-model"
word_count: 780
estimated_read_time: 4
---

[

![](https://substackcdn.com/image/fetch/$s_!c7_f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)



](https://substackcdn.com/image/fetch/$s_!c7_f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd3f4615-2c66-4a1a-8e7c-7002fe563e0b_1517x849.png)

Hi everyone,

In this edition of The Weekly Kaitchup, I briefly discuss Mistral AI’s new (and somewhat unusual) releases.

\---

I’m currently at NeurIPS. There are about 29k attendees this year (including virtual), up 64% compared to last year. Ten years ago in Montreal, 4k participants already felt like a huge conference. At this pace, 100k people by 2030 doesn’t sound impossible.

This year, they tried to split the conference over three venues (San Diego, Mexico City, and Copenhagen), but unsurprisingly, most people want to be at the main site, in this case San Diego. Also: so many sponsors. It feels more and more like a trade expo!

[

![](https://substackcdn.com/image/fetch/$s_!Hlnx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9aabc6e8-9557-4d4c-ac2a-e30a3d7b57e0_1225x603.png)



](https://substackcdn.com/image/fetch/$s_!Hlnx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9aabc6e8-9557-4d4c-ac2a-e30a3d7b57e0_1225x603.png)

\---

## Mistral Large 3: not a reasoning model

Mistral AI knows how to get attention: they released a large open model on the first day of NeurIPS. It worked. Everyone is talking about it, but many are missing a key point: **Mistral Large 3 is not a reasoning model.**

-   [Mistral Large 3](https://huggingface.co/collections/mistralai/mistral-large-3)
    

Despite this, I saw third-party evaluations placing it on the same charts as reasoning models, often flagged with a “reasoning” icon or bubble that is very easy to miss.

This is misleading. Mistral Large 3 is an instruct model, not a long-chain-of-thought “thinking” model. Quite unusual for a model of that size. Artificial Analysis [confirms this: Mistral Large 3 generates 10 times fewer tokens](https://artificialanalysis.ai/models/mistral-large-3) than KIMI K2 Thinking and GPT-OSS 120B (reasoning\_effort=”high”).

Why did Mistral AI only release an instruct version?

I can see several plausible reasons:

-   **Positioning:** It’s one of the only instruct models at that scale, so they may want to focus on making that variant broadly available and reliable before investing in a public reasoning counterpart.
    
-   **Product strategy:** They may already have a reasoning version but prefer to keep it private for their paid API customers rather than releasing it openly.
    
-   **Demand:** “Thinking” models are much less popular than instruct models. [Hugging Face’s trending models page](https://huggingface.co/models) shows this clearly. Most users don’t want to wait minutes for each answer.
    

\---

## Ministral 3: base, reasoning, and instruct “small” models

Mistral AI also released the Ministral 3 family: multimodal models at 3B, 8B, and 14B.

-   [Ministral 3](https://huggingface.co/collections/mistralai/ministral-3)
    

These are more “regularly sized” models, but the release has a few unusual aspects:

-   **No official multimodal benchmarks:** The models are multimodal, but Mistral didn’t publish benchmark numbers. Evaluation is effectively delegated to the community.
    
-   **Instruct = FP8 post-trained:** The instruct models are available in FP8. They also [released BF16 versions](https://huggingface.co/collections/mistralai/ministral-3-additional-checkpoints), but since the models were post-trained in FP8, these BF16 models are probably dequantized versions obtained from the official FP8 models. I don’t see any issue with this, but be aware that the BF16 versions may behave slightly differently.
    
-   **“Reasoning” models with reasoning off:** The reasoning versions appear to be usable with reasoning disabled. My first runs with vLLM suggest they behave like hybrid models with a reasoning mode that can be toggled. That raises a question: when reasoning is off, how different are they from the instruct versions? I don’t have a clear answer yet.
    
-   **vLLM issues with reasoning on:** The reasoning versions with reasoning enabled currently behave oddly with vLLM. In my tests, they don’t populate the `content` field and only produce `reasoning_content`. It seems to only work as expected in streaming mode. I’ve confirmed this with other users at NeurIPS. This means a lot of **early results you see online may not be using the models correctly**. I reported the issue to Mistral AI but they haven’t answered yet.
    

As a general rule of thumb: **never fully trust third-party evaluations published in the first week after a model release.** There are almost always bugs or misconfigurations. In this case, the combination of multimodality, FP8/BF16 variants, a reasoning parser, and a non-standard tokenizer makes such issues even more likely.

I’m currently evaluating Ministral 3 3B (Instruct and Reasoning, with reasoning off) and comparing it to Qwen3 4B, which is currently the best model at this scale. I’m especially interested in **token efficiency**. Qwen3 4B Instruct tends to generate far too many tokens for an instruct model. I’m hoping Ministral 3 3B Instruct can match its performance while being more concise.

\---

## **The Salt**

*The Salt is my other newsletter that takes a more scientific approach. In The Salt, I primarily feature short reviews of recent papers **(for free)**, detailed analyses of noteworthy publications, and articles centered on LLM evaluation.*

This week, we review:

-   ⭐DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models
    
-   Guided Self-Evolving LLMs with Minimal Human Supervision
    

\---

That’s all for this week.

If you like reading The Kaitchup, consider sharing it with friends and coworkers (there is a 20% discount for group subscriptions):

Have a nice weekend!