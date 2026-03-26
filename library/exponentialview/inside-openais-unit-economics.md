---
title: "👀 Inside OpenAI's unit economics"
author: "Azeem Azhar"
publication: ""
publication_slug: "exponentialview"
published_at: "2026-01-28T23:35:01.000Z"
source_url: "https://www.exponentialview.co/p/inside-openais-unit-economics-epoch-exponentialview"
word_count: 4059
estimated_read_time: 21
---

AI companies are being priced into the hundreds of billions. That forces one awkward question to the front: do the unit economics actually work?

Jevons’ paradox suggests that as tokens get cheaper, demand explodes. You’ve likely felt some version of this in the last year. But as usage grows, are these models actually profitable to run?

In our collaboration with [Epoch AI](https://epoch.ai/), we tackle that question using OpenAI’s GPT-5 as the case study. What looks like a simple margin calculation is closer to a forensic exercise: we triangulate reported details, leaks, and Sam Altman’s own words to bracket plausible revenues and costs.

Here’s the breakdown.

— Azeem

\---

## Can AI companies become profitable?

#### Lessons from GPT-5’s economics

*Originally published on [Epoch AI’s blog](https://epoch.ai/gradient-updates/can-ai-companies-become-profitable). Analysis by , Exponential View’s , and*

Are AI models profitable? If you ask [Sam Altman](https://www.axios.com/2025/08/15/sam-altman-gpt5-launch-chatgpt-future) and [Dario Amodei](https://open.substack.com/pub/cheekypint/p/a-cheeky-pint-with-anthropic-ceo?r=5erk95&selection=97f244b2-8e86-48a6-a4d4-ea366c90bc83&utm_campaign=post-share-selection&utm_medium=web&aspectRatio=instagram&textColor=%23ffffff&bgImage=true), the answer seems to be yes — it just doesn’t appear that way on the surface.

Here’s the idea: running each AI model generates enough revenue to cover its own R&D costs. But that surplus gets outweighed by the costs of developing the *next* big model. So, despite making money on each model, companies can lose money each year.

This is big if true. In fast-growing tech sectors, investors typically accept losses today in exchange for big profits down the line. So if AI models are already covering their own costs, that would paint a healthy financial outlook for AI companies.

But we can’t take Altman and Amodei at their word — you’d expect CEOs to paint a rosy picture of their company’s finances. And even if they’re right, we don’t know just *how* profitable models are.

To shed light on this, we looked into a notable case study: using public reporting on OpenAI’s finances,[1](#footnote-1) we made an educated guess on the profits from running GPT-5, and whether that was enough to recoup its R&D costs. Here’s what we found:

-   **Whether OpenAI was profitable to run depends on which profit margin you’re talking about.** If we subtract the cost of compute from revenue to calculate the gross margin (on an accounting basis),[2](#footnote-2) it seems to be about 50% — lower than the norm for software companies (where 60-80% is typical) but still higher than many industries.
    
-   But if you also subtract other operating costs, including salaries and marketing, **then OpenAI most likely made a loss**, even without including R&D.
    
-   **Moreover, OpenAI likely failed to recoup the costs of developing GPT-5 during its 4-month lifetime.** Even using gross profit, GPT-5’s tenure was too short to bring in enough revenue to offset its own R&D costs. So if GPT-5 is at all representative, then at least for now, developing and running AI models is loss-making.
    

This doesn’t necessarily mean that models like GPT-5 are a bad investment. Even an unprofitable model demonstrates progress, which attracts customers and helps labs raise money to train future models — and that next generation may earn far more. What’s more, the R&D that went into GPT-5 likely informs future models like GPT-6. So these labs might have a much better financial outlook than it might initially seem.

Let’s dig into the details.

## **Part I: How profitable is running AI models?**

To answer this question, we consider a case study which we call the “GPT-5 bundle”.[3](#footnote-3) This includes all of OpenAI’s offerings available during GPT-5’s lifetime as the flagship model — GPT-5 and GPT-5.1, GPT-4o, ChatGPT, the API, and so on.[4](#footnote-4) We then estimate the revenue and costs of running the bundle.[5](#footnote-5)

Revenue is relatively straightforward: since the bundle includes all of OpenAI’s models, this is just [their total revenue](https://epoch.ai/data/ai-companies#explore-the-data) over GPT-5’s lifetime, from August to December last year.[6](#footnote-6) This works out to $6.1 billion.[7](#footnote-7)

At first glance, $6.1 billion sounds healthy, until you juxtapose it with the costs of running the GPT-5 bundle. These costs come from four main sources:

1.  **Inference compute**: **$3.2 billion**. This is based on public [estimates](https://www.theinformation.com/articles/openai-spend-100-billion-backup-servers-ai-breakthroughs?rc=spkbjw) of OpenAI’s total inference compute spend in 2025, and assuming that the allocation of compute during GPT-5’s tenure was proportional to the fraction of the year’s revenue raised in that period.[8](#footnote-8)
    
2.  **Staff compensation: $1.2 billion**, which we can back out from [OpenAI staff counts](https://epoch.ai/data/ai-companies?dataView=staff&yAxis=Staff+count#explore-the-data), reports on [stock compensation](https://www.wsj.com/tech/ai/openai-is-paying-employees-more-than-any-major-tech-startup-in-history-23472527), and things like [H1B filings](https://h1bgrader.com/h1b-sponsors/openai-opco-llc-60d97wl6k8/salaries/2025). One big uncertainty with this: how much of the stock compensation goes toward running models, rather than R&D? We assume 40%, matching the fraction of *[compute](https://www.theinformation.com/articles/openai-spend-100-billion-backup-servers-ai-breakthroughs)* that goes to inference. Whether staffing follows the same split is uncertain, but it’s our best guess.[9](#footnote-9)[10](#footnote-10)
    
3.  **Sales and marketing (S&M): $2.2 billion**, assuming OpenAI’s spending on this grew between the first and second halves of last year.[11](#footnote-11)[12](#footnote-12)
    
4.  **Legal, office, and administrative costs: $0.2 billion**, assuming this grew between 1.6× and 2× relative to their [2024 expenses](https://www.theinformation.com/articles/openai-projections-imply-losses-tripling-to-14-billion-in-2026). This accounts for [office expansions](https://aibusiness.com/responsible-ai/openai-signs-partnership-with-uk-government-plans-office-expansion), [new office setups](https://www.reuters.com/world/asia-pacific/openai-open-office-seoul-amid-growing-demand-chatgpt-2025-05-26/), and rising [administrative costs](https://www.reuters.com/world/asia-pacific/openai-open-office-seoul-amid-growing-demand-chatgpt-2025-05-26/) with their growing workforce.
    

So what are the profits? One option is to look at gross profits. This only counts the direct cost of running a model, which in this case is just the inference compute cost of $3.2 billion. Since the revenue was $6.1 billion, this leads to a profit of $2.9 billion, or gross profit margin of 48%, and in line with other estimates.[13](#footnote-13) This is lower than other software businesses (typically [70-80%](https://www.key.com/content/dam/kco/documents/businesses___institutions/2024_kbcm_sapphire_saas_survey.pdf)) but high enough to eventually build a business on.

On the other hand, if we add up all four cost types, we get close to $6.8 billion. That’s somewhat higher than the revenue, so on these terms the GPT-5 bundle made an operating loss of $0.7 billion, with an operating margin of -11%.[14](#footnote-14)

Stress-testing the analysis with more aggressive or conservative assumptions doesn’t change the picture much:[15](#footnote-15)

[

![](https://substackcdn.com/image/fetch/$s_!nHfd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00de449c-3935-431a-ba8f-0d94358f631e_2546x790.jpeg)



](https://substackcdn.com/image/fetch/$s_!nHfd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00de449c-3935-431a-ba8f-0d94358f631e_2546x790.jpeg)
**Confidence intervals are obtained from a Monte Carlo analysis.**

And there’s one more hiccup: OpenAI signed a deal with Microsoft to hand over about [20%](https://www.theinformation.com/articles/openai-gain-50-billion-cutting-revenue-share-microsoft-partners?rc=spkbjw) of their $6.1 billion revenue,[16](#footnote-16) making their losses even larger still.[17](#footnote-17) This doesn’t mean that the revenue deal is entirely harmful to OpenAI — for example, Microsoft also shares revenue back to OpenAI.[18](#footnote-18) And the deal probably shouldn’t significantly affect how we see model profitability — it seems more to do with OpenAI’s economic structure rather than something fundamental to AI models. But the fact that OpenAI and Microsoft [have been](https://techcrunch.com/2025/03/05/u-k-s-competition-authority-says-microsofts-openai-partnership-doesnt-quality-for-investigation/) [renegotiating](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/) this deal suggests it’s a real drag on OpenAI’s path to profitability.

[

![](https://substackcdn.com/image/fetch/$s_!CYan!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba92684e-3bf4-455f-a05c-cbc08f811d1a_1280x1280.jpeg)



](https://substackcdn.com/image/fetch/$s_!CYan!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fba92684e-3bf4-455f-a05c-cbc08f811d1a_1280x1280.jpeg)

In short, running AI models is likely profitable in the sense of having decent gross margins. But OpenAI’s operating margin, which includes marketing and staffing, is likely negative. For a fast-growing company, though, operating margins can be misleading — S&M costs typically grow sublinearly with revenue, so gross margins are arguably a better proxy for long-run profitability.

So our numbers don’t necessarily contradict Altman and Amodei yet. But so far we’ve only seen half the story — we still need to account for R&D costs, which we’ll turn to now.

## **Part II: Are models profitable over their lifecycle?**

Let’s say we buy the argument that we should look at gross margins. On those terms, it was profitable to run the GPT-5 bundle. But was it profitable enough to recoup the costs of developing it?

In theory, yes — you just have to keep running them, and sooner or later you’ll earn enough revenue to recoup these costs. But in practice, models might have too short a lifetime to make enough revenue. For example, they could be outcompeted by products from rival labs, forcing them to be replaced.

So to figure out the answer, let’s go back to the GPT-5 bundle. We’ve already figured out its gross profits to be around $3 billion. So how do these compare to its R&D costs?

Estimating this turns out to be a finicky business. We estimate that OpenAI spent $16 billion on R&D in 2025,[19](#footnote-19) but there’s no conceptually clean way to attribute some fraction of this to the GPT-5 bundle. We’d need to make several arbitrary choices: should we count the R&D effort that went into earlier reasoning models, like o1 and o3? Or what if experiments failed, and didn’t directly change how GPT-5 was trained? Depending on how you answer these questions, the development cost could vary significantly.

But we can still do an illustrative calculation: let’s conservatively assume that OpenAI started R&D on GPT-5 after o3’s [release](https://openai.com/index/introducing-o3-and-o4-mini/) last April. Then there’d still be four months between then and GPT-5’s release in August,[20](#footnote-20) during which OpenAI spent around $5 billion on R&D.[21](#footnote-21) But that’s *still* higher than the $3 billion of gross profits. In other words, **OpenAI spent more on R&D in the four months preceding GPT-5, than it made in gross profits during GPT-5’s four-month tenure.**

[

![](https://substackcdn.com/image/fetch/$s_!VthJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faf319274-744f-49fc-bb1e-6310f0dc2166_1024x1280.png)



](https://substackcdn.com/image/fetch/$s_!VthJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faf319274-744f-49fc-bb1e-6310f0dc2166_1024x1280.png)

So in practice, it seems like model tenures might indeed be too short to recoup R&D costs. Indeed, GPT-5’s short tenure was driven by external competition — [Gemini 3 Pro](https://www.wired.com/story/openai-gpt-launch-gemini-code-red/) had arguably surpassed the GPT-5 base model within three months.

One way to think about this is to treat frontier models like **rapidly-depreciating infrastructure**: their value must be extracted before competitors or successors render them obsolete. So to evaluate AI products, we need to look at both profit margins in inference as well as the time it takes for users to migrate to something better. In the case of the GPT-5 bundle, we find that it’s decidedly unprofitable over its full lifecycle, even from a gross margin perspective.

## **Part III: Will AI models become profitable?**

So the finances of the GPT-5 bundle are less rosy than Altman and Amodei suggest. And while we don’t have as much direct evidence on other models from other labs, they’re plausibly in a similar boat — for instance, Anthropic has [reported](https://www.theinformation.com/articles/anthropic-lowers-profit-margin-projection-revenue-skyrockets) similar gross margins to OpenAI. So it’s worth thinking about what it means if the GPT-5 bundle is at all representative of other models.

The most crucial point is that these model lifecycle losses aren’t necessarily cause for alarm. AI models don’t need to be profitable *today*, as long as companies can convince investors that they will be in the future. That’s standard for fast-growing tech companies.

Early on, investors value growth over profit, believing that once a company has captured the market, they’ll eventually figure out how to make it profitable. The archetypal example of this is Uber — they accumulated a [$32.5 billion deficit](https://www.sec.gov/Archives/edgar/data/1543151/000154315123000010/uber-20221231.htm) over 14 years of net losses, before their first profitable year in 2023. By that measure, OpenAI is thriving: revenues are tripling annually, and [projections](https://epoch.ai/gradient-updates/openai-is-projecting-unprecedented-revenue-growth) show continued growth. If that trajectory holds, profitability looks very likely.

And there are reasons to even be *really* bullish about AI’s long-run profitability — most notably, the sheer scale of value that AI could create. [Many](https://www.wired.com/story/sam-altman-says-the-gpt-5-haters-got-it-all-wrong/) [higher](https://www.darioamodei.com/essay/machines-of-loving-grace#:~:text=However%2C%20I%20do%20think%20in%20the%20long%20run%20AI%20will%20become%20so%20broadly%20effective%20and%20so%20cheap%20that%20this%20will%20no%20longer%20apply.%20At%20that%20point%20our%20current%20economic%20setup%20will%20no%20longer%20make%20sense%2C%20and%20there%20will%20be%20a%20need%20for%20a%20broader%20societal%20conversation%20about%20how%20the%20economy%20should%20be%20organized.)\-[ups](https://www.youtube.com/watch?v=PqVbypvxDto&t=2309s) [at](https://x.com/elonmusk/status/1980765809338147193) AI companies expect AI systems to outcompete humans across virtually all economically valuable tasks. If you truly believe that in your heart of hearts, that means potentially capturing [trillions of dollars](https://epoch.ai/epoch-after-hours/ai-in-2030#:~:text=So%20I%20think%20one,trying%20to%20capture%20that.) from labor automation. The resulting revenue growth could dwarf development costs even with thin margins and short model lifespans.

That’s a big leap, and some investors won’t buy the vision. Or they might doubt that massive revenue growth automatically means huge profits — what if R&D costs scale up like revenue? These investors might pay special attention to the profit margins of current AI, and want a more concrete picture of how AI companies could be profitable in the near term.

There’s an answer for these investors, too. Even if you doubt that AI will become good enough to spark the intelligence explosion or [double human lifespans](https://www.darioamodei.com/essay/machines-of-loving-grace#1-biology-and-health), there are still ways that AI companies could turn a profit. For example, OpenAI is now [rolling out ads](https://x.com/openai/status/2012223373489614951) to some ChatGPT users, which could add between [$2 to 15 billion](https://www.theinformation.com/articles/openais-international-conundrum) in yearly revenue even without any user growth.[22](#footnote-22) They’re moving beyond individual consumers and increasingly [leaning on enterprise adoption](https://www.youtube.com/watch?v=tUVSuFT301U). Algorithmic innovations mean that running models could get many times [cheaper](https://epoch.ai/data-insights/llm-inference-price-trends) each year, and [possibly much faster](https://www.exponentialview.co/p/ai-is-ready-is-your-company). And there’s still a lot of [room to grow](https://www.exponentialview.co/p/can-openai-reach-100-billion-by-2027) their user base and usage intensity — for example, ChatGPT has close to [a billion users](https://epochai.substack.com/p/the-changing-drivers-of-llm-adoption), compared to around [six billion](https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/) internet users. Combined, these could add many [tens of billions of revenue](https://www.exponentialview.co/p/can-openai-reach-100-billion-by-2027).

It won’t necessarily be easy for AI companies to do this, especially because individual labs will need to come face-to-face with AI’s “depreciating infrastructure” problem. In practice, the “state-of-the-art” is often [challenged](https://www.exponentialview.co/p/openais-narrow-100-billion-path) within months of a model’s release, and it’s hard to make a profit from the latest GPT if Claude and Gemini keep drawing users away.

But this inter-lab competition doesn’t stop all AI models from being profitable. Profits are often high in oligopolies because consumers have limited alternatives to switch to. One lab could also pull ahead because they have some kind of algorithmic “secret sauce”, or they have more compute.[23](#footnote-23) Or they develop [continual learning](https://epoch.ai/gradient-updates/the-huge-potential-implications-of-long-context-inference) techniques that make it [harder for consumers to switch](https://epoch.ai/epoch-after-hours/luis-garicano-not-so-simple-macroeconomics-of-ai#:~:text=So%20I%20would%20think%20that%20that%20layer%20remains%20quite%20competitive%2C%20with%20one%20caveat%2C%20which%20is%20the%20introduction%20of%20switching%20costs%20through%20memory.%20If%20the%20system%20starts%20to%20remember%20you%20and%20starts%20to%20know%20who%20you%20are%2C%20then%20switching%20systems%20is%20going%20to%20be%20costly.) between model providers.

These competitive barriers can also be circumvented. Companies could form their own niches, and we’ve already seen that to some degree: Anthropic is [pursuing](https://www.businessinsider.com/anthropic-ceo-dario-amodei-drags-openai-and-google-code-red-2025-12) something akin to a “code is all you need” mission, Google DeepMind wants to “[solve intelligence](https://www.technologyreview.com/2016/03/31/161234/how-google-plans-to-solve-artificial-intelligence/)” and use that to solve everything from cancer to climate change, and Meta strives to make [AI friends too cheap to meter](https://www.meta.com/superintelligence/). This lets individual companies gain revenue for longer.

So will AI models (and hence AI companies) become profitable? We think it’s very possible. While our analysis of the GPT-5 bundle is more conservative than Altman and Amodei hint at, what matters more is the trend: Compute margins are falling, enterprise deals are stickier, and models can stay relevant longer than the GPT-5 cycle suggests.

\---

*Authors’ note: We’d like to thank* *, Josh You, David Owen,* *, Ricardo Pimentel,* *,* *, Lynette Bye, Jay Tate,* *, Juan García, Charles Dillon, Brendan Halstead, Isabel Johnson and Markov Gray for their feedback and support on this post. Special thanks to* *for initiating this collaboration and vital input, and* *for in-depth feedback and discussion.*

[1](#footnote-anchor-1)

Our main sources of information include claims by OpenAI and their staff, and reporting by [The Information](https://www.theinformation.com/), [CNBC](https://www.cnbc.com/) and the [Wall Street Journal](https://www.wsj.com/). We’ve linked our primary sources through the document.

[2](#footnote-anchor-2)

Technically, gross margins should also include staff costs that were essential to delivering the product, such as customer service. But these are likely a small fraction of salaries, which are in turn dominated by compute costs — so it won’t affect our analysis much, as we’ll see.

[3](#footnote-anchor-3)

We focus on OpenAI models because we have the most financial data available on them.

[4](#footnote-anchor-4)

Should we include Sora 2 in this bundle? You could argue that we shouldn’t, because it runs on its own platform and is heavily subsidized to kickstart a [new social network](https://www.bloomberg.com/news/newsletters/2025-12-05/enthusiasm-for-openai-s-sora-fades-after-initial-creative-burst), making its economics quite different. However, we find that it’s likely a rounding error for revenues, since people [don’t use it much](https://www.bloomberg.com/news/newsletters/2025-12-05/enthusiasm-for-openai-s-sora-fades-after-initial-creative-burst). In particular, the Sora app had close to [9 million downloads](https://sherwood.news/tech/openais-sora-2-started-off-scorching-hot-things-have-slowed-down-since/) by December, compared to around [900 million weekly active users](https://epochai.substack.com/p/the-changing-drivers-of-llm-adoption) of ChatGPT.

Now, while it likely didn’t make much revenue, it might have been costly to serve — apparently making [TikTok-esque](https://openai.com/index/sora-2/) [AI short-form videos](https://www.nytimes.com/2025/10/19/opinion/ai-sora-slop.html) using Sora 2 cost OpenAI several hundred million dollars. Here’s a rough estimate: In November (when app downloads [peaked](https://sherwood.news/tech/openais-sora-2-started-off-scorching-hot-things-have-slowed-down-since/)), Sora 2 had “[almost seven million generations happening a day](https://sequoiacap.com/podcast/openai-sora-2-team-how-generative-video-will-unlock-creativity-and-world-models/#:~:text=I%20think%20we%20have%20almost%20seven%20million%20generations%20happening%20a%20day)”. Assuming generations were proportional to [weekly active users](https://www.similarweb.com/app/google/com.openai.sora/#overview) over time, this would mean 330 million videos in total. The API cost is [$0.1/s](https://web.archive.org/web/20260117001407/https://openai.com/api/pricing/), so if the average video was 10s long, and assuming the API compute profit margin was 20%, this adds up to 330 million × $0.1 × 10 / 1.2 ≈ $250 million. This is significant, but it’s minor compared to OpenAI’s overall inference compute spend.

[5](#footnote-anchor-5)

Ideally we’d have only looked at a single model, but we only have data on costs and revenues at the company-level, not at the release-level, so we do the next best thing.

[6](#footnote-anchor-6)

For the purposes of this post, we assume that GPT-5’s lifetime started when GPT-5 was released ([Aug 7th](https://openai.com/index/introducing-gpt-5/)) and ended when GPT-5.2 was released ([Dec 11th](https://openai.com/index/introducing-gpt-5-2/)). That might seem a bit odd — after all, isn’t GPT-5.2 based on GPT-5? We thought so too, but GPT-5.2 has a new knowledge cutoff, and is [apparently](https://azure.microsoft.com/en-us/blog/introducing-gpt-5-2-in-microsoft-foundry-the-new-standard-for-enterprise-ai/#:~:text=The%20GPT%2D5.2%20series%20is%20built%20on%20new%20architecture) “built on a new architecture”, so it might have a different base model from the other models under the GPT-5 moniker.

Admittedly, we don’t know for sure that GPT-5.2 uses a different base model, but it’s a convenient way to bound the timeframe of our analysis. And it shouldn’t matter much for our estimates of profit margins, because we’re simply comparing revenues and costs over the same time period.

Also note that GPT-5 and GPT-5.1 are still available through ChatGPT and OpenAI’s API, so their useful life hasn’t strictly ended. We assume, for simplicity, that usage has been largely displaced by GPT-5.2.

[7](#footnote-anchor-7)

In July, OpenAI had its first month with over [$1 billion](https://www.cnbc.com/2025/08/20/openai-compute-ai.html) in revenue, and it closed the year with an annualized revenue of over [$20 billion](https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/) ($1.7 billion per month). If this grew exponentially, the average revenue over the four months of GPT-5’s tenure would’ve been close to $1.5 billion, giving a total of $6 billion during the period.

[8](#footnote-anchor-8)

Last year, OpenAI earned about [$13 billion](https://www.theinformation.com/briefings/openai-track-top-13-billion-revenue?rc=spkbjw) in full-year revenue, compared to $6.1 billion for the GPT-5 bundle. At the same time, they spent around [$7 billion](https://www.theinformation.com/articles/openai-spend-100-billion-backup-servers-ai-breakthroughs?rc=spkbjw) running all models last year, so if we assume revenue and inference compute are proportional throughout the year, they spent 6.1 billion / 13 billion × 7 billion ≈ $3.3 billion. But in practice, these likely didn’t grow proportionally, because the [compute profit margin for paid users](https://www.theinformation.com/articles/openai-getting-efficient-running-ai-internal-financials-show) increased from 56% in January to 68% in October. This means that inference grew cheaper relative to revenue, saving about 10% in costs, which is $300 million-ish (importantly, both free and [paying](https://www.theinformation.com/articles/chatgpt-subscribers-nearly-tripled-to-15-5-million-in-2024) [users](https://techcrunch.com/2025/10/06/sam-altman-says-chatgpt-has-hit-800m-weekly-active-users/) grew [around 2.6×](https://epoch.ai/data/ai-companies?dataView=usage&yAxis=Weekly+active+users#explore-the-data) over this period from January to October).

This is then offset by an additional $200 million from other sources of IT spending, including e.g., servers and networking equipment. The total is then still around $3.3 billion - $0.3 billion + $0.2 billion = $3.2 billion.

[9](#footnote-anchor-9)

[H1B filings](https://h1bgrader.com/h1b-sponsors/openai-opco-llc-60d97wl6k8/salaries/2025) suggest an average base salary of $310,000 in 2025, ranging from $150,000 to $685,000. This seems broadly consistent with data from [levels.fyi](https://www.levels.fyi/en-gb/companies/openai/salaries), which reports salaries ranging from $144,275 to $1,274,139 as we’re writing this. Overall, let’s go with an average of $310,000 plus around [40%](https://www.bbgbroker.com/cost-of-employee-benefits-2022/) [in benefits](https://web.mit.edu/e-club/hadzima/how-much-does-an-employee-cost.html). We also know that OpenAI’s staff count surged from [3,000 in mid-2025](https://calv.info/openai-reflections#footnote-fnref-1) to [4,000 by the end of 2025](https://www.wsj.com/tech/ai/openai-is-paying-employees-more-than-any-major-tech-startup-in-history-23472527?gaa_at=eafs&gaa_n=AWEtsqe_DtK3xu-WaMFy0UhvovnVcFhPcrhxbGZ63SUUds2O7rDMoNsaWhaI2G4yq5k%3D&gaa_ts=6974ee2a&gaa_sig=w8SmjoETgCEEqEpi_mznXf95P9mcVjOP6AKTUrMiooJctsgLb1eCoGtHJUeAFisybVP-t4MEvAiDqvcLisinmQ%3D%3D). We smoothly interpolate between these to get an average staff count of 3,500 employees during GPT-5’s lifetime.

Then the base salary comes to: 3,500 employees × $310,000 base salary × 1.4 benefits × 40% share of employees working on serving GPT-5 × 127 / 365 period serving ≈ $0.2 billion (the 127 comes from the number of days in GPT-5’s lifetime).

We then need to account for stock compensation. In 2025, OpenAI awarded [$6 billion to employees](https://www.wsj.com/tech/ai/openai-is-paying-employees-more-than-any-major-tech-startup-in-history-23472527) in stock compensation. Assuming they awarded them proportionally to staff count over the year, and given the exponential increase of staff counts, that would indicate that over 42% of the stock was awarded during GPT-5’s lifetime. Assuming 40% goes to operations as before, that results in $6 billion x 42% x 40% = $1 billion stock expense for operating the GPT-5 bundle. The total staff compensation would then be around $1.2 billion.

[10](#footnote-anchor-10)

It’s debatable whether the [very high compensation packages](https://www.cnbc.com/2025/09/06/ai-talent-war-tech-giants-pay-talent-millions-of-dollars.html) for technical staff will continue as the industry matures.

[11](#footnote-anchor-11)

In the first half of 2025, OpenAI spent [$2 billion](https://www.theinformation.com/articles/openais-first-half-results-4-3-billion-sales-2-5-billion-cash-burn) on S&M, which we can convert into a daily rate of $11 million per day. This grew over time (S&M spending doubled from 2024 to H1 2025), so the average pace over GPT-5’s lifetime is higher (we estimate about $17 million a day). If we multiply this by the 127 days in the window, we get a rough total of $2.2 billion.

[12](#footnote-anchor-12)

This corresponds to around 30% of revenue during the period, which [isn’t](https://www.benchmarkit.ai/2025benchmarks) [unusual](https://www.saas-capital.com/blog-posts/spending-benchmarks-for-private-b2b-saas-companies/) compared to other large software companies. For example, [Adobe](https://www.adobe.com/cc-shared/assets/investor-relations/pdfs/adbe-2024-annual-report.pdf), [Intuit](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-25-000035/intu-20250731.htm), [Salesforce](https://www.sec.gov/Archives/edgar/data/1108524/000110852425000006/crm-20250131.htm) and [ServiceNow](https://www.sec.gov/Archives/edgar/data/1373715/000137371525000010/now-20241231.htm) all spent around 27% to 35% of their 2024-2025 revenue in S&M. That said, there are certainly examples with lower spends — for example, [Microsoft](https://www.microsoft.com/investor/reports/ar25/index.html) and [Oracle](https://d18rn0p25nwr6d.cloudfront.net/CIK-0001341439/7455eba6-bb80-41d3-96b7-12111eae648c.pdf) spend 9 to 15% of their revenue on marketing, though note that these are relatively mature firms — younger firms may spend higher fractions on S&M.

[13](#footnote-anchor-13)

Last year, OpenAI reported a [gross profit margin of 48%](https://www.theinformation.com/articles/investors-float-deal-valuing-anthropic-100-billion), which is consistent with our estimates. From the same article, Anthropic expects a similar gross profit margin, suggesting this might be representative of the industry.

[14](#footnote-anchor-14)

How does this compare to previous years? [The Information](https://www.theinformation.com/articles/openai-projections-imply-losses-tripling-to-14-billion-in-2026) reported that in 2024 OpenAI made $4 billion in revenue, and spent $2.4 billion in inference compute and hosting, $700 million in employee salaries, $600 million in G&A, and $300 million in S&M. This implies a gross margin of 40% and an operating margin of 0% (excluding stock compensation).

[15](#footnote-anchor-15)

In broad strokes, we perform a sensitivity analysis by considering a range of possible values for each cost component, then sampling from each to consider a range of plausible scenarios (a Monte Carlo analysis). The largest uncertainties that feed into this analysis are how much staff compensation goes to inference instead of R&D, S&M spending in the second half of 2025, and revenue during GPT-5’s tenure.

[16](#footnote-anchor-16)

Two more caveats to add: first, this 20% rate isn’t publicly confirmed by OpenAI or Microsoft, at least in our knowledge. Second, the revenue sharing agreement is also [more](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/) [complex](https://openai.com/index/next-chapter-of-microsoft-openai-partnership/) than just this number. Microsoft put a lot of money and compute into OpenAI, and in return it gets a significant ownership stake, special rights to use OpenAI’s technology, and some of OpenAI’s revenue. There also isn’t a single well-defined “end date”: some rights are set to last into the early 2030s, while other parts (including revenue sharing) continue until an independent panel confirms OpenAI has reached “AGI”.

[17](#footnote-anchor-17)

Strictly speaking, a revenue share agreement is often seen as an expense that would impact gross margins. But we’re more interested in the unit economics that generalize across models, rather than those that are unique to OpenAI’s financial situation.

[18](#footnote-anchor-18)

The deal was signed in [2019](https://news.microsoft.com/source/2019/07/22/openai-forms-exclusive-computing-partnership-with-microsoft-to-build-new-azure-ai-supercomputing-technologies/), a year before GPT-3 was released, and at this time it may have been an effective way to access compute resources and get commercial distribution. This could’ve been important for OpenAI to develop GPT-5 in the first place.

[19](#footnote-anchor-19)

OpenAI’s main R&D spending is on compute, salaries and data. In 2025, they spent [$9 billion](https://www.theinformation.com/articles/openai-spend-100-billion-backup-servers-ai-breakthroughs) on R&D AI compute, and about [$1 billion](https://www.theinformation.com/articles/anthropic-openai-developing-ai-co-workers?rc=spkbjw) on data (which includes paying for human experts and [RL environments](https://epochai.substack.com/p/an-faq-on-reinforcement-learning)). We can estimate salary payouts in the same way we did in the previous section on inference, except we consider 60% of staff compensation rather than 40%, resulting in an expense of $4.6 billion. Finally, we add about $400 million in offices and administrative expenses, and $600 million in other compute costs (including e.g. networking costs). This adds up to about $16 billion.

[20](#footnote-anchor-20)

In fact, we could be substantially lowballing the R&D costs. GPT-5 has been in the works for a long time — for example, early reasoning models like [o1](https://openai.com/o1/) probably helped develop GPT-5’s reasoning abilities. GPT-5.1 was probably being developed between August and November, covering a good chunk of the GPT-5 bundle’s tenure. But there’s a countervailing consideration: some of the R&D costs for GPT-5 probably help develop *future* models like “GPT-6”. So it’s hard to say what the exact numbers are, but we’re pretty confident that our overall point still stands.

[21](#footnote-anchor-21)

Because OpenAI’s expenses are growing exponentially, we can’t just estimate the share of R&D spending in this period as one-third of the annual total. Assuming a 2.3× annual growth rate in R&D expenses — comparable to the [increase in OpenAI’s R&D compute spending from 2024 to 2025](https://epoch.ai/data/ai-companies?dataView=compute&yAxis=Annual+compute+spend+%28USD%29#explore-the-data) — the costs incurred between April 16 and August 7 would account for approximately 35% of total yearly R&D expenses.

[22](#footnote-anchor-22)

OpenAI was approaching [900 million weekly active users](https://www.theinformation.com/newsletters/ai-agenda/chatgpt-nears-900-million-weekly-active-users-gemini-catching) in December last year. For ads, they project a revenue of [$2 per free user for 2026, and up to $15 per free user for 2030](https://www.theinformation.com/articles/openais-international-conundrum). Combining these numbers gives our estimate of around $2 billion to $15 billion.

[23](#footnote-anchor-23)

For the investors who are willing to entertain more extreme scenarios, an even stronger effect is when “[intelligence](https://situational-awareness.ai/the-free-world-must-prevail/#:~:text=If%20there%20is%20a%20rapid%20intelligence%20explosion%2C%20it%E2%80%99s%20plausible%20a%20lead%20of%20mere%20months%20could%20be%20decisive) [explosion](https://ai-2027.com/#narrative-2027-08-31)” dynamics kick in — if OpenAI pulls ahead at the right time, they could use their better AIs to accelerate their own research, [amplifying](https://epoch.ai/gradient-updates/the-software-intelligence-explosion-debate-needs-experiments) a small edge into a huge lead. This might sound like science fiction to a lot of readers, but representatives from some AI companies have publicly set these as goals. For instance, Sam Altman [claims](https://www.youtube.com/watch?v=ngDCxlZcecw&t=2110s) that one of OpenAI’s goals is to have a “true automated AI researcher” by March 2028.