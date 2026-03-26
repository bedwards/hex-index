---
title: "AI companies are pivoting from creating gods to building products. Good."
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-08-19T20:57:05.000Z"
source_url: "https://www.normaltech.ai/p/ai-companies-are-pivoting-from-creating"
word_count: 2219
estimated_read_time: 12
---

AI companies are collectively planning to spend a [trillion dollars](https://www.goldmansachs.com/images/migrated/insights/pages/gs-research/gen-ai--too-much-spend,-too-little-benefit-/TOM_AI%202.0_ForRedaction.pdf) on hardware and data centers, but there’s been relatively little to show for it so far. This has led to a chorus of concerns that generative AI is a [bubble](https://www.inc.com/sam-blum/new-warnings-ai-bubble-when-could-it-burst.html). We won’t offer any predictions on what’s about to happen. But we think we have a solid diagnosis of how things got to this point in the first place.

In this post, we explain the mistakes that AI companies have made and how they have been trying to correct them. Then we will talk about five barriers they still have to overcome in order to make generative AI commercially successful enough to justify the investment.

### **Product-market fit**

When ChatGPT launched, people found a thousand unexpected uses for it. This got AI developers overexcited. They completely misunderstood the market, underestimating the huge gap between proofs of concept and reliable products. This misunderstanding led to two opposing but equally flawed approaches to commercializing LLMs. 

OpenAI and Anthropic focused on building models and not worrying about products. For example, it took 6 months for OpenAI to bother to release a ChatGPT iOS app and 8 months for an Android app!

Google and Microsoft shoved AI into everything in a panicked race, without thinking about which products would actually benefit from AI and how they should be integrated.

Both groups of companies forgot the “make something people want” mantra. The generality of LLMs allowed developers to fool themselves into thinking that they were exempt from the need to find a product-market fit, as if prompting a model to perform a task is a replacement for carefully designed products or features.

OpenAI and Anthropic’s DIY approach meant that early adopters of LLMs disproportionately tended to be bad actors, since they are more invested in figuring out how to adapt new technologies for their purposes, whereas everyday users want easy-to-use products. This has contributed to a poor public perception of the technology.[1](#footnote-1)

Meanwhile the AI-in-your-face approach by Microsoft and Google has led to features that are occasionally useful and more often annoying. It also led to many unforced errors due to inadequate testing like Microsoft's early [Sydney](https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html) chatbot and Google's [Gemini](https://www.theverge.com/2024/2/21/24079371/google-ai-gemini-generative-inaccurate-historical) image generator. This has also caused a backlash.

But companies are changing their ways. OpenAI seems to be transitioning from a research lab focused on a speculative future to something resembling a regular product company. If you take all the human-interest elements out of the OpenAI boardroom drama, it was fundamentally about the company's shift from creating gods to building products. Anthropic has been picking up many of the researchers and developers at OpenAI who cared more about artificial general intelligence and felt out of place at OpenAI, although Anthropic, too, has recognized the need to build products.

Google and Microsoft are slower to learn, but our guess is that [Apple](https://www.vox.com/technology/354794/apple-artificial-intelligence-ai-wwdc) will force them to change. Last year Apple was seen as a laggard on AI, but it seems clear in retrospect that the slow and thoughtful approach that Apple showcased at WWDC, its developer conference, is more likely to resonate with users.[2](#footnote-2) Google seems to have put more thought into integrating AI in its upcoming [Pixel](https://blog.google/products/pixel/google-pixel-9-pro-xl/) phones and Android than it did into integrating it in search, but the phones aren’t out yet, so let’s see. 

And then there’s Meta, whose vision is to use AI to create content and engagement on its ad-driven social media platforms. The societal implications of a world awash in AI-generated content are [double-edged](https://knightcolumbia.org/content/how-to-prepare-for-the-deluge-of-generative-ai-on-social-media), but from a business perspective it makes sense.

### **The big five challenges for consumer AI**

There are five limitations of LLMs that developers need to tackle in order to make compelling AI-based consumer products.[3](#footnote-3) (We will discuss many of these in our upcoming [online workshop](https://sites.google.com/princeton.edu/agents-workshop) on building useful and reliable AI agents on August 29.)

#### **1\. Cost**

There are many applications where capability is not the barrier, cost is. Even in a simple chat application, cost concerns dictate how much history a bot can keep track of — processing the entire history for every response quickly gets prohibitively expensive as the conversation grows longer.

There has been rapid progress on cost — in the last 18 months, cost-for-equivalent-capability has dropped by a factor of over 100.[4](#footnote-4) As a result, companies are claiming that LLMs are, or will soon be, “[too cheap to meter](https://x.com/sama/status/1813984333352649087)”. Well, we’ll believe it when they make the API free. 

More seriously, the reason we think cost will continue to be a concern is that in many applications, cost improvements directly translate to accuracy improvements. That’s because repeatedly retrying a task tens, thousands, or even millions of times turns out to be a good way to improve the chances of success, given the randomness of LLMs. So the cheaper the model, the more retries we can make with a given budget. We quantified this in our [recent paper](https://www.aisnakeoil.com/p/new-paper-ai-agents-that-matter) on agents; since then, many other papers have made [similar](https://arxiv.org/pdf/2407.21787v1) [points](https://arxiv.org/html/2408.03314v1).

That said, it is plausible that we’ll soon get to a point where in *most* applications, cost optimization isn’t a serious concern.

#### **2\. Reliability**

We see capability and reliability as somewhat orthogonal. If an AI system performs a task correctly 90% of the time, we can say that it is *capable* of performing the task but it cannot do so *reliably*. The techniques that get us to 90% are unlikely to get us to 100%. 

With statistical learning based systems, perfect accuracy is intrinsically hard to achieve. If you think about the success stories of machine learning, like ad targeting or fraud detection or, more recently, weather forecasting, perfect accuracy isn’t the goal — as long as the system is better than the state of the art, it is useful. Even in medical diagnosis and other healthcare applications, we [tolerate](https://www.himss.org/news/north-carolina-hospital-system-reduces-sepsis-cases-using-predictive-analytics) a lot of error. 

But when developers put AI in consumer products, people expect it to behave like software, which means that it needs to work deterministically. If your AI travel agent books vacations to the correct destination only 90% of the time, it won’t be successful. As we’ve [written before](https://www.aisnakeoil.com/p/new-paper-ai-agents-that-matter), reliability limitations partly explain the failures of recent AI-based gadgets. 

AI developers have been slow to recognize this because as experts, we are used to conceptualizing AI as fundamentally different from traditional software. For example, the two of us are heavy users of chatbots and agents in our everyday work, and it has become almost automatic for us to work around the hallucinations and unreliability of these tools. A year ago, AI developers hoped or assumed that non-expert users would learn to adapt to AI, but it has gradually become clear that companies will have to adapt AI to user expectations instead, and make AI behave like traditional software.

Improving reliability is a research interest of our team at Princeton. For now, it’s fundamentally an open question whether it’s possible to build deterministic systems out of stochastic components (LLMs). Some companies have claimed to have solved reliability — for example, legal tech vendors have touted “hallucination-free” systems. But these claims were shown to be [premature](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf).

#### **3\. Privacy**

Historically, machine learning has often relied on sensitive data sources such browsing histories for ad targeting or medical records for [health tech](https://www.wired.com/story/google-deepmind-nhs-health-data/). In this sense, LLMs are a bit of an anomaly, since they are primarily trained on public sources such as web pages and books.[5](#footnote-5)

But with AI assistants, privacy concerns have come roaring back. To build useful assistants, companies have to train systems on user interactions. For example, to be good at composing emails, it would be very helpful if models were [trained on emails](https://www.nytimes.com/2024/06/26/technology/terms-service-ai-training.html). Companies’ privacy policies are vague about this and it is not clear to what extent this is happening.[6](#footnote-6) Emails, documents, screenshots, etc. are potentially much more sensitive than chat interactions. 

There is a distinct type of privacy concern relating to inference rather than training. For assistants to do useful things for us, they must have access to our personal data. For example, Microsoft announced a controversial feature that would involve taking screenshots of users’ PCs every few seconds, in order to give its CoPilot AI a memory of your activities. But there was an outcry and the company [backtracked](https://www.bbc.com/news/articles/cd11rje1mrro).

We caution against purely technical interpretations of privacy such as “the data never leaves the device.” Meredith Whittaker [argues](https://mobile.x.com/mer__edith/status/1790692059059200017) that on-device fraud detection normalizes always-on surveillance and that the infrastructure can be repurposed for more oppressive purposes. That said, [technical innovations](https://www.wired.com/story/apple-intelligence-android-hybrid-ai-privacy/) can definitely help.

#### **4\. Safety and security**

There is a cluster of related concerns when it comes to safety and security: unintentional failures such as the [biases](https://www.cnbc.com/2024/02/26/googles-gemini-ai-picture-generator-to-relaunch-in-a-few-weeks.html) in Gemini’s image generation; misuses of AI such as voice cloning or deepfakes; and hacks such as prompt injection that can leak users’ data or harm the user in other ways.

We think accidental failures are fixable. As for most types of misuses, our view is that there is [no way](https://www.aisnakeoil.com/p/ai-safety-is-not-a-model-property) to create a model that can’t be misused and so the defenses must primarily be located downstream. Of course, not everyone agrees, so companies will keep getting bad press for inevitable misuses, but they seem to have absorbed this as a cost of doing business. 

Let’s talk about the third category — hacking. From what we can tell, it is the one that companies seem to be paying the least attention to. At least theoretically, [catastrophic hacks](https://arxiv.org/abs/2302.12173) are possible, such as AI worms that spread from user to user, tricking those users’ AI assistants into doing harmful things including creating more copies of the worm. 

Although there have been plenty of proof-of-concept demonstrations and [bug](https://embracethered.com/blog/posts/2023/google-bard-data-exfiltration/) [bounties](https://www.landh.tech/blog/20240304-google-hack-50000/) that uncovered these vulnerabilities in deployed products, we haven't seen this type of attack in the wild. We aren’t sure if this is because of the low adoption of AI assistants, or because the [clumsy defenses](https://kai-greshake.de/posts/approaches-to-pi-defense/) that companies have pulled together have proven sufficient, or something else. Time will tell.

#### **5\. User interface**

In many applications, the unreliability of LLMs means that there will have to be some way for the user to intervene if the bot goes off track. In a chatbot, it can be as simple as regenerating an answer or showing multiple versions and letting the user pick. But in applications where errors can be costly, such as flight booking, ensuring adequate supervision is more tricky, and the system must avoid annoying the user with too many interruptions.

The problem is even harder with natural language interfaces where the user speaks to the assistant and the assistant speaks back. This is where a lot of the potential of generative AI lies. As just one example, AI that disappeared into your [glasses](https://www.techradar.com/computing/artificial-intelligence/i-finally-tried-the-meta-ai-in-my-ray-ban-smart-glasses-thanks-to-an-accidental-uk-launch-and-its-by-far-the-best-ai-wearable) and spoke to you when you needed it, without even being asked — such as by detecting that you were staring at a sign in a foreign language — would be a whole different experience than what we have today. But the constrained user interface leaves very little room for incorrect or unexpected behavior.

#### **Concluding thoughts**

AI boosters often claim that due to the rapid pace of improvement in AI capabilities, we should see massive societal and economic effects soon. We are [skeptical](https://www.aisnakeoil.com/p/ai-scaling-myths) of the trend extrapolation and sloppy thinking that goes into those capability forecasts. More importantly, even if AI capability does improve rapidly, developers have to solve the challenges discussed above. These are sociotechnical and not purely technical, so progress will be slow. And even if those challenges are solved, organizations need to integrate AI into existing products and workflows and train people to use it productively while avoiding its pitfalls. We should expect this to happen on a timescale of a decade or more rather than a year or two. 

#### **Further reading**

Benedict Evans has [written](https://www.ben-evans.com/benedictevans/2023/10/5/unbundling-ai) [about](https://www.ben-evans.com/benedictevans/2024/6/8/building-ai-products) the importance of building single-purpose software using general-purpose language models. 

[1](#footnote-anchor-1)

To be clear, we don't think that reducing access to state-of-the-art models will [reduce](https://www.aisnakeoil.com/p/licensing-is-neither-feasible-nor) misuse. But when it comes to LLMs, misuse is easier than legitimate uses (which require thought), so it isn't a surprise that misuses have been widespread.

[2](#footnote-anchor-2)

The pace of AI adoption is relative. Even Apple's approach to integrating AI into its products has been [criticized](https://www.newyorker.com/culture/infinite-scroll/apple-is-bringing-ai-to-your-personal-life-like-it-or-not) as too fast-paced. 

[3](#footnote-anchor-3)

These are about factors that matter to the user experience; we are setting aside environmental costs, training on copyrighted data, etc.

[4](#footnote-anchor-4)

For example, GPT-3.5 (text-davinci-003) in the API cost $20 per million tokens, whereas gpt-4o-mini, which is more powerful, costs only 15 cents.

[5](#footnote-anchor-5)

To be clear, just because the data sources are public [doesn’t mean](https://arxiv.org/pdf/2212.06470) there are no privacy concerns.

[6](#footnote-anchor-6)

For example, Google says “we use publicly available information to help train Google’s AI models”. Elsewhere it says that it may use private data such as emails to provide services, maintain and improve services, personalize services, and develop new services. One approach that is consistent with these disclosures is that only public data is used for pre-training of models like Gemini, but private data is used to fine-tune those models to create, say, an email auto-response bot. Anthropic is the one exception we know of. It says: “We do not train our generative models on user-submitted data unless a user gives us explicit permission to do so. To date we have not used any customer or user-submitted data to train our generative models.” This commitment to privacy is admirable, though we predict that it will put the company at a disadvantage if it more fully embraces building products.