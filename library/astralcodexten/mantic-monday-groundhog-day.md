---
title: "Mantic Monday: Groundhog Day"
author: "Scott Alexander"
publication: "Astral Codex Ten"
publication_slug: "astralcodexten"
published_at: "2026-03-03T04:17:09.000Z"
source_url: "https://www.astralcodexten.com/p/mantic-monday-groundhog-day"
word_count: 4240
estimated_read_time: 22
---

## Having Your Own Government Try To Destroy You Is (At Least Temporarily) Good For Business

On Friday, the Pentagon declared AI company Anthropic a “supply chain risk”, a designation never before given to an American company. This unprecedented move was seen as an attempt to punish, maybe destroy the company. How effective was it?

Anthropic isn’t publicly traded, so we turn to the prediction markets. [Ventuals.com](https://app.ventuals.com/markets) has a “perpetual future” on Anthropic stock, a complicated instrument attempting to track the company’s valuation, to be resolved at the IPO. Here’s what they’ve got:

[

![](https://substackcdn.com/image/fetch/$s_!ddUx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1acb3560-eb11-4071-b690-6936c374c9a8_1264x604.png)



](https://app.ventuals.com/trade/anthropic)

Upon the “supply chain risk” designation, predicted value at IPO fell from about $550 billion to $475 billion - then, after a day or two, went back up to $550 billion. No effect!

A coarser yes-no [Polymarket](https://polymarket.com/event/anthropic-500b-valuation-in-2026) tells the same story:

[

![](https://substackcdn.com/image/fetch/$s_!Oi-s!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4bb68c8-292d-49c8-858e-dad7ea070871_959x487.png)



](https://polymarket.com/event/anthropic-500b-valuation-in-2026)

The chance of Anthropic getting a $500 billion+ valuation in 2026 fell from 90% to 76%, before rebounding to 83%.

Why have the markets shrugged off this seemingly important event?

Partly it’s because Anthropic seems likely to win on appeal. Hegseth has said the government will keep using Anthropic for the next six months (undermining his case that they’re a national security risk) and has signed a substantially similar contract with OpenAI (undermining his case that their contract terms were unworkable). The prediction markets think the courts will be sympathetic:

But even in the 28% of timelines where the designation sticks, things don’t seem so bad. Secretary of War Hegseth originally [tweeted](https://x.com/SecWar/status/2027507717469049070) that:

> In conjunction with the President's directive for the Federal Government to cease all use of Anthropic's technology, I am directing the Department of War to designate Anthropic a Supply-Chain Risk to National Security. Effective immediately, no contractor, supplier, or partner that does business with the United States military may conduct any commercial activity with Anthropic.

Framed this way, the Pentagon’s actions sound devastating. Anthropic relies on compute to train and run its AIs. Most of this compute is in data centers owned by Amazon, Google, and Microsoft. At least Amazon and Microsoft have contracts with the US military. If they had to drop Anthropic, it would make it impossible for the company to stay a frontier AI lab.

But in their own [blog post](https://www.anthropic.com/news/statement-comments-secretary-war), Anthropic described the situation differently:

> **If you are an individual customer or hold a commercial contract with Anthropic**, your access to Claude—through our API, claude.ai, or any of our products—is completely unaffected.
> 
> **If you are a Department of War contractor**, this designation—if formally adopted—would only affect your use of Claude on Department of War contract work. Your use for any other purpose is unaffected.

In other words, the “supply chain risk” designation only means that companies can’t use Anthropic products in their specific Department of War contracts. So if Amazon is doing 95% normal civilian cloud compute stuff, and 5% special government contracts, only 5% of their contracts are affected. This is trivial! Anthropic can keep all its compute and most of its business partnerships even with Department-of-War-linked companies!

The lawyers who weighed in seem to think that Anthropic’s interpretation of the law is correct, and Secretary Hegseth’s interpretation confused. In some situations, this might be cold comfort - how much does it help to be right about the law when the government is wrong? But in this case, it probably helps a lot. Amazon, Google, and Microsoft are all big Anthropic investors - each owns about a 10% stake - and have multi-billion dollar AI compute contracts. Together, the three tech giants must have at least $100 billion riding on Anthropic’s success. They also have good administration connections and great lobbyists, and even Hegseth isn’t stupid enough to pick fights with them all at once. So probably they send their lobbyists to have a talk with Hegseth about what the “supply chain risk” designation actually entails, Hegseth enforces the letter of the law, and Anthropic is barely affected. At least this is the story the prediction markets are going with:

In this best-case scenario, Anthropic’s downside is losing some government contracts that made up ~5% of its business, plus some other Department-of-War-contractor contracts that probably add up to another ~5%.

Against that, the upside is great publicity. Despite a lot of work and some controversial Superbowl ads, Anthropic had never before managed to overcome ChatGPT’s superior name recognition. But they seem to have finally done it: Claude [went from](https://techcrunch.com/2026/03/01/anthropics-claude-rises-to-no-2-in-the-app-store-following-pentagon-dispute/) #120 on the App Store in January, to #1 this weekend, apparently driven by people who heard about the Pentagon standoff and were impressed by their principled stance.

This could have been a mixed blessing - Anthropic was previously trying to stand out as a B2B company while letting OpenAI have the dubious honor of producing consumerslop. But early signs suggest they might be winning over some companies too. From [a Reddit thread](https://www.reddit.com/r/technology/comments/1rhoi54/claude_hits_no_1_on_app_store_as_chatgpt_users/) on the topic:

> As someone who manages IT for a mid-size company, this is actually a big deal. We were evaluating both Claude and ChatGPT for internal use and the Pentagon thing was basically the tipping point for us. Not because we're government adjacent or anything, just because a company willing to walk away from a massive contract on ethical grounds is probably also going to handle our data more carefully than one racing to close every deal possible. The app store ranking makes sense to me.

> Finance VP for a mid size tech, we’re moving completely away from ChatGPT/Copilot to Claude.

I’m impressed with the prediction markets here - they’ve taken a bold and counterintuitive stance that I wouldn’t have otherwise considered (that these developments barely harm Anthropic) and made it legible, to the point where I basically believe it.

## The Midterms As Potential Crisis

America will hold midterm elections on November 3. Incumbents always have a hard time during midterms, and Trump’s approval rating is low, so it’s expected to be a good year for Democrats. Prediction markets expect them to win at least the House (80% chance) and maybe even the Senate (20 - 40% chance).

This simple story is complicated by two different Republican attempts to change voting law.

Republicans generally believe there is significant fraud in elections, especially immigrants voting illegally, and propose strict ID requirements to prevent this. Most Democrats believe fraud is rare, and that strict ID requirements are more likely to disenfranchise normal voters who don’t have the right forms of ID available. The latest flashpoint in this battle is the SAVE Act, a Republican-sponsored bill which would require voters to show a passport, birth certificate, or Real ID when registering to vote for the first time or changing their registration. It recently passed the House, but is on track to be filibustered by Democrats in the Senate:

[

![](https://substackcdn.com/image/fetch/$s_!arR_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe5d15c4e-588b-4f1c-84c0-7a758f4dc6c7_966x498.png)



](https://polymarket.com/event/save-act-signed-into-law-in-2026)

At the same time, there are rumors that the Trump administration is working on [an executive order](https://www.democracydocket.com/news-alerts/exclusive-read-the-draft-executive-emergency-order-for-trump-to-take-control-of-elections/) to declare a national emergency and take control of elections. The order would say that foreign countries have been rigging US elections (some commenters speculate that maybe Maduro could be granted clemency for “admitting” to this), and respond with a series of extreme measures. These would include banning voting machines, restricting vote-by-mail, and requiring all voters to re-register before the election. For what it’s worth, Trump has [denied all of this](https://thehill.com/homenews/campaign/5759186-trump-midterm-elections-national-emergency/), although his previous denial of Project 2025 makes this less reassuring.

[

![](https://substackcdn.com/image/fetch/$s_!N8mp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0d5ad484-9050-48b9-bb3e-7ec2afd25543_955x498.png)



](https://polymarket.com/event/new-trump-executive-order-to-restrict-voting-by-march-31)

[

![](https://substackcdn.com/image/fetch/$s_!IPLl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b3fac43-6ff7-491a-a0fb-3a2cc5f69791_970x598.png)



](https://polymarket.com/event/will-trump-act-to-ban-mail-in-voting-or-voting-machines-by-june-30)

It looks like the markets are saying that Trump will try something, but maybe not the full executive order under discussion.

Most commentators think the EO is unconstitutional, with [at least one liberal](https://www.democracydocket.com/news-alerts/white-house-circulating-blatantly-illegal-draft-emergency-order-to-take-control-of-elections/) arguing that it would be *good*, since it would force the courts to explain exactly how illegal all of this is. But if it somehow made it through the courts, the most likely outcomes could be:

**Chaos** (at least according to the mostly-liberal commentators I’ve been reading). Do federal agencies really have the capacity to re-register every voter in the next six months (imagine the DMV lines!) Can precincts really switch from voting machines to secure paper ballots during that period? Is there enough supply of the special holographic paper that the order demands for ballots? If not, what happens? Is the election so borked that we can’t figure out who controls Congress? What happens then? At a minimum, lots and lots of court cases.

**A blue wave**. This would be a somewhat surprising result of Republican policies, but it makes sense. All of these restrictions select for high-information, high-motivation voters - people who hear about the new rules and get fired up enough to hunt down their birth certificate, march down to the DMV, wait on line for one million hours, and re-register. Due to their education advantage and the structural features of midterms, that probably favors Democrats. Democrats are more likely to own passports (one of the easiest forms of valid ID), and less likely to trigger increased scrutiny by having changed their name recently (because liberal women are less likely to marry and take their husband’s surname). First-order, a blue wave like this is good for the left. But second-order, if the above factors lead to some completely implausible blue wave that makes no sense by normal election standards, then Republicans could decide the elections were illegitimate and we’re back at chaos again.

**Too many degrees of freedom:** Do the Republicans understand the calculus above? One theory is that they plan to make up for it with degrees of freedom. There will be many small decisions about how strictly to enforce each rule, and maybe they’ll be lenient in Republican districts and strict in Democratic ones. The administration is trying to [purge potentially fraudulent voters from the rolls](https://www.brennancenter.org/our-work/analysis-opinion/federal-courts-reject-trump-administrations-attempts-obtain-private-voter) - a process with obvious potential for abuse (purged voters can re-register to prove their non-fraudulentness, but this adds an extra layer of complication, so if mostly Democrats get purged, this overall decreases the Democratic voter base). If the administration finds some way to disproportionately disenfranchise Democrats - or if even if Democrats just believe they’ve done this - then Democrats might consider the election results illegitimate, and we would get - again - chaos.

However, courts seem to be blocking all of these measures (except the SAVE Act, which is unlikely to pass Congress). It’s hard to see a world where the really disruptive ones get through. What do the markets say?

This seems like a good sign that there won’t be mass voter disenfranchisement.

But Metaculus expects a 25% chance that martial law is declared?!

In every election he’s been involved in, Trump has either outright said he won’t accept a result that goes against him, or at least given mixed signals about this. In 2020, he took various extreme steps to overturn the election, including telling state officials to throw out ballots, demanding that the count be stopped, trying to get the Vice President to certify fake electors, and the January 6 protests. Will he try the same thing during the midterms? He might not care as much about elections where he’s not personally involved. Or he might use the same playbook, this time with a much more docile Republican party mostly purged of spine-havers like Mike Pence. If he tries this, probably Democrats will protest; if those Democratic protests become unruly, maybe he’ll declare martial law to shut them down. “Chaos” doesn’t even begin to describe this situation.

Maybe the best headline summary of election forecasting are the “free and fair” questions, but they’re hard to interpret.

A Manifold market with 25 forecasters gives a 41% chance that the elections aren’t considered “free and fair”. The resolution criteria is the opinion of international election observers and the mainstream media, who lean liberal. In the past, these observers have sometimes given the US a less-than-perfect verdict - for example, OSCE described the 2024 US election as:

> While the general elections in the United States demonstrated the resilience of the country’s democratic institutions, the election process took place in a highly polarized environment. The election was well run, and candidates campaigned freely across the country with the active participation of voters. However, the campaign was marred by disinformation and instances of violence, including harsh and intolerant rhetoric. Repeated, unfounded claims of election fraud negatively impacted public trust.

…and they can probably find even more to complain about in a Trump-run election. Is this sufficient to create uncertainty around the resolution, and drop the probability to 40%? I’m not sure.

But Metaculus has a similar question noting that “This question may resolve as Yes \[even\] if the EAC, the OSCE, or the Carter Center notes only isolated problems or areas for improvement”, and it’s at 92%, which is reassuring.

I think the best summary of forecasters’ views on the midterms is that there’s a decent chance (~50%) Trump tries to change the rules around mail-in ballots, and a modest chance (~25%) he tries something more extreme - but that it probably won’t make much difference, the election will still be considered fair by international observers, and Democrats will still win.

I’m very interested in creating better prediction markets about the fairness of the 2026 elections. If anyone has ideas for how to do this, let me know.

## Groundhog Day

Tweeted by [the National Weather Service’s New York City branch](https://x.com/NWSNewYorkNY/status/2018330816120606731):

[

![Image](https://substackcdn.com/image/fetch/$s_!N4Gv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49dea0d6-a9d9-43f1-a88f-b9ad3a6ce4af_1280x960.jpeg "Image")



](https://x.com/NWSNewYorkNY/status/2018330816120606731/photo/1)

Punxsutawney Phil, the famous Groundhog Day groundhog, actually has less than 50% accuracy in predicting the length of winter. At what point do we flip the legend and say that there’s more winter if he *doesn’t* see his shadow?

But wait! Staten Island Chuck has an impressive 85% accuracy! The graphic says “since 1981”, which would imply 45 years of prognostication, but it looks like their source is [this site](https://www.noaa.gov/heritage/stories/grading-groundhogs?utm_source=chatgpt.com), which only counts the last twenty years of data. That would also match the percent, since 85% of 20 is a round 17. In a separate analysis of 32 years, the Staten Island Zoo accords him an 81% success rate. That’s p = 0.0002 - plenty significant even after a Bonferroni correction for multiple magic groundhogs.

So is the groundhog legend true? Seems like it can’t be - the legend originated with Punxsutawney Phil, who does worse than chance. What kind of crazy Gettier case would we have to believe in to have the original magic groundhog be a fraud but, coincidentally, have another groundhog a few hundred miles away be actual magic?

A more prosaic explanation is that, according to [this site](https://groundhog-day.com/groundhogs/staten-island-chuck/predictions), Staten Island Chuck is almost a broken clock, predicting spring on 25/31 occasions. If early springs are more common than long winters on Staten Island, that fully explains the phenomenon. It could equally well explain [Mojave Max](https://groundhog-day.com/groundhogs/mojave-max), the legendary anti-oracular tortoise of Las Vegas, who has managed a 20% success rate over decades on what ought to be a coin flip - he won’t stop predicting long winter, and is nearly always wrong.

## Iran Warcasting

Speaking of Groundhog Day, we’re bombing the Middle East again. Here’s what the markets have to say:

[

![](https://substackcdn.com/image/fetch/$s_!lA5f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbdf5f964-8f2e-4d22-81f8-3ebed77437c5_958x564.png)



](https://polymarket.com/event/will-the-iranian-regime-fall-by-june-30)

These two well-behaved markets agree on a somewhat less than 50-50 chance that the current round of airstrikes topple the Iranian regime.

[Alireza Arafi](https://en.wikipedia.org/wiki/Alireza_Arafi), a hardline cleric with no distinguishing characteristics, is weakly favored to succeed Khameini as Supreme Leader. Other contenders include Khomeini’s grandson and Khameini’s son, and there is a 15% chance that they abolish the position before figuring out a successor.

The Strait of Hormuz is the waterway between Iran and Arabia that many of the world’s oil tanker routes pass through. Iran is already threatening traffic in the strait; if it threatened it more, it might be able to damage the global economy. This wouldn’t really help anything - Iran is part of the global economy too - but it would probably feel good to annoy the US a little more than they could otherwise do. Realistically this all comes down to the resolution criteria - Iran will certainly threaten the Strait, but probably can’t keep it 100% closed forever. The criteria here specify decreasing a seven-day moving average of traffic to below 20% of its usual level, which forecasters seem to think is more likely than not.

Manifold expects between 6 - 100 US casualties.

Polymarket thinks the war will be over by March 31, but…

…a Manifold market leaves some probability on it continuing until January (or perhaps restarting by then). Gotta say, I’m not seeing this one.

[

![](https://substackcdn.com/image/fetch/$s_!zyWp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F880e9353-334c-49f8-a088-019a5fdfeed8_944x500.png)



](https://polymarket.com/event/will-reza-pahlavi-lead-iran-in-2026)

Reza Pahlavi is the heir of the Shahs of Iran. Polymarket thinks that if the current regime falls, there’s about a 40% chance they’ll reinstate the monarchy.

I found [this Marginal Revolution](https://marginalrevolution.com/marginalrevolution/2026/03/one-view-of-iranian-strategy.html) post helpful in making sense of the markets’ view on Iran. America hoped that killing the Ayatollah would provoke mass protests and make the regime collapse. That doesn’t seem to have happened, and the regime seems ready to appoint a new Supreme Leader and keep going. America’s strategy will be to keep killing as many higher-ups as possible and bombing Iranian military sites, in the hopes that eventually the populace rises up or the remaining ayatollahs fail to hash out a succession plan. Iran’s strategy will be to just try to hold on, and cause enough pain for America and its allies that the US goes away sooner rather than later. Most likely America will either win or give up within a month, but there’s a long tail of outcomes with continued conflict until potentially as late as next year.

## MNX

Stephen Grugett and Ian Philips of Manifold Markets have announced a new project, [MNX](https://mnx.fi/).

[

![](https://substackcdn.com/image/fetch/$s_!7FlX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39ede6fd-aeea-421e-b64e-d6b37bdc9890_1915x1012.png)



](https://substackcdn.com/image/fetch/$s_!7FlX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39ede6fd-aeea-421e-b64e-d6b37bdc9890_1915x1012.png)

MNX is a noncustodial cryptocurrency-based futures exchange offering financial products relating to AI, including some prediction-market-shaped ones. For example, [ECI26](https://testnet.mnx.fi/trade/eci26) lets users place bets on the highest score that an AI will attain on the [Epoch Capabilities Index](https://epoch.ai/benchmarks/eci) by the end of the year.

Manifold is a great site, and I challenged Grugett on why he’s starting a new project. His answer: hedging. I didn’t transcribe all the details, but that’s fine, because Vitalik coincidentally wrote a pro-hedging manifesto last week.

> Recently I have been starting to worry about the state of prediction markets, in their current form. They have achieved a certain level of success: market volume is high enough to make meaningful bets and have a full-time job as a trader, and they often prove useful as a supplement to other forms of news media. But also, they seem to be over-converging to an unhealthy product market fit: embracing short-term cryptocurrency price bets, sports betting, and other similar things that have dopamine value but not any kind of long-term fulfillment or societal information value. My guess is that teams feel motivated to capitulate to these things because they bring in large revenue during a bear market where people are desperate - an understandable motive, but one that leads to corposlop.
> 
> I have been thinking about how we can help get prediction markets out of this rut. My current view is that we should try harder to push them into a totally different use case: hedging, in a very generalized sense (TLDR: we're gonna replace fiat currency)
> 
> Prediction markets have two types of actors: (i) "smart traders" who provide information to the market, and earn money, and necessarily (ii) some kind of actor who loses money.
> 
> But who would be willing to lose money and keep coming back? There are basically three answers to this question:
> 
> **1.** "Naive traders": people with dumb opinions who bet on totally wrong things  
> **2.** "Info buyers": people who set up money-losing automated market makers, to motivate people to trade on markets to help the info buyer learn information they do not know.  
> **3.** "Hedgers": people who are -EV in a linear sense, but who use the market as insurance, reducing their risk.
> 
> (1) is where we are today. IMO there is nothing fundamentally morally wrong with taking money from people with dumb opinions. But there still is something fundamentally "cursed" about relying on this too much. It gives the platform the incentive to seek out traders with dumb opinions, and create a public brand and community that encourages dumb opinions to get more people to come in. This is the slide to corposlop.
> 
> (2) has always been the idealistic hope of people like Robin Hanson. However, info buying has a public goods problem: you pay for the info, but everyone in the world gets it, including those who don't pay. There are limited cases where it makes sense for one org to pay (esp. decision markets), but even there, it seems likely that the market volumes achieved with that strategy will not be too high.
> 
> This gets us to (3). Suppose that you have shares in a biotech company. It's public knowledge that the Purple Party is better for biotech than the Yellow Party. So if you buy a prediction market share betting that the Yellow Party will win the next election, on average, you are reducing your risk.
> 
> (*mathematical example: suppose that if Purple wins, the share price will be a dice roll between \[80...120\], and if Yellow wins, it's between \[60...100\]. If you make a size $10 bet that Yellow will win, your earnings become equivalent to a dice roll between \[70...110\] in both cases. Taking a logarithmic model of utility, this risk reduction is worth $0.58.)*

See [the tweet](https://x.com/VitalikButerin/status/2022669570788487542) for more, including a suggestion that “the real solution \[might be\] to go a step further, and get rid of the concept of currency altogether”.

MNX will not be getting rid of the concept of currency altogether. Their vision of a hedge market relies on some more prosaic beliefs.

First, that Polymarket and Kalshi are doing a good job filling the gambling niche, Metaculus is doing a good job filling the information-aggregation niche, and hedging is the last prediction market niche capable of spawning a billion-dollar company. Actually, why set your sights so low? There’s currently two trillion dollars tied up in the derivatives market; a better hedge would be very lucrative.

Second, that hedging is about to enter a renaissance. Even sophisticated hedge funds only hedge a few types of risk, because nobody wants to spend hundreds of hours sculpting a hedge portfolio that catches 99.99% of possibilities and changing it every few days as the market shifts form. But if the Agent Economy Of The Future brings the cost of intellectual labor down near zero, then there’s no reason not to do that. If you invest in a seaside resort, your AI can figure out the chance of a hurricane, *and* of a tsunami, *and* of an oil spill, *and* of a thousand other things, and buy a tiny share of each on the prediction markets, and feel confident that you’re expressing your exact thesis (seaside resorts are good) separate from any acts of God that might disturb it.

Third, the past few years have seen dramatic advances in financial technology. Crypto traders have invented the [perpetual future](https://en.wikipedia.org/wiki/Perpetual_futures), a new instrument that tracks an asset without requiring anyone to own the asset involved. That means traders can buy and sell shares of SpaceX, OpenAI, and other nonpublic companies that won’t actually give you their shares. Hedging the price of nickel used to require someone somewhere in the process to own an actual warehouse full of nickel. Now you can skip that step.

(the other technological sea change is that this is possible at all. Five years ago, cryptocurrency prediction markets were too complicated. In the late 2010s, a group called Augur raised $5 million for the project but never managed to create usable software. FTX flirted with prediction-like contracts but never got them off the ground even with all their billions. Polymarket was the first to really solve this, making $10 billion in the process, but even they were barely usable in the early days. But Stephen’s making MNX with his own money and a team of 1-2 people. He benefits partly from the vibecoding revolution, and partly from all of the billions of dollars spent on improving cryptocurrency rails - MNX uses the stablecoin USDC).

MNX is focusing on AI for now, because it’s buzzy and there’s lots of money flowing into it. But if goes well, it could one day expand to seaside resorts, nickel, and everything else.

## Elsewhere In Prediction Markets

**1:** CEO Chris Best [reports](https://on.substack.com/p/what-the-markets-are-saying) that Substack is partnering with Polymarket to make it easier to embed prediction markets in Substack posts and notes. I haven’t been using the embeds here because they don’t let you see the history graph, but I’m excited about them in general. And his post also mentions that “one in five of Substack’s top 250 highest-revenue publications \[has\] started using \[prediction markets\]”, which surprises me but seems like a great sign.

**2:** Yahoo Finance: [Man Bet Entire Life Savings Of $342,195 That Elon Musk Would Fail](https://finance.yahoo.com/news/man-bet-entire-life-savings-170558581.html). This is more heartwarming than it sounds - it’s about economist Alan Cole and a Kalshi market about whether DOGE would successfully cut the federal budget by some amount. Cole was an expert in tax law and knew that the budget is sufficiently constrained that it was literally impossible to cut it that amount, and so (after getting his wife’s buy-in) put his entire life savings on NO. NO turned out correct, netting him a 37% profit after one year.

**3:** [This Matt Yglesias tweet](https://x.com/mattyglesias/status/2026639403007746273) is more interesting than it sounds:

[

![](https://substackcdn.com/image/fetch/$s_!FVQd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5791147f-36b2-437d-a015-f9e8c022d909_590x554.png)



](https://x.com/mattyglesias/status/2026639403007746273)

If this were enacted, the winning play would be for platforms to subsidize their non-sports markets with the profits from their sports markets, in order to win the right to have has many sports markets as possible. These subsidies would turn non-sports prediction markets from zero-to-slightly-negative-sum (because your gains are always a counterparty’s losses, minus fees) to positive-sum (because everyone is taking the platform’s subsidies). Yglesias has discovered a solution to one of the oldest problems in the space - how to incentivize the public good of prediction market participation!

Too bad the government will never do this.