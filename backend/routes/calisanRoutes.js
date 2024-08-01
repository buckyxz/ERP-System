const express = require('express');
const router = express.Router();
const calisanController = require('../controllers/calisanController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/', auth, adminAuth, calisanController.calisanEkle);
router.get('/', auth, calisanController.calisanlariGetir);
// router.get('/:id', auth, calisanController.calisanGetir);
// router.put('/:id', auth, adminAuth, calisanController.calisanGuncelle);
// router.delete('/:id', auth, adminAuth, calisanController.calisanSil);

module.exports = router;