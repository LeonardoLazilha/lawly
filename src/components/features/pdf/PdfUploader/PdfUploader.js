import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { MESSAGES } from '../../../../utils/messages';
import SaveButton from '../../../shared/SaveButton/SaveButton';
import UploadButton from '../../../shared/UploadButton/UploadButton';
import HeartButton from '../../love/HeartButton/HeartButton';
import LoveMessage from '../../love/LoveMessage/LoveMessage';
import TextDisplay from '../TextDisplay/TextDisplay';
import { pdfService } from './pdfService';
import './PdfUploader.css';



const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const isValidFile = (file) => {
    return file && file.type === 'application/pdf';
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (isValidFile(selectedFile)) {
      setFile(selectedFile);
      setTexto('');
    } else {
      setFile(null);
      setTexto('Por favor, selecione um arquivo PDF válido.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setTexto(MESSAGES.NO_FILE);
      return;
    }

    setLoading(true);
    try {
      const data = await pdfService.uploadPdf(file);
      setTexto(data.text);
    } catch (error) {
      setTexto(MESSAGES.PDF_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="upload-container">
        <label htmlFor="file-upload" className="file-label">
          {file ? file.name : 'Escolha o arquivo 📄'}
        </label>
        <input type="file" id="file-upload" className="file-input" onChange={handleFileChange} accept=".pdf" />
        <UploadButton handleUpload={handleUpload} loading={loading} file={file} />
      </div>

      <AnimatePresence>
        {texto && (
          <motion.div
            className="text-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-title">Texto Extraído:</h2>
            <TextDisplay texto={texto} />
            <SaveButton texto={texto} />
          </motion.div>
        )}
      </AnimatePresence>

      <HeartButton setShowMessage={setShowMessage} />
      <AnimatePresence>
        {showMessage && <LoveMessage />}
      </AnimatePresence>
    </div>
  );
};

export default PdfUploader;