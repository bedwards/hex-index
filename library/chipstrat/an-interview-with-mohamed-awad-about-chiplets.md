---
title: "An Interview With Mohamed Awad About Chiplets"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-10-15T13:21:14.000Z"
source_url: "https://www.chipstrat.com/p/an-interview-with-arm-gm-mohamed"
word_count: 4206
estimated_read_time: 22
---

We’ve been pulling on the chiplet thread, lately exploring why chiplets matter and what it takes to build a thriving ecosystem:

1.  [The Long Arc of Semiconductor Scaling](https://www.chipstrat.com/p/the-long-arc-of-semiconductor-scaling)
    
2.  [Chiplets and the Future of System Design](https://www.chipstrat.com/p/chiplets-and-the-future-of-system)
    
3.  [Building the Chiplet Ecosystem](https://www.chipstrat.com/p/building-the-chiplet-ecosystem)
    

This week at OCP, Arm made an interesting [chiplet announcement](https://newsroom.arm.com/news/arm-sets-the-standard-for-open-converged-ai-data-centers): it’s contributing an **architecture-neutral, vendor-agnostic chiplet spec** called the Foundation Chiplet System Architecture to the Open Compute Project.

To unpack the story behind this, I spoke with [Mohamed Awad](https://www.linkedin.com/in/moawad/), GM of Arm’s Infrastructure Business. Our 25-minute conversation covers:

-   How Arm fits into power-constrained AI datacenters
    
-   The state of chiplets beyond vertically integrated designs
    
-   Why Arm first created its own chiplet specification
    
-   What led to the architecture-neutral Foundation specification
    
-   What the Foundation specification defines versus what it leaves open
    
-   Why Arm contributed the Foundation spec to the Open Compute Project (OCP)
    

Keep reading for the lightly edited transcript. Or for you 1.5x junkies, watch / listen below:

## An Interview with Arm’s Mohamed Awad

**So Mohamed, let’s start with you. I want to get to your current role, but first, can you share a bit about your background? I saw that you’ve been on the Arduino board, you spent time at Broadcom and you even worked on Zigbee at Ember. So a great mix of compute, connectivity, system design. Tell us more.**

MA: Thanks Austin. Great to be chatting with you. I started as a software engineer. I had this concentration in data communication. So I always loved it. For a couple years I worked at those old infrastructure companies – Lucent, Nortel – and did some of that.

I went on to work at a little startup that was working on mesh networking because I thought wireless was cool. This was back in the early 2000s and that took me to Europe for a while and then eventually took me to Broadcom where I got to do all sorts of fun stuff, everything from Bluetooth and Wi-Fi through to GPS and I even started a custom ASIC business there which went on to build custom ASICs for the likes of Apple.

In 2018 I joined Arm, I went back to my infrastructure roots and have gotten into the compute side of things in a big way. It was a great time to join. Obviously Arm has been on a quick trajectory since 2018 within infrastructure and excited to have played my little part in it.

**Nice. So you have a full stack background from software to networking all the way down to custom ASICs and hardware.**

MA: That’s right. A jack of all trades. Not an expert in anything, but dangerous enough in a lot of different areas.

**Today, the big picture is AI. And very curious to hear your perspective from where you sit at Arm on AI data centers. Obviously those are really driving today’s compute needs. And nowadays we’re not talking about FLOPs or about chips, but really about gigawatts of deployed power.**

**So all the conversation is about how much can you get out of this gigawatt of power? So curious how you see Arm approaching this shift, this macro trend shift as power efficiency and rack scale integration are key constraints.**

MA: Yeah, it’s really interesting question, right? Because, and you hit the nail on the head when you said it’s not about the amount of compute, because really the amount of compute needed is just unfathomable, right? I mean, it is impossible to quench the amount of compute that’s needed for the aspirations that the world has around AI right now.

And then the other thing that’s happening is you’ve got a lot of dollars flowing into AI.

And so ultimately, if you look at what the constraint is, it actually is power. It’s about like, hey, how do we cram as much compute as possible within the allotted power envelopes that we have available? Because you just can’t build it fast enough. And people are talking about nuclear power plants and putting data centers in space and underwater, and it’s just all about managing that power constraint.

For Arm specifically, I think it’s been a real tailwind for us in our Neoverse products and our infrastructure aspirations. And a lot of that is because when you’re in a situation where the technical requirements exceed what is possible with off the shelf technology, people turn to optimization across the entire stack. So that means optimization of the networking and optimization to the workload and optimization really all the way down to the silicon level.

I mean, when data centers started, everyone knows the Google story where it was a bunch of off the shelf components in a Stanford dorm room. And that’s how the first data centers started. Well today, whether it’s Microsoft or Google or Nvidia or AWS, they’re building full on racks and alongside that they’re building custom networking and custom CPUs and custom accelerators, and they’re all optimized for the workload, optimized to eliminate the affects of Ahmdahl’s law, optimized to get as much per Watt as possible out of that box because they are power constrained.

In that environment, being a company like Arm, where we provide lots of different points at which people can integrate—whether that’s IP or compute subsystems, or even off the shelf CPUs from partners like Nvidia and Ampere and others—really what we do is we allow these consumers of compute, whether they’re building a networking chip or a CPU or an accelerator, to come to us and take bits and pieces and enable that and help accelerate all of that investment. And that’s been a fantastic place to be and we’re continuing to lean into it.

**Gotcha, nice. Yeah, so it sounds like you’re saying that power is the limiting constraint and Arm is there to help customers. When you’re constrained by power, you need to start to optimize for power all the way up and down the stack. And it sounds like you guys are there to help customers at every layer optimize to get highest performance per Watt.**

MA: Yeah, that’s right. And it’s not just Arm, it’s really our whole ecosystem.

I mean, Arm’s a 35 year old company. We were born in a turkey barn in Cambridge. And that first product was building a [custom SoC for the Apple Newton](https://www.acquired.fm/episodes/how-arm-became-the-worlds-default-chip-architecture-with-arm-ceo-rene-haas). So this is a power constrained device and so this is just a continuation of that legacy where we’ve enabled this ecosystem to go build those types of devices. And this is the next big problem that we’re helping the world to go solve.

**Nice, makes sense. So, okay, I’m really excited today to talk about chiplets. That’s something I’ve been writing about lately and I know Arm is in this space.**

**For our listeners—setting some context—wafer costs in a monolithic design keep rising as the industry is approaching silicon’s physical limits. And we know chiplets are an option; it’s a solution to let designers keep the expensive nodes focused on compute logic and keep everything else—I/O, memory, analog—on older, cheaper processes.**

**Of course, the problem is that only vertically integrated companies historically have been able to pull off chiplets. AMD and Intel—a lot of innovation there and they pulled it off.**

**And so, Mohamed—I’m curious from your vantage point—what has to happen technically and organizationally for a true chiplet ecosystem to exist? One that’s multi-vendor that everyone can participate in regardless of their size and not just an internal multi-die project.**

MA: Yeah, yeah. I think it’s certainly a super, super interesting area and one that we’ve done quite a bit around.

If I take a step back, one of the key offerings from Arm is our [Arm Compute Subsystem](https://www.arm.com/products/compute-subsystems-for-client), which we really brought to the market about two years ago. And around Compute Subsystems are integrated verified IP that we make available to the ecosystem.

So we put those Compute Subsystems out there. And then we created an ecosystem around them of partners; everybody from foundries to IP vendors to ASIC providers, etc. And what we found is that that ecosystem began trying to create chiplets that they could make available to the world based on our compute subsystem. So they just naturally started to do that.

As part of that effort, we stepped in and we started to define aspects of what a standardized Arm-based compute chiplet would look like. And, we’ve had a bunch of partners adopt that. There’s a bunch of chiplets available today based on that. And in fact, just this week we announced that we’re moving that entire effort to standardize some of those chiplet efforts within [OCP](http://opencompute.org/). Because it’s really a broader—this is an industry wide thing, which is really, really critical for us.

Now, I think the idea of an interoperable chiplet marketplace—we’re still quite a ways away from that, right? But what you are seeing today – not only are you seeing as you implied, vertically integrated semiconductor companies reusing chiplets in different products—you’re also starting to see some multi-vendor products emerge.

So you’re seeing these places where a semiconductor company A and semiconductor company B agree to some common parameters between them to create some level of interoperability. And we think that some of that can be standardized across the ecosystem to just make it that much easier. And that’s what the Foundation Chiplet Standard Architecture is all about.

So, what I believe is that in the near term we can standardize aspects of how to debug these things, how they boot, how some of the software lands on them, etc. We don’t have to go define everything, but we can define much of it to make it that much easier.

The fact is that building technology and semiconductors on advanced process nodes today can cost upwards of a billion dollars in some cases to build one of these complicated pieces of silicon. And so when you think about a fully functional AI rack and the amount of custom silicon that exists in that, it’s not just about the dollars, but it’s about the time to market and it’s about the risk. This is a way that we can spread that load across the ecosystem and amortize some of that cost so that you can get to those diverse power optimized solutions that we talked about earlier.

**Amazing. Man, there’s so much insight in there. Let’s unpack that. This is so good. Okay, so interestingly, you’re saying that Arm—you first introduced CSS and Compute Subsystems. And so this was more than just someone licensing IP for a CPU. Now this is, you mentioned pre-validated pieces. Tell me a little bit more about CSS. It’s more than the CPU. It’s like an entire subsystem.**

MA: Yeah, so if you think about what it takes to build a CPU, you obviously need the CPU–the actual processor IP. You might lay down 128 of those or 64 of those or 256 of those, whatever you want for your particular design. Then you need a mesh interconnect to connect all those things up. Then you might need an MMU, and then you might need a bunch of other IPs around that as well.

Well, originally when we started in the infrastructure space, we would actually just hand you a spec and say “You guys can go off and build it.” Then in 2018, we showed up and we said, “You know what, we’re gonna actually go off and build the CPU, build the mesh, build the platform.” ASo we started handing people our [Neoverse IP platform](https://www.arm.com/products/silicon-ip-cpu/neoverse/neoverse-v3). We would hand them the CPU, we’d have the mesh and they would connect it any way they like. And we still do that.

But two years ago, we started with CSS where we actually pre-integrate all those components for them. We pre-validate it. And so now our partners can just take the Compute Subsystem and add, for example, an accelerator. Or they can add whatever custom interface that they want or memory controller that they want, that third party IP or that other IP that they want.

What [Arm Total Design](https://www.arm.com/markets/computing-infrastructure/arm-total-design) did is said, “hey, so we’ve got these pre-integrated IP, why don’t we make that pre-integrated platform available for the ecosystem and invite them to go off and do that pre-integration of that third party IP ahead of time?”

So partners like Synopsys and Cadence pre-integrate their memory controllers or their interface IP. And then, TSMC and Intel and Samsung use those designs as the basis to ensure the performance of their process nodes, for example.

We’ve got ASIC providers who take it through the physical design process so they have a sense as to what they can achieve. So now when a customer comes to us and they’re like, “hey, I’m trying to build an SoC and I want a PCIe Gen6 interface and a memory controller”, we can say, “Great! Here’s the CSS. You can go to this partner, he’s got a pre-integrated interface IP. You go to this partner, he’s got a pre-integrated memory. And by the way, we know this is what it’s gonna look like when it hits the TSMC manufacturing three nanometer flow” So that’s the idea.

**So it sounds like you’re essentially doing more work for the customers so they can focus on however they want to differentiate, or if they’re like an end product builder, they can just focus on building what they need to build. So instead of “hey, here’s a spec” or “here’s a CPU”--- you said, “here’s CSS, so a lot of the components around it”.**

**But even then, I’m sure you saw your customers still had to go do a bunch of work to take it to the rest of the ecosystem. So then with Arm Total Design, you said, “hey, let’s bring the ecosystem together”, ultimately to just make it more turnkey for customers.**

MA: It’s about making it more turnkey, accelerating time to market. It’s about amortizing the cost and the effort and the risk across lots of different designs. If every one of our customers is taking the same CPU core and the same mesh interconnect, the same IP and spending all this effort interconnecting it, why bother, right? Focus on the differentiation.

Now, the interesting thing about Arm is that you can come to us and you can get the discrete IP if you want. You can get the CSS if you want. You can go to Arm Total Design Partners and get a chiplet if you want off the shelf now that uses our [Chiplet System Architecture](https://developer.arm.com/documentation/den0145/latest/). Or you can go get a full on SoC from partners like Nvidia or Ampere or whoever.

So you’ve got this full on ecosystem where as a consumer of compute, you can make this trade-off in terms of how much do I want to invest in terms of opportunity costs, dollars, time, etc versus how much customization I want. That’s going to be different depending on what particular product you’re building.

**AL: It makes sense. You’re giving customers the ability to jump in at different levels of abstraction and get their hands dirty. Or not, depending on just how much optimization they want to do.**

**This isn’t necessarily chiplets yet, but you saw your customers taking CSS and then running off and trying to... not turn it into a monolithic die, actually start to go down that chiplet route.**

MA: Yeah, so what we saw was that, like I said, when Arm Total Design had the foundries, the EDA partners, the IP vendors, and then it had ASIC partners. And what we saw was that a bunch of ASIC partners were like, “Hey, we’re gonna actually just go off and build a chiplet and put it on the shelf so that when customers come to us and say, ‘hey, I’ve got this whiz bang accelerator’, we can get them to market that much faster because we’ve already got a compute chiplet based on Neoverse ready to go”.

So we saw like three, four, five, six different companies doing this at the same time. And we said, “They’re solving a problem on behalf of our ecosystem for us”, which is really the power of the Arm ecosystem when that thing happens, right? And so what we did is we got those companies together and we said, “Hey, why don’t we standardize certain aspects of this? You guys can choose what shoreline you want and how you want the two things to connect. But we can standardize things like how they’re debugged and how interrupts happen and how the software is going to land on them so that you guys can leverage this across the different designs. And when customers come to you, if you partner A has a 64 core design and your partner B has a 32 core design, there’s not this massive friction for them to use one versus the other.”

And that was really how the Foundation Chiplet System Architecture began, which is now donated to OCP.

**Okay, yes, it makes a lot of sense. So the customers saw the value in taking CSS and turning it into chiplets. And then you’re seeing many of them do that. So you try to step in and say, “hey guys, we should have some standards here to make it simpler.”**

**Can you talk a little bit more about the standards?**

MA: If you think about what is needed for a complete chiplet marketplace, this idea that I’m gonna jump online and buy a chiplet and it’s gonna show up and just work. There’s a lot that goes into that, right? You’ve got to agree to what the interface looks like, what the packaging’s gonna look like, what the shoreline is, the actual dimensions of it. And then there’s a bunch of system level things that you’ve got to think about. How devices are debugged, how they’re managed, what the boot sequence is, what the firmware looks like, etc etc.

What was clear is that to the extent that within the context of a particular semiconductor vendor, you could design a level of consistency across SoCs in the way that the device is booted, in the way that interrupts happened, in the way that they were debugged, in the way that they were managed. Once you come to that realization within a single vendor, now all of a sudden you’re like, “There’s no reason why you can’t do that more broadly across multiple vendors.” And I think that’s really what the Foundation Chiplet System Architecture focuses on.

**AL: Gotcha. Yeah, you’re realizing that even for a single vendor, having some standards would help them gen-on-gen, for example. And then at that point, if you could come in as a third party and help align people around it, then it would just benefit the rest of the ecosystem to use the same standards.**

**I know that originally there was the Arm Chiplet System Architecture and now at OCP you announced a vendor-neutral derivative called the Foundation Chiplet System Architecture. Talk to me more about that evolution.**

MA: Yeah, like I said this all started out on Arm Total Designs and was very specific to our CSS at first. And that’s where the focus was. And we’ve got a bunch of partners now that are building based on the Arm Chiplet System Architecture.

But what we realized was that there are going to be times where there may not be any content in that chiplet; for example, like for an I/O chiplet that wants to connect to an Arm based chiplet, or there may be cases where you’ve got an accelerator and an I/O chiplet and there’s no arm content in the system at all. In order for the ecosystem to truly adopt this, it needs to not be a vendor specific thing. I think we came to that realization. And so what we did is we abstracted up a level and we said, “Hey, what are the broad principles associated with what we think the chiplet architecture needs to look like more broadly? Let’s move that work into an organization which is really focused on that.”

And OCP has done a bunch of work on chiplets in the past and so it was a perfect place for it. I’ve recently joined the OCP board and Arm has been committed to OCP for many years. We’ve been a platinum sponsor since 2018, since Neoverse launched. This was a natural place for us to go and engage. So you’ve got the umbrella Foundation Chiplet Systems Architecture, which is now developing further within OCP. And then within that, we’re below that or inheriting from that. We’ve got the Arm Chiplet Standard Architecture, which starts to put some specific things in there, which might be specific to how an Arm chiplet might be built. And we fully welcome and are inviting other architectures to join and create their own similar type specifications, which also inherit from the overarching spec.

**So it feels like a very natural progression of starting with IP, then CSS, then Arm Total Design. Then “Hey, I’m seeing internally in our Arm ecosystem across these vendors, there’s just a lot of similarities in what they’re trying to build. It would grease the skids if we had some standards here.” Then eventually, you’re getting to the point where it’s like, “Hey, wait a minute, this doesn’t have to be Arm-centric. You could abstract it, make it more modular, take it another level higher, and keep a lot of the concepts.” And so you’ve got this higher level Foundational CSA, and that’s part of OCP. And then you’ve got your own Arm flavor of CSA for companies using Arm content. Totally following all that.**

**I guess the skeptic might ask, why take it to that step of making what you’re building work for a system that may not have any Arm content?**

MA: At the end of the day, if you think about the challenges associated with AI and the level of complexity in some of these systems, there’s so much work to be done that the tent is really big enough for lots of participants.

I think this is a great example of advancing the broader narrative around how we get these systems and the silicon in place to support the aspirations. This is going to benefit everybody, Arm included. We feel like our value proposition in the market is really tied to our ability to offer lots of different points for people to come in and integrate on. And so getting hung up on whether or not it should be solely Arm or more broadly available was just not the place where we wanted to focus our attention. We think we’re all much better off having an open—and by the way this is not something that’s new. You’ve seen us do this before with things like [AMBA CHI](https://developer.arm.com/documentation/ihi0050/latest/) and other standards which we’ve effectively made available for the ecosystem.

**Last question there, you’d mentioned that you’re joining the OCP board. So talk to me just a little bit more about that, about participating in OCP and you being on the board.**

MA: Yeah, you know, again Arm’s presence and infrastructure—in 2018, we were aspirationally looking to get more and more involved in infrastructure. Our role has grown over time within the infrastructure ecosystem. We actually just celebrated our billionth Neoverse core that was shipped into infrastructure. We expect 50% of cloud service provider CPUs that are shipped this year to be Arm-based. AWS talks about 50% of their CPUs in the last two years have already been Arm-based. All the major cloud service providers are building Arm-based CPUs. That’s not to mention all the Arm content and all the network and storage and all the other gear that’s out there. So in that world, it was natural for us to participate in something like OCP where a lot of these standards and decisions are being made and more broadly, there is this desire to advance the state of the art. The world is building more and more integrated systems and that’s really at the heart of what Arm does and who we are working with, whether that’s the big cloud service providers or emerging initiatives like Stargate or otherwise—Arm’s right at the heart of all of it.

**Awesome. All right, Mohammed Awad, I appreciate this. Let me see. Before we leave, anything that you would like to add? What haven’t I talked about? What are you excited about going forward? Anything, the mic is yours.**

MA: I mean, I just think we’re at such an amazing time right now. It’s interesting because I told you I started by telling you I started as a software engineer. Back then when I started my career, software was such an exciting place and it continues to be an exciting place. I’m accidentally in the semiconductor business. I’m accidentally in the hardware business. It’s where my career led me. But I’ve got to tell you, it couldn’t be a more interesting and exciting time than right now as far as I’m concerned, certainly over my career. And I just think that, given the aspirations and the transformation that’s happening both in the data center and in the world at large, because of some of these initiatives around AI and otherwise, I’m just excited to be a part of it and am looking forward to where it’s going to take us.

**I hear ya, very exciting time. Thank you so much for taking the time.**

MA: Thank you.

*Arm is a client of Creative Strategies.*