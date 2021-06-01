function compress(control, alt, shift, letter) {
	return String(control ? 1 : 0) + String(alt ? 1 : 0) + String(shift ? 1 : 0) + letter;
}

function decompress(compressed) {
	return [string2bool(compressed[0]), string2bool(compressed[1]), string2bool(compressed[2]), compressed[3]]
}

function string2bool(value) {
	return parseInt(value) ? true : false;
}

function message() {
    // get most recent message
    let messages = document.getElementsByClassName('oIy2qc');
    if (messages[messages.length - 1] == undefined) {
        return undefined;
    }
    let latest = messages[messages.length - 1].innerText;

    capitalize = chrome.storage.sync.get('capitalize', function(items) {
        capitalize = items['capitalize'];

        if (capitalize) {
            bupper = /^[A-Z]/.test(latest)
            if (bupper) {
                latest = latest[0].toLowerCase() + latest.slice(1, latest.length);
            } else {
                latest = latest[0].toUpperCase() + latest.slice(1, latest.length);
            }
        }

        // enter into text box
        let textbox = document.getElementsByClassName('KHxj8b tL9Q4c')[0];
        textbox.value = latest;
        textbox.setAttribute("data-initial-value", latest);

        let input = document.getElementsByClassName('edhGSc zKHdkd XnKlKd')[0];
        input.className = 'edhGSc zKHdkd XnKlKd CDELXb';

        // focus on textbox
        let text_focus = document.getElementsByClassName('edhGSc zKHdkd XnKlKd')[0];
        text_focus.classList.add('u3bW4e');

        let button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd M9Bg4d')[0];
        if (button == undefined) {
            button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd M9Bg4d RDPZE')[0];

            if (button == undefined) {
                button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd RDPZE')[0];
            }
        }
        button.setAttribute('aria-disabled', false);
    });

    return latest;
}

function sendable(message) {
    // enter into text box
    let textbox = document.getElementsByClassName('KHxj8b tL9Q4c')[0];
    textbox.value = message;
    textbox.setAttribute("data-initial-value", message);

    let input = document.getElementsByClassName('edhGSc zKHdkd XnKlKd')[0];
    input.className = 'edhGSc zKHdkd XnKlKd CDELXb';

    // focus on textbox
    let text_focus = document.getElementsByClassName('edhGSc zKHdkd XnKlKd')[0];
    text_focus.classList.add('u3bW4e');

    let button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd M9Bg4d')[0];
    if (button == undefined) {
        button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd M9Bg4d RDPZE')[0];

        if (button == undefined) {
            button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd RDPZE')[0];
        }
    }
    button.setAttribute('aria-disabled', false);
}

document.onkeydown = function(e) {
    var key = e.key;
    if (key == 'F2') {
        message();
    } else {
        chrome.storage.sync.get([
            'quicksend',
            'sendables',
        ], function(items) {
            quicksend = decompress(items['quicksend']);
            data = items['sendables'];
        });

        try {
            control = quicksend[0];
            alt = quicksend[1];
            shift = quicksend[2];
            letter = quicksend[3];
        } catch {}

        try {
            if (e.ctrlKey == control && e.altKey == alt && e.shiftKey == shift && e.key.toLowerCase() == letter.toLowerCase()) {
                message();
            } else {
                for (const [compressed, message] of Object.entries(data)) {
                    key = decompress(compressed);

                    control = key[0];
                    alt = key[1];
                    shift = key[2];
                    letter = key[3];

                    if (e.ctrlKey == control && e.altKey == alt && e.shiftKey == shift && e.key.toLowerCase() == letter.toLowerCase()) {
                        sendable(message);
                    }
                }
            }
        } catch {}
    }
}
