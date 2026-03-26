---
title: "San Francisco is back as the world’s leading tech hub"
author: "Gergely Orosz"
publication: "The Pragmatic Engineer"
publication_slug: "pragmaticengineer"
published_at: "2025-10-28T16:55:50.000Z"
source_url: "https://newsletter.pragmaticengineer.com/p/san-francisco-is-back"
word_count: 3168
estimated_read_time: 16
---

Starting in 2020, the pandemic emptied offices and changed the ways tech companies operate, and how us techies work and collaborate, by making remote and hybrid work patterns the norm. San Francisco (SF) on the US West Coast became emblematic of a major shift: we saw [an exodus](https://sfciti.org/news/press-release/new-data-on-the-san-francisco-tech-exodus/) of tech companies from the city as Pinterest, Stripe, PayPal, and others [downsized](https://therealdeal.com/san-francisco/2022/12/12/pinterest-to-bail-out-of-sf-offices-in-soma/), Tesla and Oracle [moved](https://buildremote.co/companies/businesses-leaving-san-francisco/) to Texas, and many VCs, founders, and startups [quit](https://x.com/rabois/status/1387807609470820357) for other locations, or simply went fully remote.

But today, things are changing again. I’ve just returned from San Francisco, where I visited the headquarters of several leading AI companies and up-and-coming startups. Based on my conversations and observations, SF is most definitely back – and it’s more important than ever.

A new wave of AI startups has been the catalyst to make SF into a buzzing tech hub once more: there are ever more startups launching in the city, the AI meetup scene is energetic, and it’s easy for people to collaborate with one another in person. The tech hub model is proving its value all over again in SF, and might even be one reason for the incredible growth and adoption of AI products and services. *Of course, Silicon Valley has no shortage of innovation, VC funding – and a substantial Big Tech presence – but SF stands out for the number of high-growth startups headquartered there.*

The city looks like a trailblazer for the re-emergence of the tech hub model, reverting back from the remote work surge of 2020-2023. For companies and professionals, this seems relevant – wherever they’re based.

Today, we cover:

1.  **Cursor: push for release 2.0**. A cozy office and a focus on shipping.
    
2.  **AI dev tools startups ahead of the curve.** Wispr Flow wants devs to code more by talking, Continue is the “CI/CD infra for AI agents”, and Factory builds AI agents for engineering teams.
    
3.  **OpenAI.** Scaling faster than any company ever. 10x infra growth for two years straight, with no signs of that slowing down. Refreshingly, OpenAI also hires junior engineers as well as seniors.
    
4.  **Anthropic.** Self-organization at scale. Cofounder and former CTO Sam McCandlish shared what helps the company grow, and we discussed their tech stack and engineering challenges.
    
5.  **Buzzing meetups.** The local chapter of [AI Tinkerers](https://aitinkerers.org/) was brimming with “builder energy”, and more than the usual amount of insider knowledge about models, maybe because OpenAI and Anthropic are headquartered next door.
    
6.  **Location, location, location.** San Francisco-based AI startups seem like they’re getting more traction, faster. Location may play a role as it’s easy to network, sell to other startups, and hire engineers working on cutting-edge technologies.
    
7.  **AI wave, bubble, or both?** It’s hard to be certain, but it feels like there hasn’t been this rate of explosive growth since the pre-millennium Dotcom Boom.
    

*As always, I have no affiliation with the companies mentioned in this article, and am not paid to write about them. More in [my ethics statement.](https://blog.pragmaticengineer.com/ethics-statement/)*

## 1\. Cursor: push for release 2.0

People swap their shoes for slippers when they arrive at Cursor’s headquarters at [North Beach](https://en.wikipedia.org/wiki/North_Beach,_San_Francisco), SF, and there was a chill atmosphere during my visit there. That might suggest cosiness, but everyone was focused on the work, with a lot of in-person pairing taking place during what was the final stage of readying Cursor 2.0 for launch. It’s going to be their biggest release since [the 1.0 launch](https://cursor.com/changelog/1-0) in June.

**An interesting workflow: automatic ticket resolution**. Every incoming Linear ticket is automatically assigned to a Cursor agent, which one-shots a suggested fix, and a developer can then decide whether to merge it. This setting is on by default, and devs whom I asked find it very useful.

[

![](https://substackcdn.com/image/fetch/$s_!CRRG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5e9cd402-24e6-4796-82b6-d8253220b39c_1600x1096.png)



](https://substackcdn.com/image/fetch/$s_!CRRG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5e9cd402-24e6-4796-82b6-d8253220b39c_1600x1096.png)
*Cursor’s offices: cozy vibe with a focus on shipping*

**As is common for a dev tools company, the 80 or so developers at Cursor are users of their own product.** This makes for an interesting dynamic: software engineer Eric Zakariasson told me that in the last 30 days, engineers there used unique 500K agent sessions and over 110K tabs. Many are now using multiple agents in parallel in their workflows.

*Earlier, we covered more on Cursor in the deepdive [Real-world engineering challenges: building Cursor](https://newsletter.pragmaticengineer.com/p/cursor).*

## 2\. AI devtools startups ahead of the curve

While in the city, I also stopped at the HQ of new startups founded in the last two years which are building platforms that are *already* seeing strong adoption by software engineers.

### Wispr Flow: a new modality for programming?

One very interesting startup I stopped by at was Wispr Flow, which creates software to control a computer with the human voice – including writing code with dictation – by using LLM agents. Founded in 2024, the startup found its product-market fit this January, cofounder and CEO [Tanay Kothari](https://x.com/tankots) told me, when the product experienced 90% month-on-month growth which was purely organic without any advertising spend. At the time, the startup saw an impressive 20% free-to-paid conversion rate. Ten months later, this conversion remains unchanged: for every 5 new monthly active users, 1 becomes paid.

In the office, every desk is fitted with a $70 [BOYA Gooseneck microphone](https://www.amazon.com/dp/B0BF969RVP), into which devs whisper. Despite the coding being done by voice, it was quiet in the office and I couldn’t hear Wispr’s ML Lead, Menoua Keshishian, while he worked in close vicinity with his microphone.

[

![](https://substackcdn.com/image/fetch/$s_!hLlY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f03670e-aaaf-456d-ae0d-8fae63ca539f_1258x906.png)



](https://substackcdn.com/image/fetch/$s_!hLlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f03670e-aaaf-456d-ae0d-8fae63ca539f_1258x906.png)
*Wispr Flow’s headquarters: ML Lead Menoua Keshishian (left) whispering to Cursor. Bottom right, me with the world’s biggest 3D-printed keyboard*

Wispr’s popularity with devs is due to a few reasons:

-   **Dictation, not transcription.** There are countless voice-to-text products that transcribe the spoken word, but this is not useful for coding! For example, if you say: “let’s start a server on localhost 3000… no, sorry, localhost 8000”, you want the transcript to be able to recognise and cut out the noise, and to read: “let’s start a server on localhost:8000”.
    
-   **Dev-friendly touches.** When a dev says “localhost 3000”, the software automatically generates “localhost:3000.” There are many small touches which help with coding use cases.
    
-   **IDE integrations.** Wispr integrates nicely with Cursor, Claude Code, Windsurf, and Visual Studio Code. It’s the first dedicated voice-to-text tool to do so.
    
-   **Whispering** ***really*** **works.** I was surprised by how well Wispr picks up *quiet* whispering! This – together with the dedicated microphones – makes it feasible even in open-plan offices.
    

Tanay the CEO told me that they are busy onboarding startups to the product – often by setting up microphones on all desks – and shared an impressive chart (below) showing how devs type less with the tool.

[

![](https://substackcdn.com/image/fetch/$s_!6iu6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f070a22-f651-4c87-bcf8-1052d699b7a3_1600x799.png)



](https://substackcdn.com/image/fetch/$s_!6iu6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f070a22-f651-4c87-bcf8-1052d699b7a3_1600x799.png)
*Wispr aggregated user data, based on 20,000+ users. The more people use Wispr, the less they type*

**The tech stack behind Wispr** was interesting to learn about:

-   **Electron** app with platform-specific optimizations
    
-   **Swift**: for the Mac and iOS versions. There’s no code sharing between them.
    
-   **C#**: for the Windows version
    
-   Android: work-in progress, being developed using Kotlin.
    

One of the biggest technical challenges for the team is the need for low latency: response time must be below 700ms, globally, in order for users to stay engaged. Wispr’s servers are US-hosted and must achieve this latency even on high-latency, low-bandwidth networks like 2G.

Today, Wispr’s team totals 25 people and is growing fast. You can [check out the company here](https://wisprflow.ai/). I’m interested to see how many engineers start talking or whispering to our computers and reject typing, which has been the primary input for coding and software engineering for pretty much as long as those activities have existed.

### Continue.dev: the “CI/CD infra” for AI agents inside companies

GitHub started in 2014 at a small office on Howard Street, in San Francisco’s South of Market (SoMa) district. The version control company quickly outgrew the place, and today, it’s occupied by a new, small and ambitious startup. Continue.dev is a 9-person startup with the mission to become the CI/CD layer for any company using LLMs and agents.

[

![](https://substackcdn.com/image/fetch/$s_!S_dd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd8cb3156-e41f-4585-b24a-de568162a922_1600x745.png)



](https://substackcdn.com/image/fetch/$s_!S_dd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd8cb3156-e41f-4585-b24a-de568162a922_1600x745.png)
*Continue.dev’s offices, and some wall art. Center: Brian Douglas, the Head of DX, and me*

**It’s somewhat tricky to fully understand what Continue does** because it focuses on companies’ internal workflows, and things like what should happen after opening a pull request. They refer to themselves as “continuous AI” that runs background agents.

In pre-AI times, you would have the Continuous Integration (CI) server kick off, run linting, run tests, and report back the results. But with AI agents, there are so many more possibilities! For example:

-   Summarize the impact of a change
    
-   Generate an architecture diagram of the change if it’s big enough to warrant one
    
-   Verify that API endpoints work correctly if the change touches API endpoints
    
-   Generate documentation for the change
    
-   Run an evals suite on a change (LLMs evaluate the correctness of changes)
    
-   Create a performance analysis of the change
    
-   … and more
    

Yes, it was already possible to hook up an LLM with a CI/CD and do all these changes, but larger companies have more to consider:

-   **Control which models and LLMs are used.** You might want to self-host LLMs, optimize for cost or performance, or run parallel LLMs and compare results.
    
-   **Worry more about security.** You want to be very selective about giving LLMs access to credentials like API keys which they might need for testing. Should access even be given?
    
-   **Logging and auditing.** LLMs are nondeterministic, so things sometimes go wrong. You want to have logs and be able to track exactly which agent did what, and when.
    

I chatted with Continue’s Head of DX, [Brian Douglas](https://www.linkedin.com/in/brianldouglas/), and he [kicked off the background agent](https://github.com/bdougie/contributor.info/pull/1087) for a fix committed to their repository. The agent did the following things:

-   Summarized the problem and solution
    
-   Created an architecture diagram
    
-   Verified whether documentation changes were needed
    
-   Came up with a merge recommendation and additional suggestions
    
-   Analyzed code quality
    

You can review all the actions [on this pull request](https://github.com/bdougie/contributor.info/pull/1087), which was a “one-shot process” where the agent went off and did a bunch of work based on a single piece of input from an engineer.

Among AI startups, the “996” model for the workday is [spreading fast](https://blog.pragmaticengineer.com/new-trend-extreme-hours-at-ai-startups/), especially in San Francisco. The name refers to 9am to 9pm work hours, 6 days a week. But Continue is showing that a punishing work pattern is not the only way to succeed. During my visit, the office was largely empty at 5:30pm. Everyone works hard while they’re there, Brian said:

> “If we work silly long hours, it’s mainly because we are already excited about the solution we are shipping, not because there’s some unwritten expectation to stay late at the office. At Continue, the emphasis is on results, not desk time. Some of the team take advantage of hybrid days to do focused work”.

Continue already counts major AI labs and Big Tech companies among its customers: the ones that set up these LLM-powered CI/CD workflows. Continue.dev is a good example of how much a small team can achieve by working hard and smart. *Learn more about them by checking out these [MCP “cookbooks”](https://docs.continue.dev/guides/overview#mcp-integration-cookbooks) showing how the platform works. Best of luck to the team!*

### Factory AI: AI agents and enterprise teams

I tend to think of [Factory.ai](http://factory.ai) as a Claude Code for enterprises, and for supporting all major LLMs. They call their agents “droids”, which can be kicked off to do work asynchronously from an IDE, Slack, or the command line. Setting up Factory is as easy as getting started with Claude Code: just run a curl command, and your workspace is up and running.

Recent data from AI startup Modu [ranked](https://x.com/brextonpham/status/1976334538553897381) Factory as #2 in pull requests approved (with 75% of PRs raised by droids approved), slightly ahead of OpenAI’s Codex and Anthropic’s Claude Code.

I met cofounder and CEO [Matan Grinberg](https://www.linkedin.com/in/matan-grinberg) and the core team at 6pm, when the office was half full.

[

![](https://substackcdn.com/image/fetch/$s_!veed!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa29ad22c-824d-4204-b80f-8dd6064bd731_1536x862.png)



](https://substackcdn.com/image/fetch/$s_!veed!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa29ad22c-824d-4204-b80f-8dd6064bd731_1536x862.png)
*Factory’s HQ: the office is next door to Wispr Flow’s, making collaboration between AI startups easy*

While many dev tools companies focus on individual engineers’ productivity, Factory focuses on accelerating teams.

**The team digitalizes everything they do and feed it into their product.** I found some details particularly interesting:

-   Every meeting is transcribed
    
-   All chalkboard jams are photographed and uploaded to the backend
    
-   Design docs are not done by hand, they are kicked off with Droids using all context uploaded to Factory’s own systems
    

Their engineering team is exploring – and [blogging about](https://factory.ai/news/build-with-agents) – “agent native development”, where software engineers always leverage AI agents as the first step of their day–to-day workflows. An interesting thing the team found while working with engineering customers was that the “quality” of an AI agent is less important than following best practices that help agents (and humans!) to build better software. These include:

-   Having good specifications
    
-   Having automated tests, and writing them as functionality is added
    
-   Mandating a way to “verify” each pull request before putting it up for review
    

I like how the Factory team is open-minded in exploring new ways of building *quality* software. Naturally, their experiments focus on AI agents, but my sense is that they’re finding that good software engineering practices result in higher quality code, *especially* when working with AI agents. *You can read more about the Factory team’s learning [in their engineering blog](https://factory.ai/news?category=engineering)*. *Check out the company [here](https://factory.ai/).*

## 3\. OpenAI: scaling faster than any company ever

OpenAI’s offices are large, but the corporate branding that’s common in many workplaces is largely absent, with very few logos on display. One possible reason OpenAI executes faster than most startups is its in-person work culture that has existed since its early days, as we covered in a 2023 deepdive into [OpenAI’s engineering culture](https://newsletter.pragmaticengineer.com/p/inside-openai-how-does-chatgpt-ship).

[

![](https://substackcdn.com/image/fetch/$s_!a-DN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67e9a80f-cc52-4231-bc76-38092130e412_1600x824.png)



](https://substackcdn.com/image/fetch/$s_!a-DN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67e9a80f-cc52-4231-bc76-38092130e412_1600x824.png)
*OpenAI’s offices, and swag*

During my visit, I met with [Sulman Choudhry](https://www.linkedin.com/in/sulmanc/), who heads up ChatGPT’s Engineering and Applied Research functions. He had a few interesting things to say:

**OpenAI now hires junior engineers, not just seniors.** The company is finding success with a “super senior + super junior” mix. Super juniors are early-career software engineers, who are AI-native, entrepreneurial, and several of whom were at the startup accelerator Y Combinator, which is also headquartered in San Francisco. Super juniors use AI tools in ways that surprise more experienced colleagues, Sulman said.

For example, one super junior did an impressive piece of work, and Sulman asked if he’d used Codex for it. This prompted a defensive response, which Sulman thought might signify that the junior had hand-coded most of it and resented the suggestion that they’d simply delegated the task to AI. Sulman recounted the engineer’s reply:

> “It’s a little insulting that you ask if I used Codex for it. Of course, Codex by itself couldn’t build software of this complexity, and you probably also know it.
> 
> It’s why I had to use *many* instances of Codexes to build it, setting up communication channels between instances, so they can take on the task, one of them validating it, and others implementing the specialized parts.”

So, the engineer was *not* annoyed by the assumption they’d used Codex; they were irked that it was assumed they’d employed only a *single* instance of it! *Come on, who would want to slow themselves down so much by doing that?!* Super juniors at OpenAI are pushing the limits of AI tools, and inspiring more experienced engineers to use them in new ways.

#### Weekly internal ChatGPT demos

Unsurprisingly, every engineer and team builds custom tools, and there’s an explosion of MCP servers connected to Codex. Each week, teams demo the tools they build and share things that work for them, and how they are changing their workflows.

**A recent interesting demo was a “fix this” button integrated into the internal version of the OpenAI mobile app**. We’re all familiar with the “report a bug” button in mobile apps: it takes a screenshot, you describe what’s wrong, and then submit it. A team at OpenAI took this a step further: you fill out the bug report, and then tap a “fix it” button. The bug report goes to Codex and a fix is drafted. An engineer needs to approve the fix – but the feedback loop is much faster!

That demo was so successful that the “fix it” button is now part of ChatGPT.

#### Scaling faster than everyone

To learn about infrastructure challenges, I met [Emma Tang](https://www.linkedin.com/in/emmaytang/), who heads up OpenAI’s Data Platform team which owns four main areas:

1.  **Big data infrastructure**: operating things like a Data Lake (a centralized repository storing massive amounts of raw data), [Spark](https://spark.apache.org/) (distributed computing framework to process large-scale data), [Trino](https://trino.io/) (formerly known as PrestoSQL, a distributed SQL query engine), [Airflow](https://airflow.apache.org/) (workflow orchestration), business intelligence tools and dashboards.
    
2.  **Real-time streaming:** supporting infrastructure platforms operating at scale like [Kafka](https://kafka.apache.org/) (distributed event streaming and message broker), [Flink](https://flink.apache.org/) (stream processing), and an internal system called K-Forwarder.
    
3.  **ML infrastructure:** non-LLM product features, recommendation services, and a [Chronon](https://chronon.ai/) feature store (an open source feature platform for ML engineering created by Airbnb.)
    
4.  **“Flywheel team”:** a team unique to OpenAI that’s responsible for production data scrubbing, removing all personal identifiable information (PII), and preparing training data.
    

**Compute demand for the infra layer has grown 10x annually for the past two years.** The compute for the fleet serving the infrastructure and data lake storage has vastly expanded, and there’s no sign of that slowing down. Emma discussed how growing so fast creates engineering challenges:

-   Building for scalability without needing to rewrite the system, even as it grew to ~100x scale in 2 years. Scaling is done horizontally: the team went from having 1x Kafka cluster to having 5 today, and from 1x Airflow instances to 4.
    
-   Hitting technological limits: for example, encountering row size limits in Spark data frames from storing lengthy chat conversations.
    
-   Adding support for multimodal features across ChatGPT products involves storing much more and richer data, such as voice data, images, and PDFs.
    

The data infrastructure team is very senior: around 95% of members are data infrastructure specialists, and a third are members of the Apache Project Management Committee ([PMC](https://www.apache.org/dev/pmc.html)). Spark, Airflow, Kafka, and Flink are all Apache projects, and a third of the team are committers to at least one of them.

**Fundamental rewrites might be unavoidable.** Even though the team prepares for as much growth as possible, the next 10x tranche of growth might require major rewrites, since it’s hard to keep patching a system that’s achieving such magnitudes of growth (around 1,000x) without rethinking some basics. Needless to say, a rewrite would involve increasingly challenging migrations.

**Personal reflections on OpenAI:** The engineers I met are motivated, focused, and at the top of their game. The scale of engineering challenges they face are rare, and engineers get unusually high autonomy to solve difficult problems. There is no lack of ambition, nor signs of stalling growth.

We cover more about OpenAI in these deepdives:

-   [Building, launching, and scaling ChatGPT Images](https://newsletter.pragmaticengineer.com/p/chatgpt-images)
    
-   [Inside OpenAI: how does ChatGPT ship so quickly?](https://newsletter.pragmaticengineer.com/p/inside-openai-how-does-chatgpt-ship)
    
-   [Scaling ChatGPT: five real-world engineering challenges](https://newsletter.pragmaticengineer.com/p/scaling-chatgpt?utm_source=publication-search)
    

## 4\. Anthropic: self-organization at scale

At Anthropic, I sat down with cofounder [Sam McCandlish](https://www.linkedin.com/in/sam-mccandlish/), who was until very recently the CTO. Sam is a quantum gravity physicist by education who worked at OpenAI, and then joined Anthropic’s founding team. Since then, he’s helped the company grow from a workforce of 7 to more than 2,000 today. Over the last 4 years, Sam has committed code to pretty much every system across the company, and has worked in research and engineering. After onboarding Anthropic’s new CTO, [Rahul Patil](https://www.linkedin.com/in/rahul-patil-a0944836/) (formerly CTO at Stripe), he plans to return to solving problems in large-scale model training. I found him thoughtful, open, and humble; someone who thinks from first principles.

#### Anthropic’s rapid growth challenges

I asked Sam how he approached the company’s breakneck speed of growth. He made a few points:

[Read more](https://newsletter.pragmaticengineer.com/p/san-francisco-is-back)