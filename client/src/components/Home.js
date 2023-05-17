import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { InputText } from 'primereact/inputtext';
import InputTextArea from './InputTextArea';
import UploadReceipt from './UploadReceipt';
import styled from 'styled-components';
import UploadFiles from './UploadFiles';

const Home = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurame] = React.useState('');
  const [receipt, setReceipt] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  console.log(receipt, files);
  return (
    <div class="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Inputs>
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
        </Inputs>
      </header>
    </div>
  );
};

const chooseOptions = {
  label: 'Odaberi',
  icon: 'pi pi-fw pi-plus',
  color: 'black',
};
const uploadOptions = {
  label: '',
  icon: '',
  className: '',
};
const cancelOptions = {
  label: 'Cancel',
  icon: 'pi pi-times',
  className: 'p-button-danger',
};
export default Home;

const Inputs = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
