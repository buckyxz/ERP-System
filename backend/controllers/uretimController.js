const UretimEmri = require('../models/UretimEmri');

exports.uretimEmriEkle = async (req, res) => {
  try {
    const yeniUretimEmri = new UretimEmri(req.body);
    await yeniUretimEmri.save();
    res.status(201).json(yeniUretimEmri);
  } catch (error) {
    res.status(400).json({ message: 'Üretim emri eklenemedi', error: error.message });
  }
};

exports.uretimEmirleriGetir = async (req, res) => {
  try {
    const uretimEmirleri = await UretimEmri.find().populate('urun');
    res.json(uretimEmirleri);
  } catch (error) {
    res.status(500).json({ message: 'Üretim emirleri getirilemedi', error: error.message });
  }
};

exports.uretimEmriGuncelle = async (req, res) => {
  try {
    const uretimEmri = await UretimEmri.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!uretimEmri) {
      return res.status(404).json({ message: 'Üretim emri bulunamadı' });
    }
    res.json(uretimEmri);
  } catch (error) {
    res.status(400).json({ message: 'Üretim emri güncellenemedi', error: error.message });
  }
};