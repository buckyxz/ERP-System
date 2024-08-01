const mongoose = require('mongoose');

const tedarikciSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  iletisimBilgileri: {
    telefon: String,
    email: { type: String, unique: true },
    adres: String
  },
  urunler: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Urun' }]
}, { timestamps: true });

module.exports = mongoose.model('Tedarikci', tedarikciSchema);