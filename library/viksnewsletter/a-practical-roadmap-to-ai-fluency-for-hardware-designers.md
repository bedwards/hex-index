---
title: "A Practical Roadmap to AI Fluency for Hardware Designers"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-10-15T18:51:48.000Z"
source_url: "https://www.viksnewsletter.com/p/a-practical-roadmap-to-ai-fluency"
word_count: 2012
estimated_read_time: 11
---

*Today’s post is fully free. If you’re new, [start here](https://www.viksnewsletter.com/p/new-start-here)! On Sundays, I write deep-dive posts on critical semiconductor technology for the AI-age in an accessible manner for paid subscribers.*

*Also, here is my latest YouTube video:*

**Read time**: 10 mins

\---

Here is a question on many minds right now: what role does AI play in the role of a hardware engineer today?

The word “AI” elicits two opposite reactions in people: excitement or indifference.

Those in the excitement camp generally embrace AI quickly. I know people who subscribed to the paid ChatGPT version early and have used it ever since, well before most companies formalized AI policies in the workplace. These early adopters I know used it for writing emails, product documentation, and brainstorming marketing ideas.

On the opposite end, many engineers tell me they don’t quite see where AI fits in hardware design. In the early days of ChatGPT, some tried to use it simply as a better Google search. But models weren’t mature and their prompts often missed the mark. Over time we’ve learned that an AI chat box is *not* the same as a search bar. Today, prompting is seemingly an art form. People now build meta-prompts (prompts to generate prompts).

But for the engineer doing highly technical work, the question remains: where does AI realistically help? If your day is spent in semiconductor tools without AI features, how do LLMs or ML fit into your workflow?

Start-ups are exploring this, but it’s not yet standard. Meanwhile, executives want an “AI checkbox” to show they’re on the trend. Between hype and practicality, what should an individual contributor do to stay relevant?

In today’s post, we will answer these questions and at the end, provide a practical roadmap you can start using today if you are a hardware engineer who is still on the fence on learning and using AI. I tend to err on the side of thorough understanding. My recommendations in this post will go beyond just the surface of learning to prompt chatbots.

\---

### Tectonic shifts in semiconductors: The case for learning about AI

I remember the time not so long ago when communication technology captured global attention. In 2018, the U.S. blocked [Qualcomm’s acquisition by Broadcom](https://investors.broadcom.com/news-releases/news-release-details/broadcom-proposes-acquire-qualcomm-7000-share-cash-and-stock-0) over 5G national interest concerns. Since my own background is in radio frequency engineering, the 2010s were an exciting time to have that particular skill set. But if you mention 6G today, you get nothing short of eye rolls. The world has moved on. AI rules supreme.

Today, AI hardware is supplanting many “hot tech” domains. Enormous capital is flowing into power systems, memory architectures, high‑speed interconnects, processors, cooling, and more. This is a massive shift. The “infinite money glitch” from big AI players like OpenAI, Nvidia, AMD and Oracle has people comparing our current AI funding situation to the [2008 subprime mortgage crisis](https://open.substack.com/pub/pramodhmallipatna/p/ais-grand-entanglement-the-subprime?r=222kot&utm_campaign=post&utm_medium=web).

As much as AI is hyped, **there is fundamental merit to the technology** and it is here to stay regardless of the temporary ups and downs of the stock market; just like how the dot-com boom and bust did not make the internet go away. My belief is that everyone working in semiconductors and chip design should develop a foundational understanding of this technology; beyond just the chat box and prompt engineering methods - because that is where true differentiation lies in a career, at least in the near future.

### AI/ML as the Unique Selling Proposition for EEs

In the past, I have written about [why you need to develop your own unique selling point](https://www.viksnewsletter.com/p/passion-versus-practicality-in-engineering) when it comes to being employed and building a career in the semiconductor industry. **The rise of AI provides a unique opportunity to the early adopters to build a skill set in their portfolio that is not readily available in most formally trained electrical engineers**. Nobody is really teaching AI courses as applied to hardware design. It is something you have to figure out how to do for yourself. For now.

Hardware design is a tough cookie. Unlike the software engineering world where there are millions of lines of GitHub code available for LLMs to train on and learn to code, hardware has no such luxury. The actual skills required to get a chip to work [isn’t written down anywhere](https://www.viksnewsletter.com/p/why-documentation-is-the-missing-link-for-chip-design?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false).

Building that undocumented intelligence into an AI-enabled workflow requires your domain expertise to be applied to machine learning. **Instead of teaching semiconductors to a machine learning expert, I’d argue it’s easier for the semiconductor expert to bring some machine learning experience into the role.** There are [semiconductor companies already asking for machine learning experience](https://www.linkedin.com/jobs/view/staff-software-engineer-ai-machine-learning-at-psemi-a-murata-company-4282473130/) in job descriptions. This trend is only going to get more prominent down the road.

Next, I’ll give you a suggested roadmap you can follow to build deep domain expertise. This is not going to be a “5-step process to be an AI expert” or a bland collection of reading resources. I’m not going to provide much of that at all. Instead, I want to explain why I think the various aspects are important, and why you should consider learning it. You can find the resources for yourself (I’ll tell you how.)

### A Roadmap to AI Fluency for EEs

Since my background is not in AI/ML by training, I’m going to lay out the roadmap I designed for myself to learn it. I am still working through this, and it has resulted in a lot of newsletter posts often not in chronological order. By sharing this with you, I hope you can find a goat trail that you can follow through the jungle of AI/ML concepts. Sure, I often take tangents and so will you. Exploration is the key.

#### 1) Understand how the “Transformer” works

If there was ever a fundamental concept you need to learn this decade, it’s the idea of the “Transformer” first proposed by Google Researchers in 2017 in a paper called “[Attention is all you need](https://arxiv.org/abs/1706.03762).” I understand it is difficult to read a research paper without prior background in AI/ML, but you should be able to *qualitatively* understand how an LLM works.

I have covered the basics of transformers and attention calculation in an earlier post, which explains how the architecture works, and how to count model parameters for any LLM. It should help you understand the basics if you don’t have an ML background. I also have several references in the post that you can use to dig deeper and enhance your understanding – but most importantly just watching [3Blue1Brown’s series about transformers](https://youtu.be/eMlx5fFNoYc?si=N3pR8GMzElgLdjlE) visually explains a lot of what people will need to know. Going beyond that is up to your level of interest.

#### 2) Understand all aspects of the hardware technology under the hood

This is a big ask, I get it. It is something I am still working on. If you are a hardware person, then it is definitely worth your while to understand how AI hardware works. Electrical engineering is a broad area, and I know it might be intimidating to a lot of people who work in areas outside of AI applications. Here again, I emphasize that you *qualitatively* understand what is going on so that you can explain it to your friend over a beer or coffee. This is the level of expertise we are going for. No complexities.

Ask yourself a bunch of why/what/how questions, and go about trying to answer them. Here is a starting point based on what I’ve asked myself before:

-   Why is high bandwidth memory so important for AI, and [why is it so hard to manufacture](https://www.viksnewsletter.com/p/why-is-hbm-so-hard-to-manufacture?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false)?
    
-   Why are interconnects such a hot topic in AI datacenters? [What kinds of interconnects exist](https://www.viksnewsletter.com/p/a-beginners-guide-to-ai-interconnects?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false)?
    
-   Since power is such a big issue in AI datacenters, [how is it delivered from the utility service to the GPU](https://www.viksnewsletter.com/p/understanding-hvdc-architectures-ai-megafactories?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false)?
    
-   What is this thing called co-packaged optics? Why is it the future of connectivity in AI?
    
-   How are tons of video generated by AI datacenters stored and distributed?
    

The list could go on, and the linked articles are my deep-dive posts that should give you a starting point for your own explorations. The key here is to ask relatively simple questions and go about answering them. That is my *modus operandi* for this newsletter anyway.

You might ask: how do you get these questions to begin with? That’s the easy part. Stay abreast of ongoing events in the industry through news, company whitepapers, conference proceedings (even just the agenda, if you don’t actually attend) and online seminars. You’ll be exposed to stuff you don’t understand. Then set off and go answer the questions that popped up in your mind.

#### 3) Get a grasp of AI/ML tooling

In order to successfully combine your domain expertise with AI/ML skills, you’ll need to get your hands dirty. One of the easiest starting points is to [learn Python](https://www.viksnewsletter.com/p/the-decline-of-matlab?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) because there are many ML frameworks that you can use right off the bat. There are plenty of tutorials online and a strong support community to help you if you get stuck. [Scikit-learn](https://scikit-learn.org/stable/) seems to be the easiest one to start with to understand ML. If you just want to play around and not code too much, [PyCaret](https://pycaret.org/) seems interesting. For the whole enchilada of neural networks and AI, [pytorch](https://pytorch.org/) is your tool of choice. If you know of other resources useful to beginners, leave them in the comments.

Experiment with running local models, especially open source ones like [GPT-OSS](https://openai.com/index/introducing-gpt-oss/) which runs just fine on my MacBook Pro. This opens doors to many other open source models you can run locally; you can find a ton of them on the [HuggingFace database](https://huggingface.co/). To actually run these models, you can use something like [Ollama](https://ollama.com/) or [AnythingLLM](https://anythingllm.com/).

After you have this going, you should be able to experiment with fine-tuning small models on your laptop with your own datasets to see how things work. Training bigger models will need you to have access to cloud level infrastructure which can be costly. You can do this later, when you have a substantial grasp of the basics.

If you already have a grasp of a coding language, definitely try out an AI coding assistant like Cursor, OpenAI Codex, or Claude code. It is definitely worth exploring to see how you can use it to write short scripts for data processing or speed up your excel work.

#### 4) Use AI to Learn

There has never been a better time in history to learn something from scratch.

[

![](https://substackcdn.com/image/fetch/$s_!Tr8j!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6a74d17-907e-41b8-87ae-0cf65a94cc66_603x235.png)



](https://x.com/dwarkesh_sp/status/1977834805397197199)

AI is your patient friend who will explain things to you ad nauseam while citing references so that you can verify if your friend is having code-induced hallucinations.

Think about it like this: before the internet, people had to go into libraries and find information in books. The internet made that significantly easier by letting people google things. AI takes it a step further by just telling you what you asked for, by *understanding* what you are looking for.

Given my use-case of LLMs for research, I think a lot of people over-index on prompting techniques. It might have been true in the early days of LLMs, but even simple questions (like the ones I suggested earlier) work well in an LLM. You can always experiment with expanding prompts to see if they work better.

### A final word

Today, everyone is wielding an AI hammer looking for a nail to hit - most definitely in the hardware world. What were once called simple optimization techniques, or basic machine learning methods have been rebranded “AI” to stay with the times.

My recommendation as a hardware engineer is to first find the pain point, whether it is in chip design, testing, validation, or just brute-force repetitive tasks that have the potential for automation. Then evaluate the right method to solve the problems, and maybe LLMs are not the answer: that is just fine. With your foundational understanding of the AI landscape, build useful solutions that solve real problems in the hardware or software domain.

Only then will we unlock the true potential of “AI” in the hardware world. Maybe some revenue will follow.

How do you use AI in your hardware world? Leave your thoughts in the comments below. I’d love to learn from you.

\---

Thanks for reading Vik's Newsletter! Please feel free to share it.