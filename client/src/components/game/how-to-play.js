// @flow
import React from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';

const HowToPlay = () => (
  <Container>
    <Icon className="fas fa-info-circle" />
    <Modal trigger={<Text>How to play?</Text>} dimmer="inverted" size="mini">
      <Modal.Content>Here should be some game description</Modal.Content>
    </Modal>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Text = styled.div`
  font-size: 14px;
  text-decoration: underline;
  color: ${({ theme }) => theme.lightBlue};
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.7;
  }
`;

const Icon = styled.i`
  color: ${({ theme }) => theme.lightBlue};
  margin-right: 5px;
`;

export default HowToPlay;
