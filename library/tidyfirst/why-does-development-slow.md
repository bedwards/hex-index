---
title: "Why Does Development Slow?"
author: "Kent Beck"
publication: "Software Design: Tidy First?"
publication_slug: "tidyfirst"
published_at: "2025-11-19T13:12:31.000Z"
source_url: "https://tidyfirst.substack.com/p/why-does-development-slow"
word_count: 843
estimated_read_time: 5
---

Why does software development start out fast, then slow to a crawl? Why does this happen faster when coding with a genie? What can we do about it?

We’re going to play with graphs here for a second. The simplest way to look at our conundrum is to watch the features over time.

[

![Graph showing feature delivery over time as a curve: steep initial rise followed by a gradual plateau.](https://substackcdn.com/image/fetch/$s_!FLYm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1458c2d1-426c-4680-b0cb-5c8687135bd9_1525x728.jpeg "Graph showing feature delivery over time as a curve: steep initial rise followed by a gradual plateau.")



](https://substackcdn.com/image/fetch/$s_!FLYm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1458c2d1-426c-4680-b0cb-5c8687135bd9_1525x728.jpeg)

Rapid progress at first, then stagnation despite our best efforts. Bugs pile up. The build slows. Backwards compatibility imposes its own tax on progress. Original team members move on, while new members take time to acclimate.

What’s to be done? Is this just the price of progress?

Let’s take the first derivative of features, feature *progress* over time.

[

![Graph showing feature delivery rate over time: a sharp initial spike followed by a dramatic drop to a flat, slow pace.](https://substackcdn.com/image/fetch/$s_!0M3N!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff219ac74-7f44-42be-a24a-83713abe140e_1798x907.jpeg "Graph showing feature delivery rate over time: a sharp initial spike followed by a dramatic drop to a flat, slow pace.")



](https://substackcdn.com/image/fetch/$s_!0M3N!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff219ac74-7f44-42be-a24a-83713abe140e_1798x907.jpeg)

Starts out gangbusters, then devolves to occasional bursts of productivity. We’re no closer to a diagnosis or a treatment. We just know that coding with a genie compresses time.

## Scatterplot

> The typical time series plot fails to generate understanding because it implies that the only source of change in the response is the unrelenting, impassionate drumbeat of time. Show cause. Show effect. — reader of [Edward Tufte](https://www.edwardtufte.com/notebook/how-can-information-in-4-dimensions-be-pictured-using-2-dimensional-diagrams/)’s site.

Edward Tufte in [Visual Display of Quantitative Information](https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/) laments that most graphics are time series. If you want to understand the relationship between two variables, you need to plot them with each other, not just as part of the same timeline.

We want to understand feature development, so that needs to be one of the axes. I’m going to put it on the horizontal axis, for reasons that will become apparent (I tried it every which way before settling on this—I’m giving you the abridged version).

[

![Empty graph with the horizontal axis labelled "Features"](https://substackcdn.com/image/fetch/$s_!qqvW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa74cd83c-1a05-40a0-964a-ec7f44bf773e_1805x936.jpeg "Empty graph with the horizontal axis labelled "Features"")



](https://substackcdn.com/image/fetch/$s_!qqvW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa74cd83c-1a05-40a0-964a-ec7f44bf773e_1805x936.jpeg)

If all we’re looking at is feature progress, we expect progress to be spread apart (fast) at first, then bunch up as time passes.

[

![Progress on the horizontal axis, big jumps at first then smaller and smaller](https://substackcdn.com/image/fetch/$s_!ogwl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a4a9856-2d59-4090-b328-b04cf664d80c_1587x790.jpeg "Progress on the horizontal axis, big jumps at first then smaller and smaller")



](https://substackcdn.com/image/fetch/$s_!ogwl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a4a9856-2d59-4090-b328-b04cf664d80c_1587x790.jpeg)

But what goes on the vertical axis?

[

![A question mark on the vertical axis](https://substackcdn.com/image/fetch/$s_!F0kI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa86e227b-3dad-4af3-8fec-b2c49500e882_1554x848.jpeg "A question mark on the vertical axis")



](https://substackcdn.com/image/fetch/$s_!F0kI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa86e227b-3dad-4af3-8fec-b2c49500e882_1554x848.jpeg)

## Options

No big surprise here, my fellow Tidiers. We know that software embeds economic value 2 ways:

-   Cash flow from current features
    
-   Optionality for future features
    

Let’s see how this plays out. We start out with no features & lots of options:

[

![Graph with 'OPTIONS' on the y-axis and 'FEATURES' on the x-axis. First data point is high on options and zero on features](https://substackcdn.com/image/fetch/$s_!jp1v!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa81b9601-8619-4fdd-b21a-cc4d11ac707d_2339x1137.jpeg "Graph with 'OPTIONS' on the y-axis and 'FEATURES' on the x-axis. First data point is high on options and zero on features")



](https://substackcdn.com/image/fetch/$s_!jp1v!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa81b9601-8619-4fdd-b21a-cc4d11ac707d_2339x1137.jpeg)

The first feature we develop goes pretty far but inevitably it burns options.

[

![First feature is a big jump but diminishes options](https://substackcdn.com/image/fetch/$s_!wZCl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0484600c-e847-48cf-8da7-e5a4e25893b7_2272x1182.jpeg "First feature is a big jump but diminishes options")



](https://substackcdn.com/image/fetch/$s_!wZCl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0484600c-e847-48cf-8da7-e5a4e25893b7_2272x1182.jpeg)

The code is now more complicated, we have to either preserve backwards compatibility or tear out the feature before proceeding.

(I hear the “why not make it better on both axes at once?” crowd. Make it run *then* make it right. My brain isn’t big enough to do a good job of both at once. Not even my augmented brain.)

Okay, so we have one feature. We want more! Features feel good! Features make customers feel good!

[

![Second feature on the graph is a smaller jump on features and a bigger drop in options](https://substackcdn.com/image/fetch/$s_!3gT1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9ce1c6ec-50f2-41e5-92da-d6dfde365f3b_1791x1103.jpeg "Second feature on the graph is a smaller jump on features and a bigger drop in options")



](https://substackcdn.com/image/fetch/$s_!3gT1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9ce1c6ec-50f2-41e5-92da-d6dfde365f3b_1791x1103.jpeg)

It wasn’t *much* harder than that first feature. What’s that you say? More features & then more features? You got it!

[

![After 5 features, feature progress has slowed and options are exhausted](https://substackcdn.com/image/fetch/$s_!ke3e!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6537349-4357-4c2f-8f71-7d8bdacb545b_2081x1062.jpeg "After 5 features, feature progress has slowed and options are exhausted")



](https://substackcdn.com/image/fetch/$s_!ke3e!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6537349-4357-4c2f-8f71-7d8bdacb545b_2081x1062.jpeg)

You got it right until you don’t. If you look at my [GitHub repos](https://github.com/KentBeck?tab=repositories) you’ll see BPlusTree, BPlusTree2, BPlusTree3, etc. In each case the genie & I drove the project out of options & had to start over. Somehow, though, I don’t learn my lesson. I don’t name the first project BPlusTree1—this time will be different!

## Exhale Then Inhale

What’s the alternative? We can’t improve both axes at once. We can’t escape burning some options with each feature. The first feature is the same.

[

![In green the first feature follows the trajectory of the previous first feature.](https://substackcdn.com/image/fetch/$s_!-LRC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6671d790-8b49-4a66-80f4-6a267dc9f525_2129x1074.jpeg "In green the first feature follows the trajectory of the previous first feature.")



](https://substackcdn.com/image/fetch/$s_!-LRC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6671d790-8b49-4a66-80f4-6a267dc9f525_2129x1074.jpeg)

We *do* have a choice when we’ve finished that first feature, though. There is a space between features, should we choose to perceive it. In that space we can choose to invest in restoring & enhancing optionality.

[

![When the first feature is done there is a vertical movement up--no features but more options.](https://substackcdn.com/image/fetch/$s_!vZzl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe569e69c-aed8-46cb-a702-6c577ec4371a_2344x1306.jpeg "When the first feature is done there is a vertical movement up--no features but more options.")



](https://substackcdn.com/image/fetch/$s_!vZzl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe569e69c-aed8-46cb-a702-6c577ec4371a_2344x1306.jpeg)

Tidying first is one way to perceive this gap between features. What’s the next feature we are implementing? What about our current mess makes that harder? What can we tidy to make it easier? If implementing the feature is easier, then the option of implementing it becomes more attractive.

We can, should we so choose, continue this rhythm—feature, options, feature, options.

[

![And a zig zag--feature with fewer options, then vertically up to more options, and back and forth.](https://substackcdn.com/image/fetch/$s_!HjXK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F125242bf-25c5-4da7-8d52-fb2e6d9c8650_2201x1425.jpeg "And a zig zag--feature with fewer options, then vertically up to more options, and back and forth.")



](https://substackcdn.com/image/fetch/$s_!HjXK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F125242bf-25c5-4da7-8d52-fb2e6d9c8650_2201x1425.jpeg)

## And Next…

That’s all I have time for today. I’ll use this same “Options Lead To Features” graph to describe a variety of problematic situations in development, augmented & not.

> Thank you to Gene Kim for a long series of Tokyo breakfast conversations (long story) that helped refine this diagram.

\---

*Today’s post is sponsored by [CodeRabbit](https://coderabbit.link/kent-beck).* Boost your team’s code quality and shipping speed with CodeRabbit—the most advanced AI code review tool built for engineers. CodeRabbit delivers context-aware, line-by-line reviews, instant one-click fixes, and concise PR summaries, integrating right into your GitHub workflow so you spend less time diff diving and more time building.​

## What Makes CodeRabbit Different?

-   CodeRabbit provides AI-powered reviews that adapt to your team’s standards, enforcing style, spotting bugs and edge cases, and mapping out code dependencies automatically.​
    
-   With multi-language support and over 40 linters and static analysis tools, it keeps your code clean, secure, and maintainable—no matter how complex your stack.​
    
-   Real examples show dramatic impact: SalesRabbit cut bugs by 30% and boosted engineering velocity by 25% simply by adding CodeRabbit to all deploys.​
    
-   Engineered to help junior and experienced devs alike, CodeRabbit catches issues even seasoned reviewers might miss, and its built-in documentation and reporting keep everyone informed and aligned.​
    

## Ready to optimize your engineering workflow?

Join thousands of developers who’ve halved code review time and defect rates with CodeRabbit. Start your 14-day free trial and experience seamless AI reviews, actionable feedback, and effortless codebase learning.​