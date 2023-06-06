import { Tooltip } from '@mui/material';
import React from 'react';

const UploadReceipt = ({ onSetValue, placeholder }) => {
  const [file, setFile] = React.useState(null);

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
