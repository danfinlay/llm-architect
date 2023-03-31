- Problem statement
    - Smart contracts that may want to support [[externally owned account (EOA)]] signatures as well as [[contract account]] signatures need a generic way to accept signatures in functions.
    - When validating an EOA signature, the signer address can be naïvely derived from the signature itself.
    - When a signature might actually need to be validated by a contract using [[[[EIP]] 1271: Standard Signature Validation Method for Contracts]], the contract also needs indication that the signature should be validated by a specific contract.
    - We want to reduce code duplication, but preserve performance (of both calldata and gas), so it seems like it's worth choosing a good way of doing this.
- Possible approaches
    - Always include an optional `address` parameter along with the signature and data payload.
        - pros
            - Maximally consistent
            - Probably computationally cheap.
        - cons
            - Means you have a full address of calldata even when it's not needed.
    - Include a boolean that indicates whether this is an EOA or contract signature, and if indicating a contract, interpret some portion of the data payload (already variable length) as the address to verify.
        - pros
            - calldata efficient
        - cons
        - examples
            - In [[[[[[EIP]] 1271: Standard Signature Validation Method for Contracts]] variant of [[Delegatable Eth]]]] you can [see the code here](https://github.com/delegatable/delegatable-sol/pull/34/files#diff-28407ecc015f2329e36dcb87f0c3b7ea6d1336791444f9a83909d48f8dd5c5a3R36).
                - ```solidity
function flexibleRecover(
        bytes32 _hash,
        bytes calldata _signature,
        bool isContractAccount
    ) internal view returns (address);```
