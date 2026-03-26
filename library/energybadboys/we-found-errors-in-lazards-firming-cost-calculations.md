---
title: "We Found Errors in Lazard's Firming Cost Calculations "
author: "Various"
publication: "Energy Bad Boys"
publication_slug: "energybadboys"
published_at: "2025-11-01T09:02:04.000Z"
source_url: "https://energybadboys.substack.com/p/we-found-errors-in-lazards-firming"
word_count: 928
estimated_read_time: 5
---

Our readers know that we are often critical of [Lazard’s Levelized Cost of Energy Plus (LCOE+) repor](https://www.lazard.com/media/5tlbhyla/lazards-lcoeplus-june-2025-_vf.pdf)t because we think it intentionally skews its analyses to make [wind](https://energybadboys.substack.com/p/cooking-the-books-2-lazards-levelized?utm_source=publication-search) and [solar](https://energybadboys.substack.com/p/lazards-low-end-lcoe-estimates-for?utm_source=publication-search) look artificially affordable while [ignoring additional hidden costs](https://energybadboys.substack.com/p/how-to-destroy-the-myth-of-cheap?utm_source=publication-search) like those for transmission, taxes, and providing backup for these intermittent generators.

So you **can imagine our delight** last week when we identified an error in their LCOE+ report regarding the company’s calculations of its cost of “firming” wind and solar resources, ***and they were forced to issue a correction to their slides.*** Sadly, they did not mention that they corrected their slides or credit us for finding the error.

How rude.

[

![a little girl with a flower in her hair is screaming and saying how rude .](https://substackcdn.com/image/fetch/$s_!cwZQ!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F068eb089-5ca3-4cc5-87ca-30d4520ca5a4_498x398.gif "a little girl with a flower in her hair is screaming and saying how rude .")



](https://substackcdn.com/image/fetch/$s_!cwZQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F068eb089-5ca3-4cc5-87ca-30d4520ca5a4_498x398.gif)

## About LCOE and Lazard’s New Firming Cost Metric

We’ve already written several articles about what the LCOE is and its shortcomings for comparing the cost of dispatchable and non-dispatchable resources. You should [check them out](https://energybadboys.substack.com/p/how-to-destroy-the-myth-of-cheap?utm_source=publication-search) if you’re just getting acquainted with our work.

Today’s piece examines Lazard’s newish Levelized Firming Cost Metric and how it attempts to address the fact that its previous reports did not incorporate any load balancing or system cost increases stemming from adding intermittent wind and solar to its system. It’s Lazard’s way of making wind and solar more comparable to dispatchable resources like coal, natural gas, and nuclear.

According to Lazard:

> Lazard’s Cost of Firming Intermittency analysis builds on the LCOE results by evaluating system-level costs associated with supplementing intermittent renewable energy on the grid with firm capacity to ensure reliable electricity delivery during peak demand periods.

Lazard assesses the firming cost based on the capacity value of a resource (generally expressed as Effective Load Carrying Capacity, or ELCC) and the net [Cost of New Entry](https://www.pjm.com/-/media/DotCom/committees-groups/committees/mic/2025/20250411-special/item-1-02-revised-cone-report-final.pdf) (CONE) costs, expressed in dollars per kilowatt-month, published by grid operators for each regional market to determine the cost of new capacity in these markets. The equation can be seen below.

[

![](https://substackcdn.com/image/fetch/$s_!iAM6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24a8a0c4-77a0-4560-acaf-e88247537827_1028x134.png)



](https://substackcdn.com/image/fetch/$s_!iAM6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24a8a0c4-77a0-4560-acaf-e88247537827_1028x134.png)

While working on another project, we realized that there was an error in Lazard’s firming cost math for solar projects in the Midcontinent Independent System Operator (MISO) region. Using the MISO variables provided in Lazard’s report, we determined that it overestimated firming costs under its own methodology.

[

![](https://substackcdn.com/image/fetch/$s_!hEnk!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19eb7edd-c6ef-43d9-95ed-e6fee3cdf4ec_1185x132.png)



](https://substackcdn.com/image/fetch/$s_!hEnk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19eb7edd-c6ef-43d9-95ed-e6fee3cdf4ec_1185x132.png)

Lazard’s original report said the firming cost of wind and solar in the region was $50 per megawatt-hour (MWh). However, based on the assumptions in their report, we calculated a cost of $41.91 per MWh.

[

![Image](https://substackcdn.com/image/fetch/$s_!-0hM!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d0a6942-c76c-4f09-bb9b-94d98fb012d9_1122x792.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!-0hM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d0a6942-c76c-4f09-bb9b-94d98fb012d9_1122x792.jpeg)

So we reached out to Lazard to ask them about the discrepancy.

[

![](https://substackcdn.com/image/fetch/$s_!trS8!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390f392-aaf6-480b-9432-0434959136f1_1166x409.png)



](https://substackcdn.com/image/fetch/$s_!trS8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd390f392-aaf6-480b-9432-0434959136f1_1166x409.png)

They didn’t respond initially, so Isaac sent a follow-up on the 17th, and then we received this response:

[

![](https://substackcdn.com/image/fetch/$s_!MbyB!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fed78c9ca-0af2-4ded-b424-866aa0412ee7_1175x469.png)



](https://substackcdn.com/image/fetch/$s_!MbyB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fed78c9ca-0af2-4ded-b424-866aa0412ee7_1175x469.png)

Transposition errors are certainly forgivable, especially when putting together a large document like this. On the 21st, we received an email notifying us that a new version of the report had been posted online, fixing this issue. Lazard’s new firming cost for solar in MISO was $41 per MWh, which is less than the $42 we had calculated.

[

![](https://substackcdn.com/image/fetch/$s_!Ft9q!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9deaf9c6-24ea-42c8-8a8c-5b9698da213c_1255x482.png)



](https://substackcdn.com/image/fetch/$s_!Ft9q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9deaf9c6-24ea-42c8-8a8c-5b9698da213c_1255x482.png)

We wanted to make sure we could exactly replicate Lazard’s results for its firming cost, so we emailed them to see if any other variables had changed. We also took the opportunity to offer our analytical services to strengthen future versions of the report.

[

![](https://substackcdn.com/image/fetch/$s_!I5YI!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9218d1d1-3def-4e77-8d77-4f9a39955f11_1166x453.png)



](https://substackcdn.com/image/fetch/$s_!I5YI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9218d1d1-3def-4e77-8d77-4f9a39955f11_1166x453.png)

Unfortunately, Lazard did not appear eager to employ us in this capacity. In fact, they were quite brusque, but we did receive more details on the assumptions they used in their equation to calculate the firming cost.

[

![](https://substackcdn.com/image/fetch/$s_!BQpQ!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F829f5727-3795-4aaf-ac71-7d8b186ec465_1168x426.png)



](https://substackcdn.com/image/fetch/$s_!BQpQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F829f5727-3795-4aaf-ac71-7d8b186ec465_1168x426.png)

To our many haters who think we’re unfair with the numbers for wind and solar, if that were the case, we probably wouldn’t have notified Lazard of their error. But the numbers are the numbers, and we call balls and strikes.

## Conclusion

It’s a good thing that Lazard is now considering the incremental cost to firm solar, solar + storage, or wind resources through additional monthly capacity payments to a firming resource under current regional system planning constructs.

Wind and solar advocates will still misrepresent the findings to claim wind and solar are the lowest-cost sources of electricity, but at least with firming costs in the slide deck, it’s pretty easy to demonstrate that [wind and solar are far more expensive than the existing resources on the grid](https://energybadboys.substack.com/p/misos-existing-nuclear-natural-gas), and that they aren’t so cheap when reliability is taken into account.

Finding a small transposition error in Lazard’s analysis was certainly fun, but it doesn’t address a bigger question: Is Lazard’s new levelized cost of firming metric good? That will be the topic of a future *Energy Bad Boys* article.

[

![](https://substackcdn.com/image/fetch/$s_!u-0_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17bcec4d-6cfb-4526-a3a8-a908606d4caa_968x593.png)



](https://substackcdn.com/image/fetch/$s_!u-0_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17bcec4d-6cfb-4526-a3a8-a908606d4caa_968x593.png)

What We’re Reading

**[ISO New England CEO says Region Needs Firm Dispatchable Generation](https://www.spglobal.com/market-intelligence/en/news-insights/articles/2025/10/iso-new-england-ceo-says-region-needs-firm-dispatchable-generation-94224903), S&P Global Capital IQ**

In a surprise to exactly none of our readers, Gordon van Welie, the [ISO New England](https://www.capitaliq.spglobal.com/web/client?auth=inherit#company/profile?KeyProductLinkType=2&id=4060718) president and CEO, said the region will still need firm, dispatchable generation as it transitions to clean energy. The only question is, will they build any?

**[Wind PPA Prices Rising Faster than Solar Under Trump Administration](https://www.utilitydive.com/news/wind-solar-ppa-prices-level-ten-trio/803792/)\- Utility Dive**

Solar power purchase agreement prices in North America rose 4% from the second to third quarter of 2025, while wind prices rose nearly 5%, according to data from the LevelTen Energy PPA marketplace. Wind PPAs have increased nearly 14% since last year.

**[US Government, Brookfield, Cameco Partner to Build $80B of Nuclear Reactors](https://www.spglobal.com/market-intelligence/en/news-insights/articles/2025/10/us-government-brookfield-cameco-partner-to-build-80b-of-nuclear-reactors-94350826) S&P Global Capital IQ**

The Trump administration is putting some serious money where their mouths have been on nuclear power:

“The agreement between the US, Brookfield and Cameco provides for the US government to arrange financing and facilitate permitting and approvals for the new Westinghouse reactors with an aggregate investment of at least $80 billion, including near-term financing of long-lead time items.

Upon closing the transaction and with financing facilitated by the US government, Westinghouse plans to begin orders for long-lead equipment.”