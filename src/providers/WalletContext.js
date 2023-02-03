import { createContext, useState, useEffect } from "react";
import Web3 from "web3";

import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

export const WalletContext = createContext({});

export const WalletConsumer = WalletContext.Consumer;

export const WalletProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [contracts, setContracts] = useState({
    tether: {},
    rwd: {},
    decentralBank: {},
  });

  const [networkId, setNetworkId] = useState();
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState({
    tether: "0",
    rwd: "0",
    staking: "0",
  });

  const loadData = async () => {
    setIsLoading(true);

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non ethereum browser detected. You should consider Metamask!"
      );
    }

    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    setNetworkId(networkId);

    setIsLoading(false);
  };

  const loadTether = async () => {
    if (!account || !networkId) return;
    const web3 = window.web3;

    const data = Tether.networks[networkId];
    if (data) {
      const tether = await new web3.eth.Contract(Tether.abi, data.address);
      const balance = await tether.methods.balanceOf(account).call();
      setBalance((prev) => ({ ...prev, tether: balance }));

      setContracts((prev) => ({ ...prev, tether }));
    }
  };

  const loadRwd = async () => {
    if (!account || !networkId) return;
    const web3 = window.web3;

    const data = RWD.networks[networkId];
    if (data) {
      const rwd = await new web3.eth.Contract(RWD.abi, data.address);

      const balance = await rwd.methods.balanceOf(account).call();
      setBalance((prev) => ({ ...prev, rwd: balance }));

      setContracts((prev) => ({ ...prev, rwd }));
    }
  };

  const loadDecentralBank = async () => {
    if (!account || !networkId) return;
    const web3 = window.web3;

    const data = DecentralBank.networks[networkId];
    if (data) {
      const decentralBank = await new web3.eth.Contract(
        DecentralBank.abi,
        data.address
      );

      const balance = await decentralBank.methods
        .stakingBalance(account)
        .call();

      setBalance((prev) => ({ ...prev, staking: balance }));

      setContracts((prev) => ({ ...prev, decentralBank }));
    }
  };

  const stakeTokens = async (amount) => {
    await contracts.tether.methods
      .approve(contracts.decentralBank._address, Web3.utils.toWei(amount))
      .send({ from: account });
    await contracts.decentralBank.methods
      .depositTokens(Web3.utils.toWei(amount, "Ether"))
      .send({ from: account })
      .on("transactionHash", (hash) => {});

    const tetherBalance = await contracts.tether.methods
      .balanceOf(account)
      .call();

    const stakingBalance = await contracts.decentralBank.methods
      .stakingBalance(account)
      .call();

    setBalance((prev) => ({
      ...prev,
      tether: tetherBalance,
      staking: stakingBalance,
    }));
  };

  const unstakeToken = async () => {
    await contracts.decentralBank.methods
      .unstakeToken()
      .send({ from: account })
      .on("transactionHash", (hash) => {});

    const tetherBalance = await contracts.tether.methods
      .balanceOf(account)
      .call();

    setBalance((prev) => ({
      ...prev,
      tether: tetherBalance,
      staking: "0",
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadTether();
    loadRwd();
    loadDecentralBank();
  }, [networkId]);

  return (
    <WalletContext.Provider
      value={{
        isLoading,
        account,
        balance,
        stakeTokens,
        unstakeToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
