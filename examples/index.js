'use strict';


var Dialog = require('../src/index');

var dialog = new Dialog({
    el: '#demo',
    width: 400,
    buttons: [{
        text: '按钮1',
        type: 'primary'
    },{
        text: '按钮3',
        type: 'success'
    },{
        text: '按钮4',
        type: 'danger'
    }]
});

document.getElementById('open').onclick = function () {
    dialog.open();
};

window.dialog = dialog;
