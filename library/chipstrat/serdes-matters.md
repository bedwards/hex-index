---
title: "SerDes Matters!"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-10-22T16:41:49.000Z"
source_url: "https://www.chipstrat.com/p/serdes-matters"
word_count: 1231
estimated_read_time: 7
---

We [recently discussed](https://www.chipstrat.com/p/right-sized-ai-infrastructure-marvell) that it makes sense to right-size an AI cluster to fit a particular family of workloads. Specifically, the user requirements of workloads can result in similarly shaped infrastructure requirements:

[

![](https://substackcdn.com/image/fetch/$s_!z6AE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5249ec5b-19eb-43d1-a44c-fb54df07e46b_1784x1640.png)



](https://substackcdn.com/image/fetch/$s_!z6AE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5249ec5b-19eb-43d1-a44c-fb54df07e46b_1784x1640.png)
*The left represents a family of fast, interactive workloads that could run with small/medium models and could run on “good enough” hardware, which could be old Nvidia chips or cost-optimized offerings from others. The right represents workloads like video models or deep research that demand state-of-the-art computational workhorses with a ton of fast memory.*

We already see this “right-sizing” of AI infra with disaggregating LLM inference across different Nvidia hardware; prefill on [Rubin CPX](https://nvidianews.nvidia.com/news/nvidia-unveils-rubin-cpx-a-new-class-of-gpu-designed-for-massive-context-inference) and decode on traditional Rubin.

This line of thinking can lead to XPUs; if a particular hyperscaler is quite convinced they’ll need to run a particular type of workload at scale indefinitely, why not trade-off some of the flexibility of GPUs for a more finely tuned AI accelerator?

**For example, won’t OpenAI continue to run fast-thinking (GPT-4o style) LLMs indefinitely?**

For workloads that might continue to evolve significantly, stick with GPU-based clusters. But for stable workloads at the massive scale of hyperscalers, a custom AI cluster with XPUs can make sense. *It’s been three years since ChatGPT launched already…*

But customizing the datacenter to a particular workloads is more than just picking a particular already-baked chip. Just like Nvidia systems are GPUs + networking + software (+ memory, + CPUs, + storage), XPU-based systems also include networking, memory, and more. Marvell calls these additional components **[XPU attach](https://www.chipstrat.com/i/175545231/xpu-attach)**.

[

![](https://substackcdn.com/image/fetch/$s_!L6jX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f3ff8cd-298c-4a81-b089-7c91a54fd00a_2048x1128.png)



](https://substackcdn.com/image/fetch/$s_!L6jX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9f3ff8cd-298c-4a81-b089-7c91a54fd00a_2048x1128.png)

And with a custom accelerator partner you can **turn all sorts of knobs deep within the XPU and XPU attach** to tune the resulting AI datacenter to meet your workload’s needs.

> Marvell’s Sandeep Bharathi: Now, Matt talked about XPU and XPU attach. What is important to see in an XPU attach, there may be certain IPs that are not necessary, for example, CPU. But what it means that **for each of these, the power and performance per watt requirements are different, which means you need to optimize different SerDes or different Die-to-Dies (D2Ds) for each one of these to meet the needs of the workloads**.
> 
> So customization to achieve the highest performance per watt is a Marvell specialty.

So IP building blocks like SerDes or D2D can be optimized to help the system get the needed system-level performance per Watt.

**But….. what the heck is SerDes? Why is it important?**

[

![](https://substackcdn.com/image/fetch/$s_!panm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c794ecd-16a3-409a-bc7b-bd5ffbf13004_2046x1168.png)



](https://substackcdn.com/image/fetch/$s_!panm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c794ecd-16a3-409a-bc7b-bd5ffbf13004_2046x1168.png)

So let’s spend today working through related questions.

-   what is SerDes?
    
-   why is it so important for XPUs?
    
-   what trade-offs can be made within SerDes to optimize for a workload?
    
-   Why is SerDes design hard?
    
-   Which companies have SerDes chops?
    

## What Is SerDes?

Let’s start by zooming way out. If we look at that Marvell diagram, one can start to guess where SerDes comes into play. It looks like it’s part of sending and receiving signals from off-package chips:

[

![](https://substackcdn.com/image/fetch/$s_!xg0I!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F099dde17-88f9-4c97-ac1e-270d8baae995_984x738.png)



](https://substackcdn.com/image/fetch/$s_!xg0I!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F099dde17-88f9-4c97-ac1e-270d8baae995_984x738.png)

Hmm. How does data move from one chip to another?

## Parallel Communication

Back in the day, parallel buses were the standard for chip-to-chip communication.

Remember seeing cables like this 68-pin SCSI cable?

[

![](https://substackcdn.com/image/fetch/$s_!hAK4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5fbfb01a-b5be-45e9-9f9c-3a78e64ff02e_995x995.png)



](https://substackcdn.com/image/fetch/$s_!hAK4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5fbfb01a-b5be-45e9-9f9c-3a78e64ff02e_995x995.png)
*[Source](https://www.cablestogo.com/learning/connector-guides/scsi)*

These worked fine, for a while. But here’s an interesting point. The 68 wires here carry 68 simultaneous signals. Yet only 16 of those are data lines; the rest handle parity, control, power, and ground. See bits D0-D15:

[

![](https://substackcdn.com/image/fetch/$s_!z1j6!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f6d5cee-5ea3-4909-a4ce-6666e65faa89_958x1866.png)



](https://substackcdn.com/image/fetch/$s_!z1j6!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f6d5cee-5ea3-4909-a4ce-6666e65faa89_958x1866.png)
*[Source](https://techpubs.jurassic.nl/library/manuals/3000/007-3499-001/sgi_html/apa.html)*

That’s a lot of overhead to send just 16 bits of information in parallel.

And what if these peripherals, like a hard drive, end up needing more bandwidth to send more data per unit of time? Well, the simple thing would be to add more wires (width scaling) or increase the frequency at which you’re sending information (frequency scaling).

Width scaling quickly hits practical limits though. If it took 68 pins to move 16 bits, a 64-bit bus would require hundreds of pins. This results in bulky connectors and dense routing. All those wires and pins ultimately leads to crosstalk and added cost.

OK then. Frequency scaling it is! *Just run the same number of wires faster.*

That works, but eventually runs into physical limits. Every wire has slightly different length and impedance, causing signals to arrive at slightly different times. This is a problem known as **skew**.

At something like 100 MHz, skew isn’t a big deal if you sample the signals at the right time:

[

![](https://substackcdn.com/image/fetch/$s_!ZTeV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F887404b2-be16-487c-94f8-3b509fbbc13d_1628x1274.png)



](https://substackcdn.com/image/fetch/$s_!ZTeV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F887404b2-be16-487c-94f8-3b509fbbc13d_1628x1274.png)
*The blue, red, and green rising and falling edges \*should\* line up but don’t (skew). Yet, they are pretty close, so if you sample in the middle of the bit period you’ll be OK.*

But at gigahertz frequencies, each signal is on the order of hundreds of picoseconds. And even a few millimeters of extra trace or wire length can delay a signal by tens of picoseconds, which ends up being a non-negligble fraction of the bit period. This causes bits from one end of the bus to arrive misaligned at the other:

[

![](https://substackcdn.com/image/fetch/$s_!xo-5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F552a9464-8e88-41c5-8cce-b2cabd3c0487_1660x1240.png)



](https://substackcdn.com/image/fetch/$s_!xo-5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F552a9464-8e88-41c5-8cce-b2cabd3c0487_1660x1240.png)
*Huge skew causes sampling problems.*

At higher frequencies, crosstalk worsens. Adjacent wires start to interfere through capacitance and inductance, distorting signals and reducing the *margin*—the small timing and voltage window where bits can still be read reliably.

A shrinking margin means less room for error. As that safe zone narrows, even minor noise or delay can flip a 1 into a 0. Once skew and crosstalk consume most of the bit period, parallel frequency scaling breaks down.

What to do? Instead of sending all these bits on their own independent wires in parallel, what if you grouped them and sent them down fewer wires *serially*? Fewer wires mean less crosstalk right? And as a bonus, simpler routing too…

## Serial Communication

But wait, I thought faster worsens skew?

Yep. Faster signals worsen skew, but serial communication overcame that through **differential signaling**, where each bit is transmitted as two complementary voltages on a tightly coupled pair of wires. The receiver measures the voltage difference, canceling common noise and minimizing electromagnetic interference.

[

![](https://substackcdn.com/image/fetch/$s_!1-5P!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2113ca80-6173-4535-b107-3532a08eb59e_1035x733.png)



](https://substackcdn.com/image/fetch/$s_!1-5P!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2113ca80-6173-4535-b107-3532a08eb59e_1035x733.png)
*Differential signaling. “In a system with a differential receiver, desired signals add and noise is subtracted away.” [Source](https://encyclopedia.pub/entry/32540)*

Differential pairs also enable **clock recovery**. The receiver extracts timing directly from the bitstream rather than relying on a global clock. Thus, each serial lane self-clocks, helping eliminate skew between wires.

[

![](https://substackcdn.com/image/fetch/$s_!4d8J!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b0980fb-7ec2-4032-ae22-bc3433d48693_1280x1032.png)



](https://substackcdn.com/image/fetch/$s_!4d8J!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7b0980fb-7ec2-4032-ae22-bc3433d48693_1280x1032.png)
*[Source](https://resources.l-p.com/glossary/clock-and-data-recovery-in-modern-communication-systems)*

So, the solution to “how to get more bandwidth from this parallel cable” is to stop sending 64 bits at once and instead send them serially over fewer wires but at much higher speed.

By the way, by the early 2000s, parallel buses topped out around low hundreds of MHz, while serial ATA and PCI Express (PCIe) replaced them with multi-gigabit lanes:

[

![](https://substackcdn.com/image/fetch/$s_!8rYA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F793376ec-502c-41b7-8d1a-4d63ffe1a9a7_1928x1024.png)



](https://substackcdn.com/image/fetch/$s_!8rYA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F793376ec-502c-41b7-8d1a-4d63ffe1a9a7_1928x1024.png)
*Serial protocols getting faster over time. [Source](https://www.youtube.com/watch?v=qZtA4Fhx5RY)*

So the industry shifted to faster serial lanes which required increasingly smarter **transceivers**.

These transceiver circuits serialize, transmit, receive, and deserialize data.

Finally, **SerDes**!

## SerDes

**SerDes** stands for **Ser**ializer/**Des**erializer.

It’s the circuitry that converts between wide, slow parallel data inside a chip and narrow, high-speed serial data used to communicate off-chip.

[

![](https://substackcdn.com/image/fetch/$s_!0Oy9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F91746d86-fbb9-43f2-87c7-e845855bbfa9_700x335.png)



](https://substackcdn.com/image/fetch/$s_!0Oy9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F91746d86-fbb9-43f2-87c7-e845855bbfa9_700x335.png)
*[Source](https://www.latticesemi.com/ja-JP/What-Is-SERDES)*

The SerDes block takes that wide internal bus, serializes it into a few differential pairs running at high speed, sends it across a package trace, PCB, or cable, and then deserializes it back into parallel form on the other side.

**Every modern high-bandwidth interconnect like PCIe, Ethernet, Infinity Fabric, and NVLink rely on SerDes as the physical interface layer.**

UALink? SerDes.

[

![](https://substackcdn.com/image/fetch/$s_!jnri!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a00f68e-0faf-4417-bde3-1efe64caebb1_2080x1014.png)



](https://substackcdn.com/image/fetch/$s_!jnri!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a00f68e-0faf-4417-bde3-1efe64caebb1_2080x1014.png)
*[Source](https://ualinkconsortium.org/blog/ualink-200g-1-0-specification-overview-802/)*

ESUN / SUE-T ? SerDes.

[

![](https://substackcdn.com/image/fetch/$s_!Jk9p!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F196eeb24-cf09-4a5b-93d0-61d190800b50_1886x1216.png)



](https://substackcdn.com/image/fetch/$s_!Jk9p!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F196eeb24-cf09-4a5b-93d0-61d190800b50_1886x1216.png)

Behind paywall we’ll go deep into SerDes, including why it’s so difficult and which trade-offs can be made within SerDes to optimize for a particular AI workload.

I’ll also include some very enlightening conversation with a SerDes expert regarding the SerDes market. And even if you’re new, after reading this you should be able to better understand the conversation!

[Read more](https://www.chipstrat.com/p/serdes-matters)