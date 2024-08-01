const express = require('express');
const router = express.Router();
const isAkisiController = require('../controllers/isAkisiController');
const auth = require('../middleware/auth');

router.post('/', auth, isAkisiController.isAkisiEkle);
router.get('/', auth, isAkisiController.isAkislariniGetir);
// router.get('/:id', auth, isAkisiController.isAkisiGetir);
// router.put('/:id', auth, isAkisiController.isAkisiGuncelle);
// router.delete('/:id', auth, isAkisiController.isAkisiSil);

module.exports = router;