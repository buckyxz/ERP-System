const Kullanici = require('../models/Kullanici');
const Urun = require('../models/Urun');
const Siparis = require('../models/Siparis');

exports.dashboard = async (req, res) => {
  try {
    const kullaniciSayisi = await Kullanici.countDocuments();
    const urunSayisi = await Urun.countDocuments();
    const siparisSayisi = await Siparis.countDocuments();
    const toplamSatis = await Siparis.aggregate([
      { $group: { _id: null, total: { $sum: '$toplamTutar' } } }
    ]);

    res.json({
      kullaniciSayisi,
      urunSayisi,
      siparisSayisi,
      toplamSatis: toplamSatis[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard verisi alınamadı', error: error.message });
  }
};

exports.kullanicilariListele = async (req, res) => {
  try {
    const kullanicilar = await Kullanici.find().select('-parola');
    res.json(kullanicilar);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar listelenemedi', error: error.message });
  }
};

exports.kullaniciRolGuncelle = async (req, res) => {
  try {
    const kullanici = await Kullanici.findByIdAndUpdate(
      req.params.id, 
      { rol: req.body.rol },
      { new: true }
    ).select('-parola');
    
    if (!kullanici) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    res.json(kullanici);
  } catch (error) {
    res.status(400).json({ message: 'Kullanıcı rolü güncellenemedi', error: error.message });
  }
};