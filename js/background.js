chrome.runtime.onInstalled.addListener(function () {
	chrome.tabs.create({
		url: 'https://www.quicksend.info/install',
		active: true
	});

	return false;
});

// TODO: add a "would you like to see popup for new updates"