// @flow
import React from 'react';

import WordsOptions from 'components/game/words-options';
import WordsSelection from 'components/game/words-selection';
import HowToPlay from 'components/game/how-to-play';

type OwnProps = {|
  gameId: number,
  hackProcessing: boolean
|};

export default class WordsTable extends React.Component<OwnProps> {
  render() {
    const { gameId, hackProcessing } = this.props;

    return (
      <div>
        <HowToPlay />
        <WordsOptions gameId={gameId} hackProcessing={hackProcessing} />
        <WordsSelection gameId={gameId} hackProcessing={hackProcessing} />
      </div>
    );
  }
}
