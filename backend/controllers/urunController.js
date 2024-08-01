const Urun = require('../models/Urun');

exports.urunEkle = async (req, res) => {
  try {
    const yeniUrun = new Urun(req.body);
    await yeniUrun.save();
    res.status(201).json(yeniUrun);
  } catch (error) {
    res.status(400).json({ message: 'Ürün eklenemedi', error: error.message });
  }
};

exports.urunleriGetir = async (req, res) => {
  try {
    const urunler = await Urun.find();
    res.json(urunler);
  } catch (error) {
    res.status(500).json({ message: 'Ürünler getirilemedi', error: error.message });
  }
};

exports.urunGuncelle = async (req, res) => {
  try {
    const urun = await Urun.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!urun) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(urun);
  } catch (error) {
    res.status(400).json({ message: 'Ürün güncellenemedi', error: error.message });
  }
};

exports.urunSil = async (req, res) => {
  try {
    const urun = await Urun.findByIdAndDelete(req.params.id);
    if (!urun) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json({ message: 'Ürün başarıyla silindi', urun });
  } catch (error) {
    res.status(500).json({ message: 'Ürün silinemedi', error: error.message });
  }
};