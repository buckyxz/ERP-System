const mongoose = require('mongoose');

const belgeSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  tip: { type: String, required: true },
  dosyaYolu: { type: String, required: true },
  yuklemeTarihi: { type: Date, default: Date.now },
  yuklenenKullanici: { type: mongoose.Schema.Types.ObjectId, ref: 'Kullanici', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Belge', belgeSchema);