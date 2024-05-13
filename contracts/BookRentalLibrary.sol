// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BookRentalLibrary is ERC721 {
    // Definimos el desplazamiento de bits para guardar en el ID del contrato son 256 bits en total
    // https://www.unixtimestamp.com/
    // ISBN: 9780132350884
    // price 500 wei
    // Opensea
    // 0xc002E07BB122F85e31B7D8EAe3E6F87faCBEE2CA
    uint256 constant ISBN_OFFSET = 192; // 64 Bits para ISBN 
    uint256 constant PRICE_RENTAL_OFFSET = 80; // 112 Bits para el precio de renta
    uint256 constant TIMESTAMP_END_OFFSET = 40; // 40 Bits para la fecha final de renta
    uint256 constant TIMESTAMP_START_OFFSET = 0; // 40 Bits para la fecha inicial de renta

    constructor() ERC721("BookRentalToken", "BRT") {}

    function safeMintBook(address to, uint256 isbn, uint256 price, uint256 endTime, uint256 startTime) public {
        require(
            isbn <= 18446744073709551615,
            "Error: Invalid ISBN"
        );

        require(
            price <= 5192296858534827628530496329220095,
            "Error: Invalid Price"
        );

        require(
            endTime <= 1099511627775 && startTime <= 1099511627775 && endTime > startTime,
            "Error: Invalid Times"
        );

        uint256 isbnEncoded = isbn << ISBN_OFFSET;
        uint256 rentalPrice = price << PRICE_RENTAL_OFFSET;
        uint256 end = endTime << TIMESTAMP_END_OFFSET;
        uint256 tokenId = isbnEncoded + rentalPrice + end + startTime;

        _safeMint(to, tokenId);
    }

    // View functions to decode token information

    function getISBN(uint256 tokenId) public pure returns(uint256) {
        uint256 isbnMask = 0xFFFFFFFFFFFFFFFF << ISBN_OFFSET;
        return ((tokenId & isbnMask) >> ISBN_OFFSET);
    }

    function getRentalPrice(uint256 tokenId) public pure returns(uint256) {
        uint256 priceMask = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF << PRICE_RENTAL_OFFSET;
        return ((tokenId & priceMask) >> PRICE_RENTAL_OFFSET);
    }

    function getRentalEnd(uint256 tokenId) public pure returns(uint256) {
        uint256 timeMask = 0xFFFFFFFFFF << TIMESTAMP_END_OFFSET;
        return ((tokenId & timeMask) >> TIMESTAMP_END_OFFSET);
    }

    function getRentalStart(uint256 tokenId) public pure returns(uint256) {
        uint256 timeMask = 0xFFFFFFFFFF << TIMESTAMP_START_OFFSET;
        return ((tokenId & timeMask) >> TIMESTAMP_START_OFFSET);
    }
}
