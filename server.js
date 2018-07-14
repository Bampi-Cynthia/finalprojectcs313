const express = require('express');
const Pool = require('pg').Pool;
const sql = require('pga-sql');
const bodyParser = require('body-parser');
const bcrypt =require('bcryptjs');
const session = require('express-session');
const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})



// register the session with ID



//login route
app.post('/login', function(req,res){

	req.session.email = req.body.email;
	req.session.password = req.body.password;
	res.end('done');
})

//main route
app.get('/', function(req,res){
	if(req.session.email){
		res.redirect('/logged');
	}
	else{
		res.render('welcome.html');
	}
});
//logged route
app.get('/logged', function(req,res){
	if(req.session.email){
		res.write("<h1>User Logged In</h1><a href='/logout'>Logout</a>");
		res.end();
	}
	else{
		res.write("<h1>User Not Logged In</h1><a href='/'>Main Page</a>");
		res.end();
	}
});

// logout route
app.get('/logout',function(req,res){
	req.session.destroy(function(error){
		if(error){
			res.negotiate(error);
		}
		res.redirect('/');
	})

});