---
title: "To feel secure can be more important than to be secure"
author: "Ross Haleliuk"
publication: "Venture in Security"
publication_slug: "ventureinsecurity"
published_at: "2025-09-23T16:31:18.000Z"
source_url: "https://ventureinsecurity.net/p/to-feel-secure-can-be-more-important"
word_count: 3988
estimated_read_time: 20
---

A few weeks ago, after I published “[Using behavioral science to build stronger defenses](https://ventureinsecurity.net/p/using-behavioral-science-to-build),” one of the readers reached out to tell me that Bruce Schneier had given a talk on a very similar topic many years ago. I was intrigued, so I went digging and eventually found the talk they were referring to. What follows is both a summary of Schneier’s ideas and my own reflections on how they resonate today.

At the heart of Bruce’s talk lies a simple but powerful insight that security is both a feeling and a reality. The two don’t always align; people can feel secure without actually being secure, or be secure while still feeling insecure. In this piece, I am looking at this disconnect more closely to resurface the ideas from Bruce’s talk, to highlight just how fascinating (and sometimes counterintuitive) human psychology can be, and to discuss how this impacts the way we should be building products.

\---

*This issue is [brought](https://ventureinsecurity.net/p/sponsor) to you by…* [Axonius](https://events.zoom.us/ev/AoingeLHt_k9DbM2O_-Y5wmgt_YvIL3H9KdYhoA4mQAynOasq6ck~Ahc6Vy5cr6aaEKTVIKjY1HWIdVZ_wQKImJ3fBlyG2RigVGDytLutSt2M_ZeIEJ2Szho51-r-EkDTBc3lwKgL4IW60g).

**Fragmented environments. Alert fatigue. AI hype. CTRL/ACT is where action starts.**

Tired of noise and complexity? CTRL/ACT shows how asset intelligence drives smarter IT and security. Featuring Rachel Wilson, Managing Director & Chief Data Officer, Morgan Stanley — [save your spot now](https://events.zoom.us/ev/AoingeLHt_k9DbM2O_-Y5wmgt_YvIL3H9KdYhoA4mQAynOasq6ck~Ahc6Vy5cr6aaEKTVIKjY1HWIdVZ_wQKImJ3fBlyG2RigVGDytLutSt2M_ZeIEJ2Szho51-r-EkDTBc3lwKgL4IW60g).

\---

\---

## **Why I am discussing ideas from the past**

Before we dive in, I’d like to first explain my fascination with academia and decades-old insights. Since my blog is focused on startups and the future, once in a while, I see people getting confused about why I think that some essay from two decades ago or a video from a decade and a half is relevant today.

The reason for that is simple: while technology moves quickly, the fundamentals of most industries and we as humans change far more slowly. If you take a few steps back, it becomes pretty clear that the incentive systems, organizational dynamics, and human psychology are remarkably consistent even though the tech we rely on changes. That’s why there are plenty of ideas from a long time ago that feel as relevant today as when they were first published. Nearly two decades back, Ian Grigg described security as a market for silver bullets, and while tech has come and gone since then, and new Gartner categories replaced old ones, [that framing still, in my opinion, describes how our industry works](https://ventureinsecurity.net/p/cybersecurity-is-not-a-market-for). Similarly, while a bunch of nuances have changed, for the most part, [Microsoft’s “10 Immutable Laws of Security” remain as true today as they were 25 years ago](https://ventureinsecurity.net/p/10-immutable-laws-of-security-25).

Bruce Schneier’s blog, essays, and books from years ago continue to resonate incredibly well, even though a lot has changed since the time they were published. If you haven’t seen his talk at TEDxPSU, [Reconceptualizing Security](https://www.youtube.com/watch?v=CGd_M_CpeDI), I highly recommend watching it. If you did, I hope that you will still find this piece relevant, or at least somewhat entertaining.

## **Security is never just security**

When most people think of security, they imagine it as something concrete, like a locked door, a burglary alarm, a firewall, or encryption, something that either is there or isn’t there. However, as Bruce Schneier explained in his talk 15 years ago, the truth is more complicated. Security is at least two things: how we feel about our security and whether we are actually secure. The two do not always align. People can feel perfectly secure while being in real danger, like the driver who texts at the wheel and “feels fine.” At the same time, people can be secure but not feel secure like someone flying on a modern airplane, despite air travel being statistically one of the safest modes of transportation in history. A great example of how these things play out in real life is e-commerce websites. What makes them secure is end-to-end encryption, robust vulnerability management, product security programs, the use of HTTPS, and so on. However, users browsing products online don’t know about any of these things - what they care about is the green lock in the browser, hidden by default CVV input (because “it’s sensitive”), and a “100% secure” icon next to the credit card input.

## **Security is always a trade-off**

In his talk, Bruce Schneier highlights the uncomfortable truth that security always comes at a cost. When we improve our safety, we almost always give something up: money, convenience, time, freedom, or capabilities. Economists call this a trade-off, and it’s a more useful lens for evaluating security than the simplistic question of “is it safer?” Think about airport security. We’ve all had to deal with long lines, invasive screenings, and we all had to throw out liquids. Do these measures meaningfully reduce the risk of terrorism? Maybe, but they definitely cost us hours of collective productivity and personal freedom. As a society, we have largely accepted this as a reasonable trade-off in exchange for the feeling of security (and I am sure, at some level, for the reality of security). Another good example is the building code. While it can sometimes feel like it’d be great if people could just make any structural changes to their houses or condos they feel like (adding balconies, removing walls, etc.), we as a society have accepted that we can’t do that. Instead, potential structural changes have to be reviewed by building inspectors. Sure, some may see it as a hassle, but we’ve learned that an alternative (having houses collapse and kill us) is much worse.

In digital life, cybersecurity is as much of a trade-off. As someone once told me, the most secure system is the one you’ve disconnected from any network and buried under the ground so far that nobody can find it (the deeper the better). Obviously, we can’t push for “maximum security”, only for what’s feasible in the specific situation. MFA is a hassle, but it greatly reduces the chance of account takeover, so we’ve accepted that. Encrypted messaging makes it harder for attackers to steal someone’s data, but it also makes it harder for law enforcement to do their investigations. A firewall can block malware, but it can also slow legitimate business processes. In each of these cases, the real question isn’t “does this add security?” but “are the benefits greater than the cost?”. Sometimes they are, but often they aren’t. Not all security professionals get it, and the ones that don’t tend to be the most upset that “business doesn’t care about security” (if only it were that simple).

## **Humans are very bad at judging risk**

On its own, the fact that security is a trade-off is not a problem. The problem is that humans rarely compare costs and benefits rationally; instead, we rely on intuition and our feelings to figure out what is safe and what is risky.

Bruce Schneier explains that human beings did not evolve to calculate probabilities. Our brains are wired for survival in small groups, not for navigating complex global networks, and as a result, we consistently misinterpret risks in very predictable ways.

### **We care more about spectacular risks than we do about common risks**

Our imagination is generally dominated by rare and uncommon events instead of those that are actually likely to happen. I talk about this all the time. An [infographic](https://ventureinsecurity.net/p/the-business-of-protecting-individuals) by the American National Safety Council does a great job illustrating that Americans often worry about the wrong things. For example, it highlights that:

1.  The odds of dying when riding a car are substantially higher (1 in 470) compared to the odds of dying from a lightning strike (1 in 164,968).
    
2.  The odds of being killed unintentionally are substantially higher (1 in 31) compared to the odds of being assaulted with a firearm (1 in 358).
    
3.  The odds of being killed while walking down or crossing the street are substantially higher (1 in 704) compared to the odds of being stung by a bee, hornet, or wasp (1 in 55,764).
    

People worry more about terrorism than about slipping in the shower, even though the probabilities of both of these things happening aren’t remotely close. Security people often optimize for the wrong things, and vendors exploit that fear and dramatize low-probability but catastrophic scenarios. In reality, most companies are much more likely to get breached by a phishing link than they are by some zero-day, but we don’t want to focus on everyday, boring stuff and hygiene.

### **We are afraid of the unknown vs. the familiar**

It’s human psychology that the unfamiliar feels more dangerous. Schneier brings up an interesting stat: parents fear strangers abducting their children, but evidence is clear that the overwhelming majority of abductions are done by relatives or acquaintances. In cyberecurity, it’s interesting to see the same people who are afraid of powerful “hackers in hoodies” breaking into their systems ignore insider threats, which are both more common and usually more damaging.

### **We are more afraid of personified than anonymized threats**

While I was pretty familiar with the former two facts, this one is new to me. Bruce explains that a named villain is much scarier than a faceless one, and he used the example of Osama bin Laden, who became the embodiment of terrorism. I haven’t thought of this before, but it makes perfect sense that this is what’s happening. In cyber, we are so used to names like “APT29” or “Lazarus Group” dominating headlines, that we don’t even question this. Some companies like CrowdStrike have gone as far as to turn these bad actors into mascots.

CrowdStrike booth at RSAC. Image Source: [Sparks](https://www.wearesparks.com/our-work/crowdstrike-rsa/)

Problems like unpatched servers, the real culprits in countless breaches, or diabetes, which surely killed more people than the most famous modern-day terrorists, don’t get as much attention as these personified, human-like actors.

### **Risks we feel in control of seem smaller than those where we feel a lack of control**

This is another interesting bias Schneier discusses in his talk. Driving feels safer than flying, even though the opposite is true. Similarly, product security engineers often underestimate the risk of first-party code because they feel like it's under their control, while overestimating the risk of third-party libraries because they are outside of their control.

Several weeks ago, in my other deep dive, [I explained how biases and psychological distortions impact the cybersecurity industry](https://ventureinsecurity.net/p/using-behavioral-science-to-build) (I went beyond what Bruce Schneier covered in his talk). They are not just interesting “good to know” facts - they shape national security budgets, corporate risk strategies, and personal choices.

## **The media makes rare feel common**

Our perception of risk is defined by what we hear about. Psychologists call this the availability heuristic - the easier it is to recall an example of something, the more we think it is a common occurrence.

Schneier tells people, “If it’s in the news, don’t worry about it, because by definition, news is something that almost never happens”. This makes sense if you pause and think about it, but I think it’s such a profound thought! Car crashes happen so often that they rarely make headlines, but airplane crashes are so rare that when one happens, we hear about it for a month. Similarly, everyday fraud, which drains billions annually, doesn’t make news, but some unusual zero-day breaches captivate everyone’s attention. Bruce explains that newsletters repeat over and over rare risks, and by doing that, they make us pay attention to things that are by their very nature extremely rare. When the media repeats rare risks, they start to feel familiar, which is why we are afraid of kidnappings and terrorist attacks but forget about car accidents, opioids, and domestic violence.

Cybersecurity is a perfect example of how the media captivates everyone’s attention and influences the prioritization of risks. While massive breaches like Equifax or SolarWinds dominate the conversation, mundane but deadly failures like weak passwords or poor segmentation continue quietly in the background with few people paying attention.

## **Models**

Schneier’s talk touches on many other great topics - the importance of storytelling ([I have an article about this as well](https://ventureinsecurity.net/p/cybersecurity-has-a-communication)), the reasons why there is so much security theater (you’ll want to [watch the full video](https://www.youtube.com/watch?v=CGd_M_CpeDI) to find an answer), and more, much more than I can cover in a single piece. The one thing that I do need to discuss is what he defines as models.

Schneier explains that what makes things in security even more complicated is the fact that to understand the complexity of the world, humans rely on models - frameworks that help us make sense of risks that are too complex to understand. Frameworks are like maps that make it possible for us to navigate the ambiguity of our daily lives without needing to have perfect information about everything we have to deal with. This interplay (feeling, reality, and model) shapes almost every security decision we make as individuals, organizations, and societies.

We need models because intuition alone can’t handle complex systems. We can’t “feel” the risk of global warming or the probability of an AI model being exploited; for that, we need abstractions, science, and frameworks. The problem with models is that they are not neutral; they are shaped by culture, politics, and incentives. Governments, industries, religious organizations, and interest groups all promote competing models, and it can be hard to figure out whom to listen to. For example, the tobacco industry fought for decades to downplay the risks of smoking, and even though it should have been pretty easy to deal with this particular model, it’s taken nearly 40 years to change people’s assumptions. This example shows how hard battles of models can be. By the 1960s, there was plenty of proof that smoking is harmful, but it took forty years of lawsuits, public health campaigns, and shifting cultural norms to align feelings and models with reality.

Discussions around security rarely focus on facts alone; they are often battles over which model the industry should accept. Policymakers, corporations, startups, media, and security professionals all compete to shape the models that are going to define the future of our industry. There are many debates. Should the model of risk emphasize nation-state attackers or insider threats? Should misconfigurations be seen as a bigger risk than zero-days? Should compliance define security, or is compliance an outcome of security? All these are models. Zero trust is a model. Two decades ago, security was synonymous with network security, and then endpoint security started being seen as much more important. That was a change of models. Now people are talking about treating endpoints as throwaway devices, treating office networks as coffee shops, and shifting security controls into the browser. That’s another change of models.

What’s fascinating to me is that in security, different models don’t replace one another, instead, they co-exist. Networks and network security will continue to be critical, and so will endpoints and endpoint security, and the shift to the browser is going to make sense for some use cases but not others. In security, it’s never either-or, it’s about figuring out which models are appropriate for which use case.

## **What all this means for startup founders**

### **The significance of security as a feeling**

These concepts of security as a reality and security as a feeling have a huge impact on what types of products succeed in the industry, and what security entrepreneurs should be doing to increase their chances of achieving real impact. Here is how [Jeremiah Grossman](https://www.linkedin.com/in/grossmanjeremiah/), serial entrepreneur and currently founder & CEO of Root Evidence, explains it in his foreword to my book, “Cyber for Builders”:

*“Bruce Schneier once said, "Security is both a feeling and a reality, and they’re different. You can feel secure even though you’re not, and you can be secure even though you don’t feel it.” As an entrepreneur, it’s important to apply this concept to security controls (i.e. firewalls, vulnerability management, antivirus, etc). Some security controls provide substantial protection, but may not evoke a tangible feeling of security. Other controls make people feel secure, but don't necessarily enhance actual security (these are generally mocked and referred to as “security theater”). A simple example to understand the distinction is encryption. Encryption increases security, but it’s the little “green lock” icon in the web browser that helps people feel like they’re being protected. As trivial as this may appear, appreciating the distinction is paramount in making informed decisions about information security strategy, investments, and business success. How well a security control improves a person’s feeling of security can actually be more important than creating an effective product. The simple fact is, no one will listen to or buy anything from someone unless they first provide peace of mind — no matter how truly effective their product is. As a thought exercise, think beyond information security on the security-related things in life that you buy, and don’t buy, based on a feeling of security. What do you notice?*

*The challenge we have in the current culture of cybersecurity is that most practitioners are conditioned to focus on and only respect security controls intended to reduce risk. And for some reason, there’s scarce time or respect given to the ‘feelings’ of the people we’re responsible for protecting. Our space has a reputation for condescension and frustration with the general masses who just don’t automatically listen and comply. For information security practitioners and entrepreneurs alike, this blind spot is a huge gap that limits the impact and success they could otherwise have. Similar to “security WITH obscurity,” we should “feel secure AND be secure.”*

*I have personally seen a number of potentially great companies with great teams and great products fail simply because they didn’t provide peace of mind. And, while still being brilliant engineers, they didn’t fully appreciate the value of telling their story in a compelling way to people who know far less than they do. As Steve Jobs once said, “The most powerful person in the world is the storyteller. The storyteller sets the vision, values and agenda of an entire generation that is to come.” Do not ignore this lesson.*

*Over the last couple of decades, many cybersecurity vendors have spent vast sums of money on marketing campaigns and conference parties as their go-to-market strategy. Some have successfully executed this way. Their campaigns are generally designed to do 3 things: 1) Get attention. 2) Create urgency. 3) Provide peace of mind. That’s it. And they do so while accepting that they’re hocking products that simply don’t work or don’t deliver as promised. We call them “snake oil”, and our industry is filled with such examples.*

*Any security practitioner with any amount of integrity will find this business strategy offensive. This is effectively a scam, and when it comes to InfoSec, it also risks hurting a lot of people in the process. Setting this aside, the crucial lesson remains that in the real world, people in their hearts still value peace of mind above and beyond the promise of security and risk reduction. Judge people harshly if you like, but the fact remains, and it’s something to be mindful of. Fortunately, there is no good reason to choose between the feeling of security and actual security. Offer both! That’s what the best security controls and the most successful InfoSec companies provide.” - Source: [“Cyber for Builders”](https://www.amazon.com/Cyber-Builders-Essential-Building-Cybersecurity/dp/173823410X/)*

I don’t know if there is much I can add on this topic that Jeremiah didn’t cover in this concise but perfectly framed part of his foreword. To many security practitioners, when they think of perception vs. reality, or controls that make people feel safe vs. controls that make them actually more secure, they ignore feelings and just push for the “right way” of delivering security. The most successful products, however, are those that do both - make people secure while also making them feel more secure.

### **The significance of mental models**

For founders, it’s very important to remember that people heavily rely on models and heuristics for ​​mental shortcuts. When we hear new information, we instinctively try to figure out where it belongs, so we look for analogies, similar concepts, examples in other areas, and so on. Since, as we’ve discussed, new concepts take a long time to form, it can be helpful to anchor what the company is trying to do into an existing mental model.

There are plenty of obvious examples of how startups do it, but two of my favorites are firewalls and posture management. Every time a new attack surface emerges, someone tries to create a “firewall” for it, and it’s not a coincidence: the concept of a firewall is well understood, and people are generally pretty used to it. That is why today, there are so many “AI firewalls” - whether or not this is the right approach to secure AI, it’s very easy for buyers to visualize what a product called “AI firewall” would do. Another example is posture management. While posture tools are a relatively new phenomenon, they have become so widely accepted that when someone says, “We are building a posture management product for AI / cyber resiliency / data / you name it”, everyone can roughly picture how it’s going to work and what it’s going to do.

I am not suggesting that the only way to innovate is to build something that neatly fits into existing models and the mindset buyers have. But I do think that developing new models is much harder than creating new categories. In general, when something new appears on the horizon that doesn’t fit existing paradigms of how people think, it can be an uphill battle to get people to pay attention to it, even if the tech itself is solid. Here’s what I’ve realized:

1.  New mental models can take a decade or more to develop and gain adoption
    
2.  If something catches on and if multiple companies push the same idea, the chances of success increase
    
3.  The bigger the departure from the commonly accepted models, the harder it is to gain adoption
    

A good example of a successful model and how it translated into a successful product company is zero trust and secure access service edge (SASE). Jay Chaudhry, founder & CEO of Zscaler, [explained on Inside the Network podcast](https://insidethenetwork.co/episodes/jay-chaudhry-betting-on-yourself-and-building-a-40b-zero-trust-giant-in-zscaler) that when they started, 9 out of 10 people they talked to had no idea why they should care. People were resistant to changes, and while Zscaler eventually became a widely successful company, it took a one-and-a-half-decade and a 5-time founder willing to bet $50M of his own money for that to become possible.

While there are some examples of successful changes of mental models, there are many more examples of failures. I think the more radical the idea, the less likely it is to resonate with people. Some concepts are pretty simple to explain: “We already have an AI SOC analyst, so there needs to be an AI prodsec engineer”. Logical and simple. Other ideas are very hard to explain - like the idea of getting rid of private networks completely and having all IPs communicate over the public internet.

Founders have to remember that not every category creation requires people to develop new models (most don’t!), but all the ideas that require people to adopt new mental models generally result in new categories. While category creation is hard, it is much, much easier relative to asking people to adopt new mental models.

[

![](https://substackcdn.com/image/fetch/$s_!GoN1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7833097b-8186-4db1-a22f-cd80429e04a0_2000x1333.png)



](https://substackcdn.com/image/fetch/$s_!GoN1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7833097b-8186-4db1-a22f-cd80429e04a0_2000x1333.png)

\---

##### If you like my blog, please subscribe & share it with your friends. I do this in my free time, so seeing the readership grow helps me to stay motivated and write more. I don’t send anything except my writing and don’t sell your data to anyone as [I have better stuff to do.](https://www.linkedin.com/in/rosshaleliuk/)

##### If you are a builder - current or aspiring startup founder, security practitioner, marketing or sales leader, product manager, investor, software developer, industry analyst, or someone else who is building the future of cybersecurity, check out my best selling book, [Cyber for Builders](https://www.amazon.com/Cyber-Builders-Essential-Building-Cybersecurity/dp/173823410X/).

##### If your company is interested in sponsoring Venture in Security, check out [Sponsorships](https://ventureinsecurity.net/p/sponsor).

##### Lastly, check out the [Inside the Network](https://insidethenetwork.co/) podcast where we bring you the best founders, operators, and investors building the future of cybersecurity.