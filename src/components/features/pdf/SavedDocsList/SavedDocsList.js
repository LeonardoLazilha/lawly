import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { savedDocsListService } from './savedDocsService';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import './SavedDocsList.css';


const SavedDocsList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await savedDocsListService.listAllDocs();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      setError('Não foi possível carregar os documentos.');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await savedDocsListService.deleteDoc(docToDelete.id);
      setDocuments(documents.filter(doc => doc.id !== docToDelete.id));
      setShowConfirmModal(false);
      toast.success(MESSAGES.DOC_DELETED_SUCESS)
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
      toast.error(MESSAGES.DOC_DELETED_ERROR)
      setShowConfirmModal(false); 
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setDocToDelete(null); 
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="documents-container">
      <h1>Documentos Salvos</h1>
      <div className="documents-list">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            className="document-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>{doc.name || 'Documento sem título'}</h3>
            <p className="label">{doc.label}</p>
            <div className="document-actions">
              <button onClick={() => window.location.href = `/document/${doc.id}`}>
                Ver
              </button>
              <button onClick={() => {
                setDocToDelete(doc);
                setShowConfirmModal(true);
              }} className="delete-btn">
                Deletar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o documento: <strong>{docToDelete?.name}</strong>?</p>
            <div className="modal-buttons">
              <button onClick={handleCancelDelete}>Cancelar</button>
              <button onClick={handleDelete}>Deletar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedDocsList;