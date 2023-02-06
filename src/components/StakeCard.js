import { useState } from "react";
import Web3 from "web3";
import Airdrop from "./Airdrop";

const StakeCard = ({
  balance,
  stakeTokens,
  unstakeToken,
  airdrop,
  stakingBalance,
}) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-lg md:mt-8 w-full bg-[#27262C]">
        <div
          className="text-xl rounded-t-lg text-[#9A6AFF] p-2 text-center font-bold uppercase"
          style={{
            background: "linear-gradient(to right, #3b4155, #3a3045)",
          }}
        >
          Stake Coins
        </div>

        <div className="p-6">
          <div className="text-2xl leading-7 tracking-[-0.01em] font-bold relative flex items-baseline flex-grow overflow-hidden">
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                placeholder="0.00"
                className="relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary leading-[36px] focus:placeholder:text-low-emphesis flex-grow w-full text-left bg-transparent text-inherit disabled:cursor-not-allowed"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="ml-2 text-xs px-2 border border-gray-400 bg-gray-500 hover:bg-gray-500/80 z-10 rounded uppercase font-bold h-6 flex items-center">
                max
              </button>
              <span
                style={{
                  visibility: amount.length > 18 ? "hidden" : "",
                  left: `${
                    amount.length > 3 ? (amount.length + 1) * 15 : 60
                  }px`,
                }}
                className="text-xs leading-4 font-medium text-[#F4AB36] absolute bottom-2 pointer-events-none"
              >
                ~Balance: {Web3.utils.fromWei(balance.tether)} USDT
              </span>
            </div>
          </div>

          <div className="flex gap-6 mt-8">
            <button
              onClick={() => {
                // TODO: verify everything
                stakeTokens(amount);
                setAmount("");
              }}
              className="p-2 px-4 rounded-lg text-sm font-bold w-full"
              style={{
                background:
                  "linear-gradient(to right, rgb(0, 165, 221), rgb(0, 209, 255))",
              }}
            >
              Deposit
            </button>
            <button
              onClick={() => {
                // TODO: verify everything
                unstakeToken();
              }}
              className="p-2 px-4 rounded-lg text-sm font-bold w-full"
              style={{
                background: "linear-gradient(to right, #7548C7, #4B3178)",
              }}
            >
              Withdraw
            </button>
          </div>

          {Web3.utils.fromWei(stakingBalance) > 40 ? (
            <Airdrop callback={airdrop} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
