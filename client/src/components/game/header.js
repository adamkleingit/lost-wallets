// @flow
import React from 'react';
import styled from 'styled-components';

type OwnProps = {
  imgUrl: string,
  name: string,
  description: string,
  balance: number
};

const Header = ({ imgUrl, name, description, balance }: OwnProps) => (
  <Container>
    <StyledLogo src={imgUrl} />
    <TextContainer>
      <Name>{name}</Name>
      <Balance>Balance: {balance} ETH</Balance>
    </TextContainer>
  </Container>
);

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledLogo = styled.img`
  width: 222px;
  height: 222px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
`;

const Name = styled.div`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: -0.8px;
  margin-bottom: 10px;
`;

const Balance = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;
