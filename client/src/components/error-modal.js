// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { capitalize } from 'lodash/fp';

import type { State } from 'types/redux.types';

import { Header, Image, Modal } from 'semantic-ui-react';

type ConnectedProps = {
  open: boolean,
  type: string,
  header: string,
  message: string
};
type OwnProps = {};

class ErrorModal extends React.Component<ConnectedProps & OwnProps> {
  render() {
    const { open, type, header, message } = this.props;

    return (
      <Modal dimmer="inverted" open={open}>
        <Modal.Header>{`${capitalize(type)} Error`}</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={require(`assets/images/metamask.png`)}
          />
          <Modal.Description>
            <TextContainer>
              <Header>{header}</Header>
              <p>{message}</p>
            </TextContainer>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const TextContainer = styled.div`
  text-align: center;
`;

const mapStateToProps = (state: State) => ({
  open: state.errorModal.open,
  type: state.errorModal.type,
  header: state.errorModal.header,
  message: state.errorModal.message
});

export default connect(mapStateToProps)(ErrorModal);
