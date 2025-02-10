// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIWallet {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function sendETH(address payable to, uint amount) external {
        require(msg.sender == owner, "Only AI Agent can send funds.");
        require(address(this).balance >= amount, "Not enough ETH.");
        to.transfer(amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
