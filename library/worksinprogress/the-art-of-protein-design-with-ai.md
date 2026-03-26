---
title: "The art of protein design with AI"
author: "Various"
publication: "Works in Progress"
publication_slug: "worksinprogress"
published_at: "2025-10-15T15:02:25.000Z"
source_url: "https://www.worksinprogress.news/p/the-art-of-protein-design-with-ai"
word_count: 9505
estimated_read_time: 48
---

**What if you could design a protein never seen in nature?** In this episode of Hard Drugs, and explore how researchers are using new tools like RFDiffusion, AlphaFold, and ProteinMPNN to ‘hallucinate’ entirely novel proteins: designing them from scratch to solve problems evolution hasn’t tackled. They talk about how these technologies could transform medicine, agriculture, and materials science. Along the way, they reflect on the surprising ways AI is changing the process of science itself.

01:12 Why build proteins nature never made?  
06:33 Designing a hepatitis B-blocking protein from scratch  
12:47 Hallucinating new proteins with diffusion models  
18:20 AlphaFold changes everything  
28:10 How AI models design and test proteins  
32:33 What AI still can’t predict about proteins  
40:45 From computer-made proteins to real-world drugs  
44:33 Protein Lego: building shapes, tubes, and scaffolds  
49:45 The future of AI protein design

Hard Drugs is a new podcast from Works in Progress and Open Philanthropy about medical innovation presented by Saloni Dattani and Jacob Trefethen.

You can watch or listen on [YouTube](https://youtu.be/DKnxdgf1vNs), [Spotify](https://open.spotify.com/episode/1xVgNa7UOj7p5Hv472luwX?si=266abbe4ce4b40a9), or [Apple Podcasts](https://podcasts.apple.com/us/podcast/the-art-of-protein-design-with-ai/id1819488714?i=1000731901531).

Saloni’s substack newsletter: [https://scientificdiscovery.dev](https://scientificdiscovery.dev)

Jacob’s blog: [https://blog.jacobtrefethen.com/](https://blog.jacobtrefethen.com/)

Courses:

-   EMBL-EBI. AlphaFold: A practical guide [https://www.ebi.ac.uk/training/online/courses/alphafold/](https://www.ebi.ac.uk/training/online/courses/alphafold/)
    

Articles:

-   Tanja Kortemme (2024) De novo protein design—From new structures to programmable functions [https://www.cell.com/cell/fulltext/S0092-8674(23)01402-2](https://www.cell.com/cell/fulltext/S0092-8674\(23\)01402-2)
    
-   Jie Zhu et al. (2021) Protein Assembly by Design [https://pubs.acs.org/doi/10.1021/acs.chemrev.1c00308](https://pubs.acs.org/doi/10.1021/acs.chemrev.1c00308)
    

Lectures:

-   Rosetta Commons (2024) Diffusion models for protein structure generation (and design) [https://www.youtube.com/watch?v=OEnY2yA3jy8](https://www.youtube.com/watch?v=OEnY2yA3jy8)
    

-   Rosetta Commons (2024) AlphaFold – ML for protein structure prediction [https://www.youtube.com/watch?v=SVrn8\_8aKO8](https://www.youtube.com/watch?v=SVrn8_8aKO8)
    

-   Rosetta Commons (2024) MPNN – ML for protein sequence design [https://www.youtube.com/watch?v=6z4XmUAwdNA](https://www.youtube.com/watch?v=6z4XmUAwdNA)
    

Acknowledgements:

-   Aria Babu, editor at Works in Progress
    
-   Graham Bessellieu, video editor
    
-   Rachel Shu, on-site editor
    
-   Anna Magpie, fact-checking
    
-   Abhishaike Mahajan, cover art
    
-   Atalanta Arden-Miller, art direction
    
-   David Hackett, composer
    

Works in Progress & Open Philanthropy

\---

### Transcript

Jacob Trefethen:

I think the starting gun is basically 2022. What we’re gonna see, I believe, if people put the effort in is a lot of structural biologists who know how to use these computational tools, matching up with experts in particular fields who know a lot about diagnostics, or who know a lot about the heart, or who know a lot about a given infectious disease, or know a lot about a given agricultural problem, and in combination, I think those teams of people are gonna do really incredible things.

Saloni Dattani:

Alright. Well, we’ve talked about proteins, all the cool stuff proteins can do. We’ve talked about the history of insulin, one of the protein treatments used in treating diabetes. We then talked about improving proteins with AI, to be used in medicine. Now I wanna hear from you about how we can design entirely new proteins that have never been seen in nature. But first, why would we want to do that?

Jacob Trefethen:

Nature’s great and I’ve got nothing against it.

Saloni Dattani:

Mm-hmm.

Jacob Trefethen:

But some-

Saloni Dattani:

I have some things against it. Like, I don’t know, natural disasters, tornadoes...

Jacob Trefethen:

Tooth and claw.

Saloni Dattani:

... mosquitoes.

Jacob Trefethen:

Yeah. Mosquitoes, gosh. Some of them, I guess, are harmless, but some of the others... Okay. Nature’s not perfect, but nature’s so good when there’s a problem that evolution’s really taken a swing at. But there are many problems that face us, as humans, as a society, as a planet, that nature’s not - in the same sense - been evolving to try and solve. So, for example, plastic famously is not biodegradable.

Saloni Dattani:

Right.

Jacob Trefethen:

So nature’s not doing, in the sense of bio, ain’t doing much degrading.

Saloni Dattani:

But what if something could digest it?

Jacob Trefethen:

Exactly. Could you design something with that problem in mind, to try and digest it and get rid of all that plastic currently in the ocean?

Saloni Dattani:

Could we get a PacMan to eat all those little blobs?

Jacob Trefethen:

You know, there’s also these pathogens that we had talked about last episode, one of. But some of them we haven’t been able yet to - either our body in terms of our immune system or drug development - has not yet been able to make drugs actually work well enough.

If you could create a protein that operated as a therapeutic, as a drug, and you just created it out of thin air and you never saw anything like it before, then could be really useful.

Saloni Dattani:

I think there maybe also lots of uses outside of medicine. I recently learned that silk is a protein. And we talked about gluten in bread, that is a protein. There are all these proteins that are also doing these like structural things - they’re stretchy, or they’re super strong, or they’re really silky and smooth. Maybe for other purposes, like materials or industry, you could want lots of proteins. Maybe there are other things in industry as well, like maybe you wanna cook something, you want to ferment something in a way that’s never been done before.

Jacob Trefethen:

Mm-hmm.

Saloni Dattani:

You might want a protein; you might want an enzyme to do that for you.

Jacob Trefethen:

Yeah.

Saloni Dattani:

And then, what else? Maybe there are just a bunch of chemical reactions that you wanna do-

Jacob Trefethen:

Oh, totally.

Saloni Dattani:

\-but at a really small scale, and you want to do them all at once, and you want a protein to do all of those steps of the enzyme reaction, and you could create a new protein.

Or maybe you want to create a protein that does like a bunch of different things: a protein that’s in a hot environment, it’s gonna do one thing, cold environment, it’s gonna do something else; that tunes the protein and what it’s working on.

Jacob Trefethen:

I also wanna just get energy. I mean, this-

Saloni Dattani:

To eat?

Jacob Trefethen:

To eat, to do cool stuff with, like photosynthesis. One of the main ways-

Saloni Dattani:

You want to do photosynthesis?

Jacob Trefethen:

I want to do photosynthesis.

Saloni Dattani:

Would that turn you green?

Jacob Trefethen:

By the time I succeed, I may have worse problems. I just feel like photosynthesis... I don’t mean to criticise plants, but I’ve always found it very inefficient. You’ve got so much sunlight beating down; hardly any of it gets turned into biomass, or like 1%.

Saloni Dattani:

I didn’t know that.

Jacob Trefethen:

Oh yeah, hardly any, hardly any. And you know, there’s probably some deep reasons for that. But could we design new proteins? Not just like RuBisCO that you mentioned in the first episode, but even better ones.

Saloni Dattani:

Right. So proteins are used to get carbon from the air, they’re also used to getting nitrogen from the air, right? To fix nitrogen. And so you could be trying to improve some of these processes to get stuff from the air.

Jacob Trefethen:

Yeah.

Saloni Dattani:

You could be trying to improve agricultural yields or products that we eat. What else? Maybe you would be trying to purify water. Trying to make new biofuels.

Jacob Trefethen:

Oh wow, purify water, huh?

Saloni Dattani:

Ooh, I feel like there’s just so many, so many things. Yeah, purify water; you could get rid of- maybe the proteins are really specific and they attach to dirt or something.

Jacob Trefethen:

Oh, okay.

Saloni Dattani:

And they eat them up.

Jacob Trefethen:

Okay. I eat your dirt. I eat it up! I think that everything we just described sounds wonderful, but sounds a bit magical. So how would you actually go about achieving a protein if you’re not modelling it off of something in nature?

Saloni Dattani:

Well, a lot of the things we described actually happen. They already happen in nature.

Jacob Trefethen:

That’s a good point.

Saloni Dattani:

Maybe we just want to adapt how they happen. We want to make the silk stronger, or we wanna make the gluten stretchier. Or we want to make the silk stretchy, and the gluten stronger.

Jacob Trefethen:

Or we wanna make the dirt dirtier. I hadn’t thought- Fair enough, fair enough. I think we still need a way to invent these proteins though.

Saloni Dattani:

Mm-hmm. And maybe you want to make stuff that exists but is not protein, but you want to make it protein; you want to make it biodegradable or something. Like, I don’t know, you want a flower vase that is made of proteins or something, and so you could probably make things like that with proteins if you wanted.

Jacob Trefethen:

I want to tell you about the next thing I did when I visited the University of Washington.

Saloni Dattani:

When did you visit the University of Washington? What were you doing there?

Jacob Trefethen:

I was there in March and in the last episode I talked about how I was working on a protein on the Strep A bacteria. I want to talk to you about my next project, which was designing a drug against a hepatitis B protein.

Saloni Dattani:

Ooh, wait, so you’re designing a drug, not a protein?

Jacob Trefethen:

Well, the protein is a drug; no, the drug is a protein.

Saloni Dattani:

What??

Jacob Trefethen:

I know! By drug, I just mean in this context, a binder; something that binds really tightly.

Saloni Dattani:

Okay.

Jacob Trefethen:

So before, in the last example, I was talking about taking an existing protein that exists in nature and tweaking it a bit. Here I’m talking about hallucinating... an entirely new protein... that has no previous instantiation, necessarily, in the world... using just... a diffusion model.

Saloni Dattani:

Ooh.

Jacob Trefethen:

So you, you seen DALL-E made by OpenAI?

Saloni Dattani:

I have made some cartoons with it.

Jacob Trefethen:

Nice. What about stable diffusion and-

Saloni Dattani:

No.

Jacob Trefethen:

What about...

Saloni Dattani:

... Midjourney?

Jacob Trefethen:

Thank you! Midjourney, oh yeah. What about Midjourney? I mean, those have gotten really good these days. So imagine, I’m speaking a bit loosely here, but not that loosely, that instead of hallucinating cat pictures, you started hallucinating a protein structure.

Saloni Dattani:

You know, when I was in school and I was learning how to play the piano and at the end of school, when I was like 16 or so, well, I was doing like the grades of piano, qualifying for them. And there was this one exam that you had to do where you had to play the scales, regardless of where the examiner told you to start.

Jacob Trefethen:

Oh, okay.

Saloni Dattani:

And I remember being really bad at that. Because you have to remember where your fingers go, like which order, you know? Do you use your third finger at this point or do you switch back to your thumb? And I got so stressed out by this whole situation that I would literally start dreaming of myself playing the scales at different points. And it was very-

Jacob Trefethen:

Correctly?

Saloni Dattani:

\-it was genuinely helpful.

Jacob Trefethen:

Oh!

Saloni Dattani:

Yeah.

Jacob Trefethen:

Hallucinations can be helpful, and you can actually use a few AI systems in a “design, create and validation” loop to get to new proteins that might be useful.

Saloni Dattani:

Wait, wait, wait. What does this mean? Okay so, you said that you’re making a binder. So you are trying to make a protein that sticks to another protein.

Jacob Trefethen:

Yes.

Saloni Dattani:

To do what?

Jacob Trefethen:

Yes, in this case... Lots of functions begin by sticking, let me just say that to begin with. But in this case, the reason I want to stick is that I want to bind a part of hepatitis B to interrupt its life cycle, so it stops damn replicating in my liver cells.

Saloni Dattani:

You’re like, shut up, stop!

Jacob Trefethen:

Shut up! Stop! Yes. So actually I went after a little disgust protein called-

Saloni Dattani:

What? Wait, what is a disgust protein? What did you just say?!

Jacob Trefethen:

You know, everyone talks about the hepatitis B surface antigen. I’ve never-

Saloni Dattani:

I’m sorry, I’ve never heard someone talk about this. I know about it because it’s used in the malaria vaccine, right?

Jacob Trefethen:

Oh that’s absolutely true, yes.

Saloni Dattani:

But why is everyone talking about this around you?

Jacob Trefethen:

Okay, let’s do a quick side note on the- Okay, firstly, I love that you tried to say you don’t hear people talk about it, and literally you talk about it all the time. You immediately started talking about it-

Saloni Dattani:

Well, I read about it - I’ve never heard someone talk about it.

Jacob Trefethen:

Well, now’s the moment.

Saloni Dattani:

I have normal friends.

Jacob Trefethen:

I know for a fact that that is not true. Especially given I’m one of them. Okay, so let’s do a detour on the malaria vaccine ‘cause that is fascinating. The original idea is you take the hepatitis B surface antigen, which happens to self-assemble into this kind of spherical thing.

Saloni Dattani:

Particle, yeah.

Jacob Trefethen:

And that’s pretty useful because, you know, the immune system’s good at looking at spherical things and being like: “That’s a virus, kill it.” And if you can lace that spherical thing with antigens from the malaria parasite, then inject those - oh boy, we’re in business.

Saloni Dattani:

Yeah.

Jacob Trefethen:

Yeah. That’s a cool idea.

Saloni Dattani:

Right? But it’s like if I was trying to detect you and your face, even if you were wearing a wig, I should still be able to recognise you, because that’s really important.

Jacob Trefethen:

Right. I like how most of our metaphors end up with you assassinating me. So hepatitis B surface antigen, it’s the rage, everyone is always on about it, as we now fully agree. The issue is, you know, the drugs for hepatitis B are pretty good, in that you definitely want to know if you have a chronic infection because you can go on nucleoside analogues - they will help you control the infection.

They won’t cure you though, so the drugs aren’t good enough to cure you yet, although many people are working on that. So I was like, you know, let’s go for the jugular. What can you do to really get rid of this thing? The hypothesis is that if you create a protein drug that binds really tightly to this other antigen that’s actually in the middle of the life cycle, which is called... the X antigen...

Saloni Dattani:

Alright. This is very scary.

Jacob Trefethen:

It’s very scary. But the X antigen, it forms as two parts – a dimer – that come together and then start doing stuff. So I was like, okay, I’m gonna hallucinate a protein that interrupts that dimer formation. Can I distract it, get it to bind?

Saloni Dattani:

Right. So you’re imagining what might fit into the little gap between these two parts of the protein.

Jacob Trefethen:

Yeah and I used this tool, RFDiffusion, which is a particular diffusion model made, again, at the Baker lab at the Institute for Protein Design; there are other diffusion models being made too. The “RF” there stands for Rosetta Fold, which is the family of models that they’ve worked on up there for a while.

So what I’m doing there, I’m giving the computer just a few inputs of what I’m attempting to do; asking it to hallucinate many options.

Saloni Dattani:

I saw a video about this and it featured a lot of cats, and I think you mentioned some of these cats before.

It’s a bit like DALL-E, and I didn’t even know how DALL-E worked, how it was developed and stuff. But the basic idea is you have a bunch of pictures of cats or something, and you introduce some noise into that image.

Jacob Trefethen:

Right.

Saloni Dattani:

Or maybe you’re making-

Jacob Trefethen:

It’s more pixelated.

Saloni Dattani:

Yeah, more pixelated, or you just introduce random little pixels that are different colours or something, and you introduce some of that, and then you do that again. You make it even more noisy, and then you make it even more noisy, so you have different versions of the same image that are progressively noisier.

And what you’re trying to do is get the image model to try to figure out how to go backwards, how to get from the noisy version to the clearer version to the clearer version to the cats.

Jacob Trefethen:

\[sound effects\]

Saloni Dattani:

And this was really funny because I was watching this video and you know, if you input a cat, you’ve made it noisier, noisier, noisier, and then you’re telling the AI, “Okay, now try to predict what happened before. What did it look like before I added this noise?” And it’s like: slightly less noisy, slightly less noisy, and then it’s a dog. And you’re like, “Wait, that’s not right!” And you just keep doing this until it gets better and better at predicting what the image is.

Saloni Dattani:

And then what’s happening with the protein version of that, which you described as RFDiffusion, is that instead of having an image with noise that’s the little pixels, you instead have the coordinates of the atoms in the protein, and then you introduce a little bit of jiggle, like you mess up the coordinates a little bit.

I think in this case, they add some Gaussian noise, right? So they move it by- basically most of the time, it moves by some average amount, but sometimes it moves to a more extreme amount and stuff like that. Then each time you’re making it blurry and blurrier, and messing it up more and more, and then you’re asking the AI tool, RFDiffusion, can you go backwards and remake the protein? And then obviously, there are issues with doing that still, it’s not gonna be very accurate.

But in this case, it could be a good thing that it’s not accurate ‘cause you’re creating whole new structures that you haven’t seen before, and some of those structures might be useful for other purposes.

Why would you also want to hallucinate something that doesn’t exist? Maybe there are just so many more potential ways that a protein could fit together that have never been seen in nature before.

Instead of a cat with one head, what would it look like if this cat had three heads or something?

Jacob Trefethen:

You know, let me just describe the loop you can then go in. What RFDiffusion — which was made by this group at the Baker lab and the Institute for Protein Design, Helen Eisenach and others made it — well, you can generate these different hallucinated structures. So this is, again, think about a 3D model of: Where is this protein backbone?

What you don’t have is the sequence, so you remember from last time that you can go from structure to sequence using ProteinMPNN, so a different model? So I’m going step one, hallucinate; step two, okay, hold on, what sequences would actually lead to those solutions?

Saloni Dattani:

So what structure would fit in between the gap? And then how do we make that structure?

Jacob Trefethen:

Exactly, and then you’re going to want to do the validation with- or the first in-silico step of validation with AlphaFold.

Saloni Dattani:

And that is basically: if I make this amino acid, does it actually make the structure that fits into the little gap?

Jacob Trefethen:

Yes, I have these ideas for the amino acid sequences, but in reality, is it gonna fold up to look like that? What you’re going to end up with, at the end of this three step chain, is you’re going to end up with some hypotheses.

And AlphaFold’s going to say, look, I’m sorry, some of these are not what you thought. It’s pretty unlikely that that amino acid is the one that will lead to the thing you want. It’s pretty unlikely that the distance between these two randomly selected amino acids is gonna, after folding, actually be where you thought it was. So you want to ditch the ones that you actually accidentally messed up on the way.

Jacob Trefethen:

AlphaFold, AlphaFold, AlphaFold.

Saloni Dattani:

Yes.

Jacob Trefethen:

We should probably explain a little bit about why that was a breakthrough, how that came about, what was actually happening with protein folding before.

Saloni Dattani:

Mm-hmm. So I think I described, at some point, the fact that people used to be using physical models to predict what protein structures were like. So sometimes they had the structure in mind, and they were trying to figure out what amino acid sequence goes into that. How do the amino acids look if we make them in physical structure, with a model, with a real life model.

I think after that were these statistical models that were produced with different types of information — so you might have some data about each amino acid, what kind of features it has, how it interacts with other amino acids. Another thing that you would have is data on the amino acid sequence for a particular protein, but in different organisms. So you might have: What does insulin look like in chimpanzees? What does insulin look like in pigs? Et cetera, et cetera.

Jacob Trefethen:

Yep.

Saloni Dattani:

And by comparing all of these versions of the same protein — the different amino acid sequences for the same protein in the different organisms — you can see which parts are shared. So you can see which bits are basically in the same- or are shared between all of them, and that tells you something about the important structures that are kept in the same shape.

But it can also tell you something else. It can also tell you if some parts of the structure are changing, do other parts of the sequence also change along with it? So if leucine always changes here- whenever leucine changes here, then alanine always changes there- or often changes there, or something. And with these comparisons, of having a pair of a comparison, can tell you a little bit. The reason this is important is it means that they probably interact – that they’re probably close together in this 3D shape of the protein – and that is useful information.

Another thing that you might know is, you might have some information on secondary structures of proteins, and what that means is, in specific parts of the 3D shape, what is going on? Is there a little helix? Are there two parallel lines or something? And how does that map onto the amino acid sequence? So if you have a bunch of this information, you can try to predict what the structure would be like.

So there were people who were working on some of these models for a while and they were making some gradual improvements.

Jacob Trefethen:

Structural biologists?

Saloni Dattani:

Yeah! Uh... no. No? The structural biologists are figuring out- they’re determining the sequence by using crystallography or cryo-EM or something like that, right? Whereas what I’m saying is, can you predict it computationally?

Jacob Trefethen:

You think those were different people in computer science departments or-

Saloni Dattani:

Maybe it was some of the same-? Yeah, I mean, it’s different tools, but when I think of structural biology, I usually think of the imaging and stuff.

Jacob Trefethen:

Yeah.

Saloni Dattani:

Okay. But people are making a little bit of progress, but the predictions are still not very good, and that continued for a long time. Also there are people who are saying, “Oh, my model is really good. My model is better than yours.” And there’s no benchmark, or there’s no reference, to compare them.

What happened was, in 1994, is that right, at UC Davis, people developed a competition and they said, okay, some crystallographers have actually figured out what the structures of these previously unknown proteins looks like, and we’re not gonna tell you what that structure looks like.

Jacob Trefethen:

Okay. But that’s real. That’s documented. Not a prediction.

Saloni Dattani:

Yeah, that’s documented, that’s determined in the lab. But we will tell you the sequence of amino acids, and you have to guess what the shape is like. So now you have this very standard comparison, where you can give all of the different research groups this amino acid sequence and say, “Hey, can you guess what it looks like?”

So they came together for this competition – CASP – that was set up in 1994, and they were given a bunch of amino acid sequences, and told to predict the structure, and then you could compare how good their predictions were.

Jacob Trefethen:

Yeah, that’s the real thing.

Saloni Dattani:

And so I think until, what is it, decades, there are some gradual improvements, but basically the accuracy is under 50% generally, on average. That accuracy is about, you know, how far away are the coordinates that people are predicting of the atoms to the real structure.

And then in 2020, DeepMind released AlphaFold2, which was this model that not only used that data, but it also used structural data from a dataset called Protein Data Bank. So people had already determined this structure from x-ray studies and blablabla. They had collected lots of this data on like, if we have this amino acid sequence, this is what the protein structure looks like; and they had done this for hundreds of thousands of proteins, right?

Jacob Trefethen:

Yeah.

Saloni Dattani:

And AlphaFold was trained on all of this data, so it has a connection directly between the amino acid sequence and the structure, and that means that they were able to make a much better prediction and their prediction was so much higher, it was around 90% accuracy on average, for the particular proteins that they were asked to determine. There’s still stuff that it can’t predict even now, and there was still stuff that it couldn’t predict then, but that was an amazing- a huge leap.

Jacob Trefethen:

That’s like a game changer. Yeah.

Saloni Dattani:

Yeah.

Jacob Trefethen:

Because if you can go from the number of proteins that us mere human beings had crystallised over the last 50 years, so maybe that’s 200,000, and you suddenly have a tool that can predict pretty well a lot of proteins; I mean, you can predict how millions of proteins fold without having to crystallise them. You’re not totally sure, but you are, it gets you so far.

Saloni Dattani:

Right. It’s doing better on proteins that look similar to other proteins that people have determined in the lab, and it’s doing worse on ones that, where there’s hardly anything to go on. And also, in particular areas of the protein, some domains, are going to be determined quite well because there’s lots of data on them already; some are gonna be predicted much worse. But yeah, that’s the story.

Jacob Trefethen:

It reminds me a bit of these other parts of machine learning, before the deep learning revolution – well I don’t know if I’d even phrase it that way, but before the “shove loads of compute at it” revolution – where you had these computer vision grad students who were writing these algorithms for edge detection and trying to understand what’s in an image with all these clever algorithms, and then, sure enough, you just sweep through with a ton of compute.

A particular architecture, you can learn all that stuff without having to, yourself, get that specialised about it. And I imagine a lot of people who are working on these physics-based models, these other models before AlphaFold, that probably are quite intricate, are a bit like, “Oh my gosh, what? Like, I was working so hard on this subset of proteins; on this type of- when this alpha helices looked like this together, you know, all that. And lo and behold, I was, I got blown out of the water by a bigger machine.”

Saloni Dattani:

I think it’s also- maybe at the start, when people are building these physics-based models, they have this textbook understanding of some parts of the process; they have some training and expertise over many years that they’ve learned of what might fit together and stuff like that. But it’s really hard to consider how all of that works on a grander scale, on a larger protein, especially when it’s types of proteins that you might not have come across.

Obviously there’s hundreds of thousands, there’s so many types of proteins, right. So even when you have someone with the expertise, going from that to a statistical model can add value. And that was what came before AlphaFold. And AlphaFold is also, in a way, it is a statistical model where it’s learning from someone of this data and it’s predicting things better, and part of the reason is not only does it have that information about like particular amino acids, but it also has lots of structures that it’s remembered, and that’s very hard for a person to do, or a statistical model.

Jacob Trefethen:

A puny statistical model.

Saloni Dattani:

Right? Yep. So let me do a quick recap of all of the tools just to see if I remembered them right. So we first have AlphaFold, that’s maybe the most famous one, that people would know about. And that does: you have the amino acid sequence and you’re asking “What structure does this make if it was a protein?”

And then you have ProteinMPNN, which is the opposite: “I have the structure, what amino acid sequence makes that structure?”

Jacob Trefethen:

Exactly.

Saloni Dattani:

And then you have thirdly, RFDiffusion, which is, “given that I have some bits of the structure, can you make the full structure- or I want this protein to have these things. Can you make the full thing for me? Can you make a full thing that could be a protein?”

But then you need to check that that actually happens. “Does the protein actually fold that way? What is the amino acid sequence that makes that protein? If you had that amino acid sequence, does it actually fold into that protein?” And the reason that I guess that’s really important is because there are so many potential combinations, right?

Jacob Trefethen:

Oh yeah.

Saloni Dattani:

There are 20 different amino acids, so at any part of the chain there could be one of 20 things. And if you add those up, I think if you get- if you get a protein that is like 60 something amino acids long, the number of combinations is already bigger than the number of atoms in the universe – that’s the estimate – which is a huge amount.

So you want to make sure, is that the right structure, and is this structure going to fold into that particular shape? And that’s also hard because there are many potential ways that a protein could be folding, because there’s so many different amino acids at different places. It could just fold into a different shape or confirmation.

But I think there’s also this question of: what is the structure that it will fold into, given that it wants to reduce the amount of energy that’s required to keep in that position? So it wants to go down the easy route. But then, there might be many easy routes, right? And there might be multiple different ways that a protein folds. But in reality, it usually only folds a particular way, I think. So that was my recap.

Jacob Trefethen:

That’s a great recap. And I think the real practical output of what you’re saying about the combinatorics – it used to be the case if you had hypothesis molecules, whether they were protein binders or small molecules or something, that you were trying to achieve some function, so you were trying to bind this hepatitis B thing or whatever - you might have to run through high throughput screening; you might have to have a hundred thousand different miniature experiments of a hundred thousand different hypothesis molecules, because most just will not do what you want.

And what’s astonishing about this loop of three systems that we just described is that, for proteins at least, you can go through the loop, do the “down selection” on your computer, and once you’ve got it set up and running, I literally did that in a day.

Once it’s set up and running, it was based off of not only all the work of people building those models, but also being next to extremely helpful other postdocs and grad students who would share their Jupyter notebooks with me and show me how to do it.

But you know, you can create hypotheses, some of which do work, and you only need tens of them. So they work for the initial in-lab validation step. They don’t necessarily work as actual drugs in the field, once you go through all the future steps of getting through humans, but you don’t necessarily need a hundred thousand things, you could actually try 50 and maybe 4 will work. And that is completely different than it was literally five years ago.

Saloni Dattani:

Right. That’s crazy.

Jacob Trefethen:

Crazy.

Saloni Dattani:

I also, I have two thoughts.. or one question. One is, I think you mentioned something about the errors and how well it’s predicting stuff - is that with AlphaFold? So you’re predicting the structure from the amino acid sequence. And the question is: How well does this map onto what the protein actually looks like? And what is its real structure like? So what you’re comparing is, at each particular atom even, how far away is that, in coordinates to the atom in the real structure?

Jacob Trefethen:

Well, yes, my understanding is that what AlphaFold is giving you is its own, if you will, subjective predicted error versus reality. So you’re not actually ground truthing a lot of it.

Saloni Dattani:

But you could.

Jacob Trefethen:

You could in theory, well if you are able to crystallize a protein you can do that, but for some proteins you simply can’t do it.

Saloni Dattani:

Yeah, so you have confidence or error or something, but that is not just of the shape as a whole, it’s also about at each atom, how confident is AlphaFold that it’s got that position right.

Jacob Trefethen:

Yep.

Saloni Dattani:

And I think that’s really interesting because maybe there are certain domains of a protein, or something like that, where we have loads more data about this type of protein or this part of the protein structure. So AlphaFold can be much more confident that it’s going look like this, but in other parts, they might be completely new or the structure hasn’t been determined by anyone before in similar proteins, so it doesn’t have that much to go on. And it’s kind of just like, “Eugh, I don’t know.”

Jacob Trefethen:

Yeah.

Saloni Dattani:

But there’s the other question. Is it possible to make this protein in the lab, and maybe there are other challenges in doing that, aside from just whether it would fold into that shape. Or would the protein do the thing that you want it to do in the lab, or in real life?

Jacob Trefethen:

And it’s going to depend on the protein, the difficulty in making the protein – it is more difficult still to make large proteins, for example, gets more expensive - you gotta splice together multiple things, all that. Will it do what you’re looking for it to do? You know, it’s all about what is the initial test that you can do to get some signal, and that will be different for different things you’re trying to achieve.

Saloni Dattani:

And I think maybe there’s also differences because in, let’s say, Protein Data Bank or- the structures that are being predicted are just one static version of the protein, they’re not like- A protein in real life is wiggling, or it’s moving around, or it’s folding, or it’s turning and rotating, and stuff like that, and that is not being predicted.

Jacob Trefethen:

Nope.

Saloni Dattani:

It’s not predicting how it binds to metals or something like that, there are some other tools that do that, though, that are kind of based on this, but then you would have to have data on what that looks like as well.

Jacob Trefethen:

It’s good maybe just to summarise the useful things that aren’t yet done. So there’s that - what you just said is completely right - we just don’t have good predictions of protein dynamics. So we’re pretty good at predicting protein structure, but as you said a second ago, not perfect, but we’re getting there. We can’t yet predict protein function very well. And so I just want to distinguish what we were just talking about is: starting with an intended function, hallucinating a protein to serve it - that was very difficult five years ago and is increasingly some problems you can do that for - so that’s start with a function, hallucinate your way to the finish line.

But we can’t- if you just take a given human protein, it probably will serve multiple functions, and you’re not gonna suddenly be able to ask an AI, “Wait, what is this protein doing, by the way?” Like that is, you know, that’s one of the holy grails left, which is predict, you know, we care about function more than structure, ultimately.

Saloni Dattani:

And I guess the other thing is maybe also, is it attached to something? Is it a protein that stuck to a membrane; does that change its shape or something like that? And that’s not something it’s answering. But it’s still really use useful because a lot of proteins are kind of just hanging around, they’re just dissolved in something, and they do sometimes look like those structures.

Jacob Trefethen:

Yeah. And you know, let me give a shout out to a fourth AI model.

Saloni Dattani:

Oh?

Jacob Trefethen:

Don’t know if you’ve heard of ChatGPT... Claude...

Saloni Dattani:

I have heard of those.

Jacob Trefethen:

I was talking to a grad student who was at the frontier of these biological machine learning models, and she was emphasizing to me how useful ChatGPT was, because this loop with three models we just discussed, it’s really simple, but you do have to know how to code to get it to work, and simply learning to code takes a while.

Saloni Dattani:

Right. What language do they use, do you know?

Jacob Trefethen:

I’m sure there’s many answers to that. Python is a classic that you would start with, maybe. If you’re a grad student and have to take a year out in order to learn to code, just so that you can use these models - that’s what it used to be like all the way back in 2023. So these models were out, but we didn’t yet have really good LLMs. I mean, luckily in 2025, you no longer have to take a year out because you can basically talk to a large language model about: “What’s this bit of code doing? Okay, write me some code that does this. Now explain to me what that function is doing. Okay, now explain to me what I’m missing.”

Saloni Dattani:

You’re vibe protein coding.

Saloni Dattani:

You know, I have sometimes used ChatGPT to code stuff, but it’s kind of hard because when it makes a mistake and there’s some error, and I run the code and I say, “Hey, you made this mistake” or “This was the error.” and then it finds it really hard to fix the error; it doesn’t know where the bug is coming from. But then, I also use it sometimes because I share all of my data and graphs on GitHub.

Jacob Trefethen:

Very good.

Saloni Dattani:

And I have a background of using R, the programming language, but I don’t use Python. But I think that people who use Python should also be able to reproduce my graphs. So sometimes I have written my code in R and I tell ChatGPT “Turn this into Python” so that someone else can just run the code super easily. And again, I don’t use Python, so it’s hard for me to fix any issues that come up, but I will copy that code and then run it on the terminal and see if it makes my graph again, and it does take a while, but it does eventually get there, usually.

Jacob Trefethen:

Yeah.

Saloni Dattani:

Which is cool.

Jacob Trefethen:

That’s great. Another one that that brings to mind for me is, you are often using other people’s code, or inheriting some of other people’s code when you’re trying to achieve something, and different people document their code well or poorly, and someone who has not done a good job of factoring their code, or documenting it well, you can at least ask one of your friendly AI assistants, “What the hell is going on here?”

Saloni Dattani:

Yeah, that’s helpful. But it is helpful for the lines of codes, and when it’s a very long script, it’s just like, “I’ve forgotten what I’m doing. I’m sorry.” But in fairness, I would forget as well, so.

Jacob Trefethen:

By the way, shout out to Sebastian Ols, who has famously well-documented code for some of the systems that-

Saloni Dattani:

Sebastian Owl?

Jacob Trefethen:

Ols - O-L-S - to pronounce that Swedish name.

Saloni Dattani:

Interesting, well thank you to him.

Jacob Trefethen:

Thank you to him.

Saloni Dattani:

Where were we with hepatitis B? I’ve almost totally forgotten about it.

Jacob Trefethen:

Well, I actually have a video I can show you, of how far I got, that I took on the final day, while I was up there in Washington.

Saloni Dattani:

So wait... You were making a protein that fits into the gap between hepatitis B’s proteins, and then you were like, “how do I block them from joining together?”

And you used RFDiffusion to hallucinate a potential protein that would fit into this gap. And then you went what amino acid sequence creates that protein, with ProteinMPNN. And then you asked AlphaFold, “does this amino acid sequence actually produce the structure that I want?”

Jacob Trefethen:

Yep, absolutely right.

Saloni Dattani:

I remembered.

Jacob Trefethen:

And by the end of that system, I’ve got it down to 50, 100 different possible sequences, structures.

Saloni Dattani:

Oh, that’s a lot.

Jacob Trefethen:

It’s quite a lot. I mean, you could go down further if you want, but you know, the really fun thing is you can visually look at those structures in a- the thing I used was PyMOL, Python molecule, and you can see “does it look like it would line up and bind?” and-

Saloni Dattani:

This is a software where it shows you what proteins look like if they’re-

Jacob Trefethen:

You can twist them around.

Saloni Dattani:

\-represented with ribbons, and arrows, and blobs.

Jacob Trefethen:

Exactly.

Saloni Dattani:

So in the graph we’re showing, each of the little dots is a prediction- predicted structure that you made. And the graph is showing: “What is the potential error in the structure compared to the subjective”, you said, “reference” or something. Or how far is this structure, in terms of the coordinates and stuff, from what it should be? And because you’ve made so many of these predicted structures, you then filtered down and you went like, “these are probably the ones that are gonna look actually like this.”

Jacob Trefethen:

Mm-hmm.

Saloni Dattani:

And then what did you do next?

Jacob Trefethen:

And then, you know, I went home, to be honest. Oh, but what if-

Saloni Dattani:

Well, that’s boring.

Jacob Trefethen:

I know, I know, but I love to leave things unfinished here. But what one would do next if I were a full-time lab scientist?

Saloni Dattani:

Oh wait, you didn’t just go home that day, that was the end of your time there.

Jacob Trefethen:

That was my final day there.

Saloni Dattani:

Oh, okay.

Jacob Trefethen:

So I hope that other people are carrying forward ideas of that sort. But those particular binders disappeared into the ether. That said, what I could have done was order ‘em up, order up the DNA sequences that would code for those proteins, grow up the proteins in some system, harvest those proteins, and check against hepatitis B virus, or something like hepatitis B virus, maybe the protein itself.

Saloni Dattani:

So you would be seeing, “does this protein actually block it from binding to each other, to the two parts?”

Jacob Trefethen:

Exactly. And probably, what I would find given the state of the AI models, is that most of the things I ordered wouldn’t, and some of them would. And I just can’t emphasise how astonishing that last part is. Because you used to come up with sequences and you used to make up proteins and they didn’t work.

Saloni Dattani:

Right.

Jacob Trefethen:

And now some of ‘em seem to work.

Saloni Dattani:

Yeah. I mean, it might have been a three or five year project just to work on one of these things.

Jacob Trefethen:

And what I hope we’ll talk about next is why even all of this magic sometimes is not enough.

Saloni Dattani:

I’m also wondering, okay, you mentioned binders- what are the other potential uses that you might have for this technology, of hallucinating different proteins? Could you, I don’t know, is it like Lego? Can you make little bits of the proteins and stick them together? Would people do that?

Jacob Trefethen:

There’s one way to find out, let’s try. I mean, I don’t know the answer, but maybe...

Saloni Dattani:

I think I’ve seen some of these structures, where they’re just some symmetrical thing - maybe they’re a tube, or a ring, or there’s some star-shaped thingy - and they are proteins. And people have figured out how to make those.

And I think that’s maybe easier than making an actual protein that’s doing reactions. If you know, for example, in a protein, this is how you make a little helix in one part, and this is how you make a little fold, and this is how you make some parallel structures, the computer can have a pretty good idea of putting that together and making some symmetrical thingy with it.

Jacob Trefethen:

Yeah, you know who’s done really cool work on this?

Saloni Dattani:

Who?

Jacob Trefethen:

Chelsea Fries.

Saloni Dattani:

Who’s that?

Jacob Trefethen:

Postdoc in the Neil King lab. And last time I saw her- Maybe Fries?

Saloni Dattani:

Wait, how do you spell that?

Jacob Trefethen:

Fries.

Saloni Dattani:

It’s not like frozen freeze.

No, although ironically she does a lot of cry electron microscopy, so maybe that’s nominative determinism. But she’s down there in the lab, well in the basement, with the microscopes. And I went to visit her once and she went, “Hey Jacob, you wanna take a look at this?” And on the screen she had this perfectly symmetrical long tube. I was like, “What the heck is that?” She’s like, “This is a self-assembling massive protein tube.”

Saloni Dattani:

That’s so cool.

Jacob Trefethen:

And I was like, “okay, what, that’s amazing! So what can you use it for? And she said, “Oh, I’ve got no idea.” And she just has an instinct, if she follows this further, having nano-tubes will probably be useful for something.

Saloni Dattani:

I can imagine tubes being useful for various things. Maybe as a straw for little bacteria or something, I don’t know.

Jacob Trefethen:

Yeah, those little- what are those critters that- do you know who I’m thinking of?

Saloni Dattani:

What? What the hell are you talking about?

Jacob Trefethen:

What are those- what are they called? Tetra- megalofaun- pterodactyls- the ones that look really ugly.

Saloni Dattani:

I have no-

Rachel Shu (offscreen):

Tardigrades.

Jacob Trefethen:

Say again? Tardigrades, tardigrades.

Saloni Dattani:

Oh, tardigrades.

Jacob Trefethen:

You must know tardigrade.

Saloni Dattani:

Well, I- tetrahedral poly- what? Tetrahedral...

Jacob Trefethen:

So I think that tardigrades need straws, because currently they don’t get diet coke in the right quantity.

Saloni Dattani:

Oh yeah. But do we want them to drink more?

Jacob Trefethen:

Oh, they might get really frenetic.

Saloni Dattani:

Uh-huh. But also, I think we talked about this earlier, when we were talking about our favourite proteins, and I said microtubules, and they’re a type of tube. They are used for this structure of a cell- a skeleton of a cell.

Jacob Trefethen:

Wow.

Saloni Dattani:

So I feel like there could be lots of cool uses for this.

Jacob Trefethen:

Yeah. Chelsea’s onto something.

Saloni Dattani:

Like scaffolding something.

Jacob Trefethen:

Yeah, yeah, totally. Well, you could create a mansion, but the mansion is microscopic.

Saloni Dattani:

Like a little dollhouse.

Jacob Trefethen:

Dollhouse and columns.

Saloni Dattani:

Yeah.

Jacob Trefethen:

Yeah.

Saloni Dattani:

For little... proteins to live in.

Jacob Trefethen:

Yeah.

Saloni Dattani:

I think I’d enjoy that. Maybe that’s something people would do with 3D printing, they could 3D print a protein, make a little protein house.

Jacob Trefethen:

All a protein wants is a little protein house, and a white picket protein fence.

Saloni Dattani:

A what?

Jacob Trefethen:

A white picket protein fence. You know, like a white picket fence.

Saloni Dattani:

This protein is going to be a NIMBY.

Jacob Trefethen:

Oh no! Okay, don’t make NIMBY proteins. That’s our one request.

Saloni Dattani:

Okay. So we can think about hallucinating proteins for binders, to block binding or to make things bind. We could make scaffolds. We could make little structures of their own, maybe the shape of the structure itself does something.

Jacob Trefethen:

Yes, I think so.

Saloni Dattani:

Oh, you know haemoglobin, right, is a protein complex with four heme things, and they fit together, and the oxygen fits inside them. If it’s just one heme, it can’t carry the oxygen and let go of it, I think. So maybe it’s a similar sort of thing, if you can make a structure that does something, but in a complex it can do something else, so you want to create a larger structure.

Jacob Trefethen:

Right.

Saloni Dattani:

And so what happened with your- okay, so you would have ordered the DNA, and made the amino acid sequence, and you would’ve made the protein, and then you would’ve seen: “Does this actually block hepatitis B in the lab, maybe in some animals or something, and then in humans.”

Jacob Trefethen:

Yep.

Saloni Dattani:

Yep. So that’s it, we’re done?

Jacob Trefethen:

If only, Saloni!

Saloni Dattani:

Oh.

Jacob Trefethen:

We talked through one example, of trying to make one hallucinated protein, and we hypothesised other possible uses. Do you know, have these proteins actually made it into the real world yet? And what have people worked on already?

Saloni Dattani:

I mean, this is a super new method.

Jacob Trefethen:

Yeah.

Saloni Dattani:

The first time it was published was three years ago, right, in 2022? And so it is fairly new.

I think there are a few proteins that are in the pipeline as drugs that have been developed based on methods like this, or this method.

One of them is called rentosertib, and that is a small molecule drug that is developed to treat pulmonary fibrosis. That is a lung disease where- I think there are different things that can trigger that, but basically the idea is, your lungs have all of these little empty spaces called alveoli where your blood is on the edge of that little space, and that gives it a little bit of a gap or structure where the oxygen and the carbon dioxide mix with the air, and that helps you breathe.

And what happens with this disease is that there’s some kind of injury, or some inflammation, or stress, or infection, or something, that damages these parts, and when the body is trying to repair it, it produces this fibrous structure or repair structure, and that goes too far. It’s like a scar that is just a slightly different material than what was originally there.

That actually prevents the transfer of oxygen, carbon dioxide as well as before. Over time, for whatever reason, people’s lungs get more and more scarred, so they become less and less able to breathe well, and obviously that’s very harmful.

So this new drug is basically trying to block a particular protein that is involved in this whole process, so that’s one. That is in phase two trials right now.

There’s another one called luxdegalutamide, and that is used to potentially treat prostate cancer by targeting the androgen receptor that’s involved. That is also in phase two trials.

There are a few that are in trials, or were in trials, but then got discontinued because they didn’t work. And that highlights this thing that you were saying, that even after you’ve hallucinated a thing, you still need to make sure: does it actually produce this structure in the lab, but also, does it do this function in the real world when we’re using it as a treatment?

Jacob Trefethen:

And does it avoid doing other functions that make those problems elsewhere in the body?

Saloni Dattani:

Yeah, is it causing side effects. So I guess that’s where we are now, but it’s super new, right? And because clinical trials take so long, you wouldn’t expect this to get to the market for a while. Do you have a favourite use of these tools, or thing that you think they could do?

Jacob Trefethen:

I am hopeful for several things. I mean, I’m just so curious to see how it all goes in the next few years. But one is actually proteases. If you look at one of the first protein products that was designed with recombinant DNA technology in probably the eighties, nineties, was tissue plasminogen activator-

Saloni Dattani:

Oh yeah.

Jacob Trefethen:

\- which is a protease-

Saloni Dattani:

It cuts proteins. We’ve talked about an HIV protease, right, in our first episode?

Jacob Trefethen:

Absolutely. And that we talked about Strep A protease in the episode of that cleaving our signalling proteins. But in this case, when you have a stroke, what’s often happening is that a clot is lodged in your brain and you want to break up that clot and there aren’t great ways to do that chemically. The best we’ve got at the moment is tPA, which was these tissue plasma activators invented maybe 40 years ago.

Saloni Dattani:

Wait, wait. That is a natural thing that’s produced by our body, but it was produced in recombinant bacteria or yeast or something, 40 years ago.

Jacob Trefethen:

Yes, that occurs naturally, and the difference there was making it with recombinant DNA, so you can make it as a product scalably. So now imagine you could lay it on top of some tweaking or some hallucinations, and you get even more useful proteases that perform similar or better functions. It’s a tough problem ‘cause you also don’t want it to run away and perform its function too well on the wrong strokes. But millions of people die of stroke every year, so those kinds of targets just become way more tantalizing when you have more you can do with proteins.

Saloni Dattani:

Right. I guess there are also other medical uses. So proteases are one, maybe other kinds of enzymes- there are a lot of rare genetic disorders where someone is missing an enzyme, or some enzyme is dysfunctional, or something like that. And I guess there are other kinds of diseases that occur, where blocking a protein, or maybe designing a new protein, or introducing a protein or something, would help that person do some function that they weren’t able to do before.

And then, would you also maybe be able to use proteins for diagnostics? Would you be able to use them for testing? Like I think I mentioned sometimes proteins change shape or something like that, if the temperature changes - I think you mentioned that as well - and if the acidity changes or something like that.

So maybe you would be able to make these really specific proteins that bind or go to a specific place, and then if something is there, it changes shape and maybe that releases some information that-

Jacob Trefethen:

Yeah, you could design transistors with proteins. You know, you could-

Saloni Dattani:

What?!

Jacob Trefethen:

I bet you.

Saloni Dattani:

I was not expecting that. What do you mean?

Jacob Trefethen:

I mean, if you’re just- all you’re trying to do is send some signal under certain conditions and not others, you can make electronics with proteins, or I assume. I’m making this up, but it must be true.

Saloni Dattani:

I don’t know anything about engineering, so. Okay, so there are all of these really cool things that proteins could be doing, that people could be designing new proteins for the structures, the medicines, the diagnostics, the replacements for enzymes or hormones that people are missing, also the agricultural uses, or the like fermentation, or the industrial processes, or the materials, or the-

Jacob Trefethen:

There’s so many different things, and I think the starting gun is basically 2022. What we’re gonna see, I believe, if people put the effort in is a lot of structural biologists who know how to use these computational tools, but otherwise they’re essentially generalists, matching up with experts in particular fields who know a lot about diagnostics, or who know a lot about the heart, or who know a lot about a given infectious disease, or know a lot about a given agricultural problem, and in combination, I think those teams of people are gonna do really incredible things.

Saloni Dattani:

I have a last question for you.

Jacob Trefethen:

Hit me.

Saloni Dattani:

We talked about a lot of applications of this and making particular things. Is this gonna be useful for basic research as well?

Jacob Trefethen:

It’s gotta be, it’s gotta be. I’m now, my first, what is my first thought on...

Saloni Dattani:

Or I don’t know, like understanding some disease, or something like that. Yeah, understanding some process.

Jacob Trefethen:

I mean, the answer’s got to be yes, and then it’s almost like, start with the problem in hand, before I know how to answer it. But the last 10 years, we had CRISPR come through – CRISPR has proven so useful as a basic research tool, maybe even above how useful it has been as a medicine platform. So I wouldn’t be surprised, yeah.

Saloni Dattani:

Yeah. I guess we talked about how, if it can be used in diagnostics, that actually is a big research tool as well, like if you’re able to make sensors to something.

Jacob Trefethen:

Definitely. Yeah.

Saloni Dattani:

Okay, yeah, so there’s lots of cool uses.

Jacob Trefethen:

Lots of cool uses.

Saloni Dattani:

What’s gonna happen in the future?

Jacob Trefethen:

There’s two things I think we need to discuss, ’cause we’ve just gone so far with these AI models. Number one is, are they gonna cure us all of all diseases in the next couple years? Sounds so magical. Why not?

Saloni Dattani:

No, I don’t think so.

Jacob Trefethen:

Okay, great. Well, I think we should get into that. The other is, if you can hallucinate any protein for a function of interest, well, does that mean that terrorists can hallucinate proteins that attack other human beings? And we gotta talk about that too. And that probably means a whole other episode.

Saloni Dattani:

Alright. Well, thank you for listening to our episode on protein design and if you like this, share it with every single one of your friends, your family, your teachers, your haters, your colleagues, and subscribe.

Jacob Trefethen:

Couldn’t have said it better myself.