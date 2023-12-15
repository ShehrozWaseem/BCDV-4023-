const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");


async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const aggregatorAddress = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
  const ora = await hre.ethers.getContractFactory("DataConsumerV3");
  // const marketplace = await Marketplace.deploy(baseURI);
  const oracle = await ora.deploy();

  await oracle.deployed();

  const data = {
    address: oracle.address,
    abi: JSON.parse(oracle.interface.format('json'))
  }
  console.log(data)

  // This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/oracle.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});