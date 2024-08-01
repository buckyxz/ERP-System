const express = require('express');
const router = express.Router();
const urunController = require('../controllers/urunController');
const auth = require('../middleware/auth');

router.post('/', auth, urunController.urunEkle);
router.get('/', urunController.urunleriGetir);
router.put('/:id', auth, urunController.urunGuncelle);
router.delete('/:id', auth, urunController.urunSil);

module.exports = router;