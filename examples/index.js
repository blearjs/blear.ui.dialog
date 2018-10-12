'use strict';


var Dialog = require('../src/index');

var dialog = new Dialog({
    el: '#demo',
    width: 400
});

document.getElementById('open').onclick = function () {
    dialog.open();
};

window.dialog = dialog;
