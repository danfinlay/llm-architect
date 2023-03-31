- A type of module added to [[[[Gnosis]] SAFE]] in version 1.3 that adds the ability to restrict the actions even of the n-of-m signers.
- [Explanation blog post](https://help.gnosis-safe.io/en/articles/5324092-what-is-a-transaction-guard)
    - > Transaction guards can make checks __before__ and __after__ a Safe transaction.
    - > The check __before __a transaction can e.g. programmatically check all of the parameters of the respective transaction prior to execution.
    - > This check __after__ a transaction is called at the very end of the transaction execution and can be used to e.g. perform checks on the final state of the Safe.
- Is basically a form of transaction [[attenuation]], and so this could be used as a standard attenuator contract interface!
- From [the changelog](https://github.com/gnosis/safe-contracts/blob/v1.3.0/CHANGELOG.md):
    - > It is possible to add a transaction guard, which can check all of the parameters that have been sent to execTransaction prior to execution. For this check the checkTransaction needs to be implemented by the guard. In case that checkTransaction reverts, execTransaction will also revert. Another check that can be implemented by the guard is checkAfterExecution.
 This check is called at the very end of the execution and allows to 
perform checks on the final state of the Safe. The parameters passed to 
that check are the safeTxHash and a success boolean.
- [The GitHub issue](https://github.com/gnosis/safe-contracts/issues/224)
- [The pull request](https://github.com/gnosis/safe-contracts/pull/276/files)
- [The Solidity Interface](https://github.com/gnosis/safe-contracts/blob/main/contracts/base/GuardManager.sol)
    - ```javascript
// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "../common/Enum.sol";
import "../common/SelfAuthorized.sol";
import "../interfaces/IERC165.sol";

interface Guard is IERC165 {
    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external;

    function checkAfterExecution(bytes32 txHash, bool success) external;
}

abstract contract BaseGuard is Guard {
    function supportsInterface(bytes4 interfaceId) external view virtual override returns (bool) {
        return
            interfaceId == type(Guard).interfaceId || // 0xe6d7a83a
            interfaceId == type(IERC165).interfaceId; // 0x01ffc9a7
    }
}

/// @title Fallback Manager - A contract that manages fallback calls made to this contract
/// @author Richard Meissner - <richard@gnosis.pm>
contract GuardManager is SelfAuthorized {
    event ChangedGuard(address guard);
    // keccak256("guard_manager.guard.address")
    bytes32 internal constant GUARD_STORAGE_SLOT = 0x4a204f620c8c5ccdca3fd54d003badd85ba500436a431f0cbda4f558c93c34c8;

    /// @dev Set a guard that checks transactions before execution
    /// @param guard The address of the guard to be used or the 0 address to disable the guard
    function setGuard(address guard) external authorized {
        if (guard != address(0)) {
            require(Guard(guard).supportsInterface(type(Guard).interfaceId), "GS300");
        }
        bytes32 slot = GUARD_STORAGE_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            sstore(slot, guard)
        }
        emit ChangedGuard(guard);
    }

    function getGuard() internal view returns (address guard) {
        bytes32 slot = GUARD_STORAGE_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            guard := sload(slot)
        }
    }
}```
