---
title: "Graph RAG on Noisy Data"
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2025-01-22T09:01:08.000Z"
source_url: "https://nobsai.substack.com/p/graph-rag-on-noisy-data"
word_count: 972
estimated_read_time: 5
---

Graph RAG is a widely appreciated technology used in various production environments. Typically, it is applied to clean data, such as factual documents describing products, procedures, rules, and guidelines. But what happens when you need to build a Graph RAG using noisy data, where you can't always assume that every piece of information is accurate? Such a situation arises while building chatbots using previous customer support conversations. Often, companies just don't have all their data stored in clean documents. Even if documentations exist, the **knowledge about real problems and solutions is kept in the heads (and conversations) of the customer support team**. And these conversations tend to be really noisy.

By applying proprietary techniques we managed to make Graph RAG work on messy, real-life data which has nothing to do with examples from tutorials.

#### The setting

As usual, we'll focus on conversations between customer support and clients of a company that manufactures electronic devices. The aim of this knowledge base is to answer technical questions about usage of the devices, so we need solid technical knowledge base. The Graph RAG implementation will utilize the original library from Microsoft: [https://microsoft.github.io/graphrag/](https://microsoft.github.io/graphrag/).

[

![](https://substackcdn.com/image/fetch/$s_!OsX1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf071fab-119e-401c-9a17-919623954d46_1195x737.png)



](https://substackcdn.com/image/fetch/$s_!OsX1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf071fab-119e-401c-9a17-919623954d46_1195x737.png)

#### **Problems: Where vanilla Graph RAGs fail**

-   Graph RAG assumes that every data point can be a valid fact. So, we get many, many nodes with client and order details, such as:
    
    -   Client IDs
        
    -   Client personal data (which somehow escaped anonymization)
        
    -   Order IDs
        

Sometimes these things are good to know, but we want our graph to contain knowledge about the devices and procedures so that we can diagnose user problems! We don't care about old order IDs from a few months ago, and storing personal data is dangerous.

-   Many **situational or temporary facts** are regarded as vital facts:
    
    -   A client reports possessing a black device of a certain brand. Thus, a `BLACK_DEVICE_MODEL` is created as a node - where in fact, the device color is just some client variation and not important for diagnosing problems.
        
    -   Many detected relationships refer to temporary situations, which can be **unimportant or even risky to store in a graph** - such as discounts. We witnessed many edges like this:
        
        `<source_node>DEVICE,`
        
        `<target_node>DISCOUNT_15%,`
        
        `<relationship>"A discount of 15% is offered on DEVICE"`
        
        Such relationships can be created e.g. from conversations with dissatisfied clients, where the discount is a way to prevent churning. Storing such information can be very dangerous, as it may lead to repeating some special actions as a standard.
        

[

![](https://substackcdn.com/image/fetch/$s_!DJ3n!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5921ee80-53d8-4df2-9f9b-b0e5192dda08_1301x902.png)



](https://substackcdn.com/image/fetch/$s_!DJ3n!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5921ee80-53d8-4df2-9f9b-b0e5192dda08_1301x902.png)

#### **Solutions: How to make your Graph RAG noise-proof?**

**Restrict entity types**

A simple but often overlooked step is to explicitly restrict the entity types which will be extracted as entities/nodes. If you're building your own prompt, build it so that it clearly defines the entity types which should be extracted and which should be ignored. The entity types which are well understood by LLMs are NER entity types, such as PERSON, ORGANIZATION, LOCATION, MONEY, etc. In the case of Microsoft Graph RAG, the list is stored in the settings.yaml file:

`entity_extraction:`

`prompt: "prompts/entity_extraction.txt"`

`entity_types: [organization,event,device,length,width,dimension]`

If you know you are 100% not interested in some types (such as PERSON in our case), remove them from the list.

**Recognize situation-specific facts with relationship weights**

Graph RAG prompts are typically large and detailed, making them challenging to edit and understand, especially when trying to assess the actual impact of those edits. However, advanced prompting is essential to teach the Graph RAG a critical piece of knowledge: how to distinguish between situations that are temporary and client-specific versus those that represent general rules or trends.

One effective technique is few-shot prompting, where we provide examples that demonstrate fleeting or temporary situations. This approach helps the Graph RAG learn to evaluate and prioritize facts based on their reliability or importance using **relationship weights**.

[

![](https://substackcdn.com/image/fetch/$s_!fNvY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faea945e4-e522-4e33-bbbd-3814d863ad0c_659x402.png)



](https://substackcdn.com/image/fetch/$s_!fNvY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faea945e4-e522-4e33-bbbd-3814d863ad0c_659x402.png)

A large relationship weight indicates a **more valuable or certain relationship**. A smaller value signifies a relationship which is not as worthy.

For example, in a Graph RAG model for product information, a relationship like "*The iPhone 12 has a 6.1-inch display*" should have a higher weight, indicating it's a well-established and reliable fact. On the other hand, a relationship like "*The iPhone 12 has a rumored feature of foldable design*" should have a lower weight, indicating that it's less certain or more speculative.

In Microsoft Graph RAG, relationship weights are defined as numerical values at the end of each relationship line, like this:

`("relationship" {DEVICE_A} {45mm} {The DEVICE_A has a maximum dimension of 45mm.} 9 )`

`("relationship" {DEVICE_A} {DEVICE_B} {The DEVICE_A is one of the modules supported by DEVICE_B.} 9 )`

`("relationship" {CLIENT_ID} {DISCOUNT_15%} {The client identified by CLIENT_ID received a discount of 15% on products.} 1 )`

Here, the relationship weights are: **9, 9, 1**.

With few-shot prompting and examples like these, the Graph RAG can learn to both create and evaluate facts at the same time:

-   the entities and relationships are detected and described in the form of the relationship statement
    
-   the relationships are **implicitly evaluated** and **explicitly graded** by the LLM, using a proper relationship weight
    

After the graph is created, **low-value relationships can easily be filtered out** based on their weights, potentially with some human oversight.

It's quite challenging to instruct the LLM to discard these low-value relationships entirely. Including such an instruction in the prompt is ineffective because the prompts are already large, and each additional instruction deviates from the overall direction the LLM is taking. This increases the risk of the LLM overlooking or forgetting specific instructions.

After some time and experiments, we have developed techniques that help the LLM ignore messy relationships altogether. These methods are part of our RAG offering. However, teaching the model to assign small relationship weights as described above is also a valid approach. This technique fits seamlessly into the LLM workflow defined in the full prompt and is rarely ignored, as long as enough examples are included in the few-shot prompt.