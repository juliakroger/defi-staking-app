pragma solidity ^0.5.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;

    RWD public rwd;
    Tether public tether;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // Staking function (depositing tether token to the decentral bank for staking)
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Ammount cannot be 0");

        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Issue Rewards Tokens
    function issueTokens() public {
        require(msg.sender == owner);

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            // 10% reward to incentive
            uint256 reward = stakingBalance[recipient] / 10;

            // Prevent of sending 0 tokens
            if (reward > 0) {
                rwd.transfer(recipient, reward);
            }
        }
    }
}
