import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { InputText } from 'primereact/inputtext';
import InputTextArea from './InputTextArea';
import UploadReceipt from './UploadReceipt';
import styled, { keyframes } from 'styled-components';
import UploadFiles from './UploadFiles';
import rocket from '../assets/rocket.png';

const Home = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurame] = React.useState('');
  const [receipt, setReceipt] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  const dataIsComplete = () => {
    if (name && surname && receipt && files.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log(dataIsComplete());

  console.log(receipt, files);
  return (
    <div class="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Inputs>
          <InputColumn1>
            <Row>
              <InputTextArea
                onSetValue={(text) => setName(text)}
                placeholder={'Ime'}
              />
              <InputTextArea
                onSetValue={(text) => setSurame(text)}
                placeholder={'Prezime'}
              />
            </Row>
            <Row>
              <UploadReceipt
                placeholder={'Račun'}
                onSetValue={(file) => setReceipt(file)}
              />
            </Row>
            <Row>
              <UploadFiles
                placeholder={'Datoteke'}
                onSetValue={(files) => setFiles(files)}
              />
            </Row>
            <Row
              style={{
                justifyContent: 'end',
                width: dataIsComplete() ? '600px' : '600px',
              }}
            >
              <Button disabled={!dataIsComplete()}>Lansiraj!</Button>
            </Row>
          </InputColumn1>
          <InputColumn2>
            {!dataIsComplete() ? (
              <Scene>
                <Rocket>
                  <img src={rocket} style={{ height: '45px' }}></img>
                </Rocket>
              </Scene>
            ) : null}
          </InputColumn2>
        </Inputs>
      </header>
    </div>
  );
};

export default Home;

const Inputs = styled.div`
  width: 600px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const InputColumn1 = styled.div`
  width: 600px;
  display: flex;
  height: 320px;
  flex-direction: column;
  justify-content: end;
`;

const InputColumn2 = styled.div`
  width: 100px;
  display: flex;
  height: 370px;
  flex-direction: column;
  justify-content: end;
  margin-left: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  font-family: Mattone;
  background-color: white;
  width: 200px;
  color: gray;
  cursor: pointer;
  border: 1px solid white;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  box-shadow 0.2s;
  border-radius: 6px;

  :enabled{
      color: #D90100;
      transition: 0.7s;
  }

  :enabled:hover{
    background-color: white;
    transition: 0.7s;
}
`;

const Scene = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 50px;
`;

const animate = keyframes`
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
`;

// const animate = keyframes`
//   0% {
//     transform: translateY(vh);
//   }
//   100% {
//     transform: translateY(0);
//   }
// `;

const Rocket = styled.div`
  animation-name: ${animate};
  animation-duration: 3s;
  animation-iteration-count: infinite;

  &:before {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 50px;
    background: white;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 50px;
    background: white;
    filter: blur(20px);
  }
`;
