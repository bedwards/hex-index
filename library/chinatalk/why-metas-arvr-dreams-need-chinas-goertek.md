---
title: "Why Meta's AR/VR Dreams Need China's Goertek"
author: "Jordan Schneider"
publication: "China Talk"
publication_slug: "chinatalk"
published_at: "2026-01-07T13:54:27.000Z"
source_url: "https://www.chinatalk.media/p/why-metas-arvr-dreams-need-chinas"
word_count: 3443
estimated_read_time: 18
---

On Tuesday, Meta announced that they would pause the international rollout of their Ray Ban Display AR glasses to focus on fulfilling US orders due to [extremely limited inventory.](https://www.reuters.com/business/meta-delays-global-rollout-ray-ban-display-glasses-strong-us-demand-supply-2026-01-06/) But the component shortages Meta is facing are especially acute, in part because of the company’s ongoing quest to reduce reliance on one particular Chinese supplier.

In September, [FT reported](https://www.ft.com/content/b397f80d-5772-483b-9e48-b9fa83279c75) that Meta was struggling to decouple from Goertek, the Shandong-based electronics giant that assembles Meta’s Quest headsets and Ray-Ban smart glasses. In that article, Hannah Murphy and Eleanor Olcott wrote that Goertek supplies “some components” for Meta, quoting a Meta representative who told FT, “We have a robust, diversified supply chain so we’re not solely dependent on any one manufacturer, and we’re constantly reviewing and exploring supply chain opportunities around the world.”

But what scale of dependence are we talking about exactly? By [some](https://pdf.dfcfw.com/pdf/H3_AP202306051590403609_1.pdf) [estimates](https://web.archive.org/web/20260107044957/https://pdf.dfcfw.com/pdf/H3_AP202306051590403609_1.pdf), Goertek only provides 6-7% of the total component value of the Meta Quest 3, so what exactly makes Goertek so difficult to replace?

Today, we’ll explore the partnership between Meta and Goertek, and examine whether decoupling extended reality (XR) supply chains is a serious possibility at all.

[

![](https://substackcdn.com/image/fetch/$s_!XAqp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1c35a983-c525-41d9-939f-c61729c0b86b_818x547.jpeg)



](https://substackcdn.com/image/fetch/$s_!XAqp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1c35a983-c525-41d9-939f-c61729c0b86b_818x547.jpeg)
*[Source](https://www.goertek.com/en/join/culture.html).*

*Disclaimer: Both Meta and Goertek are quite secretive about their partnership and the provenance of the components in Meta’s headsets, and there is very little official information available publicly. Instead, most information comes from **teardowns**, in which a third-party disassembles a headset purchased off the shelf to analyze its components. I have analyzed the publicly available information (including teardowns and official Goertek findings), but this analysis is my own. I take responsibility for any inaccuracies and welcome corrections from anyone with insider information!*

## What does Goertek do?

Goertek 歌尔股份 is the world’s largest XR Original Design Manufacturing (ODM) company, meaning they are the world’s largest manufacturer of AR and VR headsets. Jiang Bin 姜滨, Goertek’s co-founder and chairman, appeared at Xi’s business symposium in February alongside the founders of DeepSeek and Unitree. Here’s a refresher on the company’s history from [my write-up](https://www.chinatalk.media/p/xis-hard-tech-avengers) of that symposium:

> Jiang Bin is the chairman of Goertek, a company he co-founded with his wife, Hu Shuangmei 胡双美, in 2001. Goertek is one of the primary manufacturers of Apple’s AirPods and Vision Pro headsets.
> 
> Jiang Bin was born in 1966 in Shandong province. He earned a bachelor’s degree in engineering from the Beijing University of Aeronautics and Astronautics and later an MBA from Tsinghua University​.
> 
> With Jiang as chairman, Goertek grew from a small acoustics firm into a global supplier of microphones, speakers, sensors, and other hardware. The company has filed more than [29,000 patent](https://www.mgcj.net/1008854.html) [applications](https://archive.is/Ze188) and is now the world’s top supplier of micro speakers, MEMS acoustic sensors, and AR/VR headset components.

[

![](https://substackcdn.com/image/fetch/$s_!Sm3o!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b665390-f50b-435c-aa6f-0e4ac2920d85_1600x861.png)



](https://substackcdn.com/image/fetch/$s_!Sm3o!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b665390-f50b-435c-aa6f-0e4ac2920d85_1600x861.png)
*A Goertek production facility in Vietnam, 2023. [Source](https://www.akorda.kz/en/kassym-jomart-tokayev-visited-the-goertek-production-complex-2275930).*

> Apart from Apple, Goertek’s clients include Meta, Amazon, Google, Samsung, and Sony — and in turn, the company has been [criticized](https://m.rccaijing.com/news-7219910176559265547.html) \[by Chinese pundits\] for relying too much on the patronage of these foreign tech giants. In 2024, the company announced an investment of US$280 million to build [new production capacity](https://www.scmp.com/tech/tech-trends/article/3248542/airpods-maker-goertek-open-vietnam-factory-part-apples-supply-chain-diversification) in Vietnam.
> 
> Jiang is [currently serving](https://www.21jingji.com/article/20230309/herald/bce73db7d84d1198de756e0cf60b6927.html) as a deputy to the 14th NPC and regularly participates in government-organized [industry forums](https://static.nfnews.com/content/202411/21/c10273212.html?enterColumnId=43986). He frequently uses these platforms to promote metaverse technology. Jiang’s current [net worth](https://www.forbes.com/profile/jiang-bin/) is reportedly more than US$5 billion.

Goertek is highly vertically integrated across a sprawling network of subsidiaries, but its hardware business can be broken up into three buckets:

[

![](https://substackcdn.com/image/fetch/$s_!GTI0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8590ce0c-5e60-4156-a519-1e9a91535132_1440x1022.png)



](https://substackcdn.com/image/fetch/$s_!GTI0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8590ce0c-5e60-4156-a519-1e9a91535132_1440x1022.png)
*The structure of Goertek. The components that Meta sources from Goertek are mostly listed in the leftmost column, with some other components categorized as VR/AR-specific components. This graphic was translated and reformatted by GPT, but the original image source is [this Goermicro](https://pdf.dfcfw.com/pdf/H2_AN202207271576600563_1.pdf) [filing](https://web.archive.org/web/20260107044714/https://pdf.dfcfw.com/pdf/H2_AN202207271576600563_1.pdf) (hence the green highlight).*

Now that we’ve glimpsed the sheer scale of Goertek’s business dealings, we can analyze the specific ways that they provide value to Meta.

## Assembly and Partnership Management

Goertek is the primary assembler of the Meta Quest and Ray-Ban smart glasses — in fact, it appears to be Meta’s *only* assembly partner for finished Quest devices.[1](#footnote-1) Some of that production is shifting out of China to Goertek facilities in Vietnam, but it’s still Goertek.

[

![](https://substackcdn.com/image/fetch/$s_!_TUJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8797c4ac-c8dc-4bdd-b7b5-c05020df0ea5_599x568.png)



](https://substackcdn.com/image/fetch/$s_!_TUJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8797c4ac-c8dc-4bdd-b7b5-c05020df0ea5_599x568.png)
*Assembly locations of all of the Quest 3S subsystems. [Source](https://library.techinsights.com/hg-content/9e2bf47a-d60a-4ced-b86b-88d7b3c86711).*

But Goertek’s role doesn’t end here — by nature of handling final device assembly, Goertek likely ends up managing logistical relationships with other Chinese component suppliers.[2](#footnote-2) As a contract manufacturer for high-profile multinational tech giants like Apple and Sony, Goertek stays extremely tight-lipped about the extent of the services it provides to clients. However, tough bargaining with external suppliers is a key part of how they keep costs low for their clients.

[According](https://mp.weixin.qq.com/s/i8f9pk3PdfWK5epeD78gFA) [to](https://archive.is/zXYRZ) Zhu Jia 朱嘉, editor in chief of an award-winning tech industry publication (三川汇文化科技):

> “The company has **strong bargaining power over the supply chain**, **enabling it to control costs through centralized procurement** and in-house manufacturing of some materials. At the same time, economies of scale dilute fixed costs, allowing Goertek to remain profitable on large-volume orders. …
> 
> \[Goertek\] typically establishes dedicated project teams for important clients, closely coordinating with their R&D and production plans to provide 24/7 technical support and responsiveness.”

It’s possible that Goertek is acting as a gateway to the broader Chinese manufacturing ecosystem. Their role in logistics management could extend to services like negotiating bulk prices, sourcing components that meet Meta’s requirements, and communicating with suppliers on Meta’s behalf.[3](#footnote-3)

I am in no way implying that Meta has relinquished all [oversight](https://sustainability.atmeta.com/responsible-supply-chain/) of its supply chains — rather, Meta likely draws from Goertek’s expertise as a world-dominating XR manufacturer to find the right components at the right price and on the right timelines. Meta doesn’t publicly discuss whether it delegates tasks to Goertek, but the fact that Meta declined to pursue legal action after busting Goertek for selling alleged Quest knockoffs suggests that Goertek is providing services that are not easily replaced.

This expanded role in [supplier](https://srm.goertek.com/Portal/About/Index) [management](https://archive.is/9qtfz) means we need to look at Chinese suppliers as a whole in order to understand the value Goertek provides to Meta.

## Chinese Components by Value

For reference, here’s a timeline of Meta’s VR product releases:

> Quest 2 (Oct 2020–Sept 2024)  
> Quest Pro (Oct 2022–Sept 2024)  
> Quest 3 (Oct 2023–present)  
> Quest 3S (Oct 2024–present)

A March 2023 [report](https://asia.nikkei.com/static/vdata/infographics/vr-goggle-disassembly/) by Nikkei Asia found that US-made parts accounted for 34% of the component cost for the Meta Quest Pro (the headset between Quest 2 and Quest 3), while Chinese-made components made up 18% of the bill of materials cost.

But that statistic is misleading at best. If you look at the *evolution* of Meta headsets, China more than quadrupled its share of component costs between 2020 and 2022, according to Nikkei’s teardown of the headsets.

[

![](https://substackcdn.com/image/fetch/$s_!SoyD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4c22dfd-b269-4fca-878c-0d509fe11187_1075x545.png)



](https://substackcdn.com/image/fetch/$s_!SoyD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb4c22dfd-b269-4fca-878c-0d509fe11187_1075x545.png)
*The Meta Quest Pro (released in 2022) vs its predecessor, the Meta Quest 2 (released in 2020). [Source](https://asia.nikkei.com/static/vdata/infographics/vr-goggle-disassembly/): Nikkei Asia.*

[

![](https://substackcdn.com/image/fetch/$s_!yP0f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F28e97e39-793f-4405-9727-a14adc9f5be2_1128x599.png)



](https://substackcdn.com/image/fetch/$s_!yP0f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F28e97e39-793f-4405-9727-a14adc9f5be2_1128x599.png)
*The dollar value of components in Meta’s Quest 2 and Quest Pro by country. [Source](https://asia.nikkei.com/static/vdata/infographics/vr-goggle-disassembly/): Nikkei Asia.*

At first glance, these graphs seem to indicate that US suppliers hold a dominant position in Meta’s VR supply chain. But I’d be willing to bet that a lot of the components in the “unidentified” category come from Chinese suppliers, including affiliates of Goertek. These components could be unbranded because they come from small suppliers with no international brand recognition,[4](#footnote-4) or because it’s impractical to put a logo on tiny plastic connectors or minor electronics, which will wind up in another brand’s finished device anyway. At any rate, aggressively pursuing influence over XR supply chains, Goertek has constructed [a large](https://srm.goertek.com/Portal/News/Details?id=19) [network](https://srm.goertek.com/Portal/News/Details?id=14) of partners from which it sources components, and access to that network is a significant perk for OEM clients.

This “unidentified” bucket could explain why Chinese analysts estimate that the share of China-made components is much higher than Nikkei reports. [A](https://mp.weixin.qq.com/s/gWEK-vyCxQBUfKhwslYDCg) [teardown](https://archive.is/KYhEx) by Wellsenn XR (a Chinese XR consulting firm) found that Chinese suppliers provided 38.5% of the component value of the Meta Quest 2 — the same share as the US. By the next generation (the Quest Pro), Wellsenn alleges that Chinese suppliers had captured [61% of total](https://mp.weixin.qq.com/s/Nf-0BMi1l8-6oQX2sZbIFw) [component costs](https://archive.is/rJo6Y). However, Meta reportedly brought that figure down to [39.5% for the](https://www.sohu.com/a/735602966_121740911) [Quest 3](https://archive.is/AvT4v) and [33.49% for the](https://mp.weixin.qq.com/s/pVaPIqCeCTzsQO5p6BV8hw) [Quest 3S](https://archive.is/bjMw8) (which weren’t evaluated by the Nikkei teardown).

That’s a drastic reduction, and would indicate that Meta is succeeding at decoupling if we take those figures at face value. A couple of hardware changes are at play here:

1.  Quest Pro used expensive Mini-LED backlights supplied by Chinese companies. Quest 3 uses cheaper, standard LED backlights instead.
    
2.  The Quest Pro LCD displays were supplied by Beijing-based BOE 京东方, while the Quest 3/3S 120 Hz LCD displays come from JDI, a Japanese supplier.[5](#footnote-5)
    

Keep in mind, these figures don’t tell us anything about component *volume*. US suppliers provide (read: design) high-ticket components like processors,[6](#footnote-6) but those are a small fraction of the *total* components needed to make a headset.

[

![](https://substackcdn.com/image/fetch/$s_!c4Cn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe65f9358-3194-47ea-a21c-914cdc3940cd_1528x900.png)



](https://substackcdn.com/image/fetch/$s_!c4Cn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe65f9358-3194-47ea-a21c-914cdc3940cd_1528x900.png)
*The ten most expensive components in the Meta Quest 3S. The only Chinese company listed explicitly here is the battery supplier, but the camera subsystems are [usually attributed to](https://www.sohu.com/a/735602966_121740911) the Zhejiang-based company Sunny Optical. [Source](https://library.techinsights.com/hg-content/9e2bf47a-d60a-4ced-b86b-88d7b3c86711).*

As mentioned previously, the total value of components made by Goertek is less than 10% of the total bill of materials for the Quest headsets. But that’s a testament to Goertek’s ruthlessness in cutting costs — and the parts they do provide are not easily sourced elsewhere.

## Goertek’s Component Stack + “Design Outsourcing”

Rather than reducing reliance on Goertek, [The Information](https://www.theinformation.com/articles/meta-to-farm-out-design-for-mixed-reality-devices-shift-some-production-from-china) reported in December of 2024 that Meta was farming out some aspects of headset design to Goertek so that, according to a Meta employee, the company could focus more on XR software development. Meta’s CTO vehemently [denied this](https://x.com/boztank/status/1864698639215677657?s=20), saying that the headsets have always been designed “in house” and that “\[T\]his isn’t a change from how we’ve done business with \[Goertek.\]” But both of these claims can be true — Goertek designs a large number of components that Meta purchases off the shelf (and spends big on R&D to make that possible). In that sense, they do contribute to the design.

Goertek-proper has been confirmed to provide the audio modules for the Quest 3 and [the optical engine](https://kguttag.com/2025/10/30/meta-ray-ban-display-part-1-lumus-waveguide-omnivision-lcos-and-goertek-projection-engine/) for Meta Ray-Bans, but Goertek’s warehouse of XR components is much more expansive. It includes:

1.  Electronic parts such as speakers, microphones, and haptic feedback components,
    
2.  Optical components like eye trackers, pancake lenses, and depth sensors,
    
3.  Structural parts like the shell, brackets, and the head strap (Meta probably designs these and contracts Goertek to manufacture them, but perhaps feedback from Goertek has started to influence design choices here).
    

Given the tepid interest in XR products from consumers thus far, Meta’s goal for the Quest 3 was to reduce the sticker price of the final product. That means designing all these components in-house was not an option, but to their credit, Meta has found alternative suppliers for many of the above components. But at what cost?

Many companies can produce optical waveguides (the critical AR component that guides light from the display into the wearer’s eyes), but mass-producing them and achieving high yields is a different matter entirely. Among Chinese manufacturers, only Goertek and Sunny Optical 舜宇光学 (a new partner of Goertek) have mastered waveguide production at scale, which requires the use of lithography machines. These two companies are each capable of [producing](https://mp.weixin.qq.com/s/xCL5IJZRVOQ6_AKVyJSJow) [roughly](https://archive.is/3nVQt) 10-20 million waveguides per year. By contrast, all other Chinese manufacturers are stalled at an annual production capacity of just ~100,000 units. [According](https://mp.weixin.qq.com/s/xCL5IJZRVOQ6_AKVyJSJow) [to](https://archive.is/3nVQt) the consulting firm AR Circle AR圈:

> \[T\]he AR glasses industry has shifted from a situation of “insufficient demand” to one of “insufficient production capacity” this year. … \[T\]he production capacity demand for surface-embossed diffractive waveguides from just six Chinese AR brands next year exceeds 1.6 million units. However, the current domestic production capacity for surface-embossed diffractive waveguides (excluding Goertek and Sunny Optical) is less than 400,000 units, resulting in a capacity gap of over 1.2 million units. If the demand from major international clients is included, the future capacity gap for waveguides could exceed several million units.

Waveguides for Meta Ray-Ban Display come from Lumus, which contracts [three manufacturers](https://lumus.com/partners/supply-chain/) to produce them — Quanta in Taiwan, SCHOTT in Malaysia, and Crystal-Optech 水晶光电 in Zhejiang — and is still [three orders of magnitude](https://lumus.com/ar-at-volume-needs-optics-that-scale-reflective-waveguides-are-delivering/) behind Goertek’s production capacity. Meta appears to be facing waveguide shortages — Meta’s $800 model with a display (and thus a waveguide) is sold out [everywhere](https://www.uploadvr.com/meta-ray-ban-display-sold-out-early-adopters-struggle/), while Meta’s $300 glasses *without* a display are still available.

#### In the semiconductor supply chain, lithography is a small fraction of the total cost of manufacturing a chip, yet the process is completely indispensable. Waveguides, and the lithography machines that produce them, play a similar role in XR supply chains.

Pancake lenses are another key area where Goertek excels. The company aggressively pursued mass production of these lenses, becoming one of [the first](https://mp.weixin.qq.com/s/xCL5IJZRVOQ6_AKVyJSJow) manufacturers globally to master the process. Meta designed the Quest 3’s pancake lenses in-house — reportedly building the entire supply chain for these modules “[from scratch](https://www.meta.com/blog/vr-display-optics-pancake-lenses-ppd/)” — but they have not disclosed where the modules are actually manufactured. Meta and Apple both source at least some of [their lenses](https://www.tejwin.com/insight/%E5%85%89%E5%AD%B8%E9%8F%A1%E9%A0%AD%E7%94%A2%E6%A5%AD2024%E8%B6%A8%E5%8B%A2/) from Taiwan-based Genius Electronic Optical 玉晶光 (which has manufacturing facilities in mainland China), but the rest of Meta’s lenses are reported to come from [Sunny Optical](https://pdf.dfcfw.com/pdf/H3_AP202306051590403609_1.pdf). Like with waveguides, few players besides Sunny Optical and Goertek have mastered pancake lens production at scale.

## Acquisitions

A key facet of Goertek’s business model has been vertical integration, and the company has aggressively acquired rival component manufacturers since its founding in 2001. In the summer of 2025, Goertek [helped finance](https://eu.36kr.com/en/p/3433868582522240) the takeover of the UK-based MicroLED developer Plessey, which is conveniently one of Meta’s suppliers. Another highly publicized deal was the acquisition of OmniLight, a Shanghai-based subsidiary of Sunny Optical that specializes in AR micro-nano optical devices.

But this deal goes [beyond](https://www.vr52.com/vr-news/vr-industry/47mwo4) a simple acquisition — Sunny Optical transferred 100% of OmniLight’s equity to Goertek in exchange for a 33.33% stake in [Goeroptics](https://www.goeroptics.com/) (the subsidiary of Goertek focused on optical components), building a joint investment platform and ensuring that the futures of the two companies are deeply intertwined. Given that Sunny Optical is Goertek’s only real competitor in waveguide production, some Chinese commentators have begun referring to this partnership as an XR cabal that could approach [TSMC proportions](https://mp.weixin.qq.com/s/xCL5IJZRVOQ6_AKVyJSJow).

Even though Goertek doesn’t control Sunny or Plessey outright, these deals add another layer of complexity to Meta’s quest to quit Goertek.

## The Quest Continues

Meta’s dependence on Goertek isn’t primarily about the value of the components Goertek contributes, but about the structure of the Chinese manufacturing ecosystem and Goertek’s privileged position inside it. If Goertek disappeared tomorrow, it wouldn’t be as simple as finding another assembly partner to slap parts together. Rather, Meta would be forced to rebuild Goertek’s component supply chains while competing against [a dozen Chinese companies](https://www.chinatalk.media/p/chinas-ar-arms-race) for access to yield-constrained parts.

On paper, Meta’s component-level dependence on China is materially lower today than it was in 2022, but decoupling component by component is not the same as decoupling the supply chain. Meta can shift final assembly out of China to Vietnam, and it can gradually peel off high-value components where global alternatives exist. But for now, the underlying structure of the XR supply chain is dominated by China — and Goertek sits at the center of that structure.

\[Jordan: One final note in light of today’s news that China will review Meta’s Manus purchase. Even if China really doesn’t have any by-the-book jurisdiction over Manus after their move to Singapore, threatening Meta’s hardware supply chain could be a creative way to squeeze.\]

[

![](https://substackcdn.com/image/fetch/$s_!4sAc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50a5cfba-9807-4bee-93bc-6cc345711ed5_863x242.png)



](https://substackcdn.com/image/fetch/$s_!4sAc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50a5cfba-9807-4bee-93bc-6cc345711ed5_863x242.png)

[1](#footnote-anchor-1)

I was unable to confirm the existence of any other manufacturers of the finished devices, but there are reports that Shenzhen-based Luxshare played [some role](https://www.trendforce.com/news/2025/09/23/news-openai-reportedly-partners-with-apple-supplier-luxshare-for-ai-hardware-launch-slated-for-2026-2027/) in the supply chain for Quest 3, and will help assemble some modules for Meta’s next generation of AR glasses as of Q4 2025.

[2](#footnote-anchor-2)

[

![](https://substackcdn.com/image/fetch/$s_!QIUT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc57516b1-7816-432b-be76-80e8f966758f_1600x714.png)



](https://substackcdn.com/image/fetch/$s_!QIUT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc57516b1-7816-432b-be76-80e8f966758f_1600x714.png)
*The structure of Goertek’s assembly services. [Source](https://pdf.dfcfw.com/pdf/H2_AN201412100007856068_1.pdf) (translated by Google)*

[3](#footnote-anchor-3)

This is my analysis of the publicly available evidence, including official Goertek filings such as [this](https://pdf.dfcfw.com/pdf/H2_AN201412100007856068_1.pdf) [one](https://web.archive.org/web/20260107045613/https://pdf.dfcfw.com/pdf/H2_AN201412100007856068_1.pdf), which says on page 73:

> \[Goertek\] has established a strict supplier management system, including supplier management procedures, raw-material procurement procedures, and related management processes. In order to ensure the quality of procured raw materials, the company has set up a supplier qualification-certification system in accordance with the procedures of the ISO9001 and TS16949 quality-management standards, and conducts specific certifications for products purchased from approved suppliers. The Components & Materials Department and the Finished-Products Materials Department are responsible for organizing the company’s R&D, quality, and other relevant departments to jointly evaluate and certify suppliers or raw materials based on procurement needs. Raw materials for mass production must be purchased from approved suppliers. Afterward, in accordance with the supplier evaluation procedures, the company organizes the Quality Department and others to carry out regular comprehensive assessments of approved suppliers in areas such as quality, pricing, service, environmental compliance, and product-delivery capability. Based on the evaluation results, suppliers are required to make corresponding corrections, and unqualified suppliers are removed from the supplier list. …
> 
> The company’s production model primarily relies on order-based manufacturing according to customer customization needs. All production is conducted in-house, comprising three modules: **production planning, product manufacturing, and product delivery.** The company typically establishes different production lines and areas based on production processes, batch sizes, environmental considerations, and specific customer or consumer requirements. These include mass production lines and large-customer product lines, effectively avoiding time wasted on product model changes, improving production line uptime, and meeting the diverse needs of different customers for dedicated production lines.
> 
> 公司建立了严格的供应商管理制度，包括供方管理流程、原材料采购流程和管理流程等。公司为了保证采购原材料品质，根据 ISO9001 和 TS16949 质量管理标准的程序，建立了供货商资格认证制度，并对合格供应商的采购产品进行具体认证，器件资材部和整机资材部负责根据原材料需求组织公司的研发、品质等部门一起对供应商或原材料进行认定，批量采购的原材料必须从合格供应商处采购；之后，根据供方考评流程，组织品质部门等一起对合格供应商的质量、价格、服务、环保和产品交付能力等方面进行定期综合考评，根据考评结果要求供应商进行相应的整改，剔除不合格供应商。…
> 
> 公司所有产品的生产模式主要是根据客户的定制化需求进行接单生产，均为自主生产，包括生产计划模块、产品制造模块与产品交付模块三个部分。公司一般根据生产工艺、批量性、环保性以及客户或消费者的特殊要求设立不同的生产线和生产区域，如批量产品生产线、大客户产品生产线等类型，有效避免了产品型号更换带来的时间浪费，提高了生产线的稼动率，满足了不同客户对专有生产线的要求。

From that same document:

> With the rapid pace of upgrades and replacements in consumer electronics, the price of the same product is decreasing at an increasingly faster rate. Therefore, downstream brand manufacturers are highly sensitive to costs, thus requiring consumer electronics component suppliers to have strong cost control capabilities. Economies of scale are a key factor influencing product costs. The larger a company’s production and operation scale, the larger the batch size of raw material purchases, and the stronger the company’s bargaining power with suppliers.
> 
> 随着消费电子产品升级换代速度的加快，同一产品的降价趋势越来越快，因此下游品牌厂商对成本较敏感，进而要求消费电子元器件供应商的成本控制能力较强。规模效应是影响产品成本的关键因素。企业的生产经营规模越大，原材料采购的批量也就越大，企业与供应商的议价能力越强。

And from [this](https://pdf.dfcfw.com/pdf/H2_AN202207271576600563_1.pdf?1658947566000.pdf) [other](https://web.archive.org/web/20260107044714/https://pdf.dfcfw.com/pdf/H2_AN202207271576600563_1.pdf) filing from 2022:

> The company primarily adopts an “order-based production” approach, meaning production begins only after a customer places a formal order. During production and operation, the company has established stable cooperative relationships with its customers. Some customers provide long-term forecasts, which the company uses to procure raw materials, upgrade equipment, and schedule production. Simultaneously, the company actively expands its product line, producing some new products in advance to promote them to potential customers.
> 
> The company’s product manufacturing mainly includes four stages: production planning, production preparation, production execution, and product warehousing. During the production planning phase, the operations department takes the lead, developing production plans and laying out production layouts based on product order volume and sales forecasts. In the production preparation phase, the operations department formulates raw material requirements and delivery plans based on the production plan; the supply chain management department is responsible for tracking material arrivals; the quality department is responsible for incoming material inspection; and the manufacturing department is responsible for verifying the technical and process documents used in product production and verifying that production equipment and tooling meet requirements. During the production execution phase, the manufacturing department rationally arranges and manages production according to the production plan. Simultaneously, the company has implemented fully digitalized quality control management throughout the entire process, with the quality department leading quality monitoring of the production process. In the product warehousing phase, the quality department inspects finished products, and products that pass inspection are then put into storage. The company has a comprehensive quality assurance system, managing quality in an organization and process-oriented manner to continuously improve customer satisfaction.
> 
> 公司主要采取“面向订单生产”的方式，即客户释放正式订单后进行投产。在生产经营过程中，公司同客户建立了稳定的合作关系，部分客户向公司释放长周期预测，公司根据该预测进行原材料采购、设备改造并安排投产。同时，公司积极扩展产品线，公司提前生产部分新产品向潜在客户进行市场推广。
> 
> 公司产品生产主要包括生产策划、生产准备、生产执行以及产品入库等四个阶段。在生产策划阶段，由运营部门进行主导，其根据产品订单量及销售预测制定生产计划，进行产品生产布局；在生产准备阶段，运营部门根据生产计划制定原材料需求及到料计划，供应链管理部门负责跟进到料，品质部门负责来料检验，制造部门负责核对产品生产使用的技术文件、工艺文件等，检验确认生产设备、工装等是否符合要求；在生产执行阶段，制造部门根据生产计划合理安排和管理生产，同时公司已实现全制程数字化品质控制管理，由品质部门主导生产过程品质监控；在产品入库阶段，由品质部门对产成品进行检验，产品检验合格后入库。公司拥有完善的品质保障体系，从组织和流程上按照客户导向进行质量管理，不断提升客户满意度。

And Goertek is quite good at managing these logistics — here’s a description of their techniques from that same 2022 document:

> By deeply integrating industrial IoT technologies with edge-computing–related technologies, the company is aggressively advancing intelligent manufacturing, building digitalized workshops and smart factories. Through the use of real-time Manufacturing Execution Systems (MES), Recipe/Process Management Systems (RMS), Quality Management Systems (QMS), and other tools, the company achieves optimized management of product data, personnel, equipment, materials, and quality across the entire production cycle — from order placement to product completion.
> 
> 公司通过深度融合工业物联网技术与边缘计算相关技术，大力推进智能制造， 建设数字化车间和智慧工厂，运用实时生产管理系统（MES）、工艺参数管理系统（RMS）、 质量管理系统（QMS）等，实现从订单下达到产品完成的整个生产过程中的产品数据、 人员、设备、物料和质量等的最优化管理，进而将生产过程中的采购、制造、销售等信 息数据化、可视化和智能决策化，最终形成完整的产品数据追溯系统，实现产品全生命 周期的透明化生产，从而进一步提高了公司的生产效率和品质管控能力。

[4](#footnote-anchor-4)

Goertek’s supplier network is quite disaggregated. In 2023, Goertek’s top five suppliers only accounted for [46.16%](https://www.52audio.com/archives/194420.html) [of](https://archive.is/UT9Xi) the company’s annual purchases.

[5](#footnote-anchor-5)

Although it’s [rumored](https://x.com/SadlyItsBradley/status/1612935459390521347) that Meta may have sourced additional displays from BOE to keep up with demand, which could explain why you can buy replacement displays for the Quest 3 [on AliExpress](https://www.aliexpress.com/item/1005009285355654.html) for about US$100. Meta did not respond to my request for comment on this rumor.

[6](#footnote-anchor-6)

Meta uses Qualcomm processors for both their VR headsets and smart glasses, which are designed in the US and fabbed by TSMC — the Meta Quest 3 uses a Snapdragon XR2 Gen 2 SoC and an Adreno 740 for graphics, while Meta Ray-Bans use Snapdragon AR1 Gen 1 processors.