const db = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: true
})


function handleVideoReq (req, res) {
	console.log(req.params);
	
}


 




module.exports = {
	handleVideoReq : handleVideoReq
}