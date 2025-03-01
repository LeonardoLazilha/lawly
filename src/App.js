import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import PdfUploader from './components/features/pdf/PdfUploader/PdfUploader';
import SavedDocsList from './components/features/pdf/SavedDocsList/SavedDocsList';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PdfUploader />} />
          <Route path="/documents" element={<SavedDocsList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;