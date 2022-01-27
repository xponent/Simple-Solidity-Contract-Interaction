const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const enableButton = document.getElementById('enableMM');
const setMessageButton = document.getElementById('setMessageButton');
const address = document.getElementById('address');

let userAccount;
let web3;

async function enableMeta() {
    let accounts = await ethereum.request({method: 'eth_requestAccounts'});
    enableButton.disabled = true;
    enableButton.innerText = 'Connected';
    userAccount = accounts[0].toString();
    address.innerText = userAccount;
}
async function setMessage() {
    let input = document.getElementById('userInput').value;
    console.log(`pre enable check: ${input}`);
    if (ethereum.isConnected()) {
        console.log(`post enable check: ${input}`);
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
            ], '0x71b6A538b69E5648644a1516321d23FE3b2AA740'
        );
        contract.methods.setMessage(input).send({from: userAccount.toString()}).on('receipt', function () {
            address.innerText = `Your message "${input}" was posted to the blockchain!`;
        })

    }
    // TODO: Set message via the Solidity contract.
}

enableButton.addEventListener('click', function () {
    enableMeta();
});
setMessageButton.addEventListener('click', function () {
    setMessage();
})

