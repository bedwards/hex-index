---
title: "How Silver Bulletin calculates our polling averages"
author: "Nate Silver"
publication: ""
publication_slug: "natesilver"
published_at: "2026-01-22T16:39:37.000Z"
source_url: "https://www.natesilver.net/p/silver-bulletin-polling-average-methodology"
word_count: 2085
estimated_read_time: 11
---

This is a quick explainer of the methods Silver Bulletin uses to calculate its continually updating polling averages: [presidential approval ratings](https://www.natesilver.net/p/trump-approval-ratings-nate-silver-bulletin), the [generic congressional ballot](https://www.natesilver.net/generic-ballot-average-2026-nate-silver-bulletin-congress-polls), and [Elon Musk favorablity ratings](https://www.natesilver.net/p/elon-musk-polls-popularity-nate-silver-bulletin). These polling averages are [a direct descendant](https://www.natesilver.net/p/some-personal-news) of methods that Nate designed for FiveThirtyEight.[1](#footnote-1) Our [past methodology pages](https://fivethirtyeight.com/features/how-were-tracking-donald-trumps-approval-ratings/) provide some additional context, though Disney/ABC will inevitably nuke what’s left of the FiveThirtyEight archive at some point.

There are some minor differences between our approval rating calculations and our generic ballot numbers, which we’ll explain throughout the text. There are also some differences between these “simple” polling averages and the methods we use to calculate our [election forecasts](https://www.natesilver.net/p/nate-silver-2024-president-election-polls-model), which include additional steps and leverage the larger volume of polling data available (such as the ability to infer information from both state and national polls). Our forecast for the 2026 midterms will launch mid-year. This page describes solely our continually-updating averages.

#### Which polls are included

Our general aim is for inclusivity. We seek to include all professionally-conducted surveys. If you don’t see a poll listed, it may be because it’s included under a different name — we list the name of the polling firm rather than the media sponsor (for example, [Beacon Research/Shaw & Co.](https://static.foxnews.com/foxnews.com/content/uploads/2025/11/fox_november-14-17-2025_national_topline_november-19-release.pdf) rather than Fox News) — or because we haven’t gotten around to adding it. (Polling averages are typically updated ~6 times per week.) However, here are certain exceptions:

-   We don’t use polls banned by Silver Bulletin because we [know or suspect that the pollster faked data](https://fivethirtyeight.com/features/fake-polls-are-a-real-problem/).
    
-   We don’t use DIY polls commissioned by nonprofessional hobbyists on online platforms such as Google Surveys. These are becoming increasingly common. (Professional or campaign polls using these platforms are fine.)
    
-   We don’t use “polls” that blend or smooth their data using [methods such as MRP](https://en.wikipedia.org/wiki/Multilevel_regression_with_poststratification).
    
-   We exclude polls that ask the voter who they support only after revealing leading information about the candidates. If, for instance, a poll says “Republicans hate puppies. Who do you plan to support: Republicans or Democrats?” we won’t include it.
    

Internal or campaign polls are included, provided they meet these other standards. For our approval rating averages, there is no distinction between partisan and nonpartisan polls. For the generic ballot, partisan polls are subject to different assumptions about “house effects” (see below). If ostensibly non-partisan pollsters have a history of producing polls for political campaigns or partisan organizations without disclosing these relationships, they may be automatically classified as partisan.[2](#footnote-2)

For the generic ballot, if a pollster lists multiple versions of the same survey, we prioritize polls of likely voters > registered voters > all adults. For approval ratings, the opposite is true (although we calculate a separate average based on likely voter polls exclusively). For all of our polling averages, we prefer the version of the poll with “leaners” included. If there are other cases where the pollster uses different methods in the same survey, such as multiple turnout models, we simply average all applicable versions.

Also for the generic ballot, two slightly distinct questions are included in the average:

-   Polls that ask voters whether they plan to vote for the Democratic or Republican candidate in the forthcoming election to Congress.
    
-   Polls that ask voters which party they’d prefer to see control Congress.
    

#### How we weight polls

While all polls are included to the greatest extent possible, more reliable polls have more influence on the averages. We calculate an influence score for each poll based on three factors:

-   The Silver Bulletin [pollster rating](https://www.natesilver.net/p/pollster-ratings-silver-bulletin), which in turn is based on its historical accuracy and whether it belongs to professional polling organizations that promote greater transparency and disclosure;
    
-   The poll’s sample size — although there are diminishing returns to this. The importance of sample size is determined empirically. In practice, perhaps because of the complicated methods that pollsters use to weight their polls, sample size makes less difference than it does in theory, and there are considerable diminishing returns from adding additional voters to the sample.
    
-   How recently the poll was conducted. This is also determined empirically, based on which settings best predict new polls over the subsequent two weeks. The settings for presidential approval ratings are more aggressive than for generic ballot numbers or for Elon Musk approval, because approval ratings tend to stabilize more quickly and shifts in the numbers are more likely to be signal rather than noise. For the generic ballot, weights become more aggressive as Election Day approaches.
    

We also take precautions to prevent any one polling firm from “flooding the zone” with a disproportionate number of surveys. Namely, the weights are based on the aggregate number of voters contacted by the pollster in a given time frame. In other words, if a pollster conducts a new survey every day or every week, it essentially “maxes out” the total weight assigned to the firm, and this weight is divided among all instances of the survey in a given window. Collectively, this firm’s polls may still have quite a lot of influence on our average, but *any one* from among the several surveys it conducts in a given window will be down-weighted. There is an additional adjustment for tracking polls in which the sample dates overlap.

More precisely, the polling average on a given date is calculated using [local polynomial regression](https://en.wikipedia.org/wiki/Local_regression). Technically speaking, we use a blend of more aggressive and more conservative settings. However, these settings are determined empirically based on what produces more stable averages that are free from autoregression. In other words, the current polling average should be the best predictor of forthcoming surveys. If Trump approval is 46 percent on Tuesday and 43 percent on Wednesday, whatever average you calculate (i.e., 44 percent or 44.5 percent) should minimize error on what a new survey would say on Thursday.

While local polynomial regression is a fairly intuitive method, the right settings aren’t necessarily obvious. Too little smoothing can make the curve jut up and down unnecessarily and will result in [overfitting](http://people.duke.edu/~mababyak/papers/babyakregression.pdf) of the data. If you smooth too much, however, the curve may be aesthetically pleasing but won’t do all that good a job of describing the data and may be slow to catch up to new trends. As an empirical matter, we’ve found that generic ballot can suffer from under-smoothing, [making the average too “bouncy,”](https://fivethirtyeight.com/features/heres-a-new-less-volatile-version-of-our-generic-ballot-tracker/) while this is less true for approval ratings, and our settings are more aggressive.

#### House effects

House effects are persistent differences between a given firm’s polls and those of other firms that survey the same race. For example, if a given firm’s polls are on average 3 points more favorable to Democratic candidates than the average of other polls conducted at the same time, we back a *proportion* of that difference out (in this example, this would mean shifting the firm’s surveys toward Republicans). The proportion subject to the house effects adjustment is based on the aggregate sample size of polling conducted by the firm. For pollsters that survey a given question extremely often, meaning that we can be highly confident about its house effect, close to 100 percent of the difference between a given firm’s polls and the polling average may be adjusted for. For a firm that has surveyed a race just one or twice, only a small fraction is, conversely. Our generic ballot average uses a slightly different formula than our approval ratings, which starts out with a lower adjustment but ramps it up more quickly as the aggregate sample size increases. We believe this formula is slightly more accurate and will probably eventually transition our approval rating averages to using it, although in practice, it only makes a difference in the decimal places.

More precisely, a separate house effects adjustment is applied to approval and disapproval ratings (or Democrats and Republicans in the case of the generic ballot). Certain firms persistently include more or fewer undecided voters than the polling average, and so we adjust for this, too.

Firms with higher pollster ratings have more influence on what our model considers to be “true north”, i.e. the unbiased average that other polls are adjusted toward. For the generic ballot, polls with partisan sponsors are excluded from our calculation of the “true” average.

The house effects adjustment is determined through an iterative process. Essentially, we first calculate a polling average without house effects, then adjust for house effects based on how a given firm’s polls line up relative to the polynomial curve, then recalculate the polling average with house-effect-adjusted polls, then recalculate house effects based on the new version of the average, and so forth. The model loops through the process several times until there are no further gains to be had.

For the generic ballot, explicitly partisan polls start out with a prior: in other words, we assume they’re slightly biased toward the sponsoring candidate or party. (More specifically, by a net of about 1.7 points. That is, if the generic ballot polling average is D +2, we’d expect a partisan poll to show something like D +3 or D +4 instead.) For nonpartisan polls, we use a zero prior instead (we default toward assuming unbiasedness). In both cases, the prior is eventually overridden by the hard evidence on how a firm’s surveys line up relative to others that ask the same question. This prior is applied to the generic ballot and the “horse race” polling averages used in our forecasts, but not to presidential approval ratings.

#### Error bars

Our generic ballot and approval rating averages incorporate an estimate of uncertainty, shown with shaded regions on our charts. The shaded areas indicate where we project 90 percent of new polls to fall based on our historical analysis of these averages over the past several decades. The error bars are wider when there are fewer polls of race and when the polls are less consistent with one another.

#### State benchmarks (generic ballot only)

For the generic ballot average, we calculate a current benchmark in each state based on the following formula:

`Benchmark = generic ballot + partisan lean score * elasticity`

The **partisan lean score** is calculated based on a combination of how states have voted *relative to the rest of the country* in the past two presidential elections and in recent state legislative elections. More precisely, the formula gives 50 percent of the weight to the 2024 presidential election, 25 percent to the 2020 presidential election, and 25 percent to a rolling average of the past five state legislative elections.[3](#footnote-3) Meanwhile, **elasticity** is a longstanding Silver Bulletin/FiveThirtyEight concept. Some states, like New Hampshire, have a larger proportion of independents and swing voters, typically upper-middle-class suburbanites. Whereas in other states, like Mississippi, everyone is pretty much either extremely Democratic (mainly Black voters) or extremely Republican (mainly white evangelicals).

Our current elasticity scores, calculated from microdata in the 2022 and 2024 [Cooperative Election Studies](https://cces.gov.harvard.edu/), which each surveyed 60,000 voters, range from 0.90 in Mississippi to 1.23 in Alaska and 1.25 in Hawaii. More precisely, the elasticity scores are calculated based on assigning a probability of each voter in the CES voting for the Democratic or Republican candidate. If a voter is toward the tail end of the bell curve, i.e. with nearly a 100 percent chance of voting for the Republican or the Democrat, shifts in the political environment likely make little difference in their vote. Conversely, they’re more likely to switch preferences if they start out somewhere near 50/50. Technically speaking, these probabilities are based on an average of two formulas, one that accounts for political questions in the survey (specifically, how strongly a voter leans toward the Democratic or Republican parties and where they rate themselves on a spectrum from liberal to conservative) and one that is exclusively based on demographic data. A “cross-pressured” voter (i.e., one who has some characteristics that typically predict Democratic voting and others that predict Republican voting) will intrinsically start out closer to 50/50, and so states with more of these voters have higher elasticity.

Current elasticity scores are listed below.

!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data\["datawrapper-height"\]){var t=document.querySelectorAll("iframe");for(var a in e.data\["datawrapper-height"\])for(var r=0;r<t.length;r++){if(t\[r\].contentWindow===e.source)t\[r\].style.height=e.data\["datawrapper-height"\]\[a\]+"px"}}}))}();

We’ll update this document in the future with any significant changes to the methodology.

[1](#footnote-anchor-1)

Nate/Silver Bulletin retains the original IP behind these models.

[2](#footnote-anchor-2)

Currently, this applies to [Trafalgar Group](https://x.com/NateSilver538/status/1322301003090268162) and [Rasmussen Reports](https://newrepublic.com/post/186444/conservative-poll-rasmussen-secretly-worked-trump-team), both of which have a history of collaborating with Republican campaigns on some of their surveys without fully disclosing these relationships.

[3](#footnote-anchor-3)

The state legislative figure is theoretically based on the aggregate popular vote for the lower legislative chamber in each state, i.e. the state house or state assembly. However, many state legislative seats are uncontested and we use some complicated math based on regression analysis to account for this. In essence, we estimate what the aggregate popular vote would be for the lower house if all seats were contested.