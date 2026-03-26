---
title: "Bringing AI solution to the end-user "
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2025-03-03T19:30:21.000Z"
source_url: "https://nobsai.substack.com/p/bringing-ai-solution-to-the-end-user"
word_count: 1206
estimated_read_time: 7
---

The most exciting part? Experimenting with AI and developing the core technical solution.

The most daunting—and often overlooked—challenge? Deploying it to production.

> An AI solution is useless until it’s deployed. Period. That’s why we knew from the start that we needed MLOps expertise to deliver value from end to end.

**In theory, the RAG (Retrieval-Augmented Generation) space offers ready-to-use building blocks for deployment. However, in our experience, they lack the flexibility we need:**

-   No built-in integration with HubSpot, the tool of choice of our client.
    
-   The off-the-shelf RAG component was too basic and didn’t account for our required preprocessing and messy knowledge base.
    
-   The architecture was rigid, limiting our ability to customize it for the client’s needs.
    

We tested off-the-shelf solutions, but they simply didn’t work—they returned incorrect answers to the questions sent to customer support. The correctness level was well below the acceptance threshold of the customer and the project would fail if we couldn't get off the ready-made solutions.

#### After reading this article you will have a clear idea on how you can deploy your RAG application which is more complex than basic tutorial examples.

We outline our architectural decisions, trade-offs, and the rationale behind them, demonstrating that while some choices come with limitations, they were made consciously with the current operational scope in mind.

Our goal was to create a robust, yet cost-efficient system tailored to the customer's needs while avoiding overengineering.

[

![](https://substackcdn.com/image/fetch/$s_!vQ5p!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e553ece-140e-4b78-be8e-245e023a7f4d_1920x1080.jpeg)



](https://substackcdn.com/image/fetch/$s_!vQ5p!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e553ece-140e-4b78-be8e-245e023a7f4d_1920x1080.jpeg)

### The system was designed with a clear set of assumptions to ensure efficiency, cost-effectiveness, and rapid implementation

With an estimated volume of 500–600 emails per month, the focus was on scaling to meet this demand rather than over-engineering for hypothetical future growth. This strategic decision helped avoid unnecessary costs and complexity while ensuring a robust and stable system. The primary goal was to rapidly implement and validate the system’s usefulness, prioritizing deployment speed and real-world client feedback over building a long-term, future-proof solution.

As a key principle was to avoid over-engineering—no premature optimizations were made for future scaling that may never be needed. Instead, we made conscious technological choices with two principles in mind - **safety and savings**.

It turns out that Azure deployments can be expensive and if you are a small business a couple of hundred dollars per month can be substantial in your budget. We agreed that 500 dollars per month of fixed costs is the upper limit. It meant that we had to carefully consider costs of services we could use. Easier to deploy, off-the-shelf tools and services are in general more expensive in comparison to event driven services, as the first ones, require constant provision of compute.

The costs of some Azure tools can be surprisingly high, especially if you think about them just as "simple deployment tools, the most of my costs will be surely OpenAI endpoints”.

After extensive research we leveraged **Durable Functions, Azure Container Instances (ACI)**, and **Virtual Networks (VNet)** for safety. While some of these choices may come at a higher cost - especially building inside of a Virtual Network and thus using VPN for communication, they offered simplicity and speed, with the right rate of safety which was crucial as we are dealing with customer emails.

The system primarily functions by responding to customer emails captured within HubSpot, however, in the first beta phase we ensure that the email is always approved by the customer center. Apart from designing architecture on Azure, we dove deep into API of Hubspot to better understand what options we have to deliver the smoothest experience possible.

We knew that to increase productivity in the customer center, we cannot disrupt the whole way of working of humans. That is why we conducted several interviews with the end-users to understand their way of working.

The workflow operates as follows:

1.  **Email Ingestion:** When a customer sends an email, HubSpot records it.
    
2.  **Polling Mechanism:** We use an Azure Durable Functions **Time Trigger**, which queries HubSpot at regular intervals.
    
3.  **Orchestration Execution:** If new emails are detected, additional orchestrations process them and generate responses using an LLM-powered RAG pipeline.
    
4.  **Data Storage:** Each generated response, along with the corresponding email timestamp, is stored in a database.
    
5.  **Processing Control:** To prevent redundant processing, the Time Trigger resumes from the last recorded timestamp and ensures that new orchestrations are not initiated while existing ones are running. This is a safety measure which was necessary to ensure that we do not process the same email concurrently.
    
6.  **Vector Database:** A vectorized knowledge base in Qdrant is hosted on **Azure Container Instances (ACI).**
    
7.  **Response Posting:** Once the response is generated, it is posted as a comment on the respective email thread in HubSpot, allowing customer support agents to review and use it at their discretion.
    

This approach is effective given the current email volume (500-600 emails per month) and ensures efficient processing while keeping infrastructure costs under control.

[

![](https://substackcdn.com/image/fetch/$s_!VV4k!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe830c0c9-5b6e-41c2-8c6a-9896d35fd6e8_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!VV4k!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe830c0c9-5b6e-41c2-8c6a-9896d35fd6e8_1920x1080.png)

### Key Architectural Decisions and Trade-Offs

1\. **Polling via Azure Durable Functions Time Trigger**

-   **Trade-off:** Unlike event-driven solutions, polling introduces latency in response generation.
    
-   **Rationale:** Since email traffic is relatively low, polling at intervals provides an efficient balance between responsiveness and resource utilization. Workflow-friendly solutions like Logic Apps were considered but rejected due to their higher cost structure.
    

2\. **Storage of Processed Emails**

-   **Trade-off:** Requires additional database management and synchronization logic.
    
-   **Rationale:** This prevents redundant processing and allows for a polling mechanism that avoids unnecessary function executions, optimizing cost and performance.
    

3\. **Hosting the Vector Database on Azure Container Instances (ACI)**

-   **Trade-off:** ACI is relatively expensive for persistent workloads compared to other hosting options.
    
-   **Rationale:** However it provides a quick and manageable way to deploy a containerized vector database within our **VNet**, ensuring security and compliance. Our vector database is small enough to use the cheapest version of ACI, so we decided to give it a go for now.
    

4\. **Using Azure VNet for Secure Communication**

-   **Trade-off:** Requires a **VPN Gateway**, which increases development costs.
    
-   **Rationale:** Ensuring secure communication between the Function App and the vector database necessitated a private network. While the VPN Gateway is expensive, it was a necessary trade-off for security and compliance. Once local development is complete, we can disable the VPN Gateway to reduce ongoing costs.
    

5\. **Choosing Durable Functions on a Flex Plan**

-   **Trade-off:** More expensive than a standard Consumption Plan.
    
-   **Rationale:** Durable Functions on a Flex Plan offer a middle ground between premium and standard plans. Unlike Logic Apps, which would incur constant costs, this model ensures we only pay for executions, aligning well with our sporadic but predictable workload.
    

\---

Our deployment has been a success—we’ve tested it thoroughly, and it works as expected while remaining cost-efficient. Now, we’re moving forward with functional tests.

Deploying AI solutions can feel overwhelming, especially for those primarily focused on AI development rather than infrastructure. However, deployment is crucial; without delivering models to production, AI projects hold little real-world value.

In our case, we opted to deploy our own custom code rather than relying on frameworks. We find that many frameworks lack transparency, making it difficult to understand what’s happening under the hood. By developing and deploying our own solutions, we maintain full control over the process.

This experience demonstrates that while deployment may seem complex, it is an essential step in bringing AI products to life. We hope this encourages others to take on the challenge and successfully deploy their own AI solutions.