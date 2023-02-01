const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async (deployer) => {
  // Deploy Mock Tether Contract
  await deployer.deploy(Tether);

  // Deploy Reward Contract
  await deployer.deploy(RWD);

  // Deploy Decentral Bank
  await deployer.deploy(DecentralBank);
};
