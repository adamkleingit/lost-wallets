const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
const fs = require('fs');

const LostWallets = require('../build/LostWallets');

const provider = new HDWalletProvider(
  'badge plastic action tool fashion carry shove problem hedgehog secret open inhale',
  'https://rinkeby.infura.io/zzz'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting deploy from account:', accounts[0]);

  const result = await new web3.eth.Contract(LostWallets.abi)
    .deploy({ data: LostWallets.bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'build', 'address.json'),
    JSON.stringify(result.options.address),
    'utf-8'
  );

  fs.writeFileSync(
    path.resolve(
      __dirname,
      '../../',
      'client/src/lost-wallets-contract/build',
      'address.json'
    ),
    JSON.stringify(result.options.address),
    'utf-8'
  );

  fs.writeFileSync(
    path.resolve(
      __dirname,
      '../../',
      'server/src/lost-wallets-contract/build',
      'address.json'
    ),
    JSON.stringify(result.options.address),
    'utf-8'
  );
};

deploy();
