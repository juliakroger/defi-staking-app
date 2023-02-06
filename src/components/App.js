import { useContext } from "react";
import NavBar from "./NavBar";
import { WalletContext } from "../providers/WalletContext";
import BalanceInfo from "./BalanceInfo";
import Loader from "./Loader";
import StakeCard from "./StakeCard";

const App = () => {
  const { account, balance, isLoading, stakeTokens, unstakeToken, airdrop } =
    useContext(WalletContext);

  return (
    <div className="w-screen p-4 lg:p-14 flex flex-col items-center">
      <NavBar account={account} />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="md:mt-6 px-10 w-[600px]">
          <div className="lg:flex gap-2 justify-center mt-10">
            <BalanceInfo
              title="Staking Balance"
              amount={balance.staking}
              coin="USDT"
            />
            <BalanceInfo
              title="Reward Balance"
              amount={balance.rwd}
              coin="RWD"
            />
          </div>

          <StakeCard
            balance={balance}
            stakeTokens={stakeTokens}
            unstakeToken={unstakeToken}
            stakingBalance={balance.staking}
            airdrop={airdrop}
          />
        </div>
      )}
    </div>
  );
};

export default App;
