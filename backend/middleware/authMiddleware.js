const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rentacar-secret'; // DÜZENLENDİ

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token gerekli' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Geçersiz token' });
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
