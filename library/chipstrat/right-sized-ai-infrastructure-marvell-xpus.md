---
title: "Right-Sized AI Infrastructure. Marvell XPUs"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-10-07T22:37:21.000Z"
source_url: "https://www.chipstrat.com/p/right-sized-ai-infrastructure-marvell"
word_count: 2591
estimated_read_time: 13
---

Ready to study Marvell’s datacenter business?

Marvell tends to zoom in and talk about the components that power said AI datacenters, namely “XPUs and XPU attach”. And we’ll talk about those.

But first, let’s zoom out.

Marvell helps hyperscalers develop **custom AI datacenters.**

While “custom datacenters” might sound niche, pretty much all AI datacenters are custom. And of course, the AI datacenter TAM is insane.

*But I thought the vast majority of the market uses Nvidia GPUs with NVLink and Infiniband or Spectrum-X… so what do you mean by custom? Seems like mostly all Nvidia…*

Recall that AI clusters are made up of many components beyond just the compute (GPU/XPU). They also include networking (scale-up and scale-out), storage, and software. And yes, while many AI clusters share similar components, the resulting system configuration is often distinct.

[

![](https://substackcdn.com/image/fetch/$s_!73nT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4badcea4-0215-47fb-bf68-d83a37c12506_1786x618.png)



](https://substackcdn.com/image/fetch/$s_!73nT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4badcea4-0215-47fb-bf68-d83a37c12506_1786x618.png)
**With just a few legos you can create quite a diverse set of ducks! [Source](http://legoengineering.com/build-a-duck/index.html)**

And just like the image above, each hyperscaler needs to choose the right building blocks and tune the AI cluster to meet its specific needs. A lot of the tuning can be done in software, but some workloads place specific demands on the underlying hardware configurations.

And sometimes the existing Lego blocks don’t quite meet the hyperscalers specific needs. Which makes the case for designing the Lego blocks you need; i.e. working with a company like Marvell or Broadcom to make custom silicon for your datacenter.

But first, lets take a step back and look at the evolution of the merchant silicon offerings.

**From the earliest days, new Lego blocks started to emerge that let AI datacenter designers manage trade-offs and tune for specific workloads.**

## AI Datacenter Diversity

Early in the AI datacenter game, the compute option was largely standardized (e.g. Nvidia Ada/Hopper/Blackwell), and the scale-up network was too (NVLink). So it kind of felt like all roads led to Nvidia.

[

![](https://substackcdn.com/image/fetch/$s_!w4jw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67ea2f4c-9094-487a-b97b-d839401d4d31_1192x692.png)



](https://substackcdn.com/image/fetch/$s_!w4jw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67ea2f4c-9094-487a-b97b-d839401d4d31_1192x692.png)

But, for some time now, the scale-out infrastructure has been split between Infiniband and Ethernet, and increasingly so. ([More here](https://www.chipstrat.com/p/gpu-networking-basics-part-3-scale)).

[

![](https://substackcdn.com/image/fetch/$s_!oAtQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F191a90c7-f1af-45b4-a965-a27dcebf4fb0_1510x708.png)



](https://substackcdn.com/image/fetch/$s_!oAtQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F191a90c7-f1af-45b4-a965-a27dcebf4fb0_1510x708.png)

*You can start to see the increase in Lego blocks…*

### Scale Out Networking Diversity

Here’s an example [from Meta](https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/) to illustrate.

[

![](https://substackcdn.com/image/fetch/$s_!9DPA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F520219a0-87ce-4872-b35b-deaf80dcd4fa_1870x1326.png)



](https://substackcdn.com/image/fetch/$s_!9DPA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F520219a0-87ce-4872-b35b-deaf80dcd4fa_1870x1326.png)

**Meta basically A/B tested two AI training clusters.** Many components are the same, but the scale-out fabric was different; one with Ethernet and the other Infiniband.

BTW, Meta nicely described the *custom* nature of their infra tuned to meet Meta’s specific needs:

> At Meta, we handle hundreds of trillions of AI model executions per day. Delivering these services at a large scale requires a highly advanced and flexible infrastructure. **Custom designing much of our own hardware, software, and network fabrics** allows us to optimize the end-to-end experience for our AI researchers while ensuring our data centers operate efficiently.
> 
> **With this in mind, we built one cluster with a remote direct memory access (RDMA) over converged Ethernet (RoCE) network fabric** solution based on the Arista 7800 with Wedge400 and Minipack2 OCP rack switches. **The other cluster features an NVIDIA Quantum2 InfiniBand fabric**. Both of these solutions interconnect 400 Gbps endpoints.

Ok, interesting, we’re starting to see a bit of diversity in this Meta example, something like:

[

![](https://substackcdn.com/image/fetch/$s_!3k7B!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12f278b9-7c90-4ab2-9163-303d88917e59_1790x942.png)



](https://substackcdn.com/image/fetch/$s_!3k7B!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12f278b9-7c90-4ab2-9163-303d88917e59_1790x942.png)
*More lego blocks and vendors to choose from to build the system*

But why would Meta A/B test this scale out fabric?

> **With these two \[fabrics\], we are able to assess the suitability and scalability of these different types of interconnect for large-scale training, giving us more insights that will help inform how we design and build even larger, scaled-up clusters in the future.** Through careful co-design of the network, software, and model architectures, we have successfully used both RoCE and InfiniBand clusters for large, GenAI workloads (including our ongoing training of Llama 3 on our RoCE cluster) without any network bottlenecks.

Meta is politely saying that compute performance and network performance are always top priorities (especially for the massively communication heavy AI training jobs) **but cost and supply chain diversification matter too.**

I know, it’s easy (especially for engineers) to treat performance as the ultimate goal, whether that means maximizing tokens per dollar or optimizing tokens per watt within a fixed power envelope.

But you have to think like the GM of the business; your job is to also manage risk and costs.

This is a boon for vendors; can they unbundle a component of the stack and manage to jump into the final configuration?

### Scale Out Diversity

We can already see this diversification in Ethernet-based scale-out components, with players like Broadcom, Marvell, Credo, Arista, Cisco, Juniper/HPE, Astera Labs, Alphawave Semi, and Ayar Labs all competing for sockets and fabrics.

[

![](https://substackcdn.com/image/fetch/$s_!RVhP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23deb456-8a71-4e43-bdb9-3893e7dbf99c_2014x1118.png)



](https://substackcdn.com/image/fetch/$s_!RVhP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23deb456-8a71-4e43-bdb9-3893e7dbf99c_2014x1118.png)
**The design space is exploding, and this list is far from exhaustive.**

Nvidia, of course, has brilliantly countered this with a fairly new and insanely profitable rocketship Ethernet scale-out business called Spectrum-X ([more here](https://www.chipstrat.com/p/gpu-networking-basics-part-3-scale)).

Interestingly, this expansion means the number of configuration knobs inside even an all-Nvidia datacenter is increasing.

*Remember, of Nvidia’s 7 families of chips, 5 are networking!*

[

![](https://substackcdn.com/image/fetch/$s_!fNZ8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9431392-270d-4d55-8341-be4e98ec17db_1456x324.png)



](https://substackcdn.com/image/fetch/$s_!fNZ8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb9431392-270d-4d55-8341-be4e98ec17db_1456x324.png)

So even with standardized compute, the diversity of networking options (and we haven’t even talked co-packaged optics) is driving an accelerating combinatorial explosion in AI datacenter design options.

### Scale Up Diversity

This diversity in vendors is happening with each component in the system, not just scale-out.

We’re seeing new **scale-up** protocols emerge with [UALink](https://ualinkconsortium.org/) and Broadcom’s [SUE](https://docs.broadcom.com/doc/scale-up-ethernet-framework) (Scale Up Ethernet).

Next year AMD’s 400-series Instinct offerings are marketed on the BYOV (Bring Your Own Vendor) value proposition:

[

![](https://substackcdn.com/image/fetch/$s_!x8Tf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7d7b7e98-4d30-4b38-9f87-6c5be8d2b828_1386x678.png)



](https://substackcdn.com/image/fetch/$s_!x8Tf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7d7b7e98-4d30-4b38-9f87-6c5be8d2b828_1386x678.png)
*Source: AMD*

And lots of companies understand scale-up TAM and are clamoring for attention.

Suddenly, there are all sorts of options to choose from:

[

![](https://substackcdn.com/image/fetch/$s_!USFm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F98df4826-bef1-46c6-9b26-f6a0af4ce831_1872x1156.png)



](https://substackcdn.com/image/fetch/$s_!USFm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F98df4826-bef1-46c6-9b26-f6a0af4ce831_1872x1156.png)
**Again, not comprehensive.**

Whew. And that’s just the networking players.

### Compute Diversity

Compute options are becoming more diverse too, and not just from new competitors entering the market, but from **each vendor’s expanding product stack.**

We started with Nvidia’s Ada and Hopper clusters, and now have Blackwell in multiple variants: B100, B200, GB200 NVL72, GB200 NVL36, B300, RTX Pro 6000, and others.

[

![](https://substackcdn.com/image/fetch/$s_!s0oH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf8cc9cc-62d3-4b29-a919-0194aad092b9_1094x1048.png)



](https://substackcdn.com/image/fetch/$s_!s0oH!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf8cc9cc-62d3-4b29-a919-0194aad092b9_1094x1048.png)
*Just a taste of the Nvidia options*

AMD’s Instinct lineup has also grown, spanning the MI300X, 325X, 350X, 355X, and forthcoming 450 that [OpenAI will deploy](https://ir.amd.com/news-events/press-releases/detail/1260/amd-and-openai-announce-strategic-partnership-to-deploy-6-gigawatts-of-amd-gpus).

[

![](https://substackcdn.com/image/fetch/$s_!hIDL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04d82778-afb7-4b84-a811-f9ac6249ed2f_2048x1209.png)



](https://substackcdn.com/image/fetch/$s_!hIDL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04d82778-afb7-4b84-a811-f9ac6249ed2f_2048x1209.png)

And of course many generations of custom AI accelerators (TPU v7, Trainium3, MTIA 2), and even a small amount of startup accelerators in the mix.

[

![](https://substackcdn.com/image/fetch/$s_!6yQC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ad93ce3-7427-4078-b69e-f81b5581c2d5_2048x776.png)



](https://substackcdn.com/image/fetch/$s_!6yQC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ad93ce3-7427-4078-b69e-f81b5581c2d5_2048x776.png)

Now this is just focusing on the accelerator compute, but of course the companion CPU matters too.

[

![](https://substackcdn.com/image/fetch/$s_!EGVw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa9f243c-b741-41fc-bfee-e0fdd0c5b009_2048x610.png)



](https://substackcdn.com/image/fetch/$s_!EGVw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa9f243c-b741-41fc-bfee-e0fdd0c5b009_2048x610.png)

So many Lego blocks to choose from!

[

![](https://substackcdn.com/image/fetch/$s_!b10l!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c91f543-111b-4ce9-91f0-3c4d66ec86b1_1024x1024.png)



](https://substackcdn.com/image/fetch/$s_!b10l!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0c91f543-111b-4ce9-91f0-3c4d66ec86b1_1024x1024.png)
**The permutations are endless! Source: my creative GPT sidekick**

### Memory and Storage Diversity

Note that these AI accelerators have varying ratios of HBM capacity and bandwidth to compute; this diversity is good for the diversity in AI model sizes.

Remember when the MI300X was released and featured HBM capacity leadership, which was a great fit for specific models?

[

![](https://substackcdn.com/image/fetch/$s_!-DJ9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47f23574-a1cd-4188-b0a4-1caad7deebb3_1424x844.png)



](https://substackcdn.com/image/fetch/$s_!-DJ9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47f23574-a1cd-4188-b0a4-1caad7deebb3_1424x844.png)
*[Source](https://www.nextplatform.com/2024/07/29/stacking-up-amd-versus-nvidia-for-llama-3-1-gpu-inference/)*

This was a great example of the benefits of choosing your compute/HBM ratios carefully to cost and performance optimize your workload.

And oh by the way… HBM will soon have **customizable base dies**!

[

![](https://substackcdn.com/image/fetch/$s_!85xC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9d61145-1ebd-4bc7-a1f3-6e7c93824635_622x401.jpeg)



](https://substackcdn.com/image/fetch/$s_!85xC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc9d61145-1ebd-4bc7-a1f3-6e7c93824635_622x401.jpeg)

From Micron’s recent earnings call,

[

![](https://substackcdn.com/image/fetch/$s_!zVZ_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F79904ed9-edd6-458e-92b5-2fb8b5b56146_1756x1498.png)



](https://substackcdn.com/image/fetch/$s_!zVZ_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F79904ed9-edd6-458e-92b5-2fb8b5b56146_1756x1498.png)

Custom HBM base dies… **yet another degree of freedom for designers.**

Now, granted, HBM is an interesting one because it’s tied to the accelerator right now; if you want a certain HBM to FLOPs ratio, you can only choose from whatever ratio merchant silicon vendors offer.

Or you could make your own AI accelerator with someone like Broadcom or Marvell so that you could tune the HBM to FLOPs ratio precisely… (we’ll talk more on this later).

By the way, this hints at the need for architectural innovation that can decouple HBM from the accelerator die. What if you could disaggregate HBM from the compute so that chip makers could easily scale that HBM die to meet their particular workload needs?

By the way, everyone is coming around to the realization that AI is exponentially increasing the amount of content created.

[

![](https://substackcdn.com/image/fetch/$s_!JUZQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3fe7cae-84da-4e92-be4b-deb4d1e9e4b3_1199x496.png)



](https://substackcdn.com/image/fetch/$s_!JUZQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3fe7cae-84da-4e92-be4b-deb4d1e9e4b3_1199x496.png)
*[Source](https://x.com/rwang07/status/1973390973771325687)*

This obviously implies AI datacenters need to think through the storage needs of their workloads and plan infra accordingly.

Micron summarizes it nicely. AI is a huge driver up and down the memory hierarchy.

[

![](https://substackcdn.com/image/fetch/$s_!hNfh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb6fd614-d352-4dda-bb27-6081260542a4_2048x1091.png)



](https://substackcdn.com/image/fetch/$s_!hNfh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feb6fd614-d352-4dda-bb27-6081260542a4_2048x1091.png)

Alright, so we’ve established that the main building blocks each now come with a growing set of vendors and product choices.

So with all those combinations on the table, how do hyperscalers actually decide what to build?

## Workload Diversity

Which components are truly necessary? That depends entirely on the workload and its specific user experience requirements.

Where do your needs fall on this radar chart?

[

![](https://substackcdn.com/image/fetch/$s_!Hl9K!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a2b2269-29bd-4217-b828-2c673727e2c0_1416x1230.png)



](https://substackcdn.com/image/fetch/$s_!Hl9K!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a2b2269-29bd-4217-b828-2c673727e2c0_1416x1230.png)
**This is just a pedagogical example—but it helps illustrate the tradeoffs.**

Do you need super fast time-to-first-token, e.g. an audio use case? After all, dead air feels like the AI is broken (“did it hear me?”). Thus the “shape” of the requirements for an voice-to-voice workload might look like this:

[

![](https://substackcdn.com/image/fetch/$s_!Foi3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d82b660-7d6a-452b-aa98-6cd3ff42218b_1626x1364.png)



](https://substackcdn.com/image/fetch/$s_!Foi3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4d82b660-7d6a-452b-aa98-6cd3ff42218b_1626x1364.png)
**Just an illustration, take it with a grain of salt**

For instance, a voice-to-voice AI workload needs a very fast time-to-first-token (TTFT); dead air makes users think it’s broken (“did it hear me?”). But it doesn’t need ultra-low end-to-end latency, since it only needs to respond at a natural speaking pace. Nor does it require the most sophisticated model.

But other workloads might need super-duper low end-to-end latency, like if you’re Google and rewriting ad copy on the fly:

That needs to be FAST but the LLM can be pretty simple.

[

![](https://substackcdn.com/image/fetch/$s_!_S0W!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff377779-1eca-4d77-ae09-122f7669b977_1550x1342.png)



](https://substackcdn.com/image/fetch/$s_!_S0W!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff377779-1eca-4d77-ae09-122f7669b977_1550x1342.png)
**Example shape of the ad-tech LLM use case**

Hmmm, that looks familiar! The shape of these two workloads are fairly similar!

[

![](https://substackcdn.com/image/fetch/$s_!M8bn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9214cbc1-55cd-4683-b7c9-24efe0d4fb55_1288x1120.png)



](https://substackcdn.com/image/fetch/$s_!M8bn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9214cbc1-55cd-4683-b7c9-24efe0d4fb55_1288x1120.png)

Guess what? **The underlying AI datacenter system infrastructure requirements end up looking similar too!**

[

![](https://substackcdn.com/image/fetch/$s_!b0k7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9401bc07-51de-477f-8c9f-fd3b75a63518_1294x1104.png)



](https://substackcdn.com/image/fetch/$s_!b0k7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9401bc07-51de-477f-8c9f-fd3b75a63518_1294x1104.png)

Both use cases work well with small to medium-sized models, so they don’t need huge HBM capacity. Inference traffic is modest since these compact, probably dense models don’t communicate much across nodes. Compute demand isn’t extreme eithe. The key requirement is high memory bandwidth to minimize time-to-first-token.

**On the other hand, there are workloads with vastly different user requirements and translate into vastly different infrastructure requirements.**

Consider a reasoning model powering an agent like OpenAI’s Deep Research. It requires massive context windows and the most capable model available, but ultra-fast response time isn’t necessary.

[

![](https://substackcdn.com/image/fetch/$s_!eoK5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F80f49560-1cc5-4b1b-898b-a7641e83d5f7_1384x1150.png)



](https://substackcdn.com/image/fetch/$s_!eoK5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F80f49560-1cc5-4b1b-898b-a7641e83d5f7_1384x1150.png)

And as you might guess, this puts a very different demand on the system:

[

![](https://substackcdn.com/image/fetch/$s_!If6N!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc68b5c2-97fa-472d-ba74-a836c631d29e_1446x1112.png)



](https://substackcdn.com/image/fetch/$s_!If6N!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc68b5c2-97fa-472d-ba74-a836c631d29e_1446x1112.png)

**The shape of this infra is very different than the earlier workloads!**

And what about video generation with Sora 2? That’s all the rage right now.

Text-to-video diffusion models are extremely compute-intensive and demand state-of-the-art models. But like Deep Research, users expect a short wait while the video is generated. It’s a reasonable tradeoff for quality.

[

![](https://substackcdn.com/image/fetch/$s_!Khq8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf786c71-2089-4d5d-9a15-80ff5c7b2aa2_1394x1136.png)



](https://substackcdn.com/image/fetch/$s_!Khq8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf786c71-2089-4d5d-9a15-80ff5c7b2aa2_1394x1136.png)

And hey, the shape of these workloads look very similar!

[

![](https://substackcdn.com/image/fetch/$s_!L2dN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07017f8c-3094-4391-a0f4-52ca08cd4d8c_1444x1158.png)



](https://substackcdn.com/image/fetch/$s_!L2dN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07017f8c-3094-4391-a0f4-52ca08cd4d8c_1444x1158.png)

As you’d expect, the system demands and similarly shaped too.

[

![](https://substackcdn.com/image/fetch/$s_!eLBh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93ef0e64-464d-4d1e-8f1d-3ad85dc255fc_1374x1126.png)



](https://substackcdn.com/image/fetch/$s_!eLBh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F93ef0e64-464d-4d1e-8f1d-3ad85dc255fc_1374x1126.png)

So here’s some important takeaways.

**First, GPUs are a great place for all of these workloads to land, because they are flexible enough to support all of these workloads.**

BUT! Notice how there are sort of two families of workloads here, and they result in different infra demands:

[

![](https://substackcdn.com/image/fetch/$s_!PYHe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ed7ba01-2328-40c3-8203-92b578cc3022_1384x1732.png)



](https://substackcdn.com/image/fetch/$s_!PYHe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ed7ba01-2328-40c3-8203-92b578cc3022_1384x1732.png)

So yes, GPUs can definitely run all of these workloads, especially state-of-the-art (SOTA) GPUs.

**But might it make sense to have two inference clusters here?**

1.  A cost-optimized cluster for fast, lightweight workloads
    
2.  A SOTA cluster for deep reasoning and generative video
    

For instance, lighter jobs could run on already depreciated Hopper systems, while heavier ones move to Blackwell.

Now imagine you’re a hyperscaler serving billions of inferences a day. **Wouldn’t it make sense to tune your datacenter architecture to the exact workload mix you face?**

After all, even as models evolve, their infrastructure “shape” might stay similar.

### AI Infra Diversity

If you’re on the AI infrastructure planning team, you’re dealing with an expanding mix of workloads and you need to assemble platforms from all the usual components we discussed: GPU, CPU, memory, networking (scale-up and scale-out), and more.

You’ve got options to choose from to build a “right size” cluster.

The simplest and often best path is a mostly turnkey system from a single merchant silicon provider, like Nvidia:

[

![](https://substackcdn.com/image/fetch/$s_!ASCC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F87ab4b8a-79a9-4e97-a5d5-22d818388eb2_1126x510.png)



](https://substackcdn.com/image/fetch/$s_!ASCC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F87ab4b8a-79a9-4e97-a5d5-22d818388eb2_1126x510.png)
**Why did I make that header so large? I dont know. I also thought it said turkey for a split second.**

Or you can mix vendors. For example, pairing a rack-scale Nvidia platform with tightly integrated Intel CPUs, as in their recent partnership announcement.

[

![](https://substackcdn.com/image/fetch/$s_!8lWA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc424a5d8-7357-4cf0-822f-654e58714a30_910x568.png)



](https://substackcdn.com/image/fetch/$s_!8lWA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc424a5d8-7357-4cf0-822f-654e58714a30_910x568.png)

But if you want to really customize the compute hardware to meet your needs you can work with a custom silicon vendor. Google has long done this with Broadcom for the TPU or Marvell with AWS Trainium.

So there are many options for AI infra designers. There’s a spectrum of combinations, with increasing vendor diversity.

[

![](https://substackcdn.com/image/fetch/$s_!CPMf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9cd44ec-61d7-42fc-9948-d1571557cd33_2048x495.png)



](https://substackcdn.com/image/fetch/$s_!CPMf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe9cd44ec-61d7-42fc-9948-d1571557cd33_2048x495.png)

And they all have their pros and cons across the multi-variate optimization problem: cost, supply chain diversity, speed to market, fit for the workload, and so on.

[

![](https://substackcdn.com/image/fetch/$s_!Z51U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb0cff5e-1605-4044-bcc6-08716954618f_1024x768.png)



](https://substackcdn.com/image/fetch/$s_!Z51U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb0cff5e-1605-4044-bcc6-08716954618f_1024x768.png)
**Not AI! [Source](http://legoengineering.com/build-a-duck/index.html).**

### Optimizing the Infra

But won’t everyone just want the absolute best performance? Does anything else actually matter?

Well… of course performance is king… but as we saw earlier, some Cadillac systems could be overkill for the workloads when a Honda would do.

*Overkill?*

Something that’s often overlooked is “good enough” performance. Some workloads don’t need crazy low latency. Others don’t need crazy long context length.

Let me illustrate.

Imagine you’ve got a specific use case and you’ve defined a “good enough” performance in terms of tokens/sec; like maybe so long as performance is generally above 100 tokens/sec you’re happy.

[

![](https://substackcdn.com/image/fetch/$s_!yFck!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3511e4b5-ab4f-43da-bbe0-d25f32834927_1788x1196.png)



](https://substackcdn.com/image/fetch/$s_!yFck!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3511e4b5-ab4f-43da-bbe0-d25f32834927_1788x1196.png)

Now let’s say you take a look at the absolute best AI datacenter on the market, with all the top-shelf components. It might be expensive, but it can scale to crazy performance — 1000s of tokens/sec.

[

![](https://substackcdn.com/image/fetch/$s_!GROQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb5d5869-61fb-426a-9ad5-108d0b6706dc_1574x1072.png)



](https://substackcdn.com/image/fetch/$s_!GROQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcb5d5869-61fb-426a-9ad5-108d0b6706dc_1574x1072.png)

Now imagine you look at a different system configuration. Maybe not all top-tier components. Maybe it’s simply the previous generation of compute. Or it’s a lower cost compute option. Or maybe it’s still a computational beast but your workload isn’t super memory intensive so it uses cost-efficient GDDR instead of expensive HBM.

Note that this second config is cheaper, but can’t reach the same performance levels.

[

![](https://substackcdn.com/image/fetch/$s_!7S7L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6197415f-1776-47b6-a420-f4c7568d727a_1812x1232.png)



](https://substackcdn.com/image/fetch/$s_!7S7L!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6197415f-1776-47b6-a420-f4c7568d727a_1812x1232.png)

In this scenario, the second configuration can hit “acceptable performance” at a lower cost than the first configuration. In which case, this “less performant” AI cluster is *just fine* for your workload’s needs, as it can unlock “good enough” performance at a lower cost:

[

![](https://substackcdn.com/image/fetch/$s_!rbmP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03ab82f9-b624-43da-916a-566f8a0fb4a5_1674x1112.png)



](https://substackcdn.com/image/fetch/$s_!rbmP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03ab82f9-b624-43da-916a-566f8a0fb4a5_1674x1112.png)

Now, note that this is an narrowly scoped example. In reality companies are balancing many different KPIs as we saw earlier – time-to-first token, throughput, tokens per Watt, etc. And a particular cluster might not run just a single workload, but a family of similarly shaped workloads.

That said, *directionally*, this is an example of hyperscalers tuning the system configuration to meet their specific needs.

And case in point is Nvidia’s [Rubin CPX](https://nvidianews.nvidia.com/news/nvidia-unveils-rubin-cpx-a-new-class-of-gpu-designed-for-massive-context-inference), which uses cheaper memory and cheaper packaging but fits the shape of the “prefill” portion of LLM inference quite nicely.

Sure, companies can run both prefill (compute-constrained workload) and decode (memory-constrained) on a single high-end Rubin platform…. Or they can orchestrate the workloads to run on “right size” hardware; run the prefill workload on a Rubin CPX with “good enough” memory performance using cheaper GDDR7, and save Rubin and it’s expensive HBM for the memory constrained decode workload which has a much higher requirement for “good enough” memory bandwidth.

So this shows even a single workload can be broken down into constituents that have a different shape, and each can be orchestrated to hardware that fits the shape.

[

![](https://substackcdn.com/image/fetch/$s_!YfzE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda87d94f-355d-4ba5-99f6-9c1e2673f704_507x500.jpeg)



](https://substackcdn.com/image/fetch/$s_!YfzE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda87d94f-355d-4ba5-99f6-9c1e2673f704_507x500.jpeg)

I hear you. It’s time.

# Marvell

OK. We’ve set the stage for the fact that

1.  Different AI workloads impose distinct infrastructure demands.
    
2.  AI datacenters are becoming more diverse in both configuration and vendor mix.
    

Given these, there’s now a full spectrum of datacenter designs to meet these diverse needs, from flexible turnkey merchant systems to deeply customized clusters tuned for specific workloads.

Broadcom and Marvell are the two big players helping hyperscalers design and build custom AI clusters with custom silicon tuned very specifically to the hyperscalers’ particular needs.

**Curious what’s behind Marvell’s custom AI silicon story?**

Behind the paywall we’ll discuss what it actually means when they talk about “XPUs” and “XPU attach”. We dissect AWS Trainium2 as an example, showing which blocks are the XPU and which are the attach.

Then we look at the business model behind those sockets, who Marvell’s customers are, why the pipeline’s accelerating, and how its full-service IP stack (SerDes, SRAM, HBM, packaging) gives it an edge over design-service shops like Alchip and GUC.

[Read more](https://www.chipstrat.com/p/right-sized-ai-infrastructure-marvell)