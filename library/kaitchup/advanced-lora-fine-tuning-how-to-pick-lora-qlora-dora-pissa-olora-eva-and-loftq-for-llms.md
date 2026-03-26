---
title: "Advanced LoRA Fine-Tuning: How to Pick LoRA, QLoRA, DoRA, PiSSA, OLoRA, EVA, and LoftQ for LLMs"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-03T15:42:11.000Z"
source_url: "https://kaitchup.substack.com/p/advanced-lora-fine-tuning-how-to"
word_count: 175
estimated_read_time: 1
---

[

![](https://substackcdn.com/image/fetch/$s_!uxYX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F875180c9-f202-420f-8ac3-2810df4278eb_579x658.png)



](https://substackcdn.com/image/fetch/$s_!uxYX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F875180c9-f202-420f-8ac3-2810df4278eb_579x658.png)
*Image generated with ChatGPT*

When it’s done well, LoRA can match full fine-tuning while using a fraction of the memory.

It was introduced in 2021, when open LLMs were scarce and relatively small. Today, we have plenty of models, from a few hundred million to hundreds of billions of parameters. On these larger models, LoRA (or one of its variants) is often the only practical way to fine-tune without spending $10k+.

Originally, LoRA was meant to train small adapters on top of the attention blocks of LLMs. Since then, the community has proposed many optimizations and extensions, including techniques that work with quantized models.

In this article, we’ll look at the most useful, modern approaches to LoRA for adapting LLMs to your task and budget. We’ll review (Q)DoRA, (Q)LoRA, PiSSA, EVA, OLoRA, and LoftQ, compare their performance (with and without a quantized base model, when that’s relevant), and discuss when to pick each method. All of them are implemented in Hugging Face TRL.

You can find my notebook showing how to use these techniques here:

[Read more](https://kaitchup.substack.com/p/advanced-lora-fine-tuning-how-to)