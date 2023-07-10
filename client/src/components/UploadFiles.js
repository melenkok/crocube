import React from 'react';
import { Tooltip } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import styled, { keyframes } from 'styled-components';

const MAX_COUNT = 2;
const MAX_SIZE = 10 * 1024 * 1024;

const UploadFiles = ({ onSetValue, placeholder }) => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileLimit, setFileLimit] = React.useState(false);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  //   const handleFileChange = (e) => {
  //     if (e.target.files) {
  //       setUploadedFiles([...uploadedFiles, e.target.files[0]]);
  //     }
  //   };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        const uploadedSize = uploaded
          .map((e) => e.size)
          .reduce((a, b) => a + b, 0);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`Dozvoljene su do dvije datoteke!`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
        if (uploadedSize > MAX_SIZE) {
          limitExceeded = true;
          setFileLimit(false);
          alert(`Datoteke premašuju dozvoljenu veličinu!`);
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const onDeleteFile = (id) => {
    const uploaded = [...uploadedFiles];
    const index = uploaded.findIndex((f) => f.name === id);
    if (index !== -1) {
      uploaded.splice(index, 1);
      if (uploadedFiles.length === MAX_COUNT) setFileLimit(false);
      setUploadedFiles(uploaded);
    }
  };

  const onInputClick = (event) => {
    event.target.value = '';
  };

  React.useEffect(() => {
    onSetValue(uploadedFiles);
  }, [uploadedFiles[0]]);

  return (
    <>
      {isDesktop && (
        <Tooltip
          title={'Dodaj do dvije datoteke ukupne veličine do 10MB!'}
          placement="right-start"
        >
          <label
            for="multipleFiles"
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
          <Text>Dodaj do dvije datoteke ukupne veličine do 10MB!</Text>
        </Row>
      )}
      <input
        id="multipleFiles"
        type="file"
        onChange={handleFileEvent}
        style={{ display: 'none' }}
        multiple
        disabled={fileLimit}
        onClick={onInputClick}
      />
      {uploadedFiles.map((file) => (
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
            {file.name}
          </div>
          <span
            style={{ marginLeft: '5px', lineHeight: '45px' }}
            className="pi pi-fw pi-trash"
            onClick={() => onDeleteFile(file.name)}
          ></span>
        </div>
      ))}
    </>
  );
};

export default UploadFiles;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Text = styled.div`
  width: 150px;
  font-size: 11px;
  font-family: Mattone;
`;
