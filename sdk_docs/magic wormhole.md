- Establishes a shared secret channel between two peers.
- https://github.com/magic-wormhole/magic-wormhole
- [[p2p]]
- By [[Brian Warner]]
- Not to be confused with [[Wormhole]]
- Good for situations where your initial connection is
    - Not as secure as you'd like (in public)
    - Not high-data transfer (like over the phone)
- Protocol
    - Messaging system where each machine has a unique cryptographic identity
    - Buttons
        - Add Contact
            - Create invitation code
        - Accept invitation
            - Pair over a signaling server
            - Create strong session key
            - Create long term identifier