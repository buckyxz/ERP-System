const mongoose = require('mongoose');

const uretimEmriSchema = new mongoose.Schema({
  urun: { type: mongoose.Schema.Types.ObjectId, ref: 'Urun', required: true },
  miktar: { type: Number, required: true, min: 1 },
  baslangicTarihi: { type: Date, required: true },
  bitisTarihi: Date,
  durum: { 
    type: String, 
    enum: ['planlanmis', 'uretimde', 'tamamlandi'],
    default: 'planlanmis'
  },
  toplamMaliyet: { type: Number, required: true, min: 0 },
  aciklama: String
}, { timestamps: true });

module.exports = mongoose.model('UretimEmri', uretimEmriSchema);