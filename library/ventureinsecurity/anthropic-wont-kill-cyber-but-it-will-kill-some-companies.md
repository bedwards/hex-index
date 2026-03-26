---
title: "Anthropic won’t kill cyber, but it will kill some companies"
author: "Ross Haleliuk"
publication: "Venture in Security"
publication_slug: "ventureinsecurity"
published_at: "2026-03-03T14:58:28.000Z"
source_url: "https://ventureinsecurity.net/p/anthropic-wont-kill-cyber-but-it"
word_count: 2556
estimated_read_time: 13
---

Over the past several weeks, social media has been exploding with predictions that “cyber is dead”. It doesn’t take much insight to jump on that bandwagon, as Anthropic’s announcement of Claude Code Security indeed sent the cybersecurity public market into turmoil, with some companies losing as much as 20% of their market cap. Contrary to what many think, declarations that “security is over” are very premature. In this piece, I share a perspective on why AI is actually expanding the total cybersecurity market, not killing it (and yet, why some categories will indeed suffer).

\---

*This issue is [brought](https://ventureinsecurity.net/p/sponsor) to you by… [Tines](https://www.tines.com/webinars/workflow-clarity-where-ai-fits-in-modern-automation/?utm_source=Venture_in_Security&utm_medium=paid_media&utm_content=newsletter-primary-0303).*

#### **[Where does AI fit in modern automation?](https://www.tines.com/webinars/workflow-clarity-where-ai-fits-in-modern-automation/?utm_source=Venture_in_Security&utm_medium=paid_media&utm_content=newsletter-primary-0303)**

Human-led. Rules-based. LLM-powered agentic systems. Each promises efficiency. Each has limits. The real advantage? Knowing when, and how, to use them together.

The teams pulling ahead aren’t betting on a single model. **They’re architecting a custom mix of all three.**

On **[March 12th](https://www.tines.com/webinars/workflow-clarity-where-ai-fits-in-modern-automation/?utm_source=Venture_in_Security&utm_medium=paid_media&utm_content=newsletter-primary-0303)**, join Tines and *The Hacker News* for a webinar exploring how to strike the right balance between approaches for your org, and scale AI adoption without sacrificing control or security.

\---

\---

# What Claude Code Security is and is not

Let’s start by taking a quick look at what Claude Code Security is and is not. If you haven’t read Anthropic’s announcement, I recommend you check it out. Essentially, [Claude Code Security](https://www.anthropic.com/news/claude-code-security) “scans codebases for security vulnerabilities and suggests targeted software patches for human review, allowing teams to find and fix security issues that traditional methods often miss”. Basically, Anthropic is saying that it will be able to truly understand the codebase and provide patches that people will be able to reliably accept. This part is important because there are many security startups focused on suggesting patches, so Anthropic is betting that it can do it as a part of its experience (which obviously makes sense), and that it can do a much better job than any of the add-ons (which again, I don’t see why it wouldn’t be able to).

If you know security and understand what kinds of capabilities we are talking about here, you have probably realised that, at the very fundamental level, Anthropic just announced a potential solution to application vulnerabilities that are currently being discovered with SAST scanning and such. Without a doubt, this can be a huge step forward, and it can help application and product security engineers find and fix vulnerabilities before the code is shipped, without having to chase down developers and convince them that they should care. Unless you are a founder focused on better code scanning to find vulnerabilities and help security teams fix them (i.e, unless Claude Code Security is coming to eat your lunch), Anthropic’s announcement is great news. However, in the grand scheme of things, it is addressing a very, very small (even if very important) slice of security.

​Security is about much more than finding vulnerabilities in code. Think about all the work that happens outside of the code repository, like:

-   Managing identity sprawl and privilege risk (dealing with over-privileged users, stale accounts, unmanaged service identities, etc.)
    
-   Detecting active exploitation attempts when they happen (detecting suspicious login patterns, unusual device activity, abnormal traffic flows, and so on)
    
-   Enforcing network segmentation and egress controls (dealing with flat networks, exposed services, uncontrolled outbound access, etc.)
    
-   Preventing cloud misconfigurations (flagging public storage buckets, overly permissive IAM policies, disabled logging, etc. - stuff CSPMs have been doing for a while)
    
-   Protecting secrets and machine credentials (hardcoded tokens, shared API keys, long-lived certificates, and other things NHI startups have been tackling)
    
-   Maintaining infrastructure integrity (i.e., dealing with configuration drift, unauthorized changes, unmanaged shadow infrastructure, etc.)
    
-   Monitoring third-party and supply chain access (vendor VPN access, SaaS integrations, unmanaged OAuth applications, bring your own cloud, and so on)
    
-   Automating compliance and preparing for audits (evidence collection, tracking risk acceptance, etc.)
    
-   Responding to incidents across environments (taking actions to contain threats, revoking access, cross-system investigations, and other aspects of incident response)
    
-   Restoring systems and operations after incidents or failures (all the stuff that can be bucketed under “cyber resilience”, such as environment rollback, data recovery, service re-deployment, etc.)
    

Claude Code Security, even if it works perfectly well, isn’t going to solve all these problems. This brings me to the main point: most of cybersecurity is here to stay, and AI will only make it grow faster and bigger than before.

# Most of cybersecurity is here to stay, and AI will only make it grow faster and bigger than before

If we agree that the overwhelming majority of cybersecurity has nothing to do with code security, then it should be clear that in no way is Claude Code Security threatening companies like Palo Alto Networks, CrowdStrike, Zscaler, Okta, Cloudflare, and others that have had their stock price drop following the announcement. However, I’ll go further and say that for most companies in cyber, AI isn’t a threat but a real opportunity.

For decades, one of the biggest factors that would limit the ability of attackers to target companies has been the lack of resources. In other words, they simply didn’t have the time, talent, or ability to look everywhere at once. It’s not a secret that if you look beneath the surface, every single company is a mess on the inside, but because of how complex the environments are and how much time it takes for attackers to do reconnaissance, oftentimes what actually keeps companies from getting breached is the lack of resources on the attacker side.

With AI, that is soon going to go away. Attackers are not bound by corporate governance or acceptable-use policies deciding which models can or cannot be deployed. They will use every model available, every autonomous agent, every form of automation that allows them to enumerate infrastructure, map dependencies, generate exploits, and test hypotheses at a scale that was previously impossible. The cheaper LLMs become, the lower the cost of attacking will be, and the higher the volume of attacks is going to become. This shift is going to fundamentally change the economics of defense. When attackers gain near-unlimited reconnaissance and experimentation capacity, companies won’t be able to rely on reactive security. Very soon, hoping that vulnerabilities and misconfigurations remain undiscovered will stop being a strategy (let’s be honest, this is exactly what most companies are relying on today, and it’s kind of working).

As AI models get better and cheaper, I think companies will be forced to start fixing a lot of the problems they could previously just hide. When this happens, we will see massive growth across exposure, identity security, infrastructure security, and many other areas that are foundational to enterprise security.

AI will also expand cybersecurity by dramatically increasing the surface area that needs to be protected. Whether enterprises end up deploying AI agents themselves (most of them probably won’t do that for a while) or buying off-the-shelf tools that help with different use cases (seems more likely IMO), all the copilots, automated workflows, and model integrations are expanding the attack surface area pretty significantly. Whether these problems will get addressed by the existing solutions or we’ll see new vendors (I don’t have a horse in this race, so thinking it will be a mix of both), someone will have to protect AI deployments. That, in turn, will create more demand for cybersecurity.

# We have seen this movie before

If you’re still skeptical about cyber surviving the new AI wave, consider that we have seen this movie before. Think back to the early days of cloud adoption, when most people thought that hyperscalers would effectively “solve security.” Standardized infrastructure, managed patching, and centralized controls were supposed to reduce risk and simplify operations. Instead, cloud removed friction from building and deploying software, and that acceleration changed the entire technology landscape. Development cycles compressed, infrastructure became ephemeral, and teams got the ability to spin up resources instantly without centralized oversight. That velocity created entirely new problems: CI/CD pipelines introduced software supply chain risk, infrastructure-as-code led to configuration drift, containers created runtime visibility challenges, and identities multiplied across humans, workloads, and APIs. Cloud didn’t just create the CSPM market; it basically led to an explosion of adjacent markets, including CIEM, container security, secrets management, SaaS security, Zero Trust networking, and many, many more. SaaS adoption alone (also enabled by the cloud) scattered data across hundreds of vendors and forced companies to rethink access control, governance, and third-party risk from the ground up.

I think that AI will follow the same pattern, but likely faster and on a larger scale. Already today, AI dramatically lowers the cost of building software and automating manual work, which means companies will deploy more systems, integrate more tools, and automate more workflows than ever before. The flip side of that is that every AI assistant becomes a new identity with permissions, every model integration becomes a new data exposure pathway, and every automated workflow becomes a potential attack surface. Just like cloud created entire categories to manage visibility, posture, and identity sprawl, AI will drive demand for both things we can think of now (model governance, agent identity security, data lineage protection, and all the other exciting stuff people are talking about) and plenty of problems we can’t even imagine.

The biggest lesson from cloud, in my opinion, is that increasing the speed of innovation does not reduce security needs; it multiplies them through second- and third-order consequences. AI is not going to kill cybersecurity, it will expand it across layers we are only beginning to recognize today. Obviously, when that happens, the market will grow massively.

# Vibecoding isn’t going to kill security tools either

Another mistaken belief that I see spreading in the industry is that cyber is going to die because enterprises are going to be so empowered with AI that they will simply vibecode their own tools. Rather than re-explaining what I’ve tried explaining several times, let me just share what I recently shared on LinkedIn.

[

![image.png](https://substackcdn.com/image/fetch/$s_!-B56!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4f78313-902a-488b-a3b6-8a8f770a1446_908x1096.png "image.png")



](https://substackcdn.com/image/fetch/$s_!-B56!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4f78313-902a-488b-a3b6-8a8f770a1446_908x1096.png)

​

Source: [my LinkedIn](https://www.linkedin.com/posts/rosshaleliuk_has-anyone-vibecoded-an-edr-yet-and-put-crowdstrike-activity-7432827510322704384-qfPh?utm_source=share&utm_medium=member_desktop&rcm=ACoAABd70ggBHphNqkAOu3BA8zLOqO0H8zsPWZc)

I continue to stand by every single word here. AI is a game-changer because it accelerates how quickly we can build and ship new products, but speed is not the same thing as replacing the underlying systems that enterprises depend on. Large organizations don’t buy “features”, they buy outcomes. Buying software is about buying a lot of intangibles that come with it, like reliability, security, being able to pass complex audits across jurisdictions, operational resilience at scale, partners they can trust when something breaks at the worst possible moment, etc. If these intangibles weren’t so important, most companies would just be using open source (let’s be real, there’s an open source version of every single billion-dollar company out there).

The importance of these intangibles doesn’t go down just because code can be generated faster, I’d actually argue it goes up quite a bit. Now that everyone can ship software super fast, it becomes more, not less important that customers can actually rely on their partners.

Security has always been about continuously raising the bar for the attackers, as every time our defenses improve, bad actors find new ways to get in. Even if we eliminate entire classes of known vulnerabilities (which, by the way, [we have been doing](https://ventureinsecurity.net/p/cyber-optimist-manifesto-why-we-have) for decades), the ecosystem will change and attackers will find new weaknesses to exploit as they have done in the past. The real opportunity with AI isn’t in pretending that it somehow makes foundational infrastructure become obsolete (because it simply doesn’t), and not in hoping that we can just vibecode tools (because we can’t, without getting squashed by the complexity and edge cases at scale). The real opportunity is in using AI to navigate the operational complexity that makes security so hard in the first place.

# Claude Code Security will still cause collateral damage

I have repeated several times in this piece that the cybersecurity industry is safe for now. That said, Claude Code Security will absolutely cause collateral damage. If a frontier AI lab can natively understand a codebase, detect vulnerabilities, and propose patches inside the same environment where code is getting written, the standalone value proposition of “we scan your code and suggest fixes” becomes very hard to defend.

SAST has always been the most obvious adjacency for AI labs. It’s actually pretty simple: whoever generates code will be able to absorb things like QAing that code and securing that code. This is great news for both security teams, who will no longer need to chase down devs to fix stuff, and for engineers, who can just accept a suggested autofix without having to think about security. Once vulnerability detection and auto-remediation are embedded directly into the development workflow, the appsec market will quickly start to look commoditized (I think it already does). The differentiation that many appsec tools rely on (better detection engines, smarter prioritization, cleaner reports) will become less compelling when the platform writing the code can also reason about and fix it. I have recently seen a few appsec companies known for building scanners come forward with messages that “Claude Code Security is a great thing for the industry,” but I don’t think anyone inside these companies truly believes that it is good for their business (they are right, though - it is great for the industry!).

Let me be clear: I don’t think that Claude Code Security means that application security disappears completely, even though the shape of it will change. If baseline code quality improves and common classes of vulnerabilities are prevented or auto-patched before pull requests are even merged, founders in appsec who built companies around identifying and auto-fixing code flaws will have to have some serious conversations at the board level.

I am by no means an appsec expert, but it’s becoming clear to me that while SAST scanners will be fading away, there are two kinds of new appsec products that are starting to take off. One is the new breed of product security tools that started to emerge in recent years. Companies like Prime Security, Clover Security, Seezo, and others (please do forgive me, founder friends, if I missed your company, these are just examples that came to mind) are just some examples of players for whom Claude Code Security isn’t going to be a threat. The other category of tools that are getting a lot of attention are runtime security solutions like Miggo, Oligo Security, Raven, and others (same disclaimer to founder friends applies). [James Berthoty of Latio](https://pulse.latio.tech/) is a big supporter of runtime security, so I suggest you check out his thoughts if this is an area you are interested in.

[

![image.png](https://substackcdn.com/image/fetch/$s_!-8Ex!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37f24bc3-27e7-46ca-b7b5-b8bf247096f6_1600x1066.png "image.png")



](https://substackcdn.com/image/fetch/$s_!-8Ex!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37f24bc3-27e7-46ca-b7b5-b8bf247096f6_1600x1066.png)

\---

##### **If you like my blog, please subscribe & share it with your friends. I do this in my free time, so seeing the readership grow helps me to stay motivated and write more. I don’t send anything except my writing and don’t sell your data to anyone as [I have better stuff to do.](https://www.linkedin.com/in/rosshaleliuk/)**

##### **If you are a builder - current or aspiring startup founder, security practitioner, marketing or sales leader, product manager, investor, software developer, industry analyst, or someone else who is building the future of cybersecurity, check out my best selling book, [Cyber for Builders](https://www.amazon.com/Cyber-Builders-Essential-Building-Cybersecurity/dp/173823410X/).**

##### **If your company is interested in sponsoring Venture in Security, check out [Sponsorships](https://ventureinsecurity.net/p/sponsor).**

##### **Lastly, check out the [Inside the Network](https://insidethenetwork.co/) podcast where we bring you the best founders, operators, and investors building the future of cybersecurity.**