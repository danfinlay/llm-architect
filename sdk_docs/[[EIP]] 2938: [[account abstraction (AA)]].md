- https://github.com/ethereum/EIPs/blob/296992f1fefed2638a67a865f78155233ccef141/EIPS/eip-2938.md
- Opened [[September 3rd, 2020]]
- An [[account abstraction (AA)]] proposal by [[Vitalik Buterin]] and [[Alex van de Sande (avsa)]]
- People giving input
    - [[Alex van de Sande (avsa)]]
    - [[[[Gnosis]] SAFE]]
- Notes
    - We split [[account abstraction (AA)]] into two tiers:
        - **single-tenant AA**, which is intended to support wallets or other use cases with few participants
        - **multi-tenant AA**, which is intended to support applications with many participants (eg. tornado.cash, Uniswap.)
    - Use cases
        - Smart contract wallets that use signature verification other than ECDSA (eg. Schnorr, BLS, post-quantum...)
        - Smart contract wallets that include features such as multisig 
verification or social recovery, reducing the highly prevalent risk of 
funds being lost or stolen
        - Privacy-preserving systems like [tornado.cash](http://tornado.cash)
        - Attempts to improve gas efficiency of DeFi protocols by preventing 
transactions that don't satisfy high-level conditions (eg. existence of a
 matching order) from being included on chain
        - Users being able to pay for transaction fees in a token other than 
ETH (eg. by converting that token into the ETH needed for fees inside 
the transaction in real-time)
    - Defines a new [[[[EIP]] 2718: Typed Transaction Envelope]] type: `AA_TX_TYPE`
        - Their payload should be interpreted as `rlp([nonce, target, data])`
        - 
- feedback
    - Still hard-codes [[nonce based [[replay protection]]]]
        - I feel that [[account abstraction (AA)]] is an opportunity to break free of the [[nonce based [[replay protection]]]], so I’d love to make other [[replay protection]] strategies possible, like [[multi-nonce]], so that we can have things like non-blocking queues of transactions, and lazily-submitted [[counterfactual]] transactions.
        - A cool thing about [[[[EIP]] 3074: Delegated Invocation Contracts]] is that it does not make any comment on replay protection. A delegation signature could enable anyone to trigger a given contract's known behavior. That's open-ended, empowering, and I would say good.
- Tagged:: #EIP #[[account abstraction (AA)]]
- Author:: [[Vitalik Buterin]] [[Ansgar Dietrichs]] [[Matt Garnett]] [[Will Villanueva]] [[Sam Wilson]]
- https://eips.ethereum.org/EIPS/eip-2938
- https://ethereum-magicians.org/t/eip-2938-account-abstraction/4630
- [[Implementing Account Abstraction as part of eth1.x]] 
- [[[[EIP]] 2938: [[account abstraction (AA)]]]]
- [[EIP-2938: Account Abstraction Why & What]]
- [[EIP-2938 Explained]]
- [[DoS Vectors in Account Abstraction, a Case Study in Geth]]
- [[Case Study: UTXOs on Ethereum]]
- https://github.com/quilt/account-abstraction-playground
