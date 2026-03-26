---
title: "More is Less with Wind and Solar"
author: "Various"
publication: "Energy Bad Boys"
publication_slug: "energybadboys"
published_at: "2025-10-18T09:01:49.000Z"
source_url: "https://energybadboys.substack.com/p/more-is-less-with-wind-and-solar"
word_count: 2038
estimated_read_time: 11
---

[

![](https://substackcdn.com/image/fetch/$s_!WlaD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50c83c12-fedd-4fea-b213-a8bf33b64f66_548x620.png)



](https://substackcdn.com/image/fetch/$s_!WlaD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50c83c12-fedd-4fea-b213-a8bf33b64f66_548x620.png)

With all the talk about needing to dramatically increase power supplies to meet the growing demand from data centers, as well as for anticipated electric vehicle adoption and other electrification efforts, it’s time to highlight one glaring reality of filling that demand with wind and solar—the reality of *diminishing returns.*

As in: the more intermittent capacity you add, *the less capacity value you get from it.* When it comes to wind and solar, more is less.

### How it Works

Electric grids and utilities across the country assign reliability ratings to wind and solar resources—called capacity values—and these values diminish to almost zero as the system adds more wind and solar.

This reality is lost on—or intentionally obfuscated by—many wind and solar advocates who like to brag about current high capacity values for wind and solar without mentioning the fact that these values plummet as you add more wind and solar to the grid.

[

![](https://substackcdn.com/image/fetch/$s_!pYm0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9470a23-0880-4ff2-b438-d11736ca0c43_545x721.png)



](https://substackcdn.com/image/fetch/$s_!pYm0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9470a23-0880-4ff2-b438-d11736ca0c43_545x721.png)

Before we go into how most major power grids in the country show this diminishing effect, here’s a primer on what capacity values are and how they’re calculated.

# What Are Capacity Values?

The term “capacity value” is defined by the National Renewable Energy Laboratory (NREL) as “the contribution of a power plant to reliably meeting demand. Capacity value is the contribution that a plant makes toward the planning reserve margin…”

Basically, capacity values are percentages of total installed capacity for each energy source that electric grids believe they can reliably count on to meet demand. It reflects the idea that while every energy source has a maximum capacity that it can reach under ideal conditions, not every energy source can reliably perform at these ratings at any given time and when needed.

Grid operators use different methodologies to calculate capacity values, with most choosing some variation of the Effective Load Carrying Capability (ELCC), while the Midcontinent Independent System Operator (MISO) opts for the Direct Loss of Load (DLOL).

However, even though ELCC and DLOL methodologies can vary from region to region with no set-in-stone method to the madness, the basic concepts are fairly similar.

## Methodologies

Capacity value methodologies are typically run using probabilistic hourly models that target a maximum Loss of Load Expectation (LOLE) of .1, which means that the system expects to have a shortfall of capacity .1 days per year or 1 day per 10 years.

From here, there are two ways of going about the analysis, which we explain below using solar as an example.

#### The First Method

1.  Begin with a certain system of energy sources.
    
2.  Remove solar from the grid to assess the LOLE without the resource.
    
3.  Calibrate system conditions to meet an LOLE of .1 days per year, typically by reducing the load on the system.
    
4.  Reintroduce solar into the system.
    
5.  Increase the load on the grid to assess the solar’s ability to handle more load while maintaining the maximum LOLE of .1 days per year.
    
6.  Divide the increase in load the system can support while maintaining the LOLE target by the nameplate capacity of the solar to determine a capacity value rating.
    

[

![](https://substackcdn.com/image/fetch/$s_!ZL7L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd30468bf-c807-40a2-a462-d77c11129505_6250x938.png)



](https://substackcdn.com/image/fetch/$s_!ZL7L!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd30468bf-c807-40a2-a462-d77c11129505_6250x938.png)

#### The Second Method

1.  Begin with a certain system of energy resources.
    
2.  Remove solar from the grid to assess the LOLE without the resource.
    
3.  Calibrate system conditions to meet an LOLE of .1 days per year.
    
4.  Reintroduce solar into the system.
    
5.  Remove what is called “perfect capacity,” or always-available capacity, until the LOLE balances at the target of .1 days per year.
    
6.  Divide the amount of perfect capacity removed by the nameplate capacity of the solar to determine the capacity value.
    

[

![](https://substackcdn.com/image/fetch/$s_!WfFM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7490ae8c-409d-4ad4-a753-695ef90ab5d2_5500x825.png)



](https://substackcdn.com/image/fetch/$s_!WfFM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7490ae8c-409d-4ad4-a753-695ef90ab5d2_5500x825.png)

Variations from these standard practices exist — for example, MISO uses a Direct Loss of Load (DLOL) method that begins in the same calibration for an LOLE target of .1 days per year, but instead of adjusting load or replacing perfect capacity, MISO evaluates reliability in terms of Loss of Load Hours (LOLH) and measures how resources like wind and solar perform during those critical hours. Their capacity values are then derived from the resources’ observed ability to reduce LOLH during those events.

## Limitations of current capacity value methods

Current methodologies for calculating wind and solar capacity values have several limitations that need to be considered when referencing them as reliability metrics.

The first limitation is that they are dependent on existing resources already on the grid. This means that if the generation makeup of the grid changes dramatically, as is happening on power systems across the country, this will have a significant negative impact on the capacity values of wind and solar.

Furthermore, they are also dependent on current load profiles, which are also anticipated to change in major ways with the emergence of data center load growth.

Finally, many capacity values are based on average performance, and not during the highest stress hours for maintaining system reliability, such as peak demand or net peak demand (demand minus wind and solar generation). As a result, capacity values may not assess the reliability of wind and solar when they are needed most, which can lead to an overreliance on them for meeting peak and net peak demand.

# Wind and solar capacity values plummet as the system adds more

Now that the basics are out of the way, let’s discuss the reality that many wind and solar advocates avoid: **that every megawatt of wind and solar added to the system is less reliable than the one before it.**

Wind and solar capacity values fall as more of these resources are added to the grid because their output patterns are often correlated—the sun sets over an entire continent or concentrated wind turbines experience a wind drought—and they are non-dispatchable. As a result, adding more of the same variable resource reaches a point where the resource does not meaningfully contribute to reliability.

Referring back to the methods above, this means that the more wind and solar you add, the less the load can increase on the system or the less perfect capacity can be removed, thus increasing the denominator of the equation at a higher rate than the numerator.

This is reflected by diminishing capacity values for wind and solar in several major regional transmission operators (RTOs) in the country, which we detail below.

## Map of Diminishing Capacity Values for Major RTOs

For a summary comparison, the map below shows the current capacity values of wind and solar in major RTOs across the country and how they are all expected to decline in the future as more are added to the system.

[

![](https://substackcdn.com/image/fetch/$s_!qmi7!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa81c9893-64b0-43b0-8cfc-c22e14c9630e_1875x1150.png)



](https://substackcdn.com/image/fetch/$s_!qmi7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa81c9893-64b0-43b0-8cfc-c22e14c9630e_1875x1150.png)

## Midcontinent Independent System Operator (MISO)

As mentioned before, MISO conducts a Direct Loss of Load (DLOL) analysis to calculate the capacity value of resources at different penetration levels and years in the future.

In almost every season for wind and solar capacity values [plummet](https://cdn.misoenergy.org/20250319%20Futures%20Redesign%20Workshop%20Item%2004%20Resource%20Adequacy685483.pdf) and reach as low as .4 percent for solar in winter and 8.6 percent for wind in fall by 2043. The one exception to this is wind in the summer months, which actually increases from 8 percent in 2025/26 to 11.5 percent in 2030 before falling again to 8.9 percent by 2043. Still not a great reliability rating compared to coal, gas, hydro, and nuclear, which range from 64 percent to 95 percent in every single season.

[

![](https://substackcdn.com/image/fetch/$s_!tZqg!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad1ced63-ecd7-4f5d-8f78-160fd712aed4_1090x570.png)



](https://substackcdn.com/image/fetch/$s_!tZqg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad1ced63-ecd7-4f5d-8f78-160fd712aed4_1090x570.png)

In its 2024 Regional Resource Assessment, MISO [explains](https://cdn.misoenergy.org/2024%20RRA%20Report_Final676241.pdf) that even though wind and solar will make up the vast majority of installed capacity in the future, reliable/accredited capacity will still be made up of primarily thermal resources:

> *As Figure 26 shows, dispatchable thermal resources with high accreditation values, such as natural gas and coal, are forecast to provide a much larger fraction of the region’s total needed accredited capacity compared to wind and solar, which have significantly lower accreditation values due to their weather dependent nature and other factors. Battery storage is also projected to provide a significant portion of total accredited capacity.*
> 
> *Notably, RRA modeling also forecasts that low-accredited wind and solar will account for a full 62% of the region’s installed capacity and 87% of the region’s energy by 2043 (see Figure 22 on page 25 for more details). This illustrates how the many new wind and solar resources that members and states plan to build may yield large numbers in terms of installed capacity and energy, while simultaneously experiencing steep cuts in terms of accredited capacity.*

[

![](https://substackcdn.com/image/fetch/$s_!MfW7!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99b56400-f715-4f9c-8a35-37dca8b894f6_1007x524.png)



](https://substackcdn.com/image/fetch/$s_!MfW7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99b56400-f715-4f9c-8a35-37dca8b894f6_1007x524.png)

## Pennsylvania-New Jersey-Maryland (PJM)

PJM shows a [similar story](https://www.pjm.com/-/media/DotCom/planning/res-adeq/elcc/preliminary-elcc-class-ratings-for-period-2026-2027-through-2034-2035.ashx#:~:text=Preliminary%20ELCC%20Class%20Ratings%20for,82%25). While onshore wind and offshore wind begin at 41 percent and 68 percent, respectively, in the 2027/28 planning year, these resources drop to 19 percent and 26 percent by 2035/36.

Solar already starts at a low capacity value, dropping from 7—9 percent in 2027/28 to 6—7 percent by 2035/36.

[

![](https://substackcdn.com/image/fetch/$s_!cSHX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a14a5cc-433c-4066-ae66-4616e4ab2465_608x438.png)



](https://substackcdn.com/image/fetch/$s_!cSHX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a14a5cc-433c-4066-ae66-4616e4ab2465_608x438.png)

PJM offers the following [context](https://www.pjm.com/-/media/DotCom/planning/res-adeq/elcc/discussion-of-preliminary-elcc-class-ratings-for-period-2027-2035.pdf) behind these values:

> *\-The ratings for the two solar classes remain stable at low values during the entire period due to the high level of winter risk*
> 
> *\-The ratings for the two wind classes decrease significantly due to a gradual shift in winter historical performance patterns driving the winter risk in the model (as shown in the above tables)*

## Electric Reliability Council of Texas (ERCOT)

ERCOT shows a [similar effect](https://www.ercot.com/files/docs/2025/02/12/2024_ERCOT_ELCC_Study_Final_Report_Revised.pdf) as more wind and solar are added to the system, as the same trend can be seen in the following charts.

As you can see, as more solar is added to the grid, the ELCCs drop to the 0—2 percent range, even with significant amounts of wind capacity on the grid.

[

![](https://substackcdn.com/image/fetch/$s_!O9s0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F400dfd74-4224-466e-9948-4dc72d16321c_539x354.png)



](https://substackcdn.com/image/fetch/$s_!O9s0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F400dfd74-4224-466e-9948-4dc72d16321c_539x354.png)

Similarly, as more wind is added to the ERCOT system, wind ELCCs drop into the 5—10 percent range.

[

![](https://substackcdn.com/image/fetch/$s_!qbD6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe74d1a78-db4b-4243-bab2-8a0a075e1313_615x469.png)



](https://substackcdn.com/image/fetch/$s_!qbD6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe74d1a78-db4b-4243-bab2-8a0a075e1313_615x469.png)

We hear a lot about the complementary nature of wind and solar generation in ERCOT. While this is true to some extent, these results show that even this has its limits when relying on large amounts of wind and solar capacity for meeting demand because complementary generation won’t always be the case, and there will be times when both resources perform poorly at the same time.

As ERCOT explains, despite often seeing complementary wind and solar generation, “The shift to winter reliability and the large additions of solar capacity have significantly lowered the projected contribution of marginal solar additions in the summer,” and that wind capacity is “also subject to further declines in ELCC with penetration as the risk of large area wind lulls have a larger impact on reliability.”

## Southwest Power Pool (SPP)

For [Southwest Power Pool](https://spp.org/documents/74984/2025%20elcc%20study%20summary%20-%20summer.pdf), solar values are fairly high at the moment, ranging from 55 percent to 74 percent, because it has very few solar resources on the grid, while wind is much lower, ranging from 19 percent to 26 percent, because it is already saturated with wind resources.

[

![](https://substackcdn.com/image/fetch/$s_!K2_l!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6d4e775-98e2-4567-af99-1652feebf6f4_624x263.png)



](https://substackcdn.com/image/fetch/$s_!K2_l!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6d4e775-98e2-4567-af99-1652feebf6f4_624x263.png)

However, as you can see from the charts below showing wind and solar ELCCs in the summer and with 10 GW of 4-hour storage on the system, both of these values are expected to decline dramatically.

Solar is [expected](https://www.spp.org/documents/71725/spp%20resource%20adequacy%20future%20resource%20study%20report.pdf) to reach a range from below 10 percent to just above 20 percent, depending on how much wind is on the system, while wind is expected to range from below 5 percent to below 10 percent, depending on the solar resources on the grid.

[

![](https://substackcdn.com/image/fetch/$s_!JvfL!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52f1bc71-7116-48ac-862f-d7ab7b240ae0_3125x1250.png)



](https://substackcdn.com/image/fetch/$s_!JvfL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52f1bc71-7116-48ac-862f-d7ab7b240ae0_3125x1250.png)

# Conclusion

The trend is simple enough to catch—**the more wind and solar are added, the less valuable every additional MW becomes to the grid.** The New York ISO (NYISO) makes the case [clear](https://www.nyiso.com/documents/20142/46037414/2023-2042-System-Resource-Outlook.pdf) in its 2023-2042 System & Resource Outlook report:

> *One complex challenge that needs to be considered beyond 2040 is the relative ineffectiveness of new solar and wind resources to contribute during periods of reliability risk after a significant amount of capacity has been built.*

[

![](https://substackcdn.com/image/fetch/$s_!TMto!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66682834-db58-458d-b1e6-5176c7e03d1b_523x481.png)



](https://substackcdn.com/image/fetch/$s_!TMto!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66682834-db58-458d-b1e6-5176c7e03d1b_523x481.png)

This is an important reality to remember when wind and solar advocates try to present intermittent resources as reliable energy sources that are able to meet the power demand needs of the future.

The fact is that not only are wind and solar already intermittent and unreliable, but they have diminishing returns as you add more of them.

As usual, we end with the recommendation of not only keeping our existing thermal fleet in operation for as long as possible, because they are often the most affordable and reliable power plants on the system, but also bringing back recently retired facilities and building new ones on top of it.

[

![](https://substackcdn.com/image/fetch/$s_!wWNx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febb3ed2d-1bb0-401f-a46d-fb1575d87236_968x593.jpeg)



](https://substackcdn.com/image/fetch/$s_!wWNx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Febb3ed2d-1bb0-401f-a46d-fb1575d87236_968x593.jpeg)

1.  **[Gloves Off](https://substack.com/@doomberg/p-176232557)** by
    
2.  **[Why Is My Energy Bill So High](https://substack.com/home/post/p-176041308)** by