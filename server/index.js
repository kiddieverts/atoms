const path = require('path')
const express = require('express');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use('/', express.static(path.join(__dirname, 'vanilla')))

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
