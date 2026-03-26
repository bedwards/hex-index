---
title: "How Zalando Delivers Real-Time Insights to Its Partners Brands"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2025-11-24T16:30:48.000Z"
source_url: "https://blog.bytebytego.com/p/how-zalando-delivers-real-time-insights"
word_count: 2775
estimated_read_time: 14
---

## [The 2025 Data Streaming & AI Report (Sponsored)](https://bit.ly/Conduktor_112425)

[

![](https://substackcdn.com/image/fetch/$s_!4F_e!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5a9c09d-12ca-402e-ae74-0d039e911300_1100x1100.png)



](https://bit.ly/Conduktor_112425)

AI is only as powerful as the data behind it — but most teams aren’t ready.

We surveyed 200 senior IT and data leaders to uncover how enterprises are really using streaming to power AI, and where the biggest gaps still exist.

Discover the biggest challenges in real-time data infrastructure, the top obstacles slowing down AI adoption, and what high-performing teams are doing differently in 2025.

Download the full report to see where your organisation stands.

\---

*Disclaimer: The details in this post have been derived from the details shared online by the Zalando Engineering Team. All credit for the technical details goes to the Zalando Engineering Team. The links to the original articles and sources are present in the references section at the end of the post. We’ve attempted to analyze the details and provide our input about them. If you find any inaccuracies or omissions, please leave a comment, and we will do our best to fix them.*

Zalando is one of Europe’s largest fashion and lifestyle platforms, connecting thousands of brands, retailers, and physical stores under one digital ecosystem.

As the company’s scale grew, so did the volume of commercial data it generated. This included information about product performance, sales patterns, pricing insights, and much more. This data was not just important for Zalando itself but also for its vast network of retail partners who relied on it to make critical business decisions.

However, sharing this data efficiently with external partners became increasingly complex.

Zalando’s Partner Tech division, responsible for data sharing and collaboration with partners, found itself managing a fragmented and inefficient process. Partners needed clear visibility into how their products were performing on the platform, but accessing that information was far from seamless. Data was scattered across multiple systems and shared through a patchwork of methods. Some partners received CSV files over SFTP, others pulled data via APIs, and many depended on self-service dashboards to manually export reports. Each method served a purpose, but together created a tangled system where consistency and reliability were hard to maintain. Many partners had to dedicate the equivalent of 1.5 full-time employees each month just to extract, clean, and consolidate the data they received. Instead of focusing on strategic analysis or market planning, skilled analysts spent valuable time performing repetitive manual work.

There was also a serious accessibility issue. The existing interfaces were not designed for heavy or large-scale data downloads. Historical data was often unavailable when partners needed it most, such as during key planning or forecasting cycles. As a result, even well-resourced partners struggled to build an accurate picture of their own performance.

This problem highlighted a critical gap in Zalando’s data strategy. Partners did not just want raw data or operational feeds. They wanted analytical-ready datasets that could be accessed programmatically and integrated directly into their internal analytics tools. In simple terms, they needed clean, governed, and easily retrievable data that fit naturally into their business workflows.

To address this challenge, the Zalando Engineering Team began a multi-year journey to rebuild its partner data sharing framework from the ground up. The result of this effort was Zalando’s adoption of Delta Sharing, an open protocol for secure data sharing across organizations. In this article, we will look at how Zalando built such a system and the challenges they faced.

## Zalando’s Partner Ecosystem

To solve the problem of fragmented data sharing, the Zalando Engineering Team first needed to understand who their partners were and how they worked with data.

[

![](https://substackcdn.com/image/fetch/$s_!6stu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3bc25a8a-9f1b-47f1-b28b-6039e456e8ee_3942x2634.png)



](https://substackcdn.com/image/fetch/$s_!6stu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3bc25a8a-9f1b-47f1-b28b-6039e456e8ee_3942x2634.png)

Zalando operates through three major business models:

-   **Wholesale:** Zalando purchases products from brands and resells them directly on its platform.
    
-   **Partner Program:** Brands list and sell products directly to consumers through Zalando’s marketplace.
    
-   **Connected Retail:** Physical retail stores connect their local inventory to an online platform, allowing customers to buy nearby and pick up in person.
    

Each of these models generates unique datasets, and the scale of those datasets varies dramatically. A small retailer may only deal with a few hundred products and generate a few megabytes of data each week. In contrast, a global brand might handle tens of thousands of products and need access to hundreds of terabytes of historical sales data for planning and forecasting.

In total, Zalando manages more than 200 datasets that support a business generating over €5 billion in gross merchandise value (GMV). These datasets are critical to helping partners analyze trends, adjust pricing strategies, manage inventory, and plan promotions. However, not all partners have the same level of technical sophistication or infrastructure to consume this data effectively.

Zalando’s partners generally fall into three categories based on their data maturity. See the table below:

[

![](https://substackcdn.com/image/fetch/$s_!u986!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F758c66d7-42e8-45ce-84ba-8965d7f7213a_3942x2154.png)



](https://substackcdn.com/image/fetch/$s_!u986!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F758c66d7-42e8-45ce-84ba-8965d7f7213a_3942x2154.png)

Large enterprise partners often have their own analytics teams, data engineers, and infrastructure. They expect secure, automated access to data that integrates directly into their internal systems. Medium-sized partners prefer flexible solutions that combine manual and automated options, such as regularly updated reports and dashboards. Smaller partners value simplicity above all else, often relying on spreadsheet-based workflows and direct downloads.

Zalando’s existing mix of data-sharing methods (such as APIs, S3 buckets, email transfers, and SFTP connections) worked in isolation but could not scale to meet all these varied needs consistently.

## Solution Criteria and Evaluation

After understanding the different needs of its partner ecosystem, the Zalando Engineering Team began to look for a better, long-term solution. The goal was not only to make data sharing faster but also to make it more reliable, scalable, and secure for every partner, from small retailers to global brands.

The team realized that fixing the problem required more than improving existing systems. They needed to design an entirely new framework that could handle massive datasets, provide real-time access, and adapt to each partner’s technical capability without creating new complexity. To do that, Zalando created a clear list of evaluation criteria that would guide their decision.

[

![](https://substackcdn.com/image/fetch/$s_!O8RM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbcf8526e-20b4-48b2-94d0-efe822b7f9d5_1500x774.webp)



](https://substackcdn.com/image/fetch/$s_!O8RM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbcf8526e-20b4-48b2-94d0-efe822b7f9d5_1500x774.webp)
*Source: [Zalando Engineering Blog](https://engineering.zalando.com/posts/2025/07/direct-data-sharing-using-delta-sharing.html)*

-   First, the solution had to be cloud-agnostic. Zalando’s partners used a variety of technology stacks and cloud providers. Some worked with AWS, others used Google Cloud, Azure, or even on-premise systems. The new system needed to work seamlessly across all these environments without forcing partners to change their existing infrastructure.
    
-   Second, the platform had to be open and extensible. This meant avoiding dependence on a single vendor or proprietary technology. Zalando wanted an open-standard approach that could evolve and integrate with different tools, systems, and workflows.
    
-   Third, the solution needed strong performance and scalability. With over 200 datasets and some reaching hundreds of terabytes in size, performance could not be an afterthought. The system had to handle large-scale data transfers and queries efficiently while maintaining low latency and high reliability.
    

Security was another non-negotiable factor. The platform had to support granular security and auditing features. This included data encryption, access control at the table or dataset level, and comprehensive logging for compliance and traceability. Since partners would be accessing sensitive commercial data, robust governance mechanisms were essential to maintain trust.

The next requirement was flexibility in data access patterns. Partners used data in different ways, so the system had to support:

-   Real-time streaming for partners who need up-to-the-minute insights
    
-   Batch and incremental updates for partners who preferred scheduled or partial data loads
    
-   Historical data access for partners who needed to analyze long-term trends
    

Finally, the solution had to be easy to integrate with the tools that partners were already using. Whether it was business intelligence dashboards, data warehouses, or analytics pipelines, the new system should fit naturally into existing workflows rather than force partners to rebuild them from scratch.

The search for such a system eventually led them to Delta Sharing, an open protocol specifically designed for secure data sharing across organizations. This discovery would go on to transform the way Zalando and its partners collaborate on data.

## The Solution: Delta Sharing

After months of evaluation and research, the Zalando Engineering Team found a technology that met nearly all of their requirements: Delta Sharing.

[

![](https://substackcdn.com/image/fetch/$s_!O3yi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1b01391-1e84-45a4-b6ff-998cba222ded_3942x2154.png)



](https://substackcdn.com/image/fetch/$s_!O3yi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1b01391-1e84-45a4-b6ff-998cba222ded_3942x2154.png)

Delta Sharing is an open protocol designed specifically for secure, zero-copy data sharing across organizations. This means that partners can access live data directly from its original location without creating separate copies or transferring large files across systems.

The team immediately recognized how well this approach fit their goals. It offered the openness, scalability, and security they needed while being simple enough to integrate into partners’ existing tools and workflows. Key features of Delta Sharing are as follows:

-   **Zero-copy access:** Partners can query live datasets directly without needing to download or duplicate them. This eliminates data redundancy and ensures that everyone works with the most up-to-date information.
    
-   **Open standard:** Because Delta Sharing is based on open principles, it works seamlessly with a wide range of tools and platforms. Partners can connect through Pandas, Apache Spark, Tableau, or even Microsoft Excel, depending on their needs.
    
-   **Granular access control:** Data is shared securely using token-based authentication and credential files, which means each partner receives access tailored to their role and data permissions.
    
-   **Scalable performance:** The protocol efficiently handles very large datasets, even those that exceed terabytes in size, while maintaining high reliability and low latency.
    
-   **Security by design:** Features such as encryption, auditing, and logging are built into the system. This ensures that all data access is traceable and compliant with internal governance policies.
    

While Delta Sharing is available as an open-source protocol, Zalando decided to implement the Databricks Managed Delta Sharing service instead of hosting its own version. This choice was made for several practical reasons:

-   It integrates tightly with Unity Catalog, Databricks’ governance, and metadata layer. This allowed Zalando to maintain a single source of truth for datasets and permissions.
    
-   It provides enterprise-grade security, compliance, and auditability, which are essential when dealing with sensitive commercial data from multiple organizations.
    
-   It removes the operational overhead of managing and maintaining sharing servers, tokens, and access logs internally.
    

By using the managed service, the Zalando Engineering Team could focus on delivering value to partners rather than spending time maintaining infrastructure.

## Simplified Architecture and Implementation

Once the Zalando Engineering Team validated Delta Sharing as the right solution, the next challenge was designing a clean and efficient architecture that could be scaled across thousands of partners. Their approach was to keep the system simple, modular, and easy to manage while ensuring that security and governance remained central to every layer.

At its core, the new data-sharing framework relied on three main building blocks that defined how data would be organized, accessed, and distributed:

-   **Delta Share:** A logical container that groups related Delta Tables for distribution to external recipients.
    
-   **Recipient:** A digital identity representing each partner within the Delta Sharing system.
    
-   **Activation Link:** A secure URL that allows partners to download their authentication credentials and connect to shared datasets.
    

This architecture followed a clear, three-step data flow designed to keep operations transparent and efficient:

-   **Data Preparation and Centralization:** All partner datasets were first curated and stored in scalable storage systems as Delta Tables. These tables were then registered in Unity Catalog, which acted as the metadata and governance layer. Unity Catalog provided a single source of truth for data definitions, schema consistency, and lineage tracking, ensuring that every dataset was traceable and well-documented.
    
-   **Access Configuration:** Once datasets were ready, the engineering team created a Recipient entry for each partner and assigned appropriate permissions. Each recipient received an activation link, which allowed them to securely access their data credentials. This setup ensured that partners only saw the data they were authorized to access while maintaining strict access boundaries between different organizations.
    
-   **Direct Partner Access:** When a partner activated their link, they retrieved a credential file and authenticated through a secure HTTPS connection. They could then directly query live data without duplication or manual transfer. Since the data remained centralized in Zalando’s data lakehouse, there were no synchronization issues or redundant copies to maintain.
    

This architecture brought several benefits. Partners now had real-time access to data, partner-specific credentials ensured granular security, and no redundant storage simplified maintenance.

To implement this system in Databricks, Zalando followed a clear operational workflow:

-   Prepare the Delta Tables and register them in Unity Catalog.
    
-   Create a Share to group related datasets.
    
-   Add the relevant tables to that share.
    
-   Create a Recipient representing each partner.
    
-   Grant the appropriate permissions to the recipient.
    

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!wSna!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6beb9157-b0f7-439f-aa82-980720ade027_3942x2442.png)



](https://substackcdn.com/image/fetch/$s_!wSna!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6beb9157-b0f7-439f-aa82-980720ade027_3942x2442.png)

Every step was guided by Databricks’ Delta Sharing API documentation, allowing the team to automate processes where possible and maintain strong governance controls.

## Enabling Adoption and Expanding the Platform

Once the new data-sharing architecture was in place, the Zalando Engineering Team understood that technology alone would not guarantee success. For the system to work, partners needed to be able to use it confidently and easily. Usability became just as important as performance or scalability.

To make the onboarding process smooth, Zalando created a range of partner-facing resources. These included step-by-step user guides that explained how to connect to Delta Sharing using tools familiar to most data teams, such as Pandas, Apache Spark, and common business intelligence (BI) platforms. Each guide walked partners through the entire process—from receiving their activation link to successfully accessing and querying their first dataset.

The team also built detailed troubleshooting documentation. This helped partners solve common issues such as expired credentials, connection errors, or authentication problems without needing to contact support. By empowering partners to self-diagnose and fix minor issues, Zalando reduced delays and improved overall efficiency.

In addition, they developed prebuilt connector snippets—small code templates that partners could plug directly into their existing data pipelines. These snippets made it possible to integrate Zalando’s data into existing workflows within minutes, regardless of whether a partner used Python scripts, Spark jobs, or visualization tools.

Together, these efforts dramatically reduced onboarding friction. Instead of days of setup and testing, partners could access and analyze data in a matter of minutes. This ease of use quickly became one of the platform’s strongest selling points.

The success of the Partner Tech pilot did not go unnoticed within Zalando. Other teams soon realized that they faced similar challenges when sharing data with internal or external stakeholders. Rather than allowing every department to build its own version of the solution, Zalando decided to expand the Delta Sharing setup into a company-wide platform for secure and scalable data distribution.

This new platform came with several key capabilities:

-   **Unified recipient management:** Centralized control of who receives what data, ensuring consistent governance.
    
-   **Built-in best practices:** Guidelines for preparing datasets before sharing, helping teams maintain high data quality.
    
-   **Standardized security and governance policies:** Every department followed the same data-sharing rules, simplifying compliance.
    
-   **Cross-team documentation and automation:** Shared tools and documentation made it easier for new teams to adopt the platform without starting from scratch.
    

Looking ahead, Zalando plans to introduce OIDC Federation, a feature that allows partners to authenticate using their own identity systems. This will remove the need for token-based authentication and make access even more secure and seamless.

## Conclusion

Zalando’s journey to modernize partner data sharing was both a technical and organizational transformation. By focusing on real partner challenges, the Zalando Engineering Team built a system that balanced openness, governance, and usability—creating long-term value for both the company and its ecosystem.

The key lessons were as follows:

-   Start with partner needs, not technology. Deep research into partner workflows helped Zalando design a solution that solved real pain points rather than adding complexity.
    
-   Design for diversity. A single rigid model could not serve everyone, so the platform was built to support different partner sizes, tools, and technical skills.
    
-   Cross-team collaboration is essential. Close cooperation between the Data Foundation, AppSec, and IAM teams ensured consistency, security, and compliance from day one.
    
-   Manual processes are acceptable for pilots but not for scale. Early manual steps were valuable for testing ideas, but later became automation goals as the platform grew.
    
-   Internal adoption validates external value. When other Zalando teams began using Delta Sharing, it confirmed the platform’s effectiveness beyond its original use case.
    
-   Security must be embedded from the start. Integrating encryption, access control, and auditing early prevented rework and established long-term trust.
    
-   Documentation is a product feature. Clear guides, troubleshooting steps, and code examples made onboarding fast and self-service for partners.
    
-   Managed is better than self-managed. Relying on Databricks’ managed Delta Sharing service gave Zalando operational stability and freed engineers to focus on partner success.
    

Delta Sharing has fundamentally changed how Zalando exchanges data with its partners. The company moved from fragmented exports to a unified, real-time, and governed data-sharing model. This shift has produced the following impact:

-   Reduced manual data handling and partner friction.
    
-   Enabled faster, data-driven decision-making through consistent access.
    
-   Created a scalable foundation for cross-partner analytics and collaboration.
    
-   Established a reusable enterprise framework for secure data exchange.
    

**References:**

-   [Direct Data Sharing Using Delta Sharing: Our Journey to Empower Partners at Zalando](https://engineering.zalando.com/posts/2025/07/direct-data-sharing-using-delta-sharing.html)
    
-   [What is Delta Sharing?](https://docs.databricks.com/aws/en/delta-sharing/)
    

\---

## **SPONSOR US**

Get your product in front of more than 1,000,000 tech professionals.

Our newsletter puts your products and services directly in front of an audience that matters - hundreds of thousands of engineering leaders and senior engineers - who have influence over significant tech decisions and big purchases.

Space Fills Up Fast - Reserve Today

Ad spots typically sell out about 4 weeks in advance. To ensure your ad reaches this influential audience, reserve your space now by emailing **sponsorship@bytebytego.com.**