---
title: "How AI Demand Is Driving a Multi-Year Memory Supercycle"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-10-01T18:29:42.000Z"
source_url: "https://www.viksnewsletter.com/p/how-ai-demand-is-driving-a-memory-supercycle"
word_count: 1558
estimated_read_time: 8
---

*Today’s post is a discussion on a **recent trend in semiconductor memory**. If you’re new, [start here](https://www.viksnewsletter.com/p/new-start-here)! On Sundays, I write deep-dive posts on critical semiconductor technology for the AI-age in an accessible manner for paid subscribers.*

*Deep-dives related to this post:*

-   *[Why is High Bandwidth Memory so Hard to Manufacture?](https://www.viksnewsletter.com/p/why-is-hbm-so-hard-to-manufacture)*
    
-   *[High Bandwidth Flash: NAND’s Bid for AI Memory](https://www.viksnewsletter.com/p/high-bandwidth-flash-nands-bid-for-ai)*
    

*New video posted on the YouTube channel:*

\---

In my recent guest post on the [AI Supremacy](https://www.ai-supremacy.com/) newsletter (I will crosspost the article on this newsletter in the future), I explained why whoever gains control of the HBM memory supply dominates the AI race. This is highly relevant to where we are in memory today. Check it out below (partially paywalled).

[

![](https://substackcdn.com/image/fetch/$s_!mF83!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fc548f8c4-823b-4a2a-b499-528f9a84cb5c_215x215.png)AI Supremacy

Why Memory Defines AI Hardware Supremacy

The 2020s: Models are getting cheaper and hardware is getting better, and many new datacenters are planned. So a bit of context…

Read more

2 months ago · 72 likes · 2 comments · Michael Spencer and Vikram Sekar

](https://www.ai-supremacy.com/p/why-memory-defines-ai-hardware-supremacy-hbm?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

AI’s insatiable demand for high performance memory along with other factors is creating demand across various parts of the AI infrastructure buildout. After 2023’s brutal dip in memory revenues primarily fueled by excess inventory, memory companies such as Micron, SK Hynix and Samsung are now in the driver’s seat and have increased DRAM prices by approximately 20%. NAND and SSD prices are higher too, by about 10%. With the release of [OpenAI’s Sora-2](https://openai.com/index/sora-2/) and [Meta’s Vibes](https://about.fb.com/news/2025/09/introducing-vibes-ai-videos/), the AI-generated video platform, the demand for NAND-based storage is set to skyrocket.

[

![](https://substackcdn.com/image/fetch/$s_!OD-X!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F051e9ba5-c955-410b-870a-e209ceb88a11_1368x763.png)



](https://substackcdn.com/image/fetch/$s_!OD-X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F051e9ba5-c955-410b-870a-e209ceb88a11_1368x763.png)
*Source: Yole Group.*

This has led to many people asking if we are now at the helm of a new “memory supercycle” where memory suppliers will see substantial revenue growth in the next 3-5 years. Let’s discuss various aspects of the recent memory market.

### The DDR4 Backflip

Without question, the rise of HBM has given new life to an otherwise commodity business that is memory. Since it is built from stacked DRAM chips (read the [HBM deep-dive](https://www.viksnewsletter.com/p/why-is-hbm-so-hard-to-manufacture?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) if you need a detailed explanation of how HBM is built), there is more incentive for memory makers to build DRAM for HBM rather than standalone DRAM because they can command a higher price.

Memory makers declared that DDR4 is end-of-life so that they could make room for production of DRAM for HBM instead. This led to DDR4 prices spiking over four-fold because OEMs who still use DDR4 in existing hardware rushed to buy as much supply as possible before they became unavailable. explains this best in his [greentext](https://en.wiktionary.org/wiki/greentext) style X post.

[

![](https://substackcdn.com/image/fetch/$s_!DSra!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F830e4f8c-9037-4ab4-816b-7cc739956ade_588x744.png)



](https://x.com/zephyr_z9/status/1967887157302866085)
*Source: Via [Zephyr](https://x.com/zephyr_z9/status/1967887157302866085), on X.*

### Battle for HBM4 Dominance

On the other hand, Samsung who were struggling with yield issues on HBM3E appear to have [finally passed qualification](https://www.tomshardware.com/tech-industry/samsung-earns-nvidias-certification-for-its-hbm3-memory-stock-jumps-5-percent-as-company-finally-catches-up-to-sk-hynix-and-micron-in-hbm3e-production) for use in NVIDIA systems. Since they were late on HBM3E, they likely missed NVIDIA orders in 2026 because SK Hynix and Micron were there first. AMD however [announced](https://www.kedglobal.com/korean-chipmakers/newsView/ked202506130004) a few months ago that they are using Samsung’s HBM3E in the MI350 accelerator platform. But just as Samsung cleared this HBM3E hurdle, SK Hynix announces [readiness of HBM4](https://news.skhynix.com/sk-hynix-completes-worlds-first-hbm4-development-and-readies-mass-production/) for mass production.

HBM is already a very expensive type of memory; HBM4 will only be more so and establishing dominance in the market is a key priority for a memory maker. As we discussed in an [earlier deep-dive](https://www.viksnewsletter.com/p/why-is-hbm-so-hard-to-manufacture?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false), SK Hynix’s use of MRMUF for underfill in the DRAM stack provides distinct advantages over its competitors. Plus, they nailed the performance. While the JEDEC spec only requires a data rate of 8 Gbps/pin, SK Hynix demonstrated production-ready speeds of 10 Gbps/pin because their base die is likely built on a true logic node such as [TSMC’s 5nm](https://www.tomshardware.com/pc-components/gpus/tsmc-to-build-base-dies-for-hbm4-memory-on-its-12nm-and-5nm-nodes).

[

![](https://substackcdn.com/image/fetch/$s_!N9yx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61bb3120-c2dc-4192-b8e3-9a53b8c8f2e9_726x261.png)



](https://substackcdn.com/image/fetch/$s_!N9yx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61bb3120-c2dc-4192-b8e3-9a53b8c8f2e9_726x261.png)
*Image credit: SK Hynix.*

This has thrown a wrench in Micron’s bid for HBM4 dominance.

Micron has reportedly been sampling HBM4 to customers with a 9 Gbps/pin data rate, but the bar is being raised in the industry with buyers like NVIDIA demanding 11 Gbps/pin data rates. Seemingly, Micron has a problem now although they claim in their recent earnings call that their HBM provides stellar performance.

They use an in-house memory node, the 1-beta which is a 10nm class node, in the base die for HBM, instead of a true logic node like 5nm. Up until even HBM3E, it is common practice to use memory nodes to design the base die to handle all the interconnect PHY.

While cheaper, memory nodes do not have the fastest transistors and as a consequence pushing to higher pin data rates is harder. The folly of this approach is seemingly remedied in HBM4E because [Micron has announced that they are working with TSMC](https://www.tomshardware.com/micron-hands-tsmc-the-keys-to-hbm4e) for their base die. Also, read Irrational Analysis’ [discussion of Micron’s earnings call](https://open.substack.com/pub/irrationalanalysis/p/micron-fq4-2025-meethinks-youssa?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false).

Is a 5nm logic node required in the base die just to push past the 10-11 Gbps mark, while the 1-beta memory node reportedly delivers 9 Gbps already? *Something does not add up here*. Going to a transistor node like 5nm that is built for speed should give much more performance benefit. If you’re an experienced PHY designer, reply and let me know. There are other benefits to going to a true logic node for base die which we won’t get into here.

### High Capacity Storage

The rise of AI video slop is going to cause an explosive growth in the need for high capacity storage devices - primarily NAND flash. Sandisk () has already seen its stock price skyrocket this year (250% up YTD) and this is even before the demand for high capacity storage has even taken off.

We will discuss the need for data storage and a few other factors driving demand after the paywall.

A lot of data such as backups, archives and large files such as AI-generated video is stored in what are called *nearline* hard disk drives (HDDs). Nearline is something between offline and fully online; “warm” data that is available with reasonable latency when necessary.

Ever since the memory market slowdown in 2023, HDD manufacturers have been cautious to ramp up production. With the sudden surge of data in AI applications, [HDDs are now facing a supply chain shortage](https://www.eenewseurope.com/en/ai-inference-surge-creates-nearline-hdd-shortages-ssds-poised-to-benefit/) with lead times up to one full year, with price hikes burned in (pardon the pun).

This has opened up an unique opportunity for embedded solid state drives (eSSDs) which provide some unique advantages in nearline applications. They are denser, have a smaller footprint, generate less heat, consume ~30% lower power, and generally have better endurance. They are still several times costlier per GB compared to HDDs but with production shortages, SSD upgrades are a better long-term bet given their faster access times.

[

![](https://substackcdn.com/image/fetch/$s_!z-yq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae7208dc-cea2-4730-a81f-aa4d1da89f5d_451x130.png)



](https://substackcdn.com/image/fetch/$s_!z-yq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae7208dc-cea2-4730-a81f-aa4d1da89f5d_451x130.png)

*Short aside*: It is tragic that Intel wound down their Optane division a *mere six months* before the launch of ChatGPT. Optane was built on phase change material (PCM) technology (see [earlier post about PCM RF switches](https://www.viksnewsletter.com/p/is-pcm-the-future-of-rf-switch-technology)) and unlike NAND memory was very well suited to small, random read/write operations like system RAM - a familiar workload in AI inference - but with much higher capacity. In addition, it was blazingly fast compared to even the best SSDs in the market today with incredible write endurance. This topic really deserves its own post.

[

![A bar chart comparing sustained 4KB random read data rates of various storage devices in MB/s. Bars represent Intel Optane SSD 905P 1.5TB, SK hynix Gold P31 1TB, ADATA XPG SX8200 Pro 1TB, Kingston KC2500 1TB, Samsung 970 PRO 1TB, Samsung 970 EVO Plus 1TB, Samsung 980 PRO 1TB, Seagate FireCuda 520 1TB, and WD Black SN750 1TB. The chart includes numerical values for each device, with Intel Optane SSD 905P 1.5TB showing the highest rate at 669.8 MB/s.](https://substackcdn.com/image/fetch/$s_!oQrz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F706af7f0-4130-4ee9-b398-e1ae62edcb30_650x430.png "A bar chart comparing sustained 4KB random read data rates of various storage devices in MB/s. Bars represent Intel Optane SSD 905P 1.5TB, SK hynix Gold P31 1TB, ADATA XPG SX8200 Pro 1TB, Kingston KC2500 1TB, Samsung 970 PRO 1TB, Samsung 970 EVO Plus 1TB, Samsung 980 PRO 1TB, Seagate FireCuda 520 1TB, and WD Black SN750 1TB. The chart includes numerical values for each device, with Intel Optane SSD 905P 1.5TB showing the highest rate at 669.8 MB/s.")



](https://substackcdn.com/image/fetch/$s_!oQrz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F706af7f0-4130-4ee9-b398-e1ae62edcb30_650x430.png)
*Source: Via [LaurieWired](https://x.com/lauriewired/status/1963668400670138492), on X.*

For AI applications in particular, quad-level cell (QLC) NAND flash appears particularly attractive due to its lower cost and high storage density at the cost of durability and write lifespan compared to its triple level equivalent (TLC). This makes QLC-based NAND flash uniquely positioned to benefit from the upcoming demand surge in CSPs and AI hyperscalers.

For example, SK Hynix’s state-of-the-art 321-layer 2Tb QLC NAND flash has already [entered mass production](https://news.skhynix.com/sk-hynix-begins-mass-production-of-321-layer-qlc-nand-flash/) and is expected to release in the first half of 2026. Sandisk announced their [UltraQLC based SSDs](https://www.sandisk.com/en-in/company/newsroom/blogs/2025/inside-ultraqlc-the-enterprise-ssd-platform-engineered-for-ai) recently which is 256 TB (yes, TeraBytes!) of data in a single drive; perfect for infinite AI video slop. In comparison, the largest HDD available for CSPs is the Seagate Exos M which provides a “mere” 36 TB.

[

![This is the SanDisk UltraQLC 256TB NVMe SSD(SanDisk )](https://substackcdn.com/image/fetch/$s_!Vtwo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fedb6869d-b710-4a87-b2e5-31d845a689d4_549x309.jpeg "This is the SanDisk UltraQLC 256TB NVMe SSD(SanDisk )")



](https://substackcdn.com/image/fetch/$s_!Vtwo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fedb6869d-b710-4a87-b2e5-31d845a689d4_549x309.jpeg)
*Sandisk’s UltraQLC SSD that holds 256 TB of data. Source: Sandisk.*

There is always concern about endurance when it comes to QLC based SSDs. But at that level of storage density, power savings, and considering that HDDs are not reliable to begin with due to mechanically moving parts, its safe to say that SSDs in CSPs and hyperscalers are here to stay - QLC or otherwise.

### Closing Thought

In the face of demand exceeding supply in an impending memory supercycle, a rising tide lifts all boats. But maybe some more than others.

Samsung and Micron may have their trip-ups when it comes to HBM4; Samsung with their [yield issues](https://www.digitimes.com/news/a20250923PD223/samsung-hbm4-sk-hynix-nvidia-dram.html) in HBM4 and Micron with technology choices in the base die, but SK Hynix does presently appear to hold a strong position in HBM. As with previous generations of HBM, there will be a constant struggle to take up market share with major hyperscalers. Given the ASP of HBM and scale of capex expenditures still underway, it will be the predominant factor that determines who comes out ahead in this memory supercycle - something to watch out for.

NAND storage is going to take centerstage because all that video generation needs to be stored somewhere. HDDs are not going away either because we need all the storage we can get. YouTube contains an estimated 50 Exabytes of data (1 Exabyte = 1 million TB) over about 20 years. Imagine what a billion users generating AI video will look like!

\---

Thanks for reading Vik's Newsletter! Please feel free to share it.