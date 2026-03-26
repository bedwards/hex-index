---
title: "Reader questions: fare-jumping, AI, and DC statehood"
author: "Timothy B. Lee"
publication: "Full Stack Economics"
publication_slug: "fullstackeconomics"
published_at: "2023-01-27T13:04:07.000Z"
source_url: "https://www.fullstackeconomics.com/p/reader-questions-fare-jumping-ai"
word_count: 2134
estimated_read_time: 11
---

Thanks to everyone who left questions in the comments of [Tuesday’s post](https://www.fullstackeconomics.com/p/ask-me-anything). There were a lot of great questions and below I answer four of them.

# Fare-jumping and high-trust societies

**Harry Morse** writes: **“I'd be interested in a longer write-up about fare jumping and high-trust societies.”**

Harry is referring to a tweet thread I did on Wednesday that went a bit viral. Helen Andrews, an editor at the American Conservative who lives here in Washington DC, [observed](https://twitter.com/herandrews/status/1617875151785431050) that she’s been seeing a lot of people jumping over the fare gates on the DC subway. I’ve noticed the same thing—it’s way more common than it was before the pandemic. I [tweeted](https://twitter.com/binarybits/status/1618261214152515586) that “I think a lot of liberals underestimate how much this kind of behavior erodes the norms of social trust and solidarity that make societies work well.”

Let me try to unpack my thinking about this.

The smooth working of a modern society depends on people mostly following the rules even in the absence of strict enforcement:

-   Most people don’t shoplift even if they think they could get away with it.
    
-   Most Americans fill out their tax returns honestly even though the IRS would be unlikely to catch them if they cheated.
    
-   Most people keep the promises they make in contracts even though the courts don’t provide a cost-effective remedy for small-dollar breaches.
    

When norms of trust and cooperation weaken, it adds friction to a lot of everyday interactions. A relatively low-stakes example is that if shoplifting becomes more common, stores start putting more merchandise behind glass, inconveniencing shoppers. If shoplifting gets *really* bad, companies start [shutting down stores](https://www.nbcnews.com/news/us-news/walgreens-closing-5-san-francisco-stores-shoplifting-fears-rcna3015) altogether.

I learned about a more profound example from Matt Yglesias, who last year [wrote](https://www.slowboring.com/p/funding-the-tax-police-is-very-good) that “Italy and Greece are dominated by small, closely held businesses with family-centric management that are reaping huge economic gains by cheating on their taxes. Even the best-run of those companies tend not to expand or professionalize because to do so successfully, they’d have to actually pay what they owe.”

In a [2019 study](https://www.nber.org/papers/w23964), economists Bruno Pellegrino and Luigi Zingales blamed Italy’s slow economic growth on its culture of small, family-owned firms. While this culture seems superficially counterproductive, they argue that it may be an “optimal response to the Italian institutional environment” because “among developed countries, Italy stands out for its patronage-based banking sector, its inefficient legal system, and the diffusion of tax evasion and bribes.”

This is one of many reasons I found it alarming when the US elected Donald Trump president. Trump is not only [notorious for cheating on his taxes](https://www.reuters.com/legal/how-trump-organization-cheated-taxes-2022-12-07/), he has been totally shameless in defending his behavior, arguing during the 2016 campaign that his implausibly small tax bill “makes me smart.” Trump is also notorious for [stiffing contractors](https://www.usatoday.com/story/news/politics/elections/2016/06/09/donald-trump-unpaid-bills-republican-president-laswuits/85297274/) and then daring them to sue him, knowing that the costs of taking him to court would exceed the amounts he owes them.

Overall, American society is still a relatively high-trust society. If you heard about someone you know cheating on your taxes, you’d probably be embarrassed for them, you wouldn’t think “that makes them smart.” But while those norms are pretty durable, they aren’t infinitely so. The more the public sees people flouting the law and facing no consequences, the more cynical they’ll become and the worse our collective behavior is likely to get.

So this is the kind of thing I had in mind when I tweeted about the erosion of social trust. As many, many people pointed out to me on Twitter, there are distinctions you could draw between cheating on your taxes and jumping over a turnstile. Tax cheats are probably more wealthy than turnstile jumpers, and they cost the government far more money. And to be clear, turnstile jumping isn’t anywhere close to being the most important example of eroding public trust in the US.

However, it is one of the most in-your-face examples of antisocial behavior, at least for those of us who live in urban areas. My neighbor might cheat on his taxes but I can’t see him doing it. The highly visible nature of turnstile jumping is problematic because this kind of behavior can be contagious. If I see someone jumping a turnstile while I pay for my ride, I might feel like a sucker and wonder if I should jump the turnstile myself.

Will lax enforcement of subway fares turn the US into Italy? Obviously not. Will it have an impact on the margin? It’s hard to be sure. I have no idea how you’d go about investigating this kind of question empirically. But intuitively it seems like constantly seeing other people ride the subway without paying is going to make the average Washingtonian at least a little bit more cynical about the society they live in. And I bet that bleeds over into other antisocial activities like cheating on their taxes.

# The real threat of AI centralization is law, not hardware

**Scott** writes: **“After reading a lot into ChatGPT and thinking back to other machine learning projects like autonomous taxis, it seems like modern machine learning tools have really gotten to a point where the only viable way to stay competitive is to have a gigantic data center on par with AWS or Azure. Do you think there is any hope for more localized machine learning software, or do you think it will all be consolidated to cloud services for the foreseeable future?”**

I think it’s worth distinguishing between training neural networks and using them. Training a neural network tends to be an extremely resource-intensive process—so much that the most advanced neural networks are likely to require the resources of a large data center for the foreseeable future.

But it’s often much less resource-intensive to use a neural network once it’s been trained. Text-to-image software like Stable Diffusion and DALL-E, for example, have versions you can download and run on a PC.

For several years, big tech companies like Apple and Google have been [working](https://arstechnica.com/gadgets/2019/05/googles-machine-learning-strategy-hardware-software-and-lots-of-data/) to add specialized hardware to smartphones to accelerate neural network operations. This allows some AI software to be run locally on your phone, allowing it to function without an Internet connection and without the privacy worries that come with uploading personal data to the cloud. I expect this silicon to get more powerful over time.

With that said, I think the biggest centralizing factor over the next few years is likely to be access to training data rather than computing hardware. What we’ve found over the last decade is that neural networks get better and better as you throw more data at them. Image generation networks, for example, are trained by looking at millions of images of existing works of art. A small startup—to say nothing of an individual—just doesn’t have the resources to collect a large enough data set to compete with the big guys.

So I suspect the big question for neural network centralization won’t be where the software runs but how it’s licensed. For example, one of the leading text-to-image networks, Stable Diffusion, was trained using a [publicly available data set](https://en.wikipedia.org/wiki/LAION) of images harvested from across the web. Copyright holders have [sued Stable Diffusion](https://www.theverge.com/2023/1/17/23558516/ai-art-copyright-stable-diffusion-getty-images-lawsuit) arguing that they needed a license to train their networks using their copyrighted images.

As far as I know (I’ll be reporting on this more in the coming weeks), there’s no caselaw to tell us whether they’re right. And what the courts decide will have profound implications for how this industry evolves. If the plaintiffs win, then anyone wanting to train deep neural networks for image generation will need to negotiate with a bunch of copyright holders for permission to use their images. Google, Facebook, Apple, and OpenAI (generously funded by Microsoft) can probably afford to do that. Smaller organizations probably can’t. Moreover, these licensing deals would probably require ongoing royalty payments, which would preclude anyone from releasing the trained networks under a permissive open source-style license.

So if plaintiffs win these lawsuits, I think the likely consequence would be to centralize control over these technologies. It might stop being possible to download large open source models and run them on your PC. And while it wouldn’t become impossible for startups to build these systems, the barrier to entry would get a lot higher.

# Statehood for DC, Puerto Rico, and other territories?

**Steven von Christierson** writes: **“Hi, perhaps you could address the pros and cons from the perspective of the territories of the United States and the US government of remaining a territory or of becoming a state. This might include DC, Puerto Rico, the Marshall Islands, Guam, and any others I’ve missed.”**

I think the pros and cons differ among the territories you mention. DC is part of the continental United States, DC residents pay the same federal taxes as residents of other states, and there are already a lot of federal laws that treat DC as if it were a state. So making DC a state wouldn’t make a huge difference in terms of substantive economic policy. Rather, the main issues are about sovereignty and representation.

DC residents, myself included, think it’s unfair that we don’t have voting representatives in our national legislature. We also don’t like the fact that Congress sometimes [overrules the decisions of our elected representatives](https://statehood.dc.gov/page/congressional-intervention) in ways that wouldn’t be allowed if DC were a state.

Opponents mostly focus on the fact that we’d get two senators. It does seem a little silly for DC to have the same number of representatives as California. But Vermont and Wyoming have fewer residents than DC and they each have two senators.

The issues are different for Puerto Rico, a predominantly Spanish-speaking island with 3.2 million residents. DC residents overwhelmingly want statehood, but voters in Puerto Rico are [much more ambivalent](https://en.wikipedia.org/wiki/2020_Puerto_Rican_status_referendum). I haven’t followed this debate closely, but I think one factor is that you can imagine Puerto Rico eventually becoming an independent nation in a way that’s inconceivable for DC.

Puerto Rican statehood would also have more significant policy consequences. Many Puerto Ricans are not required to pay federal income taxes, and many federal programs treat territories like Puerto Rico differently than states. For example, the matching formula for Medicaid [gives territories like Puerto Rico less money](https://www.americanprogress.org/article/without-congressional-action-puerto-rico-faces-severe-medicaid-funding-cuts/) than they’d get if they were states.

I think the most important impact, however, might be in changing how Americans think of the island. When Hurricane Maria devastated the island in 2017, Americans didn’t feel the same sense of urgency about it as they would if the same thing happened to Florida or Texas. Racism probably plays a role here, but I think a more important factor was that a lot of Americans [just don’t know](https://www.nytimes.com/2017/09/26/upshot/nearly-half-of-americans-dont-know-people-in-puerto-ricoans-are-fellow-citizens.html) that Puerto Ricans are American citizens.

If Puerto Rico was the 51st (or 52nd) state, then every school child would learn about it the same way they learn about Hawaii and Alaska today. Over time, I think this would subtly but profoundly change how people think about the island, and make mainland citizens more concerned about what happens there.

I think the considerations for America’s smaller territories, like Guam and the US Virgin Islands, are similar to those for Puerto Rico. However, they have the added problem that they’re *really* small. The next largest territory after Puerto Rico is Guam with around 150,000 people. That’s about a quarter as many people as Wyoming. I don’t think it makes sense to say DC is too small to be a state with 700,000 people. But it’ll be a harder sell to give an island with 150,000 residents two senators.

# Don’t invest in art

**Atul Mori** writes: **“How is fractional investment in art through companies such as Masterworks? Does the management make most of the money? In general, is art a good vehicle for investment?”**

My Full Stack Economics co-founder Alan Cole wrote a [great piece](https://www.fullstackeconomics.com/p/sorry-collectibles-are-terrible-investments) last year on just this question. In a word: no. Art, and collectibles in general, tend not to be good long-term investments.

When you invest in stocks or bonds, the value of your investment can go up in two ways: the asset itself can become more valuable, *and* it pays interest (in the case of bonds) or dividends (in the case of stocks). Companies also sometimes buy back their shares, which gives an extra boost to share prices.

In contrast, if you invest in a piece of art, all of your returns have to come from rising asset values. And while there will always be a few pieces of art that become super famous, there’s no reason to think the average piece of art (or even the average “blue-chip” piece of art, whatever that means) will appreciate more rapidly than the economy as a whole. So I would expect an art portfolio to underperform a portfolio of stocks and bonds even before you account for the quite high fees charged by Masterworks.

Incidentally, this same point applies to other assets that don’t pay dividends, including gold or Bitcoin. Over the long run they are very likely to under-perform a traditional portfolio of stocks and bonds.