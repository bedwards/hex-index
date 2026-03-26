---
title: "[#303-Appendix] Automation of horizontal pallet movement"
author: "Various"
publication: "Supply Chain in Numbers"
publication_slug: "scnumbers"
published_at: "2025-09-18T12:03:51.000Z"
source_url: "https://scnumbers.substack.com/p/303-appendix-automation-of-horizontal"
word_count: 1096
estimated_read_time: 6
---

In this week’s Supply Chain in Numbers newsletter, I covered Swisslog’s addition of pallet transport AMR. Here is what I wrote:

> ***3,000 kg pallet transport AMR***
> 
> Swisslog, a provider of warehouse automation and software, expanded its portfolio by introducing the IntraMove series of autonomous mobile robots (AMRs). IntraMove AMRs provide a versatile, horizontal transportation for payloads up to 3,000 kg (6,613 lb). IntraMove is connected to the AI-based fleet management software via the VDA 5050 standard communication interface. These robots are available in different payload versions — 600 kg, 1,500 kg, and 3,000 kg. It can be directly linked to a WCS or WMS, such as the company’s SynQ software, which manages the transport orders. \[[Robotics 24x7](https://www.robotics247.com/article/swisslog_introduces_intramove_amr_series_for_dynamic_flexible_horizontal_pallet_transport)\]

Automating material movement is as old as the concept of the warehouse itself. Let us imagine that you are a Warehouse Manager or someone with ‘warehouse cost’ in your performance measures. I am sure you have explored many automation options within the four walls of your warehouse. \[If you haven’t yet, please let me know how you are still employed\]

There are multiple types of pallet movement automation form factors (forktrucks: horizontal & vertical, Mouse: horizontal, and Tugger: horizontal to pull a load; these form factors have blurred lines). This post is restricted to solutions that primarily involve horizontal transportation. Also, we will confine to ‘four walls of the warehouse’ operations. (e.g., pallets transported within factories are not covered here; Though most concepts will apply)

Now that we have defined our scope, here are some aspects to consider as you evaluate whether this automation makes sense.

The first step is to answer “Should I spend more time checking this automation option?”. The answer to your question is YES if at least one of the following statements is true:

1.  75%+ of pallet movement happens between predefined origin-destination paths
    
2.  Pallet movement involves 5+ mostly dedicated people, or forklift driver availability (including chronic absentism) is a significant daily problem, reducing warehouse throughput by 10%+
    
3.  Pallets move long distances and contain materials to which you want to minimize any human contact; this might be for safety (e.g, DG / Hazmat), or for better working conditions (e.g., constant movement between refrigerated and ambient sections)
    

Let us assume the answer is yes, and you want to know more details. Here are some key considerations for each area within the warehouse where pallet movement occurs.

1.  **Inbound to Storage**: The inbound load is already palletized and remains in that pallet until the outbound (pallet-in, pallet-out operations). Unless most pallets are stored on the ground, you will still need some forklifts to take them in and out of the racks. This will be a recurring theme**:** ***horizontal AMRs are typically not a one-to-one replacement for humans and forklifts.***
    
2.  **Inbound to Storage**: Inbound is floor-loaded, but it is palletized at the receiving area and then taken to the put-away racks for storage (this can also be a Pallet ASRS). There are warehouses where cases are stored, and the pallet is only for receiving and put-away movement. You will still need some forklifts in this case.
    
3.  **Storage to Picking**: Pallets are moved from the storage area (or ‘reserve’) to the ‘active’ pick area as part of regular replenishment. The use of pallet automation will require the creation of ‘staging’ areas at both the origin and destination. (E.g., each aisle end might be where all the pallets bound to active are staged). Humans mainly work out of this staging area, while the movement between staging areas occurs. Tugging is also an option in this case (manual or automated). One of the best practices is to schedule pallet movement when the warehouse has limited personnel, so that the next shift's workers can be productive as soon as they start. This is another recurring theme: ***Since robots can work when there are no humans, it is essential to change shift structure and work distribution methods to maximize robot usage***
    
4.  **Picking**: When picking involves “Pick to Pallet,” where humans pick cases or units and place them onto a pallet, then move to the next picking area. In this case, pallet automation is not suitable for the picking operation unless your systems can direct the pallet robot to the next Picker. If that is your pallet automation use case, you can probably look at Collaborative Bots (co-bots) for a better fit (e.g, Locus Robotics, 6 River Systems, etc.). In this use case, a significant number of decisions need to be made by the robots, and it involves more than just horizontal movement. One more recurring theme: ***It is not just about the robot but about the information exchange with other automation and systems in the warehouse.***
    
5.  **Packing to Shipping**: This process is similar to ‘storage to picking’ movement, as pallets are moved between two staging areas. Typically, packing is closer to shipping and may not require many forklifts today, thereby minimizing the benefits of automation.
    

Now that you have mapped all the pallet movements and their potential for automation, you can calculate the costs of labor and machines that can be avoided through automation (both baseline and forecasts). This is the potential benefit. This can also include the cost of labor shortage, resulting in missed orders. Additionally, there may be other service-level benefits, but they are more challenging to quantify.

The next step is to evaluate costs. Typically, quantified as “**Total Cost of Ownership**” (say, over the next three years). Answer these questions to calculate the total costs:

-   What is the total cost of acquisition? Is there a subscription model (Robotics-as-a-Service might be an option)?
    
-   What is the annual maintenance cost that includes software license fee, warranty costs, and engineering maintenance costs?
    
-   Do we need to hire new maintenance engineers? How much do they cost? Is there a ‘pay-per-use’ model?
    
-   How much is the one-time expense that includes system integration, project management, infrastructure changes, and offloading current MHEs?
    
-   What is the typical life of this AMR?
    
-   What is the cost of preparing the warehouse surface for these robots? \[e.g, cracks in the concrete can be a pain\]
    
-   What are the scaling costs and lead times required? ***Proverbial, “throwing people at it” is not an option with robots, and scaling up (or scaling down) is not trivial.***
    

Voila! You have costs and benefits. All the best with your business case!

**Additional reading**: You can watch IntraMove AMRs use cases [here](https://www.youtube.com/watch?v=y7inwYFGGEs). These types of solutions are available from multiple companies too (e.g, Addverb, Mecalux, Tusk Robots, Baylo, Fetch, etc.). *A comprehensive report on the AMR and AGV market can be found [here](https://www.stiq.ltd/?utm_source=STIQ_REPORT-AGV2024-PDF), published by the goods folks at STIQ Ltd.*

Thank you for reading. I am sure I have missed many points, and I would be glad to learn from you. Please reply with your comments.