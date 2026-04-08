---
title: "THE Cyber WHY: What We Read This Week"
author: "Daniel Kelley"
publication: "The Cyber Why"
publication_slug: "thecyberwhy"
published_at: "2026-04-08T00:26:01.000Z"
source_url: "https://www.thecyberwhy.com/p/the-cyber-why-what-we-read-this-week-ee0"
word_count: 1932
estimated_read_time: 10
---

*We’re BACK! Yep that’s right, after nearly 18 month away we’ve decided to pick up the pen and get back after it. The cyber world is a completely different place then when you last saw us. AI has taken over the world and cybersecurity is no different. We’ve been staring at the newsfeed for the last seven days and every single article is about AI. AI agents doing pentesting. AI agents replacing SaaS. AI agents that need their own security stack. Sequoia is telling us the next trillion-dollar company sells work, not tools. Karpathy is telling us engineers are irrelevant to their own workflows. And eleven keynote speakers at RSAC 2026 all agreed on exactly one thing: we need to secure AI agents, all while agreeing on exactly zero ways to actually do it. It’s giving “everyone knows the house is on fire but nobody can find the extinguisher” vibes. We’re glad to be back and we hope you love the new content - more coming soon!*

[

![](https://substackcdn.com/image/fetch/$s_!SIIN!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbff0b1c3-71e0-491a-ab14-d4bad04bc6b0_307x384.gif)



](https://substackcdn.com/image/fetch/$s_!SIIN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbff0b1c3-71e0-491a-ab14-d4bad04bc6b0_307x384.gif)

\---

###### **\[AI + Security\]**

**[AI Code Security: Enterprise Governance for AI Generated Code](https://pulse.latio.tech/p/ai-code-security-enterprise-governance) (Latio)**

James Berthoty over at Latio dropped a killer piece that should be required reading for every CISO trying to figure out what to do about the influx of AI-generated code flooding their repositories. We're watching a brand new security category emerge in real time, AI Code Security, and it's distinct from traditional SAST, DAST, or SCA. The problem isn't that AI writes bad code (though it does). The problem is that AI writes code *at scale*, *without context*, and *without the institutional memory* that a human developer carries about why certain patterns exist in a codebase.

The governance challenge isn’t about scanning output. It’s about understanding intent, provenance, and drift. When a junior dev uses Cursor to generate an authentication module, who owns the security posture of that code? The dev who prompted it? The AI that wrote it? The platform team that approved the model? Traditional AppSec tooling wasn’t built for this question because the question didn’t exist eighteen months ago. The companies that figure out AI code governance first (think policy engines that sit between the model and the merge request) are building the next foundational layer of the DevSecOps stack.

The security industry spent decades learning to secure code humans write. We now have approximately twenty months to figure out how to secure code that nobody wrote.

> **FOR INVESTORS:** AI Code Security is an (re)emerging category with no clear incumbent. First movers that nail the governance layer (not just scanning) will own the workflow. Watch for Series A/B companies positioning here in 2026.

\---

###### **\[STARTUP / VC\]**

**[Services: The New Software](https://sequoiacap.com/article/services-the-new-software/) (Sequoia Capital).**

Sequoia put out a thesis piece that should make every cybersecurity SaaS vendor deeply uncomfortable. They believe we’re moving from “software as a service” to “service as software.” The next trillion-dollar company won’t sell you a tool and a dashboard, it’ll sell you the *outcome*. Copilots and chat interfaces are simply the transition drug. Agents are the destination. The companies that get there first capture the margin that currently sits with the systems integrators, MSSPs, and consulting firms extracting value from the complexity your tools created in the first place.

[

![](https://substackcdn.com/image/fetch/$s_!RaSj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fec354011-23f0-4700-a284-356a096246e3_1023x495.png)



](https://substackcdn.com/image/fetch/$s_!RaSj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fec354011-23f0-4700-a284-356a096246e3_1023x495.png)
*Image from Sequoia Capital - Go the complete post for details.*

Apply this to cybersecurity and the implications are enormous. Think about what an MSSP actually does: they take your SIEM, your EDR, your SOAR, your threat intel feeds, and they provide the *human labor* to make all of it work together. If an AI agent can do that (triage alerts, investigate incidents, write detection rules, tune policies) then the $30B managed security market isn’t a services market anymore. It’s a software market. And the vendors that make that transition eat the services revenue. The ones that don’t become commoditized infrastructure underneath someone else’s agent.

This is the most important strategic piece I’ve read this quarter. It reframes every vendor evaluation, every competitive analysis, every market sizing model. The question isn’t “how big is the EDR market?” anymore. It’s “how much of the SOC analyst’s job does your product replace end-to-end?”

**The next war in cybersecurity isn’t over features. It’s over which vendors use agents to eliminate the need for services entirely.**

> **FOR INVESTORS:** Incumbents that complete the services-to-software transition will trade at infrastructure multiples. The ones that don’t become commodity inputs. The gap between those two outcomes is where the alpha lives.

\---

###### **\[INDUSTRY\]**

**[SaaS is Dead: Why Your Next Security Tool Should Be a “Vibe-Coded” Agent](https://cisotradecraft.substack.com/p/saas-is-dead-why-your-next-security) (CISO Tradecraft).**

CISO Tradecraft picked up the Sequoia thread and ran it through the practitioner lens. Their take is that the next generation of security tools won’t be dashboards you configure, they’ll be agents you *describe*. “Vibe coding” applied to security operations. You tell the agent what you want (”monitor my cloud configs for drift against CIS benchmarks and auto-remediate anything below critical”) and it builds the workflow, executes it, and reports back. No playbook authoring. No integration mapping. No three-month professional services engagement to get value from the thing you already bought.

The article is a bit off in places, (NO we’re not twelve months away from fully autonomous SOCs) but the directional argument is right. The SOAR market failed because it required security teams to become software developers to write playbooks. Agentic AI flips that. The security team describes the outcome and the agent figures out the implementation. That’s a fundamentally different value proposition, and it explains why every major security vendor at RSAC was demoing “agentic” capabilities whether they had them or not.

**SOAR failed because it asked security analysts to become developers. Agentic AI succeeds by asking them to just be analysts again.**

\---

###### **\[INDUSTRY\]**

**[I Watched All 11 Main Stage Keynotes at RSAC 2026](https://www.defendersinitiative.com/p/i-watched-all-11-main-stage-keynotes) (Defenders Initiative).**

My good friend Adrian Sanabria did the Lord’s work and sat through all eleven RSAC 2026 main stage keynotes so the rest of you could go drink at the expo area instead. He found that the industry has reached violent agreement that AI agents need securing, but nobody has a coherent framework for how to do it. Every keynote mentioned “agentic AI.” Every vendor had an “agentic” demo. And the actual substance behind most of it ranged from “we added an LLM to our workflow engine” to “we’re thinking about thinking about agent security.”

The useful signal buried in the noise is that identity is the new perimeter for AI agents (who is the agent acting as?), observability is the blind spot (most orgs can’t see what their AI is doing in production), and the supply chain risk from AI model dependencies makes traditional software supply chain look like a safe little puppy. The conference effectively confirmed that “AI Agent Security” is the next major category but we’re in the “twenty vendors, zero standards” phase. Sound familiar? It should. This is cloud security circa 2016.

**Everyone at RSAC agreed AI agents need securing. That’s the easy part. The hard part is that the agents are already deployed and nobody’s watching them.**

\---

###### **\[AI + SECURITY\]**

**[AI Is Breaking Security Categories](https://franklyspeaking.substack.com/p/ai-is-breaking-security-categories) (Frank Wang).**

Frank Wang wrote the piece that every analyst (myself included) needed to read. His thesis is that AI-native security companies don’t fit into existing market categories, and Gartner’s Magic Quadrants are going to look increasingly absurd trying to classify them. When a product uses an AI agent to do continuous pentesting, automated remediation, AND compliance reporting, is that a vulnerability management tool? A GRC platform? A pentesting service? The answer is yes, and also no, and also the categories are the wrong question.

This resonates deeply with what I’m was seeing as an analyst at Omdia. We’re building market models for categories that are actively merging and splitting in real time. The AI-native startups aren’t building “better SIEM” or “better EDR” they’re building agents that collapse multiple security functions into a single workflow. That’s not an incremental improvement. That’s a category extinction event for vendors who defined themselves by a single Gartner box. Next time a vendor tells you they’re the “leader” in a Gartner category, ask them which category they’ll be in when that quadrant doesn’t exist anymore.

**Gartner’s category taxonomy was built for a world where products did one thing. AI agents do twelve things. The map no longer matches the territory.**

> **FOR INVESTORS:** Category convergence means TAM models based on existing categories are increasingly unreliable. The winners will be companies that own *entire process flows*, not *categories*. Diligence needs to shift from “what category are you in?” to “what job are you eliminating?”

\---

###### **\[AI + WORKFORCE\]**

**[Andrej Karpathy: The AI Workflow Shift Explained 2026](https://www.the-ai-corner.com/p/andrej-karpathy-ai-workflow-shift-agentic-era-2026) (The AI Corner).**

Karpathy laid out the trajectory that every technical leader needs to internalize, we’re moving from humans writing code with AI assistance to AI writing code with human oversight. The human role shifts from creator to reviewer, from architect to editor. More importantly, the review bottleneck is already real. When AI can generate code 100x faster than a human can review it, the security implications aren’t theoretical, they’re operational. You cannot manually review AI-generated pull requests at the rate they’re being created. The math doesn’t work.

[

![File:Andrej karpathy 2016.webp - Wikimedia Commons](https://substackcdn.com/image/fetch/$s_!Nlub!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6692c6cb-c777-4ec4-bf6b-ec1295260cd8_1100x616.webp "File:Andrej karpathy 2016.webp - Wikimedia Commons")



](https://substackcdn.com/image/fetch/$s_!Nlub!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6692c6cb-c777-4ec4-bf6b-ec1295260cd8_1100x616.webp)

This connects directly to the Latio piece above. If humans are becoming reviewers rather than authors, then the tooling needs to shift from “help developers write secure code” to “help reviewers verify AI-generated code is secure.” That’s a different product. A different workflow. A different buyer. And most AppSec vendors are still building for the old model. Go look at your last five merged PRs. How many were AI-generated? Now ask yourself how long the security review took on each one. If the answer is “the same as always,” your review process is already underwater.

**Engineers aren’t being replaced by AI. They’re being promoted to AI supervisors. The problem is nobody trained them for the new job.**

\---

###### **THE WRAPUP**

The thread running through every article this week is the same: the AI agent era isn’t coming, it’s already here, and the cybersecurity industry is scrambling to figure out the implications in real time. Sequoia says the business model shifts from tools to outcomes. Karpathy says the human role shifts from creator to reviewer. RSAC confirmed the industry agrees this is happening while demonstrating it has no idea what to do about it. And meanwhile, AI-generated code is flooding production repositories faster than anyone can review it, new security categories are emerging and collapsing simultaneously, and the old analyst frameworks for understanding this market are breaking under the weight of products that refuse to fit in a single box. The gap between “we know this is a problem” and “we have a plan” is the widest I’ve seen in twenty-five years. That gap is also where every interesting company in 2026 is being built.

\---

**Also worth your time this week:**

-   **[Katie Moussouris warns of a “tyranny of optimization”](https://www.cybrsecmedia.com/the-ai-revolution-could-bring-a-new-kind-of-tyranny-unless-we-force-a-better-outcome/)**: The AI revolution doesn’t just create security problems, it creates governance problems. When algorithms optimize for efficiency at the expense of resilience, we get systems that work perfectly until they don’t. Worth reading for the policy lens alone.
    
-   **[Bessemer maps five frontiers for AI infrastructure in 2026](https://nextbigteng.substack.com/p/ai-infrastructure-roadmap-five-frontiers-for-2026)**: Reasoning, multimodal, edge, simulation, and trust/safety. The trust and safety frontier is where security and AI infrastructure converge and it’s the least funded of the five. That tells you something.
    

\---

If you've made it this far, you either found our musings at least semi-entertaining, OR you enjoyed the pain and kept going regardless. No matter how you made it to this point, you should know that we appreciate you. Please do us a solid and share The Cyber Why with your friends. We would love to reach a bigger audience, and referrals are how we do it.