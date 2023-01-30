import test from "./test.js";
var KW_TAG;
(function (KW_TAG) {
    KW_TAG["DIV"] = "div";
})(KW_TAG || (KW_TAG = {}));
export const create = (tag) => document.createElement(tag);
export const find = (query) => document.querySelector(query);
class KW {
    constructor(tag) {
        this.kw_classes = new Set();
        this.kw_style = new Map();
        this.kw_tag = tag;
    }
    get html() {
        const el = () => {
            const e = create(this.kw_tag);
            e.id = this.kw_id ? this.kw_id : e.id;
            e.classList.add(...this.classes);
            if (this.kw_style.size)
                e.setAttribute('style', this.styleAsString);
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
    get styleAsString() {
        let styles = '';
        this.kw_style.forEach((value, key) => styles += `${key}:${value};`);
        return styles;
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
        if (typeof style === 'string')
            this.addStyleRule(style, arguments[1]);
        else if (Array.isArray(style))
            for (const tuple of arguments)
                this.addStyleRule(tuple[0], tuple[1]);
        else
            for (const key in style)
                this.addStyleRule(key, style[key]);
        return this;
    }
    addStyleRule(key, value) {
        this.kw_style.set(key, value);
    }
}
KW.DIV = () => new KW(KW_TAG.DIV);
const DIV = KW.DIV();
function ready() {
    test();
}
window.addEventListener('load', ready);
//# sourceMappingURL=kiwi.js.map