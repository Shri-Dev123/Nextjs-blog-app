const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('../routes');

const app = express();
dotenv.config();

// Use middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Register routes
app.use('/api', routes);

// Connect to database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error(err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
