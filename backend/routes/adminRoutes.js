const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/dashboard', auth, adminAuth, adminController.dashboard);
router.get('/kullanicilar', auth, adminAuth, adminController.kullanicilariListele);
router.put('/kullanici/:id/rol', auth, adminAuth, adminController.kullaniciRolGuncelle);

module.exports = router;