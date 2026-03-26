---
title: "OpenAI's alignment problem"
author: "Casey Newton"
publication: "Platformer"
publication_slug: "platformer"
published_at: "2023-11-21T01:47:51.000Z"
source_url: "https://platformer.substack.com/p/openais-alignment-problem"
word_count: 2997
estimated_read_time: 15
---

**I.**

Less than two months ago, on stage at the Code Conference, I asked Helen Toner how she thought about the awesome power that she’d been entrusted with as a board member at OpenAI. Toner has the power [under the company’s charter](https://openai.com/charter) to halt OpenAI’s efforts to build an artificial general intelligence. If the circumstances presented themselves, would she really stop the company’s work and redirect employees to working on other projects?

At the time, Toner demurred. I had worded my question inelegantly, suggesting that she might be able to shut down the company entirely. The moment passed, and I never got my answer — until this weekend, when the board Toner serves on effectively ended OpenAI as we know it. (She declined to comment when I emailed her.)

By now I assume you have caught up on the seismic events of the past three days at OpenAI: the [shock firing on Friday of CEO Sam Altman](https://www.theverge.com/2023/11/17/23965982/openai-ceo-sam-altman-fired), followed by [company president Greg Brockman quitting in solidarity](https://techcrunch.com/2023/11/17/greg-brockman-quits-openai-after-abrupt-firing-of-sam-altman/); a weekend spent [negotiating their possible returns](https://www.theverge.com/2023/11/18/23967199/breaking-openai-board-in-discussions-with-sam-altman-to-return-as-ceo); ex-Twitch CEO Emmett Shear [being installed by the board as OpenAI's new interim CEO](https://www.reuters.com/technology/who-is-openais-interim-ceo-emmett-shear-2023-11-20/); and minority investor Microsoft swooping in to create [a new advanced research division for Altman and Brockman to run](https://www.nytimes.com/2023/11/20/technology/openai-altman-ceo-not-returning.html).

By mid-afternoon Monday, [more than 95 percent of OpenAI employees had signed a letter threatening to quit](https://www.wired.com/story/openai-staff-walk-protest-sam-altman/) unless Altman and Brockman are reinstated. It seems all but certain that there will be more twists to come.

I found this turn of events as stunning as anyone, not least because I had just interviewed Altman on Wednesday for Hard Fork. I had run into him a few days before OpenAI’s developer conference, and he suggested that we have a conversation about AI’s long-term future. We set it up for last week, and my co-host Kevin Roose and I asked about everything that has been on our minds lately: about copyright, about open-source development, about building AI responsibly and avoiding worst-case scenarios. (We’ve just [posted that interview, along with a transcript, here](https://www.nytimes.com/2023/11/20/podcasts/mayhem-at-openai-our-interview-with-sam-altman.html).)

The days that follow revealed fundamental tensions within OpenAI about its pace of development and the many commitments of its CEO. But in one fundamental respect, the story remains as confusing today as it did on Friday when the board made its bombshell announcement: why, exactly, did OpenAI’s board fire Sam Altman?

The official explanations have proliferated. The board’s original stated reason was that Altman “[was not consistently candid in his communications with the board, hindering its ability to exercise its responsibilities](https://openai.com/blog/openai-announces-leadership-transition).” In an all-hands meeting the next day, the company’s chief scientist and a member of the board, Ilya Sutskever, suggested that the removal had been necessary “[to make sure that OpenAI builds AGI that benefits all of humanity](https://www.theinformation.com/articles/before-openai-ousted-altman-employees-disagreed-over-ai-safety?rc=8aq5ai).” To some employees, the remark suggested that the firing may have been connected to concerns that OpenAI was unduly accelerating the development of the technology.

Later on Saturday, the chief operating officer, Brad Lightcap, ruled out many possible explanations while blaming the situation on poor communication. “We can say definitively that the board’s decision was not made in response to malfeasance or anything related to our financial, business, safety or security/privacy practices,” [he told employees](https://www.nytimes.com/2023/11/18/technology/sam-altman-open-ai.html). “This was a breakdown in communication between Sam and the board.”

The following evening, after he was named CEO, Shear also ruled out a safety explanation. “The board did \*not\* remove Sam over any specific disagreement on safety, their reasoning was completely different from that,” he [posted on X](https://twitter.com/eshear/status/1726526112019382275?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet), without elaborating.

The cumulative effect of these statements was to all but exonerate Altman. In a few short years, he had led the company from a nonprofit research effort to a company [worth as much as $90 billion to investors](https://www.wsj.com/tech/ai/openai-seeks-new-valuation-of-up-to-90-billion-in-sale-of-existing-shares-ed6229e0). And now he was being driven out over some unspecified miscommunications? It didn’t add up.

In their silence, the board ensured that Altman became the protagonist and hero of this story. Altman’s strategic X posts, cleverly coordinated with his many allies at the company, gave him the appearance of a deposed elected official about to be swept back into power by the sheer force of his popularity.

By the time Susteveker [apologized for his role in the coup Monday morning](https://twitter.com/ilyasut/status/1726590052392956028), and expressed his desire to reinstate Altman and Brockman to their roles, I had officially lost the plot. By some accounts, Susteveker had spearheaded the effort to remove Altman from his post. Now that he’s had some time to read the room, apparently, he’s changed his mind.

So far much of the attention this story has received has focused, understandably, on the value that has been destroyed. ChatGPT is the most compelling product in a generation, and had it been left to develop according to plan it likely would have cemented OpenAI’s position as one of the three or four most important technology companies in the world.

But to most people, it will never matter how much OpenAI was worth. What matters is what it built, and how it deployed it. What jobs it destroyed, and what jobs it created. What capabilities the company’s technology has — and what features it disabled before releasing.

Navigating those tensions is the role of OpenAI’s nonprofit board. And while it botched its role badly, that can’t be the end of the story.

*Someone* has to navigate those tensions. And before we blame this weekend’s fiasco on OpenAI’s unusual structure, or on nonprofit governance broadly, it’s worth considering why the board was set up this way in the first place.

**II.**

When they launched OpenAI in 2015, the founders considered several models. One was a public-sector project funded by the government — but our government being what it is, they saw no feasible way to spin up such an effort. Another was a venture-backed startup. But the founders believed the superintelligence they were trying to build should not be concentrated in the hands of a single for-profit company.

That left the non-profit model, which [they hoped](https://openai.com/our-structure) “would be the most effective vehicle to direct the development of safe and broadly beneficial AGI while remaining unencumbered by profit incentives." They set out to raise $1 billion — Elon Musk said he contributed $100 million — and set to work.

Four years later, they discovered what everyone else who tries to train a large language model eventually realizes: even $1 billion doesn’t get you very far. To continue building, they would have to take money from private investors — which meant setting up a for-profit entity underneath the nonprofit, similar to the way the Mozilla Foundation owns the corporation that oversees revenue operations for the Firefox browser, or how the nonprofit Signal Foundation owns the LLC that operates the messaging app.

While the membership of the board has changed over the years, its makeup has always reflected a mix of public-benefit and corporate interests. At the time of Altman’s firing, though, it had arguably skewed away from the latter. In March, LinkedIn co-founder [Reid Hoffman left the board](https://www.cnbc.com/2023/03/03/reid-hoffman-steps-down-from-openai-board-to-avoid-potential-conflicts.html); he co-founded a for-private rival [two months later](https://www.reuters.com/technology/reid-hoffmans-new-ai-startup-inflection-launches-chatgpt-like-chatbot-2023-05-02/).

That left three OpenAI employees on the board: Altman, Brockman, and Sutskever. And it left three independent directors: Toner, Quora co-founder Adam D’Angelo, and entrepreneur Tasha McCauley. Toner and McCauley have worked in the effective altruism movement, which seeks to maximize the leverage on philanthropic dollars to do the most good possible.

The reputation of effective altruism cratered last year along with the fortunes of one of its most famous adherents, Sam Bankman-Fried. Bankman-Fried had sought to generate wealth as rapidly as possible so he could begin giving it all away, ultimately defrauding FTX customers out of billions of dollars. Taken to this extreme, EA can create harmful incentives. 

But for rank-and-file EAs, the movement’s core idea was to apply some intellectual rigor to philanthropy, which too often serves only to flatter the egos of its donors. EA groups often invest in areas that other funders neglect, and were early funders of research into the potential long-term consequences of AI. They feared that advances in AI would begin to accelerate at a rapid clip, and then compound, delivering a superintelligence into the world before we made the necessary preparations.

The EAs were interested in this long before large language models were widely available. And the thing is, they were *right*: we are currently living at a time of exponential improvement in AI systems, as anyone who used both GPT-3 and GPT-4 can attest. AI safety researchers will be the first to tell you that this exponential progress could hit a curve: that we won’t be able to solve the research questions necessary to see a similar step-change in functionality if and when a theoretical GPT-5 is ever trained and released.

But given the progress that has been made just in the past couple years, the EAs would say, shouldn’t we do some worst-case-scenario planning? Shouldn’t we move cautiously as we build systems that aid in the discovery of novel bioweapons, or can plan and execute schemes on behalf of cybercriminals, or who can corrupt our information sphere with synthetic media and hyper-personalized propaganda?

If you are running a for-profit company, questions like these can be extremely annoying: they can suffocate product development under layers of product, policy, and regulatory review. If you’re a nonprofit organization, though, these can feel like the *only* questions to ask. OpenAI was founded, after all, as a research project. It was never meant to compete on speed.

And yet, as [](https://www.theatlantic.com/technology/archive/2023/11/sam-altman-open-ai-chatgpt-chaos/676050/)*[The Atlantic](https://www.theatlantic.com/technology/archive/2023/11/sam-altman-open-ai-chatgpt-chaos/676050/)* [reported over the weekend](https://www.theatlantic.com/technology/archive/2023/11/sam-altman-open-ai-chatgpt-chaos/676050/), ChatGPT itself launched last year less out of the company’s certainty that it would be beneficial to society than the fear that Anthropic was about to launch a chatbot of its own. Time and again over the next year, OpenAI’s for-profit arm would make moves to extend its product lead over its rivals. Most recently, at its developer conference, the company announced GPTs: custom chatbots that represent a first step toward agents that can perform higher-level coordination tasks. Agents are a top concern of AI safety researchers — and their release reportedly infuriated Sutskever.

And during all this time, was Altman squarely focused on OpenAI? Well … not really. He was launching [Worldcoin](https://worldcoin.org/blog/announcements/worldcoin-project-launches), his eyeball-scanning crypto orb project. He was raising a new venture fund that would focus on “hard” tech, [according to](https://www.semafor.com/article/11/17/2023/openai-board-fires-sam-altman) *[Semafor](https://www.semafor.com/article/11/17/2023/openai-board-fires-sam-altman)*. He was also seeking billions to create a new company that would build AI chips, [Bloomberg reported](https://www.bloomberg.com/news/articles/2023-11-19/altman-sought-billions-for-ai-chip-venture-before-openai-ouster).

Silicon Valley has a long history of founders running multiple companies. Steve Jobs had roles at Apple and Pixar simultaneously; Jack Dorsey served as CEO of Twitter and Square at the same time.

What’s different in the Altman case is that OpenAI was driven by a public mission, and one that would seem to foreclose certain for-profit extracurricular work. If OpenAI is designed to promote cautious AI development, and its CEO is working to build a for-profit chip company that might accelerate AI development significantly, the conflict seems obvious. And that’s before you even get into the question of what Altman told the board about any of this, and when.

None of which is to say that the board couldn’t have found a way to resolve this situation without firing Altman. Particularly given the billions of dollars at stake. But the board’s job is explicitly to ignore any concerns about money in favor of safe AI development. And they would [not be the first people to break with Altman over fears that OpenAI has not been true to its mission](https://www.newcomer.co/p/give-openais-board-some-time-the).

**III.**

However valid these concerns may have been, it’s now clear that the board overplayed its hand. The success of ChatGPT had made the nonprofit an afterthought in the minds of its 700-plus employees, to say nothing of the world at large. And Altman is a popular leader, both inside OpenAI and as a kind of roving AI diplomat. The board was never going to win a fight with him, even if it had communicated its position effectively.

Now the board stands to lose everything. One former employee described OpenAI to me over the weekend as “a money incinerator.” As successful as it is, ChatGPT is not close to being profitable. There’s a reason Altman was out raising new capital — the company needs it to keep the lights on. And now, with everything that has transpired, it is extremely difficult to imagine how the company could raise the funds necessary to power its ambitions — assuming it even has any employees left to execute on them.

On one hand, history may show that the board did serve as good stewards of their mission. On the other, though, the board was also responsible for being a good steward of OpenAI as an *institution*. In that, it failed entirely.

It is understandable to look at this wreckage and think — well, that’s what happens when you mix nonprofit governance with for-profit incentives. And surely there is something to that point of view.

At the same time, though, it’s worth asking whether we would still be so down on OpenAI’s board had Altman been focused solely on the company and its mission. There’s a world where an Altman, content to do one job and do it well, could have managed his board’s concerns while still building OpenAI into the juggernaut that until Friday it seemed destined to be.

That outcome seems preferable to the world we now find ourselves in, where AI safety folks have been made to look like laughingstocks, tech giants are building superintelligence with a profit motive, and social media flattens and polarizes the debate into warring fandoms. OpenAI’s board got almost everything wrong, but they were right to worry about the terms on which we build the future, and I suspect it will now be a long time before anyone else in this industry attempts anything other than the path of least resistance.

**Correction, 11/21:** *I updated the language in this story to reflect that while they set out to raise $1 billion, it’s unclear that the OpenAI team actually reached that figure*.

\---

**On the emergency podcast today:** Kevin and I trade notes on the weekend’s events. And then, we present our interview from Wednesday with Altman, in the final hours before OpenAI got turned upside-down. (This episode will take the place of our usual Friday episode; we’ll be back next week after the holiday.)

**[Apple](https://substack.com/redirect/1f026a90-0a73-4c06-91a5-d9f0074230ed?r=9cs7) | [Spotify](https://substack.com/redirect/1ab817bf-db21-4c76-8b8b-73c3d62d0dd7?r=9cs7) | [Stitcher](https://substack.com/redirect/8f21522a-d6a1-4ec4-a4db-2acaea82bd59?r=9cs7) | [Amazon](https://substack.com/redirect/facb11f9-5648-4c10-8629-af0dbc7a8f4a?r=9cs7) | [Google](https://substack.com/redirect/3bae724f-a172-4879-83b3-50b787887714?r=9cs7) | [YouTube](https://www.youtube.com/@hardfork)**

\---

### Governing

-   [Google v. DOJ: As the case came to a close, Judge Amit Mehta was undecided, saying had “no idea” what he was going to do.](https://www.reuters.com/legal/us-wraps-up-antitrust-case-against-google-historic-trial-2023-11-16/) Closing arguments somehow don’t take place until May. (Reuters)
    
-   [A federal judge declined to let Elon Musk avoid a deposition in an FTC investigation and rejected X’s attempt to overturn an FTC order that imposed requirements on safeguarding personal user data.](https://www.washingtonpost.com/technology/2023/11/16/twitter-musk-ftc-consent-agreement-decision/) (Joseph Menn / *Washington Post*)
    
-   [Apple paused all advertising on X after its ads were placed along far-right content and Musk backed an antisemitic post.](https://www.axios.com/2023/11/17/apple-twitter-x-advertising-elon-musk-antisemitism-ads) Good! (Ina Fried / *Axios*)
    
    -   [Disney, Warner Bros Discovery, Paramount, and Lions Gate have also paused ad campaigns on X after Musk’s endorsement of an antisemitic post.](https://www.cnbc.com/2023/11/17/apple-has-paused-advertising-on-x-after-musk-promoted-antisemitic-tweet.html) (Jonathan Vanian / *CNBC*)
        
    -   [The European Commission also decided to temporarily suspend advertising on X, citing “widespread concerns relating to the spread of disinformation”.](https://www.politico.eu/article/no-more-ads-elon-musk-x-twitter-european-commission-tell-staff/) (Nicholas Vinocur / *POLITICO*)
        
    -   [But right-wing media companies and influencers are pledging support for Musk, saying they will advertise on X to help recoup the losses in ad revenue.](https://mashable.com/article/right-wing-pledges-x-twitter-ad-buys-support-elon-musk) (Matt Binder / *Mashable*)
        
-   [Microsoft blocked the term “Disney” from its AI image generator tool after a viral trend saw users creating Disney film posters of their dogs, raising copyright concerns.](https://www.ft.com/content/64958031-6d7b-4c2c-aeb3-d4df0b04ae32) (Cristina Criddle / *Financial Times*)
    
-   [Apple filed a challenge against the European Digital Markets Act in an effort to avoid the App Store being designated as gatekeeper.](https://www.reuters.com/legal/transactional/apple-files-legal-challenge-eus-digital-markets-act-2023-11-17/) If the App Store isn’t a gatekeeper, what is? (Martin Coulter / Reuters)
    
-   [The Italian Competition Authority is probing Meta over how it marks branded content and how the tool is used in relation to promotional content on Instagram.](https://www.wsj.com/tech/meta-faces-probe-by-italian-watchdog-over-instagrams-branded-content-8d319df1?mod=followamazon) (Giulia Petroni / *The Wall Street Journal*)
    
-   [France, Germany and Italy have reportedly reached an agreement on AI regulation, with an emphasis on regulating how AI systems are applied rather than limiting the technology itself.](https://www.reuters.com/technology/germany-france-italy-reach-agreement-future-ai-regulation-2023-11-18/) (Andrea Rinke / Reuters)
    

\---

### Industry

-   [X’s job search tool is now live on the web version of the app, with open positions across a number of tech companies including Musk’s Space X, Neuralink, Tesla, and x.ai.](https://www.engadget.com/xs-job-search-tool-is-now-live-on-the-web-010200007.html?guccounter=1&guce_referrer=aHR0cHM6Ly90ZWNobWVtZS5jb20v&guce_referrer_sig=AQAAABVa2-sbPlKZPWvTde5rMNTpidjE6CjXjZn7WpJ_LRj9bOvNTnOJlq1ioi9YHgmP6jXLis0lUd3ljQ5r_ftS-0yGqT72nmkuvUF4MzKqaGdDfajV8uydi5DCLh020XW16lKMHKZkTBPoAIKJFa3sCIyjt8DAQPVyS6K7Sejj06Gd) I wonder why there are so many openings at those companies. (Karissa Bell / *Engadget*)
    
-   [The updated developer terms on X suggests that EU researchers will once again have access to the platform’s API.](https://techcrunch.com/2023/11/17/change-in-xs-terms-indicate-eu-researchers-will-get-api-access/) But likely only due to European regulation. (Ivan Mehta / *TechCrunch*)
    
-   [Amazon is reportedly set to cut several hundred roles in the Alexa division, as it shifts its focus to generative AI.](https://www.geekwire.com/2023/amazon-will-cut-several-hundred-more-jobs-on-alexa-team-as-it-discontinues-some-initiatives/) (Todd Bishop / *GeekWire*)
    
-   [Meta AI researchers said its image generation model, Emu, had made breakthroughs in text-to-image editing and video generation.](https://siliconangle.com/2023/11/16/meta-announces-new-breakthroughs-ai-image-editing-video-generation-emu/) (Mike Wheatley / *Silicon Angle*)
    
-   [Meta has reportedly split up its team tasked with understanding and preventing AI-related harms and diverting employees to its generative AI team instead.](https://www.theinformation.com/articles/meta-breaks-up-its-responsible-ai-team?rc=8aq5ai) (Kalley Huang and Sylvia Varnham O’Regan / *The Information*)
    
-   [Ex-Meta employees are forming their own startups and venture capital firms selling trust and safety technology amid the Israel-Hamas conflict — and finding a robust market.](https://www.cnbc.com/2023/11/17/ex-meta-staffers-sell-trust-and-safety-tech-during-israel-hamas-war.html) (Jonathan Vanian / *CNBC*)
    
-   [Google is reportedly delaying the release of its next-generation Gemini AI model till the first quarter of next year for cloud customers and business partners.](https://www.theinformation.com/articles/google-delays-cloud-release-of-gemini-ai-that-aims-to-compete-with-openai) (Jon Victor / *The Information*)
    
-   [Google announced plans to gradually phase out third-party cookies in Chrome, with a 1 percent user testing period beginning early next year.](https://www.bleepingcomputer.com/news/google/google-shares-plans-for-blocking-third-party-cookies-in-chrome/#google_vignette) (Mayank Parmar / *Bleeping Computer*)
    
-   [Snap CEO Evan Spiegel is putting pressure on his staff to work harder, apparently walking around the company’s headquarters and noting who has been working late in the office.](https://www.theinformation.com/articles/to-revive-snap-evan-spiegel-takes-a-page-from-hardcore-playbook) (Erin Woo / *The Information*)
    
-   [Tinder is revamping its profile pages with a bunch of features, including profile prompts, quizzes, basic info tags, and dark mode.](https://techcrunch.com/2023/11/20/tinder-redesigns-profile-pages-with-prompts-info-tags-and-quiz/) (Ivan Mehta / *TechCrunch*)
    
-   [Discord is shutting down its experimental AI chatbot Clyde and deactivating it at the end of the month.](https://www.theverge.com/2023/11/17/23965185/discord-is-shutting-down-its-ai-chatbot-clyde) (Tom Warren / *The Verge*)
    

\---

### Those good posts

*Send us good posts from Bluesky and Threads! Just reply to this email.*

([Link](https://staging.bsky.app/profile/asherelbein.bsky.social/post/3kelg2xlg5o2n))

([Link](https://staging.bsky.app/profile/juniorhoncho.bsky.social/post/3kekojegbds2x))

([Link](https://staging.bsky.app/profile/pattonoswalt.bsky.social/post/3kel6fzqosf2p))

\---

### Talk to us

Send us tips, comments, questions, and posts: [casey@platformer.news](mailto:casey@platformer.news) and [zoe@platformer.news](mailto:zoe@platformer.news).