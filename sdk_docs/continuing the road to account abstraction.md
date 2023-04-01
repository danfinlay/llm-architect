- Beginning to articulate a response to [[The Road to [[account abstraction (AA)]]]]
- Points to hit
    - I feel that [[account abstraction (AA)]] is an opportunity to break free of the [[nonce based [[replay protection]]]], so I’d love to make other [[replay protection]] strategies possible, like [[multi-nonce]], so that we can have things like non-blocking queues of transactions, and lazily-submitted [[counterfactual]] transactions.
        - This is currently an assumption of both [[[[EIP]] 2938: [[account abstraction (AA)]]]] and [[[[EIP]] 4337: [[account abstraction (AA)]] via Entry Point Contract]], and I think we should all be very clear that their particular brand of transaction is only abstracting the signature, but not the replay protection. Maybe we should even call it account signature abstraction instead.
        - https://twitter.com/danfinlay/status/1553858040947884032