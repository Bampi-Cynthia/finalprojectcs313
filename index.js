
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

const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})




let app = express();
app.get('/', function(req, res) {
	res.end("hello, world!");
});

app.get('/account', function(req, res){
	res.end('all accounts');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Now listening');
});