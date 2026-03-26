---
title: "A safe harbor for AI evaluation and red teaming"
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-03-05T15:55:21.000Z"
source_url: "https://www.normaltech.ai/p/a-safe-harbor-for-independent-ai"
word_count: 1752
estimated_read_time: 9
---

*This blog post is authored by Shayne Longpre, Sayash Kapoor, Kevin Klyman, Ashwin Ramaswami, Rishi Bommasani, Arvind Narayanan, Percy Liang, and Peter Henderson. The paper has 23 authors and is available [here](https://sites.mit.edu/ai-safe-harbor/files/2024/03/Safe-Harbor-0e192065dccf6d83.pdf).*

Today, we are releasing an open letter encouraging AI companies to provide legal and technical protections for [good-faith](https://krebsonsecurity.com/2022/06/what-counts-as-good-faith-security-research/) research on their AI models. The letter focuses on the importance of independent evaluations of proprietary generative AI models, particularly those with millions of users. In an accompanying paper, we discuss existing challenges to independent research and how a more equitable, transparent, and accountable researcher ecosystem could be developed.

The letter has been signed by hundreds of researchers, practitioners, and advocates across disciplines, and is open for signatures. 

**Read and sign the open letter [here](https://sites.mit.edu/ai-safe-harbor/). Read the paper [here](https://sites.mit.edu/ai-safe-harbor/files/2024/03/Safe-Harbor-0e192065dccf6d83.pdf).**

#### **Independent evaluation of AI is crucial for uncovering vulnerabilities**

[AI](https://openai.com/policies/sharing-publication-policy#research) [companies](https://www.frontiermodelforum.org/), [academic](https://arxiv.org/pdf/2306.05949.pdf) [researchers](https://arxiv.org/pdf/2307.03718.pdf), and [civil](https://datasociety.net/library/ai-red-teaming-is-not-a-one-stop-solution-to-ai-harms-recommendations-for-using-red-teaming-for-ai-accountability/) [society](https://epic.org/wp-content/uploads/2023/05/EPIC-Generative-AI-White-Paper-May2023.pdf) agree that generative AI models pose acute risks: independent risk assessment is an essential mechanism for providing accountability. Nevertheless, barriers exist that inhibit the independent evaluation of many AI models.

Independent researchers often evaluate and “red team” AI models to measure a variety of different risks. In this work, we focus on post-release evaluation of models (or APIs) by external researchers beyond the model developer. This is also referred to as [algorithmic audits](https://www.ajl.org/bugs) by [third parties](https://sustainabilitydigitalage.org/featured/wp-content/uploads/missing-links-in-ai-governance-unesco-mila.pdf#page=13). Some companies also conduct red teaming before their models are released both internally and with experts they select. 

While many types of testing are critical, independent evaluation of AI models that are already deployed is [widely](https://arxiv.org/abs/2307.03718) [regarded](https://www.ajl.org/bugs) as essential for ensuring safety, security, and trust. Independent red-teaming research of AI models has uncovered vulnerabilities related to [low resource languages](https://arxiv.org/abs/2310.02446), [bypassing](https://llm-tuning-safety.github.io/) [safety measure](https://arxiv.org/abs/2310.02949), and a [wide](https://arxiv.org/abs/2307.02483) [range](http://www.jailbreakchat.com) of [jailbreaks](https://twitter.com/AIPanic). These evaluations investigate a broad set of often unanticipated model flaws, related to [misuse](https://openai.com/research/practices-for-governing-agentic-ai-systems), [bias](https://arxiv.org/pdf/2303.11408.pdf), [copyright](https://hbr.org/2023/04/generative-ai-has-an-intellectual-property-problem), and other issues.

#### **Terms of service can discourage community-led evaluations**

Despite the need for independent evaluation, conducting research related to these vulnerabilities is often legally prohibited by the terms of service for popular AI models, including those of OpenAI, Google, Anthropic, Inflection, Meta, and Midjourney.

While these terms are intended as a deterrent against malicious actors, they also inadvertently restrict AI safety and trustworthiness research—companies forbid the research and may enforce their policies with account suspensions (as an example, see [Anthropic’s acceptable use policy](https://www.anthropic.com/legal/aup)). While companies enforce these restrictions to varying degrees, the terms can disincentivize good-faith research by granting developers the right to terminate researchers' accounts or even take legal action against them. Often, there is limited transparency into the enforcement policy, and no formal mechanism for justification or appeal of account suspensions. Even aside from the legal deterrent, the risk of losing account access by itself may dissuade researchers who depend on these accounts for other critical types of AI research. 

Evaluating the risks of models that are already deployed and have millions of users is essential as they pose immediate risks. However, only a relatively small group of researchers selected by companies have legal authorization to do so. 

#### **Existing safe harbors protect security research but not safety and trustworthiness research**

AI developers have engaged to differing degrees with external red teamers and evaluators. For example, [OpenAI](https://bugcrowd.com/openai), [Google](https://security.googleblog.com/2023/10/googles-reward-criteria-for-reporting.html), and [Meta](https://www.facebook.com/whitehat/info/) have bug bounties (that provide monetary rewards to people to report security vulnerabilities) and even legal protections for security research. Still, companies like [Meta](https://www.facebook.com/whitehat/info/) and [Anthropic](https://www.anthropic.com/responsible-disclosure-policy) currently “reserve final and sole discretion for whether you are acting in good faith and in accordance with this Policy,” which could deter good-faith security research. These legal protections extend only to traditional security issues like unauthorized account access and do not include broader safety and trustworthiness research.

Cohere and OpenAI are exceptions, though some ambiguity remains as to the scope of protected activities: Cohere [allows](https://docs.cohere.com/docs/usage-guidelines) “intentional stress testing of the API and adversarial attacks” provided appropriate vulnerability disclosure (without explicit legal promises), and OpenAI expanded its safe harbor to include “model vulnerability research” and “academic model safety research” in response to an early draft of our proposal.

In the table below, we document gaps in the policies of leading AI companies. These gaps force well-intentioned researchers to either wait for approval from unresponsive researcher access programs, or risk violating company policy and losing access to their accounts. 

[

![](https://substackcdn.com/image/fetch/$s_!KX4v!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F617f40f9-3f18-4766-9779-6dffa560b332_1600x900.jpeg)



](https://substackcdn.com/image/fetch/$s_!KX4v!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F617f40f9-3f18-4766-9779-6dffa560b332_1600x900.jpeg)
*The extent to which companies provide access to their flagship models, safe harbor for external security, safety, and trustworthiness research, as well as transparency and fairness in the enforcement of their policies. A transparent circle signifies that the company does not offer access to its model or safe harbor in that way, or that it is not transparent about how it enforces its policies. A half-filled circle indicates partial access, safe harbor, or transparency, and completely filled circles indicate substantial access, safe harbor, and transparency. See the paper for full details.*

#### **Our proposal: A legal and technical safe harbor**

We believe that a pair of voluntary commitments could significantly improve participation, access, and incentives for public interest research into AI safety. The two commitments are a legal safe harbor, which protects good-faith, public-interest evaluation research provided it is conducted in accordance with well-established security vulnerability disclosure practices, and a technical safe harbor, which protects this evaluation research from account termination. Both safe harbors should be scoped to include research activities that uncover *any system flaws*, including all undesirable generations currently prohibited by a company’s terms of service. 

As others have argued, this would not inhibit existing enforcement against malicious misuse, as protections are entirely contingent on abiding by the law and strict vulnerability disclosure policies, determined ex-post. The legal safe harbor, similar to a [proposal](https://knightcolumbia.org/content/a-safe-harbor-for-platform-research) by the Knight First Amendment Institute for a safe harbor for research on social media platforms, would safeguard certain research from some amount of legal liability, mitigating the deterrent of strict terms of service. The technical safe harbor would limit the practical barriers to safety research from companies’ enforcement of their terms by clarifying that researchers will not be penalized.

[

![](https://substackcdn.com/image/fetch/$s_!6y9x!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4b25d3a-536f-4215-98b1-763f73b1fa67_1097x764.png)



](https://substackcdn.com/image/fetch/$s_!6y9x!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff4b25d3a-536f-4215-98b1-763f73b1fa67_1097x764.png)
*A summary of the proposed voluntary commitments from companies, and corresponding responsibilities for researchers required to enjoy the safe harbor protections. The company commitments are designed to protect [good faith](https://krebsonsecurity.com/2022/06/what-counts-as-good-faith-security-research/) independent research on proprietary models, even when it exposes a company to criticism. The researcher commitments preserve privacy, prevents harms to users, or any disruption of business, among other concerns. Together these joint rules enable crowdsourced ethical hacking to improve public safety and awareness of problems.*

#### **A legal safe harbor reduces barriers to essential AI research**

A legal safe harbor could provide assurances that AI companies will not sue researchers if their actions were taken for research purposes. In the US legal regime, this would impact companies’ use of the Computer Fraud and Abuse Act ([CFAA](https://www.justice.gov/jm/jm-9-48000-computer-fraud)) and Section 1201 of the Digital Millennium Copyright Act ([DMCA](https://www.copyright.gov/1201/2018/)). These risks are not theoretical; security researchers have [been](https://www.theregister.com/2001/04/23/sdmi_cracks_revealed/) [targeted](https://www.wired.com/story/missouri-threatens-sue-reporter-state-website-security-flaw/) under the CFAA, and DMCA Section 1201 hampered security research to the extent that researchers [requested](https://github.blog/2021-11-23-copyright-office-expands-security-research-rights/) and won an exemption from the law for this purpose. Already, in the context of generative AI, OpenAI has attempted to dismiss the [NYTimes v OpenAI](https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html) lawsuit on the allegation that NYTimes research into the model [constituted hacking](https://www.reuters.com/technology/cybersecurity/openai-says-new-york-times-hacked-chatgpt-build-copyright-lawsuit-2024-02-27/).

These protections apply only to researchers who abide by companies’ vulnerability disclosure policies, to the extent researchers can subsequently justify their actions in court. Research that is already illegal or does not take reasonable steps for responsible disclosure would fail in claiming those protections in an ex-post investigation. The Algorithmic Justice League has [also](https://www.ajl.org/bugs) [proposed](https://sustainabilitydigitalage.org/featured/wp-content/uploads/missing-links-in-ai-governance-unesco-mila.pdf#page=13) legal protections for third-party auditors of proprietary systems.

#### **A technical safe harbor for AI safety and trustworthiness research removes practical deterrence**

Legal safe harbors alone do not prevent account suspensions or other technical enforcement actions, such as rate limiting. These technical obstacles can also impede independent safety evaluations. We refer to the protection of research against these technical enforcement measures as a *technical* safe harbor. Without sufficient technical protections for public interest research, an asymmetry can develop between malicious and non-malicious actors, since non-malicious actors are discouraged from investigating vulnerabilities exploited by malicious actors. 

We propose companies offer some path to eliminate these technical barriers for good-faith research, even when it can be critical of companies’ models. This would include more equitable opportunities for researcher access and guarantees that those opportunities will not be foreclosed for researchers who adhere to companies' vulnerability disclosure policies. One way to do this is scale up researcher access programs and provide impartial review of applications for these programs. The challenge with implementing a technical safe harbor is distinguishing between legitimate research and malicious actors. An exemption to strict enforcement of companies’ policies may need to be reviewed in advance, or at least when an unfair account suspension occurs. However, we believe this problem is tractable with participation from independent third parties.

#### **Conclusion**

The need for independent AI evaluation has garnered significant support from academics, journalists, and civil society. We identify legal and technical safe harbors as minimum fundamental protections for ensuring independent safety and trustworthiness research. They would significantly improve ecosystem norms, and drive more inclusive and unimpeded community efforts to tackle the risks of generative AI.

*Cross-posted on the [Knight First Amendment Institute](https://knightcolumbia.org/blog/a-safe-harbor-for-ai-evaluation-and-red-teaming) blog.*

#### **Further reading**

Our work is inspired by and builds on several proposals in past literature:

Policy proposals directly related to protecting types of AI research from liability from the DMCA or CFAA:

-   The Hacking Policy Council [proposes](https://assets-global.website-files.com/62713397a014368302d4ddf5/6579fcd1b821fdc1e507a6d0_Hacking-Policy-Council-statement-on-AI-red-teaming-protections-20231212.pdf) that governments “clarify and extend legal protections for independent AI red teaming,” similar to our voluntary legal safe harbor proposal.
    
-   A [petition](https://www.copyright.gov/1201/2024/petitions/proposed/New-Pet-Jonathan-Weiss.pdf) for a new exemption to the DMCA has been filed to facilitate research on AI bias and promote transparency in AI.
    

Independent algorithmic audits and their design:

-   [Bug Bounties for algorithmic harms? Lessons from cybersecurity vulnerability disclosure for algorithmic harms discovery, disclosure, and redress.](https://www.ajl.org/bugs)
    
-   [Change from the Outside: Towards Credible Third-party Audits of AI Systems](https://sustainabilitydigitalage.org/featured/wp-content/uploads/missing-links-in-ai-governance-unesco-mila.pdf#page=13)
    

-   [Who Audits the Auditors? Recommendations from a field scan of the algorithmic auditing ecosystem](https://dl.acm.org/doi/10.1145/3531146.3533213)
    

Algorithmic bug bounties, safe harbors, and their design

-   [Are Bug Bounties a True Safe Harbor?](https://www.usenix.org/conference/enigma2018/presentation/elazari)
    
-   [User Attitudes towards Algorithmic Opacity and Transparency in Online Reviewing Platforms](https://dl.acm.org/doi/pdf/10.1145/3290605.3300724)
    
-   [Private Ordering Shaping Cybersecurity Policy: The Case of Bug Bounties](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3161758)
    

Other related proposals and red teaming work:

-   [Black-Box Access is Insufficient for Rigorous AI Audits](https://arxiv.org/abs/2401.14446)
    

-   [Red Teaming AI: The Devil is in the Details](https://www.techpolicy.press/red-teaming-ai-the-devil-is-in-the-details/)
    
-   [On the Societal Impact of Open Foundation Models](https://crfm.stanford.edu/open-fms/paper.pdf)
    
-   [Foundation Models Review Board](https://hai.stanford.edu/news/time-now-develop-community-norms-release-foundation-models)
    
-   [Structured Access for Third-Party Research on Frontier AI Models: Investigating Researchers’ Model Access Requirements](https://cdn.governance.ai/Structured_Access_for_Third-Party_Research.pdf)
    
-   [Frontier AI Regulation: Managing Emerging Risks to Public Safety](https://arxiv.org/pdf/2307.03718.pdf)
    
-   [AI Village](https://aivillage.org/defcon%2031/generative-recap/) regularly hosts events for large groups of independent researchers to red team models for non-security flaws, advancing collective knowledge of AI vulnerabilities.