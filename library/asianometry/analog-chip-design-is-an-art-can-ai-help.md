---
title: "Analog Chip Design is an Art. Can AI Help?"
author: "Jon Y"
publication: "Asianometry"
publication_slug: "asianometry"
published_at: "2024-02-12T10:01:46.000Z"
source_url: "https://www.asianometry.com/p/analog-chip-design-is-an-art-can"
word_count: 2576
estimated_read_time: 13
---

Here’s the video:

*I want to call out a Substack written by a friend. Tanj boasts a monstrous boatload of knowledge about semiconductor manufacturing - particularly in memory. He recently started his new Substack and I want you all to go subscribe to it. Like now.*

[![](https://substackcdn.com/image/fetch/$s_!m7tX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8fe28ae6-45cf-4cd8-a55c-ec195164ff97_1280x1280.png)Poratbo

Exploration of new ideas in technology and science of the small. "Plenty of room at the bottom" - Feynmann, Caltech, 1959

By Tanj

](https://tanjb.substack.com?utm_source=substack&utm_campaign=publication_embed&utm_medium=web)

*This below post on FinFETs is extremely informative and I loved it.*

[

![](https://substackcdn.com/image/fetch/$s_!m7tX!,w_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8fe28ae6-45cf-4cd8-a55c-ec195164ff97_1280x1280.png)Poratbo

Pipe.3: The Chip Base and the Basics

In the last post the scope of the cell library was described. It will be for static logic design, with around 30 of the most useful and optimizable logic building blocks, including some of the circuits for clocking and latches, and the largets cells will be full adders. Now we get started…

Read more

2 years ago · 2 likes · Tanj

](https://tanjb.substack.com/p/pipe3-the-base-and-the-basics?utm_source=substack&utm_campaign=post_embed&utm_medium=web)

\---

Almost every integrated circuit will have an analog component. That component is often pretty small. Sometimes as little as 3% of the total thing.

Yet this tiny little piece of analog circuitry regularly takes up over half of the integrated circuit's total design cost.

That is because analog chip design is a goshdarn art. Hand-drawn by a chip-Michelangelo staring up at the ceiling night after night.

And if there is one thing we all know, it is that computers can't do art like artists can ... right? In this video, we are going to talk about the art of analog circuit design and AI’s potential to help.

## Beginnings

The digital world is made up of 1s and 0s.

But the real world is analog.

Transistors are well suited for digital signals. They either open the floodgates and let the current saturate: 1. Or they shut the gate and let nothing through - 0.

Analog signals aren't like that. They are continuous - a waveform where each value in the signal is not abruptly different from the previous or the next value.

Common analog signals include those for sound, temperature, pressure, and electrical voltage. These things come from the real world.

Digital on the other hand is all about numbers - a concept that humans made up.

## Analog Systems

Analog electronics take in these analog signals and do things to them in order to create a desired output.

Every integrated circuit or system-on-chip has an analog component. Information from a sensor or a transducer might first enter the circuit as an analog signal.

Transducers are devices that convert one form of energy into another - things like microphones. Other analog inputs include button press-down actions or clock timing signals - think a vibrating quartz crystal.

The analog circuit then accepts the input signal and manipulates it. That can mean filtering, counting, adding, or subtracting. If necessary, we might convert the signal from analog to digital or vice versa.

Once the work is done, the system's output signal is sent to where it can interact with the real world again using another device like a display or another type transducer.

The recent trend has been to digitize all the things and that has yielded real benefits. For instance, digital audio signal processing for noise cancelling features in hearing aids.

But some functions will always be analog - if only at the borders between digital and the real world. You hear me, you digital dweebs? Y'all ain't ever killing off analog!!

## Designing

Before we talk analog chip design, I want to briefly go over how we design semiconductors in both the digital and analog worlds.

I recommend watching some of the other videos I did on semiconductor design. But I am going to hit the main beats just so that we are all on an even footing.

First, you meet with the customer and decide their specifications. You translate these specifications into sub-systems and components.

Next up, we have a circuit designer choose the right circuits, their sizes, and their interconnections to fulfill the specifications.

Once that is done, we then do the physical design layouts. We need to figure out where to put these circuit devices and lay out the interconnections between them.

After that, we verify the whole design to make sure it meets all the foundry's manufacturing specifications.

The foundry provides design rules to you that you cannot violate.

Then we ship. A circuit design - just like a video for this channel - is never really done. We just tear ourselves away from it and ship it so that we can move on to the next one.

## Digital Versus Analog Design

So why is this design thing so hard for analog? Digital and analog chip designers both complain that their jobs are hard.

They are both right, of course. The jobs are hard. digital designers have to deal with the interactions of billions of transistors - and all their tradeoffs.

But analog chip design is harder in a different way. In digital designs, every transistor is roughly the same size. The challenge is dealing with how they interact with one another.

Analog designs have far fewer devices in them - tens and hundreds rather than billions - but each of those devices can have different physical sizes and electrical properties. And those circuits are highly sensitive to their surroundings - neighboring circuits, the environment, and so on.

## Parasitic Extraction

Doing a physical design layout is particularly nasty. You need to run the layout through a simulator to perform a process known as "parasitic extraction".

Which sounds like something you do to a tapeworm, I know, but hear me out.

Every analog design’s components and connections bring some amount of parasitic elements. These elements can take various forms but the two major ones are parasitic resistance and capacitance.

Parasitic resistance refers to reductions in the electric current as it flows through a device or an interconnect. Both those things are made from real world materials, and all real world materials have some amount of resistance.

Parasitic capacitance on the other hand refers to unwanted storage of an electrical charge that exists simply because two components or interconnects in the circuit are close together.

This exists because an integrated circuit is made up of conducting layers - the metal interconnects or the metal silicon substrate - and insulating layers - silicon dioxide.

When you put an insulating layer in between two conducting layers ... well, gee. That kind of looks like a capacitor - an unwanted capacitor.

Parasitic resistance and capacitance are like taxes - unavoidable but very much unwanted. They delay the speed of the signals, consume more power than you wish, and degrade the circuit's overall performance.

When we do parasitic extraction, we are trying to calculate how much parasitic resistances and capacitances the whole circuit has. This means modeling the electromagnetic effects of all the various devices and wires in said circuit.

This is complicated and computationally intensive. Capacitance is particularly nasty. Imagine all the many devices and the multitude more interconnects on the chip.

## Knowledge Intensive

This all makes analog design an evolutionary, effort-intensive, knowledge-intensive process that starts from the top down.

When preparing his netlist, the designer manually calculates the variables for things like the size of the devices.

Then he runs it through a basic analog circuit simulator - the 50-year old SPICE program is still widely used - to predict how the circuit performs in silicon. Not good enough? Back to manual calculations.

When done, he passes it to a physical design engineer who does the layout, calculates the parasitic effects, and checks the layout against the foundry's design check rules.

Once he is done with the layout, he needs to pass it back to the circuit designer so he can recheck whether the design still achieves its stated goals.

This happens over multiple cycles and for each of the analog blocks and sub-blocks in the whole circuit. Even the smallest specification change in either the layout or the circuit netlist requires a full review.

This process is long and arduous with as much backtracking as the first Halo game. Compare that to digital chip design, which can be highly regimented with multiple teams sequentially handling the design process through each stage.

The wide variety of schematics, the number of conflicting requirements, the many parasitic elements and the higher order effects between all these devices/interconnects. That all matters. Design is all about optimizing for certain variables within a space.

And in analog design, that space is galaxy-sized. Without straightforward, reliable heuristics to fall back on, analog and mixed signal designers rely on experience and knowledge built up over time.

Famed designer Bob Dobkin likens it to learning a language. You start by learning the grammar rules and the dictionary.

And after learning for many years, you finally can read or write documents without having to consult a dictionary or grammar checker all the time. You simply intuit what it means.

It is also why these designers care so much about a design's "aesthetics". Lacking solid benchmarks, the aesthetics of a particular design is an indicator of its correctness.

## Leading Edge

When we think about today's super-sexy 10, 7, and 3 nanometer process nodes, analog does not often come to mind.

Yet the analog problem is often in the minds of today's leading edge system-on-chip designers. Particularly those designing chips for mobiles like iPhones.

Many analog designs struggle to work well with leading edge processes due to these aforementioned parasitic effects. Particularly, parasitic resistance in both the transistors and the interconnects between them.

Parasitic resistance occurs in leading-edge FinFET transistors at two places. First where the current travels up to the 3D fins from the rest of the circuit and vice versa.

And second, the current hits resistance as it passes through the FinFET gate itself. This is in part due to the gate's very thinness. There is just not enough conducting metal for the current to travel through.

A similar effect is behind the parasitic resistance in the metal interconnects. Leading edge interconnects are made from copper surrounded by a barrier layer of tantalum nitride.

As the interconnect shrinks, the tantalum nitride layer stays the same size. So the proportion of low-resistance copper to high-resistance tantalum nitride decreases - increasing the interconnect's total resistance.

For example, cutting the metal pitch from 80 nanometers to 48 nanometers - a 40% reduction - raises the line resistance by 6 times.

Anyway, this long-winded digression is basically to illustrate the importance of analog design at the 7 nanometer level and below. Parasitic resistance levels worsen with every new node and dealing with it goes on top of all the other challenges of analog design just like a cherry on a delicious Black Forest Cake

which I haven’t eaten in such a long time because I am on a diet right now but I am just really badly craving it what with the chocolate shavings and the frosting ... oh wait where was I?

Uh ... so like as I said before, every SOC has to have an analog component and it is becoming a big bottleneck in the design. Automating analog design would be sweet.

## Automate This!

A great deal of digital EDA tools blew up in the 1990s.

And now, digital hardware designers can write high-level specifications in a language like Verilog. The EDA takes that and automatically translates it into circuits.

EDA's success in digital design prompted people to do the same for analog. And we have been trying ever since. These historically targeted individual parts of the design process:

First, circuit sizing or design parameter optimization - the work of picking the value and sizes of the circuits.

The general approach has been to create an overall cost function and then try to solve for it. Usually using something like simulated annealing or genetic algorithms.

Second, laying out the circuits and their interconnects. Procedural layout software does exist - SLAM and ILAC are prominent examples - but they heavily rely on either templates or pre-defined rules. And their outputs still fall far short of what an experienced human can do.

There are a few attempts to create an end-to-end analog design product - like the Berkeley Analog Generator. Designers don't manually draw anything but instead lay out several high-level principles.

So all in all, software packages either need the human designer still in the loop. Or, they impose a great deal of constraints solely to cut down on the number of possibilities and make the computational task easier.

People in the industry haven't warmed up to these tools yet, preferring to do it largely by hand to get maximum control. This and the overall smaller size of the analog semiconductor industry has meant that analog EDA tools remain niche.

## Machine Learning

Go used to be a game said to have too many possibilities for traditional computers to work out.

Powerful machine learning models trained on huge datasets helped computers gain the intuition to conquer Go. Now what about analog chip design?

In recent years, academics have explored the use of neural networks to help place the devices in an analog circuit. You show it a whole lot of human-done layouts and train the model on them.

There are a number of AI startups working on this problem. I recently had the chance to speak to one such team out of Toronto - [Astrus.ai](https://www.astrus.ai/). They are trying to use a game-playing AI kind of like those behind AlphaGo to play the "game" of analog layout.

There are a few other open source solutions. Recently, there is ALIGN - which stands Analog Layout, Intelligently Generated from Netlists. It uses a combination of imposed constraints and machine learning models to route and place devices in 24 hours without a human in the loop.

Another notable one is MAGICAL, an open source, fully automated analog and mixed signal layout system. It uses gradient descent - an optimization algorithm for training machine learning models - to iteratively place the devices and wires.

There are two big issues with these open source solutions, however. First, the design needs to go to the foundry. The foundry has a set of design rules as part of a Process Design Kit, and that PDK tends to be proprietary. That doesn’t jive with open source.

Second, the models needed to do industrial-sized analog designs have to be quite large. This means having to spend a fair sum of money on GPU training time and good data sets. Open source might have troubles getting these.

## Conclusion

The complexity of analog chip design helped put food on my family's table. My father was a chip designer. For whatever reason, he fell into designing analog chips.

A long time ago, he told me - without explanation - that analog chip design never got automated. And because of that he was lucky, because a lot of designers in other parts of the industry lost their jobs.

It also explains why he so rarely used a computer while he worked - sitting there in his home office with some paper, a ruler, and a pencil.

I am glad to have been able to do this video and more deeply learn the nuances of what he meant back then.

I wonder if these new machine learning techniques can ever conquer the analog layout problem. Good luck to everyone trying it. But in some little way, I hope it won't happen. Because analog is the real world. And its design is an art.