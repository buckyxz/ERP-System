const mongoose = require('mongoose');

const urunSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  kategori: { type: String, required: true },
  adet: { type: Number, required: true, min: 0 },
  alisFiyati: { type: Number, required: true, min: 0 },
  satisFiyati: { type: Number, required: true, min: 0 },
  depoTipi: { 
    type: String, 
    enum: ['sogukHava', 'gida', 'ambalajli', 'kimyasal', 'diger'],
    required: true
  },
  rafOmru: { type: Date },
  tedarikci: { type: mongoose.Schema.Types.ObjectId, ref: 'Tedarikci' }
}, { timestamps: true });

module.exports = mongoose.model('Urun', urunSchema);