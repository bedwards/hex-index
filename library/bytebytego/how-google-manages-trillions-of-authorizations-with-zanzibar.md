---
title: "How Google Manages Trillions of Authorizations with Zanzibar"
author: "Alex Xu"
publication: "ByteByteGo Newsletter"
publication_slug: "bytebytego"
published_at: "2026-01-27T16:30:31.000Z"
source_url: "https://blog.bytebytego.com/p/how-google-manages-trillions-of-authorizations"
word_count: 2042
estimated_read_time: 11
---

## **[WorkOS Pipes: Ship Third-Party Integrations Without Rebuilding OAuth (Sponsored)](https://bit.ly/WorkOS_012726Headline)**

[

![](https://substackcdn.com/image/fetch/$s_!NY_y!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff27d3b90-f620-4bfa-931e-63bbb5467ba3_1200x630.png)



](https://bit.ly/WorkOS_012726CTA)

Connecting user accounts to third-party APIs always comes with the same plumbing: OAuth flows, token storage, refresh logic, and provider-specific quirks.  
  
[WorkOS Pipes](https://bit.ly/WorkOS_012726Pipes) removes that overhead. Users connect services like GitHub, Slack, Google, Salesforce, and other supported providers through a [drop-in widget](https://bit.ly/WorkOS_012726Widget). Your backend requests a valid access token from the Pipes API when needed, while Pipes handles credential storage and token refresh.  

\---

Sometime before 2019, Google built a system that manages permissions for billions of users while maintaining both correctness and speed.

When you share a Google Doc with a colleague or make a YouTube video private, a complex system works behind the scenes to ensure that only the right people can access the content. That system is Zanzibar, Google’s global authorization infrastructure that handles over 10 million permission checks every second across services like Drive, YouTube, Photos, Calendar, and Maps.

In this article, we will look at the high-level architecture of Zanzibar and understand the valuable lessons it provides for building large-scale systems, particularly around the challenges of distributed authorization.

See the diagram below that shows the high-level architecture of Zanzibar.

[

![](https://substackcdn.com/image/fetch/$s_!x7Z1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F309b6dd7-25f2-448e-ab42-59abd52dafa5_5026x3710.png)



](https://substackcdn.com/image/fetch/$s_!x7Z1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F309b6dd7-25f2-448e-ab42-59abd52dafa5_5026x3710.png)

*Disclaimer: This post is based on publicly shared details from the Google Engineering Team. Please comment if you notice any inaccuracies.*

## The Core Problem: Authorization at Scale

Authorization answers a simple question: Can this particular user access this particular resource? For a small application with a few users, checking permissions is straightforward. We might store a list of allowed users for each document and check if the requesting user is on that list.

The challenge multiplies at Google’s scale. For reference, Zanzibar stores over two trillion permission records and serves them from dozens of data centers worldwide. A typical user action might trigger tens or hundreds of permission checks. When searching for an artifact in Google Drive, the system must verify your access to every result before displaying it. Any delay in these checks directly impacts user experience.

Beyond scale, authorization systems also face a critical correctness problem that Google calls the “new enemy” problem. Consider the scenario where we remove someone from a document’s access list, then add new content to that document. If the system uses stale permission data, the person who was just removed might still see the new content. This happens when the system doesn’t properly track the order in which you made changes.

Zanzibar solves these challenges through three key architectural decisions:

-   A flexible data model based on tuples.
    
-   A consistency protocol that respects causality.
    
-   A serving layer optimized for common access patterns.
    

\---

## [AI code review with the judgment of your best engineer. (Sponsored)](https://bit.ly/Unblocked_012726)

[

![](https://substackcdn.com/image/fetch/$s_!nPd9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1aae52d7-6938-4e3b-8d64-3318000e87d0_1600x840.png)



](https://bit.ly/Unblocked_012726)

Unblocked is the only AI code review tool that has deep understanding of your codebase, past decisions, and internal knowledge, giving you high-value feedback shaped by how your system actually works instead of flooding your PRs with stylistic nitpicks.

\---

## The Data Model

Zanzibar represents all permissions as relation tuples, which are simple statements about relationships between objects and users. A tuple follows this format: object, relation, user. For example, “document 123, viewer, Alice” means Alice can view document 123.

See the diagram below:

[

![](https://substackcdn.com/image/fetch/$s_!Vdye!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a6868fe-2777-46ea-80f5-e87fb20f2106_2586x1626.png)



](https://substackcdn.com/image/fetch/$s_!Vdye!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8a6868fe-2777-46ea-80f5-e87fb20f2106_2586x1626.png)

This tuple-based approach differs from traditional access control lists that attach permissions directly to objects. Tuples can refer to other tuples. Instead of listing every member of a group individually on a document, we can create one tuple that says “members of the Engineering group can view this document.” When the Engineering group membership changes, the document permissions automatically reflect those changes.

The system organizes tuples into namespaces, which are containers for objects of the same type. Google Drive might have separate namespaces for documents and folders, while YouTube has namespaces for videos and channels. Each namespace defines what relations are possible and how they interact.

Zanzibar’s clients can use a configuration language to specify rules about how relations are composed. For instance, a configuration might state that all editors are also viewers, but not all viewers are editors.

See the code snippet below that shows the configuration language approach for defining the relations.

```
name: “doc”
relation { name: “owner” }
relation {
  name: “editor”
  userset_rewrite {
    union {
      child { _this {} }
      child { computed_userset { relation: “owner” } }
    }
  }
}
relation {
  name: “viewer”
  userset_rewrite {
    union {
      child { _this {} }
      child { computed_userset { relation: “editor” } }
    }
  }
}
```

Source: [Zanzibar Research Paper](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/)

These rules, called userset rewrites, let the system derive complex permissions from simple stored tuples. For example, consider a document in a folder. The folder has viewers, and you want those viewers to automatically see all documents in the folder. Rather than duplicating the viewer list on every document, you write a rule saying that to check who can view a document, look up its parent folder, and include that folder’s viewers. This approach enables permission inheritance without data duplication.

The configuration language supports set operations like union, intersection, and exclusion. A YouTube video might specify that its viewers include direct viewers, plus viewers of its parent channel, plus anyone who can edit the video. This flexibility allows diverse Google services to specify their specific authorization policies using the same underlying system.

## Handling Consistency with Ordering

The “new enemy” problem shows why distributed authorization is harder than it appears. When you revoke someone’s access and then modify content, two separate systems must coordinate:

-   Zanzibar for permissions
    
-   Application for content
    

Zanzibar addresses this through tokens called zookies. When an application saves new content, it requests an authorization check from Zanzibar. If authorized, Zanzibar returns a zookie encoding the current timestamp, which the application stores with the content.

Later, when someone tries to view that content, the application sends both the viewer’s identity and the stored zookie to Zanzibar. This tells Zanzibar to check permissions using data at least as fresh as that timestamp. Since the timestamp came from after any permission changes, Zanzibar will see those changes when performing the check.

This protocol works because Zanzibar uses Google Spanner, which provides external consistency.

[

![](https://substackcdn.com/image/fetch/$s_!fMw7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6bc74335-3513-4562-b679-5fac67455f64_1938x1246.png)



](https://substackcdn.com/image/fetch/$s_!fMw7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6bc74335-3513-4562-b679-5fac67455f64_1938x1246.png)

If event A happens before event B in real time, their timestamps reflect that ordering across all data centers worldwide through Spanner’s TrueTime technology.

[

![](https://substackcdn.com/image/fetch/$s_!3FU3!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9476b5f7-8670-4d66-a722-e46877c31f22_2326x1246.png)



](https://substackcdn.com/image/fetch/$s_!3FU3!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9476b5f7-8670-4d66-a722-e46877c31f22_2326x1246.png)

The zookie protocol has an important property. It specifies the minimum required freshness, not an exact timestamp. Zanzibar can use any timestamp equal to or fresher than required, enabling performance optimizations.

## The Architecture: Distribution and Caching

Zanzibar runs on over 10,000 servers organized into dozens of clusters worldwide. Each cluster contains hundreds of servers that cooperate to answer authorization requests. The system replicates all permission data to more than 30 geographic locations, ensuring that checks can be performed close to users.

[

![](https://substackcdn.com/image/fetch/$s_!15YE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F44a4d26f-cd38-49a5-b5c4-668386b6409e_5026x3710.png)



](https://substackcdn.com/image/fetch/$s_!15YE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F44a4d26f-cd38-49a5-b5c4-668386b6409e_5026x3710.png)

When a check request arrives, it goes to any server in the nearest cluster, and that server becomes the coordinator for the request. Based on the permission configuration, the coordinator may need to contact other servers to evaluate different parts of the check. These servers might recursively contact additional servers, particularly when checking membership in nested groups.

For instance, checking if Alice can view a document might require verifying if she is an editor (which implies viewer access), and whether her group memberships grant access, and whether the document’s parent folder grants access. Each of these checks can execute in parallel on different servers, which then combine the results.

The distributed nature of this processing can create potential hotspots. Popular content generates many concurrent permission checks, all targeting the same underlying data. Zanzibar employs several techniques to mitigate these hotspots:

-   First, the system maintains a distributed cache across all servers in a cluster. Using consistent hashing, related checks route to the same server, allowing that server to cache results and serve subsequent identical checks from memory. The cache keys include timestamps, so checks at the same time can share cached results.
    
-   Second, Zanzibar uses a lock table to deduplicate concurrent identical requests. When multiple requests for the same check arrive simultaneously, only one actually executes the check. The others wait for the result, then all receive the same answer. This prevents flash crowds from overwhelming the system before the cache warms up.
    
-   Third, for exceptionally hot items, Zanzibar reads the entire permission set at once rather than checking individual users. While this consumes more bandwidth for the initial read, subsequent checks for any user can be answered from the cached full set.
    

The system also makes intelligent choices about where to evaluate checks. The zookie flexibility mentioned earlier allows Zanzibar to round evaluation timestamps to coarse boundaries, such as one-second or ten-second intervals. This quantization means that many checks evaluate at the same timestamp and can share cache entries, dramatically improving hit rates.

## Handling Complex Group Structures

Some scenarios involve deeply nested groups or groups with thousands of subgroups. Checking membership by recursively following relationships becomes too slow when these structures grow large.

Zanzibar includes a component called Leopard that maintains a denormalized index precomputing transitive group membership. Instead of following chains like “Alice is in Backend, Backend is in Engineering,” Leopard stores direct mappings from users to all groups they belong to.

Leopard uses two types of sets: one mapping users to their direct parent groups, and another mapping groups to all descendant groups. Therefore, checking if Alice belongs to Engineering becomes a set intersection operation that executes in milliseconds.

Leopard keeps its denormalized index consistent through a two-layer approach. An offline process periodically builds a complete index from snapshots. An incremental layer watches for changes and applies them on top of the snapshot. Queries combine both layers for consistent results.

## Performance Optimization

Zanzibar’s performance reveals optimization for common cases. Around 99% of permission checks use moderately stale data, served entirely from local replicas. These checks have a median latency of 3 milliseconds and reach the 95th percentile at 9 milliseconds. The remaining 1% requiring fresher data have a 95th percentile latency of around 60 milliseconds due to cross-region communication.

Writes are slower by design, with a median latency of 127 milliseconds reflecting distributed consensus costs. However, writes represent only 0.25% of operations.

Zanzibar employs request hedging to reduce tail latency. After sending a request to one replica and receiving no response within a specified threshold, the system sends the same request to another replica and uses the response from the first replica that arrives. Each server tracks latency distributions and automatically tunes parameters like default staleness and hedging thresholds.

## Isolation and Reliability

Operating a shared authorization service for hundreds of client applications requires strict isolation between clients. A misbehaving or unexpectedly popular feature in one application should not affect others.

Zanzibar implements isolation at multiple levels. Each client has CPU quotas measured in generic compute units. If a client exceeds its quota during periods of resource contention, its requests are throttled, but other clients continue unaffected. The system also limits the number of concurrent requests per client and the number of concurrent database reads per client.

The lock tables used for deduplication include the client identity in their keys. This ensures that if one client creates a hotspot that fills its lock table, other clients’ requests can still proceed independently.

These isolation mechanisms proved essential in production. When clients launch new features or experience unexpected usage patterns, the problems remain contained. Over three years of operation, Zanzibar has maintained 99.999% availability, meaning less than two minutes of downtime per quarter.

## Conclusion

Google’s Zanzibar represents five years of evolution in production, serving hundreds of applications and billions of users. The system demonstrates that authorization at massive scale requires more than just fast databases. It demands careful attention to consistent semantics, intelligent caching and optimization, and robust isolation between clients.

Zanzibar’s architecture offers insights applicable beyond Google’s scale. The tuple-based data model provides a clean abstraction unifying access control lists and group membership. Separating policy configuration from data storage makes it easier to evolve authorization logic without migrating data.

The consistency model demonstrates that strong guarantees are achievable in globally distributed systems through careful protocol design. The zookie approach balances correctness with performance by giving the system flexibility within bounds.

Most importantly, Zanzibar illustrates optimizing for observed behavior rather than theoretical worst cases. The system handles the common case (stale reads) extremely well while supporting the uncommon case (fresh reads) adequately. The sophisticated caching strategies show how to overcome normalized storage limitations while maintaining correctness.

For engineers building authorization systems, Zanzibar provides a comprehensive reference architecture. Even at smaller scales, the principles of tuple-based modeling, explicit consistency guarantees, and optimization through measurement remain valuable.

**References:**

-   [Zanzibar: Google’s Consistent, Global Authorization System](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/)
    
-   [Authentication vs Authorization: What’s the difference?](https://www.ibm.com/think/topics/authentication-vs-authorization)
    
-   [Spanner: Google’s Globally Distributed Database](https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf)