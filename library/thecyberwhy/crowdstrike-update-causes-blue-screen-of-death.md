---
title: "Crowdstrike Update Causes Blue Screen of Death"
author: "Daniel Kelley"
publication: "The Cyber Why"
publication_slug: "thecyberwhy"
published_at: "2024-07-19T14:43:00.000Z"
source_url: "https://www.thecyberwhy.com/p/crowdstrike-update-causes-blue-screen"
word_count: 688
estimated_read_time: 4
---

*The below is a post written by The Cyber Why author and first posted on the Ox Security blog.*

Happy almost weekend, everybody… or not, if you’re in IT… trying to travel… or get medical attention... or just get your work done and start the weekend off with a bang.

Many of us have woken up to the news of a massive global outage caused by a Crowdstrike Falcon endpoint sensor update for Windows hosts. From airlines to banking systems, emergency services to media outlets, businesses around the world are dealing with the dreaded Blue Screen of Death (BSOD) to kick their weekend into high gear.

**NOTABLY… this is not a cyber attack.** As far as we know, malintent is not an issue.

[

![](https://substackcdn.com/image/fetch/$s_!e5lU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F63493235-9612-438d-8d4f-d4c5da3a9fb9_1314x738.webp)



](https://substackcdn.com/image/fetch/$s_!e5lU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F63493235-9612-438d-8d4f-d4c5da3a9fb9_1314x738.webp)
*This image was added by TCW Editors - Not in the original post*

According to the [company’s website](https://www.crowdstrike.com/blog/statement-on-windows-sensor-update/), the outage was caused by “a defect in a single content update for Windows hosts. Mac and Linux hosts are not affected.” Further, the company says that the issue was “identified, isolated and a fix has been deployed.” 

[

![](https://substackcdn.com/image/fetch/$s_!eCdT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F25d1d71e-ef61-4042-9a10-87d10034ad20_1120x526.png)



](https://substackcdn.com/image/fetch/$s_!eCdT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F25d1d71e-ef61-4042-9a10-87d10034ad20_1120x526.png)

Good news! Except, according to sources, this isn’t the simple fix it’s being positioned as.

[

![](https://substackcdn.com/image/fetch/$s_!SBru!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f24ee5f-11cc-492b-89fd-134fe414ccdc_1254x456.png)



](https://substackcdn.com/image/fetch/$s_!SBru!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f24ee5f-11cc-492b-89fd-134fe414ccdc_1254x456.png)

Source: Reddit: [https://www.reddit.com/r/crowdstrike/comments/1e6vmkf/bsod\_error\_in\_latest\_crowdstrike\_update/](https://www.reddit.com/r/crowdstrike/comments/1e6vmkf/bsod_error_in_latest_crowdstrike_update/) 

While attempting to triage the fix, many customers are reporting that they’re stuck in a boot loop and being forced to manually reset impacted servers, which could result in hours — or possibly days — of downtime and uncountable amounts of lost productivity and revenue. 

**Dependency issue, not a cyber issue**

If this is not a cybersecurity issue — and it does not seem to be — why is a company like OX commenting? Quite simply: because it highlights the criticality of understanding the longtail of dependencies within IT infrastructures. 

Neatsun Ziv, OX Security’s CEO and Co-founder, has said, “Incidents like the one we are seeing cause global chaos today, where an error in an update provided by a provider causes widespread outages, are not uncommon. What is unique about this incident is the scale at which it has taken place, likely wiping billions of dollars from the global economy due to global, widespread downtime.”

What’s become clear in the aftermath is that IT and operations teams are having to boot individual endpoints manually, which will take tons of time, especially for understaffed businesses. If the machine is Bitlockered, response teams will also have to enter a very long passcode, delete the file, and then restart. Remote-first companies will have to walk employees through these steps. 

**Agent-based systems versus agentless**

While the world is recovering, we don’t want to cast stones. It’s easy to say, “An engineer messed up!!” But in reality, sometimes things happen. What we will say is that agent-based tools have consistently caused issues, starting with performance issues and network bandwidth issues.

As illustrated here, deployment and management of agents are problematic at scale. Furthermore, ensuring consistent agent configurations and updates across the entire ecosystem — especially if we’re talking about 100s of thousands, is extremely challenging. 

With the Crowdstrike issue, the remediation requires hands-on-keys to fix. In today’s hybrid and highly mobile work environment, ensuring the right updates in this scenario is nearly impossible. 

In contrast, agentless deployments offer numerous advantages, especially when it comes to updates. Automated agentless updates facilitate:

-   **Centralized Control:** Without the need for agents on individual devices, updates can be managed centrally, ensuring consistency and efficiency.
    
-   **Rapid Deployment:** New patches or software versions can be pushed out to all endpoints simultaneously, accelerating the update process.
    
-   **Reduced Error Rate:** Centralized control minimizes the risk of human error during the update process.
    
-   **Improved Security:** By eliminating the need for agents, which can be potential attack vectors, agentless technology enhances security.
    
-   **Scalability:** Handles large-scale deployments with ease, as there's no need to manage agents on countless devices.
    

This is an extremely unfortunate incident, and we wish every affected IT team good luck! What’s important here is to remember that incidents will happen — whether they’re cyber incidents or IT incidents. The best way to mitigate both the likelihood and severity of incidents is careful planning, including threat modeling, testing, backups, and practicing rapid response — and perhaps a future agentless approach.