// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import type { State } from 'types/redux.types';
import type { Game } from 'types/games.types';

import { getGame } from 'selectors/games.selector';
import { getUsersWithAwards } from 'selectors/game.selectors';

type ConnectedProps = {|
  game: Game,
  awardees: { [key: string]: string },
  user: string
|};

type OwnProps = {
  gameId: number
};

class AwardsTable extends React.Component<ConnectedProps & OwnProps> {
  renderGems = (amount: number) => {
    const gems = [];

    for (let i = 0; i < amount; i++) {
      gems.push(<i className="far fa-gem" key={i} />);
    }

    return gems;
  };

  renderRow = (index: number, answerLength: number) => {
    const { game, awardees, user } = this.props;

    if (!game) {
      return;
    }

    const { potentialAwards, balance } = game;
    const percent = potentialAwards[(answerLength - index).toString()];
    const amount = parseFloat((Number(balance) * percent / 100).toFixed(5));
    const awardeeAddress = awardees[(answerLength - index).toString()];
    const awardee = awardeeAddress
      ? awardeeAddress === user
        ? 'YOU➔'
        : `${awardeeAddress.slice(0, 3)}...${awardeeAddress.slice(-3)}➔`
      : '';

    return (
      <React.Fragment>
        <Grid.Column width="3" textAlign="right">
          <ColumnContent currentUser={awardeeAddress === user}>
            {awardee}
          </ColumnContent>
        </Grid.Column>

        <Grid.Column width="5">
          <ColumnContent currentUser={awardeeAddress === user}>
            {this.renderGems(answerLength - index)}
          </ColumnContent>
        </Grid.Column>

        <Grid.Column width="2">
          <ColumnContent
            currentUser={
              awardeeAddress === user
            }>{`${percent}%`}</ColumnContent>
        </Grid.Column>

        <Grid.Column width="2">
          <ColumnContent currentUser={awardeeAddress === user}>
            {<b>{amount}</b>}{' '}
          </ColumnContent>
        </Grid.Column>
      </React.Fragment>
    );
  };

  renderRows = (answerLength: number) => {
    const rows = [];

    for (let i = 0; i < answerLength; i++) {
      rows.push(<Grid.Row key={i}>{this.renderRow(i, answerLength)}</Grid.Row>);
    }

    return rows;
  };

  render() {
    const { answerLength } = this.props.game;

    return (
      <Grid centered>
        <React.Fragment>
          <Title>Discoveries</Title>
          {this.renderRows(answerLength)}
        </React.Fragment>
      </Grid>
    );
  }
}

const ColumnContent = styled.div`
  color: ${({ currentUser, theme }) =>
    currentUser ? theme.lightBlue : 'black'};
`;

const Title = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
`;

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  game: getGame(state, ownProps.gameId),
  awardees: getUsersWithAwards(state),
  user: state.user.account
});

export default connect(mapStateToProps)(AwardsTable);
