const express = require('express');
const router = express.Router();
const projeController = require('../controllers/projeController');
const auth = require('../middleware/auth');

router.post('/', auth, projeController.projeEkle);
router.get('/', auth, projeController.projeleriGetir);
// router.get('/:id', auth, projeController.projeGetir);
// router.put('/:id', auth, projeController.projeGuncelle);
// router.delete('/:id', auth, projeController.projeSil);

module.exports = router;