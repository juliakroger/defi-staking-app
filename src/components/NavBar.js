import formatAddress from "../utils/formatAddress";

const NavBar = ({ account }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <img
          alt="logo"
          width={70}
          src="https://miro.medium.com/max/720/1*76NpL3ARvYgM6nJMEWSKDg.webp"
        />
      </div>

      <div className="flex items-center text-sm gap-2"></div>

      <button
        onClick={() => {
          if (!account) {
          }
        }}
        className="p-2 px-4 bg-gray-900 rounded-lg mb-2 flex gap-4 font-bold"
        style={{
          background: "linear-gradient(to right, #9A6AFF, rgb(0, 209, 255))",
        }}
      >
        {formatAddress(account) || "Connect with Metamask"}
      </button>
    </div>
  );
};

export default NavBar;
