chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
      url: 'https://www.quicksend.info/install',
      active: true
    });

    return false;
  });
