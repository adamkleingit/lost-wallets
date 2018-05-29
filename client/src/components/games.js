// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from 'styled-components';

import * as gamesActions from 'actions/games.actions';
import { isLoadingSelector } from 'selectors/network.selectors';

import type { State } from 'types/redux.types';
import type { Game, GamesMap } from 'types/games.types';
import type { BrowserHistory } from 'history/createBrowserHistory';

type ConnectedProps = {
  games: GamesMap,
  isLoading: boolean,
  fetchGames: () => void
};

type OwnProps = {
  history: BrowserHistory
};

/*
* Games component pulling data from server on mount
*/
export class Games extends React.Component<ConnectedProps & OwnProps> {
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchGames();
  };

  onGameSelect = (game: Game) => {
    const { history } = this.props;

    history.push(`game/${game.id}`);
  };

  renderGame = (game: Game) => (
    <StyledGame key={game.id} onClick={() => this.onGameSelect(game)}>
      <h4>{game.name}</h4>
      <p>{game.description}</p>
      <StyledLogo src={game.imgUrl} alt="Game logo" />
    </StyledGame>
  );

  renderGames = () => {
    const { games } = this.props;

    return <div>{values(games).map(this.renderGame)}</div>;
  };

  render() {
    const { isLoading } = this.props;

    return (
      <StyledContainer>
        <StyledRefresh
          src="https://www.materialui.co/materialIcons/navigation/refresh_grey_192x192.png"
          alt="refresh"
          onClick={this.refresh}
        />
        <h2>Games:</h2>
        {isLoading ? <div>loading...</div> : this.renderGames()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding: 50px;
`;

const StyledRefresh = styled.img`
  cursor: pointer;
  float: left;
  width: 35px;
`;

export const StyledGame = styled.div`
  display: inline-block;
  padding: 15px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px;
  cursor: pointer;
`;

const StyledLogo = styled.img`
  height: 70px;
  width: 70px;
`;

const mapStateToProps = (state: State) => ({
  games: state.games.list,
  isLoading: isLoadingSelector(state, gamesActions.GAMES_LABEL)
});

export default connect(mapStateToProps, {
  fetchGames: gamesActions.fetchGames
})(Games);
