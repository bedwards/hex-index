---
title: "Chinese AI in 2025, Wrapped"
author: "Jordan Schneider"
publication: "ChinaTalk"
publication_slug: "chinatalk"
published_at: "2025-12-11T14:14:28.000Z"
source_url: "https://www.chinatalk.media/p/china-ai-in-2025-wrapped"
word_count: 2484
estimated_read_time: 13
---

A year for the history books for the Chinese AI beat. We began the year astonished by DeepSeek’s frontier model, and are ending in December with Chinese open models like Qwen [powering](https://www.thewirechina.com/2025/11/09/cheap-and-open-source-chinese-ai-models-are-taking-off/) Silicon Valley’s startup gold rush.

It’s a good time to stop and reflect on Chinese AI milestones throughout 2025. What really mattered, and what turned out to be nothingburgers?

This piece recaps:

-   The biggest model drops of the year
    
-   China’s evolving AGI discussion among Alibaba leadership and the Politburo
    
-   The biggest swings in the US-China chip war
    
-   Beijing’s answer to America’s AI Action plan and the MFA’s
    
-   Robots
    

# Models

### The DeepSeek Moment

*Liang Wenfeng lit the fire*

DeepSeek-R1 came out on January 20, thwarting everyone’s Chinese New Year plans. The cost-efficient LLM, which uses a Mixture-of-Experts (MoE) architecture, caused many in Silicon Valley to re-evaluate their bets on scaling — and on unfettered American dominance in frontier models. DeepSeek is powered by domestically trained Chinese engineering talent, an apparent belief in AGI, and no-strings-attached hedge fund money (it is owned by High-Flyer 幻方量化, a Hangzhou-based quantitative trading firm). There were initial concerns that such a recipe could not be replicated by more capital-constrained Chinese tech startups, but Kimi [proved that wrong](https://www.chinatalk.media/p/kimi-k2-the-open-source-way) with K2 in July; [Z.ai](https://podcasts.apple.com/us/podcast/the-z-ai-playbook/id1289062927?i=1000737778106), Qwen, and MiniMax followed.

We translated Chinese tech media 36Kr’s [interview](https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas) with DeepSeek CEO Liang Wenfeng back in November 2024, and spent much of January 2025 on the DeepSeek beat (see Jordan’s conversations on DeepSeek with Miles Brundage [here](https://podcasts.apple.com/us/podcast/emergency-pod-deepseek-r1-and-the-future-of/id1289062927?i=1000685366992) and with Kevin Xu of *Interconnected* [here](https://podcasts.apple.com/us/podcast/deepseek-what-it-means-and-what-happens-next/id1289062927?i=1000687276601)). Over at the newsletter, we covered how China [reacted](https://www.chinatalk.media/p/deepseek-the-view-from-china) to DeepSeek’s rise, its [secret sauce](https://www.chinatalk.media/p/deepseeks-secret-to-success), and [concerns](https://www.chinatalk.media/p/deepseek-a-tragedy-foretold) around open-source as a strategy.

DeepSeek continues to be a big deal. For one, it paved the way for an open-source race dominated by Chinese models. Nearly every notable model released by Chinese companies in 2025 has been open source. In public blog posts, social media discussions, and private conversations, Chinese engineers and tech executives repeatedly attribute their open-source orientation to the example set by DeepSeek.

On the technical end, despite some [remaining mystery](https://www.theregister.com/2025/09/19/deepseek_cost_train/) surrounding the exact cost of training R1, DeepSeek’s viability was a shot in the arm for Chinese labs working under compute constraints. Going into 2026, with restrictions on H200s [loosened](https://www.reuters.com/world/china/us-open-up-exports-nvidia-h200-chips-china-semafor-reports-2025-12-08/) and reporting that DeepSeek is still training on smuggled Nvidia, easier access to TSMC-fabbed Nvidia chips may be just what DeepSeek needs to get their mojo back.

[

![](https://substackcdn.com/image/fetch/$s_!Uomc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1868883e-988f-4562-8fa1-01af362969a8_2132x1014.png)



](https://substackcdn.com/image/fetch/$s_!Uomc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1868883e-988f-4562-8fa1-01af362969a8_2132x1014.png)

### Manus

*Big deal, but not because of the product*

On March 6, an unknown Chinese startup named Butterfly Effect 蝴蝶效应 launched [Manus](https://www.chinatalk.media/p/manus-chinas-latest-ai-sensation), the world’s first general-purpose AI agent. Revisiting the [“Introducing Manus”](https://www.youtube.com/watch?v=K27diMbCsuw) video that went viral nine months ago is a reminder of how quickly technology has developed: the capabilities Manus demonstrated — reviewing a folder of résumé PDFs, researching stocks, and comparing real estate options — are now so common that we barely think of them as new or even particularly agentic. But back then, [some thought Manus was a second “China Shock” of sorts after DeepSeek](https://www.chinatalk.media/p/manus-chinas-latest-ai-sensation). Jordan discussed Manus on the podcast with (Strange Loop Canon), Swyx from , and (Mercatus, Hyperdimensional) on the podcast [here](https://podcasts.apple.com/us/podcast/manus-a-deepseek-moment/id1289062927?i=1000698639495).

Soon after, Manus didn’t want to be Chinese anymore. In July, the company [scrubbed](https://www.scmp.com/tech/tech-trends/article/3318310/manus-ai-lays-china-staff-scrubs-social-media-shelves-mainland-service) its internet presence inside China, relocated to Singapore, and laid off most of its staff in Beijing and Wuhan. An April funding round led by the American venture capital firm Benchmark had been scrutinized by the US Treasury Department over restrictions on investments into Chinese AI development. Manus may have decided that its Chinese base is a worthy sacrifice if it means access to American capital and the global market.

Since then, its market strategy has been anything but understated: from exclusive parties in San Francisco to conference [keynotes](https://malaysia.news.yahoo.com/china-born-ai-firm-manus-044821806.html) in Singapore, Manus is trying to reinvent itself as a global force spearheading agents. Whether or not this rebrand is successful remains to be seen; in the meantime, it is no longer the only agent in the game, as major AI companies like [OpenAI](https://openai.com/index/introducing-chatgpt-agent/) and [ByteDance](https://www.techinasia.com/news/bytedance-zte-unveils-prototype-phone-featuring-doubao-ai-agent) launched agent products of their own.

Looking back, Manus was the start of a wave of Chinese AI companies aggressively pursuing international expansion in the second half of this year. With DeepSeek providing that the world was interested in open-source Chinese models, other companies became eager for a slice of the lucrative global market. Whether or not their Chinese roots limit their growth potential will be up to regulators in 2026 and beyond.

### The Open Source Race

*The defining paradigm*

With DeepSeek shooting the first shot, this year saw a significant number of Chinese companies contributing excellent models to the open source race. In the process of promoting their models, Chinese labs have also become much less secretive.

We [covered](https://www.chinatalk.media/p/kimi-k2-the-open-source-way) Kimi K2, a “thinking” model whose architecture is inspired by DeepSeek, in July, with much of the reportage based on blogs and comments Kimi engineers shared online. Since then, [we were also able to interview Li Zixuan](https://www.chinatalk.media/p/the-zai-playbook), director of product at Z.ai (formerly Zhipu), which makes the popular GLM models. 2026 will almost certainly see more Chinese AI companies leverage open source as a mean of expanding influence.

# China and AGI

Does China believe in AGI, and is it working to pursue it? It’s a question hotly debated by observers of China’s tech scene, and this year we were fortunate to be able to feature some excellent writing that probes at this topic.

In April, an anonymous contributor [staged a Platonic debate](https://www.chinatalk.media/p/is-china-agi-pilled) between a believe and a skeptic, laying out arguments for and against the question of Chinese AGI belief.

In May, another anonymous writer [covered the Politburo “study session” on AI](https://www.chinatalk.media/p/xi-takes-an-ai-masterclass). We learn from the invited guest list that “Xi’s hand-chosen experts on AI seem more like the Yoshua Bengios and Geoffrey Hintons of the Chinese AI world than the Yann LeCuns”:

Alibaba, whose family of Qwen models gained particular prominence in the latter half of this year, held its annual Yunqi Conference in September, and CEO Eddie Wu delivered a landmark speech sketching out his vision for transformative AI. Guest contributor Afra Wang argues that [prophetic styles signal a “vibe shift” in Chinese tech](https://www.chinatalk.media/p/alibabas-agi-prophecy), as the industry begins to see itself as pivotal for the nation’s destiny.

# The Chip War

*Just make up your mind already!*

For most of the year, we waited with baited breath for the Trump administration to decide whether to export advanced AI chips to China — and for Beijing to make up its mind on whether it wants them after all. All this drama led to five emergency pods! A quick timeline to refresh our memory:

-   Jan: Biden’s AI diffusion rule ([emergency pod](http://\) https://www.chinatalk.media/p/emergency-edition-ai-diffusion-export))
    
-   April: BIS closed loopholes in Biden-era chip and manufacturing equipment export controls, further restricting Chinese access;
    
-   May: Commerce Department kills the Biden Administration’s Diffusion Rule via Q&A but weirdly still hasn’t fully changed the reg…
    
-   July: America’s AI Action Plan called for stricter enforcement of export controls and exploration of location verification mechanisms ([our coverage](https://www.chinatalk.media/p/trumps-ai-action-plan-observations))
    
-   The Summer of Jensen (reported by ChinaTalk [here](https://www.chinatalk.media/p/how-china-learned-to-hate-the-h20) and discussed with Lennart Haim and Chris Miller [here](https://www.chinatalk.media/p/emergency-pod-h20-drama)):
    
    -   July 15: Jensen Huang met Trump and secured permission to resume sales of H20s to China;
        
    -   July 30: The Cyberspace Administration of China (CAC) summoned Nvidia’s representatives over risks of Nvidia being able to control H20s remotely, accusing them of having a “kill switch”;
        
    -   August 11: The Trump administration reached a deal with AMD and Nvidia to resume exports of H20s and MI308s to China, with the US government receiving 15% of the resulting revenue;
        
    -   August 12: The CAC summoned top Chinese tech firms to pressure them to reduce H20s orders and supplant with domestic alternatives;
        
    -   August 13: *Reuters* [reported](https://www.reuters.com/world/china/us-embeds-trackers-ai-chip-shipments-catch-diversions-china-sources-say-2025-08-13/) that US officials have been secretly putting tracking devices into some high-end chips in order to track diversion to China;
        
    -   August 21: [Reports](https://www.theinformation.com/articles/nvidia-orders-halt-h20-production-china-directive-purchases) emerge that Nvidia has asked some suppliers to halt production of H20s.
        
-   September: BIS unveiled an Affiliates Rule, which would have hit many more Chinese companies with restrictions on chip access, including their ability to purchase legacy chips;
    
-   October: the Trump-Xi Summit produced a deal, with China suspending its [new](https://www.chinatalk.media/p/rare-earths-restrictions-china-reacts), dramatic [rare earths export restrictions](https://www.chinatalk.media/p/emergency-pod-rare-earth-export-controls) for one year in exchange for a temporary suspension of the Affiliates Rule ([emergency pod](https://www.chinatalk.media/p/emergency-pod-rare-earth-export-controls))
    
-   November: The GAIN AI Act was introduced in the Senate, with the White House apparently [lobbying against it](https://www.axios.com/2025/11/19/white-house-block-bill-restricting-ai-chip-exports);
    
-   December: Trump announced that he will permit Nvidia to sell H200s to China ([emergency pod](https://www.chinatalk.media/p/emergency-pod-trump-to-sell-h200s)).
    

Huawei is Beijing’s champion for creating an alternative ecosystem to Nvidia’s. Guest contributor Mary Clare McMahon [explored](https://www.chinatalk.media/p/can-huawei-compete-with-cuda?) how Huawei is working to bypass the CUDA moat in May, and in June Jordan sat down with veteran journalist Eva Dou to [discuss](https://www.chinatalk.media/p/the-house-of-huawei?) her new book, *The House of Huawei*. In October, Jordan also [interviewed](https://www.chinatalk.media/p/why-huawei-cant-catch-nvidia?) Chris McGuire, former Deputy Senior Director for Technology and National Security at the NSC, about where Huawei’s capabilities might be going.

The rise of reasoning models and inference training has also brought attention towards high-bandwidth memory (HBM), where China still currently relies on the Big Three: the US’s Micron, and South Korea’s SK Hynix and Samsung. Contributors [Ray Wang](https://www.chinatalk.media/p/mapping-chinas-hbm-advancement?) and [Aqib Zakaria](https://www.chinatalk.media/p/will-china-hit-the-hbm-wall?) covered China’s pursuit of indigenous HBM this year, exploring CXMT’s capabilities in the face of lithography export controls.

### Robots

*Too soon to tell…*

A wave of attention gathered around robotics and embodied AI in China this year. The Government Work Report this year explicitly mentioned embodied AI for the first time, placing it alongside longstanding tech aspirations like quantum and 6G. The Ministry of Industry and Information Technology (MIIT) specifically named humanoid robots in its list of work priorities for 2025. And throughout the second half of 2025, the Chinese Institute of Electronics has been working on [standards](https://www.cie.org.cn/list_42/15505.html) for the humanoid robots industry, responding to an apparently “urgent” need for standardization in an increasingly competitive field.

Inside China, buoyed by media attention and Unitree’s [Spring Festival Gala appearance](https://www.youtube.com/watch?v=Fw_dSNxhhY4) in January, competition in humanoid robots turned white-hot this year. At least ten companies released humanoid robot models. Some compete by offering increasingly low per-unit prices, while others are starting to pursue specialization in terms of capabilities.

Embodied AI sits at the intersection of China’s longstanding manufacturing advantage and recent advances in machine learning research like vision-language models (VLMs). Jordan sat down with Ryan Julian of Google DeepMind to [discuss](https://podcasts.apple.com/us/podcast/the-robotics-revolution/id1289062927?i=1000726443506) some of these advances in robotics research this September. Some industry observers in China are worried that humanoids, and embodied AI in general, will turn out to be a bubble, given the sudden rush of investment and a lack of obvious business models. In the meantime, American policymakers are beginning to [fret](https://www.thewirechina.com/2025/11/23/while-politicians-fret-unitree-is-selling-robots-across-america-unitree-police-robot/) about Chinese robotics firms’ impressive market shares and Western academia’s reliance on affordable Chinese hardware. It’s too early to tell if 2025 was the start of something seismic in robotics.

[

![](https://substackcdn.com/image/fetch/$s_!noln!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24c8e84a-6e54-4934-9c33-334cf912baab_6473x4317.jpeg)



](https://substackcdn.com/image/fetch/$s_!noln!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24c8e84a-6e54-4934-9c33-334cf912baab_6473x4317.jpeg)
*Track and field at the inaugural World Humanoid Robot Games in Beijing this year.*

# Policy

### AI+ Plan

*Big deal; results unknown*

On August 28, the State Council released its “Opinion on In-Depth Implementation of the ‘Artificial Intelligence+’ Initiative” (关于深入实施“人工智能+”行动的意见, hereafter abbreviated to “AI+ Plan”). The Plan is a landmark document addressing the integration of AI into China’s economy and society and pushes for thorough AI diffusion across sectors, ministries, and regions. It does not address geopolitical competition much, but clearly portrays AI integration as a strategic priority for the country.

We [dove deeply](https://www.chinatalk.media/p/chinas-new-ai-plan) into the AI+ Plan after it was released. Its extraordinarily comprehensive scope, intense sense of urgency, and framing of open-source models as geostrategic assets were remarkable then and remain relevant now. Going into next year, however, knock-on effects will reach Beijing’s doorsteps. How far is “emotional consumption,” greenlit as an application by the AI+ Plan, allowed to go, as [AI companions](https://www.chinatalk.media/p/why-america-builds-ai-girlfriends) become more alluring and mental health issues potentially proliferate? Will the state be able to keep frustrations around unemployment at bay amid [deflation](https://www.theatlantic.com/international/2025/12/china-deflation-american-inflation-market-interference/685078/)? If AI capabilities are [“jagged,”](https://helentoner.substack.com/p/taking-jaggedness-seriously) to quote Helen Toner, will Beijing need to adjust expectations for how different industries’ productivities will change with AI?

### The Global AI Governance Action Plan

*Mid-sized deal with MFA characteristics*

A follow-up from the 2023 Global AI Governance Initiative, the [Global AI Governance Action Plan](https://un.china-mission.gov.cn/eng/zgyw/202507/t20250729_11679232.htm) was released on July 26 at the World AI Conference (WAIC) in Shanghai. China has long sought to create an overarching narrative for international AI governance. The Global AI Governance Action Plan should be understood as part of its campaign to win hearts and minds around the globe, particularly among unaligned nations in the developing world seeking technology partners.

In hindsight, there is a link between the third item of the Global AI Governance Action Plan, which discusses integration of AI into nearly every industry internationally, and the “AI+” plan for domestic AI diffusion that was released later in the year (to be discussed next). Sector-agnostic, large-scale adoption is a conceptualization of AI that is articulated consistently in Chinese tech policy.

Beyond this, however, most of the other items in the Global AI Governance Action Plan are yet to be realized. Without naming the US, the Plan stresses “global solidarity” and warns against fragmentation. China seeks an active role in international AI governance, whether in standards, environmental management, or data sharing. Diplomatic currents move slowly, and we will likely see more AI policy outreach from Beijing towards developing countries in the coming months and years.

### Labelling Requirements, and How to Evade Them

*Nothingburger, sadly*

Just one day after Manus on March 7, the Cyberspace Administration of China (CAC) released a draft of its [“Measures for Labeling of AI-Generated Synthetic Content” (人工智能生成合成内容标识办法)](https://www.chinalawtranslate.com/en/ai-labeling/), which later came into force in September. The Measures require internet service providers to explicitly label AI-generated content on users’ feeds and add implicit labels to the metadata of synthetic content files. Platforms, in theory, should make it known to users whenever the latter interact with potentially AI-generated content, as well as make sure that creators proactively label their uploaded content as AI-generated. This makes China one of the first jurisdictions, and certainly the largest, to implement labelling or watermarking rules for AI-generated internet content.

The CAC is ostensibly well-placed to roll out AI content labelling regulations, given its unparalleled regulatory reach and China’s competitive position in AI technology. However, after a rush of actions by companies to comply in September, momentum has fallen by the wayside. ChinaTalk will have more coverage on this soon, but in a nutshell, the landscape for AI content labelling enforcement is uneven at best. (Anecdotally, I see unlabelled, AI-generated content on Xiaohongshu and WeChat almost every day. Especially in the case of AI-generated text, labelling is next to nonexistent.)

AI-assisted and -generated content is now so much more pervasive online than nine months ago, whether on global platforms or on the Chinese internet. It’s time to ask: what was the point of labelling as policy? Is it to actually protect users from misinformation and engender trust, or is it just a stopgap measure that lets platforms evade responsibility? What kinds of AI usage merit which kinds of mandated disclosures?

*A clearly AI-generated video on Rednote/Xiaohongshu. The user’s self-chosen name is “Mimi Loves AI,” but apart from that there is no other indication that the video is AI-generated.*