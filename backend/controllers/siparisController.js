const Siparis = require('../models/Siparis');
const Urun = require('../models/Urun');

exports.siparisEkle = async (req, res) => {
  try {
    const yeniSiparis = new Siparis(req.body);
    await yeniSiparis.save();

    // Stok güncelleme
    for (let item of yeniSiparis.urunler) {
      await Urun.findByIdAndUpdate(item.urun, { $inc: { adet: -item.adet } });
    }

    res.status(201).json(yeniSiparis);
  } catch (error) {
    res.status(400).json({ message: 'Sipariş eklenemedi', error: error.message });
  }
};

exports.siparisleriGetir = async (req, res) => {
  try {
    const siparisler = await Siparis.find().populate('musteri', 'ad').populate('urunler.urun', 'ad satisFiyati');
    res.json(siparisler);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler getirilemedi', error: error.message });
  }
};

exports.siparisDurumGuncelle = async (req, res) => {
  try {
    const siparis = await Siparis.findByIdAndUpdate(
      req.params.id, 
      { durum: req.body.durum }, 
      { new: true }
    );
    if (!siparis) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
    res.json(siparis);
  } catch (error) {
    res.status(400).json({ message: 'Sipariş durumu güncellenemedi', error: error.message });
  }
};