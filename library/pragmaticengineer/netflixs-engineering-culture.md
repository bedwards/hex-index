---
title: "Netflix’s Engineering Culture"
author: "Gergely Orosz"
publication: "The Pragmatic Engineer"
publication_slug: "pragmaticengineer"
published_at: "2025-11-12T17:40:07.000Z"
source_url: "https://newsletter.pragmaticengineer.com/p/netflix"
word_count: 858
estimated_read_time: 5
---

### Stream the latest episode

**Listen and watch now on [YouTube](https://youtu.be/sAp9RjO79cU), [Spotify](https://open.spotify.com/episode/2DkaNGOZwsSL8CMJMb11bD), and [Apple](https://podcasts.apple.com/us/podcast/netflixs-engineering-culture/id1769051199?i=1000736465611).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

### **Brought to You by**

[

![](https://substackcdn.com/image/fetch/$s_!-41Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47539dec-053b-4a4a-be04-e0c922840fe1_800x70.png)



](https://substackcdn.com/image/fetch/$s_!-41Z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47539dec-053b-4a4a-be04-e0c922840fe1_800x70.png)

•⁠ **[Statsig](http://statsig.com/pragmatic)** ⁠ — ⁠ The unified platform for flags, analytics, experiments, and more. Statsig enables two cultures at once: continuous shipping *and* experimentation. Companies like Notion went from single-digit experiments per quarter to over 300 experiments with Statsig. [Start using Statsig](http://statsig.com/pragmatic) with a generous free tier, and a $50K startup program.

•⁠ **[Linear](https://linear.app/pragmatic?utm_source=gergely&utm_medium=newsletter&utm_campaign=pragmatic-engineer)** ⁠ — ⁠ The system for modern product development. When most companies hit real scale, they start to slow down, and are faced with “process debt.” This often hits software engineers the most. Companies switch to Linear to hit a hard reset on this process debt – ones like Scale cut their bug resolution in half after the switch. Check out [Linear’s migration guide](http://linear.app/switch?utm_source=gergely&utm_medium=newsletter&utm_campaign=pragmatic-engineer).

—

### **In this episode**

What’s it like to work as a software engineer inside one of the world’s biggest streaming companies?

In this special episode recorded at Netflix’s headquarters in Los Gatos, I sit down with Elizabeth Stone, Netflix’s Chief Technology Officer. Before becoming CTO, Elizabeth led data and insights at Netflix and was VP of Science at Lyft. She brings a rare mix of technical depth, product thinking, and people leadership.

We discuss what it means to be “unusually responsible” at Netflix, how engineers make decisions without layers of approval, and how the company balances autonomy with guardrails for high-stakes projects like Netflix Live. Elizabeth shares how teams self-reflect and learn from outages and failures, why Netflix doesn’t do formal performance reviews, and what new grads bring to a company known for hiring experienced engineers.

This episode offers a rare inside look at how Netflix engineers build, learn, and lead at a global scale.

### **Interesting details about Netflix**

**A “top” company for engineering talent and retention.** From this report by Signal Fire, Netflix is in the far right corner of this chart, meaning the company hires strong engineering talent, and retention is above industry average:

[

![](https://substackcdn.com/image/fetch/$s_!M24g!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c8ce798-898a-4f0e-accc-56a05108b4d9_1504x930.png)



](https://substackcdn.com/image/fetch/$s_!M24g!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c8ce798-898a-4f0e-accc-56a05108b4d9_1504x930.png)
*Source: [SignalFire](https://www.signalfire.com/blog/report-engineering-talent-retention)*

**Hiring of new grads.** Netflix has only hired senior software engineers for the first 25 years of the company — up to 2023, when the company [introduced engineering levels](https://newsletter.pragmaticengineer.com/p/thte-scoop-23). Netflix now hires new grads: and because they started from 0% new grad ratio, they have a lot more space to play with. *Tech companies hiring more interns and new grads is [a recent trend we’ve observed.](https://newsletter.pragmaticengineer.com/i/178001705/junior-engineer-hiring-to-rebound)*

**No formal performance review process.** At most tech companies, the annual or bi-annual perf process is heavyweight, and takes away easily a month of focus from engineering managers, and many engineers as well. Netflix doesn’t have a heavyweight process: instead, they put continuous feedback in place, and a few lightweight check-ins, including the [Keeper Test](https://jobs.netflix.com/culture). They also have an annual 360 review process. This is used as a “safety net,” and sounds like a lightweight feedback process, meant to highlight issues that continuous feedback would not catch.

**Areas where AI tools work well for Netflix** — these are these:

-   Prototyping
    
-   Documenting code
    
-   Working on large migrations
    
-   Detecting issues (anomaly detection and root cause analysis)
    

Elizabeth emphasized how they don’t see AI as a “silver bullet:” they experiment with tools, and have observed them to have come a long way in usefulness, from a few years ago.

**Unexpectedly heavy open source investment**. Netflix has won 9 Emmy awards for open source contributions — mostly for video steaming contributions.

Across all of Big Tech, Netflix has the highest percentage of all engineers contribute to open source: about 20% of them. This was a surprising fact for me to learn, and we went into details in the podcast:

[

![](https://substackcdn.com/image/fetch/$s_!M6pW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c34c729-89f4-4b0f-b714-882c3d38c21c_2074x994.png)



](https://substackcdn.com/image/fetch/$s_!M6pW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c34c729-89f4-4b0f-b714-882c3d38c21c_2074x994.png)
*About 1 in 5 engineers at Netflix contribute to open source. Source: [SignalFire](https://www.signalfire.com/blog/report-engineering-talent-retention)*

### **The Pragmatic Engineer deepdives relevant for this episode**

-   [The end of the senior-only level at Netflix](https://newsletter.pragmaticengineer.com/p/thte-scoop-23)
    
-   [Netflix revamps its compensation philosophy](https://newsletter.pragmaticengineer.com/p/the-scoop-29)
    
-   [Live streaming at world-record scale with Ashutosh Agrawal](https://newsletter.pragmaticengineer.com/p/live-streaming-at-world-record-scale)
    
-   [Shipping to production](https://newsletter.pragmaticengineer.com/p/shipping-to-production)
    
-   [What is good software architecture?](https://newsletter.pragmaticengineer.com/p/what-is-good-software-architecture)
    

### **Timestamps**

([00:00](https://www.youtube.com/watch?v=sAp9RjO79cU)) Intro

([01:44](https://www.youtube.com/watch?v=sAp9RjO79cU&t=104s)) The scale of Netflix

([03:31](https://www.youtube.com/watch?v=sAp9RjO79cU&t=211s)) Production software stack

([05:20](https://www.youtube.com/watch?v=sAp9RjO79cU&t=320s)) Engineering challenges in production

([06:38](https://www.youtube.com/watch?v=sAp9RjO79cU&t=398s)) How the Open Connect delivery network works

([08:30](https://www.youtube.com/watch?v=sAp9RjO79cU&t=510s)) From pitch to play

([11:31](https://www.youtube.com/watch?v=sAp9RjO79cU&t=691s)) How Netflix enables engineers to make decisions

([13:26](https://www.youtube.com/watch?v=sAp9RjO79cU&t=806s)) Building Netflix Live for global sports

([16:25](https://www.youtube.com/watch?v=sAp9RjO79cU&t=985s)) Learnings from Paul vs. Tyson for NFL Live

([17:47](https://www.youtube.com/watch?v=sAp9RjO79cU&t=1067s)) Inside the control room

([20:35](https://www.youtube.com/watch?v=sAp9RjO79cU&t=1235s)) What being unusually responsible looks like

([24:15](https://www.youtube.com/watch?v=sAp9RjO79cU&t=1455s)) Balancing team autonomy with guardrails for Live

([30:55](https://www.youtube.com/watch?v=sAp9RjO79cU&t=1855s)) The high talent bar and introduction of levels at Netflix

([36:01](https://www.youtube.com/watch?v=sAp9RjO79cU&t=2161s)) The Keeper Test

([41:27](https://www.youtube.com/watch?v=sAp9RjO79cU&t=2487s)) Why engineers leave or stay

([44:27](https://www.youtube.com/watch?v=sAp9RjO79cU&t=2667s)) How AI tools are used at Netflix

([47:54](https://www.youtube.com/watch?v=sAp9RjO79cU&t=2874s)) AI’s highest-impact use cases

([50:20](https://www.youtube.com/watch?v=sAp9RjO79cU&t=3020s)) What new grads add and why senior talent still matters

([53:25](https://www.youtube.com/watch?v=sAp9RjO79cU&t=3205s)) Open source at Netflix

([57:07](https://www.youtube.com/watch?v=sAp9RjO79cU&t=3427s)) Elizabeth’s parting advice for new engineers to succeed at Netflix

### **References**

**Where to find Elizabeth Stone:**

• LinkedIn: [https://www.linkedin.com/in/elizabeth-stone-608a754/](https://www.linkedin.com/in/elizabeth-stone-608a754/)

**Mentions during the episode:**

• Bringing the Best in VFX and Virtual Production Together as Eyeline: [https://about.netflix.com/en/news/bringing-the-best-in-vfx-and-virtual-production-together-as-eyeline](https://about.netflix.com/en/news/bringing-the-best-in-vfx-and-virtual-production-together-as-eyeline)

• Open Connect: [https://openconnect.netflix.com](https://openconnect.netflix.com)

• Jake Paul vs. Mike Tyson Was the Most Streamed Sporting Event in History: [https://www.netflix.com/tudum/articles/jake-paul-vs-mike-tyson-live-release-date-news](https://www.netflix.com/tudum/articles/jake-paul-vs-mike-tyson-live-release-date-news)

• Live from Netflix, It’s a New Chris Rock Stand-Up Special: [https://www.netflix.com/tudum/articles/chris-rock-live-standup-special](https://www.netflix.com/tudum/articles/chris-rock-live-standup-special)

• What is Chaos Monkey: [https://www.techtarget.com/whatis/definition/Chaos-Monkey](https://www.techtarget.com/whatis/definition/Chaos-Monkey)

• The Scoop: Netflix’s historic introduction of levels for software engineers - exclusive: [https://blog.pragmaticengineer.com/netflix-levels](https://blog.pragmaticengineer.com/netflix-levels)

• Code, culture, and competitive edge: Who’s winning the engineering talent game?: [https://www.signalfire.com/blog/report-engineering-talent-retention](https://www.signalfire.com/blog/report-engineering-talent-retention)

• Alliance for Open Media: [https://aomedia.org](https://aomedia.org)

• Behind the Streams: Three Years Of Live at Netflix. Part 1: [https://netflixtechblog.com/behind-the-streams-live-at-netflix-part-1-d23f917c2f40](https://netflixtechblog.com/behind-the-streams-live-at-netflix-part-1-d23f917c2f40)

—

Production and marketing by [Pen Name](https://penname.co/).