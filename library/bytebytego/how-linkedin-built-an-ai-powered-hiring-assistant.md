---
title: "How LinkedIn Built an AI-Powered Hiring Assistant"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2025-12-16T16:30:58.000Z"
source_url: "https://blog.bytebytego.com/p/how-linkedin-built-an-ai-powered"
word_count: 2728
estimated_read_time: 14
---

## [Solve Enterprise Auth, Identity, and Security for Your App (Sponsored)](https://bit.ly/WorkOS_121625Headline)

[

![](https://substackcdn.com/image/fetch/$s_!41Yd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfd7d034-4828-449f-843e-e94c0ea46f7d_1200x510.png)



](https://bit.ly/WorkOS_121625CTA)

Enterprise customers expect SSO, Directory Sync, RBAC, and Audit Logs, but building and maintaining that infrastructure slows teams down and pulls focus from core product work.

[WorkOS](https://bit.ly/WorkOS_121625WorkOS) provides these features through simple APIs and a hosted Admin Portal that integrates with every identity provider. You get production-ready enterprise capabilities without owning the complexity yourself.  
  
Trusted by OpenAI, Cursor, Vercel, 1000+ more. Your first million MAUs are free.

\---

*Disclaimer: The details in this post have been derived from the details shared online by the LinkedIn Engineering Team. All credit for the technical details goes to the LinkedIn Engineering Team. The links to the original articles and sources are present in the references section at the end of the post. We’ve attempted to analyze the details and provide our input about them. If you find any inaccuracies or omissions, please leave a comment, and we will do our best to fix them.*

Recruiting is a profession that demands both strategic thinking and meticulous attention to detail. Recruiters must make high-value decisions about which candidates are the best fit for a role, but they also spend countless hours on repetitive pattern recognition tasks. Sorting through hundreds of resumes, evaluating qualifications against job requirements, and drafting personalized outreach messages are all essential activities. However, they also consume enormous amounts of time that could otherwise be spent on relationship-building and strategic hiring decisions.

LinkedIn’s Hiring Assistant represents a new approach to solving this challenge.

Rather than replacing recruiters, this AI agent is designed to handle the repetitive, time-consuming aspects of the recruiting workflow, freeing professionals to focus on what they do best: connecting with people and making critical hiring choices.

The most labor-intensive parts of recruiting fall into three main categories.

-   First, sourcing candidates requires searching through LinkedIn’s network of over 1.2 billion profiles to identify qualified individuals.
    
-   Second, evaluating candidates involves carefully reading resumes and profiles to assess whether each person meets the specific requirements of a role.
    
-   Third, engaging candidates means drafting and sending personalized communications to potential hires, answering their questions, and maintaining ongoing dialogue throughout the hiring process.
    

To address these challenges, LinkedIn built the Hiring Assistant with three core capabilities.

-   The system delivers value at scale by efficiently searching across billions of profiles and handling enterprise-level workloads reliably.
    
-   It enables interactive communication by understanding recruiter intent through natural conversation, asking clarifying questions when needed, and adapting its behavior based on real-time feedback.
    
-   Lastly, it also features continuous learning by improving over time based on observing what recruiters do, learning individual preferences, and remembering past interactions and decisions.
    

In this article, we will look at the architecture and technical building blocks of LinkedIn’s Hiring Assistant.

\---

## **[Better Deals, By Design with Verizon This Holiday (Sponsored)](https://vz.to/vz926)**

[

![](https://substackcdn.com/image/fetch/$s_!alhF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4a353cc-b6b8-40f8-98fd-f251d8cb0f07_1280x720.png)



](https://vz.to/vz926)

This holiday season, the equation is simple: everyone gets a better deal with Verizon. Best devices. Best plans. Add that to an award-winning network, and you have the best deals. Period.

-   **Unbeatable Deal**: Switch to Verizon and get four lines on Unlimited Welcome for $25 per line/month (on Auto Pay plus taxes & fees) and get four of the newest, premium devices like the iPhone 17 Pro, Samsung Galaxy S25+, or Google Pixel 10 Pro XL all on Verizon.
    

Enjoy flexibility and save money this holiday season because every dollar you spend matters.

**[Explore Holiday Deals](https://vz.to/vz926)**. See [here](https://www.verizon.com/about/news/legal/holiday-deals-2025-disclaimers) for full terms.

\---

## The High-Level Architecture

At its core, the Hiring Assistant is built on what LinkedIn calls a “plan-and-execute” architecture as shown in the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!xSC1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2dbf5067-b585-4660-b65d-0b7564528087_2980x1752.png)



](https://substackcdn.com/image/fetch/$s_!xSC1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2dbf5067-b585-4660-b65d-0b7564528087_2980x1752.png)

To understand why this matters, it helps to know what they avoided. A simpler approach, known as ReAct, would have the AI try to handle everything at once in a single continuous loop. While straightforward, this method runs into problems when tasks get complex. Large language models, the AI systems that power tools like this, can become unreliable when asked to juggle too many things simultaneously.

See the diagram below for the ReAct pattern

[

![](https://substackcdn.com/image/fetch/$s_!iW81!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa575b791-317b-455d-9bd9-fac4e870f14a_3192x1924.png)



](https://substackcdn.com/image/fetch/$s_!iW81!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa575b791-317b-455d-9bd9-fac4e870f14a_3192x1924.png)

.Instead, LinkedIn split the work into two distinct phases:

-   The Planner acts as the strategic thinker. When a recruiter makes a request, the Planner examines it from a high level, breaks the work into smaller, manageable steps, and creates a structured plan for what needs to happen. Think of it as a project manager outlining the approach before any actual work begins.
    
-   The Executor then takes over. It works through the plan step by step, using available tools to complete each task. For each step, the Executor runs its own loop of reasoning and action, figuring out what needs to happen and then making it happen.
    

This divide-and-conquer strategy brings several advantages:

-   First, it makes the system more reliable. Breaking complex recruiting workflows into discrete steps means the AI is less likely to get confused or make mistakes.
    
-   Second, it allows for better cost management. LinkedIn can use more powerful AI models for complex reasoning tasks while deploying simpler, cheaper models for straightforward steps.
    
-   Third, tasks are far more likely to be completed successfully when they are well-defined and manageable in scope.
    

Beyond the plan-and-execute design, the Hiring Assistant uses a message-driven architecture.

Each recruiter gets their own individual instance of the assistant, complete with its own identity and mailbox. Everything works through asynchronous messages, much like email. When a recruiter asks the assistant to find candidates, they do not have to sit and wait for results. The assistant receives the message, processes it in the background, and sends updates when ready.

This asynchronous approach is what enables the assistant to work at scale. While a recruiter focuses on other tasks, their assistant can be searching through millions of profiles, evaluating candidates, and preparing recommendations, all without requiring constant attention or supervision.

## The Agentic User Experience

The Hiring Assistant operates in two complementary modes, each designed for different stages of the recruiting process:

-   **Interactive Mode:** When recruiters first start a new project, they work with the assistant in interactive mode. This feels like having a conversation with a colleague. Recruiters can clarify what kind of person they are looking for, refine job requirements, and get immediate feedback on their requests. The assistant shows its reasoning as it works, making the process transparent. This builds trust because recruiters can see exactly what the system is doing and correct course quickly if something seems off.
    
-   **Asynchronous Mode:** Once the recruiter and assistant are aligned on what success looks like, the system shifts into asynchronous mode. This is where the real power of automation comes into play. The assistant works autonomously in the background, running large-scale searches across millions of profiles, continuously updating candidate pipelines, and evaluating new applicants as they appear.
    

LinkedIn describes this as a “source while you sleep” capability.

The assistant can review thousands of candidates overnight, a task that would take a human recruiter weeks to complete manually.

Yet even in this autonomous mode, humans remain in control of important decisions. The assistant surfaces candidates and provides recommendations, but recruiters make the final calls about who to contact and ultimately hire. This balance between automation and human judgment is central to how the system is designed.

## Technical Building Blocks

The Hiring Assistant is built on top of LinkedIn’s broader agent platform, a foundation of reusable components that can power any AI agent product across the company. This approach means the LinkedIn engineering team does not have to reinvent the wheel each time it builds a new intelligent system.

At the user-facing level, a client-side SDK embeds the assistant directly into recruiter workflows. This SDK creates dynamic interfaces that adapt based on what the AI needs at any given moment. It supports multiple input methods, including chat, voice, and typing assistance, while logging all interactions for future analysis and improvement.

Connecting this interface to backend services is a GraphQL API, which delivers data in structured packages called view models. These contain everything needed to display information on screen. LinkedIn calls it the agent-driven UI, where the AI itself can determine what recruiters see, dynamically adjusting the interface as tasks progress.

Rather than the traditional request-response pattern where you ask a question and wait for an answer, the system uses a push-based, event-driven architecture. It works as follows:

-   The user interface subscribes to updates from the agent, and when something changes, the agent publishes that update. This means the interface refreshes automatically without users needing to manually reload anything.
    
-   Long-running AI tasks are delivered through streaming responses. Instead of waiting for a complete answer, recruiters see the AI’s reasoning unfold in real time, with results appearing as soon as they become available.
    
-   If a recruiter is logged in on multiple devices, cross-session synchronization keeps everything in sync. An action taken on a phone immediately reflects on a desktop browser.
    

## The Supervisor Agent

At the center of the Hiring Assistant sits what LinkedIn calls the supervisor agent. If the overall system is a team, the supervisor is the team leader who makes sure everyone works together effectively.

See the diagram below:

The supervisor handles several critical responsibilities:

-   It oversees workflow management for the entire hiring process, ensuring tasks move forward in the right sequence.
    
-   When a recruiter sends a message or request, the supervisor receives it and routes it to the appropriate sub-agent for handling.
    
-   It also makes judgment calls about task prioritization, deciding what requires human input versus what can be safely automated.
    
-   Beyond just delegating work, the supervisor coordinates between different sub-agents to ensure they work together smoothly. It actively observes the environment, watching for changes like new candidate activity or application submissions, and triggers appropriate actions in response.
    
-   The supervisor also manages the human-in-the-loop aspect of the system. It knows which decisions are significant enough to require human approval and surfaces those moments to recruiters.
    
-   All communication, whether from users or between sub-agents, flows through the supervisor. It serves as the central hub that keeps the entire operation organized and aligned with recruiter goals.
    

## The Specialized Sub-Agents

The Hiring Assistant divides recruiting work among several specialized sub-agents, each focused on a specific part of the workflow. This modular design allows each component to excel at its particular task while working together as a cohesive system. Let’s look at the various sub-agents in detail:

### Intake Agent

The intake agent serves as the starting point for every hiring project.

It gathers job requirements from recruiters, confirming essential details like job title, location, and seniority level. When information is missing, the agent leverages LinkedIn’s Economic Graph (a digital map of the global economy) to intelligently fill in gaps. The agent then generates specific qualifications based on successful past hires and industry knowledge, creating a clear framework for evaluating candidates.

### Sourcing Agent

Finding the right candidates is perhaps the most knowledge-intensive part of recruiting, and the sourcing agent approaches this challenge with multiple strategies.

It creates search queries using traditional Boolean logic (AND, OR, NOT operators), generates AI-powered queries based on hiring requirements, and draws on historical recruiter search patterns as starting points. Importantly, customer data never crosses company boundaries, maintaining strict data isolation.

What sets this agent apart is its integration with LinkedIn’s Economic Graph.

This gives it access to insights about top locations, job titles, and skills for specific talent pools. It can identify which candidates are actively looking or were recently hired, understand talent flow patterns between companies and industries, spot fast-growing companies and skill sets, flag companies experiencing layoffs, and highlight opportunities at top schools or companies with open positions. These insights help the agent find hidden gems that might otherwise be overlooked, going well beyond simple keyword matching.

The sourcing agent also implements a closed feedback loop. It combines sourcing with evaluation results, using AI reasoning to refine queries based on which candidates prove to be good matches. This allows the system to balance precision (finding exactly the right candidates) with liquidity (finding enough candidates), continuously improving the quality and volume of results over time.

### Evaluation Agent

Reading resumes and assessing qualifications is one of the most time-consuming tasks for recruiters.

The evaluation agent tackles this by reading candidate profiles and resumes, comparing them against job qualifications, and providing structured recommendations backed by evidence. It shows why a candidate may or may not match requirements, rather than simply offering a yes or no answer.

LinkedIn engineered this agent to address several complex challenges.

-   Before any evaluation begins, recruiters must review and approve the qualifications being used.
    
-   Safety checks ensure these qualifications follow responsible AI policies. The agent searches through profiles and resumes for specific evidence demonstrating how candidates meet each qualification, surfacing this evidence to recruiters for review.
    
-   To ensure accuracy, LinkedIn built quality benchmarks for testing the evaluation agent across different scenarios.
    

They developed custom AI models specifically optimized for qualification evaluation, as general-purpose models could not achieve the necessary combination of accuracy and speed. Using techniques like speculative decoding and custom serving infrastructure, these fine-tuned models can evaluate candidates in seconds rather than minutes, fast enough to support real-time, conversational refinement of requirements.

### Candidate Outreach Agent

Once promising candidates are identified, the outreach agent handles communication.

It writes personalized messages, sends initial outreach and follow-ups, and replies to candidate questions using job-specific FAQs defined during intake. The agent can even schedule phone screenings directly through messaging, streamlining coordination.

### Candidate Screening Agent

Supporting the interview process, the screening agent prepares tailored interview questions based on hiring requirements and candidate profiles.

It can transcribe and summarize screening conversations while capturing notes and insights. Importantly, recruiters maintain full control, able to take over conversations at any time or guide the process as needed.

### Learning Agent

The learning agent enables the system to improve over time.

It analyzes recruiter actions such as which candidates they message or add to pipelines, learning from both explicit feedback and implicit behavioral signals. The agent updates job qualifications based on these patterns, but any suggested changes must be reviewed and approved by recruiters before being applied. This ensures the assistant adapts while keeping humans in control.

### Cognitive Memory Agent

Finally, the cognitive memory agent gives the assistant persistent memory across interactions.

It remembers past conversations, preferences, and decisions, helping personalize recommendations over time. All memory data remains scoped to the individual recruiter’s environment with strong privacy protections.

This data is never used to train AI models, ensuring customer information stays secure and confidential.

## The Quality Pillars

Building an AI agent that operates at scale requires a comprehensive approach to quality that ensures the system behaves safely, responsibly, and effectively.

The LinkedIn engineering team built its quality framework on two complementary pillars:

### 1 - The Rails

Product policy serves as the rails that keep the system on track. These policies set clear boundaries for safety, compliance, and legal standards while defining expected agent behavior. They establish minimum quality thresholds that must be met.

To enforce these standards, LinkedIn employs AI-powered judges that evaluate different aspects of quality. Some judges check for coherence, asking whether outputs make logical sense. Others verify factual accuracy, ensuring the system does not generate false or misleading information.

### 2 - The Compass

Human alignment acts as the compass, ensuring the assistant moves toward genuinely valuable outcomes.

This pillar is grounded in human-validated data, including annotated datasets where people label examples, and real recruiter activity. When a recruiter messages a candidate or adds them to a pipeline, the system treats this as a strong positive signal.

Over time, the assistant learns to recommend candidates matching these recruiter-validated patterns. Human alignment also serves to validate whether product policies are actually working in practice.

## Conclusion

LinkedIn’s Hiring Assistant demonstrates a big approach to building enterprise-grade AI agents.

By adopting a plan-and-execute architecture, the system breaks complex recruiting workflows into manageable steps, improving reliability and reducing errors. The message-driven design allows each recruiter to have their own assistant instance that works asynchronously in the background, enabling true scale.

The division of labor among specialized sub-agents ensures that each component can focus on what it does best, from sourcing and evaluation to outreach and screening. Integration with LinkedIn’s Economic Graph provides market intelligence that goes beyond simple keyword matching, helping uncover candidates who might otherwise be overlooked.

Perhaps most importantly, the system balances automation with human judgment. The quality framework keeps the assistant safe and aligned with real hiring outcomes, while the learning agent ensures continuous improvement based on individual recruiter preferences.

**References:**

-   [Building the agentic future of recruiting: how we engineered LinkedIn’s Hiring Assistant](https://www.linkedin.com/blog/engineering/ai/how-we-engineered-linkedins-hiring-assistant)
    
-   [Under the hood: The tech behind the first agent from LinkedIn](https://www.linkedin.com/blog/engineering/generative-ai/the-tech-behind-the-first-agent-from-linkedin-hiring-assistant)
    
-   [The LinkedIn Generative AI Application Tech Stack](https://www.linkedin.com/blog/engineering/generative-ai/the-linkedin-generative-ai-application-tech-stack-extending-to-build-ai-agents)
    

\---

## **SPONSOR US**

Get your product in front of more than 1,000,000 tech professionals.

Our newsletter puts your products and services directly in front of an audience that matters - hundreds of thousands of engineering leaders and senior engineers - who have influence over significant tech decisions and big purchases.

Space Fills Up Fast - Reserve Today

Ad spots typically sell out about 4 weeks in advance. To ensure your ad reaches this influential audience, reserve your space now by emailing **sponsorship@bytebytego.com.**