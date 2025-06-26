const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'users.json');
const carsPath = path.join(__dirname, 'cars.json');
const brandsPath = path.join(__dirname, 'brands.json');
const rentalsPath = path.join(__dirname, 'rentals.json');

const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    isAdmin: true
  },
  {
    id: 2,
    username: 'user',
    password: '123456',
    isAdmin: false
  }
];

const brands = ['Mercedes', 'BMW'];

const cars = [
  {
    id: 1,
    brand: 'Mercedes',
    model: 'C200',
    year: 2020,
    transmission: 'Automatic',
    color: 'Black',
    km: 15000,
    dailyPrice: 500,
    availableCount: 3,
    image: 'mercedes_c200.jpg'
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    transmission: 'Automatic',
    color: 'White',
    km: 10000,
    dailyPrice: 600,
    availableCount: 2,
    image: 'bmw_x5.jpg'
  }
];

function seed() {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  fs.writeFileSync(brandsPath, JSON.stringify(brands, null, 2));
  fs.writeFileSync(carsPath, JSON.stringify(cars, null, 2));
  fs.writeFileSync(rentalsPath, JSON.stringify([], null, 2));
  console.log('✅ Seed verileri başarıyla yüklendi.');
}

seed();
