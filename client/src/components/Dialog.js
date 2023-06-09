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
import ClipLoader from 'react-spinners/ClipLoader';

const DialogCaptcha = ({ onCloseDialog, onSend }) => {
  const captchaRef = useRef(null);
  const [seed, setSeed] = React.useState([]);
  const [isSpinnerActive, setIsSpinnerActive] = React.useState(false);

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
      try {
        let valid_token = await verifyToken(token);

        if (valid_token[0].success === true) {
          setIsSpinnerActive(true);
          onAccept();
        } else {
          toast.error('Verifikacija neuspješna!');
          setIsDialogOpen(false);
        }
      } catch {
        toast.error('Verifikacija neuspješna!');
        setIsDialogOpen(false);
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

  const override = {
    display: 'block',
    marginLeft: '10px',
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
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        <Button disabled={false} onClick={() => handleSubmit()}>
          Prihvaćam
          <ClipLoader
            color={'red'}
            loading={isSpinnerActive}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
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
  width: 180px;
  color: gray;
  cursor: pointer;
  border: 1px solid white;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  box-shadow 0.2s;
  border-radius: 6px;
  display: flex;
  justify-content: center;

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
