'use strict';


var Dialog = require('../src/index');

var dialog = new Dialog({
    el: '#demo',
    width: 400,
    maskHit: true,
    maskOptions: {
        opacity: 0.9
    }
});

document.getElementById('open').onclick = function () {
    dialog.open();
};

document.getElementById('resize').onclick = function () {
    dialog.resize();
};

document.getElementById('close').onclick = function () {
    dialog.close();
};

document.getElementById('open2').onclick = function () {
    dialog.open();
};
