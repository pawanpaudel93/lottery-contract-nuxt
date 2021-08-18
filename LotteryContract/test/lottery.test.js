// mocha test
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let lottery;
beforeEach(async () => {
    // Get a list of all accoubts
    accounts = await web3.eth.getAccounts();
    // Use one of your accounts to create a contract
    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: 1000000 });
});

describe('Lottery', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });
    it('allows account to enter', async () => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.02', 'ether') });
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
        assert.equal(accounts[0], players[0]);
        assert.equal(players.length, 1);
    });
    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('0.02', 'ether') });
        await lottery.methods.enter().send({ from: accounts[1], value: web3.utils.toWei('0.02', 'ether') });
        await lottery.methods.enter().send({ from: accounts[2], value: web3.utils.toWei('0.02', 'ether') });
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(players.length, 3);
    });
    it("requires a minumum amount of ther to enter", async () => {
        try {
            await lottery.methods.enter().send({ from: accounts[0], value: 200 });
            assert(false);
        } catch (err) {
            assert.ok(err)
        }
    })
    it("only manager can call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            })
            assert(false);
        } catch (err) {
            assert.ok(err)
        }
    })
    it('sends money to the winner and resets winner array', async () => {
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei('2', 'ether') });
        await lottery.methods.pickWinner().send({ from: accounts[0] })
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = initialBalance - finalBalance;
        assert(difference < web3.utils.toWei('1.8', 'ether'))
    })
});