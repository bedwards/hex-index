---
title: "The Year of Zone Coverage"
author: "Ray Carpenter"
publication: "The Spade"
publication_slug: "thespade"
published_at: "2026-01-22T12:28:50.000Z"
source_url: "https://thespade.substack.com/p/the-year-of-zone-defense"
word_count: 2266
estimated_read_time: 12
---

Good morning everyone,

Football is a fickle sport. No team looks the same week over week or year over year. Its unpredictability is what keeps us all tuned in. In all of my time watching the sport since I was a kid, I’ve seen one common thread that connects all seasons together. Every single year, football gets more difficult.

What do I mean by *difficult?* Perhaps a better phrase would be *more intelligent.* The proliferation of analytics has enabled teams to be more prepared than ever before for upcoming games and we’ve seen one or two plays decide season outcomes. This injection of math into the sport has raised the bar in the same ways we’ve seen in other sports like F1, poker, chess, and golf. No decision is simple, all human instincts are supported or debunked by calculations. In a world where every team has the same access, how do you provide an edge to yours? This is where football veers more towards poker than chess.

I know it’s not technically over yet, but season 60 of the NFL is defined by the art of bluffing and eliminating the quarterback pre-snap read. If your defense takes away the opposing quarterback’s pre-snap read instincts, it creates a migraine for the opponent’s most important player. I’ve often seen folks complain about how the era of the pure pocket passer is gone in today’s NFL. But what if I told you it’s not any quarterback’s fault that this era is behind us? The blame lies on the other side of the ball. Today we’re going to look into league-wide trends regarding defensive coverages, and its effects on offenses. As always, feel free to like, comment, and share.

The Spade is an entirely reader-supported weekly football analytics newsletter. Lately we’ve investigated topics like the [college football transfer portal](https://thespade.substack.com/p/transferportl-predicting-college), [college football roster building methods,](https://thespade.substack.com/p/divisional-round-matchup-cards-and) and soon we’ll cover the [NFL Draft](https://thespade.substack.com/p/the-spade-live-nfl-draft-comparison) again. If all of that sounds interesting to you, I’d love to have you along for the ride, as a free or premium subscriber:

Let’s dive into zone defenses.

#### Primer

I’m going to include this section in my future write-ups to cast a larger audience net. I’m going to reference two types of football defensive coverage tactics here, man and zone. If you’re familiar with basketball, you’ll understand this terminology. Man coverage occurs when defenders are assigned to a specific offensive player, and zone coverage occurs when defenders are responsible for a certain section of the field. In the past, there have been indicators for quarterbacks on whether they’re lined up on a particular play against man or zone defense. Like we covered in [our piece on motioning players](https://thespade.substack.com/p/which-nfl-offenses-have-the-most), teams can send a receiver from one side of the field to another and see if a defender follows him or not. If no one follows, this usually means the defense is lined up in zone. If someone sprints with the receiver, this usually indicates man coverage. The ability to read coverages is crucial for success at the quarterback position in the NFL. [This podcast appearance by Cam Newton](https://www.youtube.com/watch?v=ow_veSzVQ0g) provides more info into the complexity of what I’m generalizing here, though.

Put yourself in the shoes of an NFL quarterback. After breaking the huddle and getting set at the line of scrimmage, you have roughly 15-25 seconds to figure out what type of coverage you’re facing and who might be blitzing on any given play. And as a defensive coordinator, there’s only a handful of plays you can actually run. Quick mind maps QBs use include the motion as well as reading how many safeties are playing high on the field. For example, if there’s 1 high safety and the motioning WR brings a player along with him, the opposing defense is more than likely operating in a Cover 1. If motion brings a defender and there’s 2 safeties high, that’s probably a Cover 2 play, a hybrid of man and zone where two safeties are responsible for the deep parts of the field but everyone else is responsible for a specific player. But in today’s NFL, defensive coordinators have improved at bluffing on these pre-snap reads. Maybe they send a man in motion with the wide receiver, but they’re actually lined up entirely in zone. Better yet, what if that guy follows the receiver then actually blitzes? They’ve introduced more uncertainty into the opposing quarterback’s mind which makes calling hot routes (changing individual receiver routes) and audibles (changing the entire play) even harder. It’s why you see college football quarterbacks stay silent pre-snap and just clap to hike the ball. It’s also why articles like [this one about Indiana’s ‘baffling’ zone defense](https://www.thehoosiernetwork.com/article/2026/01/indiana-football-national-championship-game-miami-zone-defense) are popular right now, and why [Mike MacDonald’s Seahawks look unstoppable right now](https://www.nytimes.com/athletic/5469059/2024/05/13/mike-macdonald-defense-approach-seahawks/) despite their quarterback throwing 14 interceptions during the regular season. Its ripple effects are seen everywhere, as I’ll show you.

This is all endlessly complex, and I highly recommend reading ‘s Match Quarters newsletter if you want some really great in-depth looks into the schematics of football. My expertise lies more in data sourcing and visualizing, so that’s what I have for you today. Can we see these deceptive defensive trends emerge on paper? Let’s look into it.

#### The Data

We’ll be using data from sources you’re familiar with if you’ve been subscribed. We’re using data compiled from [nflfastR](https://nflfastr.com/), [NFL Pro/Next Gen Stats](https://pro.nfl.com/stats/team-defense/season?sortKey=stuffPct&sortValue=DESC&season=2025&seasonType=POST&tab=rush), [StatRankings](https://statrankings.com/nfl/advanced/teams/coverage/man-coverage-rate?season=2025), and [Sumer Sports.](https://sumersports.com/) As of January 20th, 2026, the only paywalled data seen here comes from NFL Pro. The rest is readily available online if you’d like to take a gander yourself. We’re using nflfastR’s play by play data for situational context, NFL Pro’s data for advanced team defense summary stats, StatRankings for trends in man vs. zone coverage, and Sumer Sports for individual play man/zone coverage.

#### (Brain) Scrambling, TTT, Motion Rate

For all quarterbacks with a minimum of 250 dropbacks, scramble rates have increased slightly since 2021.

-   2021: 4.41%
    
-   2022: 4.52%
    
-   2023: 4.65%
    
-   2024: 4.97%
    
-   2025: 5.30%
    

Scrambling usually occurs when a quarterback bails on a passing play due to a lack of open receivers. StatRankings only has data for these 5 seasons so I realize the limitations of this look. Justin Herbert’s scramble rate is up 3.6% since 2021, to 8.5%. This is largely due to his lack of a clean pocket with Rashawn Slater missing the entire 2025 season though. Are there any other quarterbacks with significant jumps in scramble rates since 2021? Patrick Mahomes’ scramble rate has jumped 2.5% from 6.3% to 8.8%. Josh Allen’s has jumped 2.3% from 6.4% to 8.7%. Trevor Lawrence and Baker Mayfield have seen a 1.8% and 1.7% increase in their scramble rates respectively. Let’s look at every single QB who played in both the 2021 season and the 2025 season with our minimum dropback threshold. Have they experienced an increase or decrease in scramble rates? And what about other facets? If a player fails to make a pre-snap read, maybe they also hold onto the ball longer, right? And if defenses are getting better at disguising coverages, wouldn’t teams use more motion to give their players those tells that indicate coverages? Here’s a table showing how league-wide time to throw (TTT), scramble rates, and offensive motion rates have changed from 2021 to now:

[

![](https://substackcdn.com/image/fetch/$s_!QDjS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F455e13bf-5c45-4fc5-bbc4-a6c210441637_2000x1200.png)



](https://substackcdn.com/image/fetch/$s_!QDjS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F455e13bf-5c45-4fc5-bbc4-a6c210441637_2000x1200.png)

This is my attempt at an Athletic-esque style layout. Motion rates are on a steady upwards trend, so are scramble rates. Time to throw is marginally up, but nothing to write home about. I wanted to include first read target share % in this table but when I looked at the data, the 2021 season’s numbers were extremely low compared to the other years so I thought there might be an error in the underlying dataset.

I would deem this inconclusive though still. There’s nothing on here that really moves the needle for me except for maybe the motion rates. But what else can we find?

#### Man/Zone Defensive Splits by Year

What if we look at annual league-wide splits of man and zone coverage on defense? Here’s what we find:

[

![](https://substackcdn.com/image/fetch/$s_!45us!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8fd4b025-65ee-4568-bbad-38a5b6711f2e_2000x1200.png)



](https://substackcdn.com/image/fetch/$s_!45us!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8fd4b025-65ee-4568-bbad-38a5b6711f2e_2000x1200.png)

It’s a copycat league, and the league-wide average is now almost at a 70/30 split for zone/man coverage. In their divisional round win against the 49ers, the Seattle Seahawks lined up in zone coverage on 81.6% (!!!) of all snaps [(Source: SumerSports)](https://sumersports.com/live/5b3fe531-f037-11f0-9442-5911216651e2/). In all 10 playoff games this year, both teams have played more zone coverage than man coverage.

Here’s a dumbbell chart showing zone coverage rates in 2022 and 2025 for each NFL team:

[

![](https://substackcdn.com/image/fetch/$s_!KJ0k!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa22b5573-eeca-4b56-a9d9-6f9bdc45b9a1_2400x2800.png)



](https://substackcdn.com/image/fetch/$s_!KJ0k!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa22b5573-eeca-4b56-a9d9-6f9bdc45b9a1_2400x2800.png)

29/32 teams are playing more zone defense now than they were three seasons ago!

#### Play Proof

I wanted to include a clip from last Saturday’s Seahawks-49ers game to show you just how hard football is. I’ve converted it into a GIF so it appears in your email inbox:

[

![[video-to-gif output image]](https://substackcdn.com/image/fetch/$s_!sC1b!,w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3990a35-6a78-4657-89ef-183151fd07bb_800x352.gif "[video-to-gif output image]")



](https://substackcdn.com/image/fetch/$s_!sC1b!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3990a35-6a78-4657-89ef-183151fd07bb_800x352.gif)

What’s going on here? A few things:

1.  3rd & 5 for the 49ers
    
2.  Brock Purdy sends Christian McCaffrey in motion. Julian Love and(?) Nick Emmanwori follow, signaling man coverage to Purdy *against* the initial play read of two high safety (maybe cover 2 or cover 4) with dime coverage (6 CBs). But with the two players following CMC in motion, there’s an extra layer of disguise. Pre-snap, you’re unable to tell who’s covering CMC exactly. The offense knows it’s man coverage, but they don’t know if they should target the mismatch off the bat or not.
    
3.  Purdy changes the play into a man-beating one after the CMC motion signals to him it’s man coverage
    
4.  Ball snaps, it’s a cover 1 robber look designed to force Purdy to throw a shallow pass to CMC and prevent the first down
    
5.  None of this matters anyways because the Seahawks defense is so quick. Pocket collapses, secondary unit sticks to their players
    
6.  Purdy makes a great cross-body throw to Jacob Tonges for 10 yards.
    

Brock Purdy & the 49ers offense had fewer than 40 seconds to process all of this information. And this was only one play! The Seahawks defense is literally and figuratively causing headaches. I’ve been trying to analyze more NFL film in order to give you all some better context on these write-ups, and it’s a deep rabbit hole. This was an example of one of the rare occurrences of the Seahawks playing man coverage on Saturday, but upon first glance it looked like zone coverage. The motioning running back made it possible for the offense to see the actual coverage behind the disguise.

I know it’s funny of me to put in a man coverage play on this ‘Year of Zone Defense’ write-up, but this one was too good not to include.

#### Conference Championship Punch Cards

We’ve got more football this weekend, only 4 teams left. Here are the conference championship punch cards. For those who need a primer on what the stats on these punch cards mean, [please refer to last week’s write-up for a small explanation on each](https://thespade.substack.com/p/divisional-round-matchup-cards-and). Here are the matchup previews:

#### Sunday January 25th 3 PM: New England Patriots at Denver Broncos

First up, the AFC Championship in Denver:

[

![](https://substackcdn.com/image/fetch/$s_!pjYX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae83b70c-e21e-4a3b-8291-780e9978f081_1158x3352.png)



](https://substackcdn.com/image/fetch/$s_!pjYX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae83b70c-e21e-4a3b-8291-780e9978f081_1158x3352.png)

I won’t lie, things don’t look good for Denver. Drake Maye and the Patriots posted 30 points on a Houston Texans defense that looked unstoppable. It was a sloppy snow game and they were aided by CJ Stroud’s 4 interceptions, but the Broncos have to try and win this one without Bo Nix. Maybe a miracle will happen, Denver’s defense is elite in its own right and this game’s at home, but it looks unlikely. Hard to predict anything but another Patriots runaway win.

Weather won’t be a factor in this one, besides maybe the Denver altitude. The high in Denver on Sunday is around 24 degrees, with minimal wind and sunshine. Plus, I just watched Drake Maye put deep throws wherever he wanted in a snowstorm last weekend, so I don’t think it matters much.

#### Sunday January 25th 6 PM: Los Angeles Rams at Seattle Seahawks

Now this one’s a little bit murkier. Another NFC West matchup in Seattle:

[

![](https://substackcdn.com/image/fetch/$s_!lW1b!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F558a6bd3-3c9c-49af-a64a-cadba8a1eb74_1158x3352.png)



](https://substackcdn.com/image/fetch/$s_!lW1b!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F558a6bd3-3c9c-49af-a64a-cadba8a1eb74_1158x3352.png)

Weather looks like a non-issue, with highs of 42 degrees in Seattle around that time and only a 5% chance of precipitation.

Last time these two teams played in week 16, the Seahawks won 38-37 in overtime at home. The Seahawks should win this one again depending on the largest IF perhaps in history. IF Sam Darnold can limit the number of interceptions he throws, the Seahawks will win. Of course.

But, Sam Darnold has thrown 6 interceptions against the Rams in 2 games this season. Chris Shula and the Rams defense have had his number this season:

[

![](https://substackcdn.com/image/fetch/$s_!-7nO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa107704e-b944-4359-ba22-de5119e618f5_2800x1600.png)



](https://substackcdn.com/image/fetch/$s_!-7nO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa107704e-b944-4359-ba22-de5119e618f5_2800x1600.png)

I know it’s silly to use ‘green = bad’ on this one, but I thought the team colors looked neat.

I just spent this whole write-up explaining that the Seahawks are masters at running a tricky defense, but you can’t fool the guy who’s seen everything. Matthew Stafford and Sean McVay will find ways to score in this game, whether they have to invent them or not. NFC Championship games don’t get better than this one. Two prolific passing offenses, efficient rushing attacks (although the Seahawks will be without touchdown specialist Zach Charbonnet) and two innovative defensive play callers in Chris Shula and Mike MacDonald, respectively. This one’s going to be close, and a dropped pass or clutch interception could decide the whole thing. I picked the Patriots for the last game, so surely I should balance out the scale with a 1 seed/home team playoff win here. I think Sam Darnold finally gets over the Rams hump. But I don’t blame anyone for choosing the Rams here. Remember how I said Darnold threw six picks in two games against the Rams this year? Matthew Stafford has thrown zero in both of those Seahawks games. This is the unstoppable force vs. the immovable object manifest.