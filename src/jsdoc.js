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
 * @typedef {(...children:Children) => HTMLElement} RenderFn
 */

/**
 * @typedef {{ cls?: Class; style?: Style } & Attrs} RenderOptsFnParams
 */

/**
 * @typedef {(args?: RenderOptsFnParams) => RenderFn} RenderOptsFn
 */

/**
 * @typedef {(tag: string | HTMLElement) => RenderOptsFn} H
 */
