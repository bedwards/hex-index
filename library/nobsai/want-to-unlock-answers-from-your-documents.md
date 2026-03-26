---
title: "Want to unlock answers from your documents? "
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2024-11-12T18:53:52.000Z"
source_url: "https://nobsai.substack.com/p/want-to-unlock-answers-from-your"
word_count: 1245
estimated_read_time: 7
---

**TL;DR**

For businesses wanting to turn raw data into usable insights with Generative AI, three key points are essential:

1.  **RAG Isn’t Plug-and-Play**
    
    RAG (Retrieval-Augmented Generation) can help manage unstructured data, but it’s not a complete solution by itself. It requires custom technical setup and fine-tuning, especially in complex cases like multi-format data and domain-specific queries. Business leaders should understand RAG basics to ask the right questions and avoid overreliance on a single approach.
    
2.  **Use Real Data for Testing**
    
    Testing RAG applications with real user questions is crucial. Artificially generated questions often don’t capture the nuances of real queries, which can lead to issues in production. Gathering real question-document pairs ensures that retrieval is effective and that generated answers are relevant.
    
3.  **Focus on User-Centric Problem Solving**
    
    Break down user needs into smaller tasks to deliver quick, meaningful results. For example, automating repetitive questions in a customer service center can free up time and increase productivity. This user-focused approach helps maintain client interest and trust, paving the way for gradual improvements that address actual pain points.
    

"Is all the hype about transforming raw data into a ready-to-use knowledge database just fake? How can a business actually leverage that?" asked a friend of mine, who’s overseeing the optimization of his company’s customer service center and yes, he starts to be disappointed.

When he asked, I felt a bit overwhelmed—there were so many key points I wanted him to keep in mind before talking with his engineering team. So, I wrote it all down in an email, which eventually turned into this post.

To all business stakeholders, here are three essential points to keep in mind if you want to take full advantage of one of Generative AI’s most promising applications: using your data to answer questions effectively.

\---

## RAG alone isn’t enough—pay attention to the technical details

To address your problem, the engineering team plans to build a Retrieval-Augmented Generation (RAG) pipeline.

Over the past two years, RAG has gained significant traction in tech circles. The concept, hinted at by its full name, leverages retrieval methods to enhance the capabilities of language models. Without diving into technical details—there are numerous resources available on that—I’ll note that RAG is a natural starting point for handling large volumes of unstructured data and quickly finding specific answers.

To make this work, the engineering team will structure the data in a way that enables the application, powered by a large language model, to respond accurately to your questions. This approach is popular because it addresses a common pain point: navigating messy internal document storage to locate answers.

However, it's essential to set realistic expectations: a standard RAG pipeline isn’t a plug-and-play solution. Despite its promising potential, achieving satisfactory results requires a nuanced, tailored approach.

As a tech lead, I’ve often been told, “the technical decisions are yours to make.” This sentiment often arises when business stakeholders feel overwhelmed by technical jargon and complex concepts from tech teams. While understandable, delivering real value demands a basic understanding of what’s feasible within the proposed solution.

> By recognizing that RAG is just one component in a larger system, you can guide the project more effectively by asking informed questions. Remember: you have deep insight into the needs of your users, while the engineering team knows how to implement solutions. By grasping the fundamentals, you’ll be able to challenge the team constructively, especially if they seem overly focused on a standard RAG pipeline.

> Just a few pitfalls when doing standard Retrieval Augmented Generation:

-   Various, very unstructured datasources and formats like tables, images, PDFs with images, Confluence pages, docx, Excel sheets, emails are challenging to digest
    
-   Domain of your business is very specific and requires knowledge of particular nomenclature
    
-   Users actually need to ask questions which require complex reasoning and that’s where simple RAG fails
    

I will be diving deeper into how to make RAG work - subscribe if you want to be notified.

## Rigorously test on real data

As you likely know, implementing any AI-driven application requires data for testing. This is also true for the question-answering system we’re discussing.

As I mentioned earlier, RAG (Retrieval-Augmented Generation) is just one part of a larger solution. While we need more advanced components than what’s typically available online, let’s assume the general concept remains the same. Users submit questions, the system retrieves relevant documents (the "R" in RAG) as the basis for the response, and the LLM generates an answer based on that information (the "AG" in RAG).

The AG, or augmented generation, is relatively straightforward. With today’s powerful models, synthesizing information is manageable. Of course, there’s a risk of hallucination—where the model may add inaccurate information—but careful prompting minimizes this. While costs are a consideration, the quality of generated answers is usually solid.

However, what’s often overlooked is the "R"—retrieval—aspect of the system.

> Now, onto the data requirements for developing question-answering RAG applications. With diverse and dispersed data sources, identifying the most relevant information to answer a question is a significant challenge. To run experiments with purpose, you need “question-document” pairs. A common approach is for the tech team to generate a set of artificial questions based on available documents, creating a dataset to evaluate retrieval effectiveness.

> While prevalent, this approach has some drawbacks:

-   In my experience, artificially generated datasets rarely reflect real user queries, which are often messy and nuanced.
    
-   The usefulness of artificial data depends on the use case. For instance, if answering customer emails in a service center, users will likely write longer messages with more detail. By contrast, an internal “Google-like” search would involve shorter, query-based questions.
    
-   Artificially generated questions have limitations. They typically lack edge cases that require complex reasoning across multiple documents.
    

> **It's better to wait and collect real, or "ground truth," data to ensure reliable evaluation. Many systems that perform well on artificial datasets fail in production. As a product manager, think about ways to gather authentic user questions to set yourself up for success.**

Remember: you don’t know what you don’t know. That’s why analyzing real data is essential.

## Break down users' needs into smaller components.

My approach to AI solutions is straightforward and focused on user needs. I prioritize solving problems from the user’s perspective, avoiding a "tech-first" mindset because there’s no satisfaction in building something that doesn’t matter to the end user.

Analyzing real data provides valuable insights into how you can deliver immediate value to users. In this scenario, close collaboration between the tech team and product managers is crucial for maximizing the impact of the solution.

My drive to deliver quick value comes from a deep motivation to keep users engaged—whether they’re external clients or internal stakeholders. There’s nothing more frustrating than working with an uninterested client.

> **When you clearly define what the user wants and identify their biggest pain points, you can break down the work into smaller, achievable parts that provide immediate value.**

For instance, when automating a customer service center, you may notice that repetitive questions frequently have similar answers. Generative AI can help identify and group these questions, which was much harder to do reliably before LLMs. If these repetitive questions make up 10% of inquiries, automating them can free up 10% of customer agents’ time.

> While this may seem like a small improvement, it actually has significant benefits:

-   Delivering visible results builds trust with the customer.
    
-   Solving specific parts of the problem incrementally simplifies the overall process.
    

However, without a solid understanding of what users are asking, it’s impossible to identify these easy wins.

If you want to better understand technology without technical jargon and overpromise - follow my Substack! More articles coming.