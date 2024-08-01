const mongoose = require('mongoose');

const faturaSchema = new mongoose.Schema({
  siparis: { type: mongoose.Schema.Types.ObjectId, ref: 'Siparis', required: true },
  odemeDurumu: { 
    type: String, 
    enum: ['odenmedi', 'kismiOdeme', 'odendi'],
    default: 'odenmedi'
  },
  odemeTarihi: Date
}, { timestamps: true });

module.exports = mongoose.model('Fatura', faturaSchema);