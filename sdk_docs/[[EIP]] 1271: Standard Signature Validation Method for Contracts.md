- https://eips.ethereum.org/EIPS/eip-1271
- Authors: [Francisco Giordano](https://github.com/frangio), [[Matt Condon]], [[Philippe Castonguay]], [Amir Bandeali](https://github.com/abandeali1), [Jorge Izquierdo](https://github.com/izqui), [Bertrand Masius](https://github.com/catageek)
- A type of [[[[contract account]] challenge signature]]
- Allows the smart contract to authenticate arbitrary authorization data, implementing the authorization data for all possible signatures within the contract account.
- ```javascript
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided data
   * @param _data Arbitrary length data signed on the behalf of address(this)
   * @param _signature Signature byte array associated with _data
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */ 
  function isValidSignature(
    bytes32 _hash, 
    bytes memory _signature)
    public
    view 
    returns (bytes4 magicValue);
}
```
- Supported by
    - [[[[Gnosis]] SAFE]]
    - [[Argent]]
