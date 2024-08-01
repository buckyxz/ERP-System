const mongoose = require('mongoose');

const calisanSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  pozisyon: { type: String, required: true },
  maas: { type: Number, required: true, min: 0 },
  iseGirisTarihi: { type: Date, required: true },
  izinGunleri: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Calisan', calisanSchema);