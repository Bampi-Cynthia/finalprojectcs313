
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
const usercontrol = require("./controllers/usercontroler.js")
const session = require('express-session');
const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})
//Login


// Create account

let app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());
app.use(session({
  	name: 'user-server-session',
  	secret: 'CS313p#$',
  	saveUninitialized: true,
  	resave: false
  }))



app.get ('/handlelogin',usercontrol.handlelogin)
app.post ('/createaccount', usercontrol.createaccount)

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
 // CREATE VIDEO

app.get('/video', function(req, res){
	db.query('SELECT * FROM video_view;', function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});

app.get('/video/:id', function(req, res){
	const query = sql`SELECT * FROM video_view WHERE id = ${req.params.id}::INT`;
	db.query(query, function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});
app.post('/video', function(req,res){
	const query = sql`INSERT INTO video (account_id, title, youtube_str ) 
		VALUES (${req.body.account_id}, ${req.body.title}, ${req.body.youtube_str}) RETURNING video.*`;
		db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});

	});
app.patch('/video/:id', function(req, res){
const query =sql`UPDATE video SET
  account_id = COALESCE(${req.body.account_id}, account_id),
  title = COALESCE(${req.body.title}, title),
  youtube_str = COALESCE(${req.body.youtube_str}, youtube_str)
WHERE id = ${req.params.id}
RETURNING video.*;`;
	db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});
});
app.delete('/video/:id', function(req, res){
const query =sql`DELETE FROM video WHERE id = ${req.params.id}
RETURNING video.*`;
	db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});
});
// Create Comment
app.get('/comment', function(req, res){
	db.query('SELECT * FROM comment;', function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});
app.get('/comment/:id', function(req, res){
	const query = sql`SELECT * FROM comment WHERE id = ${req.params.id}::INT`;
	db.query(query, function(error, result){
		if (error){
			throw error;
		}
		res.json(result.rows);
	});
});
app.post('/comment', function(req,res){
	const query = sql`INSERT INTO comment (account_id, video_id, content, post_date ) 
		VALUES (${req.body.account_id}, ${req.body.video_id}, ${req.body.content}, ${req.body.post_date}) RETURNING comment.*`;
		db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});

	});
app.patch('/comment/:id', function(req, res){
const query =sql`UPDATE comment SET
  account_id = COALESCE(${req.body.account_id}, account_id),
  video_id = COALESCE(${req.body.video_id}, video_id),
  content = COALESCE(${req.body.content}, content),
  post_date = COALESCE(${req.body.post_date}, post_date)
WHERE id = ${req.params.id}
RETURNING account.*;`;
	db.query(query, function(error, result){
			if (error){
				throw error;
			}
			res.json(result.rows);
			});
});
app.delete('/comment/:id', function(req, res){
const query =sql`DELETE FROM comment WHERE id = ${req.params.id}
RETURNING comment.*`;
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


