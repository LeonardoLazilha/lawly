import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import PdfUploader from './components/PdfUploader/PdfUploader';
import SavedDocsList from './components/SavedDocsList/SavedDocsList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PdfUploader />} />
        <Route path="/documents" element={<SavedDocsList />} />
      </Routes>
    </Router>
  );
}

export default App;