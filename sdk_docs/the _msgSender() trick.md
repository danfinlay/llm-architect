- A strategy for supporting alternative authorization patterns on Ethereum.
- Problem
    - `msg.sender` either means the sender of an internal `.call` or the person who initiated a transaction, but cannot mean someone else, like someone whose signature has been recovered by a custom scheme.
- Solution
    - Never use `msg.sender` directly, and instead use an internal `_msgSender()` method that will first check if an address-worth of bytes are appended to the end of the method's calldata.
    - If processing an internal message from itself, and an address is appended to the current message, treat it as the authorized party.
    - Now other internal methods can authorize users for any authority-bearing interaction.
- Enables
    - [[MetaTransactions]] on [[Ethereum]] even though the transaction object in the VM does not keep track of who originated the transaction apart from who paid for the gas.
    - [[Delegatable Eth]]
- Example
    - ```solidity
    /*
     * @notice Overrides the msgSender to enable delegation message signing.
     * @returns address - The account whose authority is being acted on.
     */
    function _msgSender()
        internal
        view
        virtual
        override(DelegatableCore)
        returns (address sender)
    {
        if (msg.sender == address(this)) {
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
- Used extensively in the [The MetaMask MetaTransaction Hackathon](https://medium.com/metamask/our-metatransaction-hackathon-winner-a620551ccb9b?source=collection_home---4------2-----------------------). [[MetaMask MetaTx Hackathon]]
    - [[Patrick McCorry]]
    - [[Ronan "wighawag" Sandford]]
- Included in the [[OpenZeppelin]] Context contracts, so all their normal contracts work with custom msgsender subclasses
    - 
