const Belge = require('../models/Belge');

exports.belgeEkle = async (req, res) => {
  try {
    const yeniBelge = new Belge({
      ...req.body,
      dosyaYolu: req.file.path, // Assuming you're using multer for file upload
      yuklenenKullanici: req.kullanici._id
    });
    await yeniBelge.save();
    res.status(201).json(yeniBelge);
  } catch (error) {
    res.status(400).json({ message: 'Belge eklenemedi', error: error.message });
  }
};

exports.belgeleriGetir = async (req, res) => {
  try {
    const belgeler = await Belge.find().populate('yuklenenKullanici', 'ad');
    res.json(belgeler);
  } catch (error) {
    res.status(500).json({ message: 'Belgeler getirilemedi', error: error.message });
  }
};

exports.belgeSil = async (req, res) => {
  try {
    const belge = await Belge.findByIdAndDelete(req.params.id);
    if (!belge) {
      return res.status(404).json({ message: 'Belge bulunamadı' });
    }
    // Burada dosyayı fiziksel olarak silme işlemi de eklenebilir
    res.json({ message: 'Belge başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Belge silinemedi', error: error.message });
  }
};