function restore_capitalize() {
	chrome.storage.sync.get('capitalize', function(items) {
		capitalize = items['capitalize'];
		document.getElementById('caps').checked = capitalize;
	});
}

function save_capitalize() {
	capitalized = document.getElementById('caps').checked;

	chrome.storage.sync.set({
		'capitalize':capitalized
	});
}

document.addEventListener('DOMContentLoaded', function() {
	restore_capitalize();
	document.getElementById('save').addEventListener('click', save_capitalize);
});
