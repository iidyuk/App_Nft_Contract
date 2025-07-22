// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721, Ownable, ERC721URIStorage {

    uint256 private _tokenIdCounter;  // カウンタ変数 0から始まり、NFTがミントされるたびに自動的にインクリメントする

    constructor(address initialOwner)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner)
    {}

    function mint(address to, string memory uri)
        public onlyOwner returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter;  // tokenId .. NFTの識別子  // current() .. カウンタの現在の値を返す
        _tokenIdCounter++;  // カウンタを増やす
        _safeMint(to, tokenId);  // _safeMint() .. ブロックチェーン上で新しいNFTを作成し、指定されたアドレスに所有権を割り当てる
          // to .. NFTを所有することになるウォレットのアドレス
        _setTokenURI(tokenId, uri);  // _setTokenURI() .. ミントされたNFTに関連するメタデータ（情報）のURI（URL）を設定する
          // uri .. NFTのメタデータが保存されている場所を示すURI
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 
