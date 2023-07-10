import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import rocket from '../assets/rocket.png';
import { useMediaQuery } from 'react-responsive';

const Stars = () => {
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <html>
      {isDesktop && (
        <Root widthScreen={'800px'}>
          <Title>Uspješno lansirano!</Title>
          <Star></Star>
          <Twinkling></Twinkling>
          <Clouds></Clouds>
          <Scene widthScreen={'800px'} onClick={() => navigate('/')}>
            <Rocket>
              <img
                src={rocket}
                style={{
                  height: '45px',
                  zIndex: '10',
                  pointerEvents: 'stroke',
                }}
              ></img>
            </Rocket>
            <div
              style={{
                height: '60px',
                zIndex: '10',
                transform: 'rotate(90deg)',
                color: 'white',
                margin: '100px',
                alignContent: 'center',
                pointerEvents: 'auto',
                fontFamily: 'Mattone',
              }}
            >
              Povratak
            </div>
          </Scene>
        </Root>
      )}
      {!isDesktop && (
        <Root widthScreen={'300px'}>
          <Title>Uspješno lansirano!</Title>
          <Star></Star>
          <Twinkling></Twinkling>
          <Clouds></Clouds>
          <Scene widthScreen={'300px'} onClick={() => navigate('/')}>
            <Rocket>
              <img
                src={rocket}
                style={{
                  height: '45px',
                  zIndex: '10',
                  pointerEvents: 'stroke',
                }}
              ></img>
            </Rocket>
            <div
              style={{
                height: '60px',
                zIndex: '10',
                transform: 'rotate(90deg)',
                color: 'white',
                margin: '100px',
                alignContent: 'center',
                pointerEvents: 'auto',
                fontFamily: 'Mattone',
              }}
            >
              Povratak
            </div>
          </Scene>
        </Root>
      )}
    </html>
  );
};
export default Stars;

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-color: transparent;
  min-width: ${(props) => props.widthScreen || '800px'};
`;

const Title = styled.div`
  font-size: 36px;
  font-family: Mattone;
  margin-top: 10em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  color: #ffffff;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);

  display: block;
  position: relative;
  z-index: 3;
`;

const twinkBack = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position:-10000px 5000px;
  }
`;

const cloudsBack = keyframes`
from {
    background-position: 0 0;
  }
  to {
    background-position:10000px 0px;
  }
`;

const Scene = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: ${(props) => props.widthScreen || '800px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  transform: rotate(-90deg);
  z-index: 10;
  height: 60px;
  margin-top: 60px;
  display: 'block',
  pointer-events: auto;
`;

const Star = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-width: ${(props) => props.widthScreen || '100%'};
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
  min-width: ${(props) => props.widthScreen || '100%'};
  display: block;
  background: url('https://raw.githubusercontent.com/Carla-Codes/starry-night-css-animation/master/twinkling.png')
    repeat top center;
  backrgound-color: transparent;
  z-index: 1;
  animation-name: ${twinkBack};
  animation-duration: 200s;
  animation-iteration-count: infinite;
`;

const Clouds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-width: ${(props) => props.widthScreen || '100%'};
  display: block;
  background: transparent
    url('https://github.com/Carla-Codes/starry-night-css-animation/blob/master/clouds.png?raw=true')
    repeat top center;
  z-index: 2;
  opacity: 0.4;
  animation-name: ${cloudsBack};
  animation-duration: 200s;
  animation-iteration-count: infinite;
`;

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

// const Title = styled.div`
//   font-size: 20px;
//   font-family: Mattone;
//   margin-top: 100px;
// `;

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
