function save() {
	data = processform();

	control = data[0];
	alt = data[1];
	shift = data[2];
	letter = data[3];

	chrome.storage.sync.set({
		'control': control,
		'alt': alt,
		'shift': shift,
		'letter': letter
	}, function() {
		alert("Success!");
	});
}

function restore() {
	chrome.storage.sync.get([
		'control',
		'alt',
		'shift',
		'letter'
	], function(items) {
		document.getElementById('control').checked = items.control;
		document.getElementById('alt').checked = items.alt;
		document.getElementById('shift').checked = items.shift;
		document.getElementById('letter').value = items.letter;
	});
}

function processform() {
	control = document.getElementById('control').checked;
	alt = document.getElementById('alt').checked;
	shift = document.getElementById('shift').checked;
	letter = document.getElementById('letter').value;

	return [control, alt, shift, letter];
}

document.addEventListener('DOMContentLoaded', function() {
	restore();
	document.getElementById('save').addEventListener('click', save);
});
