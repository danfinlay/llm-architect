- by [[Ka-Ping Yee]]
- [Full text](http://zesty.ca/pubs/icics-2002-uidss.pdf)
    - {{pdf: https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fcapabul%2FSXFpd6gI1N.pdf?alt=media&token=99990825-2925-4604-9401-6a28b4bd564a}}
- Notes
    - Key points
        - Security is alignment between expectations and behavior of the software
            - "A computer is secure if you can depend on it and its software to behave as you expect" - [["Practical UNIX and Internet Security", Garfinkel and Spafford]]
        - "It is impossible to even describe security without addressing the user perspective."
        - Often design and security are often seen as at odds: Asking for confirmation adds friction, while much design focuses around reducing friction. We need to unify these perspectives.
            - [[Ka-Ping Yee]] insists these need not be at odds, instead "a more secure system is more controllable, more reliable, and hence more usable; a more usable system reduces confusion and is thus more likely to be secure."
        - "Sufficiency cannot be proved, as it is impossible to guarantee the success of a user interface. So, our criterion for admitting something as a basic principle is that it be __a necessary and non-trivial concern__"
        - "To my knowledge, this paper is the first attempt to propose a structured framework for design thinking and to suggest widely applicable guidelines for secure interaction design as opposed to studying a single application or mechanism."
        - The [[principle of least authority (POLA)]] is a starting point for our reasoning. It is better to think of our design principles in the context of least-privilege systems, rather than current systems not designed in a least-privilege style. A language- based security system, such as Java’s “sandbox”, is one kind of model in which one could hope to satisfy these principles. Other platforms designed around the least-privilege concept include the [[E Language]] [5], [[KeyKOS]] [8], and [[EROS]] [22].
        - [[user agent]] is the piece of software that tries to obey the user's intentions (like [[MetaMask]])!
        - [[path of least resistance]]
        - 3.2: Objects, [[actor]]s, and Actions
            - Some objects are so simple we can predict their behavior with our mental model of the world. This is called taking the [[physical stance]] towards that object.
            - People will develop a mental model for how things work, and use that to guide their behavior.
                - I think this relates to how understanding the [[seed phrase]] instead of simply being told "don't share this" can lead to safer user behavior. Correct usage comes from a correct mental model.
                - When a user isn't sure how something works, but intuits its internals from its interface or design, [[Dennett]] calls this the [[design stance]].
            - Objects that act on their own are [[actor]]s.
                - Because we cannot perfectly predict their behavior, we have to attribute some amount of independent volition to them. Treating something like an independent [[actor]] is what [[Dennett]] calls [[intentional stance]].
                - To a user, a computer program is an actor.
        - [[principle of appropriate boundaries]]: These aggregations define the granularity that users can perform acts of [[authority]].
            - Should users have to assign every individual permission?
                - [[Ka-Ping Yee]] says no, permissions should only be defined at levels of abstraction that the user cares about.
                    - Too detailed, users may miss details.
                    - Too coarse, users are forced to grant excessive [[authority]].
                    - To find the right trade-offs, you can ask:
                        - Would the user ever want to manipulate this permission independently of another permission?
        - [[actor-ability state]]
            - We can claim our software has a "no-surprise" state if everything they expect they can do is at least what they can do and everything the user expects any other agent can do is at most what they can do.
            - P 0 ⊆ R 0
                - The user's expected permissions are a subset of their actual authority.
            - P i ⊇ R i for i > 0
                - Other agents' expected permissions are a superset of their actual authority.
        - [[explicit authorization]]
            - Only explicit action should allow an external agent to gain any authority that the user wouldn't expect otherwise.
            - Quote
                - Must we constantly intercept the user with annoying security prompts to confirm every action? No – most of the time, the user already provides plenty of information in the course of performing tasks. The system must merely honour the manipulations of authority that are already being communicated. For example, if the user asks an application to open a file and makes a selection in a file browser, it is already clear that they expect the application to read the file. No further confirmation is necessary. The single act of selecting the file should convey both the identity of the chosen file and the authority to read it. In many situations, combining designation with authority [9] yields an effective solution that improves both security and usability.
                - The judgement of which authorizations should be explicit should be based on the potential consequences, not on the technical difficulty of the granting decision. Any authority that could result in unexpected behaviour should be controlled by the user. If the user cannot readily understand the consequences of granting an authority, then it should never be granted at all, not merely hidden under some “Advanced” section of the interface. If a truly necessary authority seems to require an unusual degree of technical knowledge, then the model presented to the user probably needs to be rethought in simpler terms.
        - [[principle of visibility]]
            - If we have both the [[actor-ability state]] and the [[explicit authorization]], then we should be able to conclude that our safety will continue, however sometimes a user is encountering a new system in an unknown state, or a user may have forgotten how some amount of the system was configured.
            - For this reason, visibility into the [[actor-ability state]] of a system is a critical component of any system that is safe to use.
        - [[principle of [[revocation]]]]
            - Any authority you can grant, you should be able to revoke.
        - [[principle of expected ability]]
            - It should be clear when a user is reaching the limits of their knowable ability: Granting an unrevokable permission, for example (like a [[seed phrase]]!)
        - principle of the [[trusted path]]
            - Authority manipulating interfaces are the most security sensitive of all interfaces.
            - To access a trustworthy access point to [[authority]] controlling [[user interface]], a user needs some method of accessing a [[trusted path]].
                - In Windows, this is Ctrl-Alt-Delete
                - In [[MetaMask]], this is the fox icon on the browser.
        - Principle of [[identifiability]]
            - Identification must have [[continuity]] and [[discriminability]]
                - Reminds me of [[security pattern]]
        - Interfaces are fundamentally [[aggregation]]s of more complex underlying processes. By including folders, some software allows users to perform their own [[subjective aggregation]].
        - Improved definition of [[computer security]]: "A system is secure from a given user's perspective if the set of actions that each actor can do are bounded by what the user believes it can do."
        - principle of [[expressiveness]]
        - principle of [[clarity]]
            - "All the information needed to make a good decision should be accurate and available before the action is taken."
    - ## 10 Design Principles
        - **Path of Least Resistance**. The most natural way to do any task should also be the most secure way.
        - **Appropriate Boundaries**. The interface should expose, and the system should enforce, distinctions between objects and between actions along boundaries that matter to the user.
        - **Explicit Authorization**. A user’s authorities must only be provided to other actors as a result of an explicit user action that is understood to imply granting.
        - [[principle of visibility]]. The interface should allow the user to easily review any active actors and authority relationships that would affect security-relevant decisions.
        - [[principle of [[revocation]]]]. The interface should allow the user to easily revoke authorities that the user has granted, wherever revocation is possible.
        - **Expected Ability**. The interface must not give the user the impression that it is possible to do something that cannot actually be done.
        - [[trusted path]]. The interface must provide an unspoofable and faithful communication channel between the user and any entity trusted to manipulate authorities on the user’s behalf.
        - **Identifiability**. The interface should enforce that distinct objects and distinct actions have unspoofably identifiable and distinguishable representations.
        - **Expressiveness**. The interface should provide enough expressive power (a) to describe a safe security policy without undue difficulty; and (b) to allow users to express security policies in terms that fit their goals.
        - **Clarity**. The effect of any security-relevant action must be clearly apparent to the user before the action is taken.
- Second pass notes
    - browse authority by recipient or authority
    - the Gestalt principles of perceptual grouping [23], which suggest that visual associations are guided by proximity, closure, symmetry, ¯gure-ground separation, continuation, and similarity.
    - [[principle of expected ability]] is an interesting and nuanced one, especially in the presence of other users.
        - When sending away your last ether, you'll lose your ability to act!
        - How do we present to a user the potential impacts of other users' behaviors?
            - Do we show the volatility of a token's price?
            - Do we show when a token allowance we're granting, when combined with other outstanding allowances, exceeds our total token balance? (who else holds one? revoke inline?)
            - 