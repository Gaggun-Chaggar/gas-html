import { JSDOM } from "jsdom";
const dom = new JSDOM();
/** @ts-ignore */
global.document = dom.window.document;
/** @ts-ignore */
global.window = dom.window;
