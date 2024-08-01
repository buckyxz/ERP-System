const jwt = require('jsonwebtoken');
const Kullanici = require('../models/Kullanici');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'Kimlik doğrulama gerekli.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const kullanici = await Kullanici.findById(decoded.id);

    if (!kullanici) {
      throw new Error();
    }

    req.token = token;
    req.kullanici = kullanici;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Geçersiz veya süresi dolmuş kimlik doğrulama.' });
  }
};

module.exports = auth;
