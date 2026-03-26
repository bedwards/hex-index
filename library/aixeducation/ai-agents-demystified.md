---
title: "🕵️‍♂️ AI Agents Demystified"
author: "Johnny Chang"
publication: "AI x Education"
publication_slug: "aixeducation"
published_at: "2025-01-14T11:15:50.000Z"
source_url: "https://aixeducation.substack.com/p/ai-agents-demystified"
word_count: 2046
estimated_read_time: 11
---

Happy New Year! As we enter 2025, many are calling it the year of AI agents. OpenAI’s CEO Sam Altman's [latest blog post](http://blog.samaltman.com) states, "We believe that, in 2025, we may see the first AI agents 'join the workforce' and materially change the output of companies." But what exactly are these AI agents, and how will they transform our world? In this edition, we will explore the concept of AI agents, answer your questions along the way, and share insights into their potential impact.

**Here is an overview of today’s newsletter:**

-   Understand what AI Agents are and their potential impact on education
    
-   Learn how students are influencing AI policy recommendations
    
-   Explore ChatGPT’s potential as a teachable agent in programming education
    
-   Discover OpenAI’s latest video generation tool called Sora
    

\---

## 🚀 Practical AI Usage and Policies

> **What exactly are AI agents?**

*[TechCrunch](http://At its simplest, an AI agent is best described as AI-fueled software that does a series of jobs for you that a human customer service agent, HR person, or IT help desk employee might have done in the past, although it could ultimately involve any task.)* shared a simple definition for AI agents as “AI-fueled software that does a series of jobs for you that a human customer service agent, HR person, or IT help desk employee might have done in the past, although it could ultimately involve any task. You ask it to do things, and it does them for you.“

In Google's white paper titled *[Agents](https://media.licdn.com/dms/document/media/v2/D561FAQH8tt1cvunj0w/feedshare-document-pdf-analyzed/B56ZQq.TtsG8AY-/0/1735887787265?e=1736985600&v=beta&t=pLuArcKyUcxE9B1Her1QWfMHF_UxZL9Q-Y0JTDuSn38)*, they compare an AI agent to a chef. Just as a chef creates dishes through an iterative process of gathering information about their available ingredients and customer preferences, reasoning through their recipes, and taking action to cook the dish, agents are designed to achieve their goals by processing information, making informed decisions, and refining actions based on feedback or previous outputs.

Check out this short 6-minute video to learn the basics of AI agents:

> **How are AI agents different from standard language models like ChatGPT?**

[

![](https://substackcdn.com/image/fetch/$s_!pvd0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4f8907-bead-4d61-8fd9-3eac66bfb876_1276x806.png)



](https://substackcdn.com/image/fetch/$s_!pvd0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b4f8907-bead-4d61-8fd9-3eac66bfb876_1276x806.png)
*Agents vs. Models Chart from “Agents” by Julia Wiesinger, Patrick Marlow and Vladimir Vuskovic \[Google\](https://media.licdn.com/dms/document/media/v2/D561FAQH8tt1cvunj0w/feedshare-document-pdf-analyzed/B56ZQq.TtsG8AY-/0/1735887787265?e=1736985600&v=beta&t=pLuArcKyUcxE9B1Her1QWfMHF\_UxZL9Q-Y0JTDuSn38)*

While models like ChatGPT generate responses using their existing training data, agents are more dynamic and can connect to external tools and APIs to access live data. They can even plan and execute tasks autonomously. This makes them better for handling complex, real-world scenarios when they need to adapt to different situations and use up-to-date information to make decisions.

> **How do AI agents work?**

Broadly speaking, AI agents use a four-step process for problem-solving as described in [this blog by Nvidia](https://blogs.nvidia.com/blog/what-is-agentic-ai/):

1.  **Perceive**: The AI agent collects data from multiple sources, such as sensors and databases, and analyzes this information to identify important patterns and relevant details.
    
2.  **Reason**: A large language model works behind the scenes as an orchestrator to understand tasks, generate solutions, and coordinate specialized models for specific functions, using techniques like retrieval-augmented generation (RAG) to access relevant data and deliver accurate outputs. The model also uses reasoning and logic frameworks such as ReAct, Chain-of-Thought, or Tree-of-Thoughts to reason and plan systematically.
    
3.  **Act**: The AI agent connects with external tools to carry out its tasks, but guardrails are built in to limit what the AI can do independently.
    
4.  **Learn**: The AI agent gets better over time by learning from each interaction. This creates a feedback loop, called a “data flywheel,” where new interactions help improve future performance, making operations more efficient and decisions more accurate.
    

> **What are some helpful key terms to know?**

Here are some terms related to AI agents, as defined in Google’s white paper, titled *[Agents](https://media.licdn.com/dms/document/media/v2/D561FAQH8tt1cvunj0w/feedshare-document-pdf-analyzed/B56ZQq.TtsG8AY-/0/1735887787265?e=1736985600&v=beta&t=pLuArcKyUcxE9B1Her1QWfMHF_UxZL9Q-Y0JTDuSn38)*:

-   **Cognitive Architecture**: This refers to the foundational framework of an AI agent that guides how it processes information, makes decisions, and takes actions. It consists of components like reasoning techniques, planning capabilities, and memory.
    
-   **Orchestration Layer**: This layer is central to an AI agent's cognitive architecture, as it manages how the agent processes inputs, reasons through tasks, and decides on its next actions. It allows the agent to maintain context, track progress, and execute tasks in a logical sequence until its objective is achieved.
    
-   **Extensions**: These are tools that allow AI agents to interact with external systems, such as APIs, in a structured way. Extensions enable agents to perform tasks like retrieving live data or sending commands, bridging the gap between the agent's internal capabilities and the outside world.
    
-   **Functions**: Functions are predefined modules that the agent can use to complete specific tasks. Unlike extensions, which operate on the agent side, functions run on the client side, giving developers more control over execution while letting the agent determine when and how to use them.
    

> **How are AI agents being used today?**

According to this [article from the Washington Post](https://www.wsj.com/articles/how-are-companies-using-ai-agents-heres-a-look-at-five-early-users-of-the-bots-26f87845), here are some ways major companies are currently integrating AI agents in their workforce:

-   💊 **Johnson & Johnson**: AI agents are used in the chemical synthesis process which traditionally requires scientists to manually go through multiple rounds of testing with optimal conditions, thus aiding in the process of drug discovery.
    
-   🏦 **Moody’s**: A network of 35 interconnected AI agents performs financial analysis tasks, ranging from SEC filing reviews to industry comparisons. The agents are each provided with specific instructions, personalities, and data to perform complex and comprehensive analyses.
    
-   🛒 **eBay**: AI agents are used to help write code and develop marketing campaigns. The company is also planning on implementing them in the future to help customers find items and sellers list their products.
    
-   📞 **Deutsche Telekom**: Employees at the company use AI agents to ask questions regarding internal policies and benefits. Service staff also use it to gather information about the company’s products and services.
    

> **How will AI agents impact education?**

Here are some potential use cases of AI agents in education:

-   📖 **Personalized Study Coach**: An AI agent that analyzes a student's learning patterns, test results, and homework completion rates to create customized study schedules and recommend specific learning resources, adapting in real time based on performance.
    
-   🧪 **Laboratory Safety Supervisor**: An AI agent connected to lab sensors and equipment that monitors student experiments in real time, providing safety alerts and guidance while collecting data for later analysis and learning opportunities.
    
-   🎭 **Historical Reenactment Experiences:** An AI agent that creates interactive historical scenarios where students can converse with historical figures, making decisions that show them alternate historical outcomes based on their choices.
    

While we can’t be certain of what the future holds for AI agents in education, they have the potential to make learning more interactive while offering real-time, personalized feedback and engagement. However, the use of AI agents also brings important considerations, particularly concerns around student data privacy. Both sides will be important to consider as we explore these new technologies. Feel free to share your thoughts on the impact of AI agents on education in the comments below!

> **Where can I learn more?**

Here is a list of helpful resources to dive deeper into the topic of AI agents:

-   [Free Course by Vanderbilt University on Agentic AI and how to build your own basic AI agent](https://www.coursera.org/learn/agentic-ai#modules) (Coursera)
    
-   [Infographic on Automation vs AI workflow vs AI agents](https://www.linkedin.com/posts/akantjas_many-%F0%9D%98%88%F0%9D%98%90-%F0%9D%98%A2%F0%9D%98%A8%F0%9D%98%A6%F0%9D%98%AF%F0%9D%98%B5%F0%9D%98%B4-shared-on-linkedin-activity-7279075047271522304-2MU6/?utm_source=share&utm_medium=member_desktop) (Alexandre Kantjas on LinkedIn)
    
-   [Overview of what AI agents are, as well as other relevant topics](http://What are AI agents?) (IBM)
    

\---

## 📣 Student Voices and Use Cases

> **Students in the News**

-   A group of undergraduate students from the Princeton School of Public and International Affairs (Princeton SPIA) recently made history by forming the school’s first-ever AI Policy Task Force. They traveled to Capitol Hill, where they met with policymakers to share their policy recommendations on pressing issues like cybersecurity, biological weapons, and misinformation campaigns. Read more about their experience [here](https://spia.princeton.edu/news/students-brief-policymakers-artificial-intelligence-first-ever-ai-task-force).
    
-   Rebeca Damico, a journalism student at the University of Utah, shares her experience as a student observing how her peers use ChatGPT and how her school has recently adopted a stricter stance on AI usage. However, she notes that opinions on AI vary widely, with each professor taking a case-by-case approach. To read more about her experience, check out [this article](https://www.phillyvoice.com/college-students-ai-workplace-skills-academic-restrictions/) on Philly Voice.
    

> **Student Perspectives**

AI Consensus is publishing a student-written article answering the question, “How is AI changing what it means to learn? Students may submit their 400-word reflection to the short essay contest [here](https://docs.google.com/forms/d/e/1FAIpQLSeTdW_QMt1ZJCXhhYt3MGQkMuhvhZDpmyKoMJcnw2PCi3Xffg/viewform). The deadline has been extended to January 18th.

[

![](https://substackcdn.com/image/fetch/$s_!9PSX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6aed915e-c722-435f-91a6-e6bc5a9771e8_1080x1080.png)



](https://substackcdn.com/image/fetch/$s_!9PSX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6aed915e-c722-435f-91a6-e6bc5a9771e8_1080x1080.png)

\---

## 📝 Latest Research in AI + Education

> ### **Google**

**[LearnLM: Improving Gemini for Learning](https://arxiv.org/pdf/2412.16429) ↗️**

This research paper introduces LearnLM, a pedagogically optimized AI model developed by Google to enhance learning experiences using Generative AI. By focusing on "pedagogical instruction following," LearnLM enables developers and educators to customize AI behavior for specific learning goals. The system uses supervised fine-tuning, reinforcement learning from human feedback (RLHF), and scenario-based evaluations to adapt to nuanced teaching contexts. Evaluations show LearnLM outperforms models like GPT-4o and Claude 3.5 in engaging learners, managing cognitive load, and inspiring active learning. It aims to bridge AI advancements with education, promoting accessibility and personalized learning.

```
LearnLM Team, Modi, A., Veerubhotla, A. S., Rysbek, A., Huber, A., Wiltshire, B., Veprek, B., Gillick, D., Kasenberg, D., Ahmed, D., Jurenka, I., Cohan, J., She, J., Wilkowski, J., Alarakyia, K., McKee, K. R., Wang, L., Kunesch, M., Schaekermann, M., ... Assael, Y. (2024). LearnLM: Improving Gemini for Learning. arXiv. https://arxiv.org/abs/2412.16429 
```

> ### **Peking University, Tsinghua University, East China Normal University**

**[Learning-By-Teaching with ChatGPT: The Effect of Teachable ChatGPT Agent on Programming Education](https://arxiv.org/pdf/2412.15226) ↗️**

This paper explores the role of ChatGPT as a teachable agent in programming education, focusing on its impact on learners’ knowledge acquisition, programming skills, and self-regulated learning (SRL) abilities. By engaging students in a learning-by-teaching process, the study found that interacting with ChatGPT led to significant improvements in students’ understanding of programming concepts, particularly in crafting readable and logically structured code. However, the tool's tendency to produce error-free outputs limited opportunities for learners to develop debugging skills. Moreover, students reported enhanced self-efficacy and cognitive strategies, indicating that the act of teaching ChatGPT fostered deeper engagement and planning in their learning process. This research underscores the potential of generative AI to facilitate natural language interactions, making the learning-by-teaching approach more accessible and impactful, particularly in areas requiring hands-on problem-solving like programming.

**Student Opinion by Aditya Syam:**

The role of debugging in coding is certainly important; however, with the rise of generative AI and the abundance of online resources, intuitive coding skills have become far more crucial. Generative AI tools can already assist with identifying and fixing errors, making debugging a less troublesome task for almost all programmers. In the real world, where resources like documentation, forums, and AI assistants are almost always accessible, the ability to write clean, logical, and well-documented code stands out as a more valuable skill. Developing intuitive coding capabilities ensures that programmers can effectively design and implement solutions while debugging, though essential, becomes a secondary skill that can be reliably supported by online resources and other tools.

```
Chen, A., Wei, Y., Le, H., & Zhang, Y. (2024). Learning-by-teaching with ChatGPT: The effect of teachable ChatGPT agent on programming education. arXiv. https://arxiv.org/abs/2412.15226
```
```
Research Summaries generated using ChatGPT
“Chatgpt.” ChatGPT, OpenAI (GPT-4o), openai.com/chatgpt. Accessed 13 Jan. 2025
```

\---

## 📰 In the News

> ### CNBC

**[OpenAI releases Sora, its buzzy AI video-generation tool](https://www.cnbc.com/2024/12/09/openai-releases-sora-its-buzzy-ai-video-generation-tool.html) ↗️**

Key takeaways:

-   Sora is OpenAI’s latest AI video-generation tool that allows users to create high-definition video clips from text prompts, still images, or existing videos and offers features like video blending and endless looping.
    
-   OpenAI is currently rolling out Sora Turbo, a faster and newer model of Sora, to existing ChatGPT Plus and Pro accounts at no additional cost in select countries such as the US.
    
-   OpenAI aims to establish a strong foothold in the growing generative AI video sector, valued at over $1 trillion in potential revenue within a decade.
    
-   Protestors and early access artists criticized OpenAI for insufficient transparency and support for the arts, alleging unpaid labor for Sora's development. OpenAI responded by emphasizing voluntary participation and ongoing support through grants and events.
    
-   Sora is part of OpenAI's push toward multimodality, combining text, image, and video generation, to stay competitive and address evolving consumer and business demands in generative AI.
    

> ### Google Blog

**[A robotics program transforming AI education across Africa](https://blog.google/intl/en-africa/company-news/outreach-and-initiatives/a-robotics-program-transforming-ai-education-across-africa/) ↗️**

Key takeaways:

-   Google recently partnered with UNESCO to launch CogLabs, a program designed to make STEM learning accessible in Africa through hands-on robotics and machine learning.
    
-   Students use 3D-printed parts, smartphones, and visual coding to build AI models, enabling learning without internet access, which is ideal for areas with limited resources.
    
-   The program offers hands-on robotics and machine learning experiences that are affordable, scalable, and engaging for students.
    
-   CogLabs has reached over 10,000 educators and students in 35 countries across Africa, Latin America, and Southeast Asia, emphasizing sustainable development, gender equality, and quality education.
    

\---

And that’s a wrap for this week’s newsletter! If you enjoyed our newsletter and found it helpful, please consider sharing this free resource with your colleagues, educators, administrators, and more.