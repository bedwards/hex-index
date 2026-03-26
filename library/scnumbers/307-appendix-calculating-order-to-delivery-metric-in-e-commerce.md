---
title: "[#307-Appendix] Calculating \"Order-to-Delivery\" metric in E-commerce"
author: "Various"
publication: "Supply Chain in Numbers"
publication_slug: "scnumbers"
published_at: "2025-10-23T12:03:16.000Z"
source_url: "https://scnumbers.substack.com/p/307-appendix-calculating-order-to"
word_count: 1203
estimated_read_time: 7
---

*Welcome to “Supply Chain in Numbers”. This newsletter tracks significant numbers from the supply chain world. Primarily, this newsletter publishes five prominent numbers every Monday. In this “Appendix” post (published on Thursday), one of the numbers from the week is used to illustrate more interesting points.*

In last week’s [Supply Chain in Numbers](https://scnumbers.substack.com/p/307-supply-chain-in-numbers-oct-13), I covered this number regarding US consumer expectations on faster delivery:

> ***31% of shoppers expect same day delivery***
> 
> *Nearly one in three U.S. consumers now expect same-day delivery, according to Ryder’s 2025 E-commerce Consumer Study. The finding highlights how quickly shopper expectations are shifting and how much pressure this puts on supply chains already balancing speed, cost, and sustainability. The study, which surveyed 1,000 U.S. online shoppers, found that 31% now consider same-day delivery standard, up sharply from prior years when two-day shipping was the gold standard. At the same time, 63% expect delivery in two days or less, showing how fast fulfillment is becoming a baseline requirement. \[[Supply Chain 24x7](https://www.supplychain247.com/article/ryder-study-same-day-delivery-2025?mod=djemlogistics_h)\]*

The findings of this survey are hardly surprising at a macro level, but ‘same day’ delivery should be taken with a grain of salt. An online shopper can be someone ordering ‘dog food from the nearby store for pickup’ (*picking up in 2 hours*), ‘running shoes’ (*okay to get it next 2 to 3 days*), or ‘electronic synthesizer with custom case’ (*I know this takes 6 to 8 days*). I can go on and on. You get that point. More on this some other day.

It is common for a supply chain manager to get questions from Senior Leadership related to this topic. I want to focus this post on how to get insights on answering these questions. *To make it a little more fun (hopefully), I will structure each insight as a GenAI prompt.*

We will start with the most basic question: “What is our average order-to-delivery days”. As much as I want to say that it is a simple difference between order date and delivery date, there are nuances.

To illustrate, here is a sample order dataset with two orders. Each has multiple orderliness, and they have different delivery dates.

[

![](https://substackcdn.com/image/fetch/$s_!_7hm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0386112a-9b38-4aa3-81af-fc07c0238b68_766x331.png)



](https://substackcdn.com/image/fetch/$s_!_7hm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0386112a-9b38-4aa3-81af-fc07c0238b68_766x331.png)

```
Calculate “Customer OTD days”. It is defined as number of calendar days between “Delivery Date” and “Customer Order Date”. Add the column.
```

[

![](https://substackcdn.com/image/fetch/$s_!PCNo!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3188c5db-0fdd-4291-918e-927c46ddacfa_800x306.png)



](https://substackcdn.com/image/fetch/$s_!PCNo!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3188c5db-0fdd-4291-918e-927c46ddacfa_800x306.png)

Any supply chain person is going to fume at this table. Because it misses two important points:

1.  **Order Cut-off Time**: Any order placed after this cut-off time will be processed the next day at the fulfillment center. Amazon has a clever way of showing the cut-off time in terms of “order by… to get the delivery by…”. *(Many factors go into determining this and I hope to write on this detail in the future).*
    
2.  **Fulfillment Center Working Days**: “next day” in the previous sentence refers to “next working day” because FC might not work on every day of the week (and then there are holidays, of course).
    

```
Our fulfillment center has a cut-off time of 4pm. Any order placed after this cut-off time is considered for next working day. Working days are Monday to Friday. Add a column for SC Order Date accounting for cut-off and working days
```
```
Calculate “SC OTD Days” as number of calendar days between “Delivery Date” and “SC Order Date”. Add the column.
```

[

![](https://substackcdn.com/image/fetch/$s_!HQjq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F79774f1a-0577-4192-bd73-29dc3a7c0271_800x221.png)



](https://substackcdn.com/image/fetch/$s_!HQjq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F79774f1a-0577-4192-bd73-29dc3a7c0271_800x221.png)

As a reminder, we still have not answered the fundamental question we got from the leadership. “What is our average order-to-delivery days?”

```
There are three methods to calculate “Avg. Customer OTD days”
```
```
Method 1 is called “Full order fulfillment OTD”. It is calculated as the average of maximum of “Customer OTD Days” for every order.
```
```
Method 2 is to calculate “Orderline fulfillment OTD”. It is calculated as the average of “Customer OTD Days” for every order line.
```
```
Method 3 is called “Order quantity OTD” and is calculated as the weighted average of “Customer OTD Days” and “Order Quantity”.
```
```
Repeat the all the three methods again to calculate “Avg. SC OTD days” replacing “Customer OTD Days” with “SC OTD Days”.
```
```
Create a table with all averages calculated along with a simplified sentence on calculation logic
```

This is what you get:

[

![](https://substackcdn.com/image/fetch/$s_!c27C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc622102e-1103-456d-9a03-c30d4c4f7762_800x138.png)



](https://substackcdn.com/image/fetch/$s_!c27C!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc622102e-1103-456d-9a03-c30d4c4f7762_800x138.png)

So, my dear friends, there are six potential answers to the simple question. From as low as 2 days to as high as 5 days, the answers vary significantly. I do not blame Senior Leadership if they get frustrated with supply chain teams. There is nothing simple, unfortunately.

The most common is the Method 2 — Orderline-based calculation of SC OTD Days. But every business is different, and they should define it based on their business strategy.

There will be more questions after answering the average OTD days. Most of the questions are related to “How can we reduce our OTD days?”.

**Three strategic supply chain design factors that mainly influence Order-to-Delivery (OTD) days:**

1.  **Fulfillment Center (FCs)**: Distance from the customer determines transit time. (Overnight air delivery is an option in most cases, but that costs a lot more. Network decisions are mostly made using ground travel distances.  
    `What % of our customer location is within 1, 2, 3, 4, and anything more than 4 days from our location. Assume 500 miles distance travelled per one day`
    
2.  **Inventory Deployment**: Even with FCs nearest to the customer, right inventory placement is key.  
    `What % of our orderlines are fulfilled from the nearest fulfillment center`
    
3.  **Transportation design**: First mile, middle mile, and last mile carrier options that include truck, LTL, and parcel providers.  
    `What % of orders were delivered by our carriers as per the contractual delivery days from the shipment pickup date and time`
    

While the OTD days calculation so far uses only two dates, there are many process steps between these dates. Generating insights will need to look at each of the process steps. Some key OTD parts are:

1.  **Order to Order Confirmation**: Order confirmation includes credit checks. This is typically in a few minutes, but for orders closer to cut-off, these minutes can be crucial.
    
2.  **Order Confirmation to Inventory Allocation**: Depending on the number of orderliness, network locations, fulfillment capacity, and other constraints, this is the step when fulfillment centers get the order line assignments. Any suboptimal order assignments are related to this step.
    
3.  **Inventory Allocation to Warehouse Waving**: This is the time taken by warehouse processes to plan the picking and other downstream tasks
    
4.  **Warehouse Waving to Picking**: Once the plan is released to the warehouse floor, the time taken to complete picking
    
5.  **Picking to Packing**: Once picking is completed, the time taken to complete packing.
    
6.  **Packing to Ship Ready**: After packing, the package needs to make it to the shipping dock (and probably to the carrier’s trailer). This is generally when the responsibility of the warehouse team ends, and the transportation team takes over.
    
7.  **Ship Ready to Carrier Pickup**: Depending on when carriers come to pick up, there can be a few hours of wait here. The value of optimizing all the prior steps might not be much, depending on the constraints of this step. This is, at times, least understood by non-warehouse teams. They tend to expect ‘OTD Days’ to reduce because picking time has been reduced (Only the orders placed closer to cut-off benefit from this, or cut-off times can move because of this optimization)
    
8.  **Carrier Pickup to Delivery**: Transit time until delivery, including multiple delivery attempts
    

*Thank you for reading. I am sure I have missed many points, and I would be glad to learn from you. Please reply with your comments.*