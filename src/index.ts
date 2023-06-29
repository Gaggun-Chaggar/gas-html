type Maybe<T> = T | undefined | null;
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type GasElement = HTMLElement & {
  _gasListeners?: PartialRecord<keyof HTMLElementEventMap, EventListener>;
  gas?: RenderOptsFnParams;
};
export type Class =
  | Maybe<string>
  | Maybe<string[]>
  | Maybe<Record<string, any>>;
export type Style = PartialRecord<keyof CSSStyleDeclaration, any>;
export type Attrs = Record<string, any>;
export type Child = Element | RenderFn | RenderOptsFn | string;
export type Children = Child[];
export type EventMap = PartialRecord<keyof HTMLElementEventMap, EventListener>;
export type RenderFn = (...children: Children) => GasElement;
export type RenderOptsFnParams = {
  cls?: Class;
  style?: Style;
  on?: EventMap;
} & Attrs;
export type RenderOptsFn = (params?: RenderOptsFnParams) => RenderFn;

const entries = <T extends {}>(o: T) =>
  Object.entries(o) as [keyof T, T[keyof T]][];

const createClass = (cls: Class): string => {
  if (typeof cls === "string") {
    return cls;
  }
  if (typeof cls === "object" && Array.isArray(cls)) {
    return cls.map((x) => createClass(x)).join(" ");
  }

  if (cls === null || cls === undefined) {
    return "";
  }

  return entries(cls)
    .map(([key, value]) => (value ? key : ""))
    .join(" ");
};

const setClass = (el: GasElement, val: Class) => {
  const classStr = createClass(val);
  if (classStr !== "") el.className = createClass(val);
};

const setAttrs = (el: GasElement, attrs: Attrs) => {
  entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, String(value));
  });
};

const setStyle = (el: GasElement, style: Style | undefined) => {
  const length = el.style.length;
  for (let i = 0; i < length; i++) {
    const key = el.style[i];
    el.style[key as any] = "";
  }
  if (style) {
    entries(style).forEach(([key, value]) => {
      el.style[key as any] = String(value);
    });
  }
};

const setChildren = (el: GasElement, children: Children) => {
  children.forEach((c) => {
    switch (typeof c) {
      case "string":
        const textNode = document.createTextNode(c);
        el.append(textNode);
        break;
      case "function":
        const val = c();
        el.append(typeof val === "function" ? val() : val);
        break;
      default:
        el.append(c);
    }
  });
};

const removeChildren = (el: ChildNode) => {
  while (el.lastChild) {
    removeChildren(el.lastChild);
    el.lastChild.remove();
  }
};

const addEvent = (
  el: GasElement,
  e: keyof HTMLElementEventMap,
  f: EventListener,
) => {
  if (!el._gasListeners) {
    el._gasListeners = {};
  }
  if (el._gasListeners[e]) {
    el.removeEventListener(e, el._gasListeners[e]!, false);
  }

  if (f) {
    el._gasListeners[e] = f;
    el.addEventListener(e, f, false);
  }
};

const clearEvents = (el: GasElement) => {
  entries(el._gasListeners || {}).forEach(([e, f]) => {
    if (!f) return;
    el.removeEventListener(e, f, false);
  });
};

const addEvents = (el: GasElement, events: EventMap) => {
  entries(events).forEach(([e, f]) => {
    addEvent(el, e, f!);
  });
};

export const h =
  (tag: string | HTMLElement | GasElement): RenderOptsFn =>
  (params = {}) =>
  (...children) => {
    const el: GasElement =
      typeof tag === "string" ? document.createElement(tag) : tag;

    if (!params.style) {
      params.style = {};
    }
    if (!params.cls) {
      params.cls = {};
    }
    if (!params.on) {
      params.on = {};
    }
    const { style, cls, on, ...attrs } = params;

    params._cls = typeof cls === "string" ? cls.split(" ") : cls;
    params._style = style;
    params._on = on;

    Object.defineProperties(params, {
      cls: {
        get() {
          return this._cls;
        },
        set(val) {
          this._cls = val;
          setClass(el, val);
        },
        enumerable: true,
      },
      style: {
        get() {
          return this._style;
        },
        set(val) {
          this._style = val;
          setStyle(el, val);
        },
        enumerable: true,
      },
      on: {
        get() {
          return this._on;
        },
        set(val) {
          this._on = val;
          clearEvents(el);
          addEvents(el, val);
        },
        enumerable: true,
      },
    });

    params._style = new Proxy(params._style as Style, {
      set(_, prop: any, val) {
        el.style[prop] = val;
        return true;
      },
    });

    params._cls = new Proxy(params._cls as Record<string, any>, {
      set(target, prop: string, val) {
        if (target[prop] && !val) {
          el.classList.remove(prop);
          return true;
        } else if (val && !target[prop]) {
          el.classList.add(prop);
          return true;
        }
        return false;
      },
    });

    params._on = new Proxy(params._on as EventMap, {
      set(target, prop: keyof HTMLElementEventMap, val) {
        if (!val && target[prop]) {
          addEvent(el, prop, val);
          return true;
        }
        return false;
      },
    });

    entries(attrs).forEach(([k, v]) => {
      params["_" + k] = v;
      Object.defineProperty(params, k, {
        get() {
          return this["_" + k];
        },
        set(v: string) {
          this["_" + k] = v;
          el.setAttribute(String(k), v);
        },
        enumerable: true,
      });
    });

    setAttrs(el, attrs);
    setStyle(el, style);
    setClass(el, cls);
    addEvents(el, on);

    el.gas = params;

    if (children && children.length > 0) {
      removeChildren(el);
      setChildren(el, children);
    }

    return el;
  };

export const a = h("a");
export const abbr = h("abbr");
export const acronym = h("acronym");
export const address = h("address");
export const applet = h("applet");
export const area = h("area");
export const article = h("article");
export const aside = h("aside");
export const audio = h("audio");
export const b = h("b");
export const base = h("base");
export const basefont = h("basefont");
export const bdi = h("bdi");
export const bdo = h("bdo");
export const big = h("big");
export const blockquote = h("blockquote");
export const body = h("body");
export const br = h("br");
export const button = h("button");
export const canvas = h("canvas");
export const caption = h("caption");
export const center = h("center");
export const cite = h("cite");
export const code = h("code");
export const col = h("col");
export const colgroup = h("colgroup");
export const data = h("data");
export const datalist = h("datalist");
export const dd = h("dd");
export const del = h("del");
export const details = h("details");
export const dfn = h("dfn");
export const dialog = h("dialog");
export const dir = h("dir");
export const div = h("div");
export const dl = h("dl");
export const dt = h("dt");
export const em = h("em");
export const embed = h("embed");
export const fieldset = h("fieldset");
export const figcaption = h("figcaption");
export const figure = h("figure");
export const font = h("font");
export const footer = h("footer");
export const form = h("form");
export const frame = h("frame");
export const frameset = h("frameset");
export const h1 = h("h1");
export const head = h("head");
export const header = h("header");
export const hr = h("hr");
export const html = h("html");
export const i = h("i");
export const iframe = h("iframe");
export const img = h("img");
export const input = h("input");
export const ins = h("ins");
export const kbd = h("kbd");
export const label = h("label");
export const legend = h("legend");
export const li = h("li");
export const link = h("link");
export const main = h("main");
export const map = h("map");
export const mark = h("mark");
export const meta = h("meta");
export const meter = h("meter");
export const nav = h("nav");
export const noframes = h("noframes");
export const noscript = h("noscript");
export const object = h("object");
export const ol = h("ol");
export const optgroup = h("optgroup");
export const option = h("option");
export const output = h("output");
export const p = h("p");
export const param = h("param");
export const picture = h("picture");
export const pre = h("pre");
export const progress = h("progress");
export const q = h("q");
export const rp = h("rp");
export const rt = h("rt");
export const ruby = h("ruby");
export const s = h("s");
export const samp = h("samp");
export const script = h("script");
export const section = h("section");
export const select = h("select");
export const small = h("small");
export const source = h("source");
export const span = h("span");
export const strike = h("strike");
export const strong = h("strong");
export const style = h("style");
export const sub = h("sub");
export const summary = h("summary");
export const sup = h("sup");
export const svg = h("svg");
export const table = h("table");
export const tbody = h("tbody");
export const td = h("td");
export const template = h("template");
export const textarea = h("textarea");
export const tfoot = h("tfoot");
export const th = h("th");
export const thead = h("thead");
export const time = h("time");
export const title = h("title");
export const tr = h("tr");
export const track = h("track");
export const tt = h("tt");
export const u = h("u");
export const ul = h("ul");
export const h_var = h("var");
export const video = h("video");
export const wbr = h("wbr");
