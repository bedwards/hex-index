---
title: "ChatGPT apps are about to be the next big distribution channel: Here’s how to build one"
author: "Lenny Rachitsky"
publication: "Lenny's Newsletter"
publication_slug: "lennysnewsletter"
published_at: "2026-01-20T13:45:31.000Z"
source_url: "https://www.lennysnewsletter.com/p/chatgpt-apps-are-about-to-be-the"
word_count: 2286
estimated_read_time: 12
---

*👋 Hey there, I’m Lenny. Each week, I tackle reader questions about building product, driving growth, and accelerating your career. For more: **[Lennybot](https://www.lennybot.com/) | [Lenny’s Podcast](https://www.lennysnewsletter.com/podcast) |** **[How I AI](https://www.youtube.com/@howiaipodcast)** **| [Lenny’s Reads](https://www.lennysnewsletter.com/s/lennys-reads)** | **[Favorite AI and PM courses](https://maven.com/lenny) | [Favorite communication course](https://ultraspeaking.com/lennyslist?via=lenny)***

*Subscribers get **19 premium products for free for one year**: [Lovable, Replit, Gamma, n8n, Bolt, Devin, Wispr Flow, Descript, Linear, PostHog, Superhuman, Granola, Warp, Perplexity, Raycast, Magic Patterns, Mobbin, ChatPRD, and Stripe Atlas](https://www.lennysnewsletter.com/p/productpass) ([terms apply](https://www.lennysnewsletter.com/i/168890236/important-offer-details-read-before-subscribing)). **[Subscribe now](https://www.lennysnewsletter.com/subscribe?).***

\---

My many-time collaborator—and author of my 2nd *and* 12th most popular posts of all time—is back, and it’s a banger. If you’re looking for alpha in growing your product, this post is for you. I’ll keep my intro short and get you right into the post.

*For more from Colin, find him on [LinkedIn](https://www.linkedin.com/in/colinmatthews-pm/), check out his killer [course](https://bit.ly/4jNkQ33) (get 15% off using that link!), and join [this free Lightning Lesson](https://maven.com/p/c4d1fc/learn-to-build-chat-gpt-apps) on January 30th to get a hands-on, live look at building your first ChatGPT app.*

*P.S. You can listen to this post in convenient podcast form: [Spotify](https://open.spotify.com/show/0IIunA06qMtrcQLfypTooj) / [Apple](https://podcasts.apple.com/us/podcast/lennys-reads/id1810314693) / [YouTube](https://www.youtube.com/@lennysreads).*

\---

[

![](https://substackcdn.com/image/fetch/$s_!RcgV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93f0f795-1229-4c5e-96a5-fb007be56ec3_1456x970.png)



](https://substackcdn.com/image/fetch/$s_!RcgV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93f0f795-1229-4c5e-96a5-fb007be56ec3_1456x970.png)

A few months ago, if you asked ChatGPT to help you book a flight to Paris, you’d get a helpful list of recommendations: airline breakdowns, price ranges, maybe some tips on timing. Then you’d leave ChatGPT, open a travel site, and start your search from scratch.

Now you can say, “Help me find a good flight to Paris from Toronto,” and an interactive widget appears directly inside your conversation. You browse flight options, compare prices, and book, all without ever leaving the chat.

[

![](https://substackcdn.com/image/fetch/$s_!RxOg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae5319a9-4632-4ec7-a5a3-d2af30b33848_810x540.gif)



](https://substackcdn.com/image/fetch/$s_!RxOg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae5319a9-4632-4ec7-a5a3-d2af30b33848_810x540.gif)

The strategy is simple: instead of ChatGPT responding with text and sending the user elsewhere, it will now surface interactive widgets from third-party apps directly in a conversation, letting users transact inside of ChatGPT (and over time, OpenAI will likely take a small percentage of the transaction).

Launched in [October at Dev Day](https://openai.com/index/introducing-apps-in-chatgpt/), partners for ChatGPT’s apps already include large companies like Adobe, DoorDash, Canva, Figma, Booking.com, Coursera, Expedia, Spotify, and Zillow. Some of the biggest companies in the world are betting that chat will become a primary interface for their products.

**ChatGPT apps represent a rare distribution opportunity, the kind that comes around once or twice a decade.** The last comparable moments were the App Store in 2008, the rise of SEO in the early 2000s, and maybe Shopify’s app ecosystem. When a new distribution channel opens up at scale, the companies that move early capture habits that are hard to break later. This creates opportunity at both ends of the spectrum. For enterprises, ChatGPT apps are a new distribution channel alongside your existing ones. For solopreneurs, this is a chance to build microapps and get distribution without a marketing budget. The barrier to entry is low (a few weeks to build a simple app), but the reach is enormous.

In this post, I’ll break down how users find and use your apps, how these apps work behind the scenes, and how to create your own first ChatGPT app. Let’s build.

## How users find and use ChatGPT apps

ChatGPT apps introduce interaction patterns that differ from traditional app stores. In most app stores, you have to find the app, install it, and only then you can use it. ChatGPT does support this pattern, but the more interesting pattern is contextual surfacing. In the near future (and something most people don’t fully grasp), ChatGPT *will automatically suggest apps based on a user’s conversation*. Ask about travel plans, and Expedia appears. Mention that you need a design, and Canva surfaces. Ask about ordering groceries, and an Instacart cart shows up. A user doesn’t need to know what apps are available; the model matches their intent to relevant tools. This has the potential to be a new and massive growth channel for products.

ChatGPT apps can appear in three formats, and as an app builder it’s important for you to consider which format would match the type of app experience you want to create for the user. I’ll say more about this in a bit, but each type leverages the Model Context Protocol (MCP) to deliver your app to ChatGPT.

**Inline mode** embeds cards and lists directly in the conversation flow. This is the default, and it works well for product listings, search results, or any content that fits naturally alongside ChatGPT’s responses. Here’s a quick example of hotel listings from Expedia:

[

![](https://substackcdn.com/image/fetch/$s_!tS9u!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e4bfc7f-80b7-4088-849c-67d394f2f5fb_930x540.png)



](https://substackcdn.com/image/fetch/$s_!tS9u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9e4bfc7f-80b7-4088-849c-67d394f2f5fb_930x540.png)

**Fullscreen mode** takes over the entire screen. This is best for maps, dashboards, or complex workflows that need more space. When a user is browsing AllTrails on a map or editing a design in Canva, full screen gives them room to work.

[

![](https://substackcdn.com/image/fetch/$s_!l9P1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77ea48e9-2f0a-4794-89a2-4a8f3f7e7e03_1116x650.png)



](https://substackcdn.com/image/fetch/$s_!l9P1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77ea48e9-2f0a-4794-89a2-4a8f3f7e7e03_1116x650.png)

**Picture-in-picture mode** keeps a small floating window visible while the user chats. This is ideal for music players, timers, or anything a user might want to keep running in the background while they work on something else. Here, Coursera is playing a video while I continue chatting.

[

![](https://substackcdn.com/image/fetch/$s_!IuHk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8373fdcd-589f-4119-9ea5-7d37d1ab7da0_906x530.png)



](https://substackcdn.com/image/fetch/$s_!IuHk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8373fdcd-589f-4119-9ea5-7d37d1ab7da0_906x530.png)

There’s one important constraint to understand: one widget per message. If the user says, “Book a restaurant and order an Uber,” ChatGPT can show only one app at a time. This means users work sequentially through multi-step tasks rather than in parallel.

## How it works behind the scenes

When you’re preparing to build a ChatGPT app, it’s important to first understand the architecture.

Every ChatGPT app has three parts:

1.  **The conversation within ChatGPT:** The model interprets the user’s request and decides whether an app would be helpful.
    
2.  **The app’s “tools”:** A backend server and API tells ChatGPT what the app can do.
    
3.  **The user-facing widget:** This appears in the user’s chat, built with web technologies (typically React) and runs in a secure sandbox inside ChatGPT.
    

[

![](https://substackcdn.com/image/fetch/$s_!bYfU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb32ce10-ffa6-47ee-ae89-acc71bad2656_1600x873.png)



](https://substackcdn.com/image/fetch/$s_!bYfU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb32ce10-ffa6-47ee-ae89-acc71bad2656_1600x873.png)

Let’s dig into #2, the app’s tools, because that’s the core of how this works. A tool is just a function that ChatGPT can call. When you build an app, you define tools, like search\_restaurants, book\_ticket, or create\_playlist. Each tool has a name and description that helps ChatGPT understand when to use it and what parameters it accepts. When a user says something relevant, ChatGPT reads these descriptions and decides which tool to call.

Here’s the flow: The user says, “Find me Italian restaurants in Brooklyn.” ChatGPT looks at the available tools, sees one called search\_restaurants with a description like “Search for restaurants by location and cuisine” and calls it with {location: “Brooklyn”, cuisine: “Italian”}. Your server runs the search, returns the results, and can optionally include a widget to display them. ChatGPT renders the widget in the chat with the user.

[

![](https://substackcdn.com/image/fetch/$s_!cQA5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1c8d119-a8ae-4ce3-867f-3208606ec387_1600x855.png)



](https://substackcdn.com/image/fetch/$s_!cQA5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1c8d119-a8ae-4ce3-867f-3208606ec387_1600x855.png)

The user interacts with the widget—say, by clicking on a restaurant to reserve it. That click can trigger a follow-up tool call. Your widget then sends a message back to ChatGPT saying, “User selected restaurant\_id: 1241,” and ChatGPT can call another tool, like book\_reservation(), to save their reservation. The conversation continues, with the widget and the AI working together.

[

![](https://substackcdn.com/image/fetch/$s_!1iJ3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F750d848b-2ec2-4b8b-bed1-1016015350ef_1024x454.png)



](https://substackcdn.com/image/fetch/$s_!1iJ3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F750d848b-2ec2-4b8b-bed1-1016015350ef_1024x454.png)

This creates a loop: user says something to ChatGPT → ChatGPT calls a tool → widget renders → user interacts with widget → ChatGPT calls another tool. The key insight is that ChatGPT orchestrates the whole thing. It decides when to call tools, what parameters to pass, and how to respond to user actions. Your app just exposes capabilities and renders UI.

MCP is the infrastructure connecting all of this. MCP is very similar to APIs (I covered those [here](https://www.lennysnewsletter.com/p/become-a-more-technical-product-manager)), but rebuilt for AI agents. It provides a universal way to connect apps to AI assistants. Anthropic created MCP in November 2024, and OpenAI adopted it across ChatGPT and their developer tools in March 2025. In November, both companies announced they’re collaborating on [MCP Apps](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/), a standardized way to add interactive UIs to the protocol.

[

![](https://substackcdn.com/image/fetch/$s_!RWld!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3526aa76-8f17-421d-9126-93331bbbad4c_1231x868.png)



](https://substackcdn.com/image/fetch/$s_!RWld!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3526aa76-8f17-421d-9126-93331bbbad4c_1231x868.png)

If you’ve heard of AI agents, this might sound familiar. ChatGPT apps and AI agents share the same core pattern: an AI model that can call external tools to accomplish tasks. The difference is who’s running the show. When you build your own AI agent, you control everything—the model, the prompts, the orchestration logic, the error handling. You decide when tools get called and how results are processed.

**As you may have been thinking as you read this, tools also represent a new form of SEO (or is it AEO?).** Based on your tool’s name and description, ChatGPT can suggest your app to users to help solve their needs, like creating a slide deck or generating a financial model. Having accurate tool descriptions that uniquely identify your app will help ChatGPT users find and use your app in the correct contexts.

## Building your first ChatGPT app

Now that you understand the basic structure, you can have an app built in 30 minutes or less by following this guide.

### Option 1: Replit

The Replit agent is not an expert on ChatGPT apps, so the easiest way to get started in Replit is to import an existing app. I’d recommend the official examples from OpenAI. To save some time, I created a Replit project you can duplicate with all of the following steps completed, [here](https://replit.com/@ColinMatthews2/openai-apps-sdk-examples). I’d highly recommend using my project; it will likely save you at least 30 minutes.

If you’d prefer to start from scratch, head to Replit, select “Import from GitHub,” and paste in this URL: [https://github.com/openai/openai-apps-sdk-examples](https://github.com/openai/openai-apps-sdk-examples)

[

![](https://substackcdn.com/image/fetch/$s_!zj1U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F85f77a04-d4b0-4f5c-a096-bf3f74d89498_1600x1129.png)



](https://substackcdn.com/image/fetch/$s_!zj1U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F85f77a04-d4b0-4f5c-a096-bf3f74d89498_1600x1129.png)

The Replit agent will then do some work to set up your project—it should take 5 to 10 minutes.

Once you have the project running, you should prompt the following:

> `I want to connect ChatGPT to my MCP server. Please set this up:`
> 
> `Bundle the React UI widgets - The project uses Vite to build React components into standalone widget bundles. Run pnpm run build with BASE_URL set to the full Replit domain URL. Each widget (in src/*/index.tsx) gets bundled into HTML/JS/CSS files in the /assets folder. The absolute URLs are critical because ChatGPT loads widgets in a sandbox that needs to fetch assets from my Replit server.`
> 
> `Static asset server on port 5000 - Serve the /assets folder with CORS enabled. Map to external port 80.`
> 
> `MCP server on port 8000 - Bind to 0.0.0.0:8000 for external access. Forward as port 8000.`
> 
> `Allow all hosts - Both servers must accept connections from any origin.`
> 
> `Give me the MCP endpoint URL for ChatGPT Settings > Connectors.`

You may see a screen that appears to be an error, like the screenshot below. Replit is not built to preview MCP tools, so you’ll only be able to see the UI components once you’re connected to ChatGPT. Allow Replit to continue working until it has set up the MCP server correctly.

[

![](https://substackcdn.com/image/fetch/$s_!k53a!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3750e2ab-50a5-4d2e-a091-49ff278e3ce7_1600x952.png)



](https://substackcdn.com/image/fetch/$s_!k53a!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3750e2ab-50a5-4d2e-a091-49ff278e3ce7_1600x952.png)

Eventually the Replit agent should tell you it’s ready. Common issues include misconfiguring ports and not being able to serve static assets, so follow up on these as needed. When ready (or if you copied my project), you should be presented with a screen like this:

[

![](https://substackcdn.com/image/fetch/$s_!IbcF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcacede9a-a081-4d9c-89dd-acd725df997f_1600x1039.png)



](https://substackcdn.com/image/fetch/$s_!IbcF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcacede9a-a081-4d9c-89dd-acd725df997f_1600x1039.png)

We’re now ready to connect to ChatGPT. Ask the agent, *“What is the external MCP URL for this app?”* This should provide a URL like https://b3c4d0a4-6bdc-4926-b55e-5f94c6246e1e-00-1uvko22a6cltw.spock.replit.dev:8000/mcp.

To connect to ChatGPT, you will first need to enable [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) on your ChatGPT account. From there, you can navigate to Settings -> Apps & Connectors -> New App. Paste your URL in this modal with a name (e.g. Replit App).

[

![](https://substackcdn.com/image/fetch/$s_!-Rp6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6003a5d2-c6cf-4c55-b805-d544512babd7_1342x1562.png)



](https://substackcdn.com/image/fetch/$s_!-Rp6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6003a5d2-c6cf-4c55-b805-d544512babd7_1342x1562.png)

Once connected, you should be able to invoke the app by name:

[

![](https://substackcdn.com/image/fetch/$s_!0bek!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d2915ad-256e-4f95-bd00-d2936d029a39_810x484.gif)



](https://substackcdn.com/image/fetch/$s_!0bek!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d2915ad-256e-4f95-bd00-d2936d029a39_810x484.gif)

### Option 2: Chippy

Most vibe-coding tools aren’t built to help you understand MCP and ChatGPT apps. They’re great at building web apps, but they can’t create an MCP server, preview your tools, or help you connect to ChatGPT.

That’s why I decided to build one myself—[Chippy](http://chippy.build). Chippy is an AI agent that specializes in prototyping ChatGPT apps. You can test your app with the built-in chat, connect to ChatGPT without worrying about deployment, and even generate a spec directly from your prototype. And you can spin up your first app completely free.

In this example, I’ll build an app that lets users search [Maven Lightning Lessons](https://maven.com/lightning-lessons) (free 30-minute talks from experts on AI, product, and design).

The core features are:

-   Find me a relevant Lightning Lesson based on some topic
    
-   Display the recording of the lesson inline in my ChatGPT thread
    
-   Move the display to picture-in-picture mode to continue interacting with ChatGPT while the Maven video plays
    

To start, I’ll head to [Chippy.build](http://chippy.build) and ask Chippy to help me plan this project. Chippy suggests a single tool called find\_lightning\_lesson that takes a topic as input. It will then show an inline card to start, with an option to change to picture-in-picture.

[

![](https://substackcdn.com/image/fetch/$s_!mBQs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6bd38452-251b-4272-b32e-85a3803be658_1600x948.png)



](https://substackcdn.com/image/fetch/$s_!mBQs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6bd38452-251b-4272-b32e-85a3803be658_1600x948.png)

From here, we just need to tell Chippy to implement. We can then get a preview of our app and test how it will work inside a chat environment.

[

![](https://substackcdn.com/image/fetch/$s_!hR4i!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fec90f81f-5500-4501-bed4-60d2ca167ffe_810x476.gif)



](https://substackcdn.com/image/fetch/$s_!hR4i!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fec90f81f-5500-4501-bed4-60d2ca167ffe_810x476.gif)

We now have a functional ChatGPT app ready to test. Before we continue, grab your app link with “Test” in the top right corner

To connect to ChatGPT, you will first need to enable [Developer Mode](https://platform.openai.com/docs/guides/developer-mode) on your ChatGPT account. From there, you can navigate to Settings -> Apps & Connectors -> New App.

[

![](https://substackcdn.com/image/fetch/$s_!SvhK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23f12aea-f508-462b-868e-70ddbcc8626f_441x663.png)



](https://substackcdn.com/image/fetch/$s_!SvhK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23f12aea-f508-462b-868e-70ddbcc8626f_441x663.png)

Add a Name, MCP Server URL, and set Authentication to No auth. Once you click Create, you’ve successfully made your first ChatGPT app!

The most reliable way to test your app is to mention it by name or tag it in your own chat. Below you can see that ChatGPT automatically tags your app if you mention it by name.

[

![](https://substackcdn.com/image/fetch/$s_!bouM!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dc1270e-dcb5-4c37-a6bd-ee6861316058_810x545.gif)



](https://substackcdn.com/image/fetch/$s_!bouM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dc1270e-dcb5-4c37-a6bd-ee6861316058_810x545.gif)

Once you have a functional app, you can continue to iterate and begin to build a golden set of prompts to trigger your app. You may want to add authentication, fetch real data out of your product, or build apps that use multiple tools together.

ChatGPT apps don’t have to be as simple as showing a video or displaying a card. You can build full, complex applications directly into ChatGPT. Here’s a quick example of a dungeon explorer game I built with Chippy. You can see that ChatGPT has context on my current level, information about the game, and can give me tips on improving my score.

[

![](https://substackcdn.com/image/fetch/$s_!E-VB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30e22cb9-c057-417f-9f87-05f38073f980_810x484.gif)



](https://substackcdn.com/image/fetch/$s_!E-VB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30e22cb9-c057-417f-9f87-05f38073f980_810x484.gif)

## The growth opportunity in front of you right now

[Read more](https://www.lennysnewsletter.com/p/chatgpt-apps-are-about-to-be-the)