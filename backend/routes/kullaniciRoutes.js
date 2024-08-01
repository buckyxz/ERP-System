const express = require('express');
const router = express.Router();
const kullaniciController = require('../controllers/kullaniciController');
const auth = require('../middleware/auth');

// Kayıt ve giriş işlemleri için rotalar
router.post('/kayit', kullaniciController.kayit);
router.post('/giris', kullaniciController.giris);

// Kimlik doğrulaması gerektiren rota
router.get('/kullanicilar', auth, kullaniciController.tumKullanicilariGetir);

module.exports = router;
