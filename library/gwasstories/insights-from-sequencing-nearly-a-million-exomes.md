---
title: "Insights from sequencing nearly a million exomes "
author: "Various"
publication: "GWAS Stories"
publication_slug: "gwasstories"
published_at: "2024-05-25T18:19:36.000Z"
source_url: "https://www.gwasstories.com/p/insights-from-sequencing-nearly-a"
word_count: 1347
estimated_read_time: 7
---

Happy Saturday! My colleagues at the Regeneron Genetics Center (RGC) recently published an important paper in *[Nature](https://www.nature.com/articles/s41586-024-07556-0?utm_medium=Social&utm_campaign=nature&utm_source=Twitter#Echobox=1716301986)*, describing an analysis of exome sequencing data of nearly one million humans (n=983,578). The impressive part of this work is the exomes were combined to perform variant calling in a single dataset. It was not an easy task, as it involves many technical and computational challenges. My colleague [Suganthi Balasubramanian](https://www.linkedin.com/posts/suganthi-balasubramanian-367a2611_i-am-delighted-to-share-that-the-rgc-million-activity-7198669116956626944-43Mm?utm_source=share&utm_medium=member_desktop) and her computational biology team, who main led this work at the RGC, accomplished it elegantly. I wrote a [Twitter post](https://x.com/doctorveera/status/1792761688338432030) on Monday, summarizing the major findings, which I am sharing it here with some additional thoughts.

Whenever I read a new genetics paper, I travel back in time and glance through old papers on the same topic to appreciate what was known back then and how the knowledge has evolved over time. It gives some important perspective to appreciate the value of current work.

Tracing through large-scale exome sequencing studies in the literature, I found a *[Science](https://www.science.org/doi/10.1126/science.1219240)* [paper](https://www.science.org/doi/10.1126/science.1219240) from 2012 on the National Heart Lung and Brain Institute (NHLBI) Exome Sequencing Project. It was based on whole exome sequencing data of 2,440 humans, which is 0.25% of the current sample size. Just in a span of 12 years, we have been able to scale the sample size by 400-fold, thanks to the exponentially decreased sequencing cost over the past decade and large-scale investment in human genetics by large biotech companies like Regeneron.

Sequencing 2,440 participants, the NHLBI team have identified ~500,000 single nucleotide variants (SNVs). Our genome is approximately 3 billion base pairs long, ~1% of which, that is, 30 million base pairs, is typically captured by whole exome sequencing. So, in 2012, researchers were able to capture, on average, one spelling error per 60 base pairs. You’ll be impressed to find how these statistics have changed now with the sequencing of ~980k humans.

[

![A mosaic tile design composed of millions of human silhouettes forming the shape of a right-handed DNA double helix. The silhouettes are intricately detailed and packed closely together, but with desaturated colors to create a more subdued and monochromatic appearance. The DNA shape is clearly recognizable with its helical structure and twisting ladder. The background is a contrasting shade of gray to make the DNA structure stand out, enhancing the overall intricate and refined appearance of the mosaic tile.](https://substackcdn.com/image/fetch/$s_!KJ1v!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2b08f029-06d3-42e6-af86-6d4163613a1a_1024x1024.webp "A mosaic tile design composed of millions of human silhouettes forming the shape of a right-handed DNA double helix. The silhouettes are intricately detailed and packed closely together, but with desaturated colors to create a more subdued and monochromatic appearance. The DNA shape is clearly recognizable with its helical structure and twisting ladder. The background is a contrasting shade of gray to make the DNA structure stand out, enhancing the overall intricate and refined appearance of the mosaic tile.")



](https://substackcdn.com/image/fetch/$s_!KJ1v!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2b08f029-06d3-42e6-af86-6d4163613a1a_1024x1024.webp)
*One million humans silhouettes tiled in a shape of a DNA, as imagined by DALL-E*

#### Background of RGC

Regeneron Genetics Center (RGC) was established in 2014 just on time when major pharma companies started entering into the human genomics playfield. Last year, RGC celebrated its 10th year anniversary. I've [written](https://x.com/doctorveera/status/1718412883342569489) about the origin story of RGC before. ​

The business model of RGC is simple and efficient. It collaborates with academic institutions across the world and provide sequencing as free service in exchange for access to genotypic and phenotypic data.

The first successful collaboration was made with Geisinger Health system (GHS) to sequence 100,000 individuals, which was soon followed by an avalanche of large collaborations. Some of our largest collaborators include UK Biobank (N=500k), GHS (N=175k) and Mexico City Prospective Study (N=150k). Today, RGC has more than 300 collaborations around the world. Just a few months ago, it surpassed the milestone of 2 million exomes. What is described in the current paper is only a fraction of that sample.

#### Diversity of samples

The ~980k exome dataset come from a diverse set of samples. 23% (n=190k) of the participants are of non-European ancestries, the largest proportion to date for any similar datasets created so far. This includes both outbred populations and special populations enriched with communities with long-standing cultural history consanguineous and endogamous unions.

[

![Image](https://substackcdn.com/image/fetch/$s_!6DPj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cff33d8-6f80-46b9-8fd7-a2bb7805eafa_1582x1030.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!6DPj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cff33d8-6f80-46b9-8fd7-a2bb7805eafa_1582x1030.jpeg)

When it comes to human genetics, diversity is the key to making discoveries. Almost everyone agrees, and the field is embracing it now. But RGC is way ahead of the game. Just a few months ago, RGC partnered with other companies and laid the first foundational stone of what will become in a few years from now the world's largest genomics resource, comprising half a million African Americans and Africans. For more details, refer to my Twitter [post](https://x.com/doctorveera/status/1715884906092306816).

#### Variant survey

Human genome is ~3 billion base pairs long. ~1% of which (~30 million base pairs), containing exons, is targeted by exome sequencing. By sequencing 980k exomes, the authors have captured ~16.5 million unique variants. That is, on average, one per every two base pairs across the exome.

The main goal of concentrating on exomes is to capture deleterious spelling errors in the genome, resulting in either loss or substantial decrease or, sometimes, increase in gene function. The authors have identified:

-   ~1.1 million predicted loss of function variants (pLOFs), ~50% of which are singletons (that is, seen in just one individual)
    
-   ~10 million missense variants, 40% of which are singletons.
    

As expected, African ancestry groups had more variants (18% more) than any other ancestry group.

#### Footprints of selection

pLOFs in the human genomes are like bullet holes in aircraft returning from war. The genes untouched or rarely hit by the pLOFs are the most critical genes, without which life is probably impossible.

Studying ~980k exomes, the authors have identified ~4000 genes that are depleted of pLOFs, suggesting they are indispensable. Nearly 20% of these genes are not linked to a human disease yet. The current list will inspire many Mendelian discoveries in the near future.

Notably, around 1000 genes that couldn't be assessed for mutational constraints previously because of short length could be assessed now because of larger sample size. Among them, 86 genes were identified as highly constrained.

#### Regional selection

We have 10 times more missense variants than pLOFs, which means, by using the missense variant distribution, we can quantify mutational constraints not just for a whole gene, but also for parts of it. We can now zoom into within genes and study which parts of a gene are indispensable and which parts aren't.

Not all parts of a protein are critical, but some parts are. For example, DNA binding regions of transcription factor protein, catalytic sites of an enzyme protein, transmembrane domains that forms the pore of channel proteins etc. With a knowledge of ~10 million missense variants from 980,000 humans, such critical regions are now starting to light up, illuminating the most crucial regions of proteins. For example, here is a trace of missense tolerance across different domains of cancer gene *KRAS*. Human genetics shows that the first 80 amino acids as the most critical region of *KRAS*, falling under the top 1 percentile of regional missense constrain metric.

[

![Image](https://substackcdn.com/image/fetch/$s_!rLPB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92059056-5673-4e93-8643-a9c7537f75b9_2192x502.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!rLPB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92059056-5673-4e93-8643-a9c7537f75b9_2192x502.jpeg)

#### Human knockouts

The function of a gene in an organism is understood, typically, by studying the phenotypic consequences of deleting the gene. We cannot do such experiments in humans. But fortunately, Nature has already done this mutagenesis experiments for us. By studying naturally occurring human knockouts, we can assess the consequences of completely inhibiting a gene. This is crucial data for drug developers, as it informs about safety of drugs that act by inhibiting a gene or its product.

[

![Image](https://substackcdn.com/image/fetch/$s_!FT0U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F440f0f86-c475-4d2d-9537-17271ccdc29a_1530x950.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!FT0U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F440f0f86-c475-4d2d-9537-17271ccdc29a_1530x950.jpeg)

Studying the pLOFs across 980k humans, the authors have found 4,686 genes with at least one human knockout, suggesting that a life without these genes is likely possible. In line with that, the authors find that these genes are the ones that were mutationally least constrained (that is, they are enriched for pLOFs). For >1700 genes, we are learning for the first time humans completely lacking these genes do exist in this world. This is an incredible resource for drug development.

#### Clinical genetics insights

One of the most important use case of reference variant databases is to help clinical geneticists to identify disease causing variants in the patients. Historically, variant databases have been biased towards European populations. As a result, clinical geneticists struggle when they study exomes of non-European ancestry patients and often label the suspected variants as variants of unknown significance (VUS), because of a lack of proper reference database.

Cross-referencing the clinvar database with RGC dataset, the authors find European ancestry groups had more variants labelled "pathogenic" in Clinvar than African ancestry groups. Conversely, African ancestry groups had more VUS than European ancestry groups. This is not because Africans are protected from pathogenic variants, but simply reflect current databases are ignorant to clinically important variants in non-European ancestry individuals. With growing diverse databases such as the current one from RGC, the situation will soon change.

#### Conclusion

RGC has created one of the largest reference database for studying human exomes. The implications of this resource are many, spanning all areas of human biology from basic science to drug discovery.

\---

[

![](https://substackcdn.com/image/fetch/$s_!GMDg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)



](https://substackcdn.com/image/fetch/$s_!GMDg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)