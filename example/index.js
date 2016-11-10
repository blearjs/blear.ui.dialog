'use strict';


var Dialog = require('../src/index');
var Loading = require('blear.ui.loading');

var dialog = new Dialog({
    el: '#demo',
    width: 400,
    height: 300,
    maxHeight: 300
});
var loading = new Loading();

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
    loading.open();
    dialog.open();
};
