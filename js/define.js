document.addEventListener('DOMContentLoaded', function () {
	var container = document.getElementsByClassName('define-messages')[0];

	restore_sendable();
})

function compress(control, alt, shift, letter) { // FIXME: no need to copy paste or import; funcions are automatically imported
	return String(control ? 1 : 0) + String(alt ? 1 : 0) + String(shift ? 1 : 0) + letter;
}

function decompress(compressed) {
	return [string2bool(compressed[0]), string2bool(compressed[1]), string2bool(compressed[2]), compressed[3]]
}

function string2bool(value) {
	return parseInt(value) ? true : false;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function add_definition(control=false, alt=false, shift=false, character='', message='', prepend=true) { // TODOG: animation when inserting
	definition = create_definition(control, alt, shift, character, message);

	if (prepend) {
		try {
			// container.appendChild(definition);
			insertAfter(definition, container.firstChild);
		} catch (TypeError) {
			container = document.getElementsByClassName('define-messages')[0];

			insertAfter(definition, container.firstChild);
		}
	} else {
		try {
			container.appendChild(definition);
		} catch (TypeError) {
			document.getElementsByClassName('define-messages')[0].appendChild(definition);
		}
	}

	return true;
}

function create_definition(control=false, alt=false, shift=false, character='', message='') {
	hash = Math.floor(Math.random() * 10000000);

	definition = document.createElement('div');
		definition.className = 'definition';

	trash_button = document.createElement('button');
		trash_button.setAttribute('class', 'trash');
		trash_button.onclick = trash;

		trash_icon = document.createElement('i');
			trash_icon.setAttribute('class', 'fa fa-trash-o fa-lg');
			trash_icon.setAttribute('aria-hidden', 'true');

		trash_button.appendChild(trash_icon);

	definition.appendChild(trash_button);

	commands = ['Ctrl', 'Alt', 'Shift']
	divcommands = document.createElement('div');
		divcommands.setAttribute('class', 'commands');

	for (let i in commands) {
		command = commands[i];

		checkbox = document.createElement('label')
			checkbox.setAttribute('class', 'container horizontal');
			checkbox.innerText = command;

		checkbox_input = document.createElement('input');
			checkbox_input.setAttribute('id', command + hash);
			checkbox_input.setAttribute('type', 'checkbox');

			switch (command) {
				case 'Ctrl':
					checkbox_input.checked = control;
					break;
				case 'Alt':
					checkbox_input.checked = alt;
					break;
				case 'Shift':
					checkbox_input.checked = shift;
					break;

			}

		span = document.createElement('span');
			span.setAttribute('class', 'checkmark');

		checkbox.appendChild(checkbox_input);
		checkbox.appendChild(span);

		divcommands.appendChild(checkbox)
	}
	definition.appendChild(divcommands);

	character_label = document.createElement('label');
		character_label.setAttribute('for', 'message' + hash);
		character_label.setAttribute('class', 'message-input horizontal character-input');

	character_input = document.createElement('input');
		character_input.setAttribute('type', 'text');
		character_input.setAttribute('id', 'character' + hash);
		character_input.setAttribute('style', 'text-transform: lowercase');
		character_input.setAttribute('placeholder', '\u00A0');
		character_input.value = character;
		character_input.setAttribute('maxlength', '1');

	character_span = document.createElement('span');
		character_span.innerText = 'Character';
		character_span.setAttribute('class', 'label');

	background_span = document.createElement('span');
		background_span.setAttribute('class', 'focus-bg');

	character_label.appendChild(character_input);
		character_label.appendChild(character_span);
		character_label.appendChild(background_span);

	definition.appendChild(character_label);

	label = document.createElement('label');
		label.setAttribute('for', 'message' + hash);
		label.setAttribute('class', 'message-input');

	textbox = document.createElement('input');
		textbox.setAttribute('type', 'text')
		textbox.setAttribute('id', 'message' + hash);
		textbox.setAttribute('placeholder', '\u00A0');
		textbox.value = message;

	alttext = document.createElement('span');
		alttext.setAttribute('class', 'label')
		alttext.innerText = 'Message';

	span = document.createElement('span');
		span.setAttribute('class', 'focus-bg');

	label.appendChild(textbox);
	label.appendChild(alttext);
	label.appendChild(span);

	definition.appendChild(label);

	return definition;
}

function trash() {
	this.parentElement.remove();

	// FIXME: delete after transitionend

	// const item = this;
	// item.parentElement.classList.toggle('fall');

	// $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
		// this.parentElement.remove();
		// })

	// setTimeout(300, function() {
		// item.parentElement.remove();
	// })

	// item.addEventListener('transitionend', function() {
	// 	console.log(1);
	// 	item.parentElement.remove();
	// })

	// this.ontransitionend = function() {
		// this.parentElement.remove()
	// }
}

function empty(dict) {
	return Object.keys(dict).length === 0;
}

function valid(control, alt, shift, letter, message) {
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

function save_sendable() {
	definitions = document.getElementById('definitions').children;

	// chrome.storage.sync.get('sendables', function(items) {
		// dictionary = items['sendables'];
	// });

	if (definitions.length == 0) {
		chrome.storage.sync.set({'sendables': {}});
		alert('Sendables saved successfully!');

		return true;
	}

	dictionary = {}
	for (let i = 0; i < definitions.length; i++) { // TODO: if all Sendables are deleted
		definition_element = definitions[i];

		commands = definition_element.getElementsByClassName('commands')[0].children;

		control = commands[0].children[0].checked;
		alt = commands[1].children[0].checked;
		shift = commands[2].children[0].checked;

		letter = definition_element.getElementsByClassName('character-input')[0].children[0].value;

		message = definition_element.getElementsByClassName('message-input')[1].children[0].value;

		if (valid(control, alt, shift, letter, message)) { // TODO: loop through all existing and if it doesn't exist in the new one, delete it
			compressed = compress(control, alt, shift, letter);

				dictionary[compressed] = message;

			// dataObject = {'sendables': dictionary};

			chrome.storage.sync.set({
				'sendables': dictionary
			}, function () {
				// console.log('saved');
			});
		} else {
			// console.log('Senbale #' + i + ' (0-indexed) is invalid');

			alert('Sendable #' + (i + 1) + ' is invalid (from top to bottom). \nAll the other Sendables have been saved. \n\nPlease include at least one modifier key (Ctrl, Alt, or Shift), an alphanumeric character, and a message of your choice');
		}
	}

	alert('Sendables saved successfully!');
	return true;
}

function restore_sendable() { // TODO: fix order when loading
	chrome.storage.sync.get('sendables', function(items) {
		data = items;
	});

	if (typeof data !== 'undefined') {
		for (key in data['sendables']) {
			decompressed = decompress(key);

			control = decompressed[0];
			alt = decompressed[1];
			shift = decompressed[2];
			letter = decompressed[3];
			message = data['sendables'][key];

			if (document.getElementById('definitions') != undefined) {
				add_definition(control, alt, shift, letter, message);
			}
		}
		return true
	}

	return false;
}

document.addEventListener('DOMContentLoaded', function() {
	// restore_sendable();

	// document.getElementById('save-sendables').addEventListener('click', save_sendable);
	// document.getElementById('add-sendables').addEventListener('click', function() {add_definition(false, false, false, '', '')});

	document.getElementById('save-sendables').addEventListener('click', save_sendable);
	document.getElementById('add-sendables').addEventListener('click', function() {add_definition(false, false, false, '', '')});

});

setTimeout(restore_sendable, 10);
