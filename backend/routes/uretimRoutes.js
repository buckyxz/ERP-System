const express = require('express');
const router = express.Router();
const uretimController = require('../controllers/uretimController');
const auth = require('../middleware/auth');

router.post('/', auth, uretimController.uretimEmriEkle);
router.get('/', auth, uretimController.uretimEmirleriGetir);
// router.get('/:id', auth, uretimController.uretimEmriGetir);
// router.put('/:id', auth, uretimController.uretimEmriGuncelle);

module.exports = router;