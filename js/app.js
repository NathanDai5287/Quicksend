function message() {
    // get most recent message
    let messages = document.getElementsByClassName('oIy2qc');
    if (messages[messages.length - 1] == undefined) {
        return undefined;
    }
    let latest = messages[messages.length - 1].innerText;

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

    return latest;
}

document.onkeydown = function(e) {
    var key = e.key;
    if (key == 'F2') {
        message();
    } else {
        chrome.storage.sync.get([
            'control',
            'alt',
            'shift',
            'letter'
        ], function(items) {
            control = items.control;
            alt = items.alt;
            shift = items.shift;
            letter = items.letter;
        });

        if (e.ctrlKey == control && e.altKey == alt && e.shiftKey == shift && e.key.toLowerCase() == letter.toLowerCase()) {
            message();
        }
    }
}
