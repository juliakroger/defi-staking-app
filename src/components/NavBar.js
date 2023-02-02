import React from "react";

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

      <div>{account}</div>
    </div>
  );
};

export default NavBar;
