---
title: "The Big Data Center Water Problem"
author: "Jon Y"
publication: "Asianometry"
publication_slug: "asianometry"
published_at: "2024-11-20T18:01:06.000Z"
source_url: "https://www.asianometry.com/p/the-big-data-center-water-problem"
word_count: 2569
estimated_read_time: 13
---

A datacenter with 15 megawatts of IT capacity is estimated to use about 80-130 million gallons of water each year.

That is as much water as three hospitals, or two 18-hole golf courses.

The current AI boom has the world's tech giants building big data centers across the world.

We all know they need a lot of energy. But what about water?The two are very closely tied together.

This channel has a not-so-secret obsession with water. In this video, we look at the data center's massive water footprint.

## Types of Data Centers

Data centers come in all sizes and functions.

Some small enough to fit into a closet. Or massive custom-built facilities that span entire football fields. Generally we classify them by floor space, the number of servers inside them, or how much power they consume during operations.

The biggest facilities are referred to as "hyper scale" - having about 5,000 servers and being 10,000 square meters large.

Facilities built by global-scale operators like Google or Meta are often used for their global-scale applications - Gmail or Facebook or something like that.

But data centers can also be leased out to customers. For security, latency, and reliability reasons, cloud providers need to build these cloud data centers in a range of zones. These hyperscale facilities are so large because of energy efficiency scaling and economics.

We measure a data center's energy efficiency through power usage effectiveness or PUE. PUE is calculated by dividing the total energy delivered by the total energy going to the ICT equipment.

So the most efficient possible efficiency rating would be 1.0 - meaning that 100% of the energy going in is used on ICT.

The larger a data center is, the lower their PUE tends to be. Google and Microsoft claim that their hyperscale data centers have a PUE of 1.2 or 1.1. A closet data center on the other hand might have 2.5 or so.

This gap is almost entirely attributable to cooling. Hyperscale data centers can afford more efficient cooling systems, modeling airflows through the aisles or even employ liquid cooling systems. So let us talk cooling.

## Cooling

Almost all of a data center's consumed electricity is converted to heat.

Even if a data center isn't working at its full capacity - and they rarely are - it is still withdrawing 60-100% of its maximum power. That is a whole lot of heat.

To prevent long term damage, electronic equipment have to be kept cool. Hard disk drives need to kept at temperatures of about 45 degrees Celsius or 113 degrees Fahrenheit. Solid-state compute and storage chips have higher limits - 85 degrees Celsius.

Maintaining that stable temperature - and humidity - is the job of the cooling system. There are two types of cooling systems - air and liquid cooling systems. Most data centers use the former as part of a raised-floor system.

The racks are elevated about 2-4 feet above the ground. The underfloor area might have some cables running through it, but it is mostly cold air.

Cold air comes out of the data center's Computer Room Air Conditioner or CRAC. The air is shepherded into cold aisles, sucking heat from the servers.

This hot air rises and is then re-collected to send to fluid heat exchangers for transfer out of the room. There are a few systems but the one most commonly used has two fluid loops - a process and condenser loop.

In the process loop, heat is taken off the data room floor by a fluid refrigerant - usually a mix of water and glycol. The heat is then transferred to the water-based condenser loop for final transfer to the outside.

This two-loop system is reminiscent of those for nuclear power plants and prevents contamination between the inside and outside. It also grants greater operating flexibility and efficiency at the cost of being more expensive.

At the end, we have a set of cooling towers to cool the water in the final loop. Inside the tower, the hot water flows down and some of it evaporates - releasing energy. The cooled water returns into the system for reuse.

The evaporated water leaves the tower as steam. About 1% of the water evaporates for every 10 degrees Fahrenheit of cooling (~5.6 degrees Celsius) - though this depends on ambient temperature and humidity conditions.

How much water is used each day depends on the size of the CRAC it must support. Regardless, evaporated water must be replaced with new, make-up water.

## Energy Usage

The second major way that data centers use water is an indirect one but also far larger: Energy.

In 2022, data centers made up about 1 to 1.3% of the world's electricity consumption.

Water is withdrawn to generate certain types of power. Anything thermoelectric like coal, natural gas or nuclear, where we are boiling water to spin a turbine needs water.

In 2021, 73% of the US's power came via thermoelectric means - per the US Energy Information Administration. That has been trending down recently as the mix has moved away from coal and towards natural gas.

Per a study by the Berkeley National Laboratory, water usage via energy generation can be as much as 2-3 times larger than what is directly consumed by the cooling systems.

Evaporative cooling towers might consume thousands of gallons of water. But without them, data centers must resort to air conditioning systems which use even more power and thus water, indirectly.

Companies like Apple are working to have their data centers use more renewable energy, or run programs to offset their use. But for the most part, a data center pulls power from its local grid.

## The Big Companies

We can take a look at a few companies and their water usage.

In 2022, Google said that they used about 4.3 billion gallons of water for cooling. They say that 25% of the water they used is reclaimed wastewater, or seawater.

Digital Realty is a large real estate investment trust that specializes in data centers, with over 300 facilities around the world.

They report their water sources with a great deal of helpful breakdowns. About 36% of their water comes from municipal non-drinkable sources.

They also report that roughly half of their 2022 water consumption were in areas experiencing some form of water strain. I laud them for reporting that stat.

AWS does not mention how much of the water they use comes from potable sources, but their 2022 Sustainability Report does say that 20 of their global data centers use recycled water for cooling.

16 of those data centers are in Virginia, 2 in California and 2 in Singapore.

Microsoft's 2022 sustainability report discusses their commitments to getting to water positive, which includes sponsoring projects that replenish more water than they consume - reaching a million people with water access. Which is always good.

## Water Sources

Of course, this does means that for Google, Digital Realty, and probably Microsoft and AWS, the majority of the water directly withdrawn and used for cooling is drinkable water from the local water supply.

Some 40-50% of the global population lives in areas suffering water scarcity, and many data centers need to be located near large population centers. Which means adding a new and competing demand for water.

SemiAnalysis reports that one of the leading states in the US for data center buildouts is Arizona. Builders include Microsoft, PayPal, Meta, and more.

This is probably because it is so sunny - the state grew its solar capacity by 20% in 2023. Land is also cheap, the government is rather business-friendly, and there is relatively low risk of natural disasters like earthquakes.

But the area also experiences drought-like conditions from time to time and is highly dependent on the Colorado River for its water.

The concern seems to be top of mind for companies like Meta. For their part, Meta announced that they will fund projects to restore water in the Colorado River and Salt River basins and source its water using long-term storage credits so no water is taken from the municipal area.

And it will also leverage direct free cooling to cut water usage by 60%. What's that?

## Free Cooling

Okay.

So is there any other way to cool down a data center without running a huge HVAC system or evaporating thousands of gallons of water each day?

Probably the most widely adopted water-free cooling system is "free cooling", or utilizing nature to cool things down.

The simplest implementation of free cooling is to leave the windows open: Direct free cooling.

But outside air is rarely of high enough quality to be indoors - it has smoke, dust, gases, what have you. It will ruin the electronics. So we need dehumidification, air filtration, and cleaners.

So certain areas that would require the use of dehumidifiers or filters will partially defray the cost benefits of direct free cooling. So total energy savings are dependent on location.

But generally, free cooling works. Studies done of data centers in various locations around Europe found that direct free-cooling cuts some energy consumption no matter where the center is. Average savings of about 5.4-7.9%.

Studies done in Australia found that direct free cooling can save up to 60% in the southern capital cities. A good thing since 60% of the country's energy comes from burning fossil fuels.

The potentially significant advantages of a cold climate are why several Nordic governments are chasing data center foreign investment ... and in recent years, getting it too.

## Waterside Free Cooling

I suppose I should mention here Microsoft's Project Natick.

This when Microsoft sealed a data center into some metal Tupperware and dumped it underwater for a while. It works, but I doubt many people will be comfortable with putting $30,000 H100s under the water.

But there is something similar that might make a lot of sense: Waterside free cooling. Data centers located near cold water seas can use that water to cool their systems.

Google's Hamina data center in Finland is an example. The data center is a converted paper mill factory that takes in fresh seawater from the ocean using the paper mill's existing pipes.

Thanks to the two-loop cooling system, the seawater does not mix with the fluid used to directly cool the datacenter. After cooling the process loop fluid, it is then mixed with seawater again for cooling down before being sent back out into the sea.

## Heat Recapture

Another idea would be to recover the heat and reuse it for something else: Heat recapture.

Recaptured heat can be used many ways: Desalinating water, pre-heating water in thermoelectric plants, direct power generation. Or, we can simply pipe it to people's houses for general heating or to produce their hot water.

This is certainly possible. Captured heat from air cooled data centers comes out hot enough - about 35 to 45 degrees Celsius.

And space/water heating is the single largest end use of energy in a home, accounting for about 6% of America's total energy consumption.

The issue is that we cannot efficiently move heat as far as we can move electricity. The demand sources - i.e. the households - need to be relatively close to the data center.

A second issue concerns infrastructure. For instance, district heating infrastructure. Not every city will have the network of insulated pipes needed to bring heat to homes, and few are willing to pay to have it built despite the financial benefits of doing so.

Score another point for the Nordics, which has done a lot of work here.

Anyway, if data centers do do heat recapture - and they should, despite the payback issues - then they will likely also adopt liquid cooling solutions too.

Liquid is far better at capturing and transferring heat than air is. That cuts down on overall energy consumption and also improves processor performance to boot.

There are a number of ways to do it, but it could involve directly bringing cold liquid to the chips. I am sure there is some Linus Tech Tips video about such a setup.

## Temperature Ranges

Finally, there is a point to be made that we do not have to cool the data center down all that much.

The American Society of Heating, Refrigerating and Air-Conditioning Engineers or ASHRAE maintains a set of data center cooling standards.

They recommend a temperature range between 15 to 32 degrees Celsius. Some operators run even cooler, assuming that electronics perform better in colder conditions.

Raising a data center's temperature by even 1-2 degrees has significant financial benefits. So it is worth testing the boundaries.

Yet there is not a lot of information on this and what has been observed seems to be rather contradictory. Google has run a few tests showing that their data centers are operable at even higher temperatures.

Yet at the same time, there are some Google tests which seem to show that hard drives perform worse at cooler temperatures. So who knows?

## AI Boom

One thing is for sure: The ongoing AI boom will have these massive data centers ramping up faster and using more energy.

Microsoft's 2022 sustainability report mentions that their 2022 water consumption leapt 34% from 2021. Considering there was only a 13% increase from 2020 to 2021, it appears that this jump is due to ChatGPT and other generative AI products.

Bob Blue - love this name - CEO of the utility Dominion Energy, serves the Northern Virginia data center cluster and said in an earnings call:

\> For some context, historically, a single data center typically had a demand of 30 megawatts or greater. However, we're now receiving individual requests for demand of 60 megawatts to 90 megawatts or greater, and it hasn't stopped there.

\> We get regular requests to support larger data center campuses that include multiple buildings and require total capacity ranging from 300 megawatts to as many as several gigawatts.

SemiAnalysis did an excellent job analyzing this massive coming demand. They believe that AI will propel data center share to 4.5% of global energy generation by 2030. Water and power consumption are correlated. Just imagine water consumption growing that much too.

Nvidia's coming GPU products like the B100 and beyond are getting even more power hungry. Training a leading edge model will run these GPUs to the max, which means more power and water consumption.

At the same time, deploying them will require immense scale which ... again means more power and water consumption.

## Conclusion

So no matter how you slice it, it seems like the future of compute and AI will require far more electricity - and water.

First at the semiconductor fabrication stage. Here in Taiwan, TSMC alone is responsible for 6% of all the energy that Taiwan will consume. By 2025, that is estimated to grow to 12.5% - thanks in part to new EUV lithography machines.

Then after the chips are fabbed, we put them into these data centers and run them to full tilt. They then generate heat that we need even more energy to move out of the room.

If things develop as they seem to be developing, future data centers will need to rapidly adopt a combination of free-cooling, waste heat recovery, and renewable energy like solar. The faster this transition happens, the better. It is both a question of sustainability and money.

Thanks for reading The Asianometry Newsletter! This post is public so feel free to share it.