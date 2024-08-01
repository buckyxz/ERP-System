import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
import { kullanicilariGetir } from '../services/api';

const Anasayfa = () => {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const fetchKullanicilar = async () => {
      try {
        setYukleniyor(true);
        const response = await kullanicilariGetir();
        setKullanicilar(response.data);
        setHata(null);
      } catch (error) {
        console.error('Kullanıcılar getirilirken hata oluştu:', error);
        setHata('Kullanıcılar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setYukleniyor(false);
      }
    };

    fetchKullanicilar();
  }, []);

  if (yukleniyor) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (hata) {
    return (
      <Container>
        <Alert severity="error">{hata}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Kullanıcı Listesi</Typography>
      {kullanicilar.length === 0 ? (
        <Typography>Henüz kullanıcı bulunmamaktadır.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="kullanıcı tablosu">
            <TableHead>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>E-posta</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kullanicilar.map((kullanici) => (
                <TableRow key={kullanici._id}>
                  <TableCell component="th" scope="row">
                    {kullanici.ad}
                  </TableCell>
                  <TableCell>{kullanici.email}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="primary">
                      {kullanici.rol}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Anasayfa;