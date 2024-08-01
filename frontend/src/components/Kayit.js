import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { kayitOl } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Kayit = () => {
  const [ad, setAd] = useState('');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await kayitOl({ ad, email, parola, rol: 'calisan' });
      navigate('/giris');
    } catch (error) {
      console.error('Kayıt olurken hata oluştu:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Kayıt Ol</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="ad"
          label="Ad Soyad"
          name="ad"
          autoComplete="name"
          autoFocus
          value={ad}
          onChange={(e) => setAd(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-posta Adresi"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="parola"
          label="Parola"
          type="password"
          id="parola"
          autoComplete="new-password"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Kayıt Ol
        </Button>
      </form>
    </Container>
  );
};

export default Kayit;
