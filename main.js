const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const enableButton = document.getElementById('enableMM');
const setMessageButton = document.getElementById('setMessageButton');
const address = document.getElementById('address');

const contractAddress = '0xeF8c71AEA425BB2Ae8465B9351c44c8744Cdc088';

let userAccount;
let web3;

async function enableMeta() {
    let accounts = await ethereum.request({method: 'eth_requestAccounts'});
    if (ethereum.isConnected()) {
        enableButton.disabled = true;
        enableButton.innerText = 'Connected';
        userAccount = accounts[0].toString();
        address.innerText = userAccount;
    }
}
async function setMessage() {
    let input = document.getElementById('userInput').value;
    if (ethereum.isConnected()) {
        Contract.setProvider(window.ethereum);
        let contract = new Contract(
            [
                {
                    "inputs": [],
                    "name": "getMessage",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "x",
                            "type": "string"
                        }
                    ],
                    "name": "setMessage",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ], contractAddress
        );
        contract.methods.setMessage(input).send({from: userAccount}).on('receipt', function () {
            address.innerText = `Your message "${input}" was posted to the blockchain!`;
        })
    }
}

enableButton.addEventListener('click', function () {
    enableMeta();
});
setMessageButton.addEventListener('click', function () {
    setMessage();
})

