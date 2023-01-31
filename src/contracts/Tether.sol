pragma solidity ^0.5.0;

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens + 18 decimal place
    uint8 public decimals = 18;
}
