'use strict';


var Dialog = require('../src/index');

var dialog = new Dialog({
    el: '#demo'
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
