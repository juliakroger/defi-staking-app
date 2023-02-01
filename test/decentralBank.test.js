const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Tether", () => {
  let tether;

  before(async () => {
    tether = await Tether.new();
  });

  describe("Mock Tether Deployment", async () => {
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

  // TODO
});

contract("RWD", () => {
  let rwd;

  before(async () => {
    rwd = await RWD.new();
  });

  describe("Mock RWD Deployment", async () => {
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
});
