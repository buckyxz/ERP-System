const adminAuth = (req, res, next) => {
    if (req.kullanici && req.kullanici.rol === 'admin') {
      next();
    } else {
      res.status(403).send({ error: 'Bu işlem için admin yetkisi gerekiyor.' });
    }
  };
  
  module.exports = adminAuth;