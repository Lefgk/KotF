// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const time = require("@nomicfoundation/hardhat-network-helpers");
const { mine } = require("@nomicfoundation/hardhat-network-helpers");
const path = require("path");

async function main() {
  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const KotF = await ethers.getContractFactory("KotF");
  const Kotf = await KotF.deploy();
  await Kotf.deployed();
}
function toBN(number, decimal) {
  return (number * 10 ** decimal).toLocaleString("fullwide", {
    useGrouping: false,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
