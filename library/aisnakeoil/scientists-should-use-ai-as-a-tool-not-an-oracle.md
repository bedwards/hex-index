---
title: "Scientists should use AI as a tool, not an oracle"
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-06-03T18:34:13.000Z"
source_url: "https://www.normaltech.ai/p/scientists-should-use-ai-as-a-tool"
word_count: 1755
estimated_read_time: 9
---

Who produces AI hype? As we discuss in the AI Snake Oil [book](https://www.aisnakeoil.com/p/ai-snake-oil-is-now-available-to), it is not just companies and the media but also AI researchers. For example, a pair of widely-publicized papers in Nature in December 2023 claimed to have [discovered](https://www.nature.com/articles/s41586-023-06735-9) over 2.2 million new materials using AI, and robotically [synthesized](https://www.nature.com/articles/s41586-023-06734-w) 41 of them. Unfortunately, the claims were [quickly](https://chemrxiv.org/engage/chemrxiv/article-details/65957d349138d231611ad8f7) [debunked](https://x.com/Robert_Palgrave/status/1744383965270581615): “Most of the \[41\] materials produced were misidentified, and the rest were already known”. As for the large dataset, examining a sample of 250 compounds showed that it was [mostly junk](https://pubs.acs.org/doi/10.1021/acs.chemmater.4c00643).

A core selling point of machine learning is discovery without understanding, which is why errors are particularly common in machine-learning-based science. Three years ago, we [compiled evidence](https://reproducible.cs.princeton.edu/) revealing that an error called leakage — the machine learning version of teaching to the test — was pervasive, affecting hundreds of papers from 17 disciplines. Since then, we have been trying to understand the problem better and devise solutions. 

This post presents an update. In short, we think things will get worse before they get better, although there are glimmers of hope on the horizon. 

**The carnage continues**

In our most recent compilation, the number of disciplines where researchers have [uncovered leakage](https://reproducible.cs.princeton.edu/#rep-failures) in published work has reached 30. The majority are medical fields, which we strongly suspect is due to the fact that since errors in medical research can be particularly consequential, medical fields seem to put much more effort into establishing best practices and critically reviewing previously published work. About 650 papers across all fields are affected, which we hypothesize is a vast underestimate — when researchers look for leakage systematically, in many fields they find that the *majority* of sampled studies commit the error of leakage.

Leakage is one of many reasons for reproducibility failures. There are widespread [shortcomings](https://reforms.cs.princeton.edu/appendix3.html) in every step of ML-based science, from data collection to preprocessing and reporting results. Problems that might lead to irreproducibility include improper comparisons to baselines, unrepresentative samples, results being sensitive to specific modeling choices, and not reporting model uncertainties. There is also the basic problem of researchers failing to publish their code and data, precluding reproducibility. For example, Gabelica et al. [examined](https://pubmed.ncbi.nlm.nih.gov/35654271/) 333 open-access journals indexed on BioMed Central in January 2019 and found that out of the 1,800 papers that pledged to share data upon request, 93% did not do so.

**The roots run deep**

Even before ML, many scientific fields have been facing reproducibility and replicability crises. The root causes include the publish-or-perish culture in science, the strong bias for publishing positive results (and the near-impossibility of publishing negative results), the lack of incentives for debunking faulty studies, and the lack of consequences for publishing shoddy work. For example, faulty papers are almost never retracted. Peers don’t even seem to notice replication failures — after a paper fails to replicate, [only 3%](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10460510/) of citing articles cited the replication attempt.[1](#footnote-1) Science communicators love to claim that science self-corrects, but self-correction is practically nonexistent in our experience.

All of these cultural factors are also present in ML-based science. But ML introduces a bunch of additional reasons why we should be skeptical of published results. Performance evaluation is notoriously tricky and many aspects of it, such as uncertainty quantification, are unresolved research areas. Also, ML code tends to vastly more complex and less standardized than traditional statistical modeling. Since it is not peer reviewers’ job to review code, coding errors are rarely discovered.

But we think the biggest reason for the poor quality of research is pervasive hype, resulting in the lack of a skeptical mindset among researchers, which is a cornerstone of good scientific practice. We’ve observed that when researchers have overoptimistic expectations, and their ML model performs poorly, they assume that they did something wrong and tweak the model, when in fact they should strongly consider the possibility that they have run up against inherent [limits to predictability](https://msalganik.github.io/cos597E-soc555_f2020/). Conversely, they tend to be credulous when their model performs well, when in fact they should be on high alert for leakage or other flaws. And if the model performs better than expected, they assume that it has discovered patterns in the data that no human could have thought of, and the myth of AI as an alien intelligence makes this explanation seem readily plausible.

[

![](https://substackcdn.com/image/fetch/$s_!8Au-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F877ad57f-f2fc-4b70-9f03-a4bd52e490a7_1296x822.png)



](https://substackcdn.com/image/fetch/$s_!8Au-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F877ad57f-f2fc-4b70-9f03-a4bd52e490a7_1296x822.png)

This is a feedback loop. Overoptimism fuels flawed research which further misleads other researchers in the field about what they should and shouldn’t expect AI to be able to do. In fact, we’ve encountered extreme versions of this in private correspondence with frustrated researchers: since flawed research goes uncorrected, it becomes literally impossible to publish good research since it will result in models that don’t beat the “state of the art”.

The more powerful and more black-box the tool, the more the potential for errors and overconfidence. The replication crises in psychology, medicine, etc. were the result of misapplication of plain old statistics. Given how relatively new ML is, our guess is that the reproducibility crisis in ML-based science will get worse for a while before it starts to get better. And now scientists are embracing large language models and generative AI, which open up many new pitfalls such as the [illusion of understanding](https://www.nature.com/articles/s41586-024-07146-0).

**Glimmers of hope**

One good thing about ML-based science is that it usually involves only data analysis, not experimenting on people. So other researchers should in principle be able to download a paper’s code and data and check whether they can reproduce the reported results. They can also review the code for any errors or problematic choices. This is time consuming, but much less so than replicating a study in psychology or medicine, which is typically almost as costly as the original study.

Another good thing is that the vast majority of errors can be avoided if the researchers know what to look out for. In contrast, mitigations for the replication crisis in statistical science, such as pre-registration, have a much more spotty track record of effectiveness.

So we think that the problem can be greatly mitigated by a culture change where researchers systematically exercise more care in their work and reproducibility studies are incentivized. The ML *methods* community has already moved in this direction via the [common task method](https://www.simonsfoundation.org/event/reproducible-research-and-the-common-task-method/) (which is decades old) and the [reproducibility challenge](https://arxiv.org/abs/2003.12206) (which is more recent), but this has not yet happened in ML-based science, that is, in disciplines like medicine or psychology that use ML models to advance knowledge in their respective fields.

We have led a few efforts to change this. First, our leakage paper has had an impact. It has been used by researchers to clarify how they build models and document and demonstrate the [absence of leakage](https://sportrxiv.org/index.php/server/preprint/view/191/351). It has been used by researchers trying to find leakage in [published work](https://arxiv.org/pdf/2401.14497). It has also been used as a way to underscore the importance of studying leakage and coming up with [discipline-specific](https://www.nature.com/articles/s41559-023-02162-1) [guidelines](https://www.sciencedirect.com/science/article/pii/S0928098723001926).

Beyond leakage, we led a group of 19 researchers across computer science, data science, social sciences, mathematics, and biomedical research to develop the [REFORMS](https://reforms.cs.princeton.edu/) checklist for ML-based science. It is a 32-item checklist that can help researchers catch eight kinds of common pitfalls in ML-based science, of which leakage is only one. It was recently [published](https://www.science.org/doi/epdf/10.1126/sciadv.adk3452) in Science Advances. Of course, checklists by themselves won’t help if there isn’t a culture change, but based on the reception so far, we are cautiously optimistic.

**Concluding thoughts**

Our point isn’t that AI is useless to scientists. We ourselves frequently use AI as a tool, even in our research that’s not about AI. The key word is tool. AI is not a revolution. It is not a replacement for human understanding — to think so is to miss the point of science. AI does not offer a shortcut to the hard work and frustration inherent to research. AI is not an oracle and cannot see the future.

Unfortunately, most scientific fields have succumbed to AI hype, leading to a suspension of common sense. For example, a line of research in political science claimed to predict the onset of civil war with an accuracy[2](#footnote-2) of well over 90%, a number that should sound facially impossible. (It [turned out](https://reproducible.cs.princeton.edu/#civil-war) to be leakage, which is what got us interested in this whole line of research.)

We are at an interesting moment in the history of science. Look at these graphs showing the adoption of AI in various fields:[3](#footnote-3)

[

![](https://substackcdn.com/image/fetch/$s_!Ik9I!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4527ec18-fa1f-49aa-95cd-f4395fed3dd6_1560x1234.png)



](https://substackcdn.com/image/fetch/$s_!Ik9I!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4527ec18-fa1f-49aa-95cd-f4395fed3dd6_1560x1234.png)
*Percentage of AI-engaged papers by field, 1985–2023 by field. ([Source: Duede et al. 2024](https://arxiv.org/abs/2405.15828))*

These hockey stick graphs are not good news. They should be terrifying. Adopting AI requires changes to scientific epistemology.[4](#footnote-4) No scientific field has the capacity to accomplish this on a timescale of a couple of years. This is not what happens when a tool or method is adopted organically. It happens when scientists jump on a trend to get funding. Given the level of hype, scientists don’t need *additional* incentives to adopt AI. That means AI-for-science funding programs are probably making things worse. We doubt the avalanche of flawed research can be stopped, but if at least a fraction of AI-for-science funding were diverted to better training, critical inquiry, meta-science, reproducibility, and other quality-control efforts, the havoc can be minimized.

Our book *AI Snake Oil* is now available to preorder. If you have enjoyed our blog and would like to support our work, please preorder via [Amazon](https://substack.com/redirect/f0945e82-44e2-4998-9535-cee6fe9f0fa5?j=eyJ1IjoiYmd4a3MifQ.EjRMsvQe8Xc2mF1xAwL5aBabUU37X2wfP2-gBTgHzJM), [Bookshop](https://substack.com/redirect/fd84f1c5-276b-488f-b91b-3cc7f32821ba?j=eyJ1IjoiYmd4a3MifQ.EjRMsvQe8Xc2mF1xAwL5aBabUU37X2wfP2-gBTgHzJM), or your favorite bookseller.

[1](#footnote-anchor-1)

To be clear, replication failures don’t necessarily imply flaws in the original study. Our concern in this post is primarily about relatively clear-cut errors such as leakage.

[2](#footnote-anchor-2)

Accuracy here refers to a metric called AUC; the baseline AUC is 50% even when one outcome (peace) is much more common than the other (war).

[3](#footnote-anchor-3)

The paper clubs together different types of AI “engagement”: *Engagement could include (but is not limited to) the development of novel AI theory and approaches, technologies, or applications; the general use of AI models for domain-specific tasks; and critical engagement with AI, as typified by academic discourse in fields like philosophy and ethics.* This is unfortunate for our purposes, as our concern is solely about the second category, the use of AI for domain-specific tasks. We do think that outside of a few fields like computer science and philosophy, most AI engagement falls into this category.

[4](#footnote-anchor-4)

In particular, as the saying goes, “all models are wrong but some models are useful”. There is no straightforward answer to the question of when we can draw conclusions about the world based on a model, so validity has to be re-litigated in every field and for every type of model.