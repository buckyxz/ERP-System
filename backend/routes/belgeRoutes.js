const express = require('express');
const router = express.Router();
const belgeController = require('../controllers/belgeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('dosya'), belgeController.belgeEkle);
router.get('/', auth, belgeController.belgeleriGetir);
// router.get('/:id', auth, belgeController.belgeGetir);
// router.delete('/:id', auth, belgeController.belgeSil);

module.exports = router;