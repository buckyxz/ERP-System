import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ERP Sistemi
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/">Anasayfa</Button>
            <Button color="inherit" component={Link} to="/urun-ekle">Urun Ekle</Button>
            <Button color="inherit" component={Link} to="/urun-listesi">Urun Listesi</Button>
            <Button color="inherit" onClick={handleLogout}>Çıkış Yap</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/giris">Giriş Yap</Button>
            <Button color="inherit" component={Link} to="/kayit">Kayıt Ol</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;