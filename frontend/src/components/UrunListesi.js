import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField, InputAdornment, CircularProgress, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, MenuItem, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

const UrunListesi = () => {
  const [urunler, setUrunler] = useState([]);
  const [filtreliUrunler, setFiltreliUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [aramaTermi, setAramaTermi] = useState('');
  const [silinecekUrun, setSilinecekUrun] = useState(null);
  const [guncellenecekUrun, setGuncellenecekUrun] = useState(null);
  const [guncellemeFormu, setGuncellemeFormu] = useState({
    ad: '',
    kategori: '',
    adet: '',
    alisFiyati: '',
    satisFiyati: '',
    depoTipi: ''
  });

  useEffect(() => {
    fetchUrunler();
  }, []);

  useEffect(() => {
    if (guncellenecekUrun) {
      setGuncellemeFormu({
        ad: guncellenecekUrun.ad,
        kategori: guncellenecekUrun.kategori,
        adet: guncellenecekUrun.adet,
        alisFiyati: guncellenecekUrun.alisFiyati,
        satisFiyati: guncellenecekUrun.satisFiyati,
        depoTipi: guncellenecekUrun.depoTipi
      });
    }
  }, [guncellenecekUrun]);

  const fetchUrunler = async () => {
    try {
      setYukleniyor(true);
      const response = await api.get('/urun');
      setUrunler(response.data);
      setFiltreliUrunler(response.data);
      setHata(null);
    } catch (error) {
      console.error('Ürünler yüklenirken hata oluştu:', error);
      setHata('Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  };

  useEffect(() => {
    const filtreliSonuclar = urunler.filter(urun =>
      urun.ad.toLowerCase().includes(aramaTermi.toLowerCase()) ||
      urun.kategori.toLowerCase().includes(aramaTermi.toLowerCase())
    );
    setFiltreliUrunler(filtreliSonuclar);
  }, [aramaTermi, urunler]);

  const getDepoTipiRenk = (depoTipi) => {
    const renkler = {
      sogukHava: 'primary',
      gida: 'secondary',
      ambalajli: 'success',
      kimyasal: 'error',
      diger: 'default'
    };
    return renkler[depoTipi] || 'default';
  };

  const getDepoTipiAd = (depoTipi) => {
    const depoTipleri = {
      sogukHava: 'Soğuk Hava',
      gida: 'Gıda',
      ambalajli: 'Ambalajlı',
      kimyasal: 'Kimyasal',
      diger: 'Diğer'
    };
    return depoTipleri[depoTipi] || 'Bilinmiyor';
  };

  const handleSilmeOnayi = async () => {
    if (silinecekUrun) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await api.delete(`/urun/${silinecekUrun._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          fetchUrunler(); // Silme işlemi sonrası listeyi güncelle
          setSilinecekUrun(null);
        }
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error);
        setHata('Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleGuncelleme = async () => {
    if (guncellenecekUrun) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await api.put(`/urun/${guncellenecekUrun._id}`, guncellemeFormu, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          fetchUrunler(); // Güncelleme işlemi sonrası listeyi güncelle
          setGuncellenecekUrun(null);
        }
      } catch (error) {
        console.error('Ürün güncellenirken hata oluştu:', error);
        setHata('Ürün güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleAramaTermiDegisti = (event) => {
    setAramaTermi(event.target.value);
  };

  const handleGuncellemeFormuDegisiklik = (event) => {
    const { name, value } = event.target;
    setGuncellemeFormu(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  if (yukleniyor) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ürün Listesi
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Ara"
        fullWidth
        value={aramaTermi}
        onChange={handleAramaTermiDegisti}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {hata && <Typography color="error">{hata}</Typography>}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
        <TableHead>
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Ad</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Kategori</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Adet</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Alış Fiyatı</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Satış Fiyatı</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>Depo Tipi</TableCell>
    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>İşlemler</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {filtreliUrunler.map((urun) => (
    <TableRow key={urun._id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1' } }}>
      <TableCell>{urun.ad}</TableCell>
      <TableCell>{urun.kategori}</TableCell>
      <TableCell>{urun.adet}</TableCell>
      <TableCell>{urun.alisFiyati}</TableCell>
      <TableCell>{urun.satisFiyati}</TableCell>
      <TableCell>
        <Chip label={getDepoTipiAd(urun.depoTipi)} color={getDepoTipiRenk(urun.depoTipi)} sx={{ fontWeight: 'bold' }} />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => setGuncellenecekUrun(urun)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setSilinecekUrun(urun)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
      <Dialog
        open={Boolean(silinecekUrun)}
        onClose={() => setSilinecekUrun(null)}
      >
        <DialogTitle>Ürünü Sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {silinecekUrun ? `${silinecekUrun.ad} adlı ürünü silmek istediğinizden emin misiniz?` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSilinecekUrun(null)}>İptal</Button>
          <Button onClick={handleSilmeOnayi} color="error">Sil</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(guncellenecekUrun)}
        onClose={() => setGuncellenecekUrun(null)}
      >
        <DialogTitle>Ürünü Güncelle</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Ad"
            name="ad"
            value={guncellemeFormu.ad}
            onChange={handleGuncellemeFormuDegisiklik}
            fullWidth
            />
            <TextField
              margin="dense"
              label="Kategori"
              name="kategori"
              value={guncellemeFormu.kategori}
              onChange={handleGuncellemeFormuDegisiklik}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Adet"
              name="adet"
              type="number"
              value={guncellemeFormu.adet}
              onChange={handleGuncellemeFormuDegisiklik}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Alış Fiyatı"
              name="alisFiyati"
              type="number"
              value={guncellemeFormu.alisFiyati}
              onChange={handleGuncellemeFormuDegisiklik}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Satış Fiyatı"
              name="satisFiyati"
              type="number"
              value={guncellemeFormu.satisFiyati}
              onChange={handleGuncellemeFormuDegisiklik}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Depo Tipi"
              name="depoTipi"
              select
              value={guncellemeFormu.depoTipi}
              onChange={handleGuncellemeFormuDegisiklik}
              fullWidth
            >
              <MenuItem value="sogukHava">Soğuk Hava</MenuItem>
              <MenuItem value="gida">Gıda</MenuItem>
              <MenuItem value="ambalajli">Ambalajlı</MenuItem>
              <MenuItem value="kimyasal">Kimyasal</MenuItem>
              <MenuItem value="diger">Diğer</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGuncellenecekUrun(null)}>İptal</Button>
            <Button onClick={handleGuncelleme} color="primary">Güncelle</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default UrunListesi;
  