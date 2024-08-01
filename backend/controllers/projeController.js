const Proje = require('../models/Proje');

exports.projeEkle = async (req, res) => {
  try {
    const yeniProje = new Proje(req.body);
    await yeniProje.save();
    res.status(201).json(yeniProje);
  } catch (error) {
    res.status(400).json({ message: 'Proje eklenemedi', error: error.message });
  }
};

exports.projeleriGetir = async (req, res) => {
  try {
    const projeler = await Proje.find().populate('ekipUyeleri');
    res.json(projeler);
  } catch (error) {
    res.status(500).json({ message: 'Projeler getirilemedi', error: error.message });
  }
};

exports.projeGuncelle = async (req, res) => {
  try {
    const proje = await Proje.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proje) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }
    res.json(proje);
  } catch (error) {
    res.status(400).json({ message: 'Proje güncellenemedi', error: error.message });
  }
};

exports.projeSil = async (req, res) => {
  try {
    const proje = await Proje.findByIdAndDelete(req.params.id);
    if (!proje) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }
    res.json({ message: 'Proje başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Proje silinemedi', error: error.message });
  }
};