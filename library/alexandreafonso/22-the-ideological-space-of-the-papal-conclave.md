---
title: "#22 The Ideological Space of the Papal Conclave"
author: "Alexandre Afonso"
publication: "Alexandre Afonso's Political Economy Newsletter"
publication_slug: "alexandreafonso"
published_at: "2025-05-05T10:02:31.000Z"
source_url: "https://alexandreafonso.substack.com/p/22-the-ideological-space-of-the-papal"
word_count: 955
estimated_read_time: 5
---

This week, the papal conclave begins its deliberations to elect the next pope. I’m not particularly religious, nor do I claim any special expertise in Vatican affairs, but I do have a weakness for rabbit holes. Recently, I stumbled upon the *[College of Cardinals Report](https://collegeofcardinalsreport.com/)*, a website that compiles demographic and ideological data on the cardinals participating in the election. It offers a closer look at the makeup of the conclave’s “electorate” (if we can call it that), and for a political scientist, it’s a tempting invitation to explore the ideological currents that might influence the selection of the next pope.

Officially, of course, none of this matters. The conclave isn’t about politics; it’s about discerning the will of God, with cardinals guided by the Holy Spirit in a process of divine inspiration. But let’s suspend that premise for just a moment and assume this is, in fact, a political process—one where ideology, strategy, and power dynamics might just play a role. Given that there are roughly 1.5 billion Catholics worldwide, the implications of this "non-political" election are not exactly trivial.

The website itself isn’t the most user-friendly for data analysis, but with a bit of cleaning and tweaking, it’s possible to make some graphs—and even run a few regressions.

### Who Gets to Vote?

The first dataset includes all 252 Cardinals, along with their country of origin, age, and the pope who nominated them. However, not all Cardinals can vote—only those under the age of 80 are eligible to participate in the conclave. This leaves 147 voting Cardinals in the data. Analyzing their demographics reveals some interesting patterns.

In terms of geographical distribution, European cardinals still make up the largest share of the entire College of Cardinals. Among the voting cardinals—those under the age of 80—Europe dominates with about 39%, followed by Asia (17%), North America (15%), South America and Africa (both at 13%), and Oceania (2.7%). The chart below compares this distribution with the estimated share of Catholics worldwide, highlighting the fact that Europe remains significantly overrepresented. Latin America, for instance, holds the largest share of the global Catholic population but is represented by only a small fraction of the cardinal electors.

!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data\["datawrapper-height"\]){var t=document.querySelectorAll("iframe");for(var a in e.data\["datawrapper-height"\])for(var r=0;r<t.length;r++){if(t\[r\].contentWindow===e.source)t\[r\].style.height=e.data\["datawrapper-height"\]\[a\]+"px"}}}))}();

Also striking is the breakdown of who appointed these Cardinals. Of the electors in the report, a staggering 76% were appointed by Pope Francis. Just 18% were nominated by Benedict XVI, and only 5% date back to John Paul II. This distribution suggests that Francis has had a powerful hand in shaping the current electorate, which may in turn influence the ideological direction of the Church after his papacy.

[

![](https://substackcdn.com/image/fetch/$s_!qHv7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdf3ee53-a077-4e5a-b00c-f82b5b91c7b2_2800x1866.jpeg)



](https://substackcdn.com/image/fetch/$s_!qHv7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdf3ee53-a077-4e5a-b00c-f82b5b91c7b2_2800x1866.jpeg)
*Distribution of voting cardinals per nominating pope*

### Mapping Cardinals

The second dataset is more limited in scope, covering around 40 Cardinals, but it offers more detailed information on their positions across a set of divisive issues. These include the ordination of female deacons, blessings for same-sex couples, the requirement of priestly celibacy, the use of the Latin Mass, governance through synodality, environmental priorities (e.g., *Laudato Si’*), Communion for divorced and remarried Catholics, and reinterpretation of the encyclical *Humanae Vitae*.

Francis has taken a more open stance on many of these debates, leaving room for discussion or issuing controversial reforms—such as allowing non-liturgical blessings for same-sex couples and restricting the traditional Latin Mass. These moves have sparked both hope for modernization and backlash from traditionalists. The ideological data in the report classifies Cardinals’ positions on each issue as either “in favor,” “opposed,” “ambiguous,” or “missing.” If we map these cardinals for which this data is available and calculate a simple index of progressivism ranging from -1 to +1, this is what we find:

[

![](https://substackcdn.com/image/fetch/$s_!NeQT!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a5a1313-0dce-4d7b-bae6-43e250f0b7da_2610x1740.jpeg)



](https://substackcdn.com/image/fetch/$s_!NeQT!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a5a1313-0dce-4d7b-bae6-43e250f0b7da_2610x1740.jpeg)

However, because the detailed “ideological” data only includes a small number of Cardinals, I expanded the analysis by using ChatGPT’s research capabilities to code as many additional Cardinals as either conservative or progressive. While this approach inevitably introduces some measurement error, it allows for a broader picture of the ideological space of the conclave electorate, and makes it possible to run some simple regressions.

### Who Nominates, Matters

One of the clearest predictors of ideological orientation using this dichtomous variable is the pope who nominated the Cardinal. Running a simple logistic regression confirms this: Cardinals nominated by Francis are significantly more likely to be coded as progressive than those nominated by John Paul II or Benedict XVI.

[

![](https://substackcdn.com/image/fetch/$s_!F_Ou!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f2c2425-469d-4d02-9ea3-6a23e0758d70_2800x1866.jpeg)



](https://substackcdn.com/image/fetch/$s_!F_Ou!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f2c2425-469d-4d02-9ea3-6a23e0758d70_2800x1866.jpeg)
*Probability to be classified as progressive by nominating Pope*

According to the model, the odds of being progressive are over 12 times higher for Cardinals appointed by Francis compared to those appointed by John Paul II. The association for Benedict XVI is positive but not statistically different from JP. This suggests that Francis has succeeded in tilting the ideological balance of the electorate toward a more progressive direction.

### Age and Ideology

Another important factor is age. A second logistic regression shows that age is negatively associated with the likelihood of being progressive (even if we control for nominating pope). In other words, younger Cardinals (those that can vote) are significantly more likely to hold progressive views on Church doctrine and practice.

[

![](https://substackcdn.com/image/fetch/$s_!qLDW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F34405e68-4fde-4571-93cb-0e198dc0cf34_2610x1740.jpeg)



](https://substackcdn.com/image/fetch/$s_!qLDW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F34405e68-4fde-4571-93cb-0e198dc0cf34_2610x1740.jpeg)

This trend further supports the idea that the ideological center of gravity in the College of Cardinals is shifting.

### The Next Pope

Given that three-quarters of the Cardinals eligible to vote were nominated by Francis, and that these appointees are significantly more likely to lean progressive, it is reasonable to expect that the next pope will broadly align with Francis’s vision. Of course, conclaves can be unpredictable, and coalition-building inside the process can take unexpected turns. Still, the structural conditions suggest a clear directional push.

The [data](https://leidenuniv1-my.sharepoint.com/:u:/g/personal/afonsoa_vuw_leidenuniv_nl/EaDvNWGU1hlKn50u85KehaUB1odXaaz-uQRqY3kc6J_xQQ?e=Hml30I) used for this analysis comes from *The Cardinals Report*, with some ideological codings expanded using machine-assisted research.