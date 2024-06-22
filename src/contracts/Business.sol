// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Business is ReentrancyGuard {
    uint256 public constant royaltyPercentage = 15; // 15% royalty

    struct Token {
        uint256 price;
        uint256 tokenId;
        string tokenURI;
        uint256 dateOfMint;
        address payable creator;
        uint256 sellStartTimestamp;
        uint256 sellEndTimestamp;
    }

    mapping(uint256 => Token) public tokens;
    mapping(uint256 => bool) public tokensExistence;

    constructor() {}

    function saveAndTransferTokensToBusinessContract(
        // params for Item
        uint256 _price,
        string memory _tokenURI,
        uint256 _sellStartTimestamp,
        uint256 _sellEndTimestamp,
        // extra params
        IERC721 _nft,
        uint256 _initialEdition,
        uint256 _numberOfEditions
    ) external nonReentrant {
        for (
            uint256 i = _initialEdition;
            i < _initialEdition + _numberOfEditions;
            ++i
        ) {
            tokens[i] = Token(
                _price,
                i,
                _tokenURI,
                block.timestamp,
                payable(msg.sender),
                _sellStartTimestamp,
                _sellEndTimestamp
            );
            tokensExistence[i] = true;

            // transfers each token from creator to Business contract
            _nft.transferFrom(msg.sender, address(this), i);
        }
    }

    function purchaseToken(
        IERC721 _nft,
        uint256 _tokenId
    ) external payable nonReentrant {
        require(tokensExistence[_tokenId], "Token doesn't exist");

        Token memory token = tokens[_tokenId];
        require(
            msg.value == token.price,
            "Total ether must be equal to price of the token"
        );

        address owner = _nft.ownerOf(token.tokenId);

        // transfer the price to creator/owner & creator
        if (owner == address(this)) {
            (bool paymentStatus, ) = token.creator.call{value: msg.value}("");
            require(paymentStatus, "Transaction failed");
        } else {
            uint256 royaltyAmount = (msg.value * royaltyPercentage) / 100;
            uint256 remainingAmount = msg.value - royaltyAmount;

            (bool paymentStatusOfCreator, ) = token.creator.call{
                value: royaltyAmount
            }("");
            require(paymentStatusOfCreator, "Transaction to creator failed");

            (bool paymentStatusOfOwner, ) = payable(owner).call{
                value: remainingAmount
            }("");
            require(paymentStatusOfOwner, "Transaction to owner failed");
        }

        // transfer the token to buyer
        _nft.transferFrom(owner, msg.sender, token.tokenId);
    }
}
