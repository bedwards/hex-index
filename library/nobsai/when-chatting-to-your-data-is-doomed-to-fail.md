---
title: "When \"chatting to your data\" is doomed to fail"
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2024-11-20T08:29:17.000Z"
source_url: "https://nobsai.substack.com/p/when-chatting-to-your-data-is-doomed"
word_count: 1275
estimated_read_time: 7
---

There is considerable misunderstanding about the feasibility of implementing AI-powered question-answering capabilities. Ultimately, it comes down to details that are difficult to grasp unless you are the one developing the solution.

From an outside perspective, all use cases for knowledge-based question answering may appear similar. However, we have identified at least three distinct scenarios, each requiring different levels of implementation effort and initial data requirements:

1.  **“ChatGPT for Your Internal Documents”**
    
2.  **High-Confidence Information Retrieval** (such as for legal or medical purposes)
    
3.  **Customer Service Agent**
    

[

![](https://substackcdn.com/image/fetch/$s_!fEsH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd39478d0-4ef3-4f60-ad15-38008ad48f49_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!fEsH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd39478d0-4ef3-4f60-ad15-38008ad48f49_1920x1080.png)

If any of these scenarios align with your business needs, keep reading—we will explain the differences and estimate the necessary workload to initiate a Proof of Concept (PoC).

One of the most popular use cases for generative AI in companies is searching for answers within a vast array of unstructured documents or other sources of knowledge presented in a "messy" format. You have likely seen numerous promising implementations and are considering streamlining your operations with this generative AI solution.

You might assume that having documents serve as a source of knowledge means you are ready to proceed.

However, from my discussions with various business stakeholders, I have noticed that the understanding of the term "knowledge" varies.

#### Simply having access to a large number of documents and internal company information may not be sufficient to effectively answer questions.

Let me break down and reveal what might be hidden beneath the general idea of “using internal data to answer questions.”

### Scenario 1: “ChatGPT for your internal documents”

This scenario is the most promising and is likely the one you see implemented successfully most often.

#### Generative AI excels when you need an assistant to help speed up your processes, especially if you are not expecting absolute accuracy or precise final answers.

Consider [Perplexity.ai](http://perplexity.ai/), one of my favorite tools for everyday work. I use it to achieve better search results and take advantage of its summarization capabilities. As a result, instead of visiting multiple webpages, I have everything ready in one place. However, I always double-check the links to ensure that the conclusions presented to me are correct.

In a company environment, this scenario can be understood as a “ChatGPT for your internal documents.” I have definitely seen these solutions within large organizations, and they serve as a valuable addition to search bars in platforms like Confluence, SharePoint, or internal wikis. Remember to manage the expectations of end users correctly, and your proof of concept (PoC) should be successful, as the current standards are set very low.

> **Probability of Success: High**
> 
> **Effort to Implement a Working PoC: Low**
> 
> **Technical Feasibility:** Verify that the internal documents you intend to use as a knowledge source are in textual form. Interpreting images and tables is more challenging for AI models and will add complexity to the solution. Therefore, a good starting point is to answer questions based on text before incorporating other formats.

### Scenario 2: “High-Confidence Information Retrieval”

This scenario, along with Scenario 3, likely has the most significant real business impact. These projects often originate when someone is pleased with a Scenario 1 project and assumes it can serve as a promising foundation for a more "serious" search system for specialized or technical documents. However, this assumption is usually incorrect. A ChatGPT-like solution will fail with your:

-   Technical documentation
    
-   Legal documents or regulations
    
-   Medical or pharmaceutical documents or regulations
    

and many other specialized data sources where a high degree of precision and accuracy is required.

But why? General-purpose solutions struggle with numbers, specialized named entities, industry-specific terms, rigorous reasoning, and the necessity to provide correct answers. They are designed to deliver a "generally satisfactory or reasonably-looking" response, which is insufficient in these cases.

#### Scenario 2 projects typically require customized solutions that utilize a mix of tools and techniques, as no off-the-shelf components are sufficient.

Most often, they demand advanced methods such as Knowledge Graph RAGs or complex hybrid search RAGs. These approaches are heavily dependent on the choice of embeddings and large language models (LLMs) and may even require model fine-tuning.

> **Probability of Success: depends on the technical skillset and experience of team implementation team**
> 
> **Effort to Implement a Working PoC: High**
> 
> **Technical Feasibility:** To achieve success, you must go beyond basic Retrieval-Augmented Generation (RAG) approaches and assemble a team skilled in advanced RAG techniques. The problem should be broken down into simpler questions, progressively building towards more complex ones which require reasoning across multiple paragraphs of text and identifying relationships between them.

### Scenario 3: “Customer Service agent”

Building a Retrieval-Augmented Generation (RAG) system to answer customer questions typically handled by service agents is one of the most impactful and straightforward use cases for achieving high ROI - and it is fairly easy to calculate! In the AI landscape, where calculating ROI can often feel like the "holy grail," this opportunity stands out as both tempting and practical.

#### Automating parts of your customer service is relatively easy to evaluate and may initially seem manageable, given the wealth of knowledge available to address customer issues.

#### However, the standard RAG approach described in Scenario 1 won't suffice here.

Your knowledge sources may include:

-   Existing customer service tickets
    
-   Emails sent to support teams
    
-   Articles, manuals, and other free-form informational documents
    

While this represents a significant repository of information, it is highly unstructured. Depending on the specific challenges faced by your customer service agents, an effective starting point might be providing them with a robust search tool. Such a tool could quickly surface similar questions and relevant answers, helping agents respond more efficiently.

The process of building automated customer agent typically begins with analyzing the data and understanding the nature of customer inquiries. These inquiries are often repetitive, and agents frequently report frustration at answering similar questions repeatedly.

#### By leveraging LLMs (Large Language Models), it becomes relatively straightforward and cost-effective to identify similar texts, including nuanced emails where customers may not clearly articulate their concerns. LLMs, like agents, can sift through the "noise" to extract the core question.

To succeed in this scenario, it is crucial to tailor your RAG system to the types of questions customers frequently ask. The complexity of these questions will significantly influence the system's effectiveness. While this may seem self-evident, businesses often underestimate the complexity of their problems simply because they’ve grown accustomed to them. Recognising and addressing this complexity is key to achieving meaningful outcomes.

Take a look at following email. Depending on your business objectives, you might be able to automate the response using a predefined answer.

[

![](https://substackcdn.com/image/fetch/$s_!6xC1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d66fbc4-0cd5-47c9-af2e-35d1a95223aa_992x720.png)



](https://substackcdn.com/image/fetch/$s_!6xC1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d66fbc4-0cd5-47c9-af2e-35d1a95223aa_992x720.png)

However, if the customer asks an additional question, such as, “By the way, could I change the subscription for the next quarter to ‘digital only’?”, the situation becomes more complex. A predefined response may not be sufficient. While it is technically possible to address this, it adds a layer of complexity and requires business owners to have a thorough understanding of the data they are managing.

For more intricate queries that require follow-up questions or a deep understanding of the customer's specific problem, simply retrieving past issues from other clients may not provide accurate responses. AI tends to bias its answers based on previous responses instead of tailoring them to the current issue. Additionally, AI can only utilize the information that is provided to it.

> **Probability of Success: High, if the problem to be solved is well-defined**
> 
> **Effort to Implement a Working PoC: Moderate, especially if we prioritize low-hanging fruit first**
> 
> **Technical Feasibility:** Evaluate whether you have access to the necessary information to handle customer emails effectively. Although the volume of emails you process might suggest feasibility, the unstructured nature of this data can decrease the chances of success. If this is the case, consider focusing on low-hanging fruit to deliver value quickly while simultaneously understanding the data better. Additionally, work on preparing a database of Standard Operating Procedures to handle more complex cases.