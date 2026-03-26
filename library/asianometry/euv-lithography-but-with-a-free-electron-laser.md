---
title: "EUV Lithography. But With a Free Electron Laser "
author: "Jon Y"
publication: "Asianometry"
publication_slug: "asianometry"
published_at: "2023-12-06T17:01:16.000Z"
source_url: "https://www.asianometry.com/p/euv-lithography-but-with-a-free-electron"
word_count: 2446
estimated_read_time: 13
---

*Long time no see.*

*I have been thinking about this recently. The* *idea of what goes next after EUV. The current presumption in the wider media is that EUV works and is worth the investment. The former is true in a literal sense. I am not so sure about the latter.*

*I want to do another video about this down the line. But I am feeling increasingly uneasy about the state of EUV lithography right now. And I am feeling especially … especially nervous about High-NA EUV.* *The new senior leadership of ASML have a rough task ahead of them.*

*Also, one of the feedbacks that I got about this video from an industry professional was that “this was trash”. So take that as you may.*

\---

Recently, I have been thinking about TSMC's N3 process. The one popularly called "3-nanometers", whatever that means.

There is no doubt about it. TSMC's N3 process family is going through some issues. Currently there are two versions of N3.

The first one is N3B. The B stands for "based". Which according to TikTok means it has a lot of swagger or something.

This is the one that is in high volume production right now. My guess is that it is producing an Apple chip though as of this writing, nothing has yet come out using it since the commencement ceremony at the end of 2022.

Then we have this second process called N3E. It is entirely different and is known as the "real" N3. This one is heading into high volume production later in 2023.

One of the significant differences between N3B and N3E is the number of layers done by EUV.

David Schor of WikiChip Fuse estimated that N3B has 80% more EUV layers than the N5/N4 process nodes. N3E apparently scaled that back, going from 25 EUV exposures to 19.

It is a bit strange, right? TSMC has more EUV machines than any other fab in the world, but their newest and biggest N3 process is nevertheless pulling back on EUV. Why?

Nobody knows but TSMC and ASML. But I have a theory. EUV was supposed to take us to the Promised Land. It hasn't yet because the amazing, double-tin-shot-with-a-laser EUV light source everyone loves to talk about is not powerful enough.

And that is why scientists are tinkering with something else. And that something might cost half a billion dollars. In this video, we are going to look at the experimental idea of Free Electron Lasers for EUV lithography.

## Stochastics

The current method of generating EUV light for EUV lithography is laser-produced plasma, or LPP.

We fire a high-intensity carbon dioxide laser at many tin droplets. The droplets turn into plasma which emit the necessary 13.5 nanometer EUV light for lithography.

Imagine EUV photons spraying out towards the wafer like shot pellets fired from a shotgun. The photons bounce off various mirrors, and then the photomask, before getting to the wafer.

Upon hitting the wafer, these photons react with the molecules of the photoresist coated on that wafer. Now the wafer has the chip design printed onto it and we can move on with the rest of the fabrication process.

Well, that is when things go right. The issue is that both these photonic movements and photon-resist molecular reactions are random processes that follow quantum mechanical principles.

These photons will not travel exactly where we intend for them. There is random variation in their distribution as they go. And the molecules on the resist layer are also distributed randomly and will interact randomly upon being hit by the EUV photon.

What all this means is that stochastic effects in EUV lithography leave various print failures on the wafer.

Broken lines, microbridges, and rough edges on designs. We call them "failures" rather than "defects".

A defect is something that happens due to particle contamination, pattern collapse, or otherwise.

This is different from that. Stochastic print failures are far smaller, completely random and thus non-repeating, and come via a law of nature. The randomness is unavoidable.

## Dealing with Randomness

So folks, how do we usually deal with randomness caused by the law of small numbers?

We increase the numbers, right? Just send more photons! There are two issues with this.

First is that it takes 14 times more energy to output an EUV photon than a 193-nanometer photon. So for each exposure "dose", a 250 watt EUV light source will create 14 times fewer photons than a 250 watt 193-nanometer light source.

Not to mention that only a small percentage of those photons ever make it to the wafer. Much is lost as it bounces from mirror to mirror or through the pellicle protecting the photomask, or whatever have you.

So we either need to give the wafer more EUV doses, or increase the light source's EUV power to make the dose bigger.

The first option is not a long-term solution. It slows the machine's throughput, negatively affecting its productivity. The fabs won't pay $150 million for a slow machine - not even the dumb fabs like REDACTED.

So we need to increase the power. This is not easy. In a recent presentation in 2023, ASML San Diego showed a potential future pathway towards 600 watts or even 800 watts.

I talked about how they might achieve this in my update video on High-NA EUV. It involves lasers and tin.

800 watts sound like a whole lot. Except that is still far short of what is ideal. A 2019 estimate by KIOXIA estimates a range of 1.5 to 2.8 kiloWatts for the 3 and 2 nanometer nodes.

That is disruptively far more than what existing LPP approaches can do. At the end of the day, there are fundamental issues with the LPP approach - particularly when it comes to tin contamination on the mirrors.

So maybe we can try a Free Electron Laser.

## Lasers

Maybe the best way to start is to explain lasers.

The word "Laser" stands for "Light Amplification by Stimulated Emission".

First, we have a gas or element used to create the laser light. This is the "laser medium" or "gain medium". Perhaps the most widespread such medium is Neodymium-doped yttrium aluminum garnet.

We stimulate that medium's atoms using energy from some source like a krypton lamp or LED.

The atoms' electrons absorb the energy and ascend like the Buddha to a higher state of being.

After which, the electrons descend back down to a lower energy level. In doing so, they release energy in the form of light, photons.

That is where the "stimulated emission" part of the LASER acronym comes into play. We stimulated the medium into emitting light.

By doing this to a whole bunch of laser medium atoms at the same time, we can amplify a bunch of photons. That is the "light amplification" part. The light comes in all directions so we use mirrors and an optical cavity to focus that light into a directional beam.

Because the electrons ascending up and down the various energy levels are still bound to the laser medium's atoms, we call this type of laser a "Bound Electron Laser".

So if that is "bound", what do you call a laser where the electrons are unbound from their atoms? Where they are ... free? A free electron laser.

## Free Electron Laser

Okay let's do this.

A Free Electron Laser generates light by oscillating charged particles - electrons, mostly - traveling at near the speed of light.

We start with a powerful electron gun to create a beam of electrons.

Then we use a linear accelerator to accelerate these electrons to near the speed of light.

After that, we send the accelerated electrons into an alternating magnetic field - like north, south, north, south, so on.

Each magnet inside the field attracts the electrons, causing them to swerve towards it. This movement is an acceleration - because acceleration can not only be a change in speed, but also a change in direction.

An accelerating electron gains energy. Later on, the electron has to release that energy, and does so in the form of light.

If we are to accelerate the electrons back and forth - essentially "wiggling" them - in the right way, then we can force it to generate huge bunches of photons. This wiggling is done by a long series of alternating magnets called an undulator.

By tweaking the electron beam, its speed as it enters the undulator, as well as the strength of the undulator's magnetic field we can produce 13.5 nanometer light.

## SASE

Since 13.5 nanometer light is very easily absorbed by almost every substance in the world, we cannot use an optics system like we do with traditional lasers to collect and intensify the emitted light.

So instead, we intensify the light inside the undulator itself based on a theory called Self-Amplified Spontaneous Emission or SASE.

Every bunch of electrons traveling through the undulator has electrons traveling through at different velocities and states. The distributions of these are random. We don't want this randomness because it causes the electrons to emit light incoherently.

We don't have the order and alignment we need for laser-like behavior. It is like a bar full of people randomly talking - just noise.

But if the electrons are similar enough to each other, and fired in the right way ... then something remarkable happens.

The electrons will interact with each other's own emitted radiation. And that will cause them to self-classify into buckets based on their relative positions.

Now everyone is singing in harmony. The light emitted from the bunches of electrons starts to amplify itself, creating the self-amplifying effect referred to in the name.

There, I think I got that right. If I am wrong, I am sure I'll get some comments.

## Synchrotron

Those who have seen the previous EUV light source video might recall that early experiments worked with synchrotron radiation.

A synchrotron is a class of donut-shaped particle accelerator descended from the cyclotron. It keeps a particle beam continuously circulating, emitting radiation. The industry ultimately didn’t use a synchrotron to generate EUV light for photolithography because it cannot generate enough power.

Though a synchrotron is used to generate light for the actinic blank inspection tools. These tools test the EUV mask blanks for defects using actual 13.5 nanometer light - the "actinic" in the name.

While the synchrotron might seem kind of similar to the Free Electron Laser - and they are relatives - they are not the same.

A synchrotron light source is essentially a storage vessel, particles churning around in circles endlessly like as in a 7-11 slushee machine.

On the other hand, the electron beam's requirements for an EUV-class Free Electron Laser are so demanding that only a linear particle accelerator can do.

## KEK

A team at Japan's High Energy Accelerator Research Organization

or KEK recently presented an interesting proof of concept.

This Free Electron Laser POC kind of looks like a race track. The electron gun first creates the electron beam. The beam then passes through two linear accelerators.

First, an injector accelerator that adds 10 mega-electron volts of kinetic energy to the electrons.

This is kind of like how a race car speeds up in the pit lane to get to a decent speed before entering the main track.

After that, the electrons go through a main accelerator that adds another 800 mega-electron volts of kinetic energy. This brings them to near the speed of light.

After that, they go through the first turn.

And then after that, into a 200 meter long chain of undulators.

At the end of the undulator chain, out comes the EUV light we so desire and the electron beam.

Normally, the electron beam is dumped right after exiting the chain. The KEK team does not do that. Instead, they send the beam through a second turn, returning them to the main linear accelerator.

There, the beam is decelerated before finally hitting the beam dump which safely absorbs the electron beam and its energy. These dumps are usually made from a non-reflective substance like graphite or concrete.

A beamline will be necessary to bring the EUV light to the lithography machines. This is likely to be a set of mirrors in a vacuum chamber to expand the beam cone and split it for entry into the steppers.

\## Photolithography Advantages

A Free Electron Laser has a number of advantages as a photolithography light source.

First, because there are no tin droplets, we do not have issues with tin contaminating the collector mirrors like with the LPP approach.

Second, a single laser can provide light for multiple lithography machines. A laser can generate 10 kiloWatts of EUV power for one machine, or 1 kilowatts for ten machines. This is the same advantage the synchrotron approach offered.

Third, the free electron laser is adjustable. Tweaking the electron gun and the undulator's specs can upgrade the 13.5 nanometer light to an even shorter wavelength like 6 nanometers.

Fourth, there is a possible cost advantage. The laser itself will cost a lot - roughly $400 million along with $40 million of annual maintenance costs. But again you can distribute its fixed costs across multiple lithography bays.

The Free Electron Laser is also likely to use less electricity. The KEK machine uses about 7 megawatts of electricity to generate 10 kilowatts of EUV power, so about 0.7 megawatts per 1 kilowatt of EUV power.

By comparison, the current LPP approach uses about 1.1 megawatts of electricity for 250 watts of EUV power or 4.4 megawatts for 1 kilowatt. ASML is working hard to improve that, of course, but this is a sizable gap. And electricity is one of a fab’s biggest variable costs.

## Conclusion

Free Electron Lasers were first invented in 1971 by Stanford's John Madey.

But early machines produced only infrared or microwaves. It was not until the early 2010s that they started being seriously put forth as potential EUV light source - too late to be involved in early EUV development.

But then GlobalFoundries put out the first serious proposal in 2015, and it has been kicking around ever since.

Including the Japan project, Free Electron Laser technologies are also being researched in Europe - Euro-XFEL - and the United States - SLAC.

I reckon ASML has probably looked at it. I wonder what they thought. There remain considerable issues to be overcome, but the concept is tempting. Someone should get the semiconductor Avengers together to talk about it.

Dumping the tin laser approach might cause some disappointment to tech enthusiasts. But the thought of TSMC putting a $400 million, 200-meter long linear accelerator underneath their next fab is kind of awesome too.