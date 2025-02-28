import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './SavedDocsList.css';

const LOCAL_URL = 'http://localhost:8080';

const SavedDocsList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/documents`);
      setDocuments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      setError('Não foi possível carregar os documentos.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${LOCAL_URL}/documents/${id}`);
      fetchDocuments(); // Recarrega a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
      setError('Não foi possível deletar o documento.');
    }
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
            <h3>{doc.title || 'Documento sem título'}</h3>
            <p className="date">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</p>
            <div className="document-actions">
              <button onClick={() => window.location.href = `/document/${doc.id}`}>
                Ver
              </button>
              <button onClick={() => handleDelete(doc.id)} className="delete-btn">
                Deletar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedDocsList; 