chrome.runtime.onInstalled.addListener(function () {
	chrome.tabs.create({
		url: 'https://www.quicksend.info/install',
		active: true
	});

	return false;
});

// chrome.browserAction.onClicked.addListener(function(tab) { // TODO: make it run on icon click so that the keyboard shortcut can be changed
//     message();
// });
