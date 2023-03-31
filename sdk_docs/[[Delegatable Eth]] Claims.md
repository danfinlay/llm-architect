- A concept for an [[Ethereum]] rooted delegatable claims network.
- A version is currently deployed [at this address](https://etherscan.io/address/0xb261ef22f49c7547daf01a86813d20368b751b6d): `0xb261ef22f49c7547daf01a86813d20368b751b6d`
- Currently on the `generalize` [branch on GitHub](https://github.com/danfinlay/MobyMask/tree/generalize) of [[MobyMask]]
- Goals
    - Allow highly scalable off-chain attestations in the style of [[verified credentials/verifiable claims (VCs)]].
    - Allow these claims to be efficiently redeemed by an [[evm]] blockchain contract, similar to [[Delegatable Eth]] and [[MobyMask]].
        - Blockchain use is optional, but brings benefits.
        - Enables censorship resistant revocation
        - Allows pay once and forget it hosting of this information.
- Examples
    - Twitter account verification gating a smart contract
        - Imagine there is a global "Delegatable Eth Claims Registry", which enables delegated off-chain claims. I'll come back to how it contributes later.
            - For the purpose of this example, [this registry will allow "root delegations" in a chain](https://github.com/delegatable/delegatable-sol/issues/30).
        - Alice wants to have a special contract that people can only register for if they verify their twitter accounts.
        - Alice makes her contract's registration method check the claims registry to see if the applicant is able to prove that the contract owner would trust their `twitterProof`:
            - ```solidity
function registerUser(newUser address, twitterProof TwitterProof) {
  const isTwitterVerified = claimsRegistry.checkTwitterVerification(this.owner(), twitterProof);
} ```
        - The `TwitterProof` type is actually the same as a delegatable [SignedInvocation](https://github.com/delegatable/delegatable-sol/blob/main/scripts/types.js#L29), rooted in Alice's own claim. Effectively, it says "Either Alice says this person is twitter verified, or someone she trusts does, recursively."
        - Alice doesn't want to manually verify each person's twitter status, but she is aware of two services that do twitter verification run by Bob, and signs a Delegation to enable Bob's claims to "chain" from hers. Alice publishes her own delegation message to those two services in a public place where her users can get them. She can even limit how many claims Bob's registry can make per day on her behalf:
            - ```javascript
const aliceTrustsBobTwitterClaims = {
  contract: claimsRegistry,
  recipient: Bob
  signedBy: Alice,
  caveats: {
    {
      claimType: 'isTwitterUser'
    },
    {
      callLimit: '1000 per day'
    }
  }
}```
        - Dave wants to register for the site.
        - Dave is able to register by getting one of those services to sign a "delegation to claim self is this specific twitter user" to him. In pseudo-code, it looks something like:
            - ```javascript
const bobClaimsDaveIsTwitterUser = {
  contract: claimsRegistry,
  recipient: Dave
  signedBy: Bob,
  caveats: {
    {
      claimType: 'isTwitterUser'
    },
    {
      handle: '@DaveSuperCoolGuy',
    }
  }
}```
        - Dave is now able to use these two claims in combination to form an `Invocation` that in total is equivalent to Alice claiming that Dave has the twitter handle that Bob says he has. That struct looks roughly like this:
            - ```javascript
signedInvocation = {
  sig: davesSig,
  invocation: { 
    to: claimsRegistry,
    from: alice,
    data: contract.makeClaim.populateTransaction(daveIsTwitterUserClaim).data,
    authority: [
        aliceTrustsBobTwitterClaims,
        bobClaimsDaveIsTwitterUser
    ]
  }
}```
        - This invocation doesn't __need__ to be submitted to even actually record this claim on-chain, it can be passed as a proof to the `register()` function by Dave when he calls it, and the contract can either then trigger the registry update or just verify that this claim __would result in__ a registry update.
        - Either way, Dave is now able to sign up.
        - At any point, Alice could say she doesn't trust Bob anymore, or Bob could say that his old claim is no longer legitimate, which would be on-chain claims, and would break any new evaluation of this chain of authority.
        - In practice, most contracts will probably let people keep their existing memberships, but if you were willing to pay the gas, you could make people continuously prove they hold valid memberships on every claim, and in fact this is effectively what you do when you grant someone an allowance: You dock their allowance and verify its validity on each use.
- Differences from [[MobyMask]]
    - Instead of having a registry per claim type, we would have an extra mapping dimension for claim type.
        - Former [[MobyMask]] registry
            - ```solidity
  mapping (string => bool) public isPhisher;
  event PhisherStatusUpdated(string indexed entity, bool isPhisher);
  function claimIfPhisher (string calldata identifier, bool isAccused) onlyOwner public {
    isPhisher[identifier] = isAccused;
    emit PhisherStatusUpdated(identifier, isAccused);
  }```
        - Generalized registry
            - ```solidity
pragma solidity ^0.8.13;
//SPDX-License-Identifier: MIT

import "./Delegatable.sol";
import "./caveat-enforcers/RevokableOwnableDelegatable.sol";

contract ClaimRegistry is RevokableOwnableDelegatable {

  constructor(string memory name) RevokableOwnableDelegatable(name) {}

  mapping (string => mapping (bytes32 => bool)) public boolClaims;
  function makeBooleanClaim (string calldata identifier, bytes32 claimType, bool isClaimed) onlyOwner public {
    boolClaims[identifier][claimType] = isClaimed;
  }

  mapping (string => mapping (bytes32 => string)) public claims;
  function makeClaim (string calldata identifier, bytes32 claimType, string calldata claim) onlyOwner public {
    claims[identifier][claimType] = claim;
  }

}```
- Differences from the base [[Delegatable Eth]] framework
    - Anyone could publish a registry/claim redeeming contract.
        - Would be similar architecturally to [[MobyMask]], except it would have a dimension for the `claimType`, similar to the classic [[uPort]] claims registry, so that any type of claim could be made to these contracts.
    - The [[EIP 712: signTypedData]] `domain` field would be set to a universal set of values to represent "claims".
        - Example values
            - chainId: 1
            - verifyingContract: `encodeAsHex("claims")`?
        - Any contract that wants to be able to redeem claims would validate signatures assuming this domain field.
    - [Root delegations for these contracts might work in a chain](https://github.com/danfinlay/delegatable-eth/issues/9)
        - This is possibly a contentious change to make, and would require a re-deploy.
        - This means no individual root would be assumed to be correct, but any chain of delegations between different accounts could be chained together as the `authority: Delegation[]` associated with an `Invocation`.
        - We would need a set of [[[[Delegatable Eth]] Attenuator]]s that are specifically good for specifying what types of claims the other person is being trusted to make.
    - A network for selective disclosure of claims and delegations
        - Each delegation or invocation could be shared selectively to enable others to grow their own views of the network.
        - Groups of delegations could be shared as a group by having them encrypted with a shared key, so we could define the appropriate own sharing granularity. [[principle of appropriate boundaries]]
- Possible uses
    - Allow a user to bring-their-own oracle. A function may say "bring a claim that X would trust, and you can trigger resolution"
    - Distributing claimed names for various entities.
    - Networks for gossiping bad actors
        - phishers
        - scammers
        - [seedy parties](https://twitter.com/maediocre/status/1534720853732012032?s=20&t=2dZrv5W8a8SWlAqjthNOMQ)
    - Acclaiming people
        - Skills
        - Education
        - Quality of service
        - Replace review-based sharing economy sites
            - [[Yelp]]
            - [[Airbnb]]
            - [[Doordash]]
