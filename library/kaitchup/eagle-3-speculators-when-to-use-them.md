---
title: "Eagle 3 Speculators: When To Use Them?"
author: "Various"
publication: "The Kaitchup"
publication_slug: "kaitchup"
published_at: "2025-12-09T12:34:32.000Z"
source_url: "https://kaitchup.substack.com/p/eagle-3-speculators-when-to-use-them"
word_count: 254
estimated_read_time: 2
---

EAGLE-3 is a family of draft models (“speculators”) for speculative decoding. As with other speculative setups, a small model proposes several future tokens and a larger target model verifies them in a single pass. When the draft model’s guesses are accurate and cheap enough, this reduces the total number of heavy forward passes, and therefore the overall cost of inference, while keeping the target model’s output unchanged.

The EAGLE-3 speculators are designed to raise the acceptance rate of drafted tokens and make better use of each verification pass. They do this through architectural changes (multi-layer feature fusion) and a training setup that more closely matches how speculative decoding is actually run at inference time. The aim is to shift more of the work onto a small, fast model and let the large model act mainly as a validator.

In this article, I will look at EAGLE-3 in practice using [the released speculators with vLLM](https://huggingface.co/collections/RedHatAI/speculator-models). I will experiment with Qwen3 32B on an A100 80 GB GPU and focus on end-to-end behavior: throughput, acceptance length, and wall-clock latency. In particular, I will compare high-concurrency continuous batching, where the GPU is already saturated, with batch size 1, where speculative decoding has more opportunity to lower the effective cost per generated token.

The following notebook shows how to run and evaluate EAGLE-3 speculators:

## **EAGLE-3: High-Accuracy Draft Models for Fast Speculative Decoding**

[Read more](https://kaitchup.substack.com/p/eagle-3-speculators-when-to-use-them)