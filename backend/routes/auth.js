const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../data/users.json');
const SECRET_KEY = 'rentacar-secret';

const loadUsers = () => JSON.parse(fs.readFileSync(usersPath));
const saveUsers = (data) => fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));

router.post('/register', (req, res) => {
  const { username, password, isAdmin = false } = req.body;
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Bu kullanıcı adı zaten var' });
  }

  const hashed = bcrypt.hashSync(password, 8);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashed,
    isAdmin
  };

  users.push(newUser);
  saveUsers(users);
  res.status(201).json({ message: 'Kayıt başarılı' });
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Geçersiz şifre' });

  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token, isAdmin: user.isAdmin });
});

module.exports = router;
