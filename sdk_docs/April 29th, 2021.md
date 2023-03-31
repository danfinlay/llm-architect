- [[Sequence]] is a [[stateless]] [[contract account]] by [[Philippe Castonguay]]
    - wallet ui: https://sequence.app/auth
    - https://twitter.com/phabcd/status/1387604120643805188?s=21
- [[Squirrelly]] is a [[JavaScript]] [[template]] system
- [[MATT: An [[NFT]] Auction Concept]] first prototype deploy
    - On Rinkeby (chain id `4`)
    - changes
        - Made chain_id derived automatically
        - ^^^^
    - source
        - ```javascript
pragma solidity ^0.8.4;

contract ECRecovery {

    /**
    * @dev Recover signer address from a message by using their signature
    * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
    * @param sig bytes signature, the signature is generated using web3.eth.sign()
    */
    function recover(bytes32 hash, bytes memory sig) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        //Check the signature length
        if (sig.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(hash, v, r, s);
        }
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract MattAuction is ECRecovery {
    uint256 _chain_id;
            
    constructor() { 
        _chain_id = block.chainid;
    }       

    struct Bid { 
        uint256 nft;
        address bidderAddress;
        address currencyTokenAddress;
        uint256 currencyTokenAmount;
    }

    struct SignedBid {
        Bid bid;
        bytes sig;
    }

    struct Auction {
        uint endTime;
        address owner;
        address currencyTokenAddress;
        bool open;
    }

    mapping (bytes32 => Auction) auctions;

    function startAuction (bytes32 nftData, uint endTime, address token, address owner) public {
       auctions[nftData] = Auction(endTime, owner, token, true);
    }

    function endAuction (bytes32 nftData, SignedBid[] calldata signedBids) public {
        Auction memory auction = auctions[nftData];

        // Enforce only the auction owner can end it
        assert(msg.sender == auction.owner);

        // Assume the lowest (price-setting) bid is first (enforce in the loop)
        uint256 price = signedBids[0].bid.currencyTokenAmount;

        for (uint i=0; i < signedBids.length; i++) {
            SignedBid memory signed = signedBids[i];

            // Enforce all bids are above or equal to the first (low) bid price:
            assert(signed.bid.currencyTokenAmount >= price);

            // Ensure the bid meant to be in the auction's currency.
            // This data was redundant to sign, but improves end-user legibility.
            assert(signed.bid.currencyTokenAddress == auction.currencyTokenAddress);

            // Verify signature
            assert(verifyBidSignature(signed.bid.nft, signed.bid.bidderAddress, signed.bid.currencyTokenAddress, signed.bid.currencyTokenAmount, signed.sig));

            // Transfer payment
            // TODO
            IERC20(auction.currencyTokenAddress).transferFrom(signed.bid.currencyTokenAddress, auction.owner, price);

            // TODO: Issue NFT
        }        

        auction.open = false;
        auctions[nftData] = auction;
    }
    
    bytes32 constant EIP712DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string contractName,string version,uint256 chainId,address verifyingContract)"
    );

    function getDomainTypehash() public pure returns (bytes32) {
        return EIP712DOMAIN_TYPEHASH;
    }

    function getEIP712DomainHash(string memory contractName, string memory version, uint256 chainId, address verifyingContract) public pure returns (bytes32) {
        return keccak256(abi.encode(
            EIP712DOMAIN_TYPEHASH,
            keccak256(bytes(contractName)),
            keccak256(bytes(version)),
            chainId,
            verifyingContract
        ));
    }

    bytes32 constant PACKET_TYPEHASH = keccak256(
    "Bid(uint256 nft,address bidderAddress,address currencyTokenAddress,uint256 currencyTokenAmount)"
    );
        
    function getPacketTypehash()  public pure returns (bytes32) {
        return PACKET_TYPEHASH;
    }

    function getPacketHash(uint256 nft,address bidderAddress,address currencyTokenAddress,uint256 currencyTokenAmount) public pure returns (bytes32) {
        return keccak256(abi.encode(
            PACKET_TYPEHASH,
            nft,
            bidderAddress,
            currencyTokenAddress,
            currencyTokenAmount
        ));
    }

    function getTypedDataHash(uint256 nft,address bidderAddress,address currencyTokenAddress,uint256 currencyTokenAmount) public view returns (bytes32) {
        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            getEIP712DomainHash('MattAuction','1',_chain_id,address(this)),
            getPacketHash(nft,bidderAddress,currencyTokenAddress,currencyTokenAmount)
        ));
        return digest;
    }

    function verifyBidSignature(uint256 nft,address bidderAddress,address currencyTokenAddress,uint256 currencyTokenAmount,bytes memory offchainSignature) public view returns (bool) {
        bytes32 sigHash = getTypedDataHash(nft,bidderAddress,currencyTokenAddress,currencyTokenAmount);
        address recoveredSignatureSigner = recover(sigHash,offchainSignature);
        require(bidderAddress == recoveredSignatureSigner, 'Invalid signature');
        //DO SOME FUN STUFF HERE
        return true;
    }

}```
    - at `0xe81fc1dd0311d353c8be9a7e15dc3207a60cfa51`
    - abi
        - ```javascript
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nftData",
				"type": "bytes32"
			},
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "nft",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "bidderAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "currencyTokenAddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "currencyTokenAmount",
								"type": "uint256"
							}
						],
						"internalType": "struct MattAuction.Bid",
						"name": "bid",
						"type": "tuple"
					},
					{
						"internalType": "bytes",
						"name": "sig",
						"type": "bytes"
					}
				],
				"internalType": "struct MattAuction.SignedBid[]",
				"name": "signedBids",
				"type": "tuple[]"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDomainTypehash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "contractName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			}
		],
		"name": "getEIP712DomainHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nft",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bidderAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "currencyTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currencyTokenAmount",
				"type": "uint256"
			}
		],
		"name": "getPacketHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPacketTypehash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nft",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bidderAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "currencyTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currencyTokenAmount",
				"type": "uint256"
			}
		],
		"name": "getTypedDataHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nftData",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "startAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nft",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bidderAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "currencyTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currencyTokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "offchainSignature",
				"type": "bytes"
			}
		],
		"name": "verifyBidSignature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]```
    - First nft
        - nftData: `0x00000000000000000000000000000000`
        - token (rinkeby weth): `0xc778417e063141139fce010982780140aa0cd5ab`
        - owner (test.danfinlay.eth): `0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825`
