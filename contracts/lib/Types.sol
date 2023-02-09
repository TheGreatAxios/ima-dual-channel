// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Types {

    struct MintRequest {
        address to;
        address originToken;
        address targetToken;
        bool bringBack;
    }

    struct MintResponse {
        address to;
        uint256 tokenId;
        string tokenURI;
    }
}