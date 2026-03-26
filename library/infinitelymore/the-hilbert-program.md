---
title: "The Hilbert program"
author: "Joel David Hamkins"
publication: ""
publication_slug: "infinitelymore"
published_at: "2025-08-25T13:34:13.000Z"
source_url: "https://www.infinitelymore.xyz/p/hilbert-program"
word_count: 1884
estimated_read_time: 10
---

*Please enjoy this free excerpt from [Lectures on the Philosophy of Mathematics](https://mitpress.mit.edu/9780262542234/). This essay appears in chapter 7, focused on* Gödel’s incompleteness theorems.

[

![](https://substackcdn.com/image/fetch/$s_!aV8t!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F12eddc73-067d-4244-b97f-4d0f7abb1c0a_550x707.jpeg)



](https://mitpress.mit.edu/9780262542234/)
*Lectures on the Philosophy of Mathematics, MIT Press 2021*

Mathematical logic, as a subject, truly comes of age with Kurt Gödel's incompleteness theorems, which show that for every sufficiently strong formal system in mathematics, there will be true statements that are not provable in that system, and furthermore, in particular, no such system can prove its own consistency. The theorems are technically sophisticated while also engaged simultaneously with deeply philosophical issues concerning the fundamental nature and limitations of mathematical reasoning. Such a fusion of mathematical sophistication with philosophical concerns has become characteristic of the subject of mathematical logic—I find it one of the great pleasures of the subject. The incompleteness phenomenon identified by Gödel is now a core consideration in essentially all serious contemporary understanding of mathematical foundations.

In order to appreciate the significance of his achievement, let us try to imagine mathematical life and the philosophy of mathematics prior to Gödel. Placing ourselves in that time, what would have been our hopes and goals in the foundations of mathematics? By the early part of the twentieth century, the rigorous axiomatic method in mathematics had found enormous success, helping to clarify mathematical ideas in diverse mathematical subjects, from geometry to analysis to algebra. We might naturally have had the goal (or at least the hope) of completing this process, to find a complete axiomatization of the most fundamental truths of mathematics. Perhaps we would have hoped to discover the ultimate foundational axioms—the bedrock principles—that were themselves manifestly true and also encapsulated such deductive power that with them, we could in principle settle every question within their arena. What a mathematical dream that would be.

Meanwhile, troubling antinomies—contradictions, to be blunt—had arisen on the mathematical frontiers in some of the newly proposed mathematical realms, especially in the naive account of set theory, which exhibited enormous promise as a unifying foundational theory. Set theory had just begun to provide a unified foundation for mathematics, a way to view all mathematics as taking place in a single arena under a single theory. Such a unification allowed us to view mathematics as a coherent whole, enabling us sensibly, for example, to apply theorems from one part of mathematics when working in another; but the antinomies were alarming. How intolerable it would be if our most fundamental axiomatic systems of mathematics turned out to be inconsistent; we would have been completely mistaken about some fundamental mathematical ideas. Even after the antinomies were addressed and the initially naive set-theoretic ideas matured into a robust formal theory, uncertainty lingered. We had no proof that the revised theories were safe from new contradictions, and concern remained about the safety of some fundamental principles, such as the axiom of choice, while other principles, such as the continuum hypothesis, remained totally open. Apart from the initial goal of a complete account of mathematics, therefore, we might have sought at least a measure of safety, an axiomatization of mathematics that we could truly rely on. We would have wanted at the very least to know by some reliable finitary means that our axioms were not simply inconsistent.

## The Hilbert program

Such were the hopes and goals of the *Hilbert program*, proposed in the early twentieth century by David Hilbert, one of the world's leading mathematical minds. To my way of thinking, these hopes and goals are extremely natural in the mathematical and historical context prior to Gödel. Hilbert expected, reflexively, that mathematical questions have answers that we can come to know. At his retirement address, Hilbert (1930) proclaimed:

> *Wir müssen wissen. Wir werden wissen.* (We must know. We will know.)

Thus, Hilbert expressed completeness as a mathematical goal. We want our best mathematical theories ultimately to answer all the troubling questions. Hilbert wanted to use the unifying foundational theories, including set theory, but he also wanted to use these higher systems with the knowledge that it is safe to do so. In light of the antinomies, Hilbert proposed that we should place our mathematical reasoning on a more secure foundation, by providing specific axiomatizations and then proving, by completely transparent finitary means, that those axiomatizations are consistent and will not lead us to contradiction.

### Formalism

Hilbert outlined his vision of how we might do this. He proposed that we should view the process of proving theorems, making deductions from axioms, as a kind of formal mathematical game—a game in which mathematical practice consists ultimately of manipulating strings of mathematical symbols in conformance with the rules of the system. We need not encumber our mathematical ontology with uncountable (or even infinite) sets, just because our mathematical assertions speak of them; rather, let us instead consider mathematics merely as the process of formulating and working with those assertions as finite sequences of symbols. Inherent in the Hilbert program, and one of its most important contributions, is the idea that the entire mathematical enterprise, viewed as a formal game in a formal axiomatic system, may itself become the focus of metamathematical investigation, which he had hoped to undertake by entirely finitary means.

According to the philosophical position known as *formalism*, this game is indeed all that there is to mathematics. From this view, mathematical assertions have no meaning; there are no mathematical objects, no uncountable sets, and no infinite functions. According to the formalist, the mathematical assertions we make are not *about* anything. Rather, they are meaningless strings of symbols, manipulated according to the rules of our formal system. Our mathematical theorems are deductions that we have generated from the axioms by following the inference rules of our system. We are playing the game of mathematics.

One need not be a formalist, of course, to analyze a formal system. One can fruitfully study a formal system and its deductions, even when one also thinks that those mathematical assertions have meaning—a semantics that connects assertions with the corresponding properties of a mathematical structure that the assertion is about. Indeed, Hilbert applies his formalist conception principally only to the infinitary theory, finding questions of existence for infinitary objects to be essentially about the provability of the existence of those objects in the infinitary theory. Meanwhile, with a hybrid view, Hilbert regards the finitary theory as having a realist character with a real mathematical meaning.

The Hilbert program has two goals, seeking both a complete} axiomatization of mathematics, one which will settle every question in mathematics, and a proof using strictly finitary means to analyze the formal aspects of the theory that the axiomatization is reliable. Hilbert proposed that we consider our possibly infinitary foundation theory *T*, perhaps set theory, but we should hold it momentarily at arm's length, with a measure of distrust; we should proceed to analyze it from the perspective of a completely reliable finitary theory *F*, a theory concerned only with finite mathematics, which is sufficient to analyze the formal assertions of *T* as finite strings of symbols. Hilbert hoped that we might regain trust in the infinitary theory by proving, within the finitary theory *F*, that the larger theory *T* will never lead to contradiction. In other words, we hope to prove in *F* that *T* is consistent. Craig Smorynski (1977) argues that Hilbert sought more, to prove in *F* not only that *T* is consistent, but that *T* is conservative over *F* for finitary assertions, meaning that any finitary assertion provable in *T* should be already provable in *F*. That would be a robust sense in which we might freely use the larger theory *T*, while remaining confident that our finitary conclusions could have been established by purely finitary means in the theory *F*.

### Life in the world imagined by Hilbert

Let us suppose for a moment that Hilbert is right—that we are able to succeed with Hilbert's program by finding a complete axiomatization of the fundamental truths of mathematics; we would write down a list of true fundamental axioms, resulting in a complete theory *T*, which decides every mathematical statement in its realm. Having such a complete theory, let us next imagine that we systematically generate all possible proofs in our formal system, using all the axioms and applying all the rules of inference, in all possible combinations. By this rote procedure, we will begin systematically to enumerate the theorems of *T* in a list,

a list which includes all and only the theorems of our theory *T*. Since this theory is true and complete, we are therefore enumerating by this procedure all and only the true statements of mathematics. Churning out theorems by rote, we could learn whether a given statement φ was true or not, simply by waiting for φ or ¬φ to appear, complete and reliable. In the world imagined by the Hilbert program, therefore, mathematical activity could ultimately consist of turning the crank of this theorem-enumeration machine.

### The alternative

However, if Hilbert is wrong, if there is no such complete axiomatization, then every potential axiomatization of mathematics that we can describe would either be incomplete or include false statements. In this scenario, therefore, the mathematical process leads inevitably to the essentially creative or philosophical activity of deciding on additional axioms. At the same time, in this situation, we must inevitably admit a degree of uncertainty, or even doubt, concerning the legitimacy of the axiomatic choices we had made, precisely because our systems will be incomplete and we will be unsure about how to extend them, and furthermore, because we will be unable to prove even their consistency in our finitary base theory. In the non-Hilbert world, therefore, mathematics appears to be an inherently unfinished project, perhaps beset with creative choices, but also with debate and uncertainty concerning those choices.

### Which vision is correct?

Gödel's incompleteness theorems are bombs exploding at the very center of the Hilbert program, decisively and entirely refuting it. The incompleteness theorems show, first, that we cannot in principle enumerate a complete axiomatization of the truths of elementary mathematics, even in the context of arithmetic, and second, no sufficient axiomatization can prove its own consistency, let alone the consistency of a much stronger system. Hilbert's world is a mirage.

Meanwhile, in certain restricted mathematical contexts, a reduced version of Hilbert's vision survives, since some naturally occurring and important mathematical theories are decidable. Tarski proved, for example, that the theory of real-closed fields is decidable, and from this (as discussed in chapter 4), it follows that the elementary theory of geometry is decidable. Additionally, several other mathematical theories, such as the theory of abelian groups, the theory of endless, dense linear orders, the theory of Boolean algebras, and many others, are decidable. For each of these theories, we have a theorem-enumeration algorithm; by turning the crank of the mathematical machine, we can in principle come to know all and only the truths in each of these mathematical realms.

But these decidable realms necessarily exclude huge parts of mathematics, and one cannot accommodate even a modest theory of arithmetic into a decidable theory. To prove a theory decidable is to prove the essential weakness of the theory, for a decidable theory is necessarily incapable of expressing elementary arithmetic concepts. In particular, a decidable theory cannot serve as a foundation of mathematics; there will be entire parts of mathematics that one will not be able to express within it.

*Continue reading more about this topic in the book:*

[

![](https://substackcdn.com/image/fetch/$s_!tzMf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6304f57b-17c2-4e33-a5f6-da48c6281546_550x707.jpeg)



](https://www.amazon.com/dp/0262542234/)