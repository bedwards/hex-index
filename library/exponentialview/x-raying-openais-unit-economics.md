---
title: "🔮 X-raying OpenAI’s unit economics"
author: "Azeem Azhar"
publication: ""
publication_slug: "exponentialview"
published_at: "2026-02-13T15:31:33.000Z"
source_url: "https://www.exponentialview.co/p/x-raying-openais-unit-economics"
word_count: 2607
estimated_read_time: 14
---

AI companies are being valued in the hundreds of billions. $650 billion in capital expenditure commitments are being made by big tech for 2026. Yet one question remains unanswered: does it make economic sense?

We recently partnered with Epoch AI to analyze GPT-5’s unit economics, and figure out whether frontier models can be profitable (full breakdown [here](https://www.exponentialview.co/p/inside-openais-unit-economics-epoch-exponentialview)).

To dig deeper into what our results tell us about the wider industry, we hosted a live conversation last week between myself, , , moderated by .

We cover:

-   The research findings,
    
-   Possible paths to profitability,
    
-   OpenAI vs Anthropic playbook,
    
-   Winning the enterprise
    
-   Why this research made some bulls more pessimistic
    
-   What the market gets wrong.
    

Watch here:

Listen here:

Or read our notes:

### **What** **did** **you** **actually** **find?**

**Matt:** For someone just getting into the research, what’s the big takeaway — and how did you even think about building a framework to analyse a business like this?

**Jaime:** To our understanding, no one had really taken on this task of piecing together all the public information about the finances of OpenAI — or any large AI company — and trying to paint a picture of what their margins actually look like. So we did this hermeneutic exercise of hunting for every data point we could find and trying to make sense of it.

The two most important takeaways: first, it seems likely that OpenAI during the past year, especially while operating GPT-5, was making more money than the cost of the compute — which is the primary expense of operating their product. But they appear to have made a very thin margin, or even lost money, after accounting for all other operating expenses: staff, sales and marketing, administrative costs, and the revenue-sharing agreement with Microsoft.

Second — and this is the part I found quite shocking — if you look at how much they spent on R&D in the four months before they released GPT-5, that quantity was likely larger than what they made in gross profits during the entire tenure of GPT-5 and GPT-5.2.

**Hannah:** A lot of our methodology was based on numbers we could find historically, then trying to project what would happen through the rest of 2025. For example, we had data showing 2024 was $1 billion in sales and marketing, and H1 of 2025 was $2 billion. So we built the picture using constraints like this, breaking each category down into its separate components so we could assess whether each was a realistic approximation.

### **Models** **as** **depreciating** **assets**

**Azeem:** This is a complicated exercise, and one of the things that comes out of it is the question of that short model life. The family we looked at was only really the preeminent family for a few months. Enterprises don’t change the API they’re using the day a new one comes out — there’s always a lag. But consumers do, because that’s what you get access to on ChatGPT.

You may remember that when GPT-4 was set aside, it was an emotional support tool for many users, and they were very upset with how methodical and mechanical GPT-5 felt. The uncertainty is: to what extent do you actually learn and prepare for your next model based on the short life of the existing model?

There are two elements. One is more nebulous — by having a really good model, even if it lasts for a short period, you maintain your forward momentum in the market. The second is harder to unpick: what do you learn about running better and better models from actually having run a better model, even if it only lasts four months? That learning might be down in the weeds of R&D — training data choices, reinforcement learning — or in operations and just running a model at that scale. I suspect it’s hard for even OpenAI to know the contribution of that second part.

**Matt:** It reminds me of GPUs. I’ve been talking to finance folks about what the value of H100 chips will be in a few years, and everyone’s shrugging their shoulders. It’s a parallel to these models, what is GPT-4 worth now, when three years ago it was the frontier?

### **Is** **there** **actually** **a** **path** **to** **profitability?**

**Azeem:** I think the two challenges around this model are: first, is the OpenAI approach the only way to do this? We’ve seen Anthropic do something completely different. And second, is there a path to positive unit economics? Are they producing something for X dollars that they can sell for 1.3X? Or are they producing something for X that they sell for half X, which was the story of a lot of the dot-com era?

We got partway to answering that second question: yes, it’s expensive, but yes, there is some kind of gross profit margin. The level we estimate — Hannah can speak more accurately to this — is lower than a traditional software business. So we’re learning that perhaps foundation labs don’t look like software businesses. They look like something different.

**Jaime:** Think about the game OpenAI is playing. It’s not about becoming profitable right away. What they’re trying to do is convince investors that they have a business and research product worth scaling as much as possible, driven by the conviction that through scale, they’ll unlock new capabilities which in turn will unlock new markets.

This is why they’re considering ads. With almost a billion users, they might reap a few billion, maybe even a few dozen billion, from advertising. But if your plan is to build $100 billion data centers, that’s not enough. Ads fit into a different project: demonstrating to investors that *if* *we* *wanted*, we could be profitable. We have a path to $100 billion in revenue between ads, business sales, and other markets. We’re not going to do that because we’re more ambitious — but we could.

**Azeem:** The question is whether an advertising model is truly fundamental to OpenAI, or whether it’s instrumentally useful — something that gets you to the next stage. A lot depends on how we start to use these tools. The piece of work that Epoch and Exponential View did looked at ancient history, with all due respect. It was before OpenClaw. It was before Opus 4.6. And we looked at a particular world before what Andrej Karpathy called the “threshold of coherence” for agents — this moment where agents are now good enough that you can get them to do lots of things for you. That makes me wonder whether the traditional ad model makes any sense, because there won’t be any eyeballs.

**Jaime:** Just sell it to the agents, who have probably rented humans to do the jobs they can’t do themselves.

### **Where’s** **the** **real** **bottleneck?**

**Matt:** The hyperscalers just reported that they’re capacity-constrained. Capex is huge, but they can’t meet demand. How do you think about that?

**Jaime:** The two primary constraints for scaling up infrastructure are GPUs and energy. Energy is what everyone talks about, but it’s something we know how to solve. If we need to build 10 or even 100 gigawatts of extra power, that’s only a 10% increase over all installed US capacity. This has happened before — in the 2000s, they built enough gas infrastructure to match that level of expansion.

The GPU part, though — that’s something very unique. Right now, production is choked on a few factories in Taiwan, and they’ve been trying to expand with pretty limited success. That’s probably where the long-term bottleneck ends up.

**Azeem:** I love what you’ve just said, because the general note out there is that energy is the bottleneck. But if you listen to Elon Musk talk about why he wants to put data centres in space, every single reason comes down to things we’ve done to ourselves: grid permitting backlogs. These are queues, not walls. They’re not laws of physics. The laws of physics are black body radiation and the speed of light and things Hannah knows much more about than I do.

I’d push a little on the energy side, though, because there are real supply chain questions — the copper issue, optical fibre. Whoever thought about Corning before two months ago? But I also take away from this: let’s go back and find out when these companies started talking about megawatts and gigawatts. I’m pretty certain they weren’t saying it at the end of 2024. The first time I started hearing Microsoft talk about gigawatts publicly was around January 2025.

**Hannah:** I’m wondering how things will move to the edge. We’ve talked about the build-out for hyperscaler data centres, but Azeem, you mentioned running an LLM on-device. At what point will the hardware and algorithmic improvements let you run what you’re doing now locally?

**Jaime:** If you look at a fixed level of capabilities, there’s rapid progress — what models could do nine months ago, you can already get from a pretty good open model. Look at Kimi 2.5, arguably at the O3 level, which was OpenAI’s model from April. But it’s not a fixed level of capabilities driving the growth of the industry. It’s this ever-increasing gamut of capabilities. All these exciting new capabilities, you’re going to want to run in a data centre over a very long period. Azeem is talking about a $5,000-a-year bill for his agent. That seems very small compared to what these machines could do in the future. If you get to the point where output is comparable to a worker, you might be willing to spend hundreds of thousands of dollars a year just to keep those agents running.

### **Why** **the** **markets** **panicked** **—** **and** **why** **they** **might** **be** **wrong**

**Azeem:** When I looked at what happened in the markets this week, I really felt this was an overreaction. The market is always right — let’s get that out of the way. But they didn’t get the demand growth.

They didn’t get the way demand is outstripping supply. They didn’t understand how much more we were going to consume as these models get better. Amy Hood, Microsoft’s CFO, said she had to choose between putting processing power toward third-party Azure services or powering Microsoft Office and first-party apps. This is not a market with slack capacity.

The moment a model can work for 20 hours, I will be running hundreds of these things. And we’ve already introduced a rule within the team: if you don’t max out your Claude usage at least once a month, you lose Claude Max as a tier. You’ve got to be maxing these things out because they’re so powerful. Once that realisation moves into Main Street, which it will in the next two years, usage will grow and grow.

**Matt:** The compute demand has been underreported. I’ve talked to enterprise folks who, even when they’re not using their allocation, don’t want to give it up. They don’t want to lose their spot.

**Azeem:** It’s like airlines flying empty planes during COVID to keep their flight routes.

### **Enterprise:** **Is** **anyone** **winning?**

**Matt:** A lot of folks I talk to are model-agnostic. They pick one here, use another there. How do you compete in that space?

**Jaime:** It’s so hard to compete in all of these spaces. I like the end game of focusing on business, which is more the Anthropic approach. This is where you spend $100,000 a year on an agent — not something an individual can afford, but something a company spends if they believe AI provides as much value as a marginal employee. One example of a speculative bet that hasn’t panned out: Sora 2. We looked at it over the course of our investigation. It had significant, though not overwhelming, compute costs, driven largely by free-user demand. Usage has actually dwindled since its release. An avenue for a new market that hasn’t quite worked.

**Hannah:** If I was to add anything: we’ve heard from Sam Altman that they’ve slowed hiring, but they’re trying to hire more consultants to build purpose-built solutions in enterprises. At the employee level, people switch between models constantly. I do it personally. But if you’re building systems with your entire company’s data connected and workflows running on them, having one company work with that is easier.

**Azeem:** What we saw with Opus 4.6, which was released just before we recorded this, was that it wasn’t accompanied by the usual list of 50 great software companies from Replit to Notion saying they’re using it from day one. That’s not to say they won’t, but it shows there are still switching costs. A better model is not better in every direction. There may be certain classes of prompts or bits of your workflow where it underperforms what you’ve tested against. So there’s this balance: do you exploit what you know or explore with the new model?

We have agentic flows still running on Gemini 2.5 Flash because they do it reliably, and we don’t benefit at all from a better model on that particular use case. The time we’d spend making the change is better spent on something near the frontier.

### **Two** **paths:** **OpenAI’s** **breadth** **vs** **Anthropic’s** **focus**

**Azeem:** The research helped me see what I think the choices are. There’s clearly a path to success for OpenAI. But one of the big drags is the 20% Microsoft revenue share — a deal they did years ago, before ChatGPT, for distribution and compute. That drag gets in the way of an independent, successful business.

What also struck me was how OpenAI was trying to capture many fronts simultaneously: sovereign governments through Stargate, enterprise, universities, consumers. That often flew foul of how Y Combinator —which Sam used to run — would encourage founders to work: find a beachhead, stick to it, then grow. DoorDash, a YC company, was originally called something like Palo Alto Pizza Delivery, because that’s what they did.

The x-ray of the business showed there is something appealing about how Dario has run Anthropic — really deep focus. You don’t need the speculative investments in product to consumerise, or in the sales and marketing for mass awareness. That showed there is another path.

**Jaime:** If you think the software part is rapidly depreciating, you might want to get into building and serving infrastructure at scale. OpenAI has famously said they want to get to a position where they’re building gigawatts of power capacity. That’s extremely ambitious, but it makes sense. The infrastructure may be the enduring asset.

### **What** **surprised** **them** **most**

**Matt:** Diving into this, what was the most surprising conclusion you walked away with?

**Hannah:** I was actually quite surprised the gross margins were where they were – around 50%. That’s pretty good for a model where people are saying they’re haemorrhaging money year after year. We’d heard from Dario and Sam that at the model level there’s profitability, but to actually see it come out in the numbers is quite reassuring.

**Jaime:** I came away with a more pessimistic view than I had. You might have picked up that I’m already very bullish on AI. But I was expecting to find resoundingly that they already have a profitable model when you look at it through the lifecycle — that gross profit completely offsets the cost of development. It doesn’t. It’s way closer than I thought. This suggests to me how reliant these companies are on investor goodwill, and how much they depend on the story of future profitability. They seem great at inference once the model is built. But after you account for development costs, the picture looks much tighter than I expected. I’m still bullish, but much more temperate.

**Azeem:** If you look at the OpenAI stack of affiliated public companies — the Oracles and so on — they have really underperformed relative to the Google–Anthropic stack of affiliated companies. There’s been a divergence since, I think, Sam talked about needing a trillion dollars. The market is seeing something.