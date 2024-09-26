const contractAddress = "0x1ce6C9567Fa5E4C97a7DaAFF75EAE9A0F2994776"; // Your smart contract address
const abi = [ /* Add your smart contract ABI here */ ];

let web3;
let userAccount;

// Function to connect wallet
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = (await web3.eth.getAccounts())[0];
            document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Function to buy the coin
async function buyCHR() {
    const amount = document.getElementById('amount').value;
    if (!userAccount) {
        alert('Please connect your wallet first.');
        return;
    }
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        await contract.methods.buy().send({ from: userAccount, value: web3.utils.toWei(amount, 'ether') });
        alert('Purchase successful!');
    } catch (error) {
        console.error(error);
        alert('Purchase failed!');
    }
}

document.getElementById('connectButton').onclick = connectWallet;
document.getElementById('buyButton').onclick = buyCHR;
