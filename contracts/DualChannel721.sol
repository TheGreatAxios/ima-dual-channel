// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@skalenetwork/ima-interfaces/schain/IMessageProxyForSchain.sol";
import "./lib/Types.sol";
import "./interfaces/IDualChannel721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DualChannel721 is IDualChannel721, AccessControlEnumerable, ERC721URIStorage {

    using Counters for Counters.Counter;
    event PreparingToMint(address indexed sender);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public immutable TARGET_CHAIN_HASH;
    Counters.Counter public tokenIdCounter;
    IMessageProxyForSchain proxy;

    constructor(
        address _customProxy,
        string memory _targetChainName
    ) ERC721("Original NFT", "ORIG") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, _customProxy);
        _setupRole(MINTER_ROLE, 0xd2AAa00100000000000000000000000000000000);
        proxy = IMessageProxyForSchain(0xd2AAa00100000000000000000000000000000000);
        TARGET_CHAIN_HASH = keccak256(abi.encodePacked(_targetChainName));
    }

    // function mint(address to, uint256 tokenId) public returns (uint256) {
    //     require(hasRole(MINTER_ROLE, _msgSender()), "Sender is not a Minter");
    //     _mint(to, tokenId);
    //     return tokenId;
    // }

    function mint(Types.MintRequest memory data) external {
        emit PreparingToMint(msg.sender);
        require(hasRole(MINTER_ROLE, msg.sender), "Sender is not a Minter");
        if (data.bringBack) {
            proxy.postOutgoingMessage(
                TARGET_CHAIN_HASH,
                data.targetToken,
                abi.encode(Types.MintResponse(data.to, uint256(tokenIdCounter.current()), ""))
                // abi.encode(Types.MintResponse(data.to, tokenIdCounter.current(), tokenURI(tokenIdCounter.current())))
            );
        } else {
            _safeMint(data.to, uint256(tokenIdCounter.current()));
        }

        tokenIdCounter.increment();
    }

    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}