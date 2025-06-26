function verifyAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Yönetici erişimi gerekli' });
  }
  next();
}

module.exports = verifyAdmin;
