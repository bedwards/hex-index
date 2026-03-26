---
title: "Building the Chiplet Ecosystem"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-08-20T15:01:49.000Z"
source_url: "https://www.chipstrat.com/p/building-the-chiplet-ecosystem"
word_count: 1882
estimated_read_time: 10
---

Chiplets are an important semiconductor industry topic we’ve been covering, most recently here:

Breaking a complex system-on-chip into smaller, specialized dies improves yield and allows each chiplet to use the most cost-appropriate process node. In today’s era of steep wafer cost inflation *(next-gen wafers are rumored to reach $45,000 per wafer)*, designers are increasingly enticed to reserve the most advanced nodes for the highest-value compute logic, while fabricating I/O, memory, and analog on older, cheaper processes.

[

![](https://substackcdn.com/image/fetch/$s_!Dlbi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d90804f-7951-4c19-a0e5-5dc0db6c5914_1894x1104.png)



](https://substackcdn.com/image/fetch/$s_!Dlbi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9d90804f-7951-4c19-a0e5-5dc0db6c5914_1894x1104.png)
*Notice the log scale Y axis! [Data source](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-could-charge-up-to-usd45-000-for-1-6nm-wafers-rumors-allege-a-50-percent-increase-in-pricing-over-prior-gen-wafers)*

Broad chiplet adoption has lagged because early implementations were built for internal use rather than multi-vendor ecosystems. AMD proved chiplets could scale in volume, and Intel followed, but both relied on vertically integrated, proprietary designs aligned with their business models. These efforts validated the technical concept but offered no path to third-party interoperability.

Startups pushed ahead with chiplet-based systems, yet in the absence of shared standards, mixing in-house and external dies required custom integration that undercut the very economic and design advantages modular architectures were meant to deliver.

## The Benefits of Open Innovation for the Industry

To move from proprietary, single-vendor implementations to an open, *multi-vendor* market, the semiconductor industry needs a coordinated *ecosystem*.

Every part of the value chain has a role:

**Tools:** EDA providers must support chiplet-aware design, simulation, power and thermal partitioning, and timing closure.

**Manufacturing:** Foundries need validated 2.5D and 3D packaging flows, robust yield models, known-good-die testing, and proven multi-die validation processes.

**Integration and Software:** Design service firms must integrate chiplets from multiple vendors at the system level. IP providers need to standardize offerings for die-level interoperability so that a validated chiplet can be reused like hard IP.

But technical compatibility is only part of the challenge. Multi-vendor chiplets raise questions of trust, security, and accountability, along with ownership and liability. *Who is responsible for a failing chiplet in a multi-vendor product?*

These issues don’t have to be fully solved up front; many will be worked out as the ecosystem matures.

## Building a Multi-Vendor Ecosystem

A viable multi-vendor chiplet ecosystem depends on trust and coordination across the supply chain, anchored by shared standards for how chiplets connect and communicate. With consistent rules, vendors can deliver interoperable components that address a wider set of markets.

This alignment benefits everyone. Large players can amortize the cost of high-performance compute dies across multiple SKUs, while smaller companies can compete with differentiated accelerators, I/O dies, and other specialized chiplets.

The payoff is a more modular and dynamic industry. For example, a multi-vendor chiplet ecosystem enables “late binding”, assembling products from pre-validated chiplets late in the design cycle to better respond to shifting requirements.

A chiplet ecosystem promises to accelerate time-to-market and improve economics for the entire industry.

**The path forward requires standards and coordination.**

Standards must define chiplet classification, interface consistency, versioning, and compatibility to enable independent design and reuse without fragmentation. A top-down approach, starting with system-level definitions and mapping to protocols like [AMBA CHI](https://developer.arm.com/documentation/ihi0050/latest/) and [UCIe](https://www.uciexpress.org/), ensures plug-and-play integration without reinventing the wheel.

And like we emphasized earlier, this is an *ecosystem* challenge*.* Success requires alignment across foundries, EDA, IP, and design services, supported by chiplet-aware tools, certified modular IP, integration expertise, and built-in trust mechanisms.

Standards and industry-wide coordination. That’s a heavy lift — so who can pull it off?

When I researched commercial chiplet marketplaces, I found references from [Intel](https://download.intel.com/newsroom/2025/foundry/Intel-DC-Chiplet-Alliance-Partner-Quotes.pdf) and [AMD](https://www.amd.com/content/dam/amd/en/documents/solutions/technologies/chiplet-architecture-white-paper.pdf), but [Arm’s chiplet ecosystem](https://www.arm.com/markets/chiplets) emerged as the most mature. So I reached out to Arm directly to understand how they’re building it and what sets them apart.

Here’s what I learned.

## Arm’s Chiplet Ecosystem

Arm is pioneering a multi-vendor chiplet ecosystem aimed at replacing traditional, vertically integrated systems with modular and open architectures. This initiative is designed to accelerate innovation, enable broader scalability, and empower customers with greater freedom of choice across the cloud, AI, and embedded computing landscapes.

The strategy centers around three pillars:

### 1. **Chiplet System Architecture**

Arm is doing this via the Chiplet System Architecture (CSA), a [publicly available spec](https://developer.arm.com/documentation/den0145/latest) that defines how chiplets partition system functions and interconnect reliably.

[

![](https://substackcdn.com/image/fetch/$s_!jUex!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf229513-3ae2-4ed7-b0e7-e672684c4313_2004x1236.png)



](https://substackcdn.com/image/fetch/$s_!jUex!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf229513-3ae2-4ed7-b0e7-e672684c4313_2004x1236.png)
**Arm’s Chiplet System Architecture specifies system compositions of chiplets, the chiplet types and their interface definitions. Figure 1.1 shows the relationship between the components specified in the CSA.**

CSA includes **system-level partitioning rules**, which guide how to split compute, I/O, and memory across chiplets while maintaining performance and coherency.

It includes **interface protocols** based on widely adopted standards such as AMBA CHI C2C and UCIe, enabling coherent, high-bandwidth, low-latency communication across chiplet boundaries.

In chiplet-based systems, performance depends on how efficiently chiplets communicate. Arm addresses this with AMBA CHI C2C, an open-source protocol designed for coherent, low-latency communication across chiplet boundaries. It keeps data moving reliably by managing traffic flow, reducing overhead, and prioritizing critical transfers, ensuring consistency across tightly coordinated components.

To meet rising performance demands, CHI C2C supports link aggregation, allowing multiple links to be combined for scalable bandwidth. It’s also PHY agnostic, meaning it can operate over standard physical interfaces like UCIe and PCIe, as well as custom PHYs. This gives designers the freedom to reuse proven interfaces or adopt new ones, supporting faster innovation and ecosystem-wide interoperability.

By being open, flexible, and scalable, CHI C2C plays a key role in Arm’s vision of a multi-vendor chiplet ecosystem, where components from different suppliers can connect seamlessly without custom integration. This scalability is essential, as system compute performance is increasing far faster than interconnect bandwidth, a growing gap highlighted by [recent research](https://arxiv.org/pdf/2403.14123).

[

![](https://substackcdn.com/image/fetch/$s_!H63U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc5d9c12-92c3-4174-b023-81b751b7a2ed_1078x556.png)



](https://substackcdn.com/image/fetch/$s_!H63U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc5d9c12-92c3-4174-b023-81b751b7a2ed_1078x556.png)
*Compute is scaling faster than interconnect and bandwidth memory. Note the log scale! [Source](https://arxiv.org/pdf/2403.14123)*

CSA also provides **integration guidance** and a compatibility checklist to support interoperability testing, with Arm reviewing completed submissions.

The CSA reiterates the “why”:

> This specification is intended to act as a foundation for an Arm-based chiplet ecosystem built around the reuse of components and design effort in chiplet-based systems, up to and including the reuse of complete chiplets. **For this ecosystem to succeed there needs to be agreement upon a classification of the different types of chiplets, so that the features and interfaces are compatible.** This classification forms the basis for additional layers of standardization such as protocols, physical interface definitions, and reusable chiplet products.

More than [60 companies](https://newsroom.arm.com/blog/arm-chiplet-system-architecture-accelerating-evolution-of-silicon) spanning EDA vendors, IP suppliers, foundries, and design houses are participating in CSA. ✅ *Standards and industry-wide coordination!*

For chip designers and system builders, CSA lowers the barrier to entry with faster, lower-risk product development by enabling mix‑and‑match chiplets from multiple vendors without costly custom integration.

Here’s a nice 4-minute deeper dive:

### 2\. **Reusable IP**

Arm aims to accelerate chiplet adoption by reducing integration risk and development time through pre‑validated, production‑ready compute subsystems. Its [Neoverse Compute Subsystems](https://www.arm.com/products/neoverse-compute-subsystems) (CSS) provide complete, pre-integrated Neoverse-based designs ready for chiplet-based SoCs, with CSS V3 already aligned to the CSA standard.

[

![](https://substackcdn.com/image/fetch/$s_!bnNq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8bbd724f-3c8c-4ff7-ad80-6bde13ba9591_2392x1092.png)



](https://substackcdn.com/image/fetch/$s_!bnNq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8bbd724f-3c8c-4ff7-ad80-6bde13ba9591_2392x1092.png)
*Arm’s Neoverse CSS provides pre‑validated, production‑ready compute chiplets that are CSA-compliant.*

For chip designers and system builders, this means they can incorporate proven compute chiplets without re-engineering core architectures, freeing up resources to focus on differentiating AI, networking, or I/O chiplets.

[

![](https://substackcdn.com/image/fetch/$s_!_HeW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feaa16290-cc5c-489b-acfd-af4fecaf237c_822x702.png)



](https://substackcdn.com/image/fetch/$s_!_HeW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feaa16290-cc5c-489b-acfd-af4fecaf237c_822x702.png)
**The idea is to empower partners to focus on what they do best.**

### 3\. Arm **Total Design**

Here’s where the multi-vendor ecosystem truly emerges.

If CSA defines the rules and CSS provides the building blocks, [Arm Total Design](https://www.arm.com/markets/computing-infrastructure/arm-total-design) supplies the rest of the supply chain needed to get chiplet-based products into production. Arm Total Design is an ecosystem spanning IP vendors, design houses, foundries, and software providers, all aligned to the CSA standard.

For chip designers and system builders, Arm Total Design removes the burden of assembling that network themselves. They can source validated third-party IP, work with integration specialists, and tap foundries with proven packaging and process support. Commercial firmware and software partners ensure designs are deployment-ready rather than stuck in the lab.

By bridging the gap between standards and manufacturable products, Arm Total Design makes chiplet development faster, less risky, and more accessible to a broader set of companies.

## Consistent Arm ISA Delivers Software Compatibility

At the heart of any chiplet ecosystem is the instruction set architecture (ISA). Arm’s ISA already deployed at tremendous scale and covers the spectrum from milliwatt-class earbuds and smart glasses to megawatt AI datacenters running the latest generative AI models.

This maturity and consistency matter for a chiplet ecosystem. Arm gives customers flexibility to differentiate at the silicon level, but the ISA itself is standardized.

For example, as mentioned in [Arm’s Q1 2026 earnings call](https://investors.arm.com/static-files/57a99953-427a-4cfb-ade8-634d3564c008), the Arm ISA is at the heart of [Amazon Graviton](https://aws.amazon.com/ec2/graviton/), [Google Axion](https://cloud.google.com/blog/products/compute/introducing-googles-new-arm-based-cpu), [Microsoft Cobalt](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/cobalt-overview), and [Nvidia Grace CPUs](https://www.nvidia.com/en-us/data-center/grace-cpu-superchip/). Each is built on Arm Neoverse CPU IP, ensuring not just ISA-level uniformity but also micro-architectural consistency.

A stable ISA provides the foundation for a robust chiplet ecosystem, but the surrounding software stack delivers the real value for chiplet-enabled systems: compilers, operating systems, runtime libraries, firmware, developer tools, and a global developer base all deeply optimized for Arm and already deployed at scale.

Because of this maturity, system builders can add differentiated silicon like custom accelerators, memory, or I/O chiplets without disrupting said software stack. In a chiplet world where time-to-market is critical, software portability across modular hardware reduces integration effort and enables platforms to scale across products, partners, and generations.

Arm’s ISA robustness is evidenced by [Arm SystemReady,](https://www.arm.com/architecture/system-architectures/systemready-compliance-program) a compliance program that helps ensure the interoperability of an operating system on Arm-based hardware.

Just as SystemReady allows operating systems to run unchanged across generations of Arm-based hardware, the same principle applies to chiplets; ISA and system standards ensure modular components can be integrated without breaking the surrounding software stack.

This history of enforcing compliance and portability is what gives Arm’s ISA its unique credibility as the foundation for a multi-vendor chiplet ecosystem.

So the takeaway is this: ARM’s ISA foundation allows silicon vendors, cloud providers, and system integrators to innovate at the chiplet level without fragmenting the software ecosystem.

### Example: Rebellions

Rebellions, working with Arm, Samsung Foundry, and ADTechnology, is [building a production-grade AI CPU chiplet platform](https://rebellions.ai/rebellions-partners-with-arm-samsung-foundry-and-adtechnology-on-next-gen-ai-computing-chiplet-technology/) for generative AI inference. The design combines Rebellions’ REBEL AI accelerator with ADTechnology’s Neoverse CSS V3 compute chiplet and will be manufactured on Samsung’s 2 nm GAA process. It uses Arm’s CSA and Total Design ecosystem to integrate CPU and accelerator chiplets, with interoperability and coherence managed through AMBA CHI C2C.

Although it has not yet taped out, the project demonstrates the technical and organizational viability of modular, standards-based chiplet integration, bringing together a foundry (Samsung), a design house (ADTechnology), an AI startup (Rebellions), and an IP provider (Arm).

## Arm Ecosystem Conclusion

Chiplets hold promise, but adoption demands more than ambition. It needs shared standards, reusable components, and tight supply chain coordination.

Arm is furthest along, and what is different is that their chiplet approach is for the entire industry. Through CSA, Neoverse CSS, and Arm Total Design, it sets interconnect rules, delivers pre-validated compute subsystems, and aligns ecosystem partners across the supply chain.

Early examples like Rebellions’ multi-vendor AI platform highlight the progress and potential.

The industry’s long-term goal is a true chiplet marketplace where validated parts can be mixed and matched across products and use cases. To get there, vendors must deliver more CSA-compliant chiplets, prove interoperability in silicon, and create business models that reward design reuse.

With chiplet momentum building, this milestone may arrive sooner than many expect.

\---

*This article was commissioned by Arm.*

*While Arm has supported the research process, the findings and conclusions expressed in this document are solely those of Chipstrat and Creative Strategies, and do not necessarily reflect the views of Arm.*

*The insights and analyses presented herein are based on research and data obtained through collaboration with Arm. The objective of this paper is to provide an unbiased examination of Arm’s chiplet ecosystem.*

\---