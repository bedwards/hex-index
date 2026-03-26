---
title: "Speaking things into existence"
author: "Ethan Mollick"
publication: "One Useful Thing"
publication_slug: "oneusefulthing"
published_at: "2025-03-11T18:21:28.000Z"
source_url: "https://www.oneusefulthing.org/p/speaking-things-into-existence"
word_count: 1901
estimated_read_time: 10
---

Influential AI researcher [Andrej Karpathy](https://karpathy.ai/) wrote two years ago that “the hottest new programming language is English,” a topic he expanded on last month with the idea of “[vibecoding](https://x.com/karpathy/status/1886192184808149383)” a practice where you just ask an AI to create something for you, giving it feedback as it goes. I think the implications of this approach are much wider than coding, but I wanted to start by doing some vibecoding myself.

I decided to give it a try using Anthropic’s new [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) agent, which gives the Claude Sonnet 3.7 LLM the ability to manipulate files on your computer and use the internet. Actually, I needed AI help before I could even use Claude Code. I can only code in a few very specific programming languages (mostly used in statistics) and have no experience at all with Linux machines. Yet Claude Code only runs in Linux. Fortunately, Claude told me how to handle my problems, so after some vibetroubleshooting (seriously, if you haven’t used AI for technical support, you should) I was able to set up Claude Code.

[

![](https://substackcdn.com/image/fetch/$s_!C6VR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0747e7e7-eccb-4595-bbc7-11050d5da82b_2786x1181.png)



](https://substackcdn.com/image/fetch/$s_!C6VR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0747e7e7-eccb-4595-bbc7-11050d5da82b_2786x1181.png)

Time to vibecode. The very first thing I typed into Claude Code was: “*make a 3D game where I can place buildings of various designs and then drive through the town i create.*” That was it, grammar and spelling issues included. I got a working application (Claude helpfully launched it in my browser for me) about four minutes later, with no further input from me. You can see the results in the video below.

It was pretty neat, but a little boring, so I wrote: *hmmm its all a little boring (also sometimes the larger buildings don't place properly). Maybe I control a firetruck and I need to put out fires in buildings? We could add traffic and stuff.*

A couple minutes later, it made my car into a fire truck, added traffic, and made it so houses burst into flame. Now we were getting somewhere, but there were still things to fix. I gave Claude feedback: *looking better, but the firetruck changes appearance when moving (wheels suddenly appear) and there is no issue with traffic or any challenge, also fires don't spread and everything looks very 1980s, make it all so much better.*

After seeing the results, I gave it a fourth, and final, command as a series of three questions: *can i reset the board? can you make the buildings look more real? can you add in a rival helicopter that is trying to extinguish fires before me?* You can see the results of all four prompts in the video below. It is a working, if blocky, game, but one that includes day and night cycles, light reflections, missions, and a computer-controlled rival, all created using the hottest of all programming languages - English.

Actually, I am leaving one thing out. Between the third and fourth prompts, something went wrong and the game just wouldn't work. As someone with no programming skills in JavaScript or whatever the game was written in, I had no idea how to fix it. The result was a sequence of back-and-forth discussions with the AI where I would tell it errors and it would work to solve them. After twenty minutes, everything was working again, better than ever. In the end, the game cost around $5 in Claude API fees to make… and $8 more to get around the bug, which turned out to be a pretty simple problem. Prices will likely fall quickly but the lesson is useful: as amazing as it is (I made a working game by asking!), vibecoding is most useful when you actually have some knowledge and don't have to rely on the AI alone. A better programmer might have immediately recognized that the issue was related to asset loading or event handling. And this was a small project, I am less confident of my ability to work with AI to handle a large codebase or complex project, where even more human intervention would be required.

This underscores how vibecoding isn't about eliminating expertise but redistributing it - from writing every line of code to knowing enough about systems to guide, troubleshoot, and evaluate. The challenge becomes identifying what "minimum viable knowledge" is necessary to effectively collaborate with AI on various projects.

# Vibeworking with expertise

Expertise clearly still matters in a world of creating things with words. After all, you have to know what you want to create; be able to judge whether the results are good or bad; and give appropriate feedback. As I wrote in my [book](https://a.co/d/cXHRBnv), with current AIs, you can often achieve the best results by working as a co-intelligence with AI systems which continue to have a "jagged frontier" of abilities.

But applying expertise need not involve a lot of work. Take for example, my recent experience with [Manus](https://manus.im/app), a new AI agent out of China. It basically uses Claude (and possibly other LLMs as well) but gives the AI access to a wide range of tools, including the ability to do web research, code, create documents and websites and more. It is the most capable general-purpose agent I have seen so far, [but like other general agents](https://www.oneusefulthing.org/p/the-end-of-search-the-beginning-of), it still makes errors and mistakes. Despite that, it can accomplish some pretty impressive things.

For example, here is a small portion of what it did when I asked it to “*create an interactive course on elevator pitching using the best academic advice.*” You can see the system set up a checklist of tasks and then go through them, doing web research before building the pages (this is sped up, the actual process unfolds autonomously, but over tens of minutes or even hours).

As someone who teaches entrepreneurship, I would say that the output it created was surface-level impressive - it was an entire course that covered much of the basics of pitching, and without obvious errors! Yet, I also could instantly see that it was too text heavy and did not include opportunities for knowledge checks or interactive exercises. I gave the AI a second prompt: “*add interactive experiences directly into course material and links to high quality videos.*” Even though this was the bare minimum feedback, it was enough to improve the course considerably, as you can see below.

[

![](https://substackcdn.com/image/fetch/$s_!FIo5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2a829fe-0e6c-4339-8fe2-b138f8df2936_5113x1524.png)



](https://substackcdn.com/image/fetch/$s_!FIo5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2a829fe-0e6c-4339-8fe2-b138f8df2936_5113x1524.png)
*On the left you can see the overall class structure it created, when I clicked on the first lesson it took you to an overall module guide, and then each module was built out with videos, text, and interactive quizzes.*

If I were going to deploy the course, I would push the AI further and curate the results much more, but it is impressive to see how far you can get with just a little guidance. But there are other modes of vibework as well. While course creation demonstrates AI's ability to handle casual structured creative work with minimal guidance, research represents a more complex challenge requiring deeper expertise integration.

# Deep Vibeworking

It is at the cutting edge of expertise where AI gets to be most interesting to use. Unfortunately for anyone writing about this sort of work, they are also the use cases that are hardest to explain, but I can give you one example.

I have a large, anonymized set of data about crowdfunding efforts that I collected nearly a decade ago, but never got a chance to use for any research purposes. The data is very complex - a huge Excel file, a codebook (that explains what the various parts of the Excel file mean), and a data dictionary (that details each entry in the Excel file). Working on the data involved frequent cross-referencing through these files and is especially tedious if you haven’t been working with the data in a long time. I was curious how far I could get in writing a new research paper using this old data with the help of AI.

I started by getting an OpenAI Deep Research report on the latest literature on how organizations could impact crowdfunding. I was able to check the report over based on my knowledge. I knew that it would not include all the latest articles (Deep Research cannot access paid academic content), but its conclusions were solid and would be useful to the AI when considering what topics might be worth exploring. So, I pasted in the report and the three files into the secure version of ChatGPT provided by my university and worked with multiple models to generate hypotheses. The AI suggested multiple potential directions, but I needed to filter them based on what would actually contribute meaningfully to the field—a judgment call requiring years of experience with the relevant research.

[

![](https://substackcdn.com/image/fetch/$s_!8_Pc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb023515e-763d-4ea9-8411-2860a881bd9d_3586x1802.png)



](https://substackcdn.com/image/fetch/$s_!8_Pc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb023515e-763d-4ea9-8411-2860a881bd9d_3586x1802.png)

Then I worked back and forth with the models to test the hypothesis and confirm that our findings were correct. The AI handled the complexity of the data analysis and made a lot of suggestions, while I offered overall guidance and direction about what to do next. At several points, the AI proposed statistically valid approaches that I, with my knowledge of the data, knew would not be appropriate. Together, we worked through the hypothesis to generate fairly robust findings.

[

![](https://substackcdn.com/image/fetch/$s_!9L7a!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc1f3f44-00f0-4dfc-a465-d60397660c45_4584x2492.png)



](https://substackcdn.com/image/fetch/$s_!9L7a!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc1f3f44-00f0-4dfc-a465-d60397660c45_4584x2492.png)

Then I gave all of the previous output to o1-pro and asked it to write a paper, offering a few suggestions along the way. It is far from a blockbuster, but it would make a solid contribution to the state of knowledge (after a bit more checking of the results, as AI still makes errors). More interestingly, it took less than an hour to create, as compared to weeks of thinking, planning, writing, coding and iteration. Even if I had to spend an hour checking the work, it would still result in massive time savings.

I never had to write a line of code, but only because I knew enough to check the results and confirm that everything made sense. I worked in plain English, shaving dozens of hours of work that I could not have done anywhere near as quickly without the AI… but there were many places where the AI did not yet have the “instincts” to solve problems properly. The AI is far from being able to work alone, humans still provide both vibe and work in the world of vibework.

# Work is changing

Work is changing, and we're only beginning to understand how. What's clear from these experiments is that the relationship between human expertise and AI capabilities isn't fixed. Sometimes I found myself acting as a creative director, other times as a troubleshooter, and yet other times as a domain expert validating results. It was my complex expertise (or lack thereof) that determined the quality of the output.

The current moment feels transitional. These tools aren't yet reliable enough to work completely autonomously, but they're capable enough to dramatically amplify what we can accomplish. The $8 debugging session for my game reminds me that the gaps in AI capabilities still matter, and knowing where those gaps are becomes its own form of expertise. Perhaps most intriguing is how quickly this landscape is changing. The research paper that took me an hour with AI assistance would have been impossible at this speed just eighteen months ago.

Rather than reaching definitive conclusions about how AI will transform work, I find myself collecting observations about a moving target. What seems consistent is that, for now, the greatest value comes not from surrendering control entirely to AI or clinging to entirely human workflows, but from finding the right points of collaboration for each specific task—a skill we're all still learning.

[

![](https://substackcdn.com/image/fetch/$s_!xh1x!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe51b1702-4f72-4433-a0ed-7f8eb16962a1_1376x864.png)



](https://substackcdn.com/image/fetch/$s_!xh1x!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe51b1702-4f72-4433-a0ed-7f8eb16962a1_1376x864.png)