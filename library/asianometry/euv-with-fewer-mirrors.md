---
title: "EUV With Fewer Mirrors?"
author: "Jon Y"
publication: "Asianometry"
publication_slug: "asianometry"
published_at: "2024-10-28T18:01:42.000Z"
source_url: "https://www.asianometry.com/p/euv-with-fewer-mirrors"
word_count: 3477
estimated_read_time: 18
---

*Has it really been so long since I last did a newsletter? That is kind of crazy. Time moves so fast.*

*Like as I wrote before, I want to thank [Professor Shintake](https://groups.oist.jp/qwmu/tsumoru-shintake) as well as [Dr. Patrick Naulleau](https://www.linkedin.com/in/patrick-naulleau-6358713) of EUV Tech for their help and consultation. They are the true experts of this domain.*

*I do want to note that ASML chose the number of mirrors they did for a very real reason. It gives them full ability to print specific features on the mask. Simplifying the number of mirrors that away so we should keep this in mind. Perhaps fabs in the future adopt a mix of lithography machines - doing some very complicated layers with those machines and others with simpler mirrors.*

\---

A mirror inside ASML's EUV lithography machine reflects just 70% of the EUV light it receives.

With 10-12 reflections in the machine, this can get inefficient. Just 1% of the photons hit the wafer. Electrical power efficiency is said to be less than 0.2%.

It also contributes to troublesome stochastic defects, since not enough EUV photons hit the resist to overcome quantum effects.

So a recent paper from Professor Tsumoru Shintake at the Okinawa Institute of Science & Technology caught my eye.

It proposes a simplified setup with radically fewer mirrors. But Shintake makes it clear to me that his system no way challenges ASML's. In fact, it should complement it.

I think this thing can work. In today’s video, I want to walk you through this interesting new thing cooking up in beautiful Okinawa.

## Beginnings

We should begin with a brief overview of a commercial EUV lithography system. I am not going to cover everything, just enough to get you through this video.

First, we need EUV light, 13.5 nanometer wavelength light. The light source creates it in a number of ways - lasers hitting tin droplets, particle accelerators, whatever you want.

A mirror then collects the light and sends it through the Illumination module, which spreads out the light and makes it as uniform as possible for the mask.

That light then bounces off a photomask, a special mirror with the chip design printed onto it.

The reflected light then goes through an Optical Projection module that reduces the size of the pattern on the mask's field by some ratio and focuses it.

Finally, the light hits the resist-coated wafer. Ideally at the exact same angle across the machine's whole wafer exposure field so to avoid distortions.

I must pause briefly to explain Wafer Exposure Field again. It is a fancy word meaning the size area of the wafer exposed at once by the lithography machine.

We want the field to be as big as possible. A smaller field means we need more exposures to cover the whole wafer. That both hurts productivity and offers more chances for things to go wrong like alignment errors.

The industry standard has been 26 millimeters by 33 millimeters. It is important to be backwards compatible with that, or else your solution is not economically viable. The bare acceptable minimum would be a width of half that - 13 millimeters.

That can barely print an Apple SOC chip. The A18 Pro's longest side is just under 13 millimeters. Thanks to Max of the YouTube channel High Yield for the help on that.

Anyway. ASML offers two variants of the EUV machine - a Low and High-NA. The Low-NA machine's NA is 0.33. The High-NA machine, 0.55.

NA stands for Numerical Aperture. Roughly speaking, it describes the range of angles at which a lens can accept light. So a higher NA lets you pattern at higher resolution. Though as we will discuss, this benefit does not come free.

Let us count the mirrors for the Low-NA machine. One near the light source to collect the light, four in the illuminator, the mask-mirror itself, and then six mirrors in the projection module. That makes 12 total reflections - each of them absorbing 30% of the photons.

## Schwarzschild Optics

Why so many? Over the 20+ years of EUV development, teams have experimented with the number of mirrors.

One of the first EUV systems was designed by EUV pioneer Professor Hiroo Kinoshita.

His system had a flat reflective photomask. And for the projection module, there was a two-mirror Schwarzschild optics system.

Schwarzschild optics have been used before in microscopes. The classic system has two sphere-shaped mirrors - a primary and secondary - aligned on a single axis. Thusly, the secondary mirror is in the light's path.

Professor Kinoshita's main goal at the time was to prove that you really can use mirrors to reflect EUV light onto a chip design pattern and then onto the wafer. This two-mirror arrangement succeeded in doing that, but also presented serious limitations for high volume production.

The mirrors’ spherical, curved shapes mean that they reflect the chip design image in a spherical, curved manner. This curved reflection gets more pronounced the further away you get from the center, or off-axis.

But since both the wafer and the mask are flat, the curved image is not uniformly in focus. This "field curvature" distortion as it is called limits how large we can make our wafer exposure field.

It gets worse when we start scaling the NA - which per the famous Rayleigh Criterion is one way to improve patterning resolution. Because a higher NA means capturing light at more angles, it also worsens the field curvature effect and amplifies the optical distortions.

## NTT's Aspherical Systems

As a result, people moved away from Schwarzschild spherical mirrors.

In 1992, the Japanese telecom company NTT presented an early EUV system they had been working on for the past three years. Its projection module used two aspherical, equal-radii mirrors.

Aspherical, meaning not spherical. Note that these are sometimes also referred to as Schwarzschild as well.

And Equal radii, meaning that they share the same radius of curvature, but in different directions.

One primary convex mirror curving outwards and a secondary concave mirror curving inwards. This lets them cancel out each other’s field curvature distortions.

Both mirrors had holes in them to allow light to enter and exit the larger projection system.

This setup was called the "equal radii two-mirror" projection module.

In addition to the two mirror projection module, the NTT system had a reflecting photomask, two-mirror illuminator, and a synchrotron - a type of particle accelerator - for its light source.

## The MET Tools

If you recall your EUV history, and it should be part of the high school curriculum if you ask me.

Then you know that in the late 1990s a consortium of American IC makers led by Intel greatly helped refine the EUV technology.

The EUV LLC consortium's product was the Engineering Test Stand. Its 4-mirror projection system had an NA of about 0.1, which was low compared to a production machine. But its exposure field of 24 by 32.5 millimeters was large enough to meet high volume industrial requirements.

But that 0.1 NA. Afterwards, the American national labs and the famous technology consortium SEMATECH decided that if we wanted to test the other aspects of the EUV ecosystem, we should do it on a small scale exposure tool with an NA more comparable to that of a production machine. Like 0.3

So in 2004, they joined together to build the Berkeley Micro or Microfield Exposure Tool or MET, which had an 0.3 NA. It adopted the two-mirror equal radii projection system and had an exposure field of 0.6 by 0.2 millimeters.

The Berkeley lab has continued working on the MET for many years since, upgrading the optics and mechanics to produce MET5 in 2020. MET5 has an NA of 0.5, a field size of 0.2 millimeters by 0.03 millimeters, and a magnification factor of 5.

By then, it was decided that if we wanted a bigger field size and better resolution, then we had to have more than just two mirrors for projection. ASML's first EUV Alpha Demo Tool - shipped in 2006 after six long years of development - had six.

More mirrors seemed the only way to achieve a suitably large field. However, the additional mirrors necessitated a more powerful light source to deal with the substantially greater power loss - from something like 10-20 watts to 200+. Doing that took roughly another ten years and it got dodgy at times.

## The Shintake System

I asked Professor Shintake about how he came up with his system.

Professor Shintake began studying the nuclear sciences before switching to electron accelerator science.

He has spent thirty years researching such systems and their related technologies at places like Stanford.

In 2011, he helped build the world's second X-ray free electron laser.

The Spring-8 Angstrom Compact Free-Electron Laser. It is Japan's first such device.

He has also designed an underwater propeller for generating electricity from tidal currents. That is very cool. Anyway what I am trying to say is that he - unlike me - is not some random dude on the Internet.

In 2022, he came across a diagram of the ASML EUV system in the newspaper and wondered why the EUV light takes such a strange path. Such an off-axis path would ordinarily degrade optical performance.

Over the next two years, he studied over a hundred papers and books, and spoke with various people in the industry. During his research, he came across the Petzval field curvature theory.

Some background. The Petzval field curvature theory was made by the Slovak mathematician Joseph Petzval. Joseph is perhaps most well known for inventing the first photographic portrait lens.

Petzval's formulas suggested a way to use the two-mirror equal-radii projection system to increase the field size. To confirm his hunch, the Professor purchased some optical simulation software and ran it for three months using a number of parameter combinations.

## How It Works

Shintake humbly says that his system evolves from the existing ASML 6-mirror projection system. Let me give a brief overview.

So the stages are largely the same - light source to illumination to mask to projection to wafer. So let us trace the path the light takes through the system.

First, we collect light from the light source with the goal of sufficiently illuminating the flat EUV photomask with EUV photons.

After reflecting off the photomask, the light enters the projection module chamber with the M1 and M2 mirrors inside through a hole in the M1 mirror.

Once inside the chamber, the light goes down to the M2 mirror.

Then it reflects back up to the M1 mirror, and reflects off that.

Finally after that, it goes down to the resist-coated wafer, exiting the chamber through a hole in the M2 mirror.

In total, we have five reflections just like the old NTT EUV prototype system back in the early 1990s.

## Projection

Did that make sense? I hope it did. Because now we are gonna do a deep dive into the projection system.

A presentation from Carl Zeiss and optics legend Dave Shafer first inspired Shintake to make this projection module. One particular slide showed how a two-mirror, equal-radii setup can project a perfectly flat field - as in no field curvature - while avoiding other issues.

But his presentation also noted that the mask and wafer would need to be positioned inside the center of the two mirrors. So most everyone presumed that this arrangement would be impossible or impractical to achieve in practice.

Shintake played around with this and found that we can get similar-ish results by making the M2 mirror as thin as possible and as close as possible to the wafer. It still leaves us with some field curvature distortion but within parameters.

The MET also had to put the mirror as close as possible to the wafer. It can be bit tricky to execute, since it can be hard to make that mirror as thin as possible while keeping it rigid. But this can be done.

To enlarge the small field size, we make the tool much larger. In the case of the first MET, the distance between the photomask - the object producing the image - and the wafer - where the image is being formed - was about 276 millimeters or about 10.8 inches. Which as you undoubtedly remember, gave us a field size of 0.6 by 0.2 millimeters. Too small.

Shintake's proposal increases the distance between the object and the image - and thusly also the tool's height - to the very limit allowed by modern semiconductor fabs' ceilings:

About 2 meters or 6 foot, 6 inches.

Or just a bit taller than a Michael Jordan, the semiconductor industry's widely-accepted standard for height increment.

The semiconductor fab people do not seem particularly phased by this, at least nowadays. I feel like ASML's High-NA EUV tool has sort of reset people's expectations for tool sizes. But I do wonder about the second-order effects of such a big device. Shintake will likely rejigger this down the line.

## Illumination

So this two-mirror projection system has been known. Based on the history we just reviewed, it is not particularly novel.

So I think what is actually most special about the Shintake system is the module located above the projection, the illuminator.

The EUV lithography tool is a modern scanner device. So the mask is exposed through a fixed "exposure slit".

You "scan" or, like, drag the mask through the light beam while moving the wafer at the same time in the opposite direction. Once the scan is done, you step on to the next part of the wafer.

It makes more sense to be honest when you look at a transparent mask rather than a reflective mirror one.

The challenge with the illumination system is that the reflection geometries are complicated. The EUV light must be positioned in such a way to bounce off the mirror and into the projection chamber.

This was a great challenge. Professor Shintake told me that he designed three previous illumination systems that did not work. Then, while cleaning his room, he came up with a clever something he calls "dual line field".

With dual line field, four smaller light sources bundled together into two larger light sources are positioned to illuminate the mask. But how to keep the sources from reflecting onto each other? As Shintake says in an interview:

> \> If you hold two flashlights, one in each hand, and aim them diagonally at a mirror in front of you at the same angle, then the light from one flashlight will always hit the opposite flashlight, which is unacceptable in lithography.
> 
> \> But if you move your hands outward without changing the angle of the flashlights until the middle is perfectly lit up from both sides, the light can be reflected without colliding with the light from the opposite flashlights

What makes this really clever is that unlike the ASML machine, there are two fixed exposure slits.

So as the lithography machine does its scan, a spot on the mask gets exposed to the light cone from the first slit, projecting a spot onto the wafer.

But the mask is still scanning. That spot on the mask moves out of the first light cone and then gets exposed to that second light cone, projecting to the wafer. Such an arrangement can only work with a scan-and-step machine, with a moving mask.

This is very clever. This two-slit arrangement lets the two illumination cones to be offset, thus avoiding a reflection back at the sources. I am guessing this is why the Okinawa Institute has a patent application out on the dual line field. It’s key to making this all work.

## The Possibilities

So what is possible with this simplified design? Let us first look at the critical dimension.

Run the variables through the famous Rayleigh Criterion equation and you find that a 0.2 NA and a 13.5 nanometer wavelength gets you a 24 nanometer half-pitch - assuming that the K(1) process factor is the same 0.35 like as with traditional EUV machines.

To compare, a leading edge 193-nanometer immersion lithography machine has an NA of 1.35 and a K(1) of 0.27. This works out to about a 40 nanometer half-pitch.

Now, there is more to consider than just resolution - throughput, power cost, overlay, maintenance, and so on. But just based on critical dimension, this looks good.

How about ASML's Low-NA EUV machines? They have about a 13-nanometer half pitch. Their High-NA EUV machines' theoretical half pitch is around 8 nanometers. So the ASML EUV machines can still do much better here.

But if we raise the NA of the Shintake system to 0.3, then the critical dimension half pitch works out to 16 nanometers. That is interesting.

0.3 is probably where this will go. Shintake told me that the 0.2 NA machine proposed in his first paper did not match up with industry standards. Namely, its field scan size of 20 millimeters and its reduction ratio of 5.

So he is rewriting the paper with more industry-standard parameters - a 13-millimeter field scan size and reduction ratio of 4. The device might also be smaller somewhat.

This would require the adoption of field-stitching techniques like those the industry is making in preparation for High-NA EUV. But we should note that most smartphone SOC chips might already be printable.

## The Bent Mask

So what are the catches? There are a few complications and the paper lays them out.

But one that caught my eye is that with two mirrors we cannot avoid the projected photomask image having some bit of field curvature - which can lead to print errors.

So for additional help, he suggests that we slightly curve the mirrored photomask to correct the remaining curvature.

Yes, as in taking a regular flat mask and mechanically bending it (Bend It Like Beckham!) by anywhere from 30-120 microns - depending on NA and tool size - when mounting the thing onto the chuck.

I asked someone in the mask industry about trying to bend these quarter million dollar EUV photomasks, and he sounded concerned. The mask blanks are made from a very stiff substrate of ultra low expansion glass and they might crack.

My friend suggested making curved blanks and then printing the chip design onto that. This will also be challenging since the multi-electron-beam mask writers aren't equipped for that right now. The depth at which they can write features - depth of focus - is limited, and will need to be made variable.

More consultation is needed, but the Professor assured me that the curved mask is not absolutely necessary for the system to work.

## An Imminent Breakthrough?

This paper was somewhat covered in the overseas media, but I think in an unfair way.

Overseas commentators exclaimed in typical bombastic, uneducated format: "Japan on edge of EUV lithography chip-making revolution", with the subtitle "Okinawa Institute of Science and Technology claims breakthroughs that could break ASML’s monopoly on advanced chip-making equipment" - based on what I presume to be a five minute reading of the first paragraph.

I abhor such statements because if you read the whole paper, you can see what it actually is. It is a creative re-imagining that builds upon the decades of work already done in the EUV ecosystem. It complements, not displaces.

Right now, the machine only exists in a computer simulation. I think it can work, theoretically, but we are far away from a real device. There remain many more technical hurdles to overcome, including those not yet foreseen.

If someone wanted to found a startup around this from scratch, there is so much more they would need to figure out. Like how to make the EUV light source, the mirrors, the photomask plus their blanks, the precision mechatronics to manipulate the wafer stage with nanometer-accuracy, the special new photoresists, and the software to control all that.

So Shintake intends for his system to help, not challenge the ASML systems. He re-iterated this several times during our interview.

## Conclusion

Before we end, I want to thank Professor Shintake and Dr. Patrick Naulleau of EUV Tech for taking the time to speak with me, and answering my uninformed questions.

Let me wrap this up. I admire Shintake's system because it represents a rethinking of EUV as we know it today. He went back to the drawing board and came up with something wonderful. I don't see any reason why this can't work, though a commercial machine needs a lot more than just that.

So what do we do with this? The paper proposes that next we should do a proof-of-principle experiment. A real-ish lithography machine with requirements more in line with the semiconductor industry, like a 13 millimeter-wide field for instance. I think someone should try to help him make it.

Thanks for reading The Asianometry Newsletter! This post is public so feel free to share it.