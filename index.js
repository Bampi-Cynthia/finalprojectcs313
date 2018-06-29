
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
const bodyParser = require('body-parser');
const bcrypt =require('bcryptjs');
const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})


// Create account

let app = express();
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.end("hello, world!");
});

app.get('/account', function(req, res){
	db.query('SELECT * FROM account;', function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});

app.get('/account/:id', function(req, res){
	const query = sql`SELECT * FROM account WHERE id = ${req.params.id}::INT`;
	db.query(query, function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});

app.post('/account', function(req,res){
	bcrypt.hash(req.body.password, 10, function(error, hash){
		if (error){
			throw error;
		}

		const query = sql`INSERT INTO account (email, password_hash ) 
		VALUES (${req.body.email}, ${hash}) RETURNING account.*`;
		db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});

	});
	
});
app.patch('/account/:id', function(req, res){
const query =sql`UPDATE account SET
  email = COALESCE(${req.body.email}, email),
  password_hash = COALESCE(${req.body.password_hash}, password_hash)
WHERE id = ${req.params.id}
RETURNING account.*;`;
	db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});
});
app.delete('/account/:id', function(req, res){
const query =sql`DELETE FROM account WHERE id = ${req.params.id}
RETURNING account.*`;
	db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});
});
 // 

app.get('/account/:id', function(req, res){
	const query = sql`SELECT * FROM account WHERE id = ${req.params.id}::INT`;
	db.query(query, function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});



app.listen(process.env.PORT || 3000, function() {
	console.log('Now listening');
});


