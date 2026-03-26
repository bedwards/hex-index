---
title: "Credo AECs"
author: "Various"
publication: "Chipstrat"
publication_slug: "chipstrat"
published_at: "2025-09-22T23:00:24.000Z"
source_url: "https://www.chipstrat.com/p/credo-aecs"
word_count: 1368
estimated_read_time: 7
---

I like to understand companies that win, both from a business strategy angle and a technical differentiation angle.

**Credo is clearly winning, up 500% since this time last year.**

[

![](https://substackcdn.com/image/fetch/$s_!ny5C!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd112dcfb-1a26-432d-be6f-8e29751ffd5f_866x270.png)



](https://substackcdn.com/image/fetch/$s_!ny5C!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd112dcfb-1a26-432d-be6f-8e29751ffd5f_866x270.png)

**And Active Electrical Cables (AECs) have a lot to do with it.**

If cables sound boring…well they aren’t to Tony Stark:

[

![](https://substackcdn.com/image/fetch/$s_!G00u!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6162150d-bd58-44b8-9d8c-201024100fff_1170x958.png)



](https://substackcdn.com/image/fetch/$s_!G00u!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6162150d-bd58-44b8-9d8c-201024100fff_1170x958.png)
*[Source](https://x.com/elonmusk/status/1947715674429919279)*

Oh, by the way, those purple cables… yep. Credo AECs.

Let’s first cover the technical basics of AECs.

Then for subscribers we’ll go *DEEP* into the lucrative business of AECs.

[

![](https://substackcdn.com/image/fetch/$s_!MW0w!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e929672-7813-498e-8c13-092c91d552e7_240x180.gif)



](https://substackcdn.com/image/fetch/$s_!MW0w!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e929672-7813-498e-8c13-092c91d552e7_240x180.gif)

## The Basics of Active Electrical Cables

Whether it’s Elon wiring up 200K GPUs for xAI’s [Colossus](https://x.ai/colossus) or Amazon racking and stacking [2 million](https://aws.amazon.com/blogs/aws/aws-graviton4-based-amazon-ec2-r8g-instances-best-price-performance-in-amazon-ec2/#:~:text=Today%2C%20I%20am%20very%20excited,real%20time%20big%20data%20analytics.) Graviton CPUs in the AWS cloud, all that compute still needs to be connected via physical cables. *You’ve gotta be able to talk to every machine.*

What kind of cables?

**Two options: copper and optical.**

### Copper vs Optical

Copper is simple. Electrical signals travel over a copper wire.

Optical is more complex. Electrical signals must be converted to light signals, which then travel down a fiber and are converted back to electrical at the other end.

**Clearly, copper is simpler.**

Optical requires an optical transceiver, a small module that houses a semiconductor laser to generate light, modulators to encode the electrical signal onto that light, a fiber to carry the light pulses, and a photodiode receiver to convert them back into electrical form at the other end.

**And as you would expect, simple means cheaper.** Optical transceivers must be manufactured with extreme precision using exotic materials such as indium phosphide. They are thermally sensitive, generating enough heat that extra cooling and careful thermal design are required. All of that complexity adds cost compared to simple copper wires.

**Simple can also mean lower latency.** Optical links require extra steps in serialization, encoding, and optical-electrical conversion, which together add nanoseconds.

And as we stated, **simple copper cables require less power**. Driving an electrical signal over a few meters of copper takes only a fraction of the energy needed to run lasers, modulators, and photodiodes inside an optical module.

What’s maybe less obvious is that **simple also means higher reliability**. Optical modules have more potential points of failure. Lasers degrade over time, connectors are sensitive to dust and misalignment, and the components are vulnerable to both heat and electrostatic discharge.

**Rule of thumb:** ***If you can do it in copper, you should.***

By the way, these copper cables are called **passive copper** or **Direct Attach Copper (DAC).**

### The Problem With Copper

*(This will get a bit technical, if you want to skip the **takeaway is that copper has physical limits that put a ceiling on the practical length of the cable and speed of data transmission**)*

But copper isn’t a perfect conductor. As electrons move through the conducting cable, they collide with the copper atoms and lose energy as heat.

At high frequencies, it gets worse.

For starters, a physical phenomenon called the **skin effect** pushes current toward the conductor’s surface, shrinking the effective cross-section. What starts as a thick wire becomes, electrically, a thin shell. And with this reduced area for current to flow, we have higher resistance.

[

![](https://substackcdn.com/image/fetch/$s_!IncA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F864456ee-4ac3-4bfd-af94-a6a453ddeabc_1316x1086.png)



](https://substackcdn.com/image/fetch/$s_!IncA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F864456ee-4ac3-4bfd-af94-a6a453ddeabc_1316x1086.png)
**I asked AI to help me visualize the skin effect. Pretty freaking cool.**

This is why you sometimes see very thick high-frequency cables. The extra diameter doesn’t change the skin depth, but it does increase the surface area available for current to flow through, decreasing resistance a bit.

But it’s not just the skin depth problem. Passive copper cables are usually “twinax”, i.e. two insulated wires twisted together. That geometry creates inductance and capacitance, which in turn gives the cable a characteristic impedance. *I know, we’re in weeds, hang with me.* Impedance is like resistance for AC signals. If the cable, transmitter, and receiver don’t match, part of the signal reflects back. Those reflections mix with the forward signal, producing distortion that “closes the eye” at high speeds:

[

![](https://substackcdn.com/image/fetch/$s_!99zl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c93f6b0-d0bf-477e-95f4-cf7eff88d4bf_1600x1163.png)



](https://substackcdn.com/image/fetch/$s_!99zl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c93f6b0-d0bf-477e-95f4-cf7eff88d4bf_1600x1163.png)
**Also made this with AI. I had to make some assumptions so it’s probably not “right”, but it’s directionally correct and illustrates the concept. Might AECs have been used during the inference powering this graphic?**

And twinax pairs don’t live in isolation. Their electromagnetic fields leak into each other, causing crosstalk. On top of that, high-frequency signals radiate energy into the environment and pick up noise in return.

Thus, at high frequencies, copper links suffer attenuation (signals get weaker), dispersion (edges of the pulses smear), and crosstalk (signals contaminate each other).

And now, an illustration of what happens to those digital pulses as they travel down a copper cable.

[

![](https://substackcdn.com/image/fetch/$s_!_Rgh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66c456b4-9ef3-4038-b8ba-af976868c53c_1600x1160.png)



](https://substackcdn.com/image/fetch/$s_!_Rgh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66c456b4-9ef3-4038-b8ba-af976868c53c_1600x1160.png)

Again, the faster you transmit data (shorter the pulses) and the longer the cable, the worse the resulting signal at the other end.

**Basically, you have to choose between long cables or fast data transmission, and there’s a ceiling on both.**

## Overkill Zone

To visualize this, we’ll copy Vik’s illustration from [A Beginner’s Guide to AI Interconnects](https://www.viksnewsletter.com/p/a-beginners-guide-to-ai-interconnects) (highly recommend) and I’ll tweak it just a bit. *Imitation is the highest form of flattery* 🫡

[

![](https://substackcdn.com/image/fetch/$s_!n2HR!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd51c86f3-58bb-4453-8d7b-ab37fc43fdd4_1392x876.png)



](https://substackcdn.com/image/fetch/$s_!n2HR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd51c86f3-58bb-4453-8d7b-ab37fc43fdd4_1392x876.png)
*Passive copper can only go so far and so fast. Optical transmission can work from very very short distances all the way up to very very far distances (think undersea fiber optic cables).*

On the other hand, optical can cover that gamut, from very short high-speed links to *very very* long interconnections between datacenters.

For example, optics are used to connect datacenters within a regional campus:

[

![](https://substackcdn.com/image/fetch/$s_!ONvl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3fed61ff-5baa-4f0c-bb0c-32a0d9903a82_1600x877.png)



](https://substackcdn.com/image/fetch/$s_!ONvl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3fed61ff-5baa-4f0c-bb0c-32a0d9903a82_1600x877.png)
*[Source](https://www.microsoft.com/en-us/research/wp-content/uploads/2018/07/Southampton-Plenary.pdf)*

That’s awesome. Sending signals across many kilometers as pulses of light is very cool. But what if you simply want a 3 meter cable at 100G per lane to connect the latest GPUs within a liquid cooled rack? It’s just outside of passive copper’s reach:

[

![](https://substackcdn.com/image/fetch/$s_!w9ZU!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6777ecf-8d8b-4fcc-aee5-75fc3b4c196a_1600x904.png)



](https://substackcdn.com/image/fetch/$s_!w9ZU!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6777ecf-8d8b-4fcc-aee5-75fc3b4c196a_1600x904.png)

Isn’t it a bit overkill to convert electrical to optical, power a laser, receive the signal and convert back to electrical, etc? Like anywhere that’s high-speed but short reach, there’s a bit of an overkill zone:

[

![](https://substackcdn.com/image/fetch/$s_!IZKb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07a0c84e-e126-43ee-b882-758783dde0f1_1600x869.png)



](https://substackcdn.com/image/fetch/$s_!IZKb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07a0c84e-e126-43ee-b882-758783dde0f1_1600x869.png)

Wouldn’t it be nice if you could somehow extend copper to reach everywhere in this “optics is overkill” zone?

### Active Electrical Cables

But how could copper stretch out further and faster?

Didn’t we say copper has physical limits, and the faster and further you go, the more attenuated and noisy the signal gets?

Yes.

But.

What if you had a decent sense of the physics of copper, and how much the high-frequency detail would fade? You could preprocess the signal before sending, for example boost the high frequency details so that after traveling the cable they arrive as expected.

And, what if, at the far end, you post-process the signal to say to boost the highs further if still needed or subtract out the noise of earlier bits bleeding into the current ones.

This is conceptually what AECs do. They put digital signal processors at each end of the cable. At the transmit side they shape the waveform for the journey ahead; at the receive side they undo the damage.

[

![](https://substackcdn.com/image/fetch/$s_!rx59!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6a9db93-f67e-4f0b-ba5f-92f323345251_1510x532.png)



](https://substackcdn.com/image/fetch/$s_!rx59!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6a9db93-f67e-4f0b-ba5f-92f323345251_1510x532.png)

This is why AECs have what seems like big connectors – there are actually chips in those connectors doing meaningful signal processing work.

[

![](https://substackcdn.com/image/fetch/$s_!xGZQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4b99956-8403-4048-82d4-00c75deb5899_1000x500.png)



](https://substackcdn.com/image/fetch/$s_!xGZQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4b99956-8403-4048-82d4-00c75deb5899_1000x500.png)
*From Credo’s website.*

Hence the name *active* electrical cables.

Now you can understand why traditional copper cables are called *passive***,** as they don’t do anything to the signal before or after transmission.

And, this active signal processing allows AECs to stretch a bit further and send data a bit faster than passive copper.

Yay. We’ve got the perfect product for our overkill zone:

[

![](https://substackcdn.com/image/fetch/$s_!M8ph!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9a1959a-8020-475d-9724-9573fb9b5060_988x592.png)



](https://substackcdn.com/image/fetch/$s_!M8ph!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9a1959a-8020-475d-9724-9573fb9b5060_988x592.png)

If you need high speed but intrarack lengths, AECs are cheaper, lower power, and orders of magnitude more reliable than optics.

Even if distances are short and speeds are slower, so that you’re on the edge of what’s possible with DACs, high-speed DACs are bulky and hard to manage**.**

[

![](https://substackcdn.com/image/fetch/$s_!E-lx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cc7347f-59ef-4714-97be-2b4a7f45054a_1200x622.png)



](https://substackcdn.com/image/fetch/$s_!E-lx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cc7347f-59ef-4714-97be-2b4a7f45054a_1200x622.png)
*[Source](https://www.youtube.com/watch?v=ApH7FPtpQbU)*

No, those aren’t garden hoses. Just thick, heavy copper bundles that don’t bend well.

Oh you’ve got a big ol’ high power rack where you need to get airflow to carry the heat out, or maybe even route some water in and out for liquid cooling? Best of luck!

[

![](https://substackcdn.com/image/fetch/$s_!MHzf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2cdd014a-12ab-4dc3-bd7d-6c237090b6c6_1600x811.png)



](https://substackcdn.com/image/fetch/$s_!MHzf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2cdd014a-12ab-4dc3-bd7d-6c237090b6c6_1600x811.png)
*[Source](https://www.youtube.com/watch?v=ApH7FPtpQbU)*

On the other hand, AECs use thinner copper; instead of offsetting attenuation with more copper, AECs just fight back with signal processing firmware running on embedded silicon. Thus, AECs can use thin copper wires and the resulting cables have up to 75% less volume**.**

## The Business of Active Electrical Cables

So now we understand the technology of AECs.

For paid subscribers, we’ll go *DEEP* into the **business of AECs.** Who are Credo’s customers? How are they using AECs? What about pricing? What’s Credo’s market share? And who is Credo’s competition?

If those tickle your fancy, keep reading!

[Read more](https://www.chipstrat.com/p/credo-aecs)