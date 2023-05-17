import React from 'react';
import { InputText } from 'primereact/inputtext';

const InputTextArea = ({ onSetValue, placeholder }) => {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    onSetValue(text);
  }, [text]);
  return (
    <span className="p-float-label" style={{ fontFamily: 'Mattone' }}>
      <InputText
        id="surname"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ color: '#D90100', fontSize: '16px', fontFamily: 'Mattone' }}
      />
      <label htmlFor="surname" style={{ fontFamily: 'Mattone' }}>
        {placeholder}
      </label>
    </span>
  );
};

export default InputTextArea;
