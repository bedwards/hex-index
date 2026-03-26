---
title: "Why GenAI is Good for Google"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-07-30T23:44:29.000Z"
source_url: "https://www.chipstrat.com/p/why-genai-is-good-for-google"
word_count: 2642
estimated_read_time: 14
---

For the last year, one of the most persistent narratives in tech has been that **generative AI will make Google Search obsolete.**

After all, if an AI can answer your question directly, why click on a link? And if nobody clicks, Google’s ad business collapses. Right?

But Google’s earnings tell a different story. Revenue is up. Search is up. GenAI features are *additive* to usage and revenue.

So what’s really going on?

## Google’s Core Business

To answer that, it helps to step back and look at what Google actually is. The company can be thought of as operating three distinct business:

-   **Information** (Search and other apps, monetized primarily through advertising)
    
-   **Entertainment** (YouTube, also ad‑driven but with subscriptions too)
    
-   **Cloud Computing**
    

A fourth is emerging too:

-   **Transportation** (Waymo, a bet on the future)
    

Let’s focus on the information business, and specifically on search — Google’s oldest and most profitable segment, and the one most often assumed to be in existential danger from GenAI.

### JTBD

**The job-to-be-done is simple: answer my question.**

The user asks a question, Google delivers the best answer, and advertisers pay to appear alongside those answers.

[

![](https://substackcdn.com/image/fetch/$s_!uhy1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ea1a587-4f85-49e5-8246-02e2d0493f07_1600x684.png)



](https://substackcdn.com/image/fetch/$s_!uhy1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ea1a587-4f85-49e5-8246-02e2d0493f07_1600x684.png)
*A simple framework for understanding Google’s information business, its stakeholders, and the core job-to-be-done*

Historically, this answer took the form of “10 blue links”, with ads sold for the most prominent spots.

**The “GenAI ends Search” narrative assumes that generative answers replace the 10 blue links with a static box of text —** something like a ChatGPT answer that eliminates the ads and often all links.

But that assumption jumps straight to a solution without first discussing the problem. What *problem* is Search solving for its stakeholders, and how can GenAI help solve it better? Are we sure that ChatGPT answers are the best UX for all stakeholders?

Let’s start with Google’s pre-Generative AI solution first. This search experience has friction for users, advertisers, and Google itself.

GenAI makes the experience much better, all around.

## Friction Within Google’s Current UX

For users, the pain often starts with intent. **Does Google understand what you are asking for?**

Paradoxically, the longer and more detailed the search prompt, the worse the results often get because more keywords match more content. That is the opposite of what you would expect! *More context should help Google better understand your intent, right?*

[Search operators](https://serpzilla.com/blog/advanced-google-search-operators/) were introduced to bridge this gap, but they are a clunky workaround from computer scientists. *Hey, just treat this search like a SQL query!*

Human questions, and the intent behind them, are still often misunderstood by the machine.

[

![](https://substackcdn.com/image/fetch/$s_!LKig!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F219b4098-9e34-4f39-9d7a-999b85307269_1600x644.png)



](https://substackcdn.com/image/fetch/$s_!LKig!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F219b4098-9e34-4f39-9d7a-999b85307269_1600x644.png)
*To give great answers, one must first understand the question!*

There’s also friction between Google and the *organic information* itself. **A website may contain exactly what the user wants, but if the search query terms do not closely match the site’s text, Google may not surface it**. SEO exists in part to solve this, which trains content creators to anticipate every possible synonym a searcher might use and incorporate them into the content. *What a pain…that’s a hack, not a solution.*

**Moreover, much of the world’s best information is visual or in video, formats that traditional keyword search has always struggled to interpret.** One hack is to transcribe the video, and then match the user’s search query against the transcript. But that’s still back to keyword matching and intent mismatch

[

![](https://substackcdn.com/image/fetch/$s_!ukuU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc210ff6e-cdda-4c87-9fe1-9723e83f557f_1600x643.png)



](https://substackcdn.com/image/fetch/$s_!ukuU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc210ff6e-cdda-4c87-9fe1-9723e83f557f_1600x643.png)
*Correctly answering questions requires Google to truly understand all the content it processes.*

Then there’s the pain of advertisers (who underwrite this whole system!) They need to **find the right user, at the right time, with the right message.**

This is hard! Even with years of machine‑learning optimizations, mismatched *targeting* is common. We’ve all seen ads for things we already bought!

[

![](https://substackcdn.com/image/fetch/$s_!9UR6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97935f38-123c-4e1a-8be9-446d3b53066e_1600x646.png)



](https://substackcdn.com/image/fetch/$s_!9UR6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97935f38-123c-4e1a-8be9-446d3b53066e_1600x646.png)
*The ad itself must make sense given the context of the question and the answers.*

Finally, there’s the answers UX. The more scrolling required to find an answer, the worse the experience. Today the content can be stuffed with sponsored results, forcing users to scroll. This is obviously why GenAI answers are so compelling; just tell me what I’m looking for, don’t make me click into 10 blue links to hunt it down.

[

![](https://substackcdn.com/image/fetch/$s_!sA_9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2744071-6f2b-4e41-ba74-92b64d054cf2_1600x682.png)



](https://substackcdn.com/image/fetch/$s_!sA_9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa2744071-6f2b-4e41-ba74-92b64d054cf2_1600x682.png)
*Imagine asking a question and your teacher, instead of answering, just gives you 10 books with pages bookmarked and says “what you’re looking for is in here”, go check it out 😬*

**Generative AI can reduce all of this friction!** LLMs make every step better.

They understand intent more accurately; the longer the prompt, the *better* Google understands you.

Multimodal LLMs understand the meaning of the websites Google scrapes; it’s not just keyword matching anymore, but actually comparing the *meaning of the content* with the users intent.

Morever, multimodal LLMs can process and reason over images and video as easily as text! This is *huge* for Google.

**Most importantly, GenAI can help advertisers find the right users, at the right time, and say the most relevant things.**

[

![](https://substackcdn.com/image/fetch/$s_!5b_S!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9304716a-dcb4-4787-8717-b0560e0d2df8_1600x642.png)



](https://substackcdn.com/image/fetch/$s_!5b_S!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9304716a-dcb4-4787-8717-b0560e0d2df8_1600x642.png)
*Why is GenAI is great for Google? Because it reduces friction everywhere in Google’s information business!*

The job-to-be-done remains the same, but the experience is better! GenAI does not undercut Search; it removes the friction that limits it today.

Which leads to the final point.

**Don’t you think GenAI can help Google make an even better answers experience that still includes ads?** Surely it can!

Google can provide better answers to users questions while still embedding tasteful paid ads into the experience.

And it’s already happening!

Watch [Google Marketing Live 2025](https://www.youtube.com/watch?v=Aem4LcsFNE0) for an example, starting at 33:26.

> “Imagine you're Volvo and someone searches electric SUV for a large family.”
> 
> [
> 
> ![](https://substackcdn.com/image/fetch/$s_!eJNk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12f4a308-6b9d-4418-9bea-22050cad3145_1062x338.png)
> 
> 
> 
> ](https://substackcdn.com/image/fetch/$s_!eJNk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12f4a308-6b9d-4418-9bea-22050cad3145_1062x338.png)
> 
> “Volvo didn't target that specific phrase.”
> 
> [
> 
> ![](https://substackcdn.com/image/fetch/$s_!0ymQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F925f6521-6e92-47ba-af7a-a49a3027bc4a_782x406.png)
> 
> 
> 
> ](https://substackcdn.com/image/fetch/$s_!0ymQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F925f6521-6e92-47ba-af7a-a49a3027bc4a_782x406.png)
> 
> “But look! There's Volvo's ad, right at the top, with an improved headline customized for that exact search, generated in realtime!”
> 
> [
> 
> ![](https://substackcdn.com/image/fetch/$s_!CCG5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F559e2461-2e92-4dbb-866a-dbf323c37f5a_1198x864.png)
> 
> 
> 
> ](https://substackcdn.com/image/fetch/$s_!CCG5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F559e2461-2e92-4dbb-866a-dbf323c37f5a_1198x864.png)
> 
> “How? Because AI Max understands the intent, not just the words. It learns from everything Volvo already has, their site, their creatives and that headline is perfectly tailored to electric vehicle and seven seats.”
> 
> [
> 
> ![](https://substackcdn.com/image/fetch/$s_!i6hZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdea95b2b-2270-4e02-b1d7-35d8b44dc550_1600x883.png)
> 
> 
> 
> ](https://substackcdn.com/image/fetch/$s_!i6hZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdea95b2b-2270-4e02-b1d7-35d8b44dc550_1600x883.png)

*Dude!*

Google now understands human intent and can articulate the advertiser’s offering in the phrasing that matters to the customer! Incredible. *Of course, the engineers have to make it work well, but the vision is amazing.*

**GenAI is the best thing that’s happened to Google’s information business in quite some time.**

Thanks Transformers team.

[

![](https://substackcdn.com/image/fetch/$s_!478S!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff52de7e6-6129-4146-8c1a-b8623dabec32_1600x534.png)



](https://substackcdn.com/image/fetch/$s_!478S!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff52de7e6-6129-4146-8c1a-b8623dabec32_1600x534.png)
*[Source](https://www.ft.com/content/37bb01af-ee46-4483-982f-ef3921436a50)*

## OpenAI & ChatGPT

The big elephant in the room: **Won’t users just prefer to use ChatGPT?**

That’s a loaded one, but important. After all, OpenAI has brand value with ChatGPT; just like Google was synonymous with search, so ChatGPT is with LLMs.

Yet don’t underestimate Google’s existing reach and existing habits. Google has major distribution, on the order of 13B+ searches *per day*. They have brand value with the majority of consumers and one of the most respected and valuable brands in the world.

**Importantly, consumers reach across Google’s portfolio apps for all sorts of information;** not just Search, but Images, Maps, Shopping, Flights, Discover, and more.

Google has 15 apps that each have half a billion or more monthly users. Many of those have more than 1 billion monthly active users. Gmail, Photos, Search, YouTube, and so on.

Thought experiment: Are you going to search ChatGPT for restaurants near you? Most would still search Google Maps, and that’s an advertising opportunity for Google.

Yes, you’d rather have an interactive conversation about the food near you; I agree, and Maps should rethink their experience to include LLMs. *Google Maps + voice + LLMs will unlock great user experiences! And more ad revenue opportunities…*

Google’s advantage doesn’t stop with apps. It controls key platform layers like Android and Chrome, giving it reach and default positioning that ChatGPT can’t match right now.

The path forward for Google is straightforward: keep innovating with GenAI to improve both user and advertiser experiences, and defend its territory by reimagining its core products to meet changing expectations.

**But what about the fact that many have shifted their information seeking habit from Google / Wikipedia / etc to just a conversation with ChatGPT?**

That’s a great question.

Google’s north star has to be staying the default answer engine by delivering the best user experience. And in many contexts, a contextual conversation is simply better than a page of 10 blue links. If you ask a teacher a question, would you rather they hand you a list of 10 books with bookmarked pages, or have a conversation that gives you the answer directly? People want the answer pushed to them, not a list they have to pull from.

Putting the right answer in front of the user is absolutely the argument for AI overviews and AI mode in Google, which they are doing.

That’s exactly the rationale for Google’s AI Overviews and AI Mode — surfacing the right answer immediately, in context. **The difference is that Google already has a sustainable business model for doing this at scale.** OpenAI, by contrast, is still funded by its patrons, and running a state‑of‑the‑art LLM operation is expensive: training costs, top‑tier researcher salaries (helped along by Zuck’s hiring spree), and inference at global scale are capital‑intensive. OpenAI reportedly generates about $10 billion in annual revenue, but Microsoft’s CapEx to support it exceeds that, and SoftBank and Oracle are also expected to contribute heavily.

This isn’t to say OpenAI will fail — but they need a business model that closes the gap. It’s not obvious that the combination of paid subscribers, enterprise contracts, and developer APIs will offset the cost of free users, let alone the hardware and salaries required to serve them. **That means being a free, high‑quality answer engine is indeed a threat to Google — until it isn’t.**

OpenAI has, in effect, entered the same information business Google operates in, which makes an eventual advertising model logical. But even if they choose that path, building an ad machine that can match Google’s decades‑old, highly optimized system is an entirely different challenge.

## Operating Expenses

*OK, so GenAI enables better experiences for Google now. Yay! But isn’t it more expensive to service those requests?*

Yes, running GenAI at scale requires specialized accelerators. **Specifically, it’s more expensive to** ***generate answers*** **than to** ***retrieve data.***

But, revenue growth is outpacing cost increases!

In the past year, ad-driven revenue (Search + YouTube) grew faster than the underlying costs to serve it, expanding or maintaining healthy margins even as Google invests heavily in AI infrastructure.

Moreoever, Google has a sustainable cost advantage against competitors, being fully vertically integrated with its own TPUs.

[

![](https://substackcdn.com/image/fetch/$s_!SdLe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb72dd163-0bdb-498b-8b1c-e0985b3c681d_1288x1102.png)



](https://substackcdn.com/image/fetch/$s_!SdLe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb72dd163-0bdb-498b-8b1c-e0985b3c681d_1288x1102.png)
**Just a small snapshot of Google’s vertical integration**

That means Google can deliver “industry‑leading performance and cost efficiency for both training and inference” (Q2 2025 transcript). Unlike competitors, it avoids paying the hefty Nvidia tax. Yes, others are trying to build their own AI accelerators too, but Google is on it’s seventh generation of AI ASIC. Talk about a headstart! 🏃‍♂️

## **Google’s Data Advantage**

Winning in AI foundation models and building the world’s best contextual answer engine comes down to four things: compute, data, talent, and business model.

**Google has all four at scale.**

Google has the most AI accelerator compute in the world.

[

![](https://substackcdn.com/image/fetch/$s_!Jd7N!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03d43f2d-8a57-4a9f-aeee-918583e75f3d_1600x1008.png)



](https://substackcdn.com/image/fetch/$s_!Jd7N!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03d43f2d-8a57-4a9f-aeee-918583e75f3d_1600x1008.png)
*[Source](https://epoch.ai/data-insights/computing-capacity)*

And of course they have world-class AI talent across Google DeepMind and its research teams. *Of course, gotta keep them from Zuck and Altman.. and Mustafa!*

From [Microsoft poaches more Google DeepMind AI talent as it beefs up Copilot](https://www.cnbc.com/2025/07/22/microsoft-google-deepmind-ai-talent.html):

> Microsoft has hired around two dozen employees from Alphabet’s Google DeepMind artificial intelligence research lab in recent months, a person familiar with the recruiting told CNBC.

So yeah, everyone’s fighting that right now.

But the most underappreciated Google advantage is its data! The breadth, freshness, and richness of it is unmatched.

Every day, 20 million new YouTube videos are uploaded. That’s part of why Google’s Veo 3 video generation model is so capable: it’s trained with the scale and diversity of data that few, if any, can match.

*But don’t take my word for it. Or rather, do. Here’s me talking about it, generated with Veo 3.*

That’s not my voice, but dang, that’s impressive. I simply gave it this screenshot and a prompt.

[

![](https://substackcdn.com/image/fetch/$s_!4wG-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa4856901-ff3b-46d6-8572-65bb688adbb6_2944x1626.png)



](https://substackcdn.com/image/fetch/$s_!4wG-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa4856901-ff3b-46d6-8572-65bb688adbb6_2944x1626.png)

🤯! *That’s pretty cool, and it’s only going to get better!*

This data advantage directly feeds answer engine experiences that blend the digital and physical worlds:

[

![](https://substackcdn.com/image/fetch/$s_!h7dU!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32cf2476-d7de-4348-8cc3-6b0a09ac9019_329x554.gif)



](https://substackcdn.com/image/fetch/$s_!h7dU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32cf2476-d7de-4348-8cc3-6b0a09ac9019_329x554.gif)
**Circle-to-search. Or just scribble to search.**

[

![](https://substackcdn.com/image/fetch/$s_!9IgR!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab48a579-da6d-4862-a65d-ccf5c70a7cce_421x700.gif)



](https://substackcdn.com/image/fetch/$s_!9IgR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab48a579-da6d-4862-a65d-ccf5c70a7cce_421x700.gif)
**Google Lens**

Notice how Generative AI brings the real world into the digital! Multimodal models make everything queryable.

[

![](https://substackcdn.com/image/fetch/$s_!Ytm7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F578c77da-2640-449f-a816-b32e3a19ae65_1600x705.png)



](https://substackcdn.com/image/fetch/$s_!Ytm7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F578c77da-2640-449f-a816-b32e3a19ae65_1600x705.png)

Google’s consumer device reach (Android, Pixel) is an important way to making the real world queryable.

Just need Gemini and a camera… *watch this video [in this post](https://x.com/GeminiApp/status/1950270256498229517), it’s hilarious.*

[

![](https://substackcdn.com/image/fetch/$s_!6hgZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84b27966-42b2-4384-ae53-667c4d97eb42_1180x1580.png)



](https://substackcdn.com/image/fetch/$s_!6hgZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84b27966-42b2-4384-ae53-667c4d97eb42_1180x1580.png)

Which makes the next step obvious: Google needs a smart glasses and AR strategy again. *Google Glass was just a decade or so ahead of the curve… but now the technology has caught up.*

## **Entertainment**

The economics of ad‑supported digital entertainment look a lot like the economics of ad‑supported information.

The mechanics are nearly identical. Audience attention is monetized through targeted advertising.

The lines between information and entertainment have long been crossing, from AM radio to cable news to social media. *I think, quite often, people mistake entertainment for information :)*

Consider YouTube. Are 83% of Americans going there for entertainment, information, or both?

[

![](https://substackcdn.com/image/fetch/$s_!26ob!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdee21465-1a4a-4b14-a72e-190989654252_620x1060.png)



](https://substackcdn.com/image/fetch/$s_!26ob!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdee21465-1a4a-4b14-a72e-190989654252_620x1060.png)
**[Source](https://www.pewresearch.org/internet/2024/01/31/americans-social-media-use/)**

In many cases, the best informational videos are also entertaining. *That’s what I aim for with my prose too* 😊

And the YouTube reach is staggering. From the recent 2Q25 earnings call,

> Nielsen data shows YouTube has led U.S. streaming watch time for over two years. A generation that grew up with YouTube on their devices is now increasingly watching their favorite creators and content on their televisions.
> 
> That includes billions of sports fans, too. Globally they consume more than 40 billion hours of sports content on YouTube annually.

Dang. That’s tons of ad placements! And it’s not just replacing the traditional TV format, but inventing new ones.

> We now average over 200 billion daily views on YouTube Shorts.

Just like in the information business, generative AI is improving both the viewer experience and the monetization tools.

> AI is helping improve our recommendations and Auto Dubbing, which translates to better returns for creators and brands by dramatically increasing the potential audiences they can reach. And today, we began rolling out a whole raft of new AI tools for creators on YouTube Shorts.

This is the key takeaway: **Generative AI is a clear tailwind for Google’s entertainment as well as its information business.**

## **Distribution Risk**

Scale is the lifeblood of advertising, and Google controls the top of the funnel for information with 13 billion searches a day and 15 apps with between 500 million and 2 billion monthly active users.

**While dominant, the position is also delicate;** Google pays Apple on the order of $20B per year to be the default search engine on Apple devices like iPhones and iPads! *Pure profit for Apple!*

Google must protect its position and brand as the best information source in the generative AI era. **This means reimagining the delivery of information**.

For example, the core web browser user experience hasn’t changed in decades; but what does an agentic Chrome look like? [Perplexity Comet](https://www.perplexity.ai/hub/blog/introducing-comet) paints a great north star:

> **From Answers To Action**
> 
> Comet transforms entire browsing sessions into single, seamless interactions, collapsing complex workflows into fluid conversations.
> 
> With Comet, you don't search for information—you think out loud, and Comet executes complete workflows while keeping perfect context. Research becomes conversation. Analysis becomes natural. Annoying tasks evaporate. The internet becomes an extension of your mind.

**If the primary user experience shifts from opening apps to talking with AI, Google needs to move up that abstraction layer too!** Fast-following is OK.

Google has the talent, AI, and reach to stay the incumbent with information and entertainment. Really, with user attention. And they have the business model.

**My concern is product innovation velocity.** Do they have what it takes to move fast, ship often, and iterate their way to success here? Do they have the sense of urgency? The right org chart to overcome and bureaucratic drag? The right prioritization?

# **Meta is a surprising competitor!**

Facebook and Instagram, like Google, are in the information and entertainment business — and both run on ads. Zuckerberg has been explicit: GenAI is benefitting Meta’s advertising business model too. Meta’s earnings today show they keep crushing it, up 22% YoY.

Behind the paywall, we’ll break down how Meta stacks up against Google and whether GenAI might help it pull audience attention and ad dollars away from the search giant.

[Read more](https://www.chipstrat.com/p/why-genai-is-good-for-google)