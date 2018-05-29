pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract LostWallets is Ownable {
    using SafeMath for uint;

    struct Game {
        uint id;
        uint balance;
        uint guessPrice;
    }

    event Guess(uint _gameId, string _answer, address _user);

    mapping(uint => Game) public games;
    uint public maxPaymentPercent = 150;
    uint public guessPriceIncrement = 100000000000000; // 0.0001 ETH

    modifier gameExists(uint _gameId) {
        require(games[_gameId].id == _gameId);
        _;
    }

    function() public payable { }

    function createGame(uint _gameId, uint _balance, uint _guessPrice) external onlyOwner {
        // require that there is still no game with such id
        require(games[_gameId].id == 0);

        games[_gameId] = Game({
            id: _gameId,
            balance: _balance,
            guessPrice: _guessPrice
            });
    }

    function guess(uint _gameId, string _answer) external payable gameExists(_gameId) {
        require(games[_gameId].guessPrice == msg.value);
        require(!isContract(msg.sender));

        emit Guess(_gameId, _answer, msg.sender);
        games[_gameId].guessPrice += guessPriceIncrement;
        owner.transfer(msg.value);
    }

    function setGuessPrice(uint _gameId, uint _guessPrice) external onlyOwner gameExists(_gameId) {
        games[_gameId].guessPrice = _guessPrice;
    }

    function getGuessPrice(uint _gameId) external view gameExists(_gameId) returns(uint) {
        return games[_gameId].guessPrice;
    }

    function setGuessPriceIncrement(uint _increment) public onlyOwner {
        guessPriceIncrement = _increment;
    }

    function isContract(address userAddress) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(userAddress) }
        return size > 0;
    }

    function claimPot(uint _gameId, address[] _winners, uint[] _awards) public onlyOwner gameExists(_gameId)
    {
        require(!isContract(msg.sender));
        require(_winners.length == _awards.length);

        uint totalPayment = 0;
        uint maxPayment = games[_gameId].balance.mul(maxPaymentPercent).div(100);

        for(uint i = 0; i < _winners.length; i++) {
            totalPayment = totalPayment.add(_awards[i]);
            _winners[i].transfer(_awards[i]);
        }

        require(totalPayment <= maxPayment);
    }
}
