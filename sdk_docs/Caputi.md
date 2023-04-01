- A framework for safely distributing the rights to access [[JavaScript]] resources across multiple un-trusted environments by [[Dan Finlay]]
- [on GitHub](https://github.com/danfinlay/caputi)
- Design goals
    - Cultivate a [[JavaScript]] pattern that is conducive to [[programming with [[object capability (ocap)]] style]].
- My favorite part of [[Caputi]] is probably its [long term vision](https://github.com/danfinlay/caputi#long-term-vision): The idea that object references could be casually requested locked in a synchronous location for comparison and final logic execution.
    - Big outstanding problem: If operating on references from multiple hosts, how to automatically negotiate the location of the `there()` call. (“Where will we do [[the swap]]?”)
    - Funny how managing access rights flies so directly in the face of [[Are We There Yet?]]’s main thesis that we can’t actually ever operate on locked values. Here, in the case of currencies and other things, there is an understanding that these always represent an external [[promise]], an uncertainty, but it is one that we agree to pretend will persist, for the sake of making __agreements__, like money.
- Shared at the [[[[Secure EcmaScript (SES)]] strategy call]]
    - Video
        - {{youtube: https://youtu.be/eoVGTWBk7PM?t=3054}}
    - Criticisms
        - These locks do not have an auto-cleanup process, so they could be dangerous in production as they exist today.
            - An implementation that included a mechanism to auto-cleanup could solve this.
                - Locks could have a timeout.
                - Locks could have paid-durations! Pay 50 units for 5 seconds of lock rights, for example. Processes could bid for the rights to the next lock period using a [[uniform price auction]].
        - Criticism & resolution: Locks are in conflict with the [[Secure EcmaScript (SES)]] pattern. A conversation from the [[Agoric]] [[Keybase]] channel.
            - danfinlay
                - I had a point I wanted to raise in response to the Caputi discussion at the SES call a few weeks back: We were discussing how .there() and other awesome SES-enabled constructs could be used to eliminate the need for locks/mutexes/semaphores, but I think there is one strong category of cases that this is not true for, represented by "[[The Train & Hotel Problem]]": I believe: When a user wants to perform an atomic operation on resources managed by multiple distinct VATs, at least all but one of those resources' VATs (one VAT can host the operation) need to expose some notion of (even temporary) locking in order for that atomic operation to be safely performed.
                - I got my primer on Train & Hotel from [[Dean Tribble]] here: https://www.youtube.com/watch?v=WQTBVd4H-fY
            - [[Mark Miller]]
                - yes. Fortunately, for the cases of concern, gathering exclusive erights to assets is an adequate form of "lock". The difference between this and classic "distributed atomic transaction" (Argus) style locking is that the state where the contract holds the exclusive erights is observable. That's what Dean's Trains/Hotels solution does, and what Zoe directly supports.
            - danfinlay
                - 1:08 PM
                - So by “state where the contract holds the rights is observable”, you mean like how by running on a public blockchain it is more transparent how those rights are being enforced?
            - erights
                - 1:11 PM
                - No. (Blockchain transparency is interesting, but is a different issue.) This applied to how we used the distributed communicating event loop model before we had blockchains, and is independent of blockchains.
                - Back when we were first figuring out the distributed communicating event loop model (hereafter "vat model"), the natural starting points for distributed programming languages were Actors (asynchronous everywhere down to very fine grain) and Argus (distributed computation proceeds in units of distributed atomic serializable transactions, where all the participating machines either commit together or abort together).
                - Ironically, the example always used by the Argus-like camp was transferring money between two accounts. They sought the following property: 
                - If Bob has $1000 and the B acct at BofA and Carol has $1000 at acct C at Citi, then if Bob transfers $10 from B to C, any other observer, querying the balances of B and C within one transaction, will still see them add up to $2000. They will either see $1000, $1000 or $990, $1010. In order to preserve this distributed atomicity property, some transactions may need to be delayed (or speculative transactions aborted and retried) as needed to preserve the consistency of this view.
                - A typical non-speculative approach was two-phase commit (2PC). (I don't remember, but Argus may have been built on 2PC). In the first phase, a transaction coordinator asks all the participants to lock all resources needed for the transaction to proceed. If they all succeed, then, while they wait for more news from the transaction coordinator, any other requests that need these resources BLOCK, i.e., are postponed waiting for that transaction in flight to either commit or abort. By blocking, they cannot observe the state of the resources "during" the transaction, for some definition of "during".
                - 👍
                - 1
                - In this example, $2000 would be unavailable for any other purpose until the $10 is either definitively transferred or not. Curiously, this is not how real world banking works. While the $10 is in flight (for example, a hold at the receiving bank), the state of the world in which B holds $990 and C holds $1000 is observable, as is the fact that $10 is in flight. During this period, the remaining $990 can still be used for other purposes before we know how that transaction resolves.
                - 👍
                - 1
                - A key insight of the vat model is to only support intra-vat atomicity. A vat turn is an atomic transaction, for that vat's state taken by itself.
            - danfinlay
                - 1:32 PM
                - My impression is that Zoe's "purse" model allows solving this by breaking any "account" into sub-portions that can be locked, but that locking is still required?
            - erights
                - 1:34 PM
                - When Zoe asynchronously gathers exclusive erights to the assets needed for the contract to proceed, this is like the first phase of the 2PC, in that the participants are each bring asked to "lock up" the necessary assets. Under mutual suspicion, a "lock" becomes the transfer of exclusive rights.
                - 👍
                - 1
                - The contract then runs mostly synchronously, regarding the local "allocations", which are its records of the rights to be dispensed. This is like the atomic decision making of the contract coordinator.
                - When Zoe completes an offer, this is like the second phase of 2PC, where the consequences of these decisions are then asynchronously dispensed back to the participants. Zoe though generalizes to the contract making a series of local atomic decisions, and participants being able to join and leave at arbitrary points in this sequence of decisions.
                - It is indeed the ERTP purse system that enables the breaking up of a purse of assets into the "lockable" portion (the payment for Zoe to deposit into its escrow purses) and the remaining portion (the original purse after withdrawal). Zoe, holding exclusive erights in escrow, effectively has a lock, but without the "normal" CS lock implications re observability and locking.
            - danfinlay
                - 1:45 PM
                - Okay, so one way I might describe what I think was some conceptual dissonance we're wading through is maybe whether a "lock" that can be broken into multiple locks is not a lock. From my Caputi perspective, a purse could be composed from a framework that makes "lockable grains" very easy to manage, and the key thing that distinguishes this different approach is kindof an implementor-level responsibility of ensuring that lockable resources are maximally divisible, which really facilitates users being able to adhere to a principle of least authority when using those resources.
                - So from my perspective at the base level you are advocating 2-stage commits, but with best practices at the object model layer.
            - erights
                - I believe our paper on the escrow exchange agent "[[Distributed Electronic Rights in JS]]" does explain this connection to 2PC, but only very briefly