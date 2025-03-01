import React from 'react';
import { motion } from 'framer-motion';
import './LoveMessage.css'

const LoveMessage = () => {
  return (
    <motion.div
      className="love-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      MADE WITH LOVE, LEO
    </motion.div>
  );
};

export default LoveMessage;