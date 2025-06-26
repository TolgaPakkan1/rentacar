const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/rentals', require('./routes/rentals'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
