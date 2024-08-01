const express = require('express');
const router = express.Router();
const siparisController = require('../controllers/siparisController');
const auth = require('../middleware/auth');

router.post('/', auth, siparisController.siparisEkle);
router.get('/', auth, siparisController.siparisleriGetir);
// router.get('/:id', auth, siparisController.siparisGetir);
// router.put('/:id', auth, siparisController.siparisDurumGuncelle);

module.exports = router;