- By [[Dan Finlay]]
- Context
    - Permissions systems are at the heart of all computer systems, and arguably all secure systems of any kind. Many flaws can be introduced into a system through incorrect construction of a permissions system, but there are great benefits to be gained from building a safe system, and even greater benefits could be achieved from systems that can be spontaneously extended.
    - While computer permissions systems have undergone great improvements over time, each agent’s permissions tend to exist only in that agent’s own context, which has some downsides.
        - An application that requires permissions from multiple sub-systems requires prompting permissions interactions with each of them, which can be a tedious experience.
        - By normalizing more smaller permissions requests, a user can be habituated to granting consent more reflexively, which can lead to excessive authority being granted.
        - By requiring each application to implement its own security granting interface, each application developer is forced to re-implement an entire permissions system, introducing a new opportunity for flaws and mistakes, and losing out on the security of shared code and review.
    - It could be valuable for a computer system or permissions kernel to be able to represent any number of permissions requests to a user at once.
        - Aggregating requests can establish a more thoughtful process of reviewing proposals.
        - Prompting permissions through a familiar system interface can unify the visual language of consent for the user, leading to increased comprehension.
        - Permissions requests could be localized to a user or enhanced with familiar iconography by their own client, helping facilitate [[informed consent]].
        - The kernel could provide reusable primitives for the [[attenuation]] of permissions being granted, allowing the user to adjust any permission in such a system that they accept.
    - Securely interfacing untrusted interface elements with trusted interface elements is a sensitive process that must not be taken lightly, and a permissions system could represent a most-sensitive use case for an interface to be extensible.
    - The basic safety properties demonstrated in the below proof apply not only to extensible permissions systems, but also describe why even a basic permissions system allows for secure composition.
        - Example
            - When installing a game on your phone, the game may manipulate its own internal score, or may misrepresent its own internal operations, but it cannot operate on authority it has not been granted.
        - By demonstrating that recursively delegated permissions are secure even under the case of being presented alongside each other by a kernel’s own permissions system, I hope to demonstrate that having complex systems composed of multiple agents with their own permissions assigned by the user is secure because of the initial isolation, and as we learn to rely on this safety property, we can create increasingly user-centric interfaces that do not compromise on security.
    - We will assume that our system cannot know anything about the credibility or safety of the recipient of this delegated authority, and will suggest that evaluating that credibility is beyond the scope of this work. Instead, we will presume that the user has evaluated whatever information is available to them and decided for themselves that the risk of the authority being abused is worth whatever they hope to achieve by delegating it, thus taking a sort of [[leap of faith]].
        - After all, [[Trust is risk]], and [[no risk, no reward]].
- Proof by Induction
    - Theory to prove
        - [It is possible](((HcK9pyOg1))) to create an extensible permissions system that (under some assumptions) can ensure a user never designates authority in excess of their [[informed consent]], so long as each [[agent]] able to extend the system is already assumed to be able to communicate.
    - Terms
        - [[authority]]
            - The power to use a given function or access a given object.
        - [[[[authority]] description]]
            - The way that a permission is represented to the user when it is requested.
        - [[restricted method]]
            - An [[authority]] and its [[[[authority]] description]] as registered with the system kernel for secure delegation. Includes a method for issuing [[[[authority]] request]]s.
        - [[[[authority]] request]]
            - An external request to a system for a given [[authority]], which will display its associated [[[[authority]] description]] to the user per its associated [[restricted method]].
        - [[honest [[restricted method]]]]
            - A [[restricted method]] where its [[[[authority]] description]] is an honest and accurate representation of the underlying [[authority]] such that a user consenting to granting it would not be extending more [[authority]] than they intended to.
        - [[deceptive [[restricted method]]]]
            - A [[restricted method]] where its [[[[authority]] description]] is a misrepresentation of the underlying [[authority]], __especially__ if the [[[[authority]] description]] represents itself as less sensitive than the actual underlying [[authority]].
        - [[dangerous [[restricted method]]]]
            - A [[restricted method]] whose [[authority]] is more sensitive than the [[[[authority]] description]] represents it as, leading to the possibility of users designating more [[authority]] than they would have if properly informed.
        - [[safe [[restricted method]]]]
            - A [[restricted method]] whose [[authority]] is no more sensitive than the [[[[authority]] description]] represents it as.
            - While this may be a [[deceptive [[restricted method]]]], it is not a [[dangerous [[restricted method]]]], since a user consenting to its [[[[authority]] description]] is consenting to delegate at least as much [[authority]] as is actually being granted.
        - [[meaningless consent]]
            - A property of a type of [[restricted method]] where the [[[[authority]] description]] is not meaningfully correlated with the underlying behavior of the application, and the user's response to it does not meaningfully change the result.
        - [[meaningful [[dangerous [[restricted method]]]]]]
            - A [[restricted method]] where the [[[[authority]] description]] is innocuous relative to the authority that can be inadvertently granted as a result of approving it.
        - [[informed consent]]
            - When a user consents to a given [[[[authority]] request]], if the request was from a [[safe [[restricted method]]]], we will assume that the user accepts the risks of delegating that authority.
            - We will assume that our system cannot know anything about the credibility or safety of the recipient of this delegated authority, and will suggest that evaluating that credibility is beyond the scope of this work. Instead, we will presume that the user has evaluated whatever information is available to them and decided for themselves that the risk of the authority being abused is worth whatever they hope to achieve by delegating it, thus taking a sort of [[leap of faith]].
    - Base case and invariants
        - We start by defining correct a system kernel `S(0)` as one that is initialized with **the following axiomatic properties** that we will prove that it holds
            1. Each [[restricted method]] provided by the kernel is either a [[safe [[restricted method]]]] or its [[[[authority]] description]] amounts to [[meaningless consent]], ie there are no [[meaningful [[dangerous [[restricted method]]]]]]s.
            2. One of the [[safe [[restricted method]]]]s included is the [[authority]] to register additional [[restricted method]]s with the system.
                - There is no base guarantee that additional [[restricted method]] are [honest](((We8xOBZi0))), but I will prove that they are at least [safe](((y2f8MEdwt))).
            3. The user will be performing their best [[informed consent]] on each [[[[authority]] request]].
    - Inductive step
        - Given a given safe system `S(n)`, we introduce an [[[[authority]] request]] `r` that the user agrees to with [[informed consent]], producing a new system state `S(n+r)`.
        - We will now prove that `S(n+r)` holds the [above invariants](((HcK9pyOg1))).
        - Lemmas
            1. Because we assumed that the user is performing [[informed consent]] of the presented permissions ([axiom 3](((zESRKyWxx)))), and all previous restricted methods are safe ([axiom 1](((7e7p22vyr)))), we can conclude that any action that the delegated agent can perform is one that the user accepted the risk of, per [our definition of informed consent](((Hsnk4aOLP))).
            2. A delegated agent could register additional [[restricted method]]s, each of which could perform any action that agent had been granted [[authority]] to do.
            3. Since a delegated agent could choose the language of any [[restricted method]] it registered, it could create language that is more innocuous than the authority it was intending to act out, making it possible to register a [[dangerous [[restricted method]]]].
            4. However, the degree of this danger is never greater than the authority the agent had been delegated in the first place.
            5. Since a malicious agent could only construct a [[dangerous [[restricted method]]]] that performed actions as it could have implicitly delegated as part of its internal process anyways, we can assume that this risk was already [implicit in the delegation]([[informed consent]]), we can conclude that the type of [[dangerous [[restricted method]]]] that is possible from an [[informed consent]] delegation is a type of danger that already can be invoked without permission, and so offering it as an external permission deceptively only serves to get the user to perform a [[meaningless consent]].
            6. The only other type of [[restricted method]] that can be registered is a [[safe [[restricted method]]]], and so we have proven that for any [[restricted method]] that is added in response to the new authority request `r` is either safe or meaningless.
            7. Since `S(n)` was safe, and `r` is either safe or a [[meaningless consent]], there is no possibility for a [[meaningful [[dangerous [[restricted method]]]]]] to have been added to `S(n+r)`.
    - Conclusions
        - It seems [this point is concerning](((C8h30FeVo))). Is there truly no use case for an agent to register a modest sounding permission with the kernel, maybe to facilitate a user granting it more casually? I guess the question is, if the agent were malicious, why would it bother registering such a method, and not just delegate it out itself? Can we treat that lack of a motive as a valid foundation for a security model?
            - If the agent lacked communication channels other than those provided by the user, a lax permissions description could facilitate it establishing a communication channel with an external connecting entity. For this reason, any permission is effectively a communication channel that can facilitate arbitrary protocols. This seems to resemble the [[Mark Miller]] distinction of [[permission]] vs [[authority]].
                - This applies to allowing [[custom prompts]] to the user to allow establishing a connection just as much as it applies to having a nested permissions system.
