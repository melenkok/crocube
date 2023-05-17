import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const UploadReceipt = ({ onSetValue, placeholder }) => {
  const [file, setFile] = React.useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    onSetValue(file);
  }, [file]);
  return (
    <>
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
      <input
        id="idoti"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div
        style={{ lineHeight: '45px', fontSize: '12px', fontFamily: 'Mattone' }}
      >
        {file && `${file.name}`}
      </div>
    </>
  );
};

export default UploadReceipt;
