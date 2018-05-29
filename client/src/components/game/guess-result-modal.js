// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

type ConnectedProps = {};
type OwnProps = {|
  showModal: boolean,
  matches: number,
  exact: number,
  answerLength: number,
  onClick: () => void
|};

class GuessResultModal extends React.Component<ConnectedProps & OwnProps> {
  renderModalContent = () => {
    const { matches, exact, answerLength } = this.props;

    return exact === answerLength ? (
      <React.Fragment>
        <ModalTitle>The wallet was hacked!</ModalTitle>
        <div>
          <b>Congratulations! You have successfully hacked the wallet!</b>
        </div>
        <div>Your award will be processed in 24 hours</div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <ModalTitle>The blockchain has spoken!</ModalTitle>
        <div>You found:</div>
        <div>
          <b>{matches}</b> matches with
          <br />
          <b>{exact}</b> exact location!
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { showModal, onClick } = this.props;

    return (
      <StyledModal open={showModal} dimmer="inverted" size="mini">
        <Modal.Content>
          <ContentContainer>{this.renderModalContent()}</ContentContainer>
          <ModalButton onClick={onClick}>Got it!</ModalButton>
        </Modal.Content>
      </StyledModal>
    );
  }
}

const StyledModal = styled(Modal)`
  border: solid 2px ${({ theme }) => theme.lightBlue} !important;
  box-shadow: 0 0 50px -3px ${({ theme }) => theme.lightBlue}!important;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.lightBlue};
`;

const ContentContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  color: white;
  background-color: ${({ theme }) => theme.lightBlue};
  font-size: 18px;
  cursor: pointer;
  margin: 0 auto;
`;

export default GuessResultModal;
