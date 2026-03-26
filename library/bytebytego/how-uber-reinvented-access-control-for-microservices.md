---
title: "How Uber Reinvented Access Control for Microservices"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2026-02-24T16:30:15.000Z"
source_url: "https://blog.bytebytego.com/p/how-uber-reinvented-access-control"
word_count: 2098
estimated_read_time: 11
---

## [Don’t miss out: your free pass to Monster SCALE Summit is waiting! 50+ engineering talks on AI, databases, Rust, and more. (Sponsored)](https://go.bytebytego.com/Scylladb_022426)

*Monster SCALE Summit is a new virtual conference all about extreme-scale engineering and data-intensive applications.*

[

![](https://substackcdn.com/image/fetch/$s_!xvob!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1342334d-35ac-4296-a74d-5374f357c318_1600x840.jpeg)



](https://go.bytebytego.com/Scylladb_022426)

Join us on March 11 and 12 to learn from engineers at Discord, Disney, LinkedIn, Uber, Pinterest, Rivian, ClickHouse, Redis, MongoDB, ScyllaDB and more. A few topics on the agenda:

-   What Engineering Leaders Get Wrong About Scale
    
-   How Discord Automates Database Operations at Scale
    
-   Lessons from Redesigning Uber’s Risk-as-a-Service Architecture
    
-   Scaling Relational Databases at Nextdoor
    
-   How LinkedIn Powers Recommendations to Billions of Users
    
-   Powering Real-Time Vehicle Intelligence at Rivian with Apache Flink and Kafka
    
-   The Data Architecture behind Pinterest’s Ads Reporting Services
    

Bonus: We have 500 free swag packs for attendees. And everyone gets 30-day access to the complete O’Reilly library & learning platform.

\---

Uber’s infrastructure runs on thousands of microservices, each making authorization decisions millions of times per day. This includes every API call, database query, and message published to Kafka. To make matters more interesting, Uber needs these decisions to happen in microseconds to have the best possible user experience.

Traditional access control could not handle the complexity. For instance, you might say “service A can call service B” or “employees in the admin group can access this database.” While these rules work for small systems, they fall short when you need more control. For example, what if you need to restrict access based on the user’s location, the time of day, or relationships between different pieces of data?

Uber needed a better approach. They built an attribute-based access control system called Charter to evaluate complex conditions against attributes pulled from various sources at runtime.

In this article, we will look at how the Uber engineering team built Charter and the challenges they faced.

*Disclaimer: This post is based on publicly shared details from the Uber Engineering Team. Please comment if you notice any inaccuracies.*

## Understanding the Authorization Request

Before diving into ABAC, you need to understand how Uber thinks about authorization. Every access request can be broken down into a simple question:

Can an Actor perform an Action on a Resource in a given Context?

Let’s understand each component of this statement:

-   Actor represents the entity making the request. At Uber, this could be an employee, a customer, or another microservice. Uber uses the SPIFFE format to identify actors. An employee might be identified as **spiffe://personnel.upki.ca/eid/123456**, where 123456 is their employee ID. A microservice running in production would be identified as **spiffe://prod.upki.ca/workload/service-foo/production**
    
-   Action describes what the actor wants to do. Common actions include create, read, update, and delete, often abbreviated as CRUD. Services can also define custom actions like invoke for API calls, subscribe for message queues, or publish for event streams.
    
-   A resource is the object being accessed. Uber represents resources using UON, which stands for Uber Object Name. This is a URI-style format that looks like **uon://service-name/environment/resource-type/identifier**. For example, a specific table in a database might be **uon://orders.mysql.storage/production/table/orders.**
    

The host portion of the UON is called the policy domain. This acts as a namespace for grouping related policies and configurations.

## The Charter System

As mentioned, Uber built a centralized service called Charter to manage all authorization policies. Think of Charter as a policy repository where administrators define who can access what. This approach offers several advantages over having each service implement its own authorization logic.

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!1N_U!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb5e415b-d3ff-4d8a-907e-97ddd87df1a0_2756x1774.png)



](https://substackcdn.com/image/fetch/$s_!1N_U!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb5e415b-d3ff-4d8a-907e-97ddd87df1a0_2756x1774.png)

Policies stored in Charter are distributed to individual services. Each service includes a local library called authfx that evaluates these policies.

The architecture works as follows:

-   Policy authors create and update policies in Charter
    
-   Charter stores these policies in a database
    
-   A unified configuration distribution system pushes policy updates to all relevant services
    
-   Services use the authfx library to evaluate policies for incoming requests
    
-   Authorization decisions are made locally within each service
    

\---

## [Turn Search Engines Into APIs for Your App (Sponsored)](https://go.bytebytego.com/SerpAPI_022426)

[

![](https://substackcdn.com/image/fetch/$s_!4Slh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F849aa9d7-120a-4bed-a7eb-d2d04f3db67d_3200x1809.png)



](https://go.bytebytego.com/SerpAPI_022426)

SerpApi turns live search engines into APIs, returning clean JSON for results, reviews, prices, locations, and more. Use it to ground your app or LLMs with real-world data from Google, Maps, Amazon, and beyond, without maintaining scrapers.

\---

## Basic Policies

The simplest form of policy at Uber connects actors to resources through actions.

[

![](https://substackcdn.com/image/fetch/$s_!irbC!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe47e47a7-bdb7-4beb-98c9-757684c1be49_2298x1394.png)



](https://substackcdn.com/image/fetch/$s_!irbC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe47e47a7-bdb7-4beb-98c9-757684c1be49_2298x1394.png)

A basic policy might look like this in YAML format:

```yaml
file_type: policy
effect: allow
actions:
  - invoke
resource: “uon://service-foo/production/rpc/foo/method1”
associations:
  - target_type: WORKLOAD
    target_id: “spiffe://prod.upki.ca/workload/service-bar/production”
```

This policy translates to: “Allow service-bar to invoke method1 of service-foo.” Another example shows how employees can be granted access:

```yaml
file_type: policy
effect: allow
actions:
  - read
  - write
resource: “uon://querybuilder/production/report/*”
associations:
  - target_type: GROUP
    target_id: “querybuilder-development”
```

This policy means: “Allow employees in the querybuilder-development group to read and write query reports.”

These basic policies work well for straightforward authorization scenarios. However, real-world requirements are often more complex.

## Why ABAC Became Necessary

Uber encountered several limitations with the basic policy model.

For example, consider a payment support service. Customer support representatives need to access payment information to help customers. However, for privacy and compliance reasons, support reps should only access payment data for customers in their assigned region. The basic policy syntax can only specify that a representative can access a payment profile by its UUID. It cannot express the requirement that the rep’s region must also match the customer’s region.

Another example involves employee data. An employee information service needs to allow employees to view and edit their own profiles. It should also allow their managers to access their profiles. The basic policy model cannot express this “self or manager” relationship because it would require checking whether the actor’s employee ID matches either the resource’s employee ID or the resource’s manager ID.

A third scenario involves data analytics. Some reports should only be accessible to users who belong to multiple specific groups simultaneously. The existing model supported checking if a user belonged to any group in a list, but not whether they belonged to all groups in a list.

In a nutshell, Uber needed a way to incorporate additional context and attributes into authorization decisions.

### Introducing Attributes and Conditions

ABAC extends the basic policy model by adding conditions. A condition is a Boolean expression that evaluates to true or false based on attributes. If a permission includes a condition, that permission only grants access when the condition evaluates to true.

[

![](https://substackcdn.com/image/fetch/$s_!7hYY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff0e6292-7448-4b2b-927e-db73e8d8fc80_2756x1446.png)



](https://substackcdn.com/image/fetch/$s_!7hYY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fff0e6292-7448-4b2b-927e-db73e8d8fc80_2756x1446.png)

Attributes are characteristics of actors, resources, actions, or the environment. For example:

-   An actor might have attributes like location, department, or role.
    
-   A resource might have attributes such as owner, sensitivity level, or creation date.
    
-   The environment might provide attributes like current time, day of the week, or request IP address.
    

Attribute Stores are the sources that provide attribute values at authorization time. In formal authorization terminology, these are called Policy Information Points or PIPs. When evaluating a condition, the authorization engine queries the appropriate attribute store to fetch the necessary values.

The enhanced policy model adds an optional condition field to each permission. Here’s an example:

```yaml
actions: [create, delete, read, update]
resource: “uon://payments.svc/production/payment/*”
associations:
  - target_type: EMPLOYEE
condition:
  expression: “resource.paymentType == ‘credit card’ && actor.location == resource.paymentLocation”
effect: ALLOW
```
```

This policy allows employees to perform CRUD operations on payment records, but only when two conditions are met: the payment type is a credit card, and the employee’s location matches the payment’s location.

## The Technical Architecture of ABAC

When ABAC is enabled, the authorization architecture includes additional components.

The authfx library now includes an authorization engine that coordinates policy evaluation. When a request arrives, the engine first checks if the basic requirements are met: does the actor match, does the action match, does the resource match? If those checks pass and a condition exists, the engine moves to condition evaluation.

The authorization engine interacts with an expression engine that evaluates the condition expression. The expression engine identifies which attributes are needed and requests them from the appropriate attribute stores. See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!seMu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F464d1086-8de7-4aaa-b254-8cfe53ba0112_2932x2038.png)



](https://substackcdn.com/image/fetch/$s_!seMu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F464d1086-8de7-4aaa-b254-8cfe53ba0112_2932x2038.png)

Uber defined four types of attribute store interfaces:

-   ActorAttributeStore fetches attributes about the actor making the request. This might include their employee ID, group memberships, location, or department.
    
-   ResourceAttributeStore fetches attributes about the resource being accessed. This could include the resource’s owner, creation date, sensitivity classification, or any custom business attributes.
    
-   ActionAttributeStore fetches attributes related to the action being performed, though this is used less frequently than actor and resource attributes.
    
-   EnvironmentAttributeStore fetches contextual attributes like the current timestamp, day of week, or request metadata.
    

Each attribute store must implement a SupportedAttributes() function that declares which attributes it can provide. This enables the authorization engine to pre-compile condition expressions and validate that all required attributes are available. At runtime, when an attribute value is needed, the engine calls the appropriate method on the corresponding store.

See the code snippet below:

[

![](https://substackcdn.com/image/fetch/$s_!h_Wi!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3495b29f-46a5-42d3-8c36-31e503fea829_1173x812.png)



](https://substackcdn.com/image/fetch/$s_!h_Wi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3495b29f-46a5-42d3-8c36-31e503fea829_1173x812.png)
***Source:** [Uber Engineering Blog](https://www.uber.com/en-IN/blog/attribute-based-access-control-at-uber/?uclick_id=5e0683f9-63d8-4e7b-a00c-530d8ad1e6f9)*

The design allows a single service to use multiple attribute stores, and a single attribute store can be shared across multiple services for reusability.

## Choosing an Expression Language

To represent conditions based on attributes, Uber needed an expression language. Rather than inventing a new language from scratch, the engineering team evaluated existing open-source options.

They selected the Common Expression Language (CEL), developed by Google. CEL offered several advantages:

-   First, it has a simple, familiar syntax similar to other programming languages.
    
-   Second, it supports multiple data types, including strings, numbers, booleans, and lists.
    
-   Third, it includes built-in functions for string manipulation, arithmetic operations, and boolean logic.
    

CEL also provides macros that are particularly useful for working with collections. For instance, you can write actor.groups.exists(g, g == ‘admin’) to check if the actor belongs to a group called “admin.”

The performance characteristics of CEL were excellent. Expression evaluation typically takes only a few microseconds. Both Go and Java implementations of CEL are available, meeting Uber’s backend service requirements. Additionally, both implementations support lazy attribute fetching, meaning they only request the attribute values actually needed to evaluate the expression, improving efficiency.

A sample CEL expression looks like this:

```plaintext
resource.paymentType == ‘credit card’ && actor.location == resource.paymentLocation
```

This expression is evaluated against attribute values fetched at runtime to produce a true or false result.

## Real-World Application: Kafka Topic Management

To illustrate the practical benefits of ABAC, consider how Uber manages authorization for Apache Kafka topics.

Uber uses thousands of Kafka topics for event streaming across its platform. Each topic needs access controls to specify which services can publish messages and which can subscribe to receive messages. The Kafka infrastructure team is responsible for managing these policies.

With basic policies, the Kafka team would need to create individual policies for every topic. Given the sheer volume of topics, this would be impractical and time-consuming.

Uber has a service called uOwn that tracks ownership and roles for technological assets. Each Kafka topic can have roles assigned directly or inherited through the organizational hierarchy. One such role is “Develop,” which indicates responsibility for developing and maintaining that topic.

Using ABAC, the Uber engineering team created a single generic policy that applies to all Kafka topics:

```yaml
effect: allow
actions: [admin]
resource: “uon://topics.kafka/production/*”
associations:
  - target_type: EMPLOYEE
condition:
  expression: ‘actor.adgroup.exists(x, x in resource.uOwnDevelopGroups)’
```

**Source:** [Uber Engineering Blog](https://www.uber.com/en-IN/blog/attribute-based-access-control-at-uber/?uclick_id=5e0683f9-63d8-4e7b-a00c-530d8ad1e6f9)

The wildcard in the resource pattern means this policy applies to every Kafka topic. The condition checks whether the actor belongs to any Active Directory group that has the Develop role for the requested topic.

An attribute store plugin retrieves the list of groups with the Develop role for each topic from uOwn. This information becomes the resource.uOwnDevelopGroups attribute. When an employee attempts to perform an admin action on a topic, the authorization engine evaluates whether that employee belongs to one of the authorized groups.

This solution saved the Kafka team enormous effort. Instead of managing thousands of individual policies, they maintain one generic policy. As ownership changes in uOwn, authorization automatically adjusts without any policy updates.

## Conclusion

The implementation of ABAC delivered multiple benefits across Uber’s infrastructure.

-   Authorization policies became more precise and fine-grained. Decisions could now consider any relevant attribute rather than just basic identity and group membership. This enabled security policies that more accurately reflected business requirements.
    
-   The system became more dynamic. When attribute values change in source systems like uOwn or employee directories, authorization decisions automatically adapt. No code deployment or policy update is required. This agility is critical in a fast-moving organization.
    
-   Scalability improved dramatically. A single well-designed ABAC policy can govern authorization for thousands or even millions of resources.
    
-   Centralization through the Charter made policy management easier. Rather than scattering authorization logic across hundreds of services, security teams can audit and manage policies in one place.
    
-   Performance remained excellent. Despite the added complexity of condition evaluation and attribute fetching, authorization decisions are still completed in microseconds due to local evaluation and on-demand attribute fetching.
    
-   Also, most importantly, ABAC separated policy from code. System owners can change authorization policies without building and deploying new code. This separation of concerns allows security policies to evolve independently from application logic.
    

Since implementing ABAC, 70 Uber services have adopted attribute-based policies to meet their specific authorization requirements. The framework provides a unified approach across diverse use cases, from protecting microservice endpoints to securing database access to managing infrastructure resources.

**References:**

-   [Attribute-Based Access Control at Uber](https://www.uber.com/en-IN/blog/attribute-based-access-control-at-uber)
    
-   [Attribute-Based Access Control](https://en.wikipedia.org/wiki/Attribute-based_access_control)
    
-   [Common Expression Language (CEL)](https://cel.dev/overview/cel-overview)