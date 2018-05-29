// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';

import type { State } from 'types/redux.types';
import type { GamesMap } from 'types/games.types';
import type { TypedMatch } from 'types/common.types';
import type { Guesses } from 'types/game.types';
import type { Game as GameType } from 'types/games.types';

import * as gamesActions from 'actions/games.actions';
import * as gameActions from 'actions/game.actions';
import * as userActions from 'actions/user.actions';
import * as networkActions from 'actions/network.actions';

import Header from 'components/game/header';
import WordsTable from 'components/game/words-table';
import GuessesTable from 'components/game/guesses-table';
import AwardsTable from 'components/game/awards-table';
import GuessResultModal from 'components/game/guess-result-modal';

import { getColorsDictionary } from 'utils/game.utils';

import { isLoadingSelector } from 'selectors/network.selectors';
import { getUsersWithAwards } from 'selectors/game.selectors';
import { getGame } from 'selectors/games.selector';

import { WEB3_SEND } from 'constants/web3.constants';
import { HACK_PROCESSING } from 'constants/game.constants';

type ConnectedProps = {|
  games: GamesMap,
  fetchGames: () => void,
  fetchGuesses: number => void,
  fetchUser: () => void,
  clearGame: () => void,
  getGuessPrice: number => void,
  setColors: Object => void,
  guesses: Guesses,
  user: string,
  transactionInProcess: boolean,
  hackProcessing: boolean,
  endNetwork: string => void,
  awardees: { [key: string]: string },
  game: GameType
|};

type OwnProps = {|
  match: TypedMatch<{ params: { id: string } }>
|};

type ComponentState = {|
  showModal: boolean,
  matches: number,
  exact: number
|};

class Game extends React.Component<ConnectedProps & OwnProps, ComponentState> {
  guessesInterval: IntervalID;

  state = {
    showModal: false,
    matches: 0,
    exact: 0
  };

  componentDidMount() {
    const {
      fetchGames,
      fetchGuesses,
      fetchUser,
      match,
      getGuessPrice
    } = this.props;
    const gameId = Number(match.params.id);

    fetchGames();
    fetchGuesses(gameId);
    getGuessPrice(gameId);
    fetchUser();

    this.guessesInterval = setInterval(() => {
      fetchGuesses(gameId);
      getGuessPrice(gameId);
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    // When the games are loaded from server
    if (this.props.games !== nextProps.games) {
      const game = get(this.props.match.params.id, nextProps.games);

      if (!game) {
        return;
      }

      this.props.setColors(getColorsDictionary(game.options));
    }

    // New guess was added by current user
    if (
      this.props.guesses &&
      this.props.guesses.length < nextProps.guesses.length &&
      nextProps.guesses[0].user === nextProps.user
    ) {
      this.props.endNetwork(HACK_PROCESSING);
      this.setState({
        showModal: true,
        matches: nextProps.guesses[0].matches,
        exact: nextProps.guesses[0].exact
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.guessesInterval);
    this.props.clearGame();
  }

  render() {
    const { hackProcessing, transactionInProcess, game } = this.props;
    const { showModal, matches, exact } = this.state;

    if (!game) {
      return null;
    }

    return (
      <Container>
        <GuessResultModal
          showModal={showModal}
          matches={matches}
          exact={exact}
          answerLength={game.answerLength}
          onClick={() => this.setState({ showModal: false })}
        />
        <InfoSection>
          <Header
            imgUrl={game.imgUrl}
            name={game.name}
            description={game.description}
            balance={game.balance}
          />
          <AwardsTable gameId={game.id} />
        </InfoSection>
        <GameSection>
          <WordsTable
            gameId={game.id}
            hackProcessing={hackProcessing || transactionInProcess}
          />
          <GuessesTable gameId={game.id} />
        </GameSection>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
`;

const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  games: state.games.list,
  game: getGame(state, Number(ownProps.match.params.id)),
  guesses: state.game.guesses,
  user: state.user.account,
  transactionInProcess: isLoadingSelector(state, WEB3_SEND),
  hackProcessing: isLoadingSelector(state, HACK_PROCESSING),
  awardees: getUsersWithAwards(state)
});

export default connect(mapStateToProps, {
  fetchGames: gamesActions.fetchGames,
  fetchGuesses: gameActions.fetchGuesses,
  fetchUser: userActions.fetchUserAccount,
  clearGame: gameActions.clearGame,
  setColors: gameActions.setColors,
  endNetwork: networkActions.endNetwork,
  getGuessPrice: gameActions.getGuessPrice
})(Game);
