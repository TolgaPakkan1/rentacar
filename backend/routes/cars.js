const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const carsPath = path.join(__dirname, '../data/cars.json');
const SECRET_KEY = 'rentacar-secret';

const loadCars = () => JSON.parse(fs.readFileSync(carsPath));
const saveCars = (data) => fs.writeFileSync(carsPath, JSON.stringify(data, null, 2));
const verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Token gerekli' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], SECRET_KEY);
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Admin yetkisi yok' });
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Geçersiz token' });
  }
};
router.get('/brands', (req, res) => {
  const cars = loadCars().filter(c => c.isActive !== false);
  const brands = [...new Set(cars.map(car => car.brand))];
  res.json(brands);
});
router.get('/', (req, res) => {
  const cars = loadCars().filter(c => c.isActive !== false);
  const { brand } = req.query;
  const filtered = brand ? cars.filter(c => c.brand === brand) : cars;
  res.json(filtered);
});
router.post('/', verifyAdmin, (req, res) => {
  const cars = loadCars();
  const newCar = {
    id: cars.length + 1,
    ...req.body,
    availableCount: req.body.availableCount || 1,
    isActive: true
  };
  cars.push(newCar);
  saveCars(cars);
  res.status(201).json({ message: 'Araç eklendi', car: newCar });
});
router.delete('/:id', verifyAdmin, (req, res) => {
  const cars = loadCars();
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Araç bulunamadı' });
  }
  cars.splice(index, 1);
  saveCars(cars);
  res.json({ message: 'Araç silindi' });
});
router.put('/:id', verifyAdmin, (req, res) => {
  const cars = loadCars();
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Araç bulunamadı' });
  }
  cars[index] = { ...cars[index], ...req.body };
  saveCars(cars);
  res.json({ message: 'Araç güncellendi', car: cars[index] });
});

module.exports = router;
