chrome.runtime.onInstalled.addListener(function (object) {
	if (object.reason == 'install') {
		chrome.tabs.create({
			url: 'https://www.quicksend.info/install',
			active: true
		});

		return false;
	}
});

// TODO: show webpage only on install, not updates
