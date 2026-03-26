---
title: "Is Optics Really the Next Memory?"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-12-01T02:36:35.000Z"
source_url: "https://www.viksnewsletter.com/p/is-optics-really-the-next-memory"
word_count: 1720
estimated_read_time: 9
---

I feel like this past month has been about everybody plotting Nvidia’s downfall. From Michael Burry’s short position in Nvidia and his comparison to Cisco’s rise and fall in the dotcom era — to Google’s TPUv7 announcement that is giving Nvidia the jitters. This SemiAnalysis cartoon sums up the latter nicely!

[

![Image](https://substackcdn.com/image/fetch/$s_!_tPg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F807c48bf-c88b-4032-a08e-e185495c9aec_1024x559.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!_tPg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F807c48bf-c88b-4032-a08e-e185495c9aec_1024x559.jpeg)
*Source: SemiAnalysis*

There has been plenty of online discussion about these aspects and I see no point in repeating what everyone else is saying. To be frank, I don’t have much of a take on all this at the moment and I am happy to just stand by and watch the drama unfold.

In this short post, I want briefly expand on the thoughts behind my recent viral social media post about optics, and do deeper dives on related topics in the future.

But first…

\---

### ICYMI

Here is a quick summary of published content on this newsletter in the past month in case you’ve missed it. Quite a lot of you have purchased a paid subscription recently. Thank you for your support - it helps me keep working hard on these posts.

-   [An In-Depth Look at the Viability of X-rays as an Alternative to EUV Lithography](https://www.viksnewsletter.com/p/an-in-depth-look-at-the-viability): Substrate - a California startup wants to take down both TSMC and ASML using X-rays to pattern leading edge nodes below 2nm. But how viable is their technology? (along with [video essay, summary and downloadable article](https://www.viksnewsletter.com/p/video-essay-xrl-substrate?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false))
    
-   [Why Co-Packaged Optics Uses External Lasers Instead of Integrated Sources](https://www.viksnewsletter.com/p/why-cpo-uses-external-lasers): On-chip lasers for CPO are the holy grail, but a near-term pragmatic approach is to keep lasers external for thermals and reliability. A look at the physics, implementation, and solutions. (along with [video essay, summary and downloadable article](https://www.viksnewsletter.com/p/executive-brief-why-co-packaged-optics))
    
-   [The Four Horsemen of the AI Infrastructure Buildout](https://www.viksnewsletter.com/p/the-four-horsemen-of-ai-infra): What can go wrong and how likely is it to happen? (**fully free**)
    
-   [A Complete Guide to Optical Transceiver Nomenclature](https://www.viksnewsletter.com/p/a-complete-guide-to-optical-transceiver-nomenclature): Decoding the alphabet soup of form factors, reach classifications, modulation schemes, and everything in between. (along with [video essay, summary tables of information, additional reading, and downloadable article](https://www.viksnewsletter.com/p/executive-brief-a-complete-guide)).
    

I’m starting to get some YouTube content off the ground; join me in my adventure.

\---

An off-the-dome tweet I wrote last week garnered much more attention than I expected, accumulating over half a million impressions.

[

![](https://substackcdn.com/image/fetch/$s_!m4N7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F057615f1-d024-4ff9-83f7-2d051d3c19a8_1160x272.png)



](https://x.com/vikramskr/status/1992537949708431638?s=20)

Interestingly, a lot of the comments seemed to indicate that I’m stating the obvious. My tweet was solely based on a “vibe check” from all the optics content I have been researching and writing - in a purely technical sense.

I don’t track individual companies usually but on this occasion, it serves as a useful lens through which to understand underlying trends. As always, I don’t give investment advice and only use stock prices as a barometer for technical areas of interest - so nothing I am about to say should be construed as such.

Lumentum Inc. () - a provider of lasers for optical transceivers - is a prime example of a company whose stock has produced outsized returns recently. To those who track this kind of stuff, this is not news. To everybody else, this signals increased interest in the domain of optics.

[

![](https://substackcdn.com/image/fetch/$s_!WK-0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c371bdb-1213-4e11-8137-4e114a60101a_1136x636.png)



](https://substackcdn.com/image/fetch/$s_!WK-0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c371bdb-1213-4e11-8137-4e114a60101a_1136x636.png)
*6 month history of Lumentum stock (LITE)*

But does this really mean that optics companies will see the kind of growth memory providers have seen of late? If you’re asking, “What memory growth?" that’s okay, I’ll give you a brief rundown next. I have also written a [whole post](https://www.viksnewsletter.com/p/how-ai-demand-is-driving-a-memory-supercycle?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) on this that you can read.

### The Memory Supercycle: A Very Short Summary

The need for HBM is acute these days with Nvidia’s dominance and now Google TPU in the mix, and future generations of accelerators need increasing amounts of HBM to improve the AI experience. For example, the Vera-Rubin Ultra will have 1 TB of HBM4e. It’s safe to say that Google TPUs will also consume more HBM, although less so compared to Nvidia GPUs due to their systolic architecture. This extreme demand for HBM means that memory manufacturers prioritize DRAM for HBM over all else because they are high margin products. All other forms of DRAM such as those used in phones (LPDDR) or in gaming hardware (GDDR) now face a supply shortage. The rising demand means that companies like Samsung can [hike up their prices by 60%](https://www.reuters.com/world/china/samsung-hikes-memory-chip-prices-by-up-60-shortage-worsens-sources-say-2025-11-14/).

Then there is the need for storage. HDDs and SSDs are required for massive datacenter buildouts. But since the storage industry downturn in 2023, manufacturers have been shy of boosting production which now means that HDDs have [lead times of up to 2 years](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds). The alternative is to use solid-state drives at a higher price per TB. QLC SSDs are a great option for warm tier storage and is also rising in demand because they have massive capacities - even better than HDDs.

All of this has lead to a massive boost to revenues of memory and storage manufacturers. SanDisk , for example, has seen its stock price go up from $50 to $285 in a matter of months. The main driver of the memory supercycle is demand far exceeding supply.

Now, lets turn to the optics industry because my original tweet is vague regarding how optics and memory are related. The optics world is not based on a short-term demand for a high value product like HBM. It’s more the case of how the rising AI tide is lifting all boats; optics more so.

### Interconnects are AI’s Nervous System

Since neural networks underlie all AI compute, the way they are networked surely makes interconnects AI’s nervous system. Superficial analogies aside, it is becoming increasingly difficult to make the brains of AI bigger by adding more GPUs. Scale up in a single rack is becoming power, size, and cooling limited, and interconnects bottleneck everything. They simply need to get faster at all levels to keep scaling hardware performance.

Nature limits copper’s reach as data rates get faster. Active electrical cables overcome a lot of these limitations by fighting physics with equalization, amplification, and error correction. As we move into 1.6 Tbps and 3.2 Tbps interconnect speeds, optics increasingly looks like the only option (other fancy and interesting approaches also exist - like [plastic tubes](https://www.viksnewsletter.com/p/plastic-cables-for-ai-clusters-etube?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) - whose widespread adoption remains an open question).

The complete optical ecosystem requires much more: lasers, detectors, drivers and amplifiers, fiber, connectors, transceivers, and entire system-level solutions. As the need for speed grows, every player in this ecosystem stands to benefit. The only open question that remains is when, not if, we will start to see the increasing shift towards optics as the dominant interconnect solution in datacenters.

Let’s go back and look at Lumentum - a notable player in the optics/photonics market.

### A Closer Look at Lumentum

Lumentum had a Q1 2025 revenue of $533 million - the highest earning quarter in the company’s history and up 58% YoY, and is expected to generate $630-$670 million in the next one. Most of this success came from laser sources for datacenter applications, and more specifically from their [100G per-lane electro-absorption externally modulated laser (EML)](https://www.lumentum.com/en/products/eml-100g-pam4-cwdm-laser) for 800G interconnects. The [200G version](https://www.lumentum.com/en/products/eml-200g-pam4-cwdm-laser) of the EML laser is starting to ramp for 1.6 Tbps optical interconnects and is expected to occupy an increasing amount of revenue in 2026.

At the heart of Lumentum’s EMLs are Indium Phosphide (InP) lasers built on their proprietary InP process, on 3 or 4 inch diameter wafers. It is generally understood that InP yields are not that great, even if actual numbers are difficult to come by. Additionally, supply constraints on InP-based continuous wave (CW) and EML lasers have been a concern as interconnect speeds look to scale to 1.6 Tbps in datacenters. From Lumentum’s earnings call earlier this month (emphasis mine),

> I think in our last call, we talked about being sold out. That is absolutely the case. The demand far exceeds even as we continue to add laser capacity, **demand is far outstripping our ability to supply**. And so our challenge right now is making these allocation decisions. We’re trying to **allocate the capacity to the highest dollar value components** we have and the highest margin components … **And that in order is 200-gig EMLs, 100-gig EMLs and then CW lasers** for internal consumption.

To be clear, this is a Lumentum-specific “problem” of being sold out on the EML laser front, and not a industry-wide phenomenon like memory shortage. Their CEO, Michael Hurlston, in the recent earnings call said that they have started culling customers so that they can focus their efforts on supplying lasers to only those who matter to them.

> … **we’re actually probably shedding customers rather than adding**. We’re trying to make our bets on the folks that we think are going to be good partners. We’ve gone out and worked a series of long-term agreements and the folks that are willing to step up and help us, we really want to help them.

Lumentum’s optical circuit switch (OCS) is another interesting product that has recently spiked investor interest because Google’s TPU pods are hooked up together using MEMS-based optical switches that eliminate optical-electrical-optical conversion. The analyst firm Mizuho is [especially bullish](https://seekingalpha.com/news/4526305-googles-chips-for-meta-a-positive-for-broadcom-bullish-on-lumentum-and-micron-mizuho) on Lumentum being a key supplier of OCS if Google TPU starts to ramp, although there is limited evidence that there is a partnership between these two companies.

### So, is Optics the Next Memory?

Yes and no. The memory supercycle is a supply crunch on a single high-margin product. Optics is different. It’s not about one component in short supply. It’s a structural shift in how datacenters move data as electrical interconnects hit their physical limits. Their only similarity might lie in surging stock prices, which is still a strong signal to pay attention to.

Lumentum’s sold-out EML lasers are a symptom and just one layer in the optical stack. One company being sold out doesn’t make a supercycle. If laser supply is already strained at 800G and 1.6T, the rest of the ecosystem including detectors, connectors, modulators, and fibers, will need to scale in lockstep. We’ll need to watch the rest of the supply chain and other competitors in the space to see if this is a leading indicator.

\---

***Quick note***: *I’ll be attending the 2025 International Electron Devices Meeting (IEDM) in SF next week. If you’ll be there, it would be great to connect!*

*Thanks for reading Vik's Newsletter! This post is public so feel free to share it.*