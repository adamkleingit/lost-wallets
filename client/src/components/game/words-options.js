// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { upperCase, includes } from 'lodash/fp';
import { Grid } from 'semantic-ui-react';

import type { Option, OptionsMap } from 'types/game.types';
import type { State } from 'types/redux.types';
import type { Game } from 'types/games.types';

import * as gameActions from 'actions/game.actions';

import Word from 'components/game/word';

import { isGameHacked } from 'selectors/game.selectors';
import { getGame } from 'selectors/games.selector';

type ConnectedProps = {
  selectOption: (option: Option, answerLength: number) => void,
  selectedOptions: OptionsMap,
  colors: {
    [key: string]: string
  },
  game: Game,
  gameHacked: boolean,
  hackProcessing: boolean
};

type OwnProps = {
  gameId: number,
  hackProcessing: boolean
};

class WordsOptions extends React.Component<ConnectedProps & OwnProps> {
  handleWordClick = (isSelected, option) => {
    const { selectOption, game } = this.props;

    if (isSelected) {
      return;
    }

    selectOption(option, game.answerLength);
  };

  renderGrid = () => {
    const { game, selectedOptions, colors } = this.props;

    return (
      <Grid columns={5} padded>
        {game.options.map(option => {
          const isSelected = includes(option, selectedOptions);

          return (
            <Grid.Column key={option}>
              <Word
                backgroundColor={!isSelected ? colors[option] : 'white'}
                clickable={!isSelected}
                onClick={() => this.handleWordClick(isSelected, option)}>
                {upperCase(option)}
              </Word>
            </Grid.Column>
          );
        })}
      </Grid>
    );
  };

  renderMessage = type => {
    let header;
    let text;

    switch (type) {
      case 'hackProcessing':
        header = 'Hack attempt processing!';
        text =
          'Your passphrase was sent to the blockchain for verification. This could take a few minutes.';
        break;

      case 'gameHacked':
        header = 'The wallet was hacked!';
        text = 'To receive you award click on Claim Pot button.';
        break;

      default:
        header = '';
        text = '';
    }

    return (
      <Message>
        <h2>{header}</h2>
        <Text>{text}</Text>
      </Message>
    );
  };

  render() {
    const { hackProcessing, gameHacked } = this.props;

    return (
      <Container>
        {hackProcessing
          ? this.renderMessage('hackProcessing')
          : gameHacked ? this.renderMessage('gameHacked') : this.renderGrid()}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.lightBlue};
`;

const Text = styled.div`
  size: 18px;
  line-height: 1.33;
  color: rgba(0, 0, 0, 0.6);
`;
const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const game = getGame(state, ownProps.gameId);

  return {
    selectedOptions: state.game.selectedOptions,
    colors: state.game.colors,
    game,
    gameHacked: isGameHacked(state, game.answerLength)
  };
};

export default connect(mapStateToProps, {
  selectOption: gameActions.selectOption
})(WordsOptions);
