import { sequelize } from './connection';

export {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', router);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server is running on port ${port}`);
});
