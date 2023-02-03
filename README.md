# defi-staking-app

This project focuses on developing a DeFi app which implements the concept of yield farming/liquidity mining.

## Dependencies:

- NPM
- Truffle
- Ganache

**Note: make sure you have metamask installed on the browser.**
**Note: make sure ganache is running.**

## Steps for running:

- Install project dependencies:

      npm install

- Deploy smart contracts to the Ethereum test blockchain - This will generate the json contract file at src/truffle_abis

      truffle migrate

OR (Updates the smart contracts):

      truffle migrate --reset

- Run the frontend

      npm run start

- Add the second address from Ganache to Metamask and configure Ganache network.
  **Use the second address from Ganache because the first one it's set for the Smart Contracts**
  More info in here: https://coinsbench.com/connect-to-metamask-from-new-or-existing-web-application-with-truffle-and-ganache-f48aa763c0ac

- After playing around Depositing tokens you can run the following code to receive the Reward Balance:

      truffle exec scripts/issue-tokens.js

## Testing the smart contracts:

      truffle test
