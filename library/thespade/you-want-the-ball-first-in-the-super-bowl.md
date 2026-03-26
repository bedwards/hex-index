---
title: "You Want the Ball First in the Super Bowl"
author: "Ray Carpenter"
publication: "The Spade"
publication_slug: "thespade"
published_at: "2026-01-29T13:16:11.000Z"
source_url: "https://thespade.substack.com/p/you-want-the-ball-first-in-the-super"
word_count: 3414
estimated_read_time: 18
---

I’m trying to find the correct words to describe how much I enjoy reading basketball analytics content, and what differentiates it from football analytics content. I think it’s multi-faceted, basketball is a much more balanced sport when it comes to box scores. It’s much easier to calculate exactly which players are responsible for which metrics in basketball just by the sheer amount of scoring instances. A player makes a 3 pointer, that’s positive for him and also the player who passed him the ball. A player fouls another player on a drive to the basket resulting in an and-one, that’s bad for him. Basketball has more actions that yield quantitative results than any other sport. No other sport really has scores that end 120-118 like basketball does. And sample size matters, too. Each NBA team plays a minimum of 82 games, in college they play 30ish in the regular season, in Europe there’s 38. There’s always new data being created somewhere. And as a result, an abundance of interesting, unique basketball analytics content makes its way into my email inbox every morning.

It’s why most of my write-ups are attempts to apply these interesting basketball metrics to football, and today’s no different. We’ve got a Super Bowl next week and I’ve been reading all week about opening tip-off advantages from sources like and NC State Wolfpack head coach Will Wade himself. Today, we’re going to take a pre-conceived notion and attempt to turn it on its head, or tail. Is the Super Bowl a different animal than the rest of the NFL season? If so, do we need to treat it differently?

#### The Data

We’re staying on nflfastR this time. We’re bringing in every season available in the dataset, from 1999 until the 2025 conference championships. We’re analyzing which team received the ball to begin the first half, and which team received the ball to begin the second half. We don’t have coin toss data available to us which is why the two groups are “First Half Receiver” and “Second Half Receiver”. Later on we’re shrinking the dataset down since the *time\_of\_day* field in nflfastR is only filled from 2011 to today. But this is about as large as NFL play-by-play data can get right here.

#### Win the Coin Toss and Defer to the Second Half…

…is what we’ve been taught since the early 2010s when NFL teams made this unanimous shift. It’s interesting that this stance is now crystallized in every NFL brain. If you win the coin toss, you defer to the second half. You just have to every time for the second half advantage, right? Using nflfastR data, we’re going to look into this. We’re going to start with the largest scope we possibly can, the entire dataset from the entire 1999 season to 2025’s conference championships. Then, we’re going to narrow the scope and see how the numbers change.

So first, here’s a simple bar chart of who wins regular season NFL games:

[

![](https://substackcdn.com/image/fetch/$s_!3UyY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a0739bf-3dc9-4a31-8bfe-c894dcc699b4_2400x1350.png)



](https://substackcdn.com/image/fetch/$s_!3UyY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a0739bf-3dc9-4a31-8bfe-c894dcc699b4_2400x1350.png)

The team who receives the ball to start the second half wins 2% more often than the first half receiver. This one’s silly for such a small margin. What if we look into the postseason by round?

[

![](https://substackcdn.com/image/fetch/$s_!zdzV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8207af93-6976-4ef6-9d51-d85a348dcc59_2400x1350.png)



](https://substackcdn.com/image/fetch/$s_!zdzV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8207af93-6976-4ef6-9d51-d85a348dcc59_2400x1350.png)

That’s weird. The first half receiver in the Super Bowl has won 6 more times in the past 26 years than the second half receiver? It’s an odd sample size, and Super Bowls are the smallest subset from these playoff rounds. What if we just looked at neutral game sites in general, and put it side by side with the Super Bowl results?

[

![](https://substackcdn.com/image/fetch/$s_!5wg_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa75b866e-c382-4159-b424-a6bb4f81cb42_2400x1350.png)



](https://substackcdn.com/image/fetch/$s_!5wg_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa75b866e-c382-4159-b424-a6bb4f81cb42_2400x1350.png)

When we increase the sample size, the advantage sways back towards the second half receiver, although slightly. Here’s every grouping of games we just showed individual bar charts for, all next to each other:

[

![](https://substackcdn.com/image/fetch/$s_!ZA72!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b6a7b85-bcf2-448c-8c95-3974d814a29b_2400x1350.png)



](https://substackcdn.com/image/fetch/$s_!ZA72!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b6a7b85-bcf2-448c-8c95-3974d814a29b_2400x1350.png)

I won’t pretend that this is in-depth or hard-hitting analysis. It’s just interesting. Why would first half receivers have better winning rates in the Super Bowl than in any other setting?

[

![](https://substackcdn.com/image/fetch/$s_!n31t!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8c47138-8d60-4514-9893-907cc8ae517b_2400x1600.png)



](https://substackcdn.com/image/fetch/$s_!n31t!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb8c47138-8d60-4514-9893-907cc8ae517b_2400x1600.png)

What’s different about the Super Bowl compared to the rest of these games? It’s always at a neutral site, there’s more pomp and circumstance pre-game and halftime is twice as long as regular season halftimes.

#### Playoff Double Dippers

The main phenomenon propelling the “defer to the second half” option is the opportunity to double dip. Not with chips, but rather by creating a make-it, take-it situation with a score to end the first half, followed by receiving the kickoff and immediately getting another scoring drive. But when teams attempt this, how often do their plans work? Does it work more often in the regular season than in the postseason? How about in the Super Bowl? Let’s see. Here’s a Sankey chart for each double dip opportunity in the regular season from 1999-today:

[

![](https://substackcdn.com/image/fetch/$s_!S_zs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5df4c723-fc2e-4482-91f4-aa492bdc80e3_2100x1012.png)



](https://substackcdn.com/image/fetch/$s_!S_zs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5df4c723-fc2e-4482-91f4-aa492bdc80e3_2100x1012.png)

I know, last first, first second, it’s a lot to keep track of. But I hope the Sankey diagram helps. But from 3,393 double dip opportunities, roughly 61% of opportunities were converted. What about in the playoffs?

[

![](https://substackcdn.com/image/fetch/$s_!USAC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37833e0c-2d20-4aa5-93c7-5fc7d1943bf6_2100x1012.png)



](https://substackcdn.com/image/fetch/$s_!USAC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37833e0c-2d20-4aa5-93c7-5fc7d1943bf6_2100x1012.png)

The converted rate drops slightly down to 56%. In the playoffs, the average jump in win probability added (WPA) from first half closing score to the converted double dip in the second half is +13.5%. Teams are correct to aim for this.

#### Does Waiting Longer Neutralize the Double Dip?

If we analyze the time differences from opening kickoff to third quarter kickoffs from 2011 to now grouped by circumstance, here’s what we get:

[

![](https://substackcdn.com/image/fetch/$s_!HnuR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc32472f3-84d8-4849-bfe3-f68f7bfff875_2400x1350.png)



](https://substackcdn.com/image/fetch/$s_!HnuR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc32472f3-84d8-4849-bfe3-f68f7bfff875_2400x1350.png)

It takes an average of 99.5 minutes to get from opening kickoff to second half kickoff in all NFL regular season games from the past 14 seasons. For playoff games, it takes around 101 minutes. And for Super Bowls, the wait is about 121.6 minutes. In a game of inches and split-second decisions, is it crazy to think that double dip attempts are slightly nerfed by an extra 20 minutes of prep time for the defense? Or even simpler, an extra 20 minutes of rest? Here’s the Super Bowl double dip funnel:

[

![](https://substackcdn.com/image/fetch/$s_!1F3Y!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe0e08c30-1b86-461e-83ad-8f7e9313072e_2100x1012.png)



](https://substackcdn.com/image/fetch/$s_!1F3Y!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe0e08c30-1b86-461e-83ad-8f7e9313072e_2100x1012.png)

10 successful double dips, but a 60/40 split for winning or losing. Feels like a dead end. This doesn’t feel significant and can be chalked up to the sample size being so small. Bad Bunny’s performance will not provide any edges to the recovering defense if the opportunity for a double dip presents itself. It’s most likely due to the team you’re going up against having an elite defense, since most teams can’t make it to the Super Bowl without one. You can’t double dip on the best. Any other deviations from the norm can be chalked up to small sample size.

#### The NFL’s Version of Winning the Opening Tip

If you lose the coin toss, your team you get the ball first. Does this provide any advantage in the post-season?

[

![](https://substackcdn.com/image/fetch/$s_!Okzk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb707dac9-8308-4bf7-b12b-cb3feaf28f89_1800x1200.png)



](https://substackcdn.com/image/fetch/$s_!Okzk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb707dac9-8308-4bf7-b12b-cb3feaf28f89_1800x1200.png)

[

![](https://substackcdn.com/image/fetch/$s_!ZAc3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F25542646-fffe-4512-b3ef-c570935fe586_1800x1200.png)



](https://substackcdn.com/image/fetch/$s_!ZAc3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F25542646-fffe-4512-b3ef-c570935fe586_1800x1200.png)

What I can’t wrap my head around is exactly *why* a team that gets the ball first would be so much more successful in the Super Bowl than in other games. And why do teams bounce back so well if the other team scores first, in a way that they usually don’t in other playoff games. If I had more time, I’d look into times of possessions, and if teams change their strategies before the big game. Is it the occasion? Are players nervous? Is it the extra week of prep? Is it something in the air?

You want the ball first in the Super Bowl. I’m just not sure exactly why.

\---

### A Deep Dive Into Super Bowl Gatorade Shower Colors

I’ve got a double feature for my readers today. We’re going to analyze the Gatorade Shower at the end of each Super Bowl.

#### The Data

We’ve got some hasty datasets to choose from online. I decided to turn [this table here from SB Nation](https://www.sbnation.com/nfl/24362090/super-bowl-gatorade-color-history-odds-orange-red-yellow-green-purple-clear-water) into a csv file but also double check it against NFL film. This table also only goes back to Super Bowl 35 in 2001, but we can do better than that.

This data was half-compiled from online sources and half-compiled manually by watching Super Bowl reruns using a manual binary search. That sounds fancy, but all I did was hone in on the final 20ish minutes of the game and fast forwarded until I saw a drenched head coach. From there, I slowly backtracked to try and find the exact Gatorade bath moment. Simple enough, let’s dive into it.

This data was compiled by me, if you have any info or corrections to it please let me know and I’ll update it.

Here’s a data visualization showing every Gatorade Shower color since Super Bowl 21:

[

![Image](https://substackcdn.com/image/fetch/$s_!0AKT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88e8d123-b4d5-44c7-87eb-cb3c837b87e4_2400x2800.png "Image")



](https://substackcdn.com/image/fetch/$s_!0AKT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88e8d123-b4d5-44c7-87eb-cb3c837b87e4_2400x2800.png)

#### The History of the Gatorade Shower

Gatorade shower? Gatorade bath? I don’t think the participants get to choose. [According to Wikipedia](https://en.wikipedia.org/wiki/Gatorade_shower), the first instance of a Gatorade shower took place in 1984 on New York Giants head coach Bill Parcells. The tradition has become a staple since, not just in football but all coaches and/or clutch players across all sports are at risk of an involuntary sticky ice bucket challenge after any victory. For the sake of time, I’ll take this 1984 instance as the source of truth and only look at Super Bowls after then. Let’s begin with Super Bowl 21.

All images included in this write-up except my data visualization are credited to NFL Films.

#### Super Bowl 21 - Giants over Broncos

When the Giants won this Super Bowl, they dumped the tub out on QB Phil Simms instead of Parcells. He must’ve not been happy with the conference championship christening.

[

![](https://substackcdn.com/image/fetch/$s_!RhpP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52859a20-7b2f-4a9b-8b8c-c4d3838936af_1490x1044.png)



](https://substackcdn.com/image/fetch/$s_!RhpP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52859a20-7b2f-4a9b-8b8c-c4d3838936af_1490x1044.png)

As for the color, is that clear? Looks like a clear Gatorade or water to me. Anyone on the sidelines in the 80s? What were they drinking?

But wait, there were TWO Gatorade baths. In order to sneak up on Parcells, Harry Carson put on a security jacket and showered his head coach in orange Gatorade.

[

![](https://substackcdn.com/image/fetch/$s_!uwKk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff351de3e-00a7-4e97-921e-aeb2659dcc1a_1268x1092.png)



](https://substackcdn.com/image/fetch/$s_!uwKk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff351de3e-00a7-4e97-921e-aeb2659dcc1a_1268x1092.png)

I wish I was alive for this era of Super Bowls. Seems like the games were a little less stuffy back then. You could just ask a security guard for his jacket back then and he’d let you borrow it.

#### Super Bowl 22 - Washington over Broncos

Seems like Joe Gibbs is pretty dry while accepting his accolades in this game. After reviewing the footage, I don’t believe the Washington team doused their head coach in Gatorade. Must’ve been because the Giants did the first Gatorade shower event while beating them in the conference championship the year before. Or Gibbs just didn’t want to get his sweater wet.

[

![](https://substackcdn.com/image/fetch/$s_!Z317!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0aa38ebd-7666-47a9-8378-772b51c749e8_1340x827.png)



](https://substackcdn.com/image/fetch/$s_!Z317!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0aa38ebd-7666-47a9-8378-772b51c749e8_1340x827.png)

#### Super Bowl 23 - 49ers over Bengals

I don’t think Bill Walsh was into the Gatorade bath either. Seems like he stayed dry. This one was hard to parse though.

[

![](https://substackcdn.com/image/fetch/$s_!hn1U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9372cdba-ba2c-41a7-af70-73dc18a10d1d_1408x776.png)



](https://substackcdn.com/image/fetch/$s_!hn1U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9372cdba-ba2c-41a7-af70-73dc18a10d1d_1408x776.png)

This is the only real shot I can find of Walsh after the game on the [NFL Films YouTube channel’s full game coverage](https://www.youtube.com/watch?v=m7B4JZAiG6c) of this Super Bowl.

#### Super Bowl 24 - 49ers over Broncos

Maybe it’s a 49ers thing. George Seifert also remained dry while accepting the Lombardi trophy.

[

![](https://substackcdn.com/image/fetch/$s_!wJd2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75a7ca9c-e36d-4d8d-85e0-3df3ef8670e7_1492x1041.png)



](https://substackcdn.com/image/fetch/$s_!wJd2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75a7ca9c-e36d-4d8d-85e0-3df3ef8670e7_1492x1041.png)

I wouldn’t have drenched him either. He looks like he’d make you run at 5am the next morning if you did. Instead, the players doused owner Eddie DeBartolo in water in the broadcast booth.

[

![](https://substackcdn.com/image/fetch/$s_!LItx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5249c322-b851-493a-8267-fe66bbfd5ca1_958x580.png)



](https://substackcdn.com/image/fetch/$s_!LItx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5249c322-b851-493a-8267-fe66bbfd5ca1_958x580.png)

#### Super Bowl 25 - Giants over Bills

Trigger warning, Buffalo fans. I recommend you fast forward a few years here.

[

![](https://substackcdn.com/image/fetch/$s_!lsM0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a61e59e-3f02-49b7-9c89-f600dc2a17bf_1315x905.png)



](https://substackcdn.com/image/fetch/$s_!lsM0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1a61e59e-3f02-49b7-9c89-f600dc2a17bf_1315x905.png)

Here’s our first uncrackable mystery. Bill Parcells looks pretty drenched in this photo, but I can’t find any footage of the Gatorade bath. And we can’t deduce which color it was since the Giants used two different colors in their Gatorade baths last time they won. [Here’s the film.](https://www.youtube.com/watch?v=XxsZf9G_W14) Anyone got any leads? Any execs at Gatorade have any side angle footage? After some digging, I found some grainy footage of a clear Gatorade bath:

[

![](https://substackcdn.com/image/fetch/$s_!auhl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43645c73-5135-4e4a-8eb5-d5acf4cf33ef_962x558.png)



](https://substackcdn.com/image/fetch/$s_!auhl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43645c73-5135-4e4a-8eb5-d5acf4cf33ef_962x558.png)

#### Super Bowl 26 - Washington over Bills

This time Washington does get Joe Gibbs with the Gatorade.

[

![](https://substackcdn.com/image/fetch/$s_!JSHb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76685cbe-7c3f-4598-9d0e-82da3a26697f_1406x918.png)



](https://substackcdn.com/image/fetch/$s_!JSHb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76685cbe-7c3f-4598-9d0e-82da3a26697f_1406x918.png)

Is that green? Clear? I’m classifying it as yellow/green since that’s a category now for official Gatorade bets.

#### Super Bowl 27 - Cowboys over Bills

I couldn’t find any info on a Gatorade bath in Super Bowl 27. I thought I had a lead, but it turned out to actually be Super Bowl 28’s Gatorade bath.

[

![](https://substackcdn.com/image/fetch/$s_!AsHi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc80994dd-cc4a-4476-9a12-31c0ca1dec9a_1277x904.png)



](https://substackcdn.com/image/fetch/$s_!AsHi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc80994dd-cc4a-4476-9a12-31c0ca1dec9a_1277x904.png)

The players were making a huge deal out of touching Jimmy Johnson’s hair though. might make sense that there wasn’t a bath if he loved his hair so much.

After a little bit more searching, we can conclude that it was clear.

[

![](https://substackcdn.com/image/fetch/$s_!xTKi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e4671d7-6820-411a-a12d-a865969f1ac3_1050x629.png)



](https://substackcdn.com/image/fetch/$s_!xTKi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e4671d7-6820-411a-a12d-a865969f1ac3_1050x629.png)

#### Super Bowl 28 - Cowboys over Bills

The Cowboys repeat as champions and this time, they douse their coach. How could we tell the difference between Super Bowl 27 and Super Bowl 28 footage? We had to use some context clues, especially since Jimmy Johnson was wearing the same exact outfit in both games.

[

![](https://substackcdn.com/image/fetch/$s_!F4lr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F48e3d9aa-a8ff-4f04-9570-2e14fe1dfd6d_1064x670.png)



](https://substackcdn.com/image/fetch/$s_!F4lr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F48e3d9aa-a8ff-4f04-9570-2e14fe1dfd6d_1064x670.png)

The Cowboys covered Johnson in clear Gatorade or water.

This was a fun one to find because I couldn’t locate it in the [Super Bowl film](https://www.youtube.com/watch?v=qMmcIR9maQs), I had to get an [alternate angle from NFL films](https://www.youtube.com/watch?v=OfpqPI4YDAc) in a Gatorade showers compilation video.

#### Super Bowl 29 - 49ers over Chargers

This is by far the best watch on NFL Films since they include the commercials from 1995 towards the end of the broadcast. [Check it out here.](https://www.youtube.com/watch?v=m0apMtFx5LE)

[

![](https://substackcdn.com/image/fetch/$s_!007-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff18043b0-6626-4605-9a7c-988530946adb_1222x828.png)



](https://substackcdn.com/image/fetch/$s_!007-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff18043b0-6626-4605-9a7c-988530946adb_1222x828.png)

The 49ers got George Seifert this time. Is that clear liquid again? The 49ers also did this *as* the San Diego Chargers scored a touchdown with around 4 minutes left in the game with their backups in.

#### Super Bowl 30 - Cowboys over Steelers

The Cowboys bathed Barry Switzer in water.

[

![](https://substackcdn.com/image/fetch/$s_!VPW0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F105895e5-408f-40cd-8ad8-497beb47024f_1329x968.png)



](https://substackcdn.com/image/fetch/$s_!VPW0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F105895e5-408f-40cd-8ad8-497beb47024f_1329x968.png)

Still trying to solve the mystery of the 90s clear Gatorade. It’s probably water.

#### Super Bowl 31 - Packers over Patriots

Looks like Mike Holmgren stayed dry while robbing Bill Parcells of another Gatorade bath.

[

![](https://substackcdn.com/image/fetch/$s_!uSoD!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F80f89aff-b341-48e0-9bff-01d6631ab88a_1234x883.png)



](https://substackcdn.com/image/fetch/$s_!uSoD!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F80f89aff-b341-48e0-9bff-01d6631ab88a_1234x883.png)

The Packers elected to carry him to the 50 yard line instead.

#### Super Bowl 32 - Broncos over Packers

Mike Shanahan looks pretty dry on the podium here. I couldn’t locate any footage of him getting hit with a Gatorade bath.

[

![](https://substackcdn.com/image/fetch/$s_!XeeE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F392e492f-09a7-41eb-b323-1e55b3b8cece_1322x819.png)



](https://substackcdn.com/image/fetch/$s_!XeeE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F392e492f-09a7-41eb-b323-1e55b3b8cece_1322x819.png)

[Check it out for yourself](https://www.youtube.com/watch?v=JUe968JR8UM) and let me know if there’s something I’m not seeing.

#### Super Bowl 33 - Broncos over Falcons

Can’t seem to find any [footage](https://www.youtube.com/watch?v=IgKhROXd0Fg) of a Gatorade bath on this Broncos repeat win.

[

![](https://substackcdn.com/image/fetch/$s_!uq4U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3e62cde8-b807-45f5-8c57-e59017f3bb3d_1368x1022.png)



](https://substackcdn.com/image/fetch/$s_!uq4U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3e62cde8-b807-45f5-8c57-e59017f3bb3d_1368x1022.png)

Maybe Mike Shanahan just wasn’t into them.

#### Super Bowl 34 - Rams over Titans

Seems like Dick Vermeil stays dry for this one, but do you blame the players? They were probably still in shock so they forgot to drench their coach. [If you haven’t watched this Super Bowl, I highly recommend it.](https://www.youtube.com/watch?v=bflL0XATHAw) Probably the most dramatic ending to a game in NFL history.

[

![](https://substackcdn.com/image/fetch/$s_!CaNi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f964924-e13b-4e0f-a151-da6ae52aa1fd_1319x774.png)



](https://substackcdn.com/image/fetch/$s_!CaNi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f964924-e13b-4e0f-a151-da6ae52aa1fd_1319x774.png)

Quick side note, a Rams Puma jacket like this one will run you about $99 on eBay. I can’t find the exact St. Louis Rams copy here, [but here’s an LA Rams one that’s similar.](https://www.ebay.com/itm/357937369765?_skw=st+louis+rams+puma+jacket&itmmeta=01KFXJ3PGKZ2H9R2AQARMA1SHP&hash=item5356bad2a5:g:y20AAeSw2uJpIk7r&itmprp=enc%3AAQALAAAA8O7PUuNWmJ%2B%2BUShgI9tQz%2FoxJPC1kMB5vym8UENkECK9nrXbBP15U8j9Ohrnk2I0pgheA40FGQFo%2FA4s0Rap9yyeX3SSt9vlvOB3hZbUUnQXdcfQikWeNFtJd78nWYA3B3SU9e0P26KfZpq81iqJJSHOsck7qaPmR9eCtU8ZFCWBJcx5k5e2BgxpFdyamSvRM%2BypbOChGC%2BlRRlVtun--5uehtQsoLc61Hd6QAyfZ9MucLPuciyzI7WiHhknEFn2%2B9jUNU7oiZlguhIUmXZ6uHr5FTI8fTPR8T1yr9YAt3uGS9%2BrgCGB56TIcEsrjPZijA%3D%3D%7Ctkp%3ABk9SR87ojrL_Zg)

#### Super Bowl 35 - Ravens over Giants

The Baltimore Ravens got Brian Billick with orange Gatorade.

[

![](https://substackcdn.com/image/fetch/$s_!-nun!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99d10f2f-962b-4315-ba2a-d101757f147e_1327x758.png)



](https://substackcdn.com/image/fetch/$s_!-nun!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99d10f2f-962b-4315-ba2a-d101757f147e_1327x758.png)

I had to default to the alternate Gatorade compilation bath for this one, because this was the only broadcast angle I could find:

[

![](https://substackcdn.com/image/fetch/$s_!HGJ6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9401360d-1cf0-458c-963e-fcc7594e5a2b_1348x669.png)



](https://substackcdn.com/image/fetch/$s_!HGJ6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9401360d-1cf0-458c-963e-fcc7594e5a2b_1348x669.png)

#### Super Bowl 36 - Patriots over Rams

Another one where the ending was so shocking that the players forgot to do the Gatorade bath, I guess? This was the [Patriots walk-off Adam Vinatieri field goal Super Bowl.](https://www.youtube.com/watch?v=5HTJQE2BLBo)

#### Super Bowl 37 - Buccaneers over Raiders

Purple Gatorade for Jon Gruden in his victory over the Raiders, who allegedly didn’t change their playbook after he left his head coaching job there to take the job in Tampa.

[

![](https://substackcdn.com/image/fetch/$s_!Kn0W!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F045b7198-ec3f-4739-9ee3-e7a745389169_1127x664.png)



](https://substackcdn.com/image/fetch/$s_!Kn0W!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F045b7198-ec3f-4739-9ee3-e7a745389169_1127x664.png)

Funny story about this one. My parents brought me to Disney World as a kid shortly after the Buccaneers beat my beloved Eagles en route to this Super Bowl win in August 2003. At one of the parks, Buccaneers linebacker Derrick Brooks approached me and said with a huge smile on his face: “Hey kid, do you wanna come watch the Buccaneers training camp and get some autographs?” To which I replied before my parents could: “I don’t want to see the Suckaneers practice.” They had to apologize and explain where we were from. I promise I check my biases at the door when I write about football though.

#### Super Bowl 38 - Patriots over Panthers

[Patriots repeat here](https://www.youtube.com/watch?v=c6OKT-FA6lI), with another Vinatieri walk-off field goal and another dry Bill Belichick.

#### Super Bowl 39 - Patriots over Eagles

The Patriots finally get home to Belichick in this one, dousing him with clear Gatorade.

[

![](https://substackcdn.com/image/fetch/$s_!SP-0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41101c44-056f-470f-95ae-c39e07b119b1_1566x760.png)



](https://substackcdn.com/image/fetch/$s_!SP-0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41101c44-056f-470f-95ae-c39e07b119b1_1566x760.png)

Another Patriots win. Let’s keep moving.

#### Super Bowl 40 - Steelers over Seahawks

The Steelers showered Bill Cowher with clear Gatorade or water in [this one.](https://www.youtube.com/watch?v=OfpqPI4YDAc)

[

![](https://substackcdn.com/image/fetch/$s_!vL5o!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F21d75b21-173c-433d-ae16-e0fcb84d5d2e_1102x776.png)



](https://substackcdn.com/image/fetch/$s_!vL5o!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F21d75b21-173c-433d-ae16-e0fcb84d5d2e_1102x776.png)

Definitely one of the fastest Gatorade baths of all time in terms of liquid speed.

#### Super Bowl 41 - Colts over Bears

The Colts got Tony Dungy with clear Gatorade and/or water.

[

![](https://substackcdn.com/image/fetch/$s_!imJ6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c63988d-4a54-4997-a817-0f87c7088fb0_1166x709.png)



](https://substackcdn.com/image/fetch/$s_!imJ6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c63988d-4a54-4997-a817-0f87c7088fb0_1166x709.png)

That CBS scorebug was perfect.

#### Super Bowl 42 - Giants over Patriots

Although this ending was a nailbiter, the Giants still found a second to get Tom Coughlin with a clear Gatorade or water bath.

[

![](https://substackcdn.com/image/fetch/$s_!6oU6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6121b8f5-4c4e-41b3-953f-75cb3b4200ee_1467x681.png)



](https://substackcdn.com/image/fetch/$s_!6oU6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6121b8f5-4c4e-41b3-953f-75cb3b4200ee_1467x681.png)

I’m sensing a pattern.

#### Super Bowl 43 - Steelers over Cardinals

The Steelers actually almost missed Mike Tomlin with the yellow Gatorade on this one.

[

![](https://substackcdn.com/image/fetch/$s_!B0zU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab595bfd-bd4b-4ef6-83f5-48bd4c157721_1464x708.png)



](https://substackcdn.com/image/fetch/$s_!B0zU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab595bfd-bd4b-4ef6-83f5-48bd4c157721_1464x708.png)

[This was a great game too.](https://www.youtube.com/watch?v=5GEtlF6Zftg)

#### Super Bowl 44 - Saints over Colts

Now Broncos head coach Sean Payton lost his bid last Sunday at being the first coach in the modern NFL to win two Super Bowls with two different teams.

[

![](https://substackcdn.com/image/fetch/$s_!n63X!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e5da293-61d7-4fb7-a090-07266b28931b_1199x785.png)



](https://substackcdn.com/image/fetch/$s_!n63X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e5da293-61d7-4fb7-a090-07266b28931b_1199x785.png)

The Saints chose a cloak of orange for him that night.

#### Super Bowl 45 - Packers over Steelers

Mike McCarthy and the Green Bay Packers defeated the coach he’s replacing at his new job next season in this one.

[

![](https://substackcdn.com/image/fetch/$s_!6ub1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4686e44e-4e9c-44fd-b2fc-094be3086786_1671x768.png)



](https://substackcdn.com/image/fetch/$s_!6ub1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4686e44e-4e9c-44fd-b2fc-094be3086786_1671x768.png)

Packers players hit him with orange Gatorade.

#### Super Bowl 46 - Giants over Patriots

Another miraculous Super Bowl win for the team who allegedly invented the Gatorade bath.

[

![](https://substackcdn.com/image/fetch/$s_!1kDr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1044752-c3ba-405d-a8c5-933350f66e6c_955x652.png)



](https://substackcdn.com/image/fetch/$s_!1kDr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1044752-c3ba-405d-a8c5-933350f66e6c_955x652.png)

Purple rain for Tom Coughlin, not clear like last time.

#### Super Bowl 47 - Ravens over 49ers

Dry clothes for John Harbaugh in this whacky Super Bowl where the power went out.

[

![](https://substackcdn.com/image/fetch/$s_!dzC9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f1c4b7e-2825-4602-a087-abc415962582_1178x859.png)



](https://substackcdn.com/image/fetch/$s_!dzC9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f1c4b7e-2825-4602-a087-abc415962582_1178x859.png)

Probably didn’t want to gloat in front of his brother.

#### Super Bowl 48 - Seahawks over Broncos

The Seahawks drenched Pete Carroll in orange Gatorade in this chilly Super Bowl at MetLife.

[

![](https://substackcdn.com/image/fetch/$s_!uvO7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f7302df-b9a1-43b6-921b-dbb095e9db1e_1225x788.png)



](https://substackcdn.com/image/fetch/$s_!uvO7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f7302df-b9a1-43b6-921b-dbb095e9db1e_1225x788.png)

#### Super Bowl 49 - Patriots over Seahawks

I actually can’t find footage for this one, but the dataset says it’s the first instance of blue Gatorade being the bathing beverage of choice. All I see is a soaked Bill Belichick. [Let me know if I’m missing something.](https://www.youtube.com/watch?v=0RFXLwZV_fA)

I also fear this may be a data error. More on this later.

#### Super Bowl 50 - Broncos over Panthers

The Broncos finally join in on the fun, dousing Gary Kubiak in orange Gatorade.

[

![](https://substackcdn.com/image/fetch/$s_!PeQ-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F365447dd-0b6b-4539-aba8-324f53f1d2c7_932x773.png)



](https://substackcdn.com/image/fetch/$s_!PeQ-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F365447dd-0b6b-4539-aba8-324f53f1d2c7_932x773.png)

Very fitting color.

#### Super Bowl 51 - Patriots over Falcons

No Gatorade bath for Bill Belichick because I think everyone was still trying to process what we just watched.

#### Super Bowl 52 - Eagles over Patriots

The Eagles deny the Patriots a would-be three-peat based on the future, and deny me some more Gatorade bath machine learning model training data.

[

![](https://substackcdn.com/image/fetch/$s_!t8wU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88f67158-8ee8-4c7f-ade6-0a5a4fe2a908_986x531.png)



](https://substackcdn.com/image/fetch/$s_!t8wU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88f67158-8ee8-4c7f-ade6-0a5a4fe2a908_986x531.png)

Yellow for Doug Pederson. My personal favorite one from the bunch.

#### Super Bowl 53 - Patriots over Rams

I mentioned concerns over a Super Bowl 49 data error due to *this* being a confirmed Bill Belichick blue Gatorade bath.

[

![](https://substackcdn.com/image/fetch/$s_!FkoH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f28a8dd-3174-4372-9a4c-77eeb01bf1ff_1557x840.png)



](https://substackcdn.com/image/fetch/$s_!FkoH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f28a8dd-3174-4372-9a4c-77eeb01bf1ff_1557x840.png)

Did SB Nation put blue down twice? Did we confirm blue occurred in that last one? The Patriots didn’t choose Blue for Super Bowl 39, so unclear.

#### Super Bowl 54 - Chiefs over 49ers

Orange Gatorade in Miami for Andy Reid.

[

![](https://substackcdn.com/image/fetch/$s_!hDGm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feca30b1f-6cf0-462b-8555-a8e58cb37825_1530x835.png)



](https://substackcdn.com/image/fetch/$s_!hDGm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feca30b1f-6cf0-462b-8555-a8e58cb37825_1530x835.png)

#### Super Bowl 55 - Buccaneers over Chiefs

Blue Gatorade for Bruce Arians and the Buccaneers in this one.

[

![](https://substackcdn.com/image/fetch/$s_!5Od8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dbb6c09-eb1e-4034-8686-71fb7d57f15c_1441x780.png)



](https://substackcdn.com/image/fetch/$s_!5Od8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dbb6c09-eb1e-4034-8686-71fb7d57f15c_1441x780.png)

COVID-19 couldn’t stop the tradition.

#### Super Bowl 56 - Rams over Bengals

Another hard one to find, you can see a sliver of blue Gatorade covering Sean McVay in this angle:

[

![](https://substackcdn.com/image/fetch/$s_!1mSx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F85d72233-d5bf-4d14-a4ce-87d42e2320da_1130x837.png)



](https://substackcdn.com/image/fetch/$s_!1mSx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F85d72233-d5bf-4d14-a4ce-87d42e2320da_1130x837.png)

#### Super Bowl 57 - Chiefs over Eagles

Another one here that’s hard to find footage for, but it was purple this time for the Chiefs in Phoenix.

#### Super Bowl 58 - Chiefs over 49ers

Chiefs again, purple again.

[

![](https://substackcdn.com/image/fetch/$s_!jvTW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b895c7c-2bcb-4d2b-8d91-d15c5afed659_1234x693.png)



](https://substackcdn.com/image/fetch/$s_!jvTW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b895c7c-2bcb-4d2b-8d91-d15c5afed659_1234x693.png)

How much powder was in this tank though? It’s basically indigo.

#### Super Bowl 59 - Eagles over Chiefs

And the most recent Super Bowl, yellow/green designation for Nick Sirianni and the Philadelphia Eagles.

[

![](https://substackcdn.com/image/fetch/$s_!0bJF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa67c88a-846d-45ed-8846-ada5677dd0c3_1364x727.png)



](https://substackcdn.com/image/fetch/$s_!0bJF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa67c88a-846d-45ed-8846-ada5677dd0c3_1364x727.png)

#### Super Bowl 60 - Patriots or Seahawks?

It looks like neither team doused their head coach in Gatorade after their conference championship win. Can we find any footage of their Gatorade flavors of choice though?

I tried reviewing the highlight footage from both games, this was the only clear Gatorade tank footage I could find from the NFC Championship:

[

![](https://substackcdn.com/image/fetch/$s_!KG29!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce1e4179-bc85-4a4c-8cee-dfdbff201e6f_973x474.png)



](https://substackcdn.com/image/fetch/$s_!KG29!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce1e4179-bc85-4a4c-8cee-dfdbff201e6f_973x474.png)

And it looks like empty cups to me. Or maybe clear liquid on the Seahawks sideline. You be the judge. As for the AFC Championship, same issue:

[

![](https://substackcdn.com/image/fetch/$s_!O04q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F962a247e-b075-4f5c-aee9-7dad432d2f85_653x457.png)



](https://substackcdn.com/image/fetch/$s_!O04q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F962a247e-b075-4f5c-aee9-7dad432d2f85_653x457.png)

No leads on the Gatorade colors yet. I felt like a maniac flipping through game film, looking for anyone sipping on an open cup of an energy drink. I tried to find the truth, but couldn’t just yet.

I’d love any feedback on this and please let me know what you think. And I’d love some feedback on the new viz layouts too, been working hard to make some more mobile-friendly layouts and use some more readable fonts. Have a great day. - RC