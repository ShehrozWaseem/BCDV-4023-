const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");


async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const baseURI = "https://emerald-changing-mule-988.mypinata.cloud/ipfs/QmbveKamwZVjHCyCFTQKAwfUXiWF3W9fZoi3KJKcjkmYW4/"; // Replace with your actual base URI
  const Marketplace = await hre.ethers.getContractFactory("GojoNft");
  // const marketplace = await Marketplace.deploy(baseURI);
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  // This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});