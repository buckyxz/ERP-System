import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { girisYap, setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Giris = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await girisYap({ email, parola });
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Giriş yapılırken hata oluştu:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Giriş Yap</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-posta Adresi"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Giriş Yap
        </Button>
      </form>
    </Container>
  );
};

export default Giris;
