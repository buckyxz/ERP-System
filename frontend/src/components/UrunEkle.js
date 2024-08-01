import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import api from '../services/api';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UrunEkle = ({ onUrunEklendi }) => {  // onUrunEklendi prop eklenmiş
  const [urun, setUrun] = useState({
    ad: '',
    kategori: '',
    adet: '',
    alisFiyati: '',
    satisFiyati: '',
    depoTipi: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrun(prevUrun => ({
      ...prevUrun,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/urun', urun);
      // Formu sıfırla
      setUrun({
        ad: '',
        kategori: '',
        adet: '',
        alisFiyati: '',
        satisFiyati: '',
        depoTipi: ''
      });
      // Başarı mesajı göster
      setSnackbar({
        open: true,
        message: 'Ürün başarıyla eklendi!',
        severity: 'success'
      });
      // Listeyi güncelle
      if (onUrunEklendi) onUrunEklendi(); // Ekleme sonrası listeyi güncellemek için callback çağır
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
      setSnackbar({
        open: true,
        message: 'Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Yeni Ürün Ekle
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ad"
          label="Ürün Adı"
          name="ad"
          autoFocus
          value={urun.ad}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="kategori"
          label="Kategori"
          name="kategori"
          value={urun.kategori}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="adet"
          label="Adet"
          name="adet"
          type="number"
          value={urun.adet}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="alisFiyati"
          label="Alış Fiyatı"
          name="alisFiyati"
          type="number"
          value={urun.alisFiyati}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="satisFiyati"
          label="Satış Fiyatı"
          name="satisFiyati"
          type="number"
          value={urun.satisFiyati}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="depoTipi-label">Depo Tipi</InputLabel>
          <Select
            labelId="depoTipi-label"
            id="depoTipi"
            name="depoTipi"
            value={urun.depoTipi}
            label="Depo Tipi"
            onChange={handleChange}
          >
            <MenuItem value="sogukHava">Soğuk Hava</MenuItem>
            <MenuItem value="gida">Gıda</MenuItem>
            <MenuItem value="ambalajli">Ambalajlı</MenuItem>
            <MenuItem value="kimyasal">Kimyasal</MenuItem>
            <MenuItem value="diger">Diğer</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Ürün Ekle
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UrunEkle;
