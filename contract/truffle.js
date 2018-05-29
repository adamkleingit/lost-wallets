const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic =
  'xxx';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: './build',
  networks: {
    test: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://rinkeby.infura.io/zzzzzzzzzzzzzzzzzz'
        );
      },
      network_id: '*'
    }
  }
};
