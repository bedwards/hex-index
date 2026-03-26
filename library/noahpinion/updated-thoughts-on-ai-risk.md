---
title: "Updated thoughts on AI risk"
author: "Noah Smith"
publication: ""
publication_slug: "noahpinion"
published_at: "2026-02-16T02:14:52.000Z"
source_url: "https://www.noahpinion.blog/p/updated-thoughts-on-ai-risk"
word_count: 3112
estimated_read_time: 16
---

[

![](https://substackcdn.com/image/fetch/$s_!dIJ-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42b23798-907d-4c51-ab95-6d54a309d010_972x542.jpeg)



](https://substackcdn.com/image/fetch/$s_!dIJ-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F42b23798-907d-4c51-ab95-6d54a309d010_972x542.jpeg)

So the other day I wrote a post about how humanity is inevitably going to be disempowered by the existence of AI:

A bunch of people wrote to me and asked me: “What made you change your mind?”. Three years ago, shortly after the release of the original ChatGPT, I wrote a post about how LLMs are not going to destroy the human race:

And just a couple of months ago, [I wrote a post arguing](https://www.noahpinion.blog/p/my-thoughts-on-ai-safety) that ASI (artificial superintelligence) is likely to peacefully coexist with humanity rather than kill us off.

People wanted to know why my tone had shifted from optimistic to pessimistic.

Well, the simple answer to that is “I was in a worse mood.” My rabbit was sick,[1](#footnote-1) so I was kind of grumpy, and so in my post a few days ago I painted the eventual disempowerment of humanity as more of a negative thing than I usually do. In fact, I’ve always believed that *at some point*, humanity would be replaced with something posthuman — godlike AIs, a hive mind, modified humans, or whatever. I grew up reading science fiction about that kind of thing — Vernor Vinge, Charles Stross, Arthur C. Clarke, Iain M. Banks, and so on — and it just always seemed impossible that humanity had already attained the theoretical pinnacle of intelligence.[2](#footnote-2) I had always simply envisioned that whatever came after us would be in the general *human family*, and would be more likely to be on our side than against us.

That’s what my post the other day was about. I painted a more glum picture of humanity’s eventual supersession because I was in a bad mood. But even in that post, at the end, I offered optimism that ASI will save us from things like low fertility, fascist overlords, and the end of human-driven scientific discovery. That optimistic future would be like [the Culture novels](https://www.amazon.com/dp/B07WLZZ9WV?binding=paperback&ref=dbs_m_mng_rwt_sft_tpbk_tmmp), by Iain M. Banks, in which AIs take the reins of civilization but in which they respect and help and protect a now-mostly-useless humanity — basically a much nicer, more enlightened version of the way the United States of America treats Native Americans nowadays. It’s a wistful future, and in some ways a sad one, but not particularly terrifying.

BUT, at the same time, I *have* gotten a lot more worried about existential, catastrophic AI risk — the kind of thing that would kill us instead of just rendering us comfortably impotent — than I was three years ago. And so the people who wrote to ask me why my tone had shifted deserve a longer explanation about why I’m more worried.

#### What I got wrong three years ago

In [my post three years ago](https://www.noahpinion.blog/p/llms-are-not-going-to-destroy-the), I argued that LLMs were not yet the kind of AI that could threaten the human race. I think I was probably right regarding the type of LLMs that existed in early 2023, for the reasons I laid out in that post. In a nutshell, I argued that since all LLMs could do was *talk* to people, the only way they could destroy the human race was by *convincing* us to destroy ourselves (unlikely) or by *teaching* us how to destroy ourselves (for example, by educating bioterrorists about how to make bioweapons).

In my defense, this is not too different from the scenario that Eliezer Yudkowsky — who literally [wrote the book](https://en.wikipedia.org/wiki/If_Anyone_Builds_It,_Everyone_Dies) on existential AI risk — envisioned in 2022. [He wrote](https://intelligence.org/2022/06/10/agi-ruin/):

> My lower-bound model of “how a sufficiently powerful intelligence would kill everyone, if it didn’t want to not do that” is that it gets access to the Internet, emails some DNA sequences to any of the many many online firms that will take a DNA sequence in the email and ship you back proteins, and bribes/persuades some human who has no idea they’re dealing with an AGI to mix proteins in a beaker, which then form a first-stage nanofactory which can build the actual nanomachinery.

This is about AI teaching people how to make self-replicating nanomachinery instead of a doomsday virus. But honestly I feel like the doomsday virus would be easier to make. So I don’t think my scenario was *too* far behind the thinking of the most vocal and panicky AI safety people back in 2023.

Anyway, if I had said “chatbots” instead of “LLMs” in my 2023 post, I think I still would have been correct, because a chatbot is a type of user interface, while an LLM is an underlying technology that can be used to do much more than make a chatbot. What I missed was that LLMs can do a lot more than just talk to people — they can write code, because code is just a language, and it’s not too hard to get them to do this in an automated, end-to-end, agentic fashion.

In other words, I didn’t envision the advent of vibe-coding. And I probably should have. To be fair, the advent of vibe-coding required some big technological advances[3](#footnote-3) that didn’t exist in early 2023. But missing the fact that computer code is just a language that can be learned like any other — and that in fact it’s easier to learn, since you can verify when it works and when it doesn’t work — was a big miss for me. And it opens up the door to a LOT of other scary scenarios, beyond “A chatbot helps humans to do something bad”.

So anyway, let’s talk about what I’m scared about now. But first, let’s talk about what I’m less scared about, at least for the moment.

#### The rise of the robots is still a ways away

The scenario that everyone tends to think about is one in which a fully autonomous ASI decides that human civilization is an impediment to its use of natural resources, and that we need to be exterminated, enslaved, or otherwise radically disempowered in order to turn the world into data centers. This is basically the plot of the Terminator movies,[4](#footnote-4) the Matrix movies, and various other “rise of the robots” stories.

Conceptually speaking it’s easy to envision an AI that’s advanced enough to carry this out. It would have full control over an entirely automated chain of AI production, including:

-   Mining, refining, and processing of minerals
    
-   Fabrication of chips and construction of data centers
    
-   Manufacturing of robots
    

Controlling this entire chain would give AI *control over its own reproduction* — the way humans have always had control over our own reproduction. It could then safely dispense with humanity without endangering its own future.

This is basically a very direct analogy to what European settlers did to Native American civilization, or what various other waves of human conquerors and colonizers do to other groups of humans.

I think this scenario *is* worth worrying about, but it’s not immediate. Right now, robotics is still fairly rudimentary — [things are advancing](https://www.youtube.com/watch?v=W93GXR7jo5o), but AI will need humans as its agents in the physical world for years to come. Furthermore, AI will need some algorithmic changes before it can permanently “survive” on its own without humans — long memory, for one. I’m not saying these won’t happen, but at least we have some time to think about how to prevent the “rise of the robots” scenario. I do think we should have some people (and AI) thinking about how to harden our society against that sort of attack.

It seems likely that AI will eventually get smart enough to think its way around whatever physical safeguards we put in place against the rise of the robots. But as [I wrote two months ago](https://www.noahpinion.blog/p/my-thoughts-on-ai-safety), I think an AI advanced enough to fully control the physical world would have already reached the stage where it understands that peaceful coexistence and positive-sum interaction is a better long-term bet than genocide. Smarter humans and richer human societies both tend to be more peaceful, and I sort of expect the same from smarter AI.

So I think there are other worries to prioritize here.

#### What if the Machine stops?

In my post three years ago, I tried to list the ways that LLMs might eventually destroy us:

> Here’s a list of ways the human race could die within a relatively short time frame:
> 
> -   Nuclear war
>     
> -   Bioweapons
>     
> -   Other catastrophic WMDs (asteroid strike, etc.)
>     
> -   Mass suicide
>     
> -   Extermination by robots
>     
> -   Major environmental catastrophe
>     

The advent of vibe-coding has made me think of another way our civilization could be destroyed, which I probably should have thought of at the time: **starvation**.

Every piece of agricultural machinery in the developed world, more or less, runs on software now — every tractor, every harvester, every piece of food processing machinery. That software was mostly written by human hands, but in a fairly short period of time, it will all be vibe-coded by AI.

At that point, AI would, in principle, have the ability to bring down human civilization simply by making agricultural software stop working. It could push malicious updates, or hack in and take over, or wipe the software, etc. Agricultural machines would stop working, and in a few weeks the entire human population would begin to starve. Civilization would fall soon afterwards.

I really should have thought of this scenario when I wrote my post in 2023, because it’s the plot of a very famous science fiction story from 1909: “[The Machine Stops](https://www.cs.ucdavis.edu/~koehl/Teaching/ECS188/PDF_files/Machine_stops.pdf)”, by E.M. Forster. In this story, humanity lives in separate rooms, communicating with each other only electronically,[5](#footnote-5) cared for entirely by a vast AI; when the AI stops working, most of humanity starves.

This could happen to us soon. Now that vibe-coding is many times as productive as human coding, it’s very possible that a lot fewer people will get good at coding. Even the tools that exist right now might be eroding humans’ skills at working with code. This is from [a recent Anthropic study](https://www.anthropic.com/research/AI-assistance-coding-skills):

> AI creates a potential tension: as coding grows more automated and speeds up work, humans will still need the skills to catch errors, guide output, and ultimately provide oversight for AI deployed in high-stakes environments. Does AI provide a shortcut to *both* skill development and increased efficiency? Or do productivity increases from AI assistance undermine skill development?
> 
> In a randomized controlled trial, we examined 1) how quickly software developers picked up a new skill (in this case, a Python library) with and without AI assistance; and 2) whether using AI made them less likely to understand the code they’d just written.
> 
> We found that using AI assistance led to a statistically significant decrease in mastery. On a quiz that covered concepts they’d used just a few minutes before, participants in the AI group scored 17% lower than those who coded by hand, or the equivalent of nearly two letter grades.

Meanwhile, Harry Law wrote a good post called “[The Last Temptation of Claude](https://blog.cosmos-institute.org/p/the-last-temptation-of-claude)”, about how the ease of vibe-coding is making him mentally lazier. There are many other such posts going around.

As vibe-coding becomes even better and eliminates humans entirely from the loop, the need for human software skills will presumably atrophy further. Ten years from now, if the software that runs our agricultural machinery just *stops working* for some reason, there’s a good chance there will not be enough human coders around to get it working again.

This would simply be a special case of a well-known problem — *overoptimization creating fragility*. When Covid hit in 2020, we found out that our just-in-time supply chains had been so over-engineered for efficiency that they lacked robustness. Vibe-coding could lead to a much worse version of the same problem.

That said, AI going on a catastrophic strike isn’t at the top of my list of fears. The reason is that I expect AI to be very fragmented; so far, [no AI company seems to have any kind of monopoly](https://x.com/ramez/status/2023151833628422376), even for a short period of time. If the AI that writes the code for harvesters and tractors suddenly goes rogue, it seems like there’s a good chance that humans can call in another AI to fix it.

I guess it’s *possible* that all the AIs will collude so that none of them will help humans survive, or that the rogue AI(s) will be able to maliciously lock humans out from applying non-rogue AI to fix the problem. So people should be thinking about how to harden our agricultural system against software disruption. But it’s also not at the top of my list of doomsday worries.

#### Vibe-coding the apocalypse

OK, so what is at the top of my list of doomsday worries? It’s still AI bioterrorism.

Hunting down and killing humans with an army of robots would be fairly hard. Depriving humans of food so that we starve to death would be easier, but still a little bit hard. But slaughtering humans with a suite of genetically engineered viruses would not actually be very hard. As we saw in 2020, humans are very vulnerable to novel viruses.

Imagine the following scenario. In the near future, virology research is basically automated. Labs are robotic, and AI designs viruses in simulation before they’re created in labs. For whatever personal reasons, a human terrorist wants to destroy the human race. Using techniques he reads about on the internet, he jailbreaks a near-cutting-edge AI in order to remove all safeguards. He then prompts this AI to vibe-code a simulation that can design 100 superviruses. Each supervirus is 10x as contagious as Covid, has a 90% fatality rate, and has a long initial asymptomatic period so it’ll spread far and wide before it starts killing its victims. He then prompts his AI to vibe-code a program to hack into every virology lab on the planet and produce these 100 viruses, then release them into the human population.

If successful, this would quickly lead to the end of human civilization, and quite possibly to the extinction of the entire human species.

Is it possible? I don’t know. But developments seem to be moving in the direction of making it possible. For example, bio labs are becoming more automated all the time:

And AI algorithms are rapidly getting better at simulating things like proteins:

[“Virtual labs” powered by “AI scientists”](https://www.nature.com/articles/d41586-024-01684-3) are becoming [commonplace](https://www.fiercebiotech.com/biotech/flagships-lila-sciences-lands-235m-expand-ai-powered-autonomous-research-labs) in the world of bio. And there is plenty of fear about how AI-powered laboratories might be used to create superviruses. Here’s [a story that ran in Time magazine](https://time.com/7279010/ai-virus-lab-biohazard-study/) almost a year ago:

> A new study claims that AI models like ChatGPT and Claude now outperform PhD-level virologists in problem-solving in wet labs, where scientists analyze chemicals and biological material. This discovery is a double-edged sword, experts say. Ultra-smart AI models could help researchers prevent the spread of infectious diseases. But non-experts could also weaponize the models to create deadly bioweapons.
> 
> The [study](https://www.virologytest.ai/), shared exclusively with TIME, was conducted by researchers at the Center for AI Safety, MIT’s Media Lab, the Brazilian university UFABC, and the pandemic prevention nonprofit SecureBio. The authors consulted virologists to create an extremely difficult practical test which measured the ability to troubleshoot complex lab procedures and protocols. While PhD-level virologists scored an average of 22.1% in their declared areas of expertise, OpenAI’s o3 reached 43.8% accuracy. Google’s Gemini 2.5 Pro scored 37.6%.

I am not a biology expert, and I plan to go ask more of them about this worry (as well as having AI educate me more). I asked GPT-5.2 what it thought about this risk, and here are some excerpts from what it wrote:[6](#footnote-6)

> \[A\]utomation *can* increase throughput and reduce expertise needed, which is directionally risk-increasing. But it doesn’t magically eliminate the underlying biological constraints…
> 
> \[AI safety\] guardrails can be bypassed sometimes. Also, you don’t necessarily need a frontier model to be dangerous if you have access to domain tools, leaked data, or insider capability…
> 
> A more realistic worry is **a small number (1–a few) of engineered or selected agents** that are “good enough” (highly transmissible and significantly more lethal than typical pandemics)…
> 
> AI accelerates, but it doesn’t replace the need for experimental validation \[of new viruses\] —yet…
> 
> If an attacker can truly create **one** pathogen that is (a) highly transmissible, (b) substantially more lethal than typical pandemics, and (c) hard to contain early, then you already have global-catastrophe potential…A single “good enough” pathogen, combined with poor detection and slow countermeasures, can be catastrophic.
> 
> **Probability of “one compromised lab enables a catastrophic engineered outbreak”**: still low, but **not negligible**, and plausibly higher than many other X-risk stories because it has fewer required miracles.
> 
> **Probability of “human extinction via this route”**: lower than “catastrophe/collapse,” but not zero; it remains deep tail risk.

GPT’s recommendations all included *maintaining humans in the loop* of biology research. But after what we’ve seen with vibe-coding over the past few months, how confident can we be that labs all across the world — including in China — will insist on maintaining humans in the loop, when full automation would speed up productivity and improve competitiveness? I can’t say I’m incredibly optimistic here.

So the advent of vibe-coding has significantly increased my own worries about truly catastrophic AI risk. It seems clear now that brute economic forces will push humanity in the direction of taking humans out of the loop anywhere they can be taken out. And in any domain where data is plentiful, outputs can be verified, and there are no physical bottlenecks, it seems likely that keeping humans in the loop will eventually prove un-economical.

Really, this boils down to another example of overoptimization creating fragility. But it’s an especially extreme and catastrophic one. I don’t think humanity is doomed, but I don’t see many signs that our governments and other systems are yet taking the threat of vibe-coded superviruses as seriously as they ought to be. Not even close.

So if you ask me if my worries about AI risk have shifted materially in recent months, the answer is “Yes.” I still think Skynet or Agent Smith is highly unlikely to appear and exterminate humanity with an army of robots in the near future. But I will admit that the thought of vibe-coded superviruses is now keeping me up at night.

\---

[1](#footnote-anchor-1)

He’s better now!

[2](#footnote-anchor-2)

In fact, if we *had* been the smartest possible creatures in the Universe, that itself would be a pretty glum future.

[3](#footnote-anchor-3)

From what I can tell, the most important such advance was verifier-based reinforcement learning that enabled test-time compute scaling…

[4](#footnote-anchor-4)

Well, sort of. In the Terminator movies, Skynet is a military AI who sees humans as a military threat.

[5](#footnote-anchor-5)

It’s pretty wild that a contemporary of H.G. Wells could have envisioned both AI *and* modern social media.

[6](#footnote-anchor-6)

Encouragingly, it stopped answering my questions pretty quickly, because this topic hit the guardrails.