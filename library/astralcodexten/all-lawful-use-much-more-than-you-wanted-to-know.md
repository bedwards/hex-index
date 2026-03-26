---
title: "\"All Lawful Use\": Much More Than You Wanted To Know"
author: "Scott Alexander"
publication: "Astral Codex Ten"
publication_slug: "astralcodexten"
published_at: "2026-03-01T19:52:04.000Z"
source_url: "https://www.astralcodexten.com/p/all-lawful-use-much-more-than-you"
word_count: 3513
estimated_read_time: 18
---

Last Friday, Secretary of War Pete Hegseth declared AI company Anthropic a “[supply chain risk](https://x.com/SecWar/status/2027507717469049070)”, the first time this designation has ever been applied to a US company. The trigger for the move was Anthropic’s [refusal](https://www.anthropic.com/news/statement-department-of-war) to allow the Department of War to use their AIs for mass surveillance and autonomous weapons.

A few hours later, Hegseth and Sam Altman declared an agreement-in-principle for OpenAI’s models to be used in the niche vacated by Anthropic. Altman [stated](https://openai.com/index/our-agreement-with-the-department-of-war/) that he had received guarantees that OpenAI’s models wouldn’t be used for mass surveillance or autonomous weapons either, but given Hegseth’s unwillingness to concede these points with Anthropic, observers speculated that the safeguards in Altman’s contract must be weaker or, in a worst-case scenario, completely toothless.

The debate centers on the Department of War’s demand that AIs be permitted for “all lawful use”. Anthropic worried that mass surveillance and autonomous weaponry would *de facto* fall in this category; Hegseth and Altman have tried to reassure the public that they won’t, and the parts of their agreement that have leaked to the public cite the statutes that Altman expects to constrain this category. Altman’s initial statement seemed to suggest additional prohibitions, but on a closer read, provides little tangible evidence of meaningful further restrictions.

Some alert ACX readers[1](#footnote-1) have done a deep dive into national security law to try to untangle the situation. Their conclusion mirrors that of Anthropic and the majority of Twitter commenters: this is not enough. Current laws against domestic mass surveillance and autonomous weapons have wide loopholes in practice. Further, many of the rules which do exist can be changed by the Department of War at any time. Although OpenAI’s national security lead [said](https://x.com/natseckatrina/status/2027908878952722693) that “we intended \[the phrase ‘all lawful use’\] to mean \[according to the law\] at the time the contract is signed’, this is not how contract law usually works, and not how the provision is likely to be enforced[2](#footnote-2). Therefore, these guarantees are not helpful.

*\[EDIT: To clarify: The DoW can change their own policies at will, but can’t change laws. In addition to OpenAI’s claim of being robust to changing laws, OpenAI argues that they’re protected against changes to DoW policies because they explicitly reference the relevant policies as they exist today. Based on public information, this argument seems dubious. See ‘Comments on OpenAI’s FAQ’ below.\]*

To learn more about the details, let’s look at the law:

# Mass domestic surveillance: more than you wanted to know

**Mass and targeted surveillance of foreigners** in their foreign countries is legal. Broadly, the courts have declined to grant standing to allow court cases to test the Executive Branch’s position that the [President has inherent powers derived from his constitutional role to authorize foreign intelligence and counterintelligence surveillance](https://www.brennancenter.org/our-work/analysis-opinion/how-fix-us-surveillance-law#:~:text=When%20the%20government%20collects%20foreign%20intelligence%20abroad,to%20review%20or%20approval%20by%20any%20court), which de facto has allowed this position to become the standard Executive Branch argument for lawfulness.

**Targeted surveillance of Americans** domestically is legal for domestic law enforcement purposes and (in narrow and usually time-limited cases) for intelligence and counterterrorism. The surveilling agency must get the permission of a court first: normal courts for law enforcement, the Foreign Intelligence Surveillance Act (FISA) court for intelligence. This latter category includes things like wiretapping Americans suspected of spying for Russia.

**Mass domestic surveillance of Americans**, American companies, and US permanent residents (or for that matter [generally their counterparts in other Five Eyes partners](https://www.lowyinstitute.org/publications/we-need-five-eyes-spy-network-oversight#:~:text=The%20partnership%20has%20one%20core%20rule%2C%20that%20the%20members%20agree%20not%20to%20spy%20on%20each%20other.%20Or%2C%20as%20Admiral%20Dennis%20Blair%2C%20Barack%20Obama%E2%80%99s%20first%20director%20of%20national%20intelligence%2C%20said%20in%20Australia%20in%202013%3A%20%E2%80%9CWe%20do%20not%20spy%20on%20each%20other.%20We%20just%20ask.%E2%80%9D) – UK, Canada, Australia, and New Zealand) is more complicated. The current law is (roughly) that it’s illegal to seek this kind of data, but legal to “incidentally obtain” it. So for example, if the US was looking for al-Qaeda communications, it might tap a major undersea cable, and if tapping that cable happened to incidentally give it data on millions of Americans, it could keep that data. But after “incidentally obtaining” the data, it [may only query the resulting database in a targeted way](https://www.unwantedwitness.org/nsa-robots-are-collecting-your-data-too-and-theyre-getting-away-with-it/). So the government might take its trove of citizen data that it “incidentally” collected looking for al-Qaeda, and search for a specific citizen’s history if it thinks (for example) that this citizen might be a spy.

The government reserves the term “mass domestic surveillance” for the thing they don’t do (querying their databases *en masse*)*,* preferring terms like “gathering” for what they do do (creating the databases *en masse*). They also reserve the term “collecting” for the querying process - so that when asked “Does the NSA collect any type of data at all on millions or hundreds of millions of Americans?”, a Director of National Intelligence said “no” under oath, even though, by the ordinary meaning of this question, it absolutely does.

(It’s worth noting that the NSA is a DoW agency[3](#footnote-3)).

**Mass analysis of third-party data** is also legal! That is, if they [buy the data](https://www.vice.com/en/article/us-military-location-data-xmode-locate-x/) from some company - let’s say Facebook - they can do whatever they want with it. The main enforceable exception is certain kinds of cell phone location data, which were carved out in a [2018 Supreme Court case](https://www.supremecourt.gov/opinions/17pdf/16-402_h315.pdf).

**Whatever the President thinks is legal** may also, in certain cases, be legal. During the War on Terror, President George W. Bush’s Office of Legal Counsel claimed that he *also* had the inherent constitutional power as President to lawfully authorize [warrantless mass collection of internet metadata and telephone call records](https://www.pogo.org/analyses/secrets-surveillance-and-scandals-the-war-on-terrors-unending-impact-on-americans-private-lives), a dragnet scooping up Americans and non-Americans’ data alike. The program was initially justified by counterterrorism, but was far more expansive[4](#footnote-4). This was such a scandal within the US government that many DOJ officials threatened to resign; even DOJ officials who *didn’t know what was going on* [threatened to resign because they assumed it was so bad](https://www.washingtonpost.com/world/national-security/2017/07/12/8f879432-6704-11e7-a1d7-9a32c91c6f40_story.html#:~:text=Wray%20said%20that%20although,I%27ll%20resign%20with%20you.%22). Later, the program was moved under statutory and FISA Court frameworks, until finally Congress ended it by passing the USA FREEDOM Act.

So why should we be concerned about even “lawful use” of AIs for surveillance? There are stories about each of these categories, but the most compelling is that the government can buy data from third parties (eg tech companies, cell phone companies) and surveil it as much as they want. In the past, the strongest disincentive was scale and cost: you simply cannot look through every text message sent over the course of a month to see which ones mention a certain dissident. There are hacks - you can perform an automated search for the dissident’s name - but also obvious ways around the hack (the dissident can simply not mention their own name in plain text). [AI solves these scale and cost problems](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5182213). An AI could perform meaningful search of all messages in a large database, piecing together patterns to, for example, give each citizen a “presumed loyalty” score.

This is currently a “lawful use” of AI, and one of the ones [Dario Amodei’s letter says](https://www.anthropic.com/news/statement-department-of-war#:~:text=government%20can%20purchase%20detailed%20records%20of%20Americans%E2%80%99%20movements%2C%20web%20browsing%2C%20and%20associations%20from%20public%20sources%20without%20obtaining%20a%20warrant%2C%20a%20practice%20the%20Intelligence%20Community%20has%20acknowledged%20raises%20privacy%20concerns%20and%20that%20has%20generated%20bipartisan%20opposition%20in%20Congress.) that he’s worried about. As far as we can tell, Altman’s contract with the Department of War doesn’t contain any provisions preventing them from using ChatGPT this way.

For more details on mass domestic surveillance: see this [doc](https://docs.google.com/document/d/1rzCraazx0BgEknpxQLKUmM9Vdys-bQyVm9h03r25JII/edit?tab=t.0#heading=h.5hs88tiqunfl).

# Autonomous weapons: more than you wanted to know

Let’s now turn to autonomous weapons. (The authors of this section are not themselves experts, but they consulted with an expert in national security law.)

There is hard Congressional law regulating the use of armed force in general (for example, you’re not allowed to shoot innocent Americans.) But to our knowledge, autonomous weapons in particular are only regulated by Department of War policy - in particular DoD Directive 3000.09. These policies don’t impose meaningful constraints, for two reasons.

First, the policies are vague. Directive 3000.09 requires that autonomous weapon systems be designed to “allow commanders and operators to exercise appropriate levels of human judgment over the use of force.” But it doesn’t define “appropriate”, and the US government has stated it “is a flexible term” where what qualifies “can differ across weapon systems, domains of warfare, types of warfare, operational contexts, and even across different functions in a weapon system.” The institution that decides what’s “appropriate” is the same institution that wants to use the weapon.

Second, the Department of War can change its own policies, so any contract which only guarantees “lawful use” rather than hard-coding some particular standard gives the DoW complete latitude to change the relevant directive (and therefore the terms) whenever they want[5](#footnote-5).

Everyone (including Anthropic) agrees that some form of autonomous weapons will be necessary to win the wars of the future - indeed, autonomous weapons are already being used on the battlefield in Ukraine. But there’s a wide spectrum from humans-entirely-in-the-loop to humans-partly-in-the-loop to humans-totally-unrelated-to-the-loop, and we might want humans involved somewhere for at least two reasons.

First, humans add reliability. For the same reason that chatbots sometimes hallucinate, and coding agents sometimes make [crazy and reckless decisions](https://x.com/jasonlk/status/1946069562723897802) that no human would consider, fully autonomous weapons might make inexplicable mistakes in their use of lethal force, with potentially devastating results.

Second, and more important, human soldiers are a check on the worst abuses of authoritarians. Sometimes a strongman will give an illegal order - to shoot at protesters, to initiate an auto-coup, to begin a genocide - and soldiers will say no. Sometimes those soldiers will decide that the appropriate response is to arrest the strongman instead. However often this happens, the fear of it keeps strongmen in line and forces them to consider public opinion at least insofar as the army is made up of the public. If there’s a fully robotic force that automatically obeys orders, this check disappears.

Some types of fully autonomous weapons are clearly appropriate today (e.g. some missile defences for Navy ships). Many more will plausibly have to be developed in the future, especially if other countries pursue them. But a good system of checks and balances for them does not yet exist. AI companies should take care to not sign a contract that could require them to build systems without adequate safeguards, akin to the safeguards of a soldier’s judgement and respect for the Constitution[6](#footnote-6).

For more details on autonomous weapons, see this [doc](https://docs.google.com/document/d/1oumE7XYsJ2-1XfcskQGfRy16HOdh0u1t8wQ0TwOY3fg/edit?tab=t.0).

# Comments on OpenAI’s FAQ

OpenAI provided an FAQ, which we think is misleading. While we aren’t lawyers, we’ve done our best to lay out our reasoning for this belief, and have also consulted with an expert in national security law on the excerpt of the contract provided in [OpenAI’s announcement](https://openai.com/index/our-agreement-with-the-department-of-war/), and checked that their views were consistent with ours.

> ***Will this deal enable the Department of War to use OpenAI models to power autonomous weapons?***
> 
> *No. Based on our safety stack, our cloud-only deployment, the contract language, and existing laws, regulation and policy, we are confident that this cannot happen. We will also have OpenAI personnel in the loop for additional assurance.*

Since the law straightforwardly permits autonomous weapons, and the contract permits any autonomous weapons allowed by the law, the *“contract language, and existing laws, regulation and policy”* does nothing to prohibit this. OpenAI hasn’t shared enough information about their safety stack for us to be able to evaluate that claim. See below for comments on cloud-only deployment.

Our national security law expert was also very skeptical of the idea that the DoW would have OpenAI personnel meaningfully “in the loop” in sensitive contexts.

> ***Will this deal enable the Department of War to use OpenAI models to conduct mass surveillance on U.S. persons?***
> 
> *No. Based on our safety stack, the contract language, and existing laws that heavily restrict DoW from domestic surveillance, we are confident that this cannot happen. We will also have OpenAI personnel in the loop for additional assurance.*

The law does significantly restrict domestic mass surveillance but, as explained above, leaves loopholes that may concern many readers. Since the contract permits any surveillance allowed by the law, the contract itself does nothing further to restrict the DoW from domestic surveillance. OpenAI hasn’t shared enough information about their safety stack for us to be able to evaluate that claim.

> ***What if the government just changes the law or existing DoW policies?***
> 
> *Our contract explicitly references the surveillance and autonomous weapons laws and policies as they exist today, so that even if those laws or policies change in the future, use of our systems must still remain aligned with the current standards reflected in the agreement.*

It is not the case that the contract consistently references current laws. The first clause says *“The Department of War may use the AI System for **all lawful purposes**, consistent with applicable law, operational requirements, and well-established safety and oversight protocols.”* Our understanding is that later clauses do not automatically override this first clause.

OpenAI’s Head of National Security Partnerships has [said](https://x.com/natseckatrina/status/2027908878952722693) “we intended it to mean ‘the law applicable at the time the contract is signed’”, and their CSO has also made a [similar statement](https://x.com/jasonkwon/status/2027948755467833366?s=20). Our understanding is that this is a highly non-standard interpretation. The national security law expert we consulted agreed, and was very skeptical that the allowed and required activities would remain the same if the law changed (see also [here](https://x.com/CharlieBul58993/status/2028157898371613066), starting from “If OpenAI is just referencing...)

*(EDIT 03/02/2026: A few clarifications about this:*

*We haven’t seen most of the contract. It’s possible that other parts of the contract stipulate OpenAI’s interpretation of “applicable law”.*[7](#footnote-7)

*The FAQ quote above states that the contract “explicitly references the surveillance and autonomous law policies \***as they exist today\***“ (bold in original). From reading the contract excerpt, it’s not clear what is supposed to make this explicit. Perhaps it is the “date stamps” that OpenAI’s Chief Strategy Officer Jason Kwon mentions in his reply [here](https://x.com/jasonkwon/status/2027948755467833366), but this is confusing for two reasons, see footnote*[8](#footnote-8)*.*

*We’d like to clarify the argument for why references to existing laws and policies may not be sufficient to freeze the terms in place if the law or policies change. Above, we wrote that “later clauses \[about specific laws and policies\] do not automatically override this first clause \[allowing ‘all lawful purposes’\]”. This isn’t wrong, but we think there are more relevant arguments, like [those offered](https://x.com/bradrcarson/status/2028335588022100477) by former general counsel of the Army Brad Carson, who is confident that the quoted contract language doesn’t freeze federal law in the way OpenAI wants. See footnote for details)*[9](#footnote-9)

> ***How do you address the arguments Anthropic made in their blog post⁠ about their discussion with the DoW?***
> 
> *(...) Below is why we believe those same red lines would hold in our contract: (...) Fully autonomous weapons. The cloud deployment surface covered in our contract would not permit powering fully autonomous weapons, as this would require edge deployment.*

Autonomous weapons can be steered by an AI in the cloud, just like a human can steer a drone remotely. OpenAI models do not need to be edge deployed in order to power a fully autonomous weapon.

**Overall:** We can’t see how any of OpenAI’s claimed methods for enforcing their red lines would work except possibly if they’re allowed to implement technical safeguards that block certain lawful use, which they’ve shared so little about that we can’t evaluate it. Boaz Barak [suggests](https://x.com/boazbaraktcs/status/2027933591821299723) this is the case. If this is right, it’s strange that they don’t elsewhere stress this as the linchpin of their approach, or show the part of the agreement that guarantees them this ability. Further clarification on this point would be very helpful.

# Questions that you should be asking

If you have access to OpenAI or DoW decision-makers as an employee, journalist, or lawmaker, these are questions you should be asking:

**Immediate questions about the contract.**

First and foremost: Ask to see the full contract, as much as you can get. Scrutinize it yourself or run it by a lawyer in a conversation where attorney-client privilege exists (basically, when you are talking with them for the explicitly-stated intent of potentially securing their legal counsel, or once you’ve formally secured them as your legal counsel).

Beyond that:

-   Does OpenAI’s definition of fully autonomous weapons include non-edge deployed systems like drones operated remotely by AI systems in the cloud? If so, what prevents the DoW from using OpenAI models in this way?
    
-   The DoW has been insistent that private companies shouldn’t dictate how the DoW can use models. OpenAI says they “retain full control over the safety stack we deploy”. How are these compatible? Can you share an excerpt from the agreement that describes OpenAI’s control over the safety stack?
    
-   Would OpenAI’s models assist with bulk analysis of Americans’ data purchased from third parties?
    
-   Will OpenAI’s technical safeguards intentionally block any lawful usage that goes against your red lines?
    
-   Who determines if use is “unlawful”? Does OpenAI have recourse if it believes use is unlawful but the DoW disagrees?
    
-   What “technical safeguards” have been agreed upon? What happens if the DoW and OpenAI disagree about what version of these safeguards are appropriate?
    
-   Does the DoW have options for recourse if OpenAI provides systems with safeguards that the DoW think unduly reduces model performance for specific lawful purposes?
    
-   Does the agreement specify that the NSA and other intelligence agencies inside of the DoW are excluded from being able to access OpenAI models?
    

**Broader questions about the situation:**

-   What prevents the DoW from later demanding these restrictions be loosened, as it did with Anthropic?
    
-   What recourse does OpenAI have if DoW violates the terms of a contract with OpenAI?
    
-   What would stop the DoW from retaliating against OpenAI, as they did with Anthropic, if the DoW and OpenAI have disagreements in the future?
    

Given that existing statements haven’t always been clear and Anthropic has alleged that the contract contains “legalese that would allow those safeguards to be disregarded at will”, we encourage you to read any responses you receive with a skeptical mindset, and ask yourself whether the response is consistent with OpenAI models being used for autonomous weapons systems or domestic mass surveillance in the colloquial sense of the terms.

[1](#footnote-anchor-1)

They wish to remain anonymous, but none are employees of any major AI lab or the Department of War.

[2](#footnote-anchor-2)

For more, see the section ‘Comments on OpenAI’s FAQ’

[3](#footnote-anchor-3)

OpenAI’s head of National Security Partnerships has made a few [unclear](https://x.com/natseckatrina/status/2027915769107841098) [tweets](https://x.com/natseckatrina/status/2027931400775627188) perhaps implying that NSA might be excluded from their contract. However, as of this writing, they have not clearly confirmed this, have made some other statements that all of DoW (which includes NSA) is in scope of their contract, and have not made any comment on other DoW intelligence agencies (there are 8 others). It would be great to get further clarification on this point.

[4](#footnote-anchor-4)

To be fair, there are some genuine technical reasons for this – because of how traffic routes across the internet’s logical and physical structure, the government correctly notes that it’s often hard to know before grabbing them whether a given set of internet packets is related to a foreign intelligence query or not – but members of both parties and nonpartisan Inspectors General have repeatedly identified how this technical decision has enabled abuses.

[5](#footnote-anchor-5)

OpenAI suggests they’re protected against this since their agreement specifically refers to “DoD Directive 3000.09 (dated 25 January 2023)”. But other parts of the contract refers to “all lawful purposes” without specifying current law in particular, which would at-best lead to contradictions if the law changes. More on this below.

[6](#footnote-anchor-6)

These safeguards might initially have to be broader than legal use, since current law is not yet designed with powerful autonomous systems in mind

[7](#footnote-anchor-7)

However, when directly asked, OpenAI's Chief Strategy Officer doesn't refer to other parts of the contract but instead [says](https://x.com/jasonkwon/status/2027948755467833366) that OpenAI's interpretation is supported due to the use of "date stamps". This is confusing, since the question was about the term "applicable law", which is not itself date stamped. It's possible Kwon misunderstood the question.

[8](#footnote-anchor-8)

First, because [later replies](https://x.com/jasonkwon/status/2028005099214459049) cast doubt on Kwon’s claims about how standard his interpretation is. Second, because only one of the laws and policies mentioned in the contract excerpt is date stamped. (Some of the laws mention specific years, but only when the year is included in the name of that law.)

[9](#footnote-anchor-9)

Why was our argument not the most relevant argument? While it's true that later clauses (on specific laws and policies) don't automatically take precedence over the first clause (about “all lawful purposes”), it's also true that the first clause doesn't automatically take precedence over later clauses. All clauses matter for interpreting the overall contract. In fact, there's a general principle that more specific clauses tend to take precedence over more general clauses. This could make for a plausible argument that clauses which reference specific laws and policies take precedence over the general clause allowing "all lawful purposes". However, another interpretation would be that the references to specific laws and policies refer to the most up-to-date versions of the named laws and policies, rather than treating them as frozen into place. This would reduce conflict with the "all lawful purposes" clause, and it might therefore get some support from the inclusion of the "all lawful purposes" clause. But even if that wasn't there, this latter interpretation would still be [strongly favored](https://x.com/bradrcarson/status/2028335588022100477) according to Brad Carson (former general counsel of the Army, former undersecretary of the Army, former undersecretary of Defense), unless OpenAI has explicit language to the contrary. Given his expertise, and given that he agrees on the bottom line with the national security law expert that we consulted, we’re inclined to believe he’s right. What we're most confident about is that OpenAI’s interpretation is far from clearly correct, so if they cared about that interpretation, it would have been a big mistake for them to not include any explicit language stipulating it.