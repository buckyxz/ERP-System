const IsAkisi = require('../models/IsAkisi');

exports.isAkisiEkle = async (req, res) => {
  try {
    const yeniIsAkisi = new IsAkisi(req.body);
    await yeniIsAkisi.save();
    res.status(201).json(yeniIsAkisi);
  } catch (error) {
    res.status(400).json({ message: 'İş akışı eklenemedi', error: error.message });
  }
};

exports.isAkislariniGetir = async (req, res) => {
  try {
    const isAkislari = await IsAkisi.find().populate('adimlar.sorumlu', 'ad');
    res.json(isAkislari);
  } catch (error) {
    res.status(500).json({ message: 'İş akışları getirilemedi', error: error.message });
  }
};

exports.isAkisiGuncelle = async (req, res) => {
  try {
    const isAkisi = await IsAkisi.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!isAkisi) {
      return res.status(404).json({ message: 'İş akışı bulunamadı' });
    }
    res.json(isAkisi);
  } catch (error) {
    res.status(400).json({ message: 'İş akışı güncellenemedi', error: error.message });
  }
};

exports.isAkisiSil = async (req, res) => {
  try {
    const isAkisi = await IsAkisi.findByIdAndDelete(req.params.id);
    if (!isAkisi) {
      return res.status(404).json({ message: 'İş akışı bulunamadı' });
    }
    res.json({ message: 'İş akışı başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'İş akışı silinemedi', error: error.message });
  }
};