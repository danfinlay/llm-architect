- A concept exploration by [[Dan Finlay]] when he was first trying to apply the principles of [[social collateral]] to [[Ethereum]] but before he had learned about [[object capability (ocap)]].
- [Original gist](https://gist.github.com/danfinlay/73b6ffd11aea5a85767fe20c6ad868c5)
- Full text
    - ## CounterFactual Social Collateral Cash

### A code-free introduction to a blockchain-minimized digital social collateral system.

Imagine a situation where Alice has an account with $100 in it. This is a special kind of account that allows her to give out special spending limit codes to her friends which allow them to in turn to give out their own spending-limit codes.

For example, imagine this set of signed messages:
- “Bob may withdraw up to $100 from my account” - Alice, signed 5/8/2018
- “Carol may withdraw up to $50 of my allowance from Alice” - Bob, signed 7/6/2018 (includes reference to previous Alice message)
- Carol needs to send $10 to Dave immediately.

Carol can then sign a message to redeem some of her allowance, by using the format:
- to: Alice
- from: Carol
- transaction to send:
    - value: $10
    - to: Dave
- authorization:
    - “Bob may withdraw up to $100 from my account” - Alice, signed 5/8/2018
    - “Carol may withdraw up to $50 of my allowance from Alice” - Bob, signed 7/6/2018 (includes reference to previous signature)

Alice has a system (smart contract?) that is able to receive messages of this format.
It walks up the authorization list, and ensures each person validates the next.

If the validation list traces from the requester to Alice,
and each person authorized an amount equal to or less than their own allowance,
then Alice’s account records each person’s updated balance (1),
then it sends the requested transaction.

This allows any person to establish an account on-chain such that:
- They are able to extend lines of credit entirely off-chain.
    - These lines of credit can in turn be used to back new lines of credit, also entirely off-chain, by passing signed authorization messages between users.
    - This has some privacy benefits: While withdraws identify each member in the chain, developing dense trust networks could be an entirely confidential affair.
- Recipients of these lines of credit can withdraw up to their credit line at any time, from the blockchain.
    - The longer the credit line (in hops), the more expensive the on-chain processing is.
        - Some withdraws may need to be broken up into multiple transactions.
        - To withdraw a line of credit, the end user would need at least enough network fuel (like ether) to process the withdraw the first time. After a withdraw is made, presumably that currency could be made to pay for network fees.
            - This could be alleviated by a gas-paying service, but that’s another story.
- These lines of credit can be increased off-chain.
    - By including a reference to the previous credit-setting message, to prove ordinality.
    - Decreasing a line of credit requires an on-chain transaction, to block future withdraws exceeding that amount.
        - This means giving a friend some cash no longer requires them to back up a key. If they lose the key, you can cancel that line of credit, and extend another. Or just extend another, if you trust them enough. Nobody lost funds because a new user lost a key.
- These lines of credit are not like hard crypto holdings: They are backed only by the account that issued them (Alice), as well as each person who signed the allowance along the way, each of whom can withdraw up to their limit of collateral at any time.
    - If the base account has maintained a history of usage and abundant backing, it can build confidence in the holder.
- A person is able to easily prove their credit limit to another person by sharing their signed message:
    - The message imbues specific accounts with powers, but by itself cannot be used by unauthorized accounts.

[1]: Updating balances. When a message with multiple chained signatures are submitted to the base-account (master account? collateral account? wording?), as it climbs up the chain, it needs to record some important things to prevent people from re-submitting permission “Allowance” messages:
- address of giver
- address of recipient
- max amount permitted
- amount now spent
- date of this allowance
- hash of this allowance message

If this information is already recorded for this giver-recipient pair, the requested amount is simply deducted from that link (added to `amount now spent`, approaching `max amount permitted`).

In order for a credit limit to be increased (within the context of one base account), the sender’s new message would need to reference the hash of the on-chain recorded allowance limit in a new message setting an allowance.

If we imagine the above Alice-Bob-Carol situation, where Carol had spent $10 of Bob’s allowance, Bob might re-authorize her up by $10, thus “approving the expense”, in a way.

When Carol submitted her message, something like this was recorded on the blockchain:

- address of giver: Bob
- address of recipient: Carol
- max amount permitted: $50
- amount now spent: $10
- date of this allowance: 5/8/2018
- hash of this allowance message: X

To update this, Bob would need to sign a message something like:

- “Carol may withdraw up to $60 of my allowance from Alice” - Bob, signed 6/20/2019, in full acknowledgement of previous allowance X.
    - This new message can be used in an off-chain chain of allowances to create the same kind of collateral-cash as before.
