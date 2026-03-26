---
title: "A Complete Guide to Optical Transceiver Nomenclature"
author: "Vikram Sekar"
publication: "Vik's Newsletter"
publication_slug: "viksnewsletter"
published_at: "2025-11-24T18:29:36.000Z"
source_url: "https://www.viksnewsletter.com/p/a-complete-guide-to-optical-transceiver-nomenclature"
word_count: 802
estimated_read_time: 5
---

*Welcome to a 🔒 **subscriber-only deep-dive edition** 🔒 of my weekly newsletter. Each week, I help investors, professionals and students stay up-to-date on complex topics, and navigate the semiconductor industry.*

*If you’re new, [start here](https://www.viksnewsletter.com/p/new-start-here). See [here](https://www.viksnewsletter.com/p/new-start-here?r=222kot&utm_campaign=post&utm_medium=web&showWelcomeOnShare=false) for all the benefits of upgrading your subscription tier!*

*As a paid subscriber, you will also have access to a video explanation of this post, an executive summary with key highlights, perhaps some nano banana illustrations 🍌 and a google drive link to this article so that you can parse it with your favorite LLM.*

\---

When entering the world of optical transceivers, one quickly runs into an intimidating selection of alphanumeric soups that are confusing to the uninitiated. For example, take a look at this optical transceiver product page from FiberMall.

[

![](https://substackcdn.com/image/fetch/$s_!ieoZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5186814b-1b9c-4f79-b5f1-cf551ab803b8_1190x578.png)



](https://substackcdn.com/image/fetch/$s_!ieoZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5186814b-1b9c-4f79-b5f1-cf551ab803b8_1190x578.png)
*Source: FiberMall*

In this post, we will go through what each of these terms mean in a step-by-step fashion. At the end of this article, you’ll be reading optical transceiver product pages like a seasoned industry professional.

\---

The naming standards you see in this product page originates from the IEEE Ethernet Working Group that defines the electrical and optical specifications at the PHY layer via the [IEEE 802.3 standard](https://en.wikipedia.org/wiki/IEEE_802.3). The 802.3 is not a single standard, but a whole family with various amendments along the way. At the PHY level, their main purpose is to define the electrical and optical characteristics used in signal transmission - things like optical power, link budgets, acceptable bit error rates, and signal encoding. For instance, the upcoming 802.3dj scheduled for release in spring 2026 defines 200 Gbps, 400 Gbps, 800 Gbps and 1.6 Tbps aggregate bandwidths using 200 Gbps lanes, and is also popularly known as [Ultra Ethernet](https://ultraethernet.org/).

The way an optical interconnect is defined most often follows the format below (give or take, because there is no rigid way this is defined in the industry):

> **\[Connector-Form-factor\]-\[Baseband-Speed\]-\[Reach\]\[Number of Lanes\]-\[Modulation\]-\[Multiplexing\]-\[FiberMode\]-\[Other Info\]**

Let’s break down the product name in the example above: **QSFP-DD-400G-FR4 PAM4 CWDM4 2km LC SMF FEC**, according to the template shown above and dive into every aspect of it.

### 1) Small Form-Factor Pluggable (SFP)

[

![](https://substackcdn.com/image/fetch/$s_!zOFq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff56b27a0-58bd-46b4-9e5c-3be50a5e0872_554x76.png)



](https://substackcdn.com/image/fetch/$s_!zOFq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff56b27a0-58bd-46b4-9e5c-3be50a5e0872_554x76.png)

The first part of the product name corresponds to the form factor of the pluggable connector that houses the optical transceiver. In the example above, QSFP stands for Quad Small Form-Factor Pluggable connector and it looks like the picture below.

[

![](https://substackcdn.com/image/fetch/$s_!Html!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faef00b14-a390-4714-8bff-c35c1280a862_1280x495.png)



](https://substackcdn.com/image/fetch/$s_!Html!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faef00b14-a390-4714-8bff-c35c1280a862_1280x495.png)
*Source: Molex*

The “quad” comes from the fact that it has four independent communication lanes in it. A QSFP+ connector is a faster version of QSFP. The DD in the optical transceiver example above stands for Double Density which means that it can run eight lanes in a quad form-factor effectively doubling the aggregate bandwidth. QSFP-DD connectors are quite widely used in 400G networking.

[

![](https://substackcdn.com/image/fetch/$s_!ih-4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F65b1f67c-c240-47a8-b5ec-50e3f741dfab_609x199.png)



](https://substackcdn.com/image/fetch/$s_!ih-4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F65b1f67c-c240-47a8-b5ec-50e3f741dfab_609x199.png)
*Source: Fibermall*

In 800G networking, the “octal” SFP or OSFP pluggable modules are more common which support eight independent communication lanes. As we transition to even higher speeds like 1.6T or 3.2T, the longer variant called OSFP-XD (extra dense) is more commonly used. In the future, as we make the transition to co-packaged optics (CPO), the size of the pluggable will dramatically drop because most of the transceiver functionality will be co-packaged with the network ASIC switch.

[

![](https://substackcdn.com/image/fetch/$s_!QtfF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa876ff3-b363-48e3-9217-4c2c07f406ef_652x218.png)



](https://substackcdn.com/image/fetch/$s_!QtfF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffa876ff3-b363-48e3-9217-4c2c07f406ef_652x218.png)
*Source: Fibermall*

The table below is a handy reference to quickly identify the SFP pluggables most commonly used in optics.

[

![](https://substackcdn.com/image/fetch/$s_!xAaT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F562618f5-f2a1-4112-8a94-b9bc9a9db552_1024x459.png)



](https://substackcdn.com/image/fetch/$s_!xAaT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F562618f5-f2a1-4112-8a94-b9bc9a9db552_1024x459.png)
*Source: Nokia.*

### 2) Aggregate Data Rates

[

![](https://substackcdn.com/image/fetch/$s_!FRxw!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41144990-b9a9-4b85-9b4c-04c2b3f00687_532x68.png)



](https://substackcdn.com/image/fetch/$s_!FRxw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41144990-b9a9-4b85-9b4c-04c2b3f00687_532x68.png)

The “400G” part tells you the total data rate: 400 Gbps. This is the aggregate throughput you get from the entire link that includes four or eight parallel lanes at once. In many cases, you will see this specified as “400GBASE” and the “BASE” here means baseband transmission. It essentially means the signal is transmitted directly without being modulated onto a carrier frequency. It is often dropped for brevity. The aggregate data rate is ultimately what determines how fast the optical interconnect is.

Interconnect speeds have been continuously getting faster, but with the advent of hyperscalars for AI applications, there is a pressing need for even faster interconnects to keep up with compute scaling.

[

![](https://substackcdn.com/image/fetch/$s_!MYNp!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F368f725e-4c78-4ba2-94a4-034e0d608ad8_570x317.png)



](https://substackcdn.com/image/fetch/$s_!MYNp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F368f725e-4c78-4ba2-94a4-034e0d608ad8_570x317.png)
*Source: NetworkComputing.com*

### 3) Reach Distance

[

![](https://substackcdn.com/image/fetch/$s_!VOsU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c12bd98-6d0a-42af-b28f-79b2bad03cc4_542x71.png)



](https://substackcdn.com/image/fetch/$s_!VOsU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7c12bd98-6d0a-42af-b28f-79b2bad03cc4_542x71.png)

Depending on the optical communication distance, technologies are classified into nine different distance tiers – from very short reach (VSR) commonly used within a single rack in datacenters, to what is playfully called “ze best range” (ZR) interconnects that work over hundreds of kilometers. The boundaries that separate various distance tiers are blurred, and depend a lot on the data rates, modulation schemes, and even the quality of fiber in use. Still, the classifications are generally useful in thinking about different optical technologies.

**After the paywall:**

-   A handy chart that shows reach distances, fiber modes, laser types, wavelengths, and use-cases for all nine distance tiers from VSR to ZR+.
    
-   Decoding number of parallel lanes and how they translate to aggregate bandwidth.
    
-   Multiplexing schemes used to increase aggregate data rates.
    
-   Modulation schemes and different kinds of electro-optical modulators.
    
-   Different kinds of fiber modes used, and which is used at what distance.
    
-   Miscellaneous connector information and specifications.
    
    \---
    

[Read more](https://www.viksnewsletter.com/p/a-complete-guide-to-optical-transceiver-nomenclature)