---
title: "Getting Ready to Launch"
author: "Kent Beck"
publication: "Software Design: Tidy First?"
publication_slug: "tidyfirst"
published_at: "2025-10-29T13:03:34.000Z"
source_url: "https://tidyfirst.substack.com/p/getting-ready-to-launch"
word_count: 955
estimated_read_time: 5
---

Sponsored by [CodeRabbit](https://coderabbit.link/kent-beck)  
  
Teams using CodeRabbit report 50%+ reduction in code review time. It’s not just automated linting—it understands your codebase, learns your team’s patterns, and provides contextual feedback that actually matters.  
  
SOC2 Type II certified. Zero data retention.

\---

When I was a young engineer, I worked with the team at Tektronix about to launch the LT-1000 semiconductor tester. There was way more to do than there was time, but every morning all 100 engineers would gather in a big conference room, stand in a circle, & report status.

“What a waste of time!” thought young me, “why are we yapping when we’re so far behind?” Ah, youth.

Now that launching is cheaper than ever, I’ve been talking to a slew of teams launching new products. I’ve been reminded of that long-ago launch & the wisdom embedded in the practices I participated in without appreciating.

Pre-launch is its own game of engineering, with its own constraints, its own incentives, & its own tradeoffs. Here’s what I know about the engineering of launching well.

## Count Down

How many calendar days to launch? Everybody should know this number without being told.

Don’t start the countdown too soon. You aren’t going to be working sustainably pre-launch. Start at 30? Too soon. Start at 5? Too late. You want to capture the pre-launch energy & direct it profitably.

## You’re Fine

If you had to launch with what you have today, you’d be fine. (If you really wouldn’t be fine, then you’re launching too soon.) By the time you start the countdown the product should be usable. Bugs are fine, expected. Some slowness is fine, expected. (Know how you scale though & have a plan to throttle usage.)

It’s so easy to panic & say, “If we don’t have *this* ambitious feature, the launch will fail.” Nah. It’s not *that* important. Know that everyone will be thinking this about everything they do. And they will all be exaggerating. That’s just what a launch countdown does to engineers.

## Less Upside, More Downside

The fundamental change of constraints during launch countdown is that there is way more downside from mistakes than there is upside from new features. You’ll have many new stresses on the system, less time to validate changes, & greater cost from errors than ever before.

The rest of the advice here supports avoiding costly errors while still getting the most important changes made.

## You’ll Never Get Everything Done

It’s not just that there isn’t enough time or enough people. It’s that every completed task spawns 2 more tasks (or 5 more if you’re working on the UI). So forget about killing yourself trying to get everything on your list done.

Again, everyone on the team is feeling this. Remember, you’re fine. If you were fine, what would you do? You’d be conservative about the tasks you take on, you’d be conservative on how you implemented them—maybe not as perfectly thorough as you would have been a month ago, but you’ll make sure nothing bad happens. And you’d offer to help others.

## Over-communicate, Over-coordinate

The wisdom of the big daily standup is that you trade a little production for a lot of insurance. If you & I are changing the same code, it is way better, pre-launch, to know that sooner rather than later. Under ordinary circumstances we’d have time to recover. Now we don’t.

Extend communication & coordination to your hourly workflow. Pair & mob more, even if you don’t usually. You’re not going to get everything done anyway, so you may as well buy some more insurance by working more closely.

## Stash Big Ideas

One frustrating aspect of the launch countdown is that big ideas have a habit of lurking until called from the deeps by the enhanced energy. You’ll think, “Oh NOW I see! We could totally rearrange the whole thing & it would be SO MUCH BETTER!”

Yeah, no. Not now. Keep a Fun List. Write those ideas down. Even share them with the team (this will be happening to everyone). But for goodness sake, don’t act on these ideas.

There is an exception. If the big idea will truly transform the demo, & it can be implemented without ANY risk to the existing functionality, & you all agree that you don’t mind what you’re giving up by implementing the big idea, & you can pretend it didn’t happen if it doesn’t work, then go ahead. That’s a lot of conditions, & for good reason.

## Connect Socially, Sleep, & Exercise

It’s tempting to try to just work more hours to try to overcome the impossible constraints of pre-launch. Don’t. Fatigue leads to mistakes & as I’ve been trying to tell you every which way I can mistakes are uniquely expensive pre-launch. If you’ve worked 9-10 focused hours today, speaking as your employer I would much rather have you spend a couple of hours with your spouse & your kids than to have try to grind out a tiny smidge more functionality & put the launch at risk.

It’ll be hard to sleep. That’s a good sign. You’re activated. Sleep anyway. Exercise. That will help you sleep. Help you stay clearer to make fewer mistakes.

## It Will All Be Over

Having watched 5 kids being born, I’ll bring in a lesson from labor coaching. This won’t last forever. There will be a time, in our case a set time, when the pre-launch stress & jitters will be over & the product will be launched. This tension, this stress, won’t last. Which is good because it can’t last.

## Conclusion

Pre-launch is a special time. It’s heightened state of engineering. There’s more energy. You’ll be telling stories about this for years, maybe decades.

I’ll close with this sage bit of wisdom.

Have fun!