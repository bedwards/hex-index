---
title: "Humanoid Robots in Manufacturing"
author: "Ben Reinhardt"
publication: ""
publication_slug: "blog"
published_at: "2025-04-08T14:24:49.000Z"
source_url: "https://blog.spec.tech/p/humanoid-robots-in-manufacturing"
word_count: 2719
estimated_read_time: 14
---

Humanoid robots are having a moment. Companies like Unitree Robotics, Figure, Tesla, Boston Dynamics, and many others are putting out awesome videos of robots doing everything from [backflips](https://www.youtube.com/watch?v=FByY3tSx2Ak) to [kip ups](https://www.youtube.com/watch?v=Nkh6RUocD8c). First, let’s put aside the fact that we have seen awesome humanoid robot demo videos for [almost a decade](https://www.youtube.com/watch?v=rVlhMGQgDkY&t=29s) without many humanoid robots out in the world and [we should be default skeptical of robots operated by the people who built them](https://s3-us-west-1.amazonaws.com/zaaron-personal/Inktober/demo_literacy.jpg). But, let’s assume that this time is different and functional humanoid robots are right around the corner. In this scenario, many people have pointed at manufacturing as the place they will first revolutionize. I wanted to dig in and see whether that’s feasible.

I want to caveat up front that **this analysis is only about humanoid robots in manufacturing**. There are many situations where you’re neither optimizing for efficiency nor able to reconfigure environments easily where humanoid robots might have a big impact: these are your janitors, housekeepers, and gardeners. Those environments are incredibly unstructured, so people often point to manufacturing, which involves more repetitive work and structured environments, as the first useful application for humanoid robots.

When people imagine humanoid robots, they’re usually assuming that they can do basically anything a person can do. While I do want to flag how hard that will be to achieve, I think the more interesting question is “in a world where AI is good enough to enable human-parity humanoid robots, what *other* manufacturing paradigms would be unlocked? How do they compare to just dropping humanoid robots where we have people right now?”

We could break these big questions down into three, slightly more tractable, ones:

1.  What does it take for a humanoid robot to be at cost parity with a person?
    
2.  What role do people actually do in the manufacturing process? What will automating that do to the speed and price of manufactured goods?
    
3.  How do humanoid robots compare to other, more specialized forms of automation?
    

This piece does a rough numerical analysis on cost and then some more qualitative analysis on the latter two questions.

**Spoiler alert:** My hypothesis is that in a world where there is good enough software and hardware to create humanoid robots that are as good and flexible as a human *at manufacturing tasks*, we will *also* be able to quickly create more task-specific hardware or use less complex hardware that can do those roles cheaper, faster, and better.

[

![](https://substackcdn.com/image/fetch/$s_!yttJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6661c7e-6d7c-4d6f-9db8-d8efd1702910_800x800.png)



](https://substackcdn.com/image/fetch/$s_!yttJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6661c7e-6d7c-4d6f-9db8-d8efd1702910_800x800.png)

### Cost

One can evaluate a manufacturing process on a few axes:

-   How cheap can you make a thing?
    
-   How high-quality is a thing?
    
-   How quickly can you spin up the ability to make a new thing/adjust how you make an existing thing?
    

The costs that go into a manufacturing system can be broken down into upfront costs and ongoing costs. Upfront costs include hardware/capital, system design, and programming robots or training people. Ongoing costs include maintenance on machines, salary for people, associated operational costs like light and heating for humans, electricity for robots, etc.

In the limit, you would be able to instantly spin up a manufacturing process that made high-quality widgets for the price of the raw inputs. In reality, there are tradeoffs: we all know that you can often make a thing cheaper by reducing the quality; making an automated system to rapidly spit out widgets can drive down the cost per widget but it often requires a ton of setup time and cost to get the tooling right.

Let’s look at (extreme back of the envelope) costs for three different systems:

1.  Humans
    
2.  Humanoid Robots
    
3.  Specialized Manufacturing Equipment
    

I’m going to talk about top-level costs, what factors drive them, and the assumptions that go into them. [You can see a much more detailed spreadsheet of the numbers I used here](https://docs.google.com/spreadsheets/d/1bcIQTSFDNz7KUbIFAfG_jf_7F5u2MduMIPYwBPyOu44/edit?usp=sharing). If you think I am massively wrong on any of these, please let me know!

### Costs — Humans, Humanoids, Specialized Machines

**Human labor costs anywhere between $20k/year (this would be your developing world sweatshop) and $200k/year for skilled American labor.** While there are costs associated with tooling and system design, the vast majority of human labor costs are salaries.

**Humanoid robot labor costs somewhere between ~$60k/year and ~$13k/year.** These numbers involve a metric fuckton of assumptions, considering there are no existent general purpose humanoid robots in use in factories.

The first assumption is around the cost of hardware. The high number is $150k, which is the cost of Unitree’s top-of-the line unit *without hands or grippers*. Even that price assumes costs come down because grippers or hands can often be half the cost of a traditional robot arm installation. A hand that has all the dexterity of a human hand costs ~$100k on its own right now. While you don’t need a hand with all the joints and dexterity of a human hand to do most manufacturing tasks, there is a big difference between being able to be a drop-in replacement for literally all human tasks and a finite set of them that you can do with a simplified gripper. Another way to get this higher humanoid price is to note that an actually-existant commercial robot arm costs ~$30k and at bare minimum a humanoid robot is approximately four robot arms and a ton of sensors in a trenchcoat.  
  
The low number for hardware is $16k. This is the sticker cost of Unitree’s cheapest humanoid (also without hands). Currently, the $16k model is basically a toy, but there is potentially a world where economies of scale and learning curves could drive the cost of a functional humanoid this low. (Personally, I’m skeptical.)

I’m also assuming that it is more expensive to program a humanoid robot than it is to train a person, but not absurdly so. This assumption does mean we’re not yet living in a world where robotic ~intelligence is completely at parity with humans. However, if you think that’s going to happen soon, the analysis doesn’t hinge too heavily on training cost.

All mechanical systems require maintenance and break down. The numbers for humanoid robots around maintenance costs and lifetimes are also based on the approximation of humanoid robots as four robot arms in a trench coat. An interesting cost driver here is that the standard accounting lifetime of robot arms is five years, which is closer to electronics than the 15-year lifetime of heavy machinery.

**Specialized machines cost ~$70k/year**. Most of this cost is driven by the tooling/hardware cost, which is *extremely* variable based on the actual machinery. What’s notable is that the cost of hardware is roughly order-of-magnitude the same as a humanoid robot.

### Labor Costs Per Widget

The cost of labor only matters insofar as it affects the cost of making a widget. One of the advantages of robots and machines over humans is that they don’t need breaks or sleep, so while they might be more expensive, they can work 24 hours a day... ish.

All mechanical systems need regular maintenance and also break down unexpectedly. Planned downtime is often ~10% of total potential working time, with failure rates accounting for another 2.5% of theoretical potential uptime. Maintenance and mechanical failures is one way in which robots are very different from computers! Of course, even with downtime, machines can work many more hours per day than a human.

Another big factor in the labor cost per widget is just how fast a system can produce a widget. Here is where humanoid robots fall behind specialized machines: humanoids produce things at the same speed as a human, while a specialized system can move many times faster on almost any given task. Many videos of automated assembly lines need to be slowed down to make it not just a blur. The analysis assumed a modest 5x speed increase for a specialized system over a human or humanoid.

Given working hours, downtime, failure rates, and speed assumptions, the labor going into human-made widgets costs **$0.48** per widget on the low end and **$4.31** on the high end, humanoid labor cost **$0.54** per widget on the high end and **$0.12 o**n the low end, specialized-machine labor cost **$0.13** per widgets. (Obviously, all these numbers are far more precise than reality.) So, humanoid-made widgets are somewhere between the cheapest human-made widgets and specialized-machine-made widgets.

These numbers are all based on the assumption that specialized machines effectively stay the same. We’re comparing an actually-existing technology to a hypothetical one. In reality, I would bet that the same capability increases that enable functional humanoids will also improve specialized machines. If you only assume that the costs of system design and programming for specialized machines drop as much as they do between expensive humanoids and cheap ones, the cost of specialized-machine-made widgets drop to **$0.07 per widget**, almost half of those produced by cheap humanoids.

### Labor as a fraction of total cost

So far we’ve been ignoring the fact that labor is only one input to the total cost to manufacture something. Usually the other biggest cost driver is the cost of the raw materials, but yield rates (how often there’s a defect), depreciation on the factory, energy, quality assurance, and a long tail of other factors also contribute to the final cost. Here are the labor fractions of the cost of some common items, just to get a sense of the labor fraction of the cost of manufacturing:

-   Car: 7%
    
-   Airplane: 30%
    
-   Toaster: 50%
    
-   Electric Motor: 50%
    

So there is actually a lot of room to decrease costs by automating labor — generally these are products that require a lot of fiddly final assembly.

## Qualitative Arguments

At this point, you probably have a lot of objections to this extremely-assumption-laden analysis.

**If a process could have been automated by a specialized system, someone would have done it by now, therefore we need humanoids to automate the rest.** This is true, assuming a fixed level of technology in specialized systems. However, in a world where humanoid robotics are good enough to tackle most currently-not-automated tasks, we will have big advances in control, perception, and planning that will not be humanoid-robot specific. Those advances will make many more situations automatable by specialized systems that will be faster and more reliable than humanoid robots.

**The real advantage of humanoid robots is not on cost, but setup speed: they make it so you don’t have to make or buy specialized equipment so you can retool very quickly.** There are many processes that one could automate today with existing technology, but it’s not worth it because there’s not enough demand for a huge volume over many years. (We could shoehorn that into the price calculation above as a much shorter depreciation time, which would indeed drastically increase the price of the specialized system.) However, a world where humanoid robots are both smart and capable enough to be easily “reassigned” to a new task is one where we’ve had massive advances in computers’ ability to understand manufacturing processes, manipulation, planning, etc. These advances would open a whole host of harder-to-imagine, but likely better, options than humanoid robots.

One possibility is that these advanced capabilities could make designing, building, and modifying specialized systems dramatically faster and cheaper.

Another possibility is that advanced capabilities could enable simpler robots to do the job just as well. The vast majority of tasks don’t need a full-on humanoid. Instead, many tasks could be done by something like a single robot arm on a wheeled base. Or two hands on sticks. Or itty bitty spider robots. In a world with the robotic capabilities for a humanoid to be as good as a person, it’s extremely likely we would have the capabilities to have all of these form factors and dispatch them appropriately, which would be cheaper, faster, and less prone to failure. It’s just harder to imagine than drop-in replacements for people.  
  
The reason simpler robots are cheaper and less prone to failure has a lot to do with the sheer complexity of humanoid robots. Humanoid robots with dextrous hands have roughly 70 “degrees of freedom.” Degrees of freedom (DoF in the lingo) are “ways a robot can move” — so one joint that can move in only one way (like an elbow) has one DoF, a joint that can move in three dimensions (roll, pitch, yaw, like a shoulder)[1](#footnote-1) has three DoF, etc. Each DoF adds additional complexity, cost, and ways for the robot to fail; in many robots, each DoF has a motor controlling it and each of those motors add costs and potential independent failure modes. The probability that a system composed of multiple independent failure points is

which means that each additional failure point has a pretty significant effect on the entire system’s failure probability. The upshot of all of this is that you really want to minimize the number of DoFs you’re using.

**Humanoid robots will be like microprocessors: a general purpose tool that is so much cheaper and easier to use than its specialized counterpart that most people use it, despite not being optimal.** In the world of microprocessors, you can create a custom chip that can do almost any specific computing task better than a general-purpose chip. However, there are only a few applications where the time and cost to create a custom chip is worth it. One could imagine a world where the same is true for robotics. While I can’t rule this out, I think there are some key differences between robots and microprocessors that make this scenario unlikely. The vast majority of the cost of a chip is in the design and initial tape-out, so there are huge economies of scale: you need to make many of that specific chip to make the cost per chip reasonable. On the other hand, a lot of the cost of a robot is in the components – the motors, sensors, and raw material. These components are general purpose – as you drive down the cost of the motors for a humanoid robot, you also drive down the cost of other robots that also use motors.

Humanoid robots being general-purpose and easy-to-train at all assumes that we have much better robotic software. (I realize I sound like a broken record at this point.) It’s likely that the same software that makes humanoid robots work would also make non-humanoid robots work. It would also be a strange world where we have software that enables humanoid robots to easily do most work but we don’t have software that can help design better specialized systems, or teams of specialized robots.

If it’s just as cheap and easy to use the specialized tool as a general-purpose tool, you’ll use the specialized tool. My hard-to-verify assertion is that the same capabilities that will make general-purpose humanoids cheap and easy will *also* make more specialized systems cheap and easy, unlike microprocessors and custom ASICs.

**The point of humanoids are as drop-in replacements for people in an existing manufacturing line.** This is a fair point. So far we’ve been talking about creating new processes, not just replacing humans in existing processes. There are several awkward things there: it will take some time for humanoid robots to get good enough to be drop-in replacement, and by then many systems will have been overhauled. Overhauled systems will increasingly be built around actually-existing automation, which will not be humanoids. It will be a sad state of affairs if we keep everything the same.

### Conclusion

General-purpose humanoid robots will be useful for many things, especially in environments that are primarily populated by people. However, manufacturing is not one of those environments. **Most people think about the difference between humanoid robots and other robots along two axes: (1) morphology and (2) intelligence. People tend to assume that the two axes are coupled, but that isn't true.** Assuming that AI breakthroughs spill over to robotics, we can make larger gains applying vastly improved automation algorithms to “classical” robot arms, specialized robots, or designing and building custom robots themselves.

In high-volume situations, it already makes sense to build specialized tools that can produce widgets far faster than humanoids. The same technology that we need to make useful humanoids will drive down the volume that makes sense for specialized machines. As the gap between human and robotic capabilities closes in low volume situations, the same software and hardware that will enable useful humanoid robots will also enable cheaper, more robust, and faster automated systems that are just harder to imagine right now.

*Thanks to Brian Potter and Matt K for reading through drafts of this piece.*

[1](#footnote-anchor-1)

Yes, engineers, I know this description of degrees of freedom is butchering several technical definitions.