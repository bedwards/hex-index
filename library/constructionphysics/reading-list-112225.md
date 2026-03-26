---
title: "Reading List 11/22/25"
author: "Brian Potter"
publication: "Construction Physics"
publication_slug: "constructionphysics"
published_at: "2025-11-22T13:01:31.000Z"
source_url: "https://www.construction-physics.com/p/reading-list-112225"
word_count: 964
estimated_read_time: 5
---

[

![](https://substackcdn.com/image/fetch/$s_!dZuh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb708750d-b48f-4a56-ad60-e3514074289f_555x813.png)



](https://substackcdn.com/image/fetch/$s_!dZuh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb708750d-b48f-4a56-ad60-e3514074289f_555x813.png)
*USS George HW Bush under construction at Newport News shipyard.*

Welcome to the reading list, a weekly roundup of news and links related to buildings, infrastructure, and industrial technology. This week we look at the ship failure that caused the Francis Scott Key Bridge collapse, the boring part of Bell Labs, a more efficient way of making antimatter, underground nuclear reactors, and more. Roughly 2/3rds of the reading list is paywalled, so for full access become a paid subscriber.

##### Francis Scott Key Bridge Collapse

I normally think of extreme sensitivity to small failures as a property of very high performance engineered objects – things like a jet engine catastrophically failing due to a [pipe wall being a few fractions of a millimeter too thin](https://admiralcloudberg.medium.com/a-matter-of-millimeters-the-story-of-qantas-flight-32-bdaa62dc98e7). But other complex engineered systems can also be susceptible to the right (or wrong) sort of very small failure. The National Transportation Safety Board has a report out on what caused the MV Dali containership to lose power and [crash into the Francis Scott Key Bridge](https://en.wikipedia.org/wiki/Francis_Scott_Key_Bridge_collapse) in Baltimore in 2024. The culprit? The label on a single wire in slightly the wrong position, which prevented the wire from being firmly connected. When the wire came loose, the ship lost power. Via the [NTSB](https://www.ntsb.gov/news/press-releases/Pages/NR20251118.aspx):

> *At Tuesday’s public meeting at NTSB headquarters, investigators said the loose wire in the ship’s electrical system caused a breaker to unexpectedly open -- beginning a sequence of events that led to two vessel blackouts and a loss of both propulsion and steering near the 2.37-mile-long Key Bridge on March 26, 2024. Investigators found that wire-label banding prevented the wire from being fully inserted into a terminal block spring-clamp gate, causing an inadequate connection.*

[

![](https://substackcdn.com/image/fetch/$s_!lt8m!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fecdf1b54-2a6f-49d8-8e58-a49808bb734e_616x932.png)



](https://substackcdn.com/image/fetch/$s_!lt8m!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fecdf1b54-2a6f-49d8-8e58-a49808bb734e_616x932.png)

The NTSB also has a [video on its Youtube channel showing](https://m.youtube.com/watch?v=bu7PJoxaMZg&amp;pp=0gcJCR4Bo7VqN5tD) exactly what went wrong with the wire.

##### Apple and 3D printing titanium

Apple has [an interesting piece](https://www.apple.com/newsroom/2025/11/mapping-the-future-with-3d-printed-titanium-apple-watch-cases/) on their use of 3D printing for their titanium-bodied watches. It’s typically rare to use 3D printing for large-volume production, due to its higher unit costs compared to other fabrication technologies. Apple seems to be using 3D printing on its watch bodies for two reasons: one is that because 3D printing is additive rather than subtractive (machining down a titanium forging), there’s less material waste, which they consider beneficial for decarbonization reasons. The other is that 3D printing makes it possible to fabricate part geometries that wouldn’t be possible using other fabrication methods.

> *Apple 2030 is the company’s ambitious goal to be carbon neutral across its entire footprint by the end of this decade, which includes the manufacturing supply chain and lifetime use of its products. Already, all of the electricity used to manufacture Apple Watch comes from renewable energy sources like wind and solar.*
> 
> *Using the additive process of 3D printing, layer after layer gets printed until an object is as close to the final shape needed as possible. Historically, machining forged parts is subtractive, requiring large portions of material to be shaved off. This shift enables Ultra 3 and titanium cases of Series 11 to use just half the raw material compared to their previous generations.*
> 
> *“A 50 percent drop is a massive achievement — you’re getting two watches out of the same amount of material used for one,” Chandler explains. “When you start mapping that back, the savings to the planet are tremendous.”*
> 
> *In total, Apple estimates more than 400 metric tons of raw titanium will be saved this year alone thanks to this new process.*

##### The boring part of Bell Labs

Bell Labs, as I’ve noted [several](https://www.construction-physics.com/p/what-would-it-take-to-recreate-bell) [times](https://www.construction-physics.com/p/the-influence-of-bell-labs), is famous for the number of world-changing inventions and scientific discoveries it generated over its history. It’s the birthplace of the transistor, the solar PV cell, and information theory, and it has accumulated more [Nobel Prizes](https://www.construction-physics.com/p/who-wins-nobel-prizes) than any other industrial research lab. But the scientific breakthroughs and world-changing inventions were a small part of what Bell Labs did. Most people that worked there were engaged in the more prosaic work of making the telephone system work better and more efficiently. Elizabeth Van Nostrand has an [interesting interview with her father](https://elizabethvannostrand.substack.com/p/the-boring-part-of-bell-labs), who worked in this “boring” part of Bell Labs:

> *Most calls went through automatically e.g. if you knew the number. But some would need an operator. Naturally, the companies didn’t want to hire more operators than they needed to. The operating company would do load measurements and, if the number of calls that needed an operator followed a Poisson distribution (so the inter-arrival times were exponential).*
> 
> *The length of time an operator took to service the call followed an exponential distribution. In theory, one could use queuing theory to get an analytical answer to how many operators you needed to provide to get reasonable service. However, there was some feeling that real phone traffic had rare but lengthy tasks (the company’s president wanted the operator to call around a number of shops to find his wife so he could make plans for dinner (this is 1970)) that would be added on top of the regular Poisson/exponential traffic and these special calls might significantly degrade overall operator service.*
> 
> *I turned this into my Master’s thesis. Using a simulation package called GPSS (General Purpose Simulation System, which I was pleasantly surprised to find still exists) I ran simulations for a number of phone lines and added different numbers of rare phone calls that called for considerable amounts of operator time. What we found was that occasional high-demand tasks did not disrupt the system and did not need to be planned for.*

##### Transit timelines

[Transit timelines](https://transit-timelines.github.io/) is a very cool website that has transit system maps for over 300 different cities, going back to the 19th century. For each city you can step through time in five year increments to look at the extent of the transit system, and compare the transit systems of multiple cities for a given period of time.

[

![](https://substackcdn.com/image/fetch/$s_!2g0W!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51f36e23-7cc0-4725-acbd-f4ddf500638c_1415x625.png)



](https://substackcdn.com/image/fetch/$s_!2g0W!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51f36e23-7cc0-4725-acbd-f4ddf500638c_1415x625.png)

[Read more](https://www.construction-physics.com/p/reading-list-112225)