// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Business {
    uint256 public tokenCount;
    uint256 public totalEarningsFromArtists;

    // business owner is the deployer of this Business contract
    address payable public immutable businessOwner;

    constructor() {
        businessOwner = payable(msg.sender);
    }

    struct Song {
        string title;
        string artist;
        string imageURL;
        string description;
    }

    struct PurchaseHistory {
        address to;
        address from;
        uint256 date;
        uint256 price;
    }

    struct Token {
        Song song;
        bool isOnSale;
        uint256 price;
        uint256 tokenId;
        string tokenURI;
        uint256 dateOfMint;
        address currentOwner;
        address payable creator;
    }

    // tokenId => Fetches the token
    mapping(uint256 => Token) public tokens;
    // tokenId => Checks existence of the token
    mapping(uint256 => bool) public tokensExist;
    // tokenId => Fetches purchase history of the token
    mapping(uint256 => PurchaseHistory[]) public tokensPurchaseHistory;

    receive() external payable {}

    function findPurchaseHistoryOfToken(
        uint256 _tokenId
    ) public view returns (PurchaseHistory[] memory) {
        require(tokensExist[_tokenId], "Token does not exist");

        PurchaseHistory[] memory purchaseHistory = tokensPurchaseHistory[
            _tokenId
        ];
        return purchaseHistory;
    }

    function withdrawBalance() external {
        require(msg.sender == businessOwner, "You are not the owner/deployer");

        (bool paymentStatus, ) = businessOwner.call{
            value: address(this).balance
        }("");
        require(paymentStatus, "Withdraw failed");
    }

    function findCountOfTokensOnSale() public view returns (uint256) {
        uint256 count = 0;

        for (uint256 i = 1; i <= tokenCount; ++i) {
            if (tokens[i].isOnSale) {
                count++;
            }
        }

        return count;
    }

    function findAllTokens() public view returns (Token[] memory) {
        Token[] memory _tokens = new Token[](tokenCount + 1);

        for (uint256 i = 1; i <= tokenCount; ++i) {
            _tokens[i] = tokens[i];
        }

        return _tokens;
    }

    function listTokenForSale(
        IERC721 _nft,
        uint256 _price,
        uint256 _tokenId
    ) public {
        require(tokensExist[_tokenId], "Token does not exist");
        require(
            msg.sender == _nft.ownerOf(_tokenId),
            "You are not the owner of this token"
        );

        Token storage token = tokens[_tokenId];
        require(
            !token.isOnSale,
            "Token is already on sale, cannot list for sale"
        );
        require(
            _price >= token.price,
            "New price must be equal or higher than the old price"
        );

        token.price = _price;
        token.isOnSale = true;
    }

    function saveAndTransferTokensToBusinessContract(
        // params for Song
        string memory _title,
        string memory _artist,
        string memory _imageURL,
        string memory _description,
        // params for other Token metadata
        uint256 _price,
        string memory _tokenURI,
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
            tokenCount++;
            tokensExist[i] = true;
            tokens[i] = Token(
                Song(_title, _artist, _imageURL, _description),
                true,
                _price,
                i,
                _tokenURI,
                block.timestamp,
                msg.sender,
                payable(msg.sender)
            );

            // transfers each token from creator to Business contract
            _nft.transferFrom(msg.sender, address(this), i);
        }
    }

    function purchaseToken(IERC721 _nft, uint256 _tokenId) external payable {
        require(tokensExist[_tokenId], "Token does not exist");

        Token storage token = tokens[_tokenId];
        require(
            msg.sender != token.currentOwner,
            "You already purchased the token"
        );
        require(token.isOnSale, "Token is not on sale, you cannot purchase");
        require(
            msg.value == token.price,
            "Ether must be equal to the defined price for the token"
        );

        address owner = _nft.ownerOf(token.tokenId);

        if (owner == address(this)) {
            tokensPurchaseHistory[_tokenId].push(
                PurchaseHistory(
                    msg.sender,
                    token.creator,
                    block.timestamp,
                    token.price
                )
            );
        } else {
            tokensPurchaseHistory[_tokenId].push(
                PurchaseHistory(msg.sender, owner, block.timestamp, token.price)
            );
        }

        // transfer the price to the creator or/and owner of the token along with the platform
        if (owner == address(this)) {
            // primary sell
            uint256 platformFee = (msg.value * 10) / 100;
            uint256 remainingPrice = msg.value - platformFee;

            (bool paymentStatus, ) = payable(owner).call{value: platformFee}(
                ""
            );
            require(paymentStatus, "Fee transaction failed to the platform");

            totalEarningsFromArtists += remainingPrice;
            (paymentStatus, ) = token.creator.call{value: remainingPrice}("");
            require(paymentStatus, "Price transaction failed to the creator");
        } else {
            // secondary sell
            uint256 royalty = (msg.value * 10) / 100;
            uint256 platformFee = (msg.value * 3) / 100;
            uint256 remainingPrice = msg.value - (royalty + platformFee);

            (bool paymentStatus, ) = payable(address(this)).call{
                value: platformFee
            }("");
            require(paymentStatus, "Fee transaction failed to the platform");

            totalEarningsFromArtists += royalty;
            (paymentStatus, ) = token.creator.call{value: royalty}("");
            require(paymentStatus, "Royalty transaction failed to the creator");

            (paymentStatus, ) = payable(owner).call{value: remainingPrice}("");
            require(paymentStatus, "Price transaction failed to the owner");
        }

        token.isOnSale = false;
        token.currentOwner = msg.sender;
        // transfer the token to the buyer/new owner
        _nft.transferFrom(owner, msg.sender, token.tokenId);
    }
}
