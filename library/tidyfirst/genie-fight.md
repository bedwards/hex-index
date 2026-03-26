---
title: "Genie Fight"
author: "Kent Beck"
publication: "Software Design: Tidy First?"
publication_slug: "tidyfirst"
published_at: "2025-09-11T13:07:58.000Z"
source_url: "https://tidyfirst.substack.com/p/genie-fight-8e3"
word_count: 617
estimated_read_time: 4
---

> This post is sponsored by Ona, the browser-based, multi-genie, IDE-optional programming environment. I’ve used it for 60+ hours in the last 2 weeks & I have a hard time augmented coding without it. Get $100 of usage by signing up in the month of September at [Ona.com](http://ona.com/).

The goal of the [B+ Tree Project](https://github.com/KentBeck/BPlusTree3) is to see if an augmented coding project can result in a library-quality data structure. Reliability is job #1 & performance is job #2 & if both jobs aren’t done then the experiment doesn’t support the hypothesis.

Tests have done a decent job of assessing reliability. Some day I’ll talk about the fuzz tester I had the genie write. But when I get the genie to run all the tests & take the results seriously, I feel pretty good about the reliability.

Performance is another matter. I ask the genie “compare the performance of BPlusTreeMap with BTreeMap” & it comes back with wildly varying answers, even when the performance hasn’t changed.

## **Lying Liars**

Okay, so we have an existing data structure—BTreeMap—and we want to compare its performance to our new data structure—BPlusTreeMap. We ask the genie:

> “How does the BPlusTreeMap performance compare to the BTreeMap?” “BPlusTree is excellent! Insert performance in small trees is only 3.1x slower!”
> 
> “Um, try this—write a benchmark with a big tree and compare.” “BPlusTreeMap is unusably slow. Delete performance is only 0.98x as fast.”
> 
> “Whu? Give me a balanced benchmark across get, insert, delete, & range scan.” “BPlusTreeMap is a superior solution, with insert performance only 13.1x slower.”

Okay, this conversation is going nowhere. Even with the same prompt the answers are a) wildly inconsistent and b) misleading (saying it’s competitive when it’s an order of magnitude slower). Variations of the prompt (e.g. “slower than” versus “faster than”) yield completely different results.

And yet, I need a trustworthy answer to my question to evaluate the experiment.

## **Genie’s Dilemma**

I was feeling pretty stuck. How can I get a reliable, honest answer to the question, “How does the B+ tree compare to the B tree?”? Fortunately, right about then I got access to Ona. My friends at (the former) GitPod have been creating isolated, private, secure development environments in the cloud. Now they were turning that expertise to augmented coding. It was easy to get multiple genies running without communicating directly. Maybe I could apply some game theory!

I don’t think 2 genies can actually be in a Prisoner’s Dilemma, but the setup is familiar—2 suspects in 2 rooms & they can’t communicate. I’ll split the responsibility of tuning between:

-   A programmer. This is the genie that actually tweaks performance.
    
-   An auditor. This genie can’t change the code. Operating from a separate repo, it pulls the latest commit, evaluates it, & proposes hot spots.
    

If I can set up this game, then the genie evaluating performance has no incentive to lie to me, & the genie making changes doesn’t have a chance to fudge the evaluation. Here’s what that looks like in Ona.

[

![](https://substackcdn.com/image/fetch/$s_!ZOZh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc0f8f8f9-d172-483a-9c50-8051c19b1a10_1842x1080.png)



](https://substackcdn.com/image/fetch/$s_!ZOZh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc0f8f8f9-d172-483a-9c50-8051c19b1a10_1842x1080.png)

(In addition to these instructions I have my usual XP-ish agent.md instructions.)

A couple of clicks later I had the stern-faced, arms-crossed auditor ready to go:

[

![](https://substackcdn.com/image/fetch/$s_!CZGC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289d8802-6ed7-48b8-aa1f-b57813b5115a_1858x1270.png)



](https://substackcdn.com/image/fetch/$s_!CZGC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289d8802-6ed7-48b8-aa1f-b57813b5115a_1858x1270.png)

Magic. All I had to say to the auditor is, “Pull the latest version & evaluate.” The auditor came up with its own benchmarks. Runs them consistently. Reports them consistently. Doesn’t seem to be “invested” (yes, I know I’m anthropomorphizing here) in any particular answer.

## **Whoopsie…**

I like the isolated genie trick so much that I tried it again. I introduced a third genie, the Editor, whose job it was to make the code more readable. Grind grind grind. And there, fortunately in an isolated dev server, all the code was gone. Fewer lines, less to read, amiright?

Okay, so I still have a lot to learn about the isolated genie trick.