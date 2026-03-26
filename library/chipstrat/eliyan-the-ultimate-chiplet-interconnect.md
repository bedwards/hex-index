---
title: "Eliyan: The Ultimate Chiplet Interconnect"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-08-15T17:09:56.000Z"
source_url: "https://www.chipstrat.com/p/eliyan-the-ultimate-chiplet-interconnect"
word_count: 1694
estimated_read_time: 9
---

It’s been a while since we checked in on semiconductor startups, but they remain one of the best ways to glimpse the industry’s future. What problems are they solving, and what clever approaches are they taking?

With connectivity stocks running hot ( etc ), it’s a good time to spotlight **[Eliyan](https://eliyan.com/).**

[

![](https://substackcdn.com/image/fetch/$s_!UrfF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff37bf2a7-d907-4e05-ab9c-9c12e36498cc_1536x1000.jpeg)



](https://substackcdn.com/image/fetch/$s_!UrfF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff37bf2a7-d907-4e05-ab9c-9c12e36498cc_1536x1000.jpeg)
*Eliyan founding team. Syrus Ziai, Ramin Farjadrad, and Patrick Soheili*

And here’s a fun segue to introduce Eliyan’s CEO Ramin Farjadrad.

## Ramin Farjadrad’s Story

Just yesterday, Infineon [announced](https://www.infineon.com/press-release/2025/INFXX202508-133) it completed the acquisition of Marvell's Automotive Ethernet business for $2.5B. This particular line of business has roots back in Marvell’s [2019 acquisition of Aquantia](https://www.marvell.com/company/newsroom/marvell-completes-acquisition-of-aquantia.html) for $450M. *That’s a nice 5x flip btw!*

[Aquantia](https://en.wikipedia.org/wiki/Aquantia_Corporation) pioneered multi-gigabit Ethernet solutions that became IEEE standards and helped drive the company to a successful IPO before the acquisition. **And Aquantia was co-founded by none other than Eliyan co-founder [Ramin Farjadrad](https://www.linkedin.com/in/ramin-farjadrad-785671/).**

Here’s a fun video of Ramin at Aquantia talking about lessons learned as a serial technology entrepreneur from back in 2016:

Ramin earned his Ph.D. in Electrical Engineering from Stanford, where he developed one of the first gigabit transceivers built entirely in CMOS. At the time, such high-speed links were almost exclusively made in exotic processes like GaAs. Farjadrad pushed performance from 1 Gbps to 10 Gbps, proving that mainstream CMOS could deliver multi-gigabit signaling without the cost or complexity of mixed-process designs.

Check out his May 2000 paper [A 0.3-um CMOS 8-Gb/s 4-PAM Serial Link Transceiver](http://smirc.stanford.edu/papers/JSSC00MAY-ramin.pdf)*:*

[

![](https://substackcdn.com/image/fetch/$s_!Up7g!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1afb79e9-7a84-4cce-b51e-268c61f1270f_1454x840.png)



](https://substackcdn.com/image/fetch/$s_!Up7g!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1afb79e9-7a84-4cce-b51e-268c61f1270f_1454x840.png)
**Pioneering technology that would underpin high-speed networking for decades to come!**

After Stanford, Ramin founded [Velio Communications](https://pitchbook.com/profiles/company/42934-69) to commercialize multi-gigabit SerDes for terabit-class optical switches, aiming to solve long-haul and WAN interconnect bottlenecks during the early internet buildout. The company secured substantial pre-orders of roughly $500 million from Nortel and Lucent, but the 2001 optical market crash caused demand to collapse almost overnight, ultimately forcing a sale of [some assets to Rambus](https://investor.rambus.com/press-releases/press-release-details/2003/Rambus-to-Acquire-Serial-Interface-Assets-of-Velio-Communications-Inc-Agreement-Expands-Offering-of-High-Speed-Signaling-Technologies/default.aspx) and the [rest of the compay to LSI](https://www.wsj.com/articles/SB108016906309264722?gaa_at=eafs&gaa_n=ASWzDAhQLSEnzj8ZoXTtVVRTzb94X3IP-W2Hlcr268Ic3w2mPev72JUehW8tdDI1Wos%3D&gaa_ts=689df95f&gaa_sig=0MdrpXtw8Z5sZOqzCjMwgSJXY61S26dTURB0Wk_h7vDSS0kuOOf7EeypgDhaWSwI_GM90K3Jq8E4LX6dPY5QPQ%3D%3D). In the YouTube video above, Ramin mentions how the experience underscored the risks of overconcentration in a single vertical and the importance of maintaining roadmap diversification.

Ramin went on to found [Aquantia](https://en.wikipedia.org/wiki/Aquantia_Corporation) with the goal of leapfrogging the industry in 10 Gbps Ethernet over twisted-pair copper (10GBASE-T) at a fraction of the cost of optical modules. The company solved the technical barrier by reducing per-port PHY power from roughly 15 watts to under 5 watts, enabling deployment in high-density switches and servers. Importantly, they focused on commodity-friendly infrastructure, using standard connectors and unshielded Cat-5/6 cabling to allow simple, low-cost installation without the complexity of fiber handling. This approach secured Cisco design wins and established Aquantia as the leader in low-power 10GBASE-T solutions.

Farjadrad and Aquantia also helped shape Ethernet standards through its work in the NBASE-T Alliance and the IEEE 802.3bz task force, which sped adoption in enterprise networks, especially for high-speed Wi-Fi backhaul. (Source, [Anandtech](https://web.archive.org/web/20161004160526/http://www.anandtech.com/show/10720/nbaset-receives-boost-with-ieee-p8023bz-approval) RIP). *Industry standards… talk about street cred.*

Now, this serial entrepreneur is building yet another communications company, [Eliyan](https://eliyan.com/).

Ramin and his Eliyan co-founders Syrus Ziai and Patrick Soheili have [raised >$100M](https://eliyan.com/eliyan-news/strategic-investment-from-venturetech-alliance/) from investors including Samsung, SK Hynix, Micron, Intel Capital, Tiger Global, TSMC’s venture arm, and others.

*It’s interesting to note that all three big HBM suppliers are investors… and all three major foundries too!*

Other notable backers include Tracker Capital, founded by [Stephen Feinberg](https://en.wikipedia.org/wiki/Steve_Feinberg), now the U.S. Deputy Secretary of Defense, and Celesta Capital, co-founded by current Intel CEO Lip-Bu Tan.

With that context, let’s look at Eliyan itself and the problem it’s out to solve.

# Eliyan

Connecting dies inside a package is incredibly important for datacenter AI and will only become more so as we enter the [chiplet era](https://www.chipstrat.com/p/chiplets-and-the-future-of-system). One of the most performance-sensitive examples is HBM to GPU; the HBM logic die must move massive amounts of data to the AI accelerator with minimal latency and energy consumption.

[

![](https://substackcdn.com/image/fetch/$s_!SLCc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29c9ad83-92dd-49d1-889c-fbec321dbcb8_1600x861.png)



](https://substackcdn.com/image/fetch/$s_!SLCc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29c9ad83-92dd-49d1-889c-fbec321dbcb8_1600x861.png)
**Image from early HBM adopter AMD back in 2015! Ten years ago!**

Today, the industry relies on silicon interposers to carry the connections between die.

[

![](https://substackcdn.com/image/fetch/$s_!QxNh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd994b8b0-bbb8-4b9d-88f3-1aa759db4f07_1594x916.png)



](https://substackcdn.com/image/fetch/$s_!QxNh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd994b8b0-bbb8-4b9d-88f3-1aa759db4f07_1594x916.png)
*[Source](https://semiengineering.com/hbms-future-necessary-but-expensive/)*

But interposers have tradeoffs.

## The Interposer Problem

The industry has long favored silicon interposers over organic package substrates for carrying connection between die because interposers are manufactured with semiconductor lithography rather than PCB-style processes, allowing much finer bump pitch and line spacing. This precision enables far more interconnects per millimeter of die edge, directly increasing bandwidth density between dies. Silicon’s uniform, low-loss electrical characteristics support higher per-lane data rates at lower power and allow extremely short, direct die-to-die connections with minimal latency. These attributes are critical in high-performance systems such as datacenter CPUs, GPUs, and HBM memory stacks, where organic substrates cannot meet the necessary signal integrity or performance requirements.

*SemiAnalysis has a nice recent article about it, highly recommend: [Scaling the Memory Wall: The Rise and Roadmap of HBM](https://semianalysis.com/2025/08/12/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm/)*

But most industry watchers know that interposers are a supply chain bottleneck. TSMC’s CoWoS capacity has been constrained for years, which keeps Nvidia’s GPUs in short supply. Demand for CoWos is high across the board from anyone building an AI accelerator, whether GPU or XPU.

[

![](https://substackcdn.com/image/fetch/$s_!4G0j!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e97d984-baad-4248-8dbb-fe94e59f5411_917x569.png)



](https://substackcdn.com/image/fetch/$s_!4G0j!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e97d984-baad-4248-8dbb-fe94e59f5411_917x569.png)
*Source: Morgan Stanley [via this X post](https://x.com/Jukanlosreve/status/1950102624164073553)*

TSMC and others are scrambling to expand their manufacturing capacity to keep up.

[

![](https://substackcdn.com/image/fetch/$s_!Uqzb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F74d1f68c-c6ba-4aed-95cb-92f8a37e369e_778x704.png)



](https://substackcdn.com/image/fetch/$s_!Uqzb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F74d1f68c-c6ba-4aed-95cb-92f8a37e369e_778x704.png)
*Source: Morgan Stanley [via this X post](https://x.com/Jukanlosreve/status/1940901032256852150)*

Of course, there’s a near monopoly on interposer supply today too. Intel Foundry has interposer technology ([EMIB](https://www.intel.com/content/www/us/en/foundry/packaging.html)), and so do OSATs like [Amkor](https://amkor.com/technology/s-connect/), but TSMC with their CoWoS variants has the majority of customers. It goes without saying there are geopolitical considerations with concentrated, limited supply.

Yet Interposer supply is a *near-term constraint.* But there are more fundamental trade-offs.

Large silicon interposers can cost orders of magnitude more than traditional PCB packaging due to their complexity and extra process steps. That price confines interposers (and high-performance chiplets) only to applications that can absorb the cost…. which is pretty much just datacenter SoCs.

They also bring thermal and mechanical challenges. Fine-pitch microbumps are mechanically fragile, limiting their use in rugged environments like automotive and defense. And placing HBM directly beside compute dies for maximum bandwidth creates thermal coupling between hot logic die and heat-sensitive memory, reducing layout flexibility and increasing system-level reliability risk.

But don’t take my word for it. Here’s a [report from Meta](https://ai.meta.com/research/publications/the-llama-3-herd-of-models/) recounting the failures during their 54-day Llama 3 training run. **17% of failures from HBM!**

[

![](https://substackcdn.com/image/fetch/$s_!lzcR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc59f1d9c-88fe-451a-b93c-a470d33a2d51_1344x838.png)



](https://substackcdn.com/image/fetch/$s_!lzcR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc59f1d9c-88fe-451a-b93c-a470d33a2d51_1344x838.png)

Finally, most interposer packaging flows are proprietary to a single foundry or OSAT, reinforcing both supply chain and geopolitical risk we discussed earlier.

Even so, for AI accelerators, the performance gains have so far outweighed those trade-offs.

From [SemiAnalysis](https://semianalysis.com/2025/08/12/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm/),

> The implication of having much more I/O is increased routing density and complexity. Each I/O requires an individual wire/trace, with additional wiring required for power and control. For a HBM3E stack, there are over a 1,000 wires between the adjacent XPU and the HBM. **This level of routing density is not achievable on a PCB or package substrate; therefore, an interposer (silicon or organic) in a 2.5D package assembly like CoWoS is required.**

Silicon interposers are expensive, but for now, they’re indispensable. *“An interposer… is required.”*

Yes, chiplet interconnect standards like UCIe can be [implemented on organic substrates](https://www.uciexpress.org/post/how-ucie-will-enable-broad-chiplet-adoption), but at the cost of lower performance than a silicon interposer.

That raises a question: what if an application can’t absorb the cost, thermal load, or mechanical fragility of a silicon interposer? *Imagine faster, higher-capacity memory in smartphones to run local AI…*

What if silicon interposer performance were possible on a cheaper, more robust organic substrate?

Eliyan says it is. Its NuLink PHY lets designers reach performance levels on organic substrates that other PHYs achieve only with silicon interposers

## **How NuLink Works**

In a typical setup, the NuLink chiplet sits alongside other dies in a multi-die package, while the main ASIC—whether a GPU, AI accelerator, or custom compute chiplet—integrates Eliyan’s PHY IP to communicate directly with NuLink.

[

![](https://substackcdn.com/image/fetch/$s_!Garr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff7466231-ca2b-4c10-b621-63ea1e6b1113_1600x327.png)



](https://substackcdn.com/image/fetch/$s_!Garr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff7466231-ca2b-4c10-b621-63ea1e6b1113_1600x327.png)
*Look ma, no interposer!*

This separation moves the highest-performance die-to-die interconnect off the main logic chip, giving designers the bandwidth and latency advantages of advanced signaling without the burden of building and validating complex analog PHY circuits themselves.

NuLink is protocol-agnostic, supporting standard chiplet interconnects like UCIe and BoW as well as proprietary high-performance links.

### **Benefits: Supply Chain, Cost, and Time to Market**

NuLink’s most disruptive advantage is enabling silicon-interposer-class performance on inexpensive, robust organic substrates. The shift carries several strategic consequences.

First, it breaks the near-monopoly on high-bandwidth die-to-die links held by advanced packaging flows like TSMC’s CoWoS. Organic substrates are made in larger can be sourced from a broader range of vendors worldwide. This diversification mitigates geopolitical risk.

Second, organic substrates are mechanically tougher than fine-pitch silicon interposers. They can survive the shock and vibration demands of automotive, aerospace, and industrial systems—markets largely shut out from HBM-class performance due to interposer fragility. NuLink makes those markets accessible to chiplet-based designs.

Third, organic substrates larger maximum size gives designers more real estate for chiplets. That space can be used to add compute dies or scale memory capacity beyond current interposer-based system limits.

### **High-Performance Mode on Silicon Interposers**

NuLink is not just an “organic substrate enabler” though. Even in the high-end designs that will still use silicon interposers or embedded bridges, NuLink delivers a step-function in performance.

In a given process node, it can double the per-lane bitrate at lower power compared to other PHYs. That translates into higher absolute bandwidth between dies, more bandwidth per millimeter of die edge (“beachfront”), and a smaller fraction of the system power budget spent just on moving bits.

In bandwidth-bound workloads like LLM inference, those gains directly expand the performance ceiling.

[

![](https://substackcdn.com/image/fetch/$s_!OYed!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20216b6a-9d02-4b24-bdeb-6b82c7fe828c_761x272.png)



](https://substackcdn.com/image/fetch/$s_!OYed!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20216b6a-9d02-4b24-bdeb-6b82c7fe828c_761x272.png)
*NuLink can be used with an interposer too, and just makes it zippier.*

So NuLink PHY can be both a cost/supply-chain hedge or a performance enabler.

[

![](https://substackcdn.com/image/fetch/$s_!qiLq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5789343b-c167-42e6-bcdc-90507987dc93_1600x951.png)



](https://substackcdn.com/image/fetch/$s_!qiLq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5789343b-c167-42e6-bcdc-90507987dc93_1600x951.png)

Eliyan’s NuLink lets architects choose the substrate and packaging technology that best fits their product roadmap, without sacrificing interconnect performance.

For organic substrates, it enables interposer-class bandwidth density; for silicon interposers, it stretches the physical limits of beachfront utilization.

And in both cases, its simultaneous bidirectional signaling (SBD) doubles effective throughput for a given edge length.

# **Subscribers: NuLink & the Memory Wall + Eliyan’s Go-to-Market Opportunities**

The core challenge for any die-to-die interconnect is the *memory wall*. As we’ve been discussing, Eliyan has a way to bridge that. We’ll dig even deeper for subscribers. For example, where does HBM4/e come into play?

From there, we’ll explore Eliyan’s go-to-market opportunities:

-   Who are the most likely early adopters?
    
-   Which partners could amplify its reach?
    
-   How could Eliyan evolve from a point-solution provider into an embedded part of the AI hardware infrastructure?
    

[Read more](https://www.chipstrat.com/p/eliyan-the-ultimate-chiplet-interconnect)