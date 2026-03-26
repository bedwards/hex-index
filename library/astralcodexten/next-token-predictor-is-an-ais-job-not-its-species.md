---
title: "Next-Token Predictor Is An AI's Job, Not Its Species"
author: "Scott Alexander"
publication: ""
publication_slug: "astralcodexten"
published_at: "2026-02-26T05:24:27.000Z"
source_url: "https://www.astralcodexten.com/p/next-token-predictor-is-an-ais-job"
word_count: 2008
estimated_read_time: 11
---

**I.**

In *The Argument*, [Kelsey Piper gives a good description](https://www.theargumentmag.com/p/when-technically-true-becomes-actually) of the ways that AIs are more than just “next-token predictors” or “stochastic parrots” - for example, they also use fine-tuning and RLHF. But commenters, while appreciating the subtleties she introduces, object that they’re still just extra layers on top of a machine that *basically* runs on next-token prediction.

[

![](https://substackcdn.com/image/fetch/$s_!NY0t!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F436e25d1-fd45-4a6c-ad41-a4df08724ba0_627x124.png)



](https://substackcdn.com/image/fetch/$s_!NY0t!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F436e25d1-fd45-4a6c-ad41-a4df08724ba0_627x124.png)

I want to approach this from a different direction. I think overemphasizing next-token prediction is a confusion of levels. On the levels where AI is a next-token predictor, you are also a next-token (technically: next-sense-datum) predictor. On the levels where you’re not a next-token predictor, AI isn’t one either.

Putting all the levels in graphic form:

[

![](https://substackcdn.com/image/fetch/$s_!3cIw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a046e04-441e-4153-b755-557f8a9f8626_546x711.png)



](https://substackcdn.com/image/fetch/$s_!3cIw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a046e04-441e-4153-b755-557f8a9f8626_546x711.png)

**II.**

The human brain was designed by a series of nested optimization loops. The outermost loop is evolution, which optimized the human genome for being good at survival, sex, reproduction, and child-rearing.

But evolution can’t encode everything important in the genome. It obviously can’t include individual and cultural features like the vocabulary of your native language, or your particular mother’s face. But even a lot of things that could be in there in theory, like how to walk, or which animals are most nutritious, are missing - the genome is too small for it to be worth it. Instead, evolution gives us algorithms that let us learn from experience.

These algorithms are a second optimization loop, “evolving” neuron patterns into forms that better promote fitness, reproduction, etc. The most powerful such algorithm is called [predictive coding](https://slatestarcodex.com/2017/09/05/book-review-surfing-uncertainty/), which neuroscience increasingly considers a key organizing principle of the brain. [Wikipedia describes it as](https://en.wikipedia.org/wiki/Predictive_coding):

> In neuroscience, **predictive coding** (also known as predictive processing) is a theory of brain function which postulates that the brain is constantly generating and updating a “mental model” of the environment. According to the theory, such a mental model **is used to predict input signals from the senses** that are then compared with the actual input signals from those senses.

In other words, the brain organizes itself/learns things by constantly trying to predict the next sense-datum, then updating synaptic weights towards whatever form would have predicted the next sense-datum most efficiently. This is a very close (not exact) analogue to the next-token prediction of AI.

This process organizes the brain into a form capable of predicting sense-data, called a “world-model”. For example, if you encounter a tiger, the best way of predicting the resulting sense-data (the appearance of the tiger pouncing, the sound of the tiger’s roar, the burst of pain at the tiger’s jaws closing around your arm) is to know things about tigers. On the highest and most abstract levels, these are things like “tigers are orange”, “tigers often pounce”, and “tigers like to bite people”. On lower levels, they involve the ability to translate high-level facts like “tigers often pounce” into a probabilistic prediction of the tiger’s exact trajectory. All of this is done via neural circuits we don’t entirely understand, and implemented through the usual neuroscience stuff like synapses and neurotransmitters. To you it just feels like “IDK, I thought about it and realized the tiger would pounce over there.”

[

![Tiger Pounce in Lush Green Field](https://substackcdn.com/image/fetch/$s_!drH-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4043e11c-d3c5-4358-9cc3-0d93ed30aa9a_735x588.jpeg "Tiger Pounce in Lush Green Field")



](https://substackcdn.com/image/fetch/$s_!drH-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4043e11c-d3c5-4358-9cc3-0d93ed30aa9a_735x588.jpeg)

**III.**

The AIs’ equivalent of evolution is the AI companies designing them. Just like evolution, the AI companies realized that it was inefficient to hand-code everything the AIs needed to know (“giant lookup table”) and instead gave the AIs learning algorithms (“deep learning”). As with humans, the most powerful of these learning algorithms was next-token prediction. This algorithm feeds the AI a stream of tokens, then updates the AI’s innards into a form that would have predicted the next token efficiently.

But this doesn’t mean the AI’s innards look like “Hmmmm, what will the next token be?” The AI certainly isn’t answering your math question by thinking something like “Hmmmm, she used the number three, which has the tokens *th* and *ree*, and I know that there’s a 8.2% chance that *ree* is often seen somewhere around the token *ix*, so the answer must be six!” How would that even work?

Instead, consider your own evolution. On the outermost level, humans were designed by a process optimizing for survival, sex, and reproduction. The humans that survived were those that had sex and reproduced. Everything about humans is downstream of what helped with sex and reproduction. But that doesn’t mean that any particular thought that you think involves reproduction or sex. If you’re doing a math problem, you won’t think “Hmmmm, how can I have sex with the number three?” You’re not even thinking “In order to reproduce I need to survive, to survive I need money, to get money I need a good job, to get a good job I good grades, and to get good grades I need to get the answer to this math problem - therefore the answer is seventy six!” You’re just doing good, normal, math. The evolutionary process that designed the learning algorithms that power your brain “was” “thinking” “about” survival and sex and reproduction, but you may never consider those things at all in the course of any given task.

(cf. [Organisms Are Adaptation-Executors, Not Fitness Maximizers](https://www.lesswrong.com/posts/XPErvb8m9FapXCjhA/adaptation-executers-not-fitness-maximizers), which does a good job hammering in the point that we run algorithms designed by the evolutionary imperative to maximize survival and reproduction, rather than considering survival and reproduction explicitly in our decisions. When a monk decides to swear an oath of celibacy and never reproduce, he does so using a brain that was optimized to promote reproduction - just using it very far out of distribution, in an area where it no longer functions as intended.)

One level lower down, your brain was shaped by next-sense-datum prediction - partly you learned how to do addition because only the mechanism of addition correctly predicted the next word out of your teacher’s mouth when she said “three plus three is . . . “ (it’s more complicated than this, sorry, but this oversimplification is basically true). But you don’t feel like you’re predicting anything when you’re doing a math problem. You’re just doing good, normal mathematical steps, like reciting “P.E.M.D.A.S.” to yourself and carrying the one.

In the same way, even though an AI was shaped by next-token prediction, the inside of its thoughts doesn’t look like next-token prediction. In the abstract, it probably looks like a world-model, the same as yours. In the concrete . . .

The science of figuring out what an AI’s innards are concretely doing is called *mechanistic interpretability*. It’s very hard to do - AI innards are notoriously confusing - and one team at Anthropic produces most of the headline results. Recently, [they explored how Claude predicts where a line break will be in a page of text](https://transformer-circuits.pub/2025/linebreaks/index.html). Since line break is a token, this is literally a next-token prediction task.

[

![](https://substackcdn.com/image/fetch/$s_!pogR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F410e6887-f039-48e8-b7ec-059d35a20c72_993x660.png)



](https://substackcdn.com/image/fetch/$s_!pogR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F410e6887-f039-48e8-b7ec-059d35a20c72_993x660.png)

The answer was: the AI represents various features of the line breaking process as one-dimensional helical manifolds in a six-dimensional space, then rotates the manifolds in some way that corresponds to multiplying or comparing the numbers that they’re representing. You don’t need to understand what this means, so I’ve relegated my half-hearted attempt to explain it to a footnote[1](#footnote-1). From our point of view, what’s important is that this doesn’t look like “LOL, it just sees that the last token was *ree* and there’s a 12.27% of a line break token following *ree*.” Next-token prediction created this system, but the system itself can involve arbitrary choices about how to represent and manipulate data.

Human neuron interpretability is even harder than AI neuron interpretability, but probably your thoughts involve something at least as weird as helical manifolds in 6D spaces. I searched the literature for the closest human equivalent to Claude’s weird helical manifolds, and was able to find one team talking about how the entorhinal cells in the hippocampus, which help you track locations in 2D space, use “high-dimensional toroidal attractor manifolds”. You never think about these, and if Claude is conscious, it doesn’t think about its helices either[2](#footnote-2). These are just the sorts of strange hacks that next-token/next-sense-datum prediction algorithms discover to encode complicated concepts onto physical computational substrate.

**IV.**

So my answer to the “just a next-token predictor” / “just a bag of words” / “just a stochastic parrot” literature is that this confuses levels of optimization.

[

![](https://substackcdn.com/image/fetch/$s_!3cIw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a046e04-441e-4153-b755-557f8a9f8626_546x711.png)



](https://substackcdn.com/image/fetch/$s_!3cIw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a046e04-441e-4153-b755-557f8a9f8626_546x711.png)

The most compelling analogy: this is like expecting humans to be “just survival-and-reproduction machines” because survival and reproduction were the optimization criteria in our evolutionary history. There is, of course, some sense in which we *are* just survival-and-reproduction machines: we don’t have any faculties that can’t be explained through their effects on survival and reproduction. But this doesn’t mean we “don’t really think” or “don’t really understand” because we’re “really just trying to have sex” when we work on a math problem.

This simple analogy is slightly off, because it’s confusing two optimization levels: the outer optimization level (in humans, evolution optimizing for reproduction; in AIs, companies optimizing for profit) with the inner optimization level (in humans, next-sense-datum prediction; in AIs, next-token prediction). But the stochastic parrot people probably haven’t gotten to the point where they learn that humans are next sense-datum predictors, so the evolution/reproduction one above might make a better didactic tool.

Below these prediction algorithms optimizing for various things are all the structures, algorithms, world-models, and thought-processes they’ve created. In both humans and AIs, these look like good, normal thinking. You do math by remembering P.E.M.D.A.S and carrying the one. You deal with angry tigers by remembering principles like “tigers like to pounce” and “when an animal pounces, its actions will follow the laws of physics, which I intuitively approximate as X, Y, and Z”.

Below these intuitive processes are bizarre low-level algorithms involving helices and toroids. These are approximately equally creepy in humans and AIs, which makes sense, because they were designed by the same inhuman process (next-sense-datum / next-token prediction) and operate on similar materials (neural tissue, weights connected by parameters).

Nothing about any of these levels of explanations supports a contention like “Humans are doing REAL THOUGHT, but AIs are simply next-token predictors.” There will be some algorithmic differences, and some of those might be important, and we can talk about their implications, but they’re downstream of what specific prediction tasks each entity was trained on and what strengths and weaknesses their own “evolutionary” history gives them.

The stochastic parrot people have many other arguments involving hallucinations, the differences between tokens and sense-data, etc. I’m hoping to combine all my writing on this into an Anti-Stochastic-Parrot FAQ, so don’t worry if I don’t immediately rebut all of them in this post.

[1](#footnote-anchor-1)

My extremely half-hearted attempt at understanding this claim: the AI needs to track things like whether you’re on character 1, 2, 3, etc of the current line. The simplest way to do this would be to have one feature for “the state of being on character #1”, another for “the state of being on character #2”, etc. Since AI features can be modeled as dimensions, this would correspond to locating the current character count in a 100 dimensional space, which would work. But this is expensive in feature count: a document with 100 characters per line would take 100 features for this simple task.

Another simple way to do this would be to have one feature whose value gets higher as the character count goes up. This would correspond to locating the character count in a 1-dimensional space, aka a straight line. This fails for two technical reasons: first, AIs can’t manipulate feature values that finely, and second, the AI needs to compare this feature to some other feature representing expected number of characters before the line break, and it can’t directly compare feature values in this sense.

Its solution is: since 1 dimension is too small, and 100 dimensions is too many, compromising and using some medium number of dimensions, which turns out to be 6. Trying to map things in 6-dimensional space naturally produces these helical manifold structures, and comparing them to each other naturally looks like rotating the manifolds.

[2](#footnote-anchor-2)

Or to frame it in a less controversial way, you couldn’t discover these helices by asking Claude in the chat window to tell you about them.