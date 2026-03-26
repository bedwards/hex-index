---
title: "Autonomous Weapons 101 + Dario v Hegseth"
author: "Jordan Schneider"
publication: "ChinaTalk"
publication_slug: "chinatalk"
published_at: "2026-03-05T11:45:26.000Z"
source_url: "https://www.chinatalk.media/p/autonomous-weapons-101-dario-v-hegseth"
word_count: 3323
estimated_read_time: 17
---

The Anthropic–Pentagon blowup generated enormous heat and almost no light.

Michael Horowitz has thought as much about autonomous weapons policy as anyone. He’s a professor at Penn who spent time in Biden’s DoD overseeing the office that rewrote [DoD Directive 3000.09](https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodd/300009p.pdf), the Pentagon's overarching framework for autonomous weapons. He joined me to do a proper 101: what autonomous weapons actually are, how the relevant law works, what Ukraine has taught us, and where the genuine risks lie — which turns out to be less about killer drones and more about generals over-trusting their dashboards.

Listen now on [your favorite podcast app.](https://pod.link/1289062927/episode/MDcwZTI1YzAtMTY5Mi0xMWYxLTg3NzYtZjMxYzM1YzZmNGJm)

## **What Does an “Autonomous Weapon” Actually Mean?**

**Jordan Schneider:** How would you characterize where the fear lies in the well-meaning researcher or head of an AI lab who thinks their technology used for certain types of autonomy would be a bad direction to go? Maybe contrast that with how this stuff is used today in Ukraine and Iran.

**Michael Horowitz:** The average Silicon Valley AI safety researcher who’s worried about autonomous war bots is probably worried about AI making the decision about who lives and who dies. They think that’s some dystopia they don’t want any part of.

They get worried about the incorporation of AI into the pointy end of the spear for militaries, especially when it comes to potentially selecting and engaging targets. What sometimes gets lost in the conversation is the substantial degree of autonomy that already exists in modern weapon systems.

The US military and basically 40 militaries around the world have deployed autonomous weapons systems since the early 1980s. These are often automated systems using essentially deterministic, good old-fashioned AI. They’re on ships — like these enormous Gatling guns called the Phalanx — that can operate by algorithm. If there are too many threats coming in, say too many missiles about to hit a ship, an operator can basically flip on the algorithm, which can automatically target and hit those incoming threats.

[

![Phalanx CIWS Explained: How The Navy's Computer-Controlled Weapon Works](https://substackcdn.com/image/fetch/$s_!hdhu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5be4f4af-d4be-4968-acd8-372f4abe4d7f_780x438.jpeg "Phalanx CIWS Explained: How The Navy's Computer-Controlled Weapon Works")



](https://substackcdn.com/image/fetch/$s_!hdhu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5be4f4af-d4be-4968-acd8-372f4abe4d7f_780x438.jpeg)

You also have semi-autonomous weapon systems that fall into the category of fire-and-forget munitions. Think about how a radar-guided missile works. A pilot believes there’s an adversary radar that’s a legitimate target. They press the launch button, the radar-guided missile fires. After going a certain distance, it turns on a seeker, detects a radar, goes in and destroys the radar. There’s no human supervision or control of any kind after that weapon is launched. Hey, maybe that radar is on top of a school, maybe that radar is on top of a hospital.

That’s the status quo of autonomy in weapons systems. These kinds of technologies have been used since the 1980s. We tend to think they’re way better than what came before, which was the area bombing of World War II.

There’s already a lot of autonomy in weapons systems, which makes this conversation about what we don’t want AI to do in the weapons space a lot harder. It can be challenging to talk about it without inadvertently wrapping in all of these existing weapons — which we generally think are good, in the world where we support military action — because they’re both more effective and more accurate, making things like civilian casualties generally less likely.

**Jordan:** I was reading *To Command the Sky* as well as *Fire and Fury* by Randall Hansen. People forget that when those planes dropped bombs, you’d be lucky to be within miles of the thing you were trying to hit. If we’d attempted something like the Hezbollah compound explosion we saw over the past weekend using those methods, it would have caused tens of thousands of people to die as opposed to 50 or 100.

[

![B 17 Bombefly Ww2](https://substackcdn.com/image/fetch/$s_!G8an!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc91c18d0-165d-4031-ab32-f7e27a2e5b52_1512x1048.webp "B 17 Bombefly Ww2")



](https://substackcdn.com/image/fetch/$s_!G8an!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc91c18d0-165d-4031-ab32-f7e27a2e5b52_1512x1048.webp)

**Michael Horowitz:** You would have dropped tens of thousands of pounds of weapons from a couple dozen aircraft.

**Jordan:** Precision strike capabilities and drones have tightened the radius of the thing that you end up exploding. Even with drones, what we saw with what Israel pulled off — going into specific windows of apartment complexes — represents a massive change.

## **Ukraine and The Last-Mile Autonomy Problem**

**Jordan:** Let’s take the narrative forward from the 80s to the 2020s. That’s getting a little closer to the contemporary ick factor on this stuff.

**Michael Horowitz:** Now a thing that’s doable in the context of weapon systems: imagine a deterministic algorithm trained on a very exquisite dataset — say, of Russian tanks or Chinese fighters, something very specific. You can now essentially train an algorithm that can go onboard some kind of weapon system, maybe a loitering munition. It can launch, go to an area, turn on a seeker, and then look for Russian tanks. It can use an image classifier to ask, “Is that a Russian tank?” No? All right, move on to the next image — until it finds a Russian tank, at which point it will destroy it.

This is a weapon launched by a human who, in theory, is trained in how the weapon works and understands its upsides and limitations. But after it’s launched, that weapon not only operates autonomously — meaning you can’t recall it like a radar-guided missile from the 80s — but is now using an algorithm as the basis for destroying a target.

You see the early days of this in the Ukraine context. There’s so much jamming and electronic warfare happening. Ukrainian FPV pilots operating one-way attack drones were getting jammed constantly by the Russians. They’re coming up with different concepts of operation to try to get around that, or they’re working on connecting fiber optic cables that could stretch for kilometers to hit a target. But what if somebody cuts the cable?

There are now some Ukrainian weapons that essentially have last-mile autonomy. If jamming occurs in the last kilometer and the data link goes away, that weapon — trained on an algorithm that maybe has a target library of targets it’s allowed to hit — can still continue on to the target and hit it. That becomes an absolute necessity for militaries fighting in electronic warfare-heavy environments when trying to operate without access to satellites or when your equipment gets jammed.

## **What Anthropic Actually Said — And What They Got Wrong**

**Jordan:** Why don’t you give the generous reading of the Anthropic case?

**Michael Horowitz:** I actually have no problem with what Anthropic said. I think they do everybody a disservice when they use the phrase “fully autonomous weapons,” because nobody knows what they mean. Then everybody picks it up because it’s Anthropic, and it would be better if everybody used similar terminology. Words mean things.

Their position is actually very reasonable, which is that LLMs aren’t right for this. Anthropic’s actually probably correct about the limits of large language models in powering autonomous weapon systems — which is also why the Pentagon isn’t doing it right now and wasn’t talking about doing it. That’s one of the many reasons why this whole blow-up between Anthropic and the Pentagon was so needless.

**Jordan:** What are reasonable concerns model providers should have as their models get into the ecosystem that’s spinning up weapons like drones with last-mile capability?

**Michael Horowitz:** Part of this depends on what you want the role of the human to be in the context of using weapons and what you’re most concerned about. One of the things that gets lost in the conversation about autonomous weapons systems, at least for the United States, is that the US has a policy on autonomy and weapon systems. It also has both domestic legal obligations and international humanitarian law treaty obligations that essentially require human responsibility and accountability for the use of force.

That’s a requirement that exists whether you’re talking about a bow and arrow, a radar-guided missile, or an autonomous weapon system. When you start from there, things start to fall into place a little bit.

The issue is: if you don’t start from there, and what you’re worried about is AI systems making decisions about whether somebody is a lawful combatant on the battlefield and turning into kill bots — and you think that will happen without a trained commander making the choice to deploy that system in a context that they believe is legal — then you think about it differently.

But if you start from the premise that there’s always human responsibility and accountability for the use of force, and you believe that the Pentagon will follow its own rules and the law on these issues, then it becomes a question of when we think autonomous weapon systems of different types are ready for prime time. By ready for prime time, I mean systems that are as good as or better than existing weapon systems, since nobody wants their weapons to work more than militaries. Weapons that are not reliable or aren’t safe by definition don’t work well. That means military commanders and operators — where the use of these things will determine whether they live or die — are strongly incentivized to get it right.

## **The Legal Architecture for Killing Autonomously (and Its Limits)**

**Jordan:** Let’s spend a little time walking through the legal strictures that require humans to be involved in this. There have been a lot of Biden-era regulations thrown away over the past 15 months. What else besides that directive is keeping humans involved in these decisions?

**Michael Horowitz:** The thing that keeps humans involved in decisions on the battlefield actually has nothing to do with the Pentagon’s directive on autonomy and weapon systems. The Pentagon’s policy on autonomy and weapon systems is about the *process* for developing and fielding semi-autonomous and autonomous weapon systems. Whether a human is actually involved in a substantive way in making the decision about the use of force is governed by separate Pentagon policy — guidance on the use of force written by lawyers — that’s connected to treaty obligations under international humanitarian law.

Commanders and operators have to ensure that uses of force meet requirements like proportionality and distinction. This is not a case where Biden-era policy is standing between us and the kill bots. It’s a broader architecture of law and regulation surrounding the use of force that isn’t even specific to AI.

**Jordan:** I guess the question is: when you have a secretary of war telling commanders to kill everybody when they see a boat, and there’s no inspector general that exists anymore — who cares? If you’re thinking about selling something into the system, how much can you hold your hat on any of that stuff?

**Michael Horowitz:** That’s not an AI issue then. That’s a Pentagon-following-the-law issue. If you believe that, that’s not a reason why autonomous weapons systems are good or bad. That would be a reason, in theory, not to do business with the Pentagon at all — not an argument about autonomous weapons systems in particular.

## **Human Driver : Waymo :: Artillery Shell : Warbot?**

**Jordan:** This seems like an inevitable force of history. We’re going to go from one mile to two miles to five miles of range, from one person controlling one drone versus five drones versus fifty. If the drones are actually better than the sleep-deprived human on their fifth cigarette — the actual analogy is like Waymo versus a human driver — what are the legitimate ethical concerns around the war bots?

**Michael Horowitz:** In that case, the ethical arguments against autonomous weapons systems are not that persuasive, frankly — if what we’re talking about is a weapon system where there is still human responsibility and accountability. You’re telling me that system will be more effective at hitting a specific target than the 18-year-old on their fifth cigarette? That seems like a better weapon system.

Where this gets tricky is when the objection on ethical or moral grounds gets conflated with pretty legitimate concerns about whether they would actually *work*. That’s part of what Anthropic’s beef with the Pentagon was getting at — their belief that LLMs like Claude are not ready for prime time when it comes to incorporation into autonomous weapon systems.

This is part of the issue: it was not clear, and from what I know, not even true, that the Pentagon was trying to get Anthropic to develop autonomous weapons systems fueled by LLMs. This was a theoretical concern about a possible future ask from the Pentagon. Anthropic even said they think autonomous weapons systems actually make sense — they just think their technology isn’t ready for prime time on this.

Part of the challenge is that all military systems, and especially weapons systems, need to go through a testing and evaluation process — that’s how the military figures out whether a system is reliable. It’s challenging to figure out how testing and evaluation for large language models should work, especially in safety-critical use cases like potential weapon systems. There’s work on the backend that needs to occur to validate these systems, in addition to whatever advances in the systems themselves that Anthropic thinks needs to happen.

## **The Cloud vs. Edge Distinction**

**Jordan:** What do you think about this cloud versus edge distinction that bubbled up this past week?

**Michael Horowitz:** I’m actually reasonably sympathetic to a cloud versus edge distinction as important, but that’s because I am very anchored on the Pentagon’s definition of an autonomous weapon system — a weapon system that, after activation, can select and engage targets without human intervention. Unless there’s continuous human oversight of that system, by definition there is no cloud access. Effective autonomous weapon systems generally aren’t going to have data links and cloud access.

If you have a system that only operates through the cloud, then it almost by definition can’t be used to power an autonomous weapon system. You could use it to do lots of other military operational things — planning military operations, directing things. But if it’s cloud-based, it can’t operate on the edge in an autonomous weapon system. I’m actually reasonably sympathetic to that distinction, at least at a high level.

**Jordan:** So the idea being: if you think doing autonomous weapon systems is icky, but you still want to help out with command and control, logistics, and back office stuff — being in the cloud API access provision space is a relatively neat way to make that distinction.

**Michael Horowitz:** Based on where the technology is right now. Keep in mind, Anthropic is correct that LLMs aren’t ready for prime time in terms of incorporation into autonomous weapons systems. Even if you could somehow put them on the edge, it’s tough for me to imagine those kinds of systems surviving the Pentagon’s own review process. But if your system can’t operate on the edge, it can’t be in an autonomous weapons system, period.

## **The Real Worry: Automation Bias at the Top**

**Jordan:** Let’s talk about command and control. AI is smarter than me, man. What’s the point of these humans anymore?

**Michael Horowitz:** Come on, nobody puts Jordan in a corner.

**Jordan:** With autonomous weapons, the range of how bad things can get seems relatively narrow — a thing can blow up a school or accidentally turn around and blow up the base it came from. But once you start handing over more range — let’s talk about the rogue drone swarm, that seems really not great. But one or two levels up, like a rogue brigade, a combatant command...

**Michael Horowitz:** Here’s why I’m not that worried about the rogue drone swarm. Militaries, when it comes to weapon systems, tend to be relatively conservative institutions. Because of the incentive structures I laid out before and the challenges in developing good testing and evaluation procedures, the notion of a super unreliable drone swarm causing major chaos — maybe there are militaries we should worry about that for, but even in the current context, I am not terribly worried about that for the United States. The drone swarm would still have to be activated by a responsible human who would be accountable if something went wrong.

The militaries can develop standard operating procedures and training to try to hedge against this as much as possible. But the more important risk is this: if you want something to worry about more, it’s operational decision-making. We already have tools like Maven Smart System designed to be a dashboard for commanders at the combatant command level — what do the enemy’s forces look like? What does information from open sources look like? What do classified sources look like? It aggregates those things together, interpreting that information in a way that may generate increasingly specific recommendations to commanders for courses of action.

The risks there are more prosaic than we sometimes talk about. One risk is automation bias — people trusting algorithms more than they should given the reliability of said algorithm. There are all sorts of behavioral decision-making biases that get triggered if you’re just offloading more and more cognitive judgment to the machine.

**Jordan:** I’ve been using Claude Code for the past few weeks. It asks me, “Do you want to let it do this?” I say do a thing and it says, “Okay, well you need permissions, press two to give permissions.” I’ve been pressing a lot of twos. Then I Googled how to stop pressing two, and the internet said there’s a setting you can put into Claude that says “dangerously accept permissions.” Now I don’t have to press two all the time, and it just does what I want to do. It’s been totally fine so far — way more efficient, way more effective, less time.

Maybe all we have to hold onto is the idea that these are slow and bureaucratic institutions with paper trails, humans with legal liability if they screw things up, and the moral weight of killing the wrong person. But there does seem to be something inevitable about more and more parts of your work being handed over to a machine. We could end up getting to a point where we hand over too much in a dangerous way.

**Michael Horowitz:** Totally. The risk here isn’t necessarily connected to whether it’s a large language model or not. The question at the senior level is: where are the standard operating procedures, the training, the incentives that apply to warfighters in the field? They don’t necessarily apply to senior leaders.

If you really want to worry, that’s where I would worry. Senior decision-makers, uninformed about AI, trusting AI tools too much in guiding their decisions — if you want to know how things really go awry, it’s less because of AI at the pointy end of the spear and much more at the strategic level.

**Jordan:** It’s the president and defense secretary just chatting with their mil.ai, scheming up who to bomb next — that’s what we should worry about.

**Michael Horowitz:** You should feel a little bit better about everything else. Most of all, it would be helpful if everybody used the same terminology when discussing this topic. Autonomous weapons systems, AI decision support systems, automation bias — if we could all use the same words for what we’re talking about, it would be easier to have these debates.

**Jordan:** This conversation illustrates why, aside from the personality issues, I think what really tripped up Anthropic and the government was the domestic surveillance side. With autonomous systems, you can fudge a solution. I imagine Anthropic was essentially saying they didn’t want to be involved in finding undocumented immigrants. The government’s response was basically: “We were duly elected to do this. Why aren’t you letting us proceed?”

**Michael Horowitz:** I think it’s totally reasonable to be worried about AI-enabled mass surveillance. I don’t worry about it most from the Pentagon. I worry about it more from other agencies. But it’s totally legitimate.

**Jordan:** All right, let’s call it there. Thanks for dropping by, Mike.

**Michael Horowitz:** Cool. Thanks for having me.

\---

## Suggested Titles

1.  **Autonomous Weapons 101: What the Anthropic Fight Got Wrong**
    
2.  **Kill Bots, Cloud APIs, and the Real Risk Nobody’s Talking About**
    
3.  **The War Bot Panic, Explained**
    
4.  **From Phalanx to Maven: A Field Guide to Military Autonomy**
    
5.  **Last-Mile Autonomy: How AI Is Already on the Battlefield**
    
6.  **The Actual Danger Isn’t the Drone Swarm**