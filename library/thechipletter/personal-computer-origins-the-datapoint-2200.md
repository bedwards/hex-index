---
title: "Personal Computer Origins: The Datapoint 2200"
author: "Babbage"
publication: "The Chip Letter"
publication_slug: "thechipletter"
published_at: "2025-05-19T23:30:30.000Z"
source_url: "https://thechipletter.substack.com/p/personal-computer-origins-the-datapoint"
word_count: 3899
estimated_read_time: 20
---

[As We May Think](https://en.wikipedia.org/wiki/As_We_May_Think), [The Mother of All Demos](https://en.wikipedia.org/wiki/The_Mother_of_All_Demos), [The Xerox Alto](https://en.wikipedia.org/wiki/Xerox_Alto); all were breakthroughs in thinking about how to make the computer more personal. They were not, however, the true antecedents of the first ‘personal computers’. Instead, that line of descent runs through something much less visionary, capable or expensive: the humble computer terminal.

The terminal can claim this role in three ways. First, it was the computing device that users would most commonly interact with in the decade or so before the personal computer first appeared. Second, some terminals bore a strong physical resemblance to many popular early personal computers. Finally, it was the development of one particular terminal that led to the creation of both the architecture that would power the very first personal computers, and its successor, which would come to dominate in both personal computers and servers. In fact, we can trace the line of descent of that second architecture, now commonly known as [x86](https://en.wikipedia.org/wiki/X86) , which is still used today in the majority of the most powerful laptops, desktops and servers, from that terminal, the Datapoint 2200.

Despite some claims to the contrary, the more sophisticated terminals weren’t personal computers. As we’ll see, some designs, including the Datapoint 2200, were programmable, but they weren’t originally designed to be used as stand-alone computing devices. Some saw the possibility that they might be used as such, and they were even occasionally used as stand-alone devices. However, this was not widespread and their potential was never properly realised.

Even without this though, the Datapoint 2200 itself was an innovative and important device that represented a major step change over the device that it superseded: the teleprinter.

#### Loud and Dumb - The Teleprinter

In 1948, [Manchester Baby](https://thechipletter.substack.com/p/modern-baby), the first electronic programmable stored-program computer, had a Cathode Ray Tube (CRT) display that allowed users to peer directly into its 32-bit word memory. This worked because the CRT itself - what was known as a ‘Williams Tube’ - **was** memory.

In the decades that followed, though, the most common way of interacting directly with a computer was using a ‘teleprinter’. These devices usually included an alphanumeric keyboard, a printer and a means of reading data, from either paper tape or a magnetic disk. The [Model 33](https://en.wikipedia.org/wiki/Teletype_Model_33) teleprinter, made by AT&T subsidiary Teletype[1](#fn:1) Corporation and introduced in 1963, was one of the most popular designs with over half a million produced in the 1960s and 1970s.

Important work was done in front of Model 33s. There is a famous [photo](https://www.flickr.com/photos/9479603@N02/3311745151) of Ken Thompson and Dennis Ritchie, collectively the creators of the Unix operating system and the C programming language, with the latter sitting at a Model 33 connected to a DEC PDP-11 Minicomputer.

[

![](https://substackcdn.com/image/fetch/$s_!TJe3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd502243d-f36c-4a59-98f6-c77b7fc6112f_652x522.jpeg)



](https://substackcdn.com/image/fetch/$s_!TJe3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd502243d-f36c-4a59-98f6-c77b7fc6112f_652x522.jpeg)
*Dennis Ritchie with Teletype Model 33 : https://www.flickr.com/photos/9479603@N02/3311745151 CC BY-NC-ND 2.0*

Teleprinters such as the Model 33 had major drawbacks though: they were loud and dumb, never an appealing combination. You can get a sense of just how loud in this short demonstration of a restored Model 33.

That volume of noise was a major barrier to their wider adoption. A roomful of Model 33s in an office would have created an intolerable working environment. As a result, the Model 33 and similar devices were often banished to computer rooms.

The advantages of CRT-based ‘Visual Display Units’ were clear. Not only were they silent but the display could be interactive (even if still character-based) and they could display information much more rapidly than the 100 words per minute printing of the Model-33.

[

![](https://substackcdn.com/image/fetch/$s_!4a7I!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F56e4ae1a-0f0f-4c8c-b02a-b655e103ca63_1440x1080.jpeg)



](https://substackcdn.com/image/fetch/$s_!4a7I!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F56e4ae1a-0f0f-4c8c-b02a-b655e103ca63_1440x1080.jpeg)
*Univac 100 Uniscope : By Adamantios - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=4778326*

Early examples of the CRT-based displays include the [Univac Uniscope](https://en.wikipedia.org/wiki/Uniscope) and the [IBM 2260](https://en.wikipedia.org/wiki/IBM_2260), both launched in 1964 and both much more expensive than using a teleprinter. The latter was little more than a CRT screen with a keyboard and needed an expensive display controller to store the data displayed and to connect to a System/360 mainframe.

So here was an opportunity: a standalone CRT based replacement for the teleprinter.

#### “They want a tube in front of them” - The ‘Glass Teletype’

Jon Philip "Phil" Ray was born in 1935, raised in Texas and graduated from the University of Texas. Austin Oliver "Gus" Roche III (‘Gus’ came from the fact that a teacher had misread his first name as ‘Gustin’) was born in Brooklyn, raised in Indianapolis and graduated from Purdue University. The space program brought Ray and Roche together whilst working as contractors for NASA, including on the Saturn V rocket in Florida. By 1968 they believed that their work for NASA would soon be coming to an end and their thoughts turned to what to do next.

Ray would later be described as ‘… a cowboy, an unrestrained Texan’. Roche defied his father as a teenager to learn to fly until one day ‘his father noticed him flying overhead, upside-down, thumbing his nose’. They had risk taking in their blood and so, perhaps inspired by what NASA was achieving, they decided to start their own company.

The two men called Victor D. Poor whom Roche had met a few years earlier whilst working on a missile programme. Roche and Poor had become friends and kept in touch. Poor had started his own electronics firm in Frederick, Maryland and had recently sold it to the Plantronics conglomerate. Poor arranged for Roche to make a trip to California to give, what turned out to be, a disastrous and unfocused fundraising presentation to Plantronics management. Poor ‘read the riot act’ to him telling him to come up with a credible product and challenged by Roche for an example of such a product, Poor came up with:

> Well, I'll give you an example. The Associated Press wants us to make an electronic teletype machine, a machine that would have all the characteristics of a Model 33 Teletype except a CRT instead of paper because they're tired of sitting there banging on these machines all the time. They want a tube in front of them.

[

![](https://substackcdn.com/image/fetch/$s_!37M2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae39fd60-19dd-4bd9-9b19-ccc7d2485f99_1084x461.jpeg)



](https://substackcdn.com/image/fetch/$s_!37M2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fae39fd60-19dd-4bd9-9b19-ccc7d2485f99_1084x461.jpeg)

Poor was familiar with CRT based displays, having used the [Charactron](https://en.wikipedia.org/wiki/Charactron), a device from Convair, that used an ingenious design to show alphanumeric characters on a CRT.

Poor would later say that:

> The glass Teletype was, to me, an off-the-wall example. I did not expect him to build that particular product. I was just trying to get him thinking.

The idea prompted more than thinking from Ray and Roche. With what they thought was a credible product they started looking for investors. They found them in San Antonio, Texas, and soon raised $650,000. They incorporated their company, Computer Terminal Corporation, in July 1968. The pair moved to San Antonio and work started in earnest to make the idea a reality.

Building a ‘glass Teletype’ didn’t just mean creating a device with a keyboard and CRT screen that could connect to a computer. It meant making a product that would emulate the Model 33. That first product would be called the Datapoint 3300, a name chosen to emphasise its compatibility with the Model 33 and, at the same time, suggest that it would be 100 times better.

A ‘100 times improvement’ was something of an exaggeration though. Compared to a Model 33, the 3300 had a few extra features. For instance, control codes could move the cursor up or down a line on its 25-row by 72-column screen, but it wasn't possible to move the cursor to a specific point on the screen.

It’s capabilities were limited by the technology used to make it. It was built with almost two hundred [Transistor-Transistor-Logic](https://en.wikipedia.org/wiki/Transistor%E2%80%93transistor_logic) (TTL) and [Medium Scale Integration](https://en.wikipedia.org/wiki/Integrated_circuit#Medium-scale_integration_%28MSI%29) (MSI) integrated circuits, arranged on seven printed circuit boards. Memory to store the contents of the screen was a particular limitation. Neither [Static](https://en.wikipedia.org/wiki/Static_random-access_memory) nor [Dynamic](https://en.wikipedia.org/wiki/Dynamic_random-access_memory) Random Access Memories were yet available. Instead, they used ‘Shift Registers’ as memory. Shift Registers had one major problem: they were very, very slow. Quoting Ken Shirriff: ‘In a shift register memory, the bits go around and around in a circle, with one bit available at each step. The big disadvantage is that you need to wait for the bit you want to come around, which can take half a millisecond.”

[

![](https://substackcdn.com/image/fetch/$s_!GZik!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1cd49f7d-2094-4e36-b81c-df5b160d96c5_1701x2186.jpeg)



](https://substackcdn.com/image/fetch/$s_!GZik!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1cd49f7d-2094-4e36-b81c-df5b160d96c5_1701x2186.jpeg)

Even if its capabilities were limited, the 3300 was, however, arguably 100 times more stylish than the Teletype machine. Unlike the Model 33, which looked like it would be more at home beneath the decks of a ship, the 3300 would be designed to be an attractive piece of office furniture.

Along with its modern design the 3300 came with modern marketing. Its brochure ends with:

> The only bounds to the effective use of the Datapoint 3300 are the imagination of the user. The Datapoint 3300 has been designed to serve as a data terminal for use by time sharers, regardless of the industry or the application. Its usage can be as general as that of the computer. Any situation in which rapid interactive communication with a remote computer is desirable is one in which the Datapoint 3300 can function effectively. As such, the 3300 will find useful application in all areas of business, science and government.

The 3300, as a drop-in replacement for the Model 33, didn’t really live up to these claims. The next Datapoint design would come much closer.

#### The Datapoint 2200

Ray and Roche kept in contact with Vic Poor as their new company grew. Late in 1969, as the development of the Datapoint 3300 was nearing completion they offered him the role of ‘technical director’ and he moved to San Antonio to join them at CTC.

The 3300 launched and soon started selling ‘like crazy’. Poor would later say:

> … it took off. No question about it. It took off. And it was a perfect match for the blossoming time shared services that were out there. I mean, you know, you had -- GE had pioneered this early time sharing machine that ran on 33 teletype machines. You plug this thing in, now you've got a computer console or what looks like a computer console that's running off the thing and it was just beautiful. And you could run it at tremendous speeds compared to the teletype. You know, they could run it at 2400 baud. I mean, wonderful stuff. They just couldn't make them fast enough.

This soon led to both a problem and an opportunity. Poor commented that the Teletype Model 33 wasn’t the only terminal that users wanted to replace:

> But, there was always a but, they started getting requests from customers, "Well, we want a machine like this..." and this was even before they had sold their first one, "We want a machine like this but we want it to emulate the Burroughs terminal..." something or other or, you know, or the Univac terminal something...

The 3300’s hardware had been dedicated to emulating the Model 33. There was no way that they could use that same approach to create individual models for all these other designs too.

The answer was to create a ‘glass Teletype’ that could be reprogrammed to emulate a range of different terminal designs. A ‘glass Teletype’ with a programmable computer inside it.

Whilst working at his own firm Poor had been making telex switches for firms including RCA and a subsidiary of the United Fruit Company called Tropical Telex, operating in Central America. These systems often involved use of small minicomputers, including the [Interdata](https://en.wikipedia.org/wiki/Interdata) 3 and 4 and the [Hewlett Packard 2114](https://en.wikipedia.org/wiki/HP_2100) and [Computer Control Corporation](https://en.wikipedia.org/wiki/Computer_Control_Company) (the [DDP 116](https://www.computerhistory.org/revolution/minicomputers/11/336/1932) and DDP 516).

> … while we were still at Frederick, Harry and I got it in our heads that we ought to be able to design a simple processor so we didn't have to buy -- these machines were terribly expensive. Just design a simple processor of our own making that we could use for these products and so we started screwing with computer design, came up with a number of ideas. Never did implement anything for Frederick.

‘Harry’ was Harry Pyle who had worked for him in Frederick whist he was still a student at Case Western. Pyle had met Poor whilst he was still at High School as both men were ‘ham radio’ enthusiasts. According to Pyle:

> Poor's mother was part of a missionary service that used jungle aviation to deliver Bibles. They were using ham to send Teletype messages, and they needed some piece of gear, which I built with tubes. Poor was impressed enough to offer me a summer job …

As Poor was moving to CTC, the two men started work to create the computer that would power the next Datapoint terminal. Poor would later say:

> … I was still in Frederick during that Thanksgiving weekend and he came down from Case and the two of us spent, like, the four days in my house working on the design. I'd actually left Frederick, although it was hard to put a date on when you left. Things all kind of ran together but I had actually left Frederick technically … but was still going back cleaning up loose ends every day. Harry came down. We worked on the design for the new product for Datapoint and had it pretty well mapped out and pretty well documented. Interesting enough, all those documents that we created that Thanksgiving weekend included things like the design of the architecture, you know, the flow charts, the instruction sets.

So Poor and Pyle largely mapped out the design for the computer in four days over the 1969 Thanksgiving weekend.

As an aside, it seems that the documentation created over this weekend has been lost into the files of a lawyer involved in the later lawsuit over the invention of the microprocessor, with Poor commenting that:

> So Harry got all this stuff. Then, later on, there were some lawsuits over who invented the chip processor, an idiot sort of thing, and some lawyer borrowed the paperwork from Harry, with all this documentation, said he would make copies and give it back. He never gave it back. Harry could never retrieve it and it disappeared into some lawyer's file or god knows where so...

As with the Datapoint 3300, Roche and Ray had strong ideas about what the new product - which would be known as the Datapoint 2200 - should look like, and in particular that it should fit into an office environment:

> And we kind of merged what Harry and I had done with what they wanted. … They said they wanted a machine that had the same footprint exactly as a Selectric typewriter, the same keyboard layout as a Selectric typewriter, the same feel. They wanted a screen that had the same dimensions for character size and spacing as the type on a Selectric typewriter. In other words, they wanted this to drop in place wherever - on somebody's desk wherever a Selectric typewriter -- they didn't want it any taller than a Selectric typewriter. So we ended up with this -- I don't know if you've ever seen a 2200. That was the - -well, if you set that side by side with a Selectric typewriter, they were the same dimensions.

[

![](https://substackcdn.com/image/fetch/$s_!Jyhr!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc0b2123f-1e85-43e3-b223-80c256507316_1477x1080.jpeg)



](https://substackcdn.com/image/fetch/$s_!Jyhr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc0b2123f-1e85-43e3-b223-80c256507316_1477x1080.jpeg)
*Datapoint 2200 : By KenShirriff - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=135888272*

The Datapoint 2200 would again be constructed using TTL and MSI components. Squeezing this into a Selectric typewriter sized box would be a challenge. Ray and Roche had an answer: reduce the number of chips needed to implement the processor using more MSI components or perhaps even using the newly emerging [Large Scale Integration](https://en.wikipedia.org/wiki/Integrated_circuit#Large-scale_integration_%28LSI%29) (LSI) technology with 500 or more transistors per chip.

Who might create these LSI chips? CTC was now buying shift-register memory in quantity from an innovative new company in California. That company was Intel.

#### The Datapoint 2200 - The Architecture

Before we move to Intel role in this story, though, let’s look at the architecture of the Datapoint 2200’s processor.

Poor and Pyle were trying to create a computer that was as small as possible whilst being powerful enough to power their glass Teletype. They did not view it as a ‘general purpose’ computer. Pyle would say:

> … it was clear that our minds were kind of going down this track of a communications controller, not a general purpose computer. The general purpose computers were still the big things back up in the clouds somewhere. And so I remember doodling out some instruction set stuff and Vic had some ideas. And I tried to generalize it a little bit.

##### Registers and Flags

The design had seven 8-bit registers - A,B,C,D,E,H and L plus a 13-bit program counter that allowed it to address 8K Bytes of memory, although the basic 2200 was shipped with just 2K Bytes. In addition, there were four single-bit ‘flags’ that were set depending on the results of an arithmetic or logical operation - these were Z(ero), C(arry), N(egative) and P(arity). The latter was set if there was an odd number of ‘1’ bits in the accumulator, a useful feature for checking the validity of data transmitted to a terminal.

Why was 8-bits chosen for the register size? The Datapoint 2200 would mainly be manipulating character data and designs such as the Teletype Model 33 were using ASCII encoding which needed at least 7 bits. So, 8 bits was enough, and any more than 8 bits would have been overkill.

##### Instruction Set - Arithmetic and Logic

What about the instruction set (or as the manual calls it the ‘instruction repertoire’)? Today’s x86 designs have a reputation for complexity but the first Datapoint was quite simple. This simplicity was necessary, as Poor and Pyle had a strictly limited transistor ‘budget’.

The processor would start to decide what the instruction meant (to decode the instruction) using the two most significant bits of the first byte of the instruction.

If those two bits were ’10’ then the instruction performed an arithmetic or logical instruction involving two registers. The remaining six bits ‘AAASSS’ defined the operation (in ‘AAA’ from one of “Add”, “Add with Carry”, “Subtract”, “Subtract with Borrow”, logical “Or”, “And” or “Exclusive Or”, or “Compare”) and the 8-bit source (‘SSS’ - one of the registers A,B,C,D,E,H or L or the contents of the memory address pointed to by H (High) and L (Low) combined ) that was used together with the contents of the A register.

Each instruction got its own three letter mnemonic, for example:

`SUD`

for ‘SUbtract D’ would subtract the D register from the A register and place the results in A.

##### Instruction Set - Data Movement

If the most significant bits of an instruction were ’11’ then it was a data movement operation. The remaining six bits ‘DDDSSS’ specified the destination (‘DDD’) and source (‘SSS’) in each case one of the seven registers or the memory location pointed to by H and L.

For example, the instruction with the mnemonic:

`LAH`

for ‘Load A with H’ would load the A register with the contents of the H register.

##### Instruction Set - Control Flow

The remaining 128 opcodes included instructions that changed the location of the program counter including with one unconditional and eight conditional - depending on the value in one of the four flag bits - JUMP instructions. The target for the JUMP was the address specified by the two bytes that followed the opcode in memory.

There was a give and take, for example, on whether the 2200 would have a subroutine ‘call stack’ : a mechanism that would store return addresses after a program made a call to a subroutine. Poor’s original idea was:

> … just have a register you can set some bits in. So you jump to this location, it’ll execute, then it’ll actually look at this register; figure out which one of the bits was set and return to a fixed location, depending on which one those it was. So, you had some fixed number of places you could call the routine from, because the routine would return to one of these fixed number of places. And I said, “Well, that’s certainly a novel idea, but how about if we put a call stack in the machine?” …

So the design gained a call stack, but one that could only hold 15 addresses. To make use of the call stack there were one unconditional and eight conditional CALL instructions. Again, the target for the CALL was the address specified by the two bytes that followed the opcode in memory. Returning from a subroutine was done via one unconditional and six conditional subroutine RETURN instructions.

##### Instruction Set - Other

The remaining opcodes also included:

-   Eight 8-bit arithmetic and logic operations using an 8-bit immediate value - the next byte in the program code - as one source and the A register as the second source and destination.
    
-   The ability to load an 8-bit register with an 8-bit immediate value - again the byte following the opcode.
    
-   ’Shift A register left or right one bit circular’ instructions.
    
-   Three HALT and one NOP (no-operation) instructions.
    
-   Miscellaneous specialised input and output operations related to the Datapoint 2200’s hardware.
    

Leaving many of the remaining 8-bit opcodes unused.

A diagram summarising the instructions, based on their opcodes is included below (thanks to Ken Shirriff for the colour coding idea).

[

![](https://substackcdn.com/image/fetch/$s_!JVjv!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1e2aad9-cdfa-471e-b25b-a240c8205b50_2062x950.jpeg)



](https://substackcdn.com/image/fetch/$s_!JVjv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1e2aad9-cdfa-471e-b25b-a240c8205b50_2062x950.jpeg)

And that was it, concise and relatively elegant. Poor and Pyle may not have been trying to create a ‘general purpose’ computer, but their design was probably about as versatile as they could probably have achieved given the resources they had available.

There were some interesting omissions and quirks. There were no instructions to push arbitrary registers (aside from the Program Counter) onto the stack. The stack itself was distinct from main memory and constructed as part of the processor.

##### Implementation

So much for the instruction set, but how was it, and the rest of the 2200’s design implemented?

The first 2200 would be a ‘bit serial’ computer. That meant that all the operations would take place one bit at a time. So, for example, an 8-bit logical ‘AND’ operation would take place in eight distinct ‘one bit’ steps one after another. This approach would also reduce the number of components needed to implement the design.

The 2200 would also use ’shift registers’ for main memory in order to keep costs down.

Wasn’t this all unusably slow? Surprisingly no, as the TTL chips used were fast enough to make the design useable given the low terminal data transfer rates that the 2200 would need to process. A simple arithmetic operation took 16 microseconds.

There were some constraints from the need to use ’shift register’ memory. Accessing an arbitrary byte within memory was potentially unbearably slow, as the processor had to wait for the shift register memory to deliver the required byte. However, Pyle and Poor had compensated for this by including lots of registers, more than many much more expensive contemporary minicomputers, in order to reduce the frequency with which the Datapoint machine would need to access memory.

##### The Legacy of the Datapoint 2200

Key features of that first design can be seen in the latest Intel and AMD x86 processors. Modern x86 designs aren’t ‘binary’ code compatible with the Datapoint: you can’t just pass Datapoint 2200 machine code to an x86 design and expect it run. However, x86 designs have features that can be traced back to that original Datapoint design[1](#footnote-1). x86 is ‘little endian’ (a term taken from ‘Gulliver’s Travels meaning that the least significant byte of two or more is stored first) because the Datapoint 2200 was. We’ll see how the Datapoint 2200 instruction set would morph into the first x86 designs in later posts.

\---

Next, Datapoint meet with Intel. The response wasn’t quite what they wanted.

#### “We’re in here for quantity, not anything exotic. We really aren't that interested.”

Subscribe here to get the next part of this story in your inbox.

And become a paid supported for more discussion and further reading after the paywall.

[Read more](https://thechipletter.substack.com/p/personal-computer-origins-the-datapoint)