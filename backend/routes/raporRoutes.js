const express = require('express');
const router = express.Router();
const raporController = require('../controllers/raporController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/finansal', auth, adminAuth, raporController.finansalRapor);
router.get('/stok', auth, raporController.stokRaporu);

module.exports = router;