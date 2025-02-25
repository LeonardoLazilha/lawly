import React from 'react';
import './FileInput.css'

const FileInput = ({ file, onFileChange }) => {
  return (
    <div>
      <label htmlFor="file-upload" className="file-label">
        {file ? file.name : "Escolha o arquivo"}
      </label>
      <input
        type="file"
        id="file-upload"
        className="file-input"
        onChange={onFileChange}
        accept=".pdf"
      />
    </div>
  );
};

export default FileInput;