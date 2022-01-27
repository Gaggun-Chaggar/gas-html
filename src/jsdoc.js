/**
 * @template T
 * @typedef {T | undefined | null} Maybe
 */

/**
 * @template {keyof any} K
 * @template T
 * @typedef {{[P in K]?: T}} PartialRecord
 */

/**
 * @typedef {HTMLElement & { _gasListeners?: EventMap }} GasElement
 */

/**
 * @typedef {Maybe<string> | Maybe<string>[] | Record<string, any>} Class
 */

/**
 * @typedef {PartialRecord<keyof CSSStyleDeclaration, any>} Style
 */

/**
 * @typedef {Record<string,any>} Attrs
 */

/**
 * @typedef {Element | RenderFn | RenderOptsFn | string} Child
 */

/**
 * @typedef {Child[]} Children
 */

/**
 * @typedef {PartialRecord<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>} EventMap
 */

/**
 * @typedef {(...children:Children) => GasElement} RenderFn
 */

/**
 * @typedef {{ cls?: Class; style?: Style, on?: EventMap } & Attrs} RenderOptsFnParams
 */

/**
 * @typedef {(args?: RenderOptsFnParams) => RenderFn} RenderOptsFn
 */

/**
 * @typedef {(tag: string | HTMLElement | GasElement) => RenderOptsFn} H
 */
