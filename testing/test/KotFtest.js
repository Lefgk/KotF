const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const { mine, time } = require("@nomicfoundation/hardhat-network-helpers");
const path = require("path");
const deployContracts = require("../testUtils/deployContracts");
const { assert, Console } = require("console");
function toBN(number, decimal) {
  return (number * 10 ** decimal).toLocaleString("fullwide", {
    useGrouping: false,
  });
}

describe("Fools", function () {
  before(async () => {
    await deployContracts();
  });

  it("Should become Fool!", async function () {
    console.log(await KotFContract.currentFool());
    console.log(await KotFContract.currentPrice());
    expect(await KotFContract.BecomeFool({ value: 1 })).not.to.be.reverted;
    expect(await KotFContract.currentFool()).to.equal(owner.address);
  });

  it("Should update Fool!", async function () {
    expect(await KotFContract.currentFool()).to.equal(owner.address);
  });

  it("Should become Fool 2!", async function () {
    expect(
      await KotFContract.connect(wallet1).BecomeFool({
        value: (await KotFContract.currentPrice()) * 2,
      })
    ).not.to.be.reverted;
    expect(await KotFContract.currentFool()).to.equal(wallet1.address);
  });
});
