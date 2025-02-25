import React from 'react';
import './TextDisplay.css'

const TextDisplay = ({ texto }) => {
  const formatText = (rawText) => {
    return rawText
      .split('<p>')
      .map((paragraph, index) => {
        if (paragraph) {
          const formattedText = paragraph.replace('</p>', '').replace(/↵/g, '\n').trim();
          return (
            <p key={index} className="text-paragraph">
              {formattedText}
            </p>
          );
        }
        return null;
      });
  };

  return <div className="text-content">{formatText(texto)}</div>;
};

export default TextDisplay;