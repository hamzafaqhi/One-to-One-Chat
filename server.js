const express = require('express');
const app = express();
const { sequelize } = require('./src/models');
const { config } = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./src/routes/api');
config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use(cors());
app.use('/api/', apiRoutes);

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