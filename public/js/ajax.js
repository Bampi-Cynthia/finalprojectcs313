function get(url, callback){
var request = new XMLHttpRequest();
request.addEventListener('load', function(){
if (request.status === 200){
return callback(null, request.responseText);


}
callback(new Error('Get Unsuceessful'));

});
request.open('GET',url, true);
request.send();


}
function post(url, data, callback){
	var request = new XMLHttpRequest();
request.addEventListener('load', function(){
if (request.status === 200){
return callback(null, request.responseText);


}
callback(new Error('Post Unsuceessful'));

});
request.open('POST',url, true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send(JSON.stringify(data));

}
function patch(url, data, callback) {
	var request = new XMLHttpRequest();
	request.addEventListener('load', function(){
if (request.status === 200){
return callback(null, request.responseText);


}
callback(new Error('Patch Unsuceessful'));

});
	request.open('PATCH',url, true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send(JSON.stringify(data));
}
function erase(url, callback){
var request = new XMLHttpRequest();
request.addEventListener('load', function(){
if (request.status === 200){
return callback(null, request.responseText);


}
callback(new Error('Delete Unsuceessful'));

});
request.open('DELETE',url, true);
request.send();


}