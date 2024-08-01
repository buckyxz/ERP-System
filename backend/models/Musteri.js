const mongoose = require('mongoose');

const musteriSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  iletisimBilgileri: {
    telefon: String,
    email: { type: String, unique: true },
    adres: String
  },
  siparisGecmisi: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Siparis' }]
}, { timestamps: true });

module.exports = mongoose.model('Musteri', musteriSchema);