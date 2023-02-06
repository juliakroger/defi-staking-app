import { useEffect, useState } from "react";
import { formatCountdown } from "../utils/formatCountdown";

const START_TIME = "10";

const Airdrop = ({ callback }) => {
  const [isCounting, setIsCounting] = useState(true);
  const [counter, setCounter] = useState(START_TIME);

  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        if (counter > 0) setCounter(counter - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [counter, isCounting]);

  useEffect(() => {
    if (counter === 0) {
      setIsCounting(false);
    }
  }, [counter]);

  return (
    <div className="flex flex-col items-center mt-6 gap-1">
      <button
        disabled={isCounting}
        className="underline text-sky-500 disabled:text-gray-500"
        onClick={() => {
          callback();
        }}
      >
        Airdrop
      </button>

      <div className="font-bold">{formatCountdown(counter)}</div>
    </div>
  );
};

export default Airdrop;
