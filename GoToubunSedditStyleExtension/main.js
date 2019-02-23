
gotoubunExtensionMain();

function gotoubunExtensionMain () {
	
	var arguments = [	[/ichika/i, "ichika"],
						[/nino/i, "nino"],
						[/miku/i, "miku"],
						[/yotsuba|yotsubro|genki/i, "yotsuba"],
						[/itsuki|eatsuki|eatski/i, "itsuki"]
					];
					
	var sisters = {
		ichika: arguments[0],
		nino: arguments[1],
		miku: arguments[2],
		yotsuba: arguments[3],
		itsuki: arguments[4]
	};
					
	Array.prototype.forEach.call(arguments, function(currSister) {
		
		var key = currSister[1] + "-box";
		chrome.storage.sync.get(key, function(result) {
			if(result[key])
			{
				styleByGirl(currSister[0], currSister[1]);
			}
		});
		
	});
					
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		console.log("storage changed");
        for (var key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
					  
			var sisterName = key.match(/(.*)-box/i)[1];
			var regex = sisters[sisterName][0];
			if(storageChange.newValue == true)
			{
				styleByGirl(regex, sisterName);
			}
			else {
				var className = sisterName + "-flair";
				unstyleByGirl(className);
			}
        }
      });
}

function styleByGirl(regex, sisterName) {
	
	var postTitles = document.querySelectorAll("a.title");

	for(var i = 0; i < postTitles.length; i++)
	{
		var isYotsubaTitle = regex.test(postTitles[i].innerText);
		if(isYotsubaTitle){
			postTitles[i].parentElement.parentElement.classList.add(sisterName + "-flair");
			postTitles[i].parentElement.parentElement.classList.add("gotoubun-extension-post");	
		}
	}
}

function unstyleByGirl(className) {
	console.log("unstyleByGirl();");
	console.log("remove class: " + className);
	var postsUnderGirl = document.getElementsByClassName(className);
	console.log(postsUnderGirl);
	while(postsUnderGirl.length > 0)
	{
		var currPost = postsUnderGirl[0];
		currPost.classList.remove(className);
		if(!postHasOtherGirl(currPost))
		{
			currPost.classList.remove("gotoubun-extension-post");
		}
	}
}

function postHasOtherGirl(node) {
	return (Array.prototype.includes.call(node.classList, 'ichika-flair') ||
			Array.prototype.includes.call(node.classList, 'nino-flair') ||
			Array.prototype.includes.call(node.classList, 'miku-flair') ||
			Array.prototype.includes.call(node.classList, 'yotsuba-flair') ||
			Array.prototype.includes.call(node.classList, 'itsuki-flair'));
}