const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: "*" // Any network (default: none)
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    "profit winter swear buzz quiz way winner museum what harbor humble shrimp",
                    "https://rinkeby.infura.io/v3/1a015349dd084f5ab88f3f6d8d881a0b"
                );
            },
            network_id: 4
        }
    },
    compilers: {
        solc: {
            version: "0.7.0"
        }
    }
};
