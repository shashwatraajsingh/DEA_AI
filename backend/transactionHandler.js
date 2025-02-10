require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function getBalance(walletAddress) {
    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance) + " ETH";
}

async function sendTransaction(to, amount) {
    const tx = await wallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount),
    });
    return tx.hash;
}

// Simulated scheduling (backend timer)
async function scheduleTransaction(to, amount, time) {
    const delay = new Date(time).getTime() - Date.now();
    if (delay <= 0) return { error: "Invalid time" };

    setTimeout(async () => {
        await sendTransaction(to, amount);
        console.log(`Sent ${amount} ETH to ${to}`);
    }, delay);

    return { message: `Transaction scheduled for ${time}` };
}

module.exports = { getBalance, sendTransaction, scheduleTransaction };
