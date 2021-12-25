const express = require('express');

const app = express();
const port  = 8080;

app.get('/', (req, res) => {
  res.send('Hello Express JS');
})

app.get('/about', (req, res) => {
  res.send('<h1>I\'m Hani Kawaiiiii</h1>')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})