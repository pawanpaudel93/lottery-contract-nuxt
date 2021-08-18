const path = require('path');
const solc = require('solc');
const fs = require('fs');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}
const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts["Lottery.sol"]["Lottery"];
// fs.writeFileSync(path.resolve(__dirname, 'build', 'inbox.json'), JSON.stringify(contract, null, 2));
module.exports = contract