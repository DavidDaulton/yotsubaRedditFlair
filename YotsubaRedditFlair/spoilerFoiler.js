
main();

function main () {
	
	styleYotsubaPostTitles();
}

function styleYotsubaPostTitles() {
	console.log("styleYotsubaPostTitles()");
	var yotsubaIdentifiers = ['yotsuba', 'yotsubro'];
	
	var postTitles = document.querySelectorAll("a.title");
	var regex = new RegExp( /yotsuba|yotsubro|genki/i);
	
	var imagePath = chrome.runtime.getURL('yotsuba.png');
	console.log("path: " + imagePath);

	for(var i = 0; i < postTitles.length; i++)
	{
		var isYotsubaTitle = regex.test(postTitles[i].innerText);
		if(isYotsubaTitle){
			postTitles[i].parentElement.parentElement.classList.add("yotsuba-flair");
			
			
			
			
			
		}
		
	}
}
