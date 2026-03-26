---
title: "Qualcomm's Ventana RISC-V Acquisition"
author: "Babbage"
publication: "The Chip Letter"
publication_slug: "thechipletter"
published_at: "2026-01-13T23:33:22.000Z"
source_url: "https://thechipletter.substack.com/p/qualcomms-risc-ventana-fusion"
word_count: 1955
estimated_read_time: 10
---

*This post may be too long for your email client: please click on the title for the full post. This is not investment advice and the usual disclaimers apply.*

Whilst the world was focused on Nvidia’s [acquisition](https://thechipletter.substack.com/p/jensen-groks-groq) of most of Groq’s team and a license for Groq’s technology just before Christmas last year, another December acquisition of a startup by a chip giant generated a lot less discussion.

On 10 December Qualcomm [announced](https://www.qualcomm.com/news/releases/2025/12/qualcomm-acquires-ventana-micro-systems--deepening-risc-v-cpu-ex) they were acquiring RISC-V CPU designer Ventana Micro Systems. Like Groq, Ventana was a venture capital backed startup, this time founded in 2018, and which raised over $100m in funding. Investors included Intel CEO Lip-Bu Tan, through his investment firm [Walden International](https://www.waldenintl.com.sg/). LBT quickly congratulated the Ventana team:

[

![](https://substackcdn.com/image/fetch/$s_!zplb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe3826fa0-c620-4731-9f59-d1b9e00dcb57_1106x740.jpeg)



](https://www.linkedin.com/posts/lip-bu-tan-284a7846_qualcomm-acquires-risc-v-chip-designer-ventana-activity-7404832803001012224-C_3V?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_fJxwBsf4Fi18pB_USo_8F0GFMYcSopCs)

It’s a small world! Aside from LBT’s personal financial interest, Intel is both a Qualcomm competitor and potential future (foundry) supplier so a degree of diplomacy is probably appropriate.

Unlike Nvidia / Groq this was a true acquisition of all of Ventana. Like the other transaction though it also seems to be, in essence, a modified ‘acquihire’ where the company is bought for its engineering talent and its intellectual property rather than its products.

> “We are thrilled to join the Qualcomm team and contribute our RISC-V expertise in the development of Qualcomm’s leading Oryon CPU technology,” said Balaji Baktha, CEO of Ventana Micro Systems.

It was notable that Intel’s LBT mentioned the team first in his ‘great exit for employees and investors’ comment. The sale of Ventana looks like a decent exit for employees but doesn’t seem to be a triumph for Ventana’s investors. Unlike Qualcomm’s [purchase](https://www.qualcomm.com/news/releases/2021/03/qualcomm-completes-acquisition-nuvia) of Arm CPU designer Nuvia in 2021 for $1.4bn, this deal wasn’t big enough to require disclosure of the purchase price.

Since the Ventana deal was announced the market has largely left Qualcomm’s stock price (in blue) unchanged, whilst the news looks like it started Arm’s stock (in yellow) on a downward path and it’s now down over 20%.

[

![](https://substackcdn.com/image/fetch/$s_!POLw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4dd3e5a-8ad0-40c7-9910-13977a8181de_548x556.png)



](https://substackcdn.com/image/fetch/$s_!POLw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4dd3e5a-8ad0-40c7-9910-13977a8181de_548x556.png)

On the surface this makes sense. Arm has [disclosed](https://investors.arm.com/static-files/9be77c9d-75ee-4639-bfe4-17efd23c56b5) that Qualcomm is one of its biggest customers, accounting for 10% of Arm’s total revenue

[

![](https://substackcdn.com/image/fetch/$s_!lL0u!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1cf5c2c-8b64-4503-99e6-bb51174857bc_1538x76.png)



](https://substackcdn.com/image/fetch/$s_!lL0u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1cf5c2c-8b64-4503-99e6-bb51174857bc_1538x76.png)

Qualcomm moving from Arm to RISC-V with the consequent loss of its Qualcomm licensing revenues would be a big deal for Arm and a huge win for the RISC-V ecosystem. On the other hand fees paid to Arm make up a much smaller portion of Qualcomm’s expenses.

If we dig a little deeper, though, then things get a little more complicated.

Before we start though, we need some background on Qualcomm’s CPU efforts, then on the story of Ventana Micro Systems.

#### Qualcomm’s Oryon CPUs

Oryon is Qualcomm’s name for its series of Arm CPU cores built by the team it acquired in its 2021 purchase of Arm datacenter CPU designer Nuvia. The launch of Oryon based designs (used in Snapdragon Elite X laptop designs) led to a bitter lawsuit from Arm:

Qualcomm won that lawsuit decisively in January 2025; we looked in detail at the result in [Qualcomm’s RISC Pays Off; Arm’s Dogs Don’t Bark](https://thechipletter.substack.com/p/qualcomms-risc-pays-off-arms-dogs). Arm’s subsequent appeal was dismissed, and now Qualcomm is suing Arm for:

> … breach of contract, improper interference with customer relationships, and for Arm’s pattern of conduct seeking to hinder innovation and better position Arm’s own products over its long-standing partners’ …

… as Qualcomm described in its triumphalist [Qualcomm Achieves Complete Victory Over Arm](https://investor.qualcomm.com/news-events/press-releases/news-details/2025/Qualcomm-Achieves-Complete-Victory-Over-Arm-in-Litigation-Challenging-Licensing-Agreements/default.aspx) press release in September last year. No signs of a rapprochement between the two firms here!

Qualcomm has continued to develop its Oryon designs including some announcements this year, with mixed results:

[

![](https://substackcdn.com/image/fetch/$s_!_l-K!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbfccf86-3517-4e1f-83cc-8d2156e39898_1988x1080.png)



](https://wccftech.com/snapdragon-x2-plus-loses-to-m4-in-4-out-of-5-cpu-and-gpu-tests/)

And, even with this comprehensive legal victory Qualcomm is still dependent on Arm’s technology for future Oryon cores. Qualcomm [has](https://thechipletter.substack.com/p/qualcomms-risc-pays-off-arms-dogs) a degree of protection for the next few years …

> As was revealed in the trial, Qualcomm can extend its ALA \[license agreement for the Arm architecture\] until 2033 in return for an extra $1m a year fee from 2028. Qualcomm still needs to chart a course for its Snapdragon cores after that date, either coming to an agreement with Arm or moving to another architecture.

… but still, seven years is not that long, and being completely dependent on a supplier you’ve just beaten up in court in a bitter dispute - and are going back to beat up again, probably isn’t ideal. You probably need a backup plan.

Which is where RISC-V comes in.

#### Qualcomm and RISC-V

If you’re new to RISC-V then the post [RISC-V Origins and Architecture](https://thechipletter.substack.com/p/risc-v-part-1-origins-and-architecture) provides a brief refresher on the origins of, and the philosophy behind, the RISC-V Instruction Set Architecture.

In that post we quoted RISC-V International:

> RISC-V is an open standard Instruction Set Architecture (ISA) enabling a new era of processor innovation through open collaboration
> 
> RISC-V enables the community to share technical investment, contribute to the strategic future, create more rapidly, enjoy unprecedented design freedom, and substantially reduce the cost of innovation.

> The RISC-V ISA is free and open with a permissive license for use by anyone in all types of implementations. Designers are free to develop proprietary or open source implementations for commercial or other exploitations as they see fit.

Central to the RISC-V philosophy is the fact that the architecture is intended to span cores ranging from simple 32-bit microcontrollers all the way to 64-bit designs for powerful desktops and servers. A common path for firms using RISC-V is to start with simple 32-bit cores and then to progress to more complex application processors, and that’s the route that Qualcomm has followed.

We can chart a number of milestones in Qualcomm’s RISC-V journey:

-   **2015:** Qualcomm became a founding member of the RISC-V Foundation (now RISC-V International).
    
-   **2019:** Through Qualcomm Ventures, the company participated in a $65 million investment round for SiFive, the leading startup in RISC-V core designs.
    
-   **2019:** Starting with the Snapdragon 865, Qualcomm moved its internal “housekeeping” controllers (managing things like power, security, and sensors) to RISC-V.
    

-   **May 2023:** Qualcomm co-founded the RISC-V Software Ecosystem (RISE) to ensure that software and operating systems (like Android) would eventually run natively on RISC-V.
    
-   **October 2023:** Qualcomm and Google announced they were co-developing a RISC-V-based Snapdragon Wear platform for future Wear OS smartwatches, marking the first time RISC-V was positioned as a “consumer-facing” application processor for Qualcomm.
    
-   **December 2023:** Qualcomm joined forces with Bosch, Infineon, Nordic, and NXP to form Quintauris, a joint venture designed to standardize and speed up RISC-V hardware development for the automotive and IoT sectors.
    
-   **December 2023**: By the end of 2023 Qualcomm had already shipped over one billion RISC-V cores hidden inside its various SoCs.
    

That’s a lot of cores and a lot of activity!

So how does the Ventana Micro Systems acquisition fit into this?

We first need to look at the story of Ventana as an independent company.

#### Ventana Micro Systems

Ventana Micro Systems was founded in 2018 by Balaji Baktha (CEO) and Greg Favor (Chief Architect). They are each high-performance CPU and semiconductor veterans with decades of experience building processor architectures and leading design teams, including work on early ARM and x86-derived CPUs, networking SoCs, and storage processor technologies. Baktha was founder & CEO of Veloce Technologies, which built a 64-bit ARM server CPU and was later acquired by AppliedMicro (AMCC). Favor was was a lead architect on Veloce’s 64-bit ARM CPU and architected the K6 x86 processor at NexGen which was then acquired by AMD.

Back in 2022 SemiAnalysis were [impressed](https://newsletter.semianalysis.com/p/ventana-risc-v-cpus-beating-next), commenting that of the RISC-V teams making high performance CPUs:

> Ventana may be the most impressive due to the team, go-to-market strategy, and performance. They are also the closest to a commercial product. Ventana says their core is targeting everything from datacenter to automotive to 5G Edge to AI, and even client, but we believe the most advantageous value propositions will be in datacenters, networks, and 5G DU/RU, at least for the first generation.

The first product announced at Ventana was the Veyron CPU.

Veyron means ‘glass’ or ‘green’ in French but I think the association it first brings to mind for many people (and was probably intended by the Ventana team) is this 250 mph beast.

[

![](https://substackcdn.com/image/fetch/$s_!O2W4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F643a0b0a-a9c8-4f47-9e32-dac749a3c2e0_1631x1080.jpeg)



](https://substackcdn.com/image/fetch/$s_!O2W4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F643a0b0a-a9c8-4f47-9e32-dac749a3c2e0_1631x1080.jpeg)
*Bugatti Veyron - By Axion23 - Red Bugatti Veyron from Symbolic Motors, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=33855643*

Ventana planned to deliver Veyron V1 as a ‘compute chiplet’ that could be integrated with designs from third parties and partners. Again, SemiAnalysis were very positive about this approach:

> Before we go into technical details, we want to highlight the strength of the go-to-market strategy. Ventana isn’t only targeting the crowded bog-standard general-purpose CPU market. Ventana is making CPU chiplets that can be integrated into general-purpose CPU markets and various heterogeneous computing use cases. Furthermore, Ventana does not make the IO Die, but partners with firms on them. This unlocks a very different integration and partnership strategy. IO dies can either be taken off the shelf from existing providers or cheaply developed with mostly licensed IO and NOC IPs.

[

![](https://substackcdn.com/image/fetch/$s_!F40A!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1145775-a1e8-44b3-a063-835e55d7bf40_2400x1340.jpeg)



](https://substackcdn.com/image/fetch/$s_!F40A!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1145775-a1e8-44b3-a063-835e55d7bf40_2400x1340.jpeg)

For much more technical background on Veyron V1, here is Ventana founder Greg Favor introducing Veyron V1 at Hot Chips 2023.

Chips and Cheese has a typically great post on Veyron V1.

[

![](https://substackcdn.com/image/fetch/$s_!2heg!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F579f5b72-95e6-43b5-b330-3ddb303bed9a_1280x1280.png)Chips and Cheese

Hot Chips 2023: Ventana’s Unconventional Veyron V1

The RISC-V scene has been heating up. SiFive’s designs have moved into higher power and performance envelopes. Alibaba’s T-HEAD division has been creating RISC-V chips in a bid to develop a viable line of indigenous server CPUs. Now, Ventana is joining the party with their Veyron V1 core. In this article, I’ll analyze Veyron V1’s design, and pay particu…

Read more

3 years ago · Chester Lam

](https://chipsandcheese.com/p/hot-chips-2023-ventanas-unconventional-veyron-v1?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

Whilst being positive about what Ventana had achieved:

> V1 has a set of very unique design decisions. Deviating from the norm is risky because engineers have figured out what works and what doesn’t over the history of CPU design. That’s why successful CPUs share a lot of common design features. Ventana looks to have done a reasonably good job of making sure they didn’t fall into any obvious holes.

Chips and Cheese ended up by noting some of the key limitations of V1 though (my emphasis):

> Ventana will have a much harder time on throughput bound applications. **V1 has no vector capability, and even if V2 does, the RISC-V ecosystem is even less mature than ARM’s.** Software will have to be written to support RISC-V’s vector extensions. There’s a ton of throughput bound software out there, from video encoders to renderers to image processing applications. They’re maintained by a lot of different people with different priorities, so new instruction set extension support tends to move slowly. ARM already faces a software support struggle as it tries to establish itself as a viable alternative to x86, and RISC-V faces an even greater challenge in that area.

Whilst Veyron V1 was an interesting effort it doesn’t seem to have led to actual customers. Ventana announced a couple of partnerships with Intel Foundry and Imagination Technologies but no public announcement of actual sales.

Ventana looked to deal with some of the limitations of Veyron V1 with [Veyron V2](https://www.ventanamicro.com/ventana-announces-2025-shipments-of-veyron-v2-platform-with-broad-market-adoption/) in 2025 crucially adding vector support and compliance with the RVA23 standard.

[

![](https://substackcdn.com/image/fetch/$s_!V_YO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd8a6443-00b1-4d32-a9b6-0be8d3595fae_1534x164.png)



](https://substackcdn.com/image/fetch/$s_!V_YO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd8a6443-00b1-4d32-a9b6-0be8d3595fae_1534x164.png)

Ventana [provided](https://www.ventanamicro.com/technology/risc-v-cpu-ip/) more details on Veyron V2 (and Veyron V3).

[

![](https://substackcdn.com/image/fetch/$s_!TmUF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F730f84d8-63f5-47bf-87db-2d9eb979865b_660x544.jpeg)



](https://substackcdn.com/image/fetch/$s_!TmUF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F730f84d8-63f5-47bf-87db-2d9eb979865b_660x544.jpeg)

[

![](https://substackcdn.com/image/fetch/$s_!4Pqg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37bef3f5-abb5-44fa-9a2e-bd6ef4adead0_1466x1098.jpeg)



](https://www.ventanamicro.com/technology/risc-v-cpu-ip/)

This all looked promising. The $64,000 question though was, would anyone buy it. Announcing Veyron V2 the company said:

> With commitments from leading hyperscalers and HPC customers in the Americas, Europe, and Asia, Ventana’s Veyron V2 platform is gaining traction as the industry’s most powerful scalable RISC-V compute platform.

The comment “commitments from leading Hyperscalers and HPC customers” sounds promising, but the who these customers are and the nature of their commitment is left unclear. “Gaining traction” is likewise vague. There seems to be no mention of an named actual customer on Ventana’s website or in its press releases.

So that’s the story of Ventana during its seven-year life: a promising high performance RISC-V architecture that, on the evidence, seems to have been struggling to achieve traction.

But why would Qualcomm want to acquire it?

[Read more](https://thechipletter.substack.com/p/qualcomms-risc-ventana-fusion)