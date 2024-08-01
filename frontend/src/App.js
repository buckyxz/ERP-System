import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Anasayfa from './components/Anasayfa';
import Giris from './components/Giris';
import Kayit from './components/Kayit';
import UrunEkle from './components/UrunEkle';
import { setAuthToken } from './services/api';
import UrunListesi from './components/UrunListesi';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <CssBaseline />
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Anasayfa /> : <Navigate to="/giris" />} />
        <Route path="/giris" element={<Giris setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/kayit" element={<Kayit />} />
        <Route path="/urun-ekle" element={<UrunEkle />} />
        <Route path="/urun-listesi" element={<UrunListesi />} />
      </Routes>
    </Router>
  );
}

export default App;