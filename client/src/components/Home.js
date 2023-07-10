import React from 'react';
import '../App.css';
// import logo from '../assets/logo.png';
import InputTextArea from './InputTextArea';
import UploadReceipt from './UploadReceipt';
import styled, { keyframes } from 'styled-components';
import UploadFiles from './UploadFiles';
import rocket from '../assets/rocket.png';
import logo from '../assets/logo.svg';
import DialogCaptcha from './Dialog';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';

const Home = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurame] = React.useState('');
  const [receipt, setReceipt] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [seed, setSeed] = React.useState([]);

  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const dataIsComplete = () => {
    if (name && surname && receipt && files.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onAccept = async () => {
    let formData = new FormData();

    const folderName = `${name}_${surname}_${Date.now()}`;
    formData.append('files', receipt);
    formData.append('files', files[0]);
    formData.append('files', files[1]);
    formData.append('folderName', folderName);

    try {
      const response = await fetch(
        `/upload-file-to-cloud-storage`,

        {
          method: 'POST',
          body: formData,
        },
      );
      if (response.status === 200) {
        navigate('/success');
      }
      if (response.status !== 200) {
        toast.error('Došlo je do pogreške!');
      }

      setIsDialogOpen(false);
    } catch (e) {
      setIsDialogOpen(false);
      toast.error('Došlo je do pogreške!');
    }
  };

  const reset = () => {
    setSeed(Math.random());
  };

  return (
    <div class="App">
      {isDesktop && (
        <header className="App-header">
          <Star></Star>
          <Twinkling></Twinkling>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ zIndex: '10' }}
          />
          {isDialogOpen && (
            <DialogCaptcha
              onCloseDialog={() => {
                setIsDialogOpen(false);
                reset();
              }}
              key={seed}
              onSend={() => onAccept()}
            />
          )}

          <Inputs>
            <InputColumn1 style={{ height: '320px' }}>
              <Row>
                <InputTextArea
                  onSetValue={(text) => setName(text)}
                  placeholder={'Ime'}
                />
                <InputTextArea
                  onSetValue={(text) => setSurame(text)}
                  placeholder={'Prezime'}
                />
                <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
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
                <Button
                  disabled={!dataIsComplete()}
                  onClick={() => setIsDialogOpen(!isDialogOpen)}
                >
                  Lansiraj!
                </Button>
              </Row>
            </InputColumn1>
            <InputColumn2>
              {dataIsComplete() ? (
                <Scene>
                  <Rocket>
                    <img src={rocket} style={{ height: '45px' }}></img>
                  </Rocket>
                </Scene>
              ) : null}
            </InputColumn2>
          </Inputs>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </header>
      )}
      {!isDesktop && (
        <header className="App-header">
          <Star></Star>
          <Twinkling></Twinkling>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ zIndex: '10' }}
          />
          {isDialogOpen && (
            <DialogCaptcha
              onCloseDialog={() => {
                setIsDialogOpen(false);
                reset();
              }}
              key={seed}
              onSend={() => onAccept()}
            />
          )}

          <Inputs style={{ width: '300px', justifyContent: 'center' }}>
            <InputColumn1 style={{ width: '300px', alignItems: 'start' }}>
              <InputTextArea
                onSetValue={(text) => setName(text)}
                placeholder={'Ime'}
              />
              <div style={{ height: '25px' }}></div>
              <InputTextArea
                onSetValue={(text) => setSurame(text)}
                placeholder={'Prezime'}
              />
              <div style={{ height: '25px' }}></div>
              <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />

              <UploadReceipt
                placeholder={'Račun'}
                onSetValue={(file) => setReceipt(file)}
              />
              <div style={{ height: '25px' }}></div>

              <UploadFiles
                placeholder={'Datoteke'}
                onSetValue={(files) => setFiles(files)}
              />
              <div style={{ height: '10px' }}></div>

              <Row
                style={{
                  justifyContent: 'end',
                  alignContent: 'end',
                  width: dataIsComplete() ? '300px' : '300px',
                  height: '50px',
                }}
              >
                <Button
                  disabled={!dataIsComplete()}
                  onClick={() => setIsDialogOpen(!isDialogOpen)}
                  style={{
                    height: '45px',
                    marginRight: '15px',
                    width: '150px',
                  }}
                >
                  Lansiraj!
                </Button>
                <div>
                  {dataIsComplete() ? (
                    <Scene style={{ justifyContent: 'start' }}>
                      <Rocket>
                        <img src={rocket} style={{ height: '45px' }}></img>
                      </Rocket>
                    </Scene>
                  ) : null}
                </div>
              </Row>
            </InputColumn1>
            {/* <InputColumn2 style={{ height: '300px' }}>
              {dataIsComplete() ? (
                <Scene>
                  <Rocket>
                    <img src={rocket} style={{ height: '45px' }}></img>
                  </Rocket>
                </Scene>
              ) : null}
            </InputColumn2> */}
          </Inputs>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <ToastContainer />
        </header>
      )}
    </div>
  );
};

export default Home;

const Inputs = styled.div`
  width: 600px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

const InputColumn1 = styled.div`
  width: 600px;
  display: flex;
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

  &:enabled{
      color: #D90100;
      transition: 0.7s;
  }

  &:enabled:hover{
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
    width: 5px;
    height: 50px;
    background: red;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 50px;
    background: red;
    filter: blur(10px);
  }
`;

const twinkBack = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position:-10000px 5000px;
  }
`;

const Star = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-image: url('https://raw.githubusercontent.com/Carla-Codes/starry-night-css-animation/master/stars.png');
  background-position: center; /* Center the image */
  background-repeat: repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-color: black;

  z-index: 0;
`;

const Twinkling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: url('https://raw.githubusercontent.com/Carla-Codes/starry-night-css-animation/master/twinkling.png')
    repeat top center;
  backrgound-color: transparent;
  z-index: 1;
  animation-name: ${twinkBack};
  animation-duration: 200s;
  animation-iteration-count: infinite;
`;
