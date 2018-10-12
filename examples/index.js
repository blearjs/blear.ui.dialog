'use strict';


var Dialog = require('../src/index');

var dialog = new Dialog({
    el: '#demo',
    width: 400,
    buttons: [{
        text: '按钮，但不能点1',
        type: 'primary'
    },{
        text: '按钮，但不能点2',
        type: 'secondary'
    }]
});

document.getElementById('open').onclick = function () {
    dialog.open();
};

window.dialog = dialog;
