---
title: "Agents will pay like locals, not tourists"
author: "a16z crypto"
publication: "web3 with a16z"
publication_slug: "a16zcrypto"
published_at: "2026-02-28T16:50:29.000Z"
source_url: "https://a16zcrypto.substack.com/p/agents-arent-tourists"
word_count: 2071
estimated_read_time: 11
---

*(via [Sam Broner](https://x.com/SamBroner))*

Walk through a bazaar as a tourist, and you’ll witness a spectacle: people buzzing everywhere, gawking at merchandise, comparing wares, sampling items, haggling with every vendor, exchanging coins. It *looks* like one-off commerce — each interaction its own little negotiation, trust mediated by cash in hand, or value exchanged via card.

But that’s not how most business gets done in the bazaar. Look more closely: Most people are locals, moving purposefully to their favorite merchants. The restaurant owner visits his friends, the butcher, the fishmonger, and the farmer. The tailor goes to the mechanic, the weaver, and the craftsman. They both pay on credit.

When we talk about how agents will pay for things, we default to thinking like tourists.

But agents will behave like locals. The properties that make agents different from humans — infinite duplication, flexible resourcing, zero startup cost — mean that a small number of agents can win niches. And even as agents get easier to build, relationships, partnerships, and trust can help create winning experiences. Dominant agents don’t need tourists’ payment rails. They need vendor relationships, working capital, and credit. The agent can lead the tourist (that’s you).

What does this look like? As agents consolidate into business-like platforms, agent payments must shift from retail payment rails to pre-negotiated B2B terms and credit, an opportunity that current rails can’t fully meet. This is the opening for next-generation payment rails, like stablecoins, if entrepreneurs can build great solutions for next-generation payment scenarios, like agents, streaming payments, and high-volume, low-dollar global business.

This essay explores that idea in three parts: how agents differ from humans and how those differences shape which payment strategies win; why current approaches fall short; and what needs to be built for next-generation payment rails to win.

### How agents are different than humans

To understand agents and payments, we have to consider two questions: Will agents act like people or businesses? And will agents play long-term games or short-term ones?

Agents will be more like businesses, with long-term relationships with their vendors and partners. Agents will be lightly customized instances on top of a larger business’s structure — the perfect tour guide from a well-connected travel agency, or a franchisee tuning a playbook for local tastes without renegotiating the supply chain.

Why will agents behave like businesses?

First, the best experiences are thoughtfully designed. I don’t want an agent that’s faffing around with vendors, comparing prices, negotiating terms at checkout. I want an agent that has already done that work — one that knows which vendors are reliable, has pre-negotiated pricing, and can check out instantly. That’s a business relationship, not a tourist transaction.

In fact, human agents already exist: travel agents, of course, but also literary agents, talent agents, watch dealers, real estate brokers, and more. Agents establish the key multi-turn relationships — with publishing houses, production studios, watch distributors, or mortgage originators — and each deal is customized on top of this foundation.

Second, agents are infinitely duplicable, but the scaled businesses (and their advantages) are not. The best agents will take advantage of the costs and benefits that come with scaled businesses: cheaper compute, better vendor pricing, deeper integrations, and more deterministic components. Scale begets scale. A travel agent that books a million flights a year gets better terms from airlines than one that books ten.

We’re already seeing this. Only ChatGPT has the distribution to negotiate partnerships with Shopify, Amazon, Expedia, and more. Small startups are stuck with automated browsers or reverse-engineered APIs while paying retail fee structures.

This is why agents will consolidate, or at least why most agents will be built on larger platforms. Agents are easy to build, but economics favor a small number of agents per vertical — each with deep vendor relationships and the margins to reinvest in better experiences. And vertical-specific agents with deep vendor relationships can accompany user agents to deliver the best of both worlds.

### Two payment relationships

If agents behave like businesses, there are two payment relationships to design: user → agent, and agent / agent-platform / agent’s tour guide → vendor.

The user pays the agent — perhaps via subscription, per-task fees, a credit line, or delegated access to the user’s accounts. The agent pays vendors via negotiated B2B terms, volume pricing, net-30 invoices, or a sub-agent. Using current business spend as a guide, agents will occasionally pay vendors using *retail* rails, but even then, it’s a small part of overall spend.

This is actually how credit cards work today: The card issuer has a retail relationship with a consumer, takes on risk, creates tailored rewards programs, and extends credit. The merchant acquirer has a commercial relationship with a merchant, with negotiated terms, scaled transfers, and complex working capital conversations.

### Agents and Cards: A match made at McKinsey

Credit cards, as [many](https://www.mastercard.com/global/en/news-and-trends/stories/2025/agentic-commerce-momentum.html#:~:text=We%E2%80%99re%20building%20a%20secure%2C%20transparent%2C,platforms%2C%20accelerating%20adoption%20and%20trust) [people](https://www.linkedin.com/feed/update/urn:li:activity:7397627236910002177/) [have](https://www.forrester.com/blogs/the-race-to-agentic-payments-in-us-b2c-e-commerce-where-we-are-now/#:~:text=How%3A%20Because%20these%20agent,present%20processes) said, are actually a pretty reasonable payment product for the agent use case. Cards are widely accepted; payments between $20 and $1,000 are acceptable; and cards include built-in arbitration, cancellation, and digitization.

Credit cards also have monthly statements — a key opportunity for consumers to understand what they’re paying for — and a concept that will surely be iterated on as agents replace kids with iPads as the leading cause of unexpected expenses.

But there are two problems: first, cards are a bad technology fit for agents. And second, the fee model forces the card industry into a classic innovator’s dilemma.

#### Card technology is hard to upgrade

Nearly all card technology is predicated on having a human in the loop: an approver, a UI layer, and a traditional payment type (one-time, subscription). Stripe Link, Visa 3D, and the dozens of other card virtualization products — the software that lets you save a card for future purchases on a website or register a card for recurring monthly subscription payments — finally work well now, but it took more than 15 years for the technology to develop.

Agent adoption is happening too quickly for the thousands of PSPs, POSs, merchants, and client endpoints to slowly upgrade their interface, programmability, and fraud detection for this new payment flow.

#### Cards fail for high and low-cost purchases

Imagine an agent streaming funds to a compute provider or delivering micropayments for API access. Neither of these payments will work on card rails. First, Visa doesn’t support sub-cent payments, and second, the economic model expects a fixed fee payment of 30 cents. It’s possible for Visa to create the technology for streaming or micro payments, but it’ll be harder to get stakeholders accustomed to lower payment revenues.

Even more problematically, cards are stuck in an innovator’s dilemma. Despite having a similar user relationship and requirements to card payments, agentic payments often fall outside the $20 to $1000 range. Worse, many of the initial scenarios involve paying for APIs that are hard to refund or easily resold (fraud). Cards can work, but the innovator’s dilemma has a long history of neutering incumbents.

Even beyond cards, legacy rails will have a place in the future.

## Incumbent payments have a role

As agents consolidate into business-like platforms, most high-volume spend will move to pre-negotiated B2B terms: invoices, net-30 terms, discounts, and credit lines. In that world, the “payment rail” can be anything — often boring settlement on traditional rails that happens asynchronously. Fees get amortized across larger transactions, and working capital can be negotiated between the two businesses.

But agents won’t only live in that world. Agents are happening now, and they’re operating where traditional payments don’t work well: first-time relationships, cross-border checkout, simplifying complex reconciliation, new agent-vendor models, just-in-time payment to reduce borrowing costs, and microloans.

In these scenarios, stablecoins are a better payment option, and, critically, it’s easier to build next-generation functionality on top of programmable money than on legacy infrastructure. New relationships using stablecoins become old relationships that still use stablecoins. Over time, stablecoins (already cheaper, faster, global) are likely to become a bigger part of the payment mix as the full stablecoin payment platform comes online.

## New payment technologies have an opportunity

To understand what’s next, we should look to the technologies best suited to growing use cases.

[Stablecoins](https://a16zcrypto.com/posts/tags/stablecoins/) — faster, cheaper, global money that is backed 1:1 by high-quality liquid assets — are a new platform that can meet the needs of underserved business categories today, categories like international payments and streaming payments. Critically, stablecoins are programmable. Key features like arbitration, monthly (or hourly) statements, credit, escrow, and conditional payments can be flexibly extended to service many new use cases. Unlike bank or card payments, stablecoin payments can be trivially integrated into APIs, databases, and agent checkouts with dramatically simpler reconciliation, approvals, and sign-up — substantial benefits to impatient entrepreneurs racing to build agentic commerce.

At a practical level, stablecoins solve the unit economics problem of cards at the extremes. There’s no 30-cent minimum fee, making micropayments impossible. There’s no interchange eating into margins on large transfers. An agent streaming $0.001/second to a compute provider and a manufacturer settling a $50,000 vendor invoice can use the same rail. That flexibility matters as engineers and entrepreneurs consider the next platform to build on.

## Build more stablecoin infrastructure

The most common objection to using stablecoins is that on- and off-ramping is expensive. This is true for the uninitiated tourist, but the problem fades when users are accompanied by the tour guide, an agent. The tour guide can help the tourist exchange money and facilitate exactly the transactions necessary, while saving on transaction fees.

Add statements and arbitration to our stablecoin-enabled tour guide, and we’re approaching the system we need.

Think about walking through Bloomingdale’s. You browse multiple vendors, accumulate items, and close out one combined tab at the end. The store handles the complexity of distributing payments to each vendor. Agents need the same model: a unified view of proposed purchases across multiple vendors, with one-click approval for the batch. The user sees “your agent wants to book a flight, reserve a hotel, and rent a car” — not three separate checkout flows. The agent platform handles the vendor relationships, and the user handles the intent. The user gets to approve, review, or contest the transaction.

Cards have done arbitration well, but new rails will need to layer this on. Arbitration is easiest when goods are high-margin or easily returnable. A flight within the 24-hour cancellation window, a subscription that hasn’t started yet, a luxury item with healthy margins — the vendor can absorb the reversal. But early agent scenarios are frequently for low-margin digital goods like compute and API calls, or food delivery.

\*\*\*

Agents won’t pay like tourists. They’ll pay like locals — through relationships, credit, and repeat business. That means the real payment volume will flow through pre-negotiated B2B terms, not card swipes. And frankly, pre-negotiated B2B terms do not need new payment rails. The settlement layer can be anything – wires, ACH, boring batch transfers. Legacy payments work fine for established relationships.

But we’re at a fork. Agents are happening now, entrepreneurs are building now, and they need payments that work today — not after years of card stack upgrades. Cards aren’t ready: too expensive for micropayments, too challenging to reconcile, held back by tech debt and human-in-the-loop fraud decisions. Stablecoins are ready. They’re programmable, global, simple to reconcile with digital services, and trivial to integrate into APIs and agent checkouts. They’ll work from day one even without negotiated merchant agreements or complicated B2B terms.

That’s the window. Entrepreneurs building agents today will reach for tools that work well today. Payments are sticky. Ultimately, new relationships built on stablecoins will become old relationships still built on stablecoins. Over the coming years, the ecosystem will mature, on-ramp friction will fade, and the infrastructure gaps — statements, arbitration, credit, batch approvals, interoperability — will be filled by a wave of startups building on a more capable foundation.

\---

*Acknowledgements: Thank you to Tim Sullivan for the thoughtful editing and to Noah Levine and Jordi Montes for the conversations that developed my thinking.*

\---

*You’re receiving this newsletter because you signed up for it on our websites, at an event, or elsewhere (you can opt out anytime using the ‘unsubscribe’ link below). This newsletter is provided for informational purposes only, and should NOT be relied upon as legal, business, investment, or tax advice. This newsletter may link to other websites or other information obtained from third-party sources — a16z has not independently verified nor makes any representations about the current or enduring accuracy of such information. Furthermore, the content is not directed at nor intended for use by any investors or prospective investors in any a16z funds. Please see a16z.com/disclosures for additional important details, including link to list of investments.*