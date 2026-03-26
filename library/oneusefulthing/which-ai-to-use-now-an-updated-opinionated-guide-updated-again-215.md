---
title: "Which AI to Use Now: An Updated Opinionated Guide (Updated Again 2/15)"
author: "Ethan Mollick"
publication: "One Useful Thing"
publication_slug: "oneusefulthing"
published_at: "2025-01-26T12:45:48.000Z"
source_url: "https://www.oneusefulthing.org/p/which-ai-to-use-now-an-updated-opinionated"
word_count: 2636
estimated_read_time: 14
---

*Please note that I updated this guide on 2/15, less than a month after writing it - a lot has changed in a short time.*

While my [last post](https://www.oneusefulthing.org/p/prophecies-of-the-flood) explored the race for Artificial General Intelligence – a topic recently thrust into headlines by Apollo Program-scale funding commitments to building new AIs – today I'm tackling the one question I get asked most: what AI should you actually use? Not five years from now. Not in some hypothetical future. Today.

Every six months or so, I have written an opinionated guide for individual users of AI, not specializing in any one type of use, but as a general overview. Writing this is getting more challenging. AI models are gaining capabilities at an increasingly rapid rate, new companies are releasing new models, and nothing is well documented or well understood. In fact, in the few days I have been working on this draft, I had to add an entirely new model and update the chart below multiple times due to new releases. As a result, I may get something wrong, or you may disagree with my answers, but that is why I consider it an opinionated guide (though as a reminder, I take no money from AI labs, so it is my opinion!)

# A Tour of Capabilities

To pick an AI model for you, you need to know what they can do. I decided to focus here on the major AI companies that offer easy-to-use apps that you can run on your phone, and which allow you to access their most up-to-date AI models. Right now, to consistently access a frontier model with a good app, you are going to need to pay around $20/month (at least in the US), with a couple exceptions. Yes, there are free tiers, but you'll generally want paid access to get the most capable versions of these models.

[

![](https://substackcdn.com/image/fetch/$s_!dh7u!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd5798b6-1107-40ba-905b-f987861acff4_1512x515.png)



](https://substackcdn.com/image/fetch/$s_!dh7u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd5798b6-1107-40ba-905b-f987861acff4_1512x515.png)

We are going to go through things in detail, but, for most people, there are three good choices right now: [Claude](https://claude.ai/) from Anthropic, Google’s [Gemini](https://gemini.google.com/), and OpenAI’s [ChatGPT](https://chatgpt.com/). There are also a trio of models that might make sense for specialized users: [Grok](https://x.ai/) by Elon Musk’s X.ai is an excellent model that is most useful if you are a big X user; Microsoft’s [Copilot](https://copilot.microsoft.com/) offers many of the features of ChatGPT and is accessible to users through Windows; and [DeepSeek](https://chat.deepseek.com/) r1, a Chinese model that is remarkably capable (and free). I’ll talk about some caveats and other options at the end.

## Service and Model

For most people starting to use AI, the most important goal is to ensure that you have access to a frontier model with its own app. Frontier models are the most advanced AIs, and, thanks to the '[scaling law](https://www.oneusefulthing.org/p/scaling-the-state-of-play-in-ai)' (where bigger models get disproportionately smarter), they’re far more capable than older versions. That means they make fewer mistakes, and they often can provide more useful features.

The problem is that most of the AI companies push you towards their smaller AI models if you don’t pay for access, and sometimes even if you do. Generally, smaller models are much faster to run, slightly less capable, and also much cheaper for the AI companies to operate. For example, GPT-4o-mini is the smaller version of GPT-4 and Gemini Flash is the smaller version of Gemini. Often, you want to use the full models where possible, but there are exceptions when the smaller model is actually more advanced. And everything has terrible names. Right now, for Claude you want to use Claude 3.5 Sonnet (which consistently outperforms its larger sibling Claude 3 Opus), for Gemini you want to use Gemini 2.0 Pro (though Gemini 2.0 Flash Thinking is also excellent), and for ChatGPT you want to use GPT-4o (except when tackling complex problems that benefit from o1 or o3's reasoning capabilities). While this can be confusing, it is also a side effect of how quickly these companies are updating their AIs, and their features.

## Live Mode

Imagine an AI that can converse with you in real-time, seeing what you see, hearing what you say, and responding naturally – that's “Live Mode” (though it goes by various names). This interactive capability represents a powerful way to use AI. To demonstrate, I used ChatGPT's “Advanced Voice Mode” to discuss my game collection. This entire interaction, which you can hear with sound on, took place on my phone

You are actually seeing three advances in AI working together: First, multimodal speech lets the AI handle voice natively, unlike most AI models that use separate systems to convert between text and speech. This means it can theoretically generate any sound, though OpenAI limits this for safety. Second, multimodal vision lets the AI see and analyze real-time video. Third, internet connectivity provides access to current information. The system isn't perfect - when pulling the board game ratings from the internet, it got one right but mixed up another with its expansion pack. Still, the seamless combination of these features creates a remarkably natural interaction, like chatting with a knowledgeable (if not always 100% accurate) friend who can see what you're seeing.

Right now, only ChatGPT offers a full multimodal Live Mode for all paying customers. It’s the little icon all the way to the right of the prompt bar (ChatGPT is full of little icons). But Google has already demonstrated a Live Mode for its Gemini model, and I expect we will see others soon.

[

![](https://substackcdn.com/image/fetch/$s_!kiFR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F003bb7ae-f28f-4d2e-b044-f80490140d72_1170x275.png)



](https://substackcdn.com/image/fetch/$s_!kiFR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F003bb7ae-f28f-4d2e-b044-f80490140d72_1170x275.png)

## Reasoning

For those who are watching the AI space, by far the most important recent advance in the last few months has been the development of reasoning models. As I explained in [my post about o1](https://www.oneusefulthing.org/p/something-new-on-openais-strawberry), it turns out that if you let an AI “think” about a problem before answering, you get better results. The longer the model thinks, generally, the better the outcome. Behind the scenes, it's cranking through a whole thought process you never see, only showing you the final answer. Interestingly, when you peek behind that curtain, you find these AIs think in ways that feel eerily human:

[

![](https://substackcdn.com/image/fetch/$s_!W0tJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb2e6d5b-4c9d-4518-8ee0-b647c6e6dbd6_3960x1918.png)



](https://substackcdn.com/image/fetch/$s_!W0tJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb2e6d5b-4c9d-4518-8ee0-b647c6e6dbd6_3960x1918.png)
*Really worth reading the thinking process, it is kind of charming*

That was the thinking process of DeepSeek-v3 r1, one of only a few reasoning models that have been released to the public. It is also an unusual model in many ways: it is an excellent model from China[1](#footnote-1); it is open source so anyone can download and modify it; and it is cheap to run (and is currently offered for free by its parent company, DeepSeek). Google also offers a reasoning version of its Gemini 2.0 Flash. However, the most capable reasoning models right now are the o1 family from OpenAI. These are confusingly named, but, in order of capability, there are o1-mini, o3-mini, o3-mini-high, o1, and o1-pro (OpenAI could not get the rights to the o2 name, making things even more baffling).

Reasoning models aren’t chatty assistants – they’re more like scholars. You’ll ask a question, wait while they ‘think’ (sometimes minutes!), and get an answer. You want to make sure that the question you give them is very clear and has all the context they need. For very hard questions, especially in academic research, math, or computer science, you will want to use a reasoning model. Otherwise, a standard chat model is fine.

## Web Access and Research

Not all AIs can access the web and do searches to learn new information past their original training. Currently, Gemini, Grok, DeepSeek, Copilot and ChatGPT can search the web actively, while Claude cannot. This capability makes a huge difference when you need current information or fact-checking, but not all models use their internet connections fully, so you will still need to fact-check.

Two models, Gemini and OpenAI, go far beyond simple internet access and offer the option for “Deep Research” [which I discuss in more detail in this post](https://www.oneusefulthing.org/p/the-end-of-search-the-beginning-of). OpenAI’s model is more like a PhD analyst who looks at relatively few sources yet assembles a striklingly sophisticated analyst report, while Gemini’s approach is more like a summary of the open web on a topic.

## Generates Images

Most of the LLMs that generate images do so by actually using a separate image generation tool. They do not have direct control over what that tool does, they just send a prompt to it and then show you the picture that results. That is changing with multimodal image creation, which lets the AI directly control the images it makes. For right now, Gemini's Imagen 3 leads the pack, but honestly? They'll all handle your basic “otter holding a sign saying 'This is \_\_\_\_' as it sits on a pink unicorn float in the middle of a pool” just fine.

[

![](https://substackcdn.com/image/fetch/$s_!TQCi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2b1804b-a935-4920-8b26-8672d32f79b9_2425x723.png)



](https://substackcdn.com/image/fetch/$s_!TQCi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2b1804b-a935-4920-8b26-8672d32f79b9_2425x723.png)

## Executes Code and Does Data Analysis

All AIs are pretty good at writing code, but only a few models (mostly Claude and ChatGPT, but also Gemini to a lesser extent) have the ability to execute the code directly. Doing so lets you do a lot of exciting things. For example, this is the result of telling o1 using the Canvas feature (which you need to turn on by typing /canvas): “create an interactive tool that visually shows me how correlation works, and why correlation alone is not a great descriptor of the underlying data in many cases. make it accessible to non-math people and highly interactive and engaging”

Further, when models can code and use external files, they are capable of doing data analysis. Want to analyze a dataset? ChatGPT's Code Interpreter will do the best job on statistical analyses, Claude does less statistics but often is best at interpretation, and Gemini tends to focus on graphing. None of them are great with Excel files full of formulas and tabs yet, but they do a good job with structured data.

[

![](https://substackcdn.com/image/fetch/$s_!m_6x!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cc14b06-8b8f-4421-9f1a-20e894af7ed9_1728x1100.png)



](https://substackcdn.com/image/fetch/$s_!m_6x!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cc14b06-8b8f-4421-9f1a-20e894af7ed9_1728x1100.png)
*Claude does not do as sophisticated data analysis as ChatGPT, but it is very good at an “intuitive” understanding of data and what it means*

## Reads documents, sees images, sees video

It is very useful for your AI to take in data from the outside world. Almost all of the major AIs include the ability to process images. The models can often infer a huge amount from a picture. Far fewer models do video (which is actually processed as images at 1 frame every second or two). Right now that can only be done by Google’s Gemini, though ChatGPT can see video in Live Mode.

[

![](https://substackcdn.com/image/fetch/$s_!ZTLs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31f2be87-3a1b-4550-9ec1-567816624652_5213x1904.png)



](https://substackcdn.com/image/fetch/$s_!ZTLs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31f2be87-3a1b-4550-9ec1-567816624652_5213x1904.png)
*Given the first photo Claude guesses where I am. Given the second it identifies the type of plane. These aren’t obvious.*

And, while all the AI models can work with documents, they aren’t equally good at all formats. Gemini, GPT-4o (but not o3), and Claude can process PDFs with images and charts, while DeepSeek can only read the text. No model is particularly good at Excel or PowerPoint (though Microsoft Copilot does a bit better here, as you might expect), though that will change soon. The different models also have different amounts of memory ("context windows") with Gemini having by far the most, capable of holding up to 2 million words at once.

## Privacy and other factors

A year ago, privacy was a major concern when choosing an AI model. The early versions of these systems would save your chats and use them to improve their models. That's changed dramatically. Every major provider (except DeepSeek) now offers some form of privacy-focused mode: ChatGPT lets you [opt out of training](https://help.openai.com/en/articles/7730893-data-controls-faq), and Claude [says it will not train on your data](https://privacy.anthropic.com/en/articles/10023555-how-do-you-use-personal-data-in-model-training) as does [Gemini](https://cloud.google.com/gemini/docs/discover/data-governance#:~:text=The%20questions%20that%20you%20ask,data%20to%20train%20its%20models.). The exception is if you're handling truly sensitive data like medical records – in those cases, you'll still want to look into enterprise versions of these tools that offer additional security guarantees and meet regulatory requirements.

Each platform offers different ways to customize the AI for your use cases. ChatGPT lets you create custom GPTs tailored to specific tasks and includes an optional feature to remember facts from previous conversations, Gemini integrates with your Google workspace, and Claude has custom styles and projects.

# Which AI should you use?

As you can see, there are lots of features to pick from, and, on top of that, there is the issue of “vibes” - each model has its own personality and way of working, almost like a person. If you happen to like the personality of a particular AI, you may be willing to put up with fewer features or less capabilities. You can try out the free versions of multiple AIs to get a sense for that. That said, for most people, you probably want to pick among the paid versions of ChatGPT, Claude or Gemini.

**ChatGPT** currently has the best Live Mode in its Advanced Voice Mode. The other big advantage of ChatGPT is that it does everything, often in somewhat confusing ways - OpenAI has AI models specialized in hard problems (o1/o3 series) and models for chat (GPT-4o); some models can write and run complex software programs (though it is hard to know which); there are reseachers and agents; there are systems that remember past interactions and scheduling systems; movie-making tools and early software agents. It can be a lot, but it gives you opportunities to experiment with many different AI capabilities. It is also worth noting that ChatGPT offers a $200/month tier, whose main advantage is access to very powerful reasoning models.

**Gemini** does not yet have as good a Live Mode, but that is supposed to be coming soon. For now, Gemini’s advantage is a family of powerful models including reasoners, very good integration with search, and a pretty easy-to-use user interface, as you might expect from Google. It also has top-flight image and video generation. Also excellent is [Deep Research, which I wrote about at length in my last post](https://www.oneusefulthing.org/p/prophecies-of-the-flood).

**Claude** has the smallest number of features of any of these three systems, and really only has one model you care about - Claude 3.5 Sonnet. But Sonnet is very, very good. It often seems to be clever and insightful in ways that the other models are not. A lot of people end up using Claude as their primary model as a result, even though it is not as feature rich.

While it is new, you might also consider **DeepSeek** if you want a very good all-around model with excellent reasoning. As an open model, you can either use it hosted on the original Chinese DeepSeek site or from a number of local providers. If you subscribe to X, you get **Grok** for free, and the team at X.ai are scaling up capabilities quickly, with a soon-to-be-released new model, Grok 3, promising to be the largest model ever trained. And if you have **Copilot**, you can use that, as it includes a mix of Microsoft and OpenAI models, though I find the lack of transparency over which models it is using when to be somewhat confusing. There are also many services, like Poe, that offer access to multiple models at the same time, if you want to experiment.

In the time it took you to read this guide, a new AI capability probably launched and two others got major upgrades. But don't let that paralyze you. The secret isn't waiting for the perfect AI - it's diving in and discovering what these tools can actually accomplish. Jump in, get your hands dirty, and find what clicks. It will help you understand where AI can help you, where it can’t, and what is coming next.

[

![](https://substackcdn.com/image/fetch/$s_!IXLE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8967281-46f5-483f-8655-20a5e86293d9_1376x864.png)



](https://substackcdn.com/image/fetch/$s_!IXLE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8967281-46f5-483f-8655-20a5e86293d9_1376x864.png)

[1](#footnote-anchor-1)

The fact that it is a Chinese model is interesting in many ways, including the fact that this is the first non-US model to reach near the top of the AI ranking leaderboards. The quality of the model when it was released last week came as a surprise to many people in the AI space, causing a tremendous amount of discussion. Its origin also means that it tends to echo the official Chinese position on a variety of political topics. (Since the model itself is open, it is very likely that modified versions of the original will be released soon and hosted by other providers)