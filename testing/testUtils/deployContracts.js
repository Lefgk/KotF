const hardhat = require("hardhat");
const { mine } = require("@nomicfoundation/hardhat-network-helpers");
function toBN(number, decimal) {
  return (number * 10 ** decimal).toLocaleString("fullwide", {
    useGrouping: false,
  });
}

module.exports = async function (env = "local") {
  const [owner, wallet1, wallet2, wallet3] = await ethers.getSigners();
  const KotF = await ethers.getContractFactory("KotF");
  global.owner = owner;
  global.wallet1 = wallet1;
  global.wallet2 = wallet2;
  global.wallet3 = wallet3;

  global.zeroAddress = "0x0000000000000000000000000000000000000000";
  global.KotFContract = await KotF.deploy();
};
