---
title: "What is Infinity, Exactly?"
author: "Curt Jaimungal"
publication: ""
publication_slug: "curtjaimungal"
published_at: "2026-02-14T17:31:59.000Z"
source_url: "https://curtjaimungal.substack.com/p/what-is-infinity-exactly"
word_count: 1815
estimated_read_time: 10
---

For over 2,000 years, humanity insisted that infinity was only *potential* (roughly, this means you can always add “one more,” but you never actually arrive). Aristotle thought so; Gauss just said so. Then Cantor showed up with a sort of hearsay we’re still fighting about to this day.

**He treated infinite collections as completed objects in and of themselves.** Then he proved there are strictly more of them than anyone imagined. Kronecker called Cantor a “corrupter of youth.” Poincaré called Cantor’s work a “disease.” **Cantor died in a sanatorium.**

Turns out, Cantor was right all along. Here’s what’s going on.

[

![](https://substackcdn.com/image/fetch/$s_!IvXw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F35401081-34ed-43b0-a893-d961d600fea9_603x450.png)



](https://substackcdn.com/image/fetch/$s_!IvXw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F35401081-34ed-43b0-a893-d961d600fea9_603x450.png)

# Potential vs. Actual

The distinction is sharper than it sounds. A *potential* infinity is a **process**: you keep counting 1, 2, 3, ... and you never stop. At no point do you hold “the completed collection of all natural numbers” in your hand. An *actual* infinity says: that collection exists, right now, as a single object. You can examine its properties. You can compare it to other collections. You can ask difficult questions about its “size.” You get the idea. **Cantor’s great heresy was insisting on the latter, and then doing some math with it.**

His first discovery was peculiar: **there are just as many even numbers as natural numbers.** This is because you have to be specific as to what you mean by “just as many” (or “size” AKA “cardinality”). Two sets are of the same “size” if you can pair them up *exactly*.

Here’s how it looks for the even numbers with the full natural numbers. Pair 1↔2, 2↔4, 3↔6, ... You’ll notice nothing’s left over. Same for the integers. Same for the rationals (which seems absurd, since the rationals are *dense* in the real line). But Cantor found a *bijection* (a one-to-one pairing) between **ℕ** and **ℚ**. The exact way you can form these pairings is clever and too much for these margins, but you can look it up.

# All Countable Infinities Are Secretly Twins

The lesson is that **every countable infinite set you throw at Cantor turns out to have the same “size.”** Because he’s a mathematician and wants no ambiguity, he stopped using the **∞** symbol and called this size ***ℵ*****₀** (aleph-null). Intuitively, it seems like all infinities are equal.

After all, think about it. If you add 157 to **∞** you just get **∞**. Same if you do **∞** − 157. So what number (outside of infinity itself) can you add or take away from infinity to give you something other than infinity? Actually, *this is the defining property of infinity!* I remember hearing this for the first time as a definition and thought it was so darn brilliant: **“Something is infinite if you can take a finite amount away from it and it doesn’t change size.”**

# The Real Numbers Are The Fun Uncle

Later on, Cantor proved that the real numbers **ℝ** can’t be paired one-to-one with **ℕ**. The argument is a **[proof by contradiction](https://plato.stanford.edu/entries/continuum-hypothesis/)**: let’s suppose you’ve listed all reals between 0 and 1. Now build a new real that differs from the *n*\-th entry in its *n*\-th decimal digit. It’s not on your list. Your list wasn’t complete. Done. So ***|ℝ| > ℵ*****₀**. The cardinality of the reals is written ***2*****^*****ℵ*****₀**.

It’s quite wonky. Why “***2*****^*****ℵ*****₀**“? Why not say “***ℵ*****₁**“? Turns out, this is precisely what the “continuum hypothesis” you may have heard of is about.

Each real number, expressed in binary, is an infinite sequence of 0s and 1s. The collection of all such functions has cardinality ***2*****^*****ℵ*****₀**. But there’s nothing deep about the “2” here. (Sorry dualists.)

**The base doesn’t matter.** ***2*****^*****ℵ*****₀ =** ***3*****^*****ℵ*****₀ =** ***7*****^*****ℵ*****₀**. For any finite ***n*** **≥ 2**, the number of infinite sequences over an *n*\-symbol alphabet equals the number over a 2-symbol alphabet. Even ***ℵ*****₀^*****ℵ*****₀** (the set of *all* functions **ℕ → ℕ**) equals ***2*****^*****ℵ*****₀**, because:

(since ***ℵ*****₀ ·** ***ℵ*****₀ =** ***ℵ*****₀**). The “2” in ***2*****^*****ℵ*****₀** is cosmetic / standard notation.

If you’re confused, it doesn’t actually matter. All it means is any finite real number is expressed like 29.127223157... I can ask you “what’s the first digit?” You say “2”. I ask you the second, you say “9”. I ask you the third, and you say it’s the decimal; I ask you the fourth and you say “1”, and the fifth is “2”, etc. **This means any real number can be thought of as a function from ℕ** (the part where I was like “hey, what’s the first digit? the second? etc.”) **to {0,1,2,3,4,5,6,7,8,9}** (that is, all of your potential answers.)

Here’s something that *genuinely* disturbed me: **|*****ℝ*****|** ***=*** **|*****ℂ*****|**. The real line has exactly as many points as the complex plane. And **|*****ℝ²*****|** ***=*** **|*****ℝ*****|**. And **|*****ℝ¹⁰⁰*****|** ***=*** **|*****ℝ*****|**. Cantor himself wrote to Dedekind: **“I see it, but I don’t believe it.”**

The reason is cardinal arithmetic:

because ***2 · ℵ*****₀ =** ***ℵ*****₀**. Doubling a countably infinite cardinal doesn’t change it. Since **ℂ** is just **ℝ²** as a set, **|*****ℂ*****|** ***=*** **|*****ℝ*****|**. This generalizes: **|*****ℝⁿ*****|** ***=*** **|*****ℝ*****|** for every finite ***n***, and **|*****ℂⁿ*****|** ***\=*** **|*****ℝ*****|** too. **Dimension is the thing your geometric intuition tells you** ***must*** **affect the number of points, but it’s actually completely invisible to cardinality.**

Thanks for reading! This post is public so feel free to share it.

# The Two Machines for Creating Infinities

How do you get *more* infinities? Cantor discovered that there are exactly two machines for manufacturing bigger infinities, and they work by entirely different mechanisms.

**Machine 1: the power set.** For any set ***X***, form ***P*****(*****X*****)** (the set of all subsets of ***X***). **[Cantor’s theorem](https://plato.stanford.edu/entries/continuum-hypothesis/)** proves **|*****P*****(*****X*****)|** **\> |*****X*****|**\*, always, by another diagonal argument. Apply it iteratively: ***P*****(ℕ)** has cardinality ***2*****^*****ℵ*****₀**, then ***P*****(*****P*****(ℕ))** has cardinality ***2*****^(*****2*****^*****ℵ*****₀)**, then ***2*****^(*****2*****^(*****2*****^*****ℵ*****₀))**, and so on. Each is strictly larger than the last. You never run out.

**Machine 2: the successor cardinal.** Define ***ℵ*****₁** as the *smallest* cardinality strictly greater than ***ℵ*****₀**. Then ***ℵ*****₂** as the next one after that. And so on, giving you the aleph hierarchy: ***ℵ*****₀,** ***ℵ*****₁,** ***ℵ*****₂, ...** “But wait Curt... How do you know there *is* a smallest cardinality above ***ℵ*****₀**?”

With finite numbers it’s obvious (after 7 comes 8). But ***ℵ*****₀** isn’t a finite number. Why can’t there be a “smeared continuum” of cardinalities above ***ℵ*****₀** with no discrete next step? **The answer is a theorem by Hartogs.** For *any* set ***X***, Hartogs explicitly constructs an ordinal that can’t be injected into ***X***. No axiom of choice needed here as far as I can tell.

When ***X*** **= ℕ**, this gives ***ω*****₁**, called the *first uncountable ordinal*, whose cardinality is ***ℵ*****₁** by definition. The “next” infinity isn’t assumed. **It’s** ***built*****.**

I used to be confused here because I didn’t know the difference between the omega (***ω*****₁**) and the ***ℵ*****₁**. A way that I think about it is like this: ordinals such as ***ω*****₁** describe a specific *arrangement* (a way of lining things up where every element has a definite “next”). But cardinals (such as ***ℵ*****₁**) describe pure *size*... just a headcount. Many different ordinals can share the same cardinality, just like many different seating arrangements on a bus can seat the same number of people. Except the line-up to the bus is infinite. Sounds like Toronto.

# The Continuum Hypothesis

So the obvious question: do the two machines agree at the first step? Is the output of Machine 1 (which gives ***2*****^*****ℵ*****₀**) the same as the output of Machine 2 (which gives ***ℵ*****₁**)? In other words: **is** ***2*****^*****ℵ*****₀ =** ***ℵ*****₁?**

**This is the [Continuum Hypothesis](https://plato.stanford.edu/entries/continuum-hypothesis/)!** You’ve worked your way across thousands of years of human history in (let me check the cardinality of this post)... 1,200 words!

Quite cool that a 1,200 rung ladder can lead you to infinity.

There’s so much more to say, such as how the CH was the first problem on **[Hilbert’s famous 1900 list](https://www.simonsfoundation.org/2020/05/06/hilberts-problems-23-and-math/)**. How Gödel showed that you can’t disprove CH from the standard axioms of set theory (ZFC). How Cohen showed in 1963 that you can’t prove it either. How this means **the CH is independent of ZFC**, and how wild it is that there exist statements that are “independent.” This is worth a post of its own. (For more on what “independence” means and how Gödel’s work connects here, see my **[post on misinterpretations of Gödel’s theorem](https://curtjaimungal.substack.com/p/misinterpretations-of-godels-theorem)**.)

Anyhow, all of this is extremely abstract. Yes, paradoxically, it’s *extremely concrete!* **Infinity is where the abstract and concrete meet.** Every construction here is a specific, finite, checkable mathematical procedure. Cantor’s diagonal argument fits on a napkin. Hartogs’ construction is an explicit recipe you can follow step by step. Cohen’s forcing method is a technique you can sit down and execute (with patience, Adderall, and disgruntlement). The objects being discussed are “infinite,” but the reasoning about them is *entirely finite*. Even mechanical. **You know exactly what you’re doing at every step.**

# Finitists Are the Neighbors With Plastic on Their Couches

Note: not everyone accepts the output. There are mathematicians, *finitists*, who reject actual infinity entirely. To a finitist, ***ℵ*****₀** isn’t a real mathematical object; it’s at best a useful fiction. At worst a symbol pointing at nothing! Hilbert flirted with a version of this position. A stronger stance, *ultrafinitism*, goes further: even super-large finite numbers like **10^(10^(10))** are suspect, because no physical process could ever instantiate them. It’s an interesting melding of math and physics.

Edward Nelson and Alexander Esenin-Volpin held versions of this view. To an ultrafinitist, asking “what is ***2*****^*****ℵ*****₀**?” is like asking “what’s orange about the jumping?” A question of nonsense. (For a deep dive into the finitist challenge to infinity, see my conversation with **[Norman Wildberger on](https://youtu.be/l7LvgvunVCM)** ***[Theories of Everything](https://youtu.be/l7LvgvunVCM)***.)

**Most working mathematicians find infinity indispensable.** Hugh Woodin (one of the most important living set theorists, and someone I’ll be speaking with on ***[Theories of Everything](https://www.youtube.com/@TheoriesofEverything)***) has spent decades arguing that the Continuum Hypothesis *does* have a definite answer. His position is that ZFC is simply too weak to detect it, and that stronger axioms (large cardinal axioms, his Ultimate‑L program) can settle the question.

**The debate is alive.** And depending on your view, the fact that it’s a debate at all (that mathematicians can disagree not about whether a proof is valid, but about whether the objects the proof discusses *exist*) tells you something *exciting* or *unsettling* about the foundations on which the rest of math sits.

\---

I want to hear from you in the Substack comment section below. **I read each and** ***every*** **response.**

—*Curt Jaimungal*

**PPS:** To go even further with infinites, try out infinity categories. This is my interview with Emily Riehl, where she presents infinity categories at the most basic level. It’s still challenging.

**PPS:** Do **[consider becoming a paying member on this Substack](https://curtjaimungal.substack.com/subscribe)**. This is how I earn a living, as I’m *directly* reader-supported. Moreover, you’ll get a slew of exclusive content such as early access to full podcasts. If you like the free content, you’ll love the **[members-only content](https://curtjaimungal.substack.com/subscribe)**.