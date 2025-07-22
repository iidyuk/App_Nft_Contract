import { expect } from "chai";
// import { ethers } from "hardhat"; // この行は削除

// import { any } from "hardhat"; // この行も削除
// import { ethers as hreEthers } from "hardhat"; // この行も削除

describe("ERC721", function () {
  let MyNFT: any; // Using 'any' for simplicity; consider a more specific type if available
  let myNFT: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const { ethers } = require("hardhat"); // この行を追加
    [owner, addr1, addr2] = await ethers.getSigners();
    MyNFT = await ethers.getContractFactory("MyNFT"); // コントラクト名に合わせて変更
    myNFT = await MyNFT.deploy(owner.address);
    await myNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myNFT.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await myNFT.name()).to.equal("MyNFT");
      expect(await myNFT.symbol()).to.equal("MNFT");
    });
  });

  describe("Minting", function () {
    it("Should mint a token to the specified address with the correct URI", async function () {
      const uri = "ipfs://some-hash/metadata.json";
      await myNFT.mint(addr1.address, uri);

      expect(await myNFT.balanceOf(addr1.address)).to.equal(1);
      expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
      expect(await myNFT.tokenURI(0)).to.equal(uri);
    });

    it("Should not allow non-owners to mint", async function () {
      const uri = "ipfs://another-hash/metadata.json";
      // @ts-ignore
      await expect(myNFT.connect(addr1).mint(addr1.address, uri)).to.be.revertedWithCustomError(
        myNFT, "OwnableUnauthorizedAccount");
    });

    it("Should increment the token ID counter", async function () {
      const uri1 = "ipfs://uri1";
      const uri2 = "ipfs://uri2";

      await myNFT.mint(addr1.address, uri1);
      await myNFT.mint(addr2.address, uri2);

      expect(await myNFT.balanceOf(addr1.address)).to.equal(1);
      expect(await myNFT.balanceOf(addr2.address)).to.equal(1);
      expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
      expect(await myNFT.ownerOf(1)).to.equal(addr2.address);
      expect(await myNFT.tokenURI(0)).to.equal(uri1);
      expect(await myNFT.tokenURI(1)).to.equal(uri2);
    });
  });
}); 