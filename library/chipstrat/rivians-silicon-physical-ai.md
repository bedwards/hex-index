---
title: "Rivian's Silicon & Physical AI"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-12-03T17:43:20.000Z"
source_url: "https://www.chipstrat.com/p/rivian-silicon-and-physical-ai"
word_count: 7970
estimated_read_time: 40
---

Let’s dive deep into Rivian ahead of its [Dec 11 AI & Autonomy Day](https://rivian.com/autonomy).

*After all, physical AI is the future right?*

[

![](https://substackcdn.com/image/fetch/$s_!sdek!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a388d0d-6d7f-428b-9150-24cc632159dd_1200x800.jpeg)



](https://substackcdn.com/image/fetch/$s_!sdek!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a388d0d-6d7f-428b-9150-24cc632159dd_1200x800.jpeg)
*[Source](https://x.com/wallstengine/status/1937817538584596572)*

Rivian might seem to sit outside my usual coverage universe, but I personally love tracking it because the company is exciting from many angles:

**🧢 As a Semiconductor analyst:** Rivian isn’t like the traditional semis companies I often cover (Nvidia, AMD, Intel, etc), *but* it’s super interesting in the way that Apple Silicon is super interesting. After all, Apple is a consumer product company that starts with an uncompromising view of the user experience, then designs the silicon and system architecture to support it.

Rivian is analogous: a consumer product company that realized it could only deliver its world-class transportation experience by owning the *entire* hardware and software stack.

*And a lot of silicon content in those battery-powered robots-on-wheels!*

[

![](https://substackcdn.com/image/fetch/$s_!vpH5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff13a58f-3406-48ef-ba35-c4b6516ba6c5_1730x1030.png)



](https://substackcdn.com/image/fetch/$s_!vpH5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff13a58f-3406-48ef-ba35-c4b6516ba6c5_1730x1030.png)
*[Source](https://www.youtube.com/watch?v=Re35BI-GJKc&t=1938s)*

A key enabler we’ll dive into is Rivian’s zonal architecture, *here’s a nice clip explaining:*

> **RJ: \[The legacy OEM approach\] is almost the exact opposite of how you would architect a system if you started with a clean sheet.** If you put twenty great computer scientists and electronics engineers together, you wouldn’t say, “Let’s build a system of 120 islands of software, all written by different teams, all written to different standards, that communicate through a CAN network, but it’s very hard to make updates to, and the layers of abstraction between the people running the requirements and the people running the software are at a minimum twofold, often three or four layers.”
> 
> **You would say, “Let’s have the smallest number of computers in the car that make all the decisions.” And so you’d end up with what we now call a zonal architecture.** Depending on the size of the vehicle, maybe two computers in a car, one in the front, one in the back. If it’s bigger like an R1, maybe two in the back and one in the front that do all the decisioning across one common software platform running on a standard in-house-built OS.
> 
> **We built that.**

Rivian’s technical story is compelling, but the business story matters just as much and should resonate even with readers who don’t usually follow automotive. We’ll examine how Rivian’s business is differentiated from Tesla, Chinese EV and AV players, and legacy OEMs.

**🧢 As an autonomy guy:** I come out of the autonomy world where I was a product manager at John Deere’s Blue River Technology subsidiary in Santa Clara.

*Really really big robots!*

[

![](https://substackcdn.com/image/fetch/$s_!Z288!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbdbdf668-24ec-416e-9721-800375657abd_1600x622.png)



](https://substackcdn.com/image/fetch/$s_!Z288!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbdbdf668-24ec-416e-9721-800375657abd_1600x622.png)
**No one in the cab of the tractor as it tills the field. Big autonomous robot coming through!**

Obviously, autonomous tractors are not the same as autonomous cars, but there’s substantial overlap. They both rely on things like:

-   perception sensors
    
-   over-the-air updates
    
-   localization systems and path-planning that account for uncertainty
    
-   Simulation environments
    
-   Onboard inference compute
    

This isn’t legacy automotive with its heavy dose of mechanical engineering, outsourced electronics, and embedded systems engineering. AVs require those skillsets, but so much more. *You have your own camera systems engineers, right?*

**Autonomy** ***demands*** **vertical integration.** Rivian made the right early vertical integration EV choices to set it up for an autonomous future.

And don’t forget about safety. It’s the foundation of autonomy, whether in cars, semi trucks, or farm equipment. You saw the dust plume behind that tractor. What happens if I approach from behind on a four wheeler and the cameras lose visibility through the dust? Or when two vehicles operate in the same field and one needs to approach the other through a heavy dust cloud, like this tractor pulling up to a combine during harvest?

[

![](https://substackcdn.com/image/fetch/$s_!tzGx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F086c1e3d-d980-4341-9e77-99b866cf5c88_1574x606.png)



](https://substackcdn.com/image/fetch/$s_!tzGx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F086c1e3d-d980-4341-9e77-99b866cf5c88_1574x606.png)
**Interestingly, in this situation a human driving the tractor can barely see, whereas a vehicle with sensors that can penetrate a dust cloud (like radar) can.**

Obviously the safety concerns of driverless on-road vehicles are even crazier. The stakes rise further in on-road autonomy. [Watch this Aurora autonomous trucking short.](https://www.youtube.com/shorts/Ng108xlLrYc) Construction workers, cones, and unpredictable human motion on the road. Chaos!

Here’s the rub. Traditional automotive safety assumes *deterministic* systems operated by *unpredictable* humans. But driverless systems are different. Neural networks make the decisions, and their behavior is *probabilistic*. This requires a different mental model! Engineers who spent their careers validating deterministic logic often struggle with that shift.

It is not only the engineers who struggle. The broader organization does as well. A century of institutional muscle memory and a workforce shaped by vehicles designed around a human driver struggle with driverless cars, resulting in slow decision cycles and even misaligned incentives. The OEMs can’t just acquire their way out of it either, remember [GM/Cruise](https://techcrunch.com/2024/12/11/cruise-employees-blindsided-by-gms-plan-to-end-robotaxi-program/) and [Ford/Argo](https://techcrunch.com/2022/10/26/ford-vw-backed-argo-ai-is-shutting-down/)?

This is all to say that AV (autonomous vehicle) development requires a *culture* built for autonomy from the ground up. **I’ll go so far as to say that culture will be the strongest predictor of future AV winners.** Rivian is building that culture now while the company is young and free of legacy constraints.

Finally, long-run autonomy value depends on getting the product strategy right today. Autonomy is more than just an extension of ADAS, but does not require an immediate jump to robotaxis. The real objective is a technical architecture and product roadmap that create near-term customer value yet scale into TAM-expanding personal-vehicle autonomy use cases such as school drop-off and mobility for older adults.

Done right, a robotaxi offering can emerge from the same stack, giving the automaker a path to support ride-sharing operators like Uber and Lyft in dense, high-income regions where those fleets can reach sustainable economics.

As we’ll see below, Rivian’s culture, technology, and roadmap put the company on a credible path to succeeding with autonomy.

Speaking of product roadmaps, I’ve also worn a product manager hat, and one thing I appreciate about Rivian is the product mindset that runs through the company. You can see it in how the leadership frame decisions.

**🧢As a product manager:** CEO RJ Scaringe has a fantastic product mindset. Listen to any interview with him, and you’ll hear clear, defensible reasoning supporting product decisions.

Here are two great PM mindset example quotes from RJ’s recent chat with John Collison:

> **RJ:** Here’s the question we always have to ask ourselves: If we have a certain pool of dollars we can spend on the car, we’re the arbiters of how those dollars get spent. And we can’t make everyone happy. Somebody will maybe want that, but to do that, we can’t... something else either has to fall out, or the price has to go up.

Trade-offs!

> **RJ:** “A vehicle is many millions of decisions together… some of those decisions, not everyone’s going to agree with… our job is to have convictions around the decisions we’re making.”

And those convictions are *right*.

> **RJ:** When the R1 launched. we won Vehicle of the Year.. And then Consumer Reports does this annual brand survey, and they look at customer satisfaction, customer appeal, and they look at likelihood to repurchase.
> 
> **And so in our first year of production, with our first product we’ve ever produced, we came out by far number one on that**, which was amazing. And in our second year, we came out by far number one. We beat the next closest by 15 points. That was amazing.
> 
> It was really just a reflection of how much work the teams had put in to make all these product-level decisions, trade-offs around... **You think of a vehicle, it’s many tens of millions of trade-offs we’re making around cost versus performance versus a feature. And so we’d really done a nice job of getting the product-market fit right, so it really connected with consumers.**

Getting the product design and trade-off decisions right and customers love it.

*Rivian continues to “rhyme” with Apple.*

And the kicker is that RJ isn’t just a product guy, but is an even better engineer, which gives him the range to see the full arc of a decision from customer value to technical feasibility.  
  
RJ clearly leads with a product engineering mindset anchored in customer needs and technical rigor. Those traits tend to propagate, so I expect the same instincts to shape Rivian’s broader culture. It sure seems that way in videos with the various leaders (CTO, head of hardware, CFO, etc).

**🧢Student of high CapEx businesses:** I’m familiar with capital-intensive companies, including startups, and am not afraid of [this chart](https://x.com/alojoh/status/1985962618058575988):

[

![](https://substackcdn.com/image/fetch/$s_!5x87!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2366c934-7760-4e3a-ac8a-6fe17dd2ea45_831x879.png)



](https://substackcdn.com/image/fetch/$s_!5x87!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2366c934-7760-4e3a-ac8a-6fe17dd2ea45_831x879.png)
*Accompanying this image in the tweet is the text “Congratulations to Rivian and RJ Scaringe @RJScaringe 👏. Rivian has just become the first automaker with cumulative cash burn exceeding $23 billion.”*

I get where bears are coming from. At first blush this seems like a frightening chart. Ford, with its supplier leverage and scale can lose more than $15B on EVs without generating operating leverage? *The economics of EVs must be fundamentally broken?*

If Ford cannot make the math work, how could Rivian, with $23B dollars of cumulative burn, possibly climb out of the trough and reach breakeven?

So the bears instinctive conclusion is that Rivian is a boutique American OEM with beautiful product and bad economics. *Just like Lucid… ?*

That conclusion misunderstands what Rivian actually built.

That $23B funded a first-principles EV and autonomy *platform* and a complete US manufacturing footprint.

So why does the first-principles platform matter?

Firms like Fisker, Canoo, Faraday, Workhorse, and VinFast rely on Tier-1 electronics. They cannot meaningfully consolidate ECUs, simplify wiring, or shift complexity into software because suppliers control interfaces and firmware.

**The resulting cost structure stays high even as volume grows, which is why these companies can’t reach operating leverage.**

Polestar and Lotus ride on [Geely’s incumbent platforms](https://www.motor1.com/features/725012/polestar-3-technical-analysis/). Similar Tier-1 problems.

Chinese firms XPeng and NIO are nimble and adept at EV/software/ADAS than most of their Western peers, but operate inside a China-centric supply chain and don’t get to [participate in the US market](https://mashable.com/article/chinese-evs-us-tarrifs-subsidies-xpeng-tesla).

Ford is publicly shifting toward a centralized compute architecture. Jim Farley has [talked](https://www.youtube.com/watch?v=8IhSWsQlaG8) about consolidating distributed ECUs and creating a software-defined platform like Tesla and Chinese EVs. But it has legacy baggage to overcome.

Rivian and Lucid are the only players in the above chart trying a full Tesla-style stack with clean-sheet high-voltage and zonal architectures, unified compute, in-house software and OTA, and vertically integrated U.S. manufacturing.

Note that Rivian has a higher manufacturing capacity with it’s Normal IL plant (215K annually) vs Lucid’s Casa Grande, AZ plant (90K). And Rivian is standing up a purpose-built, high-volume Georgia factory designed around the even simpler Gen2 platform.

Yes, the R1 is a premium product (i.e. expensive) and thus has a small addressable market, but that was by design. It was meant to be the “handshake with the world” to introduce the brand.

[

![](https://substackcdn.com/image/fetch/$s_!oCWo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F023d8db8-bbe8-40d5-9dc7-65e0d0f3b212_1024x768.png)



](https://substackcdn.com/image/fetch/$s_!oCWo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F023d8db8-bbe8-40d5-9dc7-65e0d0f3b212_1024x768.png)
*R1S and R1T, “built for adventure”. [Source.](https://www.thecarconnection.com/news/1141895_rivian-r1t-and-r1s-best-luxury-cars-to-buy-2024)*

From Q4 2024 [earnings](https://www.fool.com/earnings/call-transcripts/2025/02/20/rivian-automotive-rivn-q4-2024-earnings-call-trans/):

> **RJ Scaringe:** And, you know, the first products we launched, the R1T, the R1S, their purpose was to really act as a handshake with the world to establish who we are as a brand. And what we see today is a brand that has customers that are really excited for what we’re building. And there’s a range of different third-party analysis that look at brand strength and customer happiness and customer satisfaction. For the second year in a row, we’ve come out as the highest-rated brand in terms of customer satisfaction and likelihood of repurchase on one of the leading customer satisfaction and brand surveys that’s done every year.

The product resonates. The brand resonates. But the company still needs to bend its cost curve through a lower BOM (Bill of Materials) and the scale efficiencies that come with higher volume running through Normal.

Gen2 was the first big step on that journey, and R2 takes it further.

[

![](https://substackcdn.com/image/fetch/$s_!ZrZf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F152b316e-7cef-4c30-a864-ed0021b7dd55_1756x428.png)



](https://substackcdn.com/image/fetch/$s_!ZrZf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F152b316e-7cef-4c30-a864-ed0021b7dd55_1756x428.png)

R2 enters with a BOM roughly half that of R1, enabled by Rivian’s Gen2 electrical architecture, large die castings, consolidated power electronics, and broad supplier renegotiations that reset contracts signed before Rivian had scale or leverage.

It’s worth digging into the supplier renogotiations a bit. RJ explains it well on the Q4 2023 Earnings Call, Feb 21, 2024:

> **RJ:** But getting into just thinking about the overall supply chain sort of health for us and overall material costs, we’re just seeing a dramatically different environment for sourcing than what we had previously. **And when we think about when we source R1, and a lot of the billing materials that we’ve been operating off of and the contracts we’ve been operating off of to date, those are contracts that went in place in 2019, 2020, where Rivian was in a very different negotiating position with those suppliers** and where the industry was in a very different position to be making commitments to us.
> 
> **Fast forward to today, those same suppliers are highly engaged, very enthusiastic about the product.** And they’ve experienced very much firsthand some of the challenges of supplying other products, and some of the products from large established OEMs have not done nearly as well as what they thought they would or what those other manufacturers thought they would. And on a relative basis, looking at those and comparing it to us, **they now see us as a large customer, and they see what’s coming with R2 and that gives us a really meaningful negotiating leverage**.
> 
> And in many cases, we’ve been able to negotiate with our existing suppliers meaningful cost reductions that remove any of the price premium that we would have been paying before associated with us being a new company. **But in cases where we haven’t been able to do that, we’ve been very active on resourcing suppliers and bring on -- ending supplier relationships and bringing on new suppliers**. And we have a relentless focus on driving our cost of goods sold down through those activities.

Clearly there are structural disadvantages Rivian is working through: legacy contracts signed without scale, a startup risk premium embedded in pricing, and components sourced in a supply-constrained 2019–2020 market.

Gen2 and R2 change that, giving Rivian enough demonstrated demand and volume visibility to renegotiate, re-source, and strip out much of the “new entrant” tax from the R1 bill of materials.

[

![](https://substackcdn.com/image/fetch/$s_!WSkI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F607263ad-82dc-4941-aaa4-28872b864591_1600x880.png)



](https://substackcdn.com/image/fetch/$s_!WSkI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F607263ad-82dc-4941-aaa4-28872b864591_1600x880.png)

Priced in the $45-$55K range, R2 lands in the center of the US market where the average new vehicle now sits. Five-seat crossovers dominate that segment, and R2 brings R1’s brand strength into that price band with a cost structure built for volume. The result is a considerable expansion of Rivian’s addressable market into a multi-million-unit demand pool that a $90K+ flagship could not reach.

**So the $23B funded a completed factory, a cost-optimized platform, and an autonomy-ready compute and electronics stack. R2 and R3 unlock mass-market volume on top of that foundation.**

Rivian’s curve is not a boutique OEM stuck in negative FCF. It is a platform company that front-loaded the investment required to replace the legacy supplier stack.

It’s a future-proof platform ready for EV and AV scaling.

*Rivian’s approach also aligns with US supply chain reshoring and geopolitical trends…*

And if you don’t yet believe that Rivian built a scalable *platform*, look no further than the [Rivian-VW joint venture](https://techcrunch.com/2024/11/12/the-rivian-volkswagen-joint-venture-deal-is-now-up-to-5-8b/). Volkswagen spent years and billions of dollars trying to build a modern EV software and electronics stack, and failed. Adopting Rivian’s architecture is a clear admission that Rivian built what the world’s largest automaker could not. VW’s up to $5B commitment is evidence that Rivian’s Gen2 platform is competitive, modern, and manufacturable at global scale. None of the other heavy cash-burn players on this chart have yet convinced a top OEM to replace its internal architecture with theirs.

*As an analogy, it mirrors NASA turning to SpaceX, where an incumbent recognizes that the newcomer’s architecture outperforms its own and adopts it as the way forward.*

OK, well that was a lot of thoughts before actually diving into Rivian 😅

Let’s dive deep now. We’ll cover Rivian in light of the following:

-   why vertical integration is necessary for the best product experience
    
-   Silicon content
    
-   why autonomy is an important TAM expansion for Rivian
    
-   and why vertical integration again is necessary for success
    
-   Volkswagen joint venture as external validation of the Rivian HW/SW stack
    

## **North Star Vision & Unlocking Latent Demand**

Rivian’s north star vision is to “drive the shift away from fossil fuels” and, more importantly, to “help drive a level of *excitement* around the shift away from fossil fuels.”

The former speaks to changing the physics and economics of transportation through mass electrification. The latter speaks to changing consumer psychology by making EVs so enjoyable and attractive that ICE owners accelerate their own transition.

The mainstream narrative claims consumers don’t want EVs. Headlines fixate on softness in demand, the end of EV credits, range anxiety, tariff noise, the Ford Lightning slowdown example, cost-prohibitiveness, charging infrastructure challenges, etc.

But RJ’s view is the opposite. He believes *latent demand* for EVs is large, but the *affordable* products today (especially sub-$50K market) are not compelling enough to unlock that latent demand.

> **RJ Scaringe:** If I’m buying a vehicle and I want to spend less than 50k, there’s hundreds of choices in the ICE world. I can get sedans, I can get coupes, I can get convertibles, I can get minivans, I can get crossovers, SUVs, all these different choices, different brands. If I’m buying an EV, I think there’s two choices. I think it’s a Model 3 or Model Y today.

I personally agree with this 100%.

EVs are a great product experience; I’ll never forget the first time a buddy of mine gave me a ride in his Tesla and floored it. It was like a roller coaster; I lost my breath at first and then just started laughing. This friend leveraged FSD a lot on his long daily commute, hadn’t needed to gas up a vehicle in forever, and so on. He enjoyed all the benefits… and it made me want an EV!

But we don’t have an EV yet for precisely the reasons RJ listed.

We’ve got four young kids. We need either an EV daily driver that’s a minivan (sliding doors man, best invention ever if you’ve got little kids) or maybe a five-seater crossover as a secondary vehicle. But the daily driver can’t cost 90K, because we have kids man and we can’t have nice things (our minivan has doodles scratched into the door thanks to a brief moment of unsupervision… I mean, I love the creativity…).

We are totally right in RJ’s sweet spot. *And to be quite honest, I’d even consider something like an Xpeng X9 if it was possible (it’s not).*

We would consider an EV second vehicle, but again it’d be ideal to fix all six in a pinch and still be middle market price.

Something like the Scout Traveler with a bench seat in the front so we can fit six in a pinch… that could be a second driver. And its beautiful.

*But when will it ship, and will it actually cost under $60K?*

RJ ties the latent demand to Rivian’s mission directly:

> **RJ:** **Our mission is to drive the world towards a fossil fuel free future in transportation**, but really broadly as a global economy. **And to do that, we need to have customers of our cars that are not buying EVs.** We don’t want to just be playing a game of sort of moving the existing EV customers around to different EV brands.
> 
> And so **more than 3 quarters of our customers today, their first time their purchase at Rivian is their first time EV experience**.
> 
> And our hope is to continue that exact same trend with R2 in fact higher. I’d love R2 to be 90% of our customers have never owned an EV before. And that means we’re pulling people out of a wide array of SUVs and crossovers and passenger cars in that space.

[

![](https://substackcdn.com/image/fetch/$s_!fBNK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d12b62c-ea83-43b5-a000-29de0c2e43de_2048x868.png)



](https://substackcdn.com/image/fetch/$s_!fBNK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d12b62c-ea83-43b5-a000-29de0c2e43de_2048x868.png)
**Rivian’s R2, with RJ nearby for size :) [Source](https://techcrunch.com/2024/03/07/rivian-takes-the-wraps-off-45000-r2-suv-its-biggest-bet-yet/)**

[

![](https://substackcdn.com/image/fetch/$s_!ApWo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23e6ee89-a75d-49f6-bafd-fc32f0ceb540_2048x1152.png)



](https://substackcdn.com/image/fetch/$s_!ApWo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23e6ee89-a75d-49f6-bafd-fc32f0ceb540_2048x1152.png)
**RJ with the R2 in the background (white) and the R3 base model in the foreground. R2 is aiming to be $45K-$55K, and R3 is aiming for $35K-$45K. [Source](https://www.motortrend.com/features/2024-rivian-ceo-rj-scaringe-interview-r1s-r1t-r2-r3-r3x/photos)**

[

![](https://substackcdn.com/image/fetch/$s_!i8EL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe3e89743-bdae-4945-a354-6a2380559285_2048x1363.png)



](https://substackcdn.com/image/fetch/$s_!i8EL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe3e89743-bdae-4945-a354-6a2380559285_2048x1363.png)
**R3X is the high-performance version of the hatchback. [source](https://www.autoweek.com/photos/g60130181/2027-rivian-r3-r3x-electric-crossover-gallery/).**

*BTW, range anxiety is not a concern on my end – we live in a suburb and do a ton of 20-minute commutes. We just need compelling alternatives!*

I know I’m just a single data point. You may not feel the same way. Regardless, if you happen to be based in the US, we can agree that we have a lack of compelling options here:

> **RJ:** ￼There’s been a number of EV launches from existing manufacturers that haven’t gone that well.
> 
> **And I think we get the causality backwards.** We say, “It’s because customers aren’t ready to buy EVs.” **And I say, “No, it’s because the EV is not that compelling.”**
> 
> And the existence proof that if you have a highly compelling product, there will be a lot of demand, is Tesla. The Model Y is one of the best-selling cars in the world. **We just need to have 20 other choices in order to start to really make a dent.**
> 
> And then if you compare this to China, where there is a lot more choice, China’s at a three and a half, four times higher level of adoption of electrification than we are, and the slope of the curve is very steep.
> 
> **We have a choice issue here in the US, is our view.**

This context captures RJ’s worldview well. Consumers are not rejecting EVs. They are rejecting *bad* EVs. Or overpriced EVs. Or EVs built on retrofitted ICE-era electronics architectures that compromise user experience.

Demand is supply-constrained on *product fit* for the largest buying cohort, namely folks and families buying that $50K or less crossover. The moment a vehicle is highly compelling and priced in the center of the market, adoption will happen.

> **RJ:** For the first time with R2, you’ll have a choice that’s highly compelling, that’s not a Tesla.

I’m all for choice. And love Tesla, but it’s been years of the same look. And aren’t we all generally tired of this anyway?

[

![](https://substackcdn.com/image/fetch/$s_!ozRs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c8eb792-e409-4a70-9b77-b96c87b9fef1_902x2048.png)



](https://substackcdn.com/image/fetch/$s_!ozRs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c8eb792-e409-4a70-9b77-b96c87b9fef1_902x2048.png)
*[source](https://medium.com/swlh/the-zombie-mobile-b03932ac971d)*

But look, this little R3 is so cute. I wouldn’t mind if my neighbors wanted to add a touch of Italy to our suburban Iowa bland.

[@jasoncammisa](https://instagram.com/@jasoncammisa)

[![](https://substackcdn.com/image/fetch/$s_!RI1z!,w_640,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F__ss-rehost__IG-meta-C4YUmLevxQf.jpg)](https://instagram.com/p/C4YUmLevxQf)

Jason Cammisa on Instagram: "Rivian let me play with the R3 and…

*Can I get a version with ADAS/autonomy too?*

## **The Best Product Experience**

I wanted to highlight some interesting sections that showcase the end-to-end product experience and ultimately lay the foundation for the argument that a modern EV/AV experience *requires* a fully-integrated OEM like Tesla and Rivian.

Although I’ve been nagging a bit on car designs, what actually matters for a modern EV is how it fits into your routines and road trips, how the in-car software handles navigation and charging planning, how comfortable and quiet it is to live with every day, the phone app experience, how it holds its range in different weather, how confident you are in its driver-assist systems over time, etc… not just how it looks parked at the curb.

*If you’re a Rivian owner you can skip on past.*

**If you’re not a Rivian owner, I highly recommend this “6 months with an R1S” review that just dropped from Scot at Out of Spec Reviews.** She isn’t your typical car reviewer (i.e. a car dude), so you get a different perspective and better appreciation of the full experience.

*Again, she’s just a single data point, but it’s illustrative of what it takes to make a compelling EV experience. Watch it on 2x.*

First, note that Scot is that ICE-to-EV user RJ was talking about. She’s replacing the jobs-to-be-done of both a crossover AND truck with the Rivian:

> **Scot:** For those of you who don’t know, **I had a 2018 Mazda CX-5, so a very small SUV, and I had a Ford F-150 truck because I tow my horses a lot**. For several years, I had been talking with Kyle about needing a bigger vehicle. **I didn’t want to go electric because I didn’t think that I could get everything I wanted in one car.** And that just simply is not the case here.

And she loves the product, which, as we’ll see is love on many dimensions.

> **Scot:** Big disclaimer here. **I genuinely love this car so much.** It’s really hard for me to be critical because I’m so sparkly-eyed over it.
> 
> #### **Software**
> 
> **Scot:** I love my software…. I think Rivian has done an amazing job. I think it’s all about the ecosystem of the car - the app, the ability to share drivers, the ability to have climate hold and dog mode, and the route planning has gotten way better on this.
> 
> When I got this car, the route planning was not integrated with Google Maps. Since they have integrated Google Maps, it is so much better. Before I had to give an actual address. I couldn’t just search a general thing. So since the integration with Google Maps, I really like that.
> 
> I’m so happy they introduced climate hold. I think the phone app has gotten better. And I love the new charging graphs because it gives you a charging curve in there.

The most compelling EVs have a *software-centric experience* and **they rapidly get better over time**. As Anush Elangovan likes to say, “speed is the moat”.

> **Anush Elangovan:** But when I say speed is the moat, it is about how we prepare – how we build the muscle to run the race for a long time and run it fast. And it is not about a single point in time that you’ve beat some benchmark and you declare victory. **It’s about building the ability to consistently develop and deliver.** [Source](https://linearb.io/dev-interrupted/podcast/amd-ai-open-source-moat-rocm)

Obviously a different context, but it applies here too and reminds me of our earlier discussion about *culture.* Can traditional OEMs

1.  Make beautiful software in the car and for the phone
    
2.  Rapidly update said software
    

It’s a different mindset too; the software needn’t be perfect (but it must be safe!) **but it must rapidly improve:**

> **Scot:** We have two more software updates that have changed the car overall, which is so cool because in the past when I would buy a car, you got what you got and that was it.
> 
> **Kyle:** The ADAS system - adaptive cruise control. When you first got it, what was it like?
> 
> **Scot:** It would roar up behind somebody and then slam on the brakes and then readjust itself. Now it slows down at a normal rate of speed.

*Gets better over time!*

An automaker needs the right culture and right people to pull this off.

It also needs the right business model; if the automaker only capture revenues on the upfront sale, how do they pay for ongoing software development? It requires a subscription service.

> #### **Range**
> 
> **Scot:** The big things that I love first and foremost is the range that I have in this car.  
> **Kyle:** It’s like 350 miles no matter how you drive it on 100%. It’s great range.
> 
> **Scot:** I live like 45 minutes from here. I drive to the track. I can go to my horse barn which is an hour and a half from here. I can go to my personal retirement farm which is an hour from here. I can do all of that in one day without having to stop and charge.

*I had to pause for a second at “personal retirement farm” lol. Horses.*

This was with the biggest battery pack for transparency.

But then another nice free advertisement from Scot to a lot of minivan soccer moms:

> **Scot:** If you are anything like me and you’re thinking about getting this car, splurge for the big battery. It is 100% worth it. It made the transition from an ICE vehicle to an electric vehicle feel seamless. I think I definitely had range anxiety and the Model 3 didn’t feel like it was quite enough.
> 
> **Kyle:** You mentioned don’t get the small battery one. We actually own the small battery R1S, the LFP. What’s your impression?
> 
> **Scot:** If you live in a city and you’re just popping to the grocery store, picking the kids up from school, going to soccer practice, all within like a 20-mile range, I think that’s all the car that you need. The LFP is probably fine for most people. It’s the one I would actually recommend to 90% of people out there.

*That’s the kind of social proof that calms range anxiety; word-of-mouth reassurance from someone who actually has the vehicle.*

By the way, it takes a ton of engineering to get great battery life, it’s no small feat.

Look at all this engineering, from Rivian’s recent shareholder letter:

> [
> 
> ![](https://substackcdn.com/image/fetch/$s_!Mqvu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4b4bbf1-529e-4580-93c0-35fd25ec316d_2048x998.png)
> 
> 
> 
> ](https://substackcdn.com/image/fetch/$s_!Mqvu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4b4bbf1-529e-4580-93c0-35fd25ec316d_2048x998.png)
> 
> We continue to innovate our core technologies, with design improvements on R2’s battery platform. We completed a clean-sheet design for R2’s battery pack and 4695 cell, which offers six times the energy of the 2170 cell used in R1. The new cell-to-pack design uses the vehicle’s floor as the battery pack lid, which helps to minimize the pack’s mass. To help us maintain a cost-effective supply, we expect all R2 cells to be produced in the U.S. starting in 2027.

This requires in-house experience.

[

![](https://substackcdn.com/image/fetch/$s_!VLkt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20f40845-e0b0-426a-9377-6c4011d7d71a_2048x1139.png)



](https://substackcdn.com/image/fetch/$s_!VLkt!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20f40845-e0b0-426a-9377-6c4011d7d71a_2048x1139.png)

And why buy those those R2 Cells in the US (from LG Energy Solution in Arizona)?

To derisk tariff impacts. From the Q1 2025 Earnings Call, May 06 2025:

> **Dan Meir Levy  
> ***Barclays Bank PLC, Research Division*
> 
> **I wanted to first start with a question on batteries and the tariff impacts.** I appreciate the disclosure that you have enough cells to get you through into early 2026. But perhaps you can give us a sense thereafter what your strategy is, especially around LFP. I appreciate that you do have the cells for R2 eventually going to be from the U.S. But what’s your strategy around LFP? And if you could just confirm, are the LFP sales tariffed as an automotive product at 47.5%? Or as a nonautomotive product that’s 145%?
> 
> **RJ Scaringe  
> ***Founder, CEO & Chairman of the Board*
> 
> Yes. Thanks, Dan, for the question. Yes, certainly, we’ve been spending a lot of time looking at just the overall landscape around trade and certainly, that has a big impact on battery tariffs. For us, as you said, through the end of 2025, we have inventory that provides us resilience to any increases in tariffs. **As we look at 2026, very importantly, with the launch of R2, the 4695 cell that we’re using is initially sourced out of Korea, but we’ve been, for a while now, working very closely with our partner on this, which is to localize that into the United States. And starting in 2027, those cells will be produced in Arizona. And so that’s outstanding for us in terms of the long-term cost structure for R2**. And then as it pertains to R1, both with the 2170 cells that we’re using as well as the LFP cells, this is something where we’re actively working to address some of the changes in trade. And we have the flexibility to be looking at alternatives and to be thinking around how do we evolve our sale sourcing strategy for R1 as we look at 2026 and beyond.

*Yes, I’m way in the weeds.*

The point I’m making here by including all of this detail is to show how much behind-the-scene effort goes into **delivering an amazing product experience at the right cost**:

[

![](https://substackcdn.com/image/fetch/$s_!0lYX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9105c6c1-926d-43ad-97c0-bc5c4479bdf6_1166x1564.png)



](https://substackcdn.com/image/fetch/$s_!0lYX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9105c6c1-926d-43ad-97c0-bc5c4479bdf6_1166x1564.png)

Can an automaker do this they’re not fully vertically integrated? Not to the same degree, and it impacts the user experience and/or cost.

The whole experience matters. Check out these features and how they translate into customer loyalty:

> #### **Wide Capability**
> 
> **Scot:** This is something that I was talking to Kyle about. For me, it is the wide capability. I go back to - I was living the two-car lifestyle. I had a small SUV and I had a big truck. So when I say wide capability, yes, I can take this on a road trip and I have range. I can then go off-road. I have several different off-road modes.
> 
> **Kyle:** Have you used any of those?
> 
> **Scot:** I use all-terrain when I go camping. I have fit seven adults and two large dogs in this car.
> 
> *\[They show the back cargo area with third row seats\]*
> 
> **Scot:** I went camping with this. **I’ve utilized the camping features. I love that I don’t wake up super hot because I can just keep my climate on all night.** I have only used these rear seats once, the third row. They stay down like this because I always have my dogs back here. But it is nice to have them. Once I fold those flat, I can easily fit - I did a camping video with my friend Katie, so we are both full-size adults. We can both fit in here and our two large dogs could be in here and we were all very comfortable camping.
> 
> **Scot:** **I also use the frunk**. I just put all my jackets and jet ski cover and everything in here. Tons of space.
> 
> It’s just a really capable vehicle and I’ve never had that experience. It’s the perfect one-car solution. I feel like I don’t need anything more. **And now I’m so spoiled. I certainly can’t have anything less.**

Clearly, a ton of product decisions and trade-offs were correctly made to create the “perfect one-car solution” for Scot.

I’m starting to understand why Consumer Reports said Rivian has the highest owner satisfaction.

[

![](https://substackcdn.com/image/fetch/$s_!pYsd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3689934c-d6c3-4865-8b70-da62c4939744_1248x766.png)



](https://substackcdn.com/image/fetch/$s_!pYsd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3689934c-d6c3-4865-8b70-da62c4939744_1248x766.png)

[Source.](https://www.consumerreports.org/cars/car-reliability-owner-satisfaction/most-and-least-liked-car-brands-a1291429338/)

Now, in full transparency and to make the R2 point — this is a $105K trim package. This is RJ’s “handshake with the world” to introduce the brand; folks love it, but not many can afford it (yet).

Of course there are the *basics* that I’ve skipped, like how it feels to sit in every day and how easy it is to keep clean. Customers want the “computer on wheels”, but they still demand the best basic experience too. *I think the level of publicly appreciation for little design and form factor details has increased over the years, and a lot of that is thanks to the iPhone. And Tesla.*

> #### **Comfort**
> 
> **Scot:** I think it’s very comfortable to drive. I did go for the Ocean Coast interior. That’s 100% just a looks thing, but it’s so pretty.
> 
> I spilled a smoothie in here a couple of weeks ago and this is all vegan leather and everybody’s freaking out about the perforations - “Oh, the smoothie is going to get in there.” Well, if you take a close look, it did not get in there, which was amazing. So, I just wiped it up with a microfiber.

[

![](https://substackcdn.com/image/fetch/$s_!Rdw4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3c49a3a-5df1-4c0f-9ce4-9bd9042a6eba_944x1094.png)



](https://substackcdn.com/image/fetch/$s_!Rdw4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3c49a3a-5df1-4c0f-9ce4-9bd9042a6eba_944x1094.png)
**TMI: That reminds me of the time our youngest had a diaper blowout that was so bad it leaked all the way through the baby car seat and stained the vehicle’s upholstery beneath it. Looked quite similar to Scot’s smoothie spill!**

Anyway, I’m sure Rivian is loving Scot’s perfect marketing to parents:

> **Scot:** This material is amazing because I am a dirty person. I constantly have mud on my shoes and stuff, but you can just spray it down, wipe it off, kick it off, and it’s good to go. Dogs are in it, camping, whatever.
> 
> **People are really gross and you can just wipe it right off.**

No truer sentiment. OK, I’ll stop there, I’ve belabored it already. But watch the video for more. Modern vehicles have *so many design details* that matter, and hardware/software and increasingly AI will be paramount to enabling those details.

## **Why Vertical Integration is Necessary**

**Vertical integration is absolutely required to deliver the owner satisfaction and long-term loyalty behind Rivian’s EV experience.** The product is no longer just body design or drivetrain, but the interaction of low-voltage electronics, high-voltage energy management, compute, driver-assist, UI, OTA, and the cloud.

If those elements come from many vendors, the OEM becomes a *constrained* integrator. If they are designed in-house, the company controls the experience. *And iteration speed!*

That control lets Rivian deliver user experiences that legacy architectures cannot support. This is the core of a software-defined vehicle.

As RJ explained in a [fireside chat](https://www.nvidia.com/en-us/on-demand/session/gtc25-s73711/) with Nvidia’s VP of Automotive, Rishi Doll:

> **RJ:** Getting buyers of vehicles exposed to the benefits of a well-developed, highly compelling EV that fits their form factor needs, their price point needs, their storage and cargo capacity needs, is really important.
> 
> The feeling of acceleration, the feeling of a completely redefined software architecture and software experience in the vehicle, and also the way that we approach the vehicle getting better and better over time.
> 
> **The car of today is so different from the car of before, and technology is really one of the biggest differentiators.** If you look at the complexity of semiconductors that’s available in the car today, there’s nothing that compares. For many of our customers, the most powerful computer that they own will be actually their Rivian.
> 
> **With our vehicles being software-defined, it gives us the opportunity to look at design in different ways that we haven’t been able to do before.** We have Rivian DNA and we wanted to look and feel like a Rivian and people need to experience it like a Rivian.
> 
> We have an architecture where we are able to continuously improve the software over and over and faster with the new generation. When we do the hardware ourselves, we actually have that flexibility. **So you buy a vehicle on day one and on day 300, it’s a different vehicle, it’s a better vehicle.**

The idea that the vehicle is getting better over time is beautiful.

In a sense, the vehicle experience is *appreciating*, not depreciating.

This is the perfect example of the nice little features a software-defined vehicle can enable, watch from ~22:50 here:

> **WB:** My name is Wassym, and I lead the software development at Rivian.  
> People often ask me what’s different in Rivian Software. So let me give you a small example. We will meet Jordan.
> 
> Jordan is an R1S customer in the beautiful state of Colorado. She goes to the gym 3 times a week. She wakes up at 7 am, walks to the vehicle. The vehicle is configured automatically. The cabin is set to her preferred temperature and then she can drive with her preferred music service. It’s a very simple sequence. All Jordan had to do is pick up her phone.

Nice simple little gesture. Yet surprisingly difficult for legacy OEMs because it touches 30+ different [ECUs](https://en.wikipedia.org/wiki/Electronic_control_unit) (little embedded computers) from as many different suppliers, none of which easily talk to each other:

> **WB:** Now, let’s see how we would do this in the legacy auto world. This is one example of a legacy architecture. You can see here many ECUs likely from many different suppliers. **The simple example that I have just shown, which is just 30 seconds, we would need more than 30 plus ECUs in order to do it**. This is 30+ suppliers, 30+ black-box software, different interfaces, different requirements, different integration, different test methodologies. **Now imagine as you’re developing that experience, you want to change it. You will need to coordinate again with all these suppliers.**
> 
> Even worse, you have shipped the vehicle and then you have a change of heart on the overall experience. It’s even more painful because you don’t have OTA capability.
> 
> How do we do it at Rivian? At Rivian, with the vertical integration that we have between hardware and software, we developed a much cleaner and simpler architecture. **With the powerful compute that we have, we simplified the hardware architecture, moved that complexity to software.**

Visualizing the hardware complexity helps. Here’s all the functional ECUs that would be involved in the simple little gesture:

[

![](https://substackcdn.com/image/fetch/$s_!Gu87!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1985423d-d421-40d7-9bf5-ca13e87e598a_2048x1141.png)



](https://substackcdn.com/image/fetch/$s_!Gu87!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1985423d-d421-40d7-9bf5-ca13e87e598a_2048x1141.png)

Ouch.

But Rivian insisted from day one on building its zonal controllers and RJ describes it as “foundational to how we develop our products”.

The first attempt (Gen 1) ended up with 17 in-house ECUs:

[

![](https://substackcdn.com/image/fetch/$s_!PqTO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa41e2241-5fc4-4ab7-babe-0d8ac5e015f7_2048x1139.png)



](https://substackcdn.com/image/fetch/$s_!PqTO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa41e2241-5fc4-4ab7-babe-0d8ac5e015f7_2048x1139.png)

As Rivian’s head of hardware, Vidya Rajagopalan, explained during Investor Day 2024, this has many benefits:

> Vidya: So Wassym showed you this picture earlier about how legacy OEMs typically serve up features. You saw there’s a ton of ECUs, or Electronic Control Units. Oftentimes, these legacy OEMs have somewhere between 40 to over 100 such ECUs.
> 
> ECUs are little mini-computers, and they use them with a very low level of granularity, perhaps one controlling the seat. The ECU for a seat would be a little microcontroller whose primary job is just moving the seat around and heating it. As we know, a microcontroller is a really simple computer. A modern computer is capable of doing much more than that; you don’t need to dedicate one just to move a seat.
> 
> Our approach is very different. When we started Rivian, we always wanted to be vertically integrated. **But we were also very clear that we were not going to follow that legacy philosophy of having hardware dedicated to really small tasks. This added to mass cost and also created huge complexity in software because you had these little ECUs coming from multiple Tier 1 suppliers, and you’re trying to get them to speak to each other.** Can you imagine how Wassym’s job would have been? It would be really hard because anytime you needed to change something, you’d have to talk to all these different people.
> 
> From the get-go, we were very clear that we would have a much simpler architecture. We adopted what we call a **domain architecture**. In a domain architecture, you have **an ECU per function category**. This was the first step we took in consolidation.
> 
> Instead of one ECU per function, it’s bound per function category:
> 
> -   We have an ECU for thermal management.
>     
> -   We have an ECU for vehicle dynamics.
>     
> -   We have an ECU for body controls.
>     
> 
> The body control ECU controls a number of body activities, such as the wipers, lighting, and door handles/closure. It’s the first step of consolidation where we aggregated a number of features.
> 
> By doing this, we had **17 in-house ECUs** and a very limited number of vendor ECUs (we only use them in areas where we don’t add a whole lot of value). Already, you can see we’re at **17 ECUs** compared to the 40 to 100 seen in legacy vehicles.

Nice. The software simplicity makes a ton of sense. It’s also a lot less mass as we can see here:

[

![](https://substackcdn.com/image/fetch/$s_!w0L8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4b6bac4c-3377-4547-ab74-1377bd6f8e04_1120x698.png)



](https://substackcdn.com/image/fetch/$s_!w0L8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4b6bac4c-3377-4547-ab74-1377bd6f8e04_1120x698.png)
*See the 17 unique units on the left – imagine 40 to 100!*

**Eliminating Tier 1 margin stacking is another benefit.** Each supplier ECU comes with its own markup, while Rivian’s in-house controllers avoid those stacked margins. Sure, it requires extra R&D costs, but those can be amortized across the platform rather than paid as a fixed per-unit premium.

What’s really cool is that Rivian kept going, and the Gen 2 hardware takes the integration a step further down to only seven ECUs:

[

![](https://substackcdn.com/image/fetch/$s_!Gu-9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffbcc39ce-a9b0-48d5-a7e2-f84b1558bca4_1920x1320.png)



](https://substackcdn.com/image/fetch/$s_!Gu-9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffbcc39ce-a9b0-48d5-a7e2-f84b1558bca4_1920x1320.png)
**Down to seven unique systems on the right.**

> **Vidya:** So when it came time to look at what to do next for our Gen 2 platform, we knew what we wanted to do. We knew we had a big focus: we wanted to **drive costs down**. And the one big way to do it is always **integration**. Integration wins in electronics; everybody knows that.
> 
> So we chose to migrate to what is called a **zonal architecture**. The zonal architecture addresses two key limitations that exist in a domain-based architecture:
> 
> 1.  **Compute Efficiency:** The domain-based architecture is not the most efficient when it comes to using compute resources. We realized we could do better.
>     
> 2.  **Wiring Efficiency:** The other really big limitation is that it’s highly inefficient in the way it uses wiring.
>     
> 
> By moving to this new architecture, we went from a model where we had **17 in-house ECUs** down to **7 in-house ECUs**.

Hardware simplicity visualized:

[

![](https://substackcdn.com/image/fetch/$s_!HYJl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5dbe5bd3-739c-4a2c-a418-2ed8e827468c_2048x1150.png)



](https://substackcdn.com/image/fetch/$s_!HYJl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5dbe5bd3-739c-4a2c-a418-2ed8e827468c_2048x1150.png)
*Beautiful simplicity*

[

![](https://substackcdn.com/image/fetch/$s_!BBu8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2f747f6-c54c-4812-aba9-8b87a894b673_2048x1126.png)



](https://substackcdn.com/image/fetch/$s_!BBu8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2f747f6-c54c-4812-aba9-8b87a894b673_2048x1126.png)
**What! 1.6 mile reduction in harness length!!**

Look at this mass of wires for Gen1!

[

![](https://substackcdn.com/image/fetch/$s_!cu-I!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39d3579e-381f-4f75-89bc-51b02d013373_2048x1412.png)



](https://substackcdn.com/image/fetch/$s_!cu-I!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39d3579e-381f-4f75-89bc-51b02d013373_2048x1412.png)

Now imagine what a traditional car with the Tier 1 40-100 ECUs has for wiring!

**Silicon content time!**

Rivian developed three zonal controllers (east, west, south) with an Ethernet backbone:

[

![](https://substackcdn.com/image/fetch/$s_!p2Th!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F843a70dc-040f-40db-a632-ca1fa26c3bfc_2048x1118.png)



](https://substackcdn.com/image/fetch/$s_!p2Th!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F843a70dc-040f-40db-a632-ca1fa26c3bfc_2048x1118.png)

Now, I know what you’re wondering.

**Is Nvidia inside any of those in-house computers?**

Yep, Rivian uses Nvidia onboard for the autonomy computer as well as offline for autonomy AI model training. From the [Nvidia GTC session](https://www.nvidia.com/en-us/on-demand/session/gtc25-s73711/), RJ explains how Gen 2 uses Nvidia Orin:

> **RJ:** We work with you \[Nvidia\] on GPUs for offline training and then in the vehicle we designed a much higher capability platform with our Gen 2 which has 240 TOPS on the Orin platform—which is a lot more than what we launched with—to do all that in-vehicle processing, all the inference, so that the real-time decisioning that’s happening is from that platform.

Rivian’s autonomy computer uses dual Nvidia Orin processors as can be seen here:

[

![](https://substackcdn.com/image/fetch/$s_!Cd4h!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2639352-557d-4479-a010-12a735c3164c_1744x1016.png)



](https://substackcdn.com/image/fetch/$s_!Cd4h!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2639352-557d-4479-a010-12a735c3164c_1744x1016.png)
*Arrows pointing to GPUs*

Given that NVIDIA Drive AGX Orin is Ampere architecture and Nvidia’s newer [Drive AGX Thor](https://developer.nvidia.com/drive/agx#section-thor-features) is Blackwell (two generations better) and has ~4x FLOPs (1,000 INT8 vs 254 INT8), one can imagine Rivian will eventually upgrade to Thor.

**You might be wondering if Rivian has it’s own Nvidia GPU training cluster like Tesla’s [Cortex](https://www.datacenterdynamics.com/en/news/teslas-50000-gpu-cortex-supercomputer-went-live-in-q4-2024/) cluster.** Nope.

Rivian does access “tens of thousands of GPUs” but explicitly avoids owning GPU clusters to preserve capital flexibility. From the [Q4 2024 Earnings Call, Feb 20, 2025](https://www.fool.com/earnings/call-transcripts/2025/02/20/rivian-automotive-rivn-q4-2024-earnings-call-trans/):

> **Adam Michael Jonas (Morgan Stanley, Research Division):** I wanted to ask about the Rivian Autonomy Platform, where you really have a pretty major change of strategy moving to end-to-end, 10x the compute, enhanced sensor suite as well.**So I’m just curious, in those moves, can you tell us how much you’re spending on the compute and training?** What are you doing in-house? Or how much are you doing with partners? **I’m curious how much of the forward R&D or OpEx and CapEx is allocated towards AI infrastructure and training** as you use your proprietary data and press your leadership there.
> 
> **RJ:** A lot of training horsepower is needed, and t**he GPU is necessary to train**, as you put it. These are expensive, and I do think there’s often confusion—somewhat surprisingly—around the nature of how we access GPUs.
> 
> **It’s really a business-level decision** **as to whether it’s CapEx** (buying the GPUs and building an AI training infrastructure) or whether you’re renting them **or whether you’re creating unique off-balance sheet ways to finance it so it effectively shows up as R&D or OpEx**.
> 
> We’re in a position today where the world has recognized the need to build a lot more AI training capability, and there is a variety of really creative ways we can access a substantial amount of GPUs without having to deploy the CapEx ourselves. Those are the structures that we’re working really hard to achieve.
> 
> Without giving more detail around what those deal structures look like, I think you can probably imagine there are lots of ways, and **we’re seeing lots of companies demonstrate ways to access tens of thousands of GPUs to do this type of training.**

Nice.

Any other silicon vendors? Infotainment needs silicon to power the visualization and connectivity:

[

![](https://substackcdn.com/image/fetch/$s_!mbNG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd6115d8-7f86-4094-9f69-b5447d6a2404_2048x1147.png)



](https://substackcdn.com/image/fetch/$s_!mbNG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd6115d8-7f86-4094-9f69-b5447d6a2404_2048x1147.png)

Sounds like a job for Qualcomm Snapdragon Cockpit SoCs! ([More here](https://www.chipstrat.com/i/163708237/snapdragon-cockpit))

[

![](https://substackcdn.com/image/fetch/$s_!AJ9P!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09b42c08-279b-4635-bccb-f0af6ef82833_1368x830.png)



](https://substackcdn.com/image/fetch/$s_!AJ9P!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09b42c08-279b-4635-bccb-f0af6ef82833_1368x830.png)

*I think these are liquid cooled too. But to probe it in the lab they attach massive heat sinks as the liquid cooling would get in the way:*

[

![](https://substackcdn.com/image/fetch/$s_!ckk-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9588b25-b952-44e5-ad73-89e67c67e3ef_3024x1760.png)



](https://substackcdn.com/image/fetch/$s_!ckk-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9588b25-b952-44e5-ad73-89e67c67e3ef_3024x1760.png)
**[per this video](https://www.youtube.com/watch?v=Re35BI-GJKc)**

Snapdragon + Unreal Engine are key enabling platforms that make Rivian’s super fun user experiences possible, like the 2025 Halloween mode feature:

How fun is that? So creative.

*For more details on the QCOM & RIVN partnership, see the Snapdragon Summit 2024 with Wassym Bensaid from Rivian and Bill Clifford from Epic Games (start ~11:18) explaining the partnership:*

*There’s a lot more to the in-house electronics too, you can dive deeper here (start ~40min in):*

## Why semiconductor and infra folks should care

Rivian functions as a system integrator that delivers significant silicon content to the physical world. *Working on physical AI with autonomy…*

**Per-vehicle silicon content is no joke – thousands of dollars per vehicle.**

As R2 and R3 volumes rise, these sockets shift from niche to economically material.

**And the Volkswagen-Rivian joint venture will expand that reach further, globally!**

Beyond the Nvidia AI computer and Qualcomm cockpit SoC, the vehicle carries zonal controllers, battery management system microcontrollers and power management ICs, RF for telematics, UWB and NFC for access, sensor ISPs, radar, and camera sensors.

Some suppliers have begun to signal their wins. Infineon [disclosed](https://www.infineon.com/market-news/2025/infatv202505-108) an R2 design win in May 2025, capturing the traction inverter power modules, MCUs, and PMICs.

*More neat shots and information about ECUs, reliability testing, etc in [this video](https://www.youtube.com/watch?v=Re35BI-GJKc):*

[

![](https://substackcdn.com/image/fetch/$s_!vel4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad66499a-87b9-4e77-9655-42009e09966d_3024x1710.png)



](https://substackcdn.com/image/fetch/$s_!vel4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad66499a-87b9-4e77-9655-42009e09966d_3024x1710.png)

## Autonomy

Software-defined EVs are the present, and autonomous vehicles (AVs) are the future.

For paid subscribers we’ll go deep into why autonomy is an important TAM expansion for Rivian and why vertical integration again is necessary for success.

Then cover the Volkswagen joint venture as external validation of the autonomy-ready stack.

*Another 2,500 words* *incoming…* 😅

-   Vertical integration and why Rivian needs it
    
-   Data, sensors, and compute as a single design problem
    
-   How stable sensors prevent an aging training corpus
    
-   Purpose-built cameras, imaging radar, and multi-modal sensing
    
-   OTA velocity and end-to-end AI architecture
    
-   Autonomy as TAM expansion
    
-   Why the Volkswagen joint venture is a major validation
    

This should prep you for the upcoming Rivian AI & Autonomy day.

[Read more](https://www.chipstrat.com/p/rivian-silicon-and-physical-ai)