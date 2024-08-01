const Calisan = require('../models/Calisan');

exports.calisanEkle = async (req, res) => {
  try {
    const yeniCalisan = new Calisan(req.body);
    await yeniCalisan.save();
    res.status(201).json(yeniCalisan);
  } catch (error) {
    res.status(400).json({ message: 'Çalışan eklenemedi', error: error.message });
  }
};

exports.calisanlariGetir = async (req, res) => {
  try {
    const calisanlar = await Calisan.find();
    res.json(calisanlar);
  } catch (error) {
    res.status(500).json({ message: 'Çalışanlar getirilemedi', error: error.message });
  }
};

exports.calisanGuncelle = async (req, res) => {
  try {
    const calisan = await Calisan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!calisan) {
      return res.status(404).json({ message: 'Çalışan bulunamadı' });
    }
    res.json(calisan);
  } catch (error) {
    res.status(400).json({ message: 'Çalışan güncellenemedi', error: error.message });
  }
};

exports.calisanSil = async (req, res) => {
  try {
    const calisan = await Calisan.findByIdAndDelete(req.params.id);
    if (!calisan) {
      return res.status(404).json({ message: 'Çalışan bulunamadı' });
    }
    res.json({ message: 'Çalışan başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Çalışan silinemedi', error: error.message });
  }
};