// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./lib/Types.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract InGameNFT is AccessControlEnumerable, ERC721URIStorage {
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant ORIGIN_CHAIN_HASH = keccak256(abi.encodePacked("staging-utter-unripe-menkar"));

    constructor() ERC721("In Game NFT", "INGAME") {
        _setupRole(MINTER_ROLE, 0xd2AAa00100000000000000000000000000000000);
        _setupRole(BURNER_ROLE, 0xd2AAa00100000000000000000000000000000000);
    }

    function burn(uint256 tokenId) public virtual {
        require(hasRole(BURNER_ROLE, _msgSender()) || _isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

    function postMessage(
        bytes32 schainHash,
        address sender,
        bytes calldata data
    )
        external
    {
        require(schainHash == ORIGIN_CHAIN_HASH, "Invalid Origin Chain");
        require(hasRole(MINTER_ROLE, _msgSender()), "Sender is not a Minter");
        (Types.MintResponse memory res) = abi.decode(data, (Types.MintResponse));
        _mint(res.to, res.tokenId);
        _setTokenURI(res.tokenId, res.tokenURI);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}