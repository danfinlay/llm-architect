- A [[Multi-Party Computation (MPC)]] solution for [[Ethereum]].
- Uses a 2 of 3 key share [described here](https://web3auth.io/docs/infrastructure/key-management).
    1. On device
    2. On web2 cloud service
    3. "Backup share"
        - Possibly traditional [[seed phrase]] or other paper backup.
- UX flow
    - still have to backup the backup share during onboarding
    - Also need to log in to a traditional site during onboarding.
- Security scenarios (red teaming)
    - cloud service is hacked
        - this key cannot sign transactions alone
    - backup share is lost
        - user has device & oauth service access still?
            - yes
                - Can recover
            - no
                - Funds are lost
    - backup share is compromised
        - attacker needs access to device or cloud service also
    - device is compromised
        - if logged into 0Auth
            - Effectively compromised
        - If not logged into 0Auth
            - attacker has to wait for an 0Auth or recovery process.
    - Fake support phisher
        - Tries to get them to sign into a malicious site
            - gives the site access to share 2
                - could then try to ask them to enter their recovery share
                - could then try to get them to sign malicious transactions as normal
