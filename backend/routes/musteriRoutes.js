const express = require('express');
const router = express.Router();
const musteriController = require('../controllers/musteriController');
const auth = require('../middleware/auth');

router.post('/', auth, musteriController.musteriEkle);
router.get('/', auth, musteriController.musterileriGetir);
// router.get('/:id', auth, musteriController.musteriGetir);
// router.put('/:id', auth, musteriController.musteriGuncelle);
// router.delete('/:id', auth, musteriController.musteriSil);

module.exports = router;