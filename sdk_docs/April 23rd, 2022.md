- [[breaking changes]]
    - https://twitter.com/protopop/status/1517702095482331137?s
- [[Delegatable Eth]]
    - hype
        - It's nearly working. I'm getting excited.
        - I've tried to convince more seasoned solidity devs to take on this task for years, I have not succeeded. Solidity devs have lots of options, and this was a very complex project, with essentially no personal upside. It is a pure public good, which can serve to pave a way towards more secure and usable Ethereum applications going forward.
        - It's surely not perfect yet. There are probably interface improvements that can be proposed, and definitely a lot of optimization, but this is a proof of concept of what I believe can enable a rich future for evm app interaction.
        - I've made an abstract solidity class called Delegatable. Any contract can inherit from it, and by making one change (replace msg.sender with _msgSender()), it now enables that contract to support batching and metatransactions and delegation chains for all of its methods, with no extra work.
        - I've promoted the goal of generalized metatransactions for years, and I still want to push for it at the protocol layer via EIP-5003 and 3074, but here is a way where every solidity dev can add MetaTx support to their app, AND delegation chains.
        - Delegation chains for every method will probably be my most lasting legacy on the EVM, I truly believe people will look back at the last four years and laugh at people writing custom allowance functions for each type of asset or value they hold, and for custom-modeled vote delegation methods for DAOs. I've generalized all of that away.
        - Contracts that inherit from Delegatable only need to write business logic. They don't worry about how someone might grant permission to another person or contract to act on their behalf.
            - TODO: Ensure the delegation can be granted to a contract.
        - Literally any authority a user has over a contract can be extended to others at runtime, with arbitrary evm-encoded "caveats" which restrict those abilities, and then the holders of those delegations can use or again delegate those abilities.
        - A lot of DAO culture today is about having 10k people voting on every decision. Delegation is about empowering more individuals to carve their own paths. These are both powerful tools, but we've only been playing with the slow/tedious mode, and with delegation we can start exploring the fast/collaborative mode.
    - Debugging
        - Invocation encoding bad 1
            - js:
                - encoded: `c816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1a7abacda2b84b2157720f4ac0daa4682b29c41797b41cf7aed54f2870bf34cf78c1c3d9a1b77529ca19bcdb17ad25da838bedd76f43706b32482a23168aca3e17eb3abad0b9803447fd3db5963d2a2c049f01aa7c662ac9ee601b5cb23dca5fe7`
                - invocation typehash
                    - 0xc816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1a
                - transaction
                    - encoded
                        - 92f077592979a73af30dd3cd54fc448ffcbba3030598fc42e1228d74dc5a2995000000000000000000000000627b9a657eac8c3463ad17009a424dfe3fdbd0b1000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000002386f26fc10000bcbfae11abb8b7e5c196caa7c434171da20b8c4cac29599307cdac1d76901c64
                    - typehash
                        - 92f077592979a73af30dd3cd54fc448ffcbba3030598fc42e1228d74dc5a2995
                    - to
                        - 0x627b9a657eac8c3463ad17009a424dfe3fdbd0b1
                    - from
                    - gasLimit
                    - data
                - replay protection encoded
                - authority encoded
            - sol
                - encoded: `0xc816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1ad5d076da423bb83dc4067e2bf8cae90b82bbb39360b323e87908336877844f1d59a4366e8270dd9ed6fe9a13194e352f4616bddc471bccf905ff7478ad0303bb0090011a38fe2c4353794d890fdfbe8e6b8b18a88cf6061b8ead9296f9439f48`
                - invocation typehash
                    - 0xc816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1a
                - transaction
                    - encoded
                        - 0x92f077592979a73af30dd3cd54fc448ffcbba3030598fc42e1228d74dc5a2995000000000000000000000000627b9a657eac8c3463ad17009a424dfe3fdbd0b1000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000064eb68757f0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001c4120746f74616c6c792044454c45474154454420707572706f7365210000000000000000000000000000000000000000000000000000000000000000
                    - typehash
                        - 92f077592979a73af30dd3cd54fc448ffcbba3030598fc42e1228d74dc5a2995
                    - to
                        - 0x627b9a657eac8c3463ad17009a424dfe3fdbd0b1
                    - from
                    - gasLimit
                    - data
                - replay protection encoded
                - authority encoded
            - Lesson: [[EIP 712: signTypedData]] requires that `bytes` fields be encoded with [[keccak256]]
        - Invocation encoding problem 2
            - The third part is not matching, the `authority` field.
            - the Delegation field is probably the wrong one
                - js
                    - 409f5114779a253e700d775d7845e6efc1e83685ac59868d2df3d4de51c7d62100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
                - sol
                    - 409f5114779a253e700d775d7845e6efc1e83685ac59868d2df3d4de51c7d62100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
            - yet.. it matches..
            - Encoded authority
                - sol
                    - cd9c92e4d287a6fd334100dd203ca7efd78f455406865802aba5aa6d883c9e349a581b1dfe8aa7a8b8e4d6f7ef39d40394c7b6220b7f8eead1800c66116efa4404a695b9404342175e781715b9748527bb708fcb4f4d2b3a05db3b9adcb82c6c
                - js encoded "signedDelegation"
                    - 3c36a06e1d288b0f94f565588317a46ad11bc3c96992109f9a2365a2737259a79a581b1dfe8aa7a8b8e4d6f7ef39d40394c7b6220b7f8eead1800c66116efa4404a695b9404342175e781715b9748527bb708fcb4f4d2b3a05db3b9adcb82c6c
            - So it's the typehash that's wrong!
                - js
                    - SignedDelegation: {
                        - delegation: 'Delegation',
                        - signature: 'bytes',
                    - },
                - sol
                    -   "SignedDelegation(Delegation delegation, bytes signature)"
            - Ahh, it didn't have its child types included!
        - Invocation encoding problem 3
            - sol encoded
                - c816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1afa563934c85a5196b8c6218130b7e3f77d79d3c2c1a2c22a0d19f3c31f711297c1c3d9a1b77529ca19bcdb17ad25da838bedd76f43706b32482a23168aca3e17b6abc1108a0d2c8237fca8e25641e77d91ec0db23c099b6cafb7382b4971838f
            - js encoded
                - c816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1afa563934c85a5196b8c6218130b7e3f77d79d3c2c1a2c22a0d19f3c31f711297c1c3d9a1b77529ca19bcdb17ad25da838bedd76f43706b32482a23168aca3e17b6abc1108a0d2c8237fca8e25641e77d91ec0db23c099b6cafb7382b4971838f
        - Invocation encoding problem
            - invocation signer recovered as `9f14aed75fec1b5880d45e39c9ea7cc80e04d9e1`, which is just wrong.
            - All definitely is defined in `getInvocationTypedDataHash`, which defines the hash that the signature is recovered against.
                - ```solidity
 function getInvocationTypedDataHash (Invocations calldata invocations) public returns (bytes32) {
    console.log("Invocations typehash:");
    console.logBytes32(INVOCATIONS_TYPEHASH);
    bytes32 digest = keccak256(abi.encodePacked(
      "\x19\x01",
      domainHash,
      keccak256(abi.encode(
        INVOCATIONS_TYPEHASH,
        getInvocationsPacketHash(invocations)
      ))
    ));
    console.log("Produces the typed data hash digest");
    console.logBytes32(digest);
    return digest;
  }

  function getInvocationsPacketHash(Invocations memory invocations) public returns (bytes32) {
    console.log("Invocations type hash:");
    console.logBytes32(INVOCATIONS_TYPEHASH);

    bytes memory encodedInvocations;
    for (uint i = 0; i < invocations.batch.length; i++) {
      Invocation memory invocation = invocations.batch[i];
      console.log("Invocation %s", i);
      console.log("Invocation type hash:");
      console.logBytes32(INVOCATION_TYPEHASH);
      console.log("Invocation packet hash:");
      console.logBytes32(getInvocationPacketHash(invocation));
      encodedInvocations = bytes.concat(
        encodedInvocations,
        getInvocationPacketHash(invocation)
      );
    }

    console.log("Encoded:");
    console.logBytes(encodedInvocations);
    bytes32 hashed = keccak256(encodedInvocations);
    console.log("Hashed:");
    console.logBytes32(hashed);
    return hashed;
  }

  function getInvocationPacketHash (Invocation memory invocation) public returns (bytes32) {
    console.log("Contract own address: %s", address(this));
    console.log("Invocation typehash");
    console.logBytes32(INVOCATION_TYPEHASH);
    console.log("Encoded transaction:");
    console.logBytes(abi.encode(
      TRANSACTION_TYPEHASH,
      invocation.transaction.to,
      invocation.transaction.from,
      invocation.transaction.gasLimit,
      keccak256(invocation.transaction.data)
    ));

    console.log("Encoded replay protection:");
    console.logBytes(abi.encode(
      REPLAY_PROTECTION_TYPEHASH,
      invocation.replayProtection.nonce,
      invocation.replayProtection.queue
    ));

    console.log("Encoded authority:");
    console.logBytes32(encodeAuthority(invocation.authority));

    bytes memory encodedInvocation = abi.encodePacked(
      INVOCATION_TYPEHASH,

      // Transaction
      keccak256(abi.encode(
        TRANSACTION_TYPEHASH,
        invocation.transaction.to,
        invocation.transaction.from,
        invocation.transaction.gasLimit,
        keccak256(invocation.transaction.data)
      )),

      // Replay Protection
      keccak256(abi.encode(
        REPLAY_PROTECTION_TYPEHASH,
        invocation.replayProtection.nonce,
        invocation.replayProtection.queue
      )),

      // Authority is itself a SignedDelegation[]
      encodeAuthority(invocation.authority)
    );
    console.log("Encoded invocation:");
    console.logBytes(encodedInvocation);
    bytes32 digest = keccak256(encodedInvocation);

    console.log("Invocation packet hash:");
    console.logBytes32(digest);
    return digest;
  }

  function encodeAuthority (SignedDelegation[] memory authority) public returns (bytes32) {
    bytes memory encoded;
    console.log("Encoding authority");
    for (uint i = 0; i < authority.length; i++) {

      console.log("SignedDelegation typehash:");
      console.logBytes32(SIGNED_DELEGATION_TYPEHASH);
      console.log("SignedDelegation.delegation packet hash:");
      console.logBytes32(getDelegationPacketHash(authority[i].delegation));
      console.log("SignedDelegation signature:");
      console.logBytes(authority[i].signature);

      SignedDelegation memory signedDelegation = authority[i];
      encoded = bytes.concat(
        encoded,
        abi.encode(
          SIGNED_DELEGATION_TYPEHASH,
          getDelegationPacketHash(authority[i].delegation),
          keccak256(authority[i].signature)
        )
      );
    }

    console.log("Encoded authority:");  
    console.logBytes(encoded);
    bytes32 hash = keccak256(encoded);
    return hash;
  }s```
            - We know that `getDelegationTypedDataHash` is working fine.
                - ```solidity
function getDelegationTypedDataHash(Delegation memory delegation) public returns (bytes32) {
    bytes32 packetHash = getDelegationPacketHash(delegation);
    console.log("Domain Hash");
    console.logBytes32(domainHash);
    console.log("Delegation packet hash:");
    console.logBytes32(packetHash);
    bytes32 digest = keccak256(abi.encodePacked(
      "\x19\x01",
      domainHash,
      packetHash
    ));
    console.log("Produces the typed data hash digest");
    console.logBytes32(digest);
    return digest;
  }```
            - Probably has to do with the array encoding.
                - We know that delegation uses the `encodeCaveats` function, which works fine
                    - ```solidity
  function encodeCaveats (Caveat[] memory caveats) public view returns (bytes32) {
    bytes memory encoded;
    for (uint i = 0; i < caveats.length; i++) {
      Caveat memory caveat = caveats[i];
      encoded = bytes.concat(
        encoded,
        abi.encode(
          CAVEAT_TYPEHASH,
          caveat.enforcer,
          caveat.terms
        )
      );
    }

    console.log("Encoded caveats:");
    console.logBytes(encoded);
    return keccak256(encoded);
  }```
                - This implies we're screwing up with our batch or `Invocation[]` encoding
                    - ```solidity
  function getBatchPacketHash (Invocation[] memory batch) public returns (bytes32) {
    bytes memory encodedInvocations;
    for (uint i = 0; i < batch.length; i++) {
      Invocation memory invocation = batch[i];
      console.log("Invocation %s", i);
      console.log("Invocation type hash:");
      console.logBytes32(INVOCATION_TYPEHASH);
      console.log("Invocation packet hash:");
      console.logBytes32(getInvocationPacketHash(invocation));
      encodedInvocations = bytes.concat(
        encodedInvocations,
        getInvocationPacketHash(invocation)
      );
    }

    console.log("Encoded:");
    console.logBytes(encodedInvocations);
    bytes32 hashed = keccak256(encodedInvocations);
    console.log("Hashed:");
    console.logBytes32(hashed);
    return hashed;
  }```
            - Oh, but of course the array of invocations includes encoding of basically every other type in the entire thing. This may not be a superficial encoding issue, this may be a deeper thing.
            - Maybe a quick skim over, something will jump out.
                - {{[[TODO]]}}  skim over the packet hash functions
                - {{[[TODO]]}}  skim over the typedef strings, eye for nested types.
        - Invocation debugging again [[April 24th, 2022]]
            - Encoded invocation (pre-hash)
                - js
                    - c816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1a892b1c4cb2a66e497b32e69d93c6dd0256ed327d84527b1c5cc64e797c7e1d04c1c3d9a1b77529ca19bcdb17ad25da838bedd76f43706b32482a23168aca3e1773540ebec5727272d70e85301af7460ed2f2614f2a5e33514735b9dc825107d3
                - sol
                    - c816d5fb1700fc5fc71601374832789b61f1c4b83cc0e99b51167d3669ae5b1a892b1c4cb2a66e497b32e69d93c6dd0256ed327d84527b1c5cc64e797c7e1d04c1c3d9a1b77529ca19bcdb17ad25da838bedd76f43706b32482a23168aca3e17b8ce875d2a24a0fbb19e9afad4d848cdfd5ef05fd98789b84069fe0774a6168b
            - The only mis-matching field is the final block, the `SignedDelegation[]`.
                - encoding
                    - js
                        - 3c36a06e1d288b0f94f565588317a46ad11bc3c96992109f9a2365a2737259a79a581b1dfe8aa7a8b8e4d6f7ef39d40394c7b6220b7f8eead1800c66116efa44c89a1b48ba9bb663dec771f03c9b9ad35efdb4d15338e847c32d64bc0cc0be71
                    - sol
                        - 3c36a06e1d288b0f94f565588317a46ad11bc3c96992109f9a2365a2737259a79a581b1dfe8aa7a8b8e4d6f7ef39d40394c7b6220b7f8eead1800c66116efa44c89a1b48ba9bb663dec771f03c9b9ad35efdb4d15338e847c32d64bc0cc0be71
                - These are the same, and so the only difference MUST be related to hashing.
                    - js (one hash)
                        - 73540EBE C5727272 D70E8530 1AF7460E D2F2614F 2A5E3351 4735B9DC 825107D3
                    - sol (TWO HASHES!!!!)
                        - B8CE875D 2A24A0FB B19E9AFA D4D848CD FD5EF05F D98789B8 4069FE07 74A6168B
                - So in a way, this solidity seems more correct!
                    - There are two passes of hashing:
                        - One for the Invocation[] for the Invocations `.batch` property.
                        - One for the individual `Invocation` in the array itself.
            - The solidity is hashing it, but the JS is not?
                - Is there a special condition for a one-member array??!
