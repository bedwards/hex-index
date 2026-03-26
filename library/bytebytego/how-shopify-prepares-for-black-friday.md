---
title: "How Shopify Prepares for Black Friday"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2025-12-23T16:30:27.000Z"
source_url: "https://blog.bytebytego.com/p/how-shopify-prepares-for-black-friday"
word_count: 2445
estimated_read_time: 13
---

## [Power real-time apps and AI agents with Redis (Sponsored)](https://bit.ly/Redis_122325)

[

![](https://substackcdn.com/image/fetch/$s_!ZUgK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F647d34dd-2e2f-4329-85bf-ba689ca26831_3750x3750.png)



](https://bit.ly/Redis_122325)

Real-time isn’t just about speed. It’s about instant, fresh, and reliable responses at scale.

This definitive Redis guide breaks down how to architect a real-time data layer that keeps user experiences snappy, AI agents responsive, and data up to date across your stack.

Inside, you’ll learn:

-   How to get your apps from “fast” to truly real-time
    
-   The role of Redis in low-latency caching, vector search, AI agent memory, and streaming workloads
    
-   Real-world patterns from companies using Redis to cut latency, reduce drop-offs, and keep users in flow
    

\---

*Note: This article is written in collaboration with the Shopify engineering team. Special thanks to the Shopify engineering team for sharing details with us about their Black Friday Cyber Monday preparation work and also for reviewing the final article before publication. All credit for the technical details shared in this article goes to the Shopify Engineering Team.*

Black Friday Cyber Monday (BFCM) 2024 was massive for Shopify. The platform processed 57.3 petabytes of data, handled 10.5 trillion database queries, and peaked at 284 million requests per minute on its edge network. On app servers alone, they handled 80 million requests per minute while pushing 12 terabytes of data every minute on Black Friday.

Here’s the interesting part: this level of traffic is now the baseline for Shopify. And BFCM 2025 was even bigger, serving 90 petabytes of data, handling 1.75 trillion database writes with peak performance at 489 million requests per minute. This is why Shopify rebuilt its entire BFCM readiness program from scratch.

The preparation involved thousands of engineers working for nine months, running five major scale tests.

In this article, we will look at how Shopify prepared for success during the Super Bowl of commerce

## The Three-Track Framework

Shopify’s BFCM preparation started in March with a multi-region strategy on Google Cloud.

The engineering team organized the work into three parallel tracks that run simultaneously and influence each other:

-   Capacity Planning involves modeling traffic patterns using historical data and merchant growth projections. The team submits these estimates to their cloud providers early so the providers can ensure they have enough physical infrastructure available. This planning defines how much computing power Shopify needs and where it needs to be located geographically.
    
-   The Infrastructure Roadmap is where the team reviews their technology stack, evaluates what architectural changes are needed, and identifies system upgrades required to hit their target capacity. This track helps sequence all the work ahead. Importantly, Shopify never uses BFCM as a release deadline. Every architectural change and migration happens months before the critical window.
    
-   Risk Assessments use “What Could Go Wrong” exercises to document failure scenarios. The team sets escalation priorities and generates inputs for what they call Game Days. This intelligence helps them test and harden systems well in advance.
    

[

![](https://substackcdn.com/image/fetch/$s_!hSrR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0f9e094-3741-47ee-b57a-4404e31ab73a_1600x1112.png)



](https://substackcdn.com/image/fetch/$s_!hSrR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0f9e094-3741-47ee-b57a-4404e31ab73a_1600x1112.png)

These three tracks constantly feed into each other. For example, risk findings might reveal capacity gaps the team didn’t account for. Infrastructure changes might introduce new risks that need assessment. In other words, it’s a continuous feedback loop.

## Game Days

To assess risks properly, the Shopify engineering team runs Game Days. These are chaos engineering exercises that intentionally simulate production failures at the BFCM scale.

The team started hosting Game Days in early spring. This involves deliberately injecting faults into the systems to test how they respond under failure conditions. Think of it like a fire drill, but for software.

During these Game Days, the engineering team focuses extra attention on what they call “critical journeys”. These are the most business-critical paths through their platform: checkout, payment processing, order creation, and fulfillment. If these break during BFCM, merchants lose sales immediately.

Critical Journey Game Days run cross-system disaster simulations. Here are some common aspects that are tested by the team:

-   The team tests search and pages endpoints while randomizing navigation to mimic real user behavior. They inject network faults and latency to see what happens when services can’t communicate quickly.
    
-   They bust caches to create realistic load patterns instead of the artificially fast responses you get when everything is cached.
    
-   Frontend teams run bug bashes during these exercises. They identify regressions, test critical user flows, and validate that the user experience holds up under peak load conditions.
    

These exercises build muscle memory for incident response by exposing gaps in operational playbooks and monitoring tools.

Most importantly, Shopify closes those gaps well ahead of BFCM instead of discovering them when merchants need the platform most. All findings from Game Days feed into what Shopify calls the Resiliency Matrix. This is centralized documentation that tracks vulnerabilities, incident response procedures, and fixes across the entire platform.

The Resiliency Matrix includes five key components.

-   First is service status, showing the current operational state of all critical services.
    
-   Second is failure scenarios that document how things can break and what the impact would be.
    
-   Third is recovery procedures, listing expected recovery time objectives and detailed runbooks for fixing issues.
    
-   Fourth is operational playbooks with step-by-step incident response guides.
    
-   Fifth is on-call coverage showing team schedules and PagerDuty escalation paths.
    

[

![](https://substackcdn.com/image/fetch/$s_!miRu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feae18a1c-11fa-4544-a811-61f766c06599_1600x1112.png)



](https://substackcdn.com/image/fetch/$s_!miRu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feae18a1c-11fa-4544-a811-61f766c06599_1600x1112.png)

The Matrix becomes the roadmap for system hardening before BFCM. Teams update it continuously throughout the year, documenting resilience improvements as they go.

## Load Testing with Genghis and Toxiproxy

Game Days test components in isolation, but Shopify also needs to know if the entire platform can handle BFCM volumes. That’s where load testing comes in.

The engineering team built a tool called Genghis that runs scripted workflows mimicking real user behavior. It simulates browsing, adding items to the cart, and going through checkout flows. The tool gradually ramps up traffic until something breaks, which helps the team find their actual capacity limits.

Tests run on production infrastructure simultaneously from three Google Cloud regions: us-central, us-east, and europe-west4. This simulates global traffic patterns accurately. Genghis also injects flash sale bursts on top of baseline load to test peak capacity scenarios.

Shopify pairs Genghis with Toxiproxy, an open-source framework they built for simulating network conditions. Toxiproxy injects network failures and partitions that prevent services from reaching each other. For reference, a network partition is when two parts of your system lose the ability to communicate, even though both are still running.

During tests, teams monitor dashboards in real time and are ready to abort if systems begin to degrade. Multiple teams coordinate to find and fix bottlenecks as they emerge.

When load testing reveals limits, teams have three options:

-   Horizontal scaling means adding more instances of the application.
    
-   Vertical scaling means giving each instance more resources, such as CPU and memory.
    
-   Optimizations mean making architecture-level changes that improve performance, ranging from better database queries to performance tuning across consuming layers up to the frontend.
    

These decisions set the final BFCM capacity and drive optimization work across Shopify’s entire stack. The key insight is that the team cannot wait until BFCM to discover the capacity limits. It takes months of preparation to scale infrastructure and optimize code.

## The Analytics Platform Challenge

BFCM tests every system at Shopify, but 2025 presented a unique challenge. Part of their infrastructure had never experienced holiday traffic, which creates a problem: how do you prepare for peak load when you have no historical data to model from?

In 2024, Shopify’s engineering team rebuilt its entire analytics platform. They created new ETL pipelines. ETL stands for Extract, Transform, Load, which is the process of pulling data from various sources, processing it, and storing it somewhere useful. They also switched the persistence layer and replaced their legacy system with completely new APIs.

[

![](https://substackcdn.com/image/fetch/$s_!L4aX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F897a9dd1-f094-4954-836e-00c7ad31d41d_1600x1048.png)



](https://substackcdn.com/image/fetch/$s_!L4aX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F897a9dd1-f094-4954-836e-00c7ad31d41d_1600x1048.png)

This created an asymmetry. The ETL pipelines ran through BFCM 2024, so the team had one full season of production data showing how those pipelines perform under holiday load. But their API layer launched after peak season ended. They were preparing for BFCM on APIs that had never seen holiday traffic.

This matters a lot because during BFCM, merchants obsessively check their analytics. They want real-time sales numbers, conversion rates, traffic patterns, and data about popular products. Every single one of these queries hits the API layer. If those APIs can’t handle the load, merchants lose visibility during their most critical sales period.

Shopify ran Game Days specifically for the analytics infrastructure. These were controlled experiments designed to reveal failure modes and bottlenecks. The team simulated increased traffic loads, introduced database latency, and tested cache failures to systematically map how the system behaves under stress.

The results showed four critical issues that needed fixes:

-   First, the ETL pipelines needed Kafka partition increases to maintain data freshness during traffic spikes. Apache Kafka is a distributed streaming platform that handles real-time data flows. More partitions mean more parallel processing, which keeps data fresh for the APIs to serve.
    
-   Second, the API layer memory usage required optimization. The team found this through profiling, which means measuring exactly how the code uses memory. Each API request was using too much memory. Under high load, this would cause out-of-memory errors, slower response times, or complete crashes.
    
-   Third, connection timeouts needed tuning to prevent pool exhaustion. A connection pool is a set of reusable database connections. Creating new connections is expensive, so applications reuse them. The problem was that timeouts were too long, meaning connections would get stuck waiting. Under high load, you run out of available connections, and new requests start failing. Shopify tuned the timeouts to release connections faster.
    
-   Fourth, the team split API requests through a different load balancer approach. Originally, API requests would all enqueue to one region, which added latency and load. By scaling up the secondary region’s cluster and updating the load balancing policy, they better distributed the work and prevented API servers from being overwhelmed.
    

Beyond the performance fixes, the team validated alerting and documented response procedures. Their teams were trained and prepared to handle failures during the actual event.

## The Scale Tests

Game Days and load testing prepare individual components, but scale testing is different. It validates the entire platform working together at BFCM volumes, revealing issues that only surface when everything runs at capacity simultaneously.

From April through October, Shopify ran five major scale tests at their forecasted traffic levels, specifically their peak p90 traffic assumptions. In statistics, p90 means the 90th percentile, or the traffic level that 90% of requests will be below.

Here are the details of those scale tests:

-   The first two tests validated baseline performance against 2024’s actual numbers.
    
-   Tests three through five ramped up to 2025 projections, targeting 150% of last year’s load.
    
-   By the fourth test, Shopify hit 146 million requests per minute and over 80,000 checkouts per minute. On the final test of the year, they tested their p99 scenario, which reached 200 million requests per minute.
    

These tests are extraordinarily large, and therefore, Shopify runs them at night and coordinates with YouTube because the tests impact shared cloud infrastructure. The team tested resilience, not just raw load capacity. They executed regional failovers, evacuating traffic from core US and EU regions to validate their disaster recovery procedures actually work.

Shopify ran four types of tests:

-   Architecture scale-up tests validated that their infrastructure handles planned capacity.
    
-   Load tests during normal operations established baseline performance at peak load.
    
-   Load tests with failover validated disaster recovery and cross-region failover capabilities.
    
-   Game Day simulations tested cross-system resilience through chaos engineering.
    

The team simulated real user behavior, such as storefront browsing and checkout, admin API traffic from apps and integrations, analytics and reporting loads, and backend webhook processing. They also tested critical scenarios like sustained peak load, regional failover, and cascading failures where multiple systems fail simultaneously.

Each test cycle identified issues that would never appear under steady-state load, and the team fixed each issue as it emerged. Some of the key issues were as follows:

-   Scale Tests 1 and 2 revealed that under heavy load, core operations threw errors, and checkout queues backed up.
    
-   Scale Test 3 validated key migrations and confirmed that regional routing behaved as expected after infrastructure changes.
    
-   Scale Test 4 hit limits that triggered an unplanned failover, identifying priority issues in test traffic routing and discovering delays when bringing regions back online during rebalancing.
    
-   Scale Test 5 performed a full dress rehearsal and was the only test run during North American business hours to simulate real BFCM conditions. All the other tests ran at night.
    

Mid-program, Shopify made an important shift. They added authenticated checkout flows to their test scenarios. Modeling real logged-in buyers exposed rate-limiting code paths that anonymous browsing never touches. Even though authenticated flows were a small percentage of traffic, they revealed bottlenecks that would have caused problems during the real event.

## BFCM Weekend Operations

BFCM preparation gets Shopify ready, but operational excellence keeps them steady when traffic actually spikes.

The operational plan coordinates engineering teams, incident response, and live system tuning. Here are the key components of this plan:

-   The plan for BFCM weekend includes real-time monitoring with dashboard visibility across all regions and automated alerts.
    
-   For incident response, Incident Manager OnCall teams provide 24/7 coverage with clear escalation paths.
    
-   Merchant communications ensure stores get status updates and notifications about any issues.
    
-   Live optimization allows system tuning based on real-time traffic patterns as they develop.
    
-   After BFCM ends, the post-mortem process correlates monitoring data with actual merchant outcomes to understand what worked and what needs improvement.
    

The philosophy is simple: preparation gets you ready, but operational excellence keeps you steady.

## Conclusion

Shopify’s 2025 BFCM readiness program shows what systematic preparation looks like at scale. Thousands of engineers worked for nine months, running five major scale tests that pushed their infrastructure to 150% of expected load. They executed regional failovers, ran chaos engineering exercises, documented system vulnerabilities, and hardened systems with updated runbooks before merchants needed them.

What makes this different from typical pre-launch preparation is the systematic approach. Most companies load test once, maybe twice, fix critical bugs, and hope for the best. Shopify spent nine months continuously testing, finding breaking points, fixing issues, and validating that the fixes actually work.

Also, the tools Shopify built aren’t temporary BFCM scaffolding. The Resiliency Matrix, Critical Journey Game Days, and real-time adaptive forecasting became permanent infrastructure improvements. They make Shopify more resilient every day, not just during peak season.

To provide a visualization of BFCM, Shopify also launched an interesting pinball game to showcase the Shopify Live Globe. The game itself runs at 120fps in a browser with a full 3d environment, physics engine, and VR Support. Behind the scenes, the game is a three\[dot\]js app built with “react-three-fiber”. Every merchant sale shows up a few seconds later on this globe. Everyone can check out the game and the visualization on the homepage for [Shopify Live Globe](https://bfcm.shopify.com/)

**References:**

-   [How we prepare Shopify for BFCM](https://shopify.engineering/bfcm-readiness-2025)
    
-   [Extract, Transform, Load](https://en.wikipedia.org/wiki/Extract,_transform,_load)
    
-   [Toxiproxy](https://github.com/Shopify/toxiproxy)
    
-   [Shopify Live Globe](https://bfcm.shopify.com/)
    
-   [Details about the Shopify Live Globe Pinball Game](https://x.com/pushmatrix/status/1994241257497931944)
    

\---

## **SPONSOR US**

Get your product in front of more than 1,000,000 tech professionals.

Our newsletter puts your products and services directly in front of an audience that matters - hundreds of thousands of engineering leaders and senior engineers - who have influence over significant tech decisions and big purchases.

Space Fills Up Fast - Reserve Today

Ad spots typically sell out about 4 weeks in advance. To ensure your ad reaches this influential audience, reserve your space now by emailing **sponsorship@bytebytego.com.**