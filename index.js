const http = require('http');

http.createServer((req, res) => {
  res.end('Hello, Bom dia!');
}).listen(process.env.PORT || 3000, () => {
  console.log('Now listening for connections!');
});