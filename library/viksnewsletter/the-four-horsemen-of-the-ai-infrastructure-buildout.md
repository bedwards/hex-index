---
title: "The Four Horsemen of the AI Infrastructure Buildout"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-11-16T18:29:38.000Z"
source_url: "https://www.viksnewsletter.com/p/the-four-horsemen-of-ai-infra"
word_count: 2208
estimated_read_time: 12
---

There has been so much talk about the AI bubble bursting that I cannot ignore it anymore and hide my head in the sand always looking at deep tech. I decided to think through some of the ways this bubble can pop and try to find the four horsemen who ride in the dead of night, right into the unsuspecting board rooms of AI companies. It may even be a whole cavalry. This piece is more for fun, and less about rigor. I have no idea what’s coming either. If you disagree, complain in the comments; I welcome your thoughts.

[

![](https://substackcdn.com/image/fetch/$s_!WAZw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F81aa4a9f-ee22-42e6-8f52-f0984906808c_1536x1024.png)



](https://substackcdn.com/image/fetch/$s_!WAZw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F81aa4a9f-ee22-42e6-8f52-f0984906808c_1536x1024.png)

Everybody is skittish right now. Period. People are building [dashboards](https://boomorbubble.ai/) for AI doomsday scenarios, famous [economists](https://www.businessinsider.com/paul-krugman-ai-boom-dotcom-internet-bubble-crash-musk-bailout-2025-2) and [bloggers](https://www.derekthompson.org/p/this-is-how-the-ai-bubble-will-pop) are warning us of the impending apocalypse, and hyperscalers are intertwined in shady, [circular deals](https://www.noahpinion.blog/p/should-we-worry-about-ais-circular) that makes the skin of anyone with a basic understanding of economics, crawl. Articles are popping up everywhere, each one architecting the downfall of AI in its own way. Now I’m adding to it. I’m sorry.

Nature has a strange ability to enforce “S-curves” on all forms of growth, usually through some feedback mechanism that slows progress and kills exponentials. When this happens, we will experience the pullback that everybody is anticipating so much. Usually these setbacks are short term but the effects that ripple through economies of the world reverberate for decades. Cue fear.

Historically, technology has still marched on but it’s best we try and anticipate what’s coming, even if we (ok, I) get it horribly wrong. In this post, I tried to envision the ways in which AI can go under in the near term: a morbid thought experiment.

Let’s begin.

Edited to add TL;DR image created with 🍌:

[

![](https://substackcdn.com/image/fetch/$s_!wuI_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb3ac6779-c2ac-4846-97ee-3f78cdaf23c7_2816x1536.png)



](https://substackcdn.com/image/fetch/$s_!wuI_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb3ac6779-c2ac-4846-97ee-3f78cdaf23c7_2816x1536.png)

\---

### 🏇🏽1: Supply Constraint

For all practical purposes, all of the world’s leading edge chips today are made by TSMC. Intel and Samsung have had their struggles, but in a world where TSMC is magically and most tragically not an option anymore, we will still be able to build chips. They might not be the best, or most economical, but we’ll get by. In the chip industry however, it’s not just making chips that counts; the rabbit hole goes much deeper.

Chips need packaging, test, assembly and material suppliers worldwide who all rely on the continued growth of chip sales. Time and again we have been privy to chip shortages of various forms, and somehow the auto industry seems to always get hit due to their “just-in-time” manufacturing policies, and practices of maintaining limited inventory. Chip shortages in the post-COVID world affected auto manufacturers the most. And we just witnessed the [Nexperia debacle, and how European car companies were left begging for chips](https://www.viksnewsletter.com/p/boring-chips-that-broke-europe).

Still, there are a host of reasons known and unknown, natural and man-made, that can suddenly affect the flow of chips. No chips, no compute. At that point, it does not matter if AGI is real or what the tokens-per-dollar cost of AI agents are. We go back to simpler times, like it or not. As nostalgic as that may seem, that is horseman #1 for AI progress. But, we’ve been down this road many times.

For a short while, we thought we had lost our [only supply of high purity quartz](https://www.viksnewsletter.com/p/the-semiconductor-apocalypse-no-one) essential for chips, but we survived. Taiwan has had many earthquakes and the fabs still chugged on with minimal interruptions because each instrument is built on its own “quiet island” which is immune to vibrations. Chip sales (not automotive) actually surged in the COVID era and after.

> **How likely is this scenario and why?**: Unlikely 🍻

But I wanted to include it because the chip supply chain is fragile, but also surprisingly resilient historically. People in the chip industry have been through a lot of doomsday scenarios in real life than the layman is privy to. Chip makers often utilize second sources, anticipate inventory levels many quarters in advance, make continuous adjustments to supply and demand, and have backup plans when possible. Remember, they’ve been told “[Only the paranoid survive](https://www.goodreads.com/book/show/66863.Only_the_Paranoid_Survive).”

\---

### 🏇🏽2: Power Shortage

Anyone these days proposing chips that provide lower performance at the benefit of lower power usage is pointed at and laughed off the stage. As [Paul Krugman eloquently puts it](https://open.substack.com/pub/paulkrugman/p/ai-is-power-hungry?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false):

> It’s obvious that any attempt to make AI more energy-efficient would lead to howls from tech bros who believe that they embody humanity’s future — and these bros have bought themselves a lot of political power.  
> *\- Paul Krugman*

Those amazing servers commissioned about 10 years ago that could stream video to anyone in the world consumed only 20-30 kW per rack. Today’s AI racks are being built to consume over 4-5 times that - at around 120 kW per rack. But there is plenty of talk about each rack sucking up a whole megawatt, or a 1000 kW. Stack a thousand such racks in a datacenter and you consume about a fifth of what powers New York city - for a single datacenter! You need a whole [Westinghouse AP1000 nuclear reactor](https://westinghousenuclear.com/media/jhlfh5l5/32201_wec-ap1000_flysheet_digital-1-1.pdf) to power just one of these AI datacenters. The scale of power needed is ridiculous.

As you can imagine, power and infrastructure is the new hot commodity. Without power, all those chips from Nvidia, Google, <insert hot new GPU maker> are of no use. Every major hyperscalar has chalked out their energy needs for the future and are actively working to procure it. There is already substantial emphasis on energy infrastructure because power buildouts take time, and the infrastructure on the whole - including transmission to the end-use point, not just generation - needs to be ready. Power infrastructure does not scale like chip volumes.

Then there’s the issue of real estate because infrastructure buildouts affect everyone living in the immediate vicinity of a datacenter. While coal and natural gas have typically been the majority source of energy, renewable energy sources are expected to occupy an increasingly larger fraction, at least in the US. If the availability of power does not scale with how fast we are making chips, we have ourselves horseman #2.

[

![](https://substackcdn.com/image/fetch/$s_!jSnR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F86e359cc-2ebe-4adc-814a-6f8140941878_1456x976.png)



](https://substackcdn.com/image/fetch/$s_!jSnR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F86e359cc-2ebe-4adc-814a-6f8140941878_1456x976.png)
*Source: SemiAnalysis*

> **How likely is this scenario and why?**: Less likely 🤔

While there will be competition for energy, the challenges involved are not insurmountable and energy availability will likely not be the reason why the house of cards collapses. The latest report from the International Energy Agency (IEA) shows that data centers still occupy a small fraction of the overall electricity demand growth projected out to 2030. Energy demand by data centers does not change the outlook dramatically.

[

![](https://substackcdn.com/image/fetch/$s_!FD_k!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F286055fb-4eda-4633-91cc-0e11e9ad60a1_1198x854.png)



](https://substackcdn.com/image/fetch/$s_!FD_k!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F286055fb-4eda-4633-91cc-0e11e9ad60a1_1198x854.png)
*Source: International Energy Agency (IEA)*

\---

### 🏇🏽3: LLMs are hyped and not actually useful

Renowned computer scientist Rich Sutton - famous for his “[The Bitter Lesson](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf)” essay - said on the Dwarkesh podcast that [LLMs are a dead end](https://www.youtube.com/watch?v=21EYKqUsPfg). He says that it is not simply about “training” models to create what Andrej Karpathy calls “stochastic parrots.” Intelligence is only inherently useful if machines are capable of updating knowledge on the fly, much like a child learns from its mistakes.

LLMs are useful for a lot of tasks, but whether the benefits they bring are worth the infrastructure expenditure is the real question.

Coding agents are the hottest applications of LLMs right now and have been the root cause for Replit’s revenue growing from a mere $2 million in 2023, to $250+ million in 2025 - a 2,300% growth! But, the same company’s [AI agent erased a codebase and then lied about it](https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7).

[

![](https://substackcdn.com/image/fetch/$s_!J9An!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93a9c49a-7103-4da4-ad70-b8f29250df70_595x432.png)



](https://substackcdn.com/image/fetch/$s_!J9An!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93a9c49a-7103-4da4-ad70-b8f29250df70_595x432.png)
*Source: Via [@heyalexstoica](https://x.com/heyalexstoica) on X.*

Companies are overindexing on AI in their internal workflows creating a [hiring crisis](https://www.derekthompson.org/p/young-people-face-a-hiring-crisis) where thousands of AI generated resumes land up in company job postings everyday. Those jobs postings are then further scrubbed using AI, leading to the highest unemployment rates for new graduates ever, along with a newfound skepticism for the “benefits” of technological, or more specifically, AI progress.

[

![](https://substackcdn.com/image/fetch/$s_!MbP0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92df16da-2382-44ea-8bbc-10348214e89a_1300x1162.png)



](https://substackcdn.com/image/fetch/$s_!MbP0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92df16da-2382-44ea-8bbc-10348214e89a_1300x1162.png)
*Source: Derek Thompson on Substack/The Atlantic.*

> **How likely is this scenario and why?:** Quite Possible 😳

Until LLMs showed up on the scene, we’ve never had machines talk to us like they’re human before. The human-like ability to understand context has led us to believe that LLMs are capable of “intelligent” things that help us in the future. But is it genuinely useful in doing hard things? - not just simple coding tasks, writing emails, or designing websites.

I’ve argued in the past that [we lack any documented form of information that can teach LLMs to design chips](https://www.viksnewsletter.com/p/why-documentation-is-the-missing-link-for-chip-design?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false). Yet, there is a [great impetus to bring AI into chip design](https://www.viksnewsletter.com/p/why-building-smarter-eda-tools-is-key?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false). What about more fundamental insights? Can an LLM realize that natural elements can be logically arranged into a periodic table based on atomic weight?

We’re realizing that every AI does not do well in some scenarios while it excels in others; what we describe as jagged intelligence. Without reinforcement learning, perhaps transformer architectures will always produce jagged levels of utility that are fundamentally limiting in scaling intelligence. Time will tell.

Then there are open questions: How do we measure the effectiveness of AI on company revenues? Do we spend more time checking AI’s work than doing it ourselves? Is more AI better, or is there a right balance between human and AI? In a lot of ways, we are still searching for truly transformative applications of AI.

\---

\---

### 🏇🏽 4: Circular Deals Spiral Out

Nvidia already has a market capitalization that exceeds most countries, and OpenAI is pitching itself as too big to fail. When Altman proposed last year that we needed $7 trillion for AI infrastructure buildout, comments on Reddit ranged from hilarious to snarky.

> “Pretty sure he wants to run Crysis on full HD.”
> 
> “Buy a small country, name it Samsterdam.”
> 
> “What a waste. 7 trillion could pay for 60 years of war in Afghanistan!”

However, the four major hyperscalars - Meta, Google, Microsoft, and Amazon - have spent a total of $100 billion in a single quarter on capital expenditures related to AI infrastructure with no signs of slowing down. Who’s laughing now?

[

![](https://substackcdn.com/image/fetch/$s_!IaO3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5db4bc7a-3d95-4932-9171-d8a4aa51c73f_938x722.png)



](https://substackcdn.com/image/fetch/$s_!IaO3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5db4bc7a-3d95-4932-9171-d8a4aa51c73f_938x722.png)
*Source: Via [Christopher Mims](https://x.com/mims/status/1951256592642441239) on X.*

In his now famous essay - [Honey, AI is eating the Capex economy](https://paulkedrosky.com/honey-ai-capex-ate-the-economy/) - Paul Kedrosky pointed out that we have now reached the feverish levels of capex spend that we witnessed in the Telecom buildout in 2020 (at about 1% of the GDP). We are still nowhere near the railroad buildout of the late nineteenth century. The main difference is that railroad infrastructure easily lasts 100 years, fiber laid during the telecom boom lasts decades, while server chips used in AI datacenters last maybe 5-7 years tops, even after repurposing training chips for inference.

[

![](https://substackcdn.com/image/fetch/$s_!OHWf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f1e22bb-5d4c-4ad5-8296-841ecef6bbf6_960x619.png)



](https://substackcdn.com/image/fetch/$s_!OHWf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f1e22bb-5d4c-4ad5-8296-841ecef6bbf6_960x619.png)
*Source: https://paulkedrosky.com/honey-ai-capex-ate-the-economy/*

Nearly [two-thirds of all VC funding](https://www.axios.com/2025/07/03/ai-startups-vc-investments) in the US is going to AI startups according to data from Pitchbook. AI is becoming entrenched in the workflows of companies, individuals, and even for children’s education. All of these applications need to pan out and **generate revenue in a meaningful way**. With nearly a billion ChatGPT users and OpenAI still losing money on its operations, this will not add up long term if things don’t start to turn around. Even if there is a whiff of failed revenue, all the VC funding for AI startups will dry up faster than a mirage in a desert. This “bank run” of AI startups is the scenario to fear the most.

> **How likely is this scenario and why?:** Most likely ☠️

When investments reach hype levels, emotions, not technology, will determine the rise and fall of markets. The rationality of benchmarks, availability of resources, and increased productivity all take a backseat when fear sets in - especially in the light of “creative” financing deals being made in AI infrastructure.

The recent [AMD-OpenAI deal to purchase 6GW](https://open.substack.com/pub/morethanmoore/p/amd-and-openai-the-6-gigawatt-bet?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) worth of chips is a fine example of unusual dealings in the semiconductor world. AMD is providing “basically free stock” to OpenAI that vests depending on how much infrastructure is deployed. AMD expects its share price to go up over time, up to $600 per share, making the chips “pay for themselves.” If AMD stock price drops in the future, then OpenAI loses the ability to build infrastructure because AMD shares aren’t worth that much. When infrastructure scaling slows, AMD stock will be worth even less. See how it can all go wrong?

\---

### Final Thought

It is just as likely that we are not in a bubble. Perhaps this is the greatest compute buildout humanity has ever seen! We might be witnessing exponentials that our human mind finds hard to comprehend.

But seemingly shady financing deals are what is keeping everyone up at night. The underlying technology behind LLMs is a major revolution of our time whose ultimate utility is probably only obvious in hindsight. If Sutton is right, and LLMs are a dead end, maybe something better than LLMs will take its place in the future and actually provide all the intelligence benefits we have been hoping for.

Just like how dark fiber laid during the telecom boom accidentally future-proofed us for the digital age, perhaps all the compute infrastructure we are building will actually be useful in solving humanity’s greatest problems.

I remain optimistic.

\---

**Do you think we are in a bubble? Let your thoughts in the comments below.**

**Click ❤️ if you enjoyed the post, so more people can join this morbid thought experiment.**

*This post is public so feel free to share it.*