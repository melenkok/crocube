import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled, { keyframes } from 'styled-components';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
} from '@mui/material';
import { gdpr, gdprheadline } from '../assets/gdpr';
import verifyToken from '../utils/verifyToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DialogCaptcha = ({ onCloseDialog, onSend }) => {
  const captchaRef = useRef(null);
  const [seed, setSeed] = React.useState([]);

  const reset = () => {
    setSeed(Math.random());
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const onAccept = () => {
    onSend();
  };

  const handleSubmit = async () => {
    if (captchaRef.current.getValue() === '') {
      return toast('Verificirajte da niste robot!');
    }
    // e.preventDefault();
    let token = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (token) {
      let valid_token = await verifyToken(token);
      // setValidToken(valid_token);

      if (valid_token[0].success === true) {
        onAccept();
      } else {
        toast.error('Verifikacija neuspješna!');
      }
    }
  };

  const checkIfDisabled = () => {
    if (captchaRef.current === null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Dialog
      key={seed}
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        onCloseDialog();
        reset();
      }}
      scroll="paper"
    >
      <DialogTitle>{gdprheadline}</DialogTitle>
      <DialogContent>
        {/* <Typography variant="h6">{gdprheadline} </Typography> */}
        <Typography variant="subtitle2" style={{ marginBottom: '10px' }}>
          {gdpr}
        </Typography>

        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY}
          hl={'hr'}
          ref={captchaRef}
        />

        {/* <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} /> */}
      </DialogContent>

      <DialogActions>
        <Button disabled={false} onClick={() => handleSubmit()}>
          Prihvaćam
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default DialogCaptcha;

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
      border: 1px solid red;
  }

  &:disabled{
    pointer-events: none;
    border: 1px solid gray;
}

 
`;
