---
title: "Explore *Then* Expand *Then* Extract"
author: "Kent Beck"
publication: "Software Design: Tidy First?"
publication_slug: "tidyfirst"
published_at: "2025-12-04T18:29:21.000Z"
source_url: "https://tidyfirst.substack.com/p/explore-then-expand-then-extract"
word_count: 434
estimated_read_time: 3
---

> First publishing February 2016

*Migrations are expensive in ... opportunity cost. Write hot spots appear only after a product is gaining real traction, which is a bad time to temporarily stop feature development and back off on user growth.*

The above was an argument for pre-emptive, speculative performance tuning. If this product is successful, goes the thinking, then data write performance is going to become a bottleneck. We don’t want to have pause user growth to switch to a new database. Let’s just fix the bottleneck now.

I can empathize with the sentiment, but I think this line of reasoning creates risk & reduces profit.

## Review

Going from exploration to expansion always creates the risk of uncovering new bottlenecks. Fixing bottlenecks quickly so extraction can commence is a more realistic goal.

To review, product development proceeds:

1.  From exploration—the risky search for a viable return for a viable investment
    
2.  To expansion—the elimination of bottlenecks to growth
    
3.  To extraction—where profitable growth continues
    

## Can’t Jump To Expand

The system design rules change between the three phases. In exploration, anything goes as long as it reduces the cost of experimentation. Use infrastructure that doesn’t scale if it accelerates experimentation.

The transition from exploration to expansion is tricky. The activities & values that resulted in successful exploration become dangerous during expansion. Exploration requires diverse, tangential thinking and experimentation. Expansion requires singular focus on removing the next bottleneck just before it chokes growth. Continuing to experiment distracts from this focus.

The activities & values that make for successful expansion, however, endanger exploration deployed prematurely. Doing a better job preparing for future growth slows experimentation, reducing the chance of success.

## Success

The lament above, that during traction is a “bad time to stop feature development” is perfectly understandable. You’ve been experimenting for months or years. You’ve begun to despair of those experiments ever paying off. Suddenly you’re on a hot streak. Everything you try works.

Who wants to stop during a hot streak? (In poker we call this “playing the rush”.)

You can’t create infrastructure that eliminates all bottlenecks. You don’t know the exact circumstances of those bottlenecks. You don’t know what data distributions look like, usage patterns geographically or by time of day or day of week.

Universal infrastructure is under-constrained, does work it needn’t do. That extra work perversely creates risk in the precise situations we need to overcome now that users have shown us what those situations are.

## Conclusion

The best we can hope for is:

-   To repair emerging bottlenecks quickly so we can get on with extraction. If this requires that we pause or throttle growth so we survive, that’s the price of success.
    
-   To permanently repair bottlenecks that “rhyme” with past bottlenecks, but this as an Extract project.