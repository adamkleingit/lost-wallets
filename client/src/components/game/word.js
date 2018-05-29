// @flow
import * as React from 'react';
import styled from 'styled-components';

type OwnProps = {
  clickable: boolean,
  backgroundColor: string,
  disabled?: boolean,
  onClick: () => void,
  children: React.Node
};

const Word: React.ComponentType<OwnProps> = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  user-select: none;
  width: 180px;
  height: 50px;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

export default Word;
