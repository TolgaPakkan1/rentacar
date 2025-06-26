const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// API rotaları
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/rentals', require('./routes/rentals'));

// Render için ana dizin yanıtı (https://rentacar-xx.onrender.com)
app.get('/', (req, res) => {
  res.send('Rent a Car API yayında!');
});

// Sunucuyu başlat
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
