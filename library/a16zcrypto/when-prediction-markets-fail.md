---
title: "When prediction markets fail"
author: "a16z crypto"
publication: "web3 with a16z"
publication_slug: "a16zcrypto"
published_at: "2026-01-24T14:01:00.000Z"
source_url: "https://a16zcrypto.substack.com/p/how-ai-judges-can-scale-prediction"
word_count: 1920
estimated_read_time: 10
---

Last year, more than $6 million traded in prediction market contracts for the outcome of Venezuela’s presidential election. But when the votes were counted, the market faced an impossible situation: The government declared Nicolás Maduro the winner; the opposition and international observers alleged fraud. Should prediction market [contract resolution](https://a16zcrypto.com/posts/podcast/prediction-markets-explained/) have followed “official information” (Maduro wins) or a “consensus of credible reporting” (the opposition wins)?

In Venezuela’s elections, observers made a wide range of allegations: that rules were ignored and participants had “[their money stolen](https://frankmuci.substack.com/p/polymarket-settles-bet-against-its)”; that the dispute-resolution protocol acted as “[judge, jury, and executioner](https://rekt.news/hedging-bets)” in a high-stakes political drama; that the process itself was “[severely rigged](https://www.trustpilot.com/review/polymarket.com).”

This isn’t an isolated hiccup. It’s a symptom of what I consider one of the single biggest bottlenecks facing prediction markets as they scale: contract resolution.

The stakes here are high. Get resolution right, and people trust your market, want to trade in it, and prices become meaningful signals for society. Get resolution wrong, and trading feels frustrating and unpredictable. Participants may drift away, liquidity risks drying up, and prices stop reflecting accurate predictions of a stable target. Instead, the prices start to reflect a murky mix of the outcome’s actual probability and the traders’ beliefs about how the distorted resolution mechanism will decide to rule.

The Venezuela dispute was relatively high-profile, but subtler failures happen regularly across platforms:

-   The [Ukraine map manipulation](https://responsiblestatecraft.org/isw-polymarket-ukraine-war-map/) showed how adversaries can game resolution mechanisms directly. A contract on territorial control specified that it would resolve based on a particular online map. Someone allegedly edited the map to influence the contract’s outcome. When your source of truth can be manipulated, your market can be manipulated.
    
-   The [government shutdown contract](https://thedefiant.io/newsletter/defi-daily/end-of-gov-t-shutdown-brings-more-polymarket-drama) showed how resolution sources can lead to inaccurate or at least unpredictable outcomes. The resolution rule specified that the market would pay out based on when the Office of Personnel Management’s website showed the shutdown as ended. President Trump signed the funding bill on November 12 — but OPM’s website, for reasons that remain unclear, wasn’t updated until November 13. Traders who had correctly predicted the shutdown would end on the 12th lost their bets to a website admin’s delay.
    
-   The Zelensky suit market raised concerns about conflicts of interest. The contract asked whether Ukrainian President Zelensky would wear a suit to a particular event — a seemingly trivial question that attracted [over $200 million in bets](https://www.coindesk.com/markets/2025/07/07/polymarket-embroiled-in-usd160m-controversy-over-whether-zelensky-wore-a-suit-at-nato). When Zelensky appeared at a NATO summit wearing what the BBC, New York Post, and other outlets described as a suit, the market initially resolved “Yes.” But UMA token holders disputed the outcome, and the resolution flipped to “No.”
    

In this piece, I explore how LLMs and crypto, combined smartly, might help us create ways to resolve prediction markets at scale that are very difficult to manipulate and that are accurate, fully transparent, and credibly neutral.

## This isn’t just a prediction market problem

Analogous problems have also plagued financial markets. The International Swaps and Derivatives Association (ISDA) has spent years wrestling with resolution challenges in the credit default swap market — contracts that pay out when a company or country defaults on its debt — and its [2024 review](https://www.isda.org/a/lS1gE/DC-Review-Report-042924.pdf) is remarkably candid about the difficulties. Their Determinations committees, composed of major market participants, vote on whether credit events have occurred. But the process has been criticized for opacity, potential conflicts of interest, and inconsistent outcomes, just like the UMA process.

The fundamental problem is the same: When large sums of money depend on determining what happened in an ambiguous situation, every resolution mechanism becomes a target for being gamed, and every ambiguity becomes a potential flash point.

So what would a good resolution mechanism look like?

## Properties of a good solution

Any viable solution needs to achieve a number of key properties at once.

**Resistance to manipulation.** If adversaries can influence resolution — by editing Wikipedia, planting fake news, bribing oracles, or exploiting procedural loopholes — the market becomes a game of who can manipulate best, not who can predict best.

**Reasonable accuracy.** The mechanism has to get most resolutions right, most of the time. Perfect accuracy is impossible in a world of genuine ambiguity, but systematic errors or obvious mistakes will destroy credibility.

**Ex ante transparency.** Traders need to understand exactly how resolution will work before they place their bets. Changing rules mid-flight violates the basic compact between platform and participant.

**Credible neutrality.** Participants need to believe the mechanism doesn’t favor any particular trader or outcome. This is why having large UMA holders resolve contracts they’ve bet on is so problematic: even if they act fairly, the appearance of conflict undermines trust.

Human committees can satisfy some of these properties, but they struggle with others — particularly manipulation resistance and credible neutrality at scale. Token-based voting systems like UMA have their own well-documented problems with whale dominance and conflicts of interest.

This is where AI enters the picture.

## The case for LLM judges

Here’s a proposal that has been [gaining traction](https://medium.com/@nick.c.ruzicka/prediction-markets-are-having-a-moment-9b0924507ad3) in prediction market circles: Use large language models as [resolution judges](https://blog.chain.link/ai-oracles/), with the specific model and prompt locked into the blockchain at the time a contract is created.

The basic architecture would work like this. At contract creation, the market maker specifies not just the resolution criteria in natural language, but the exact LLM (identified by a timestamped model version) and the exact prompt that will be used to determine the outcome.

This specification gets cryptographically committed to the blockchain. When trading opens, participants can inspect the full resolution mechanism — they know exactly which AI model will judge the outcome, what prompt it will receive, and what information sources it will be able to access.

If they don’t like the setup, they don’t trade.

At resolution time, the committed LLM runs with the committed prompt, accesses whatever information sources are specified, and produces a judgment. The output determines who gets paid.

This approach addresses several of the key constraints simultaneously:

**Resists manipulation strongly (though not absolutely).** Unlike a Wikipedia page or a minor news site, you can’t easily edit a major LLM’s outputs. The model’s weights are fixed at the time of commitment. To manipulate resolution, an adversary would need to either corrupt the information sources the model relies on, or somehow poison the model’s training data far in advance — both of which are costly and uncertain attacks compared to bribing an oracle or editing a map.

**Delivers accuracy.** With reasoning models rapidly improving and capable of an astonishing array of intellectual asks, especially when they can navigate the web and seek out new information, LLM judges should be able to accurately resolve many markets — and experiments to understand their accuracy are ongoing.

**Bakes in transparency.** The entire resolution mechanism is visible and auditable before anyone places a bet. No rule changes mid-flight, no discretionary judgment calls, no backroom negotiations. You know exactly what you’re signing up for.

**Improves credible neutrality significantly.** The LLM has no financial stake in the outcome. It can’t be bribed. It doesn’t own UMA tokens. Its biases, whatever they are, are properties of the model itself — not of interested parties making ad hoc decisions.

Of course, LLM judges would come with limitations, which I outline and address below.

**Models make mistakes**. An LLM might misread a news article, hallucinate a fact, or apply resolution criteria inconsistently. But as long as traders know which model they’re betting with, they can price in its foibles. If a particular model has a known tendency to resolve ambiguous cases in a particular way, sophisticated traders will account for that. The model doesn’t have to be perfect; it has to be predictable.

**Manipulation isn’t impossible, just harder.** If the prompt specifies particular news sources, adversaries could try to plant stories in those sources. This attack is expensive against major outlets, but potentially feasible against smaller ones — the map-editing problem in a different form. Prompt design matters enormously here: resolution mechanisms that rely on diverse, redundant sources are more robust than those that depend on a single point of failure.

**Poisoning attacks are theoretically possible.** An adversary with sufficient resources could try to influence an LLM’s training data to bias its future judgments. But this requires acting far in advance of the contract, with uncertain payoffs and significant costs — a much higher bar than bribing a committee member.

**LLM judge proliferation creates coordination problems.** If different market creators commit to different LLMs with different prompts, liquidity fragments. Traders can’t easily compare contracts or aggregate information across markets. There’s value in standardization — but also value in letting the market discover which LLM-prompt combinations work best. The right answer is probably some combination: let experimentation happen, but create mechanisms for the community to converge on well-tested defaults over time.

## How could builders adopt these strategies?

To summarize: AI-based resolution basically trades one set of problems (human bias, conflicts of interest, opacity) for a different set (model limitations, prompt engineering challenges, information source vulnerabilities) that may be more tractable. So how do we move forward? Platforms should:

**Experiment** by testing LLM resolution on lower-stakes contracts to build a track record. Which models perform best? Which prompt structures are most robust? What failure modes emerge in practice?

**Standardize.** As best practices emerge, the community should work toward standardized LLM-prompt combinations that can serve as defaults. This doesn’t preclude innovation, but it helps liquidity concentrate in well-understood markets.

**Build transparency tools** such as interfaces that make it easy for traders to inspect the full resolution mechanism — the model, the prompt, the information sources — before trading. Resolution shouldn’t be buried in fine print.

**Conduct ongoing governance.** Even with AI judges, humans will need to make meta-level decisions: which models to trust, how to handle cases where models give obviously wrong answers, when to update defaults. The goal isn’t to remove humans from the loop entirely, but to move them from ad hoc case-by-case judgment to systematic rule-setting.

\*\*\*

Prediction markets have extraordinary potential to help us understand a noisy, complex world. But that potential depends on trust, and trust depends on fair contract resolution. We’ve seen what happens when resolution mechanisms fail: confusion, anger, and traders walking away. I’ve watched people rage quit prediction markets entirely after feeling cheated by an outcome that seemed to contradict the spirit of their bet — swearing off platforms they’d previously loved. This is a lost opportunity for unlocking the [benefits and broader applications of](https://a16zcrypto.com/posts/podcast/prediction-markets-information-aggregation-mechanisms/) prediction markets.

LLM judges aren’t perfect. But when they’re combined with the technology of crypto, they’re transparent, neutral, and resistant to the kinds of manipulation that have plagued human-based systems. In a world where prediction markets are scaling faster than our governance mechanisms, that might be exactly what we need.

\---

[Andrew Hall](http://www.andrewbenjaminhall.com/) is the Davies Family Professor of Political Economy in the Graduate School of Business at Stanford University and a Senior Fellow at the Hoover Institution. He works with the a16z research lab and is an advisor to tech companies, startups, and blockchain protocols on issues at the intersection of technology, governance, and society.

\---

*— a16z crypto editorial team*

*You’re receiving this newsletter because you signed up for it on our websites, at an event, or elsewhere (you can opt out anytime using the ‘unsubscribe’ link below). This newsletter is provided for informational purposes only, and should NOT be relied upon as legal, business, investment, or tax advice. This newsletter may link to other websites or other information obtained from third-party sources — a16z has not independently verified nor makes any representations about the current or enduring accuracy of such information. Furthermore, the content is not directed at nor intended for use by any investors or prospective investors in any a16z funds. Please see a16z.com/disclosures for additional important details, including link to list of investments.*