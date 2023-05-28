import React from 'react';
import logo from '../assets/logo.png';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';

const Uploaded = () => {
  const navigate = useNavigate();
  return (
    <div class="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Div>
          <Title>Uspješno lanisrano!</Title>
          <Row>
            <Button onClick={() => navigate('/')}>Povratak</Button>
          </Row>
        </Div>
      </header>
    </div>
  );
};
export default Uploaded;

const Button = styled.button`
  font-family: Mattone;
  background-color: white;
  width: 200px;
  color: #D90100;
  cursor: pointer;
  border: 1px solid white;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  box-shadow 0.2s;
  border-radius: 6px;

`;

const Div = styled.div`
  height: 370px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Mattone;
  margin-top: 100px;
`;
