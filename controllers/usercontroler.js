const Pool = require('pg').Pool;
const sql = require('pga-sql');
var bcrypt = require('bcryptjs');
const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})

function handlelogin (req, res){
	const query = sql`SELECT password_hash FROM account WHERE email = ${req.query.email}`;
	console.log(query)
	 db.query(query, function(error, result){
	 			if (error){
	 				return res.redirect("/createaccount.html");
				} else {
	 				return res.redirect("/home.html");
				}
	// Load hash from your password DB.
  bcrypt.compare(req.query.password, hash).then(function(res) {
	console.log(req.query);

			});
    	});
    }

function createaccount (req, res){
	var email = req.body.email;
	
    bcrypt.hash(req.body.password, 10, function(error, hash) {
    	if(error ){
    		console.log("error hashing password")
    	} else {
    		console.log(hash)
    		const query =sql`INSERT INTO account (email, password_hash) VALUES ( ${email} , ${hash})`;
    		console.log(query)
    		db.query(query, function(error, result){
				if (error){
					console.log("Error user");
				} else{
					return res.redirect("/home.html");
				}
				
			});
    	}

        // Store hash in your password DB.   
	});
	// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });

}



module.exports = {
	handlelogin:handlelogin, 
	createaccount:createaccount
};