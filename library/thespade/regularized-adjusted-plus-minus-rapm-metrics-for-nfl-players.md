---
title: "Regularized Adjusted Plus-Minus (RAPM) Metrics For NFL Players"
author: "Ray Carpenter"
publication: "The Spade"
publication_slug: "thespade"
published_at: "2026-02-25T13:58:51.000Z"
source_url: "https://thespade.substack.com/p/regularized-adjusted-plus-minus-rapm"
word_count: 1849
estimated_read_time: 10
---

Good morning everyone,

It’s the NFL off-season and we’re heading for an amazing March Madness. If I had to explain why I’m on a basketball kick again, those are probably the two reasons why. And of course, the endless pool of knowledge in the world of basketball analytics. A couple of weeks ago, [I attempted to calculate NFL on/off stats](https://thespade.substack.com/p/2025-nfl-season-onoff-stats) since nflreadR released their snap participation data for the season and freed me from the shackles of web scraping. That was me dipping my toes in the shallow end of basketball analytics, and this week’s edition is me diving head first into the deep end. We’re going to attempt to apply an NBA stat called Regularized Adjusted Plus-Minus (RAPM) to football.

You may be asking yourself, *what is adjusted plus-minus?* did a better job explaining it than I ever could [here](https://www.roycewebb.com/p/adjusted-plus-minus-explained), and [here.](https://www.roycewebb.com/p/nba-adjusted-plus-minus-how-to-build) The gist of adjusted plus-minus is that it’s a stat trying to measure the impact of individual NBA players. Plus/minus ratings don’t exactly translate perfectly to NFL play, but that’s never stopped us from exploring the topic before.

The Spade is a weekly football analytics newsletter covering the NFL, college football, and everything in between. Lately we’ve been focused on the landscape of the college football transfer portal and applying NBA stats to the NFL. In the coming weeks, I’ll be publishing some NFL draft content. If that stuff sounds interesting to you, I’d love to have you along for the ride as a subscriber for free:

There’s a paid option as well if you’d like access to my coding tutorials for R, Python SQL, and soon, D3. Let’s dig up some more football data visualizations.

#### Inputs

We’re using nflreadR’s participation data back from 2016 until now to grab snap participation data and merge it to play-by-play data that has all the good stuff we’re looking for, like Expected Points Added (EPA) per play. Like NBA RAPM, we’re applying heavier weights to more recent data. That’s just a fancy way of saying that good play in 2025 matters more than good play in 2019. I got that idea of *recency decay* from [this paper by Joseph Sill](https://supermariogiacomazzo.github.io/STOR538_WEBSITE/Articles/Basketball/Basketball_Sill.pdf), and applied something similar. I was messing with concepts of exponential decay [back when we were predicting the Super Bowl winning Gatorade Shower color.](https://thespade.substack.com/p/super-bowl-preview-and-an-advanced)

I chose a ridge regression for version 1 of the NFL RAPM equivalent. Per 100 plays, I want to try and quantify how much each player contributes to each play’s EPA. The ridge portion of this pulls everyone’s average down towards zero, to try and avoid the classic pitfalls of the NBA’s RAPM like over-valuing a player who doesn’t play many minutes at all. This was intended to reduce crazy outliers, like an offensive lineman who was on the field one time over 17 weeks for a play that just happened to be a touchdown.

What I’m not including here is a raw table of the +/- ratings because those were just repeats of the raw EPA/Play on/off numbers from two weeks ago. [More on that here.](https://thespade.substack.com/p/2025-nfl-season-onoff-stats)

#### V1 Results

Here’s a table of version 1 of NFL RAPM for just the 2025 season:

[

![Image](https://substackcdn.com/image/fetch/$s_!IhHz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a5a67f5-5844-48cd-bf0d-a6ade3ecdbc8_558x953.jpeg "Image")



](https://substackcdn.com/image/fetch/$s_!IhHz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a5a67f5-5844-48cd-bf0d-a6ade3ecdbc8_558x953.jpeg)

I wanted to share some thoughts on this as well as shout out some folks who gave me some really good feedback:

-   I think this original model liked Stefon Diggs a lot because he was one of the only players in almost every participation dataset since 2016. Also, it favors Diggs because he jumped from high-flying offense with Buffalo to high-flying offense with New England. This told me I had some work to do regarding prior weights and trying to quantify individual position contribution.
    
-   Originally I had positive numbers for offensive players and negative numbers for defensive players. NBA players play both offense and defense so it’s a little easier to create three different buckets for them - offensive RAPM, defensive RAPM, and general RAPM. I chose ‘per 100’ just as a generalization to match the NBA’s per 100 possessions. My friend Ted let me know that this was based off real math though, that the average NBA game has roughly 100 possessions. And he also let me know the average NFL game has roughly 153 plays in it. For the sake of round numbers, I chose to scale to 150 plays as a trial run for version 2, but then a twitter follower of mine who simply goes by [‘Jonny’](https://x.com/jnnynumbanine9) said I should try cutting that in half since most NFL players (sans trick plays and Travis Hunter) only play one side of the ball. His profile picture is Tony Soprano, so I trust him completely and fully.
    
-   This original measure is extremely inflating Tua Tagovailoa because of the poor quarterback play that happens down in Miami when he misses time. In fact, I think this whole v1 measure is actually *favoring* those who miss significant time with injuries. Sam Laporta, Dak Prescott, Patrick Mahomes, Tua, Stefon Diggs, and Ronnie Stanley have all had extended stints on IR.
    
-   Another shoutout to [Steven Patton](https://x.com/PattonAnalytics) who sent me down the [nflWAR rabbit hole.](https://arxiv.org/abs/1802.00998) He helped me do some EDA on quantifying positional value and contributing WPA to said positional value.
    
-   pointed me towards ‘s Unexpected Points, which also provided some valuable insight. You should go check out Ben’s mock draft content and Kevin’s on/off stats too.
    

I ended up scrapping this one for a v2 described below.

#### V2 Results

I took all of this feedback into consideration and re-ran a version 2, scaling to 75 plays instead of the arbitrary 100 and using win probability added combined with expected points added. Here are those results:

[

![](https://substackcdn.com/image/fetch/$s_!L5BA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa86d2a4a-c42b-4be3-b2c5-e33c1841bf78_1036x1751.png)



](https://substackcdn.com/image/fetch/$s_!L5BA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa86d2a4a-c42b-4be3-b2c5-e33c1841bf78_1036x1751.png)

So this one here still likes Stefon Diggs, Tua Tagovailoa, and Patrick Mahomes. This one might actually be slightly more suspect though, since TJ Bass played fewer than 400 snaps for the Cowboys this season. This is another cumulative table using all of the data, but inclusion of players that only played in 2025 signals to me that maybe I’m weighing recency a little too much. This one here combined two different regressions, one for WPA and one for EPA and I used a z-score for both, to scale the data onto the same plane since those two numbers can vary. Z-score just means ‘standard deviations above average.’ This also attempts to discount garbage time contributions through EPA by taking into account the win probability spread. That being said, this still isn’t exactly where I want it to be.

Here’s a simple line chart comparing the differences in the two versions:

[

![](https://substackcdn.com/image/fetch/$s_!Sdhy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a4780d3-d1a3-4437-b50f-ca2b5c8bc575_3600x1800.png)



](https://substackcdn.com/image/fetch/$s_!Sdhy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a4780d3-d1a3-4437-b50f-ca2b5c8bc575_3600x1800.png)

And one for Derrick Henry too:

[

![](https://substackcdn.com/image/fetch/$s_!5OwV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5183f925-0d3e-4d7e-aa03-840c08e58032_3600x1800.png)



](https://substackcdn.com/image/fetch/$s_!5OwV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5183f925-0d3e-4d7e-aa03-840c08e58032_3600x1800.png)

I think Henry’s graph shows where the two versions separate themselves from each other. If you remember, that week 18 game was the high-stakes one where the Steelers won the AFC North in that game against the Ravens 26-24. Derrick Henry had a big game in a game that mattered a lot, if that makes sense.

I like how it’s performing, but don’t like how highly ranked players who didn’t play much last season like TJ Bass and Samaje Perine are. Let’s add one final step to try and account for that.

#### NFL RAPM as it stands today

At the end of calculating this stat, I added some shrinkage to the model to directly penalize players who played less often in certain positions to account for the model favoring offensive linemen and the model favoring players who didn’t play much. I tried to quantify position group workloads so that an OL with 3,000 snaps isn’t treated the same as an RB who plays 3,000 snaps. Here are the results:

[

![](https://substackcdn.com/image/fetch/$s_!Qg0J!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd0c5648-8755-4587-b495-78067751b514_1050x3284.png)



](https://substackcdn.com/image/fetch/$s_!Qg0J!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd0c5648-8755-4587-b495-78067751b514_1050x3284.png)

As you can see it shrunk everyone’s numbers, but it kicked out some low-snap and low-usage players from the top 10. Might’ve over-corrected it, but we can re-visit this soon. It’s also heavily favoring offensive linemen still who missed time. And it still loves Stefon Diggs and Samaje Perine. This could be indicative of these two players getting reps in more favorable game scripts. I also think there’s too heavy bias towards players who miss large chunks of time through injuries. But this top 20 has *good players* (or players who were good at some point from 2016 to now) on it.

I wanted to do one more peek under the hood before putting this to rest for the week. Do better teams have more players with higher RAPMs?

[

![](https://substackcdn.com/image/fetch/$s_!g8Jn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0f59969e-c789-4801-9d64-64b404950cda_3600x5400.png)



](https://substackcdn.com/image/fetch/$s_!g8Jn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0f59969e-c789-4801-9d64-64b404950cda_3600x5400.png)

Still not getting much insight from these.

#### Limitations

I think these are obvious here. 82 is greater than 17. The NBA simply has a larger sample size than the NFL does, and the sport lends itself to a more democratic form of responsibility than football does. We’re using Expected Points Added here, and if a quarterback gets sacked on a pass play, that’s a play with negative EPA. Due to the data we have available to us, it doesn’t matter exactly where that defensive player attained his sack from. If he lined up off the left tackle, bull-rushed him, and sacked the QB, this current RAPM formula punishes *every player* equally for being *on the field* for that negative play. Including the wide receiver on the opposite side of the field. You should be saying to yourself, like I am, isn’t that unfair? You’d be correct. And we’re still only covering two sides of the ball, offense and defense. Apologies to special teams, and I’m bummed I couldn’t produce something that yielded effective results for them. That’s an extremely important facet of the game. Also, plus/minus is a concept that’s been around for a while in the NBA. There’s nothing quite like it (yet) for the NFL, so this was two steps within one study, or maybe even three. We had to create a plus/minus, then adjust it and regularize it. Working with NFL data is like trying to get blood from a turnip, especially from free sources. I think that’s why I enjoy it so much.

I’d love to explore this further with some different weights, but for the sake of weekly content, we’re going to have to punt that to another date. This is another existential constraint, how I dedicate one week to heavy data science NFL projects then keep it moving. I’d love to return to this one eventually though. I bit off more than I could chew in one calendar week with this one, but it’s all good. I’m getting exactly what I wanted out of these exercises: learning, great conversations, and exposure. But this was definitely a heat check for me. To think I could create an entire advanced metric in under a week was bold, and I had fun trying.

I hope that with these write-ups, my thought process and data exploration techniques are clear. Results definitely vary week over week with regards to how effective or applicable the things I write are. But I hope my methodology is easily followable. I usually dive into a topic first and iron out all the wrinkles later. I will definitely return to this one because there’s much more digging to be done and improvements to be made. Have a great day, everyone, and I will be back in your inboxes with a tutorial this Friday. - RC