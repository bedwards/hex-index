---
title: "What voters in every state think about Trump and prices"
author: "G. Elliott Morris"
publication: ""
publication_slug: "gelliottmorris"
published_at: "2025-12-29T12:31:07.000Z"
source_url: "https://www.gelliottmorris.com/p/what-voters-in-every-state-think"
word_count: 1960
estimated_read_time: 10
---

#### *Support independent, empirical political journalism in 2026*

*If you find my data-driven political analysis valuable, consider becoming a premium subscriber to Strength In Numbers. Over the last year, I have published dozens of [exclusive deep dives](https://www.gelliottmorris.com/p/a-lot-of-powerful-people-just-dont?r=a9pj&utm_campaign=post&utm_medium=web) that [beat other outlets to the punch](https://www.gelliottmorris.com/p/the-cost-of-playing-defense-on-immigration?r=a9pj&utm_campaign=post&utm_medium=web) on everything from [Trump’s unpopularity](https://www.gelliottmorris.com/p/a-lot-of-powerful-people-just-dont?r=a9pj&utm_campaign=post&utm_medium=web) and his losses [with young people](https://www.gelliottmorris.com/p/chart-of-the-week-trump-has-lost?utm_source=publication-search), to [the politics of affordability](https://www.gelliottmorris.com/p/what-can-zohran-mamdani-teach-democrats?utm_source=publication-search) and Trump’s weakness on [deportations](https://www.gelliottmorris.com/p/why-the-la-protests-might-be-bad?utm_source=publication-search). Join now and stay ahead of the curve in 2026.*

*If you haven’t taken advantage of the holiday coupon yet, you can get 20% off a subscription for next year using the button below. This expires on Jan. 1!*

\---

While “off” for my end-of-year “break” (it’s really more like a retreat; I use the time I get back by not writing 3x a week to solve coding problems and catch up on various administrative tasks), I have been making some improvements to the [models I run using our monthly](https://www.gelliottmorris.com/p/trump-is-underwater-on-trade-in-40) *[Strength In Numbers](https://www.gelliottmorris.com/p/trump-is-underwater-on-trade-in-40)*[/Verasight polls](https://www.gelliottmorris.com/p/trump-is-underwater-on-trade-in-40). These models transform national polling data into estimates of state-level opinion, which can be very informative and enable more predictive commentary about elections (since elections in America happen at the state, not national, level). Some research suggests these models might also lead to [better estimates of subgroup attitudes](https://www.pewresearch.org/decoded/2018/11/13/comparing-mrp-to-raking-for-online-opt-in-polls/), rather than just taking crosstabs at face value.

These improvements should, in theory, help solve [several](https://sites.stat.columbia.edu/gelman/research/unpublished/weight_regression.pdf) [hard problems](https://osf.io/preprints/socarxiv/u3ekq_v2) in political polling today, and I have put some details about them at the end of this article. But today I want to write more about the results than the process, so let’s dig into the data:

**The big story is this:**

## A -16 national net approval is a landslide electoral defeat

By now, we should all know that Donald Trump is [very unpopular nationally](https://fiftyplusone.news/polls/approval/president), but what does that mean at the state level?

The charts below show estimated Trump approval (a) overall and (b) for his handling of inflation, for each state, combining all the interviews we conducted in 2025 (from May through November). Trump’s approval overall among adults is pretty abysmal (positive in just 11 states), but it’s downright catastrophic on inflation; Trump’s *only* positive rating is in Oklahoma.

[

![](https://substackcdn.com/image/fetch/$s_!NxKY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43e5386d-d3e6-4610-a3b1-95d5824b2255_1183x864.png)



](https://substackcdn.com/image/fetch/$s_!NxKY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43e5386d-d3e6-4610-a3b1-95d5824b2255_1183x864.png)

[

![](https://substackcdn.com/image/fetch/$s_!Lkfo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a2739c1-035a-4414-8099-30df2b7be1e9_1191x912.png)



](https://substackcdn.com/image/fetch/$s_!Lkfo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a2739c1-035a-4414-8099-30df2b7be1e9_1191x912.png)

To really underscore just how bad this is, consider that these maps look less like the results of the 2024 presidential election than the results in 1984, when Walter Mondale lost by 18 points to Ronald Reagan nationally:

[

![](https://substackcdn.com/image/fetch/$s_!MT0C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04000edd-df69-4a27-949e-b3893465f2d8_960x559.png)



](https://substackcdn.com/image/fetch/$s_!MT0C!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04000edd-df69-4a27-949e-b3893465f2d8_960x559.png)

And as a bonus, here is what the approval estimates look like at the local level:

[

![](https://substackcdn.com/image/fetch/$s_!dDKd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32358737-18e8-4dda-aaa1-9890566a8ab4_1632x1187.png)



](https://substackcdn.com/image/fetch/$s_!dDKd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32358737-18e8-4dda-aaa1-9890566a8ab4_1632x1187.png)

I can think of two big points to make other than “[Trump is very unpopular](https://www.gelliottmorris.com/p/a-lot-of-powerful-people-just-dont?r=a9pj&utm_campaign=post&utm_medium=web).”

First, looking at the top chart, it’s notable that Trump’s overall approval is not only weak in *Democratic-leaning* states; it’s also underwater across many *Republican*\-leaning states. That includes much of the Midwest and Sun Belt battlegrounds, and also some of the Plains and Southern states we typically think of as “red.” Trump’s approval rating is not just underwater because of Democratic #Resistance; lots of independents and Republicans disapprove of how he’s running the country, too. In fact, the decline from Trump’s vote margin in 2024 is steeper in redder parts of the country. Here’s a crude chart just to make my point clear:

[

![](https://substackcdn.com/image/fetch/$s_!UOwX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe7566885-7c4e-4864-bfd5-aa5b48f29a21_1048x753.heic)



](https://substackcdn.com/image/fetch/$s_!UOwX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe7566885-7c4e-4864-bfd5-aa5b48f29a21_1048x753.heic)

Second, inflation is a uniquely toxic issue for Trump. Even in states where his overall approval approaches parity — places like Ohio, Iowa, Florida, and North Carolina — his handling of prices remains deeply negative. The president is at -10 in Nebraska, -15 in Pennsylvania, and -20 in Iowa. Whatever residual goodwill Trump retains among right-leaning parts of the electorate in general does not extend to his handling of prices and inflation — the issue that won him the White House in 2024 and which voters consistently rank as their top concern today.

Let me be very clear about these findings: In every state in the country except for Oklahoma, more adults disapprove than approve of how Trump is handling prices and inflation. (And being +1 in Oklahoma, a state he won by 34 points in 2024, is nothing to cheer about.) Outside of Oklahoma, there is no place in the country where voters, on net, approve of his handling of prices. Even Wyoming!

This is why the White House has been freaking out about affordability, and why Democrats are likely to keep running on the issue in the future (even if the issue might hurt them again next time they take power).

From an electoral perspective, this matters because presidential approval is a proxy for all sorts of political outcomes. A president who is broadly unpopular in swing states creates persistent headwinds for down-ballot candidates, particularly in midterm elections where local conditions and candidate quality play an outsized role. State-level approval numbers like these help explain why parties can struggle even in otherwise favorable political environments.

The point is this: Beneath the familiar national toplines lies a remarkably negative state-level pattern. Most Americans, in most states, disapprove of their president — and he is catastrophically weak on inflation. Republicans running for Senate races in Iowa, Maine, North Carolina, and Alaska — and maybe even Texas — should take note.

Be sure to check out the [new online portal](https://www.gelliottmorris.com/p/poll) I’ve created for our monthly *Strength In Numbers*/Verasight polls. Premium subscribers now have access to full crosstab documents and interactive charts, and I’m sorting out how to put the full demographic-level estimates online in an interactive format, too. (The data is very rich and should enable interesting visualizations, being similar to the data that powered [FiveThirtyEight’s Swing-O-Matic](https://abcnews.go.com/538/demographic-swings-impact-2024-election/story?id=108700434) in 2024.)

\---

### The real nerdy stuff

*This section of the post is for a very specific audience of folks who (a) have experience in weighting surveys and (b) have experience in running models of survey data.*

I run some pretty complex [MRP](https://en.wikipedia.org/wiki/Multilevel_regression_with_poststratification) (multilevel regression with post-stratification) models to turn our national polls into estimates of state-level (and soon, hopefully, congressional district) public opinion. Distilling the national polling data into state-level estimates is very helpful for storytelling, visualization, and explanation (see above), and supplements state-level election and issue polling where data is sparse.

But these models are only as good as the data you have about the population (this is the data you use to adjust your samples for non-response among certain groups). Such data is usually from the Census, and thus misses a lot of important political data (the Census does not ask about your ideology, party affiliation, or vote choice). Hence, standard MRP fails to solve for non-ignorable *partisan* non-response (see: 2016, 2020).

I am trying two main things to adjust for NIPNR in our polling data.

First (Step 1), I’m switching to a newer technique called MRPW — MRP with weights — to add information contained in normal survey weights into the MRP process. This allows us to first calibrate the sample to “known” marginal benchmarks of various political characteristics of the population — past vote, turnout, party affiliation, volunteering, etc — and then include those weights in the last step (the “P”) of the MRP procedure. Maybe we can even include some auxiliary information about social attitudes (eg, trust in your neighbor) that have been correlated with nonresponse recently.

(I put “known” in quotes because we don’t know what party and volunteering should be, but we have high-quality probability survey data from Pew NPORS that still helps.)

MRPW is cool, but it adds a lot of computational time (it involves adding interaction terms by the sampling weight for all the major variables in your models), *and* you have to train an extra model for the sampling weights. As always, there are tradeoffs with whatever path you take. But this is pretty straightforward compared to what I explain next, and the performance gains are notable, so the choice is obvious. [Read more.](https://sites.stat.columbia.edu/gelman/research/unpublished/weight_regression.pdf)

Second (Step 2), for a long time, I have adjusted my state-level predictions of attitudes today using estimates of survey bias on real-world political outcomes. The way I have been doing this effectively adds a prediction of individuals’ voting behavior in the most recent election to the Census data we have, and adds another 3 stages to the full MRPW pipeline.

First (2a), I train an MRP model to estimate turnout in the 2024 election using the voter-validated CES for every group of voters in the population. Then (2b), I use the CES and other political surveys conducted in 2024 to train another MRP model predicting vote choice among voters. This gives me estimated turnout and vote results (among validated voters) for every demographic group in every state.

But the pre-election surveys are not perfect; thus, a third step (2c): I adjust the 2024 election predictions so they match the outcomes of the election. That’s easy, since we know the results in 2024! I simply adjust the size of each group (using [raking](https://datawookie.dev/blog/2018/12/survey-raking-an-illustration/)!) until the predicted 2024 election results match up at the state level, while also keeping the demographic marginals in each state on target. This means our population data is properly calibrated at both the demographic and political levels, *and* via MRP we preserve information about joint population distributions. (Switching from MRP to MRPW would also mean our initial predictions are less biased, since the original raked survey weights from the CES are already calibrated such that the estimated election results equal real-world observations).

From this, I can derive a new post-stratification frame that includes the joint distribution of all relevant Census variables (education, age, race, income, sex, and geography) *plus* estimated past-vote in the 2024 election. This is the augmented Census data that gets used in the final set of MRPW models for current attitudes — a MRPW model that now includes estimated individual-level past voting behavior directly in the model! See [here](https://lucasleemann.ch/wp-content/uploads/2016/09/leemann-and-wasserfallen-2017.pdf), [here](https://www.columbia.edu/~jrl2124/klp2_paper.pdf), and [here](https://sites.lsa.umich.edu/ornstein/wp-content/uploads/sites/157/2017/09/mrsp.pdf) for more.

This has worked out fine in the past, but it’s a solution from 2017, and the literature has mostly moved on from the approach (sometimes called MRSP: multilevel regression with synthetic post-stratification). I am thinking of replacing Step 2 of the process with [a new way](https://osf.io/preprints/socarxiv/u3ekq_v2) of making this adjustment for partisanship in the model. It should be less “hacky” and has the advantage of preserving all that extra uncertainty that comes from training models on models on models (I will no longer be embedding predictions into the data and treating them as ground truth). But I don’t know if these newer techniques are really all that better (I won’t know until I can test them), and they also add complexity! I don’t have a lot of time to just sit around waiting for these models to finish training. I mean, I’ve got articles to write and a dog to walk, people.

This is all just to say… yeah, I am trying a lot of different things to detect potential partisan non-response bias in polling in 2026 and 2028. Most of the work on this front is happening in the sampling and adjustment (non-MRP) space ([see here](https://www.cambridge.org/core/journals/political-analysis/article/countering-nonignorable-nonresponse-in-survey-models-with-randomized-response-instruments-and-doubly-robust-estimation/AED17D9A0715AD4A15102DBD4E5B6EA8)) and requires survey experiments and additional data collection, which would be a good next step. In contrast, techniques like the one I have explained have the advantage of being transparent and applicable to most survey data — but of course, they are also slow to iterate on.

I think the best political surveys in 2026 and 2028 will combine high-quality stratified sampling off the voter file with model-based approaches for simulating effects of non-ignorable non-response in the data (the above “missing not at random,” or MNAR, respondents), estimating bias in data using real-world benchmarks of political beliefs (past vote), and directly estimating uncertainty in survey estimates instead of leaning on oversimplified measurements of sampling error (Bayes is good for this!).

When it comes to polling, there is no free lunch.

If you have read up enough to know what I’m talking about, drop me an email with your thoughts. At the very least, what I’m trying is pretty *~cool~*, and maybe you’d have some suggestions for the code…