const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

const convertToWei = (number) => {
  return web3.utils.toWei(number, "ether");
};

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Tether", () => {
  let tether;

  before(async () => {
    tether = await Tether.new();
  });

  it("matches the name correctly", async () => {
    const name = await tether.name();
    assert.equal(name, "Mock Tether Token");
  });

  it("matches the symbol correctly", async () => {
    const symbol = await tether.symbol();
    assert.equal(symbol, "mUSDT");
  });

  it("matches the totalSupply correctly", async () => {
    const totalSupply = await tether.totalSupply();
    assert.equal(totalSupply, 1000000000000000000000000);
  });

  it("matches the decimals correctly", async () => {
    const decimals = await tether.decimals();
    assert.equal(decimals, 18);
  });
});

contract("RWD", () => {
  let rwd;

  before(async () => {
    rwd = await RWD.new();
  });

  it("matches the name correctly", async () => {
    const name = await rwd.name();
    assert.equal(name, "Reward Token");
  });

  it("matches the symbol correctly", async () => {
    const symbol = await rwd.symbol();
    assert.equal(symbol, "RWD");
  });

  it("matches the totalSupply correctly", async () => {
    const totalSupply = await rwd.totalSupply();
    assert.equal(totalSupply, 1000000000000000000000000);
  });

  it("matches the decimals correctly", async () => {
    const decimals = await rwd.decimals();
    assert.equal(decimals, 18);
  });
});

contract("DecentralBank", ([owner, customer]) => {
  let tether;
  let rwd;
  let decentralBank;

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all tokens to DecentralBank
    await rwd.transfer(decentralBank.address, convertToWei("1000000"));

    // Transfer 100 mock Tethers to Customer Address
    await tether.transfer(customer, convertToWei("100"), { from: owner });
  });

  it("matches the name correctly", async () => {
    const name = await decentralBank.name();
    assert.equal(name, "Decentral Bank");
  });

  it("matches the balance that was transfered", async () => {
    let balance = await rwd.balanceOf(decentralBank.address);
    assert.equal(balance, convertToWei("1000000"));
  });
});
