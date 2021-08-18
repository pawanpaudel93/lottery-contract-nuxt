const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider("profit winter swear buzz quiz way winner museum what harbor humble shrimp", "https://rinkeby.infura.io/v3/1a015349dd084f5ab88f3f6d8d881a0b")
const web3 = new Web3(provider);

const { abi, evm } = require('./compile');

const deploy = async () => {
    accounts = await web3.eth.getAccounts();
    console.log("Attempting to deplt from account: ", accounts[0])
    const result = await new web3.eth.Contract(abi).deploy({
        data: evm.bytecode.object,
    }).send({ from: accounts[0], gas: 1000000 });
    console.log(abi);
    console.log("Deployed contract at address: ", result.options.address);
}
deploy();