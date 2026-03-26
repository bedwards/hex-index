---
title: "Addressing Objections to the Intelligence Explosion"
author: "Bentham's Bulldog"
publication: ""
publication_slug: "benthams"
published_at: "2026-01-30T17:36:17.000Z"
source_url: "https://benthams.substack.com/p/addressing-objections-to-the-intelligence"
word_count: 4688
estimated_read_time: 24
---

# 1 Introduction

My guess is that there will soon be an intelligence explosion.

I think the world will witness extremely rapid economic and technological advancement driven by AI progress. I’d put about 60% odds on the kind of growth depicted variously in *[AI 2027](https://blog.ai-futures.org/p/ai-futures-model-dec-2025-update)* and *[Preparing For The Intelligence Explosion](https://www.forethought.org/research/preparing-for-the-intelligence-explosion) (PREPIE),* with GDP growth rates well above 10%, and maybe above 100%. If I’m right, this has very serious implications for how the world should be behaving; a change bigger than the industrial revolution is coming.

In short, the reason I predict an intelligence explosion is that it follows if trends continue at anything like current rates. Specifically, the [trends driving AI improvements](https://www.forethought.org/research/preparing-for-the-intelligence-explosion):

-   **Training compute**: this is the amount of raw computing going into AI training. It’s been growing about 5x per year.
    
-   **Algorithmic efficiency in training**: this is how efficiently the algorithms use computational power. Efficiency has been growing 3x per year. For nearly a decade. Combined, these lead to an effective 15x increase in training compute.
    
-   **Post-training enhancements**: these are the improvements in AI capabilities added after training, and it’s been growing about 3x per year, according to Anthropic’s estimates. These three combine to make it as if compute has been going up ~45x per year.
    
-   **Inference efficiency**: this is how cheaply you can run a model at a given level of efficiency. This cost has been dropping 10x per year, on average, since 2022.
    
-   **Inference compute scaling**: This is the amount of physical hardware going into model inference, and it’s been going up 2.5x per year. If these inference trends continue, they could support a growth in the AI population of 25x per year. And both are on track to continue for quite a while.
    

[

![](https://substackcdn.com/image/fetch/$s_!Qqna!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F533f44d6-2fd5-47fa-8d8a-d40a74a16f0d_1517x735.png)



](https://substackcdn.com/image/fetch/$s_!Qqna!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F533f44d6-2fd5-47fa-8d8a-d40a74a16f0d_1517x735.png)
*From [Epoch](https://epoch.ai/trends).*

The authors of PREPIE write “Putting this all together, we can conclude that even if current rates of AI progress slow by a factor of 100x compared to current trends, total cognitive research labour (the combined efforts from humans and AI) will still grow far more rapidly than before.” They note that “total AI cognitive labour is growing more than 500x faster than total human cognitive labour, and this seems likely to remain true up to and beyond the point where the cognitive capabilities of AI surpasses all humans.”

[

![Line chart showing AI research effort (red curve) growing exponentially at ~25x/year vs human cognitive research effort (gray line) at ~4%/year, with dramatic divergence starting around 2025, illustrating AI's >500x faster growth rate.](https://substackcdn.com/image/fetch/$s_!xasZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F95a59923-0962-4f86-a01b-91c80f792cf5_2481x1334.webp "Line chart showing AI research effort (red curve) growing exponentially at ~25x/year vs human cognitive research effort (gray line) at ~4%/year, with dramatic divergence starting around 2025, illustrating AI's >500x faster growth rate.")



](https://substackcdn.com/image/fetch/$s_!xasZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F95a59923-0962-4f86-a01b-91c80f792cf5_2481x1334.webp)

The chart below illustrates a conservative scenario for growth in AI capabilities, assuming no growth in compute, as well as a less conservative scenario. Even on the conservative scenario, AI research progress will grow 100 times faster than human research progress—rapidly outstripping humans.

[

![](https://substackcdn.com/image/fetch/$s_!HtDm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd49c9354-1a23-47e7-ab6b-f16a041a574a_767x440.png)



](https://substackcdn.com/image/fetch/$s_!HtDm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd49c9354-1a23-47e7-ab6b-f16a041a574a_767x440.png)

The [maximum task length](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) AIs can perform has been doubling roughly every seven months in software, and [trends are similar across other domains](https://www.lesswrong.com/posts/6KcP7tEe5hgvHbrSF/metr-how-does-time-horizon-vary-across-domains). On this trajectory, AIs will reach human levels before too long. They’ll be able to perform tasks that take weeks or months. By this point, they’ll be able to replace many human researchers. With the number of AI models going up 25x per year, once AI reaches human levels, it would be as if the number of human researchers is going up 25x per year.

[

![](https://substackcdn.com/image/fetch/$s_!Rtko!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5a56599-411b-44ba-b994-9b159aca7d40_1381x697.png)



](https://substackcdn.com/image/fetch/$s_!Rtko!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5a56599-411b-44ba-b994-9b159aca7d40_1381x697.png)

And we’ve already got *ridiculously rapid progress.* The PREPIE authors note “On GPQA — a benchmark of Ph.D-level science questions — GPT-4 performed marginally better than random guessing. 18 months later, the best reasoning models outperform PhD-level experts.” And AI [benchmark performance](https://epoch.ai/data-insights/ai-capabilities-progress-has-sped-up) has sped up recently:

[

![](https://substackcdn.com/image/fetch/$s_!mC-6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fac29ed9b-2d9d-4eb6-bc48-b9f6019c60e8_985x592.png)



](https://substackcdn.com/image/fetch/$s_!mC-6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fac29ed9b-2d9d-4eb6-bc48-b9f6019c60e8_985x592.png)

In addition, there are reasons to expect quicker future progress. It’s true that there are diminishing returns to new ideas. However, twice as much AI capacity enables roughly twice as much automating away of research abilities. This is more significant than [ideas getting harder to find](https://www.dwarkesh.com/p/carl-shulman) and means that progress could speed up once we can automate software R&D. [Davidson and Houlden](https://www.forethought.org/research/how-quick-and-big-would-a-software-intelligence-explosion-be) produce a sophisticated model of how much progress automation of software could bring about, and conclude:

[

![](https://substackcdn.com/image/fetch/$s_!zLf2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4b087ac-0ae9-4117-9d5e-a8bf90591c26_861x243.png)



](https://substackcdn.com/image/fetch/$s_!zLf2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4b087ac-0ae9-4117-9d5e-a8bf90591c26_861x243.png)

And note: this model only accounts for AI being used to drive *software* improvements. Automating away *hardware* improvement could speed things up even more. Once AI can automate away the employees involved in chip design for companies like NVIDIA, progress will get even faster—especially given that [most of NVIDIA’s cost is labor either performed by them or companies they outsource to](https://www.dwarkesh.com/p/carl-shulman).

So in short, the argument for the intelligence explosion is:

1.  The trends going into it have been persistent for a while and show no sign of stopping. But if they don’t stop, then an intelligence explosion is imminent. This holds both for the trends going into progress and high-level trends measuring research effort. AI cognitive labor is advancing about 500 times more quickly than human research effort.
    
2.  Even if trends slow down by a factor of 100, there’d still be an intelligence explosion.
    
3.  Billions of dollars are being spent by the smartest people to speed up progress. We should expect all sorts of clever innovations. So while there are some reasons to expect trends to slow down, there are opposite reasons why trends might speed up!
    
4.  Smarter than human AI is possible in principle. Given all the recent innovation, it’s plausibly imminent.
    
5.  Once AI reaches roughly a human level, the enormous number of AI models we can run will be able to automate away a huge amount of research. So if we ever reach roughly human level progress, we’re in for very rapid progress.
    
6.  Just generally progress has been very fast. It’s been faster than people have been projecting. I’d be wary to confidently bet against more continued progress.
    
7.  There’s reason to expect that future progress might speed up once AI can do more of the work in improving AI.
    

If you want more sophisticated formal models, I’d recommend [AI 2027’s](https://blog.ai-futures.org/p/ai-futures-model-dec-2025-update) updated report and [PREPIE](https://www.forethought.org/research/preparing-for-the-intelligence-explosion#3-the-intelligence-explosion-and-beyond).

However, there are a number of objections people have to the intelligence explosion scenario. Here’s why I don’t buy them.

# 2 Long tasks don’t automatically get an intelligence explosion

Here’s a first objection you might have: even if AIs can do long tasks, that doesn’t automatically lead to an intelligence explosion. We already have AIs that can do tasks that take hours, and yet they haven’t automated away all hour-long tasks. The main bottleneck is that AI isn’t good at planning research directions and that it can’t go off on its own. It needs human oversight. If that continues, then there won’t be an intelligence explosion even if the AI can perform tasks that take days or weeks.

I don’t buy this objection:

1.  My claim is that an intelligence explosion is fairly plausible, not guaranteed. Are you really extremely confident that even when we have AIs that can perform tasks that take humans weeks or months, human oversight will be needed?
    
2.  The [AI Futures people](https://docs.google.com/document/d/1ru6Okbxb6XuH18Cz8439sdQJazMV39hNxsWDokh97r0/edit?tab=t.0#heading=h.9sgxfltrr7wj) model how the AI’s ability to plan overall research will change at different points in the intelligence explosion. Their guess is that while this will bottleneck things to some degree, it won’t be enough to prevent an intelligence explosion.
    
3.  Once the AI can do very long tasks, it will be able to—almost at will—produce extended research reports about promising research directions. So my guess is that ability to complete long tasks solves a lot of the research taste problems by default.
    
4.  Once the AI can do long tasks, this will speed up AI software progress. This progress will allow companies to find new innovative ways of improving AI’s ability to do autonomous research.
    
5.  By the time AI can do lots of research, the main bottleneck to real-world deployment in research will be the AI’s ability to research autonomously. We should then expect billions of dollars to be poured into this task, vastly speeding up progress.
    
6.  There’s already been a [decent amount of progress](https://futureoflife.org/ai/are-we-close-to-an-intelligence-explosion/) on these tasks. As notes:
    

> Another requirement for automated AI research is agency – the ability to complete multi-step tasks over long time horizons. Developing reliable agents is quickly becoming the new frontier of AI research. Anthropic [released](https://www.anthropic.com/news/developing-computer-use) a demo of its computer use feature late last year, which allows an AI to autonomously operate a desktop. OpenAI has developed a similar product in the form of AI agent [Operator](https://openai.com/index/introducing-operator/). We are also starting to see the emergence of models designed to conduct academic research, which are showing an impressive ability to complete complex end-to-end tasks. OpenAI’s [Deep Research](https://openai.com/index/introducing-deep-research/) can synthesise (and reason about) existing literature and produce detailed reports in between five and thirty minutes. It scored 26.6% (more than doubling o3’s score) on [Humanity’s Last Exam](https://lastexam.ai/), an extremely challenging benchmark created with input from over 1,000 experts. DeepMind released a [similar research product](https://blog.google/products/gemini/google-gemini-deep-research/) a couple months earlier. These indicate important progress towards automating academic research. If increasingly agentic AIs can complete tasks with more and more intermediate steps, it seems likely that AI models will soon be able to perform human-competitive AI R&D over long time horizons.

# 3 Is METR a bad METRic (ba dum tss)

has an essay criticizing using METR as evidence called “[Against the ‘METR Graph.’](https://arachnemag.substack.com/p/the-metr-graph-is-hot-garbage)” The METR graph, remember, is the one that found that AI can perform software tasks with 50% accuracy that take humans several hours, and this is doubling every seven months. Nathan provides a number of criticisms. First, he notes that those citing the METR graph consistently rely on the graph showing the length of tasks AI can complete with 50% accuracy. The 80% accuracy graph is a lot more modest.

[

![](https://substackcdn.com/image/fetch/$s_!73mD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d8358d4-0d5a-456b-918d-c40645b543a9_908x656.png)



](https://substackcdn.com/image/fetch/$s_!73mD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d8358d4-0d5a-456b-918d-c40645b543a9_908x656.png)

It’s true that AI can only consistently do tasks that take people less than an hour. But still, there’s the same doubling trend. Persistent doubling will solve this. Also, even if AIs can only complete tasks that take people weeks with 50% accuracy, this is still a recipe for a very dramatic change. Being able to quickly complete tasks that take people weeks, even if imperfectly, is still hugely economically useful.

Second, he notes that the “AIs can perform tasks that take people hours,” finding was on the least messy tasks. On the tasks that are more difficult, they have much lower success rates. But so what? Their success rates on those other tasks are still going up. And an AI that can automate away all not super messy tasks and also complete a bunch of long messy tasks can massively accelerate growth. There’s still the same exponential trend in the messier tasks.

He has some more specific criticisms of the data going into the METR graph. I think he’s right that METR is imperfect, but it’s still a pretty useful benchmark. None of his criticisms make me think the METR graph is worth dismissing. It’s still important evidence, and arguably the best evidence. Three other reasons this doesn’t affect my timelines much:

1.  There are other benchmarks on which there’s been lots of progress like [Epoch’s benchmarks](https://epoch.ai/benchmarks).
    
2.  Even without benchmarks, there’s exponential growth in AI inputs like compute and algorithmic efficiency.
    
3.  Even if we simply ignore all benchmarks and just think qualitatively: there’s a huge gap between AIs a few years ago and today. GPT-4 was released not even three years ago. Before GPT-4, AI was basically useless. Now it’s a lot better than a secretary. My friend turned in a totally AI-generated essay and got a perfect grade. Merely thinking qualitatively I’d guess another 10 years’ worth of similar progress seems like a route towards AGI.
    

# 4 Efficient markets?

Markets tend to be pretty efficient. If markets are inefficient, you can bet on that and make money. For this reason, trying to beat the market is generally a fool’s errand. But markets aren’t projecting transformative AI. Calls on interest rates are cheap. If an intelligence explosion is imminent, then probably the big companies are hugely underpriced (as they’ll soon be causing the GDP to double every few years). So, in short, the argument goes, you should trust the market, the market says no intelligence explosion, so no intelligence explosion. I think this has some force but don’t ultimately buy it.

Imagine someone argues for Catholicism. Your reply is “if Catholicism is true, and you get reward from wagering on Catholicism, why haven’t the leading traders figured that out?” You claim that the efficient market hypothesis means that there’s no free lunch in converting to Catholicism.

This would be a bad argument. People are wrong sometimes, even when it pays to be right. The skills that allow accurate valuation of companies near term don’t automatically carry over to philosophy of religion. We should have limited faith in the market’s ability to efficiently predict a one-off event. You succeed as a trader by accurately pricing normal companies in the market, but those skills don’t necessarily carry over to accurately predicting an intelligence explosion.

Some other things that make me skeptical:

1.  There seem like a [decent number of precedents](https://www.lesswrong.com/posts/27h99G7P6fkucKdkk/what-are-the-best-precedents-for-industries-failing-to) where markets have underestimated the transformative impacts of technologies, even when it was clear that they’d be a big deal. Markets underestimated the impacts of solar and COVID. It seems markets sometimes exhibit a normalcy bias and underestimate big exponential trends that predict imminent shift.
    
2.  I just think the inside-view arguments are good enough that, even though I place some serious trust in the outside view arguments, they’re not enough to shift me.
    
3.  My sense is that investors generally haven’t spent much time thinking about the odds of an intelligence explosion spurring rapid rates of growth.
    
4.  Superforecasters, a nice analog for trusting the market outside view, have [hugely underestimated AI progress](https://bounded-regret.ghost.io/scoring-ml-forecasts-for-2023/). In general, EA insiders have a pretty good track record when betting against the market. EAs were, for instance, unusually good at predicting enormous impacts from COVID.
    

# 5 Compute/data hitting a wall?

One reason to be skeptical of imminent AGI is that it looks like gains from increasing compute have been getting increasingly difficult. As [Toby Ord writes](https://www.tobyord.com/writing/the-scaling-paradox), “increasing the accuracy of the model’s outputs \[linearly\] requires exponentially more compute.” My reply:

1.  The trends are fairly robust. The most important trends for continued progress are compute and algorithmic efficiency, but both have been going up for many years. One should always be skeptical of claims that a persistent trend will stop. In particular, there seems to be no strong evidence that algorithmic efficiency has slowed; it’s been going up about 3x per year for about a decade, and it alone continuing would be enough to drive rapid progress. If scaling hits a wall, we should expect *more* investment in algorithmic improvements.
    
2.  Progress from scaling is [likely to continue](https://epochai.substack.com/p/ai-scaling-and-scientific-r-and-d) till at least 2030. Scaling is getting harder, but it looks like there’s still some room to go up with increased scaling.
    
3.  As the charts I cited earlier show, even if there was pretty considerable slowdown on some trends, economic growth could still be amazingly fast. Even if the number of AI models merely doubled every year after reaching human-level capabilities, that would still be like the population of researchers *doubling every single year*.
    
4.  There’s good reason to think AGI is possible in principle. Billions of dollars are being poured into it, and the trend lines look pretty good. These facts make me hesitant to bet against continued progress.
    
5.  As we’ve seen, progress in algorithmic efficiency has been pretty robust. This allows continued growth even if scaling hits a wall. Scaling alone has been a driver of lots of progress, but even if pure scaling is inadequate, [progress can continue](https://www.obsolete.pub/p/is-deep-learning-actually-hitting). Despite some slowdowns in [pretrain compute](https://epoch.ai/data/ai-models), [benchmark performance](https://epoch.ai/benchmarks) is still on trend, partially driven by boosts in reinforcement learning.
    
6.  AIs are currently very useful. However, they are very inefficient at learning compared to humans. This should lead us to suspect that there is lots of room for possible improvement in AI’s ability to learn. Even small improvements in this could lead to extreme progress.
    

Another concern you might have is that AIs might run out of training data. AIs are trained on text. When the text runs out, that might stall progress. However,

1.  AI is unlikely to run out of text until somewhere [between 2026 and 2032](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data). Many estimates of when the intelligence explosion will hit, therefore, mean it could well fall before we run out of data.
    
2.  Progress can continue until [somewhat after we run out of data](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data), by scaling up parameters while keeping the data set constant. This could allow progress even after we run out of text.
    
3.  Given the massive financial stakes involved, we should expect that after AIs run out of data they’ll either: 1) be able to procure more data; or 2) find new ways to make progress even in the absence of more data.
    

# 6 Exponential increases in cost?

Toby Ord has a paper called *[Are the Costs of AI Agents Also Rising Exponentially?](https://www.tobyord.com/writing/hourly-costs-for-ai-agents)* In it, Ord ends up concluding, though the data is somewhat uncertain, likely the cost per hour of AI work is going up.

So, where it once would have cost X dollars to get AIs to complete an hour task, now it takes the AI more than 3X dollars to complete a three-hour task. If this continues, then using AIs to complete longer and longer tasks will get less and less viable. Ord summarizes his findings:

> -   This provides moderate evidence that:
>     
>     -   the costs to achieve the time horizons are growing exponentially,
>         
>     -   even the hourly costs are rising exponentially,
>         
>     -   the hourly costs for some models are now close to human costs.
>         
> -   Thus, there is evidence that:
>     
>     -   the METR trend is partly driven by unsustainably increasing inference compute
>         
>     -   there will be a divergence between what time horizon is possible in-principle and what is economically feasible
>         
>     -   real-world applications of AI agents will lag behind the METR time-horizon trend by increasingly large amounts
>         

This is one of the more serious objections to a near-term intelligence explosion. But it doesn’t undermine my belief that one is plausibly imminent for a few reasons. In this, I agree with Ord, who also thinks that an intelligence explosion is neither a guarantee nor impossible.

1.  As Ord agrees, the data he gathered is somewhat limited and incomplete. We should be wary about drawing confident conclusions based on them.
    
2.  Even if the current method largely consists of throwing more compute at a problem until we get improvements, we should expect future innovations that cut costs. Even if the current method would become economically unsustainable as costs go up, we should expect other methods.
    
3.  Costs on lots of metrics are falling dramatically. [Compute costs](https://epoch.ai/blog/trends-in-gpu-price-performance), for instance, have fallen dramatically and so have [inference costs](https://epoch.ai/data-insights/llm-inference-price-trends). [Performance per dollar has been going up](https://epoch.ai/data-insights/price-performance-hardware). Now, obviously this doesn’t mean that they can scale up the current method indefinitely if the amount of compute used has been growing faster than costs have been falling. But it’s one factor pointing in favor of costs not being prohibitive. This also means that if AI can complete multi-day tasks, even if costs are initially prohibitive, eventually it should be economically viable to carry them out cheaply.
    
4.  Maximum task length matters more than costs to complete because, given falling compute costs, once AI can perform tasks of some length, it won’t be long before it can do so cheaply.
    

I think Ord’s analysis gives some serious reason for skepticism about whether METR trends can continue for long. It might push things back a few years. But overall it doesn’t massively lower my credence in a near-term intelligence explosion.

# 7 Financially viable?

Here’s one concern you might have: it costs a lot of money to train increasingly powerful AI models. Perhaps it won’t be economically viable as AIs are increasingly scaled-up. At some point, investors might stop being willing to pour money into AI. I’m skeptical of this:

1.  Investors have already put enormous amounts of money into AI. Global corporate investment in AI in 2024 was about [250 billion dollars](https://hai.stanford.edu/ai-index/2025-ai-index-report/economy). It’s hard to see why this would stop any time soon.
    
2.  The global GDP is about [100 trillion](https://www.macrotrends.net/global-metrics/countries/wld/world/gdp-gross-domestic-product) dollars, and [50](https://www.ilo.org/resource/news/global-employment-forecast-downgraded-7-million-jobs-2025-amid-rising)\-[70](https://www.dwarkesh.com/p/carl-shulman) trillion of that is labor income. So even being able to automate away a small fraction of it is likely to be worth tens of trillions of dollars.
    
3.  AI companies are already making enormous profits. They mostly appear to be operating at a deficit because they pour their greater investments back into scaling up infrastructure. If one doesn’t include future scale-ups in their costs, then [OpenAI](https://epoch.ai/gradient-updates/can-ai-companies-become-profitable) is already quite near making a profit (others might even be more profitable, given that e.g. Anthropic has much lower costs). And as AI gets nearer to human levels, so it can perform a huge share of jobs, I expect a massive increase in profit.
    
4.  At a high level, there’s a pattern of major increases in AI performance as you throw more money at it. If this pattern continues, as I expect it to, we should expect an increase in AI profitability as capabilities increase. Given the enormous economic impact of human-level AI, I expect that this trend could continue until we get AI that can do most labor.
    
5.  There have [been other cases](https://situational-awareness.ai/racing-to-the-trillion-dollar-cluster/) where big national projects have eaten up a sizeable share of GDP. The Manhattan Project and Apollo programs each respectively took up about .4% of GDP. I could also imagine the U.S. government subsidizing a Manhattan-project-style investment program, so that we don’t fall behind China.
    

It [looks possible](https://situational-awareness.ai/racing-to-the-trillion-dollar-cluster/), with sufficient investment, to overcome supply-side constraints in terms of chips and electricity.

# 8 Non-research bottlenecks

Another objection to an intelligence explosion: research isn’t the only thing one needs for an economic explosion. You also need to do experiments and to build stuff. Just speeding up AI research won’t automatically solve those problems. And there are diminishing returns to pure research given that ideas are getting harder to find.

I agree. I expect research abilities to speed up much faster than economic growth. On the conservative projection in PREPIE, growth in AI research is expected to go 100x faster than growth in human research. The amount of AI research will, in that conservative scenario, be four times higher each year than it was in previous years.

This might sound outrageous, but remember: the number of AI models we can run is going up 25x per year! Once we reach human level, if those trends continue (and they show no signs of stopping) it will be as if the number of human researchers is going up 25x per year. 25x yearly increases is a 95-trillion-fold increase in a decade.

That ridiculous rate of growth makes it a lot easier to overcome technological bottlenecks. It’s easier to run simulations that obviate the need for physical experiments when you have the equivalent of *ten quintillion researchers*. Especially when these researchers can:

-   Run simulations.
    
-   Direct physical labor performed by humans first, and then by robots.
    
-   Make new inventions, leading to rapid technological growth
    
-   Create robotic advancements, leading to a scale-up in industrial power. Once you have robotic factories, these can build and direct still more robots, leading to even faster progress. As you get more factories, it will be cheaper to build still more factories, leading to a [ridiculously rapid industrial explosion](https://www.forethought.org/research/the-industrial-explosion) that balloons until we hit physical limits.
    

Even if you project very severe diminishing returns to research and that progress slows down dramatically, that’s still more than enough to trigger ridiculous rates of economic growth. In [PREPIE](https://www.forethought.org/research/preparing-for-the-intelligence-explosion#ai-human-cognitive-parity), they take really conservative assumptions, maximally finagled to be as conservative as possible, and yet they still end up concluding that we’ll get a century’s worth of technological progress in a decade, if not considerably more.

So in short, yes, this objection is absolutely right. That’s why projections are as conservative as they are. Research progress will advance much faster than economic growth, but growth will still be fast.

Another objection that’s been articulated by Tyler Cowen and Eliezer Yudkowsky: perhaps regulations will strangle progress and prevent AI from being rolled out. But I don’t buy this. As [Carl Shulman notes](https://www.alignmentforum.org/posts/sCCdCLPN9E3YvdZhj/shulman-and-yudkowsky-on-ai-progress), there are many existing industries making up a big slice of GDP that are largely unregulated. Others, even ones that are highly regulated, have the opportunity for serious roll-outs of automation. Manufacturing, for instance, could legally be done by robots; AI would be legally permitted to do lots of software development. Even in regulated fields like healthcare, someone with a license could follow the advice of the machine, which will become increasingly incentivized as AIs get better.

# 9 Stochastic parrot?

A common claim is that AI is just a stochastic parrot. All it does is predict the next word. It lacks true understanding. Thus, we should be skeptical that it will have transformative effects. I think this is a weak objection:

1.  It [isn’t even right](https://stevenadler.substack.com/p/ai-isnt-just-predicting-the-next) that AI is a next-token predictor. AI is trained through RLHF, which combines text prediction with reinforcement learning. So it’s trained to give answers that we approve of. In modern AI models, more sophisticated methods are used. To give answers humans approve of, the AI needs to understand the world. As an analogy, evolution selected for passing on our genes, but this doesn’t mean we’re just gene passers on. The capabilities needed for passing our our genes were also very useful.
    
2.  AIs already can [interpret Winnograd sentences](https://en.wikipedia.org/wiki/Winograd_schema_challenge), [invent](https://techcrunch.com/2026/01/14/ai-models-are-starting-to-crack-high-level-math-problems/) new [math](https://mathstodon.xyz/@tao/115855840223258103) proofs, critique original philosophy arguments, and so on. So even if you deny that AIs have understanding in some deep sense, what they have is clearly enough to allow them to perform all sorts of impressive cognitive feats. There’s no reason to suspect that can’t continue. So any version of the “AIs are just stochastic parrots,” thesis is either flatly inconsistent with current capabilities or irrelevant to the possibility of an intelligence explosion. Or, in the words of Claude:
    

> AIs have autonomously produced novel, formally verified mathematical proofs—proofs that Terence Tao has endorsed as genuine contributions. Whatever 'stochastic parrot' means, it needs to be compatible with producing original mathematics that experts accept.

But if it is, then it’s not clear why it’s not compatible with automating away large sectors of the economy.

# 10 Conclusion

The analysis in PREPIE is, in many ways, conservative. They don’t rely on recursive self-improvement or assume AIs advance far past human levels. Still, going by these conservative projections, they predict ridiculously rapid technological progress imminently.

I haven’t addressed every possible objection as there are basically infinite objections people can make. The ones I find strongest are the two Ord makes as well as the efficient market hypothesis one. These are why I’m only at a bit over 1/2 odds on a near-term intelligence explosion.

A lot of the objections I think miss the mark in that they point out reasons why continued AI progress will be hard. But I agree that it’s hard. The question is not “can continued progress produce an intelligence explosion by simply continuing along the current trajectory?” but instead “will the ridiculously innovative companies that are actively competing and pouring *tens of billions of dollars into building AI* be able to find a way to make the artificial superintelligence that is possible in principle?” My guess is that they will.

You should ask yourself: if I’d bought these objections, would I have predicted current AI capabilities as advanced as they are? People have drastically underpredicted recent AI advances. I think if people had made past predictions based on the skeptical arguments made today, they would have erred even more dramatically.

At the very least, it strikes me as unreasonable to have a credence below 10% on an imminent intelligence explosion. Even a 10% credence means the world is totally mad. Imagine that scientists were projecting 10% odds of an alien invasion in a few decades, where quadrillions of nice and friendly aliens would come down to Earth and (hopefully?) just do research for us. The sane reaction wouldn’t be “well it’s just 10%” odds. It would be to prepare—much more than the world has been preparing so far. In the memorable words of Dan Quayle “One word sums up probably the responsibility of any vice-president, and that one word is ‘to be prepared.’”