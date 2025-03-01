import React, { useState } from 'react';
import { MESSAGES } from '../../../utils/messages';
import { toast } from 'react-toastify';
import { saveButtonService } from './saveButtonService';
import './SaveButton.css';


const SaveButton = ({ texto, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setTitle] = useState('');
  const [label, setLabel] = useState('');

  const handleSave = async () => {
    try {
      await saveButtonService.saveDoc(name, label, texto);
      setShowModal(false);
      setTitle('');
      setLabel('');
      toast.success(MESSAGES.PDF_SAVE_SUCESS);
      onSave && onSave();
    } catch (error) {
      console.error('Erro ao salvar o documento:', error);
      toast.error(MESSAGES.PDF_SAVE_ERROR);
    }
  };

  return (
    <>
      <button 
        className="save-button"
        onClick={() => setShowModal(true)}
        disabled={!texto}
      >
        Salvar Texto
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Salvar Documento</h2>
            <input
              type="text"
              placeholder="Título do documento"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={handleSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveButton;