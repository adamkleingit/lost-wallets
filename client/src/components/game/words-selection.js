// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { upperCase } from 'lodash/fp';
import { SyncLoader } from 'react-spinners';

import type { State } from 'types/redux.types';
import type { Options, Guesses } from 'types/game.types';
import type { Game } from 'types/games.types';

import { isArrayFull } from 'utils/words-selection.utils';

import * as gameActions from 'actions/game.actions';
import * as wordsSelectionActions from 'actions/words-selection.actions';

import Word from 'components/game/word';

import { getGame } from 'selectors/games.selector';
import { isGameHacked } from 'selectors/game.selectors';

type ConnectedProps = {
  selectedOptions: Options,
  unselectOption: number => void,
  guess: (number, string, number) => void,
  colors: {
    [key: string]: string
  },
  guesses: Guesses,
  game: Game,
  gameHacked: boolean,
  guessPrice: number
};

type OwnProps = {
  gameId: number,
  hackProcessing: boolean
};

class WordsSelection extends React.Component<ConnectedProps & OwnProps> {
  handleHackClick = () => {
    const { selectedOptions, game, gameId, guess, guessPrice } = this.props;

    if (isArrayFull(selectedOptions, game.answerLength)) {
      guess(gameId, JSON.stringify(selectedOptions), guessPrice);
    }
  };

  renderSelectionCells = () => {
    const {
      game,
      selectedOptions,
      unselectOption,
      colors,
      hackProcessing
    } = this.props;
    const cells = [];

    for (let i = 0; i < game.answerLength; i++) {
      const option = selectedOptions[i];

      cells.push(
        option ? (
          <Word
            key={i}
            backgroundColor={colors[option]}
            clickable={hackProcessing ? false : true}
            disabled={hackProcessing}
            onClick={() => unselectOption(i)}>
            {upperCase(option)}
          </Word>
        ) : (
          <EmptyCell key={i} />
        )
      );
    }

    return cells;
  };

  render() {
    const {
      selectedOptions,
      game,
      hackProcessing,
      gameHacked,
      guessPrice
    } = this.props;

    return (
      !gameHacked && (
        <Container>
          {this.renderSelectionCells()}
          <HackButtonContainer>
            {!hackProcessing ? (
              <HackButton
                enabled={isArrayFull(selectedOptions, game.answerLength)}
                onClick={this.handleHackClick}>
                <Hack>
                  <Icon className="fas fa-bolt" />
                  HACK
                </Hack>
                <Price>ETH {guessPrice}</Price>
              </HackButton>
            ) : (
              <SyncLoader color="gray" size={10} loading />
            )}
          </HackButtonContainer>
        </Container>
      )
    );
  }
}

const Container = styled.div`
  padding: 20px;
  border: 2px solid gray;
  display: flex;
  flex-direction: row;
`;

const EmptyCell = styled.div`
  width: 180px;
  height: 50px;
  margin-right: 20px;
  border: 1px dashed gray;
`;
const HackButtonContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HackButton = styled.div`
  height: 50px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  user-select: none;
  background-color: ${({ enabled, theme }) =>
    enabled ? theme.lightBlue : '#e5e5e5'};
  box-shadow: ${({ enabled, theme }) =>
    enabled ? `0 0 50px -3px ${theme.lightBlue}` : 'none'};
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'default')};
  opacity: ${({ enabled }) => (enabled ? 1 : 0.7)};
  pointer-events: ${({ enabled }) => (enabled ? 'default' : 'none')};
  letter-spacing: -0.4px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;

const Hack = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: white;
`;

const Icon = styled.i`
  color: white;
  margin-right: 5px;
`;

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const game = getGame(state, ownProps.gameId);

  return {
    selectedOptions: state.game.selectedOptions,
    colors: state.game.colors,
    guesses: state.game.guesses,
    game,
    gameHacked: isGameHacked(state, game.answerLength),
    guessPrice: state.game.guessPrice
  };
};

export default connect(mapStateToProps, {
  unselectOption: gameActions.unselectOption,
  guess: wordsSelectionActions.guess
})(WordsSelection);
