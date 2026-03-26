---
title: "\"DR\" Word Soup: A Long and Winding Road"
author: "Daniel Kelley"
publication: "The Cyber Why"
publication_slug: "thecyberwhy"
published_at: "2024-07-10T14:02:10.000Z"
source_url: "https://www.thecyberwhy.com/p/dr-word-soup-a-long-and-winding-road"
word_count: 1235
estimated_read_time: 7
---

The acronym word soup game is strong in cybersecurity. It’s easy for practitioners to forget how confusing it can be. We spit out these character combos as if they’re brand names and expect others in the organization to understand exactly what we mean. We also anticipate that business leaders and boards will buy into the fact that no security program can exist without the latest XYZ technology. Looking at security from the inside, it makes perfect sense to have 301 different letter-based categories; they align with analysts’ definitions and ranking systems, and (of course) vendors jump on these acronyms to remain relevant and attract attention in a very crowded marketplace.

[

![Acronym Soup United States, 44% OFF](https://substackcdn.com/image/fetch/$s_!eUSj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14931669-1dc6-4a83-9a41-27afb35a60f4_665x441.png "Acronym Soup United States, 44% OFF")



](https://substackcdn.com/image/fetch/$s_!eUSj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14931669-1dc6-4a83-9a41-27afb35a60f4_665x441.png)
***Acronym SOUP - Specifically DR Soup is holding back cybersecurity efficacy***

Over the years, “new” categories — and thus their acronyms — have emerged from perfectly descriptive former terms. For example, “data security” morphed into “data loss prevention”/”data protection” morphed into “data security posture management,” a term we use today to basically describe “data security” as it exists in 2024 versus how it existed in 1994.

Another trend that’s taken hold more recently is the tendency to add on to established terms. That is, take a category and chunk it into subcategories, thus allowing for disparate tools creation underneath the broader heading. The most current crazes I see are:

-   **Security posture management**: All the SPMs: CSPM, SSPM, DSPM, ASPM, I(A)SPM, and [Orca’s latest](https://orca.security/resources/blog/source-code-management-systems/) addition: SCM-PM, “source code management posture management” 
    
-   **Detection and response**: All the DRs: EDR, NDR, XDR, ITDR, DDR, MDR, ADR, MLDR, TDR
    

The rest of this post will focus on the “DR”s. There’s plenty to say about the posture management category, but I’ll save that for later.

### The evolution of cybersecurity detection and response

Presumably, most of you reading this post work in security and know the history. But just in case you’re not a security pro or need a refresher — Cybersecurity emerged from more general IT in the late 1980s. At that time, and for about ten years, cyber threat detection and response (DR) primarily focused on signature-based analysis and provided the birth of antivirus (AV). If you’re old enough to have lived through or near those days, you might remember that identifying known malware patterns via signatures was tedious, highly manual, and not hugely effective. I mean, if you were a cybercriminal and knew that some newfangled software was looking for known patterns, wouldn’t you simply change the patterns? Yes, exactly.

AV software evolved to account for polymorphic viruses and became slightly more effective.

By the mid-1990s, no one in their right mind would have based their DR program on AV. It was a nice complement to other tools, one that would catch the “low-hanging fruit,” but not enough to be successful. What came next was intrusion detection and intrusion prevention systems (IDS/IPS). While IDS/IPS provided broader detection capabilities than AV, they were still based on patterns and were hamstrung by limited response actions.

The next decade brought SIEM, enhanced IDS/IPS, broader use of VPNs, heuristic detection capabilities, email filtering and spam detection, stateful firewalls, and more. These were (and continue to be) DR mechanisms in some form or another. As time passed, advanced persistent threats grew in popularity (both as a buzzword and a real-life potential attack) and tools developers needed to move toward greater detection and response efficacy. It became obvious that automation was needed and that reactivity wouldn’t cut it.

That’s when we first started hearing terms like “network detection and response,” “endpoint detection and response,” and the catch-all, “extended detection and response.” All these technologies emerged as a response to the evolving threat landscape. They were not completely new technologies but rather extensions of previous tools that existed, and they were built to fit modern-day computing requirements.

### The exploding cyber tools ecosystem?

Of course, DR solutions cannot stand on their own; there are many other categories of tools — and related acronyms — deployed throughout organizations’ digital estates. As a result, the ecosystem of cybersecurity tools has exploded, and what we have today is a giant pool of tools to aid security teams in their quests to conquer the entire attack surface. 

While detection and response is a well-understood category, the hyper segmentation of terms and acronyms has muddied the space. Many DR tools now don’t only focus on detection and response, as their name implies; they’ve added identification components that, presumably, can help security teams pinpoint problems before they turn into active compromise. What we’re left with is an accumulation of acronyms that don’t mean the same thing to everyone. On top of that, if you stop and drill into the various subcategories, it feels like we’ve got some duplicative efforts—or, at least, the ability to consolidate, as is the stated desire of many practitioners.

[

![So Confused GIFs | Tenor](https://substackcdn.com/image/fetch/$s_!pCLx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd879e23-e321-49ed-bb36-c130e3e68c59_320x320.png "So Confused GIFs | Tenor")



](https://substackcdn.com/image/fetch/$s_!pCLx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd879e23-e321-49ed-bb36-c130e3e68c59_320x320.png)

### What do I mean?   

Theoretically, XDR was developed to encompass NDR and EDR — the first iterations of DR tools. MDR offers the managed services version. Shouldn’t XDR cover everything, including managed DR? Logically, “extended” could mean coverage of identity threat detection and response (ITDR), data detection and response (DDR), application detection and response (ADR), “cloud detection and response,” and whatever comes next. It would be much simpler, wouldn’t it? The catch-all acronym “XDR” would clarify the soup. 

But since security pros are so fond of acronyms, the creation of micro categories allows us to continue the trend and develop more siloed tools that will likely all converge “n” years from now. In the meantime, though, we have to have a place for each distinct subsection of DR. ITDR, for instance, is an approach for managing identities — both user and system. Cloud detection and response (CDR) clearly focuses on monitoring and managing cloud activity. Not necessarily identities of cloud-based systems and users (because that’s ITDR, at least to some vendors), but it could, couldn’t it? Wouldn’t that equate to “extended detection and response”? Gosh, this is getting confusing.

DDR is focused on protecting sensitive data (the artist formerly known as “data security”) for data in on-prem networks, cloud environments, applications…but then we have a separate category of ADR; ADR is much more specific to application runtime behavior, but it also analyzes things like user interactions (“identity”?), data flows (“data”?), and network calls (“network”?). 

### So What?

At the heart of the matter, the real question is: Are all these DR technologies necessary? The answer, *I think*, is yes. But are they necessary as *standalone categories*? If my crystal ball worked, it might say that many or even most of these acronymic categories will converge into one larger category, much like how SASE converged complementary categories into one integrated engine.

What’s amusing to me, though, is that, at least from this vantage point, the category they would roll into is…detection and response, which is the top-level umbrella category from which they emerged. In all likelihood, some analyst at one of the top two firms will concoct a creative term that can easily be turned into a catchy acronym that will be splashed across RSA and Black Hat conference booths. Two years later, the tides will turn again, and there will be another attention-grabbing category. For now, “DR” is all the rage. There are plenty of effective products to choose from if you want to swim in the DR soup. Sometime in the near future, though, expect your XDR vendor to buy your ITDR or ADR vendor — so negotiate your contracts well.

[

![Clear as mud - Rainbow SpongeBob Meme Generator](https://substackcdn.com/image/fetch/$s_!DYih!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27521917-a15b-4def-a60e-386f8eb9e68b_600x496.jpeg "Clear as mud - Rainbow SpongeBob Meme Generator")



](https://substackcdn.com/image/fetch/$s_!DYih!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27521917-a15b-4def-a60e-386f8eb9e68b_600x496.jpeg)