- https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-25.md
- After handshake, you get a list of accounts that are provided by that snap.
    - So we're assuming every namespace has associated accounts?
        - What about data providing [[[[MetaMask]] Snaps]]? Custom asset snaps?
        - Maybe just account providing snaps.
- ```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "provider_authorization",
  "params": {
    "requiredNamespaces": {
      "eip155": {
        "chains": ["eip155:1", "eip155:137"],
        "methods": ["eth_sendTransaction", "eth_signTransaction", "eth_sign", "get_balance", "personal_sign"],
        "events": ["accountsChanged", "chainChanged"],
          "metadata": {
            "AccountsWithAsset": ['dai2'],
            "afterApprovalSubmitTxs": [...txs],
              // requires the snap provide relevant accounts
          }
      },
      "eip155:10": {
        "methods": ["get_balance"],
        "events": ["accountsChanged", "chainChanged"],
        "fallbackSnapInstallParams": SNAP_PARAMS,
      },
      "cosmos": {
        ...
      }
    },
    "optionalNamespaces":{
      "eip155:42161": {
        "methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "personal_sign"],
        "events": ["accountsChanged", "chainChanged"]
    },
    "sessionProperties": {
      "expiry": "2022-12-24T17:07:31+00:00",
      "caip154-mandatory": "true"
    }         
  }
}```
- Pros
    - Limits access to requested chains and methods
    - Multiple simultaneous network connections
    - You could probably add some snap-installing parameters to a namespace options object, so it could work with Snaps in that way.
- Cons
    - Has no support for attenuating the approved permissions
        - The sessionProperties is only enforced at the client level, not on chain.
    - Seems to narrow the scope of what an initial connection handshake can be
        - How would you ask for an account with a specific asset to be connected?
        - How would you ask for some number of accounts in the same connection?
        - How would you ask for an allowance in the same connection?
