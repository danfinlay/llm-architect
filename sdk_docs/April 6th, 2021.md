- [[endo]] [[LavaMoat]] call
    - KrisKowal on CompartmentMapper performance
        - The API of the StaticModuleRecord is defined in terms of module exports & imports.
        - Currently considering [[Guy Bedford]]'s lexer
            - {{[[DONE]]}}  [[Mark Miller]] Concerns
                - Lex & Tokenize & Scan as three synonyms
                - JS is notoriously hard to lex. Variations like [[html-like comment]]s, etc.
                - If the lexer is very lightweight, then it is more likely that it can be fooled.
                - This may not be a
                - IF a mistake is unlikely to happen accidentally, the question that is important is whether a malicious module (mis-transformed) can corrupt any other module's state.
                - [[Kris Kowal]] agrees, since the result of each compartment will be run through [[Compartment]]`.evaluate()`
    - [[Social Terminal]] as a way to think about our shared goals
        - Mind if we record?
        - Background
            - [[Dan Finlay]] had asked [[Mark Miller]] about the concept of a [[Social Terminal]]
            - [[Mark Miller]] referred [[Dan Finlay]] to [[Christine Lemmer Webber]]
            - Dan & Chris had a great call about the topic
            - [[Christine Lemmer Webber]] quickly prototyped a working chat program using [[Spritely]]
                - https://twitter.com/dustyweb/status/1377770016364453889?s=20
            - [[Kris Kowal]] wrote [a hypothetical social terminal gist.](https://twitter.com/kriskowal/status/1378113848884883459)
            - Messing around, [[Kumavis]] and [[Dan Finlay]] made [[[[Discord]] [[Secure EcmaScript (SES)]] bot]]
                - [[Dan Finlay]] made a very very basic [[ses-shim]] bot for [[Discord]]
                    - Actually had log-replay-based [[orthogonal persistence]]!
                - [[Kumavis]] ported it to [[xsnap]]
                - [[Kumavis]] ported it to [[SwingSet]]
                - We found it a delightful collaborative experience, and were surprised how fast we were learning in this environment.
                    - Watching each other's commands in real time.
                    - Playing with [[Zoe]]
                    - Racing to claim a purse on the `share` object!
                    - This could be a great way to help people learn the Agoric stack.
                - Now we have lots of [[SwingSet]] questions!
                    - State snapshotting, forking, rollbacks, & resuming
                        - Currently: Snapshots + log-running is our best tool
                            - Need to make decisions about when old state can be frozen/discarded: [[vat warehouse]]
                            - Should be as minimally connected as possible
                        - This seems a bit heavy-weight!
                        - Forks, and proposed blocks require this.
                        - "query" commands require this: Running hypothetical commands that you don't want to persist as a state change. (we don't need to log every state query)
                        - for runaway protection.
                    - State growth as a topic, as [[Dan Finlay]] raised on the [[XS Engine]] [github issue](https://github.com/Moddable-OpenSource/moddable/issues/622)
                        - Our small bot heap is >2GB from a weekend of goofing off.
                        - Is that all in memory?
                        - [[Brian Warner]]
                            - We have
                                - RAM
                                - Secondary/disk storage
                                - Lookup wpeed
                            - Starting point, worst-case scenario
                                - All purses are inbound references in RAM, and so the RAM footprint is `O(n)`.
                        - [[Mark Miller]] said this is mostly addressed in 3 ways
                            - [[virtual objects]]
                                - So this requires special developer participation?
                            - [[hierarchical [[c-list]]]] [[c-list]]
                            - [[virtual collections]]
                        - Points to add
                            - Possibility of XS being extended to lazily load kernel state from disk
                            - Ethereum style
                            - Can be optimized by having transactions specify what state will be needed to be hydrated during its process.
                        - Today XS runs one per vat
                            - This should let us get to a "[[sec comp]] based jail"
                    - Should users have their own [[vat]]?
                        - In the agoric model, each user's wallet does have its own [[vat]]. Ideally you have your own [[trusted computing base (TCB)]] with a [[vat]] in it.
                        - Any user should be able to create their own distinct on-chain vat, because a vat is a unit of resource control, while an object is a unit of integrity.
                        - You would not want to run arbitrary adversarial code within your own vat.
                        - a host (like Zoe, the [[zcf [[vat]]]]) can create child vats that have synchronous access to some of its state, but still have a process to handle its exhaustion and crash.
                        - From Mark S. Miller to Everyone:  07:12 PM
                            - Don’t do this: https://erights.medium.com/a-pack-of-watchdogs-is-cheaper-than-gas-7e118edfb4cc
                    - What would it take to get a bot like this into the Agoric discord (both scale & security-wise).
                        - Make the bot environment consistent with the Agoric environment.
                    - Creating Devices, or the best way to add them.
                        - Need to ensure that interfaces with devices are resilient to crashes or interruptions.
                - Also, you can try it right now!  https://discord.gg/VcQ7WmAU
        - Questions
            - [[Zoe]] `simpleMint()` example
                - Does this involve rollbacks? No! Just aborts. All failures should be within-vat. Tests that fail must be before the side-effects.