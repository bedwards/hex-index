---
title: "Going deeper into layer zero: must-know for the cyber industry insiders"
author: "Ross Haleliuk"
publication: "Venture in Security"
publication_slug: "ventureinsecurity"
published_at: "2025-12-09T17:10:50.000Z"
source_url: "https://ventureinsecurity.net/p/going-deeper-into-layer-zero-must"
word_count: 2253
estimated_read_time: 12
---

Several months ago, I proposed a concept that helps explain how our industry works and what the prerequisites are for a startup to become a billion-dollar company. I called this concept a “layer zero” because it is the foundation upon which everything else gets built. That article got a fantastic response and I’ve had tens of people reach out with comments and questions about it. Today, I am sharing a few additional perspectives that build on the original idea and make the picture around layer zero much clearer. A lot of the thoughts here are an outcome of a few back-and-forth messages I had with [Bill Phelps](https://www.linkedin.com/in/billphelps/) after the original article came out (Bill brought some really great points that informed my own thinking and this piece). Thanks, Bill!

\---

*This issue is [brought](https://ventureinsecurity.net/p/sponsor) to you by… [ZeroPath](https://zeropath.com/demo?utm_campaign=ventureinsecurity)*

**[Why Your SAST Tool Misses the Scariest Bugs](https://zeropath.com/demo?utm_campaign=ventureinsecurity)**

ZeroPath has discovered critical vulnerabilities in curl, sudo, and Next.js that every traditional SAST, SCA, and secrets scanning tool missed. These are some of the most scrutinized open source projects in the world, but legacy security tools left them exposed. Conventional appsec tools rely on pattern matching and static rules that don’t understand how your code actually works. They miss the business logic flaws, authentication bypasses, and chained vulnerabilities that matter most. Instead, ZeroPath learns your codebase like a security researcher would, understanding how repositories, services, and dependencies interact.

\---

Welcome to Venture in Security! Before we begin, do me a favor and make sure you hit the “Subscribe” button. Subscriptions let me know that you care and keep me motivated to write more. Thanks folks!

\---

# First, a quick recap

To those of you who didn’t read the [original piece](https://ventureinsecurity.net/p/competing-with-layer-zero-in-cybersecurity), I highly recommend checking it out because it provides a broad overview of the idea foundational to this article. For those that did but need a quick refresher, here’s how I explained it: “…The entities best positioned to deliver real security are the ones building the core technologies. A cloud provider is logically in the best place to solve cloud security; an operating system vendor is closest to solve endpoint security; an email provider sees everything that flows through their infrastructure so they should be in the best position to solve email security; an identity provider already governs user access so they should be able to take care of identity threat detection and response effectively. These foundational providers own the systems that define how security boundaries are created, how access is enforced, and how data flows, so they have the ability to bake security in. It is these providers that I define as layer zero.

Layer zero refers to the foundational layer of infrastructure and technology that other tools depend on. It’s where [control points](https://ventureinsecurity.net/p/owning-the-control-point-in-cybersecurity) often emerge - identity platforms, cloud service providers, and operating systems. These are not just passive infra providers; they actively shape the rules of engagement for all other tools. For those that own layer zero, adding security is often just an architectural decision (a toggle, an API extension, a bundle, etc.), while for everyone else, namely the vendors operating on top of these platforms, delivering security becomes a negotiation with the underlying layer. That’s the power of owning the foundation, and the challenge for everyone who doesn’t.” - Source: [Competing with layer zero in cybersecurity](https://ventureinsecurity.net/p/competing-with-layer-zero-in-cybersecurity)

The easiest way to understand what it looks like in the real world is to look at who the layer zero providers are:

-   In the cloud, it is cloud service providers like AWS, Azure, and GCP.
    
-   In the network, it is networking providers like Cisco and Juniper.
    
-   In the endpoint, it is the OS providers like Microsoft (Windows) and Apple (macOS and iOS).
    
-   In identity, it’s identity providers (IdPs) like Microsoft Entra and Okta.
    
-   In the browser space, it’s the browser platforms like Mozilla (Firefox), Chrome (Google), and Edge (Microsoft).
    
-   In code security, it’s the platforms where the code is created and managed, like GitHub, and most recently Cursor.
    

[

![](https://substackcdn.com/image/fetch/$s_!Svyr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e91b43b-d3f9-4237-8a2e-91e2e05af756_1454x970.png)



](https://substackcdn.com/image/fetch/$s_!Svyr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e91b43b-d3f9-4237-8a2e-91e2e05af756_1454x970.png)

In the previous article, I explained the market dynamics and what happens when layer zero providers start offering security (people usually prefer third-party solutions), and when security companies mess with the core business of the layer zero providers (bad idea), among other things. Now I would like to share a few other thoughts on this topic that may make it easier for people to solidify the mental model around this concept.

# Every new layer zero creates an explosion of security companies

Layer zero is a pretty dynamic concept because things evolve all the time, and when they do, they create both shifts in infrastructure and the expansion of the attack surface. We talk about cloud, identity, and operating systems as if they’ve always been layer zero, but they weren’t inevitable per se. Instead, they became default control planes because some deeper infrastructure shifts created gravity around them. The explosion of personal computers created the endpoint layer, IP networking created the network layer, virtualized compute created the cloud layer, and the rise of SaaS turned the browser into a delivery mechanism for applications.

Every time a new foundational layer emerges, we see the same pattern when a large number of cybersecurity companies get created to take advantage of that shift. The speed with which it happens varies a lot and is largely dependent on the speed of the underlying infrastructure change. With the cloud, it happened almost overnight; identity took at least a decade to consolidate, and the browser is only now starting to get the recognition it deserved over 5 years ago. With AI, we see many companies making the bet on the fact that AI will become the new layer zero, which is why so much capital is being poured into security for the AI space. Regardless of the specific market segment, the dynamic is the same - when a new control plane forms, security companies chase the surface area around it.

This is why I think of layer zero as a creator of new security markets. When the foundation changes, thousands of new problems appear: posture, visibility, misconfigurations, gaps between old and new workflows, fragmented APIs, and inconsistent policy models. If you zoom out far enough, the 5,000+ cybersecurity vendors today aren’t a sign of market inefficiency; they’re a solid proof that we’ve had dozens of layer-zero shifts over 40 years, and each created its own cottage industry of “missing controls.”

# Why layer zero never delivers “enough” security

There’s this idea that if layer zero platforms (endpoint OS, browsers, cloud platforms, etc.) were just built with stronger security controls, we wouldn’t need all the add-ons and point solutions. That’s partially true, but realistically, it’s impossible. Layer zero optimizes for reliability, scale, economics, and user experience, not for the edge cases enterprises run into. Historically, layer zeros weren’t even designed with access controls, logging, or basic security guardrails, and all these were added only after attackers forced the hand of the creators.

Layer zero players build new features with the same structural challenge: they need to serve the entire world with one architecture. Even if they can build some posture, policy, and detection capabilities, these will be weak, shallow, or overly generic. Even after customers get breached by adopting the basic layer, these platforms can’t go deep enough on security. This is partly because it’s not their bread and butter, but also because doing that is often counterintuitive to their business models. Doubling down on security often reduces compatibility, increases support burden, and complicates core workflows, something that makes these players sell less of their core products.

Having seen this story repeat itself several times, I don’t think that if the layer zero platforms shipped their products with much stronger security, it’d solve the problem here either. The bigger the enterprise, the more flexibility it needs in configuring things, and more flexibility always means more misconfigurations. I’d go as far as to say that the majority of security problems are really misconfiguration problems (which is probably why CSPMs and identity automation products have been exploding in growth). That’s why the first security category around every layer zero is always some form of “posture management”, the industry’s ongoing attempt to deal with complexity nobody could have imagined.

# The predictable evolution of security around any layer zero

Once a new foundational layer develops, the security around it follows a repeatable evolution pattern:

**Step 1: Visibility and posture**

Security teams typically don’t have control over whatever is happening in IT or engineering, but they need to know whether the new thing is deployed safely. The earliest successful network tools were scanners, the earliest successful cloud tools were posture managers, etc. This sequence is very important because history has shown that starting with runtime instead of posture for a new layer zero is a mistake. When a new layer zero develops, the attackers need time to understand how to actually exploit it, and there’s rarely enough activity to justify going too deep. People start with configurations, and CSPM is actually a very good example of that in real life when Wiz was able to win the market despite not having all the deep-level controls that some of their competitors did on day one.

**Step 2: Threat detection**

Once posture is “good enough,” attackers figure out how to bypass it. This is when logging, behavior analytics, anomaly detection, and runtime monitoring come into play. In the cloud, we went from CSPM to runtime detection, and in other areas of security like data and appsec, we’re very much moving in the same direction. It always takes time for people to outgrow posture, and the reality is that that maturity curve is pretty steep, but it happens eventually.

The tricky part here is that the competitive dynamics of the market often forces security products to become more and more sophisticated, but some areas just don’t see attackers move as fast. When this happens, cyber vendors get too far ahead of the actual attacks and end up building detections that are only triggered by false positives. It doesn’t take long for people to get rid of these tools. The bottom line is that step one (posture) is always going to be applicable to every new layer zero, but whether or not the market ever gets to step 2 or 3 depends on many factors.

**Step 3: Operations and incident response**

Once (and if) detection tools get widely adopted, the alert volume becomes overwhelming to security teams, which drives all kinds of operational improvements like SOC platforms, SIEMs, response automation, etc. These tools are usually built to help humans deal with what I’d define as “human-made” problems, aka all the alerts produced by the tools in phases one and two. This, on its own, doesn’t really lead to the creation of new categories. What creates new categories is when the number of attacks focused on the new layer zero is increasing. At that point, companies typically realize that there’s a pretty big difference between just learning that something bad is happening and actually containing it. As always, we learn that apparently there are not enough people who can respond to this new attack, and that creates room for specialized incident response expertise.

This cycle explains why our industry is repeating the same pattern all over again, and for every new layer zero, we get posture, then detection, and then (sometimes) response tooling. This also explains why the companies that break out attach themselves to a fast-growing, widely deployed layer zero can inherit decades of relevance.

# More about layer zero

At the beginning of the article, I mentioned a quick exchange with Bill Phelps. He shared some other points that I think are spot on:

-   Maybe this is obvious, but layer zero is where the business process/data lives, and it is what adversaries are attacking. So it is also the ultimate target for pentesting/red teaming. Pentesting and malicious attacks start with a “naked” layer zero, then all the layers on top of layer zero are built to protect it from attack.
    
-   If a company can evolve into a layer zero platform, it can become a public company. I’d expand on this thought and say that another way to go public is to deeply embed into an existing layer zero, but it’s that depth that creates a competitive advantage. CrowdStrike is a good example, and the fact that it needed to go super deep to observe the endpoint is one of the factors that differentiate it from, say, the CSPMs I’ve mentioned that didn’t get to build that deep of an IP.
    
-   It is really hard to achieve scale in cyber if you are not some type of add-on to a dominant layer zero.
    

All these are great insights, and frankly, it’s the feedback and ideas from the readers that help me refine and expand my own thinking. Thank you, Bill, and thank you to all the readers for supporting my blog years later!

\---

##### **If you like my blog, please subscribe & share it with your friends. I do this in my free time, so seeing the readership grow helps me to stay motivated and write more. I don’t send anything except my writing and don’t sell your data to anyone as [I have better stuff to do.](https://www.linkedin.com/in/rosshaleliuk/)**

##### **If you are a builder - current or aspiring startup founder, security practitioner, marketing or sales leader, product manager, investor, software developer, industry analyst, or someone else who is building the future of cybersecurity, check out my best selling book, [Cyber for Builders](https://www.amazon.com/Cyber-Builders-Essential-Building-Cybersecurity/dp/173823410X/).**

##### **If your company is interested in sponsoring Venture in Security, check out [Sponsorships](https://ventureinsecurity.net/p/sponsor).**

##### **Lastly, check out the [Inside the Network](https://insidethenetwork.co/) podcast where we bring you the best founders, operators, and investors building the future of cybersecurity.**