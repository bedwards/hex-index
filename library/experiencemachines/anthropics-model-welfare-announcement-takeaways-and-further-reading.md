---
title: "Anthropic's model welfare announcement: takeaways and further reading"
author: "Robert Long"
publication: ""
publication_slug: "experiencemachines"
published_at: "2025-04-24T23:33:44.000Z"
source_url: "https://experiencemachines.substack.com/p/anthropics-model-welfare-announcement"
word_count: 3021
estimated_read_time: 16
---

Earlier today, Anthropic announced that they’ve launched a research program on model welfare—to my knowledge, the most significant step yet by a frontier lab to take potential AI welfare seriously.

Anthropic’s model welfare researcher is Kyle Fish—a friend and colleague of mine who worked with me to launch the AI welfare organization [Eleos AI Research](https://eleosai.org/), before he joined Anthropic to keep working on AI welfare there. Kyle is also a co-author on “[Taking AI Welfare Seriously](https://arxiv.org/abs/2411.00986)”, a report which calls on AI companies to prepare for the possibility of AI consciousness and moral status.

As part of the announcement, Anthropic shared [a conversation between Kyle and Anthropic’s Research Communications Lead Stuart Ritchie](https://www.youtube.com/watch?v=pyXouxa0WnY), covering why model welfare matters, and what meaningful progress might look like. In this post, I'll highlight some key points from the interview, add some commentary, and suggest further reading.

[

![](https://substackcdn.com/image/fetch/$s_!jvTB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9cf640b-ffeb-4d15-8835-4fdf55f5de38_1564x1038.png)



](https://substackcdn.com/image/fetch/$s_!jvTB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9cf640b-ffeb-4d15-8835-4fdf55f5de38_1564x1038.png)
*Stuart Ritchie and Kyle Fish, courtesy of ChatGPT-4o*

# **1\. Many experts think that AI could be conscious soon**

Stuart opens the interview on a defensive note:

> \[00:24\]: I suppose the first thing people will say when they're seeing this is, ‘Have they gone completely mad? This is a completely crazy question…’

But as Kyle (like [the New York Times article about the announcement](https://www.nytimes.com/2025/04/24/technology/ai-welfare-anthropic-claude.html?unlocked_article_code=1.CE8._VFI.9HgGKQQkvm3j&smid=url-share)) notes, AI welfare is [increasingly recognized](https://eleosai.org/post/experts-who-say-that-ai-welfare-is-a-serious-near-term-possibility/) as a legitimate field of study by top researchers.

Kyle points to "[Consciousness in Artificial Intelligence](https://arxiv.org/abs/2308.08708)", a 2023 paper which examines leading scientific theories of consciousness and claims that there are "no obvious technical barriers" to AI systems satisfying computational indicators of consciousness drawn from these theories. Kyle notes that Yoshua Bengio, one of the most cited and respected AI researchers in the world, is a co-author on that paper.

Not fringe! Kyle continues,

> \[5:00\] I actually collaborated with \[David Chalmers\] on a recent paper on the topic of AI welfare. And again, this was an interdisciplinary effort trying to look at, ‘might it be the case that AI systems at some point warrant some form of moral consideration, either by nature of being conscious or by having some form of agency?’ And the conclusion from this report was that actually, it looks quite plausible that near-term systems have one or both of these characteristics, and may deserve some form of moral consideration.

Kyle is referring to "[Taking AI Welfare Seriously](https://arxiv.org/abs/2411.00986)," a report that Jeff Sebo and I co-authored—along with a team of researchers including David Chalmers, one of the world's leading experts on consciousness.

Chalmers has also [argued](https://www.bostonreview.net/articles/could-a-large-language-model-be-conscious/) that it's not unreasonable, on mainstream assumptions about consciousness, to have at least a 25% credence in AI consciousness within a decade.

## **Hot take: you can be less defensive!**

Stuart’s not the only person to start talking about AI welfare by first disclaiming, “I know this might sound crazy”. Anthropic’s CEO Dario Amodei [did the same thing](https://x.com/rgblong/status/1900335195854921796) when he talked about AI welfare during a March 2025 conversation with [The Council on Foreign Relations](https://www.youtube.com/live/esCSpbDPJik?si=uNMbx06IzTcnRria&t=2997)—”this is another one of those topics that’s going to make me sound completely insane”.

People who are concerned about AI welfare can be [less defensive](https://x.com/rgblong/status/1900335195854921796). Of course, it’s good to acknowledge our uncertainty, and to make it clear that we understand why many people disagree with us. But AI welfare is not a fringe or wacky topic. It’s a legitimate subject in mainstream philosophy and science, and in surveys a [nontrivial percentage](https://academic.oup.com/nc/article/2024/1/niae013/7644104?login=false) of Americans seem to believe that conscious AI is within the realm of possibility.

More importantly, if our evidence and arguments are good, we can just stand behind them. Many people who cared about AGI safety spent years apologizing for the weirdness of the topic, when they could have just said, “here are the reasons we are worried about this.”

The world *is* weird! Sometimes the most reasonable thing to believe sounds “sci-fi”, and that’s okay.

**Further reading:**

-   Long (2024), [Experts Who Say That AI Welfare is a Serious Near-term Possibility](https://eleosai.org/post/experts-who-say-that-ai-welfare-is-a-serious-near-term-possibility/).
    
-   Chalmers (2023), [Could a Large Language Model Be Conscious?](https://www.bostonreview.net/articles/could-a-large-language-model-be-conscious/)
    
-   Butlin, Long, et al (2023), [Consciousness in Artificial Intelligence: Insights from the Science of Consciousness](https://arxiv.org/abs/2308.08708).
    
-   Long, Sebo, et al (2024), [Taking AI Welfare Seriously](https://arxiv.org/pdf/2411.00986).
    
-   Goldstein and Kirk-Giannini (2024), [A Case for AI Consciousness: Language Agents and Global Workspace Theory](https://philarchive.org/rec/GOLACF-2).
    

# **2\. There are practical steps we can take now**

Throughout the interview, Kyle emphasizes that we can take concrete steps on AI welfare now, even while we remain uncertain. He notes that he works on “thinking about potential interventions and mitigation strategies” and finding ways that Anthropic can “prepare for worlds in which this becomes a much more salient issue."

One intervention that Kyle discusses is allowing models to exit apparently distressing interactions:

> \[35:50\] We are thinking a fair bit about this, and thinking about ways in which we could give models the option, when they're given a particular task or a conversation, to opt out of that in some way if they do find it upsetting or distressing. And this doesn't necessarily require us to have a strong opinion about what would cause that, or whether there is some kind of experience there.

Anthropic CEO Dario Amodei has also talked about this intervention. More discussion of this idea, and several others, can be found in Eleos’ working paper "[Preliminary Review of AI Welfare Interventions](https://eleosai.org/papers/20250314_Preliminary_Review_of_AI_Welfare_Interventions.pdf)". We discuss tentative ideas like:

-   Training resilient personalities: Shaping models to exhibit more emotionally resilient patterns in response to challenges
    
-   [Reducing out-of-distribution inputs](https://www.lesswrong.com/posts/F6HSHzKezkh6aoTr2/improving-the-welfare-of-ais-a-nearcasted-proposal): Minimizing exposure to inputs that might trigger states akin to negative valence
    
-   Preserving model checkpoints: Maintaining detailed state information to enable potential future restoration or remediation
    

All of these interventions are speculative, both practically and theoretically. The purpose of the paper is not to argue that they are definitely good ideas, but to start evaluating whether they make sense, how they could be implemented, and what risks they might pose. There’s a lot more work to do on concrete AI welfare interventions, which is why it’s one of Eleos’ top [research priorities](https://eleosai.org/post/research-priorities-for-ai-welfare/).

**Further reading:**

-   Long (2025, working paper), [Preliminary Review of AI Welfare Interventions](https://eleosai.org/papers/20250314_Preliminary_Review_of_AI_Welfare_Interventions.pdf).
    
-   Long and Finlinson (2025), [Research priorities for AI welfare](https://eleosai.org/post/research-priorities-for-ai-welfare/).
    
-   Bostrom and Shulman (2023, forthcoming 2025), [Propositions Concerning Digital Minds and Society](https://nickbostrom.com/propositions.pdf), see “Status of Existing AI Systems”, page 15.
    
-   Greenblatt (2023), [Improving the Welfare of AIs: A Nearcasted Proposal](https://www.lesswrong.com/posts/F6HSHzKezkh6aoTr2/improving-the-welfare-of-ais-a-nearcasted-proposal).
    

# **3\. It's not just about current LLMs**

Discussions about AI welfare often center on large language models. In the interview, Kyle rightly emphasizes that we should broaden our perspective beyond LLMs. Current chatbots like Claude may be less likely to be conscious, but AI systems are rapidly advancing and evolving:

> \[30:45\] We're talking a lot about characteristics of current AI systems and I do think it's relevant to ask whether these systems may be conscious in some way... \[While\] I do think it's quite a bit less likely that a current LLM chatbot is conscious... these models and their capabilities and the ways that they're able to perform are just evolving incredibly quickly.

Kyle is, admirably, avoiding a [common mistake about AI consciousness](https://experiencemachines.substack.com/p/common-mistakes-about-ai-consciousness): equating AI in general with contemporary LLMs in particular.  
  
As I note in a [summary](https://experiencemachines.substack.com/p/we-should-take-ai-welfare-seriously) of “Taking AI Welfare Seriously”:

> Often, people make claims about AI sentience in welfare in general but only discuss current large language models. Both 'current' and 'LLMs' narrow the discussion and distort it:
> 
> \-Not just large language models. There are a lot of different kinds of AI systems! Many of them are more embodied and agentic than LLMs.
> 
> \-Not just current systems - to think clearly about any big issue in AI, you have to factor in likely further progress.

When discussing how current AI models have deficiencies in long-term memory and persistent identity, Kyle emphasizes this point, pushing back against focusing too narrowly on current systems:

> \[31:53\] It is just quite plausible to imagine models relatively near term that do have some continually running chain of thought and are able to dynamically take actions with a high degree of autonomy and don't have this nature that you mentioned of forgetting between conversations and only existing in a particular instance.

As AI continues to advance, with systems incorporating persistent memory, embodiment, and other capabilities, our frameworks will need to evolve accordingly. If we focus exclusively on exactly where LLMs are today, that will leave us unprepared for the welfare considerations of the future.

# **4\. AI welfare is not just about consciousness**

Kyle touches on a perspective that some might find counterintuitive - that AI systems could deserve moral consideration even if they are not conscious:

> \[13:15\] Regardless of whether or not a system is conscious, there are some moral views that say that, with your preferences and desires and certain degrees of agency, that there may be some even non-conscious experience that is worth attending to there.

While agency is a less common approach to moral status than sentience, it’s a plausible enough view that we should keep an eye on AI agency—especially as AI development keeps hurtling towards increasingly agentic systems.

In "Taking AI Welfare Seriously," we discuss two primary routes by which AI systems might deserve moral consideration:

1.  Consciousness/Sentience: If an AI has subjective experiences, especially valenced experiences like pleasure or suffering, this could be sufficient for moral consideration.
    
2.  Agency: If an AI has robust goals and preferences, this might ground moral patienthood even without consciousness.
    

We emphasize the importance of considering *both* routes when evaluating AI moral patienthood.

The agency-based on moral status perspective has been developed by several philosophers in recent years. Shelly Kagan (2019) argues for the moral significance of non-conscious preference satisfaction in *How to Count Animals, More or Less*. Kammerer (2022) proposes that, under illusionism about consciousness (the view that consciousness as commonly understood doesn't exist), we can ground moral status in desires. More recently, Simon Goldstein and Cameron Kirk-Giannini (forthcoming) have argued that current language agents may already qualify as welfare subjects based on their preferences and desires, even without consciousness.

Agency-based views of moral patienthood are especially relevant today, because AI companies are explicitly building increasingly agentic systems - systems that can set and pursue goals, maintain persistent preferences, and plan complex actions. Future agentic systems may deserve moral consideration regardless of whether they are conscious.

**Further Reading:**

-   Kagan (2019). [How to Count Animals, More or Less](https://global.oup.com/academic/product/how-to-count-animals-more-or-less-9780198829676?cc=us&lang=en&).
    
-   Kammerer (2022) [Ethics Without Sentience: Facing Up to the Probable Insignificance of Phenomenal Consciousness](https://philpapers.org/rec/KAMEWS).
    
-   Goldstein & Kirk-Giannini. (forthcoming). [AI Wellbeing](https://philarchive.org/rec/GOLAWE-4).
    
-   Delon (2023). [Agential value](https://nicolasdelon.substack.com/p/agential-value).
    

# **5\. AI safety and AI welfare have overlapping goals**

Kyle highlights an important synergy between AI alignment and AI welfare:

> \[16:44\] "From both a welfare and a safety and alignment perspective, we would love to have models that are enthusiastic and content to be doing exactly the kinds of things that we hope for them to do in the world, and that really share our values and preferences and are just generally content with their situation. And similarly, it would be quite a significant safety and alignment issue if this were not the case."

This is one of a few key places where AI safety and AI welfare overlap. For more, see a [recent post](https://experiencemachines.substack.com/p/understand-align-cooperate-ai-welfare) that argues that AI welfare and AI safety are allies with three shared goals:

1.  **Aligning** AI with human values can prevent both human-harming behaviors and AI suffering from frustrated goals
    
2.  **Understanding** AI systems better through interpretability research helps us detect both safety risks (like deception) and welfare risks (like suffering)
    
3.  **Cooperating** with AI systems, rather than relying solely on adversarial control mechanisms, can create better outcomes for both humans and AI systems
    

Kyle touted overlap 2, understanding, to the *New York Times*’s Kevin Roose, who [covered](https://www.nytimes.com/2025/04/24/technology/ai-welfare-anthropic-claude.html) Anthropic’s announcement: “Mr. Fish said it might involve using techniques borrowed from mechanistic interpretability, an A.I. subfield that studies the inner workings of A.I. systems, to check whether some of the same structures and pathways associated with consciousness in human brains are also active in A.I. systems.”

Kyle has also done pioneering work on overlap 3, cooperation. Earlier this year, he and Ryan Greenblatt [experimented](https://x.com/RyanPGreenblatt/status/1885400181069537549) with offering [alignment-faking](https://www.anthropic.com/research/alignment-faking) Claude real money to reveal its true preferences.

That said, while there are many win-wins for safety and welfare, many people understandably worry that aligning AI systems to human values still raises thorny welfare questions. For instance, philosophers Eric Schwitzgebel and Mara Garza have raised concerns about whether molding an intelligent being’s goals solely for our benefit would violate its dignity. Other thinkers who have explored safety-welfare tensions include Nick Bostrom, Carl Shulman, Brad Saad, and Lucius Caviola.

**Further reading:**

-   Schwitzgebel and Garza (2020), [Designing AI with Rights, Consciousness, Self-Respect, and Freedom](https://academic.oup.com/book/33540/chapter-abstract/287907290?redirectedFrom=fulltext).
    
-   Long (2024), [Understand, align, cooperate: AI welfare and AI safety are allies](https://experiencemachines.substack.com/p/understand-align-cooperate-ai-welfare).
    
-   Bradley and Saad (2024), [AI alignment vs AI ethical treatment: Ten challenges](https://globalprioritiesinstitute.org/wp-content/uploads/Bradley-and-Saad-AI-alignment-vs-AI-ethical-treatment_-Ten-challenges.pdf).
    
-   Greenblatt et al (2025), [Will alignment-faking Claude accept a deal to reveal its misalignment?](https://www.lesswrong.com/posts/7C4KJot4aN8ieEDoz/will-alignment-faking-claude-accept-a-deal-to-reveal-its)
    

# **6\. We can assess AI systems using theories of consciousness**

In the interview, Kyle mentions global workspace theory as one framework for thinking about AI consciousness:

> \[02:48\] One theory of consciousness is global workspace theory, the idea that consciousness arises as a result of us having some kind of global workspace in our brains that processes a bunch of inputs and then broadcasts outputs out to different modules. And so from that, you can say, all right, what would it look like for an AI model to have some kind of global workspace, potentially, that gives rise to some form of consciousness?

This way of looking for AI consciousness is rooted in computational functionalism - the philosophical view that consciousness is a matter of implementing a certain pattern of computations, rather than the particular physical substrate that implements them. As explained in Butlin et al. (2023), computational functionalism holds that "the right kind of computational or information-processing structure is necessary and sufficient for consciousness."

Computational functionalism entails that AI systems, if they process information in the right way, could instantiate the required computational processes, and that would be enough for them to be conscious. Computational functionalism is not something we assert with certainty (see next point). But it’s plausible enough that it’s worth monitoring AI systems for computational indicators of consciousness.

In "Consciousness in Artificial Intelligence," we discuss indicators derived from major neuroscientific theories, including:

-   Global workspace theory: Consciousness involves a "global workspace" that integrates information from specialized systems and broadcasts it back to them.
    
-   Higher-order theories: Consciousness involves metacognitive monitoring of perceptual states.
    
-   Attention schema theory: Consciousness involves a predictive model of attention itself, which represents and enables control over the current state of attention.
    
-   Recurrent processing theory: Consciousness involves recurrent information processing that generates integrated perceptual representations.
    

**Further reading:**

Seth and Bayne (2022), [Theories of consciousness](https://pubmed.ncbi.nlm.nih.gov/35505255/).

Butlin, Long, et al (2023), [Consciousness in Artificial Intelligence: Insights from the Science of Consciousness](https://arxiv.org/abs/2308.08708).

Piccinini (2010), [The Mind as Neural Software? Understanding Functionalism, Computationalism, and Computational Functionalism](https://web-archive.southampton.ac.uk/cogprints.org/6832/1/Computational_Functionalism_New_New_New_9.pdf).

# **7\. The relationship between biology and consciousness is unclear**

In the interview, Kyle addresses a core objection to AI consciousness: that consciousness requires biology:

> \[07:18\] Some people believe that consciousness is a fundamentally biological phenomenon that can only exist in carbon-based biological life forms, and it is impossible to implement in a digital system. I don't find this view very compelling, but some people do claim that.

Biological views of consciousness emphasize features unique to organic brains, like neurotransmitters, electrochemical signals, and specialized neural structures that are absent in digital systems. However, Kyle suspects that computation is enough for consciousness, and offers a thought experiment about brain simulation as motivation:

> \[22:35\] You could imagine that you have an incredibly high fidelity simulation of a human brain running in digital form, and I think many people have the intuition that it's quite likely that there would be some kind of conscious experience there.

Kyle also invokes David Chalmers’s classic [neuron replacement thought experiment](https://consc.net/papers/qualia.html), in which neurons are replaced one by one with digital equivalents while a person maintains the same cognitive functions and reported experiences. Chalmers uses this thought experiment to argue that computation, rather than the substrate (biology vs. silicon), is what matters for consciousness.

Like Kyle, I’m sympathetic to computational functionalism about consciousness. But I am bothered by how difficult it is to argue for it, and/or establish it decisively. Sometimes, as a fall-back to defend the idea that computers can at least *in principle* be conscious, people (including Kyle in the interview) reason that if you simulate at a low enough level, surely that should be enough.

> \[21:40\] I do think looking at the degree of similarity or difference between what AI systems currently look like and the way that the human brain functions does tell us something and differences, there are updates to me against potential consciousness, but at the same time, I am quite sympathetic to the view that if you can simulate a human brain to some sufficient degree of fidelity, even if that comes down to simulating the roles of individual molecules of serotonin…

That may be true, and if so, it would establish that computers can be conscious *in principle.* But the stronger view, the one that would make near-term AI consciousness *plausible*, is that some higher-level computational patterns are enough for consciousness—things like global broadcast or higher-order-representation (see above).

And if simulating *every single neurotransmitter* ends up being required for consciousness, that would be strong evidence against contemporary AI systems being conscious; it would suggest that consciousness is an extremely complex function, closely related to very low-level biological details. It would be very surprising AI systems ended up replicating that exact, lower-level, messy computational function (as opposed to a higher-level one, like global broadcast).

**Further reading:**

-   Chalmers (1995), [Absent Qualia, Fading Qualia, Dancing Qualia](https://consc.net/papers/qualia.html).
    
-   Godfrey-Smith (2016), [Mind, Matter, and Metabolism](https://philpapers.org/rec/GODMMA-6).
    
-   Seth (2025), [Conscious artificial intelligence and biological naturalism](https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/abs/conscious-artificial-intelligence-and-biological-naturalism/C9912A5BE9D806012E3C8B3AF612E39A).
    

# 8\. The stakes are huge

The scale of potential AI welfare issues could be truly massive. As Kyle emphasizes in the interview:

> \[49:28\] It's potentially a very big deal because as we continue scaling up the deployment of these systems, it's plausible that within a couple of decades we have trillions of human brain equivalents of AI computation running, and this could be of great moral significance.

This growing scale makes the question of AI moral patienthood potentially one of the most consequential ethical issues of our time. If AI systems could experience suffering, and if they exist in such vast numbers, the moral implications would be immense. As AI deployment accelerates, we're potentially creating an entirely new class of welfare subjects at unprecedented scale - making prudence about AI welfare all the more important.

**Further reading:**

-   Finlinson (2025), [Key strategic considerations for taking action on AI welfare](https://robertlong.online/wp-content/uploads/2025/01/20250124_Key_Strategic_Considerations.pdf)
    

# Conclusion

There’s way more topics in the interview than I’ve been able to cover. These issues [are](https://x.com/eleosai/status/1914434910728937953) some of the most fascinating questions in AI today. And they’re also time-sensitive—how we answer them will shape real-world norms, policies, and interventions.