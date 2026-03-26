---
title: "New paper: AI agents that matter"
author: "Arvind Narayanan"
publication: "AI Snake Oil"
publication_slug: "aisnakeoil"
published_at: "2024-07-03T16:00:56.000Z"
source_url: "https://www.normaltech.ai/p/new-paper-ai-agents-that-matter"
word_count: 1433
estimated_read_time: 8
---

Some of the most exciting applications of large language models involve taking real-world action, such as booking flight tickets or finding and fixing software bugs. AI systems that carry out such tasks are called agents. They use LLMs in combination with other software to use tools such as web search and code terminals.

The North Star of this field is to build assistants like Siri or Alexa and get them to actually work — handle complex tasks, accurately interpret users’ requests, and perform reliably. But this is far from a reality, and even the research direction is fairly new. To stimulate the development of agents and measure their effectiveness, researchers have created benchmark datasets. But as we’ve said before, [LLM evaluation is a minefield](https://www.cs.princeton.edu/~arvindn/talks/evaluating_llms_minefield/), and it turns out that agent evaluation has a bunch of additional pitfalls that affect today’s benchmarks and evaluation practices. This state of affairs encourages the development of agents that do well on benchmarks without being useful in practice.

We have released a new paper that identifies the challenges in evaluating agents and proposes ways to address them. **Read the paper [here](https://arxiv.org/abs/2407.01502).** The authors are Sayash Kapoor, [Benedikt Ströbl](https://citp.princeton.edu/citp-people/benedikt-strobl/), [Zachary S. Siegel](https://www.zacharysiegel.org/), [Nitya Nadgir](https://citp.princeton.edu/citp-people/nitya-nadgir/), and Arvind Narayanan, all at Princeton University. 

In this post, we offer thoughts on the definition of AI agents, why we are cautiously optimistic about the future of AI agent research, whether AI agents are more hype or substance, and give a brief overview of the paper.

#### **What does the term agent mean? Is it just a buzzword?**

The term agent has been used by AI researchers without a formal definition.[1](#footnote-1) This has led to its being hijacked as a marketing term, and has generated a bit of pushback against its use. But the term isn’t meaningless. Many researchers have tried to formalize the community's intuitive understanding of what constitutes an agent in the context of language-model-based systems \[[1](https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf), [2](https://dl.acm.org/doi/10.1145/3593013.3594033), [3](https://arxiv.org/abs/2404.16244), [4](https://lilianweng.github.io/posts/2023-06-23-agent/), [5](https://blog.langchain.dev/what-is-an-agent/)\]. Rather than a binary, it can be seen as a spectrum, sometimes denoted by the term ['agentic'](https://www.deeplearning.ai/the-batch/welcoming-diverse-approaches-keeps-machine-learning-strong/). 

The five recent definitions of AI agents cited above are all distinct but with strong similarities to each other. Rather than propose a new definition, we identified three clusters of properties that cause an AI system to be considered more agentic according to existing definitions:

**Environment and goals.** The more complex the environment, the more AI systems operating in that environment are agentic. Complex environments are those that have a range of tasks and domains, multiple stakeholders, a long time horizon to take action, and unexpected changes. Further, systems that pursue complex goals without being instructed on how to pursue the goal are more agentic.

**User interface and supervision.** AI systems that can be instructed in natural language and act autonomously on the user's behalf are more agentic. In particular, systems that require less user supervision are more agentic. For example, chatbots cannot take real-world action, but adding plugins to chatbots (such as Zapier for ChatGPT) allows them to take some actions on behalf of users.

**System design.** Systems that use tools (like web search or code terminal) or planning (like reflecting on previous outputs or decomposing goals into subgoals) are more agentic. Systems whose control flow is driven by an LLM, rather than LLMs being invoked by a static program, are more agentic.

#### **Do agents even work?**

While some agents such as ChatGPT’s code interpreter / data analysis mode have been useful, more ambitious agent-based products so far have failed. The two main product launches based on AI agents have been the [Rabbit R1](https://www.rabbit.tech/) and [Humane AI pin](https://humane.com/). These devices promised to eliminate or reduce phone dependence, but turned out to be too slow and unreliable. Devin, an “AI software engineer”, was announced with great hype 4 months ago, but has been panned in a [video review](https://www.youtube.com/watch?v=tNmgmwEtoWE) and remains in waitlist-only mode. It is clear that if AI agents are to be useful in real-world products, they have a long way to go.

[

![](https://substackcdn.com/image/fetch/$s_!pOKK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F483f2069-4a32-41ad-8bb4-94b2fb7793fc_1310x664.png)



](https://substackcdn.com/image/fetch/$s_!pOKK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F483f2069-4a32-41ad-8bb4-94b2fb7793fc_1310x664.png)
*[Source](https://x.com/SnazzyLabs/status/1783220942812111220)*

So are AI agents all hype? It’s too early to tell. We think there are research challenges to be solved before we can expect agents such as the ones above to work well enough to be widely adopted. The only way to find out is through more research, so we do think research on AI agents is worthwhile.

One major research challenge is reliability — LLMs are [already capable enough](https://x.com/random_walker/status/1778770599340290103) to do many tasks that people want an assistant to handle, but not reliable enough that they can be successful products. To appreciate why, think of a flight-booking agent that needs to make dozens of calls to LLMs. If each of those went wrong independently with a probability of, say, just 2%, the overall system would be so unreliable as to be completely useless (this partly explains some of the product failures we’ve seen). So research on improving reliability might have many new applications *even if* the underlying language models don’t improve. And if [scaling runs out](https://www.aisnakeoil.com/p/ai-scaling-myths), agents are the most natural direction for further progress in AI.

Right now, however, research is itself contributing to hype and overoptimism because evaluation practices are not rigorous enough, much like the early days of machine learning research before the common task method took hold. That brings us to our paper.

#### **Contributions of the paper**

What changes must the AI community implement to help stimulate the development of AI agents that are useful in the real world, and not just on benchmarks? This is the paper’s central question. We make five recommendations:

1. **Implement cost-controlled evaluations.** The language models underlying most AI agents are stochastic. This means simply calling the underlying model multiple times can increase accuracy. We show that such simple tricks can outperform complex agent architectures on the HumanEval benchmark, while costing much less. We argue that all agent evaluation must control for cost. (We originally published this finding [here](https://www.aisnakeoil.com/p/ai-leaderboards-are-no-longer-useful). In the two months since we published this post, Pareto curves and joint optimization of cost and accuracy have become [increasingly common](https://x.com/lmsysorg/status/1807812671238258931) in [agent](https://www.together.ai/blog/together-moa) [evaluations](https://x.com/corbtt/status/1803813970018791845).)

2\. **Jointly optimize accuracy and cost.** Visualizing evaluation results as a Pareto curve of accuracy and inference cost opens up a new space of agent design: jointly optimizing the two metrics. We show how we can lower cost while maintaining accuracy on HotPotQA by implementing a modification to the DSPy framework.

3\. **Distinguish model and downstream benchmarking.** Through a case study of NovelQA, we show how benchmarks meant for model evaluation can be misleading when used for downstream evaluation. We argue that downstream evaluation should account for dollar costs, rather than proxies for cost such as the number of model parameters.

4\. **Prevent shortcuts in agent benchmarks.** We show that many types of overfitting to agent benchmarks are possible. We identify 4 levels of generality of agents and argue that different types of hold-out samples are needed based on the desired level of generality. Without proper hold-outs, agent developers can take shortcuts, even unintentionally. We illustrate this with a case study of the WebArena benchmark.

5\. **Improve the standardization and reproducibility of agent benchmarks.** We found pervasive shortcomings in the reproducibility of WebArena and HumanEval evaluations. These errors inflate accuracy estimates and lead to overoptimism about agent capabilities.

#### **Concluding thoughts: reasons for cautious optimism**

AI agent benchmarking is new and best practices haven't yet been established, making it hard to distinguish genuine advances from hype. We think agents are sufficiently different from models that benchmarking practices need to be rethought. In our paper, we take the first steps toward a principled approach to agent benchmarking. We hope these steps will raise the rigor of AI agent evaluation and provide a firm foundation for progress.

A different strand of our research concerns the reproducibility crisis in ML-based research in [scientific fields](https://www.aisnakeoil.com/p/scientists-should-use-ai-as-a-tool) such as medicine or social science. At some level, our current paper is similar. In ML-based science, our outlook is that things will get worse before they get better. But in AI agents research, we are cautiously optimistic that practices will change quickly. One reason is that there is a stronger culture of sharing code and data alongside published papers, so errors are easier to spot. (This culture shift came about due to concerted efforts in the [last five years](https://jmlr.org/papers/v22/20-303.html).) Another reason is that overoptimistic research quickly gets a reality check when products based on misleading evaluations end up flopping. This is going to be an interesting space to watch over the next few years, both in terms of research and product releases.

[1](#footnote-anchor-1)

In traditional AI, agents are defined entities that perceive and act upon their environment, but that definition is less useful in the LLM era — even a thermostat would qualify as an agent under that definition.