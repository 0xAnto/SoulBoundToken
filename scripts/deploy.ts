import { ethers } from "hardhat";

async function main() {
  const SBT = await ethers.getContractFactory("SBT");
  const sbt = await SBT.deploy();
  await sbt.deployed();

  console.log("Soulbound Token deployed to:", sbt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
