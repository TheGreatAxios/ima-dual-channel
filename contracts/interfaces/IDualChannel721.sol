// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../lib/Types.sol";

interface IDualChannel721 is IERC721 {
    /// @notice Allows for minting from IMA or User
    /// @dev Can be sent back over when called from either side
    /// @param data MintRequest
    function mint(Types.MintRequest memory data) external;
}