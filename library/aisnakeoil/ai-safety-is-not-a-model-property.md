---
title: "AI safety is not a model property"
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-03-12T18:27:47.000Z"
source_url: "https://www.normaltech.ai/p/ai-safety-is-not-a-model-property"
word_count: 2650
estimated_read_time: 14
---

The assumption that AI safety is a property of AI models is pervasive in the AI community. It is seen as so obvious that it is hardly ever explicitly stated. Because of this assumption:

-   Companies have made big investments in red teaming their models before releasing them.
    
-   Researchers are frantically trying to fix the [brittleness](https://www.aisnakeoil.com/p/model-alignment-protects-against) of model alignment techniques.
    
-   Some AI safety advocates seek to restrict open models given concerns that they might pose unique risks.
    
-   Policymakers are trying to find the training compute threshold above which safety risks become serious enough to justify intervention (and lacking any meaningful basis for picking one, they seem to have converged on 1026 rather arbitrarily).
    

We think these efforts are inherently limited in their effectiveness. That’s because AI safety is not a model property. With a few exceptions, AI safety questions cannot be asked and answered at the levels of models alone. Safety depends to a large extent on the context and the environment in which the AI model or AI system is deployed. We have to specify a particular context before we can even meaningfully ask an AI safety question.

As a corollary, fixing AI safety at the model level alone is unlikely to be fruitful. Even if models themselves can somehow be made “safe”, they can easily be used for malicious purposes. That’s because an adversary can deploy a model without giving it access to the details of the context in which it is deployed. Therefore we cannot delegate safety questions to models — especially questions about misuse. The model will lack information that is necessary to make a correct decision.

Based on this perspective, we make four recommendations for safety and red teaming that would represent a major change to how things are done today.

**Safety depends on context: three examples**

Consider the concern that LLMs can help hackers generate and send phishing emails to a large number of potential victims. It’s true — in our own small-scale tests, we’ve [found](https://knightcolumbia.org/content/how-to-prepare-for-the-deluge-of-generative-ai-on-social-media) that LLMs can generate persuasive phishing emails tailored to a particular individual based on publicly available information about them. 

But here’s the problem: phishing emails are just regular emails! There is nothing intrinsically malicious about them. A phishing email might tell the recipient that there is an urgent deadline for a project they are working on, and that they need to click on a link or open an attachment to complete some action. What is malicious is the content of the webpage or the attachment. *But the model that’s being asked to generate the phishing email is not given access to the content that is potentially malicious*. So the only way to make a model refuse to generate phishing emails is to make it refuse to generate emails. That would affect many non-malicious uses, such as marketing.

We see the same pattern over and over. There has been alarm about LLMs being able to give bioterrorists information on how to create pathogens. But that information is [readily available on the internet](https://www.rand.org/pubs/research_reports/RRA2977-2.html). The hard parts for would-be bioterrorists are all of the [other steps](https://www.nytimes.com/2024/03/08/technology/biologists-ai-agreement-bioweapons.html) involved: obtaining raw materials, culturing cells in the lab without killing them or infecting oneself, and disseminating the bioweapon to cause harm. AI could potentially aid that work, as it is a general-purpose tool and has some usefulness for almost all knowledge work. Again, this illustrates the limits of attempting to build safety into models: most of the questions the user would ask in this process relate to *synthetic biology in general and not bioweapons in particular*. To be sure that a model couldn’t assist bioterrorists, it would have to refuse to assist with any sort of bioengineering.

Or consider the use of LLMs to generate disinformation. Even in the unlikely event that a model could be aligned so that it refuses all requests to generate false information, research has found that true-but-misleading information is far more impactful than false information on social media; [50x more](https://jenny-allen.com/publication/allen-2023-vaccine/) in the case of increasing vaccine hesitancy. So even a hypothetical safe model could be used to aid disinformation efforts: the adversary would use it to generate factual information (e.g. accurately summarizing news stories), with the misleading context added in separately.

In short, trying to make an AI model that can’t be misused is like trying to make a computer that can’t be used for bad things.

**Scope of our claims**

This essay is primarily about misuse, which seems to be the biggest driver of the AI safety worries recently. This includes both malicious misuse, such as the above examples, and nonmalicious misuse, such as students cheating on homework. Here again the model lacks the context to prevent only “bad” uses: it doesn’t know whether the task it is asked to perform is part of the user’s homework.

AI safety encompasses many other types of failures, such as bias and toxicity, accidents, reward hacking, and adversarial inputs (such as prompt injection). These are all different from misuse risks.[1](#footnote-1) We think our argument applies in many of these cases, though less strongly. We don’t give a full analysis here. In the case of accidents, others have made the point that we have to look at the [system](https://arxiv.org/pdf/2202.09292.pdf) and [context](https://arxiv.org/pdf/2401.10899.pdf), rather than the model alone.

Another related failure mode, one that is outside our scope, is overreliance on flawed models for legal or medical advice (whether this falls under AI safety is debatable but tangential to our point). To understand these harms, studying models makes sense: for example, a recent investigation by the [AI Democracy Projects](https://www.proofnews.org/seeking-election-information-dont-trust-ai/) found that most models have high rates of incorrect responses to questions about the election.

Even within the category of misuse, there are a few exceptions to the rule that safety is not a model property. Some types of content are intrinsically problematic regardless of what someone does with it, as in the case of AI-child sexual abuse material.[2](#footnote-2) Aligning AI systems to refuse such requests is important. Outputting memorized [copyrighted material](https://katelee168.github.io/pdfs/red-teaming-feb-2024.pdf) is another such category. 

In any case, our point is not that red teaming or aligning models is useless, just that safety has to be much broader than looking at models alone.

**Recommendation 1: defenses against misuse must primarily be located outside models**

We’ve [written before](https://www.aisnakeoil.com/p/model-alignment-protects-against) that model alignment can easily be evaded by adversaries. Those evasive techniques, such as jailbreaks, are potentially fixable. Here, we are talking about something more fundamental: misuse that does not require breaching the alignment guarantees in any way, such as writing persuasive emails that can be used for either marketing or phishing.

If model alignment is not the answer, other defenses are sorely needed. As we’ve consistently [argued](https://www.aisnakeoil.com/p/three-ideas-for-regulating-generative), defenses should focus on attack surfaces: the downstream sites where attackers use the outputs of AI models for malicious purposes. For example, the best defenses against phishing emails, whether generated by humans or LLMs, are email scanners and URL blacklists — which we’ve had for a couple of decades and have gradually gotten pretty good, although of course we must continue to improve them.

If we instead keep barking up the tree of model alignment, the fact that the model lacks access to context, and therefore can’t make informed safety determinations, will lead to both false positives and false negatives. In other words, it will not only lead to a failure to prevent misuse, but also the opposite problem: refusing innocuous requests like an overzealous censor.

**Recommendation 2: assess marginal risk**

If safety is not primarily a model property and defenses must reside elsewhere, then there might not be a big difference between the safety implications of open and closed release strategies. In any case, the debate on openness in AI needs a more rigorous risk assessment framework. We were recently part of a large collaboration that presented just such a [framework](https://crfm.stanford.edu/open-fms/). It enables assessing the *marginal* risk of releasing a model — that is, the additional or incremental risk — compared to the risk from existing models (and non-AI technologies). It takes into account that defenses for some risks might already exist, especially defenses located outside models. Using this framework, we showed that the marginal risk of open models in cybersecurity (specifically, enabling automated vulnerability detection) is low, whereas for the generation of non-consensual intimate imagery, the marginal risk is substantial.

A notable potential safety advantage of closed models is the ability to monitor queries and *retrospectively* identify malicious use. This is a far easier technical problem than building safety into the model itself.[3](#footnote-3) Besides, the risk of account suspension or prosecution might exert a deterrent effect on threat actors. In any case, this sort of comparison between open and closed models will have to be made separately for each type of misuse based on empirical evidence. Currently, we don’t have reliable evidence of how well monitoring and detection is working because of the lack of transparency by developers. One small but notable exception is a recent [blog post](https://www.microsoft.com/en-us/security/blog/2024/02/14/staying-ahead-of-threat-actors-in-the-age-of-ai/) on Microsoft’s and OpenAI’s efforts to detect and disrupt hacking groups’ use of LLMs.

**Recommendation 3: refocus red teaming toward early warning**

We should not expect red teaming to tell us whether or not a model can be misused (the answer is always yes). Instead, we should use red teaming to learn about the advancing frontier of adversary capabilities enabled by state-of-the-art AI models. For example, if AI systems have gotten powerful enough to automate a complex cybersecurity attack chain — scanning social media profiles to gather information, crafting a phishing email, taking over an account, exfiltrating information, and concealing traces of the attack — we need to have early warning of those capabilities so that we can defend appropriately.

To do this, we may need to design better offensive pipelines, such as for hacking. In the case of disinformation, a key offensive capability would be building a bot that can engage in a persuasive conversation on political topics over a long period of time. Building such capabilities raises ethical challenges. The cybersecurity community has long grappled with these challenges, and the [general conclusion](https://www.schneier.com/essays/archives/2008/05/the_ethics_of_vulner.html) is that we are better off in a world where everyone has access to offensive capabilities than one in which only attackers do.

The results of red teaming should inform the development of defenses — defenses that almost always will reside *outside* AI models (such as detecting and labeling bot accounts on social media).

**Recommendation 4: red teaming should be led by third parties with aligned incentives**

The above change in objectives of red teaming leads to a subtle shift in incentives. When red teaming is model focused, developers have an incentive to do a good job. If they find that models produce “dangerous” information, they can fix that behavior, which helps them avoid bad press.

But for the kind of misuse we’re talking about, the incentives are reversed. It is not in developers’ interest to build the most powerful offensive pipeline possible. If they do, they might find that (for instance) a model can be used for hacking, but they will have no way to prevent this. Thus, they will have to admit that they are knowingly releasing a model that can be used for offensive purposes. It is much better for them to not find out in the first place. 

Consider OpenAI's [recent study](https://openai.com/research/building-an-early-warning-system-for-llm-aided-biological-threat-creation) on biological threats from language models. OpenAI evaluated the risk of users gaining access to information using language models compared to the internet (which is much better than previous studies that don't use the internet as a baseline at all). But creating a bioweapon requires far more than a few hours of information hunting. A motivated actor needs access to a lab, reagents, and equipment in order to even begin the process. The real question is whether AI can help adversaries acquire these resources. The study does not answer that.

The incentives of third parties are potentially better aligned for a more holistic risk assessment that is less focused on models alone. But here too, there is need for caution. Until recently, much of the evidence for biosecurity risks of language models came from groups funded by a small number of [effective altruism organizations](https://1a3orn.com/sub/essays-propaganda-or-science.html). Members of the U.S. House Committee on Science, Space, and Technology recently wrote a [letter](https://republicans-science.house.gov/_cache/files/8/a/8a9f893d-858a-419f-9904-52163f22be71/191E586AF744B32E6831A248CD7F4D41.2023-12-14-aisi-scientific-merit-final-signed.pdf) expressing concern about the lack of transparency in how the National Institute of Standards and Technology and the AI Safety Institute plan to allocate funding for third-party evaluations. They were especially concerned about upholding the standards of scientific research.

**Final thoughts: developer responsibility**

Why has the myth of safety as a model property persisted? Because it would be convenient for everyone if it were true! In a world where safety is a model property, companies could confidently determine whether a model is safe enough to release, and AI researchers could apply their arsenal of technical methods toward safety. Most importantly, accountability questions would have relatively clear answers. Companies should have liability for harms if model safety guarantees fail, but not otherwise.

By contrast, accepting that there is no technical fix to misuse risks means that the question of responsibility is extremely messy, and we don’t currently have a good understanding of how to allocate liability for misuse. Assuming that retrospective detection is easier (see recommendation 2 above), one low-hanging fruit is to require anyone who hosts a model, whether closed or open, to adhere to certain standards for monitoring and reporting misuse — see our call for generative AI companies to publish [transparency reports](https://www.aisnakeoil.com/p/generative-ai-companies-must-publish) (and, more generally, the [least cost avoider](https://www.lawfaremedia.org/article/cybersecurity-and-least-cost-avoide) principle). But that won’t be enough, and downstream defenses are needed.

Unfortunately, downstream defenses against misuse impose a great cost on the rest of society. For example, the fact that any image or video could be AI-generated means that realism is no longer a marker of authenticity. That means we all need to adapt and change how we assess the veracity of information online. And that’s just one of dozens of such adaptations needed.

Morally speaking, developers should bear some of the societal costs of harmful uses of AI, mirroring the fact that they reap profits from beneficial uses of AI. But legally speaking, we have no tool to enforce that. Remedying this situation is the great challenge of AI policy — a point we’ve made [over](https://www.aisnakeoil.com/p/generative-ais-end-run-around-copyright) and [over](https://knightcolumbia.org/content/how-to-prepare-for-the-deluge-of-generative-ai-on-social-media). No amount of “guardrails” will close this gap.

**Acknowledgment.** Arvind Narayanan is grateful for being invited to a National AI Advisory Committee AI Safety [panel](https://www.nist.gov/system/files/documents/2024/03/01/Agenda%20NAIAC%203.5.24-for%20web.pdf), where he presented some of these ideas. We thank Mihir Kshirsagar for feedback on a draft.

[1](#footnote-anchor-1)

Prompt injection might enable misuse, but this post is about misuse that doesn’t require violating model safety properties.

[2](#footnote-anchor-2)

Update: we originally used nonconsensual intimate imagery (NCII) as an example here. But NCII is not an exception to the rule; in fact, it is an excellent example of it. The model does not know whether the request is consensual or not; so the only way to refuse to generate NCII is to refuse to generate any intimate imagery. We are grateful to [@belladoreai](https://twitter.com/belladoreai/status/1767899529251111188) on Twitter/X for pointing this out. That said, blanket refusal to generate nudes is a worthwhile tradeoff that many model developers make, unlike refusing all requests to generate emails, which is hard to justify. And if they've made that tradeoff, they can try to enforce it at the model level (at least for closed models). In short, NCII is not an exception to the pattern, but it does have a different relative cost of false positives and false negatives.

[3](#footnote-anchor-3)

There are many reasons why forensics is easier than model alignment. It only requires assessing whether an *account*, which may have made hundreds of queries, has violated usage policies, rather than making assessments query by query, so there is a lot more information to go on. Analysts might also be able to use a materialized attack as evidence of intent: for example, a disinformation campaign on social media that used content generated by a model. Broadly speaking, real-time AI assessment is no match for patient human analysis in making nuanced determinations of malicious use.