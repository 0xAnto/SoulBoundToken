import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SBT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOneYearLockFixture() {
    const TOKEN_URI =
      "https://bafkreievl55wd4giratzgg3332dbp6z3b72m2wjgjw547tmn67x7z5jf2q.ipfs.dweb.link";
    let count = 0;

    // Contracts are deployed using the first signer/account by default
    const [owner, addr1] = await ethers.getSigners();

    const SBT = await ethers.getContractFactory("SBT");
    const sbt = await SBT.deploy();

    return { sbt, owner, addr1, TOKEN_URI, count };
  }

  describe("Deployment", function () {
    it("Should set the right name ", async function () {
      const { sbt } = await loadFixture(deployOneYearLockFixture);

      expect(await sbt.name()).to.equal("SoulBoundToken");
    });
    it("Should set the right symbol", async function () {
      const { sbt } = await loadFixture(deployOneYearLockFixture);

      expect(await sbt.symbol()).to.equal("SBT");
    });

    it("Should set the right owner", async function () {
      const { sbt, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await sbt.owner()).to.equal(owner.address);
    });

    it("Should mint NFT  ", async function () {
      const { sbt, addr1, TOKEN_URI } = await loadFixture(
        deployOneYearLockFixture
      );
      await sbt.issue(addr1.address, TOKEN_URI);
    });
    it("Should increase token count", async function () {
      let { sbt, addr1, count, TOKEN_URI } = await loadFixture(
        deployOneYearLockFixture
      );
      await sbt.issue(addr1.address, TOKEN_URI);
      expect(await sbt.count()).to.equal(count + 1);
    });
    it("Should return owner of the minted NFT", async function () {
      let { sbt, addr1, TOKEN_URI, count } = await loadFixture(
        deployOneYearLockFixture
      );
      await sbt.issue(addr1.address, TOKEN_URI);
      expect(await sbt.ownerOf(count + 1)).to.equal(addr1.address);
    });
    it("Should return token uri of the minted NFT", async function () {
      let { sbt, count, addr1, TOKEN_URI } = await loadFixture(
        deployOneYearLockFixture
      );
      await sbt.issue(addr1.address, TOKEN_URI);

      expect(await sbt.tokenURI(count + 1)).to.equal(TOKEN_URI);
    });
  });
});
