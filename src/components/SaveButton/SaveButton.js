import React, { useState } from 'react';
import axios from 'axios';
import './SaveButton.css';

const SaveButton = ({ texto, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setTitle] = useState('');
  const [label, setLabel] = useState('');

  const URL = 'http://localhost:8080/documents/save';

  const handleSave = async () => {
    try {
      console.log('Dados sendo enviados:', { title: name, label, content: texto });
      const response = await axios.post(URL, {
        name,
        label,
        content: texto
      });

      console.log('Resposta do servidor:', response);
      
      if (response.status === 201) {
        setShowModal(false);
        setTitle('');
        setLabel('');
        alert('Documento salvo com sucesso!');
        onSave && onSave();
      }
    } catch (error) {
      console.error('Erro ao salvar o documento:', error);
      alert('Erro ao salvar o documento');
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