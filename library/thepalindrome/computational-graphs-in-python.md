---
title: "Computational Graphs in Python"
author: "Tivadar Danka"
publication: "The Palindrome"
publication_slug: "thepalindrome"
published_at: "2025-10-24T09:46:22.000Z"
source_url: "https://thepalindrome.org/p/computational-graphs-in-python"
word_count: 382
estimated_read_time: 2
---

Hi there!

Welcome to the third lesson of the Neural Networks from Scratch course, where we’ll build a fully functional tensor library (with automatic differentiation and all) in NumPy, while mastering the inner workings of neural networks in the process.

Let’s recap. The previous two sessions were about the mathematical prerequisites:

-   [vectors, matrices,](https://thepalindrome.org/p/vectors-and-matrices)
    
-   and [graphs](https://thepalindrome.org/p/introduction-to-computational-graphs).
    

Now it’s time to smash the throttle and implement actual computational graphs. We’ve seen them before: for instance, consider the famous *logistic regression* model defined by the expression

[

![](https://substackcdn.com/image/fetch/$s_!l-ps!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37937ab7-be7a-4f6b-8347-c3bc4401e91b_1920x700.png)



](https://substackcdn.com/image/fetch/$s_!l-ps!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F37937ab7-be7a-4f6b-8347-c3bc4401e91b_1920x700.png)

where σ(*x*) = (1 + *e*⁻*ˣ*)⁻¹ is the Sigmoid function. Computationally speaking, the expression `sigmoid(a * x + b)` is calculated in several steps:

-   `c = a * x`,
    
-   `d = a * x + b` (which is `d = c + b`),
    
-   and finally `e = sigmoid(a * x + b)` (which is `e = sigmoid(d)`).
    

This can be represented via a graph, where

-   variables (such as `a`, `x`, `b`, `c = a * x`, and so on) are the nodes,
    
-   and computations between the variables (such as `*`, `+`, and the `sigmoid` function) are the edges.
    

Something like this:

[

![](https://substackcdn.com/image/fetch/$s_!7BWu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdc73f56-5e2e-4836-a1ad-8ac4b40e0500_1920x700.png)



](https://substackcdn.com/image/fetch/$s_!7BWu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdc73f56-5e2e-4836-a1ad-8ac4b40e0500_1920x700.png)
*The computational graph defined by logistic regression*

These are called *computational graphs*. Here’s another example: the dot product in two dimensions, defined by

[

![](https://substackcdn.com/image/fetch/$s_!fULq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5e95c6c-ceb2-4abb-8d7a-b26b5e10ef71_1920x700.png)



](https://substackcdn.com/image/fetch/$s_!fULq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5e95c6c-ceb2-4abb-8d7a-b26b5e10ef71_1920x700.png)

Let’s sketch this as well:

[

![](https://substackcdn.com/image/fetch/$s_!7wxh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8d0a195e-5f75-4516-bdf2-4ccfd4ba8cbe_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!7wxh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8d0a195e-5f75-4516-bdf2-4ccfd4ba8cbe_1920x1080.png)
*The computational graph defined by the dot product in two dimensions*

Why are we talking about computational graphs in a *neural-networks-from-scratch* course? Surely you’ve already seen an illustration like the following.

[

![](https://substackcdn.com/image/fetch/$s_!QQEc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffb34a4d-d0d5-4461-b51f-1c4cc381961d_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!QQEc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffb34a4d-d0d5-4461-b51f-1c4cc381961d_1920x1080.png)
*A neural network*

Neural networks are just complex mathematical expressions, which, in turn, can be represented by computational graphs.

The nodes-and-edges structure has been present from the beginning: even the earliest pictorial representations of neural networks bore a striking resemblance to graphs. Mind you, we called them *perceptrons* back in the day. (We, as we, humans. I wasn’t alive back then, and probably neither were you.) Check out Fig. 1. from [the original perceptron paper by Frank Rosenblatt](https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf).

[

![](https://substackcdn.com/image/fetch/$s_!Ft-M!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5c736875-5dbd-4fc2-8a7f-d4cd97168d45_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!Ft-M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5c736875-5dbd-4fc2-8a7f-d4cd97168d45_1920x1080.png)
**Source: [The Perceptron by Frank Rosenblatt](https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf)**

The computational graph representation is not just a cute visualization tool; it allows for an efficient implementation of the gradient calculation via gradient descent. Spoiler alert: this is called *backpropagation*, which is one of the tools that enabled the training of enormous neural networks such as the later GPT models. We’ll talk about backpropagation in detail later, but for now, let’s get back on track.

We already know what a computational graph is. Now let’s implement one!

[Read more](https://thepalindrome.org/p/computational-graphs-in-python)