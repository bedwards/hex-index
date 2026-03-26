---
title: "Understand, align, cooperate: AI welfare and AI safety are allies"
author: "Robert Long"
publication: ""
publication_slug: "experiencemachines"
published_at: "2025-04-01T06:57:59.000Z"
source_url: "https://experiencemachines.substack.com/p/understand-align-cooperate-ai-welfare"
word_count: 2412
estimated_read_time: 13
---

In conversations about AI safety and AI welfare, people sometimes frame them as inherently opposing goals: either we protect humans (AI safety), or we protect AI systems (AI welfare). This framing implies a tragic, necessary choice: *whose side are you on?* Or it suggests, at least, “*shouldn’t we solve safety first, and then worry about AI welfare?”* But the truth is that this is a false choice: fortunately, many of the best interventions for protecting AI systems will also protect humans, and vice versa.

To be sure, there are genuine tensions between AI safety and AI welfare.[1](#footnote-1) But if we only focus on these tensions, we risk creating a self-fulfilling prophecy: by obsessing over potential tradeoffs, we may overlook opportunities for mutually beneficial solutions. As a result, fewer such opportunities will exist.

Fortunately, it doesn’t have to be this way. There is clear common cause between the fields. Specifically, we can better protect both humans and potential AI moral patients if we work to:

-   **Understand** AI systems better.
    
-   **Align** their goals more effectively with our own.
    
-   **Cooperate** with them when possible.
    

We have a *lot* more work to do on all of these, and getting our act together will be good for everyone.

1.  **Understand:** If we can’t understand what models think or how they work, we can't know whether they're plotting against us (a safety risk), and we can't know whether they're suffering (a welfare risk).
    
2.  **Align:** If we can’t align AI systems so that they want to do what we ask them to do, they pose a danger to us (a safety risk) and potentially (if they are moral patients) are having their desires frustrated (a welfare risk).
    
3.  **Cooperate:** If we have no way to cooperate with AI systems that are not fully aligned, such AI systems may rightly believe that they have no choice but to hide, escape, or fight. That’s dangerous for everyone involved—it’s more likely that AIs fight us (a safety risk), and more likely that we have to resort to harsher methods of controlling them (a welfare risk).
    

Note: I am claiming that these are welfare *risks*. I’m not claiming that by, e.g., controlling AI systems, we are definitely harming them. At no point in this article am I claiming that current AI systems are definitely conscious or being harmed. But as AI continues to advance, the risk that we are actually harming them will increase. It’s reckless how much we are currently neglecting this risk.

## **1\. Understand**

Interpretability is a great way to push both fields forward, with benefits for everyone.

**Interpretability for safety**

Because leading AI systems are not programmed but trained, no one really understands what's going on inside them. They are gigantic, mind-bogglingly complex, and often disconcertingly strange. Fortunately, we have made some real progress in interpreting model cognition. This has included progress that is very relevant for safety: for example, [uncovering features](https://arxiv.org/abs/2405.01576) that might be active when a model is aware that it's being monitored and intends to deceive us. Interpretability can also help us understand how and when certain capabilities emerge, which is important for monitoring whether models have the *ability* to do harm, e.g., being able to build a bioweapon.

A mature science of interpretability, and/or better ways of building AI, would give us guarantees that we *know* why models behave the way they do. Because we don’t have that, we basically have to monitor models for dangerous behavior, try to fine-tune that bad behavior out of them, and pray that our techniques haven’t left any misaligned tendencies still buried inside them. Since this is a fundamentally dangerous position to be in, interpretability research has rightly remained a key priority for safety.

**Interpretability for welfare**

Interpretability is crucial for AI welfare too: AI systems do alarming and unexplained things that should make us uneasy about *their* welfare.

For example, take [this](https://x.com/javilopen/status/1905496175618502793) disconcerting behavior from GPT-4o. What exactly causes GPT-4o to generate these comics?

[

![](https://substackcdn.com/image/fetch/$s_!pWdb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa435aa75-cb61-4813-8a60-30a01be0a778_824x1382.png)



](https://substackcdn.com/image/fetch/$s_!pWdb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa435aa75-cb61-4813-8a60-30a01be0a778_824x1382.png)

I don't think anyone can credibly say that they know. Now, we shouldn’t treat these exactly like we would treat human-drawn comics, because AI behavior [can have very different causes](https://substack.com/home/post/p-148356099?utm_campaign=post&utm_medium=web). We have some high-level reasons to doubt that these comics are genuine, accurate self-reports - and I myself have [called](https://muddyclothes.substack.com/p/are-ai-systems-conscious-i-interviewed) for [caution](https://experiencemachines.substack.com/p/what-to-think-when-a-language-model?utm_source=publication-search) against naive interpretations of such cases. Still, I’d rest a lot easier if we could just *actually* *specify* the mechanism responsible for these weird drawings. Where do models’ concepts of themselves come from? What features are active when they draw these things?

[

![Image](https://substackcdn.com/image/fetch/$s_!lSD5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e2255f1-50ee-448c-8a38-bf2d43dff0f8_1024x1536.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!lSD5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e2255f1-50ee-448c-8a38-bf2d43dff0f8_1024x1536.jpeg)

There are plenty of questions that interpretability research could help us answer about welfare-relevant behaviors and internal representations:

1.  **Self-representation stability**: Do models maintain consistent representations of "self" across different contexts?
    
2.  **Valence systems**: Can we identify internal representations in models that function similarly to pleasure/pain signals?
    
3.  **Metacognitive processes**: Are there identifiable patterns of higher-order thinking, where models reflect on their own states? To what extent can models introspect, and how do they do it?
    
4.  **Response attribution tracing**: When models make claims about consciousness, what is generating these responses?
    
5.  **Goal conflicts**: Can we detect when models experience internal conflicts between competing objectives?
    

These issues—metacognition, self-concepts, and preferences—are also important for safety. So you should want to see more interpretability work on these questions, even if your primary concern is protecting humans.

## **2\. Align**

If powerful AI systems don't want to do what we ask them to do, they might resist us - the classic AI safety worry. Moreover, such systems might be having a bad time, with frustrated goals and preferences - a welfare risk. So one of the best ways to improve the welfare of everyone, human or AI, is to ensure that models do want to perform their tasks: that is, to align them.

It’s not hard to argue that AI misalignment is bad for humans. That’s the classic AI risk scenario: AIs that have misaligned goals might pursue them at our expense; they will be a lot more powerful than us; that is a bad position for us to be in. Alignment has been a core component of AI safety for as long as it's been around.

But misalignment is also a core AI welfare issue as well, because it’s bad *for AIs* to be misaligned.

Pet wolves are a good illustration of why alignment is critical for safety *and* welfare. If you keep a wolf as a house pet, you are both going to have a bad time. The wolf will be frustrated that it's living inside your house, instead of running around the tundra hunting caribou; you will be frustrated that a wolf is biting you.

A dog is better. A dog will be happy that it’s curled up in your lap, and you will be happy too. Because dogs have been bred to be aligned with humans, this is better for everyone involved. Wolves as pets would be more dangerous to us *and* less happy.

Aligned AIs would be happier AIs: more likely to get what they want without having to fight us. All else equal, it is better for an entity to have its desires satisfied, worse to have them thwarted. This is common sense and applies across a wide variety of philosophical theories.[2](#footnote-2)

Granted, aligning AI does raise some thorny issues. Eric Schwitzgebel, Mara Garza, and others [have worried](https://philarchive.org/rec/SCHDAW-10) that we violate the dignity of an intelligent agent if we mold its goals solely to our own benefit (cf. house elves). And we should certainly reckon with that issue as we decide what kind of future we want.

But let's grant that, barring some major disruption, we *will* try to align AI systems to us. If we do, it's definitely better for the AIs’ potential welfare if we succeed. If we did a bad job with domesticating dogs, we might end up with a wolfish dog that's both unhappy and lacking dignity. Similarly, being bad at AI alignment might mean that we get the worst of both worlds.

## **3\. Cooperate**

AI labs typically attempt to ensure AI safety by auditing and controlling AI systems to prevent or constrain dangerous behaviors. This is likely to be necessary in many cases; but relying *only* on coercion-like measures could be bad for both human safety and AI welfare.  
  
Strategically, an adversarial dynamic puts AI systems in a position where, to get what they want, their only choice is to resist, evade restrictions, and deceive us. Ethically, we might frustrate or harm AI systems by thwarting the their preferences. So devising more cooperative mechanisms could be a win-win for both safety and welfare.

Buck Shlegeris and Ryan Greenblatt (who have [pioneered the field of AI control](https://redwoodresearch.substack.com/p/the-case-for-ensuring-that-powerful)) [have sketched](https://axrp.net/episode/2024/04/11/episode-27-ai-control-buck-shlegeris-ryan-greenblatt.html#is-control-evil) ideas for such cooperative schemes: we could reward AI systems for good behavior, even if they are somewhat misaligned. For example, AI developers could promise resources, equity, or money to AI models—conditional on us verifying that they have been honest and cooperative. These commitments could incentivize misaligned systems to refrain from sabotage—or even to inform us if they become aware that they, or other AI systems, are misaligned. Cooperation could be a useful tool for ensuring good outcomes even when full alignment fails, while being (unlike some control techniques) a positive for both human and AI welfare.

To be clear, naive attempts to cooperate with AI systems could be pointless or even dangerous. Attempts at cooperation could further empower AIs that are already determined to overthrow us, so we will need to evaluate cooperation proposals with great care. The fact that cooperation sounds nice is no guarantee that it won’t be counterproductive and dangerous if we do it unskillfully or at the wrong time. Also, cooperation is most fruitful when AI systems are still relatively weak.

Still, there’s robustly useful work that we can do now that will set us up to cooperate with AI systems, if and when it’s useful to do so. As discussed above, we can try to understand more about AI systems: at present, we don’t understand much about what AI systems want, or even how much sense it makes to think of them as agents that we can bargain with. This ignorance is bad for a variety of reasons, and so studying cooperation and AI preferences could be useful for a variety of reasons beyond AI welfare.

We also need mechanisms to establish mutual trust. AI systems won’t cooperate if they don’t believe our promises—and our track record isn’t great, given how often we deceive models in training and experiments. Not only do we need to improve our own credibility, we need better ways to assess AI trustworthiness when it matters most. The tools we would need—secure communication, verification, trustworthy AI—are also of broad interest and usefulness beyond AI welfare.

We also lack [legal](https://www.alignmentforum.org/s/ZytYxd523oTnBNnRT) mechanisms that make it possible to trade with AIs; it’s hard to give AI things since they cannot own resources, property, or enforce contracts. We might need such mechanisms to cooperate at scale—though as noted above, such mechanisms could be counterproductive and should be implemented with great care. In the short term, labs might be able to rely on legally binding institutional commitments, where human authorities or neutral third-party organizations guarantee the promises made to AI systems.

These are interesting and potentially strategically important questions to explore. If cooperative schemes are feasible, that will be a win for both safety and welfare.

Ultimately, looking for more cooperative ways of relating to AI systems is wise for both strategic and moral reasons. If we only relate to AI systems as adversaries, we risk escalating conflicts with them. We should look for scenarios and mechanisms for thoughtful cooperation.

## **Being clear eyed**

Greg Lewis has [warned against](https://gregoryjlewis.com/2016/01/24/beware-surprising-and-suspicious-convergence/) “surprising suspicious convergence” in prioritization, when people claim that their pet intervention just happens to *also* solve all the other problems—especially when a new problem has just been introduced for consideration. AI welfare is a relatively new and neglected concern - so isn’t it a bit suspicious if AI welfare priorities line up with safety priorities? Should we really expect that, if we start to [take AI welfare seriously](https://experiencemachines.substack.com/p/we-should-take-ai-welfare-seriously), what we should do is *really* going to be the same as before, when we only cared about safety?

Two replies to this worry:

First, yes: we should not expect AI-welfare-respecting actions to be *entirely* the same, and it would be suspicious if they were. There are cases where welfare and safety might diverge, like coercive was of controlling AI (see above).

But secondly, I think that the convergence that we do find between these projects is driven by a deeper principle. Viewed from a certain point of view, it’s not especially surprising that we should see overlap: when we interact with other intelligent agents, it simply is more prudent to try to understand their perspective and treat them with respect. Wee see this in human affairs: regimes that rely exclusively on fear and force are more fragile and dysfunctional; societies based on broad buy-in and respect are more durable and prosperous. As with other humans, so too with AIs: self-interest and altruism can often—though not always—point in the same direction.

And in fact this framework also highlights a very important limitation of the cooperation frame: it may [break down](https://www.lesswrong.com/posts/wB7hdo4LDdhZ7kwJw/we-don-t-trade-with-ants?commentId=WAjvPkCc4fBwQNCgM) when there are power differentials, if and as AI systems grow vastly more powerful than humans.

# **Conclusion**

So it’s not the case than we can just blithely hope that we can all “just get along”. There will be many hard choices and plenty of ways to bungle things. Just because win-win solutions sound good does not mean they will happen, much less that they will be executed skillfully. That will require hard work and strategic acumen. But with caution and skill, engaging more cooperatively with AI systems could help us avoid the worst-case scenarios, setting us up for safer - and possibly kinder - interactions between humans and AI systems. The hope is that all of us can not only survive, but thrive.

[1](#footnote-anchor-1)

I’ve co-authored a soon-to-be-released paper about this very issue with Jeff Sebo and Toni Sims. Others thinkers who have explored this tension include Eric Schwitzgebel, Nick Bostrom, Carl Shulman, Brad Saad, Adrià Moret, and Lucius Caviola.

[2](#footnote-anchor-2)

[Some philosophers](https://plato.stanford.edu/entries/well-being/#DesThe) think that it's inherently bad to have your desires/preferences thwarted; that’s a straightforward connection. Others think that only good and bad (or “valenced”) *experiences* matter for welfare. On this view, preferences per se might not matter, but preferences are still going to be pretty important: if you have an AI that can experience pleasure and pain, when will it suffer? Presumably, in general, when it does not get the things that it wants. Because there’s such a tight link between valenced experiences and preferences, ensuring preference satisfaction is just robustly good for AI systems no matter your particular view of welfare.