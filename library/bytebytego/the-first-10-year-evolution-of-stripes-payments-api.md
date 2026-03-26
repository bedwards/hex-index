---
title: "The First 10-Year Evolution of Stripe’s Payments API"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2026-02-18T16:31:13.000Z"
source_url: "https://blog.bytebytego.com/p/the-first-10-year-evolution-of-stripes"
word_count: 2635
estimated_read_time: 14
---

## **[✂️ Cut your QA cycles down to minutes with QA Wolf (Sponsored)](https://go.bytebytego.com/QAWolf_021826Headline)**

[

![](https://substackcdn.com/image/fetch/$s_!RVk4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf71481c-87ef-4d0d-a976-b818bd864540_1600x840.png)



](https://go.bytebytego.com/QAWolf_021826CTA)

If slow QA processes bottleneck you or your software engineering team and you’re releasing slower because of it — you need to check out QA Wolf.

QA Wolf’s AI-native service **supports web and mobile apps**, delivering [80% automated test coverage in weeks](https://go.bytebytego.com/QAWolf_021826Automated) and helping teams **ship 5x faster** by reducing QA cycles to minutes.

[QA Wolf](https://go.bytebytego.com/QAWolf_021826QAWolf) takes testing off your plate. They can get you:

-   Unlimited parallel test runs for mobile and web apps
    
-   24-hour maintenance and on-demand test creation
    
-   Human-verified bug reports sent directly to your team
    
-   Zero flakes guarantee
    

The benefit? No more manual E2E testing. No more slow QA cycles. No more bugs reaching production.

With QA Wolf, [Drata’s team of 80+ engineers](https://go.bytebytego.com/QAWolf_021826Drata) achieved 4x more test cases and **86% faster QA cycles**.

\---

When Stripe first launched, they became known for integrating payment processing into any business with just seven lines of code.

This was a really big achievement. Taking something as complex as credit card processing and reducing it to a simple code snippet felt revolutionary. In essence, a developer could open a terminal, run a basic curl command, and immediately see a successful credit card payment.

However, building and maintaining a payment API that works across dozens of countries, each with different payment methods, banking systems, and regulatory requirements, is one of the most difficult problems. Most of the time, companies either lock themselves into supporting just one or two payment methods or force developers to write different integration code for each market.

Stripe had to evolve the API multiple times over the next 10 years to handle credit cards, bank transfers, Bitcoin wallets, and cash payments through a unified integration.

But getting there wasn’t easy. In this article, we look at how Stripe’s payment APIs evolved over the years, the technical challenges they faced, and the engineering decisions that shaped modern payment processing.

*Disclaimer: This post is based on publicly shared details from the Stripe Engineering Team. Please comment if you notice any inaccuracies.*

## The Beginning: Supporting Card Payments in the US (2011-2015)

When Stripe launched in 2011, credit cards dominated the US payment landscape. The initial API design reflected this reality.

Stripe introduced two fundamental concepts that would become the foundation of their platform.

The Token was the first concept. When a customer entered their card details in a web browser, those details were sent directly to Stripe’s servers using a JavaScript library called Stripe.js.

This was crucial for security. By never allowing card data to touch the merchant’s servers, Stripe helped businesses avoid complex PCI compliance requirements. PCI compliance refers to security standards that businesses must follow when handling credit card information. These requirements are expensive and technically demanding to implement correctly.

In exchange for the card details, Stripe returned a Token. Think of a Token as a safe reference to the card information. The actual card number lived in Stripe’s secure systems. The Token was just a pointer to that data.

The Charge was the second concept. After receiving a Token from the client, the merchant’s server could create a Charge using that Token and a secret API key.

A Charge represented the actual payment request. When you created a Charge, the payment either succeeded or failed immediately. This immediate response is called synchronous processing, meaning the result comes back right away.

See the diagram below that shows this approach:

[

![](https://substackcdn.com/image/fetch/$s_!aXP-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd2193bb7-8f4c-4675-8be4-ee78ef9ca232_2184x1586.png)



](https://substackcdn.com/image/fetch/$s_!aXP-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd2193bb7-8f4c-4675-8be4-ee78ef9ca232_2184x1586.png)

The payment flow followed a pattern common in traditional web applications:

-   JavaScript client creates a Token using a publishable API key
    
-   The browser sends the Token to the merchant’s server
    
-   The server creates a Charge using the Token and a secret API key
    
-   Payment succeeds or fails immediately
    
-   The server can fulfill the order based on the result
    

## The First Challenge: ACH and Bitcoin (2015)

As Stripe expanded, they needed to support payment methods beyond credit cards. In 2015, they added ACH debit and Bitcoin. These payment methods introduced fundamental differences that challenged the existing API design.

### Understanding Payment Method Characteristics

Payment methods differ along two important dimensions.

-   First, when is the payment finalized? Finalized means you have confidence that the funds are guaranteed and you can ship goods to the customer. Credit card payments are finalized immediately. However, Bitcoin payments can take about an hour, whereas ACH debit payments may take days to finalize.
    
-   Second, who initiates the payment? With credit cards and ACH debit, the merchant initiates the payment by charging the customer. With Bitcoin, the customer creates a transaction and sends it to the merchant. This requires the customer to take action before any money moves.
    

### Technical Solutions

For ACH debit, Stripe extended the Token resource to represent both card details and bank account details. However, they needed to add a pending state to the Charge. An ACH debit Charge would start as pending and only transition to successful days later. Merchants had to implement webhooks to know when the payment actually succeeded.

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!eafi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4841b675-eace-4aca-a3de-fbfcabdc4555_2402x1586.png)



](https://substackcdn.com/image/fetch/$s_!eafi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4841b675-eace-4aca-a3de-fbfcabdc4555_2402x1586.png)

For reference, a webhook is a mechanism where Stripe calls your server when something happens. Instead of your server repeatedly asking Stripe if the payment succeeded yet, Stripe sends a notification to a URL on your server when the status changes. Your server needs to set up an endpoint that listens for these notifications and processes them accordingly.

For Bitcoin, the existing abstractions did not work at all. Stripe introduced a new BitcoinReceiver resource. A receiver was a temporary storage for funds. It had a simple state machine with one boolean property called filled. A state machine is a system that can be in different states and transitions between them based on events. The BitcoinReceiver could be filled (true) or not filled (false).

The Bitcoin payment flow worked like this:

-   Client creates a BitcoinReceiver.
    
-   The customer sends Bitcoin to the receiver’s address.
    
-   Receiver transitions to filled.
    
-   The server creates a Charge using the BitcoinReceiver.
    
-   The charge starts in the pending state.
    
-   Charge transitions to “succeeded” after confirmations.
    

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!haDq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F993b48d5-a367-41ca-ab32-15d2c45f317b_2402x1586.png)



](https://substackcdn.com/image/fetch/$s_!haDq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F993b48d5-a367-41ca-ab32-15d2c45f317b_2402x1586.png)

This introduced complexity. Merchants now had to manage two state machines to complete a single payment: BitcoinReceiver on the client side and Charge on the server side. Additionally, they needed to handle asynchronous payment finalization through webhooks.

## Seeking a Simpler Approach: The Sources API (2015-2017)

Over the next two years, Stripe added many more payment methods. Most were similar to Bitcoin, requiring customer action to initiate payment. The Stripe engineering team realized that creating a new receiver-like resource for each payment method would become unmanageable. Therefore, they decided to design a unified payments API.

To do so, Stripe combined Tokens and BitcoinReceivers into a single client-driven state machine called a Source. When created, a Source could be immediately chargeable, like credit cards, or pending, like payment methods requiring customer action. The server-side integration remained simple: create a Charge using the Source.

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!MQxY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2b94f63-33ec-49fd-b23e-bec0fd04197f_2402x1586.png)



](https://substackcdn.com/image/fetch/$s_!MQxY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff2b94f63-33ec-49fd-b23e-bec0fd04197f_2402x1586.png)

The Sources API supported cards, ACH debit, SEPA direct debit, iDEAL, Alipay, Giropay, Bancontact, WeChat Pay, Bitcoin, and many others. All of these payment methods use the same two API abstractions: a Source and a Charge.

While this approach seemed elegant at first, the team discovered serious problems once they understood how the flow integrated into real applications. Consider a common scenario with iDEAL, the predominant payment method in the Netherlands:

-   The customer completes payment on their bank’s website.
    
-   If the browser loses connectivity before communicating back to the merchant’s server, the server never creates a Charge.
    
-   After a few hours, Stripe automatically refunds the money to the customer. The merchant loses the sale even though the customer successfully paid. This is a conversion nightmare.
    

To reduce this risk, Stripe recommended that merchants either poll the API from their server until the Source became chargeable or listen for the source.chargeable webhook event to create the Charge. However, if a merchant’s application went down temporarily, these webhooks would not be delivered, and the server would not create the Charge.

[

![](https://substackcdn.com/image/fetch/$s_!WXWW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F820b6645-baac-4e4c-aa63-bcbae1c13e77_2402x1586.png)



](https://substackcdn.com/image/fetch/$s_!WXWW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F820b6645-baac-4e4c-aa63-bcbae1c13e77_2402x1586.png)

The integration grew more complex because different Sources behaved differently:

-   Some Sources like cards and bank account were synchronously chargeable and could be charged immediately on the server. Others were asynchronous and could only be charged hours or days later. Merchants often built parallel integrations using both synchronous HTTP requests and event-driven webhook handlers.
    
-   For payment methods like OXXO, where customers print a physical voucher and pay cash at a store, the payment happens entirely outside the digital flow. Listening for the webhook became necessary for these payment methods.
    
-   Merchants also had to track both the Charge ID and Source ID for each order. If two Sources became chargeable for the same order, perhaps because a customer decided to switch payment methods mid-payment, the merchant needed logic to prevent double-charging.
    

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!2P17!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2edfaff-eded-4aab-9db0-ee258155a96f_3172x1512.png)



](https://substackcdn.com/image/fetch/$s_!2P17!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2edfaff-eded-4aab-9db0-ee258155a96f_3172x1512.png)

### The Fundamental Problem

Stripe realized they had designed their system around the simplest payment method: credit cards. Looking at all payment methods, cards were actually the outlier. Cards were the only payment method that finalized immediately and required no customer action to initiate payment. Everything else was more complex.

Developers had to understand the success, failure, and pending states of two state machines whose states varied across different payment methods. This demanded far more conceptual understanding than the original seven lines of code promised.

## The Solution: PaymentIntents and PaymentMethods (2017-2018)

In late 2017, Stripe assembled a small team: four engineers and one product manager. They locked themselves in a conference room for three months with a singular goal of designing a truly unified payments API that would work for all payment methods globally.

The team followed strict rules:

-   They closed their laptops during working sessions to stay fully present.
    
-   They started each session with questions they wanted to answer and wrote down new questions for later sessions rather than getting sidetracked.
    
-   They used colors and shapes on whiteboards instead of naming concepts prematurely, avoiding premature anchoring on specific definitions.
    
-   Most importantly, they focused on enabling real user integrations. They wrote hypothetical integration guides for every payment method to validate their concepts.
    
-   They even wrote guides for imaginary payment methods to ensure the abstractions were flexible enough.
    

[

![](https://substackcdn.com/image/fetch/$s_!mqW_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F743aacaf-4aa6-488f-b640-c5f2f53b3554_541x406.png)



](https://substackcdn.com/image/fetch/$s_!mqW_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F743aacaf-4aa6-488f-b640-c5f2f53b3554_541x406.png)
*Source: [Stripe Engineering Blog](https://stripe.com/blog/payment-api-design)*

### The New Abstractions

The team created two new concepts that finally achieved true unification.

PaymentMethod represents the “how of a payment.” It contains static information about the payment instrument the customer wants to use. This includes the payment scheme and credentials needed to move money, such as card information, bank account details, or customer email. For some methods (like Alipay), only the payment method name is required because the payment method itself handles collecting further information. Importantly, a PaymentMethod has no state machine and contains no transaction-specific data. It is simply a description of how to process a payment.

PaymentIntent represents the “what of a payment.” It captures transaction-specific data such as the amount to charge and the currency. The PaymentIntent is the stateful object that tracks the customer’s attempt to pay. If one payment attempt fails, the customer can try again with a different PaymentMethod. The same PaymentIntent can be used with multiple PaymentMethods until payment succeeds.

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!Z73o!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb76fcf1-5c3b-4a52-83ca-c1e9314b66f0_2402x1614.png)



](https://substackcdn.com/image/fetch/$s_!Z73o!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb76fcf1-5c3b-4a52-83ca-c1e9314b66f0_2402x1614.png)

### The PaymentIntent State Machine

The key insight was creating one predictable state machine for all payment methods:

-   **requires\_payment\_method:** Need to specify how the customer will pay
    
-   **requires\_confirmation:** Have the payment method ready to initiate payment
    
-   **requires\_action:** Customer must do something like authenticate or redirect
    
-   **processing:** Stripe is processing the payment
    
-   **succeeded:** Funds are guaranteed, and the merchant can fulfill the order
    

Notably, there is no failed state. If a payment attempt fails, the PaymentIntent returns to requires\_payment\_method so the customer can try again with a different method.

### The Integration Flow

The new integration works consistently across all payment methods:

-   The server creates a PaymentIntent with an amount and a currency
    
-   Server sends the PaymentIntent’s client\_secret to the browser
    
-   The browser collects the customer’s preferred payment method
    
-   The browser confirms the PaymentIntent using the secret and payment method
    
-   PaymentIntent may enter requires\_action state with instructions
    
-   The browser handles the action, such as 3D Secure authentication
    
-   Server listens for payment\_intent.succeeded webhook
    
-   The server fulfills the order when payment succeeds
    

This approach had major improvements over Sources and Charges. Only one webhook handler was needed, and it was not in the critical path for collecting money. The entire flow used one predictable state machine. The integration was resilient to client disconnects because the PaymentIntent persisted on the server. Most importantly, the same integration worked for all payment methods with just parameter changes.

## The Launch Challenge: Making It Accessible (2018-2020)

Designing the PaymentIntents API was the hard but enjoyable part. Launching it took almost two years because of a perception challenge: the new API did not feel like seven lines of code anymore.

In normalizing the API across all payment methods, card payments became more complicated to integrate. The new flow flipped the order of client and server requests. It also introduced webhook events that were optional before. For developers building traditional web applications who only cared about accepting card payments in the US and Canada, PaymentIntents was objectively harder than Charges.

The power-to-effort curve looked different. Each incremental payment method was cheap to add to a PaymentIntents integration. However, getting started with just card payments required more upfront effort. Speed matters for startups wanting to get running quickly. With Charges, getting cards working was intuitive and low-effort.

[

![](https://substackcdn.com/image/fetch/$s_!sADi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a6b4ade-1267-48da-9ac4-dbb34ddf66ad_3140x1744.png)



](https://substackcdn.com/image/fetch/$s_!sADi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a6b4ade-1267-48da-9ac4-dbb34ddf66ad_3140x1744.png)
*Source: [Stripe Engineering Blog](https://stripe.com/blog/payment-api-design)*

Stripe’s solution was to add convenient packaging of the API that catered to developers who wanted the simplest possible flow. They called the default integration the global payments integration and created a simpler version called card payments without bank authentication.

This simpler integration used a special parameter called error\_on\_requires\_action. This parameter tells the PaymentIntent to return an error if any customer action is required to complete the payment. A merchant using this parameter cannot handle actions required by the PaymentIntent state machine, effectively making it behave like the old Charges API.

The parameter name makes it very clear what merchants are choosing. When they eventually need to handle actions or add new payment methods, it is obvious what to do: remove this parameter and start handling the requires\_action state. Developers using this packaging do not have to change the core resources even when upgrading to the full global integration.

## Supporting Infrastructure

Stripe emphasized that a great API requires more than just the API itself. Some approaches they used are as follows:

-   They developed the Stripe CLI, a command-line tool that made testing webhooks locally much simpler.
    
-   They created Stripe Samples, allowing developers who prefer learning by example to start with working code.
    
-   They redesigned the Stripe Dashboard to help developers debug and understand the PaymentIntent state machine visually.
    

The team also handled the unglamorous but essential work of updating every piece of documentation, support article, and canned response that referenced old APIs. They reached out to community content creators, asking them to update their materials. They recorded numerous tutorials for both users and internal support teams.

## Conclusion

The journey from Charges to PaymentIntents revealed important principles about API design.

-   First, successful products tend to accumulate product debt over time, similar to technical debt. For API products, this debt is particularly hard to address because you cannot force developers to restructure their integrations fundamentally. It is much easier to add parameters to existing requests than to introduce new abstractions.
    
-   Second, designing from first principles is essential. Stripe realized that Charges and Tokens were foundational, not because they were the right abstraction for global payments, but simply because they were the first APIs built. They had to set aside the existing APIs and think about the problem fresh.
    
-   Third, keeping things simple does not mean reducing the number of resources or parameters. Two overloaded abstractions are not simpler than four clearly-defined abstractions. Simplicity means making APIs consistent and predictable while creating the right packages.
    
-   Fourth, migration requires compromise. Stripe created Charge objects behind the scenes for each PaymentIntent to maintain compatibility with existing integrations. This allowed merchants to migrate their payment flow without breaking their analytics and reporting systems.
    
-   Finally, API design is fundamentally collaborative work. The breakthrough came when engineers and product managers worked together intensively, closing laptops and focusing completely on understanding the problem space.
    

In a nutshell, Stripe’s evolution from seven lines of code to a sophisticated global payments API demonstrates that simplicity and power are not opposing goals. The challenge is creating abstractions that handle complexity internally while presenting a predictable, consistent interface to developers.

**References:**

-   [Stripe’s Payment APIs: The First 10 Years](https://stripe.com/blog/payment-api-design)
    
-   [Stripe Evolution](https://en.wikipedia.org/wiki/Stripe,_Inc.)