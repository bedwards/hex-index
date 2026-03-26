---
title: "LLMs as Ground Truth"
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2024-12-12T10:01:22.000Z"
source_url: "https://nobsai.substack.com/p/llms-as-ground-truth"
word_count: 748
estimated_read_time: 4
---

In this post I will show:

-   How to save around 90% of LLM cost of your customer service agent in production.
    
-   How to combine LLMs with old-school ML to acquire an accurate and cost-efficient hybrid system.
    

In our previous article, we described the "overfitting" of LLMs via prompting: [https://nobsai.substack.com/p/the-necessity-of-overfitting-llm](https://nobsai.substack.com/p/the-necessity-of-overfitting-llm) By crafting a very precise, elaborate prompt, she was able to carefully detect the true intent of a customer question and assign it to a correct class.

However, detailed prompts like this have their problems:

1.  They are **brittle** - as demonstrated in the article, classification results can often be unstable, influenced by parameters like temperature.
    
2.  They are **costly** - their length and level of detail mean they contain a significant number of tokens, which increases expense.
    

In this article, I demonstrate a solution to the second problem. In the course of our real-life work, we replaced the expensive LLM with a significantly more affordable model. By leveraging the "overfitted" prompts as a source of high-quality training data, we successfully **trained a traditional machine learning classifier** that performs effectively in production. This approach enables the system to operate at minimal cost.

The concept is illustrated in the image below:

[

![](https://substackcdn.com/image/fetch/$s_!Qs3u!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ca61346-c513-4d31-9da2-5539525c0af0_1865x543.png)



](https://substackcdn.com/image/fetch/$s_!Qs3u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ca61346-c513-4d31-9da2-5539525c0af0_1865x543.png)

Before the era of LLMs, a significant amount of time (and money) was usually spent on annotating data. Today, a well-designed prompt can transform an LLM into an excellent annotator for our purposes. While it may incur some cost—since the prompts need to be sufficiently detailed and extensive to ensure high-quality "classification"—this investment is a one-time effort aimed at generating training data.

#### The pipeline:

1.  **Refine your prompt** to ensure it is detailed enough to capture the necessary nuances. Incorporate the secrets of the business, so that it correctly identifies the intents in text (as done in [https://nobsai.substack.com/p/the-necessity-of-overfitting-llm](https://nobsai.substack.com/p/the-necessity-of-overfitting-llm))
    
2.  Once the prompt is finalized and delivers satisfactory classification quality, use it to process your data and **generate the "ground truth."** In my case, I required results for approximately 2,000 examples per class.
    
3.  **Embed the data** - I used ada-002 embedder from OpenAI, without any finetuning, and it proved good enough for this case. Much better results will likely come from finetuning the embedder - even if it's a smallish model from Huggingface.
    
4.  Feed the embeddings, together with their class labels assigned by an LLM, to a **classifier like XGBoost**.
    

#### **The result?**

I have trained the classifiers for 3 classes. Each class reflects a single type of question (different wording but the same meaning) from customers of some business. These were 100% real data and real types of questions. I obtained the following results (confusion matrices) on a test set normalized to 1000 examples:

[

![](https://substackcdn.com/image/fetch/$s_!SL3F!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F311ab5f8-3906-439c-a00c-57dd0500851f_1225x559.png)



](https://substackcdn.com/image/fetch/$s_!SL3F!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F311ab5f8-3906-439c-a00c-57dd0500851f_1225x559.png)

#### **Does This Work?**

Let’s analyze.

We don't have to worry about these guys - they are **correctly classified**. Fortunately, they are also quite numerous:

[

![](https://substackcdn.com/image/fetch/$s_!tcRi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2045de6-a124-4be7-b3f5-64758f048d83_305x218.png)



](https://substackcdn.com/image/fetch/$s_!tcRi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2045de6-a124-4be7-b3f5-64758f048d83_305x218.png)

Here however we have some texts which got incorrectly classified as "Class1", while they do not really belong to this class:

[

![](https://substackcdn.com/image/fetch/$s_!mmtX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F529b1a20-ef89-454f-a9ab-257b5df377cc_282x218.png)



](https://substackcdn.com/image/fetch/$s_!mmtX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F529b1a20-ef89-454f-a9ab-257b5df377cc_282x218.png)

If we wanted to send an automated "Class1" response to these customer questions, we would be answering wrongly.

Fortunately, each example with assigned "Class1" **can be double-checked by our LLM** with the large and precise prompt, because these examples will be very few. Most likely, the offenders will get classified correctly as "Other" at the final correctness check.

The hardest part are the False Negatives - texts which really belong to "Class1" but they are classified as "Other":

[

![](https://substackcdn.com/image/fetch/$s_!PU5m!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa167c236-381c-42c0-a561-c741f8c4991d_281x218.png)



](https://substackcdn.com/image/fetch/$s_!PU5m!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa167c236-381c-42c0-a561-c741f8c4991d_281x218.png)

We cannot double-check them with our LLM prompt, because we would have to check almost 1000 examples classified as "Other" - that's definitely too costly and we wanted to avoid this in the first place.

However, if we inspect the probability scores of the XGBoost classifier, it turns out that these cases **tend to have high probability scores of belonging to "Class1"** (even though the final classification is "Other"). So, taking a set number of texts with highest probability of "Class1" scores (let's say, 5% of the whole population) we can still afford to run an LLM test on them and **detect them cheaply**!

#### **Cost Advantage**

Assuming that we're disregarding the cost of obtaining embeddings (because we have a local model or need the embeddings anyway for some other RAG-like part of the system - which is our case) - this approach saves us around 90% of LLM cost in production.

We only need to query the LLM with the following:

-   5% of the highest-probability "Class1" examples which got classified to "Other"
    
-   the True Positives and False Positives in order to double check if there are any "Other" cases
    

At the same time, system quality remains mostly unharmed.