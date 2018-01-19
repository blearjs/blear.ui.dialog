/**
 * ui dialog
 * @author ydr.me
 * @create 2015-01-11 14:49
 */



'use strict';

var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var fun = require('blear.utils.function');
var selector = require('blear.core.selector');
var attribute = require('blear.core.attribute');
var modification = require('blear.core.modification');
var layout = require('blear.core.layout');
var event = require('blear.core.event');
var Animation = require('blear.classes.animation');
var Template = require('blear.classes.template');
var Window = require('blear.ui.window');
var Mask = require('blear.ui.mask');
var UI = require('blear.ui');

var template = require('./template.html');

var tpl = new Template(template);
var gid = 0;
var namespace = UI.UI_CLASS + '-dialog';
var defaults = object.assign(true, Window.defaults, {
    /**
     * 元素
     * @type string|HTMLElement|null
     */
    el: null,

    /**
     * 内容模板
     * @type string|null
     */
    template: null,

    ///**
    // * 是否可以拖动
    // * @type Boolean
    // */
    //draggable: true,

    /**
     * 是否为模态
     * @type Boolean
     */
    modal: true,

    /**
     * 是否允许显示 header 部分
     * @type Boolean
     */
    headable: true,

    /**
     * 是否允许显示关闭按钮部分
     * @type Boolean
     */
    closeable: true,

    /**
     * 点击遮罩是否可以关闭对话框，如果是 modal 的话
     * @type Boolean
     */
    maskHit: false,

    /**
     * 添加的类
     * @type String
     */
    addClass: '',

    /**
     * 标题
     * @type String
     */
    title: 'untitle',

    /**
     * 按钮 `<{{text:String,type:String,className:String}}>`
     * @type Array
     */
    buttons: [],

    /**
     * 打开窗口的动画
     * @type Null|Function
     */
    openAnimation: function (to, done) {
        var the = this;
        var el = the.getWindowEl();
        var an = new Animation(el, the.getOptions('animationOptions'));

        attribute.style(el, {
            display: 'block',
            opacity: 0,
            transform: {
                scale: 0.7
            }
        });

        to.opacity = 1;
        to.transform = {
            scale: 1
        };
        an.transit(to, {
            duration: 234,
            easing: 'in-out-back'
        });
        an.start(function () {
            an.destroy();
            done();
        });
    },

    /**
     * 窗口尺寸改变的动画
     * @type Null|Function
     */
    resizeAnimation: function (to, done) {
        var the = this;
        var el = the.getWindowEl();
        var an = new Animation(el, the.getOptions('animationOptions'));

        an.transit(to, {
            duration: 234
        });
        an.start(function () {
            an.destroy();
            done();
        });
    },

    /**
     * 关闭窗口的动画
     * @type Null|Function
     */
    closeAnimation: function (to, done) {
        var the = this;
        var el = the.getWindowEl();
        var an = new Animation(el, the.getOptions('animationOptions'));

        attribute.style(el, {
            display: 'block',
            opacity: 1,
            transform: {
                scale: 1
            }
        });

        to.opacity = 0;
        to.transform = {
            scale: 0.7
        };
        an.transit(to, {
            duration: 234,
            easing: 'in-out-back'
        });
        an.start(function () {
            an.destroy();
            attribute.style(el, {
                transform: {
                    scale: 1
                }
            });
            done();
        });
    }
});


/**
 * @class Dialog
 * @extend Window
 * @constructor
 */
var Dialog = Window.extend({
    className: 'Dialog',
    constructor: function Dialog(options) {
        var the = this;

        options = the[_options] = object.assign(true, {}, defaults, options);
        Dialog.parent(the, {
            position: 'absolute',
            width: options.width,
            height: options.height,
            minWidth: options.minWidth,
            minHeight: options.minHeight,
            maxWidth: options.maxWidth,
            maxHeight: options.maxHeight,
            topRate: 1 / 3,
            leftRate: 1 / 2,
            openAnimation: options.openAnimation,
            resizeAnimation: options.resizeAnimation,
            closeAnimation: options.closeAnimation
        });

        the[_initNode]();
        the[_initEvent]();
    },

    /**
     * 获取配置
     * @param key
     * @returns {*}
     */
    getOptions: function (key) {
        return UI.getOptions(this, _options, key);
    },

    /**
     * 获取配置
     * @param key
     * @param val
     * @returns {*}
     */
    setOptions: function (key, val) {
        return UI.setOptions(this, _options, key, val);
    },

    /**
     * 设置 dialog 标题
     * @param title {String} 标题
     * @returns {Dialog}
     */
    setTitle: function (title) {
        var the = this;

        if (the[_titleEl]) {
            attribute.html(the[_titleEl], title);
        }

        return the;
    },


    /**
     * 设置 HTML
     * @param html {String|Node}
     * @returns {HTMLElement}
     */
    setHTML: function (html) {
        var the = this;

        if (typeis.String(html)) {
            attribute.html(the[_containerEl], html);
        } else if (html && html.nodeType) {
            modification.empty(the[_containerEl]);
            modification.insert(html, the[_containerEl]);
        }

        return selector.children(the[_containerEl])[0];
    },


    /**
     * 获取容器元素
     * @returns {HTMLElement}
     */
    getContainerEl: function () {
        return this[_containerEl];
    },


    /**
     * 销毁实例
     */
    destroy: function (callback) {
        var the = this;

        callback = fun.ensure(callback);
        callback = fun.bind(callback, the);

        if (the[_footerEl]) {
            event.un(the[_footerEl], 'click');
        }

        Dialog.invoke('destroy', the, function () {
            modification.remove(the[_dialogEl]);

            if (the[_mask]) {
                the[_mask].destroy(callback);
            } else {
                callback();
            }
        });
    }
});
var _contentEl = Dialog.sole();
var _options = Dialog.sole();
var _initNode = Dialog.sole();
var _initEvent = Dialog.sole();
var _dialogEl = Dialog.sole();
var _windowEl = Dialog.sole();
var _headerEl = Dialog.sole();
var _titleEl = Dialog.sole();
var _closeEl = Dialog.sole();
var _containerEl = Dialog.sole();
var _footerEl = Dialog.sole();
var _mask = Dialog.sole();
var _getElement = Dialog.sole();
var pro = Dialog.prototype;


pro[_initNode] = function () {
    var the = this;
    var options = the[_options];
    // init node
    var html = tpl.render({
        options: options
    });
    the[_contentEl] = selector.query(options.el)[0];
    the[_windowEl] = Dialog.invoke('setHTML', the, html);
    the[_headerEl] = the[_getElement]('header');
    the[_titleEl] = the[_getElement]('header-title');
    the[_closeEl] = the[_getElement]('close');
    the[_containerEl] = the[_getElement]('container');
    the[_footerEl] = the[_getElement]('footer');

    if (options.modal) {
        the[_mask] = new Mask({
            animationOptions: the.getOptions('animationOptions')
        });
    }

    if (the[_contentEl]) {
        the.setHTML(the[_contentEl]);
    } else if (options.template) {
        the.setHTML(options.template);
    }
};


pro[_initEvent] = function () {
    var the = this;
    var options = the[_options];
    var scrollTop;

    the.on('beforeOpen', function (pos) {
        scrollTop = layout.scrollTop(window);
        console.log(scrollTop);

        if (the[_mask]) {
            the[_mask].zIndex(UI.zIndex()).open();
        }

        attribute.style(the[_dialogEl], {
            zIndex: UI.zIndex(),
            display: 'block'
        });
    });

    if (the[_closeEl]) {
        event.on(the[_closeEl], 'click', function () {
            the.close();
        });
    }

    if (the[_footerEl]) {
        event.on(the[_footerEl], 'click', 'button', function () {
            var btnEl = this;
            var index = attribute.data(btnEl, 'index') * 1;

            the.emit('action', index);
        });
    }

    the.on('afterClose', function () {
        if (the[_mask]) {
            the[_mask].close();
        }

        attribute.hide(the[_dialogEl]);
    });

    if (options.maskHit && the[_mask]) {
        event.on(the[_mask].getOuterEl(), 'click', function (ev) {
            the.close();
        });
    }
};


pro[_getElement] = function (className) {
    return selector.query('.' + namespace + '-' + className, this[_windowEl])[0];
};


require('./style.css', 'css|style');
Dialog.defaults = defaults;
module.exports = Dialog;

