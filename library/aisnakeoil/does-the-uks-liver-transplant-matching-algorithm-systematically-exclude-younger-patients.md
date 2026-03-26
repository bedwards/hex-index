---
title: "Does the UK’s liver transplant matching algorithm systematically exclude younger patients?"
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-11-11T19:57:25.000Z"
source_url: "https://www.normaltech.ai/p/does-the-uks-liver-transplant-matching"
word_count: 3482
estimated_read_time: 18
---

*By Arvind Narayanan, Angelina Wang, Sayash Kapoor, and Solon Barocas*

Predictive algorithms are used in many life-or-death situations. In the paper [Against Predictive Optimization](https://www.aisnakeoil.com/p/ai-cannot-predict-the-future-but), we argued that the use of predictive logic for making decisions about people has recurring, inherent flaws, and should be rejected in many cases.

A wrenching case study comes from the UK’s liver allocation algorithm, which appears to [discriminate by age](https://www.ft.com/content/5125c83a-b82b-40c5-8b35-99579e087951), with some younger patients seemingly unable to receive a transplant, no matter how ill. What went wrong here? Can it be fixed? Or should health systems avoid using algorithms for liver transplant matching?

### **How the liver allocation algorithm works**

The UK [nationalized](https://www.odt.nhs.uk/odt-structures-and-standards/odt-hub-programme/national-liver-offering-scheme/) its liver transplant system in 2018, replacing previous regional systems where livers were prioritized based on disease severity.[1](#footnote-1) When a liver becomes available, the new algorithm uses predictive logic to calculate how much each patient on the national waiting list would benefit from being given that liver. 

Specifically, the algorithm predicts how long each patient would live if they were given that liver, and how long they would live if they didn’t get a transplant. The difference between the two is the patient’s Transplant Benefit Score (TBS). Patients are sorted in decreasing order of the score, and the top patient is offered the liver (if they decline, the next patient is offered, and so on).

Given this description, one would expect that the algorithm would *favor* younger patients, as they will potentially gain many more decades of life through a transplant compared to older patients. If the algorithm has the opposite effect, either the score has been inaccurately [portrayed](https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/11879/faqs-for-national-liver-offering-scheme-may2018.pdf) or it is being calculated incorrectly. We’ll see which one it is. But first, let’s discuss a more basic question.

### **Why is predictive AI even needed?**

Discussions of the ethics of algorithmic decision making often narrowly focus on bias, ignoring the question of whether it is [legitimate](https://predictive-optimization.cs.princeton.edu/) to use an algorithm in the first place. For example, consider pretrial risk prediction in the criminal justice system. While bias is a serious concern, a deeper question is whether it is morally justified to deny defendants their freedom based on a prediction of what they might do rather than a determination of guilt, especially when that prediction is barely more accurate than a coin flip. 

Organ transplantation is different in many ways. The health system needs to make efficient and ethical use of a very limited and valuable resource, and must find some principled way of allocating it to many deserving people, all of whom have reasonable claims for why they should be entitled to it. There are thousands of potential recipients, and decisions must be made quickly when an organ becomes available. Human judgment doesn’t scale.[2](#footnote-2) 

Another way to try to avoid the need for predictive algorithms is to [increase the pool of organs](https://arxiv.org/pdf/2312.08511) so that they are no longer as scarce. Encouraging people to sign up for organ donation is definitely important. But even if the supply of livers is no longer a constraint, it would still be useful to predict which patient will benefit the most from a *specific* liver. 

Sometimes [simple statistical formulas](https://5harad.com/papers/simple-rules.pdf) provide most of the benefits of predictive AI without the downsides. In fact, the previous liver transplant system in the UK was based on a relatively simple formula for predicting disease severity, called the UK End-stage Liver Disease score, which is based on the blood levels of a few markers. The new system takes into account the benefit of transplantation in addition to disease severity. It is also more of a black box. It is “AI” in the sense that it is derived from a data-driven optimization process and is too complex to be mentally understood by doctors or patients. It uses 28 variables from the donor and recipient to make a prediction. 

It seems at least plausible that this complexity is justified in this context because health outcomes are much more predictable than who will commit a crime (though this varies by disease). Follow-up studies have [confirmed](https://www.journal-of-hepatology.eu/article/S0168-8278\(24\)00203-4/fulltext) that the matching algorithm does indeed save more lives than the system that it replaced.

So there isn’t necessarily a prima facie case for arguing against the use of the algorithm. Instead, we have to look at the details of what went wrong. Let’s turn to those details.

### **The Financial Times investigation**

In November 2023, the Financial Times published a bombshell [investigation](https://www.ft.com/content/5125c83a-b82b-40c5-8b35-99579e087951) about bias in the algorithm. It centers on a 31 year old patient, Sarah Meredith, with multiple genetic conditions including cystic fibrosis. It describes her accidental discovery that the Transplant Benefit Score algorithm even existed and would decide her fate; her struggle to understand how it worked; her liver doctors’ lack of even basic knowledge about the algorithm; and her realization that there was no physician override to the TBS score and no appeals process.

When she reached out to the National Health Service to ask for explanations, Meredith was repeatedly told she wouldn’t understand. It seems that the paternalism of health systems combined with the [myth](https://royalsocietypublishing.org/doi/10.1098/rsta.2018.0084) of the inscrutability of algorithms is a particularly toxic mix.

Meredith eventually landed on a [web app](https://transplantbenefit.org/) that calculates the TBS, built by Professor Ewen Harrison and his team. He is a surgeon and data scientist who has studied the TBS, and is a co-author of a study of some of the failures of the algorithm. It is through this app that Meredith realized how biased the algorithm is. It also shows why the inscrutability of algorithmic decision making is a myth: even without understanding the internals, it is easy to understand the behavior of the system, especially given that a particular patient only cares about how the system behaves in one specific instance.

But this isn’t just one patient’s experience. From the Financial Times piece:

> “If you’re below 45 years, no matter how ill, it is impossible for you to score high enough to be given priority scores on the list,” said Palak Trivedi, a consultant hepatologist at the University of Birmingham, which has one of the country’s largest liver transplant centres.

Finally, a 2024 [study](https://www.thelancet.com/journals/lanhl/article/PIIS2666-7568\(24\)00044-8/fulltext) in The Lancet has confirmed that the algorithm has a severe bias against younger patients.[3](#footnote-3)

### **Patient groups warned about the bias**

The objective of the matching system is to identify the recipient whose life expectancy would be increased the most through the transplant. The obvious way to do this is to predict each patient’s expected survival time with and without the transplant. This is almost what the algorithm does, but not quite — it predicts each patient’s *likelihood of surviving 5 years* with and without the transplant.

The problem with this is obvious. A [patient group](https://pscsupport.org.uk/what-we-do/lptc/) gave this feedback through official channels in 2015, long before the algorithm went into effect:

> Capping survival at five years in effect diminishes the benefits for younger patients as it underestimates the gain in life years by predicting lifetime gain over 5 years, as opposed  to the total lifetime gain. Paediatric and small adult patients benefit from accessing small adult livers as a national priority in the Current System. However, young adults must compete directly with all other adult patients. In the proposed model, there is no recognition that a death in a younger patient is associated with a  greater number of expected years of life lost compared with the death of an older adult patient. There is also no recognition that longer periods waiting has an impact on younger patients’ prospects, such as career and family,  and contribution to society compared with older adult patients. Younger patients have not yet had the chance to live their lives and consideration should be given to how the cohort of younger waiting list patients is affected by rules applied to calculate their benefit.

This is what leads to the algorithm’s behavior. Younger patients are (correctly) predicted to be more likely to survive 5 years *without* a transplant, and about as likely as older patients to survive 5 years *with* a transplant. So younger patients’ predicted net benefit (over a 5-year period) is much less than older patients’. Over the entire course of their lives, younger patients would likely benefit more, but the algorithm doesn’t take this into account.

### **Show us the target variable and we’ll show you the problem**

It is not clear why the problem was ignored, both in version 1 of the algorithm in 2018 and in version 2 in 2022 which corrected a bias against cancer patients (we’ll get to that bias in a minute). Perhaps the developers did not recognize how severe the age bias is. Even in a [2024 paper](https://www.journal-of-hepatology.eu/article/S0168-8278\(24\)00203-4/fulltext) about the algorithm, where they briefly discuss many of its limitations *including the five-year cap*, they do not mention that the cap de-prioritizes younger patients.

On the other hand, the list of features (donor and recipient characteristics) is prominently listed and discussed in [public communications](https://www.odt.nhs.uk/odt-structures-and-standards/odt-hub-programme/national-liver-offering-scheme/) about the system. This may reflect a misconception that the way to understand an algorithm, including its potentially discriminatory effects, is to look at the list of features — the *inputs*. In reality, the target variable — the *output* — is often more important for fairness than the features. 

Unfortunately there is little recognition of this crucial fact outside the technical community (and sometimes even within the technical community). Instead there is a narrow focus on removing sensitive variables (such as age, race, or gender) and proxies for the sensitive variables from the list of features, which is [usually ineffective](https://fairmlbook.org/classification.html#no-fairness-through-unawareness) and often even [counterproductive](https://www.nejm.org/doi/full/10.1056/NEJMp2311050).

The choice of a 5-year period seems to be because of [data availability](https://www.journal-of-hepatology.eu/article/S0168-8278\(24\)00203-4/fulltext): “This length of follow-up was selected as data were readily available ... while longer follow-up was not.” In our experience, there is almost always some difficulty that prevents accurately measuring the true construct of interest, which is why this is one of the recurring flaws we identify in the [Against Predictive Optimization](https://predictive-optimization.cs.princeton.edu/) paper. It is a [target-construct mismatch](https://arxiv.org/abs/1912.05511), because what is being predicted, the target, differs from what we actually want to predict, the construct.

### **It gets worse**

The cap means that the expected survival with a transplant for most patient groups is about the same (about 4.5 years, reflecting the fact that about 85% of patients survive 5 years after a transplant). So the utility of the transplant, while high, is more-or-less uniformly high, which means that it doesn’t really factor into the scores! It turns out that the algorithm is mostly just assessing need, that is, how long patients would survive *without* a transplant.

This is ironic because modeling post-transplant survival was [claimed](https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/7892/national-liver-offering-roadshow-presentation.pdf) to be the main reason to use this system over the previous one. If it keeps more people from dying, we suspect it is simply because it does a better job of assessing need, and/or because the use of the algorithm coincided with a move from regional to national systems, allowing it to better cater to high-need patients in previously under-served regions.

The fact that the system isn’t very good at meeting its stated objectives only seems to have been [reported](https://pubmed.ncbi.nlm.nih.gov/37516542/) a decade after the algorithm was developed (although in retrospect, there were clear signals in the results of the [simulations](https://bts.org.uk/wp-content/uploads/2018/04/NHSBT-John-OGrady.pdf) that were run before deployment). Specifically, it is noted in the comment-and-response section of a [paper](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736\(23\)00114-9/fulltext) about the algorithm. In terms of obscurity, that’s the academic equivalent of Wikipedia’s Talk pages — most of the public wouldn’t even know such a thing exists. 

### **An algorithmic absurdity: cancer improves survival**

While the authors of the above paper mention in passing that one of the two models in the algorithm (post-transplant survival) doesn’t seem to do much, their [main point](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736\(23\)00114-9/fulltext) is about the other model — the one that assesses need by predicting survival on the waiting list. They show that it expects patients with cancer to survive *longer* than those without cancer (all else being equal). This kind of thing is sometimes called algorithmic absurdity, something that would seem obviously wrong to a person based on common sense.

The prediction about patients with cancer is not just an oddity — it has big consequences for patients’ lives: “for the first 3 years of the TBS scheme (excluding the period when TBS offering was suspended due to COVID-19), patients with cancer were rarely allocated livers by the TBS model”. This is what led to the 2022 revision of the algorithm.

The finding is reminiscent of a well-known failure from a few decades ago wherein a model [predicted](https://pubmed.ncbi.nlm.nih.gov/9040894/) that patients with asthma were at *lower* risk of developing complications from pneumonia. Fortunately this was spotted before the model was deployed. It turned out to be a correct pattern in the data, but only because asthmatic patients were sent to the ICU, where they received better care. Of course, it would have been disastrous to replace that very policy with the ML model that treated asthmatic patients as lower risk. That case study has become a textbook illustration of the usefulness of [interpretable](https://dl.acm.org/doi/10.1145/2783258.2788613) models over black-box models. If researchers can easily examine the coefficients of the model, implausible behaviors become more readily apparent.

The TBS does use interpretable regression models. But it is actually two different sets of models, one for patients with cancer and one for patients without cancer, because the two groups are represented by two different data sources. That explains why the implausible behavior of the algorithm may have arisen — the patient populations are different; perhaps the population from which the cancer patients were drawn was younger or healthier in other ways. Of course, this doesn’t justify the algorithm’s behavior where flipping a *specific* patient from non-cancer to cancer increases the predicted survival. The fact that there are two different sets of models may also explain why it went undetected for so long — the problem is not obvious from the regression coefficients and can only be detected by simulating a patient population.

### **Sleepwalking into utilitarian ethics**

Predictive logic bakes in a utilitarian worldview — the most good for the greatest number. That makes it hard to incorporate a notion of deservingness. Many people have a strong moral intuition that patients whose conditions result from factors outside their control are more deserving of help. From the Financial Times article:

> Trivedi \[the hepatologist\] said patients found \[the bias against younger patients\] particularly unfair, because younger people tended to be born with liver disease or develop it as children, while older patients more often contracted chronic liver disease because of lifestyle choices such as drinking alcohol.

Donor preferences are also neglected. For example, presumably some donors would prefer to help someone in their own community. But in the utilitarian worldview, this is simply [geographic discrimination](https://www.jstor.org/stable/2265052?seq=4). (Our point is not about whether deservingness or donor preferences are important considerations, but rather that the algorithm dictates the ethical framework.) 

Traditionally, individual physicians made decisions about transplants without much formal reasoning or accountability. But with routinization and increasing scale of organ transplantation, and the shift to nationwide matching systems, manual matching is no longer feasible. Automation has forced decision makers to make the matching criteria explicit. This formalization can be a [good thing](https://dl.acm.org/doi/abs/10.1145/3351095.3372871), as it allows ethical debate about the pros and cons of precisely specified policies.

But automation has also privileged utilitarianism, as it is much more amenable to calculation. Non-utilitarian considerations resist quantification. No committee of decision makers would want to be in charge of determining how much of a penalty to apply to patients who drank alcohol, and whatever choice they made would meet fierce objection. In contrast, the veneer of data-driven decision making, even though it hides many normative choices, allows decision makers to reach consensus and to deploy algorithms without endless debate.

For this reason, utilitarianism has been ascendant in many, many domains over the last few decades, including medical ethics and public health.

While the liver matching algorithm optimizes life years (albeit poorly), other algorithms and institutions go one step further and optimize “quality-adjusted” life years, taking into account factors such as how well a person is able to complete daily tasks and how much pain they are in. Quality adjustment has side-effects such as giving lower preference to disabled people.

Overall, we are not necessarily against this shift to utilitarian logic, but we think it should only be adopted if it is the result of a democratic process, not just because it’s more convenient. The tail shouldn’t wag the dog. It isn’t clear to what extent the wider public is even aware of the widespread shift to nationalized transplant systems — in many countries, for many organs — and the ethical logics that underpin them. Public input about *specific* systems, such as the one we’ve discussed, is not a replacement for broad societal consensus on the underlying moral frameworks. Nor should this debate be confined to the [medical ethics](https://www.cambridge.org/core/journals/cambridge-quarterly-of-healthcare-ethics/article/does-the-united-states-do-it-better-a-comparative-analysis-of-liver-allocation-protocols-in-the-united-kingdom-and-the-united-states/681D3480F8940AF51D65B3E4114DEBA5) literature. 

### **What’s next**

The liver allocation algorithm was developed and is run by the National Health Service (NHS), the UK’s publicly-funded health system. We’ve previously explained in this newsletter that [bad outcomes](https://www.aisnakeoil.com/p/the-bait-and-switch-behind-ai-risk) result when public sector agencies outsource algorithmic decision making systems to opaque, profit-oriented companies. That’s not the case here. The developers are doing their best to save lives. A lot of thought and care went into the system, and there was public input. If there were missteps, they are a result of how hard the problem is.

There are clear problems with the liver allocation algorithm that can and should be addressed. There are at least three ways to mitigate the age bias. The first is to collect more and better data. The second is to put a thumb on the algorithm’s scale to ensure that the age distribution of recipients is roughly in line with society’s normative ideals. This can be achieved by formulating a constrained optimization problem (there are many papers on algorithmic fairness that show how to do this). The third is to stop using age as a factor. We don’t like this approach for reasons described above, but it is perhaps more easily defensible to non-experts.

The [Liver Advisory Group](https://www.odt.nhs.uk/transplantation/liver/liver-advisory-group/) is the entity with the power to effect changes. The members meet every six months. Unfortunately they haven’t yet uploaded their minutes from their May 2024 meeting, so it isn’t clear if they are paying attention. 

The deeper, systemic problem will be harder to address — inadequate transparency and public participation in medical ethics. The rapid adoption of AI for medical decision making requires a whole-of-society ethical debate. This isn’t about specific algorithms but about the bundle of unexamined assumptions behind their claim to efficacy and thus to legitimacy. Better late than never.

Zooming out beyond medicine, the pitfalls that arise in disparate applications of predictive decision making bear [striking similarities](https://predictive-optimization.cs.princeton.edu/) with each other. This calls for [more research](https://www.birs.ca/events/2024/5-day-workshops/24w5283) on avoiding these flaws as well as a community of practitioners from different fields who can learn from each other. Venues such as the [conference on Fairness, Accountability, and Transparency](https://facctconference.org/) can bring such cross-cutting groups together.

#### **Further reading**

-   *[Dissecting racial bias in an algorithm used to manage the health of populations](https://www.science.org/doi/10.1126/science.aax2342)* is a classic paper that revealed how the use of the wrong target variable can lead to severe biases.
    
-   *[Voices in the Code](https://www.russellsage.org/publications/voices-code)* is an excellent book that details the development of a kidney matching algorithm in the U.S. It shows the benefits of public participation — how it can uncover flaws in algorithms that developers had not anticipated, and increase the legitimacy of the system that is ultimately deployed. But participation is no panacea. The process discussed in the book took a decade, during which time a far worse system remained in place. And participatory development of a specific system does not obviate the need for a broader public debate on the utilitarian and algorithmic turn in medical ethics.
    

#### **Acknowledgment**

We are grateful to Emma Pierson for feedback on a draft of this essay.

[1](#footnote-anchor-1)

For more details on the previous system, see [this article](https://aasldpubs.onlinelibrary.wiley.com/doi/pdf/10.1002/lt.24462).

[2](#footnote-anchor-2)

There are many other differences between human and algorithmic decision making. Algorithms tend to be much better at optimizing a given objective, such as maximizing the number of life years gained through transplantation. But human decision makers can more easily incorporate multiple objectives, especially non-utilitarian ones. Human decision makers of course have their own biases; whose biases are worse and which ones are easier to mitigate are complex questions whose answers are context-dependent.

[3](#footnote-anchor-3)

Update: Regarding the quote in the Financial Times, an NHS Blood and Transplant spokesperson said: “People can receive transplants through various pathways. Some use the TBS and some do not use the TBS. It is incorrect to say that no-one under 40 could receive a transplant. It is also incorrect to say that no-under 40 could receive a transplant as the patient most in need according to the TBS. It could also unduly worry patients on the transplant list. Over the past three UK financial years, 133 people aged 17 to 39 received transplants that were allocated to them through the TBS, as the patient in the country who would benefit most from that liver. Additionally, over the past three financial years, a further 285 people aged 17 to 39 received liver only transplants through other pathways.”