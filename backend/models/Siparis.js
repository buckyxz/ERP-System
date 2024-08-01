const mongoose = require('mongoose');

const siparisSchema = new mongoose.Schema({
  musteri: { type: mongoose.Schema.Types.ObjectId, ref: 'Musteri', required: true },
  urunler: [{
    urun: { type: mongoose.Schema.Types.ObjectId, ref: 'Urun', required: true },
    adet: { type: Number, required: true, min: 1 }
  }],
  toplamTutar: { type: Number, required: true, min: 0 },
  tarih: { type: Date, default: Date.now },
  durum: { 
    type: String, 
    enum: ['beklemede', 'hazirlaniyor', 'kargoda', 'tamamlandi'], 
    default: 'beklemede'
  }
}, { timestamps: true });

module.exports = mongoose.model('Siparis', siparisSchema);