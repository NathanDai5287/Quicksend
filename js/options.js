function compress(control, alt, shift, letter) {
	return String(control ? 1 : 0) + String(alt ? 1 : 0) + String(shift ? 1 : 0) + letter;
}

function decompress(value) {
	return [string2bool(value[0]), string2bool(value[1]), string2bool(value[2]), value[3]]
}

function string2bool(value) {
	return parseInt(value) ? true : false;
}

function valid(control, alt, shift, letter, message=true) {
	if (control == false && alt == false && shift == false) {
		return false;
	}

	if (letter == '') {
		return false;
	}

	if (message == '') {
		return false;
	}

	return true;
}

function save_quicksend() {
	data = processform();

	control = data[0];
	alt = data[1];
	shift = data[2];
	letter = data[3];

	if (valid(control, alt, shift, letter)) {
		combination = compress(control, alt, shift, letter);

		chrome.storage.sync.set({
			'quicksend': combination
		}, function() {
			alert("Success!");
			return true;
		});
	}

	return false;
}

function restore_quicksend() {
	chrome.storage.sync.get([
		'quicksend'
	], function(items) {
		data = decompress(items['quicksend']);

		control = data[0]; alt = data[1]; shift = data[2]; letter = data[3];

		document.getElementById('control').checked = control;
		document.getElementById('alt').checked = alt;
		document.getElementById('shift').checked = shift;

		if (letter == undefined) {
			document.getElementById('letter').value = '';
		} else {
			document.getElementById('letter').value = letter;
		}
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
	restore_quicksend();
	document.getElementById('save').addEventListener('click', save_quicksend);
});
