gotoubunExtensionPopupMain();

function gotoubunExtensionPopupMain () {
	console.log("gotoubunExtensionPopupMain()");
	
	var sisters = [];
	sisters[0] = document.getElementById('ichika-box');
	sisters[1] = document.getElementById('nino-box');
	sisters[2] = document.getElementById('miku-box');
	sisters[3] = document.getElementById('yotsuba-box');
	sisters[4] = document.getElementById('itsuki-box');
	
	initMenuFromMemory();
	setUpListeners();
	
	function initMenuFromMemory () {		
		Array.prototype.forEach.call(sisters, function(currSister) {
			
			var key = currSister.id;
			console.log("trying to get value of key, " + key);
			chrome.storage.sync.get(key, function(result) {
				console.log("key: " + key);
				console.log("result[key]: " + result[key]);
				currSister.checked = result[key];
			});
		});
	}
	
	function setUpListeners () {
		Array.prototype.forEach.call(sisters, function(currSister) {
			
			currSister.addEventListener('change', function () {
				var key = currSister.id;
				var value = currSister.checked;
				var obj = {};
				obj[key] = value;
				console.log("obj: ");
				console.log(obj);
				chrome.storage.sync.set(obj, function() {
					console.log("setting key/value: ");
					console.log(obj);
				});
			});
		});
		
	}
}

