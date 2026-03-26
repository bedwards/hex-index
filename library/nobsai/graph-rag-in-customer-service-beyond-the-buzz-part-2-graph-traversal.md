---
title: "Graph RAG in Customer Service - beyond the buzz (Part 2: Graph Traversal)"
author: "Various"
publication: "NO BS AI"
publication_slug: "nobsai"
published_at: "2025-02-13T12:03:16.000Z"
source_url: "https://nobsai.substack.com/p/graph-rag-in-customer-service-beyond-e81"
word_count: 1252
estimated_read_time: 7
---

In [Graph RAG Part 1 article](https://nobsai.substack.com/p/graph-rag-in-customer-service-beyond), I have shown about what graph community summaries in Graph RAG can give us . To recap, they provide a few useful features:

-   They **normalize entity names**: *Instead of e.g. “scaling”, “scaled recipes”, “Scaling”, and other similar forms, they tend to stick to detected entity name “Scaling” in all summaries.*
    
-   They **describe facts in a standardized form and vocabulary**: *Mostly, the sentence format follows the structure “X does/is/{another verb} Y.*
    
-   They gather knowledge from related nodes and thus **enable a bit of "fanning out" and looking for extra information**: *Thanks to the Community Summaries which often gather multiple interconnected entities in the same summary, it is possible to detect that the app Cookidoo can indeed provide Scaled recipes, but also provides dedicated recipes to specific Thermomix models.*
    

Now it's time for exploring **graph traversal**, which is employed in the Search part of Graph RAG.

Graph traversal is the act of moving through the graph via existing edges, which connect the nodes. In Graph RAG, it is used in one of the possible models of search, called Local Search.

### How does Local Search work?

[

![](https://substackcdn.com/image/fetch/$s_!A-q9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dbda15c-b3a9-4458-8843-f7972f647d2a_1222x715.png)



](https://substackcdn.com/image/fetch/$s_!A-q9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dbda15c-b3a9-4458-8843-f7972f647d2a_1222x715.png)

Step 1: Query Embedding & Initial Node Retrieval:

-   Convert the input query into an **embedding vector**.
    
-   Perform a **vector similarity search** (e.g., cosine similarity) to find the most relevant **starting nodes** in the graph.
    

Step 2: Graph Traversal:

-   Once a relevant node is found, explore its **connected neighbors** within a predefined depth.
    
-   This helps retrieve related facts, entities, or concepts **without searching the entire graph**.
    

Step 3: Contextual Filtering:

-   Not all neighboring nodes are useful. There are various ways to check the value of a node:
    
    -   **Relevance scoring** (e.g., embedding similarity, semantic similarity).
        
    -   **Edge weight filtering** (if graph has weighted edges).
        
    -   **Node importance ranking** (e.g., PageRank, centrality).
        

Step 4: Subgraphs as contexts for RAG:

-   The **retrieved nodes and edges** form a **subgraph** that contains the most relevant information.
    
-   This subgraph is converted into a **textual context** for the LLM.
    

### What does this give us?

In [Part 1](https://nobsai.substack.com/p/graph-rag-in-customer-service-beyond), I used a small database of Thermomix manuals. Let's stick to it now.

Let's also stick to the query: "*Why can't I use scaling?*"

FYI and Reminder ***(this will be important for understanding our experiments):** Scaling in Thermomix refers to the new feature in Cookidoo that allows users to adjust recipe serving sizes to suit their needs.*

The Graph RAG implementation is the official Microsoft one: [https://github.com/microsoft/graphrag](https://github.com/microsoft/graphrag), which offers standardized prompt templates for each processing stage. It is important to change the prompts to fit your domain and needs. My example was obtained with significantly changed prompts, aligned with the needs of technical documentations. So, my Graph RAG is conditioned to catch information such as numeric values, sizes, dimensions, procedures, etc.

For my query, graph traversal is done with a default depth of 2 (which means that you can do 2 hops max from each starting node). The result is a set of detected relevant nodes, together with their relationship descriptions:

`source node | target node | description`

`COOKIDOO® MEMBERSHIP | UPGRADE | The COOKIDOO® MEMBERSHIP requires an upgrade to access additional features, particularly those introduced in Cookidoo® 3.0. This upgrade is essential for users who wish to take advantage of the new functionalities available within the platform.`

`COOKIDOO® MEMBERSHIP | SCALING FEATURE | The scaling feature is only available to users who have upgraded their Cookidoo® membership.`

`COOKIDOO® MEMBERSHIP | SCALING | Scaling is a feature that becomes available upon upgrading the Cookidoo® membership.`

`SCALING FEATURE | UPGRADE | The scaling feature is one of the new functionalities accessible after upgrading the Cookidoo® membership.`

`SCALED RECIPES | RECIPE SCALING | Recipes that are scaled by the user are altered from the original recipe and saved in their created recipes list.`

`SERVING SIZE | SCALED RECIPES | Scaled recipes are adjusted based on the serving size selected by the user.`

`MEMBERSHIP UPGRADE | VERSION 3.0 | To access scaled recipes, users must upgrade their membership to Version 3.0.`

`COOKIDOO® | SCALED RECIPES | Cookidoo® is a versatile platform that provides a wide range of scaled recipes designed to accommodate various portion sizes. It serves as a key resource for users seeking recipes that can be easily adjusted to meet their specific needs.`

`.....`

## Graph RAG vs Regular RAG

Now, let's compare the answer from Graph RAG with a regular RAG.

Question: "**Why can't I use scaling?**"

Regular RAG: **“You cannot use the scaling feature because it is only available with an upgraded annual Cookido membership. To access scaled recipes, you need to upgrade to version 3.0.”**

Graph RAG: "**Understanding the Scaling Feature**

The scaling feature on the Cookidoo® platform is designed to allow users to adjust ingredient quantities in recipes to create larger or smaller portions. However, access to this feature is contingent upon having an upgraded Cookidoo® membership.

**Membership Upgrade Requirement**

To utilize the scaling feature, you must upgrade your Cookidoo® membership to version 3.0. If you have not completed this upgrade, you will not have access to scaling or other new functionalities introduced in this version. The upgrade process is essential for unlocking these features, including the ability to create scaled recipes and use the "Created Recipes" functionality.

**Accessing Scaled Recipes**

Once you have upgraded your membership, you can access scaled recipes by selecting the desired serving size. This allows you to view pre-scaled recipes or scale any other recipe to fit your needs. If you are unsure about your membership status, you can check your Cookidoo® profile for information regarding any necessary upgrades."

### **The effect of Graph Traversal**

The answer from my Graph RAG is of course heavily dependent on the final prompt which builds the answer out of all available pieces of information. However, the general observations of the effect of graph traversal are the following:

-   **Extra information in contexts:** similarly as in the case of community summaries, there's a possibility to enrich the RAG contexts with more useful information, which is **not straightforward to discover otherwise**. We can see that the Graph RAG answer explains what scaling is, and gives advice on how to use it. It might be a bit too much if we only care about the straightforward answer (*"scaling doesn't work" -> "upgrade membership to verision 3.0"*) However, it's possible that the **user has this feature enabled but simply cannot use it**. In this case, the instruction could come in handy.
    

This behavior is possible thanks to discovering relationships such as:

`SERVING SIZE | SCALED RECIPES | Scaled recipes are adjusted based on the serving size selected by the user.`

-   **Detailed numeric and technical info:** Node and relationship descriptions are more likely to contain detailed data than community summaries. By detailed data I mean **concrete dimensions, version numbers, and all technical features of products and services** necessary to really diagnose problems. Community summaries are as their name suggests - summaries or generalizations of information. Nodes and relationships on the other hand provide a deeper dive.
    

On the other hand, using all available Graph RAG features, such as community summaries, node descriptions, relationship descriptions, and source text chunks, it is possible to create massive contexts which could be problematic in their own right. They could be **too big to effectively handle** by the final generator LLM, resulting in imprecise and blurry answers. So, in practice we often select only a part of the available information. For example, we rarely use community summaries at all for technical customer service due to their too general nature.

In the next article on Graph RAG - the Part 3 - I will share some tips on making your Graph RAG fit your needs, based on our experience.