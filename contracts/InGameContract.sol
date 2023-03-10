// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./lib/Types.sol";
import "@skalenetwork/ima-interfaces/schain/IMessageProxyForSchain.sol";

/// @title In Game Contract
/// @author Sawyer Cutler
/// @notice This is an example contract of a couple of different functions that can enable NFTs to be "crafted", "found", etc as representation of an on-chain game
/// @dev This contract will POST messages to a standard proxy on another chain, in this case the Calypso NFT Hub
contract InGameContract {

    IMessageProxyForSchain proxy;
    address public calypsoTarget;

    bytes32 public immutable TARGET_CHAIN_HASH;
    
    constructor(
        address _calypsoTarget,
        string memory _targetChainName
    ) {
        proxy = IMessageProxyForSchain(0xd2AAa00100000000000000000000000000000000);
        calypsoTarget = _calypsoTarget;
        TARGET_CHAIN_HASH = keccak256(abi.encodePacked(_targetChainName));
    }

    function claim(Types.MintRequest memory data) public {
        proxy.postOutgoingMessage(
            TARGET_CHAIN_HASH,
            calypsoTarget,
            abi.encode(data)
        );
    }
}