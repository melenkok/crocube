import { Tooltip } from '@mui/material';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled, { keyframes } from 'styled-components';

const UploadReceipt = ({ onSetValue, placeholder }) => {
  const [file, setFile] = React.useState(null);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onDeleteFile = (id) => {
    if (file.name === id) {
      setFile(null);
    }
  };

  const onInputClick = (event) => {
    event.target.value = '';
  };

  React.useEffect(() => {
    onSetValue(file);
  }, [file]);
  return (
    <>
      {isDesktop && (
        <Tooltip title={'Priloži dokaz o plaćanju!'} placement="right-start">
          <label
            for="idoti"
            className="p-button p-component"
            style={{
              fontFamily: 'Mattone',
              backgroundColor: 'white',
              color: '#D90100',
              width: '150px',
            }}
          >
            <span
              style={{ marginRight: '5px' }}
              className="pi pi-fw pi-plus"
            ></span>
            {placeholder}
          </label>
        </Tooltip>
      )}
      {!isDesktop && (
        <Row>
          <label
            for="multipleFiles"
            className="p-button p-component"
            style={{
              fontFamily: 'Mattone',
              backgroundColor: 'white',
              color: '#D90100',
              width: '150px',
              height: '45px',
            }}
          >
            <span
              style={{ marginRight: '5px' }}
              className="pi pi-fw pi-plus"
            ></span>
            {placeholder}
          </label>
          <Text>Priloži dokaz o plaćanju!</Text>
        </Row>
      )}
      <input
        id="idoti"
        type="file"
        onChange={handleFileChange}
        onClick={onInputClick}
        style={{ display: 'none' }}
      />
      {file && (
        <div
          key={file.name}
          style={{ lineHeight: '45px', width: '200px', display: 'flex' }}
        >
          <div
            style={{
              lineHeight: '45px',
              fontFamily: 'Mattone',
              fontSize: '12px',
              width: '180px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {file && `${file.name}`}
          </div>
          <span
            style={{ marginLeft: '5px', lineHeight: '45px' }}
            className="pi pi-fw pi-trash"
            onClick={() => onDeleteFile(file.name)}
          ></span>
        </div>
      )}
    </>
  );
};

export default UploadReceipt;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Text = styled.div`
  width: 150px;
  font-size: 11px;
  font-family: Mattone;
  height: 45px;
  display: flex;
  align: center;
`;
