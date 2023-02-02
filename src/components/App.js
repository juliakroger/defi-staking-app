import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Web3 from "web3";

const App = () => {
  const [account, setAccount] = useState("");

  const web3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non ethereum browser detected. You should consider Metamask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    web3();
    loadBlockchainData();
  }, []);

  return (
    <div className="w-screen lg:p-14">
      <NavBar account={account} />
    </div>
  );
};

export default App;
