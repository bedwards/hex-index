---
title: "Solving a 25-year-old genetic puzzle "
author: "Various"
publication: "GWAS Stories"
publication_slug: "gwasstories"
published_at: "2024-05-07T03:38:13.000Z"
source_url: "https://www.gwasstories.com/p/solving-a-25-year-old-genetic-puzzle"
word_count: 1470
estimated_read_time: 8
---

I hope your week is off to a great start! The past few days, I’ve been digging into the Spinocerebellar ataxia type 4 (SCA4) literature, inspired by a new *[Nature](https://www.nature.com/articles/s41588-024-01719-5)* [](https://www.nature.com/articles/s41588-024-01719-5)*[Genetics](https://www.nature.com/articles/s41588-024-01719-5)* [paper](https://www.nature.com/articles/s41588-024-01719-5) on the successful mapping of the causative gene and mutation underlying SCA4. I've read this work last year when it was [preprinted](https://www.medrxiv.org/content/10.1101/2023.10.26.23297560v1) and [tweeted](https://x.com/doctorveera/status/1718849291463037079) about it. I've mentioned this preprint in a couple of my past substack posts in relation to long-read sequencing, and discussed it in the [Genetics podcast](https://podcasts.bcast.fm/e/1836111n-ep-115-the-biggest-stories-of-2023-with-dr-veera-rajagopal-part-2) with Patrick Short. But rereading the paper in its final published form helped me see that there are more interesting things buried in the SCA4 literature, which I didn't notice before.

[

![A creative illustration featuring DNA strands intricately intertwined with symbols associated with Mormon pioneers. The DNA strands are designed to incorporate motifs such as wagon wheels, oxen, and other symbols of journey and hardship. These elements reflect the pioneer spirit, emphasizing the connection between heritage and the biological essence carried in DNA. The overall aesthetic is detailed and artistic, merging historical themes with a scientific concept.](https://substackcdn.com/image/fetch/$s_!UOFn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4fc48d09-2360-495c-9c7c-4c82a3720163_1024x1024.webp "A creative illustration featuring DNA strands intricately intertwined with symbols associated with Mormon pioneers. The DNA strands are designed to incorporate motifs such as wagon wheels, oxen, and other symbols of journey and hardship. These elements reflect the pioneer spirit, emphasizing the connection between heritage and the biological essence carried in DNA. The overall aesthetic is detailed and artistic, merging historical themes with a scientific concept.")



](https://substackcdn.com/image/fetch/$s_!UOFn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4fc48d09-2360-495c-9c7c-4c82a3720163_1024x1024.webp)
*DNA embedded with symbols of 19th century Mormon Pioneers as imagined by DALL-E*

My interest in the repeat expansion-related neurodegenerative diseases has been growing recently, as there are currently many active efforts in the field to develop therapeutics for these conditions. With the recent advancements such as long-read sequencing, single-cell sequencing etc., researchers are beginning to understand the molecular mechanisms underlying neurodegeneration (for example, cell type specific somatic expansions of repeats and how they kill the striatal neurons in Huntington's disease) and ways to prevent them (for example, targeting DNA repair genes to halt the pathological repeat expansion). So, I might be digging more into the repeat-expansion literature in the near future.

The fact about SCA4 that caught my attention was that its cause remained a mystery for more than 25 years due to high complexity of the SCA4 locus (16q22.1), and then long-read sequencing technology helped scientists to identify the disease gene (*ZFHX3*) and mutation (expanded GGC repeats). But there is more to the story.

[

![](https://substackcdn.com/image/fetch/$s_!RS5c!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6894265-c54c-4aac-9804-74df7e5d78fc_1624x1366.png)



](https://substackcdn.com/image/fetch/$s_!RS5c!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6894265-c54c-4aac-9804-74df7e5d78fc_1624x1366.png)
*Fig 1c from Figueroa, Gross, Buena-Atienza, et al. *Nat Gen 2024**

At least four independent groups have successfully mapped the GGC repeat expansion in *ZFHX3* to SCA4: [one](https://www.nature.com/articles/s41588-024-01719-5) group from the University of Utah (where the index family was first documented in 1994, the linkage to 16q22.1 was [mapped](https://pubmed.ncbi.nlm.nih.gov/8755926/) in 1996, and the ataxia was officially labelled as type 4), two groups from Sweden ([one](https://pubmed.ncbi.nlm.nih.gov/38035881/) from the Lund University and the [other](https://www.medrxiv.org/content/10.1101/2023.10.03.23296230v1) from Karolinska Institute) where the pathogenic mutation was believed to be born in some family in Southern Sweden, possibly in the early 19th century. And the [last group](https://pubmed.ncbi.nlm.nih.gov/38197134/) of researchers were from University College London and University of California.

Amazing, isn't it? After the initial linkage report in 1996, the SCA4 disease remained unsolved for decades and then boom!, suddenly four research groups (maybe there’s more, who knows) are deciphering the mystery. The interesting fact is not all the groups solved the case using long-read sequencing; two groups caught the GGC repeat just using short-reads. Particularly, the [Swedish researchers](https://pubmed.ncbi.nlm.nih.gov/38035881/) had the advantage of studying multiple families descended from the founder, thereby able to narrow down the disease region using identity by descent (IBD) analysis from an initial 1.64 Mbp segment to a final 111 Kbp segment covering the very last exon of the *ZFHX3* gene containing the microsatellite. Note, the ZFHX3 is a huge gene, encoding a protein of length 3703 amino acids; the start and end coordinates span more than 1 Mbp, and there are 760 naturally occurring microsatellites spread across the gene! Narrowing the disease locus using IBD analysis helped the Swedish team to zero in on the culprit. However, long-read sequencing played an important role in all the four research groups' work. It helped validate the repeat expansion and appreciate an important difference (apart from the length) in the repeat sequences between cases and controls. While the normal length repeats (between 20-26) were randomly interrupted by either synonymous or non-synonymous SNVs, expanded pathogenic repeats (>45) had no such interruptions at all. It's just GGC, GGC, GGC all the way.

[

![](https://substackcdn.com/image/fetch/$s_!wnPu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F515c9dac-3930-4a64-a28d-c3314e2bb259_2318x968.png)



](https://substackcdn.com/image/fetch/$s_!wnPu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F515c9dac-3930-4a64-a28d-c3314e2bb259_2318x968.png)
*Fig 2 from Wallenius et al. *AJHG 2024**

The SNV interruptions is what seem to be preventing this microsatellite from ballooning generation after generation in the general population. This makes me wonder if simply breaking the GGC monotony in the genomes of cerebellar neurons by some means, perhaps, gene editing one or two single base pairs, will help halt the disease progression. We are nowhere near gene editing the neurons in the brain, but if in the near future CRISPR or prime editors hit the brain, would such an approach help? I guess, it will make sense only if the disease pathology is due to somatic expansions of the GGC repeat, as seen in Huntington's. I don't think anyone has looked into it so far. Hopefully, someone will eventually do.

The other fascinating thing about SCA4 is its locus—16q22. This genomic region is extraordinarily complex, filled with many microsatellites, segmental duplications, pseudogenes etc. That is why it was challenging to discover the causative gene and mutation initially. The research group from UCL ([Chen and Gustavsson et al.](https://pubmed.ncbi.nlm.nih.gov/38197134/)) writes in their report in *Movement Disorders*, "we found that the 16q22.1 region harbors the largest number of naturally occurring STRs (short tandem repeats) and naturally occurring GGC repeats compared to all other chromosomal regions, when normalized for size". Below is the density of STRs in 16q22.1 compared against rest of the genome.

[

![](https://substackcdn.com/image/fetch/$s_!mJSf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F772d7b16-1165-468b-8655-0cb3fa93336b_2354x1290.png)



](https://substackcdn.com/image/fetch/$s_!mJSf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F772d7b16-1165-468b-8655-0cb3fa93336b_2354x1290.png)
*Fig. 2 from Chen and Gustavsson et al. *Mov Disord* 2024*

It turns out that *ZFHX3* is not the only ataxia gene sitting in the 16q22.1 region. At least two other ataxia genes were identified in this locus. After the initial linkage report of 16q22.1 locus to SCA4 in 1996, there were similar linkage reports in ataxia families in Southern Sweden, Northern Germany, Japan, China and India, all mapped to chromosome 16q22. The ataxia in the [Japanese families](https://pubmed.ncbi.nlm.nih.gov/19878914/) was found to be caused by pentanucleotide repeat expansion in *BEAN1*, and the ataxia in [Chinese families](https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.29412) was found to be caused by CAG repeat (the classic polyglutamine repeat) in *THAP11*. The families in the Sweden were affected by the same mutation (GGC repeat in SFHX3) as the index family from Utah (who were actually immigrants from Sweden). The ataxia in the [German families](https://link.springer.com/article/10.1007/s00415-005-0892-y) was phenotypically similar to SCA4, but I am not sure if the causative mutation was identified yet. If so, it would indicate an independent origin of ZFHX3 mutation, because the rest of all the SCA4 families appear to descend from a single founder, who may have lived in Southern Sweden sometime around the early 19th century. So far, it looks like SCA4 is private to this Swedish extended pedigree, who has been branching their family tree for over 200 years. Cerebellar ataxia with sensory involvement in a patient with Scandinavian ancestry, GGC repeat in *ZFHX3* should be first suspect.

At the molecular level, the cerebellar neurons from postmortem tissue of deceased SCA4 patients show intranuclear inclusion bodies. This makes SCA4 officially a member of intranuclear inclusion diseases caused by repeat-expansions, which include

\- Neuronal intranuclear inclusion disease (NIID) (caused by GGC repeat in *NOTCHNLC*),

\- Fragile X-associated tremor-ataxia syndrome (FXTAS) (caused by CGG repeat expansion in *FMR1* in the 'premutation' range, typically 55–200 repeats)

\- Oculopharyngeal muscular dystrophy (OPMD) (caused by GCG repeat expansion in *PABPN1*)

The important characteristic that differentiates SCA4 from these intranuclear inclusion diseases is the relatively smaller repeat size and location of the repeat within an exon.

In the Nature Genetics paper, the research team from Utah (Figueroa, Gross, Buena-Atienza, et al.) report, in addition to intranuclear inclusions, the neurons from SCA4 patients also show signs of abnormal autophagy reminiscent of that seen in the well recognized SCA2 (caused by CAG repeats in ATXN2) and TDP-43 proteinopathies (ALS and frontotemporal dementia). In SCA4 patient-derived fibroblasts and iPSCs, the authors demonstrate cellular markers of reduced autophagy, including elevated wild-type ATXN2 (which is known to directly interact with proteins involved in autophagy). ATXN2 is already being explored as a common target for SCA2 and ALS. [ATXN2 antisense oligonucleotides (ASOs)](https://www.als.org/research/als-research-topics/genetics/antisense-therapy-for-als) are already being tested in clinical trials for the treatment of ALS. The authors speculate if the SCA4 could be another indication for ATXN2 ASOs.

Overall, I find the SCA4 story extremely fascinating. An unlucky Swede from the early 19th century born with a pathogenic mutation in ZFHX3 has left a legacy of a mysterious brain illness that will haunt many of his/her descendants for the next 200 years and even more. Fate would have it that one of those families will [leave Sweden](https://www.uen.org/utah_history_encyclopedia/s/SWEDISH_IMMIGRANTS_IN_UTAH.shtml#:~:text=Forsgren%20escorted%20the%20first%20large,to%20Box%20Elder%20County%20as), travel across the world and settle in Utah in the United States, revealing to the local neurologists their brain disease in the 1990s. Their DNA and the blood cell lines would sit on the lab shelves in the University of Utah, hiding a secret that would not come to light for another 25 years. Who knows how many more years it will take for a treatment to emerge that will finally undo the curse of this unfortunate Swedish pedigree.

\---

[

![](https://substackcdn.com/image/fetch/$s_!GMDg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)



](https://substackcdn.com/image/fetch/$s_!GMDg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)