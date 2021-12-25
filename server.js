const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request running...');
  res.setHeader('Content-type', 'text/html');
  res.write('<h3>hello world</h3>');
  res.write('<h6>Software Engineer</h6>');
  res.end();
})

server.listen(3000, 'localhost', () => {
  console.log('NodeJS is running on port 3000 ...')
})