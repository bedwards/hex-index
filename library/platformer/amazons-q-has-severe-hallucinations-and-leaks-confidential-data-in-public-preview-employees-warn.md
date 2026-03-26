---
title: "Amazon’s Q has ‘severe hallucinations’ and leaks confidential data in public preview, employees warn"
author: "Casey Newton"
publication: "Platformer"
publication_slug: "platformer"
published_at: "2023-12-02T00:58:37.000Z"
source_url: "https://platformer.substack.com/p/amazons-q-has-severe-hallucinations"
word_count: 767
estimated_read_time: 4
---

[

![](https://substackcdn.com/image/fetch/$s_!Cg7p!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18762505-bb55-4151-809f-9dae23e41be5_5657x3763.jpeg)



](https://substackcdn.com/image/fetch/$s_!Cg7p!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18762505-bb55-4151-809f-9dae23e41be5_5657x3763.jpeg)

Three days after Amazon [announced its AI chatbot Q](https://www.nytimes.com/2023/11/28/technology/amazon-ai-chatbot-q.html), some employees are sounding alarms about accuracy and privacy issues. Q is “experiencing severe hallucinations and leaking confidential data,” including the location of AWS data centers, internal discount programs, and unreleased features, according to leaked documents obtained by **Platformer**. 

An employee marked the incident as “sev 2,” meaning an incident bad enough to warrant paging engineers at night and make them work through the weekend to fix it.

Q’s early woes come at a time when Amazon is working to fight the perception that Microsoft, Google, and other tech companies have surpassed it in the race to build tools and infrastructure that take advantage of generative artificial intelligence. In September, the company announced it would invest up to [$4 billion in AI startup Anthropic](https://www.nytimes.com/2023/09/25/technology/amazon-anthropic-ai-deal.html). On Tuesday, at its annual Amazon Web Services developer conference, it announced Q — arguably the highest-profile release in the series of new AI initiatives the company unveiled this week. 

In a statement, Amazon played down the significance of the employee discussions.

“Some employees are sharing feedback through internal channels and ticketing systems, which is standard practice at Amazon,” a spokesperson said. “No security issue was identified as a result of that feedback. We appreciate all of the feedback we’ve already received and will continue to tune Q as it transitions from being a product in preview to being generally available.”

After publication, the spokesperson sent another statement pushing back on employees’ claims: “Amazon Q has not leaked confidential information.”

Q, which is [now available in a free preview](https://aws.amazon.com/q/), was presented as a kind of enterprise-software version of ChatGPT. Initially, it will be able to answer developers’ questions about AWS, edit source code, and cite sources, Amazon executives said onstage this week. It will compete with similar tools from Microsoft and Google but be priced lower than rivals’, at least to start.

In unveiling Q, executives promoted it as more secure than consumer-grade tools like ChatGPT.

Adam Selipsky, CEO of Amazon Web Services, [told the](https://www.nytimes.com/2023/11/28/technology/amazon-ai-chatbot-q.html) *[New York Times](https://www.nytimes.com/2023/11/28/technology/amazon-ai-chatbot-q.html)* that companies “had banned these A.I. assistants from the enterprise because of the security and privacy concerns.” In response, the *Times* reported, “Amazon built Q to be more secure and private than a consumer chatbot.”

An internal document about Q’s hallucinations and wrong answers notes that “Amazon Q can hallucinate and return harmful or inappropriate responses. For example, Amazon Q might return out of date security information that could put customer accounts at risk.” The risks outlined in the document are typical of large language models, all of which return incorrect or inappropriate responses at least some of the time. 

But more acute issues began to surface on Slack this morning after a program manager posted a question in Slack. “Hello everyone. Seeing any misleading answers from Amazon Q on digital sovereignty? Please contact me, I’m trying to collect before reaching out to the Service team. Thanks!”

Digital sovereignty refers to storing data in the proper legal jurisdiction — an area that has been increasingly heavily regulated in recent years, [particularly in Europe](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en). The Slack message suggested that Q might be giving users bad legal advice on the subject. 

“This is more than a DigiSov topic issue,” a colleague responded, before posting the security ticket regarding the hallucinations and leaked confidential information. 

Amazon tracks security incidents on a homegrown software system called SIM, which creates tickets for bugs and other problems in a fashion similar to the better-known Jira. 

“...and that ticket has been locked down,” another employee wrote. “Expect the Q team to be very, very busy for a while. I’ve also seen apparent Q hallucinations I’d expect to potentially induce cardiac incidents in Legal.”

An AWS manager noted “it goes without saying that this should not be discussed in a public channel.” And yet employees continued to discuss the issue in Slack. One noted: “I expect the \[correction of error\] report to be a real page-turner, if we’re ever allowed to see it.” “Correction of error” is how Amazon refers to postmortem reports, in which engineers work to describe the root causes of technical problems and identify fixes in the aftermath of incidents. 

The program manager who started off the conversation asked if he should open a specific ticket to discuss the problems with digital sovereignty. “I wouldn’t suggest it,” a colleague said. “The broad and egregious nature of Q’s hallucinations yesterday (including potential Legal exposure) has been well reported in the existing ticket.”

***Update December 1, 11:22PM ET:** Added a statement from Amazon spokesperson sent after publication.*

\---

### Those good posts

[

![](https://substackcdn.com/image/fetch/$s_!srPW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d286ea2-5159-4107-a92d-3883ee905d4e_1196x492.png)



](https://substackcdn.com/image/fetch/$s_!srPW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d286ea2-5159-4107-a92d-3883ee905d4e_1196x492.png)

([Link](https://bsky.app/profile/jesseltaylor.bsky.social/post/3kfgrbectyd2z))

\---

### Talk to us

Send us tips, comments, questions, and severe Q hallucinations: [casey@platformer.news](mailto:casey@platformer.news) and [zoe@platformer.news](mailto:zoe@platformer.news).