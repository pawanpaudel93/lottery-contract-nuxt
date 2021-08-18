import Web3 from 'web3';

export default async ({ app }, inject) => {
    if (process.client) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.send('eth_requestAccounts');
        inject('web3', web3);
    }
}