---
title: "Generate Better Synthetic Datasets with a \"User\" LLM"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-10-27T15:50:08.000Z"
source_url: "https://kaitchup.substack.com/p/generate-better-synthetic-datasets"
word_count: 280
estimated_read_time: 2
---

[

![](https://substackcdn.com/image/fetch/$s_!KnEs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84da9710-360e-471d-b5aa-435f70016320_1024x1024.png)



](https://substackcdn.com/image/fetch/$s_!KnEs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84da9710-360e-471d-b5aa-435f70016320_1024x1024.png)
*Image generated with ChatGPT*

Most guides on synthetic data start from the assistant’s point of view. You prompt an instruct model with a “persona,” ask for user messages, and let it role-play both sides of a conversation. That’s convenient, but there’s a hidden mismatch: instruct models are fine-tuned and aligned to *be helpful assistants*, not to *behave like users*. When you ask them to generate “user” turns, they tend to speak like assistants in disguise, too cooperative, too formal, too on-task. This skews the distribution of user intents, errors, and edge cases, which then flows straight into your synthetic dataset.

A better approach is to split responsibilities. Keep a standard instruct model for the assistant side, and introduce a second model that is fine-tuned specifically to act like a user. Think of this “User LLM” as a generator of realistic user goals, constraints, hesitations, and mistakes. **It can ask incomplete questions, follow odd preferences, change its mind, and produce the kind of messy inputs assistants see in the wild.** Pairing the two models produces richer dialogs and, in turn, more faithful training data for downstream tasks like intent classification, tool-use planning, and multi-turn guidance.

In this article, we’ll run an assistant-tuned instruct model alongside a User LLM, [the one recently introduced by Microsoft](https://arxiv.org/abs/2510.06552), and have them converse to produce dialog-style synthetic datasets. If you have two GPUs, vLLM makes this straightforward: load both models as separate engines and stream turns between them. Many of us don’t have that headroom, though, so we’ll plan for a single consumer GPU setup.

Here is my notebook showing how to generate synthetic dialogues with two LLMs:

Each part of the code is explained below.

[Read more](https://kaitchup.substack.com/p/generate-better-synthetic-datasets)