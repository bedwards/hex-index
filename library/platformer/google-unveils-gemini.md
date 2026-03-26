---
title: "Google unveils Gemini"
author: "Casey Newton"
publication: "Platformer"
publication_slug: "platformer"
published_at: "2023-12-06T15:01:07.000Z"
source_url: "https://platformer.substack.com/p/google-unveils-gemini"
word_count: 2712
estimated_read_time: 14
---

[

![A photo illustration of Gemini represented as connected tiles showing applications including a camera and photo roll (Google)](https://substackcdn.com/image/fetch/$s_!q8qM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c36805c-5983-4548-b2fc-42b0b0ec1be0_1920x1080.png "A photo illustration of Gemini represented as connected tiles showing applications including a camera and photo roll (Google)")



](https://substackcdn.com/image/fetch/$s_!q8qM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c36805c-5983-4548-b2fc-42b0b0ec1be0_1920x1080.png)
*(Google)*

**I.**

Google this morning [announced the rollout of Gemini](https://blog.google/technology/ai/google-gemini-ai), its largest and most capable large language model to date. Starting today, the company’s Bard chatbot will be powered by a version of Gemini, and will be available in English in more than 170 countries and territories. Developers and enterprise customers will get access to Gemini via API next week, with a more advanced version set to become available next year.

How good is Gemini? Google says the performance of its most capable model “exceeds current state-of-the-art results on 30 of the 32 widely-used academic benchmarks used in LLM research and development.” Gemini also scored 90.0% on a test known as “[Massive Multitask Language Understanding](https://arxiv.org/abs/2009.03300),” or MMLU, which assesses capabilities across 57 subjects including math, physics, history and medicine. It is the first LLM to perform better than human experts on the test, Google said.

Gemini also appears to be a very good software engineer. Last year, using an older language model, DeepMind [introduced an AI system named AlphaCode that outperformed 54 percent of human coders](https://www.theverge.com/2022/2/2/22914085/alphacode-ai-coding-program-automatic-deepmind-codeforce) in coding competitions. Using Gemini, Google built a next-generation version named AlphaCode 2. The sequel outperformed an estimated 85 percent of humans, the company said.

Competitive coding is meaningfully different from day-to-day software engineering in some important ways: it can be both more and less difficult than what the typical engineer is asked to do. But still, the rate of progress here is striking.

Gemini is natively multimodal, meaning that it can analyze the contents of a picture and answer questions about it, or create an image out of a text prompt. During a briefing on Tuesday, a Google executive uploaded a photo of some math homework in which the student had shown their calculations leading up to the final answer. Gemini was able to identify at which step in the student’s process they had gone awry, and explained their mistake and how to answer the question correctly.

“Multimodal” can read like awkward jargon, but the term comes up constantly in conversation with Google executives. The ability of AI systems to take different kinds of data (text, images, video, audio), analyze them using a single tool, and translate them in and out of various formats is the kind of foundational innovation that makes lots of other progress possible. (All of which is a long way of saying: sorry for the number of times the word “multimodal” appears in the interview below.)

In accordance with Google’s preference for chaotic branding, Gemini will be available in three “sizes”: Nano, which is small enough to fit in a smartphone and will power features in the Pixel 8 Pro smartphone starting today; Pro, which now powers Bard; and Ultra, which will begin making its way into products next year.

Without having used any of these models, it’s difficult to compare them to those from rivals like OpenAI and Anthropic. But my basic sense is that Gemini Pro is best seen as the company’s answer to OpenAI’s GPT-3.5: In its announcement blog post, the company noted that Pro performed better than GPT-3.5 in many but not all benchmarking challenges.

That sets up Ultra as the top rival to GPT-4.5 Turbo for the crown of best widely available, general-purpose LLM. And Ultra won’t be available next year so that Google can complete trust and safety testing.

When it is available to consumers, Ultra will power a new chatbot that the company is calling Bard Advanced. While the company would not confirm it on Tuesday, the branding suggests to me that Advanced could be Google’s answer to ChatGPT Plus: a subscription-based paid product for users who want the best product available.

From there, Google says, Gemini will begin to permeate throughout the company’s ecosystem of consumer and enterprise products, starting with search, Chrome, ads, and its [productivity apps](https://workspace.google.com/blog/product-announcements/duet-ai).

**II.**

A few hours after getting briefed on the news, I had a chance to meet virtually with Google CEO Sundar Pichai and Google DeepMind co-founder and CEO Demis Hassabis.

It was my first chance to talk about the state of the art in AI with Pichai since March, [when he came on Hard Fork](https://www.nytimes.com/2023/03/31/podcasts/hard-fork-sundar.html); and my first ever conversation with Hassabis. Over 30 very fast minutes, we talked about Gemini’s novel capabilities, how AI is changing search, and whether Pichai thinks he’ll hire fewer software engineers next year as a result of the company’s progress.

Highlights of the conversation follow; this interview has been edited for clarity and length.

**Casey Newton: Today you shared a variety of industry benchmarks that show the progress you’ve made with Gemini. But I’m curious about your own, personal testing of the models. What are you noticing about them that makes you feel like you’ve taken a step forward?**

**Demis Hassabis:** I think you'll see this just by using the new Bard — the quality overall is just massively improved over our previous models. The kind of thing I’m interested in specifically is using it as a science assistant. Actually parsing scientific papers, the graphs in those papers, interpreting them. Putting tables into graphs, extending graphs. It’s been super useful, and I want to double down on that.

**Sundar Pichai**: Multimodality is very exciting. We’re working to get it connected to the products and expose it thoughtfully, but I think that’s where a lot of the new synapses will come in.

To me what’s exciting is that this is just our 1.0. There’s such a strong roadmap of innovation as we look into 2024. And one of the things that Demis and his team are really good at is the relentless way of iterating and coming up with new versions.

**Earlier today I asked Eli Collins, the vice president of product at DeepMind, whether Gemini had demonstrated any novel capabilities. He basically told me, "stay tuned." Do you believe this model will turn out to have capabilities beyond that of previous LLMs, or do you see it as more evolutionary?**

**Hassabis:** I think we will see some new capabilities. This is part of what the Ultra testing is for. We’re kind of in beta — to safety-check it, responsibility-check it, but also to see how else it can be fine-tuned.

**Your blog post describes how much better Gemini is at reasoning. If that’s the case, I wonder how good it might be at planning. Can you envision building agents using the Gemini, for stuff like making reservations?**

**Hassabis:** You hit the nail on the head there, Casey. That’s something we’re thinking very heavily about. It’s in our heritage, really, back from the old DeepMind Days. We’re experts at these kinds of agent-based systems and planning systems. So watch this space. We’re pushing hard on that.

But multimodality is an important thing — it’s a basic thing you need (to build agents.) If you imagine robotics, or even just digital agents, and understanding user interfaces and how to interact with things. You have to parse the environment you’re in, multimodally, before you can act in the world in a useful manner. So you can think of it as a prerequisite to the planning and interacting stage.

**Pichai:** But those are innovations to come.

**You’re now saying that Gemini will come to search next year. How do you see it changing the search experience?**

**Pichai:** We’re already experimenting with it in the [search generative experience](https://blog.google/products/search/generative-ai-search/), and as we are experimenting with it, it’s driving improvements across the board. We think about Gemini as foundational — it will work across all our products. Search is no different.

One of the things search has been pushing hard on is multimodality in general. But today they have had to do all the hard work of making search multimodal. Gemini as a foundational model gives them that capability \[natively\], so I think that’s an area where they will innovate.

**Do you think over the medium term, Gemini in search increases the number of times that you get the information you need from the results page without having to visit a website?**

**Pichai:** Our fundamental vision is that people come to search to experience the richness and the diversity of the web and the content ecosystem. So even though with search generative experience we can expand what we do, we’re actually designing the product in a. way so that people can go explore. And I think that’s what users want. I view it as a fundamental value proposition of search, so that’d be part of our goal as we evolve the product.

**I’m also reading that Gemini is coming to Chrome. What can you do with Gemini in a web browser?**

**Pichai:** It can look at what’s on the web page and answer questions for you, and help you with tasks related to that. You can imagine looking at something you want to understand, like a set of figures on a web page, and saying “quickly summarize this for me.” All that is now possible, right? Again, it’s this notion of being an assistant for the user to help them with what they’re doing while they’re browsing the web. All these are possibilities.

**I want to get a sense of the state of the art. I imagine that you can spend most of 2024 just refining Gemini 1.0. But as you start to look forward to training a Gemini 2.0, does that feel like a matter of simply throwing more data and compute at techniques you’ve already developed? Or are there some fundamental research breakthroughs that you would need to make first?**

**Hassabis:** Great question. I think that the answer is both — we’re going to push the frontiers of both. We’re looking at lots of blue-sky research on things like planning; lengthening context windows; and all of these critical capabilities that current systems don’t have and that we’re going to need if we’re going to get towards AGI-level systems. So we’re hard at work on all of that.

There’s a lot more juice left to get from scaling, improving architectures, and maybe more incremental improvements, on top of these big innovative new capabilities. And there’s actually an enormous number of research areas that are looking promising.

**Pichai:** I would say that it feels very early to me. We have a clear line of sight that Gemini 2.0 is going to be much better. If I look at all the work that Google DeepMind is doing, and you say that there are 10 to 15 areas — right now you’re seeing fast progress in one area, right? But there are going to be innovations from the other areas, too, which will come into all of this.

**Your model seems to be getting really good at winning coding competitions. A year from now, can you imagine them being good enough that you don’t need to hire as many engineers?**

**Pichai:** I really think of this as making programmers far more productive, and over time taking some of the grunt work out of the job.

I think programmers will have such sophisticated tools that *more* people will be able to become programmers. We shouldn’t underestimate that. The bar will change, and it will expand access the field.

**Sundar, earlier this year we were talking, and you mentioned that you wouldn’t mind if the pace of development in the AI field slowed down a bit. How are you feeling about the pace of development now?**

**Pichai:** I have two lenses which I use. I’m very optimistic about the potential. For example, if I take a step back and say that the breakthroughs here may help us make progress against cancer more easily, I want it to move as fast as possible. Why wouldn’t you? But I do think as we are driving toward more and more capable models, we need to take time to make sure we put safeguards in place.

I think the pace right now is at a place where it’s exciting. But there will be moments where we feel like we can all take a breather and catch up, too. I think they’ll go hand in hand.

**Hassabis:** I agree. It’s been a bit of a rocket-ship journey for the whole field. I’ve been working on this for 20, 30 years, and for me to see this all working is fantastic. Diseases really will be cured by AI-enabled technologies. New materials will help us with climate change. The number of things that I think AI can be applied to to help society is almost limitless. We’re really close now to actual, practical, useful things in the real world, beyond just the games and stuff we used to do so well.

But at the same time, I’ve always believed it’s going to be one of the most transformative technologies that humanity will ever invent. I think more people are coming around to that view now. So we really need to be thoughtful and responsible, and have as much foresight as possible about the unintended consequences.

\---

###### **Sponsored**

### **Investors are focused on these metrics.**

**Startups should take notice.**

[

![](https://substackcdn.com/image/fetch/$s_!wARg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb96b93f7-5e56-4242-9161-61bae38ac279_4000x2000.jpeg)



](https://mercury.com/blog/early-stage-fundraising-metrics-down-market?utm_source=platformer&utm_medium=sponsored_newsletter&utm_campaign=23q3_brand_campaign&utm_content=fundraise)

It takes more than a great idea to make your ambitions real. That’s why Mercury goes beyond banking\* to share the knowledge and network startups need to succeed. In this article, they shed light on the key metrics investors have their sights set on right now.

Even in today’s challenging market, investments in early-stage startups are still being made. That’s because VCs and investors haven’t stopped looking for opportunities — they’ve simply shifted what they are searching *for.* By understanding investors’ key metrics, early-stage startups can laser-focus their next investor pitch to land the funding necessary to take their company to the next stage.

Read the full article to learn how investors think and how you can lean into these numbers today.

*\*Mercury is a financial technology company, not a bank. Banking services provided by Choice Financial Group and Evolve Bank & Trust®; Members FDIC.*

*Platformer has been a Mercury customer since 2020. This sponsorship gets us 5% closer to our goal of hiring a reporter in 2024.*

\---

### Governing

-   [Meta, IBM, and more than 40 other companies are forming an alliance focused on responsible open-source development.](https://www.bloomberg.com/news/articles/2023-12-05/meta-ibm-create-industrywide-ai-alliance-to-share-technology?sref=CrGXSfHu) The group plans to share technology, including safety tools. (Alex Barinka / Bloomberg)
    
-   [The UK’s Ofcom is publishing a new set of rules for how to age-gate porn online, under the Online Safety Act, including external verification methods like credit cards and mobile carriers.](https://www.theverge.com/2023/12/4/23987821/uk-online-safety-act-age-verification-pornography-privacy) (Jon Porter / *The Verge*)
    
-   [Security technologist Bruce Schneier discusses how AI systems will increasingly confuse two types of trust — interpersonal and social — and how regulating organizations that control and use AI is essential.](https://www.schneier.com/blog/archives/2023/12/ai-and-trust.html) (*Schneier on Security*)
    
-   [X was granted money transmitter licenses from three additional states, bringing the total number to 12.](https://techcrunch.com/2023/12/05/x-is-now-licensed-for-payment-processing-in-a-dozen-u-s-states/) If you transmit money using X let us know how it goes for you! (Sarah Perez / *TechCrunch*)
    
-   [AI model Civitai, backed by venture capital firm Andreesen Horowitz, reportedly generated content that “could be categorized as child pornography”.](https://www.404media.co/a16z-funded-ai-platform-generated-images-that-could-be-categorized-as-child-pornography-leaked-documents-show/?ref=daily-stories-newsletter) Another huge win for the accelerationists. (Emanuel Maiberg / *404Media*)
    

\---

### Industry

-   [Threads is now outpacing X in new downloads amid an exodus of major advertisers from X.](https://techcrunch.com/2023/12/04/threads-downloads-return-to-growth-as-x-adds-walmart-to-its-advertiser-exodus/) (Sarah Perez / *TechCrunch*)
    
    -   [But publishers are still hesitant to invest resources into Threads despite some organizations seeing growth in engagement, citing limited data available to their audience teams.](https://digiday.com/media/news-publishers-hesitate-to-commit-to-investing-more-into-threads-next-year-despite-growing-engagement/) (Sara Guaglione / *Digiday*)
        
-   [The launch of ChatGPT a year ago triggered the AI arms race in Silicon Valley, as this detailed piece recounts.](https://www.nytimes.com/2023/12/05/technology/ai-chatgpt-google-meta.html) (Karen Weise, Cade Metz, Nico Grant and Mike Isaac / *The New York Times*)
    
-   [Microsoft Copilot will get support for GPT-4 Turbo soon, along with other new OpenAI models, a new code interpreter, and deep search for Bing.](https://www.theverge.com/2023/12/5/23989052/microsoft-copilot-gpt-4-turbo-openai-models-code-interpreter-feature) (Tom Warren / *The Verge*)
    
-   [Gmail’s new AI-powered spam filters says it can now understand “adversarial text manipulations” – junk emails with many special characters that went previously undetected.](https://arstechnica.com/gadgets/2023/12/gmails-ai-powered-spam-detection-is-its-biggest-security-upgrade-in-years/) It should loan the technology to the Meta team responsible for catching new CSAM-related hashtags. (Ron Amadeo / *Ars Technica*)
    
-   [Musk’s x.AI filed to raise up to $1 billion in an equity offering, a month after the debut of its chatbot Grok.](https://www.cnbc.com/2023/12/05/elon-musks-ai-startup-xai-files-to-raise-1-billion-.html) (Hayden Field / *CNBC*)
    
-   [Beeper Mini is a new Android app that reverse-engineered iMessage to allow Android users to send blue-bubble texts to their friends on iOS.](https://www.theverge.com/2023/12/5/23987817/beeper-mini-imessage-android-reverse-engineer) Will Apple let it stand? (Jacob Kastrenakes / *The Verge*)
    
-   [Discord’s mobile app got a redesign, with a new set of navigation tabs named Servers, Messages, Notifications, and You.](https://www.engadget.com/discord-overhauls-its-mobile-app-with-new-tabs-messaging-features-and-more-170035917.html) (Sarah Fielding / *Engadget*)
    
-   [Alibaba’s new “Animate Anyone” AI feature is actually trained on scraped videos of famous TikTokers dancing.](https://www.404media.co/alibaba-animate-anyone-ai-generated-tiktok/) (Samantha Cole / *404Media*)
    

\---

### Those good posts

[

![](https://substackcdn.com/image/fetch/$s_!zsuW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0a7ba937-8185-4291-9b72-d100d9f279a3_1348x396.png)



](https://substackcdn.com/image/fetch/$s_!zsuW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0a7ba937-8185-4291-9b72-d100d9f279a3_1348x396.png)

([Link](https://www.threads.net/@davidgrosstv/post/C0cuZeHPUHs))

[

![](https://substackcdn.com/image/fetch/$s_!RbCb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32d03294-c67f-4b5c-8a89-b85e5018770f_1198x438.png)



](https://substackcdn.com/image/fetch/$s_!RbCb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32d03294-c67f-4b5c-8a89-b85e5018770f_1198x438.png)

([Link](https://bsky.app/profile/juniorhoncho.bsky.social/post/3kfnlw2fmmz2s))

[

![](https://substackcdn.com/image/fetch/$s_!NL2f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa1515a3-4860-4dc7-a4c0-dfa4bde0b39e_1274x1766.png)



](https://substackcdn.com/image/fetch/$s_!NL2f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa1515a3-4860-4dc7-a4c0-dfa4bde0b39e_1274x1766.png)

([Link](https://bsky.app/profile/adriaandthepriors.bsky.social/post/3kfsbbdq4sc23))

\---

### Talk to us

Send us tips, comments, questions, and Gemini benchmarks: [casey@platformer.news](mailto:casey@platformer.news) and [zoe@platformer.news](mailto:zoe@platformer.news).