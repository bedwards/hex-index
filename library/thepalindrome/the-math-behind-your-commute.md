---
title: "The Math Behind Your Commute"
author: "Tivadar Danka"
publication: "The Palindrome"
publication_slug: "thepalindrome"
published_at: "2025-12-05T15:24:35.000Z"
source_url: "https://thepalindrome.org/p/the-math-behind-your-commute"
word_count: 1711
estimated_read_time: 9
---

Hey! It’s Alberto and Tivadar.

**In 2026, we are taking The Palindrome to the next level.** Secure your annual membership for $70/year before Dec 31 (normally $100). **You keep the discounted price forever**. Even when our prices go up.

**Why Upgrade Now?** We are building the ultimate library for mathematics and machine learning. We are currently at 550 paid members (55% of our goal), and your subscription unlocks specific upgrades for the entire community:

■■■■■▢▢▢▢▢ 55%

Every new paid subscription will contribute to the following milestones:

-   **600 paid subscribers → “Mathematics of Machine Learning”** exclusive deep-dive mini course, included in your sub.
    
-   **700 paid subscribers → Another exclusive mini-course (Q4 2026)**
    
    A second mini-course with a different expert/angle. We are building up an extensive “course library” for members.
    
-   **800 paid subscribers → Dedicated Manim animator**
    
    We’ll bring on a **Manimator** so more articles come with clean, high-quality animations that make the concepts instantly click for you.
    
-   **1,000 paid subscribers → Full-time writer**
    
    This is the big one. With a full-time writer on the team, we can ship **more deep dives, more courses, and more structured learning tracks** throughout 2026.
    

\---

In the modern world, we are used to technology telling us how to travel from our current position to places we have never been. It usually lets us know several ways to get there, including the fastest or cheapest.

In today’s post, I want to present the two most basic algorithms used in real-life scenarios that support a massive part of what our current delivery, location, and transportation services use. Though the mechanisms used in modern-day apps are much more sophisticated, they stand on the shoulders of these two basic but effective methods.

In order, this is our agenda for today:

-   **🍞 Breadth-First Search —** a graph traversal that simulates how you would explore a new city.
    
-   🥖 **Depth-First Search —** a graph traversal that would allow you to escape from any maze.
    
-   🥞 **Connected Components —** a graph term to call your hometown if you knew how to get to any place from any location.
    

Given a graph *G = (V, E)* and two vertices *s* and *t*, the goal is to determine whether there exists a path that starts at *s* and ends at *t*. This problem is known as **the connectivity problem**.

Below are two algorithms for naturally solving this problem: Breadth-First Search and Depth-First Search. The workings and implementation of these algorithms will be explained in detail in the following sections.

## 🍞 Breadth-First Search

This algorithm is the simplest one for solving the connectivity problem between a pair of vertices. It involves starting from *s*, exploring all directions, and adding the discovered vertices one layer at a time. The first layer consists of the vertex *s*, and the second layer contains all vertices adjacent to *s*. If this process continues, the current layer will always consist of adjacent vertices from the previous layer. The algorithm terminates when there are no more vertices to discover.

This algorithm can be interpreted as a **wave** starting at vertex *s* and expanding to adjacent vertices as soon as possible. The layer assigned to a vertex corresponds to when this wave reaches it.

Formally, if the layers constructed by the **BFS** algorithm are enumerated as *C*₁, *C*₂, *C*₃, …, then:

-   Layer *C*₁ consists of all vertices that are adjacent to *s*. For convenience, the layer that consists of only the vertex *s* will be denoted as *C*₀.
    
-   Assuming the layers *C*₁, ..., *Cⱼ* have been constructed, layer *Cⱼ*₊₁ consists of all vertices that do not belong to any previous layer and share an edge with some vertex in layer *Cⱼ*.
    

Caption: Visual representation of the BFS traversal. It starts at the vertex *S* and expands to the rest of the reachable vertices layer by layer.

[

![](https://substackcdn.com/image/fetch/$s_!SzSM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F131bdb44-7fdf-4727-b20e-feba4e58552a_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!SzSM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F131bdb44-7fdf-4727-b20e-feba4e58552a_1920x1080.png)
*Visual representation of the BFS traversal. It starts at the vertex *S* and expands to the rest of the reachable vertices layer by layer.*

This algorithm is beneficial because it provides a lot of information. Suppose any vertex *v* in the graph does not belong to any of the layers generated by the **BFS** traversal. In that case, it means that there is no path from *s* to *v*. Furthermore, this traversal, assuming the definition that the distance between two vertices is the **minimum number of edges** in any path between them, groups the vertices according to their distance from *s*.

**Proposition 1:** For each *j ≥ 1*, the layer *Cⱼ* generated by the **BFS** algorithm consists of all vertices at a distance *j* from *s*. A path exists from *s* to *t* if and only if *t* appears in one of the layers.

[

![](https://substackcdn.com/image/fetch/$s_!xGjJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ffac374-45eb-4b28-80e7-9ca556521a49_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!xGjJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3ffac374-45eb-4b28-80e7-9ca556521a49_1920x1080.png)
*In this example, the vertex *T* does not belong to any of the layers generated by the BFS traversal starting from *S*. Therefore, there is no path from *S* to *T*.*

Another important property of the **BFS** traversal is that it produces a tree with root vertex *s* and containing all vertices reachable from *s*. Every vertex *v* distinct from *s* is added to this tree when it is first discovered.

When analyzing the layer *Cⱼ*, if there is a vertex *u* in this layer with an edge connecting it to a node *v* that has not yet been discovered, then the edge *(u, v)* is added to the tree such that *u* is the parent of *v*. This signifies that *u* was responsible for completing the path from *s* to *v*. This tree is known as the **BFS tree**.

The image below illustrates how the **BFS tree** is determined in an example graph.

[

![](https://substackcdn.com/image/fetch/$s_!DoO2!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff33dd47f-1639-47e4-86a5-e912cc4aca6d_1920x700.png)



](https://substackcdn.com/image/fetch/$s_!DoO2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff33dd47f-1639-47e4-86a5-e912cc4aca6d_1920x700.png)
*Construction of the BFS tree in a graph. The graph is fully shown in Figure (C). The BFS traversal starts at vertex 1 and discovers vertices 2 and 3 (A). These, in turn, discover vertices 4, 5, 7, and 8 (B). Finally, vertex 6 is discovered (C). The edges represented by solid lines form the BFS tree and are called tree edges.*

## 🥖 Depth-First Search

The other method to find the set of vertices reachable from *s* simulates the natural way of behaving if graph *G* were a maze of interconnected rooms. You would start at *s* and visit one of its adjacent rooms. Once in this new room, you would repeat the previous process until reaching a point where all adjacent rooms to the current room have been explored. At this point, you backtrack along the same path until you find a room with unexplored neighbors and resume the traversal from one of them.

The method described is known as **Depth-First Search (DFS)**, and it receives this name because it explores *G* by traversing as deeply as possible before backtracking only when necessary.

This method differs from **BFS** in the way it finds unvisited vertices. Although both algorithms find the same set of vertices reachable from an initial node, they generally do so in a very different order. The **DFS** traversal explores very long paths, potentially moving quite far from *s* before returning to explore new paths.

[

![](https://substackcdn.com/image/fetch/$s_!WtIL!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c4d46ca-f036-4144-993e-3991fdab71f6_4157x1516.png)



](https://substackcdn.com/image/fetch/$s_!WtIL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2c4d46ca-f036-4144-993e-3991fdab71f6_4157x1516.png)
*Visual representation of the behavior of the DFS algorithm. It tries to explore new unvisited vertices until it is stuck. Then, it backtracks to the closest vertex with an adjacent non-visited vertex left and continues exploring.*

The **DFS** method also produces a tree with its root at the initial vertex *s*. This tree is constructed similarly to the **BFS tree**: *s* is denoted as the root, and *v* is designated as the parent of *u* if *v* **discovered** *u*. The tree produced by this algorithm is known as the **DFS tree**, and although it is built under the same criteria as the **BFS tree**, it can differ significantly in structure due to the nature of the traversals.

The most characteristic difference is that the **BFS tree** usually has paths from the root to the leaves that are as short as possible, whereas the tree produced by the **DFS** algorithm is typically narrow and deep.

**Proposition 2:** Let *T* be the **DFS tree** produced by the **DFS** algorithm on a graph *G*. Given a recursive call of **DFS(u)**, every vertex marked as visited between the invocation and the end of this recursive call is a descendant of *u* in *T*.

Using **Proposition 2**, we can prove the following:

**Proposition 3:** Let *T* be a **DFS tree**, *u* and *v* be vertices of *T*, and *(u, v)* an edge of *G* that does not belong to *T*. Then *u* is an ancestor of *v,* or *v* is an ancestor of *u* in *T*.

**Proof.** Without loss of generality, suppose that *u* is reached before *v* in the **DFS** traversal. When the edge *(u, v)* is examined during the call **DFS(u)**, it is not added to *T*; therefore, *v* is marked as **visited**. Since *v* was not marked as visited at the time **DFS(u)** was invoked, it is a node that was discovered between the invocation of this recursive call and its end. According to **Proposition 2**, *v* is a descendant of *u*. ∎

## 🥞 Connected Components

The sets of vertices discovered by the **BFS** and **DFS** algorithms contain all the vertices reachable from *s*. This set is, by definition, the **connected component** of *G* that includes *s*. To solve the connectivity problem between two vertices, *s* and *t*, one must check if *t* belongs to this component.

The **BFS** and **DFS** algorithms are some of the ways to generate the connected component to which a given vertex belongs. More generally, the following procedure can be used to discover the set of vertices reachable from *s*:

*Start with a set **D = {s}**, and at each step, check if an edge in **G** exists, say **(u, v)**, such that one of its endpoints belongs to **D** and the other does not. In this case, add the new vertex. **The algorithm terminates when no more such edges exist**.*

[

![](https://substackcdn.com/image/fetch/$s_!vOlP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F960aee9b-af46-4fa6-af70-e16bbfd96bb9_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!vOlP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F960aee9b-af46-4fa6-af70-e16bbfd96bb9_1920x1080.png)
*A stage of the generic algorithm for finding the connected component of *S*. Red vertices represent the current state of set *D*. Discontinued lines have one endpoint in the set *D* and the other outside of it. Nodes *S* and *T* belong to different connected components.*

As can be seen, the described algorithm is a generic way to find a connected component. **BFS** and **DFS** are specific algorithms for finding edges with one endpoint in the current set and the other outside it.

\---

*Quick note: the Mathematics of Machine Learning has just crossed 5000 sold copies! There’s a 15% discount right now on Amazon, make sure to grab it!*