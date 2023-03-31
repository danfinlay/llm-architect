- A proposal by [[Dan Finlay]] for an iteration on [[MetaMask]] internal [[provider]] organization in a way that can allow us to evolve towards a more organized and event-driven stack.
- ## Introduction
    Today we have a provider mostly composed from [[json-rpc-engine]], and our permissions system is built out of [[rpc-cap]], making it mostly a [[JSON RPC API]] provider.
        - The only exceptions are the `networkChanged` and `accountChanged` events, which are highly coupled to the [[metamask-inpage-provider]] and it isn’t easy to quickly add more events, as each new event requires code changes in multiple files just to pass those methods through.
    [[EIP-2831: Transaction Replacement Message Type]] introduces new event listeners for `tx-replacement` and `tx-cancel`, and we would want to restrict these to the approved eth accounts for the listener.
    Our current implementations of event subscriptions have no need for permissions, since [they just indicate global wallet state](((YqNn_vMLt))), and so they are hard coded into the [[metamask-inpage-provider]] [here](https://github.com/MetaMask/inpage-provider/blob/ac7f092162b61ae59ddf074530b90f94b2139a85/src/MetaMaskInpageProvider.js#L133-L164).
    We need a longer term solution for safely adding new subscription methods, including ones that might have restricted permissions.
    A subscription method might itself be a [[restricted method]] or it may be a [dependent permission](https://github.com/MetaMask/rpc-cap/blob/master/test/dependentPermissions.js), which would allow it to draw on other existing permissions for its access policy.
- ## Proposal
    [[json-rpc-engine]] actually does support an event emitter [as seen on this line](https://github.com/MetaMask/metamask-extension/blob/e2dedaacdb0038d63a008db34562be3a73afea5e/app/scripts/metamask-controller.js#L1600)
    We could construct a restricted event emitter there.
    [[rpc-cap]] would probably need to be extended to also support [[restricted event]].
        - If we tried separating rpc-cap from the event permissions, maybe a module called "event-cap", we would not be able to build ((FAMpQb4B4)) in one that relied on permissions recorded in the other.
        - This would allow the snap system to be built in a way where a site could register a listener to a given [[Snap]].
            - Imagining the API
                - A CapTP approach
                    - Something similar to the [[wallet.registerApiRequestHandler(handler)]] method in 
        - [[rpc-cap]] could register any [[restricted event]] on the [subscriptionManager](https://github.com/MetaMask/metamask-extension/blob/e2dedaacdb0038d63a008db34562be3a73afea5e/app/scripts/metamask-controller.js#L1600)
- {{kanban}}
    - Backlog
        - Convert current [[metamask-inpage-provider]] to use the [subscriptionManager](https://github.com/MetaMask/metamask-extension/blob/e2dedaacdb0038d63a008db34562be3a73afea5e/app/scripts/metamask-controller.js#L1600) to access its [pre-existing events](((YqNn_vMLt))).
        - Extend [[rpc-cap]] to support [[restricted event]]
        - Add [[restricted event]] to support [[EIP-2831: Transaction Replacement Message Type]]
        - Ensure [subscriptonManager](https://github.com/MetaMask/metamask-extension/blob/e2dedaacdb0038d63a008db34562be3a73afea5e/app/scripts/metamask-controller.js#L1600) is cleaned up when a connection closes.
    - In Progress
    - Done
