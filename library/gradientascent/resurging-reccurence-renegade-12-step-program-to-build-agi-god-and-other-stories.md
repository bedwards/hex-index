---
title: "Resurging Reccurence, renegade 12 step program to build AGI god and other stories "
author: "Various"
publication: "Gradient Ascent"
publication_slug: "gradientascent"
published_at: "2024-02-18T01:05:45.000Z"
source_url: "https://gradientascent.substack.com/p/resurging-reccurence-renegade-12"
word_count: 1463
estimated_read_time: 8
---

# Resurging Recurrence

There has been a resurgence of new recurrent neural network architectures. [S4](https://srush.github.io/annotated-s4/), [mamba](https://twitter.com/_albertgu/status/1731727672286294400), [RWKV](https://www.rwkv.com/) etc. They aim to fix the cons of older recurrent neural networks such as LSTM & GRU, over Transformers with self-attention while retaining their benefits.

To me, recurrence is something architectures require in some form because of the following reasons.

1.  If you want an AI system that can process long-range sequences, you need some form of memory to which you can write and read. RNNs provide us with this with their hidden state, which you can consider as an abstract form of memory. Vanilla transformers avoid the need for this by attending to all its inputs. The O(n\*\*2) complexity of transformers is not reasonable for extremely long-range sequence tasks.
    
2.  The second reason is more esoteric. If you think the way to build generally capable agents is to take inspiration from animals (including humans) as a template for intelligence, even in a black-box manner, we would want to avoid architectures that require you to store the raw inputs as memory. While humans can conceivably do something like self-attention on all the sensory inputs at a particular time, we for sure don’t store snapshots of raw sensory data over time and process it. This might seem like an artificial constraint for computers, but I intuit that this constraint along with constraints of embodiment are essential to interpret the sensory data into forms of intelligent behaviour. Maybe an infinite raw-sensory memory architecture in your cognitive architecture impairs you
    

Let’s revisit the pros/cons of old recurrent neural networks

-   **Pro**: During inference, the computational complexity of LSTMs and GRUs doesn’t depend on sequence length as all your past is compressed into the memory/hidden state representation
    
-   **Con**: LSTMs/GRUs unlike transformers be parallelized across sequences while training
    

The current variants want the best of both. The key thing that unifies all the new variants is the use of **linear recurrence.** If you have a linear relationship in computing the memory or hidden state, then you can at the very least cleverly parallelize the training across sequence length using something called an **[associative scan](https://jax.readthedocs.io/en/latest/_autosummary/jax.lax.associative_scan.html).** If you apply a mathematical operator which respects associativity on a sequence, it can be parallelized with an associative scan.  

  
There are lots of other differences, s4 (which preceded mamba) which is motivated by linear time-invariant state space models from control theory could be parallelized as a global convolution (you could also do an associative scan), mamba which is a time-variant state space model, can be parallelized with associative scan. It also requires other hardware tricks etc. And RWKV’s recurrence mechanism is also linear. Unless you’re in the business of architecture research, you can just take away that, these are parallelizable linear recurrences and sit it out while the simplest among them

There is an underexplored question of what these models lose by making recurrences linear. While they do have non-linearity across layers, not having recurrence across sequences might constrain the functions which a single layer can model. And does this constraint what these linear recurrences of n layers model over RNNs for all the sequence distributions we care about? There has been [good research into what computational structures RNNs can model](https://arxiv.org/abs/1805.04908), and recently with [RASP](https://arxiv.org/abs/2106.06981) same with transformers. More work has to be done with linear recurrences. But in the era of GPUs, just making computation parallel might allow you to stack more layers and get back what you lost. But maybe as we go to tasks for longer sequences we might have to take a closer look into the representation capacity of architecture given N layers.

For a detailed analysis of S4 and other linear RNNs have a look at these resources.

There’s also an ongoing bet between Sasha Rush and Jonathan Frankle on whether transformers will get phased out in another few years.

https://www.isattentionallyouneed.com/

If you want to research this notion of linear RNNs to its very limits, I highly recommend following [Francois Fleuret’s twitter fueled experiments into what he dubs as Dumb Recurrence/Barrel Reccurence/Catterpillar and whatever crazy idea he comes up with next in this thread.](https://x.com/francoisfleuret/status/1746108919372464546?s=20)

# A renegade 12-step program towards building AGI

While a 12-step program to anything sounds like a crackpot thing even (or especially?) when it’s coming from a top figure in a field. [Rich Sutton’s plan](https://arxiv.org/abs/2208.11173) is well laid, and the steps are worth solving even if they might not lead us to AGI god. Sutton essentially sees the learning systems of the world such as (you, I, and your friendly neighbourhood bacteria) in a black-box manner and tries to model it as faithfully as possible. And the plan is laid towards such a thing. For example, we are continually learning, we don’t come as pre-trained weights that don’t learn afterwards. So he sees continual learning without episodes as a key thing a learning agent should possess and something we have to solve. His first step is just that, make a supervised learning algorithm learn continually in changing data distributions. While this seems like something that should have been solved already, it’s not. Neural nets are reliant on their random weight initialization to learn effectively. If you learn a completely new task with trained weights, it’s not as effective. There’s some plasticity loss. This affects RL a lot as distributions you learn there are non-stationary, and recently SOTA algorithms resorted to [resetting weight](https://arxiv.org/abs/2205.07802)s.

There are other ideas in this interview which go along the same lines. For example, he says that replay buffer is a hack, animals don’t store sensory inputs as is and replay it, we might store some representations in our memory but not all the data (touching the recurrent drivel I wrote above). Largely the plan has actionable areas to work upon. Sutton finds generative AI a nice thing but has nothing to do with agential intelligence. Not sure if this also comes from the black box modelling perspective, ie humans probably don’t reconstruct all the pixels / sensory data values we see in our heads to training our systems. So, if you think mimicking biological black box is the path to agential AI then generative modeling perhaps is not it. This ties nicely with the next thing we see with V-JEPA and Yann LeCun’s JEPA towards building AGI god.

Sutton doesn’t care about introducing a pre-training task. He thinks we should push incorporating priors as much as possible to end allowing agents to acquire it or resorting to it after we figure out the AGI in a napkin pipeline, not start with a system that needs the entire internet dump to move around. This approach tries to get AGI in a napkin algorithm so that we can use it in any task we define, may it be as general as survival or something like building a Dyson sphere which we don’t know how to do. So if we start our research rather with human priors like LLM we might not solve problems in building intelligent agents that can scale to any problem. It might also hinder us sometimes, leading us to take shortcuts before solving problems and the shortcuts plateauing at one point

Another nugget is, that he thinks research in grid world/ toy tasks which aim to solve general problems is more important to agential AI than just exploiting scaled-up models available right now. [His famous bitter lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) wasn’t a call to work on scaled-up methods, it was just to work on methods that are general enough to scale with computing.

Anyways lot of good questions and answers mixed with long pauses and tangents. Overall nice interview. Shame that DeepMind abandoned their Alberta office, probably to fund their LLMs.

# V-JEPA

[

![Meta AI researchers unveil I-JEPA, a computer vision model that learns more  like humans do - SiliconANGLE](https://substackcdn.com/image/fetch/$s_!e3vV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffa5b9ee-6e9d-4cda-a466-8c7692d63191_3840x2160.jpeg "Meta AI researchers unveil I-JEPA, a computer vision model that learns more  like humans do - SiliconANGLE")



](https://substackcdn.com/image/fetch/$s_!e3vV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fffa5b9ee-6e9d-4cda-a466-8c7692d63191_3840x2160.jpeg)

Yann LeCun wasn’t simply making diagrams of his [JEPA plan to AGI](https://openreview.net/pdf?id=BZ5a1r-kVsf), simply to bore everyone from his pizza delivery man to people at Davos. Rather he is burning meta shareholder money to give us all free AGI.

[V-JEPA](https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/) is a video representation learning model that learns representations for videos in a masked-autoencoder fashion. This fits in Yann’s AGI plan of building robust world models. The current SoTA world model dreamerv3 has this big dousy of reconstructing all pixels objective to estimate latent. While not only wasting computing, it leads to brittle representations that break when you change lighting/background and other factors. Instead the masked prediction objective might be better.

There’s some neat overlap between Sutton and LeCun’s AGI plan, it’s not just the world models. It’s also in the fact that they don’t think generative AI objectives will help.

[https://twitter.com/ylecun/status/1758195635444908409](https://twitter.com/ylecun/status/1758195635444908409)

# Physics-inspired ML course

Steve Brunton had good content on [control theory (which more RL people should become aware of!).](https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m) Will be looking into this. Maybe using physics-inspired inductive biases are essential for world modelling?