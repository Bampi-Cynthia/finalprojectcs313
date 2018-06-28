
/*
http.createServer((req, res) => {
  res.end('Hello, Bom dia!');
}).listen(process.env.PORT || 3000, () => {
  console.log('Now listening for connections!');
});
*/
const express = require('express');
const Pool = require('pg').Pool;
const sql = require('pga-sql');

let app = express();
app.get('/', function(req, res) {
	res.end("hello, world!");
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Now listening');
});