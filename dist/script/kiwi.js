"use strict";
var KW_TAG;
(function (KW_TAG) {
    KW_TAG["DIV"] = "div";
})(KW_TAG || (KW_TAG = {}));
const create = (tag) => document.createElement(tag);
const find = (query) => document.querySelector(query);
class KW {
    constructor(tag) {
        this.kw_classes = new Set();
        this.kw_tag = tag;
    }
    get html() {
        const el = () => {
            const e = create(this.kw_tag);
            e.id = this.kw_id ? this.kw_id : e.id;
            e.classList.add(...this.classes);
            e.setAttribute('style', this.kw_style || '');
            this.kw_el = e;
            return e;
        };
        return this.kw_el || el();
    }
    set id(id) {
        this.kw_id = id;
    }
    get id() {
        return this.kw_id || '';
    }
    set classes(classes) {
        this.kw_classes.clear();
        this.cls(classes);
    }
    get classes() {
        return [...this.kw_classes];
    }
    cls(...classes) {
        classes.forEach(cls => {
            if (typeof cls == "string")
                cls.split(' ').forEach(name => this.kw_classes.add(name));
            else
                cls.forEach(name => name.split(' ').forEach(n => this.kw_classes.add(n)));
        });
        return this;
    }
    sid(id) {
        this.kw_id = id;
        return this;
    }
    style(style) {
        this.kw_style = style;
        return this;
    }
}
KW.DIV = () => new KW(KW_TAG.DIV);
const DIV = KW.DIV();
function ready() {
    const div = DIV.cls('square9 br5').sid('second').style('box-shadow: 0 0 16px rgba(0,0,0,0.5)');
    find('body').appendChild(div.html);
}
window.addEventListener('load', ready);
//# sourceMappingURL=kiwi.js.map