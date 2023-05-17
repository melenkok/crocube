import React from 'react';

const MAX_COUNT = 2;

const UploadFiles = ({ onSetValue, placeholder }) => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileLimit, setFileLimit] = React.useState(false);

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
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`Dozvoljene su do dvije datoteke!`);
          setFileLimit(false);
          limitExceeded = true;
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
    console.log(id);
  };

  React.useEffect(() => {
    onSetValue(uploadedFiles);
  }, [uploadedFiles[0]]);

  console.log(uploadedFiles);
  return (
    <>
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
      <input
        id="multipleFiles"
        type="file"
        onChange={handleFileEvent}
        style={{ display: 'none' }}
        multiple
        disabled={fileLimit}
      />
      {uploadedFiles.map((file) => (
        <div
          style={{
            lineHeight: '45px',
            fontFamily: 'Mattone',
            fontSize: '12px',
          }}
        >
          {file.name}
          <span
            style={{ marginLeft: '5px' }}
            className="pi pi-fw pi-trash"
            onClick={() => onDeleteFile(file.name)}
          ></span>
        </div>
      ))}
    </>
  );
};

export default UploadFiles;
