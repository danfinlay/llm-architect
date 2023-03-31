- An [[Ethereum]] based [[UBI]] system.
- https://circles.garden/
- [Working marketplace](https://market.joincircles.net/)
- Uses a [[personal token]] model where each account mints their own token at the same rate as all other accounts, a rate that increases by 7% every year.
    - https://twitter.com/koeppelmann/status/1317198720006500353?s=21
- trusting
    - Because there is no [[identity system]], the [[sybil resistance]] of Circles comes from the risk that each agent exposes themselves to when trusting another.
    - Since the [[sybil resistance]] relies on interpersonal acts of trust, it is a form of [[digital [[social collateral]]]].
    - Establishes a percentage-based exchange rate for the other account’s tokens. A trusted account can trade for up to 50% of your tokens for theirs.
        - https://twitter.com/martinlundfall/status/1317265149980540928?s=21
    - Strategies
        - [[tenuous and careful]]
            - Trying to respect [[the [[social collateral]] principle]] when great value is at stake, it is critical to not accidentally risk an excess of that value.
        - [[fail fast]]
            - https://twitter.com/niran/status/1317227930158829568?s=21
            - This strategy is growing on me. The inflation rate is already basically designed  so “tomorrow’s circles are worth more”, and your circles are worth nothing at first, so why not risk early, risk often, and help the bad actors expose themselves early? Requires the UI exposes a [[credit withdraw notification]].
            - One good reason to prefer this strategy is that if “grow the network fast and prune it fast” is an inferior strategy, it will be quicker to conclude that. Also, since the network is smaller early on, it is cheaper to conclude it.
- Initial web-based wallet only exposes some features by default
    - 3 verified users must Trust you before you can Trust others
        - OR: Send [[xDAI]] to the new user’s account.
            - https://twitter.com/arlynculwick/status/1317490119885148161?s=21
    - The trust act is exposed as binary, and is good for a 50% exchange rate.
    - Does not explain the underlying protocol to the users, which I think partly contributed to how Crypto-Twitter quickly established a norm of badgering people for trust without bothering to learn how the system works, and criticizing anyone who spoke against reckless trust.
    - Architecture
- Links
    - [Main Website](https://joincircles.net/)
    - [Social graph visualizer](https://dashboard.joincircles.net/
)
    - [Contract Source Code](https://github.com/CirclesUBI/circles-contracts)
    - [Handbook](https://handbook.joincircles.net/about/whitepaper.html#trusting-currency)
        - The following syndication of the [[Circles UBI]] handbook has been freely modified with [[Capabul]] local terms & links for semantic precision.
        - [****](https://handbook.joincircles.net/about/index.html)
            - [****](https://handbook.joincircles.net/about/whitepaper.html)
        - # Circles Handbook
        - [](https://handbook.joincircles.net/print.html)
        - Circles Money System Overview
        - __A decentralised Universal Basic Income platform based on personal currencies__
        - **https://joincircles.net**
        - ## [Abstract](https://handbook.joincircles.net/about/whitepaper.html#abstract)
        - We propose a new money system called [[Circles UBI]] that is based on individualized cryptocurrencies ([[personal token]]) and a social graph of trust between these currencies. This money system will be for the purposes of distributing money in a way which will, over time, lead to the equalization of wealth and function like a globally accessible [[UBI]]. When new users join Circles, a new personal cryptocurrency is created for them on a smart contract-enabled blockchain. This currency is then regularly minted and added to their account, forming the basis of Circles' UBI properties. Users have the ability to trust the personal currencies of other users, which requires them to treat this personal currency as identical to any other Circles currencies that they hold. As the social graph becomes more interconnected, these personal currencies converge on one single global monetary system.
        - ## [Introduction](https://handbook.joincircles.net/about/whitepaper.html#introduction)
        - Universal Basic Income is one of the most cross-culturally appealing political movements of the modern era. It has attracted the support of thinkers from every background including Thomas Paine, Martin Luther King Jr, Stephen Hawking, Guy Standing, Milton Friedman, and David Graeber. It is seen as a utopian project that could finally unlock the creative potential of all people, the culmination of centuries-old humanist ideals.
        - The topic of UBI has exploded in popularity in recent years, as wealth inequality grows and inflation-adjusted wages fall all across the world. Until now, the conversation has primarily been viewed through the lens of public policy and bureaucratic action. Public support for the idea of UBI has never been higher, but plans for implementation are progressing slowly and without cooperation at the international scale. It seems that UBI systems have received a "too big to implement" label at the highest levels of government, similar to climate change action, making development and rollout unlikely to happen any time soon.
        - The introduction of global blockchain networks changes the conversation about UBI significantly. Now for the first time in history, it is trivially easy to create financial applications that are universally accessible to anyone on the internet. Starting with Bitcoin and moving on to smart contract platforms like Ethereum, blockchain technology has achieved widespread popularity by routing around the gatekeepers and roadblocks that make innovation so difficult in the legacy financial system. Smart contracts and the blockchain create a very promising environment in which to implement a new UBI system.
        - Circles proposes to be the blockchain's native UBI money system. It has its own built-in resistance to Sybil attacks (i.e. fake accounts) and anyone can join the network at any time without asking permission from anyone. It has been designed with the expectation that it will be bootstrapped in a completely organic and grassroots fashion, but is extensible to allow any arbitrary governance systems to operate on top of the base protocol. Circles is an entirely new way of looking at the nature of money and what value exchange means in a post-UBI future.
        - ## [Minting Currency](https://handbook.joincircles.net/about/whitepaper.html#minting-currency)
        - Circles is a money system that is made up of individual currencies. These currencies work together to form a unified “monetary fabric” that behaves like a Universal Basic Income.
        - When a new blockchain account joins Circles, the system creates and assigns them a unique currency via a smart contract. This is called a __Personal Currency__, and all personal currencies operate according to a shared set of rules.
        - Each personal currency continuously mints new coins and awards them to its associated person. Moreover, the amount of coins minted is inflating every year. This is the only way that new money is created in Circles and forms the basis of its UBI characteristics. All currencies mint new coins at the same rate, meaning that new money is co-produced and distributed equally to all members of the system at all times.
        - Alice joins the system, creating AliceCoin. PersonalCoins are all minted at a rate of, for example, 1 per minute. Five minutes later Alice has 5 AliceCoin and Bob joins the system, creating BobCoin. Five minutes later Alice has 10 AliceCoin and Bob has 5 BobCoin
        - It’s important to note that new currency units are only awarded to the person associated with each personal currency:
        - Alice joins the system, creating AliceCoin
PersonalCoins are all minted at a rate of 1 per minute
Five minutes later Alice has 5 AliceCoin and Bob joins the system, creating BobCoin
Alice transfers her 5 AliceCoin to Bob
Alice has 0 PersonalCoins and Bob has 5 AliceCoin
Five minutes later Alice has 5 AliceCoin while Bob has 5 AliceCoin and 5 BobCoin
        - ### [Inflation](https://handbook.joincircles.net/about/whitepaper.html#inflation)
        - In order to disincentivize hoarding and to encourage economic activity, the system will introduce an annual inflation schedule. This is demurrage by other means, where all personal currencies will issue progressively larger amounts of tokens per year, paid out per second. New users will always start issuing at a rate that is consistent with all other [[personal token]].
        - Alice joins the system, creating AliceCoin
PersonalCoins are all minted at a rate of 1 per minute, and inflates 100% every five minutes
Five minutes later Alice has 5 AliceCoin and Bob joins the system, creating BobCoin
Alice transfers her 5 AliceCoin to Bob
Alice has 0 PersonalCoins and Bob has 5 AliceCoin
Five minutes later Alice has 5 AliceCoin while Bob has 5 AliceCoin and 5 BobCoin
Alice has 5 coins total, and Bob has 10 coins total. The difference between their holdings is 5 and Alice has .5 (half) the amount of coins that Bob has.
The issuance rate inflates 100% and is now 2 coins per minute.
Five minutes later Alice has 15 AliceCoin while Bob has 5 AliceCoin and 15 BobCoin.
Alice has 15 coins total and Bob has 20 coins total. The difference between their holdings is still 5, but now Alice has .75 (three quarters) the amount of coins that Bob has. The relative difference between their holdings is decreasing.
        - ## [Trusting Currency](https://handbook.joincircles.net/about/whitepaper.html#trusting-currency)
        - In order to create useful money, users trust each other’s currencies. Trust is what facilitates exchange in the system. When a user trusts a currency, they tell the system that it is equivalent to any other Circles currencies that they already have. This means that anyone with this trusted currency can automatically trade it for one of your Circles currencies at a one-to-one exchange rate.
        - Bob trusts AliceCoin
Bob has 10 CarolCoin
Dave has 10 AliceCoin
Dave gives 5 AliceCoin to Bob and takes 5 CarolCoin from him
            - {{mermaid}}
                - graph TD
                    - BobWith10Carol --> Alice
                    - DaveWith10Alice
        - Another way of thinking about trust is that it is the user telling the system that they acknowledge specific currfencies as “real money.” Since any blockchain accounts can join the system and start minting currency, a trivial attack is to create multiple accounts and register with each to get multiple basic incomes. This is called a Sybil attack in computer security terms. The existence of trust relationships is how users protect themselves from fake accounts by specifying which ones they know for a fact represent an individual human’s primary account, forming a native Sybil resistance in the system. At a community level, trust in the system means that there are resources one can claim for Circles.
        - Because of the danger of any account becoming a sybil at any time, trust can also always be revoked. When and if trust is revoked, the person who is revoking trust can still spend the coins of the person they are untrusting, but they will not receive any new coins from that user via transitive transactions.
        - Because trust is a way to protect from counterfeit currencies, it is a serious responsibility on the part of the user. Users will have to rely heavily on mutual connections when making direct peer-to-peer trust relationships, and new users with no trust connections will have to get their closest loved ones to be their initial connections. It is theoretically possible to increase fungibility and ease of use in Circles with professional services (validators) which can act as brokers for trust, or with pooled group currencies, which can enforce their own policies for joining, however, these possible extensions will not be present in the first iteration of the Circles system. Further research on this subject is invited.
        - ### [Transitive Exchange](https://handbook.joincircles.net/about/whitepaper.html#transitive-exchange)
        - Trusting different currencies creates a useful form of money because of the transitive nature of social networks. Money is useful when it allows complete strangers to efficiently conduct business. When one stranger wants to send money to another in Circles, they automatically search for a transitive chain of trusted currencies between each other. The payer then trades along this chain of trusted currencies, one after the other, until they have one that the recipient accepts.
        - ____
        - Bob trusts AliceCoin
Alice trusts CarolCoin
Alice has 10 AliceCoin
Carol has 10 CarolCoin
Carol wants to pay Bob 5 PersonalCoins
Carol gives 5 CarolCoin to Alice and takes 5 AliceCoin from her
Carol gives 5 AliceCoin to Bob
        - ![Transitive exchange](https://handbook.joincircles.net/assets/diagram_1.png)
        - The transaction can be extended to include multi-hop chains of trust as well:
        - ____
        - Bob trusts AliceCoin
Alice trusts CarolCoin
Carol trusts DaveCoin
Alice has 10 AliceCoin
Carol has 10 CarolCoin
Dave has 10 DaveCoin
Dave wants to pay Bob 5 PersonalCoins
Dave gives 5 DaveCoin to Carol and takes 5 CarolCoin from her
Dave gives 5 CarolCoin to Alice and takes 5 AliceCoin from her
Dave gives 5 AliceCoin to Bob
        - ![](https://handbook.joincircles.net/assets/diagram_3.png)
        - With this system, the connectedness of the social network serves as a direct measure of users’ ability to transact with each other. A familiar way of thinking about this is the famous six degrees of separation phenomenon that suggests everyone on earth is connected to everyone else by a chain of six people. Circles uses these chains to transact through the system. If a user is well-integrated into the network, with many connections to other well-integrated users, they will find it easier to send and receive personal currency.
        - ### [Limits to Trust](https://handbook.joincircles.net/about/whitepaper.html#limits-to-trust)
        - Because personal currencies are only able to travel through their networks of trust, the fungibility of a specific personal currency is a measure of how many other accounts trust it and the resources available in the network. This means that users who are new to the system and don’t have many trusted relationships have a less fungible currency than someone who is well-established in the network. It also means that the currency of new users gets more fungible over time as they create more trust relationships.
        - Since the system internally enforces a one-to-one exchange rate, and new users’ personal currencies are less fungible than established users personal currencies, a potential problem emerges:
        - ____
        - 25 people trust AliceCoin
Bob is new, so only Alice trusts BobCoin
Bob has 100 BobCoin
Alice has 100 AliceCoin
Bob gives 100 BobCoin to Alice and takes 100 AliceCoin from her
Bob can now spend money with 25 people (and their friends, and friends of friends, etc)
Alice can now only spend money with Bob
        - ![Trust limits](https://handbook.joincircles.net/assets/diagram_4.png)
        - In the example above, Alice needs a way to acknowledge that BobCoin is real money, while limiting her exposure to it while Bob is still new. Circles achieves this with Trust Limits. When you create a trust relationship in Circles, you have the option to include the maximum amount of your total coins you are willing to hold in another user’s currency. A trust limit is expressed as a percentage.. With trust limits, Alice is able to help Bob integrate into the system in a more controlled way:
        - ____
        - 25 people trust AliceCoin
Bob is new, so only Alice trusts BobCoin
Alice puts a limit of 10 BobCoin per month on her trust
Bob has 100 BobCoin
Alice has 100 AliceCoin
Bob gives 10 BobCoin to Alice and takes 10 AliceCoin from her
Bob can now spend one tenth of his money with 25 people (and their friends, and friends of friends, etc)
Alice sets aside her 10 BobCoins to spend once Bob has made more trust relationships
Bob gets 10 people to trust BobCoin
Alice raises her trust limit on BobCoin to 100 per month
        - Trust limits reduce the risk of trusting new accounts to the system, making it easier for them to build trust relationships.
        - ### [Defending Against Fake Accounts](https://handbook.joincircles.net/about/whitepaper.html#defending-against-fake-accounts)
        - As we’ve shown, fake accounts are a primary consideration when designing protections into the system. Since money can be spent indirectly through transitive connections, let’s show how Circles defends against fake accounts that are connected to your friends:
        - ____
        - Bob trusts AliceCoin
Alice makes a fake account and trusts FakeCoin
Alice has 10 AliceCoin
FakeAlice has 10 FakeCoin
Alice wants to buy something worth 10 PersonalCoins from Bob using FakeCoin
FakeAlice gives 10 FakeCoin to Alice and takes 5 AliceCoin from her
FakeAlice gives 10 AliceCoin to Bob
        - ![Fake accounts](https://handbook.joincircles.net/assets/diagram_2.png)
        - This example demonstrates that Bob can only ever receive money that he trusts, and Alice can only ever spend money that other users trust in turn. Even if Alice makes 100 fake accounts and has them all trust each other, she will never be able to spend more than the amount of AliceCoins she has, since that’s the only account that other users will trust. This is why it is crucial that users take direct peer-to-peer trust relationships seriously.
            - Extra scenarios to clarify my understanding
                - When Alice does not have enough tokens to pay Bob
                    - What if Alice only has 5 AliceCoins, and Fake Alice has 10 FakeCoins. Can Alice get Bob to accept 10 of Alice/FakeAlice’s coins?
                    - My impression is this should not work, because Bob has specified he is willing to exchange a percent of his tokens for __Alice’s__ tokens, not Fake Alice’s. The trust that Alice extended to her fake account only allows her to redeem her own tokens for the fake one’s (and vice versa), but Bob still only trusts Alice, and in turn anyone that holds Alice coins, up to the percent limit he originally specified.
                - When Bob’s actions cause his token balance to violate his own trust limits.
                    - If Bob trusts Alice at 50%, and Alice trusts Fake Alice, and Bob is holding 5 Alice Tokens and 10 Bob Tokens, but then goes and spends 8 of his  Bob Tokens elsewhere, is Alice able to exchange any of her tokens for his? It seems that through his action, he allowed his AliceToken holding to exceed his specified trust limit.
        - ## [Complementary Currency](https://handbook.joincircles.net/about/whitepaper.html#complementary-currency)
        - Circles is not meant to become the world's dominant currency, cryptographic or otherwise. Rather, it is a complementary currency, working in harmony alongside other stores of value and mediums of exchange, itself embedded in a diversity of currencies. In the future Circles could even serve as a foundational "hard currency" for a more flexible group currency built on top. It is ideal as a hard currency because the supply of specific individual currencies is perfectly predictable and the aggregate system is highly resilient due to its lack of reliance on a centralized identity provider. To determine group membership, this hypothetical group currency could function with an arbitrary business logic such as being part of a business barter network, or democratically via geographically bounded assemblies. The group could then one-way convert the personal currencies of its members into a fungible group currency at a dynamic exchange rate that meets the group's needs over time. This would allow Circles to act as a staging ground for many different experiments in consensus reality (and morality), while still providing individual users the freedom to revert back to personal currencies if any one group becomes corrupted or useless. The possibilities for new political forms are numerous, but the potential for layer 2 systems on top of the base protocol is by far the most speculative aspect of the project and remains a decidedly open question for further research.
        - ## [Conclusion](https://handbook.joincircles.net/about/whitepaper.html#conclusion)
        - The Circles Money System was designed to get started creating a UBI economy today. We believe that the combination of resilience and global accessibility afforded by blockchain technology is a key catalyst that makes a Universal Basic Income achievable within the next generation. Our system's native Sybil-attack resistance and inbuilt decentralized identity make it an ideal focus for grassroots action and community organization, which have been hallmarks of envisioned UBI economies over the years. We are actively researching the economic implications of Circles' various design tradeoffs with the intention of creating a money system that is as useful and stable as possible. Our roadmap is designed to get started with trial applications as soon as possible in order to see how this new form of value exchange behaves in real economic settings. We are very excited about the potential of this project and hope that it can serve as a critical foundation for a new economic paradigm in the decades to come.
        - [](https://handbook.joincircles.net/about/index.html)
- Built by
    - [[Martin Koeppelmann]] (initiator)
    - [[Sarah Friend]] (developer)
    - [[Saraswathi Subbaraman]] (design)
- Additional reading
    - [Launch day tweet thread](https://twitter.com/koeppelmann/status/1317198709998977029?s=21) by [[Martin Koeppelmann]]
    - Similar in underlying concepts to
        - [[The Original Ripple Whitepaper]]
        - [[Trustlines]]
        - [[Trust is risk]]
        - [[social collateral]]
        - [[counterfactual social collateral cash]]
