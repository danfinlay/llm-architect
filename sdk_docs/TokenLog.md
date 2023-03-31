- [[Tokenized Prioritization System]] for [[GitHub]] 
    - founded by [[Wesley van Heije]]
    - Now managed by [[Giveth]]
        - Lead dev: https://twitter.com/VitorMarthendal
- Instructions
    - here's a sample configuration file
    - ```javascript
{
  //“STANDARD”or“QUA”DRATIC
  "method": "STANDARD",
  // List of snapshot strategies for the voting weights
  "strategy": [
    {
      "name": "erc20-balance-of",
      "params": {
        "address": "0xfFBAbEb49be77E5254333d5fdfF72920B989425f",
        "symbol": "gGIV",
        "decimals": 18
        }
      },
    }
  ],
  // Chain id for the tokens used in the snapshot strategies
  "chainId": 100,
  // Labels of the Github issues that will be considered for the repo
  "labels": [
  "enhancement"
  ]
}```
    - I've added some comments to each item
    - that will be the tokenlog.json file in yor repo
    - [tokenlog.generalmagic.ioTokenlog · Token-weighted backlogs](https://t.co/SXnmv9fqFp)
    - after you add the file you can access [http://tokenlog.generalmagic.io](https://t.co/SXnmv9fqFp){user or org}/{repo} to use it
    - 5:04 PM
    - the configuration part is not ideal yet, but I haven't had the time to improve it yet
- https://tokenlog.xyz/MetaMask/metamask-extension
- [on Github](https://github.com/wslyvh/tokenlog)
- Inspired by a tweet by [[Dan Finlay]]
    - https://twitter.com/wslyvh/status/1318844431722860547?s=20
        - He deleted it! :(
