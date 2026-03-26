---
title: "Enterprise blockchain adoption happens when someone else does the work"
author: "a16z crypto"
publication: "web3 with a16z"
publication_slug: "a16zcrypto"
published_at: "2026-02-01T16:08:49.000Z"
source_url: "https://a16zcrypto.substack.com/p/enterprise-blockchain-adoption-happens"
word_count: 1983
estimated_read_time: 10
---

[

![](https://substackcdn.com/image/fetch/$s_!MeZE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71ad0c0d-b735-40a8-a2d6-25e2361f85ae_2000x800.png)



](https://substackcdn.com/image/fetch/$s_!MeZE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F71ad0c0d-b735-40a8-a2d6-25e2361f85ae_2000x800.png)

The majority of enterprises — including leading payments companies, global banks, fintech platforms, and asset managers — are not looking to build or manage blockchain infrastructure. They want to solve a specific business problem: faster settlement, better liquidity, lower reconciliation risk, and so on. They want the speed, transparency, programmability — not ownership of the plumbing. Their focus is on what improves existing operations or customer experience, not on operating new systems.

They also know that blockchain technology can help them achieve these goals. They’re interested — but recognizing the value of blockchain often isn’t enough: Enterprises need a clear path to implementation to address their problems. What matters is not incentives or loyalty, but whether a concrete use case creates enough operational or economic upside (e.g., cost savings, better efficiency, fee compression) to justify engagement.

From development and deployment to ongoing infrastructure management, protocol teams should make it as easy as possible for an enterprise to use their product — whether that means deploying a blockchain network, incorporating stablecoin infrastructure, or enabling an enterprise to interact with an onchain application. While this post focuses primarily on protocol teams building blockchains, the same logic applies more broadly: The path to adoption is easier when the operational burden on the enterprise is minimized.

Enterprises don’t adopt solely because they believe in your chain; they adopt because someone else does the work to solve their problem. If the protocol team can do that work themselves, they should — and they should be explicit about it in enterprise conversations. If not, they need partners who can, so enterprises never have to run the infrastructure or do the heavy lifting themselves. It’s up to protocol teams to deliver on this promise, whatever path they pursue.

## Selling the chain versus aligning needs

Trying to entice corporates to adopt blockchain infrastructure — or seeming to — is where many protocol teams go wrong. Even well-intentioned pitches like “You could issue your asset here” or “You could run payments on our chain” can come across as a request to take on blockchain infrastructure these teams don’t want to own or operate. To a corporate counterpart, these pitches may sound like: *“Run your own payments network.”* And that’s almost certainly not what they want. A protocol’s work is less about selling blockchain directly to these enterprises. It’s more about aligning their needs with existing tech by orchestrating solutions.

Why orchestration? Most protocol teams don’t have the services capacity to design, integrate, and operate production systems on behalf of these customers. But their partners do. The protocols that succeed are the ones that translate enterprise needs into concrete, partner-deliverable implementations. In other words, the protocol teams that succeed make it easier to ship real deployments without forcing enterprises to own or operate the underlying infrastructure.

Why does this approach work? First, it solves corporates’ problems, just like any other tech solution. Second, it’s familiar to corporates: Just as companies outsource critical but non-core infrastructure like payments, custody, or compliance, most will rely on their existing partners to handle anything that touches the chain. And in many cases, they’re already accustomed to leaning on large integrators (like Accenture or Deloitte) to manage complex technical builds on their behalf.

Regional dynamics matter here as well. In South Korea, for instance, large conglomerates historically tried to own the entire blockchain stack. Kakao built Klaytn, Naver (via LINE) built Link, and WeMade built Wemix. But after seeing the challenges of operating their own L1s, many have shifted towards piloting on existing chains or using modular stacks like Avalanche subnets or OP Stack.

Across markets, these dynamics shape how enterprises engage with blockchain infrastructure. These engagement patterns largely tend to fall into three major categories.

## Three paths to enterprise adoption

For protocol teams working with enterprise partners, the core question isn’t whether enterprises will use blockchain infrastructure, it’s how to position the protocol so enterprises can engage without taking full operational ownership.

In practice, most enterprise engagement falls into one of three categories:

1.  deploying onto someone else’s chain,
    
2.  having someone deploy onto yours, or
    
3.  offering your stack as a service.
    

Some teams are also exploring adjacent models, from co-managed networks operated by multiple institutions (e.g., Canton) to interoperability layers that connect existing chains (e.g., LayerZero). But these models all reinforce the same principle: Corporates don’t want to own infrastructure; they want it to work for their use case.

1.  **Deploying onto someone else’s chain.** A company (or partner) builds a product or use case directly on top of an existing blockchain. The corporate defines the problem, and the protocol provides the rails. This is the simplest model. It’s low lift and can have broad reach, but it means playing within someone else’s infrastructure stack, which can lead to tradeoffs around control and predictability.
    

For example, banks evaluating public blockchains often cite upgrade predictability as a concern: Each time the chain upgrades, they would need to depend on a validator set they don’t control to adopt the new version. Delays or staggered upgrades can impact performance or, in some cases, even reliability.

2.  **Having someone deploy onto your chain.** In this model, a protocol team builds the chain and attracts partners who deploy use-case-specific applications or assets onto it. The protocol supplies the network, compliance, and technical support, while partners handle distribution and integration. This is where much of today’s enterprise adoption happens.
    
3.  **Offering your stack as a service.** Some protocols go farther, offering their infrastructure as a turnkey “stack-as-a-service” — designing and operating purpose-built networks for specific use cases or enterprise verticals. Even here, the protocol isn’t usually the one delivering the end solution. It still relies on delivery partners — the integrators and issuers who deploy and manage the system in production. The protocol supplies the rails; the partner makes them usable.
    

## Make it easy to use the chain

Across all three paths above, the same principle holds: Corporates don’t want to own infrastructure. They want infrastructure that works for their use case.

For most enterprise teams, the goal then isn’t to convince corporates to run the chain — It’s to give them a way to use it.

That means starting from the use case and identifying the clearest path to addressing it. In most enterprise contexts, the corporate defines the use case, the protocol provides the underlying infrastructure and incentives, and the partner delivers the solution — whether that means issuing a stablecoin, integrating a settlement layer, or building the application logic around it.

In this model, the protocol team isn’t the one building the end solution. It’s enabling a partner to do so. The goal isn’t open-ended co-development or accommodating endless, bespoke requests; it’s getting your current solution deployed in the real world as quickly and credibly as possible. Think of Visa working with Circle to enable stablecoin settlement across multiple chains, or Anchorage issuing Western Union’s stablecoin on Solana. At this stage, “winning” means empowering the right partners to deliver, even if it means accepting some loss of autonomy over the final implementation.

This is analogous to how public-facing chains often incubate a “killer app” to showcase what’s possible and give users a clear way to actually use the chain and realize the benefits. In the enterprise context, your “killer app” isn’t a consumer product. It’s a clear pathway, often via a partnership, that allows enterprises to realize value from using your chain.

### Design partners as GTM accelerators

A thoughtful design partner model can help capture this shift well. In this context, a design partner isn’t just an early customer or integration. It’s a partner that commits to working closely with the protocol team to map a real production workflow onto the chain, often before the product is fully finalized or broadly available.

In practice, the protocol team handles deployment, compliance, and throughput tuning, while partners integrate only the components relevant to their business logic.

The result: the chain is built for them, not by them.

For chains that haven’t launched yet, design partners create a critical feedback loop: They help shape the network around real workflows long before mainnet. This can help ensure the protocol can solve problems that enterprises actually have, not just theoretical ones.

For chains already live, engaging design partners can help refine the roadmap and even amplify GTM by creating credible reference partners, tightening integrations, validating use cases, and pressure-testing the network under real operational conditions.

A strong design partner program goes beyond logo swaps and surface-level co-marketing. What matters is depth of engagement: design partners are involved in real product feedback cycles, and when the protocol is ready, real integration work, production workflows and live deployments. Without this level of engagement, early visibility may spike, but it rarely translates into meaningful, long-term adoption – especially when another option makes integration easier or more directly serves the use case.

## A broader pattern is emerging

The model is already taking shape across the ecosystem.

For instance, Avalanche’s Evergreen subnets work with traditional financial institutions to pilot tokenized asset infrastructure, where Avalanche manages the network layer and partners bring distribution.

In another example, Base’s integration work with Coinbase’s enterprise clients, and Circle’s collaborations with banks and PSPs, follows the same logic: Abstract complexity away from corporates while empowering existing partners to operationalize blockchain benefits without having to stand up their own infrastructure.

In each of these cases, partners make the chain usable for enterprises without requiring them to run infrastructure themselves or build out their own custom solutions.

That means your GTM focus as a protocol team should shift from “convince corporates” to “enable partners.” Make it effortless for integrators, processors, and custodians to build on your behalf.

### How to enable

**#1** **The first step in enabling partners is identifying and engaging the relevant set who work with the companies you’re targeting.** This could include traditional consulting or technology implementation firms like Accenture or Deloitte, who routinely handle large digital-transformation programs and are already embedded with enterprise clients. It could also include more specialized technology providers like Alchemy, Fireblocks, or Chainalysis, who enterprises rely on for node access, custody, or compliance workflows. In some verticals, this may also extend to processors like Stripe or Worldpay, or custody and settlement providers like Anchorage, who can embed your chain directly into the services enterprises already consume

**\# 2 Once you’ve engaged this partner set, it’s critical to empower them** to a) speak to and even advocate for your solution and b) easily establish a path to integrate. This could look like a series of joint technical deep-dives, co-branded enablement sessions for their deployment teams, or quickstart demos that show how your infrastructure plugs into existing tooling. Some teams even produce public-facing recorded walkthroughs or sandbox demos that partners can share with clients during discovery.

These two motions — combined with providing up-to-date documentation — can help streamline the process of getting partners to actually start closing deals *for you*.

\*\*\*

Adoption happens when the chain disappears or becomes invisible.

Don’t sell the chain — sell the capability.

The chain is just the delivery mechanism.

The protocols that win enterprise adoption won’t be the ones that convince corporates to run blockchains. They’ll be the ones whose infrastructure becomes the default choice because partners can use it to deliver real value to enterprises – seamlessly and for specific use cases.

\---

*— a16z crypto editorial team*

*You’re receiving this newsletter because you signed up for it on our websites, at an event, or elsewhere (you can opt out anytime using the ‘unsubscribe’ link below). This newsletter is provided for informational purposes only, and should NOT be relied upon as legal, business, investment, or tax advice. This newsletter may link to other websites or other information obtained from third-party sources — a16z has not independently verified nor makes any representations about the current or enduring accuracy of such information. Furthermore, the content is not directed at nor intended for use by any investors or prospective investors in any a16z funds. Please see a16z.com/disclosures for additional important details, including link to list of*