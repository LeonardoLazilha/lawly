import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import UploadButton from '../UploadButton/UploadButton'
import TextDisplay from '../TextDisplay/TextDisplay';
import HeartButton from '../HeartButton/HeartButton';
import LoveMessage from '../LoveMessage/LoveMessage';
import Header from '../Header/Header';
import './PdfUploader.css';

const BASE_URL = 'https://lawly-api-24b515c4f971.herokuapp.com/';


const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setTexto('Por favor, selecione um arquivo.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}pdf/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTexto(response.data.text);
    } catch (error) {
      console.error('Erro ao fazer upload do PDF', error);
      setTexto('Erro ao processar o PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="upload-container">
          <label htmlFor="file-upload" className="file-label">
            {file ? file.name : 'Escolha o arquivo'}
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
            </motion.div>
          )}
        </AnimatePresence>

        <HeartButton setShowMessage={setShowMessage} />
        <AnimatePresence>
          {showMessage && <LoveMessage />}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PdfUploader;