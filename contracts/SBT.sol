// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./ERC4973.sol";

contract SBT is ERC4973 {
    address public owner;
    uint256 public count = 0;

    constructor () ERC4973("SoulBoundToken", "SBT") {
        owner = msg.sender;
    }

    function burn(uint256 _tokenId) external override {
        require(ownerOf(_tokenId) == msg.sender || msg.sender == owner, "You can't revoke this token");
        _burn(_tokenId);
    }

    function issue(address _issuee, string calldata _uri) external onlyOwner {
        count += 1;
        _mint(_issuee, count, _uri);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}