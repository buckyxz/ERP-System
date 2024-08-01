const Kullanici = require('../models/Kullanici');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.kayit = async (req, res) => {
  try {
    const { ad, email, parola, rol } = req.body;
    let kullanici = await Kullanici.findOne({ email });
    if (kullanici) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda.' });
    }
    kullanici = new Kullanici({ ad, email, parola, rol });
    await kullanici.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

exports.giris = async (req, res) => {
  try {
    const { email, parola } = req.body;
    const kullanici = await Kullanici.findOne({ email });
    if (!kullanici) {
      return res.status(400).json({ message: 'Geçersiz email veya parola.' });
    }
    const isMatch = await bcrypt.compare(parola, kullanici.parola);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz email veya parola.' });
    }
    const token = jwt.sign({ id: kullanici._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, kullaniciId: kullanici._id, rol: kullanici.rol });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

exports.tumKullanicilariGetir = async (req, res) => {
  try {
    const kullanicilar = await Kullanici.find().select('-parola');
    res.json(kullanicilar);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};
