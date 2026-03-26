---
title: "Click & Create: Turning Customer Ticket Insights into Knowledge Workflows"
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2025-01-15T09:53:32.000Z"
source_url: "https://nobsai.substack.com/p/click-and-create-turning-customer"
word_count: 952
estimated_read_time: 5
---

There is a growing emphasis on AI-assisted question answering systems to answer customer questions and handle customers' problem effectively. However, leveraging AI for such a use case requires a robust and structured knowledge base, as the answers must be grounded in the reality specific for the company.

In this blog post, I will explore the challenges and solutions in creating knowledge base for resolving issues in customer support centers.

**Once you read this article, you will have a better understanding of challenges ahead of you.**

I will explain the necessity of preparing the knowledge base according to the recipe below.

[

![](https://substackcdn.com/image/fetch/$s_!QGv8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b6f4bba-31f8-49dc-8732-783affde9956_1414x2000.png)



](https://substackcdn.com/image/fetch/$s_!QGv8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b6f4bba-31f8-49dc-8732-783affde9956_1414x2000.png)

Focusing specifically on customer support, AI-assisted question answering can be categorized into two distinct flavors:

1.  **Personalized Support,** where individual customer inquiries are being addressed such as order IDs, personal account details, and specific transactional information. This is particularly important in sectors like e-commerce, where customers often seek personalized assistance about their orders.
    
2.  **Product Technical Support,** which concerns answering broader questions related to product usage, troubleshooting, and technical issues. It is popular in industries dealing with complex or technical products where customers may require detailed guidance.
    

In this article I am focusing on Product Technical Support and do not go into agentic workflows for solving personalized issues. Not yet 😉

### What is your data readiness?

From data perspective AI-assisted question answering systems can have two types of knowledge component:

1.  **Document-Based Knowledge:** These systems utilize a vast array of documents already available within a company. This can include manuals, FAQs, internal wikis, and more. The assumption is that all the information necessary to solve customer questions is written down in such textual form and all given information is assumed to be factually correct statements.
    
2.  **Interaction-Based Knowledge:** These systems aim to take advantage of knowledge embedded in customer interactions such as tickets and emails. While it might seem intuitive to use these interactions as a knowledge source, their unstructured and often chaotic nature poses significant challenges.
    

Document-based knowledge comes with challenges of its own, but I will not touch upon it this time. I want to focus on the challenging nature of interaction-based knowledge.

### The Challenge of Unstructured Data

For those who are less technical, it might appear that using customer tickets and emails is a viable knowledge source. However, the reality is quite different. These interactions are typically:

-   **Unstructured and messy:** Conversations with customers are dynamic and can vary widely in format and content, making it difficult to extract consistent and reliable information. E.g. some emails are straight to the point, and some are lengthy and provide a lot of details unnecessary for solving the problem. As emails are a multi-turn type of conversations, relevant information is scattered throughout the communication.
    
-   **Difficult to maintain:** Updating and maintaining a knowledge base derived from such unstructured data is labor-intensive and prone to errors. For example, multiple data points can be duplicated (e.g. customers asking the same question) or knowledge can become outdated due to development of the product/service.
    

Such issues make it a must to transform these raw interactions into a solid, structured knowledge base that AI systems can effectively utilize.

### The Problem with Existing Knowledge Bases

Consider a company that needs to address general questions about its products and technical issues but lacks a comprehensive knowledge base beyond customer emails. While there might be some blogs and manuals available, a significant portion of the knowledge resides in the minds of customer service agents. This situation presents several challenges:

-   **Single source of truth missing:** Relying solely on past interactions and agent knowledge fails to provide a centralized and reliable knowledge base.
    
-   **Dynamic and evolving information:** Products and features frequently change, necessitating continuous updates to the knowledge base. However, updating knowledge derived from unstructured interactions is cumbersome and it puts a burden on customer support departments.
    
-   **Unstructured knowledge acquisition:** Knowledge is often captured informally through meetings or memos in the form of emails, lacking the necessary structure for effective AI utilization.
    

Before embarking on developing an AI-supported question answering system, it's essential to assess the feasibility and data readiness to ensure the system can deliver accurate responses.

### Creating Knowledge Workflows as a single source of truth

A single source of truth is indispensable for effective AI-assisted customer support. Here's why:

-   **Consistency:** Ensures that all customer interactions are based on the same accurate and up-to-date information.
    
-   **Efficiency:** Simplifies the process of updating and maintaining the knowledge base, especially for dynamic products.
    

However, existing customer interactions do not inherently provide this unified foundation. Therefore, creating a structured and centralized knowledge in the form of Knowledge Workflows is important.

### Automating knowledge extraction and structuring

To address the challenges of unstructured data, we're developing a solution that automates the extraction and organization of knowledge from customer interactions. Creating such solution is natural and mimics the way you would go about onboarding a new employee.

Here's how it works:

#### **1\. Pre-processing conversations**

[

![](https://substackcdn.com/image/fetch/$s_!Gbqq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F508350a5-fcd3-46e2-882e-098eb0f18bf2_1486x600.png)



](https://substackcdn.com/image/fetch/$s_!Gbqq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F508350a5-fcd3-46e2-882e-098eb0f18bf2_1486x600.png)

Example:

[

![](https://substackcdn.com/image/fetch/$s_!gEja!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F54dc2f73-e670-4cb7-8aeb-4900081df8bb_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!gEja!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F54dc2f73-e670-4cb7-8aeb-4900081df8bb_1920x1080.png)

#### 2\. Clustering similar requests

[

![](https://substackcdn.com/image/fetch/$s_!6xPO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b89ea44-4ca8-4342-a404-f2a04b10c8d5_605x250.png)



](https://substackcdn.com/image/fetch/$s_!6xPO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b89ea44-4ca8-4342-a404-f2a04b10c8d5_605x250.png)

Examples of clusters out of clients’ requests and questions:

[

![](https://substackcdn.com/image/fetch/$s_!3ENb!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38c3785b-2cd3-4def-baf7-9ca9c274a656_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!3ENb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38c3785b-2cd3-4def-baf7-9ca9c274a656_1920x1080.png)

#### 3\. Creating workflows as knowledge base entries

[

![](https://substackcdn.com/image/fetch/$s_!JEv3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d58fbcb-437f-49b3-b9af-50a0e060ee74_626x259.png)



](https://substackcdn.com/image/fetch/$s_!JEv3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d58fbcb-437f-49b3-b9af-50a0e060ee74_626x259.png)

An example of a potential workflow created out of conversations in the cluster:

[

![](https://substackcdn.com/image/fetch/$s_!Zsb_!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18ba5cf3-a824-40c5-837b-77ce9047a102_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!Zsb_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18ba5cf3-a824-40c5-837b-77ce9047a102_1920x1080.png)

### Integrating with AI-Assisted Solutions

Once the knowledge base is established, it can seamlessly integrate with AI-assisted support systems. When a customer poses a question, the AI system searches the knowledge base for relevant workflows. The AI references the appropriate workflow, ensuring that responses are accurate and contextually relevant. Since workflows are a logical order of steps to follow, the AI must determine the current step of the customer's issue to provide precise assistance.

By turning messy, unorganized customer interactions into a clear and centralized system, companies can provide support that's consistent, accurate, and easy to scale. Automating the way we gather and organize this knowledge makes the path for effective AI solutions.