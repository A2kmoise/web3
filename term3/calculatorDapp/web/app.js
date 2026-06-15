const contractABI = [
    {
        "inputs": [
            { "internalType": "int256", "name": "a", "type": "int256" },
            { "internalType": "int256", "name": "b", "type": "int256" }
        ],
        "name": "add",
        "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "int256", "name": "a", "type": "int256" },
            { "internalType": "int256", "name": "b", "type": "int256" }
        ],
        "name": "divide",
        "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "int256", "name": "a", "type": "int256" },
            { "internalType": "int256", "name": "b", "type": "int256" }
        ],
        "name": "multiply",
        "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "int256", "name": "a", "type": "int256" },
            { "internalType": "int256", "name": "b", "type": "int256" }
        ],
        "name": "subtract",
        "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
        "stateMutability": "pure",
        "type": "function"
    }
];

//deployed contract address
const contractAddress = "0x31732439466EFE367231a7d7cd502d49f513392b"; 

let web3;
let calculatorContract;

const connectWalletBtn = document.getElementById('connectWallet');
const statusDiv = document.getElementById('status');
const resultSpan = document.getElementById('result');

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        calculatorContract = new web3.eth.Contract(contractABI, contractAddress);
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            statusDiv.innerText = `Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
            connectWalletBtn.style.display = 'none';
        } catch (error) {
            statusDiv.innerText = "Connection failed.";
            console.error(error);
        }
    } else {
        statusDiv.innerText = "Please install MetaMask.";
    }
}

connectWalletBtn.addEventListener('click', init);

async function calculate(operation) {
    if (!calculatorContract) {
        alert("Please connect wallet first.");
        return;
    }

    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    if (num1 === "" || num2 === "") {
        alert("Please enter both numbers.");
        return;
    }

    if (contractAddress === "0x0000000000000000000000000000000000000000") {
        alert("Please update the contractAddress in app.js with your deployed contract.");
        return;
    }

    try {
        let result;
        statusDiv.innerText = "Calculating...";
        
        if (operation === 'add') {
            result = await calculatorContract.methods.add(num1, num2).call();
        } else if (operation === 'subtract') {
            result = await calculatorContract.methods.subtract(num1, num2).call();
        } else if (operation === 'multiply') {
            result = await calculatorContract.methods.multiply(num1, num2).call();
        } else if (operation === 'divide') {
            result = await calculatorContract.methods.divide(num1, num2).call();
        }

        resultSpan.innerText = result;
        statusDiv.innerText = "Calculation successful.";
    } catch (error) {
        console.error(error);
        statusDiv.innerText = "Error in calculation.";
        alert(error.message);
    }
}
