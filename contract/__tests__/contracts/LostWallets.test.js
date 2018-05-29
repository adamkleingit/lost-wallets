const { expect } = require('chai');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const LostWallets = require('../../build/LostWallets');

const web3 = new Web3(ganache.provider());

let lostWallets;
let accounts;
const ID = '1';
const BALANCE = web3.utils.toWei('1', 'ether');
const GUESS_PRICE = web3.utils.toWei('0.1', 'ether');

describe('LostWallets', () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lostWallets = await new web3.eth.Contract(LostWallets.abi)
      .deploy({ data: LostWallets.bytecode })
      .send({ from: accounts[0], gas: '2000000' });

    await createGame(ID, BALANCE, GUESS_PRICE);
  });

  it('deploys a contract', () => {
    expect(lostWallets.options.address).to.exist;
  });

  it('owner can create the game and anybody else can not', async () => {
    // game should be created in beforeEach section
    const game = await lostWallets.methods.games(ID).call();

    expect(game.id).to.equal(ID);

    try {
      await createGame('2', BALANCE, GUESS_PRICE, accounts[1]);
    } catch (err) {
      expect(err);
      return;
    }
    expect(false).to.be.true;
  });

  it('not possible to create more than one game with the same id', async () => {
    try {
      // it will fail, because we already created the game with such id in beforeEach section
      await createGame(ID, BALANCE, GUESS_PRICE);
    } catch (err) {
      expect(err);
      return;
    }
    expect(false).to.be.true;
  });

  it('user can make a guess and eth is transferred to contract owner', async () => {
    const answer = 'some answer for the game';
    const ownerBalance = await web3.eth.getBalance(accounts[0]);

    await lostWallets.methods.guess(ID, answer).send({
      from: accounts[1],
      value: GUESS_PRICE
    });
    const newOwnerBalance = await web3.eth.getBalance(accounts[0]);

    expect(parseInt(ownerBalance) + parseInt(GUESS_PRICE)).to.equal(
      parseInt(newOwnerBalance)
    );
  });

  it('user can not make a guess with wrong guessPrice', async () => {
    const answer = 'some answer for the game';
    const reducedGuessPrice = (parseInt(GUESS_PRICE) - 100).toString();

    try {
      await lostWallets.methods.guess(ID, answer).send({
        from: accounts[1],
        value: reducedGuessPrice
      });
    } catch (err) {
      expect(err);
      return;
    }
    expect(false).to.be.true;
  });

  it('owner can claim pot and every awardee gets his award', async () => {
    const winners = [accounts[1], accounts[2], accounts[3]];
    const initBalances = [
      await web3.eth.getBalance(winners[0]),
      await web3.eth.getBalance(winners[1]),
      await web3.eth.getBalance(winners[2])
    ];

    const awards = [
      web3.utils.toWei('0.1', 'ether'),
      web3.utils.toWei('0.05', 'ether'),
      web3.utils.toWei('0.01', 'ether')
    ];

    await lostWallets.methods
      .claimPot(ID, winners, awards)
      .send({ from: accounts[0] });

    const newBalances = [
      await web3.eth.getBalance(winners[0]),
      await web3.eth.getBalance(winners[1]),
      await web3.eth.getBalance(winners[2])
    ];

    newBalances.forEach((newBalance, i) => {
      expect(newBalance).to.equal(
        (Number(initBalances[i]) + Number(awards[i])).toString()
      );
    });
  });

  it('not owner can not claim pot', async () => {
    const winners = [accounts[1], accounts[2], accounts[3]];
    const awards = ['100000', '100000', '100000'];
    try {
      await lostWallets.methods
        .claimPot(ID, winners, awards)
        .send({ from: accounts[1] });
    } catch (err) {
      expect(err);
      return;
    }
    expect(false).toBeTruthy();
  });
});

const createGame = async (id, balance, guessPrice, account = accounts[0]) => {
  await lostWallets.methods.createGame(id, balance, guessPrice).send({
    from: account,
    gas: '1000000'
  });

  // Fill contract with init balance
  await web3.eth.sendTransaction({
    from: account,
    to: lostWallets.options.address,
    value: web3.utils.toWei('1', 'ether')
  });
};
