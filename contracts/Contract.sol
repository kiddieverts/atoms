// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Atoms is Ownable, ERC721 {
    bool public isPaused;
    string public baseTokenURI = "";

    constructor() ERC721("Atoms", "ATOMS") {
    }

    function changeBaseUrl(string memory url) public
    {
        baseTokenURI = url;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function pause() public onlyOwner {
        require(isPaused == false, "Minting needs to be closed first");
        isPaused = true;
    }

    function unpause() public onlyOwner {
        require(isPaused, "Minting needs to be open first");
        isPaused = false;
    }

    function mint(uint256 tokenId) public payable {
        require(!isPaused, "Contract is paused");
        _safeMint(msg.sender, tokenId);
    }
}
