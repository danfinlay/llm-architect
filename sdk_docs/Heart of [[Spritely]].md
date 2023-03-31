- https://spritely.institute/static/papers/spritely-core.html
- https://spritely.institute/static/papers/spritely-core.pdf
- [Source code](https://gitlab.com/spritely/spritely-papers)
- Details the Spritely approach to [[programming with [[object capability (ocap)]] style]]
- Notes
    - Major prior art this draws from
        - [[A Security Kernel Based on the Lambda Calculus]].
            - [[[[Scheme]] 48]] and [[W7]] for using [[Scheme]] to achieve language-level [[object capability (ocap)]] security.
        - [[E Language]] for establishing [[CapTP]] as a method of distributing the [[distributed [[object capability (ocap)]]]] across many [[actor]]s.
        - [[unum]]
        - [[The Most Beautiful Program Ever Written]]
    - Other citations
        - [[From Desktops to Donuts: Object-Caps Across Scales]]
        - On [[[[decentralized]] storage]] goals
            - [[IPFS]] is the most popular but does not provide the privacy and encryption requirements listed above,
although it can be used as a foundation on which those layers are based. We have written our own
toy examples that satisfy all of the above requirements with [[Magenc]] and [[Crystal]], as well as an
example applied to a social network with Golem. [[Freenet]] and [[Tahoe LAFS]] were the first systems
coming close to fulfilling most (but not all) of the above requirements, and laid the foundations for
understanding what these requirements are and how to fulfill them. Currently Encoding for Robust
Immutable Storage ([[ERIS]]) and [[Distributed Mutable Containers (DMC)]] appear to be the most
promising directions for fulfilling these requirements.
    - Uses [[Wisp ([[Lisp]] syntax)]] to reduce volume of parentheses
        - Second, a colon can be used to nest a sub-expression on the same line:
            - How does the Wisp syntax determine how many sub-expressions are terminated with a new line? Is it the tabbing?
    - At present, Goblins has two implementations, one on [[Racket]] (the initial implementation), and one on [[Guile (language)]] (which is newer). While both will be maintained and interoperable with each other in terms of distributed communication, the Guile implementation is becoming the "main" implementation on top of which the rest of Spritely is being built. Goblins' ideas are fairly general though and Goblins is implemented simply as a library on top of a host programming language, and Goblins' key ideas could be ported to any language with sensible lexical scoping (but it might not look as nice or be as pleasant to use or elegant).
        - At this point the quantity of lisp variants is more intimidating to me than the parens. How do I know I've chosen the right variant for a given project? If these are both implementations of the same language, why does a library need to be implemented for each of them?
- Questions
    - How does the Wisp syntax determine how many sub-expressions are terminated with a new line? Is it the tabbing?
    - At this point the quantity of lisp variants is more intimidating to me than the parens. How do I know I've chosen the right variant for a given project? If these are both implementations of the same language, why does a library need to be implemented for each of them?
    - Can I get a working link to [[Spritely: New Foundations for Networked Communities]]?
