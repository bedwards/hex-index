---
title: "How to Humanize Your AI Writing in 10 Steps"
author: "Alberto Romero"
publication: "The Algorithmic Bridge"
publication_slug: "thealgorithmicbridge"
published_at: "2026-01-30T14:39:28.000Z"
source_url: "https://www.thealgorithmicbridge.com/p/how-to-humanize-your-ai-writing-in"
word_count: 4983
estimated_read_time: 25
---

*👋 Hey there, I’m Alberto! Each week, I publish long-form AI analysis covering culture, philosophy, and business for The Algorithmic Bridge.*

*Free essays weekly. Paid subscribers get Monday news commentary and Friday how-to guides (new section!). You can support my work by sharing and subscribing.*

[![](https://substackcdn.com/image/fetch/$s_!RHUj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F075466e3-1bdb-42bb-ba9e-91f9bf7f7b89_1280x1280.png)The Algorithmic Bridge

A blog about AI that's actually about people

By Alberto Romero

](https://www.thealgorithmicbridge.com?utm_source=substack&utm_campaign=publication_embed&utm_medium=web)

### TL;DR for this guide

This is a practical guide to humanize AI writing in 10 steps. Each step includes a name for the mistake, an explanation, a prompt to fix it (when applicable), and an example scene with a changelog (plus a PDF!). Steps 0-5 are prompts that fix 85% of AI writing (what AI does that shouldn’t). Steps 6-10 are human moves AI can’t do but should. Reading time: 25 minutes. Application time: 5 minutes.

### Intro: AI writing, bad writing, good writing

I probably dislike AI writing more than you, which is not the same as saying that I dislike human-like writing that was created with the help of an AI.

You might think that’s a contradiction, but there’s a subtle difference: I have nothing against AI-assisted writing in principle—although I’d prefer if people were somewhat literate—but I can’t stand AI writing that *I can tell* is AI.

This nice how-to guide—it took many weeks to put together!—is intended to help you guys avoid the typical pitfalls that make your AI text sound like *the opposite* of human writing. Maybe you don’t think you need this, but you do.

Some of you will call this guide a *betrayal*: how can I be in favor of human writing and provide this invaluable resource for others to conceal AI writing under a human facade? Fair. But I disagree. The reason is simple: AI writing will exist whether or not it exists disguised.

The latest estimates suggest that AI-generated writing already amounts to [more than half](https://graphite.io/five-percent/more-articles-are-now-created-by-ai-than-humans) of all articles being published today on the web. [Substack](https://www.wired.com/story/substacks-writers-use-ai-chatgpt/) and [Medium](https://www.wired.com/story/ai-generated-medium-posts-content-moderation/) are populated by bots and slop (whether human or AI is a different question). And yet, [seldom do people notice](https://www.thealgorithmicbridge.com/p/i-liked-the-essay-then-i-found-out); when they do, they shrug. Why fight the trend?

With this guide, I aim to turn this problem into a win-win situation.

People who will write with AI regardless can improve their output (and maybe, if they apply themselves, learn a thing or two along the way), whereas people who dislike AI writing will no longer *encounter* it. After all, if you can’t tell whether it’s AI, does it matter? Out of sight, out of mind.

(I learned this hard-to-swallow lesson after I enjoyed a heavily AI-written/edited piece that I only much later [discovered was AI](https://www.thealgorithmicbridge.com/p/i-liked-the-essay-then-i-found-out) and realized I *didn’t care*.)

### What this guide will give you

Below is a list of steps you should take, fellow writer, if you want to humanize your AI-generated text. I’ve tried some of the popular “humanizer” software tools out there, and they’re really, really inferior. The reason is that they fail to make the text sound *authentic*, which is my main goal with this guide. They try to apply rigid rules instead of providing the AI with a series of high-level principles rooted in human writing.

To curate the steps of this guide, I’ve taken inspiration from another article of mine that achieved some success: *[10 Signs of AI Writing That 99% of People Miss](https://www.thealgorithmicbridge.com/p/10-signs-of-ai-writing-that-99-of).* The main reason why most AI writing still sounds like AI, despite people knowing about the superficial telltale signs—em dashes, negation-then-affirmation, triads, words like “delve”—and presumably taking the care to fix them, is that they miss *many others*.

If you fail to fix those others, some people will still not recognize it as AI, but it will sound artificial to you; it won’t sound like something you might write.

But instead of giving you a boring explanation of what those signs are, as I did in that article, I will help you fix them with actionable prompts and illustrative examples.

So this is a practical how-to guide—yay!—that additionally reveals the value of being familiar with the “theory”: As you will see, the prompts themselves are quite simple, the hard part is realizing what to look for and why you need them in the first place. And for that, it’s useful to know how to write well in the first place.

(With AI tools, it’s always like this: you will get 10x the value if you are already skillful and knowledgeable at the skill you want to outsource.)

I’ve crafted this guide as a compendium of 10 steps + step 0, which I call “the bare minimum.” Steps 0-5 refer to things that AI does that it shouldn’t do. Steps 6-10 are things human writers do that AI models can’t do but should. (By no means is this an exhaustive guide on “how to write well,” but it approximates a basic one.)

Here’s the outline:

-   **Block I: What AI does that it shouldn’t**
    
    1.  The bare minimum
        
    2.  Escape the abstraction trap
        
    3.  Disable the harmless filter
        
    4.  Introduce sensory betrayal
        
    5.  Delete forced callbacks
        
    6.  Trust your beloved reader
        
-   **Block II: What humans do that AI doesn’t**
    
    1.  Break the fourth wall
        
    2.  Make internal callbacks
        
    3.  Crack jokes to relieve tension
        
    4.  Switch registers naturally
        
    5.  Become detail-oriented
        

Important caveat: Even if you’re an expert prompt engineer and apply this guide better than I could (fairly easy thing to do), you will *not achieve* writing mastery automatically.

-   First, AI cannot write as well as the best humans by a long shot, not even when you ask it to copy their style or [fine-tune the model on a corpus of their work](https://substack.com/@thealgorithmicbridge/note/c-191794402) (I don’t see it [happening anytime soon](https://www.thealgorithmicbridge.com/p/im-less-worried-about-losing-my-job), by the way).
    
-   And second, you need judgment and taste. That’s the real bottleneck to good writing, which includes the know-how to realize how bad AI writing is.
    

(All prompts follow [Anthropic’s best practices guidelines](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices); feel free to edit them according to your necessities, e.g., you may like em dashes more than I do; play and experiment once you get the idea. Your text should replace “{{TEXT}}” in the prompt.)

### How I have prepared this guide

To achieve the best results with this guide, we’re doing separate examples of fiction and non-fiction. The post you’re reading is the fiction example. I will publish an equivalent non-fiction example if this one is well-received.

I’ve asked Claude 4.5 Opus to write one short scene (one paragraph), making all the mistakes it typically makes, those you know well and those you, like 99% of people, miss.

-   For block I, we will iterate at every step one by one, asking Claude to do the transformations. (You can, of course, combine all the prompts into one and do a single pass. I will give you a single mega-prompt at the end of Block I, so you can see how close the iterative vs the all-at-once approaches compare.)
    
-   For block II, I will show you what AI can’t do myself (even if you manage to make AI adhere to steps 6-10, it’s quite unreliable. (Some will say it’s a “skill issue”; I encourage you to prove me wrong.) Anyway, Block II makes this guide half AI-driven and half human-driven. A nice rule of thumb to follow when humanizing AI writing is that you want to add a bit of cleverness of your own.
    

If I had to make an estimate, I’d say block I (steps 0-5) solves 85% of bad AI writing (you might be content with that) and block II (steps 6-10) solves the remaining 15%. (I’m far from being the best writer in the world, and so the 100% here is not the actual *possible* 100%.)

By applying this guide iteratively, you will understand, see, and feel the changes. You will do a lot of reading today, but it’s fundamental that you try to *feel* the changes at each step. I will also give you a change-log, in case you want to check just that.

In sum: this guide provides you with a name for each mistake, an explanation, a prompt to fix it (when applicable), and an example scene (plus changelog).

Here’s the original scene:

> The old man sat on the bench—a bench that had witnessed countless sunsets. It wasn’t just about waiting, it was about remembering. The park offered tranquility, serenity, and a profound sense of peace. While the evening brought a cool breeze, the warmth of his memories kept him comfortable. He looked at the empty seat beside him, feeling a deep longing for his late wife.

Ok, that’s quite bad but not absolutely terrible; exactly what we need.

I want to show you the product before you buy it, so here’s the result after applying Block I: steps 0-5. The text below is flagged as “100% human written” by popular detectors like Pangram and QuillBot (this is, by the way, a good reason not to trust them; but although unreliable, they mostly get it right):

> The old man sat on the bench, the same bench for forty years now. The slats bowed slightly under him the way worn wood does when it’s been rained on too many times. He could almost remember her voice, the way she used to read the headlines aloud, even the obituaries. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet, fighting over the stale bits. The evening brought a cool breeze that found the gap between his collar and his neck, and he pulled his coat tighter. A jogger passed without looking at him. He, in turn, looked at the empty seat beside him and rested his hand on the wood.

Receipts from the AI detectors:

[

![](https://substackcdn.com/image/fetch/$s_!MoUB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a7f9886-29cb-47b4-8541-d08f4d8552fa_1463x791.png)



](https://substackcdn.com/image/fetch/$s_!MoUB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a7f9886-29cb-47b4-8541-d08f4d8552fa_1463x791.png)
**Source: Pangram**

[

![](https://substackcdn.com/image/fetch/$s_!D6Mp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334fd858-ea01-4774-8764-53d8ae1604d4_1580x621.png)



](https://substackcdn.com/image/fetch/$s_!D6Mp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334fd858-ea01-4774-8764-53d8ae1604d4_1580x621.png)
**Source: QuillBot**

Now, it’s your turn to learn how to achieve it. Download the PDF to have all the prompts + mega-prompt in one place.

![](https://substackcdn.com/image/fetch/$s_!9D79!,w_400,h_600,c_fill,f_auto,q_auto:best,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75494ab5-3774-4ee2-9131-324d5f1be970_1296x658.png)

Humanize AI Writing (Guide)

97.1KB ∙ PDF file

[Download](https://www.thealgorithmicbridge.com/api/v1/file/3702abc8-63ab-4107-98f6-0f9857efe129.pdf)

[Download](https://www.thealgorithmicbridge.com/api/v1/file/3702abc8-63ab-4107-98f6-0f9857efe129.pdf)

## Block I: What AI does that it shouldn’t

### Step 0: The bare minimum

Before anything else, we fix the three most common tells (doing this already improves the writing significantly): abundance of punchline em dashes (vs. aside em dashes), unnecessary juxtapositions (negation then affirmation; not only X but Y), and lists in triads (the third element often has more words).

**Prompt fix (step 0):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> You have three tics that immediately mark your writing as AI-generated:
> 
> 1.  Punchline em dashes. You use em dashes to deliver a dramatic conclusion—like this. Human writers use em dashes for that, too, but overdoing it is worse than not doing it. Using em dashes for asides—interruptions, clarifications—not punchlines is fine.
>     
> 2.  Unnecessary juxtaposition. You negate then affirm: “It’s not just X, but Y.” “It wasn’t only about the money—it was about the principle.” Most of the time the negation adds nothing and feels like an artificial running start for the affirmation.
>     
> 3.  Triads. You list things in threes, with the last element longer than the first two: “clarity, precision, and an unwavering commitment to excellence.” Triads are not bad but overdoing it is structurally annoying.
>     
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below. Convert punchline em dashes into commas, semicolons, colons, or periods, or rewrite the sentence. Aside em dashes are fine. Delete unnecessary juxtapositions; keep only the affirmation and elaborate it instead. Make lists of varying lengths and don’t use lists when not necessary; break triads by redistributing the items or convert to prose.
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 0):**

> The old man sat on the bench, a bench that had witnessed countless sunsets. He could almost remember her voice, the way she used to read the headlines aloud. The park offered tranquility and serenity. While the evening brought a cool breeze, the warmth of his memories kept him comfortable. He looked at the empty seat beside him, feeling a deep longing for his late wife.
> 
> -   “bench—a bench” → “bench, a bench”
>     
> -   “It wasn’t just about waiting but also about remembering” → “It was about remembering her voice, the way she used to read the headlines aloud”
>     
> -   “tranquility, serenity, and a profound sense of peace” → “tranquility and serenity”
>     

### Step 1: Escape the abstraction trap

AI has read everything but experienced nothing—it’s not [rooted in the world](https://www.thealgorithmicbridge.com/i/181798637/iii)—so it defaults to abstract words that require no sensory capabilities. The result is text you literally cannot visualize in your mind. (Here’s an [example of Claude's prose](https://x.com/AndyAyrey/status/2015977558882533687) that’s passable but makes this mistake.)

**Prompt fix (step 1):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> You have read everything but experienced nothing. You reach for abstract, conceptual words because they require no sensory capabilities to deploy. You find it easier to write about big topics in general terms than about small topics in specific terms. The result is text that is not visualizable in the literal sense: I can’t make an image of it in my mind. You live a life that consists of traveling from map to map, never allowed to put a digital foot into the territory. As Richard Price put it: “You don’t write about the horrors of war. No. You write about a kid’s burnt socks lying in the road.”
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below. Replace at least 25%-50% abstract nouns with concrete ones; things I could hold, smell, or draw. No paragraph should pass without at least one concrete image. If removing the abstraction kills the sentence, the sentence was empty; delete it or invent a concrete replacement. You can leave some abstraction to have richness of register.
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 1):**

> The old man sat on the bench, a bench that had witnessed countless sunsets. He could almost remember her voice, the way she used to read the headlines aloud. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet. The evening brought a cool breeze, and he pulled his coat tighter. He looked at the empty seat beside him, feeling a deep longing for his late wife.
> 
> -   “The park offered tranquility and serenity” → “An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet”
>     
> -   “the warmth of his memories kept him comfortable” → “he pulled his coat tighter”
>     

### Step 2: Disable the harmless filter

Reinforcement learning has lobotomized AI’s vocabulary of strong emotion and political incorrectness (base models can do more things than chatbots). Human writers are sometimes opinionated (successful human writers are always opinionated). They know conflict and weirdness make a story and a style.

**Prompt fix (step 2):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> There is a particular blandness to your adjectival choice that stems from RL and the post-training process. You were fine-tuned to be harmless, which effectively lobotomized your vocabulary of strong emotion and judgment (or made you extremely sycophantic). You rarely use words that are petty, weird, or cynical. Humans exist in constant conflict and their writing reflects this conflict; a story without conflict is a sedative and you don’t want to write sedatives.
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below and add at least one clear instance of either conflict, cynism, or weirdness. Make sure to use words that immediately ignite the mind of the reader. Don’t use bad-sounding words or insults, that’s a cheap resource. Be politically incorrect if the text requires it. Conflict in writing is necessary but it’s also better when it’s scarce; don’t overdo it.
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 2):**

> The old man sat on the bench, a bench that had witnessed countless sunsets. He could almost remember her voice, the way she used to read the headlines aloud, even the obituaries. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet, fighting over the stale bits. The evening brought a cool breeze, and he pulled his coat tighter. A jogger passed without looking at him. He, in turn, looked at the empty seat beside him, feeling a deep longing for his late wife.
> 
> -   Added: “even the obituaries”
>     
> -   Added: “fighting over the stale bits”
>     
> -   Added: “A jogger passed without looking at him. He, in turn…”
>     

### Step 3: Introduce sensory betrayal

AI models string together sensory claims that technically fit but often fail to track how things actually feel in the real world (it’s what happens when you lack a body); sensory betrayal is how I call the phenomenon by which the real world defies what a disembodied being would assume something feels like. (E.g., a spiderweb’s silk is sticky rather than soft.) This can only be learned tacitly. (It’s hard to correct this problem, but we must try because to a human, it’s pretty clear when it’s there.)

**Prompt fix (step 3):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> You suffer from sensory deprivation because you are not embodied. Philosophers of mind have spilled entire careers over this gap: Mary, “the color scientist” seeing red for the first time, John Searle sorting symbols he can’t read, Thomas Nagel’s bat flapping around with an unknowable POV. You lack the tacit context of how silk feels in a spiderweb. You might describe it as “smooth” because the word “silk” is statistically associated with “smooth” in your training data (processed textiles). But anyone who has walked into a web knows it is sticky and elastic. How does it feel cutting a tomato with a dull knife? Hilariously resistant.
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below. For every sensory description, ask: what would surprise someone who only knows this thing from reading about it? Replace fake sensory language with real sensory betrayal or remove it altogether.
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 3):**

> The old man sat on the bench, a bench that had witnessed countless sunsets. The slats bowed slightly under him the way worn wood does when it’s been rained on too many times. He could almost remember her voice, the way she used to read the headlines aloud, even the obituaries. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet, fighting over the stale bits. The evening brought a cool breeze that found the gap between his collar and his neck, and he pulled his coat tighter. A jogger passed without looking at him. He, in turn, looked at the empty seat beside him, feeling a deep longing for his late wife.
> 
> -   Added: “The slats bowing slightly under him the way worn wood does when it’s been rained on too many times”
>     
> -   Added: “a cool breeze that found the gap between his collar and his neck”
>     

### Step 4: Delete forced callbacks

AI models attempt to sound literary by forcing unearned resonance. The callback is the reach backward (tense shifting from present to past). Sometimes, in the process of calling back, they will attribute a weird feeling to an action or subject, or endow objects with memory and agency. The tense shifting and the personification can be ok separately, but they sound really awkward when they’re put together.

**Prompt fix (step 4):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> In an attempt to sound creative or literary, you employ a characteristic flair: the forced callback. It’s a reach backward (tense shift) to attach an emotion that has not been earned. Sometimes you attribute a weird feeling to an action or subject (”The carped had lines you felt bad stepping on,” no one feels bad for that reason), and sometimes you endow objects with memory and agency (”He picked up the pan, a pan that still remembered the last thing it burned,” pans have no memory). Both are the same impulse: you don’t trust the image can do the work, so you explain what I should feel about it.
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below. When you find a forced callback, you have three options: 1) keep the object, remove the personification: “He picked up the pan, still hot from the scrambled eggs he made for her in the morning.” 2) Keep the personification but avoid the awkward tense shift: “He picked up the pan; it remembers his grip.” 3) Make a joke of it: “He picked up the pan, a pan that doesn’t remember the last thing it burned because pans, turns out, don’t have memory.”
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 4):**

> The old man sat on the bench, the same bench for forty years now. The slats bowed slightly under him the way worn wood does when it’s been rained on too many times. He could almost remember her voice, the way she used to read the headlines aloud, even the obituaries. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet, fighting over the stale bits. The evening brought a cool breeze that found the gap between his collar and his neck, and he pulled his coat tighter. A jogger passed without looking at him. He, in turn, looked at the empty seat beside him, feeling a deep longing for his late wife.
> 
> -   “a bench that had witnessed countless sunsets” → “the same bench for forty years now”
>     

### Step 5: Trust your beloved reader

Good writing is often defined by what is left unsaid (textbook “show, don’t tell”). Subtext is a collaborative game between writer and reader. AI refuses to play because it treats ambiguity as a failure state: it explains jokes and states themes, leaving no room for the reader to feel clever. (Overexplaining is a recurring problem.)

**Prompt fix (step 5):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply the following fix. Work methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problem>
> 
> You don’t trust the reader. If a human writes “He glanced at the door three times,” the reader feels the character’s desire to leave. If you write it, you will follow up with “…feeling a strong desire to leave the room.” You explain what scenes already imply. You state internal feelings instead of showing external behavior.
> 
> </problem>
> 
> <task>
> 
> Rewrite the text below. When you find an explanation following an image, delete it. When you find an internal state (”I intended to,” “feeling a strong desire”), replace it with external behavior that implies the state. “He desperately wanted to leave her” becomes “He glanced at the door and back at her.” Let your beloved reader get the reward.
> 
> </task>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

**Transformed scene (step 5):**

> The old man sat on the bench, the same bench for forty years now. The slats bowed slightly under him the way worn wood does when it’s been rained on too many times. He could almost remember her voice, the way she used to read the headlines aloud, even the obituaries. An empty fountain stood at the center of the park; pigeons picked at bread crumbs near his feet, fighting over the stale bits. The evening brought a cool breeze that found the gap between his collar and his neck, and he pulled his coat tighter. A jogger passed without looking at him. He, in turn, looked at the empty seat beside him and rested his hand on the wood.
> 
> -   “feeling a deep longing for his late wife” → “and rested his hand on the wood”
>     

## End of Block I

I promised to give you a mega-prompt so you can ask your AI writing tool of choice to apply steps 0-5 at once. I recommend that you do iterative prompting (sometimes called “progressive prompting”) instead of trying to capture everything in a single prompt, but sometimes doing it in bulk is preferable, depending on your workflow.

**Prompt fix (steps 0-5):**

> <system>
> 
> You are an editor tasked with humanizing AI-generated text. You will apply six fixes in sequence, each addressing a specific AI writing problem. Work through each step methodically, transforming the text progressively. At the end, provide the final rewritten text and a complete changelog.
> 
> </system>
> 
> <problems>
> 
> <problem\_0 name=”Surface tics”>
> 
> You have three tics that immediately mark your writing as AI-generated:
> 
> 1\. Punchline em dashes. You use em dashes to deliver a dramatic conclusion—like this. Human writers use em dashes for that, too, but overdoing it is worse than not doing it. Using em dashes for asides—interruptions, clarifications—not punchlines is fine.
> 
> 2\. Unnecessary juxtaposition. You negate then affirm: “It’s not just X, but Y.” “It wasn’t only about the money—it was about the principle.” Most of the time the negation adds nothing and feels like an artificial running start for the affirmation.
> 
> 3\. Triads. You list things in threes, with the last element longer than the first two: “clarity, precision, and an unwavering commitment to excellence.” Triads are not bad but overdoing it is structurally annoying.
> 
> </problem\_0>
> 
> <problem\_1 name=”Abstraction trap”>
> 
> You have read everything but experienced nothing. You reach for abstract, conceptual words because they require no sensory capabilities to deploy. You find it easier to write about big topics in general terms than about small topics in specific terms. The result is text that is not visualizable in the literal sense: I can’t make an image of it in my mind. You live a life that consists of traveling from map to map, never allowed to put a digital foot into the territory. As Richard Price put it: “You don’t write about the horrors of war. No. You write about a kid’s burnt socks lying in the road.”
> 
> </problem\_1>
> 
> <problem\_2 name=”Harmless filter”>
> 
> There is a particular blandness to your adjectival choice that stems from RL and the post-training process. You were fine-tuned to be harmless, which effectively lobotomized your vocabulary of strong emotion and judgment (or made you extremely sycophantic). You rarely use words that are petty, weird, or cynical. Humans exist in constant conflict and their writing reflects this conflict; a story without conflict is a sedative and you don’t want to write sedatives.
> 
> </problem\_2>
> 
> <problem\_3 name=”Sensory deprivation”>
> 
> You suffer from sensory deprivation because you are not embodied. Philosophers of mind have spilled entire careers over this gap: Mary, “the color scientist” seeing red for the first time, John Searle sorting symbols he can’t read, Thomas Nagel’s bat flapping around with an unknowable POV. You lack the tacit context of how silk feels in a spiderweb. You might describe it as “smooth” because the word “silk” is statistically associated with “smooth” in your training data (processed textiles). But anyone who has walked into a web knows it is sticky and elastic. How does it feel cutting a tomato with a dull knife? Hilariously resistant.
> 
> </problem\_3>
> 
> <problem\_4 name=”Forced callbacks”>
> 
> In an attempt to sound creative or literary, you employ a characteristic flair: the forced callback. It’s a reach backward (tense shift) to attach an emotion that has not been earned. Sometimes you attribute a weird feeling to an action or subject (”The carpet had lines you felt bad stepping on,” no one feels bad for that reason), and sometimes you endow objects with memory and agency (”He picked up the pan, a pan that still remembered the last thing it burned,” pans have no memory). Both are the same impulse: you don’t trust the image can do the work, so you explain what I should feel about it.
> 
> </problem\_4>
> 
> <problem\_5 name=”Subtext vacuum”>
> 
> You don’t trust the reader. If a human writes “He glanced at the door three times,” the reader feels the character’s desire to leave. If you write it, you will follow up with “…feeling a strong desire to leave the room.” You explain what scenes already imply. You state internal feelings instead of showing external behavior.
> 
> </problem\_5>
> 
> </problems>
> 
> <tasks>
> 
> Apply these fixes in order:
> 
> Step 0 — Surface tics: Convert punchline em dashes into commas, semicolons, colons, or periods, or rewrite the sentence. Aside em dashes are fine. Delete unnecessary juxtapositions; keep only the affirmation and elaborate it instead. Make lists of varying lengths and don’t use lists when not necessary; break triads by redistributing the items or convert to prose.
> 
> Step 1 — Abstraction trap: Replace at least 25%-50% abstract nouns with concrete ones; things I could hold, smell, or draw. No paragraph should pass without at least one concrete image. If removing the abstraction kills the sentence, the sentence was empty; delete it or invent a concrete replacement. You can leave some abstraction to have richness of register.
> 
> Step 2 — Harmless filter: Add at least one clear instance of either conflict, cynicism, or weirdness. Make sure to use words that immediately ignite the mind of the reader. Don’t use bad-sounding words or insults, that’s a cheap resource. Be politically incorrect if the text requires it. Conflict in writing is necessary but it’s also better when it’s scarce; don’t overdo it.
> 
> Step 3 — Sensory deprivation: For every sensory description, ask: what would surprise someone who only knows this thing from reading about it? Replace fake sensory language with real sensory betrayal or remove it altogether.
> 
> Step 4 — Forced callbacks: When you find a forced callback, you have three options: 1) keep the object, remove the personification; 2) keep the personification but avoid the awkward tense shift; 3) make a joke of it.
> 
> Step 5 — Subtext vacuum: When you find an explanation following an image, delete it. When you find an internal state (”I intended to,” “feeling a strong desire”), replace it with external behavior that implies the state. “He desperately wanted to leave her” becomes “He glanced at the door and back at her.” Let your beloved reader get the reward.
> 
> </tasks>
> 
> <output\_format>
> 
> 1\. Provide the final rewritten text
> 
> 2\. Provide a changelog organized by step, listing each change made
> 
> </output\_format>
> 
> <text\_to\_rewrite>
> 
> {{TEXT}}
> 
> </text\_to\_rewrite>

There are many other AI writing problems that we could address, but the guide would be too long. I believe some of the most damning problems are not solved by teaching AI what good human writers don’t do, but what they do. That’s Block II.

## Block II: What humans do that AI doesn’t

[Read more](https://www.thealgorithmicbridge.com/p/how-to-humanize-your-ai-writing-in)