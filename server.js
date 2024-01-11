const express = require('express');
const app = express();
const { sequelize } = require('./src/models');
const { config } = require('dotenv');
const cors = require('cors');
const public = require('./src/routes/public');
const web = require('./src/routes/web');
const auth = require('./src/middleware/auth.js')
config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use(cors());
app.use('/api/', public);
app.use('/api/web/',auth,web);

// Only start the server if it is not being used for testing
if (!module.parent) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

module.exports = app;