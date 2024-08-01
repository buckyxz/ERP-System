const Siparis = require('../models/Siparis');
const UretimEmri = require('../models/UretimEmri');

exports.finansalRapor = async (req, res) => {
  try {
    const gelirler = await Siparis.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$tarih" } },
          toplamGelir: { $sum: '$toplamTutar' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const giderler = await UretimEmri.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$baslangicTarihi" } },
          toplamMaliyet: { $sum: '$toplamMaliyet' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ gelirler, giderler });
  } catch (error) {
    res.status(500).json({ message: 'Finansal rapor oluşturulamadı', error: error.message });
  }
};

exports.stokRaporu = async (req, res) => {
  try {
    const stokDurumu = await Urun.aggregate([
      {
        $group: {
          _id: '$kategori',
          toplamStok: { $sum: '$adet' },
          ortalamaSatisFiyati: { $avg: '$satisFiyati' }
        }
      }
    ]);
    res.json(stokDurumu);
  } catch (error) {
    res.status(500).json({ message: 'Stok raporu oluşturulamadı', error: error.message });
  }
};