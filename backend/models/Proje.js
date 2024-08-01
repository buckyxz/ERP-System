const mongoose = require('mongoose');

const projeSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  baslangicTarihi: { type: Date, required: true },
  bitisTarihi: Date,
  butce: { type: Number, required: true, min: 0 },
  durum: { 
    type: String, 
    enum: ['planlanmis', 'devamEdiyor', 'tamamlandi'],
    default: 'planlanmis'
  },
  ekipUyeleri: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calisan' }]
}, { timestamps: true });

module.exports = mongoose.model('Proje', projeSchema);