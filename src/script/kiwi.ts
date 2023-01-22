enum KW_TAG {
    DIV = 'div'
}

interface Style {[key: string]: string;}

const create = (tag: string): HTMLElement => document.createElement(tag);
const find = (query: string): HTMLElement | null => document.querySelector(query);

class KW {

    private readonly kw_tag: KW_TAG;
    private kw_el?: HTMLElement;

    public get html(): HTMLElement {
        const el = (): HTMLElement => {
            const e = create(this.kw_tag);
            e.id = this.kw_id ? this.kw_id : e.id;
            e.classList.add(...this.classes)
            if (this.kw_style.size) e.setAttribute('style', this.styleAsString);
            this.kw_el = e;
            return e;
        }
        return this.kw_el || el();
    }
    private kw_id?: string;

    public set id(id: string) {
        this.kw_id = id;
    }

    public get id(): string {
        return this.kw_id || '';
    }
    private readonly kw_classes: Set<string> = new Set();

    /**
     * Replaces the KW objects class names with the provided ones. First clears all existing class names and then calls
     * @link cls to insert new ones
     * @param classes The class names to be added. Either "foo bar", ["foo", "bar"], or ["foo bar", "bar"]
     */
    public set classes(classes: string | string[]) {
        this.kw_classes.clear();
        this.cls(classes);
    }

    /**
     * @returns The KW element's class names as a string array
     */
    public get classes(): string[] {
        return [...this.kw_classes];
    }

    private kw_style: Map<string, string> = new Map();

    public get styleAsString(): string {
        let styles = '';
        this.kw_style.forEach((value, key) => styles += `${key}:${value};`)
        return styles;
    }


    private constructor(tag: KW_TAG) {
        this.kw_tag = tag;
    }

    /**
     * Adds provided class names to the KW element. cls("foo bar", "foo", ["foo", "bar"]) is a valid method call and
     * results in "foo" and "bar" being added as class name
     * @param classes The class names as a string, multiple strings, a string array, or any combination of those
     * @returns The KW element for method chaining
     */
    public cls(...classes: string[] | (string | string[])[]): KW {
        classes.forEach(cls => {
            if (typeof cls == "string") cls.split(' ').forEach(name => this.kw_classes.add(name));
            else (cls as string[]).forEach(name => name.split(' ').forEach(n => this.kw_classes.add(n)));
        });
        return this;
    }

    /**
     * Sets the KW element's id, overriding existing ones
     * @param id The new id
     * @returns The KW element for method chaining
     */
    public sid(id: string): KW {
        this.kw_id = id;
        return this;
    }

    public style(rule: string, value: string): KW;
    public style(...styles: [string, string][]): KW;
    public style(style: Style): KW;
    public style(style?: string | [string, string] | Style): KW {
        if (typeof style === 'string') this.addStyleRule(style, arguments[1])
        else if (Array.isArray(style)) for (const tuple of arguments) this.addStyleRule(tuple[0], tuple[1]);
        else for (const key in style) this.addStyleRule(key, style[key]);

        return this;
    }

    private addStyleRule(key: string, value: string): void {
        this.kw_style.set(key, value);
    }

    /**
     * Creates a new KW element representing an HTML 'div'
     */
    public static DIV = () => new KW(KW_TAG.DIV);
}

const DIV = KW.DIV();

function ready() {
    const div = DIV.cls('square9 br5').sid('second')
        .style(['box-shadow', '0 0 16px rgba(0,0,0,0.5)'], ['box-shadow', '0 0 16px rgba(0,0,0,0.5)'])

    find('body')!.appendChild(div.html);
}

window.addEventListener('load', ready);