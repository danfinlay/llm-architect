- https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-27.md
- ```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "caip_request",
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
