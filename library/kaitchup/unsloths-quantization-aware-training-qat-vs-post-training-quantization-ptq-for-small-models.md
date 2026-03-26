---
title: "Unsloth's Quantization-Aware Training (QAT) vs Post-Training Quantization (PTQ) for Small Models"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-11-10T14:54:00.000Z"
source_url: "https://kaitchup.substack.com/p/unsloths-quantization-aware-training"
word_count: 263
estimated_read_time: 2
---

Quantization is a common way to shrink large language models (LLMs). In practice, it’s a form of compression that reduces parameter precision, typically from 16-bit (BF16/FP16) to lower-precision formats like 8-bit or 4-bit. Most deployments apply this via post-training quantization (PTQ).

On very large models, PTQ often preserves downstream accuracy remarkably well. But on smaller models, those with only a few billion parameters, or even sub-billion, PTQ can cause substantial accuracy degradation.

An alternative is quantization-aware training (QAT), which trains the model to be robust to quantization effects. QAT is usually expensive, and on bigger models I rarely find the gains worth the cost. For small models, though, it can make a difference without spending too much compute.

Unsloth now supports QAT, letting us train models to be quantization-aware while adapting them to our task and data. Thanks to Unsloth’s efficiency, this is probably the most affordable way to fine-tune a model that remains robust under quantization. In this article, I put Unsloth’s QAT to the test on a deliberately hard setting: English→French translation with a very small model, Gemma 3 270M. In earlier work, [I had good success fine-tuning this model for translation](https://kaitchup.substack.com/p/gemma-3-270m-can-tiny-models-learn), but as we’ll see, introducing quantization through PTQ can make things fragile. Can QAT limit the damage?

I evaluate two QAT schemes available in Unsloth for this setup, INT4 and INT8-INT4, comparing final accuracy against PTQ and costs. I use full fine-tuning (not LoRA), since the model is already quite small.

Here’s the notebook I used to run these Unsloth QAT experiments:

## Quantization-Aware Training: `int4`, `fp8-int4`, `fp8-fp8`, and `int8-int4`

[Read more](https://kaitchup.substack.com/p/unsloths-quantization-aware-training)