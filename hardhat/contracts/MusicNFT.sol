// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MusicNFT is ERC721URIStorage {
    uint256 private tokenId;

    constructor() ERC721("MusicNFT", "MNFT") {
        tokenId = 1;
    }

    function getTokenId() public view returns (uint256) {
        return tokenId;
    }

    function mintNFT(
        string memory _tokenURI,
        uint256 _numberOfEditions
    ) external {
        for (uint256 i = 1; i <= _numberOfEditions; i++) {
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, _tokenURI);
            tokenId++;
        }
    }
}
