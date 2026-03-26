---
title: "Scaling Bio 005: Eli Lilly's Aliza Apple on Building Collaborative AI Infrastructure for Drug Discovery"
author: "Zahra Khwaja"
publication: ""
publication_slug: "decodingbio"
published_at: "2025-12-02T15:15:04.000Z"
source_url: "https://decodingbio.substack.com/p/005-eli-lillys-aliza-apple-on-building"
word_count: 3710
estimated_read_time: 19
---

[

![About Lilly | Lilly Careers](https://substackcdn.com/image/fetch/$s_!ahGx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bd5925d-2c10-401e-a409-297aa4d875b2_4400x1605.jpeg "About Lilly | Lilly Careers")



](https://substackcdn.com/image/fetch/$s_!ahGx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bd5925d-2c10-401e-a409-297aa4d875b2_4400x1605.jpeg)
*Eli Lilly HQ, Indiana*

[Eli Lilly](https://www.lilly.com/) is rethinking how the next wave of drug discovery will happen. Rather than guarding internal tools, the company is building shared infrastructure that others can tap into. Through [TuneLab](https://tunelab.lilly.com/), launched in September 2025, Lilly is opening its proprietary AI models to biotech partners. These models draw on Lilly’s internal databases and many years of discovery work, and they run through a federated learning setup so partners can use their own data without giving anything away. As each group trains the models, the whole system quietly gets better.

Aliza Apple leads TuneLab as Vice President of [Catalyze360](https://www.lilly.com/science/partners/catalyze-360) AI and ML. She has been shaping how Lilly works with the broader biotech community and how open collaboration can unlock new scientific ground. We asked Aliza to share how she sees this shift unfolding and what it means for the future of innovation at the intersection of pharma and AI.

In this conversation, we explore:

-   Why Lilly is opening access to proprietary models it spent decades building.
    
-   The push to solve complex *in vivo* prediction through the Insitro partnership.
    
-   The roadmap toward AI that autonomously selects and orchestrates its own models.
    
-   How adopting a “SaaS co-creation” mindset is finally breaking down historical data silos.
    
-   How federated learning builds trust by moving compute to data, not data to compute.
    

\---

### Background

**About Eli Lilly**

Eli Lilly and Company, founded in 1876 and headquartered in Indianapolis, is one of the world’s leading pharmaceutical companies with a legacy spanning nearly 150 years of medicine discovery and development. The company develops therapeutics across diabetes, oncology, immunology, and neuroscience, with 2024 annual revenues at $45B and over 40,000 employees worldwide[1](#footnote-1).

Eli Lilly’s portfolio includes some of the pharmaceutical industry’s most impactful medicines *(revenues quoted for FY2024*[2](#footnote-2)*)*:

-   Mounjaro (tirzepatide) for Type II Diabetes: **$11.45B**
    
-   Zepbound (tirzepatide) for Chronic Weight Management: **$4.9B**
    
-   Trulicity (dulaglutide) for Diabetes: $**5.25B**
    
-   Verzenio (abemaciclib) for Breast Cancer: **$5.3B**
    

**Eli Lilly’s AI Strategy**

In October 2025, Lilly announced a partnership with NVIDIA to build what it claims will be *“the most powerful supercomputer owned and operated by a pharmaceutical company,”* featuring over 1,000 NVIDIA B300 GPUs. *“We have a strong belief that the medicines of the future...are going to be discovered by AI, with the help of AI, over the next several years,”* said Diogo Rau[3](#footnote-3), Lilly’s Chief Information and Digital Officer.

Lilly is pursuing an ambitious vision beyond traditional molecular modelling. The company is exploring techniques such as reinforcement learning to capture not just molecular data, but the intuition and thought processes of its chemists and biologists, eventually creating “digital twins” of scientists.

Beyond its in-house efforts, Lilly has forged a series of strategic collaborations with AI-focused biotechs to test and scale the potential of these emerging technologies across multiple therapeutic modalities:

[

![](https://substackcdn.com/image/fetch/$s_!TKrk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99bd1df8-3dc2-4b8a-9e3e-a5e1791c1b2e_974x1140.png)



](https://substackcdn.com/image/fetch/$s_!TKrk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99bd1df8-3dc2-4b8a-9e3e-a5e1791c1b2e_974x1140.png)

**Eli Lilly’s Catalyze360 and TuneLab**

[

![Exterior view of Lilly Gateway Labs](https://substackcdn.com/image/fetch/$s_!o8c-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa24c8168-7aff-408c-949c-9dff67dff99f_1024x683.jpeg "Exterior view of Lilly Gateway Labs")



](https://substackcdn.com/image/fetch/$s_!o8c-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa24c8168-7aff-408c-949c-9dff67dff99f_1024x683.jpeg)
*Eli Lilly’s Seaport Innovation Centre, Boston MA*

Lilly’s Catalyze360 organisation, launched in 2024 as the company’s external innovation engine, was designed specifically to engage with this ecosystem, not just through traditional business development deals, but by providing infrastructure, data, and AI capabilities that help biotechs succeed while giving Lilly close visibility into emerging science. TuneLab represents the most ambitious manifestation of this strategy.

A core part of Lilly’s AI strategy is **TuneLab**, launched in September 2025 as part of the Catalyze360 external development program. The platform opens up 18 AI/ML models - models that Lilly scientists use daily - to biotech partners at no cost. These include 12 models for predicting small-molecule drug properties and 6 for assessing antibody development, trained on over 500,000 data points accumulated over two decades at a cost exceeding $1 billion.

The innovation lies in the exchange: participating companies contribute training data back through federated learning, a privacy-preserving technique that allows data to remain on each company’s servers while still improving the collective model. Within two months of launch, hundreds of companies had applied, with early adopters including Firefly Bio, Superluminal Medicines, Schrödinger, and Circle Pharma.

**How Rhino’s Federated Computing Architecture Works**

TuneLab is built on [Rhino Federated Computing](https://www.rhinofcp.com/solution/life-sciences)’s platform, which implements federated computing atop NVIDIA’s [FLARE](https://developer.nvidia.com/flare) framework. The architecture fundamentally inverts the traditional data sharing model: instead of moving data to where computation happens, computation moves to where data lives.

**How it works:** A global AI model is distributed from a central orchestration server to each participating company’s local node (their own secure server infrastructure). Each company then trains this model on their proprietary data behind their own firewall, with their existing security controls fully intact. Critically, only the model updates e.g. mathematical weights and parameters, not the underlying molecular data, are encrypted and transmitted back to the central server. The server aggregates these updates from all participating nodes to improve the global model, which is then redistributed for the next training round. This iterative process continues until the model converges to optimal performance.

**The key security principle:** Lilly never hosts partner data, and partners never see each other’s data. All raw molecular information stays within each organisation’s infrastructure. The platform allows for additional privacy-enhancing techniques like differential privacy (adding mathematical noise to model updates) and k-anonymisation to further protect proprietary information.

[

![Introduction to Federated Learning - by Avi Chawla](https://substackcdn.com/image/fetch/$s_!WocA!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72083f76-475f-4a38-b6b8-c29d664354e5_1108x598.gif "Introduction to Federated Learning - by Avi Chawla")



](https://substackcdn.com/image/fetch/$s_!WocA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72083f76-475f-4a38-b6b8-c29d664354e5_1108x598.gif)
*A schematic showing the core idea behind federated learning ([source](https://blog.dailydoseofds.com/p/introduction-to-federated-learning)).*

#### **Aliza Apple**

Today we are lucky to be speaking with Aliza Apple, Ph.D., Vice President of Catalyze360 AI/ML and Head of TuneLab at Eli Lilly. In this role, she helps lead the strategy, development, and launch of Lilly’s AI/ML efforts for drug discovery and was instrumental in the creation of TuneLab. Aliza brings a unique blend of entrepreneurial and strategic experience to TuneLab: she previously co-founded Santa Ana Bio, a precision biologics company focused on autoimmune disease, and spent nine years as a partner at McKinsey & Co’s life sciences practice, where she collaborated with leaders from over 20 biopharma companies on corporate strategy and business development. She holds a Ph.D. in bioengineering from UC Berkeley and UCSF, and completed her postdoctoral fellowship at Cornell Medical College.

[

![Aliza Apple, Ph.D. - Biocom California](https://substackcdn.com/image/fetch/$s_!VOhM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49dfbe39-1834-48d0-b0ea-fb3036ad65b0_1000x1000.webp "Aliza Apple, Ph.D. - Biocom California")



](https://substackcdn.com/image/fetch/$s_!VOhM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49dfbe39-1834-48d0-b0ea-fb3036ad65b0_1000x1000.webp)

\---

\---

### A Conversation with Aliza Apple on Eli Lilly’s TuneLab

#### Founding Vision & Strategy

**Zahra: Let’s start with the origin story. How did TuneLab go from an idea to a public launch in just about a year?**

**Aliza:** It was a case of diving in with both feet. Within our Catalyze360 team, we started asking ourselves the fundamental question that stems from our macro mission: how do we support the best science wherever it lives, and find the right way to support it?

We were following adoption trends of AI in drug discovery and began thinking about how to address the lack of access to certain models and really trying to confront the data silos problem. We asked ourselves: what could be done by Lilly, as a convener, to start bringing the ecosystem together in this new era of AI? How do we finally fulfil the promise of creating R&D efficiencies, and could this be the right opportunity to actually create efficiencies for everyone?

What made the difference was having direct sponsorship from our executive team - Dave Ricks, Dan Skovronsky, and Diogo Rau who have been directly involved in shaping, sponsoring, and championing TuneLab. That gave us a really roaring, fast start to move from idea to “let’s go do this, let’s build this thing.”

About a year into that journey, we had our public launch. We got this done incredibly quickly, really in no small part thanks to having a lot of incredible materials from a data and modelling perspective to start with, and a lot of enthusiasm for the potential impact this could have for our biotech ecosystem and ultimately for accelerating medicines to patients.

**Zahra: That’s remarkably fast for a large pharmaceutical company. The stereotype is that big companies move slowly and are risk-averse. Did you face pushback around potentially exposing Lilly’s models or data?**

**Aliza:** We had exactly what you would expect - the appropriate stage gates to make sure we weren’t going to do something that would expose IP or sensitive information.

Our initial stage gate focused on platform partner selection. We chose Rhino Federated Computing after a thorough due diligence process that included evaluating their information security protocols and assessing the risks associated with data exposure and leakage. We’re putting some of the most sensitive pre-IP data on this platform ourselves, in very large quantities!

Our second stage gate was proving that federated learning could really work the way we thought it could before we invited the whole world to join us.

So, we conducted an internal simulation. Over the years, Lilly has acquired many companies, and the data from those acquisitions hasn’t been systematically integrated into our training sets and models. We identified the primary “Lilly juggernaut” dataset and two other data sources from acquired companies, data that was generated differently and hadn’t been integrated at all. We simulated a system with three federated learning nodes and performed several rounds of federated learning across a variety of models.

We needed to understand whether the model would actually gain in performance, what optimisation and hyper-parameters we would need to consider, and frankly also the user experience of interacting with the platform. Could we do this at scale? Was it just way too complicated? We really proved to ourselves that it would work from both a data science perspective and a usability perspective before we opened it up to early access third-party partners.

**Zahra: What’s in it for Lilly? Beyond the altruistic mission of advancing science, what gaps is Lilly trying to fill internally?**

**Aliza:** We’ve started with use cases where the models are already high performing, but we believe the improvements from the increase in the chemical space and the generalisability of the models will speak for itself.

The primary focus for this initial year is to demonstrate to the ecosystem the inherent value of this core proposition. Moving forward, I’m eager to focus on areas characterised by data scarcity. Specifically, I’m excited to collaborate across the biotech ecosystem to collectively identify the most impactful data and models that are currently missing, which would truly advance our collective capabilities. Our existing infrastructure and user base will then position TuneLab to pursue those goals rapidly.

#### Platform Strategy & Model Selection

**Zahra: How do you select which models to make available on Tune Labs?**

**Aliza:** We have started with models such as small molecule ADMET and antibody developability, with the deliberate choice of focusing on use cases that we feel will be applicable to at least double, if not triple, digit numbers of companies. These are areas within the biotech ecosystem where companies are not typically seeking to differentiate but instead are simply generating data and solving problems empirically.

In contrast, we decided not to start upstream with target discovery, where data sets may be generated for more niche disease areas or sub-indications and where companies often seek to differentiate and may have more apprehension about contributing data. Since there’s a lot less differentiation in the current empirical approach for ADMET and development there’s a very clear measurable gain around time and dollars from a savings perspective that we can deliver if we can replace all of that work with a model.

**Zahra: Would you ever take models from startups instead of data alone?**

**Aliza:** We’re actively exploring that. I’m genuinely excited about creating the opportunity for other companies to use TuneLab as a means for reaching biotechs that might want to use their models.

We recognise that there may be best in class that will not come from Lilly, and we’re open to including them in TuneLab, whether they’re open source or whether they’re a proprietary third-party model.

**Zahra:** **How does TuneLab development interface with Eli Lilly’s main AI development? Are these the same models or different tiers?**

**Aliza:** The simplest answer is they are one and the same. The models that we use internally are the same ones that we’re making available on TuneLab. So there’s no “oh, these are the less performant models, let’s make these available.” No, no - we literally use the same models in our own workflows.

**Zahra:** **How do you think about the future of TuneLab embedding AI models into an iterative workflow, maybe even with agentic reasoning over different models?**

**Aliza:** We’re actively exploring how to incorporate agentic elements into TuneLab. The vision is compelling - imagine an AI agent that can intelligently select and orchestrate different models across a full drug discovery workflow. While that sounds simple, parts of the implementation are quite complex.

The core challenge is this: for an agent to make good decisions about which model to use when, we need rigorous, consistent benchmarking across all available models. Across the industry, we have numerous models that aren’t all benchmarked against standardised datasets in a way that would allow an agent to reliably say “use model A for this task, but model B for that task.” That foundational benchmarking would be hugely enabling.

#### Strategic Partnerships

**Zahra: [Insitro](https://www.insitro.com/) announced a [partnership](https://www.insitro.com/news/insitro-partners-with-lilly-to-build-first-in-kind-machine-learning-models-to-advance-small-molecule-drug-discovery/) with Lilly to develop in vivo ADMET models for TuneLab. Why partner with an external AI company rather than building these models entirely in-house? What does Insitro bring that was unique?**

**Aliza:** While the majority of TuneLab’s models are developed in-house, strategic external partnerships are central to our Catalyze 360 organisation’s mission as Lilly’s external innovation engine. Insitro brings complementary strengths to this collaboration, particularly their pioneering work in high-throughput biology and machine learning integration that generates novel biological insights from massive experimental datasets. Their unique approach to creating disease-relevant cellular models at scale pairs exceptionally well with Lilly’s deep pharmaceutical expertise and rich historical ADMET data. This partnership exemplifies our ‘best of both worlds’ strategy - combining Lilly’s pharmaceutical development excellence with Insitro’s cutting-edge AI/ML capabilities to accelerate innovation beyond what either organisation could achieve independently.

**Zahra: Daphne Koller called** ***in vivo*** **prediction ‘a holy grail.’ What’s the fundamental barrier, and why will this approach work?**

**Aliza:** Molecule design informed by in vivo prediction is a significant goal in drug discovery because biological systems exhibit extraordinary complexity that’s difficult to model computationally - particularly the intricate, multi-organ interactions that determine compound safety and efficacy. The fundamental barrier has been the limited ability to integrate diverse data types across varying experimental scales while capturing the mechanistic relationships between molecular structure and in vivo outcomes.

Our approach addresses this through three critical components. First, we’re leveraging Lilly’s exceptionally large, longitudinally-tracked datasets that follow molecules from *in vitro* assays through progressively complex animal models - creating rich opportunities for transfer learning across these domains. Second, our federated learning architecture allows us to overcome the historical data silos across the industry while protecting proprietary information – meaning that we will be able to continuously improve these models with more data from TuneLab participants. Third, we’re implementing machine learning architectures specifically designed for this purpose. The TuneLab ecosystem provides both the technical infrastructure and collaborative framework to accelerate this work.

#### Data Strategy & Clinical Integration

**Zahra: Lilly has decades of historical research data. How are you balancing the effort to standardise and clean historical data versus creating new, AI-ready experimental data?**

**Aliza:** It depends. On the small molecule ADMET front, we have been using the same protocols for decades. And when a new instrument comes along or a protocol is modified, we clearly mark it in the dataset. Depending on the divergence, we start treating those as different datasets. So these data sets are essentially a dream for machine learning.

For TuneLab more specifically, we are making Lilly’s data generation protocols available to partners. We’re also working towards launching a new feature where we can essentially streamline options to have the data generated with a CRO using a harmonised protocol. That’s something that we’re really excited about offering, because we know that most biotech companies do a lot of outsourcing on these kinds of assays.

**Zahra: You mentioned eventually integrating clinical data. That seems incredibly powerful but also challenging. What’s the vision there?**

**Aliza:** Definitely. It’s something Lilly’s breadth makes uniquely possible. Our Insitro collaboration already bridges *in vitro* and *in vivo* data. The next step is incorporating clinical data, and we’re actively planning how to do that.

We know that *in vitro* and *in vivo* data often fail to predict human outcomes. Clinical data is an important future direction.

**Zahra: What are the biggest challenges with doing that integration?**

**Aliza:** While Eli Lilly has a large clinical dataset (one can see from the number of trials we have running!), clinical trials typically involve testing one molecule on many people. This means the dataset is focused only on the successful molecules that made it to trials. Because molecules are down-selected before they reach the clinic, the clinical datasets also may lack adequate information on what causes a drug to fail in earlier stages. This limits the ease of predicting future failures which is the ultimate goal. Lilly intends to use this clinical data, but we have to work to relate it back to a ‘broader dataset’, which includes all the preclinical, failed and early-stage molecular data. If we can successfully do this, then the model will be able to benefit from the full history of molecular experiments, not just the results of successful clinical trials.

#### Technical Infrastructure & Architecture

**Zahra:** **Can you clarify the relationship between the NVIDIA compute cluster and TuneLab infrastructure?**

**Aliza:** Lilly’s NVIDIA compute cluster and TuneLab will operate as distinct but complementary infrastructure components. The NVIDIA cluster’s immediate priority is building and training our large foundation models, including the initial training of models that will eventually power TuneLab. However, TuneLab’s operational infrastructure is entirely separate, hosted by a third-party provider. This means that while we develop and train the base models on Lilly’s compute resources, all federated learning activities (where partners contribute their data) occur exclusively on the third-party cloud infrastructure, not on Lilly’s internal compute resources.

**Zahra: Despite federated learning, surely models become perfect at the examples they have seen, isn’t that an indirect way to exposure each company’s data?**

**Aliza:** This dynamic is actually central to how federated learning creates value. Yes, models naturally become more performant in chemical spaces where they’ve been trained—that’s the collaborative improvement we’re building toward. This does mean models implicitly reflect the collective focus areas of participating companies, though in an aggregated rather than attributable way.

The fundamental value proposition boils down to a calculation: Can your organisation benefit more from accessing state-of-the-art models trained on ecosystem-wide data, or from keeping your own models and datasets completely siloed? For pre-competitive areas like ADMET and developability, we believe the answer is clear.

#### Market Position & Ecosystem

**Zahra: There have been a lot of scientific consortia emerging - OpenFold, MELLODY, and others. How do you see TuneLab in relation to these?**

**Aliza:** The other consortia are very interesting, and we certainly learned a lot from everything that MELLODY and others have published. These are important foundational pieces of work.

Where we saw a gap and an unmet need was for small companies to benefit, because many of these consortia require contributing a ton of data upfront. We designed TuneLab so that biotech partners could participate, no matter how small or how early.

Just to exemplify that - our value proposition to biotech is: sign up, start using the models, and contribute data back to us within your first year. So you can reap the benefits and don’t have to have your data in hand and generated when you sign up.

**Zahra: How do you see frontier AI labs playing a role in drug discovery?**

**Aliza:** My guess is they will continue to be fantastic across numerous areas of scientific work, such as understanding the latest papers, troubleshooting an assay, or interpreting a result. Frontier labs have also originated many breakthroughs in architectural innovation and cross-domain transfer, which have dramatically advanced the field.

In some areas, they face a critical challenge - lack of proprietary pharmaceutical data of real-world development outcomes and capturing domain-specific know-how that hasn’t been systematically documented. With that in mind, our hypothesis is that industry-specific proprietary data and models will continue to have a place. That said, we all have a common goal and hope to continue collaborating to realise the advancements that will move medicine forward.

#### **Adoption & User Experience**

**Zahra: When onboarding startups to Tune Labs, what’s been the biggest pushback or hesitation?**

**Aliza:** In our first two months post-launch, we’ve seen strong initial interest from hundreds of applicants. However, we’re cautious about over-interpreting early enthusiasm. Currently, we’re prioritising early adopters rather than convincing skeptics, which creates a natural selection bias toward partners who already see the value.

That said, I’ve been pleasantly surprised by how quickly partners grasp federated learning concepts once exposed to them. Any initial hesitation typically stems from unfamiliarity with the approach rather than substantive concerns. Our most compelling selling point has consistently been that Lilly contributes its own data through the identical infrastructure we’re asking partners to use - we’re “walking the walk” alongside them.

**Zahra: You’re taking a page from the SaaS developer playbook. What has that customer co-creation process taught you?**

**Aliza:** It’s yielded incredibly rich feedback, giving us a broad understanding of what people truly want and need, from specific questions about uncertainty predictions and interpretation to broader discussions about constructing effective workflows.

We’ve applied that co-building mindset: “Hey partner, tell us what you wish you had at your fingertips, and we’ll build it together.” Having rich feedback and a big backlog is the best kind of problem to have. We hypothesized product-market fit and an unmet need, but the only real validation comes from putting the product in users’ hands and watching how they respond.

#### Future Vision & Technology Landscape

**Zahra: What futuristic scientific concepts excite you most?**

**Aliza:** My focus is on the practical side of things as a drug hunter. I’m really excited about progress in *de novo* design: being able to factor in more and more parameters until we can basically just design a viable drug candidate from scratch. That would fundamentally transform drug discovery timelines.

We’re not there yet. Current architectures have limitations, they’re better at interpolation than true innovation, and they struggle to capture the full mechanistic complexity of biology. But I believe we have enough capability today to make meaningful progress if we focus on the right problems with sufficient data.

That’s ultimately what TuneLab is about: creating the data infrastructure and collaborative ecosystem to tackle challenges no single organisation can solve alone. I’m less interested in waiting for the next architectural breakthrough and more focused on extracting maximum value from today’s tools to deliver concrete impact—faster cycle times, higher success rates, more efficient development—for patients who are waiting.

**Zahra: Thank you Aliza!**

[1](#footnote-anchor-1)

https://www.lilly.com/about/key-facts

[2](#footnote-anchor-2)

https://investor.lilly.com/news-releases/news-release-details/lilly-reports-full-q4-2024-financial-results-and-provides-2025

[3](#footnote-anchor-3)

https://www.lilly.com/news/stories/new-supercomputer-could-change-future-medicine

\---

*Would you like to contribute to Decoding Bio by writing a guest post? Drop us a note [here](mailto:pablo@decodingbio.com) or chat with us on Twitter: @[decodingbio](https://x.com/decodingbio).*