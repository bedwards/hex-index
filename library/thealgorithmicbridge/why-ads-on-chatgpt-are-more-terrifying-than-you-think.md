---
title: "Why Ads on ChatGPT Are More Terrifying Than You Think"
author: "Alberto Romero"
publication: "The Algorithmic Bridge"
publication_slug: "thealgorithmicbridge"
published_at: "2025-12-02T07:15:07.000Z"
source_url: "https://www.thealgorithmicbridge.com/p/why-ads-on-chatgpt-are-more-terrifying"
word_count: 1290
estimated_read_time: 7
---

[

![](https://substackcdn.com/image/fetch/$s_!dsCx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ac858ce-357b-4e17-a240-ceaf5d0765d2_1674x1102.png)



](https://substackcdn.com/image/fetch/$s_!dsCx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ac858ce-357b-4e17-a240-ceaf5d0765d2_1674x1102.png)
**[Source](https://x.com/btibor91/status/1994714152636690834): Tibor Blaho**

OpenAI’s silent confirmation that advertising is coming to ChatGPT ([screenshot above](https://x.com/btibor91/status/1994714152636690834)) marks the end of the chatbot’s introductory phase and the beginning of a new nightmare for users. While the timing aligns with [its third anniversary](https://x.com/ChatGPTapp/status/1995236496778158349)—happy birthday to you, I guess—framing this as a self-gift rather than a necessary structural pivot would be naive; [OpenAI will sell ads, or it will die](https://www.thealgorithmicbridge.com/p/you-have-no-idea-how-screwed-openai). (Last-minute news [from](https://www.theinformation.com/articles/openai-ceo-declares-code-red-combat-threats-chatgpt-delays-ads-effort) *[The Information](https://www.theinformation.com/articles/openai-ceo-declares-code-red-combat-threats-chatgpt-delays-ads-effort)* reveal that CEO Sam Altman is sufficiently worried about Google’s Gemini 3 that they’re considering delaying ads and similar initiatives in favor of improving the quality of the model.)

It is a bad sign that this is a forced move rather than a free choice, though: People would complain anyway if OpenAI wanted ad revenue to amass some profits, but that’s standard capitalism; the fact that OpenAI *can’t afford* the things it intends to build *unless* it enables ads suggests a fundamental flaw at the technological level: maybe large language models (LLMs) are not a good business ([the financials don’t paint a pretty picture so far](https://www.thealgorithmicbridge.com/p/im-an-ai-enthusiast-the-bubble-scares)). If that’s the case, then this is not an OpenAI problem but an industry-wide catastrophe: whereas traditional search engines display ads because users want free information, chatbots will have ads because the costs are otherwise untenable.

The unit economics of LLMs have always been precarious; the cost of inference—the computing power required to generate a response, which is, accounting for everything, larger than the cost of training a new model when you serve [800 million people](https://www.businessinsider.com/chatgpt-users-openai-sam-altman-devday-llm-artificial-intelligence-2025-10)—remains high compared to web search because small-ish companies like OpenAI need to rent their compute to cloud companies like Microsoft; their operational expenses are sky-high! (cloud-high one might say). The twenty-dollar subscription tier (chatbot providers all have converged at ~$20/month) was an effective filter for power users, but it was never going to subsidize the massive operational costs of the free tier, which serves as both a user acquisition funnel and a data collection engine (and thus a fundamental piece of the puzzle, in case you wondered why OpenAI offers a free tier in the first place).

(Short note: the reason AI model inference is expensive for OpenAI compared to search for Google—say, a ChatGPT query vs a Google search query—is not that the former requires more energy than the latter; [according to the most recent estimates](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use) they’re in the same ballpark! (Note that this doesn’t account for reasoning queries, which might generate 10x-100x tokens, raising the bill accordingly.) But even if we set aside the cost of reasoning traces, the reason serving AI models is expensive is that they require high-end GPUs that companies like OpenAI or Anthropic or similarly small ones *need to rent* to cloud platforms like AWS, Azure, GCP, or Oracle. Renting GPUs, turns out, is extremely costly.)

The transition from monthly subscription to advertising pushes OpenAI out of “research laboratory selling access to intelligence” territory into “full-blown media company selling access to attention” territory, just like YouTube or Facebook. Let me be clear about this: building AGI (general AI) to “benefit everybody” was always a cool genuine goal but ultimately a distraction; you can promise the heavens for free but only until you need to hit revenue targets to appease investors. OpenAI is not hitting them. When even the biggest companies in the world—actually, the biggest companies in history—[are resorting to debt because they can no longer pay with cash](https://www.thealgorithmicbridge.com/p/why-silicon-valley-cant-afford-its) the immense capital expenditures they’re incurring (they don’t rent GPUs like OpenAI, they build datacenters), you can be sure that smaller companies like OpenAI will have to get their hands dirty and take measures they’d rather not take, like ads, [short video slop](https://www.thealgorithmicbridge.com/p/you-will-die-mid-scroll), and [erotica](https://www.thealgorithmicbridge.com/p/openai-plans-to-add-erotica-to-chatgpt). That's how OpenAI expects to be profitable by 2029 despite [incurring immense costs](https://www.theinformation.com/articles/openai-says-business-will-burn-115-billion-2029) now at a fairly low revenue.

Anyway, I see advertising as a tragic shift in the incentive structure of ChatGPT (generative AI in general, if others follow suit) because, all of a sudden, OpenAI’s primary client is no longer users but the advertiser (subscription revenue matters but a few billion dollars a year is nothing compared to what Google and Facebook make selling ads). We have seen this progression in search and social media (which appears to be a “[business strategy](https://www.wheresyoured.at/the-men-who-killed-google/)”) but applying this model to generative AI introduces unique risks and complexities that we can’t yet understand.

The era of information retrieval (links) is giving way to an era that also includes information synthesis (AI outputs + links), which will eventually evolve (involve?) into an era of just synthesis (no links anymore). Once it happens, it will become immediately clear that monetizing synthesis carries problems that monetizing a list of links don’t. Here are six implications of this shift that will unfold in the coming years:

1.  In-stream advertising
    
2.  The death of the click
    
3.  Visual product placement
    
4.  Targeting your anxieties
    
5.  From SEO to LMO
    
6.  The AI-rich and the AI-poor
    

### I. **In-stream advertising**

The core utility of an LLM is the ability to compress vast amounts of data into a single, coherent answer (that is, when it doesn’t hallucinate). We value this distillation because we assume it is derived from a “[neutral](https://news.stanford.edu/stories/2025/05/ai-models-llms-chatgpt-claude-gemini-partisan-bias-research-study)” weighing of the available facts: ChatGPT goes on Google search and gives you a response from, presumably, a good mix of sources. Advertising introduces a perverse incentive that directly undermines this utility. Unlike a search engine, which presents paid options alongside organic results (already harming the user experience in what’s commonly known as “[enshittification](https://en.wikipedia.org/wiki/Enshittification#Google_Search)”), an LLM will integrate ads into the answer itself.

A study by Sharethrough/IPG Media Labs from 2015 (am eternity ago), conducted on 4,770 consumers using eye-tracking technology, showed that native advertising—ads that blend into content—[are viewed 53% more frequently](https://www.sharethrough.com/blog/ad-effectiveness-study-native-ads-vs-banner-ads) than traditional banners. The bottom line is obvious: the more “disguised” an ad, the more the consumer treats it as part of the information they expected to consume. Now, imagine what happens when the ads are intertwined with the AI output seamlessly—in-stream advertising—like part of the story:

[

![](https://substackcdn.com/image/fetch/$s_!mC9i!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa548f08-56fb-4801-b115-7c131243c31e_731x353.png)



](https://substackcdn.com/image/fetch/$s_!mC9i!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa548f08-56fb-4801-b115-7c131243c31e_731x353.png)
**[Source](https://x.com/Stretchedwiener/status/1993359479627547043): Wetterschneider**

With the global native advertising market projected to [reach $400 billion by 2032](https://finance.yahoo.com/news/native-advertising-market-estimated-usd-140000001.html), the financial pressure to exploit this in-stream inventory will be irresistible and the options are infinite. The number of “viewed ads” will essentially reach 100% (anyone will realize this is quite revolutionary for the advertising industry) because you *don’t avoid* something that you don’t know is there.

Are companies legally required to disclose the ads? Good luck proving the fact that the main character in your generated fanfiction novel drives a 2026 Ford is an ad. If the model is financially incentivized to favor whatever brand, that bias will be woven into the logic of its output, probably at the post-training level (that is, AI companies will reinforce behaviors into the model that align with the advertiser’s interests, for that is the safest, most reliable way to influence the AI’s behavior and they already do this for other reasons, like steering personality). No one except them has access to the post-training data and it’s not possible to do an “inspection” into the model: its [black box nature](https://www.thealgorithmicbridge.com/p/no-one-knows-how-ai-works) prevents tracing the source.

And so the AI model will safely frame the “best” solution not as the most efficient one for the user (what you assume), but as the one that generates the highest yield for the advertiser on a cost-per-mille basis (what you get). I hate when *Black Mirror* [nails the future so accurately](https://en.wikipedia.org/wiki/Common_People_\(Black_Mirror\)) that it feels like an example of the Torment Nexus. But, unfortunately, I don’t think it’s hyperbolic to claim that putting ads into ChatGPT is such an insidious move that we can call it a torment to the digital world.

[

![](https://substackcdn.com/image/fetch/$s_!qYR1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00c3be78-65e3-4916-8980-de318e02c539_728x237.png)



](https://substackcdn.com/image/fetch/$s_!qYR1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00c3be78-65e3-4916-8980-de318e02c539_728x237.png)
**[Source](https://x.com/AlexBlechman/status/1457842724128833538): Alex Blechman**

\---

\---

### II. The death of the click

[Read more](https://www.thealgorithmicbridge.com/p/why-ads-on-chatgpt-are-more-terrifying)