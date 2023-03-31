- Relay published
    - Ethereum mainnet at [0x2B9F771012E83368168A3E6c92c7421b333cB671](https://etherscan.io/address/0x2B9F771012E83368168A3E6c92c7421b333cB671#code)
- [View working example code on github](https://github.com/delegatable/delegatable-sol/blob/main/test/DelegatableRelay.test.ts)
- Somehow realized a bit slow: Per the [[Generalized MetaTransaction]] pattern, each contract does not need to deploy its own signature verification code!
    - This means contracts that want to be delegatable can do so much cheaper (per deploy) with an increased cost per transaction.
        - Just add the special `_msgSender()` and use it everywhere for authority checks:
            - ```solidity

    function _msgSender()
        internal
        view
        virtual
        override(Context)
        returns (address sender)
    {
        if (msg.sender == 0x9a345087984D5372C0b51072e792C0A744fdc9c7) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                sender := and(
                    mload(add(array, index)),
                    0xffffffffffffffffffffffffffffffffffffffff
                )
            }
        } else {
            sender = msg.sender;
        }
        return sender;
    }```
- 
- Changes needed
    - Removing the `tx.to == address(this)` [check](https://github.com/delegatable/delegatable-sol/blob/d12016f532887fb3d7df1f51ff50977d5cb652f7/contracts/DelegatableCore.sol#L123-L126).
    - Have to make decision about the [[[[EIP 712: signTypedData]] domain hash]]. Do one of:
        - Use the domain hash of the relevant contract: compute the domain hash for the recipient from the relay
            - increased gas cost for every domain hash generation
            - higher complexity to make this change, skipping for mvp
        - Use the domain hash of the relay
            - Less obvious to the signing user what contract this signature pertains to
            - Cheaper gas cost
            - Much simpler change to make (basically just Removing the `tx.to == address(this)` [check](https://github.com/delegatable/delegatable-sol/blob/d12016f532887fb3d7df1f51ff50977d5cb652f7/contracts/DelegatableCore.sol#L123-L126).)
            - A naïve delegation will grant for ALL trusting contracts, making this a LOT like [[[[EIP]] 3074: Delegated Invocation Contracts]], along with its security fears: One signature could grant all your account's permissions for many contracts.
                - Should we add a target contract to the delegation object, or just try to normalize including a caveat for the recipient contract?
                - Could be seen as a feature? Easier to grant multiple permissions with one signature?
                    - Since these signatures are free to issue, the benefits of issuing fewer are small.
    - The JS libraries will need some changes
        - Can't assume that the verifying contract is always also `tx.to`.
