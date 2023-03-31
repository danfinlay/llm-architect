- Goals for a solution
    - Be simple to understand & implement.
    - Be forward-extensible enough.
        - Support [[service tag based discovery]]
            - When routing requests to different network providers, requests should go through a service tag directory, which maps protocol identifiers to the internal provider.
            - This configurable mapping allows users to configure custom providers for a given protocol.
            - Example
                - If we used [[[[CAIP]] 10]] as a service tag label schema, then a site might say `requestProvider({ network: 'eip155:5' })`.
                - The internal service tag registry would look up current configured handler for `eip155:5`.
                    - This might point to a default Infura endpoint, or another RPC, or a Snap.
            - Having service tag based discovery would be essential to ensuring that we don't make dapps become aware of specific snaps, but instead request desired interfaces.
            - To facilitate duck-typing, the provider-requesting API might also have a feature detection request.
                - Example
                    - a site might say `requestProvider({ network: 'eip155:5', { requiredMethods: ['wallet_signTypedData_v4' ] } })`.
        - A single handshake should eventually be able to...
            - include any number of permissions requests that an application might make from a user. (see [[Safety for Extensible Permissions Systems]])
            - Include ability for user to attenuate each requested permission.
            - How would you ask for an account with a specific asset to be connected?
            - How would you ask for some number of accounts in the same connection?
            - How would you ask for an allowance in the same connection?
            - Should support installing snaps for permissions/namespaces that are missing.
- We can break it up as it stands into layers of safety, and could even standardize them incrementally
    - The unit of consent
        - namespace/scope/service/permission
            - no safety, just a domain of service, can have multiple services that overlap or complement, but intended to be a domain of expertise.
            - This can be treated as the unit of consent, the [[appropriate boundaries]] of the interface.
                - A snap could register multiple, it's fine.
                - Ideally a snap would register a handler __per appropriate boundary__, so that the kernel can handle user selection & routing, [reducing the confused deputy risk](((-l8N58izy)))
                    - This is in conflict with how [[CAIP-25: Handshake]] currently adds chainIds and accounts with  the request & response. If taking my advice, we would probably require accounts and networks to be registered as unique scopes.
    - Layers of specificity
        - required methods & notifications
            - A basic layer of specificity for a service provider to provide, that gives a consumer a way of expressing hard requirements.
        - required chainIds
            - I am inclined to say this should not be part of the initial spec
                - it imposes an assumption that every domain has a notion of chainIds, which doesn't seem like a universal assumption to me.
                - alternative approaches
                    - negotiating supported chainIds could be handled within a namespace/scope/service once established
                    - could be broken into multiple scopes
                    - a more general purpose specificity field could be defined that can be used for this purpose.
        - increasingly strong typing/specificity
            - [[OpenRPC]] or something else could be additional optional fields for services to declare themselves and consumers to request those features safely.
        - human readable description
            - of any one of the above layers, can be added later as long as each one is defined as an object.
- Dimensions of a solution
    - The UX of connecting
        - Requesting a single evm network & account at once
        - Requesting a single evm network & any number of accounts on it (MetaMask circa 2022)
        - Requesting a set of evm networks, and a set of accounts on them.
            - Represented well by [[CAIP-25: Handshake]]
                - Also supports requesting multiple networks at once, but does not comment on what this UX would look like.
        - Requesting any number of network-accounts, maximizing specificity
            - cons
                - Can mean multiple accounts with the same address appear in the same list
                    - This bloat can be reduced by the site requesting some limited number of networks.
        - Requesting a set of __permissions__ that are required to use the site.
            - Requires judgement on the API designers: What are the [[appropriate boundaries]] that users care about?
            - Is compatible with the [[[[EIP]] 2255: Wallet Permissions System]] that [[MetaMask]] uses.
            - Eventual optional extensions
                - include on-chain permissions, or local extensions.
                    - Any permission that is easy to grant should also be made easy to revoke, per [[principle of [[revocation]]]].
                - Provide a [[justification]] along a permission.
                - Allow requesting accounts that hold a specific asset
                    - Even show the asset nicely!
            - Example permissions
                - Ability to read from X network
                - Ability to view [some selection of] evm accounts.
                - Ability to view [some selection of] [other type of] accounts.
                - Ability to view address book nicknames.
                - Ability to install a [[[[MetaMask]] Snaps]] that will live in your wallet and can [permissions].
                - Sign a signature challenge for this site
                    - Could abstract [[EIP-4361: Sign in with Ethereum (SiWE)]] into a single line item.
                - Generate a key for this application.
                - Issue an allowance
                    - Some can be just signatures
                        - [[EIP 2612: DAI_v2 style permit()]]
                        - [[permit2 for [[ERC-20]]]]
                        - [[Delegatable Eth]]
                        - These would still cost some gas to revoke, so it might be good to warn a user if they don't have enough eth to revoke in case something goes wrong.
                    - Some may be on-chain transactions
                        - [[ERC-20 Token Allowance]]
                        - This would require some gas payment, so is a strictly harder problem.
        - Requesting any number of accounts, and whatever networks it is available on
            - This one I just came up with this afternoon, might be a nice simplification vs trying to list every account-network set.
            - Could be used as a feature of Requesting a set of __permissions__ that are required to use the site.
    - How to set up multiple network connections
        - How to request something that provides a related service at a high level: [[service tag based discovery]].
        - How to request something that provides a more specific interface
            - Required methods
            - Specific typed interface
                - [[OpenRPC]] types?
        - Approaches
            - [[CAIP-25: Handshake]]
            - [[[[[[EIP]] 2255: Wallet Permissions System]] service registry]]
    - How to send an RPC request to a connected network
        - [[Caip 27: Request to a specific chain]]
        - nested RPC approach in parameters
            - ```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "wallet_network",
  "params": {
    "chainId": "eip155:1",
    "session": "0xdeadbeef",
    "request": {
      "method": "personal_sign",
      "params": [
        "0x68656c6c6f20776f726c642c207369676e2074657374206d65737361676521",
        "0xa89Df33a6f26c29ea23A9Ff582E865C03132b140"
      ]
    }
  }
}```
        - [[[[Frame ([[wallet]])]] chainId meta-key]]
        - Using the underscore as namespace divider
            - As we have `eth_`, `wallet_`, allow any prefix to be registered as a handler for that namespace.
            - Similar to the `wallet_snap_*` [method](https://docs.metamask.io/guide/snaps-rpc-api.html#wallet-snap).
            - Could reserve `wallet_service_*` for it?
            - Kick off a new namespace intended for blockchain providers, make it easy to register them.
                - ex: `caip25_eip155:5_sendTransaction`
            - Was kinda how the original [[[[MetaMask]] Snaps]]s beta worked, but was phased out.
            - Would be easy to use as a [[[[[[EIP]] 2255: Wallet Permissions System]] service registry]]
            - pros
                - Is pretty friendly to [[OpenRPC]] stuff
            - cons
                - How do you route to multiple unique items, like when several providers are returned for a domain?
    - How to listen for notifications on a specific network
        - No current concrete proposals
- Current proposals
    - [[CAIP-25: Handshake]] + [[Caip 27: Request to a specific chain]] by [[Pedro Gomes]]
        - Pros
            - Limits access to requested chains and methods
            - Multiple simultaneous network connections
            - You could probably add some snap-installing parameters to a namespace options object, so it could work with Snaps in that way.
            - Has "session properties"
                - Can include expiration, which is nice to expire an RPC connection.
        - Cons
            - It assumes each “scope” is a chain (by [[[[CAIP]] 2: Chain Identifier]]), and therefore has one interface per scope type, which can invite collisions between different interfaces for using the same chain/network.
                - The current story is that we would simply force one provider per network per dapp.
            - It nests The unit of consent within layers: A scope contains an implicit account request.
                - The request isn't explicit whether it needs no accounts, one, or many, and so a user would probably be prompted with a many-account selector even if a site only needed to read a chain.
                - It also allows for requesting multiple overlapping scopes (like `eip155` and `eip155:5`), so even though it supposedly only allows requesting one provider per network, it really does have a semantics that supports overlapping scope requests.
                    - If two scopes are requested, do we make the user select accounts twice? Remember, these scopes might have different `methods` and `events` required for them! Seems like a user might have to select the same account twice for multiple requested scopes.
                    - As more overlapping scopes are included in the same request, the user is then presented with 2x as many confirmations, instead of a simple "which networks + which accounts do you want to connect?" type interaction that could be possible [by simply using our permissions system or a similar array of requested scopes that may be plural](((R8xu7cNw9))).
            - Has no support for attenuating the approved permissions
                - The sessionProperties is only enforced at the client level, not on chain.
            - Seems to narrow the scope of what an initial connection handshake can be
                - How would you ask for an account with a specific asset to be connected?
                - How would you ask for some number of accounts in the same connection?
                - How would you request some other, non-network/account permissions in the same connection?
                    - Like installing a [[[[MetaMask]] Snaps]]
                    - Like requesting an allowance signature
                - I guess this can be done from our usual permissions request instead? Are we planning to simply support both?
    - Frame Wallet
        - Recently announced they would support multi-network requests by adding a `chainId` key to the top-level [[JSON-RPC API]] request object.
        - This violates the [[JSON-RPC API]] standard, and so while this provides a convenient way to differentiate requests, it will make that approach incompatible with large portions of existing tooling for the current type of API we are supporting, so it's not an ideal choice of approach.
    - A [[[[EIP]] 2255: Wallet Permissions System]] based solution
        - We might start by defining a [[service tag based discovery]] system, where different restricted "methods" are treated as handlers for [reasonable bags of permissions]([[appropriate boundaries]]).
            - ```javascript
const response = await provider.send({
  method: 'wallet_requestPermissions',
  params: [{
    'caip10:eip155:1': {},
    'bip122': {},
  }]
})
```
        - Now the site can make requests to the given snap in the form of subsequent requests to them, where the "restricted method" is also a service tag that points requests to the approved snap. Example:
            - ```javascript
await provider.send({
  method: 'bip122',
  params: {
    method: 'bitcoin_sendTransaction',
    params: BITCOIN_PARAMS,
  }
})```
        - Often, an initial connection might come with some additional requests for that snap. A good example parallel to the modern web3 provider is requesting access to a user's accounts. If the ethereum support were a snap, accounts might be requested in the same initial handshake in a way like this:
            - ```javascript

const response = await provider.send({
  method: 'wallet_requestPermissions',
  params: [{
    'caip10:eip155:1': {
      requiredMethods: ['signTypedData_v4'], // already in spec
      permissions: [
        { name: 'eth_accounts' }
      ]
    },
    'bip122': {},
  }]
})```
        - In this example, I've added an optional `permissions` key to the requested restricted method.
            - I'm making the members of that array into objects so they can be easily extended later.
            - These could be handled in different ways
                - They could be passed to the snap, which could handle them in whatever way it wants.
                    - Triggering a subsequent screen, like an account selection, for example.
                - We could have a global permissions-registry which allows the snap to render these permissions requests in the same initial connection prompt (maybe longer term?)
        - For methods that don't exist yet, we could support including snap-installing parameters as well:
            - ```javascript

const response = await provider.send({
  method: 'wallet_requestPermissions',
  params: [{
    'caip10:eip155:1': {},
    'bip122': {
      snapParams: SNAP_FALLBACK_RECOMMENDATIONS,
    },
  }]
})```
        - Possible implementation stages
            - v1: Single method per snap
                - A snap is either connected to a site or not, and handles its own method/switching/permissions (like the original snaps beta). The snap can declare itself as providing a specific [method]([[service tag based discovery]]), like "eth_sendTransaction", or "evm-account-chainId:1", and that will make it available to users/dapps through the normal interfaces (account switcher, network requests).
            - v2: A snap can register any number of named services.
                - These services are each now permissions in our permissions system. Each permission is labeled with a [[security frame]] to indicate which snap is providing it. When multiple providers of a registered service are available (like in the case of `evm-account-chainId:`), the user is shown a selector for choosing one. Each registered service can have 
    - [[[[endo]] pet daemon]] based kernel exposing [[CapTP]]
        - May be a bit far off the path of what we've built so far for now.
        - It looks like we can build on Manifest v3 for now, so it may not yet be needed.
        - 
    - Just getting it out of my system: What if it was [[CapTP]] based
        - ```javascript
const [ cosmosToken, ethereumSigner ] = wallet.request({
  method: 'request_providers',
  params: [
    {
      network: 'caip10:cosmos',
      mustHave: [{
        token: 'AGR',
        quantity: '>10',
      }],
      fallbackProvider: FALLBACK_COSMOS_RPC_PARAMS,
    },
    {
      network: 'caip10:eip155:1',
      requiredMethods: ['eth_sendTransaction', 'eth_call'],
      
    }
  ]
})```
    - Another [[[[EIP]] 2255: Wallet Permissions System]] based solution using [[service tag based discovery]] and [[capability]] identifiers for resources.
        To start, here is a TLDR set of examples that summarize some ideas that result from this exploration
            - The basic initial request should look fairly familiar. It's trying to just use the 2255 syntax with a few parameters that try to achieve at least feature parity with [[CAIP-25: Handshake]]
            - ```javascript
provider.request({
  method: 'requestPermissions',
  params: [
    {
      'evm_network': {
        requiredMethods: ['eth_call'],
        requiredValues: {
          chain_id: 1, // could be an array to support many
        }
      },
      'eth_accounts': {
        multiple: true,
        requiredMethods: ['signTypedData_v3', 'eth_sendTransaction', 'personal_sign'], // Additional methods that are included with these results.
      },
    }
  ]
});```
            - Returned values would now have unforgeable identifiers associated with them (sometimes called [[swiss number]]s), which solves the problem of having multiple handlers registered for a given entity. Realistically accounts might be an exception to this, which might trigger the user to choose a handler upon an action being proposed (like which hardware wallet)
                - ```javascript
{
  eth_accounts: [
    { address: '0xdeadbeef', id: 'SOUNIQUE1345134' },
    { address: '0xdeadbeef', id: 'IMPOSS1BLYRAR3E' }
  ]
}```
            - Some cases like account routing probably need to be handled specially (maybe giving the user a choice upon a method being called)
            - While legacy methods could be supported, there should perhaps be a new method for explicitly referring to a granted permission by its unforgable identifier
                - ```javascript
provider.request({
    method: 'usePermission',
    params: {
      id: SWISS_NUMER_METHOD_ID,
      params: {
        method: 'eth_sendTransaction',
        params: TX_PARAMS
      },
   }
});
```
                - This approach to issuing a request is effectively a [[capability based security]] approach, without needing to fully adopt [[CapTP]], although it could potentially be extended to become a [[marshal]] layer for [[CapTP]] later on, if combined with a subscription interface.
            - There is also some exploration for how the routing of these permissions to an internal module or [[[[MetaMask]] Snaps]] can work, as well as discussion of why a single-resource listener-registering handler like this makes it harder to write unsafe code prone to [[confused deputy]] problems:
                - ```javascript
// The snap has its own `privateKeys` array.
privateKeys.forEach((privKey) => {
  const address = addressForKey(privKey);

  // Imagine a global `snaps` API providing this method:
  snaps.registerAccountHandler(address, ({ method, params }) => {
    if (method === `eth_sendTransaction`) {
      return signTransaction(params, privKey);
    }
  })
})```
            - You can imagine extending the ability to add new custom services, maybe like this:
                - Let's say there's a custom asset snap. We have a method called `registerHandlerForCustomAsset` for each call to it, you get to register an asset.
            - **Next time, let's discuss handling the relationship between multiple resources, like an account that may have multiple network relationships.**
        If we imagine that the [[[[EIP]] 2255: Wallet Permissions System]] is basically just a way of asking for some things and then getting some things back if the user approves them, then from the consumer side, it's just a process of requesting and possibly getting back. All the interesting magic for us really happens on the other side. So let's continue that thought from the conversation where we said "what if we just identify the objects that are meaningful to our API consumers, like the network for the purposes of reading or the account for the purposes of reading information related to a signer or an asset for the purposes of getting an allowance and transacting with it". It could be a voting right or something more sophisticated later on.
        We start with an example where we request the two most common types of access that websites get from a web3 wallet today: A network (read access) and an account (balance reading and transaction suggesting [[power/capability]]).
        ```javascript
provider.request({
  method: 'requestPermissions',
  params: [
    {
      'evm_network': {
        requiredMethods: ['eth_call'],
        requiredValues: {
          chain_id: 1, // could be an array to support many
        }
      },
      'eth_accounts': {
        multiple: true,
        requiredMethods: ['signTypedData_v3', 'eth_sendTransaction', 'personal_sign'], // Additional methods that are included with these results.
      },
    }
  ]
});```
        In this case, let's imagine the `multiple: true` parameter allows the user to select multiple providers for the given service for applications that know how to handle that case.
        An aside on encouraging incremental requests instead of monolithic handshakes
            - I think it's worth keeping in mind that eventually the site handshake might involve delegating some rights to a site that could be used on the signer's behalf. I think it's an anti-pattern that today most connection handshakes are one-time things done at the beginning of the site's usage. I think it's much healthier if we make it very easy and normal for users to selectively permit things as they make sense to the interaction at hand. I think this kind of happens today where a user might connect an account first so they can show their balance, and then once they select a token to swap with, a site would ask for an allowance in that token so that they could swap. That's a pretty appropriate order of events. We're working on making sure that they limit the allowance more, but other than that, they're somewhat at least empowered to practice the principle of least authority.
            - We should be considering how can we empower users to practice the principle of least authority in more context and more coherently. If they are selling some NFTs, making it very clear that they are letting this site act with their NFTs.
        On extensible services
            - Example case: multiple account handlers
                - Let's look at the case of a single service that we might want to make extensible. Let's use the case of an account, because accounts are a very hot topic today.
                - The answer that Snaps will enable it is already a bit unsatisfactory to [[[[EIP]] 4337: [[account abstraction (AA)]] via Entry Point Contract]] advocates, and it should be especially unsatisfactory if we don't have an acceptable way of extending our account manager paradigm.
                - In the original Snaps beta, there was something called a [[resource controller]], which allowed a Snap to register itself as a handler for an account by a given address.
                - If a snap registered an account with an address, and then the user used that address to connect to a site, then all of that site's requests involving that account would be routed to the Snap instead of the usual [[Keyring Controller]].
                - In this sense, the resource controller was basically just a router that allowed registration of handlers for a set of methods that we had already established as regularly bundled as a set of permissions that we call account connection.
                - When you connect an account today with MetaMask, it's not just the ability to read the balance, it's the ability to suggest signatures and transactions with that account. And that's good. It's good that we have a coherent, unified, consistent, standardized interface that's used to describe an account. That interface, you could call an [[object capability (ocap)]] and you could say, we are trying to let additional Snaps register their own objects for providing account services to sites.
                - Now, there's a lot of ways you could do that. The original Snaps Beta had them [register by address, and then the request would have to specify the address](https://github.com/MetaMask/metamask-snaps-beta/blob/develop/app/scripts/controllers/accounts.js#L137) just like every call to send transaction does. But there was a hack in there, which is that addresses could have multiple handlers for them. It is possible to have an address on two different hardware wallets, for example. It's possible to have two different keys that sign on a multisig and so have two different ways you could approach proposing to a DAO or to a multisig. This is a problem with letting the services that are provided be routed by a self-declared ID string.
                - That kind of ID string based routing and permission assignment is basically the [[confused deputy]]. The classic [confused deputy attack scenario](((AugK9SQeJ))) is one where a printer driver service has access to read a given input file, and it also has a configuration file that it can write to that we don't want to let the user write to, but because it will write to a log file that the user specifies, the user can specify the config file as the output file and trick the service into doing things that shouldn't be allowed because strings are used as identifiers for objects instead of immutable object references. This is [a part of the definition of object capability security](((h3gQue_UR))) that I think is often neglected.
                - When we're building a [[JSON-RPC API]]-based permission system, one of the ways that we can inevitably and consistently hit a wall is whenever we're trying to extend something in a set where some of them could be representing themselves as so similar that an identifying string would mark them as identical. Ideally, you could have any number of hardware wallets that provide any number of accounts, and those accounts could overlap with each other.
                - If I have a [[Ledger]] and also a [[Grid Plus]] that are holding the same account key, then you can ask what's the ideal experience. I think in that case, the ideal experience is you connect that account, and then at the time that there is a transaction or signature, you're given the choice of which one you want to use.
                - This may be a use case specific way of doing the routing, and I think it shows that some of this stuff will be a matter of design decisions. I don't think that that's a case where we could just have a standardized resource controller that solves the problem. If we just said, "look, some things are resources, they are services that can be extended, it includes assets, networks, tokens, subscriptions, voting rights, all sorts of other things, contract accounts, or contracts that you own, ownable contracts", if we said "those things are all treated equivalently, and we let them register freely, and then we let the user select any number of them", then it's possible for the site to see multiple instances of an object that they cannot distinguish as different in any way.
                - That's important, because if you're using a JSON RPC message, and you're the only way that you distinguish which account you're trying to send from (or in the network case, which network you're trying to read from, or in the case of an asset, which token you're trying to get an allowance from) you introduce a possibility for some kind of mistake.
                - If you had tokens registered, for example, the naïvest thing you could do would just be to keep a token address, and then have not anticipated chain IDs. That's basically what happened before [[[[EIP]] 155]]: transactions were replayable across chains, because there's nothing that made them specific to a single Ethereum chain. 
                - So now we have EIP-155, but you could imagine that there are eventually chains that maybe don't fit in that mold, or maybe there are two allowances for a token from two different entities. So if we had a service, let's say we make a snap, and we've got a custom asset controller, and it lets you add assets to the asset list. Some of these are tokens, some of these are NFTs, people start using it creatively. One creative use might be to show token [[ERC-20 Token Allowance]]s that are inbound in your asset list, so that you can spend allowances that you have as if they were token balances that you have. In that case, if you've got two different allowances of the same token from two different sources, those are potentially two different budgets with very distinct purposes, and you don't want to mix them up, but if you were connecting to a site for portfolio management and you just wanted to see your total available liquidity, you might connect both, and then if one of them tried to propose a swap, the site would not have any coherent way of distinguishing those two.
                - Example
                    - request
                        - ```javascript
provider.request({
  method: 'requestPermissions',
  params: [
      'eth_accounts': {
        multiple: true,
      },
    }
  ]
});```
                    - possible response
                        - ```javascript
{
  eth_accounts: [
    { address: '0xdeadbeef' },
    { address: '0xdeadbeef' }
  ]
}```
                - One way to create an API that distinguishes the two is if we start adding our arbitrary UUID, and even then, we're now kind of trusting it to, well, I guess you can make it an unforgeable UUID, you just make it a really long [[swiss number]], and you say, well, we believe that they'll never be able to fake that, they'll never be able to get at the memory of our internal ID table to be able to forge a reference to another allowance, something like that.
                - You then have the additional design decision of whether to allow those numbers to be transferrable across domains as a form of [[delegation]] (as in [[Capnode]]), or uniquely assigned to each domain like in [[Fuchsia OS]] (in which case delegation can only occur via a system call).
                    - I would say it's easy and safer to start with the Fuchsia model.
                - But that's an example where not having unforgeable object references, again, could bite you even for something where it seems on the surface like surely the naive take at creating identifiers should be good enough. So I guess one conclusion here is that if you want to make a capability security model on top of an accessible capability-based permission system on top of an RPC-type API, you should probably include unforgeable identifiers associated with each one of those items, and you might want to use those identifiers to refer to those objects instead of the usual identifiers, which we've learned are actually reused over and over again.
                - Example
                    - request
                        - ```javascript
provider.request({
  method: 'requestPermissions',
  params: [
      'eth_accounts': {
        multiple: true,
      },
    }
  ]
});```
                    - possible response
                        - ```javascript
{
  eth_accounts: [
    { address: '0xdeadbeef', id: 'SOUNIQUE1345134' },
    { address: '0xdeadbeef', id: 'IMPOSS1BLYRAR3E' }
  ]
}```
                - Ethereum addresses are reused across chains as are token addresses, and like we just saw, even chain ID-specific addresses can create ambiguity when those assets can be associated with multiple accounts. So let's say then we have something like a [[resource controller]], it is basically a method router. It's got a set of methods that it will route for a given permission. So if you have the `eth_accounts` permission, then for requests to that given object (this account) we route to the given handler.
                - Part of the problem I guess with doing it today is that since the norm today is to have a single network and usually a single primary account, there's basically not really much tangible ambiguity when referring to the current account and the current network by a single address (ignoring the race condition on network switch). So you can probably hack a support for this kind of legacy API by just letting there still be a so-called "selected account" and a so-called "selected network", and for the naive API calls that only refer to address, that you assume these values.
                - There is a question about de-duplicating them if there are multiple entries for that object, given that it's ideally a permissionlessly extensible system.
                - The original Snaps beta, [we simply threw an error if multiple handlers were registered for the same resource](https://github.com/MetaMask/metamask-snaps-beta/blob/develop/app/scripts/controllers/accounts.js#L140). That's not a perfect solution.
                - An ideal solution is one simple solution you could say, "if there are multiple, just show them to the user and give them a chance to choose", which is pretty good.
                - So then we ask, what do we want the eventual handshake to be like? The eventual handshake, if we want it to not suffer from those same ambiguities, should probably associate some kind of [[swiss number]] with each object that it returns. So a website might ask for some networks and maybe some accounts and maybe some assets. They could ask for all three of those things.
                - An aside on permission hierarchy, and permissions that can imply other permissions.
                    - I think in practice, it will be great if the user could just select as specific a single thing as possible for the site. So if the site is really asking to do something on a polygon account, it should be able to say, please select a polygon account. The user should be prompted with their polygon accounts. They should be able to connect it, then it should imply access to the polygon network.
                    - The ability to read from a chain could be associated with the account. And when you get more specific, like you want an asset, it should imply the parent object of the account and the parent objects of the network. 
                    - So I think there is a little bit of a hierarchy to those objects. And so you can treat the more specific objects as somewhat the parent objects of the less specific objects.
                - So let's say we've got a [[resource controller]]. You can register things on it. Snaps don't have control over or access to their universal identifiers. They should never see them or ever know what they are. Should probably be something like per call to register handler, they receive a callback, which is a handler that will only be called for that item that is declared as being handled. 
                - Example [[[[MetaMask]] Snaps]] APIs
                    - Custom account example
                        - ```javascript
// The snap has its own `privateKeys` array.
privateKeys.forEach((privKey) => {
  const address = addressForKey(privKey);

  // Imagine a global `snaps` API providing this method:
  snaps.registerAccountHandler(address, ({ method, params }) => {
    if (method === `eth_sendTransaction`) {
      return signTransaction(params, privKey);
    }
  })
})```
                        - If you're an account manager and you want to say, "I handle accounts: I'm a hardware wallet, I've got two accounts on it, then I could call `registerAccountHandler` twice where with each time I pass in the parameters related to that account. And fortunately now I have that account and all of its information within the [[lexical scope]] of the callback to the account handler. And so within the snap, it's very easy to coherently retain the context of the thing that's being handled. And I think that that's pretty good at resisting [[confused deputy]] problems (the lexical scope makes it un-ergonomic to sign with the wrong key in the above example)
                    - Custom asset example
                        - Let's say there's a custom asset snap. We have a method called `registerHandlerForCustomAsset` for each call to it, you get to register an asset.
                        - ```javascript
inboundAllowances.forEach((allowance) => {

  const { fromAddress, toAddress, chainId, tokenId, amount } = allowance;

  // Imagine a global `snaps` API providing this method:
  snaps.registerHandlerForCustomAsset({
    toAddress,
    tokenId,
    amount,
    label: `Allowance from ${fromAddress}`
  }, ({ renderCustomView }) => {
    // Here we could maybe render the custom view for this asset as needed.
  })
})```
                        - Aside: Should we make it possible for the user to create a new account from within the MetaMask interface?
                            - We could probably say for MVP: Don't bother handling the creation of these objects. Just let the snap say which ones it handles. Ideally have some way for the snap to link the user to its main interface or I guess postpone until we have embedded UI. And then I guess within that embedded UI, we should enable the user to create new objects. So if this is a Gnosis safe snap, the user should be able to deploy new safes, configure their access policies, remove signers, et cetera, all from within the snap UI. That'd be great. That'd be ideal. That'd be really excellent. So we get to a point where we have some number of different things. They each have an API where the snap can register itself as a handler for that type of object.
                - I think there is an opportunity for them getting a layer more abstract, and I think we can skip that for V1, but I'll briefly touch on it: What does it mean for an app to register a new kind of service that a snap might handle, but that another snap might also handle? #[[service tag based discovery]]
                    - So for example, a streaming payments app might want to provide a permission to get the user's current money streams. And these money streams have slightly different parameters than just a normal asset. Now usually a site can only be contacted by, I guess, one of two major methods previously. Either the site asks to talk to that snap directly, or the site asks for access to one of our established and certified main services (networks, accounts, assets; I think are the three big ones that we know we want to push as early as possible) but we could imagine a snap wanting to declare a new service, basically a new entry in our permission system that it wants to provide handlers for.
                    - In this case we might want to have a more generic service handling registration method where a snap can say, "I declare that I implement this interface, here's how I describe that interface to a user, possibly here are translations for how you should describe that interface to users, maybe it even includes an icon to make the permission as readable as possible.
                    - I think that when an [[secure extensible permission system]] would ever show a third party permission to a user that it would need to have a [[security frame]] that makes it clear that this permission is coming from that source. That's kind of just to give context in case the snap uses the permission's label to [lie](((bhSJqEpvG))).
                        - But of course the snap can never, no matter what it calls its permissions, it can't give the user more; it can't give a site more authority than it has. So if it was malicious, it would just do something malicious with what it could do, per [[Safety for Extensible Permissions Systems]].
                        - So really the biggest concern is that it says, oh, you know, it just lies like, like it says like accept $500 of payment, you know, and you're like, oh yes, I want to accept $500 of payment. Well, that's a lie, it just made a claim about an outcome. And so we need to add attribution for the labels of any, you know, third party permissions that we're adding to our handshake.
                    - But you could imagine "view my money streams" as a permission that a snap might invent, register handlers for, and that a future snap might then also register itself as a handler for.
                    - There's a whole can of worms: Can we ensure that they're implementing the same interface?
                        - I think we can leave that to later philosophical debates. I don't think there's a perfect answer. I think at the end of the day, service providers try to promise to provide a consistent and standards compliant interface.
                        - And you know, I think that you can follow the general API wisdom of "you want to be a strict about what you output, and loose about what you accept". It's probably relevant, but you know I think it's going to be up to the snap developers to adhere to a interface philosophy if they're implementing an interface that somebody else established.
                        - You know they're kind of hoping to be standards compliant you know we see this all over the wallet space today people are like "oh `eth_sign` and `personal_sign`: should they be the same thing or should they be different things?" and you know in [[EIP 712: signTypedData]]: should the base one be updated to be the later version of the proposal or should it be kept as an early version for the sake of [[non breaking API]]?
                        - These are all things where individual clients might vary for reasons of opinion and I don't think that you can just solve those problems with a configuration file although you can probably help maybe feature detection on the client side if we make it at least easy for service providers to be explicit about the interface they're providing.
        Returning to the main topic: How we allow a website to request access to some number of interfaces
            - I think that the current [[[[EIP]] 2255: Wallet Permissions System]] model is basically nearly sufficient, we probably need to add a UUID to each item and we probably should try to enforce that the UUID is used to refer to the objects within those for future versions of the API (although for purposes of backwards compatibility, a version that uses current methods of identification is probably necessary) so a website says I want `eth_accounts` and the user can pick any number of accounts they can come from any number of handlers we return a bunch of objects they may have redundant addresses but they might have unique UUIDs. How does a site represent those if they're redundant? Maybe we do a deduplication so if they're redundant addresses we then ask the user at prompt time to choose.
            - Is that a universal solution? Probably not. Something like a network connection you want to be able to make API reads, you don't want to prompt the user on every API read, and the handlers are less likely to be equivalent in the eyes of the application.
            - ```javascript
provider.request({
    method: 'usePermission',
    params: {
      id: SWISS_NUMER_METHOD_ID,
      params: {
        method: 'eth_sendTransaction',
        params: TX_PARAMS
      },
   }
});
```
            - If you ask for some networks, that gives you some identifiers that allow you to make call calls to those different providers probably by UUID. If you just do by chain ID, you can run into problems if you have multiple providers if the user has multiple providers for the same network and if for some reason they select them and yeah we could put the burden of the interface on forcing the user to only select one thing of a given type but I don't know I think that could be short-sighted like in the case of the allowances from different you know issuers there is actual utility to allowing those to be multiples and in the case of maybe having a more peer-to-peer network for more I don't know censorship prone reads and then maybe having a more centralized provider for more data intensive reads it could actually make sense to have multiple providers for the same network so I'm almost inclined to say for each service that's requested one simple solution is just let the user select as many of that service as we want networks accounts eventually possibly assets although for MDP that's beyond our scope you know we don't do that today we can probably get away without doing the assets one at all although eventually it could be nice and facets prompts could possibly be even extended to include allowance signatures I don't know maybe that's getting too far out there let's not go down that road just yet that's a whole nother whole leather wormhole. Thanks for reading, hopefully this discussion can help refine future proposals and discussions.
- Addendums
    - This may be an opportunity to do other things at the same time, since it would be adding new features.
        - We could use this opportunity shift away from the injected API altogether:
            - a JSON-RPC API
            - transport depends on platform
                - postMessage on chrome?
                    - [[externally_connectable wildcard]]
                        - requires contentscript permission?! Nope!!! Yay!!!
                        - benefits
                            - provider injection degrades perf or every site
                            - not needing the extreme permissions
                - [[Firefox]] requires injection still
                    - [[Ian Wallis]] is pushing [[externally_connectable wildcard]] for Firefox.
