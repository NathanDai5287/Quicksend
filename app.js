function message() {
    // get most recent message
    let messages = document.getElementsByClassName('oIy2qc');
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

    console.log('done');

    return latest;
}

function load() {
    var bar = document.getElementsByClassName('f0WtFf')[0];

    var button = document.createElement('button');
    button.id = 'send-button';
    button.innerText = "Send";
    button.onclick = message;

    button.style.width = '15%';
    button.style.height = '50px';
    button.style.backgroundColor = 'white';
    button.style.outline = 'none';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.content = 'send.png';

    bar.insertBefore(button, bar.firstChild);

    console.log('done');

}

document.onkeydown = function(e) {
    var key = e.key;
    if (key == 'F2') {
        message();
    }
}

setTimeout(load, 20000);

// var loaded = false;
// for (let i = 0; i < 10 && !loaded; i++) {
//     setTimeout(function() {
//         if (document.getElementsByClassName[0] != undefined) {
//             load();
//             loaded = true
//         }
//     }, 5000);
// }
