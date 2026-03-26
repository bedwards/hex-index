---
title: "Deepdive: How 10 tech companies choose the next generation of dev tools"
author: "Gergely Orosz"
publication: "The Pragmatic Engineer"
publication_slug: "pragmaticengineer"
published_at: "2026-02-03T17:25:50.000Z"
source_url: "https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools"
word_count: 2611
estimated_read_time: 14
---

Right now, it seems like almost every tech company is changing its developer tooling stack, which is a big shift from eighteen months ago when the answer to “what to use for AI-assisted coding?” was simple: buy a GitHub Copilot license and boot up ChatGPT. In our AI tooling [survey in 2024](https://newsletter.pragmaticengineer.com/p/ai-tooling-2024), those two tools racked up more mentions than all the others combined.

But no more. Today, a plethora of tools outpace Copilot in various ways, like Cursor, Claude Code, Codex, and Gemini CLI, and there’s also AI code review tools like CodeRabbit, Graphite, and Greptile, not to mention all the MCP integrations which plug into agentic tools.

So, for this deepdive I asked 10 tech companies which tools their engineers use and, crucially, how they made their choices from among all the options. These businesses range from a 5-person seed-stage startup, to one that employs 1,500 people and is publicly listed. All are anonymous, except for Wealthsimple and WeTravel. WeTravel has also kindly shared the most detailed measurement framework I’ve yet seen.

We cover:

1.  **Speed, trust, & show-and-tell: how small teams select tools:** At places with fewer than ~60 engineers, tooling decisions are fast and informal: developers try them for a couple of weeks and those which “stick” win.
    
2.  **How mid-to-large companies choose:** bureaucracy, security, and vendor lock-ins. At companies with ~150 engineers, adoption is considerably slowed down by security reviews, compliance requirements, and executive-level budgetary considerations.
    
3.  **Measurement problem: metrics are needed but none work.** Every workplace struggles to prove its AI tools work, and common metrics like lines-of-code-generated are distrusted by engineers.
    
4.  **How Wealthsimple measured and decided.** The flagship Canadian consumer fintech ran a 2-month selection process to choose an AI code review tool. Rolling out Claude Code to all engineers was a decision made by the CTO, backed with a mix of personal conviction, validated by usage data from Jellyfish.
    
5.  **How one company accurately measures code review usefulness.** WeTravel built a structured -3 to +3 scoring system across five dimensions, with five engineers evaluating ~100 comments. They found no AI code reviewer suitable for their codebase.
    
6.  **Comparative measurements at a large fintech.** A team ran Copilot, Claude, and Cursor simultaneously across ~50 PRs, scoring ~450 comments. They found Cursor reviews the most precise, Claude the most balanced, and Copilot the most quality-focused.
    
7.  **Common patterns.** Developer trust drives adoption more than mandates, the Copilot → Cursor → Claude Code migration path is well trodden, and nobody has cracked productivity measurement yet.
    

The goal of this article is to showcase what tech companies of different sizes are doing, and to offer a few pointers on measuring and comparing the tools. It’s hard to do, but not impossible, as two in-depth case studies illustrate, below.

**Don’t forget, what matters is to find tools that work for** ***your*** **team.** During this research, I found vendors which are beloved by one company and loathed in other workplaces. There’s no single vendor that’s universally rated by every team in all contexts.

*As always, I have no affiliation with any vendor mentioned in this article, and was not paid to mention any of them. I [used to be an investor](https://blog.pragmaticengineer.com/investing/) in Graphite, but no longer am. For more details, [see my ethics statement.](https://pragmatic-engineer.ghost.io/ghost/#/analytics)*

*The bottom of this article could be cut off in some email clients. [Read the full article uninterrupted, online.](https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools)*

## 1\. Speed, trust, & show-and-tell: how small teams select tools

Decisions are informal and made quickly at the smallest businesses in our survey, with the decisive factor being how people feel about the tools. Trial periods are short, at around two weeks, and individual developers have outsized influence on whether a tool is adopted or binned, with the decisions spreading organically. Below are two examples:

### Seed-stage logistics startup (20 people, 5 engineers)

The head of engineering at this startup describes their approach as high-trust and developer-led:

> “We agreed to try new tools for 2 weeks and see how everyone felt. We didn’t use any hard-and-fast measurement. TLDR: I trust our devs and their opinion is a big part of this”.

Developers there suggest which tools to try and decide whether to keep using them or to seek alternatives. For AI code reviews, the team first tried **Korbit** for around a week but the tool felt “off”, so they roadtested CodeRabbit which “stuck” within a few days:

> “Within a few days of using CodeRabbit I could tell the devs just liked it and were embracing the suggestions, unlike with Korbit which they ignored when they’d lost trust \[in it\].”

And that was that: decision made. *As a small team, it’s easy to switch to something better and it only takes a single engineer to suggest it.*

The broader tooling stack of this startup has evolved quickly over the last year:

-   **Figma** for designs, which works nicely with Linear. The company has 5 devs and one UX designer.
    
-   **Linear** for ticketing and collaborating across UX and development. The UX person creates Linear tickets alongside her Figma designs.
    
-   **Claude Code** and **Cursor** for development, connected to Linear via **MCP.**
    
-   **Claude Code writes tickets:** a recent change which is working nicely with **CodeRabbit**, as more context is passed downstream for AI code review.
    

“Show and tells” – where team members show colleagues their tooling setups during weekly team meetings and demos – are used by this startup to identify which tools do or don’t work:

> “Our show-and-tell process greatly helps. There are so many new tools, skills, IDEs, etc, that it can be overwhelming. We all learn from seeing what others in our team are doing.”

The team makes a clear distinction between company-wide tools like Claude and CodeRabbit that everyone is expected to use, and devs’ personal environments (IDE choice, terminal setup), over which individuals have full autonomy.

**By now, almost everyone has migrated to Claude Code,** but six months ago the team was evenly split between Cursor and Claude Code. The head of engineering said:

> “We had a dev for a while who wouldn’t use Cursor or Claude. We didn’t force him to, but it became clear that everyone else seemed to ship more code, whereas his quality wasn’t there”.

### Series A startup (30 people, 15 engineers)

A staff engineer at this company says the team is split on **Cursor** versus **Claude Code**, with the latter gaining momentum. He also says code reviews cause headaches:

> “One of our main challenges has been code reviews, as the quantity of code produced goes up, and quality used to go down, pre-Opus 4.5.”

They evaluated three code review tools: **Cursor’s Bugbot** (okay but not great), **Graphite** (not good), and **Greptile** (good). They’re now trialing Greptile for PR approvals, taking advantage of its confidence-scoring feature.

What works really well for this team is maintaining extensive **Agents.md** and **Claude.md** files, which are very handy because they’re used by:

-   Claude Code and Cursor for coding
    
-   Greptile for code reviews
    

These two files help maintain a single source of truth for coding-style guidance across the toolchain.

There’s praise for Cursor’s integration with Linear and Slack from a staff engineer:

> “An alternative flow I personally like a lot is Cursor cloud agents, as their integration with Linear/Slack is very good. For smaller changes, this means code is not even checked out, but goes directly from the Cursor agents, to GitHub, to being deployed.”

### Series D observability company (150 people, 60 engineers)

The director of open source at this place summarizes what’s stuck there:

> “We’ve tried a bunch of things (Graphite, et al.) but the one thing that’s really stuck has been the company’s **Claude Code** subscription — it’s the most definite value-add. We pretty regularly bump people up a tier as their usage increases vs other tools that mostly sit idle”.

An interesting signal at this company is that non-engineers have jumped onto Claude Code. Product managers, solutions engineers, and technical account managers alike are using it more than the median engineer, and they’re handling customer bug reports by opening Claude Code PRs directly:

> “They probably use Claude Code more than the median engineer! They’ve been able to handle customer papercuts \[pain points\] with Claude Code PRs”.

## 2: How mid-to-large companies choose

At companies with 150+ engineers, it’s not about how a tool “feels”. Instead, existing vendor relationships may be decisive, and there’s often pressure from the C-level (leadership team), as well as security and compliance matters to address.

There’s also the new challenge of how to coordinate tooling rollouts across several departments and potentially hundreds of engineers. This is where a decisive CTO can cut through red tape to achieve faster adoption. Our first case study covers how one fintech business did precisely that.

### EU-based software company (500 people, 150 engineers)

This place’s experience is a cautionary tale of what can happen when a leadership moves on AI tooling without a plan for what comes next. A senior engineer there says:

> “In the summer of 2025, our leadership team came back from an offsite and declared we were now AI-first, which translated to everyone receiving a Copilot Business subscription if they happened to ask for one. Problem solved, right?”

But it wasn’t, as the Copilot rollout was immediately met with questions about alternatives:

> “Our company’s pre-existing relationship with Microsoft was probably key: we already had M365, and then they rolled out Copilot to all devs.
> 
> People immediately had questions about other tools. A few of us had used Claude Code that summer, while others had used Cursor or Gemini CLI.
> 
> **The pace of new models and tools in the second half of 2025 left the leadership team completely unprepared.** They had also not budgeted for anything other than $19/mo Copilot subscriptions”.

They got “stuck” and unable to approve any new tools for six months. The attempt to create a formal approval process is stalled, thanks to legal and IT being gridlocked, with the European Union’s AI Act causing concerns and governance questions:

> “We are facing adoption challenges thanks to bureaucracy and EU regulation. I’m positive this process has led to developers using unsanctioned tools at their own expense.”

Meanwhile, their default Copilot setup uses GPT 4.1, a 10-month-old model. Many developers there don’t know if they can change the model or use coding agents. This creates a vicious cycle where the tool feels underwhelming, which suppresses adoption and makes it harder to justify further investment in better options.

### Cloud infrastructure company (900 people, 300 engineers)

A principal engineer responsible for AI tooling at this company describes the constant push-pull between developer enthusiasm and executive scrutiny:

> “We started with Copilot because it was easy to procure, since we were a Microsoft customer for M365. Then switching to Cursor took forever. Pricing keeps shifting. Meanwhile, execs read a doc and keep asking “why aren’t we on Claude Code?”

The answer to this also came from the exec team: pricing. Execs simply did not want to invest in the tools, and pricing remains a persistent headache. Claude’s team plan is ~$150/month, Cursor’s is ~$65, and this company’s C-level was not comfortable with going from Copilot’s $40/month to Cursor’s $65/month. The principal engineer also worries that costs will keep mounting, even with approval to move to Claude Code’s $150/month:

> “Claude Code and Codex are definitely eating the costs right now… we all know that won’t last. If my execs push me on this, I will need to say — ‘okay, our developers got much slower in 6 months, but now we need to pay $250/month, per developer, to get higher limits’”.

### Public travel company (1,500 people, 800 engineers)

A staff engineer at this business highlighted vendor lock-in as a primary concern:

> “Our main concern is avoiding vendor lock-in with a single solution. With this in mind, I expect to continue evaluating AI tooling this year as things keep evolving rapidly”.

They rolled out **GitHub Copilot** last year and are now evaluating **Claude Code** as a replacement. They remain cautious, given that the per-engineer cost is steep with Claude.

### Public tech company (2,000 people, 700 engineers, productivity space)

The engineering leader in charge of dev productivity at this business calls security the biggest challenge:

> “The biggest hurdle for us is security. We are looking for some amount of compliance, and I’ve found dev tools startups aren’t prioritizing that until they are late Series A/Series B. This helps focus us and ensure that what we are evaluating has passed some muster in the industry, without us feeling like we’re late to the game”.

Unsurprisingly, the tooling selection process is more in-depth at companies of this size, with many vendors as options. Here’s how they go about things:

> “There’s an amount of instinct involved in knowing how to prioritize vendors. Our process is this:

-   What we’ve heard from friends and colleagues at other places
    
-   Chatter on Twitter/Reddit/Hacker News
    
-   Knowing how to cut through hype
    

**Evaluation is more organized and beta trials are common,** he says:

> “Every tool has to move a metric. Those that directly impact a metric which we already care about get approved faster. The tools that could theoretically impact metrics, but don’t have directly-measurable impact, take more work. The weaker the metric story, the stronger the narrative has to be.
> 
> We like to capture at least two weeks of beta usage on a tool before making a call on expanding or ending it.”

## 3\. Measurement problem: metrics are needed but none work

If there’s one theme that unites every company in this deepdive regardless of size, it’s the struggle to measure whether AI tools actually work.

Execs want data, but engineers distrust the data that exists. Meanwhile, vendors’ own metrics are mostly useless.

Among our research sample, the EU-based software company debated options and only found bad or worse ones:

-   Using the ‘lines of code written by AI’ metric creates bad incentives, a sentiment shared by AI enthusiasts and skeptics alike at the company.
    
-   Even if they were dead-set on lines of code, is there a way to isolate those lines of code which create business value?
    

**There’s also the point that some of the most valuable uses of AI don’t lie in the writing of code,** but in research, generation of ideas, debugging, etc, which makes measuring code generated by AI tools a dead end. Meanwhile, vibe-coded scripts and tools that never hit production can feel like real productivity breakthroughs.

In the end, this company chose lines of code generated by Copilot as the “official” metric, which met a predictable response:

> “You can imagine how poorly this was received by devs! It doesn’t even account for the fact that this metric from Copilot is purely based on telemetry from specific IDEs. So, even if you’re using Copilot CLI to write code and maxing-out your premium requests, it will not be counted.”

The principal engineer at the 900-person cloud infrastructure company was more blunt:

> “My engineering org is getting hooked on AI, but execs want metrics on value-add. I don’t want to push vanity usage metrics just to justify spend, but outside of vanity metrics, I have nothing of value to show!”

This principal engineer dismissed developer-productivity vendors’ own measurement approaches:

> “I talked with DX and one of the other vendors, they are just DORA+Velocity metrics combined with anything they can get from APIs of Cursor, Claude etc. Sure, this all looks good on paper: Team A is faster and they use AI. But is AI usage and speed a real correlation?”

A fundamental question remains unanswered, says the principal engineer:

> “How can we make effective use of our AI agent subscriptions? So far, in my experience, there is no answer to this — not even the hint of one”.

## 4\. How Wealthsimple measured and decided

Wealthsimple is a Canadian fintech company, employing about 1,500 people, around 600 of whom are engineers. I talked with CTO [Diederik van Liere](https://www.linkedin.com/in/diederikvanliere/) about how they choose AI code review and AI coding tools. For AI code review tools they run a thorough measurement process, and for AI coding tools it was more of a push from Diederik. He shared exclusive details on their exact measurement process, and how they landed on Graphite for code review and Claude Code for coding:

### Choosing an AI code review tool via a “shootout” process

[Read more](https://newsletter.pragmaticengineer.com/p/measuring-ai-dev-tools)