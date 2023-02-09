// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IDualChannel721.sol";
import "./lib/Types.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract NFTProxy is AccessControlEnumerable {

    bytes32 public constant IMA_ROLE = keccak256("IMA_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE"); 

    event AddClone(bytes32 indexed chainHash, address indexed token, bool indexed isERC721);
    event MintRequest(bytes32 indexed fromChainHash, address indexed sender, Types.MintRequest request);

    mapping(bytes32 => mapping(IDualChannel721 => bool)) public is721Clone;

    modifier onlyIMA() {
        require(hasRole(IMA_ROLE, msg.sender), "Missing IMA_ROLE");
        _;
    }

    modifier onlyOwner() {
        require(hasRole(OWNER_ROLE, msg.sender), "Missing OWNER_ROLE");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(OWNER_ROLE, msg.sender);
        _setupRole(IMA_ROLE, 0xd2AAa00100000000000000000000000000000000);
    }

    function postMessage(
        bytes32 schainHash,
        address sender,
        bytes calldata data
    )
        external
        onlyIMA
    {
        (Types.MintRequest memory req) = abi.decode(data, (Types.MintRequest));
        require(is721Clone[schainHash][IDualChannel721(req.originToken)], "Not a valid token");
        IDualChannel721(req.originToken).mint(req);
        emit MintRequest(schainHash, sender, req);
    }

    function add721Clone(string memory chainName, IDualChannel721 token) external onlyOwner {
        bytes32 chainHash = keccak256(abi.encodePacked(chainName));
        is721Clone[chainHash][token] = true;
        emit AddClone(chainHash, address(token), true);
    }

}