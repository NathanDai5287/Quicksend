function get_message() {
    // get most recent message
    let messages = document.getElementsByClassName('oIy2qc');
    let latest = messages[messages.length - 1].innerText;

    // latest.select();
    // document.execCommand('copy');

    // enter into text box
    let textbox = document.getElementsByClassName('KHxj8b tL9Q4c')[0];
    textbox.value = latest;
    textbox.setAttribute("data-initial-value", latest);

    console.log('done');

    return latest;
}

chrome.browserAction.onClicked.addListener(function(tab) {
	alert('working');
	get_message();
});
