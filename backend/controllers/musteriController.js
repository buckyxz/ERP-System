const Musteri = require('../models/Musteri');

exports.musteriEkle = async (req, res) => {
  try {
    const yeniMusteri = new Musteri(req.body);
    await yeniMusteri.save();
    res.status(201).json(yeniMusteri);
  } catch (error) {
    res.status(400).json({ message: 'Müşteri eklenemedi', error: error.message });
  }
};

exports.musterileriGetir = async (req, res) => {
  try {
    const musteriler = await Musteri.find();
    res.json(musteriler);
  } catch (error) {
    res.status(500).json({ message: 'Müşteriler getirilemedi', error: error.message });
  }
};

exports.musteriGuncelle = async (req, res) => {
  try {
    const musteri = await Musteri.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!musteri) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }
    res.json(musteri);
  } catch (error) {
    res.status(400).json({ message: 'Müşteri güncellenemedi', error: error.message });
  }
};

exports.musteriSil = async (req, res) => {
  try {
    const musteri = await Musteri.findByIdAndDelete(req.params.id);
    if (!musteri) {
      return res.status(404).json({ message: 'Müşteri bulunamadı' });
    }
    res.json({ message: 'Müşteri başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Müşteri silinemedi', error: error.message });
  }
};