// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GojoNft is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint[] tokenIDArray;

    constructor() ERC721("SHEHROZ", "SZT") {}

    
    function mintTokens(address to, string memory uri, uint256 _count) public payable onlyOwner {
        uint256 pricePerMint = 0.001 ether;

        require(msg.value >= pricePerMint * _count, "Insufficient Ether sent for minting.");

        for (uint256 i = 0; i < _count; i++) {
            uint256 newTokenId = _tokenIdCounter.current();

            _tokenIdCounter.increment();
            tokenIDArray.push(newTokenId);

            _safeMint(to, newTokenId);

            _setTokenURI(newTokenId, uri);
        }
    }


    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getTokenArray() public view returns (uint[] memory) {
        return tokenIDArray;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}