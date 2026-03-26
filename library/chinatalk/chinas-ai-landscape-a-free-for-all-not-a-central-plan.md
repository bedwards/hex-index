---
title: "China’s AI Landscape: a free-for-all, not a central plan"
author: "Jordan Schneider"
publication: "China Talk"
publication_slug: "chinatalk"
published_at: "2026-01-30T11:34:03.000Z"
source_url: "https://www.chinatalk.media/p/chinas-ai-landscape-a-free-for-all"
word_count: 2867
estimated_read_time: 15
---

*Zilan Qian is a programme associate at the Oxford China Policy Lab and holds a Master’s degree in Social Science of the Internet from the University of Oxford.*

**The dominant narrative about China’s AI race frames it as a government-backed sprint toward AGI capabilities, competing head-to-head with the US frontier. But examining more than 6000 records of generative AI models filed through China’s registry system (updated through November 2025) tells a different story.**

Since 2023, all public-facing AI models must be filed with regulators before launch — creating an unprecedented window into China’s actual ecosystem. China’s AI registry system creates multiple datasets organized by service type and regulatory concern: internet information service algorithm (IISA), deep synthesis algorithms (DSA), and generative AI services (also known as AIGC, AI-generated content). This article draws on AIGC and DSA datasets — the ones capturing generative AI development — while leaving aside IISA data, which focuses on non-generative technology like recommendation algorithms.

In this piece, I focus on quantitatively analyzing the records in the registry system, which challenges the “AI race” narrative where China as a whole is tightly united under central government guidance. **Instead, the analysis will show that:**

-   **Private companies, rather than the state, drive development**
    
-   **Frontier developers are pursuing specialized models rather than converging on a single path for scaling LLMs**
    
-   **Geographic concentration reveals local governments actively shaping innovation clusters through fiscal competition.**
    

***For a comprehensive look at the development of China’s AI regulations into a formal registry system, I have prepared [a full explainer](https://ocpl.substack.com/p/172affb0-9a50-4007-99ac-4953a82e99ee).** This analysis covers the system’s key focus areas, the types of AI content regulators seek to censor, and the processes used for conducting broad security assessments of AI services. I believe this explainer offers valuable insights for China watchers, as well as AI governance and safety researchers, by detailing the strengths and weaknesses of China’s approach to AI registration.*

## Understanding the Data

The **[AIGC dataset](https://docs.google.com/spreadsheets/d/1yxyZzLFbmQKIPonzyMH8m62IE78egBy0zCiL7ZXqxXM/edit?usp=sharing)** tracks all new public-facing AI models developed in China, showing who is building what, where, and when. It captures two types of activity: **models being developed** (training from scratch or fine-tuning open source models) and **models being deployed** (using APIs of China’s models or locally installed open source models without modification). Together, these reveal both the landscape of model development and how quickly models reach actual users.

The **[DSA dataset](https://docs.google.com/spreadsheets/d/1VMqe0kAuHFmB-zslqIORXzGaKaO_0GqHxRSDj6SFnCE/edit?usp=sharing)** captures the specific algorithmic services for the public that are built to generate content — text, images, video, and audio. Here, the focus is on major AI developers to show where China’s frontier AI is concentrating its technical capabilities and commercial strategies.

In a nutshell, the AIGC dataset answers the question, “**What major AI models exist in China and who built them?**” while the DSA dataset answers, “**What specific generative algorithmic functions are frontier companies building?**” Together, they provide both a landscape view (AIGC) and a technical functionality view (DSA) of where China’s AI development is concentrated.

Three important caveats:

-   **First, both datasets track general model families rather than individual versions.** Whether it’s DeepSeek V3 or R1, they all register as a single “DeepSeek” entry when it is first filed in the system. Although DSA filing was intended to track AI model updates, in reality, only a few developers refiled their model updates between 2022 and 2023. In general, **AI model version updates are invisible.**
    
-   Second, China’s registry system is designed to monitor AI’s impact on public discourse and social stability within China, so it captures only part of the ecosystem. **Internal corporate AI deployments, non-public R&D (e.g., military), and overseas operations fall outside this system.**
    
-   Third, the filing-to-registration process typically takes 2-5 months, but can vary significantly on a case-by-case basis. This means **dates shown below don’t perfectly align with actual development or deployment dates (rather, they’re more often ~3 months late).**
    

## Private Sector Leadership with Accelerating Deployment

It is not a surprise to see the total number of AI models in China growing. The deployment of existing models has steadily increased between 2023 and 2025, suggesting that more adoptions have happened on the ground. Meanwhile, although we do not observe a skyrocketing surge in China’s AI model development based on the number of models filed, we should remember that the system does not account for model updates. In other words, although frontier AI companies are fiercely competing to roll out updated models — like DeepSeek-R1/V3.1/V3.2, Qwen-3/3-Omni-Flash/3-Coder/image, Kimi-K1.5/VL/K2, and more in 2025 — these models are *not* in the registry. In the registry, they simply show up as three entries: DeepSeek, Qwen, and Kimi. Thus, real model development is far more active.

[

![](https://substackcdn.com/image/fetch/$s_!DssF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0de6ffc-577a-44cf-89ea-551b7dd486dd_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!DssF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0de6ffc-577a-44cf-89ea-551b7dd486dd_1600x1600.png)

Zooming in on the developers and deployers of AI models, we see that private companies have consistently dominated both model development and deployment since 2023, including big names in AI like Alibaba, top performers in non-AI markets like the [education giant](https://www.chinatalk.media/p/chinas-ai-education-strategy) TAL (好未来教育集团), as well as a few foreign entities like Tesla. This dominance shows no sign of reversing. Even as state actors — such as telecommunications companies and state-owned research labs — have become more active, they remain secondary participants in overall model development.

Meanwhile, two development and deployment timing patterns deserve attention. A noticeable surge in developments and deployments occurred roughly six months and three months respectively after DeepSeek-R1’s release in January 2025 — the state’s [review process](https://docs.google.com/document/d/1NVQUsIpVB0DvmetYcimG5aFLgckCVbiN3Mf166-evdg/edit?usp=sharing) of deployment usually takes 2-3 months, and 2-5 months for developed AI models. The AI model has to be fully developed before it can be submitted for review by regulators.This pattern is consistent with reports of companies rushing to deploy DeepSeek to capitalize on market momentum, as well as with AI developers rushing to roll out new models to compete with R-1.

[

![](https://substackcdn.com/image/fetch/$s_!75ht!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff622c10e-867b-4cd2-86d3-6abe4d90a7a6_1600x889.png)



](https://substackcdn.com/image/fetch/$s_!75ht!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff622c10e-867b-4cd2-86d3-6abe4d90a7a6_1600x889.png)

## Where does the state enter?

State-affiliated actors are increasingly visible on the registry. While not primarily competing for frontier model capabilities, they’re building what appears to be infrastructure and application layers.

[

![](https://substackcdn.com/image/fetch/$s_!LTnE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d2b48d5-af88-4d33-a0dc-a40f0f83d0fe_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!LTnE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d2b48d5-af88-4d33-a0dc-a40f0f83d0fe_1600x1600.png)

State-owned enterprises are the most active government participants, particularly China’s two major telecom operators — China Mobile (中国移动) owning 3 models, China Telecom (中国电信) with 5 models, and the IT conglomerate Inspur group (浪潮) with 7 models. These companies traditionally dominated China’s digital infrastructure.

Beyond SOEs, universities and public research institutions are filing models, as are central and local government and state media outlets. Here, some prominent universities and labs — like Shanghai AI Lab — are building general-purpose AI, but more are building vertical AI models. For example, Tongji University’s College of Civil Engineering [developed](https://global.chinadaily.com.cn/a/202411/12/WS67331c4ca310f1265a1cced4.html) “CivilGPT” tailored toward their discipline, and Guangxi Zhuang Autonomous Region Information Center [built](http://dsjfzj.gxzf.gov.cn/dtyw/t21163633.shtml) “China-ASEAN Legal LLM (中国-东盟法律大模型)” for legal coordination and mutual recognition between China and ASEAN countries.

[

![](https://substackcdn.com/image/fetch/$s_!I_qD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75ea1523-57cd-460c-9192-fff855b21387_1600x840.png)



](https://substackcdn.com/image/fetch/$s_!I_qD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75ea1523-57cd-460c-9192-fff855b21387_1600x840.png)
*The CivilGPT interface features a “tool” section comprising four distinct functions: a literature interpretation assistant, a compliance intelligence consultant, a document editing utility, and “the Spirit of Scientists (科学家精神)” — an AI agent that adopts the persona of scientists or students to address user inquiries. The term “[the Spirit of Scientists](http://english.scio.gov.cn/featured/chinakeywords/2020-12/02/content_76970759.htm)” is a slogan advocated by Xi Jinping to underscore the importance of patriotism and innovation among scientists.*

Meanwhile, state-affiliated institutions are also actively deploying AI for very specific use cases. One major deployment scenario is customer services/general Q&A, with five AI medical assistants thus far deployed by public hospitals, and seven AI customer service assistants deployed by state-controlled banks. Meanwhile, there are only three entries that resemble AI agents — one from Inspur, one developed to assist with the World AI Conference, and another by Great Wall Motors 长城汽车, in which the state holds only limited stock (~8%).

The participation suggests a decentralized approach where state-affiliated institutions are developing vertical AI in specific domains that are ignored by private companies. While deployment spans various public-facing sectors like healthcare and finance, the integration of AI remains limited to narrow functions like AI chatbot assistants. This indicates that, up until 2025, state actors were still scratching the surface rather than attempting comprehensive sectoral digitalization as outlined by [the State Council’s AI+plan](https://www.chinatalk.media/p/chinas-new-ai-plan).

### General-Purpose LLMs are not the only way: What are China’s frontier developers building?

Generalist developers like DeepSeek and Moonshot have built large general-purpose models focused specifically on text generation — and the founders of DeepSeek and Moonshot have both [publicly](https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas) [discussed](https://www.linkedin.com/pulse/interview-yang-zhilin-moonshot-ai-march-toward-endless-%E5%B0%8F%E7%8F%BA-%E5%BC%A0-juprc) AGI as a long-term vision. **But this is a minority position among frontier developers. The dominance of text-only LLMs in public discourse masks a much more diversified market where most developers are optimizing for specific commercial applications rather than frontier capabilities.**

[

![](https://substackcdn.com/image/fetch/$s_!ZIIA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4db4759a-451b-4ef7-a2d3-abdac52bd75f_1000x1000.png)



](https://substackcdn.com/image/fetch/$s_!ZIIA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4db4759a-451b-4ef7-a2d3-abdac52bd75f_1000x1000.png)
*“General technology” refers to foundational language models/multimodal models with no specific platform or industry application disclosed. These figures include filings from tech companies themselves and their major subsidiaries, and data from StepFun includes Caiyue Xingcheng 财跃星辰, a finance-focused AI startup co-owned by StepFun and Cailian Press 财联社.*

Big tech companies pursue broader strategies. Alibaba dominates in use-case breadth, with filings spanning general technology, enterprise, commerce, and media. ByteDance, Baidu, and Tencent similarly spread across multiple sectors — all of these players have at least one filing in enterprise and productivity tools. In general, their filings seem concentrated on applications with immediate commercial value and clear deployment paths. Here, we also see that some big tech companies are leveraging their traditional strengths. Alibaba — as the owner of e-commerce giant Taobao (淘宝) — prioritizes e-commerce and retail, while Tencent — operating multiple video streaming platforms and popular video games — focuses on entertainment.

Moreover, Alibaba and ByteDance are actively integrating multiple AI tools into their respective legacy platforms. Alibaba, for instance, has deployed AI services across its e-commerce platform Taobao, its food delivery service Ele.me (饿了么), and its workplace tool Dingtalk (钉钉). Similarly, ByteDance has integrated AI into its workplace productivity platform Lark (飞书) and its short-form video app Douyin (抖音). This pattern reveals a strategy where AI is built *for* existing platforms and customer bases, alongside selective standalone new AI products (such as ByteDance’s Doubao 豆包 chatbot and Alibaba’s AI-enabled browser Quark 夸克) .

On the other hand, lacking traditional platforms, smaller startups allocate their focus more narrowly, often on general models or specific verticals in healthcare or finance. MiniMax and Z.ai, which own the highest numbers of DSA records in general technology among all startups, have already [IPO-ed](https://asia.nikkei.com/business/technology/artificial-intelligence/china-s-zhipu-and-minimax-race-to-go-public-ahead-of-openai-and-anthropic) in Hong Kong.

[

![](https://substackcdn.com/image/fetch/$s_!nAfN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e5fb543-5416-4663-8369-5f81c42eb359_1400x1000.png)



](https://substackcdn.com/image/fetch/$s_!nAfN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e5fb543-5416-4663-8369-5f81c42eb359_1400x1000.png)

Beyond text-focused LLMs and multimodal LLMs, companies are registering AI products specialized for video, image, and audio generation. Virtual human (数字人) generation is particularly common — and in fact is offered by all four major big tech companies — which suggests that virtual hosts are [perceived](http://www.xinhuanet.com/tech/20250217/585feb2c94ad4ab9a1d0805a0f4f6113/c.html) as a significant commercialization opportunity in the livestreaming industry.

Multimodality not only supports integrated virtual human-AI interaction, as seen in [AI companions](https://www.chinatalk.media/p/why-america-builds-ai-girlfriends) or [disability assistance](https://www.globaltimes.cn/page/202511/1348670.shtml). Rather, multimodal AI is also increasingly combined with physical manufacturing to create real embodied intelligence, as demonstrated by the recently-announced collaboration between MiniMax and Zhiyuan Robotics 智元机器人 to [build](https://news.aibase.com/news/24254) multimodal AI robots that are conversational and customizable.

Overall, this diversification in both technical approach and target market — from enterprise tools to entertainment to vertical domains — reflects a strategy optimized for deployment and integration rather than frontier capability racing.

[

![](https://substackcdn.com/image/fetch/$s_!HYxE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2bcda424-4b61-4d99-9135-a1e39d90f88e_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!HYxE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2bcda424-4b61-4d99-9135-a1e39d90f88e_1600x1600.png)

Almost all frontier developers engage in a relatively balanced split between business-to-business (B2B) and business-to-customers (B2C). Although 01.AI’s existing AI services were initially B2C-focused, they [have transitioned](https://kr-asia.com/kai-fu-lee-sets-the-record-straight-on-01-ais-pivot) into B2B services since early 2025, mainly [using DeepSeek](https://www.yicaiglobal.com/news/chinas-01ai-launches-enterprise-llm-platform-for-deepseek-deployment) to help build companies’ workflows. Because the registry system focuses on public-facing AI, highly specialized or internal B2B services (serving a single company rather than multiple clients) do not appear in the records, so the actual B2B proportion in the market is likely larger than the data suggests.

[

![](https://substackcdn.com/image/fetch/$s_!MYhw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17f4c9d3-2693-4a50-81c0-9614bd7f62a5_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!MYhw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17f4c9d3-2693-4a50-81c0-9614bd7f62a5_1600x1600.png)

Timing also reveals something about market dynamics. Alibaba began to launch generative AI services in 2022, the earliest among major players. Z.ai and MiniMax both filed models nearly a year before other startups, suggesting technological readiness and regulatory savvy that put them ahead of peers. A possibly state-coordinated influx of developers entered the market in mid-2023. Most other frontier developers entered the filing system in mid-to-late 2024, clustering around the time after generative AI [became](https://www.nbr.org/publication/chinas-generative-ai-ecosystem-in-2024-rising-investment-and-expectations/) commercially viable and more visible in China.

By 2025, new model filings from frontier developers have slowed — likely reflecting consolidation rather than stagnation, given dataset limitations around tracking updates and internal iterations. The rise of DeepSeek [turned](https://eu.36kr.com/en/p/3618985319658249) China’s private sector competition from a quantity-based game into one of quality. As frontier developers have established flagship foundation models, the focus in 2025 was primarily on improving model capabilities — and those initiatives are invisible according to this registry system. While competitions in the frontier will still be a priority in 2026, these developers, especially big tech companies, may increasingly focus on [turning](https://m.thepaper.cn/newsdetail_forward_32237010) AI capabilities into useful applications for the market.

## Geographic Concentration: Where Policy and Innovation Intersect

The most striking pattern in the data is geographic: five provinces account for over 80% of all model development and deployment, with the top three representing over 60%. It’s clear that Beijing, Shanghai, Guangdong (including Shenzhen), Jiangsu, and Zhejiang have become the dominant centers of China’s AI ecosystem.

[

![](https://substackcdn.com/image/fetch/$s_!kqz3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d7ea00d-afc0-49f9-84ff-c3b32cb73994_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!kqz3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d7ea00d-afc0-49f9-84ff-c3b32cb73994_1600x1600.png)

This pattern is not accidental but instead aligned with the uneven [economic foundations](https://www.china-briefing.com/news/china-provincial-gdp-growth-h1-2025/) and [concentrations of talent](https://asianews.network/chinas-new-1st-tier-cities-gain-ground-in-talent-battle/) in China. District or city-level governments in these dominant regions, which tend to have greater [fiscal capacities](https://5g.dahe.cn/news/202508071975233), have established explicit subsidy programs to encourage AI development and deployment. Shanghai’s Xuhui District increased rewards from [2 million](https://www.shanghai.gov.cn/cmsres/d2/d2ec36ec72324e41a5806add3e883ffb/ed76590520beec0ef8b1d27dc8caa860.pdf) RMB (~US$286,000) to [5 million RMB](https://www.shanghai.gov.cn/kjcx-gqwj4/20251126/8ca7a3e6b61b4db0a391b6fd0b5fe57b.html) (~US$715,000) between 2023 and 2025 to maximize AI model filing. Hangzhou [offers](https://www.thepaper.cn/newsDetail_forward_30686197) 50 million RMB (~US$7.1 million) for foundational models trained on 10B+ tokens. Dozens of cities across these five provinces offer one-time rewards ranging from 500,000 RMB (~US$71,500) to 5 million RMB per filing.

[

![](https://substackcdn.com/image/fetch/$s_!oDz7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a88daf1-f2c8-49ad-a42a-738728fd49c9_533x1388.png)



](https://substackcdn.com/image/fetch/$s_!oDz7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a88daf1-f2c8-49ad-a42a-738728fd49c9_533x1388.png)
*AI incentive policies by location. Data [source](https://mp.weixin.qq.com/s/6Td0NBjYyvHpuJAoNpBSbg).*

These aren’t trivial sums in an early-stage AI economy. DeepSeek-R1’s training cost was [estimated](https://www.theregister.com/2025/09/19/deepseek_cost_train/) to be less than $300k. Although that figure [discounts](https://www.theregister.com/2025/09/19/deepseek_cost_train/) compute cost, we also observe that multiple local governments offer “[compute vouchers (算力券)](https://www.stcn.com/article/detail/2926704.html).” Meanwhile, MiniMax [reported](https://fortune.com/2025/06/18/chinas-minimax-m1-ai-model-200x-less-expensive-to-train-than-openai-gpt-4/) spending ~US$535k renting the data center computing resources needed to train M1. After all, a 1-5 million RMB incentive (~US$143k to ~US$715k) is substantial enough to influence where companies choose to operate and whether they prioritize getting models into the formal registry system. More developed regions can offer the highest subsidies, and thus show the highest density of AI filings.

Today in China, [many](https://fgw.sz.gov.cn/ztzl/qtztzl/szscjmyjjfzzhfwpt/xwdt/content/post_12568144.html) [local](https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251218_4348497.html) [governments](https://www.shanghai.gov.cn/nw4411/20251130/614388e871004bf78814025bfede5df0.html) [cite](https://hznews.hangzhou.com.cn/chengshi/content/2025-12/31/content_9153841.htm) [the](https://www.nanjing.gov.cn/zgnjsjb/jrtt/202505/t20250521_5566666.html) [number](https://www.gz.gov.cn/zt/js12218mmhjgzxdhcyxlt/jsxdhcytxgzzyg/content/post_10257773.html) of AI models developed and deployed locally as a proxy for innovation or competitiveness. But these figures are also capturing the effect of local fiscal competition. Some entries represent genuine technological breakthroughs, but perhaps some are merely geographic arbitrage in response to government incentives. One should be cautious about over-indexing on these numbers — they should not be treated as s metrics of pure innovation. Not every model is DeepSeek.

The subsidy structure also reveals how China actually governs innovation in practice. China represents a hybrid model, rather than a system relying on central planning or market forces alone. Local governments compete to attract and retain AI development activity through fiscal incentives, creating a decentralized innovation ecosystem shaped by regional competition. This produces unequal outcomes (five provinces dominating) but also creates a system where innovation is geographically embedded in local economic strategies rather than concentrated in a single national hub.

## Decentralized Growth and Private-Driven, Internal Competition

Taken together, these patterns suggest China’s broader AI ecosystem operates according to a different logic than the “US-China AI race” framing suggests.

First, **development and deployment remain private-led, with state participation filling infrastructure and application gaps** rather than competing directly for frontier capabilities. Despite the existing rhetoric of central top-down coordination of AI to race against the US (or SOEs and local governments frantically participating in the AI race after DeepSeek), the real systemic structure, characterized by the dominance of private companies, remains relatively steady over the years.

Second, **frontier developers are pursuing diverse technical and commercial strategies rather than converging on LLMs as the path to AGI.** The data shows specialization in modalities, vertical domains, and applications. This reflects a market where companies are optimizing for deployability and commercial viability, not just pushing frontier capabilities.

Third, **China’s AI ecosystem is being actively shaped by local policy competition and fiscal incentives**, not purely by market forces or by central planning. This creates geographic inequality but also reveals how innovation actually gets governed in practice through decentralized competition for activity and talent. It also raises concerns of potential resource waste, especially given that many local governments are currently [short of money](https://carnegieendowment.org/posts/2025/08/using-chinas-central-government-balance-sheet-to-clean-up-local-government-debt-is-a-bad-idea?lang=en).

None of this means China isn’t building powerful AI capabilities. The registry shows significant activity, rapid deployment, and participation from major economic actors. But it does suggest the ecosystem is being built differently than headlines about “AI race” competition would imply: less centralized, more commercially focused, and shaped as much by regional policy competition as by centrally-driven technological ambition.

### Acknowledgements:

*This reporting was supported by a grant from the [Tarbell Center for AI Journalism](https://www.tarbellfellowship.org/). Zilan is grateful to Tarbell for the editorial independence to pursue this research. Zilan also wants to thank Jack Love for his excellent graphic design assistance, and Kayla Blumquist and Karuna Nandkumar for their thoughtful review and feedback.*

*This analysis was inspired by Trivium China’s reporting on [China’s AI landscape](https://triviumchina.com/research/seeking-the-next-deepseek-what-chinas-generative-ai-registration-data-can-tell-us-about-chinas-ai-competitiveness/), and the AIGC dataset builds partly on their earlier work. Due to the constraints of time and manpower, the two open-sourced datasets are not perfectly cleaned and may miss some data points. Please feel free to revise and build on top of the data.*