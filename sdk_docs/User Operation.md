- An [[account abstraction (AA)]] version of a transaction for [[Ethereum]] in [[[[EIP]] 4337: [[account abstraction (AA)]] via Entry Point Contract]]
- Type
    - | Field | Type | Description
| - | - | - |
| `sender` | `Address` | The wallet making the operation |
| `nonce` | `uint256` | Anti-replay parameter; also used as the salt for first-time wallet creation |
| `initCode` | `bytes` | The initCode of the wallet (only needed if the wallet is not yet on-chain and needs to be created) |
| `callData` | `bytes` | The data to pass to the `sender` during the main execution call |
| `callGas` | `uint256` | The amount of gas to allocate the main execution call |
| `verificationGas` | `uint256` | The amount of gas to allocate for the verification step |
| `preVerificationGas` | `uint256` | The amount of gas to pay for to compensate the bundler for for pre-verification execution and calldata |
| `maxFeePerGas` | `uint256` | Maximum fee per gas (similar to EIP 1559 `max_fee_per_gas`) |
| `maxPriorityFeePerGas` | `uint256` | Maximum priority fee per gas (similar to EIP 1559 `max_priority_fee_per_gas`) |
| `paymaster` | `address` | Address sponsoring the transaction (or zero for regular self-sponsored transactions) |
| `paymasterData` | `bytes` | Extra data to send to the paymaster |
| `signature` | `bytes` | Data passed into the wallet along with the nonce during the verification step |

    - 
- Notes
    - Has gas allocations for both
        - the validation itself
            - [[[[questions]] for [[Vitalik Buterin]]]]: How can you enforce payment of validation code if you haven't even validated the account holder?
        - the intended operation
- Ways that I prefer [[Delegatable Eth]]'s [[invocation]] format.
    - Has opinionated replay-protection. Means user operations will be prone to the same kind of transaction-clogging that we see today. I would like to see [[multi-nonce]], or just a framework that is less opinionated about the structure of the user operations.
    - Ideally users could authorize multiple operations with a single signature
