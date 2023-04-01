- A wallet on the [[Odsy]] network
- Blog post
    - https://blog.odsy.xyz/odsy-what-are-dwallets-and-why-your-users-will-want-one/
- Impression
    - The wallet key is held by a threshold of validators holding their shares in [[Trusted Compute Module (TCM)]]s, and enforcing its own framework of access control logic on top.
    - Reminds me of [[Fission]]’s [[UCAN Co-Signer]], in that it purports to add security to the wallet by adding additional enforcement logic to the signer elsewhere.
        - Why is this enforcement logic better elsewhere than in the wallet itself?
            - key theft is one reason
        - What is the enforcement framework? Is it acceptably flexible?
            - I like [[[[MetaMask]] Snaps]] partly because by being JS it also gets access to [[wasm]]
                - could also enable trying schemes like this.