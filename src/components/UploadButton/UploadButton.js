import React from 'react';
import { motion } from 'framer-motion';
import './UploadButton.css'

const UploadButton = ({ handleUpload, loading, file }) => {
  return (
    <motion.button
      onClick={handleUpload}
      className="upload-button"
      disabled={loading || !file}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? 'Carregando...' : 'Fazer Upload'}
    </motion.button>
  );
};

export default UploadButton;