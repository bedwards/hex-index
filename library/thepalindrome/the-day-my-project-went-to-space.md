---
title: "The Day My Project Went to Space"
author: "Tivadar Danka"
publication: "The Palindrome"
publication_slug: "thepalindrome"
published_at: "2026-02-02T12:33:14.000Z"
source_url: "https://thepalindrome.org/p/the-day-my-project-went-to-space"
word_count: 4160
estimated_read_time: 21
---

Hi there! It’s Tivadar from The Palindrome.

Today’s post is a very special one, written by my friend Miklós, whom I met during our PhD years. (Which was more than ten years ago. I feel old.) He is one of the smartest people I know, and he’s been doing impressive research projects since then.

One of his latest projects made the news recently, because the data collection took place on the International Space Station (ISS). This is interesting in itself, but what you rarely see is the “backend” side of science, the stuff that don’t make the news, but makes or breaks a research project of this scale.

What follows is a deep-dive report on the entire lifecycle of a space-bound project:

-   grant proposal (moving from a whiteboard to orbit),
    
-   agile problem solving (like jumping hoops to meet Apple Store regulations),
    
-   stakeholder coordination (managing the logistics between international space agencies),
    
-   project management (handling “no second chance” execution under the pressure of shifting launch windows),
    

and many more.

If you’ve ever wanted to know what it actually takes to lead a project from a raw idea to the stars, this is the post for you.

Enjoy!

Cheers,  
Tivadar

\---

*📌 The Palindrome breaks down advanced math and machine learning concepts with visuals that make everything click.  
  
[Join the premium tier](https://thepalindrome.org/subscribe) to get access to [the upcoming live courses](https://thepalindrome.org/p/announcing-the-palindrome-lecture) on Neural Networks from Scratch and Mathematics of Machine Learning.*

\---

The [HUNOR](https://hunor.gov.hu/) (Hungarian To Orbit) national astronaut program was launched in 2021 to bring Hungary back into human spaceflight more than four decades after Bertalan Farkas became the first Hungarian in space. Its central goal was to send a Hungarian research astronaut to the International Space Station (ISS) to carry out scientific experiments.

To reach the ISS, Hungary partnered with Axiom Space, joining the privately organized [Axiom Mission 4](https://www.axiomspace.com/missions/ax4) (Ax-4), a roughly two-week Crew Dragon ([Grace](https://en.wikipedia.org/wiki/Crew_Dragon_Grace)) flight commanded by veteran NASA astronaut legend Peggy Whitson and flown in international cooperation with the USA, Poland, and India.

Other crew members have been pilot Shubhanshu Shukla (India) and mission specialists Sławosz Uznánski-Wisniewski (Poland) and Tibor Kapu (Hungary).

HUNOR featured a dedicated open call for research ideas and experiments from Hungarian universities, companies, and research institutes. As a research fellow at the HUN-REN Alfréd Rényi Institute of Mathematics, this is how I got into the picture.

[

![](https://substackcdn.com/image/fetch/$s_!RKV0!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc30461a-bd02-43e0-9dcd-74580f3b24c3_360x363.png)



](https://substackcdn.com/image/fetch/$s_!RKV0!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc30461a-bd02-43e0-9dcd-74580f3b24c3_360x363.png)
*The [Ax-4 mission](https://www.axiomspace.com/missions/ax4) logo*

## **Phase 0 - Experiment idea & grant application**

After I heard about the still-open call for proposals, I listed several potential ideas on my whiteboard, including a magnetic space board game, medical and quantum physics-related experiments, the design and implementation of a small space drone, and the study of commercial IMU sensors. Of course, the necessity of microgravity and space-like conditions had to be clearly demonstrated for each experiment, and therefore, the suitability of the submitted proposal had to be well justified.

### The HUNOR categories

There had been three categories in the open call for experiments: HUNOR-X, HUNOR-LAB, and HUNOR-DEV.  
  
The first, HUNOR-X, was meant for educational and science demonstration purposes, submitted mainly by schools and universities. You can think of this part as special lessons in physics from space.

The next category, HUNOR-LAB, was designed for universities and research institutes for experiments with high scientific potential – e.g., publishable results in scientific journals, theoretical patents, new algorithms, new measurements, etc. — that did not require hardware development, i.e., could be conducted using a device that was already onboard the ISS, or any other means. This was the category in which I submitted my own idea called “IMU-based Dead Reckoning in Space”.

The last category, HUNOR-DEV, was the most advanced and complex in the sense that it involved custom hardware development sent to the ISS along with Tibor. The sole requirement was that organizations opting for this category possess proven experience in spaceflight, evidenced by the successful execution of a space mission. As you can imagine, this is a fairly strict condition, and only a handful of organizations in Hungary can meet it.

Since I was not part of any of them, many of my initial ideas had to be ruled out, including the space drone, which was at the top of my list. After careful consideration and preliminary planning, my list boiled down to studying IMU sensors, as they did not require custom hardware development, and I already had experience with IMU data throughout my professional career.

For those of you who are not familiar with IMUs, IMU stands for Inertial Measurement Unit, a tiny microelectronic device capable of measuring acceleration (provided by an accelerometer) and rotation (provided by a gyroscope). Some models are also equipped with a magnetometer, which can detect magnetic field strength and thus serve as a digital compass.

Just to give you a taste of HUNOR’s scientific portfolio, I’d like to highlight two. One was the so-called “soft cell in space” (University of Oxford [article](https://www.maths.ox.ac.uk/node/74308), [lecture by the PI](https://www.youtube.com/watch?v=e7b5pAudnKs)), designed by the brilliant Gábor Domokos, from whom you have probably heard as the designer of “Gömböc” and the other cool experiment to check out is [DIROS](https://ttk.elte.hu/en/content/what-question-are-elte-researchers-trying-to-answer-with-the-help-of-the-hungarian-astronaut.t.8506), aimed to model and study the hexagonal cyclone at Saturn’s north pole, whose PI was my former ESA-SPFC teammate Miklós Vincze back in 2006/07. Of course, there were other very interesting experiments in this category, which you can look up and learn about on [HUNOR’s homepage](https://hunor.gov.hu/).

### The challenges of inertial data

The goal of my “IMU-DRS” was twofold:

1.  characterize sensor behavior in microgravity (noise, correlations, drift, etc.);
    
2.  and reconstruct trajectories of movements made by the astronaut using only IMU data.
    

Before you question the validity of these questions and argue that classical kinematics has long been solved by Newton and his legacy, i.e., knowing the acceleration of a point at all times, its initial position and speed, the trajectory it progresses through can be fully recovered, you are right, but there is a twist when working with IMU data.

First, IMUs measure in their own local coordinate system, meaning the acceleration they measure is always relative to their orientation. This means that to reconstruct their movement, orientation has to be tracked as well. Not doing so can result in measuring an acceleration pointing consistently in direction *z,* for example, meaning that the sensor moves along the *z* axis, but in reality, if it turned in between, the actual trajectory would be curved.

Our next problem is an inherent property of the IMUs: namely, when stationary (e.g., resting on a surface) in gravity, the vector of gravity shows up in the data; hence, to obtain real acceleration, one has to filter out this latent effect, which is no trivial task due to the moving frame of reference.

Last, but not least, we have measurement errors and noise that accumulate and can massively degrade the quality of the reconstructed trajectory in the long run. Inertial navigation, movement tracking based on inertial data, is often referred to as “dead reckoning” in the literature, hence the name IMU-based Dead Reckoning in Space.

### Navigation beyond Earth

Inertial Navigation Systems have been used since the 1960s, so this is not a new thing, but they have their flaws. After the introduction of satellites and the Global Positioning (GPS) and the Global Navigation Satellite System (GNSS) triangulation, i.e., getting a location precise enough on Earth became easy.

Needless to say, the GPS has its limitations as well, namely, the resolution of its position reading is roughly 3-5 meters. This means that one cannot recover movements within this scale, so, for example, if you were to move within a building, e.g., room-to-room, GPS might not be aware of that.

Furthermore, one cannot rely on GPS when a signal is unavailable, e.g., inside caves, buildings, deep underwater, or among the stars, on planets and other space objects. This is where other means of navigation become very important, and this is one of the reasons, besides the beauty of its mathematics, why dead reckoning is still an intensely researched, popular area both in the engineering and mathematical communities.

[

![](https://substackcdn.com/image/fetch/$s_!4EQu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fc0c157-b87a-4632-9959-c5e9c691fabd_1600x1600.png)



](https://substackcdn.com/image/fetch/$s_!4EQu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fc0c157-b87a-4632-9959-c5e9c691fabd_1600x1600.png)
*Mission patch*

## **Phase I - Pre-flight preparations**

After submitting my grant proposal at the end of 2023, a couple of months later, I was very happy to find out that IMU-DRS was pre-selected as one of the experiments Tibor Kapu would conduct in orbit aboard the ISS, so it was time the actual work began.

As mentioned before, this experiment idea was submitted to HUNOR-LAB, which meant no custom hardware development; the idea was to use a mobile device’s built-in sensors to record dynamic data. There were multiple potential options for device type and framework/OS: iPad, iPhone – Swift; Windows - .NET, C#, C++; Android Phone - Kotlin/Java. The most probable scenario was an iPhone or iPad, so I decided to go with the corresponding framework.

In case you are wondering why I haven’t just used any available app for this purpose, there are multiple reasons. First of all, I wanted to label every movement and constrain the recording time to this, so that I could easily separate them. Second, the app had to be approved by NASA, meaning that it had to comply with certain regulations and prescriptions.

I’ve been using Python for 5+ years now, so I had a well-founded base of coding and low-level software design, completed various projects as well, but most of them were closely related to Data Science, Machine Learning & Engineering. This meant that I had to step up my game and start learning software design, testing, syntax, and rules of Swift, along with iOS, since I am mostly an Ubuntu Linux & Windows (as a gamer–guy :)) – on a deeper level.

### In-orbit operations plan

Before diving into the details of my journey with software development, let me briefly describe the plan of in-orbit operations. First of all, set up the camera, as the whole experiment was planned to be recorded on video for later analysis and to help evaluate the reconstructed trajectories, i.e., extract a ”good enough” ground truth.

Since there was only one camera at the disposal of this activity, it won’t be trivial to reconstruct a 3D shape, but knowing the size of the phone and the optical parameters of the camera are of great help; furthermore, most of the shapes were “flat”, meaning they can be well embedded in a plane.

After setting up the camera, the first experiment block would be calibration, in which the astronaut would fix the phone on the wall of the ISS and let measurements run for 30 seconds. Then he would draw different shapes with the mobile in his hand (circle, rectangle, line, and more) and make a “journey” while recording data, e.g., float from one module to another. The dynamic data recorded during each of these blocks was then to be saved to the mobile device and later transmitted to Earth, i.e., to me.

### Transitioning to native development

Circling back to the development, I experimented with some indirect methods, e.g., using the Python package “buildozer” to compile code written in Python to an iOS framework. While this would seem the easiest way for a Python developer, it turned out that installing and testing it on a physical device was a lot harder, especially when not developed on an Apple product. Furthermore, this way I had a lot less control over the app, due to the middleware.

As a consequence, I’ve decided to go the hard way and use Swift with Xcode and Cursor as an IDE, so I acquired my first Mac. Before jumping into coding, I asked a senior iOS developer friend for a crash course, Apple-101, including the acquisition of necessary certificates, Xcode, and iOS dev dos and don’ts, testing apps on virtual and physical devices, and finally submitting an app built to the App Store for testing and release.

I can tell you this was a lot to take in, especially since I didn’t have any experience with app development and official publishing before, but there was no turning back at that point, and I started working immediately.

### Design philosophy and UI

The backend part I wasn’t so much afraid of, as most of my coding work was related to BE, but the front-end and UI were a whole different story. I had to become a full-stack developer in under months.

Of course, I had a very simple design of the app in my head, for multiple reasons: first, it had to be very robust and not prone to error – the experiment was to be executed one time only, there is no possibility for hotfixes, new releases, and repetitions –so, the simpler the better. Second, it was also very important to help the astronaut by implementing a straightforward, intuitive workflow. Lastly, it was highly unlikely that I became a senior/expert iOS developer overnight, so I had to focus and work with the concepts I understood and had firm control over.

### Prototyping and App Store approval

I used an iPad for testing the first prototypes of the upcoming space app, since the built-in virtual devices wouldn’t have accelerometers, gyroscopes, or magnetometers available, nor any corresponding mock data. Fast-forward to a working prototype and the first submission to Apple Store Connect for review.

The app consisted of three screens: Experiment Selector, consisting of all different experiment blocks, a dedicated Experiment Screen managing a single type of block, and the Database Overview for getting info about the completed runs, status, and the possibility to remove single records.

To my biggest surprise, the first submission was accepted, and consequent ones as well on the first attempt. Well, I guess that this was partially due to its simple nature, as I tried to keep the necessary phone functions to a minimum – no financial transactions, no registration, no handling of personal data, etc., but then again none of these were necessary in the first place –, and because I’m an awesome developer (haha jk :)).

[

![](https://substackcdn.com/image/fetch/$s_!N8DI!,w_2400,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3f459d-ebb4-4e34-be38-eb12cdf7b356_1920x1080.png)



](https://substackcdn.com/image/fetch/$s_!N8DI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3f459d-ebb4-4e34-be38-eb12cdf7b356_1920x1080.png)
*Screenshots of the app’s final – flight-ready – version. (a) Experiment Selector (b) Experiment Screen (c) Database Overview*

### The experiment workflow

The workflow of recording an experiment was quite simple:

1.  Choose an experiment block on the landing screen of the app and tap the corresponding button.
    
2.  After being directed to the dedicated experiment page, read the instructions.
    
3.  Tap the huge START button when ready. Countdown starts 3..2..1 and go!
    
4.  Draw the appropriate shape and tap END. If something went wrong, a CANCEL button should appear beside END.
    
5.  Repeat steps 1-4 until finished.
    

To avoid runaway recordings, I implemented an auto-cancel whenever a running experiment block was interrupted, e.g., when the app entered the background, the user tapped the Home button, etc. Whenever an experiment block was finished by tapping END, it was saved into a SQLite database file on the phone. This is the file that was to be transmitted to Earth after concluding the whole experiment session.

### NASA approval and UI constraints

Apart from standard unit tests and implementing a custom sensor-mocker test suite to simulate non-standard sensor-related errors, plus the usual Apple Review, I also had to get NASA’s approval to fix the final version and make it flight-ready.

This included going through the basic functions, but the main focus was on the UI. There are many regulations regarding the UI of any app, e.g., the color red is reserved for error/danger, the size and spacing of buttons, and the color and contrast. They were very cooperative and helpful. I enjoyed working with them! Hope this was the case vice versa. As a bonus, I had the opportunity to work with NASA, which, in my honest opinion, is extremely cool, even though the product was a simple app rather than a new spaceship or satellite.

### Final documentation and protocol

After a couple of iterations, the flight version was released in early 2025 and was ready to go. Apart from the massive documentation that I had to prepare – about 100 pages in total, including software architecture and design, operation manuals, power/memory consumption and required time estimates etc. –, the last task to do was writing up a precise protocol that the astronaut would follow, in other words a guide for the experiment, like a check-list pilots go through before take-off.

This document was then handed over to the astronaut so he could learn it. For my experiment, this had to be quite straightforward, or so you would think, but even in this case, I had to plan for everything, even low-probability events (e.g., what if the phone battery dies, or the app suddenly crashes).

Even the simplest tasks on Earth can become a lot more complex in space. Since the notions “up” and “down” make no sense, screen orientation has to be fixed as well!

### **A side quest**

The whole HUNOR program received a lot of media attention, and podcasts, articles, and videos were created in connection with the astronaut training, the mission, and the experiments.

I was also one of the researchers in a short introductory video that was shot, in which I briefly explained the main ideas of this experiment and the potential areas of application of the results. While preparing for the recording event, I had an idea to make the video more fun, which involved machine learning.

What if I recorded a shape, e.g., a circle, and sent the data to my laptop, which would plot it and classify the shape? For the classification part, I decided to go with a TCN (time-convolution network).

I used an 80-20 split for the train-val split. To enrich the data and help the training, I used random scaling and rotation to transform the raw data and managed to achieve around 90% validation accuracy. Of course, the training data, even after augmentation, would not go into the 10,000s of records (I got up to about 3000 augmented samples), but this was good enough, as it was meant for demonstration purposes.

I had to exclude some shapes from the classification (line, spin, free motion, and journey); the last three were hard to get data for, and the model had a really hard time with the line shape, but then again, it wasn’t the most interesting anyway.

It could have been the lack of data, or the fact that the raw measurement readings on a line are not as rich as the others, so the model could’ve had a hard time in extracting the right features, or, simply, the model was not smart enough, but I did not have the capacity at the time to explore reasons behind this.

## **Phase II - Launch and In-Orbit Operations**

All developments were to be finalized by early 2025. As a consequence, the app has been frozen at version 1.4.2, and this happened as planned without any major issues. All (unit) tests were successful, any previously recorded data looked good, the operations manual was ready and handed over, so the experiment IMU-DRS was ready to go and packed in by Axiom.

The earliest opportunity to get ready for a launch was set for no earlier than Spring 2025. Since the mission was planned to last about 2 weeks, I thought it was safe to plan my summer vacation for the end of June, but little did I know... Time passed by, and finally the date was set: June 10.

Just before the day, the launch was postponed to June 11 due to weather conditions, with a backup on June 12. The crew had already been in isolation for 2 weeks before launch. On the 11th, while cycling through routine startup protocol, liquid oxygen was found leaking from the rocket, which was no small issue, so launch was delayed again, after repairs.

### The narrow window

This was when I started to feel that booking a vacation for the end of June was not a good idea. After some poking around, I decided to move my holidays to the end of August, which wasn’t easy given the summer season, but I managed to do so with a slight surcharge. Well, better than losing the whole vacation, right?

Before a new date could have been announced, a new problem emerged: ISS’s Zvezda, Ax-4’s home-to-be module, was leaking, so the launch was indefinitely postponed. This is a known recurring problem with varying intensity of the aforementioned module, but the responsible authorities wouldn’t give the green light until it was absolutely safe.

The crew was now in quarantine for about 3-4 weeks. After the last postponed date, June 22, the final date of the launch was June 25, and as such, it was on the edge of the last opportunity due to a crew change on the ISS. So if the launch did not happen until this date, the whole mission would have to be postponed to late August.

### Launch and execution

This had to be a hard time for the crew, especially coping with all the problems, the extended quarantine, and the seemingly endless waiting for launch. But in the end, it finally happened, the whole process was live-streamed by Axiom, you can check it on this [link.](https://www.youtube.com/watch?v=YAue1QljRg4) Approach and docking were also streamed, available to watch the recorded video [here](https://www.youtube.com/watch?v=rvOKNBvXhz4).

In case you are wondering why I (had to) postpone my vacation, as Principal Investigator, I could oversee the experiment via a live video feed, which I gotta say was an absolutely unique experience: an astronaut doing my experiment on the ISS. Although I was confident that my app would work well and smoothly, I was still slightly nervous, as there was no second chance to start over.

Fortunately, everything went as planned, data was recorded successfully, no crashes, corruptions, or data loss, so I was very happy. All this supervision happened at HUNOR’s PSC (Payload Support Center), which was a room dedicated to observation and communication with Axiom, NASA, and the ISS, with lots of huge screens, just like in the movies.

[

![](https://substackcdn.com/image/fetch/$s_!YE7r!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F08fdd8da-b0ee-4877-938b-c5b8a1a86d23_1600x990.jpeg)



](https://substackcdn.com/image/fetch/$s_!YE7r!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F08fdd8da-b0ee-4877-938b-c5b8a1a86d23_1600x990.jpeg)
*Kapu on the ISS ([source](https://www.facebook.com/photo/?fbid=1049678097353909&set=a.404548045200254))*

Tibor was very efficient in conducting the experiments; he stayed on schedule, and 25 Hungarian experiments were packed into the Dragon, each of which was successful. The return was delayed by a couple of days, so there was a window for an extended experiment block for IMU-DRS: a sort of “calibration” measurement was performed over two full orbits of the ISS, approximately 3 hours.

I plotted the magnetometer readings; the two periods are nicely recognizable on the curves, which really surprised me, to be honest, as the ISS must have lots of electronic noise from all the onboard machines, but this did not have a destructive effect on the measurement. Cool, ain’t it? After more than two weeks in orbit, Grace and her crew splashed down off the Coast of California on July 15 (Reentry and Splashdown [video](https://www.youtube.com/watch?v=X00eO_hLeWU)).

[

![](https://substackcdn.com/image/fetch/$s_!K_dn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf413ea5-60f2-4d8d-8d3a-91a59ef415ad_1600x1600.png "Raw magnetometer data of two orbits")



](https://substackcdn.com/image/fetch/$s_!K_dn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf413ea5-60f2-4d8d-8d3a-91a59ef415ad_1600x1600.png)

## Phase III - Post Flight & Experiment evaluation

The next step in the journey was the analysis of the measurements and the recorded video during the mission. It took a couple of weeks for the actual data to reach me, as the video had to be approved by NASA, but eventually I got them all at the end of July, and so my project was wrapped up and archived on Axiom’s side.

It was time to take a deep dive into the data and start studying it. Without going into too much technical detail, let me give you a high-level overview of the current standing of my investigations.

### Earth vs. microgravity

The first part: comparing sensor behavior in microgravity versus under gravity on Earth. The calibration blocks were intended to help this investigation; along with others, they were performed on Earth with the flight phone so I could rule out inter-sensor variations.

In each case, a non-zero bias/offset was determined, which is totally normal for MEMS (Micro-Electro-Mechanical Systems), no surprise there. After centering the calibration data (sensor readings collected over 30 seconds while at rest, 100Hz sampling frequency), i.e., subtracting their means, and comparing the distributions (ISS vs. Earth) using various methods, I found differences across certain sensor axes.

The most striking difference was shown in the accelerometers’ y and z axes, which were the most under the influence of gravity on Earth. Just a reminder: on Earth, IMUs measure gravity while resting, plus sensor noise (standard deviation) was slightly lower on the ISS, but both were approximately of the same order.

### Trajectory reconstruction

The other, more intriguing and fun part of the experiment is the reconstruction of the motion trajectories. Now this was a more challenging task, due to the nature of the data: as mentioned before, IMUs measure with respect to their own axis, i.e., a moving frame of reference.

This means that to reconstruct a trajectory, one has to follow the sensor’s orientation along with its velocity and position. While theoretically this is a well-defined and already solved problem, in practice, it can be challenging due to the imperfections of measurements.

Experimenting around with some Lie-Runge-Kutta integrators, I was able to get pretty good – preliminary – reconstructions shown in the next figures.

[

![](https://substackcdn.com/image/fetch/$s_!kWLk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa3e697f-40a8-4204-903b-e73069668906_1600x1280.png)



](https://substackcdn.com/image/fetch/$s_!kWLk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa3e697f-40a8-4204-903b-e73069668906_1600x1280.png)
*Reconstructed circle motion (ISS)*

[

![](https://substackcdn.com/image/fetch/$s_!0F2H!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe300b013-65f6-4ea4-8f94-842073ebe8b3_1600x1280.png)



](https://substackcdn.com/image/fetch/$s_!0F2H!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe300b013-65f6-4ea4-8f94-842073ebe8b3_1600x1280.png)
*Reconstructed schematic house (ISS)*

I plan to compare these to the ones seen on the recorded video. Since there was only one camera, calculating depth will be non-trivial, but knowing the camera parameters and the phone’s size, it is possible to get usable estimates, at least good enough to use as ground truth. Repeat the same for blocks recorded on Earth, thus establishing a valid base for comparison and metrics.

[

![](https://substackcdn.com/image/fetch/$s_!C5XA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff444b75c-8d7c-4ceb-ab1c-b20622d27b5f_1600x1200.jpeg)



](https://substackcdn.com/image/fetch/$s_!C5XA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff444b75c-8d7c-4ceb-ab1c-b20622d27b5f_1600x1200.jpeg)
*From left to right: Tibor Kapu, Miklós Kornyik (me), Gyula Cserényi*

Huge shout-out to the HUNOR team and Axiom Space for their effort and dedication on the mission, and to NASA and ESA for their cooperation and support!