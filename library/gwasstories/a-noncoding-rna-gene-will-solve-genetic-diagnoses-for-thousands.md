---
title: "A noncoding RNA gene will solve genetic diagnoses for thousands "
author: "Various"
publication: "GWAS Stories"
publication_slug: "gwasstories"
published_at: "2024-07-13T19:53:07.000Z"
source_url: "https://www.gwasstories.com/p/a-noncoding-rna-gene-will-solve-genetic"
word_count: 1638
estimated_read_time: 9
---

[

![](https://substackcdn.com/image/fetch/$s_!s5fp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1177cd76-d664-413b-a689-620730beec7c_1780x1136.png)



](https://substackcdn.com/image/fetch/$s_!s5fp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1177cd76-d664-413b-a689-620730beec7c_1780x1136.png)
*Custom illustration of an 18 base pair sequence in the human genome, located within a noncoding RNA gene that was recently discovered to be one of the most mutation prone regions in the human genome. Colored letters are sites prone to insertion mutation. The red letter marks the spot where a most recurrent T-insertion mutation was observed. Source: [Chen et al.](https://www.nature.com/articles/s41586-024-07773-7) *[Nature](https://www.nature.com/articles/s41586-024-07773-7)* [2024](https://www.nature.com/articles/s41586-024-07773-7)*

Until I was in academia, I worked within a small group of researchers who all pretty much had the same expertise as I had and so, I was never used to explaining certain genetic concepts during the scientific discussions. This worsened my—what advocates of good writing like Steven Pinker describe as—"curse of knowledge". I only realized this after I started working in industry. In my day job, I communicate genetic results to scientists whose expertise differ drastically from mine. One of the important concepts that I often find myself explaining again and again to my neuroscientist colleagues is “mutational constraint”, that is, why certain genes are depleted of deleterious mutations. We often get requests to check if mutations in a gene is associated with any disease. Being in a neuroscience area, often such genes will be related to brain development and so, will be constrained. As a result, we won't find that many carriers of deleterious mutations, despite having access to a genotype-phenotype database of more than 2 million individuals. Every time, when we deliver the gene look up results, we go through certain basic statistics such as expected vs observed loss of function variants and conclude that the gene is mutationally constrained and so, we couldn't find an enough number of carriers to confidently interpret the phenotypic associations.

Genetics of human brain development has always fascinated me. It is one of those areas of human genetics where you get a first row seat to watch natural selection in action. When I write about papers on Twitter, I never miss an opportunity to share this famous world warplane illustration, while explaining results related to mutational constraint.

[

![undefined](https://substackcdn.com/image/fetch/$s_!RG7u!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8d908cf-01d7-4234-93c8-4e0b835612e8_2560x1908.png "undefined")



](https://substackcdn.com/image/fetch/$s_!RG7u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff8d908cf-01d7-4234-93c8-4e0b835612e8_2560x1908.png)
*Source: Wikipedia [article](https://en.wikipedia.org/wiki/Survivorship_bias) on survivorship bias*

One of the uses of sequencing the general population in large numbers is to predict which parts of the genome are critical for human survival. The logic is that if you see fewer variations in a part of the genome than what you'd expect to see in a sample of, say, 500,000 humans, you infer that that part of the genome is important for survival. Individuals who were born in the past with mutations within that part of the genome had probably not survived. The inspiration behind this logic comes from the famous World War II story of Abraham Wald. Here is how a 2018 paper on mutational constraint begins:

> During World War II, Abraham Wald and the Statistical Research Group optimized the placement of scarce metal reinforcements on Allied planes based on the patterns of bullet holes observed over many sorties. Wald famously invoked the principles of survival bias to infer that armor should be placed where bullet damage was unobserved, since the observed damage came solely from planes that returned from their missions. Wald reasoned that planes that had been shot down likely took on critical damage in such locations.
> 
> Employing similar logic, we sought to identify localized, highly constrained coding regions (CCRs) in the human genome. . .
> 
> [Havrilla et al.](https://www.nature.com/articles/s41588-018-0294-6) *[Nat Gen](https://www.nature.com/articles/s41588-018-0294-6)* [2018](https://www.nature.com/articles/s41588-018-0294-6)

The map of mutational constraint across the genome is critical for interpreting pathogenic variants in patients with neurodevelopmental disorders. Often, clinical geneticists encounter mutations in their patients that were never seen before in any humans sequenced to date. Not even their parents. Such mutations are called private mutations, and if their location map to constrained genomic regions, then they are highly likely to be deleterious in nature. They have likely arisen de novo as a result of some mutational event, either in the sperm from their father or the egg from their mother at some point before fertilization.

A newly born human brings to this world, on average, 70-90 new mutations. The human genome is approximately 3 billion base pairs long, 6 billion when you consider both the pairs of chromosomes. De novo mutations occur at random. Well, not entirely random. I'll come to that in a moment. But for now, let's assume that it is entirely random. So, theoretically, the odds of a particular base pair to get mutated in a random mutation event is 1 in 6 billion. Empirical estimates suggest that each human experience 70 to 90 random mutation events. Using probability calculations, the odds of a particular base pair to get mutated by one of the 70 to 90 mutation events would be 1 in ~85 million to 1 in ~66 million, which is pretty close to the [empirical estimate](https://www.nature.com/articles/nature11396) of 1 in ~83 million (1.2e-8). So, here comes the interesting part. The odds of two individuals to carry a private mutation in the exact same position would be 1.2e-8 x 1.2e-8, which is approximately 1 in 7 quadrillion chance. In other words, theoretically, it is nearly impossible for such events to occur. But what we have learned from sequencing humans in large numbers is that is not entirely true. There are regions in the genome that beat the odds of 1 in 7 quadrillion and display the exact same de novo mutation in two unrelated individuals from different parts of the world.

When the first release of 150,000 UK Biobank whole genome sequences was analyzed by deCODE genetics, the researchers found that around 27.7% of the ~200,000 de novo mutations identified previously in the Icelandic population were also seen in UK Biobank participants. This is not surprising as we know that certain regions of the genome are prone to mutate than other regions due to reasons such as chromatic structure, sequence context etc. But still, chances of more than one individual carrying an identical de novo mutation is extraordinarily rare.

[

![](https://substackcdn.com/image/fetch/$s_!V1tv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F48473339-b288-43f6-9679-5ee760598cfd_1162x236.png)



](https://substackcdn.com/image/fetch/$s_!V1tv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F48473339-b288-43f6-9679-5ee760598cfd_1162x236.png)
*[Link](https://x.com/doctorveera/status/1549969028730462208) to original Tweet*

> . . . These recurrence phenomena have been described in other sample sets using sharing of rare variants between different subsets. We used a de novo mutation set from 2,976 trios in Iceland to assess recurrence directly, as variants present in both that set and the UKB must be derived from at least two mutational events. Out of the 194,687 Icelandic de novo mutations, we found 53,859 (27.7%) in the UKB set, providing a direct observation of sequence variants derived from at least two mutational events. As expected, we found that CpG>TpG mutations are the most enriched mutation class in the overlap, owing to their high mutation rate and saturation in the UKB set.
> 
> [Halldorsson et al.](https://www.nature.com/articles/s41586-022-04965-x) *[Nature](https://www.nature.com/articles/s41586-022-04965-x)* [2022](https://www.nature.com/articles/s41586-022-04965-x)

Okay, now let's calculate the odds of a same de novo mutation to occur in three individuals. That would be 1 in 578 sextillion chance (5.7e-23). Now, let’s calculate the odds of a same de novo mutation to occur in 89 individuals, which would be 1.6e-705, in other words, astronomical. Well, researchers have recently identified a spot in the genome that beats this astronomical odds.

[

![](https://substackcdn.com/image/fetch/$s_!OPUf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76055fb2-feca-499f-9652-7765ffa72840_1164x624.png)



](https://substackcdn.com/image/fetch/$s_!OPUf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76055fb2-feca-499f-9652-7765ffa72840_1164x624.png)
*[Link](https://x.com/nickywhiffin/status/1811420535580201037) to original Tweet*

Analyzing the whole genomes of more than 10,000 individuals with undiagnosed neurodevelopmental disorders, an international team of researchers led by Nicky Whiffin from University of Oxford identified a de novo single base pair insertion variant (n.64\_65insT) in 89 individuals. On further analysis, the authors realized that the insertion mutation sits within an 18 base pair sequence of a noncoding RNA gene that is highly depleted of variants compared to its surrounding region in the healthy population. On the other hand, the same region is enriched for de novo mutations, particularly insertion mutations, in individuals with NDDs. In total, the authors identified 119 NDD patients with a de novo mutation within the 18 base pair region. These estimates suggest that around 0.4% of all NDDs across the world (which would correspond to many thousands of NDD patients) could be explained by de novo mutations in this 18 base pair region, which is a mere 0.0000006% fraction of the full human genome. This makes RNU4-2-related NDD as a separate disease entity of its own. It will be a major disease candidate for drug development by many biotech companies in the next decade.

[

![](https://substackcdn.com/image/fetch/$s_!GIx4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43f25654-8ec9-4061-89cd-5f68e29ecaad_1832x1112.png)



](https://substackcdn.com/image/fetch/$s_!GIx4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43f25654-8ec9-4061-89cd-5f68e29ecaad_1832x1112.png)
*Structure of the U4 snRNA binding to its partner U6 snRNA. The critical 18 base pair region is underlined. Source: [Chen et al.](https://www.nature.com/articles/s41586-024-07773-7) *[Nature](https://www.nature.com/articles/s41586-024-07773-7)* [2024](https://www.nature.com/articles/s41586-024-07773-7)*

If you think about it, there are two opposite forces in action at this 18 base pair region within the RNU4-2 gene. On one side, natural selection at the population level is removing the variant from the gene pool as the carriers likely die early in life and even if they lived beyond the reproductive age, they rarely procreate. On the other side, some other force keeps mutating this spot in humans again and again, putting back the carriers that natural selection has been actively weeding out. It’s a force that is beating the astronomical odds of observing a same de novo mutation in thousands of humans around the world. The question that next needs to be answered is what that mysterious biological force is? There is already a hint.

Among the RNU4-2 mutation carriers, the authors were able to trace in 54 individuals the parent of origin of the de novo mutations, that is, if the mutation event occurred in the sperm or in the ovum. The authors were surprised to find out that in all 54 individuals, the RNU4-2 de novo mutations were maternally derived. This, again, astonishingly beats the expectation of 80% paternal origin. There lies a some fascinating biology behind why female eggs are prone to hyper mutate at this genomic region. Perhaps, loss of RNU4-2 role in gene splicing favors survival of eggs? We will find out soon.

[

![](https://substackcdn.com/image/fetch/$s_!U7mc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F068a51db-5d1f-4c27-a661-71e7f6a7dd75_1174x354.png)



](https://substackcdn.com/image/fetch/$s_!U7mc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F068a51db-5d1f-4c27-a661-71e7f6a7dd75_1174x354.png)
*[Link](https://x.com/nickywhiffin/status/1811420574767632665) to original Tweet*

\---

[

![](https://substackcdn.com/image/fetch/$s_!GMDg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)



](https://substackcdn.com/image/fetch/$s_!GMDg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07b151ef-fc94-43e0-ab3a-1c18f150dd5f_840x832.png)