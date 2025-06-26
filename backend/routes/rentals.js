const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const cars = require('../data/cars.json');
const rentals = require('../data/rentals.json');
const fs = require('fs');
const path = require('path');
router.post('/', verifyToken, (req, res) => {
  const {
    carId,
    startDate,
    endDate,
    price,
    pickupLocation,
    dropoffLocation
  } = req.body;

  const numericCarId = Number(carId);
  const car = cars.find(c => c.id === numericCarId);

  if (!car) {
    return res.status(404).json({ message: "Araç bulunamadı" });
  }

  if (car.availableCount <= 0) {
    return res.status(400).json({ message: "Seçtiğiniz araç kiralanmıştır" });
  }

  const rental = {
    id: 'r' + Math.floor(100000 + Math.random() * 900000),
    carId: car.id,
    userId: req.user.id,
    startDate,
    endDate,
    price,
    pickupLocation,
    dropoffLocation,
    status: "active",
    car: car
  };

  car.availableCount--;
  rentals.push(rental);

  fs.writeFileSync(path.join(__dirname, '../data/rentals.json'), JSON.stringify(rentals, null, 2));
  fs.writeFileSync(path.join(__dirname, '../data/cars.json'), JSON.stringify(cars, null, 2));

  res.status(201).json({ message: "Araç kiralandı", rental });
});
router.get('/user', verifyToken, (req, res) => {
  const userRentals = rentals.filter(r => r.userId === req.user.id);
  res.json(userRentals);
});
router.get('/active', verifyToken, verifyAdmin, (req, res) => {
  const activeRentals = rentals.filter(r => r.status === 'active');
  res.json(activeRentals);
});
router.post('/return', verifyToken, verifyAdmin, (req, res) => {
  const { rentalId } = req.body;
  const rental = rentals.find(r => r.id === rentalId);
  if (!rental) {
    return res.status(404).json({ message: "Kiralama bulunamadı" });
  }

  if (rental.status !== 'active') {
    return res.status(400).json({ message: "Bu kiralama zaten teslim alınmış." });
  }

  rental.status = "returned";

  const car = cars.find(c => c.id === rental.carId);
  if (car) car.availableCount++;

  fs.writeFileSync(path.join(__dirname, '../data/rentals.json'), JSON.stringify(rentals, null, 2));
  fs.writeFileSync(path.join(__dirname, '../data/cars.json'), JSON.stringify(cars, null, 2));

  res.json({ message: "Araç teslim alındı", rental });
});
router.patch('/:id/return', verifyToken, verifyAdmin, (req, res) => {
  const rentalId = req.params.id;
  const rental = rentals.find(r => r.id === rentalId);

  if (!rental) {
    return res.status(404).json({ message: "Kiralama bulunamadı" });
  }

  if (rental.status !== 'active') {
    return res.status(400).json({ message: "Bu kiralama zaten teslim alınmış." });
  }

  rental.status = "returned";

  const car = cars.find(c => c.id === rental.carId);
  if (car) car.availableCount++;

  fs.writeFileSync(path.join(__dirname, '../data/rentals.json'), JSON.stringify(rentals, null, 2));
  fs.writeFileSync(path.join(__dirname, '../data/cars.json'), JSON.stringify(cars, null, 2));

  res.json({ message: "Teslim işlemi başarılı", rental });
});

module.exports = router;
