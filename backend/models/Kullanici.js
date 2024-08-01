const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const kullaniciSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  parola: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['admin', 'yonetici', 'calisan'],
    default: 'calisan'
  }
}, { timestamps: true });

kullaniciSchema.pre('save', async function(next) {
  if (!this.isModified('parola')) return next();
  this.parola = await bcrypt.hash(this.parola, 8);
  next();
});

module.exports = mongoose.model('Kullanici', kullaniciSchema);
