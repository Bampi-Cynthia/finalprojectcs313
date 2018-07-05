function clearTarget(target){
	while(target.firstChild){
		target.removeChild(target.firstChild);
	}

}

function formatVideo(data){
	var frag = document.createDocumentFragment();
	var video = document.createElement('div'); 
	video.classList.add('video-container');
	var iframe = document.createElement('iframe');
	iframe.src='https://www.youtube.com/embed/' + data.youtube_str;



	video.appendChild(iframe);
	frag.appendChild(video);
	return frag;
}


function displayAllVideos(target, data){
	clearTarget(target);

	data.forEach(function(video){
		target.appendChild(formatVideo(video));
	});
}
function displayOneVideo(target, data){
	clearTarget(target);
	target.appendChild(formatVideo(data));
}

document.addEventListener("DOMContentLoaded", function(){
	var display = document.getElementById('display');
	var showAllVideos = document.getElementById('showAllVideos');
	var showOneVideo = document.getElementById('showOneVideo');
	var newVideo = document.getElementById('newVideo');
	showAllVideos.addEventListener('click', function(){
		get('video', function(error, result){
			if (error) {
				return console.log(error.message);
			}
			var data = JSON.parse(result);
			displayAllVideos(display, data);
		});
	})

showOneVideo.addEventListener('click', function(){
	var id = parseInt(showOneVideo.nextElementSibling.value);
	var url = 'video/' + id;


		get(url, function(error, result){
			if (error) {
				return console.log(error.message);
			}
			var data = JSON.parse(result);
			displayOneVideo(display, data.shift());
		});
	})
	newVideo.addEventListener('submit', function(e){
		e.preventDefault();
		var data = {
			account_id:newVideo.elements.namedItem('account_id').value,
			title: newVideo.elements.namedItem('title').value,
			youtube_str: newVideo.elements.namedItem('youtube_str').value
		};
		
		post('video', data, function(error, result){
			if (error) {
				return console.log(error.message);
			}
			console.log(result);
		});
	});

});