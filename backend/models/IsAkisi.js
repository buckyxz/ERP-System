const mongoose = require('mongoose');

const isAkisiSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  adimlar: [{
    sira: { type: Number, required: true },
    gorev: { type: String, required: true },
    sorumlu: { type: mongoose.Schema.Types.ObjectId, ref: 'Calisan', required: true },
    durum: { 
      type: String, 
      enum: ['beklemede', 'devamEdiyor', 'tamamlandi'],
      default: 'beklemede'
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('IsAkisi', isAkisiSchema);