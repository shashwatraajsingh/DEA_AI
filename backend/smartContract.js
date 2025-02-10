require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sendETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]; 
const contractAddress = "0x55a8c96dfeA03b1BcBE6415eF6b76BD571A3b752";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function sendETH(to, amount) {
    const tx = await contract.sendETH(to, ethers.parseEther(amount));
    return tx.hash;
}

async function getBalance() {
    const balance = await contract.getBalance();
    return ethers.formatEther(balance) ;
}

async function getWalletBalance(address) {
    try {
        if (!ethers.isAddress(address)) {
            return "Invalid wallet address.";
        }
        const balance = await provider.getBalance(address);
        return `${ethers.formatEther(balance)} ETH`;
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        return "Unable to retrieve balance.";
    }
}


module.exports = { sendETH, getBalance, getWalletBalance };
