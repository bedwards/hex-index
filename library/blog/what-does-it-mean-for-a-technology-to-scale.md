---
title: "What does it mean for a technology to scale?"
author: "Ben Reinhardt"
publication: ""
publication_slug: "blog"
published_at: "2025-03-18T14:51:04.000Z"
source_url: "https://blog.spec.tech/p/what-does-it-mean-for-a-technology"
word_count: 2278
estimated_read_time: 12
---

A particular failure mode that we’ve noticed among scientists and engineers doing ambitious technology research is ignoring the question **“does this technology scale?”** It’s a question that gets thrown around a lot by VCs and technology analysts, but people rarely unpack what that means and (I suspect) many of us don’t even know. Scalability and the work to scale a technology is worth unpacking because often scaling a technology can be more work than inventing it in the first place and ultimately, the most capable technology in the world won’t have much impact if it is too expensive to be used or there just isn’t enough of it to go around.

[

![](https://substackcdn.com/image/fetch/$s_!t1Rp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c6b70ed-9ccf-4d5c-a525-552ba1b65823_1024x1024.png)



](https://substackcdn.com/image/fetch/$s_!t1Rp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8c6b70ed-9ccf-4d5c-a525-552ba1b65823_1024x1024.png)

To a large extent, “does this technology scale?” translates to the question: **“in the limit, can you make enough of a thing at a price that people want it?”** With that in mind, clearly scalability means something very different for different technologies. There are fewer requirements on a scalable drug manufacturing process than a commodity chemical manufacturing process both because consumers are willing to pay far more for drugs and you need far smaller volumes of drugs for them to be effective. Cancer drugs can cost ~$10,000 for a ~100mg dose; ammonia costs less than $1000 for a metric ton which can fertilize ~10 acres of corn.

You might notice that the term “manufacturing process” snuck into the previous paragraph. Talking about scaling inevitably involves talking about *how* you make something. Scalability is a property of the process of making the thing more than the thing itself. Asking whether aluminum, the material, can scale is meaningless — if you’re making it via a chemical reaction like the [Wöhler process](https://en.wikipedia.org/wiki/W%C3%B6hler_process), scaling is a very different proposition from doing it through electrolysis. The chemical reaction involves expensive chemicals, batch processing, and creates an impure product that still needs a lot of refinement. Aluminum electrolysis, on the other hand, is a continuous process that produces a relatively pure output whose cost is mostly determined by the price of electricity. (Of course, there are ways to design a technology that make its manufacturing process more or less scalable.)

There’s a narrow definition of scaling that asks **“what happens to the unit price of a thing when you make more of it?”** That is, what happens to the cost per kilogram, cubic meter, or widget, as you make orders of magnitude more mass, volume, or numbers of widgets. A perfectly scalable process adds no *marginal cost* for each additional unit of product you create. In this ideal situation, your production cost is just the upfront cost divided by the number of units you produce; so, as the number of units you produce approaches infinity, the cost per unit approaches zero. Software distributed over the internet is the closest thing to this ideal scaling situation — one of the reasons why it’s such a good business.

But in reality, even software isn’t perfectly scalable: servers, customer support, sales, and fixing problems that only occur at scale all mean that each additional unit isn’t costless. Anything made out of atoms is even less ideal. At a bare minimum, you need to buy more raw inputs for each additional unit. Most physical processes run into physical limits at a certain size, wear out equipment, and need entirely different processes from the one used to make a prototype to make a product cost-effectively.

The narrow scaling question can partially be answered by *scaling laws* — both straightforward and heuristic — but always involve many assumptions as well. Some scaling laws are straightforward: for a volumetric process like mixing two substances, the amount of a material you can make in a reactor scales like the reactor’s volume, while the amount of steel needed to build the reactor itself scales like the reactor’s surface area, so the fixed costs per amount produced decrease as you increase the size of the reactors. Some scaling laws are heuristic: the price per unit of a thing tends to decrease as you make more units of a thing just through small tweaks and refinements to the process. (See: [Wright’s Law](https://en.wikipedia.org/wiki/Experience_curve_effects#Wright's_law_and_the_discovery_of_the_learning_curve_effect)). Unfortunately, scaling laws are rarely precise enough to predict exactly what the cost per unit will be at any given scale both because there are always going to be tons of assumptions baked in and the world is very messy.

There are uncountably many reasons why the unit price of a technology is hard to predict as you make more units: maybe a process scales volumetrically up to a certain volume but then runs into problems because of temperature gradients or nutrient flow that only come into play at large volumes; maybe the process is bottlenecked by one step that can’t be automated; maybe investment to marginally decrease costs isn’t worth it to a company that has a monopoly on the process. This unpredictability is why I prefer more pragmatic questions like: “**is it possible to make enough of a thing at a price people will pay for it? What will it take to make that happen?**” — nothing else really matters.

Sometimes, a process can scale not by decreasing the cost of the output, but by figuring out ways to sell byproducts. Oil refining is the classic example here — in addition to the valuable jet fuel and gasoline, larger hydrocarbons are sold for everything from plastic to asphalt.

Another way to build intuition for what it means for a technology to scale is to unpack different scaling failure modes. There are two ways that a process can fail to scale:

1.  It can have a “hard” cap imposed by some external bottleneck.
    
2.  It can have a “soft” cap created by a too-high price at the volumes necessary for a product to be useful.
    

#### Hard-cap scaling failure

Some processes have hard limits imposed by an external bottleneck.

This bottleneck could be on the capital infrastructure that you need to scale up the process, like some specialized piece of equipment that is only produced at a certain rate (because of its own scaling constraints). If you need the largest metal tanks in the world to take advantage of scaling laws, but those tanks are made by only one company that can only make two of them per year, you’re forced to either use smaller tanks or only increase production slowly — either way it will involve higher prices and lower volumes than if you could instantly summon large tanks.

A bottleneck could also be on an input to the process: maybe it requires some rare material or subcomponent. Fritz Haber (of the [Haber-Bosch process](https://en.wikipedia.org/wiki/Haber_process)) originally used osmium as a catalyst to fix nitrogen from air. Unfortunately, osmium was rare enough in the 1910s that, despite BASF buying literally the world’s supply, they would not have been able to make ammonia cost-effectively. If Carl Bosch and Alwin Mittasch hadn’t discovered a catalyst made out of much more common elements (iron, aluminum oxide, and potassium oxide, if you’re wondering), the Haber-Bosch process would have never scaled. Many processes are not so lucky.

#### Soft-cap scaling failure

Most scaling failures aren’t hard limits imposed by external constraints, but instead situations where making enough of something to be useful would cost more than its consumers are willing to pay for it.

To talk about cost-related scalability, we need to unpack what goes into the cost of a process: *capital expenses* and *operational expenses*.

Operational expenses (opex in the jargon) are recurring costs that need to be paid every time you run the process: things like raw inputs, labor, or waste disposal. Obviously, if the operational expenses are too high, the process will never be cost-effective no matter how much of a product you make. If a process has a high opex, no amount of volume will reduce the unit price of the product. It is possible that incremental improvements over time will reduce opex, but it’s a risky proposition to wave your hands and say “Wright’s Law will fix it” without clear evidence. The main way to reduce opex is making big changes to the process or product in a way that reduces opex — figuring out these changes is a big part of what goes into scaling a process!

Capital expenses (capex in the jargon) are the one-time costs to set up a process: things like equipment, factory real estate, and infrastructure. Capex factors into the price of a process through *amortization*: companies pay off one-time expenses over the course of several years, which turns them into another recurring cost. Capital also doesn’t last forever — physical equipment breaks or degrades over time. Thus, even if you can operate a process for free, it can still fail to scale if the capex is too high. (This is why robotic automation is not a no-brainer. As of 2025, most robots are still relatively expensive and involve a lot of upfront cost to install.) Unlike opex, capex cannot ramp up and down with the amount of product you’re making, so processes with high capex need to be operating as close to continuously as possible to lower the ratio of capex/product; some processes fail to scale because they involve a lot of downtime.

So far, we’ve implicitly been assuming that there is no difference between the product of a low-volume process and a high-volume one. This is not always true! There are many situations where defects start appearing as a process scales up, either because of physical constraints like worse mixing, or other reasons like new low-skilled employees not paying as much attention to the process as early employees. Of course, the opposite also happens: small tweaks over time can increase the quality of a product as a process scales up.

#### Aside: Scaling and AI

I’d be remiss if I didn’t touch on scaling in the context of AI because for many people, that’s the main context in which they’ve heard of scaling and it means something different than most other scaling. In AI land, scaling roughly refers to how the quality of the product (how smart the AI is) changes and you scale up the manufacturing process (use more processors to crunch more training data). Unlike most scaling, it’s less about bringing down price, and more about bringing up quality. However, if you squint hard, in the long run the bet is that as you scale up the process of making AI, the price per ‘unit of intelligence’ will indeed come down.

#### Scaling a process can require more research than inventing it

Scaling a new process is not straightforward. While it can require literally nobel-prize-level work like Carl Bosch’s quest to discover a non-osmium catalyst for fixing nitrogen, the work to scale a process is deeply underappreciated. A common attitude is that once someone has created a proof-of-concept or prototype, the hard part is done. The research to scale up a process is usually lumped under “development” and dismissed as “just an engineering (as opposed to science) problem.” In reality, scaling a process can require harder work and more research than inventing it in the first place.

The process to produce a few grams of a substance or a single prototype will never suffice to make thousands of tons or millions of units economically. In order to scale the process needs to change dramatically, sometimes to the extent that it has effectively been reinvented from the ground up. These changes depend heavily on the domain: sometimes the change is going from a batch process to a continuous one, which can require creating new machines and figuring out new process parameters; sometimes it is automating a process which can require swapping out entire steps that previously required messing around with fiddly bits by hand; sometimes it’s swapping out catalysts or components that are rare or expensive; sometimes it’s switching how a material is formed — from milling a metal to casting it, perhaps. None of these changes are straightforward. All of them require creativity, trial and error, dealing with unexpected problems, and running into corner cases. Most importantly, for many processes *it is not a given that the scaling work will be successful*, especially within a fixed time and budget: that is the definition of research.

The research to scale a process usually requires a lot of capital, equipment, and material, making it harder and more expensive to iterate than lab scale work. You can’t just throw grad students at a problem or (metaphorically or literally) patch things together with duct tape. The timeframes extend dramatically—what worked in minutes or hours in a lab might need weeks or months at scale, introducing variables like material degradation, contamination risks, and equipment wear that weren't relevant at smaller scales. Economic constraints become far more stringent, as capital costs and operational inefficiencies that were negligible in research settings become make-or-break factors for the technology to be actually useful. Regulatory compliance and safety considerations compound exponentially with scale, often necessitating entirely new validation procedures and control systems. All these factors add up to create work that is often harder than creating the initial prototype or test-tube proof-of-concept.

### Demystifying Scaling

There’s only so much you can say about scaling in the abstract. The work to scale different technologies looks very different — scaling a process to make consumer electronics is a totally different beast from scaling a process to make commodity chemicals. I’m hoping to do further installments of this mini-series that are deep dives into what scaling different kinds of outputs with experts in those domains. The domains I’m currently considering are:

-   Manufactured materials
    
-   Chemicals
    
-   Pharmaceuticals
    
-   Manufactured goods
    
-   Electronics
    
-   Raw Materials
    
-   Software
    
-   (And of course) AI
    

Let us know what you think and if there’s anybody in particular you want to hear from!

*Thanks to Austin Vernon and Jessica Alföldi for reading drafts of this piece.*