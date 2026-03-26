---
title: "BioByte 140: Predicting Anti-Cancer Mechanisms of Action with DeepTarget, MOG-DFM Optimizes Therapeutic Peptide Design, and a New Means of Suppressing Inflammation in Autoimmune Diseases "
author: "Pranay Satya"
publication: ""
publication_slug: "decodingbio"
published_at: "2025-11-13T18:44:25.000Z"
source_url: "https://decodingbio.substack.com/p/biobyte-140-predicting-anti-cancer"
word_count: 2789
estimated_read_time: 14
---

*Welcome to [Decoding Bio](https://www.decodingbio.com/)’s BioByte: each week our writing collective highlight notable news—from the latest scientific papers to the latest funding rounds—and everything in between. All in one place.*

[

![](https://substackcdn.com/image/fetch/$s_!Di83!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcedf3fd6-73f0-4bba-872f-ff706f2950c8_1750x1747.jpeg)



](https://substackcdn.com/image/fetch/$s_!Di83!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcedf3fd6-73f0-4bba-872f-ff706f2950c8_1750x1747.jpeg)

Peter van der Doort, *The Alchemist’s Laboratory* (1595) \[from Heinrich Khunrath, *Amphitheatrum sapientiae aeternae*\]

[

![](https://substackcdn.com/image/fetch/$s_!OtrO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc60f4468-bfe6-4949-8b08-dda4d03123fa_9208x816.png)



](https://substackcdn.com/image/fetch/$s_!OtrO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc60f4468-bfe6-4949-8b08-dda4d03123fa_9208x816.png)

*A Note To Our Readers: Following this post, we will be taking a short break from posting, but will be back to regular posting the first week of December. We appreciate your support and stay tuned for more coming soon, Decoders!*

## What we read

#### Blogs

**[Designer Spotlight: Navigating the multi-property maze for therapeutic peptide design](https://www.adaptyvbio.com/blog/mog-dfm/)** \[Adaptyv Bio, *Adaptyv Bio*, November 2025 (based on [original paper](https://www.alphaxiv.org/abs/2505.07086) by Chen et al., *arXiv*, May 2025)\]

Biomolecular design is a multi-objective puzzle – therapeutic peptides face tradeoffs on properties such as affinity, stability, solubility, and safety. Navigating to the frontiers of feasible designs is a challenging task: properties are interdependent and sequence-phenotype relationships are non-linear and epistatic, forming a complex, high-dimensional landscape to traverse. Many generative models optimize for a single score and re-train for each desired objective, yielding a slow, brittle exploration of the design space. MOG-DFM (Multi-Objective Guided Discrete Flow Matching) offers a single pre-trained DFM generator that, at sampling time, can steer token-level proposals toward any user-specified set of objectives. This unlocks the ability to produce diverse, Pareto-tuned candidate sets without retraining for every tradeoff – a compelling capability for teams exploring competing design constraints.

[

![](https://substackcdn.com/image/fetch/$s_!VeG0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2722eab-5ead-4205-b8f5-44bc66d47e7b_1600x569.png)



](https://substackcdn.com/image/fetch/$s_!VeG0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2722eab-5ead-4205-b8f5-44bc66d47e7b_1600x569.png)

The core development is a lightweight, local guidance rule: for each candidate token change, the algorithm computes a hybrid rank (relative candidate ordering on surrogate property predictors) and directional improvement score (expected improvement on the target tradeoff), measuring how a local edit shifts the multi-objective vector. These scores re-weight the DFM token transition rates so the continuous-time Markov chain sampler preferentially proposes beneficial edits. To avoid per-token ‘myopia’ or conflicting edits across multiple properties, the authors introduce an adaptive hypercone: an angular filter that requires proposed moves to lie within a tunable cone around a target objective direction, preserving coordination across tokens while allowing exploration.

The hypercone facilitates coordinated improvements across multiple properties and surpasses classical multi-objective optimization baselines on predicted Pareto fronts (hemolysis, half-life, solubility, binding, non-fouling). In silico, MOG-DFM shifts predicted trade-offs substantially (e.g. lower predicted hemolysis and higher solubility & half-life, while retaining affinity). Adaptyv provides wet-lab validation: of the 24 designed 10-mer peptides that were synthesized, 23 expressed and 6 showed measurable binding (100–400 nanomolar KDs) – an encouraging initial result.

An important caveat remains: the method’s guidance here is dependent on surrogate predictors that have modest performances, and in some cases (e.g. half-life), are trained on small datasets (105 or fewer in certain splits). Practically, MOG-DFM is a generalizable algorithmic advance for multi-objective sequence design. Closing the loop will require larger, blinded syntheses, calibrated uncertainty-aware predictors, and independent replication to ensure surrogate-driven Pareto improvements translate reliably to the bench.

#### Papers

**[DeepTarget predicts anti-cancer mechanisms of action of small molecules by integrating drug and genetic screens](https://www.nature.com/articles/s41698-025-01111-4)** \[Sinha et al., *npj Precision Oncology*, November 2025\]

> **Why it matters:** The exact mechanism of action of many successful drugs is often unknown. However, elucidating these mechanisms is crucial to help choose biomarkers and pave the way for potential combination therapies. Furthermore, current computational structural tools cannot effectively screen the vast chemical space of drugs and targets to validate potential primary and secondary interactions. Sinha et al. introduce DeepTarget, a new computational pipeline that leverages drug response profiles and genomic profiles from CRISPR knockout experiments to predict potential mechanisms of action in cancer. DeepTarget shows promising performance across a range of clinically-related gold-standard benchmark datasets and has some accompanying experiments to validate its predictions. This approach paves the way for alternatives to structure-based modeling paradigms to accelerate drug development and for repurposing in oncology.

Even if a drug is clinically effective, the inherent complexity of biological systems can mean that scientists do not know the exact mechanisms of action (MOA) that make it successful. For example, drugs can be developed through phenotype screens that search for a desired therapeutic effect, a process that does not inherently elucidate the MOAs of different compounds. Additionally, a drug designed to interact with a certain target may also have unknown off-target interactions that are critical to the overall beneficial effects. Finally, it can often be difficult to fully describe the cascade of biomolecular pathways downstream of an initial drug-target interaction, leading to further uncertainty when describing MOAs. While various computational chemistry and structural biology tools are available, the vastness of the chemical and proteomic spaces makes screening all possible drug-target interactions to probe potential MOAs intractable. In this paper, the authors describe DeepTarget (deep referring to “the tool’s comprehensive analysis of drug mechanisms rather than deep learning methodology”), a computational framework that leverages drug viability screens, genetic screens, and omics profiles to predict MOAs of drugs in cancer cells. Based on the idea that single-gene CRISPR-Cas9 knockout experiments can emulate the effect of a direct drug-target interaction and its associated downstream impact, DeepTarget is designed to predict both on-target and off-target effects to “capture both direct and indirect, context dependent mechanisms driving drug efficacy in living cells.”

[

![](https://substackcdn.com/image/fetch/$s_!rDY_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9bbc8c2-d74c-4050-bce5-57aeaab0e82a_1600x1030.png)



](https://substackcdn.com/image/fetch/$s_!rDY_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9bbc8c2-d74c-4050-bce5-57aeaab0e82a_1600x1030.png)

DeepTarget uses three different data modalities to build towards a prediction, specifically drug response profiles, genome-wide CRISPR-knockout viability profiles, and omics data for wild-type and mutated conditions. These three modalities also form the basis of the tools’s three-step pipeline which begins with the primary target identification step, where the model searches for the main protein targets of a given anti-cancer drug. This search is done by computing a Drug-KO Similarity (DKS) score which is simply the Pearson correlation between drug response profiles and genetic profiles in the same cell line. Using this approach, the authors were able to show that UMAP projections of nearly 1500 drugs seemed to cluster based on known mechanisms of action (inhibition of certain receptors, kinases, etc.). The second goal of the pipeline revolves around context-specific secondary target prediction, which evaluates drug effects in the absence of the primary target. This step is meant to study drug mechanisms in different cell-contexts and handle alternative mechanisms of action. The authors found that DeepTarget recovered two main modes of secondary targets - those that contributed to effectiveness even when the primary target was present and those that did so in their absence. The latter was found by computing “Secondary DKS Scores” to measure effects in “restricted cellular context” situations. Finally, DeepTarget predicts a drug’s preference for binding wild-type or mutated versions of its intended target. Specifically, the model uses a “mutant-specificity score” which measures the difference between DKS scores of a drug profile and the genomic profiles of wild-type and mutated cell-lines. The authors reason that a drug with a preference for a mutated target would have higher DKS scores with the mutated cell-line profile and vice versa. To distinguish between predictions of direct and secondary targets, DeepTarget is augmented with post-filtering steps and pathway-enrichment analyses to narrow down likely direct targets and “\[provide\] a systems-level view of the drug’s mechanism.”

To validate the model, the authors first conducted a primary target identification benchmark across eight gold-standard datasets, where DeepTarget’s mean AUC of 0.73 significantly outperformed structure-based tools like RosettaFold and Chai-1. A second computational test confirmed the tool’s ability to identify known secondary targets with high accuracy (AUC 0.92); the authors then experimentally validated some of these predictions by successfully confirming EGFR as a secondary target of Ibrutinib in BTK-low cells. DeepTarget was also able to predict mutation-specificity, achieving an average AUC of 0.78 in distinguishing known mutant-specific inhibitors from wild-type targeting drugs.For more disease-specific validation, DeepTarget was used to predict the anti-cancer mechanism of the anti-malarial drug pyrimethamine and identified genes in the mitochondrial oxidative phosphorylation system, which was experimentally validated by separate genome-wide CRISPR-Cas9 chemogenomic screen data. Finally, the authors applied DeepTarget to 140 FDA-approved cancer drugs, where they found that the known target was ranked first in a genome-wide test in 50% of cases. Additionally, analysis of predictions across different drug classes showed that the known targets of approved targeted therapies showed significantly stronger enrichment in top-ranked predictions compared to chemotherapy or non-cancer drugs.

In summary, DeepTarget shows strong performance across multiple gold-standard clinically derived data. However, the authors note that there are certain circumstances where structure-based tools may be preferred, specifically when high-resolution structures are available for well-characterized targets. However, DeepTarget’s ability to leverage functional genomics data and operate across various cell-contexts is helpful for situations where such information is not available. In terms of future directions, the authors point to the inclusion of information beyond simple cell viability phenotypes such as immune modulation and differentiation data. Additionally, DeepTarget struggles on certain target classes like GPCRs, nuclear receptors, and ion channels. It is likely that approaches like DeepTarget will improve as the availability of drug profiles and genomic information for more cell lines becomes available, thus hopefully paving the way for eventual integration into pharmaceutical drug development pipelines.

**[The anti-inflammatory activity of IgG is enhanced by co-engagement of type I and II Fc receptors](https://www.science.org/doi/10.1126/science.adv2927)** \[Jones et al., *Science*, November 2025\]

> **Why it matters:** IVIG is one of the few broadly effective, clinically validated treatments for autoimmune disease, but it depends on pooled human plasma and gram-per-kilogram dosing, making it expensive. Researchers from the Ravetch group at Rockefeller University build on a growing body of evidence that the key therapeutic effect of IVIG runs through a specific sialylated Fc → FcγRIIB/DC-SIGN inhibitory pathway. By directly engineering an Fc domain that hyper-engages this pathway, they achieve IVIG-level immunosuppression at up to 100× lower doses, bringing us one step closer toward a future where this autoimmune therapy can be mass-manufactured.

In many autoimmune diseases, the central problem is straightforward: patients generate IgG antibodies that bind their own tissues and trigger destructive inflammatory cascades through Fcγ receptors and complement. One of the major clinical tools we have is intravenous immunoglobulin (IVIG), which essentially overwhelms the system with pooled human IgG to dampen inflammation through a blend of mechanisms—competition for activating FcγRs, interference with FcRn recycling, complement modulation, anti-idiotypic interactions, and engagement of inhibitory pathways. IVIG works, but it’s expensive, requires gram-per-kilogram dosing, and depends entirely on donor plasma. A key open question has been which specific receptor interactions are actually necessary for its immunomodulatory effect, and whether a more focused recombinant molecule could accomplish the same job at much lower doses.

Earlier work from the Ravetch group suggested that one of the core drivers of IVIG activity is the sialylated IgG Fc fragment (sFc), which can suppress inflammation in mouse models at far lower quantities than full IVIG. This study takes the next step: clarify the exact mechanism and engineer improved versions. The authors use FcγR-humanized mice which express the human Fcγ receptor repertoire on a murine immune background. In a serum-transfer arthritis model, they show that both IVIG and a recombinantly produced sialylated Fc fragment reduce inflammation, and critically, that sialylation of the N297 glycan is required. They generate these sFc molecules in HEK293-F cells while co-expressing B4GALT1 and ST6GAL1, ensuring that the native N297 glycan is fully galactosylated and α2,6-sialylated—the modifications needed for productive engagement of the inhibitory receptor FcγRIIB.

[

![](https://substackcdn.com/image/fetch/$s_!LZpB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fabd670f1-f8df-4e25-a97f-f75441933b76_1476x810.png)



](https://substackcdn.com/image/fetch/$s_!LZpB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fabd670f1-f8df-4e25-a97f-f75441933b76_1476x810.png)

The key advance comes from dissecting the role of type II Fc receptors, particularly SIGN-R1 (the mouse homolog of DC-SIGN). Blocking SIGN-R1 completely eliminates sFc activity, indicating that sFc requires coordinated engagement of both type I (FcγRIIB) and type II (DC-SIGN/SIGN-R1) receptors. The authors go on to show a direct, glycan-dependent interaction between DC-SIGN and FcγRIIB that boosts FcγRIIB surface expression and its ability to bind sialylated IgG. With this mechanistic map in hand, they rationally engineer the V11 Fc variant, which binds FcγRIIB with ~37-fold higher affinity. Their new V11 sFc suppresses arthritis and neuroinflammation in the mouse model at roughly 10 mg/kg, matching the efficacy of 1 g/kg IVIG while preserving endogenous IgG levels. With these results in mind, let’s cheer them on as we see if these results still hold in the clinic (in humans)!

## Notable deals

-   **[Iambic Therapeutics raised over $100M in their oversubscribed Series B.](https://www.iambic.ai/post/iambic-raises-over-100-million)** The funds will be used to not only advance the company’s physics-informed AI platform but also to bring two additional programs into the clinic. Both IAM-C1—their small molecule, selective dual inhibitor of CDK 2 and CDK4—and their allosteric KIF18A inhibitor are currently in IND-enabling though are expected to be in trials sometime during 2026. The announcement of the raise is hot on the heels of the presentation of Iambic’s first clinical readout from IAM1363, an irreversible tyrosine kinase inhibitor (TKI) that selectively targets HER2 and HER2 mutants. In its Phase I trial, the drug has so far demonstrated anti-tumor activity and a favorable safety profile. Investors in the round included Abingworth, Alexandria Venture Investments, Alumni Ventures, Illumina Ventures, Mubadala, Regeneron Ventures, Sequoia, and Wilson Sonsini Goodrich & Rosati among others.
    
-   **[Synchron raised a $308M Series D led by DoublePoint Ventures.](https://www.forbes.com.au/covers/innovation/synchron-raises-308m-to-leapfrog-neuralink-with-54m-from-nrf/)** The fierce Neuralink competitor plans to use these funds for finishing out clinical trials and commercialization of its brain computer interface (BCI), Stentrode, an implant which obtains neural connectivity to the motor cortex via a catheter through the jugular vein, enabling paralyzed patients the ability to use computers and other devices by thought. The approach is far less invasive than others in the space such as Neuralink which require implanting through the skull and [Synchron](https://synchron.com/) has consistently beat Neuralink on key milestones, such as successfully implanting the device in patients five years before its competitor with only a quarter of the funding. While the BCI competition remains fierce, founder Tom Oxley hinted at some exciting developments in his company’s favor to likely be announced in late 2026. The financing from this round will also enable the development of a next generation device which will involve implantation of sensors into other brain regions while maintaining the same noninvasive blood vessel implantation route. The Series D brings Synchron’s total raised to $345M, bringing the company’s valuation to an impressive $1.3B and also heralds their return to Australia (where the company was originally founded) due to the sizable participation of the Australian National Reconstruction Fund (NRF). Others participating in the round include: T.Rx Capital, Qatar Investment Authority (QIA), K5 Global, Protocol Labs and IQT with participation from existing investors ARCH Ventures, Khosla Ventures, Bezos Expeditions, NTI and METIS.
    

-   **[Accipiter Bio emerged from stealth with a $12.7M seed round co-led by Flying Fish Partners and Takeda.](https://www.geekwire.com/2025/seattle-startup-accipiter-bio-emerges-with-12-7m-and-big-pharma-deals-for-ai-designed-proteins/)** The spinout from David Baker’s lab at the University of Washington is seeking to engineer de novo proteins using AI to bind to multiple cellular targets simultaneously, in efforts to create a singular, multifunctional drug. In addition to increasing potential therapeutic impact, this approach also enables a more efficient and less costly clinical trials process in comparison to distinct drugs used in combination to treat certain conditions—as is frequent practice in many oncology indications—which require three separate Phase I trials. [Accipiter](https://accipiterbio.com/) also already announced two pharma partnerships: the first with Pfizer, offering a collaboration and license agreement to research and engineer new molecules with $330M in milestone payments in addition to the undisclosed upfront sum; the second with Kite Pharma to design proteins for cell therapies which Kite will have the option to acquire for global development. The company additionally has four pre-IND drug development programs of its own, reportedly targeting certain cancers, IBS, and more. Other investors in the seed round include: Columbus Venture Partners, Cercano Capital, Washington Research Foundation, Alexandria Investments, Pack Ventures and Argonautic Ventures.
    
-   **[Boston-based Beacon Biosignals raised $86M for their Series B in a round led by Innoviva.](https://endpoints.news/exclusive-beacon-biosignals-raises-86m-to-build-and-mine-brain-data-trove/)** Beacon’s portable EEG technology seeks to provide improved metrics with which to quantify the effects of drugs on the brain, negating the need to rely on subjective measurements, such as how the patient feels, which are so often rife in the treatment of neurological disorders. Current methods to collect EEG data necessitate the patient to sleep in a lab, a setting which is not conducive to monitoring a person’s normal state over a long period of time. With the data they are able to generate from more consistent monitoring, the company also aspires to create AI-based diagnostic tools for a wide range of neurological disorders. Implementation of their tech in clinical trials has already gained traction, with use in 28 trials already—including seven Phase 3 studies—across several indications. The fundraise, which brings the total raised to more than $121M, included other investors such as GV and Nexus NeuroTech Ventures.
    

[

![](https://substackcdn.com/image/fetch/$s_!b1Cz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcea29e90-216f-417e-a013-12aa91e01e53_9208x816.png)



](https://substackcdn.com/image/fetch/$s_!b1Cz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcea29e90-216f-417e-a013-12aa91e01e53_9208x816.png)

## In case you missed it

[The Chan Zuckerberg Institute launches Biohub](https://biohub.org/blog/frontier-ai-biology-initiative/)

[Making a Default-alive Techbio Company](https://ankitg.me/blog/2025/08/27/making-a-default-alive-techbio-company.html)

## What we liked on socials channels

[

![](https://substackcdn.com/image/fetch/$s_!N6AH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5b69c997-b0c5-493d-bde1-7aa011db157a_1004x920.png)



](https://x.com/BockLab/status/1988222273158082920)

[

![](https://substackcdn.com/image/fetch/$s_!ENVg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7c5d1cd-b21d-439d-a0ce-4fd83520fc8b_586x1398.png)



](https://x.com/bravo_abad/status/1988288344204157204)

[

![](https://substackcdn.com/image/fetch/$s_!0fi2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F56c12b58-d1de-4568-9994-bcf70e0d8a69_928x774.png)



](https://www.linkedin.com/feed/)

## Events

[

![](https://substackcdn.com/image/fetch/$s_!Vtbm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9db0ac10-05c1-41ee-bad7-0d7170b65a85_800x800.avif)



](https://luma.com/je6d16sy)

Final reminder for last minute joiners for our Boston meetup next week—don’t miss it! Sign up [here](https://luma.com/je6d16sy).

## Field Trip

\---

*Did we miss anything? Would you like to contribute to Decoding Bio by writing a guest post? Drop us a note [here](mailto:pablo@decodingbio.com) or chat with us on Twitter: @[decodingbio](https://x.com/decodingbio).*