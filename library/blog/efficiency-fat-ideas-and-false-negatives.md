---
title: "Efficiency, Fat Ideas, and False Negatives"
author: "Ben Reinhardt"
publication: ""
publication_slug: "blog"
published_at: "2025-07-24T14:36:18.000Z"
source_url: "https://blog.spec.tech/p/efficiency-fat-ideas-and-false-negatives"
word_count: 2131
estimated_read_time: 11
---

*This piece was originally posted in March 20th 2022 on [blog.benjaminreinhardt.com](https://blog.benjaminreinhardt.com/efficiency). It’s incredibly relevant to the work we do at Speculative Technologies so we’re republishing it here with a few changes.*

Before you even undertake the work to create a thing, there’s some assessment of whether creating it is possible and how valuable it will be.[1](#footnote-1) Some ideas take a large chunk of resources to assess — let’s call these **‘fat’ ideas**.[2](#footnote-2) In other cases, a spreadsheet and well-founded assumptions can make a strong case that “it will be hard, but if we pull off all these things that don’t violate physics along this critical path, it will be incredible” — let’s call these **‘lean’ ideas**.

SpaceX’s reusable rocket is a canonical lean idea: “If we can land a rocket (which is very hard but has a clear critical path) then we will increase launch cadence and reduce $/kg to orbit by an order of magnitude, which is a complete game changer.” Ideas can also be lean even without a clear value proposition or critical path if the cost of experimenting is sufficiently low. Many bit-based ideas are lean despite a lot of uncertainty about where they’ll end up thanks to software’s low cost and fast iteration speeds.

‘Basic Science’[3](#footnote-3) that winds its way to a useful technology a classic example of fat ideas: what started with curiosity-driven study of gila monster venom ended up as GLP-1 inhibitors; what started with poking at yogurt cultures ended up at CRISPR. However, fat ideas include more than just curiosity-based discovery. Most [systems research](https://blog.spec.tech/p/systems-research) — of the sort that were the precursors of a good chunk of modern technology — is also a fat idea.[4](#footnote-4)

The dichotomy between lean and fat ideas warps which ideas get support, which ones get killed too early, and which ideas people choose to pursue in the first place.

[

![](https://substackcdn.com/image/fetch/$s_!jAhb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd901a379-2bc1-4e27-83d2-4a90e63478ec_1536x768.png)



](https://substackcdn.com/image/fetch/$s_!jAhb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd901a379-2bc1-4e27-83d2-4a90e63478ec_1536x768.png)

If you want to maximize efficiency — returns per dollar in *either* financial terms or ‘impact’ — there is a clear strategy: quickly kill ideas and bias towards a thousand false negatives (prematurely killing an idea that would eventually work out) over one expensive false positive (an idea that fails to work out after pouring resources into it).

Imagine that lean ideas take 1 unit of work assess and will create 1000 units of value, while fat ideas take 100 units of work to assess but produce 1100 units of value. Each idea creates the same *net* value but if you care about returns on investment you should only assess lean ideas, ignoring every single one of the fat ideas and their potential results. In order to make more in-depth explorations worthwhile, the fat ideas would need to, on average, be two orders of magnitude more valuable than the lean ones.

Another framing is through the lens of scarce resources. If you have 100 units of work to deploy, your choice is whether to spend that 100 units of work on 100 lean ideas or 1 fat idea. If each project has the same expected value, you create 100 times the expected value by focusing 100% on lean ideas.

This assessment assumes that you even know up front whether an idea is lean or fat (but not whether it it is worthwhile or not). The fact that it’s hard to distinguish between many fat and lean ideas compounds the argument for a “lean assessment only” strategy.

In reality, ideas don’t fall neatly into a lean bucket or a fat bucket. Instead, there is a continuum of how much effort an idea takes to evaluate, . However, because we’re talking about a scalar evaluation effort, it’s reasonable to draw a line that is the maximum effort you’re willing to spend per idea. Everything to the left of the line is lean and everything to the right is fat. This bucketing system means that you lose out on the marginal idea immediately to the right of the line.

The advantage of the lean strategy has nothing to do with whether you’re trying to capture the value you create or not — as long as you prioritize efficiency, it makes sense for both financial investments and philanthropic spending.

The efficiency of the lean strategy drives many research organizations to either implicitly or explicitly pursue the lean strategy — opting for many false negatives over an expensive false positive. Indeed, many organizations play up the efficiency of their process: “we kill ideas fast!” And given the assumptions and constraints they’re operating under, they’re not wrong to use that strategy.

Let’s examine those assumptions:

1.  Lean and fat ideas create roughly the same amount of value on average.
    
2.  The difference in cost between evaluating lean and fat ideas is several orders of magnitude.
    
3.  There are plenty of lean ideas.
    
4.  It’s impossible to know a-priori how much effort it will take to evaluate an idea.
    
5.  The results of lean and fat ideas are interchangeable.
    
6.  Efficiency should be prioritized.
    

#### **1\. Lean and fat ideas create, on average, roughly the same amount of value.**

This assumption seems reasonable — to my knowledge there is no comprehensive study of innovations, the value they created, and whether it was easy for people to evaluate whether they were worth pursuing a priori,[5](#footnote-5) but there are plenty of valuable examples of both lean and fat ideas. Reusable rockets, electric cars, transistors, airplanes, AI, artificial fertilizers, the structure of DNA, and atomic power (after a certain point) are all lean ideas — generally they’re characterized by either a gold rush or assertions that they are impossible to pull off. Lasers, cars, Unix, The Internet, germ theory, and solar panels are all fat ideas — generally they’re characterized by people calling them niche or useless and are preceded by a lot of “[piddling around](https://blog.benjaminreinhardt.com/parpa#industrial_labs_enabled_targeted_piddling_around).”

Implicitly, this assumption relies on there being some one-dimensional “value” number that you can use to compare ideas apples-to-apples. Regardless of whether this assumption is correct, I’m going to push back against the underlying framework in point #5.

#### **2\. The difference in cost between evaluating lean and fat ideas is several orders of magnitude.**

This assumption is also reasonable. Lean ideas are characterized by being able to put a lot of assumptions into a spreadsheet and possibly identifying one or two key experiments to validate some assumptions. Fat ideas often involve years of piddling around (and thus years of salaries and expensive equipment) before even having a clear idea of what the valuable output even could be.

#### **3\. There are plenty of lean ideas.**

The frequency of fat ideas is irrelevant unless the frequency of lean ideas is so low compared to the frequency of fat ideas that you hit a tipping point where pursuing a lean strategy forces you to spend more resources throwing away ideas quickly than you would spend evaluating fat ones. Thus, the lean strategy is rational if you believe there are plenty of lean ideas.

It’s (almost? actually?) impossible to evaluate this assumption. My personal hunch is that a component of the [Low Hanging Fruit theory of stagnation](https://notes.benjaminreinhardt.com/Low+Hanging+fruit+theory+of+stagnation) is that so many institutions have (rationally) pursued the lean strategy that lean ideas have become depleted. You could call lean ideas “low hanging fruit” themselves, but generally the “low hanging fruit” is understood to refer to the total effort to realize the idea, not to evaluate whether it’s worthwhile.

My other hunch is that while the distribution of evaluation costs is continuous, it is not flat. It likely has at least two peaks — one that’s lean-esque and one that’s fat-esque. If that’s the case, institutions pursuing the lean evaluation strategy can’t just incrementally increase their threshold for leanness as lean ideas are depleted.

The first three sets of assumptions all fit within a nice numerical framework. You can play with those numbers [here](https://docs.google.com/spreadsheets/d/1j679FlpPgl4GT6Ohi9CR0yrZCLIuVrhT7rc36D_NpF0/edit?usp=sharing).

#### **4\. It’s impossible to know a-priori how much effort it will take to evaluate an idea.**

The lean strategy implicitly assumes that it’s impossible to know how much effort it will take to evaluate an idea (meta assessment!). If it were possible to know up-front how much work it would take to fully assess an idea, you could know how fat each idea actually is — whether it takes two units of effort or the full 100, and go after the lean-er ideas. The dream of program design as a discipline is to be able to cheaply determine how much work it will take to assess an idea.

#### **5\. The results of lean and fat ideas are interchangeable.**

Collapsing value into a single number assumes that the outputs of pursuing different ideas are the same in kind. That is, the *types* of innovations that will come out of pursuing only lean ideas look the same as if you pursued both lean and fat ideas. Or at least the types of innovations created by lean and fat ideas are equally desirable.

Here is where thinking in terms of monetary outcomes violently diverges from a more nebulous concept of ‘value.’ If all you care about is cash in and cash out, the results of all ideas are interchangeable. However, I suspect that pursuing primarily lean ideas systemically biases towards certain types of innovations. As a result, whole classes of ideas are systematically neglected. It will take a lot more work to unpack the systemic differences between the outputs of lean and fat ideas, but my hunch is that a lot of software and single-node-in-a-system changes are lean ideas, while many general purpose technologies and new systems are fat ideas. Even without knowing which specific classes of innovations we’re missing out on by pursuing primarily lean ideas, I suspect that pursuing an “unbalanced” distribution of lean/fat ideas is unhealthy for long-term innovation because ideas feed on each other — fat ideas generate lean ideas and vice versa. The bias towards lean ideas may be a factor in why some technology domains feel like they have stagnated.

#### **6\. Efficiency should be prioritized.**

The final assumption underlying lean strategies is that efficiency (value created per unit of input) is the most important thing. When you have a fiduciary duty to maximize shareholder value, this assumption is correct. There are many important innovations that are just bad monetary investments. Speaking to several high-ranking people who run corporate research labs, they constantly need to justify not the absolute cost of the work they’re doing, but the return on investment they generate.

You would expect the unbreakable coupling between profit and efficiency to suggest a clear opportunity for philanthropic money to step into the gap and enable the fat, inefficient assessments that can unlock entirely different classes of innovation. Disappointingly, I’ve found this to not be the case. Instead, the majority of philanthropic funding decisions I’ve run into are still implicitly or explicitly dominated by efficiency. Questions like: “What is the most impactful way to use this dollar?” “How do we minimize risk of failure?” “How do you know it will work?” “What will the impact of this be?” are all trying to maximize efficiency. Prioritizing efficiency is not inherently bad, but it is creating bad outcomes when it is killing fat ideas at a societal level. (Assuming, of course, that fat and lean ideas are not actually interchangeable).

### **Some final thoughts**

Where does this all leave us? If the outputs of lean and fat ideas do indeed generate different types of innovations, a relentless prioritization of return on investment (whether in dollars or impact) has created a world of systemically skewed innovations. Many incredible discoveries and inventions have been sacrificed on the altar of efficiency. The lean-only approach is completely rational for profit-seeking businesses. However, institutions with other mandates, like philanthropy and governments, have also been captured by the same mindset. Prioritizing something besides efficiency is a heretical notion in the current zeitgeist (and there are many ways it can go wrong), but it would be powerful for institutions that can get away with it. Perhaps efficiency is overrated.

### **Related Reading**

-   ’s [Studies on Slack](https://slatestarcodex.com/2020/05/12/studies-on-slack/)
    
-   ’s [One Process](http://reactionwheel.net/2020/04/one-process.html)
    
-   ’s [GUTS: The Grand Unified Theory of Striving (or Slacking](https://studio.ribbonfarm.com/p/guts-the-grand-unified-theory-of))
    
-   Rob Pike’s [Systems Software Research is Irrelevant](http://doc.cat-v.org/bell_labs/utah2000/utah2000.pdf)
    

### Updates

wrote a thoughtful response [here](https://substack.com/@contraptions/note/c-138536158) flagging that “thorough” and “efficient” are much better terms for what I’m describing than “fat” and “lean” and also digging into the nature of actually-fat ideas.

*Thanks to Matt Clancy and Luke Constable for reading drafts of this piece and amazing ideas and Omar Rizwan for pointing me towards the piece on Systems Research.*

[1](#footnote-anchor-1)

I’m implicitly talking about research ideas here, but I think this argument applies more broadly.

[2](#footnote-anchor-2)

The “fat” and “lean” framework comes from [GUTS: The Grand Unified Theory of Striving (or Slacking)](https://studio.ribbonfarm.com/p/guts-the-grand-unified-theory-of) which is a chronically underdiscussed framework.

[3](#footnote-anchor-3)

The “pipeline model of innovation” is deeply flawed, but for now this is the framework most people use.

[4](#footnote-anchor-4)

Digging into how to tell whether an idea is fat or lean and whether there are systemic differences between them is for another time.

[5](#footnote-anchor-5)

Yet another [important research project for a historian of technology](https://blog.spec.tech/p/some-open-questions-on-the-financial)!