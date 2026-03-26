---
title: "Sam Bankman-Fried’s latest defense is utterly unconvincing"
author: "Timothy B. Lee"
publication: "Full Stack Economics"
publication_slug: "fullstackeconomics"
published_at: "2023-01-13T14:31:07.000Z"
source_url: "https://www.fullstackeconomics.com/p/sam-bankman-frieds-latest-defense"
word_count: 1113
estimated_read_time: 6
---

Sam Bankman-Fried is still desperate to convince the world that he didn’t defraud customers of his bankrupt cryptocurrency exchange, FTX. The disgraced mogul, out on bail as he awaits a federal trial later this year, [launched a new Substack](https://sambf.substack.com/) on Thursday to make his case.

“I didn’t steal funds, and I certainly didn’t stash billions away,” Bankman-Fried wrote in the newsletter’s [first post](https://sambf.substack.com/p/ftx-pre-mortem-overview).

Following from there is a long, rambling explanation of how Alameda Research, SBF’s crypto-trading firm, went bust in the fall of 2022. FTX failed because it had loaned billions of dollars to Alameda, which Alameda proceeded to lose through risky trading.

SBF claims that the value of Alameda’s cryptocurrency holdings fell from more than $100 billion in late 2021 to around $11 billion just before it went bankrupt. And he says that by the end, most of the money was tied up in illiquid or “less liquid” assets that couldn’t easily be converted to cash.

Over the same period, FTX’s loans to Alameda increased from roughly $3 billion to $10 billion. So when panicked customers started trying to pull their money out of FTX in early November, FTX couldn’t get customer funds back from Alameda.

I have no idea if the figures in SBF’s Substack post are accurate; SBF himself labels them as “JUST AN ESTIMATE.” But even assuming everything in the post is true, it isn’t much of a defense.

SBF stands accused of taking money from FTX customers, giving it to Alameda, and letting Alameda lose it. Going into excruciating detail about exactly when and how Alameda lost the money doesn’t really refute claims that Alameda shouldn’t have had the money in the first place.

The former CEO has been offering unconvincing defenses of his actions ever since FTX declared bankruptcy two months ago. Late last year, SBF did a series of high-profile media interviews, including with the [New York Times](https://www.nytimes.com/live/2022/11/30/business/sam-bankman-fried-interview) and [ABC’s](https://www.goodmorningamerica.com/news/video/ftx-founder-sam-bankman-fried-denies-improper-customer-94268098) *[Good Morning America](https://www.goodmorningamerica.com/news/video/ftx-founder-sam-bankman-fried-denies-improper-customer-94268098)*, trying to explain what happened. When I first saw these interviews, I wondered if there might be something to his story, because he really did seem to be trying to answer the reporters’ questions honestly.

But the more I’ve seen SBF try to make his case, the less sympathetic I’ve gotten. Because the fundamental question is pretty simple: Did he allow Alameda to borrow billions of dollars from FTX without customer consent? At this point, almost everyone thinks the answer is “yes.” And while he’s been far more talkative than most criminal defendants, he hasn’t offered anyone a good reason to change their minds.

# How FTX went bankrupt

Understanding exactly what happened to FTX customers’ money is a bit complicated because FTX didn’t just help customers buy and sell cryptocurrencies—it enabled them to make leveraged trades, a business that inherently involves extending credit to customers.

For example, FTX offered margin trading. This is a service in which customers might deposit $1,000, borrow another $1,000, and use the cash to buy $2,000 worth of Bitcoin. In this scenario, a customer’s $1,000 deposit served as collateral for the loan—much as a home serves as collateral for a mortgage. If the value of Bitcoin dropped, FTX would ask the customer to deposit additional collateral. If they failed to do so, FTX would sell the customer’s Bitcoins and use the proceeds to pay off the loan.

This worked as long as the value of the customer’s Bitcoins didn’t fall too quickly. In my example, if Bitcoin’s value fell by 50 percent before FTX had a chance to sell them, then the customer would have been wiped out. If they fell by more than 50 percent, the customer would have been wiped out *and* FTX would have taken losses.

Another FTX offering allowed customers to bet on the future price of cryptocurrencies (FTX is short for “futures exchange”). If Bitcoin’s value rose, then “shorts” would lose money and “longs” would gain. If Bitcoin’s value fell, the opposite would occur.

Once again, customers were required to post a certain amount of collateral to cover losses their positions might incur in the future. But in cases of extreme volatility, it might not be possible to close a position quickly enough to avoid big losses. If a customer’s losses exceeded their collateral, FTX itself would be on the hook for subsequent losses.

This kind of failure is a theoretical possibility on any exchange that allows leveraged trading. For example, Bloomberg’s Matt Levine has [written](https://www.bloomberg.com/opinion/articles/2022-11-30/matt-levine-s-money-stuff-nickel-market-almost-broke?leadSource=uverify%20wall) about how the London Metal Exchange almost blew up after a nickel trader couldn’t make good on a massive short position.

This is basically what SBF says happened to FTX: FTX allowed Alameda to make huge, leveraged bets on the value of volatile cryptocurrencies. Then the value of those cryptocurrencies crashed. Not only did Alameda get wiped out, but FTX—and by extension, FTX’s customers—lost money as well.

While this story might be basically accurate, I don’t think it exonerates SBF the way he seems to think it does.

# Special rules for Alameda

[

![](https://substackcdn.com/image/fetch/$s_!p92X!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ba90417-1cbe-4a84-8a20-9a02f9618bfe_6122x4082.jpeg)



](https://substackcdn.com/image/fetch/$s_!p92X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ba90417-1cbe-4a84-8a20-9a02f9618bfe_6122x4082.jpeg)
*Sam Bankman-Fried leaves federal court in Manhattan after his arraignment and bail hearings on December 22, 2022. (Photo by Michael M. Santiago/Getty Images)*

One of FTX’s biggest selling points has always been that it has a sophisticated “liquidation engine” that was supposed to avoid these kinds of blowups by automatically closing a customer’s position before it got underwater. In a [2019 post](https://ftx.medium.com/our-liquidation-engine-how-we-significantly-reduced-the-likelihood-of-clawbacks-67c1b7d19fdc), FTX touted its liquidation engine as more sophisticated and conservative than those on rival cryptocurrency exchanges.

“We designed a system that we think will withstand huge market moves and huge volume,” FTX wrote in 2019.

But [according to the Securities and Exchange Commission](https://www.sec.gov/litigation/complaints/2022/comp-pr2022-219.pdf), FTX exempted Alameda from this liquidation process. The SEC says that in May 2020, “Bankman-Fried directed that Alameda be exempted from the ‘auto-liquidation’ feature of FTX’s spot margin trading services.”

This meant that if Alameda’s investments performed poorly, then FTX—and ultimately FTX’s other customers—would wind up paying the cost. It turned FTX into a giant game of “heads Alameda wins, tails other customers lose.”

The SEC also accuses SBF of telling FTX investors “that Alameda was just another platform customer with no special privileges.” If the government’s allegations are true, then this was a lie and potentially securities fraud too.

So this is the key question SBF needs to answer: Did he in fact direct FTX employees to exempt Alameda from the auto-liquidation process? And did he know that Alameda was getting special treatment when he told investors it was treated like any other customer?

SBF doesn’t even try to tackle these questions in his introductory newsletter post. Instead of addressing them head-on, he wrote more than 2,000 words on issues nobody really asked about. The fact that he has nothing to say about the main accusations against him makes me think whatever answers he might have won't actually do him any good.