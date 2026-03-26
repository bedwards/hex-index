---
title: "The Future of Secure Telecom"
author: "Jordan Schneider"
publication: "ChinaTalk"
publication_slug: "chinatalk"
published_at: "2025-11-25T13:41:29.000Z"
source_url: "https://www.chinatalk.media/p/the-future-of-secure-telecom"
word_count: 9026
estimated_read_time: 46
---

In the wake of Salt Typhoon, what does the future of secure telecom look like?

To find out, ChinaTalk interviewed John Doyle, a former Green Beret who spent a decade building Palantir’s national security practice before founding [Cape](https://www.cape.co/?g=cg), which calls itself “America’s privacy-first mobile carrier”. Also joining the conversation is Dmitri Alperovitch, chairman and co-founder of Silverado Policy Accelerator, founder of CrowdStrike, and an angel investor into Cape.

**We discuss…**

-   **Why telecom data is so valuable to adversaries, and what China discovered in the Salt Typhoon campaign,**
    
-   **Cape’s founding thesis, including what makes Cape’s cell network so much more secure than major providers like AT&T,**
    
-   **How wars are run on commercial cell networks, and how Russia and Ukraine’s reliance on that has been exploited over the course of the war,**
    
-   **Other instances of telecom data weaponization, including by Hezbollah, Israel, and Mexican drug cartels,**
    
-   **Taiwan’s plan for dealing with undersea cable sabotage,**
    
-   **What it takes to cultivate engineering talent in telecoms, and why Huawei has stayed innovative while US providers stagnated.**
    

**Listen now [on your favorite podcast app](https://link.chtbl.com/chinatalk).**

***Thank you to Cape for sponsoring the episode.***

[

![](https://substackcdn.com/image/fetch/$s_!P7nM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F314a261e-a92f-4959-8569-7515236bb3bf_1600x853.png)



](https://substackcdn.com/image/fetch/$s_!P7nM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F314a261e-a92f-4959-8569-7515236bb3bf_1600x853.png)
*[Source](https://www.cape.co/blog/building-the-future-of-mobile-privacy?g=4b).*

# Why War Runs on Commercial Cell Networks

**Jordan Schneider:** Dmitri, why don’t you kick us off — what was Salt Typhoon all about?

**Dmitri Alperovitch:** Salt Typhoon came to the fore in late 2024, maybe a little bit earlier, when the government discovered there was a huge compromise of major telcos — AT&T, Verizon, and others — by China. Specifically, a Chinese contractor in Sichuan that they ultimately sanctioned for this effort. They were breaking into telcos to get access to call records, sensitive information that telcos have to facilitate law enforcement operations, and voicemails of key political figures. There were revelations that they targeted the Trump campaign in particular during last year’s election.

At the time, I was serving on the Cyber Safety Review Board, which was tasked with investigating Salt Typhoon. The Cyber Safety Review Board is an executive order-created board within the government that combines private sector members with government members to investigate major national security-impacted cyber intrusions. I was actually shocked in the course of our work that the government was shocked. If you know anything about signals intelligence agencies, the first thing you would do is go after telcos. That’s where the crown jewels are. John knows this well from his military career — it’s an invaluable source of information and intelligence on your opponents or adversaries. The idea that no one had seemingly asked, “Would China do this to us?” was baffling. As we’ve seen in revelations from various leaks like Snowden’s, this is something the US intelligence community might be doing to our adversaries. Why would we be shocked that China would do this to us?

That was surprise number one. But in general, I’ve been concerned for many years — and that was one of the reasons I got so excited about investing in Cape — about the fact that our mobile devices are arguably the most valuable source of information about us. They contain really sensitive information: they track our location, have access to cameras and microphones, and contain text messages. People usually put things in text messages that they don’t even put in emails. The telcos have the location data, call records, voicemails, and they can do many things without our knowledge or control.

One of the things we investigated on the CSRB prior to the Salt Typhoon investigation was a cybercrime group called Lapsus$. It was a bunch of teenagers who broke into most of the major companies around the world — Microsoft, Nvidia, and others — with almost no technical skills, primarily leveraging a technique known as SIM swapping. They would bribe or, in some cases, threaten employees at telcos, or oftentimes resellers of telcos, to initiate a SIM swap. A SIM swap is essentially when your phone number gets cloned to another device. It’s a completely legitimate technique when you get a new phone, lose your phone, or upgrade your phone — you initiate a SIM swap where a new SIM card is activated in a new device for you.

But threat actors like Lapsus$ have been doing this surreptitiously to essentially clone your phone number and get SMS two-factor authentication on that device. This would allow them to VPN into companies if they were able to social engineer a password reset through the employee help desk, as these guys were doing. Many companies around the world are still relying on SMS-based authentication, and it seems like every financial institution, in my experience, is still using SMS and not even providing other forms of authentication that are more secure.

I was very concerned that telcos and phone makers have all this information about you and can do pretty much anything they want with it. The telcos in particular can resell it and violate your privacy. From a security perspective, threat actors can break in and tap into those sources of data, and there was nothing you could do about it. Then John came along with Cape and actually offered a solution.

**John Doyle:** Dmitri just gave basically the entire initial investment thesis of Cape. The Salt Typhoon story has been an enormous focus for us. Three and a half years ago, when I started the company — well first, I should give a little bit of background. Cape is a cellular network. If you’re an AT&T subscriber right now, you can switch and become a Cape subscriber. We’re a worldwide cell network focused on improving privacy, security, and resilience over commercial cellular above [the industry baseline](https://www.cybersecuritydive.com/news/fcc-eliminates-telecom-cybersecurity-requirements/806052/).

The Salt Typhoon story is interesting for many reasons. Three and a half years ago, when I was out trying to raise a seed round to start Cape, I would say in pitch meetings, “China has completely infiltrated the telecommunications networks. China has full visibility into what you’re doing with your phone.” People didn’t quite laugh you out of the room. We had been down the Huawei road, and people were aware of some of the vulnerabilities, but it didn’t quite hit home the way it has since the Salt Typhoon news broke. Now we’ve all learned unequivocally: China has completely infiltrated the cell phone networks and can watch everything you’re doing on your phone.

The other thing I would underscore from what Dmitri said is that in his very adroit two-minute introduction to the problem and to the company, we covered SIM swap attacks, carrier breaches, and insecure two-factor authentication over SMS. Your takeaway there is that this problem is really broad. There’s not one specific vulnerability we’re trying to patch. We’re not just trying to patch SolarWinds and then we’re done. This is a literal PhD field of study: what’s wrong with the protocols that run the global cell network, how can they be exploited by bad actors, and how do we remediate them? It’s endlessly interesting, and there’s no shortage of work for us here at the Cape team. But those are some really good examples of why this is a problem.

**Dmitri Alperovitch:** I should pat myself on the back by saying that I invested long before Salt Typhoon ever manifested on the scene.

**John Doyle:** That is true. Dmitri saw it also. Full credit.

**Jordan Schneider:** By way of more introduction, I want to shift the camera over to Ukraine. One of the really remarkable things about this war is the amount of commercial cell phone usage happening on both sides of the front. It has always struck me as a big puzzle because obviously, you turn a phone on and then people can find out where you are and can try to kill you. But at the same time, the utility of these phones is just so important over the course of this war that people are willing to take those risks and put themselves in situations where the cost-benefit ends up on the side of choosing to use your cell phone — and not just because you want to swipe TikTok in Bakhmut or whatever. John, why are soldiers in Ukraine using them as well? Clearly, Americans are not going to stop using cell phones, but why?

**John Doyle:** It’s a really important question, and there’s an important insight underneath it: wars really run on commercial cellular networks. When I was in the Army from 2003 to 2008, we were in Iraq, and I was a communications guy on a Special Forces team. I would jump out of airplanes with 160 pounds of radio equipment in a rucksack between my knees. Every single time, I also had a cell phone in my cargo pocket. Despite all that — probably hundreds of thousands of dollars worth of communications gear — the thing I knew would always work every time I turned it on was my cell phone. \[A quick note from John from the future: In a minute, Dmitri is going to make a joke that made me feel like this rucksack story implied that I have jumped into combat. I want to be clear that I’ve never done a combat jump. I’ve only jumped in training. I’m being careful because I don’t want to claim more cool guy points than I’m entitled to. But I do stand by my broader point, which is that cell phones have been an informal part of the comms plan, at least since I was in the army.\] That network’s only gotten better and better.

The telecommunications network is the best communications platform we’ve ever built. The iPhone is one of the best products ever built. It’s so ubiquitously adopted that you see things like Ukraine, where — as a quirk of history — Russia was invading Ukraine literally as I was checking into the WeWork to start Cape in 2022. Like everyone, we watched that unfold on TV. One of the really surprising early revelations was that the Russians were leaving physical cellular infrastructure intact as they advanced into the country. The reason we learned quickly was that they were relying on their cell phones at least as heavily as the Ukrainians were.

To this day, both sides are fighting the war primarily on commercial cell, despite the fact that they’re literally targeting missile strikes against each other based on cell phone location data. That’s how deep the adoption and — you could say — addiction to cellular devices as a communications platform runs.

We saw an interesting turn in the story in June of this year when the Spiderweb attacks happened. That’s when the Ukrainians snuck drones into Russia, woke them up, and piloted them remotely over Russia’s own commercial cellular network to hit strategic bombing targets in a really spectacular attack. When Salt Typhoon happened, everyone asked, “Why are we so surprised this happened?” Spiderweb is another moment where we thought, “Wait, of course this is a way to carry out a really spectacular attack.” It was a highly successful attack and it relied on the commercial cell networks.

Those are just proof points for the thesis we’ve had at Cape from the very beginning: even in times of conflict, even in the most acute of circumstances, people turn to the cell network first. That’s good because it’s amazing and performant, and we know how to use it — for all the reasons that we love cell phones. As long as you fix what’s broken, and that’s where we come in.

**Dmitri Alperovitch:** I can provide a few more anecdotes. As you know, Jordan, I’ve been pretty involved in analysis of this war and talking to folks in Ukraine on a daily basis. With Spiderweb, one of the things that’s actually been a trend line in Russia — not just with Spiderweb, but with these other long-range strike attacks on infrastructure from Ukraine — is that the Russians have been turning off cellular networks in particular regions whenever they detect a drone strike. Both cellular networks and the internet itself may get turned off regionally whenever they see a swarm of drones coming toward a particular set of infrastructure.

On the other side of the equation, the Ukrainians have been using cellular networks as part of their air defense missions. With these swarms of Shaheds coming every single night into Ukraine, they have mobile units all over the country that are chasing them, trying to track them, trying to shoot them down, often communicating via cellular networks. They have a huge network of acoustic sensors all over the country to detect the motor, which is pretty loud — it’s like a lawnmower in the sky. The Shahed drones are detected and tracked, oftentimes communicated over cell networks.

A couple of years ago, there was a major hack and disruptive attack against Kyivstar, the largest telco in Ukraine. There was speculation inside Ukraine that it was an attempt to impact that air defense network. At the same time, they were launching huge missile and drone attacks into Ukraine in a somewhat coordinated fashion. It’s very tightly linked on both sides to defensive measures against these drone attacks.

A couple more anecdotes for you. On my last visit to Ukraine, I went to visit senior officials in the Defense Ministry and the intelligence agencies. I was completely shocked that in nearly every single case, these officials — the first thing they do when they sit down — take their phones out of their pockets and put them in front of them. In every meeting, I was thinking, “Thank God you’re not fighting the United States of America, because we’d all be dead right now.” They’d identify us by geolocation, and missile strikes would go into these buildings. The lack of OPSEC at the highest levels and operational levels is just absolutely mind-boggling.

The SIGINT that’s active on both sides — on the Russian side, on the Ukrainian side, both against strategic and tactical use of cell phones at the front — is mind-boggling. The type of information they’re able to collect is absolutely insane. I’ve seen what the Ukrainians are collecting against the Russians. Hopefully, when the United States fights, there’s a little bit more OPSEC involved. I was actually surprised to hear that John was able to take his phone on missions because usually it’s prohibited in the US military, and people do get in trouble for it. But it’s hard to enforce, particularly when there are few other ways to communicate reliably, as John said.

One other anecdote I heard from folks in the intelligence services — during the initial invasion in 2022, the Russians left the cellular infrastructure intact so they could use it for communication, but they were bringing in Russian phones. Ukrainians identified Russian forces because new phones were activating on the Ukrainian networks. The Ukrainians immediately pulled every single new phone that was activated on February 24, 2022, inside Ukraine and started geolocating them. Lo and behold, they would find command posts and immediately target them with artillery strikes. A lot of Russian generals died because of that heuristic.

**Jordan Schneider:** Is this how they got the moms’ phone numbers to start texting them to tell their kids to come home?

**Dmitri Alperovitch:** I think that was done by capturing phones off the dead. By the way, the Russians quickly got wind of this tactic and instead started stealing phones from the Ukrainians to defeat it. But then the Ukrainians responded by building social media bots where you could easily submit a notification that your phone was just taken by the Russians, which would immediately flag that phone as suspect.

**Jordan Schneider:** I want to stay on why John brought his phone on missions.

**John Doyle:** Thank you, Jordan. I really like to defend myself on this point. Dmitri just low-key instigated an Article 15 investigation retroactively into my military career. The phone was switched off, first of all. Second of all, there’s a story I love to tell. When I left Palantir to start Cape in 2022, I talked to a teammate of mine, a guy who was an alumnus of what we call Tier One Special Operations Forces — the elite of the elite, the folks who really do this stuff at a high level. I told him in broad strokes what my idea was, what I was working on, and how I was thinking about the problem. He laughed out loud and said, “Man, we always had this rule — you’re not allowed to take your cell phone on the objective. And every single time we took our cell phones on the objective, because we knew if you really got in trouble and needed to get help, that’s the best way. You flip on your cell phone, you make a phone call.”

I’m not saying it’s right. I’m not going to argue that the policy wasn’t to leave your phones at home. But I wasn’t the only one toting a cell phone — and it was always off.

**Dmitri Alperovitch:** That’s a good point.

**Jordan Schneider:** Well, look, Al-Qaeda and Iraq’s SIGINT capabilities are not quite the same as the Russians or the Chinese.

**John Doyle:** Right. China’s capabilities were essentially the reason we were able to raise money to start this company. That was basically the market insight — the vulnerabilities in the cell phone network accrued to our benefit from a national security perspective for a long time when we were focused on counterterrorism. Everyone was happy to understand the network from that position, and it only ran in one direction because Al-Qaeda and ISIS were not technically sophisticated enough to turn the tables.

But when the Pentagon shifted focus to China and Russia as primary adversaries, all of a sudden, we were facing technically sophisticated foes. Those vulnerabilities were suddenly relevant in both directions. This problem that had been interesting for a long time suddenly became a DOD problem. Defense tech was a big booming industry, and you’re able to raise money if you’re working on important problems. There was nobody building in this space, and that’s basically how we were able to get the company off the ground.

**Dmitri Alperovitch:** John, good OPSEC is so hard to do. We saw this just this summer during the Iran-Israel war. Based on open-source reporting, the Iranian commanders were smart enough to know that they shouldn’t carry cell phones, but their drivers didn’t. Effectively, because their drivers were taking them everywhere, the Israelis knew exactly the locations of the meetings and were able to target them in real time. It’s just so hard to do because these things have become almost an extension of our arms. If you leave it behind — John and I know this from going to SCIFs for classified briefings where you can’t take a phone into a SCIF — you feel naked. You’re thinking, “Oh my God,” even though you’re only in there for a few hours.

**John Doyle:** Or the kids’ school needs to get in touch with me.

**Dmitri Alperovitch:** Right, exactly. It also takes you back to the Stone Ages. I remember I had a meeting inside a classified facility — you can’t bring your phone into the cafeteria — with someone once years back, and that person had an emergency and had to cancel. But I had no way of knowing. They couldn’t contact me. I didn’t have a cell phone. I couldn’t check my email. I was waiting for them until I finally gave up. It was like, “I remember this from the ’90s before cell phones” — it was really problematic. You don’t think of it anymore, how that problem got solved. Those are places where you can’t bring your cell phone, and it’s still a huge issue.

**John Doyle:** Yeah, it’s the classic seniority question — how long do you have to wait if someone’s not showing up? Do you give them 15 minutes? Do they get 20?

The point about the Iranian drivers is an important one, and it’s interesting to bring that home to the US. Our equivalent of that is the folks who maintain the hypersonic missile systems, or the people who go in advance to catch the bombers when they’re flying. It’s the same problem. The operational security of those folks is just as critical as the people on the pointy end.

When you realize that — as you rightfully have — and you see that the problem has gotten quite large, you need a solution. The solution is not to tell people not to use their cell phones. Even Sergeant John, who would go on to found a company dedicated to this problem, couldn’t be convinced to leave his phone at home. Not only that, but people won’t even endure a degraded user experience on their phones. If you hand them a work phone where they can only download six apps, people will just buy a burner and take it also.

The way we think about that problem is we hold as a design constraint that your phone has to work just like any premium cell service. Otherwise, people will have a shadow phone and you can’t solve the problem. That is hard. It means we have to do a lot of really technical work at the network layer in particular. But it’s also the only way to get at the root of the issue.

**Dmitri Alperovitch:** Education doesn’t really work on this thing — not just because of the huge value you get from a cell phone, obviously in war zones or otherwise, but also because so many people just don’t appreciate how much data is stored on them and what can be done with this data.

Another anecdote from Ukraine — an FBI agent told me that in the first six months of the war, they had all these exchanges where Ukrainian intelligence folks were coming over. They would go into the FBI headquarters building — the Hoover Building — and of course you have to leave your cell phone in the locker at the entrance of the Hoover Building. All the Ukrainian intelligence folks were asking, “What is this? Why do we have to do that?” These were intelligence community folks in Ukraine who did not appreciate that you have to do this. The agent told me that on his next visit to Ukraine, when he went into an agency building, they suddenly had lockers too.

## Cartels, Hezbollah, and Call Data Records,

**Jordan Schneider:** John, you mentioned Russia and China. If we’re worried about them, how are the cartels with their surveillance capabilities?

**John Doyle:** Oh man, it’s a great question. There was [a recent story](https://www.reuters.com/world/americas/sinaloa-cartel-hacked-phones-surveillance-cameras-find-fbi-informants-doj-says-2025-06-27/) out of the US Embassy in Mexico — cartels had used very technically sophisticated means and advanced tradecraft to identify who the counter-narcotics agents working in that embassy were. They went out and killed some of their sources.

To talk more specifically, the data they were getting was call data records, which are the records generated every time you use your phone. If I call you, it’s “this number called that number, the duration was such and such, and the location of the towers was such and such.” Or if you connect to the internet, you get your IP address and some of the high-level metadata. Those are called CDRs, or call data records.

The cartels were able to access them in Mexico. I don’t actually know how they did it, although I will say **that data is available on the commercial market for just about anywhere in the world**. If you go looking for it, you can just buy CDRs — **and that’s consistent with the terms of service of your cell phone carrier, unless you’re a Cape subscriber.** But anyway, they did this CDR analysis and were able to really easily figure out who the counter-narcotics agents were, and the identities of the Mexican folks who were working with them. Then they went out and killed them. The threat is certainly relevant on that front as well.

**Dmitri Alperovitch:** There was a similar story, I think 15-plus years ago, out of Lebanon where Hezbollah did the exact same thing with US and Israeli assets that were infiltrating Hezbollah. Through the use of tracking their locations — and where they were actually turning off the phone because they were about to go into a meeting and didn’t want to be tracked — that in itself was a signal for Hezbollah. In Lebanon, certainly at the time, they had full control of the telco network. They were able to see these weird patterns of turning on and turning off of cell phones on the network. That was an indication that it was likely an asset that was trying to penetrate them.

**John Doyle:** A version of that story comes up a lot, and it’s interesting both because it illustrates how ubiquitous and how always-on our phones are — that it’s an anomalous network event when you switch your phone off. It’s also interesting how frequently that turns out to be the answer: you just figure out where people are turning their phones off, drop a pin in the middle of that radius, and there’s something interesting happening right in the middle there.

**Dmitri Alperovitch:** Not to make John feel any worse, but when he was turning his phone off, the enemy would know he was going on a mission, right?

**John Doyle:** Probably. Well, I was a pioneer. We were still figuring out the rules of the road at that point. We’re talking about a Nokia flip phone. This is old school.

**Jordan Schneider:** On Lebanon and Hezbollah, the whole Israel using the beepers is another interesting case of, “Oh, you think you’re being cute by trying to get around this problem.” Presumably, the whole idea was they recognized that doing stuff over commercial telecommunications wasn’t going to work, so they tried to have some alternate solution.

**Dmitri Alperovitch:** I was talking to the Israelis about this after that operation came to light, and they said that Hezbollah did get pretty sophisticated about the use of cell phones because the Israelis had been so successful in penetrating them and using them for targeting. They consciously switched to beepers, which the Israelis were like, “Oh, great, we can now leverage that. By the way, we can put more explosives into a beeper or walkie-talkie because they’re bigger devices than cell phones.”

Part of the plan was also that the walkie-talkies in particular would be worn by Hezbollah commanders on their chests when they would go into battle. You can imagine what would happen if you rig an explosive and make it go off during a fight. The Israelis were upset that they had to trigger it early because Hezbollah was shipping those beepers to Iran for investigation — the battery drainage was too high, so they started to suspect something. But the plan was always to wait for the war to start and have these guys go into battle with the walkie-talkies on their chests and blow themselves up.

## Building a Secure Cell Network

**Jordan Schneider:** On that smiley note, let’s come back to John with a little more of the commercial history. The dream is to build a parallel to a global functioning Verizon that anyone can use — 5G, 6G — and still be more secure than they would be otherwise. Where do you start when that’s what you’re aiming toward?

**John Doyle:** That’s a great question. It’s way harder than we thought it was going to be. You start like any good startup — you just start doing things and seeing what works and what doesn’t work. More concretely, you need to start in the US. Our goal from the beginning has been to build something that consumers can benefit from, that consumers value and use. But national security has been at the heart of the company from the very start — specifically US national security.

You start in the US because if your phone doesn’t work in the US, then it’s always going to be a niche “pull it off the shelf in times of emergency” solution. Frankly, the problem is just as much domestic as it is international. That was a little counterintuitive at the start, but then Salt Typhoon taught us — if you didn’t already believe it, which you should have — you knew for a fact after Salt Typhoon.

That’s a long way of saying that you start in the US. What we build at Cape is software. We build all the software it takes to run a cell network — call routing, messaging, authentication, billing. All those things are the platform we build. You have to rent towers. We were not then, and we’re still not rich enough as a company, to build brand new physical infrastructure all around the United States or own all that spectrum. We rent space on towers from major carriers. But we’re different from every other virtual operator like the Mint Mobiles of the world in that, past the tower, everything passes through our software. That’s how we have so much control over how much data we collect about you and how we protect that information. That’s where we can make all of our privacy and security guarantees.

We started in the US, and that’s been an odyssey. It’s been amazing. We have a really great network now that we’re very proud of. Consumers are signing up for it, and national security folks are using it. There’s still work to be done, but it really is becoming real.

Then you inevitably need to go international. The other half of this problem lives overseas. We’ve accomplished that expansion both broadly via aggregators that can get you access in 190 countries more or less overnight — although my engineering team would point out it’s 11 months of work to get overnight access to the global network. Then you also can go country by country. As an example, we went with the Navy to Guam in response to their being the canary in the coal mine on Salt Typhoon and Volt Typhoon. In response to that compromise, we went to Guam in partnership with the Navy and installed on top of the telcos there to test our remediation of those threats. We can do country-by-country expansion and make heightened security promises and privacy promises as we do that.

The summary is that it’s very hard. It’s regulatorily and technologically complex. But with a small but mighty team of engineers, you can get it done.

**Jordan Schneider:** I’m just old enough to remember when people talked about Apple as this small operating system that the hackers weren’t spending as much time focused on because there wasn’t enough value behind getting into that OS. I’m curious how you guys conceptualize the idea that everyone who is worth hacking is now going to be on the Cape network.

**John Doyle:** We think about that problem in a few ways. First, early on in the conversation here, Dmitri said that telcos are the crown jewels because they have so much information about you. That’s really true, except for Cape. **One of the fundamental decisions we made early on was to collect as little information about our subscribers as possible** to run a functioning telco and then retain it for as short a period as possible as the realities of a business allow.

In practice, what that means is we retain call data records for about three days because if we have a dispute with one of our carriers about how many gigabytes we have to pay them for, we have to be able to settle the dispute. But then after that, we just delete it. Those call data records are not linked to any detailed portrait of you as a person — your mother’s maiden name, your Social Security number, and all that data that your current carrier probably collects. We just don’t collect it. We have a really novel way of managing payment via a third-party processor, so we’re hands-off on all your payment data. **Even in the event that we’re breached, there’s considerably less to steal.** That’s our starting point.

Then we’ve done a lot of work around deploying in commercial cloud, which has significant security advantages. One of the stories that came out of Salt Typhoon was the cottage industry of vendors around the telcos that service and provide parts of their stack. I won’t go into a ton of detail because it’s not my information to share, but they help them accomplish some of the ancillary functions you need in order to be a compliant telco. At least some of the origin of that breach was via that cottage industry of vendors.

The Cape ethos from the beginning has been that **we buy as little as we can. We build everything ourselves.** There’s a little bit of hubris here, I guess, but we do a considerably better job of building it than most of the partners we evaluated in the space. We have a lot of confidence in our approach.

**Dmitri Alperovitch:** One of the things I didn’t fully appreciate when I was investing was — why wouldn’t Verizon, AT&T, or T-Mobile just do this? It seems like offering better security is something you could upsell to consumers. There’s value in that.

### The reality is that selling customer data is part of the core business model for these carriers.

### They make a ton of money by collecting call records and geolocation data, then selling it to various data brokers. They don’t want to give up that business because it’s a huge revenue stream for them.

What John is doing by focusing specifically on security and building robust security capabilities into the network — starting with the simplest principle of just not collecting data you never need — is a huge advantage over everyone else who are in the business of collecting that data to sell it.

**John Doyle:** That’s a really good point, and it also sets up one of my favorite topics, which is the other reason Verizon, AT&T, and T-Mobile can’t do this. Their business model, in addition to monetizing subscriber data, is centered around being big enough to own and administer spectrum.

These are enormous companies that own nationwide spectrum, which is a really expensive asset. They own this physical infrastructure, and they administer it. Then they act as systems integrators on top of that asset. They buy their mobile core software — the thing we build and deploy — from one of a couple of vendors, along with all the other pieces you need to bolt together to run a telco.

In and of itself, it’s an amazing feat and a really hard thing to accomplish, but very little of that, if any, is built in-house. Their core competency is not actually building the technology that powers the network — they just administer it. It would be a big shift for a carrier like that to start building the software internally. They don’t have that function.

**Jordan Schneider:** Let’s come back to the Verizon-AT&T comparison. There are many sexy things that software engineers can do nowadays. Telecom has not been one for a while. How are you thinking about recruiting and then getting up to speed on this ecosystem, which doesn’t have a lot of people tweeting about how cool it is?

**John Doyle:** We’re trying to change that. I would say getting from 10 to 35 on the engineering team was pretty hard. We had the hardcore early folks who were all in on the problem, and then we were trying to build a critical mass of engineering talent to come work on a telco.

A lot of attention is rightfully paid to the fact that through Huawei, China was able to take ground in the cellular network around the world via subsidized rollout — they sold the equipment as cheaply as possible to all these network operators. It’s a really effective strategy, and it’s not wrong to focus on that. Are they spying on us via Huawei equipment? Probably. Although it turns out they’re even spying on us via our own carriers.

The less appreciated part of that story is that over the last 20-plus years, [via Huawei](https://www.chinatalk.media/p/the-house-of-huawei), China has built one of the most valuable companies in the world and accumulated all this capital and all this talent around 5G, which has turned out to be a critical technology area. The US just has not had an equivalent. We have not had that accumulation of talent, that accumulation of capital.

Our last great manufacturer of telecommunications equipment was Lucent, which was sold from the US to a French company in 2006 — right before the iPhone came along and really informed us that we’d all be using cell phones for the rest of our lives whether we wanted to or not. With that as background, it has turned out to be a strategic disadvantage for the United States. China has Huawei, therefore, they have people who understand the telco stack deeply. They have a huge core of really talented engineers who work on it. They have a capital base, so they can continually do R&D on this stuff. The US just hasn’t had that natively.

My long-term vision for Cape is to be that answer. Right now, we’re 85 to 87 people strong, and we’re focused on a really specific set of problems. But it’s a better engineering team than you’re going to find anywhere else in telco — I’m confident in saying that.

To the second part of your question about our talent strategy — from the very beginning, the plan was to attract really top-end software engineers and give them a little bit of room to learn telco and 5G. It’s hard on the front end, both from a recruiting perspective and from a time-to-value perspective, because people need to ramp up on what we’re building. But it’s really starting to pay off now. Literally outside my door, there’s a room full of people building really amazing stuff. They came from Palantir and Anduril and Coinbase and all these sexier companies that you’re alluding to. But now they’re building the next telco together. It’s quite cool.

**Jordan Schneider:** Well, let’s continue on the pitch then, John. What is fun about engineering these systems?

**John Doyle:** The network is deeply technical. It’s complicated. There are frustratingly legacy parts of the stack, where if you open the door, the whole thing falls apart. They can’t be touched, basically. But it’s deeply technical, really hard, and a little obscure.

Then the scale of things you build is automatic. We’re live in 190 countries, and when the engineering team builds a feature and deploys it, it goes live at that scale immediately. That’s really cool.

The other, maybe cuter example — from my perspective, when we finally got the network live and David Dunn, our head of network engineering, called me. He did the “Watson, come here, I need you” first phone call on Cape — the feeling was exactly like when you were 8 years old or however old you were and you got your first walkie-talkies. Everyone kind of remembers that sensation, the miracle of remote communication. It was like that, but it reaches all around the world and is definitely hard.

Not every single day feels like that, but there are a lot of those moments where you’re finally getting to build the walkie-talkie you wished you had when you were 8 years old.

**Jordan Schneider:** Cute. All right, beyond building a thing, you’ve got to sell it. What has that been like?

**John Doyle:** Selling to the government is famously hard. Selling to defense is famously hard. Some uniquely hard things about our business and our product include the fact that the government has been buying cell phone service for a long time. A lot happens on cell phones, but no credible alternatives to the major carriers have existed in our space until Cape.

What that means is there’s a big contract vehicle right now that the Department of Defense uses to buy all of its domestic cell phone service. If you’re a battalion commander in the 82nd Airborne and you want to buy 20 cell phones for your staff, you go to an office called Spiral 4 and say, “I need 20 cell phones” — last year’s iPhones or whatever. It’s the only place you can go to get domestic cell service.

The incumbents on that contract are the big three, and then a couple of resellers bid on it. The contract gets awarded strictly on lowest price. That’s fine. They are all roughly equivalent networks, and it makes sense from that perspective.

But Cape is a little bit premium. We’re a little more expensive because it’s expensive to build the things we build. We’ll never win a lowest-price bidding war against the big three. Plus, they have owners’ economics on their networks. The price is not the point anyway. The point is we’re solving problems that no one else has solved.

**But bureaucratically, it’s legally impossible for the program office currently to buy that cell service any other way.** One of the things we’ve been working on is saying, “Look, guys, if your criticism is Cape is too expensive and it’s not worth it, then that’s fine. Say that to us and we’ll go away.” But nobody’s saying that. They’re just saying we can’t technically pay for additional security and additional privacy.

We’re doing a lot of work to just try to get the rules changed. If the buyer would like not to give China full visibility into their communications and their troops’ whereabouts while they’re using their cell phones, and they’re willing to pay 10 bucks a month more for that, then they should have that option. It’s surprisingly hard to get that done, but we’re making progress.

**Jordan Schneider:** What was your read on [the recent Hegseth speech](http://war.gov/News/Releases/Release/Article/4329487/secretary-of-war-announces-acquisition-reform/)?

**John Doyle:** He did a great job. The spirit is right. The intent is right. Acquisition reform has been an increasingly popular topic, and rightfully so. Commercial-first is such an important part of that. We think of what we’re doing as a commercial-first technology.

Now the hard part starts. Secretary Hegseth is not the first person to stand at a podium and announce acquisition reform is on its way. It’s famously hard to drive deep bureaucratic change at the Pentagon, but I’m hopeful. It’s a righteous mission, and I hope that he’s able to do it.

## A Nightmare in Taiwan

**Jordan Schneider:** Commercial telecom in the Taiwan context — what’s your take, Dmitri?

**Dmitri Alperovitch:** Just like in all these conflicts we’ve talked about, there’s going to be huge dependence on the mobile communications network in Taiwan. There are going to be a lot of questions about resiliency.

The first thing the Chinese are likely going to do in the event of an invasion — or even a blockade — is cut the submarine cables that go to Taiwan. Those cables provide the vast majority of their communications with the outside world, but cutting them is going to have cascading effects on internal networks as well.

We know that the Internet is quite brittle. When one service fails, you can have these cascading effects that no one anticipates. We just witnessed that a few weeks ago with AWS. One service within one of their regions on the East Coast fails, and then it reverberates across the entire AWS network. Everyone using AWS experiences outages around the world as a result.

Take something like DNS — the Domain Name System for resolving domain names to IP addresses — which relies on connectivity to root servers. If you can’t connect to those root servers because the submarine cables are cut, then a bunch of things that operate even just internally within Taiwan will start to fail.

You want to have other ways of communication. The great thing about the cellular network is that you’re increasingly starting to build in capabilities to connect to Starlink and other satellites, at least for emergency messaging. iPhone and other phones are starting to offer that.

This is going to be a pretty vital way for Taiwanese forces and emergency responders to communicate with each other in the event of that contingency. Having something that’s reliable and that can’t be used for targeting purposes by the Chinese is absolutely essential. John, I don’t know how much you can talk about this, but there’s quite a bit of interest in the region generally in Cape for that very reason.

[

![](https://substackcdn.com/image/fetch/$s_!5aTC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F82dabd7f-0aa1-4a92-ab53-29227f5accbd_3520x1980.jpeg)



](https://substackcdn.com/image/fetch/$s_!5aTC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F82dabd7f-0aa1-4a92-ab53-29227f5accbd_3520x1980.jpeg)
*A cell tower in the mountains overlooking Jiaming Lake in Taiwan. [Source](https://corp.taiwanmobile.com/press-release/news/press_20250508_693103.html).*

**John Doyle:** That’s spot on, both in terms of the enormity of the problem and the reality that backhaul off the island is really constrained and really hard.

Our opinion is that a terrestrial cellular network — whether a carrier or virtual carrier — is the perfect integration point to manage all the complexity you’re describing after the cables get cut. If you have limited backhaul off an island like Taiwan, the correct way — and the easiest way and the most robust way — to prioritize how you use that bandwidth, whether it be Starlink or other means, is over the cellular standards.

This works both because everyone already has the platform in their pocket — everyone already has their cell phone — and because if you’ve done the right things on the SIM card in advance, you can have a relatively graceful degradation of service. You can provide connectivity to an entire population with prioritization as needed for things like government officials and people doing the most important work.

We are working hard to offer support in that region. Hopefully, we’ll have some news coming out soon on that front. Certainly, if you built the company we’re building and started attacking this problem when we did — literally in the middle of the Russian invasion of Ukraine — then you inevitably wind up where we are: focused on Taiwan as a problem and thinking about what problems we would have liked to have solved in Ukraine in advance and how we can get that solution into Taiwan before we hit a crisis or conflict.

**Jordan Schneider:** I want to stay on the degraded Taiwan communication ecosystem. Where does the data come from in that context? Is it all from the sky then?

**John Doyle:** That’s a good question. Basically, yes. It doesn’t necessarily all have to be from the sky. There are other ways to get data off the island at medium range. Technology like microwaves and lasers can provide some amount of backhaul. But the real fat pipe that you want to have access to for moving large amounts of data is the sky.

Certainly, Starlink is the most famous example here and the best known. But there are other low Earth orbit constellations, and then there are other constellations — both government and commercial — at higher altitudes as well. All of those have different constraints and different qualities that make them advantageous in certain situations. But short answer: yes, you want to look to the sky, and that’s where you get most of your backhaul.

**Jordan Schneider:** Currently, when people think of satellite cell service, it’s SOS text messages when you’re on a mountain hiking or something. But presumably you can do more than just that now. Can you serve 30 million people? Maybe not live streaming, but phone calls and stuff? What’s the optimistic case?

**John Doyle:** An important constraint to have in mind: even when we finally fill up all of low Earth orbit with as many satellites as can fit, if we assume a couple of advances in antenna technology and dedicate all of those satellites to direct-to-cell service — that’s what you’re describing when you’re a hiker in the Grand Canyon and you want to get an SOS text message out; direct-to-cell is the tech that allows your cell phone to talk directly to a satellite — there’s still not enough bandwidth to meaningfully offload the traffic that passes over the terrestrial cellular network every day.

This is not to downplay how impressive and important that technology is, but it does underscore that it will always be supplementary to the terrestrial physical infrastructure. Now, to bring it back to Taiwan: assume the cables have been cut. There are still ways — and we have our own opinions on how — you can continue to operate intra-island and even maintain a highly performant cell phone carrier. People can talk to each other within the island in a relatively uninterrupted way. You need to manage your scarce resource, which is backhaul, and prioritize which traffic gets on and off the island.

**Jordan Schneider:** Okay. Cables that are running on Taiwan to various cell towers can still talk to each other relatively normally, but if I’m trying to stream something from Netflix, which is hosted in a data center in Malaysia, then I’m going to have a tough time.

**John Doyle:** That’s right.

**Jordan Schneider:** On the tactical and operational side of what a commercial cell network can do, we had some examples from Dmitri on triangulating where Shaheds are falling. What else makes this so addictive, even when it puts your life at risk? What logistical or operational things can you do in Ukraine because everyone has cell phones connected to commercial networks that would not have been possible in, say, 1987?

**John Doyle:** If Russia had invaded in 1987, if there were no cell phones or the network was taken down, the biggest difference would have been the lack of connectivity for the civilian population.

The way those folks benefited from the network remaining available was primarily in two ways. Number one is morale — just the ability to stay in touch with friends and family who have left or friends and family over distance. This turned into a really long conflict, and the political will of the population is a really critical factor in the resilience against the invasion. It’s an amazing way to keep morale high or to boost morale.

The other is crowdsourced intelligence, especially in the early days. But even now, you see civilians contributing to the intelligence picture. They’re able to do that because they’re connected to the network and connected to their friends and family who are also in the military and also prosecuting the war over the cellular network. It’s relatively seamless to pass along what they’re seeing.

**Jordan Schneider:** The other thing that has really struck me is these photos of Ukrainian command and control literally on Discord and Skype. Then you text the people who are out and about on Signal, right? The idea that this technology is so valuable that you are willing to be the intelligence official who walks around with a phone. What is the friction of not having that in 1987?

[

![](https://substackcdn.com/image/fetch/$s_!ju2g!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0237901-de2a-4d04-b336-0b2421929154_1600x1066.png)



](https://substackcdn.com/image/fetch/$s_!ju2g!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0237901-de2a-4d04-b336-0b2421929154_1600x1066.png)
*[Source](https://www.nytimes.com/2023/03/30/world/europe/ukraine-bakhmut-russia.html).*

**John Doyle:** In 1987, you had to set up a radio. You had to set up a communications outpost. You had to do all this work to maintain a line of communication that you just don’t have to do now.

Signal and Discord, in a really important way, have been ahead of the networks in that Signal solved the problem of end-to-end encryption for consumer communications. You can now protect the content of your communications with a high degree of certainty using Signal. It’s an amazing messaging app and it’s a very frictionless experience.

Where Cape fits in — and what we like to say — is that Signal protects the messages and we protect the messenger. The part that’s been lagging is: while you’re out running around sending and receiving Signals, the metadata associated with your location and your activities is not protected until you have a carrier like Cape in place.

**Jordan Schneider:** Even in 2005, give us a little more color on those hundreds of thousands of dollars’ worth of things. Were they heavy? Did it take a long time to set up? People have this image of radio men in World War II, but presumably you were working with a little better stuff than that guy on Omaha Beach or whatever.

**John Doyle:** Maybe a little better. You organize your communications plan if you’re a comms guy in the military according to something called PACE. You have a Primary, Alternate, Contingency, and Emergency communications plan. If one system fails, you go to the next and the next.

Examples of stuff I had in that rucksack include radios for line-of-sight communications, and really, really good walkie-talkies with very heavy batteries that we could use to talk back to people who were a little farther away from the front lines than we were.

Further down the contingency list were things like satellite communications, which in those days meant these little foldable satellite dishes that you would unfurl and point at the sky and try to get just the right elevation. If you got a good connection, you could get pretty decent communications over satellite.

My favorite — and this is way down the PACE plan — was high-frequency communications, which is ham radio operator stuff. You measure out an antenna and you’re like, “Okay, we’re going to communicate on this frequency, so I need a 37-foot antenna,” and you roll it out on the ground. You can talk a really long way over high-frequency communications, but you’ve got to get it just right. I never had the opportunity to do that operationally, although we did a lot of training on it, and I was always fascinated by it.

But each one of those — line-of-sight communications, satcom, and high frequency — those are all different boxes. That’s a 30-pound brick that rides in your rucksack, and it’s got its own batteries associated with it and its own antennas and whatever. All that gear rides around in your rucksack, and if you need to make communications, then you just start working down the PACE list.

The cell phone is better. It’s a lot better. It’s much lighter. I love Signal, and it doesn’t work everywhere. We’re not fully replacing those boxes. Ninety-whatever percent of the world’s population is covered by cell coverage, but not that much of the terrestrial surface area is. There’s a time and place for other comms also.

**Jordan Schneider:** Our reported SEALs hanging out on North Korean beaches — I don’t think they’re connecting to the local telecom.

**John Doyle:** We haven’t tested our network in North Korea. I can’t say whether it works or not. I’ll come back for an update if we ever find out.