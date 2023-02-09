// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Types {

    struct TargetToOriginRequest {
        address to;
        address originToken;
        address targetToken;
        bool bringBack;
    }

    struct OriginToTargetResponse {
        address to;
        uint256 tokenId;
        string tokenURI;
    }
}