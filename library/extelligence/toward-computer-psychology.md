---
title: "Toward Computer Psychology"
author: "Some Guy"
publication: ""
publication_slug: "extelligence"
published_at: "2025-09-09T12:45:35.000Z"
source_url: "https://extelligence.substack.com/p/toward-computer-psychology"
word_count: 2256
estimated_read_time: 12
---

[

![](https://substackcdn.com/image/fetch/$s_!YyXP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd4b046e-490c-4517-9eeb-19dc08bedfa5_1536x1024.png)



](https://substackcdn.com/image/fetch/$s_!YyXP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd4b046e-490c-4517-9eeb-19dc08bedfa5_1536x1024.png)

### The State of Me, Computer Psychologist

I always assume that I’m the dumbest person in the room until proven otherwise. This is better understood as a neuroses rather than humility. If you ask me if it’s *likely* I’m the dumbest person in the room, as a purely intellectual question, I would do some hemming and hawing before answering with some form of, “Probably not.”

Whenever I open my mouth, however, I expect people to look at me like I’m stupid.

I’m a bad talker, especially when sleep deprived. I’ll say something and people will immediately disregard it and *I’ll think, there I go again, opening my big stupid mouth*. It can be really bad. Sometimes someone will repeat my actual words back to me and then I’ll fall over myself trying to correct… *myself*.

This is an exaggerated example of me explaining how to count to ten:

*In my mind: 1,2,3,4,5,6,7,8,9,10 but done immediately before moving onto another topic so it’s no longer stored in my brain that way.*

Out of my mouth: “Seven. Oh sorry, you’re right you need six first. I’m just saying don’t forget the reason you’re doing that is to get to nine and then ten. Does anyone remember that cartoon Voltron? That music went so hard. It’s incredible how that was the level of quality for a children’s cartoon a few decades ago. But you *feel* this sense of progression listening to that music just like when you’re counting, yeah? The music is *going* somewhere. Oh yeah yeah, *start* with one. I’m not saying don’t start with one. One is essential. One sets up the whole thing. That’s a given. Duck Tales is another banger, it’s been almost four decades and I can still remember almost all the lyrics. ‘Whoo-oo’ just speaks to me somehow but it *starts* by analogizing life in the city of Duckburg to a hurricane. Why’d I start at seven then? Well, the tricky part is seven. Seven is how you bridge between six and eight and that’s where our core value is at. It’s the last odd number in the single digits that’s prime. Seven *ate* nine? Don’t you see? Um… I’m not saying this right. Oh man! You know what I haven’t thought about for years? Darkwing Duck! I guess maybe that’s why I’m skipping steps because it lives in the same place in my head as Darkwing Duck, just taken for granted. What about three and four? Yeah yeah. I think I forgot to mention those. Does that help? I might have forgotten to say that earlier. And yeah, two, as well, I guess. I thought that went without saying. I’m sorry, that’s in me. What are we missing? Did I say five yet? I mean to say five earlier! And ten! Ten! Of course, ten! That’s it. It should obvious now. Anyway, those songs really help motivate me. I have them on my gym playlist but I haven’t really gone to the gym since the kids got here. The same as the motivation felt when counting to ten. Our big takeaway should be that counting to ten involves a generalizable trick where you simply iterate the previous number by one.”

Listening to someone talk like that usually leaves people with the assumption, “This guy can’t fucking count to ten.” That feeling is usually right but in my case mostly wrong. I’m not a good talker, or at least not a great talker. I can practice my way out of it, which is why writing is so helpful to me. I feel it in particular as I agonize over PowerPoint slides.

If you look at my test scores, while I’m relatively high in linguistic ability, it’s a standard deviation or two lower than my mathematical ability. So I often have the experience of *immediately* knowing something and not being able to explain it to anyone else without saying something like “I forget the standard term, but the jumblediwumbliness of those numbers won’t be visible under that sampling method. If you think about the pickediwickidiness of how you’re drawing those numbers out of… let’s call it a puzzle bag, it’s going to give you a false reading of positive value.”

If I did not have a long track record of being correct when everyone was sure I was wrong, it would be a lost cause.

I’m going through this right now with some brand new LLM implementation techniques I’ve been proposing. They keep working and everyone is surprised. Thankfully this is the value of having a good reputation, as without it I think I wouldn’t be able to get any of it done. A lot of that is reputation I had to build up to *myself* just to have the confidence to act. You have to do a lot of cycles of “Okay, I know I sound like a moron but I’m not” to get to that kind of a relationship. I work with some really great folks who tolerate me because we’ve been through the shit together.

I haven’t even dropped this one yet, but this is an example of the kind of thing I’m talking about:

Run a performance test where…

All the json keys are named as initially assigned.

All the json keys are named in strings of whole words.

All the json keys are named in strings of alliterative words.

All the Jason keys are named in strings of rhyming words.

If you talk to a programmer that’s a really stupid test to be performing. It doesn’t matter what your json keys are named. Be serious! However, if you’re me, and you’ve spent a lot of time thinking about what it’s like to be an LLM, then you consider that the way an LLM “experiences” reality is by token which is roughly analogous to a whole word, and that if you have something like *faqset34jrespository* versus *frequently\_asked\_question\_thirty\_four* one of those might make a lot more “sense” when read by an LLM than the other and produce fewer hallucinations. Now imagine all of your json keys internally rhyming or starting with the same letter. Those are things that speak to a relationship between tokens that *must be* inside of an LLM, that an LLM might be able to “grab onto” and “remember” better so that it hallucinates less. An LLM inherently “understands” the relationships between words because that’s what an LLM *is*. The whole thing is a mind crystal made out of the relationships between words! If you’re using an LLM to classify things and return values out of a longer list this might give you a few percentage points of increased performance just by the changing the stupid key name.

Does *fun\_financial\_facts* or *tracts\_of\_facts* outperform *faqset34jrespository* or *frequently\_asked\_questions\_thirty\_four*?

I have no idea if this will work but it’s easily testable, and is an example of something I would put forward for us to do that other people might think is a waste of time. I could imagine doing something like this to assist someone with a damaged memory who was trying to navigate their daily life and needed a little special trick to aid recall and sense-making. I don’t get to this through any computer science methodology at all, but solely through trying to conceive of LLM’s as things that have a particular really weird psychology.

This doesn’t seem like something that could ever be a trade secret so I’m sharing it here as an example.

My work has completely taken over my life because there’s just not a lot of LLM expertise in industry implementations. There’s a huge bottleneck on talent. I appear to be riding the top of a wave of this shortage. I’m a weird guy, I have probably a lot of suboptimal behaviors, but I *can* think and figure things out that are brand new without having to be told what to do by someone else. So right now, for roughly twelve hours a day, being roughly the best person available, I keep having to host back to back meetings where I say something like, “Yeah, remember that thing I told you a month ago? The reason we did that is so we could do this other thing. I forgot to tell you. But yeah, that’s how we turn this into a George Jetson job where the whole thing can be reduced to a button click and the form will fill out itself. I wanted the data to be packaged up that way so we could share it yada yada yada.” As this keeps working, I keep having to talk to more and more senior people and there have been a couple of real “holy shit” moments.

The point of all of this isn’t to brag, but to give everyone a sense of stuff that’s coming. It takes a bit for industries to figure things out and for the “one dumb trick” solutions to be broadly shared. LLM’s are *not* useless. They’re just not magical. You can make something work and have it take months or years for people to actually believe and understand what you’re telling them. I seem to be among the very first group of people to figure out how to do some of this stuff at a big company. I’ve looked around and no one else seems to have figured out my dumb bag of tricks, but they almost certainly will. The world will change from this.

I simultaneously hate how much of my life this has eaten in recent days, and I know that’s going to continue until something like the middle of next year. Every waking hour I’m not with my kids I’m working on this project. It’s slowed work on the Trust Assembly and this substack very significantly. The way I’m reconciling that to myself right now is that if I can become “the guy who did that one thing that was very big and it worked and was extremely profitable” it probably makes it easier for me to get additional funding and I’m trying to get my kid brother involved to keep it going. If I receive sufficient promotions I could also self-fund and do the whole thing as a non-profit, which would make it a lot easier.

But also, again, please oh please substack will you just do it? Come on Chris! Hamish! Jairaj! You *know* you want to remake the news!

I’m praying to know the right thing to do and maybe God gave me this opportunity so I could build credibility. I’ve spent some time thinking through the consequences of what I’m doing and what would happen if other companies used the same techniques, and all I come away with is that everyone would get much better and much faster customer service with many fewer errors. Probably health insurance companies would be much easier to work with for everyone. Some jobs go away but some new and better jobs get created. We’re building around the psychology of a weird new type of creature.

Anyway, no matter how many times I’m proven correct that seven was the *actually* tricky number that we really needed to understand, it just seems like a weird dream to me that has no consequence on my identity. I’m still an idiot. I just got lucky, once. And once more. And once more. Hopefully, I don’t fall flat on my fact at some point during this process. I need to not lose sight of what’s important.

### Voting Polls

**Essay about Internet Voting:** A mishmash of thoughts about how different upvote, downvote, other “like” schemes on the internet work and what the incentives are that are produced from those.

**Giant Panpsychism Essay:** A giant effort post I’ve been working on about panpsychism inspired by the shrimp discourse, but which now has nothing to do with the shrimp discourse.

**Personal Essay, Baby Strength:** The story of my little brother and sister being born and redeeming me from being a total piece of shit after my parents divorced.

**Sermon to Tracing Woodgrains**: Similar in feel to Meditations on Metatron that I wrote for Scott Alexander, this would be a sci-fi feeling essay about what happens if you actually have the ability to turn yourself into a fox and why there is a God even if you’ can’t Him in a way that you find to be immediately emotionally satisfying.

**A Horror Story about “Magic:”** I haven’t fully fleshed this one out but my horror stories are actually the most popular things I’ve ever written on the internet. Would be the story of a college student engaging in “fun” rituals that “don’t actually do anything” except over time she realizes that they worked in the sense they completely degraded her belief in the good as an actual force in the world. Would set this in England as a reflection of the problems over there where people seem to have lost their goddamn minds. There’s a demon involved and gives a very spooky speech at the end.

**Ghosts of Grays Harbor:** A collection of common stories I heard growing up about supernatural experiences in my hometown. Including my uncle Mike seeing Billy Gohl’s ghost with all the hundreds of people he killed in an abandoned building while he was dropping LSD at thirteen. The Wynoochee Wild Man would be featured as well as others.

**Niche Internet Microcelebrity:** How I became a niche internet microcelebrity in college and it was really not good for me and I wish it hadn’t happened. Would feature some real dirtbag moments from me.

**Two Helicopter Crashes:** would feature my aunt, who has had two helicopters crash in her backyard and just sort of emotionally deals with things in a healthy way.