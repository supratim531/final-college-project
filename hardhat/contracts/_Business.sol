// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract _Business {
    uint256 public constant royaltyPercentage = 15; // 15% royalty

    struct Song {
        string name;
        string artist;
        string imageURL;
    }

    struct Token {
        Song song;
        uint256 price;
        uint256 tokenId;
        string tokenURI;
        uint256 dateOfMint;
        address payable creator;
        uint256 sellStartTimestamp;
        uint256 sellEndTimestamp;
    }

    Token[] private tokenList;
    mapping(uint256 => Token) public tokens;
    mapping(uint256 => bool) public tokensExistence;

    constructor() {}

    function saveAndTransferTokensToBusinessContract(
        // params for song
        string memory _name,
        string memory _artist,
        string memory _imageURL,
        // params for Item
        uint256 _price,
        string memory _tokenURI,
        uint256 _sellStartTimestamp,
        uint256 _sellEndTimestamp,
        // extra params
        IERC721 _nft,
        uint256 _initialEdition,
        uint256 _numberOfEditions
    ) external {
        for (
            uint256 i = _initialEdition;
            i < _initialEdition + _numberOfEditions;
            ++i
        ) {
            tokens[i] = Token(
                Song(_name, _artist, _imageURL),
                _price,
                i,
                _tokenURI,
                block.timestamp,
                payable(msg.sender),
                _sellStartTimestamp,
                _sellEndTimestamp
            );
            tokenList.push(tokens[i]);
            tokensExistence[i] = true;

            // transfers each token from creator to Business contract
            _nft.transferFrom(msg.sender, address(this), i);
        }
    }

    function purchaseToken(IERC721 _nft, uint256 _tokenId) external payable {
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

    // fetch all tokens that have been minted by artists
    function fetchAllTokens() public view returns (uint256, Token[] memory) {
        return (tokenList.length, tokenList);
    }

    // fetch those tokens of which sell is started
    function fetchAllTokensBySellStarted()
        public
        view
        returns (uint256, Token[] memory)
    {
        uint256 _length = 0;
        Token[] memory _tokens = new Token[](tokenList.length);

        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i].sellStartTimestamp < block.timestamp) {
                _length++;
                _tokens[i] = tokenList[i];
            }
        }

        return (_length, _tokens);
    }

    // fetch those tokens of which sell is not started yet
    function fetchAllTokensBySellNotStarted()
        public
        view
        returns (uint256, Token[] memory)
    {
        uint256 _length = 0;
        Token[] memory _tokens = new Token[](tokenList.length);

        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i].sellStartTimestamp > block.timestamp) {
                _length++;
                _tokens[i] = tokenList[i];
            }
        }

        return (_length, _tokens);
    }
}
