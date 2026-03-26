---
title: "It's Merge Season - The Daily Gwei #513"
author: "Anthony Sassano"
publication: "The Daily Gwei"
publication_slug: "thedailygwei"
published_at: "2022-07-07T14:04:30.000Z"
source_url: "https://thedailygwei.substack.com/p/its-merge-season-the-daily-gwei-513"
word_count: 582
estimated_read_time: 3
---

[

![](https://substackcdn.com/image/fetch/$s_!1Yrz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb6245c4-07b9-4ec3-b46a-212a3b179a86_4367x1935.jpeg)



](https://substackcdn.com/image/fetch/$s_!1Yrz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb6245c4-07b9-4ec3-b46a-212a3b179a86_4367x1935.jpeg)

\---

The second public Ethereum testnet, Sepolia, ran through the merge transition with great success just 24 hours ago. Even though the merge itself was a success, there were some minor issues that showed up immediately post-merge but were quickly resolved once the root cause was identified. As far as I understand it, these issues shouldn’t show up on mainnet and aren’t considered ‘merge-related’.

[

![Twitter avatar for @parithosh_j](https://substackcdn.com/image/twitter_name/w_96/parithosh_j.jpg)

parithosh | 🐼👉👈🐼 @parithosh\_j

Sepolia merged successfully! After some config issues, the chain is finalizing. There were no client related issues. 1 EF node had a hiccup during the transition, but it self healed without intervention. Of a possible ~95% participation rate, we are generally seeing ~95%.

![Image](https://substackcdn.com/image/fetch/$s_!1Z4R!,w_600,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fmedia%2FFXDS-ybXkAAWTfs.jpg)

![Twitter avatar for @EthDreamer](https://substackcdn.com/image/twitter_name/w_40/EthDreamer.jpg)

ethDreamer.eth 🦇🔊 @EthDreamer

I wanted to share some thoughts on the events of the Sepolia merge. I speak for myself, not necessarily the rest of @sigp\_io. Needless to say, it was less than ideal and we will be extra vigilant moving forward. I've also seen some understandable concerns from the community: 1/6

](https://twitter.com/parithosh_j/status/1544968914777645056?s=20&t=K9dVEmTX5FX3oksuuED2vQ)[

8:57 AM ∙ Jul 7, 2022 ---

162Likes19Retweets



](https://twitter.com/parithosh_j/status/1544968914777645056?s=20&t=K9dVEmTX5FX3oksuuED2vQ)

The initial issues that were seen post-merge for Sepolia were that around 25-30% of the network had a misconfiguration error (which isn’t directly merge-related). Once this issue was fixed, network participation jumped up to the expected number of ~95% (it’s lower than 100% due to some validators being permanently offline due to lost keys). Nevertheless, it’s great that this “edge case” issue popped up in testing even if it’s not going to be something that we really need to worry about for the mainnet merge transition!

Sepolia’s issues also showed us, once again, just how resilient the Beacon Chain is to any sort of unexpected behavior. Even though 25-30% of blocks were not being proposed, the chain was still able to finalize because more than 2/3rds of the network was still online and validating. Of course, missed blocks on mainnet would lead to a degraded user experience, but this is the Beacon Chain working as designed as Ethereum favors liveness above all else. I would also expect an issue like the one seen on Sepolia to be rectified even quicker on mainnet since there is real money on the line.

Alright, so where to from here? Well there is an AllCoreDevs call happening on Friday where I’m sure the Sepolia merge will be discussed and then the next call will be on July 21st. I expect this call to be the one where the Goerli testnet merge transition date will be announced and I’m expecting it to be set for around early-mid August. After Goerli runs through The Merge, we can expect a mainnet merge timeline to be given - yep that’s right - we are *that* close to merging mainnet! Oh and there will still be ‘shadow forks’ happening every week right up until the mainnet merge.

I really can’t believe how close we now are to Ethereum becoming a full Proof of Stake network after such a long time of waiting. As an ecosystem we’ve come so far over the last couple of years across all domains but Ethereum’s move to Proof of Stake will be (by far) its greatest achievement. The light at the end of the tunnel is firmly in sight - we just need to keep walking towards it!

Have a great day everyone,  
[Anthony Sassano](https://twitter.com/sassal0x)

\---

*Enjoyed today’s piece? I send out a fresh one every week day - be sure to subscribe to receive it in your inbox!*

\---

### Join the Daily Gwei Ecosystem

-   [Twitter](https://twitter.com/thedailygwei)
    
-   [YouTube](https://www.youtube.com/channel/UCvCp6vKY5jDr87htKH6hgDA)
    
-   [Discord](https://discord.gg/4pfUJsENcg)
    

\---

*All information presented above is for educational purposes only and should not be taken as investment advice.*

\---