---
title: "From Swift to Mojo and high-performance AI Engineering with Chris Lattner"
author: "Gergely Orosz"
publication: "The Pragmatic Engineer"
publication_slug: "pragmaticengineer"
published_at: "2025-11-05T16:02:14.000Z"
source_url: "https://newsletter.pragmaticengineer.com/p/from-swift-to-mojo-and-high-performance"
word_count: 1064
estimated_read_time: 6
---

### Stream the latest episode

**Listen and watch now on [YouTube](https://youtu.be/Fxp3131i1yE), [Spotify](https://open.spotify.com/episode/2NkObxB0ekuZIdXmk4rqcC), and [Apple](https://podcasts.apple.com/us/podcast/from-swift-to-mojo-and-high-performance-ai/id1769051199?i=1000735420118).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

Jump to interesting parts:

-   **[20:28](https://www.youtube.com/watch?v=Fxp3131i1yE&t=1228s)** — The story of how Swift was created
    
-   **[47:28](https://www.youtube.com/watch?v=Fxp3131i1yE&t=2848s)** — Chris’s AI learnings from working at Google and Tesla
    
-   **[52:24](https://www.youtube.com/watch?v=Fxp3131i1yE&t=3144s)** — The Mojo programming language’s origin story (Mojo is new, a high-performance, Python-compatible programming language)
    
-   **[1:19:00](https://www.youtube.com/watch?v=Fxp3131i1yE&t=4740s)** — AI coding tools the Modular team uses (Chris’s current startup)
    

### **Brought to You by**

[

![](https://substackcdn.com/image/fetch/$s_!-41Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47539dec-053b-4a4a-be04-e0c922840fe1_800x70.png)



](https://substackcdn.com/image/fetch/$s_!-41Z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47539dec-053b-4a4a-be04-e0c922840fe1_800x70.png)

•⁠ **[Statsig](http://statsig.com/pragmatic)** ⁠ — ⁠ The unified platform for flags, analytics, experiments, and more. Companies like Graphite, Notion, and Brex rely on Statsig to measure the impact of the pace they ship. Get a 30-day enterprise trial [here](http://statsig.com/pragmatic).

•⁠ **[Linear](https://linear.app/pragmatic?utm_source=gergely&utm_medium=newsletter&utm_campaign=pragmatic-engineer)** – The system for modern product development. Linear is a heavy user of Swift: they just redesigned their native iOS app using their own take on Apple’s Liquid Glass design language. The new app is about speed and performance – just like Linear is. [Check it out](https://linear.app/pragmatic?utm_source=gergely&utm_medium=newsletter&utm_campaign=pragmatic-engineer).

—

### **In this episode**

Chris Lattner is one of the most influential engineers of the past two decades. He created the LLVM compiler infrastructure and the Swift programming language – and Swift opened iOS development to a broader group of engineers. With Mojo, he’s now aiming to do the same for AI, by lowering the barrier to programming AI applications.

I sat down with Chris in San Francisco, to talk language design, lessons on designing Swift and Mojo, and – of course! – compilers. *It’s hard to find someone who is as enthusiastic and knowledgeable about both compilers, and programming, as Chris is!*

We also discussed why experts often resist change even when current tools slow them down, what he learned about AI and hardware from his time across both large and small engineering teams, and why compiler engineering remains one of the best ways to understand how software really works.

### A quote from the episode

> “I believe in the power of programmers. I believe in the human potential of people that want to create things. And that’s fundamentally why I love software is that you can create anything that you can imagine.”

### **Interesting learnings from this episode**

This episode was full of interesting details. Some of my favorite ones:

1.  **“Compiles are cool. Don’t let anyone tell you otherwise.”** My favorite quote from Chris.
    
2.  **Demonstrate business value inside a large company, first!** Apple hired Chris to work on LLVM, because they were frustrated with GCC. However, it took Chris some friendly advice from his manager, and he “got the vibe that, after a year, if Apple’s not using in some product, then they’ll ask to start doing something else.” This realization pushed Chris to find the first team to be the internal customer to LLVM: which was the OpenGL team, where he was able to “do something very small that actually had value.” After this, more teams inside Apple onboarded to LLVM.
    
3.  **Chris built Swift in secret, for more than a year.** For a year and a half, Chris built Swift on nights and weekends, while running a 40+ person (and growing!) team during the day.
    
4.  **Apple leadership was initially not enthusiastic about Swift, at all, initially.** When Chris showed off an early version of Swift to leadership, the response was “why would we want a new language? Objective C is what made the iPhone successful.”
    
5.  **A new programming language for LLMs doesn’t make sense** — according to Chris**.** The readability of a programming language is more important than how easy it is to write it. So in a world with more AI agents writing code, the most powerful languages will be ones that are expressive, and readable. This might be one reason Python remains so popular, and it’s also how Mojo is being designed.
    
6.  **Why Mojo is both so readable, but also so performant:** Mojo took a lot of inspiration from Python for readability, but also added features to make the language be more performant: for example, [compressed floating point formats](http://reducing the precision) (the ability to reduce the precision of floating point numbers, by using types like Float16, and using less memory space and do calculations faster with it), and [metaprogramming](https://www.modular.com/blog/metaprogramming) capabilities like [parameters for compile-time calculations.](https://www.modular.com/blog/metaprogramming)
    
7.  **How Modular hires new grads:** they look for folks who have intellectual curiosity, are fearless in getting things done, and it’s a positive sign if they’ve contributed to open source projects before.
    
8.  **Chris’ success is a lot more work and not listening to others than many would imagine.** LLMV, Clang, Swift and other projects Chris created are used industry-wide: but early on, these projects got little support. As Chris put it: “I don’t expect people to understand me. What usually happens is that these projects over time, they grow and they get to the point where suddenly it clicks and suddenly people start to understand.”
    
9.  **What Chris is the most proud of: helping others create software.** Something Chris still remembers is how, after Swift became widespread, people stopped him on the street, thanking him that they could become iOS developers using this easier to onboard language.
    

### **The Pragmatic Engineer deepdives relevant for this episode**

• [AI Engineering in the real world](https://newsletter.pragmaticengineer.com/p/ai-engineering-in-the-real-world)

• [The AI Engineering stack](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)

• [Uber’s crazy YOLO app rewrite, from the front seat](https://blog.pragmaticengineer.com/uber-app-rewrite-yolo/)

• [Python, Go, Rust, TypeScript and AI with Armin Ronacher](https://newsletter.pragmaticengineer.com/p/python-go-rust-typescript-and-ai)

• [Microsoft’s developer tools roots](https://newsletter.pragmaticengineer.com/p/microsofts-developer-tools-roots)

### **Timestamps**

([00:00](https://www.youtube.com/watch?v=Fxp3131i1yE)) Intro

([02:35](https://www.youtube.com/watch?v=Fxp3131i1yE&t=155s)) Compilers in the early 2000s

([04:48](https://www.youtube.com/watch?v=Fxp3131i1yE&t=288s)) Why Chris built LLVM

([08:24](https://www.youtube.com/watch?v=Fxp3131i1yE&t=504s)) GCC vs. LLVM

([09:47](https://www.youtube.com/watch?v=Fxp3131i1yE&t=587s)) LLVM at Apple

([19:25](https://www.youtube.com/watch?v=Fxp3131i1yE&t=1165s)) How Chris got support to go open source at Apple

([20:28](https://www.youtube.com/watch?v=Fxp3131i1yE&t=1228s)) The story of Swift

([24:32](https://www.youtube.com/watch?v=Fxp3131i1yE&t=1472s)) The process for designing a language

([31:00](https://www.youtube.com/watch?v=Fxp3131i1yE&t=1860s)) Learnings from launching Swift

([35:48](https://www.youtube.com/watch?v=Fxp3131i1yE&t=2148s)) Swift Playgrounds: making coding accessible

([40:23](https://www.youtube.com/watch?v=Fxp3131i1yE&t=2423s)) What Swift solved and the technical debt it created

([47:28](https://www.youtube.com/watch?v=Fxp3131i1yE&t=2848s)) AI learnings from Google and Tesla

([51:23](https://www.youtube.com/watch?v=Fxp3131i1yE&t=3083s)) SiFive: learning about hardware engineering

([52:24](https://www.youtube.com/watch?v=Fxp3131i1yE&t=3144s)) Mojo’s origin story

([57:15](https://www.youtube.com/watch?v=Fxp3131i1yE&t=3435s)) Modular’s bet on a two-level stack

([1:01:49](https://www.youtube.com/watch?v=Fxp3131i1yE&t=3709s)) Compiler shortcomings

([1:09:11](https://www.youtube.com/watch?v=Fxp3131i1yE&t=4151s)) Getting started with Mojo

([1:15:44](https://www.youtube.com/watch?v=Fxp3131i1yE&t=4544s)) How big is Modular, as a company?

([1:19:00](https://www.youtube.com/watch?v=Fxp3131i1yE&t=4740s)) AI coding tools the Modular team uses

([1:22:59](https://www.youtube.com/watch?v=Fxp3131i1yE&t=4979s)) What kind of software engineers Modular hires

([1:25:22](https://www.youtube.com/watch?v=Fxp3131i1yE&t=5122s)) A programming language for LLMs? No thanks

([1:29:06](https://www.youtube.com/watch?v=Fxp3131i1yE&t=5346s)) Why you should study and understand compilers

### **References**

**Where to find Chris Lattner:**

• X: [https://x.com/clattner\_llvm](https://x.com/clattner_llvm)

• LinkedIn: [https://www.linkedin.com/in/chris-lattner-5664498a](https://www.linkedin.com/in/chris-lattner-5664498a)

• Website: [https://nondot.org/sabre](https://nondot.org/sabre)

**Mentions during the episode:**

• LLVM: [https://llvm.org](https://llvm.org)

• Swift: [https://www.swift.org](https://www.swift.org)

• GCC: [https://gcc.gnu.org](https://gcc.gnu.org)

• Linux: [https://www.linux.org](https://www.linux.org)

• Autoconf: [https://en.wikipedia.org/wiki/Autoconf](https://en.wikipedia.org/wiki/Autoconf)

• Python: [https://www.python.org](https://www.python.org)

• Mojo: [https://www.modular.com/mojo](https://www.modular.com/mojo)

• REPL and Debugger: [https://www.swift.org/documentation/lldb/](https://www.swift.org/documentation/lldb/)

• Code Complete with Steve McConnell: [https://newsletter.pragmaticengineer.com/p/code-complete-with-steve-mcconnell](https://newsletter.pragmaticengineer.com/p/code-complete-with-steve-mcconnell)

• *Python: The Documentary*: [https://lwn.net/Articles/1035537/](https://lwn.net/Articles/1035537/)

• CUDA: [https://developer.nvidia.com/cuda-toolkit](https://developer.nvidia.com/cuda-toolkit)

• GPU puzzles: [https://puzzles.modular.com/introduction.html](https://puzzles.modular.com/introduction.html)

• Claude Code: [https://www.claude.com/product/claude-code](https://www.claude.com/product/claude-code)

• Cursor: [https://cursor.com](https://cursor.com)

• Beyond Vibe Coding with Addy Osmani: [https://newsletter.pragmaticengineer.com/p/beyond-vibe-coding-with-addy-osmani](https://newsletter.pragmaticengineer.com/p/beyond-vibe-coding-with-addy-osmani)

• *Beyond Vibe Coding: From Coder to AI-Era Developer*: [https://www.amazon.com/Beyond-Vibe-Coding-AI-Era-Developer/dp/B0F6S5425Y](https://www.amazon.com/Beyond-Vibe-Coding-AI-Era-Developer/dp/B0F6S5425Y)

• Kaleidoscope Tutorial: [https://llvm.org/docs/tutorial/LangImpl01.html](https://llvm.org/docs/tutorial/LangImpl01.html)

• Rust Compiler Development Guide: [https://rustc-dev-guide.rust-lang.org/overview.html#overview-of-the-compiler](https://rustc-dev-guide.rust-lang.org/overview.html#overview-of-the-compiler)

—

Production and marketing by [Pen Name](https://penname.co/).