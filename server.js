'use strict';
const express = require('express')
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to MovieHolic back end!');
  });
  
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));