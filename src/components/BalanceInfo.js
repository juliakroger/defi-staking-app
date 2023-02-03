import Web3 from "web3";

const BalanceInfo = ({ title, amount, coin }) => {
  return (
    <div
      className="w-full p-2 bg-gray-900 rounded-lg mb-2 flex items-center gap-2 justify-between shadow"
      style={{
        background: "linear-gradient(to right, #313d5c, #3d2a54)",
      }}
    >
      <div className="text-sm font-bold">{title}</div>
      <div className="font-bold text-[#9A6AFF]">
        {Web3.utils.fromWei(amount)} {coin}
      </div>
    </div>
  );
};

export default BalanceInfo;
