const DecentralBank = artifacts.require("DecentralBank");

module.exports = async (callback) => {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueTokens();

  console.log("Tokens have been issued successfully!");
  callback();
};
