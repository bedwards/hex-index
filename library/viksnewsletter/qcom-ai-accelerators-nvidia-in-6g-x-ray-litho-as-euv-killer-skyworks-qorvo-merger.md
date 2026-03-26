---
title: "QCOM AI Accelerators, NVIDIA in 6G, X-Ray Litho as EUV Killer?, Skyworks-Qorvo Merger"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-10-31T18:37:01.000Z"
source_url: "https://www.viksnewsletter.com/p/qcom-ai-accelerators-nvidia-in-6g"
word_count: 1526
estimated_read_time: 8
---

*The last few weeks have been action packed in semi! Summary of content published in this newsletter this past month. If you’re new, [start here](https://www.viksnewsletter.com/p/new-start-here)!*

\---

October has been a crazy month in the semis! Nvidia is now a $5T company, after hitting the $4T mark just 3 months ago, and according to [BBC news](https://www.bbc.com/news/articles/cp8e970vn5vo):

> Nvidia’s value now exceeds the GDP of every country except the US and China, according to data from the World Bank, and is higher than entire sectors of the S&P 500.

A [quick check](https://www.worldometers.info/gdp/gdp-by-country/) indicates that this is indeed true! There have also been so many circular AI financing deals that I’ve lost track, and won’t mention it. I just get the feeling that everyone is betting on everyone else’s horse at the same time. In other news, Amazon laid of tens of thousands of workers, and seemingly all from the corporate sector and not warehousing. While strictly *not* semi news, I only mention it because there are [theories online](https://natesnewsletter.substack.com/p/amazon-just-laid-off-30000-peoplebut) that the layoffs are to fund GPU purchases; aka “Trading talent for GPUs.” Whatever the reason, that’s a lot of people out of a job and I feel for them.

Now let’s get to four stories that really got my attention this month.

### Qualcomm enters AI datacenter market for inference

This month [Qualcomm announced their AI200 and AI250 rack-scale accelerators for AI inference](https://www.qualcomm.com/news/releases/2025/10/qualcomm-unveils-ai200-and-ai250-redefining-rack-scale-data-cent) - a bid to enter the AI market. Given that Qualcomm has high-end Arm CPUs at its disposal and Hexagon NPU cores for AI workloads, it seems entirely reasonable to try and piece together a portion of the datacenter market. Wall street seemingly liked the news, with jumping over 15% on the announcement. Interestingly, they also have a customer lined up; [Humain AI from the Kingdom of Saudi Arabia is targeting 200MW of AI inference racks from Qualcomm](https://www.qualcomm.com/news/releases/2025/10/humain-and-qualcomm-to-deploy-ai-infrastructure-in-saudi-arabia-). At an estimated 160W per AI200 rack, we are looking at 1,250 racks to be delivered to Humain AI in the next few years.

What was missing from the announcement was any sort of technical specs on what these racks are capable of. It is estimated that the system uses LPDDR memory and not HBM. The mention of near-memory compute and 10x memory bandwidth claim is reminiscent of what [d-Matrix is doing in their Pavehawk platform](https://www.d-matrix.ai/scaling-ai-inference-with-3dimc/). But, [The Next Platform has pieced together](https://www.nextplatform.com/2025/10/28/how-qualcomm-can-compete-with-nvidia-for-datacenter-ai-inference/) what they think are the specifications based on previously available data.

[

![](https://substackcdn.com/image/fetch/$s_!OtPy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F430cb00c-a213-4ef4-a7be-e4b0b1fbf2b7_1062x390.jpeg)



](https://substackcdn.com/image/fetch/$s_!OtPy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F430cb00c-a213-4ef4-a7be-e4b0b1fbf2b7_1062x390.jpeg)
*Source: The Next Platform*

Just a day before the writing of this post, a team at UCSD [published some benchmarks](https://arxiv.org/pdf/2507.00418) on Qualcomm’s earlier generation AI 100 Ultra (QAic) chips versus Nvidia’s “Ampere” series A100s. The power consumption was an order of magnitude lower, but the tokens/s delivered on inference is actually very slow. The AI 100 Ultra seemingly works only for lower end, highly power constrained AI applications that do not place an impetus on performance. I will refrain from saying anything more even though I have no information other than what is publicly available because of my fear of legal pitchforks. 🔱

[

![](https://substackcdn.com/image/fetch/$s_!zEUf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F909d77a8-e5e3-4ebd-96bc-0dc81561514a_2000x928.png)



](https://substackcdn.com/image/fetch/$s_!zEUf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F909d77a8-e5e3-4ebd-96bc-0dc81561514a_2000x928.png)
*Source: UCSD*

### Nvidia + Nokia to work on 6G and AI networks

In the light of Qualcomm’s entry into datacenters, Nvidia’s foray into telecommunications is just a strange turn of events to me.

[

![](https://substackcdn.com/image/fetch/$s_!dcxq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb562b9e-b0ab-455b-bea5-b2eb99cd811b_1166x268.png)



](https://x.com/vikramskr/status/1983362636730495402)
*From X.*

At a recent conference, Nvidia announced that they are investing $1B in Nokia and announced a partnership to provide chips for AI-enabled Radio Access Networks (RAN) for 5G Advanced and 6G. From [Nvidia’s press release](https://nvidianews.nvidia.com/news/nvidia-nokia-ai-telecommunications) (emphasis mine):

> The partnership **marks the beginning of the AI-native wireless era**, providing the foundation to support AI-powered consumer experiences and enterprise services at the edge.

Seemingly Nvidia has no reason to stop at datacenters. Instead, they’re proliferating into everything they can lay their hands on including wireless networks and edge devices. Specifically, Nvidia is introducing the AI-RAN Computer Pro (ARC-Pro) which is (again, emphasis mine):

> … a 6G-ready accelerated computing platform that combines connectivity, computing and sensing capabilities, **enabling telcos to move from 5G-Advanced to 6G through software upgrades**.

The highlighted part - if really true - is a big deal. A big part of the hesitation in moving to newer generations of wireless technology is the need for new hardware - something that telecom providers are weary of doing. With an AI-enabled approach that allows the transition from to 5G to 6G “through software upgrades” is an interesting proposition, although I don’t understand how it would work when new wireless frequencies are involved. I guess we have to wait and see.

### X-Ray Lithography as an EUV Killer?

This is a big one. I am writing a bigger piece on this that will out shortly. [Substrate](https://substrate.com/) is a company based in San Francisco that has recently come out of stealth with preliminary demos that they can use X-ray lithography to pattern features that are representative of 2nm nodes with single patterning, and **at a fraction of the cost**!

[

![](https://substackcdn.com/image/fetch/$s_!DXP8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc9fef46-b5b5-44eb-949f-5e89231080fe_5264x4628.webp)



](https://substackcdn.com/image/fetch/$s_!DXP8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc9fef46-b5b5-44eb-949f-5e89231080fe_5264x4628.webp)
*Random logic contact array of 12 nm critical dimensions and 13 nm tip-to-tip spacing printed with high pattern fidelity. Source: Substrate.*

X-rays have a wavelength lower than extreme ultraviolet (EUV) and can in theory print finer features than EUV. The idea itself isn’t new either - X-ray lithography was proposed in the 1980s, but due to a variety of technological and economic shifts, it is possible today. Whether it can be delivered at scale is yet to be seen.

If true, this signifies a massive shift in the global semiconductor industry because Substrate [can kill 2 monopolies with 1 tool](https://newsletter.semianalysis.com/p/how-to-kill-2-monopolies-with-1-tool?_gl=1*15134n*_ga*Njc4MTA5MzQ3LjE3NTYyMjM0MDQ.*_ga_FKWNM9FBZ3*czE3NjE5MzE0MjUkbzI4JGcwJHQxNzYxOTMxNDI1JGo2MCRsMCRoOTUxMDc0MjAw) (TSMC and ASML). Modern advanced EUV machines cost up to half a billion dollars each. If the same patterning can be done with American technology at 1/10 the cost, it suddenly opens up the opportunity to build multiple advanced node manufacturing facilities within the US. Re-shoring chip manufacturing has been an American priority ever since US handed ASML the keys to the EUV kingdom when they approved the sale of Silicon Valley Group. Substrate and its technology represents a unique opportunity to reclaim the throne.

### Skyworks-Qorvo Merger

In all the AI mania, this one is easy to miss, but a very important event in the world of RF/analog.

[Skyworks announced it will acquire Qorvo](https://investors.skyworksinc.com/news-releases/news-release-details/skyworks-and-qorvo-combine-create-22-billion-us-based-leader) in a $22 billion cash-and-stock deal, combining two of the largest U.S. suppliers of radio frequency (RF) front-end chips. The deal is expected to close in early 2027, pending regulatory approvals.

The combined company will control significant market share in RF front-end components for mobile devices. Both companies supply RF chips to Apple, Samsung, and other major smartphone makers. The strategic logic is straightforward: achieve greater scale, reduce overlap, and create a stronger competitor against Qualcomm and Broadcom.

The bigger question is regulatory approval. The deal will face scrutiny from the FTC in the U.S. and potentially from Chinese regulators given both companies’ presence in the Chinese market. Combining two major RF suppliers raises concentration concerns.

For the RF industry, this merger reflects a maturing market facing slower growth and intensifying competition. The smartphone market is no longer growing at double-digit rates. 5G deployment is largely complete in developed markets. The next major opportunity is 6G, which won’t arrive until the end of the decade.

In this environment, consolidation to achieve scale and efficiency makes strategic sense, even if it comes with execution risk and regulatory uncertainty.

\---

### Content this Month on Vik’s Newsletter

One common feedback that I’ve received over the ~2 years I’ve been writing this publication is that people don’t end up reading long technical posts due to lack of time. I get it, I’ve been there. When they do read, readers also (successfully) use LLMs to fill their gaps in understanding. This is great, but I think I can help.

**As an exclusive benefit for paid subscribers, I have ways to save you time:**

-   Extra “Executive Brief” post containing the most important points from the long form article - more business-centric, less educational content.
    
-   Video explanations of the post if you prefer to watch or listen while you work.
    
-   Starting next month, link to a google doc of the post that you can use your favorite LLM on and your unique prompt style to parse my long form posts.
    

A short poll that I took with paid subscribers indicated that they like the “Executive Brief” idea. But if you find the video unnecessary or hard to understand, or have just about any feedback, please reply to any email and let me know. I’m constantly tweaking my delivery formats to make it most useful to you.

\---

In case you’ve missed it, here is all the content published in the month of October.

-   [How AI Demand Is Driving a Multi-Year Memory Supercycle](https://www.viksnewsletter.com/p/how-ai-demand-is-driving-a-memory-supercycle)
    
-   [Why Faster PHY Design is the Low-Hanging Fruit in Custom HBM4 Base Die](https://www.viksnewsletter.com/p/faster-phy-design-in-custom-hbm)
    
-   [When Semiconductor Manufacturing Went East and Chip Design Followed](https://www.viksnewsletter.com/p/when-chip-design-goes-east)
    
-   [Why Memory Defines AI Hardware Supremacy](https://www.viksnewsletter.com/cp/175807250)
    
-   [A Practical Roadmap to AI Fluency for Hardware Designers](https://www.viksnewsletter.com/p/a-practical-roadmap-to-ai-fluency)
    
-   [Role of Storage in AI, Primer on NAND Flash, and Deep-Dive into QLC SSDs](https://www.viksnewsletter.com/p/role-of-storage-in-ai-primer-on-nand) - **Condensed version**: [Executive Brief](https://www.viksnewsletter.com/p/executive-summary-role-of-storage?r=222kot)
    
-   [The Boring Chips That Brought Europe to Its Knees](https://www.viksnewsletter.com/p/boring-chips-that-broke-europe) - **Condensed version**: [Executive Brief](https://www.viksnewsletter.com/p/executive-brief-the-boring-chips?r=222kot)
    

#### YouTube Videos

-   [If we built silicon chips like supersonic jets …](https://youtu.be/gomDHi7dMSM)
    
-   [How flash memory actually works (its insane)](https://youtu.be/5iD6m_7fqd8)
    

Thanks for reading Vik's Newsletter! This post is public so feel free to share it.