---
title: "Why All Mammograms Should Incorporate A.I."
author: "Dr. Eric Topol"
publication: "Ground Truths"
publication_slug: "erictopol"
published_at: "2026-02-08T18:27:53.000Z"
source_url: "https://erictopol.substack.com/p/why-all-mammograms-should-incorporate"
word_count: 2611
estimated_read_time: 14
---

Follow-up of the [largest randomized trial of AI in medicine](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736\(25\)02464-X/fulltext) was reported a week ago. The Mammography Screening with Artificial Intelligence trial (MASAI) randomized trial in Sweden of more than 105,000 women compared the interpretation by two radiologists with one radiologist with AI support. This represents the culmination of several years of intensive research exploring the potential role of deep learning AI to improve the accuracy of interpreting mammograms beyond that of radiologists. In this edition of Ground Truths I will explain why it is time to adopt AI as an adjunct for all mammograms, with attention to (1) improved accuracy for detection with reduced workload; (2) prevention of breast cancer; and (3) risk of heart disease (yes, you read that right). But, of course, there are obstacles for implementation which I’ll also review.

[

![](https://substackcdn.com/image/fetch/$s_!hbhq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee3d8dc3-24fa-4b7a-ab13-969235891f4c_3326x1772.heic)



](https://substackcdn.com/image/fetch/$s_!hbhq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fee3d8dc3-24fa-4b7a-ab13-969235891f4c_3326x1772.heic)
*The Transpara AI algorithm, used in MASAI, detecting cancer in a 43-year-old asymptomatic female getting screened. The red boxes were flagged by AI with a lesion-specific score of 77 that proved to be invasive ductal carcinoma, from [Mather et al](https://www.mdpi.com/2072-6694/17/23/3878)*

## 1, Improved Accuracy of Detection with Reduced Workload

The National Cancer Institute estimates tha[t 20% of breast cancers are missed](https://www.cancer.gov/types/breast/screening/mammograms) by mammograms, leaving plenty of room for the potential of AI to help.

The first study that caught my eye about the promise of AI for mammography interpretation [dates back to 2019 from NYU with supervised learning](https://ieeexplore.ieee.org/document/8861376) of more than 1 million mammogram images and 14 radiologists. The area under the curve with AI, a performance metric, was 0.895 (1.0 is perfect) and the conclusion was: “We also show that a hybrid model, averaging the probability of malignancy predicted by a radiologist with a prediction of our neural network, is more accurate than either of the two separately.”

Since that time, retrospective studies of various AI algorithms were reported on a frequent basis. Then, in 2023, a real world of medicine study in Hungary with the Kheiron algorithm was [published in Nature Medicine](https://www.nature.com/articles/s41591-023-02625-9). Like MASAI’s design, comparing 2 radiologists vs 1 (or 2) plus AI, it found enhanced detection of cancer, 83% of which are invasive.

[

![](https://substackcdn.com/image/fetch/$s_!zL6c!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49fc6879-2ed2-450e-931b-41d0e2c01cdc_1028x498.heic)



](https://substackcdn.com/image/fetch/$s_!zL6c!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49fc6879-2ed2-450e-931b-41d0e2c01cdc_1028x498.heic)

Notably, there was a >30% reduction of radiologist’s workload. This report from Hungary led journalists to travel there and study their cancer screening clinics, where 5 were performing 35,000 screenings a year with AI since 2021. T[his article appeared on the front page of the NY Times in March 2023](https://www.nytimes.com/2023/03/05/technology/artificial-intelligence-breast-cancer-detection.html).

[

![](https://substackcdn.com/image/fetch/$s_!8VGg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3edd08d7-b6f1-4b0c-beae-f1e4855597f9_1894x1332.heic)



](https://substackcdn.com/image/fetch/$s_!8VGg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3edd08d7-b6f1-4b0c-beae-f1e4855597f9_1894x1332.heic)

Screening in the US is different from European countries because it relies on a single radiologist. That raises the question as to whether the big workloadreduction would also be seen here. But use of AI to partition very low risk scans, [a so-called “delegation strategy,”](https://www.nature.com/articles/s41467-025-57409-1) would be expected to achieve a substantial workload reduction in settings with a single radiologist.

With that background, let’s go on to the landmark MASAI trial results, [initially reported last year.](https://www.thelancet.com/journals/landig/article/PIIS2589-7500\(24\)00267-X/fulltext) This trial used the Transpara algorithm, developed by ScreenPoint Medical in The Netherlands, with 2D mammography. Subsequently, on 30 January 2026 t[he two-year follow up was published](https://erictopol.substack.com/publish/post/187209975). The Table below summarizes the main results for both reports.

[

![](https://substackcdn.com/image/fetch/$s_!e_py!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1e57514-c4bd-475c-b793-a2a099e5bbc0_1984x630.heic)



](https://substackcdn.com/image/fetch/$s_!e_py!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1e57514-c4bd-475c-b793-a2a099e5bbc0_1984x630.heic)

From the screening phase, there was a 29% increase in detection of cancer with AI, with a 24% increase in invasive cancer. There was no significant difference in the recall rate. The false positive rate was 1.4% in both arms of the trial. There was a 44% reduction in screen-reading workload.

At 2-year follow up, there was 12% less interval cancer detected in the AI arm, and the cancers picked up by AI were smaller, less aggressive: 16% reduction of invasive cancers and a 27% reduction of non-luminal A subtypes (including triple-negative and HER2-positive cancers). Accordingly, t**he AI support served a preventative role for earlier detection, catching aggressive breast cancer at the time of screening**. But there is more to AI and prevention as we’ll get to in the next section. Of note, the Transpara algorithm is being used in 2 other large randomized breast cancer screening trials: in Norway, a trial of 140,000 women, called AIMS and in the US with 400,000 women, known as PRISM.

### Back-up From Real World of Medicine Studies

Besides the prospective, real world study conducted in Hungary, a [nationwide study in Germany reported on over 460,000 wome](https://www.nature.com/articles/s41591-024-03408-6)n undergoing AI-supported mammography reading (N=260,739) or without AI support (controls, N=201,079), with the finding of a 17.6% high rate of cancer detection. It used a different algorithm called Vara MG from a German company.

In the United States, a [large study that compared AI-support of a single radiologist](https://www.nature.com/articles/s44360-025-00001-0) (N = 208,891) for what AI identified as “at-risk” (multistage AI-driven workflow) to a radiologist (controls, N = 370,692) there was a 21.6% increase in breast cancer detection rate. The AI used was from DeepHealth. The results were consistent across ancestries and breast density, as seen below.

[

![](https://substackcdn.com/image/fetch/$s_!BglI!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F338b7c4a-c4bc-4c76-b4b9-dc629936400f_1366x626.heic)



](https://substackcdn.com/image/fetch/$s_!BglI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F338b7c4a-c4bc-4c76-b4b9-dc629936400f_1366x626.heic)

Another single center, [smaller (N-55,581) prospective study from Sweden](https://pubmed.ncbi.nlm.nih.gov/37690911/#:~:text=Findings:%20From%20April%201%2C%202021,%2C%20Region%20Stockholm%2C%20and%20Lunit.) also showed better detection with AI support, using a different algorithm called Insight MMG from Lunit.

In a prospective, real world multi-center assessment in [over 25,000 women in South Korea](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4745062), the use of AI support led to a significant increase in cancer detection with no rise in the recall rate.

All of the real world studies and MASAI showed no significant increased in the recall rate. That is to say, all of the benefit was accomplished without prompting more callbacks to women for something concerning about the scan.

## 2\. Prevention of Breast Cancer

As you’ve seen above, as validated in the MASAI trial, AI support identified more of the aggressive cancers up front, and at 2-years of follow-up the results reinforced the advantage of increased early detection. But there is another dimension to preventing breast cancer: identifying **risk in what is read out as a normal mammogram**. in June 2025, CLARITY Breast received the first FDA de novo authorization for predicting risk for developing breast cancer over the next 5 years from a standard 2D mammogram. The original work behind this algorithm dates back to a [publication in 2021 in Science Translational Medicine](https://pubmed.ncbi.nlm.nih.gov/33504648/). This approval was based on training from ~420,000 mammograms from 27 facilities in the US, Europe, and South America. Subsequently, verification data from *[\>122, 000 mammograms 10 US health](https://clairity.com/rsna2025/)* systems, were presented at the RSNA in December 2025. About 16% of women in their 40s with a normal mammogram were found to be high risk. At the recent RSNA, data are presented taking breast density into account: women in the high-risk AI group had more than a 4-fold higher cancer incidence than women in the average-risk group (5.9% vs. 1.3%). But breast density alone showed only small increases in 5-year risk (3.2% for dense vs. 2.7% for non-dense).

Multiple studies have confirmed the ability to use AI for prediction of future breast cancer, such as [one report in over 110,000](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2824353) women and in a smaller study [of more than 13,000 women](https://pubs.rsna.org/doi/full/10.1148/radiol.222733).

In parallel to CLARITY Breast, there has been [extensive work by MIRAI](https://jclinic.mit.edu/mirai/), an academic research model initially developed at Harvard-MIT-Mass General Brigham that has been validating risk and prediction for the next 5 years using AI of the screening mammogram. The work has been extensive in over 21 counties and ~2 million mammograms, in diverse populations. At the [December 2005 RSNA annual meeting](https://www.rsna.org/media/press/2025/2611), prediction of interval cancers was assessed for a cohort of over 130,000 women in the UK. The top 20% of risk accounted for 42.4% of the interval cancers.

While MIRAI is not a commercial product, the [algorithm for prediction by DeepHealth (owned by RadNet) and Lunit, referred to above, are in the pipeline for FDA review for their prediction capabilities.](https://www.statnews.com/2025/12/15/mammogram-ai-predictive-models-both-breast-cancer-heart-disease/)

AI detection of high-risk sets the patient up for a tighter surveillance plan that could include MRI or ultrasound, multi-cancer early detection blood tests, or simply more frequent mammography (than every other year) with higher resolution tools such as 3D, digital tomographic synthesis, with an established higher rate of detection than 2D mammography. Identification of high-risk could also lead to a workup for genetic predisposition such as BRCA or other pathogenic mutations that were not previously assessed. When positive, that could also initiate a cascade of checking family members for such mutations.

## 3\. Risk of Heart Disease

The leading cause of death in women in heart disease, not cancer. The diagnosis of heart disease is all too often missed in women for various reasons including clinician bias and atypical symptoms.

Breast arterial calcification (BAC) as detected by AI, turns out to be an important marker for risk of cardiovascular events which affords mammography offer a 2-fer, a form of opportunistic AI imaging. In 2023, the FDA gave clearance to CureMetrix cmAngio for AI detection of breast cancer calcification. That was based on [a study](https://www.psu.edu/news/research/story/calcium-breast-arteries-predicts-future-cardiovascular-disease) on over 10,000 women tracking breast arterial calcification over 4-5 years, and found that an increased in category from mild to moderate) was linked to a 59% higher risk of major adverse cardiovascular events , and for moderate increased to severe BAC a 91% increase. A new appearance of BAC from negative was associated with a 41% increase MACE risk.

[

![](https://substackcdn.com/image/fetch/$s_!mYDS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1109b67-de1f-4265-9da6-60f24fc2479a_2174x922.heic)



](https://substackcdn.com/image/fetch/$s_!mYDS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb1109b67-de1f-4265-9da6-60f24fc2479a_2174x922.heic)
*A is severe BAC, B is moderate, C is mild; [from](https://www.ahajournals.org/doi/epub/10.1161/CIRCIMAGING.121.013526) Iribarren et al*

Other studies have [assessed prediction of heart disease in over 49,000 women followed 9 years](https://heart.bmj.com/content/early/2025/09/10/heartjnl-2025-325705) using a deep learning algorithm with some predictive accuracy.

In [another](https://www.ahajournals.org/doi/epub/10.1161/CIRCIMAGING.121.013526) cohort of more than 5,000 women followed for 6.5 years, BAC was linked to a 51% increased risk of cardiovascular disease events. That was the basis for FDA clearance of [Mammo+Heart](https://www.solismammo.com/services/mammo-heart) (below Figure is the summary of data from the study)

Some health systems are currently providing BAC data with for a mammogram for free while others charge $90-$120 for Mammo+Heart or up to $75 for CureMetrix. Other companies are working on FDA clearance for BAC, including DeepHealth

[

![](https://substackcdn.com/image/fetch/$s_!i-6U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F803afef6-dfe3-4092-8fef-792c9acf5309_2430x952.heic)



](https://substackcdn.com/image/fetch/$s_!i-6U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F803afef6-dfe3-4092-8fef-792c9acf5309_2430x952.heic)

## The Obstacles and Limitations

Getting an AI read out from a screening mammogram in the United States is restricted to RadNet, a very large network of over 400 locations, the largest radiology outpatient imaging service in the country. But it only operates in 8 states. And their readout adds cost to the patient that is currently $40 out-of-pocket. CLARITY Breast is now getting rolled out in the US but it also has an extra fee attached for its software interpretation of 5-year risk. And you’ve seen how the breast artery calcification also adds more to the cost. These are unacceptable added costs to patients to get the most information from their mammogram. I’ll come back to this below.

There are numerous algorithms for the initial screening but the only one that has been validated in MASAI is Transpara, which is also being used in ongoing large randomized trials in Norway and the US. RadNet uses DeepHealth, Hungary used Kheiron, Germany used Vara, and a center in Sweden used Linut, all of which have not had the same rigorous assessment. It is possible that there are differences in the performance of these algorithms which would not replicate the findings from MASAI, or, alternatively, could surpass its performance. All these algorithms are being refined, too, such as [Transpara tested in MASAI](https://www.biospace.com/press-releases/transpara-announces-new-fda-clearance-designed-to-improve-breast-cancer-detection-at-rsna), has been substantially tweaked.

The fact that there are ongoing large randomized trials in Norway and in the US to assess mammography either AI support would suggest this matter is unresolved, that we remain in equipoise. One could argue that such trials may no longer be needed, that the overall proof of benefit is clear, that enrolling participants in a control group without AI support might even be considered unethical. But given current implementation issues in the US with very limited access, added out-of-pocket costs, and lack of insurance coverage, the counter to this would be we’re not ready now to change medical practice anyway. Another point put forth is that survival has not been shown to be improved from mammography AI, but it is not hard to connect the dots from the MASAI data on interval cancers. Note there are few randomized trials with over 100,000 participants and major health outcomes.

For CLARITY Breast and other 5-year predictive algorithms, a concern is that there is no standard protocol for what to do when high-risk is identified and lack of proof that the information changes outcomes.

The conclusion from the recent MASAI paper was: “Further analyses of subsequent screening rounds and cost-effectiveness will clarify the long-term balance of benefits and harms and could provide a strong rationale for implementing AI in population-based mammography screening programmes, particularly in the context of workforce shortages.” This is similar to the vast majority of publications that say in the last line that more research is needed, not making a definitive statement.

The models that led to currently approved or cleared mammography AI tools are all derived without generative AI. Given the power of transformer architecture and foundation models, we can expect to see new AI tools that do all 3 tasks above—detect cancer, prevent cancer, and assess risk of heart disease—in one package. That could make all of this even more accurate, faster and cheaper.

## When Is It Time to Change Medical Practice?

Let’s go back to my provocative title of this piece, where I assert all mammograms should incorporate AI. In the US, **over 40 million mammograms are performed yearly**. The whole rationale for mass screening is **early detection**. Think of the NCI estimate that 20% of US mammograms read out by radiologists miss cancer. In the US we rely on a single reader unlike European countries that use 2 radiologists.

We now have proof that AI support achieves superiority for the early detection goal, but more than that. It is better (~30% enhanced cancer detection) and faster, saving substantial workload on the part of radiologists. Put that in context to the severe and growing [shortage of radiologists](https://www.nature.com/articles/s44401-025-00023-6#:~:text=The%20radiology%20workforce%20shortage%20poses,in%20diagnosis%20and%20treatment18.). It should be cheaper if the software were embedded in the mammography readout without any additional cost to the patient. If used at scale, a small fee of let’s say $1 could be paid to the company providing the AI. Moreover, the [cost of treating Stage 3 breast cancer](https://livelyme.com/blog/the-cost-of-breast-cancer) is between $160,000 to $200,000 in the first 2 years so any early diagnosis at Stage 1 or 2, or even better high-risk , could lead to marked savings in cost.

Mammography with AI support has emerged as the most rigorously studied of all possible indications. It is a standout for demonstrating superhuman performance—“digital eyes”— that see things which humans can’t. I believe the data we now have is compelling and should set the stage for a new standard of care. As I’ve reviewed, there are multiple obstacles that are holding us back, but it all goes back to why aren’t we providing all women with the best information available on their risk, early detection, and potential prevention of breast cancer and, no less, that of heart disease? If not now, then when?

NB: No AI was used in any way to write this post. I have nothing to do, no COI, with any company working in mammography AI.

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

Thanks to *Ground Truths* subscribers (approaching 200,000) from every US state and 210 countries. Your subscription to these **free essays and podcasts** makes my work in putting them together worthwhile. Please join!

***If you found this interesting PLEASE share it!***

Paid subscriptions are voluntary and all proceeds from them go to support [Scripps Research](https://www.scripps.edu). They do allow for posting comments and questions, which I do my best to respond to. Please don’t hesitate to post comments and give me feedback. Let me know topics that you would like to see covered.

Many thanks to those who have contributed—they have greatly helped fund [our summer internship programs](https://www.scripps.edu/science-and-medicine/translational-institute/education-and-training/student-research-internship/index.html) for the past two years. It enabled us to accept and support 47 summer interns in 2025! We aim to accept even more of the several thousand who will apply for summer 2026.