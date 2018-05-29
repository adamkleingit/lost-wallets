// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { upperCase } from 'lodash/fp';

import Word from 'components/game/word';

import type { State } from 'types/redux.types';
import type { Guesses } from 'types/game.types';

import { getGame } from 'selectors/games.selector';

type ConnectedProps = {
  guesses: Guesses,
  colors: Array<string>,
  user: string,
  answerLength: number
};

type OwnProps = {
  gameId: number
};

class GuessesTable extends React.Component<ConnectedProps & OwnProps> {
  renderHeader = () => (
    <Header>
      <Grid>
        <Grid.Column width={4} key="user">
          User
        </Grid.Column>
        <Grid.Column width={8} key="answer">
          Combo
        </Grid.Column>
        <Grid.Column width={2} key="matches">
          Match
        </Grid.Column>
        <Grid.Column width={2} key="exact">
          Exact
        </Grid.Column>
      </Grid>
    </Header>
  );

  renderAnswer = (answer, isHacked) => (
    <AnswerContainer isHacked={isHacked}>
      {answer.map(word => (
        <Word
          key={word}
          backgroundColor={this.props.colors[word]}
          clickable={false}
          onClick={() => {}}>
          {upperCase(word)}
        </Word>
      ))}
    </AnswerContainer>
  );

  renderRow = guess => {
    const { user, answer, matches, exact } = guess;
    const isCurrentUser = user === this.props.user;
    const isHacked = exact === this.props.answerLength;

    return (
      <React.Fragment>
        <Grid.Column verticalAlign="middle" textAlign="center" width={4}>
          <StyledUser isCurrentUser={isCurrentUser}>
            {isCurrentUser ? 'YOU' : user}
          </StyledUser>
        </Grid.Column>

        <Grid.Column verticalAlign="middle" textAlign="center" width={8}>
          {this.renderAnswer(answer, isHacked)}
        </Grid.Column>

        <Grid.Column verticalAlign="middle" textAlign="center" width={2}>
          {matches}
        </Grid.Column>

        <Grid.Column verticalAlign="middle" textAlign="center" width={2}>
          {exact}
        </Grid.Column>
      </React.Fragment>
    );
  };

  renderTable = () => {
    const { guesses } = this.props;

    if (!guesses) {
      return;
    }

    return guesses.map((guess, index) => (
      <Grid.Row stretched key={index}>
        {this.renderRow(guess)}
      </Grid.Row>
    ));
  };

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Grid columns="equal">{this.renderTable()}</Grid>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #c0bab3;
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border: ${({ isHacked }) => (isHacked ? '3px solid red' : 'none')};
`;

const StyledUser = styled.div`
  font-size: 13px;
  color: ${({ isCurrentUser, theme }) =>
    isCurrentUser ? theme.lightBlue : 'rgba(0, 0, 0, 0.45)'};
  font-weight: ${({ isCurrentUser }) => (isCurrentUser ? 'bold' : 'default')};
`;

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  guesses: state.game.guesses,
  colors: state.game.colors,
  user: state.user.account,
  answerLength: getGame(state, ownProps.gameId).answerLength
});

export default connect(mapStateToProps)(GuessesTable);
