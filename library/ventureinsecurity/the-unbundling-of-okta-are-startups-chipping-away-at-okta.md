---
title: "The unbundling of Okta: are startups chipping away at Okta?"
author: "Ross Haleliuk"
publication: "Venture in Security"
publication_slug: "ventureinsecurity"
published_at: "2025-09-04T15:12:34.000Z"
source_url: "https://ventureinsecurity.net/p/the-unbundling-of-okta-are-startups"
word_count: 3898
estimated_read_time: 20
---

*This is a guest post from a friend, [Maya Kaczorowski](https://mayakaczorowski.com/), who is the co-founder of [Oblique](http://oblique.security/?utm_source=venture-in-security), a self-serve IGA. She’s worked in product management for several security products at Tailscale, GitHub, and Google Cloud. In this piece, Maya breaks down Okta’s competition and how Okta is not being unbundled, but rather squeezed from all sides.*

\---

\---

All eyes are on Okta lately, with a wealth of new startups picking away at their features. This has left customers questioning whether they should buy into the Okta platform wholesale, or pick and choose the features they need from the platform to best serve their needs. Which might make you wonder: is Okta being unbundled?

Unbundling happens when a market incumbent ceases fully serving the needs of specific customer segments or niches. A horizontal platform can provide a ‘good enough’ solution for many, but it won’t provide the best solution for some. Unbundling is a potential way to enter and compete directly with an incumbent in a market. Another company can successfully compete by better serving a specific niche — whether that’s a particular feature set or customer segment.

\[Figure 1: [The unbundling of Craiglist](https://thegongshow.tumblr.com/post/345941486/the-spawn-of-craigslist-like-most-vcs-that-focus).\]

[

![](https://substackcdn.com/image/fetch/$s_!RUfd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd87661c-867f-4eb9-8601-a476e82e6cb2_500x375.png)



](https://substackcdn.com/image/fetch/$s_!RUfd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd87661c-867f-4eb9-8601-a476e82e6cb2_500x375.png)

[The canonical example is Craiglist](https://thegongshow.tumblr.com/post/345941486/the-spawn-of-craigslist-like-most-vcs-that-focus). Companies like Airbnb, Zillow, or Thumbtack built entire businesses by serving specific user journeys better — to discover, interact, and complete their task — than the generalist platform. That doesn’t mean the incumbent doesn’t survive. Craigslist is still very much alive, but it’s likely no longer where you go when you need to find a vacation rental, buy a home, or hire a handyman.

In B2B markets, there are fewer marketplaces. Rather than tackle a specific market segment, unbundling tends to happen for a specific feature set. Expensify took expense reporting from SAP and Oracle, DocuSign took e-signatures from Adobe, and Greenhouse took recruiting from Workday. This is tackling a platform player by competing on a single feature and creating a better point solution — frequently a ‘wedge’ that [new companies use to enter a market in the hopes of becoming a platform themselves](https://ventureinsecurity.net/p/you-dont-start-a-platform-you-earn).

In this post, we’re going to examine whether Okta is being unbundled — and if that's even the right question. As we’ll see, Okta is less of a unified platform and more of a collection of products competing in multiple related markets. Instead of being unbundled, Okta is facing pressure from all directions: it’s being squeezed.

## What makes platforms susceptible to unbundling?

Before we dive directly into Okta, it’s important to understand why a platform might be susceptible to unbundling.

As a product or platform grows, it expands and tries to serve the needs of multiple market segments. A product already needs to work hard to be [the best solution for one market segment](https://en.wikipedia.org/wiki/Crossing_the_Chasm) — and as a product becomes broader, [it often fails to serve any one of its market segments well, let alone all of them](https://www.library.hbs.edu/working-knowledge/clay-christensens-milkshake-marketing). When a particular type of user is dissatisfied with the solution, that market segment is underserved, leaving a door open to competition to swoop in. But just because a platform is susceptible to unbundling doesn’t mean there’s a sustainable market there.

Others have written more deeply and coherently about this than I have — so [I’ll point you to them](https://www.danhock.co/p/the-unbundling-fallacy?utm_source=publication-search) — but to summarize, there’s three criteria to consider for what makes a platform vulnerable to unbundling.

via [The Unbundling of Pinterest](https://medium.com/@besartcopa/the-unbundling-of-pinterest-8817f4b18ebc):

> *1\. High Customer Lifetime Value (LTV): The revenue potential from each customer should be significant over time.*
> 
> *2\. Limited or Negative Network Effects with Other User Personas: The ideal customer persona (ICP) should either not benefit from or even be disadvantaged by interactions with other personas on the incumbent platform.*
> 
> *3\. Distinct Mode of Interaction: There should be a possibility for a notably different kind of user interaction that the target group would significantly favor over the incumbent.*

Keep these in mind — we'll return to how Okta measures against these criteria later.

## What exactly is Okta?

There’s some irony in discussing Okta’s potential unbundling, because Okta is already just a bundle of products.

Okta has two main markets: workplace identity (Okta platform) and customer identity (Auth0 platform). In workplace identity, Okta includes:

-   Core identity and access management functionality, with a user directory to keep track of users and groups, an identity provider to handle authentication and issue security tokens and assertions, single sign-on to enable users to access multiple systems with one login, and multi-factor authentication to strengthen security beyond just passwords. Okta also extends its SSO so that you can use it to log into Windows and macOS devices. This includes Okta’s [SSO](https://www.okta.com/products/single-sign-on-workforce-identity/), [MFA](https://www.okta.com/products/multi-factor-authentication/), [Universal Directory](https://www.okta.com/products/universal-directory/), and [Device Access](https://www.okta.com/products/device-access/).
    
-   Identity governance and administration (IGA), which includes lifecycle management to automate user provisioning and deprovisioning as part of onboarding and offboarding, access reviews and certifications needed for compliance, and automation to support more unique workflows beyond simple on and offboarding. This includes [Lifecycle Management](https://www.okta.com/products/lifecycle-management/), [Identity Governance](https://www.okta.com/products/identity-governance/), and [Workflows](https://www.okta.com/products/workflows/).
    
-   Privileged Access Management (PAM), which includes privileged account credential management and escalation and SSH key management. Okta also has proxy offerings for managing access to SaaS apps and APIs. This includes [Okta Privileged Access](https://www.okta.com/products/privileged-access/), [Advanced Server Access](https://www.okta.com/products/advanced-server-access/), [Access Gateway](https://www.okta.com/products/access-gateway/), and [API Access Management](https://www.okta.com/products/api-access-management/).
    
-   Identity Threat Detection and Response (ITDR), to detect suspicious identity-related activities like unusual logins and impossible travel, discover compromised credentials, and identify misconfigurations or overprivileged accounts. This includes [Identity Threat Protection](https://www.okta.com/products/identity-threat-protection/) and [Identity Security Posture Management](https://www.okta.com/products/identity-security-posture-management/).
    

In customer identity, Okta has *both* an [Okta Customer Identity](https://www.okta.com/products/okta-customer-identity/) product as well as Auth0. Auth0 includes what a developer needs to provide auth in an application:

-   Authentication, with passwords, SSO including SAML and social logins, MFA, passwordless auth including magic links, and basic protection against bots and other abuse.
    
-   Authorization, including fine-grained authorization (FGA) to define roles and implement relationship-based access control (ReBAC).
    

You probably don’t realize that Okta also has a personal password manager called [Okta Personal](https://www.okta.com/products/okta-personal/) — an entirely different market!

*Auth0 and Okta’s customer identity offerings, as well as Okta Personal, won’t be the focus of the remainder of this post.*

## Okta’s pricing shows it’s made up of bundles

Up until recently, Okta’s pricing exposed its patchwork nature rather explicitly. While they built a comprehensive identity platform, their [à la carte pricing treated every feature as a separate line item](https://web.archive.org/web/20250308094709/https://www.okta.com/pricing/#expand). Would you like MFA with that? That's extra. Lifecycle management? Another add-on.

\[Figure 2: Okta’s pricing up to March 2025 included 12 separate à la carte items, some of which had multiple price points. Split into two columns for readability.\]

[

![](https://substackcdn.com/image/fetch/$s_!GVbC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F026a18ee-445b-49ee-9b84-76cdb1190b86_1405x1600.png)



](https://substackcdn.com/image/fetch/$s_!GVbC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F026a18ee-445b-49ee-9b84-76cdb1190b86_1405x1600.png)

This created several problems. First, it was genuinely confusing for buyers trying to understand what they actually needed. Second, you couldn't really unbundle anyway — what ‘choice’ do you have to *not* buy Single Sign-on, or Universal Directory? Third, and most damaging to Okta, it made it easier for competitors to cherry-pick and compete with individual features — why not swap out an alternative solution if there are no (monetary) benefits to buying individual Okta features?

For a company that should be selling platform value, they were inadvertently encouraging competitors’ point solutions. Every unbundled feature became an opportunity for a startup to undercut them on that specific capability.

With apologies to Okta’s design team, let me help you do what the marketing team should have done long ago: explained your product features by category. *Side note: this isn’t how you want to price them though.*

\[Figure 3: Okta’s à la carte items could be rearranged into features in IAM, IGA, PAM, and ITDR. With the exception of Okta’s core product suite in IAM getting to market before Microsoft Entra ID, Okta is not the market leader or first mover in any of its secondary markets. (ITDR is still a young and frothy market, but Silverfort seems to be the leader for a point solution.)\]

[

![](https://substackcdn.com/image/fetch/$s_!QijD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F081a64d7-cde4-42ae-83d6-a2ce15b385a3_1600x1195.png)



](https://substackcdn.com/image/fetch/$s_!QijD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F081a64d7-cde4-42ae-83d6-a2ce15b385a3_1600x1195.png)

Okta updated their pricing in March 2025, presumably after some GtM leader realized the blunder. [The new pricing tiers](https://www.okta.com/pricing/) are pretty good — they seem more closely aligned with the maturity of a potential buyer, while still offering specific features à la carte in case that’s what the sales team needs to close the deal. (And, the [product overview](https://www.okta.com/products/workforce-identity/) does categorize features more clearly.)

\[Figure 5: Okta’s bundled pricing as of when this post was published in September 2025. The new pricing tiers are more aligned to buyer maturity.\]

[

![](https://substackcdn.com/image/fetch/$s_!YXAk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b3c8636-e577-47bf-bf99-43ed7856d33e_1600x747.png)



](https://substackcdn.com/image/fetch/$s_!YXAk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b3c8636-e577-47bf-bf99-43ed7856d33e_1600x747.png)

The bundled pricing creates value for customers buying multiple features, especially those buying the ‘minimum’ needed for IAM that should all be included in the first place. Instead of paying $2 for SSO, $3 for MFA, $2 for Universal Directory, and $4 for either Lifecycle Management *or* Workflows — ringing in at $11 (at list price) — you get all of them in the Starter plan for $6.

## Okta is platform made up of acquisitions

How did Okta end up with this à la carte mess? Acquisitions. Okta is basically a bunch of startups in a trenchcoat pretending to be a unified platform.

Since it was founded in 2009, Okta has made at least 10 acquisitions, and primarily used these to drive entry into new markets:

-   **SpydrSafe Mobile Security** (founded in 2011, acquired by Okta in 2014 for $3.2M) became Okta Mobile, i.e. an iOS and Android mobile app to provide SSO for enterprise apps. (This is different from Okta Verify, and not an MDM.)
    
-   **Stormpath** (founded in 2011, [acquired in 2017](https://techcrunch.com/2017/03/06/okta-stormpath/)) replaced [Okta’s first customer identity product](https://techcrunch.com/2016/08/30/okta-extends-identity-management-to-apis/) to become Okta Customer Identity, which now competes with Okta’s later acquisition of Auth0.
    
-   **ScaleFT** (founded in 2015, [acquired in 2018](https://techcrunch.com/2018/07/18/okta-nabs-scaleft-to-build-out-zero-trust-security-framework/)) became Okta Advanced Server Access.
    
-   **Azuqua** ([acquired in 2019](https://techcrunch.com/2019/03/08/okta-to-acquire-workflow-automation-startup-azuqua-for-52-5m/) for $52.5M) had a no-code workflow that integrated into Okta’s Lifecycle Management feature, and later became the core of Okta Workflows.
    
-   **Auth0** (founded in 2013, [acquired in 2021](https://auth0.com/blog/okta-acquisition-announcement/) for $6.5B) became part of Okta while staying a separate platform for customer identity.
    
-   **atSpoke** (founded in 2016, [acquired in 2021](https://www.okta.com/blog/2021/08/okta-atspoke-join-forces/) for $90M) had an IT service desk with a conversational interface that became Okta Access Governance for managing access requests.
    
-   **Arengu** (founded in 2018, acquired in 2023) was also integrated into or used to build Okta Workflows.
    
-   **Uno** (founded in 2021, [acquired in 2023](https://www.okta.com/blog/uno-team-joins-okta-to-accelerate-okta-personal/)) became the core of Okta Personal, that is, a password manager.
    
-   **Spera Security** (founded in 2022, [acquired in 2023](https://www.okta.com/blog/2024/02/okta-acquisition-advances-identity-powered-security/) for $100-130M) became Okta Identity Threat Protection.
    
-   **Axiom Security** (founded in 2021, [acquired last week](https://www.okta.com/newsroom/press-releases/okta-with-axiom-security--delivering-robust-privileged-access-fo/) for $100M) to be integrated into Okta Privileged Access.
    

*Ross — I updated [that Okta consolidation diagram](https://ventureinsecurity.net/p/20-years-of-cybersecurity-consolidation) for you* 😗

\[Figure 5: History of Okta’s acquisitions over time. Okta made several acquisitions in the last few years, in particular to expand its IGA and ITDR offerings. If you want to get acquired by Okta, consider choosing a company name that starts with A or S.\]

[

![](https://substackcdn.com/image/fetch/$s_!lYYs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cb24fb0-34e4-49e8-9d85-489bca966b03_1000x500.png)



](https://substackcdn.com/image/fetch/$s_!lYYs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cb24fb0-34e4-49e8-9d85-489bca966b03_1000x500.png)

What’s notable in Okta’s acquisitions is that they have *not* really been innovating outside of the core IAM market they started in. To expand into IGA, PAM, ITDR, and customer identity, Okta has had to lean heavily on acquisitions. They're either not moving fast enough or don’t have the skillset to build these capabilities organically. These aren't even fast-moving markets — SailPoint has been doing identity governance (for AD) since 2005, a market Okta [didn’t enter until 2021](https://www.okta.com/blog/2021/04/oktane21-okta-identity-governance-modern-cloud-based-iga/). It suggests Okta struggles to innovate outside their comfort zone.

\[Figure 6: Okta’s acquisitions mapped to their à la carte pricing. Their IGA and ITDR capabilities came almost entirely from buying other companies.\]

[

![](https://substackcdn.com/image/fetch/$s_!fBtO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99ff09a3-deff-4609-93a0-258d46784cc0_1600x1195.png)



](https://substackcdn.com/image/fetch/$s_!fBtO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99ff09a3-deff-4609-93a0-258d46784cc0_1600x1195.png)

This shows up in customer experience too: one of the reasons I’ve heard from users not to buy Okta’s suite (beyond the recently rectified pricing strategy), is that Okta's acquired products feel bolted-on rather than integrated. When customers can easily swap out your IGA solution for a competitor because it doesn't feel like part of your platform anyway, you've lost the core value proposition of being a platform in the first place.

By going on an acquisition spree, Okta has accidentally built a collection of point solutions, rather than building a cohesive platform. Each acquisition and feature represents a potential unbundling vulnerability (or opportunity!) for competition. More critically, Okta seems to struggle to innovate outside their core product, and win in a new category or against a new player. Which brings us to our central question.

## Can Okta be unbundled by feature?

Now that we deeply understand Okta’s offering and how we got here, let’s get back to talking about unbundling.

Unbundling as it pertains to marketplaces is usually about unbundling a specific piece of functionality that appeals to a specific market — so in Okta’s case, you might think of unbundling a specific feature, or a product area like IGA or PAM, to compete with Okta.

There are many startups trying to do exactly that: compete with Okta in areas that are not its core business, from lifecycle management solutions to access gateways.

\[Figure 7: Several startups founded in the last 10 years compete with some of Okta’s features. Incumbents and companies acquired by larger players are not listed.\]

[

![](https://substackcdn.com/image/fetch/$s_!YG6J!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7595f264-6432-4491-8a0d-f1753d38d671_1600x1195.png)



](https://substackcdn.com/image/fetch/$s_!YG6J!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7595f264-6432-4491-8a0d-f1753d38d671_1600x1195.png)

What's immediately striking is that very few startups are directly challenging Okta in its core IAM product offering. Instead, they're targeting Okta's secondary markets: IGA, PAM, and ITDR (and customer identity).

But in those markets, Okta isn't the incumbent. The real competition comes from massive, well-established players: Duo for MFA (acquired by Cisco for $2.35B in 2018), SailPoint for IGA ($10.9B market cap), CyberArk for PAM (acquired for $25B by PAN in 2025), and Zscaler for zero trust access ($42.7B market cap). On the customer side, there's Auth0 (which Okta acquired for $6.5B in 2021) and 1Password ($6.8B valuation in 2022). These are massive companies with massive businesses, especially in contrast to Okta ($15.9B market cap). What’s really interesting is that these larger players haven't made serious moves to go after Okta’s core IAM territory. And, instead of going after the bigger fish, startups are taking aim at Okta.

So why target Okta instead of the market leaders? The bigger players typically focus upmarket, and integrate with Microsoft AD — they just serve a different customer profile. Okta is offering a platform for a segment that's more open to change and experimentation — which also makes it a more attractive target for disruption.

Is Okta really being unbundled feature by feature? Not quite. Okta is a platform competing in many established markets where competition already existed before they entered the market, and will continue to exist. Most of these feature-focused startups won't succeed — not every niche can sustain a standalone business, especially when constrained to Okta's customer segment. Many are building what are essentially features that will struggle to become standalone products. (I know of at least 5 now defunct on-demand access startups, plus another 2 that have pivoted — and there are still plenty left!) And when a startup *does* succeed, or create a new feature offering, Okta can simply acquire them (or their competitor), expand its platform, and perpetuate the cycle.

> *Most of the unbundlers fail, or are occasionally swallowed back up by the businesses they were supposed to disrupt.*
> 
> *\-* [The Unbundling Fallacy](https://www.danhock.co/p/the-unbundling-fallacy?utm_source=publication-search)

## Can Okta be unbundled by market segment?

But there’s more than one way to unbundle a platform: you can compete on features or compete on market segments. Feature-based unbundling pulls away specific capabilities, like building a better MFA solution than Okta's. Market-based unbundling targets customer segments whose needs are generally not being well-served by the platform.

As we saw, feature-based unbundling doesn't make much sense for Okta. Okta’s features mostly target the same buyer in IT or security, and so many of Okta’s features depend on its core IAM functionality with centralized identity data — making it hard to differentiate long term without also offering that functionality and owning that data.

Market-based competition is already happening. From below, all-in-one platforms like Rippling are changing what smaller organizations buy. Rippling is a platform solution for HR: it started with HR, payroll, and benefits, then expanded in IT solutions, including SSO, basic identity management, and device management. For smaller organizations that need a little bit of everything, but none of it too sophisticated, buying a single solution from a single vendor for all of your (HR and) IT needs makes way more sense than cobbling together a solution yourself. They just need a solution that’s ‘good enough’. And they’re not the only ones: JumpCloud offers an all-in-one solution for IT, and increasingly more startups compete with Vanta to provide “SOC 2 in a box”, *including* identity and device management.

From above, Microsoft owns the enterprise — and so Microsoft Entra ID owns enterprise identity. If you’re already in the Microsoft ecosystem, there’s no need to look elsewhere.

\[Figure 8: Okta is being squeezed from below by Rippling, squeezed from above by Microsoft, and squeezed from the sides by incumbents and startups.\]

[

![](https://substackcdn.com/image/fetch/$s_!f9rE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72f07505-388b-4320-82dd-a667c6dce3a6_1600x605.png)



](https://substackcdn.com/image/fetch/$s_!f9rE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72f07505-388b-4320-82dd-a667c6dce3a6_1600x605.png)

That leaves Okta somewhere in the middle: companies that have grown beyond Google Workspace — and Rippling — but aren’t yet on Microsoft. That’s somewhere between 100 and 10,000 employees.

Within Okta's remaining market segment, the main complaints I hear about Okta center on two issues: execution speed and user experience. Customers consistently see roadmap items delayed quarter after quarter, and the user experience is overly complex, slow, and well, dated — for both IT and end users. Notably, these pain points aren't really about individual features being inadequate, reinforcing that feature-based unbundling is less likely to work. That might be where an opportunity lies.

## Is Okta vulnerable to unbundling?

Let’s go back to our criteria and look at how Okta stacks up.

> *1\. High Customer Lifetime Value (LTV): The revenue potential from each customer should be significant over time.*

A 100-person organization is on the smaller side for Okta, but what they target for entry. At the lowest price tier, they’d be looking at $6 / user / mo x 100 users x 12 months = $7200 annually. Each of these organizations is likely to stick with Okta indefinitely, unless they grow significantly to a more substantial size and switch to Microsoft AD. Let’s say 10 years, so an LTV of $7200 / yr x 10 years = $72k. This is definitely not an accurate estimate: that’s the *smallest* of Okta’s customers, and that assumes list price. But that’s still a substantially higher LTV than when B2C products are unbundled.

> *2\. Limited or Negative Network Effects with Other User Personas: The ideal customer persona (ICP) should either not benefit from or even be disadvantaged by interactions with other personas on the incumbent platform.*

Not really. Okta isn’t a marketplace: organizations using Okta don’t interact with each other.

> *3\. Distinct Mode of Interaction: There should be a possibility for a notably different kind of user interaction that the target group would significantly favor over the incumbent.*

This is likely the criteria with the most potential. Not only are Okta’s current customers dissatisfied with the user experience, but more importantly, we’re seeing a fundamental shift in how organizations think about corporate security controls. The industry is moving away from IT being the gatekeeper for access decisions.

We've already seen this with access requests: teams can now request permissions directly rather than filing IT tickets. But there's appetite for going much further. Instead of having IT manage all corporate security decisions, delegated authority means giving teams the ability to manage their own requirements with IT providing guardrails rather than being the bottleneck for every decision. This shift is about putting decisions closer to the people who understand the business context.

Looking further out as we adopt agents more widely, [agent experience](https://biilmann.blog/articles/introducing-ax/) is what will matter. If how your users interact with your product is often via an agent, then having a great agent experience matters more than minor UX improvements.

I’ll add another idea to consider that isn’t part of the original unbundling criteria, but I think should be: a new distribution model. If how you used to sell isn’t working anymore, this alone is enough to disrupt your market. For years now, how we buy and sell IT and security has changed from being a completely top-down sale to something more bottom-up. [Product-led growth](https://ventureinsecurity.net/p/h1-2022-cybersecurity-product-led) has expanded in popularity for dev tools, and for purchases like Okta, [product-led sales](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/from-product-led-growth-to-product-led-sales-beyond-the-plg-hype) is likely where the market is heading — [letting you try before you buy](https://franklyspeaking.substack.com/p/a-letter-to-security-vendors). Smaller teams with tighter budgets are still looking to buy platform solutions, but they want to test it out themselves, decide when they’re ready to talk to a salesperson, and are able to move quickly to roll out new technology to their organization.

Just looking at the criteria is inconclusive, but, it’s leaning yes: there might be a way to unbundle Okta horizontally with a new IAM platform, by competing in a specific market segment. No one is doing it yet. Rippling is probably the closest.

## Okta is being squeezed, not unbundled

Okta isn’t currently being unbundled. Startups looking to compete with Okta feature by feature have unintentionally put themselves in a box: they’ve placed themselves in smaller markets where Okta isn't the final boss, but a bigger incumbent is. Okta wins customers by having a platform, not by being best-in-class in secondary markets like IGA or PAM where larger players are already entrenched, [even as those markets become more consolidated](https://radar.thecyberhut.com/p/palo-cyberark-sailpoint-savvy-ping). Given Okta's features all target the same buyer, it's unlikely to be unbundled vertically.

There might be an opportunity horizontally, to better serve a particular market segment who isn’t satisfied with Okta today. The customers most looking for an alternative are those who already choose Okta over Microsoft — likely partially because they wanted a more modern, faster-moving solution — and aren’t satisfied anymore. Meanwhile, Okta is facing competition at the lower end of its main market from Rippling, which offers an all-in-one HR and IT bundle that's chipping away at its source of new customers.

Okta is really struggling with its identity (pun intended). It wants to be more than just IAM, but isn’t reacting quickly enough to enter or win in any of its secondary markets.

If Okta isn't the best solution for the lower end of the market, and it's not the best solution for the higher end of the market, and it's not the best solution for those needing specialized features, who is it really good for? Okta isn't being unbundled as much as it's being squeezed.

The result is pressure from every direction: bundled platforms like Rippling attacking from below, Microsoft Entra ID from above, and in each secondary market (IGA, PAM, ITDR), Okta faces both established dominant players as well as new competition from hungry startups. Okta is trying to build a platform while fighting on multiple fronts where it's rarely the strongest player.

There’s still an opportunity for a new player with a fundamentally different approach to compete and build a new platform. But the opportunity isn't to ‘unbundle’ Okta, it’s to reimagine identity management for the next generation of companies.

*h/t to Besart Çopa’s post [The Unbundling of Pinterest](https://medium.com/@besartcopa/the-unbundling-of-pinterest-8817f4b18ebc), which was the inspiration for this one.*

\---

##### If you like my blog, please subscribe & share it with your friends. I do this in my free time, so seeing the readership grow helps me to stay motivated and write more. I don’t send anything except my writing and don’t sell your data to anyone as [I have better stuff to do.](https://www.linkedin.com/in/rosshaleliuk/)

##### If you are a builder - current or aspiring startup founder, security practitioner, marketing or sales leader, product manager, investor, software developer, industry analyst, or someone else who is building the future of cybersecurity, check out my best selling book, [Cyber for Builders](https://www.amazon.com/Cyber-Builders-Essential-Building-Cybersecurity/dp/173823410X/).

##### If your company is interested in sponsoring Venture in Security, check out [Sponsorships](https://ventureinsecurity.net/p/sponsor).

##### Lastly, check out the [Inside the Network](https://insidethenetwork.co/) podcast where we bring you the best founders, operators, and investors building the future of cybersecurity.