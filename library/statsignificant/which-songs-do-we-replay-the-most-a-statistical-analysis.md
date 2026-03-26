---
title: "Which Songs Do We Replay the Most? A Statistical Analysis"
author: "Daniel Parris"
publication: ""
publication_slug: "statsignificant"
published_at: "2025-12-03T14:15:44.000Z"
source_url: "https://www.statsignificant.com/p/which-songs-do-we-replay-the-most"
word_count: 1964
estimated_read_time: 10
---

[

![](https://substackcdn.com/image/fetch/$s_!G32D!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fde496b1b-3a49-4ac6-bab3-1a170903ca59_1201x675.jpeg)



](https://substackcdn.com/image/fetch/$s_!G32D!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fde496b1b-3a49-4ac6-bab3-1a170903ca59_1201x675.jpeg)
*Kpop Demon Hunters (2025). Credit: Netflix.*

# Intro: Too “Smooth”

To listen to the radio in the early 2000s was to hear the song “Smooth,” a Latin pop-rock juggernaut by Carlos Santana and Rob Thomas that features the most recognizable guitar riff in modern music. The song’s overwhelming ubiquity has given it multiple lives: first as an unavoidable earworm, then as an overplayed annoyance, and finally as a nostalgia-driven meme.

Released in 1999, “Smooth” was a radio sensation, spending 12 consecutive weeks at No. 1 on the Billboard charts, a feat never achieved by The Beatles, Michael Jackson, or The Rolling Stones. I distinctly remember hearing a promo for the very radio station I was listening to that featured “Smooth,” immediately followed by the song itself, as if to say, “We’re a radio station that plays ‘Smooth,’ and here you go.”

The track remained a longstanding staple of mainstream culture and later became an ironic internet fascination for millennials. In 2013, *The Onion* lampooned the song’s inescapability with the headline: “*[Smooth](https://theonion.com/santana-and-rob-thomas-smooth-sweeps-grammy-awards-for-1819595412/)* [Sweeps the Grammys for the 13th Year in a Row](https://theonion.com/santana-and-rob-thomas-smooth-sweeps-grammy-awards-for-1819595412/).” A few years earlier, Billboard ranked “Smooth” as [the second most popular song in the history of the Hot 100—topped only by “The Twist.”](https://www.npr.org/2008/09/12/94547217/billboards-all-time-hot-100-proves-that-we-are-all-guilty)

And then things got weird. In 2016, a picture of a fan-made T-shirt saluting the track was posted on Twitter and was later retweeted by Rob Thomas.

[

![](https://substackcdn.com/image/fetch/$s_!0BNM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa00f2422-e242-4735-951f-28e10cc2ff0c_747x682.jpeg)



](https://substackcdn.com/image/fetch/$s_!0BNM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa00f2422-e242-4735-951f-28e10cc2ff0c_747x682.jpeg)
*Credit: [Cori Healey/Twitter](https://x.com/corihealey/status/758085793361514496)*

Suddenly, a 15-year-old song was back in the zeitgeist, as the internet rediscovered and ironically celebrated its former ubiquity.

[

![](https://substackcdn.com/image/fetch/$s_!Qe2C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F560bd9c7-e0bb-4971-9d6b-5e7e9d285040_480x240.webp)



](https://substackcdn.com/image/fetch/$s_!Qe2C!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F560bd9c7-e0bb-4971-9d6b-5e7e9d285040_480x240.webp)
*A meme parodying Obama’s summer playlists. Source: [BuzzFeed](https://www.buzzfeed.com/mjkiebus/spanish-harlem-mona-lisa).*

[

![](https://substackcdn.com/image/fetch/$s_!CITn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5af0f4db-b133-485b-87d3-48c960f95335_281x179.jpeg)



](https://substackcdn.com/image/fetch/$s_!CITn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5af0f4db-b133-485b-87d3-48c960f95335_281x179.jpeg)
*A 2016 “Smooth” meme. Source: [BuzzFeed](https://www.buzzfeed.com/mjkiebus/spanish-harlem-mona-lisa).*

What fascinates me most about this “Smooth”-centric discourse was its meta quality: people were celebrating the song for having once been so universally celebrated. “Smooth” is one of many monolithic tracks binge-played to the point of meme-ification, alongside hits like “Wonderwall,” “The Dog Days are Over,” and “Ho Hey.”

Unlike film and TV, a single piece of music can be consumed multiple times in a concentrated period, with this repetition often enhancing its effect. This binge behavior raises a question central to today’s analysis: *What dictates a song’s repeatability?* Is there a quantifiable trend to the way music is repeatedly consumed (and later disposed)?

So today, we’ll explore the most repeat-worthy songs, how this behavior coincides with listener age, and how our relationship with binge-listening evolves as our cultural appetite shifts.

\---

##### ***Today’s newsletter is sponsored by [Lerner Python: Data Analytics Coaching](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd)***

# Sharpen Your Data Skills With Real-World Practice

[

![](https://substackcdn.com/image/fetch/$s_!Szpf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d8b80d8-45e8-493a-a8d5-f0933ee301e1_282x200.png)



](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd)

Love Stat Significant’s data deep dives? Build those same analytics skills with weekly practice and expert guidance. Lerner Python provides [hands-on mentorship using messy, real-world datasets](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd) from entertainment, economics, sports, and more.

Your immersive Lerner experience includes:

-   **Weekly analysis challenges** drawn from actual datasets
    
-   **Access to 50+ courses** covering Python, SQL, and data scraping
    
-   **Private lectures and live office hours** to keep advancing your skills
    

#### [Use code](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd) **[STATSIG20](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd)** [to get 20% off the “LernerPython + Data” annual subscription](https://www.vpdae.com/redirect/q4wb6md7ktjaumonnugi6jokfzd)

\---

# Which Songs Do We Replay the Most?

For this analysis, we’ll use anonymized Spotify track-play data provided by [ListenBrainz](https://listenbrainz.org/), an open-source repository. The dataset captures individual listening behavior for a single week in October 2025, offering a focused snapshot of how people use the streaming service.

When we pull the most replayed songs from this period, the list is dominated by Taylor Swift and a handful of musicians I’ve never heard of (an admission that makes for subpar journalism).

[

![](https://substackcdn.com/image/fetch/$s_!W8aG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee73f805-406a-471b-9c7c-b707e675b2bd_1628x1394.png)



](https://substackcdn.com/image/fetch/$s_!W8aG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee73f805-406a-471b-9c7c-b707e675b2bd_1628x1394.png)

It took me twenty minutes to realize our track-play dataset coincides with Taylor Swift’s latest album release—a delay that made me feel extremely out of touch.

After Googling the other non-Swift tracks, the pattern became even more apparent: *the most repeatedly played songs are simply the newest ones*. I can’t tell if this insight is exceedingly obvious or exceedingly profound. I reran the analysis using different timeframes and datasets, but the takeaway remained consistent—the most bingeable tracks are those released within one to two weeks of our measurement period.

I genuinely expected the answer to be “Tiny Dancer,” and assumed the entire analysis would just confirm that “Tiny Dancer” is, in fact, a really good song. Instead, the data nudged me toward a different set of questions: if new music overwhelmingly dominates repeat listening, then what does the typical track-consumption lifecycle look like? How do we binge a song relentlessly, and then, presumably, abandon it weeks later?

To investigate this phenomenon, I analyzed listenership for Taylor Swift’s *Life of a Showgirl* over its first two months, estimating how streams per Swift-listener changed over time. Ultimately, I found these songs saw increased repetition for their first three weeks before settling into a steady state.

[

![](https://substackcdn.com/image/fetch/$s_!CyB-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14428f4c-bfce-443f-b0e6-6bef35be7778_1708x1268.png)



](https://substackcdn.com/image/fetch/$s_!CyB-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14428f4c-bfce-443f-b0e6-6bef35be7778_1708x1268.png)

When we zoom out to our full Spotify dataset, we see the same trend: most songs experience a surge in repeat plays during their first year, then reach a stable baseline.

[

![](https://substackcdn.com/image/fetch/$s_!fCwv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1334de5-17c5-41d2-9a85-1024aa54ca86_1600x1256.png)



](https://substackcdn.com/image/fetch/$s_!fCwv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1334de5-17c5-41d2-9a85-1024aa54ca86_1600x1256.png)

This pattern got me thinking of an earlier analysis on [when we stop discovering new music](https://www.statsignificant.com/p/when-do-we-stop-finding-new-music)—particularly which listener demographics engage with newer releases.

In a 2014 study of Spotify user data, researchers explored how [tastes deviate from the mainstream with age](https://skynetandebert.com/2015/04/22/music-was-better-back-then-when-do-we-stop-keeping-up-with-popular-music/). In this analysis, a contemporary pop star like Dua Lipa would score a 1 (the most popular), while an artist further outside the zeitgeist, like Led Zeppelin, would rank somewhere in the 200s. The resulting visual is unnerving as we observe our cultural preferences (quite literally) spiral out of the mainstream with age.

[

![](https://substackcdn.com/image/fetch/$s_!wz4m!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e562f7f-d7cf-430e-8151-0e05d44611eb_1120x990.png)



](https://substackcdn.com/image/fetch/$s_!wz4m!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e562f7f-d7cf-430e-8151-0e05d44611eb_1120x990.png)
*Credit: [Skynet & Ebert](https://skynetandebert.com/2015/04/22/music-was-better-back-then-when-do-we-stop-keeping-up-with-popular-music/).*

New songs—which are most prone to repeat consumption—are disproportionately consumed by younger listeners.

Taken together, this constellation of data points led me to a new line of questioning: *How does binge-listening evolve as we age out of the mainstream?* Do we cling to a narrow rotation of familiar favorites, or do we spread our attention across a wider pool of beloved classics?

# How Does Binge-Listening Behavior Evolve With Age?

We’ll use streaming data from AccuRadio to understand how repeat listening changes with age. [AccuRadio](https://www.accuradio.com/) is a free, human-curated internet radio platform offering more than 1,000 customizable music channels. If Pandora’s channels and Spotify’s editorial playlist curation had a baby, it would look something like [AccuRadio](https://www.accuradio.com/). The service logs more than 1.8 billion global track plays each year and has decades of listener behavior data—including detailed age information.

To measure binge-listening behavior, I focused on AccuRadio’s user-curated playlists—what the platform calls “5-Star Radio”—and tracked how often listeners replay the same songs without skipping.

The result was an unexpected pattern: younger listeners repeat songs at substantially higher rates, both in total weekly plays and in the share of plays going to repeat tracks. These rates gradually subside before leveling off in one’s 30s, forming a steady binge-listening baseline that remains consistent throughout adulthood.

[

![](https://substackcdn.com/image/fetch/$s_!8xk_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03916c98-9656-47c4-9e15-b5d2ec002769_1588x970.png)



](https://substackcdn.com/image/fetch/$s_!8xk_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03916c98-9656-47c4-9e15-b5d2ec002769_1588x970.png)

At first glance, this trend contradicts a theme I’ve emphasized in earlier analyses—*namely, that music discovery declines as we age, with older listeners gravitating toward a familiar set of longtime favorites.* So how do we reconcile that pattern with our observed surge in repeat listening among younger audiences?

To probe further, I examined additional AccuRadio listener-behavior metrics and found two datapoints that position repeat listening within a broader arc of musical identity formation.

The first finding: *as listeners age, they sample fewer music channels on average.*

[

![](https://substackcdn.com/image/fetch/$s_!wJud!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab73d286-854f-4c76-935d-1ac308af1dd3_1708x1150.png)



](https://substackcdn.com/image/fetch/$s_!wJud!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab73d286-854f-4c76-935d-1ac308af1dd3_1708x1150.png)

The second—and perhaps most counterintuitive trend—is that *younger listeners skip songs more frequently.*

[

![](https://substackcdn.com/image/fetch/$s_!Ze_q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd62407b3-bc62-44c5-a105-3a317258c912_1588x1150.png)



](https://substackcdn.com/image/fetch/$s_!Ze_q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd62407b3-bc62-44c5-a105-3a317258c912_1588x1150.png)

As was the case with much of this analysis, these datapoints (initially) threw me for a loop. Every time I tried to predict the outcome of a query, I was wrong. Was my earlier research completely off? Are younger listeners actually more selective, while older audiences passively accept whatever algorithms and curators serve up? And how does repeat listening fit into this bundle of behaviors?

Then I thought back to my own adolescence. When I first started taking music seriously, my entire mindset revolved around discovery—a trend reflected in this collection of datapoints:

-   Early in life, we’re actively searching for music—jumping between channels, sampling different styles, and gradually shaping our personal taste.
    
-   Meanwhile, older listeners exhibit lower skip rates because they put themselves in situations where they don’t need to skip songs. As music tastes calcify, we typically confine our activities to a handful of trusted playlists and channels.
    
-   And when listeners find new music—something that happens more often among younger audiences—they tend to play those tunes on repeat to absorb and internalize them.
    

We search and we search, and then we find something that resonates, and because it’s new and shiny we must repeat that thing—mercilessly—until we’re tired of replaying it four times a day, at which time we move on, adding that track to a growing backlog of music we’ll revisit sporadically.

\---

### ***Enjoying the article thus far and want more data-centric pop culture content?***

\---

# Final Thoughts: The “Hotel California” Debacle

[

![](https://substackcdn.com/image/fetch/$s_!a5R8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F671b8378-c6e1-4db9-a46c-9665ff23d36c_1000x667.png)



](https://substackcdn.com/image/fetch/$s_!a5R8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F671b8378-c6e1-4db9-a46c-9665ff23d36c_1000x667.png)
*Music video for “The Fate of Ophelia” by Taylor Swift. Credit: Republic Records.*

Cognitive reconsolidation is the process by which a memory becomes editable when it’s recalled, allowing the brain to update that recollection before storing it once again. As a result, the memory you later retrieve is often not the original event but the revised version created during last recall. This idea underpins the pop-psychology adage, “*Every time you remember something, you’re really remembering the last time you remembered it*“—a notion that also applies to our consumption of a beloved (or despised) piece of music.

Consider this reconsolidation process in the context of a newfound musical obsession—like the time I decided “Hotel California” was my all-time favorite song *for three glorious weeks*.

When I was 10 years old, I heard “Hotel California” for the first time and had my mind blown by its final line. What type of hotel lets you check out but never leave?! It was at this moment that I decided to play the track four times a day for the next two to twenty fortnights. Unfortunately, my family had no say in this plan. To this day, my sister will invoke *Hotel California* as shorthand for torture by way of cultural obsession. And then, suddenly, after weeks of embracing the song as a key part of my personality, I decided it was old news. Present day, I can no longer listen to this tune, having *Hotel-California-ed* myself into disliking “Hotel California.”

The first time I heard this track, it sparked a sense of genuine wonder—one of those electric moments of discovery that only a handful of songs will deliver in your life. The next 50 to 200 listens were about recapturing and revisiting that feeling. And then, once satiated, I moved on. In recalling the “Hotel California” debacle—and the dozens of times this cycle played out with other songs (”Under Pressure,” “Tiny Dancer,” “Californication,” etc.)—I’m struck by this mercenary-like approach to musical discovery. We binge, we make ourselves sick, and then we turn the page—a moveable feast of fickle attention. The first time this cycle plays out, it’s exhilarating. Over time, you become familiar with this process, and it’s a little less wonderful.

Years later, these once-binged songs become time capsules—reminders of when we were the type of person who voraciously replayed “Hotel California,” Kpop Demon Hunters, or “Smooth” without any knowledge of their future expiration date.

\---

# Enjoyed the article? Support Stat Significant with a tip!

If you like this essay, you can **support Stat Significant through a tip-jar contribution**. All posts remain free; this is simply a way to help sustain the publication. You can contribute with:

#### A Recurring Monthly Donation:

-   **[A $3/month Substack subscription](https://www.statsignificant.com/83f66750)**
    
-   **[A $36/year Substack subscription](https://www.statsignificant.com/83f66750)**
    

#### A One-time Contribution:

-   [A one-time “buy me a coffee” contribution (any amount you’d like)](https://buymeacoffee.com/statsignificant)
    

\---

*This post is public so feel free to share it.*

\---

*Want to **promote your data tool or media publication** to Stat Significant’s 23,700 readers? **Email [daniel@statsignificant.com](mailto:daniel@statsignificant.com)***

Need help with a data problem? **[Book a free data consultation](https://calendly.com/daniel-y68/30-minute-call-with-daniel-parris)**

Connect with me on **[LinkedIn](https://www.linkedin.com/in/d-parris/)** if you want to chat about a data project.

Like movies? **[Follow me on Letterboxd](https://letterboxd.com/Danny_Parris/)**