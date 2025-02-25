import React from 'react';
import { motion } from 'framer-motion';
import './HeartButton.css'

const HeartButton = ({ setShowMessage }) => {
  const handleHeartClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="heart-container">
      <motion.button
        className="heart-button"
        onClick={handleHeartClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ❤️
      </motion.button>
    </div>
  );
};

export default HeartButton;