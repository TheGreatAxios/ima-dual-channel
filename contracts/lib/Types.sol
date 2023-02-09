// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Types {
    struct ClaimNFT {
        address to;
        address token;
        bool bringBack;
    }
}