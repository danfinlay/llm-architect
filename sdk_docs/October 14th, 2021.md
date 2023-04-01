- [[Ceramic]]
    - launching network in a controlled environment first
    - Current authentication
        - [[3box style key generation]]
            - Has been good enough but they want better.
            - They don't like that it lives in the browser.
    - Alternative concept: Make write access into a capability system.
        - Generate random session key in the browser
            - Gets a [[DID]]
        - Connect ethereum address
        - Get a signature from the wallet
            - Challenge
                - URLs that the session key is allowed to write to.
                    - In the form of `Ceramic://zkj...`
                    - A linked list of [[ipld]] objects
                    - The first item in the list is the genesis block
                    - The website can be a full dapp, only on ipfs.
                    - The website then forwards to "the ceramic network".
        - Sign a limited delegation to this session key.
        - Limitations
            - Time limitation
        - They now use this signed object as a [[capability]], and verify it before permitting commits.
        - Seems to be working!
    - [[EIP-4361: Sign in with Ethereum (SiWE)]]
        - Now looking to use [[personal_sign]] 
        - No longer using [[EIP 712: signTypedData]]
            - So no domain/contract enforcement
            - no translation
        - Compresses data about the domain, 
    - Working on making 
    - [[User Controlled Authorization Network (UCAN)]]
    - [[NuCypher]] merged with [[Keep Network]]
    - Questions
        - Is this new method chainable?