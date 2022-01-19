# gas-html

gas-html is a small library for easy creation and updating of HTMLElements.
This project has been created to help provide an easier syntax for creating elements in small web projects.
The core of gas-html is the `h` function which can be used to create elements with attributes, classes and styles. This library also exposes methods for standard html tags.

## Installation

For Node:

```
npm i gas-html
```

For Browser Module:
`unpkg.com/gas-html@latest/dist/es2015/index.js`

```html
<script
  type="module"
  src="unpkg.com/gas-html@latest/dist/es2015/index.js"
></script>
```

or

```js
import {h, span,...} from 'unpkg.com/gas-html@latest/dist/es2015/index.js'
```

For Browser without ES Modules:
`unpkg.com/gas-html@latest/dist/es5/index.js`

```html
<script src="unpkg.com/gas-html@latest/dist/es5/index.js"></script>
```

Or you can always copy the code from unpkg and edit to your needs.

## Basic Syntax

The `h` function is a curried function. The first call expects either a string for a html tag, or an existing `HTMLElement`. The second call expects classes, styles and attributes. The third call expects children.
This js

```js
import { h } from "gas-html";
const myDiv = h("div")({
  attrs: { id: "id" },
  style: { minHeight: "10vh" },
  cls: "my-class",
})(h("span")()("some content"));
```

generates the following html:

```html
<div id="id" style="min-height:10vh" class="my-class">
  <span> some content </span>
</div>
```

As mentioned, the library exports common html tags, so instead of using `h('span')`, you can import the `span` function, e.g.

```js
import { div, span } from "gas-html";
const myDiv = div({
  attrs: { id: "id" },
  style: { minHeight: "10vh" },
  cls: "my-class",
})(span()("some content"));
```

## Classes

Adding a class to an element can be done in 3 ways:

- Object syntax: Add classes using an object, where the key is the class to add and the value is a boolean, if the value is truthy then the key will be added to the class.
- String syntax: Add classes as regular strings
- Array syntax: Add an array of class definitions that are either objects, strings or arrays (recursively).

e.g.

```js
import { span } from "gas-html";

const objectSyntax = span({ cls: { "is-added": true, "is-not-added": false } });
const stringSyntax = span({ cls: "class-1 class-2" });
const arraySyntax = span({
  cls: ["class-1 class-2", { "is-added": true, "is-not-added": false }],
});
```

## More Examples

### Basic table

```js
import { table, thead, tr, th, tbody, td } from "gas-html";
const createTable = () =>
  table({ cls: "my-table" })(
    thead()(
      tr()(
        th({ style: { fontWeight: "bold" } })("Heading 1"),
        th({ style: { fontWeight: "bold" } })("Heading 2"),
      ),
    ),
    tbody()(
      tr()(
        td({ attrs: { "data-key": 1 } })("Body 1"),
        td({ attrs: { "data-key": 2 } })("Body 2"),
      ),
    ),
  );
```

### Reuse a 'Styled' Element

```js
import { table, thead, tr, th, tbody, td } from "gas-html";

const myTh = th({ class: "my-th", style: { fontWeight: "bold" } });
const createTable = () =>
  table({ cls: "my-table" })(
    thead()(tr()(myTh("Heading 1"), myTh("Heading 2"))),
    tbody()(
      tr()(
        td({ attrs: { "data-key": 1 } })("Body 1"),
        td({ attrs: { "data-key": 2 } })("Body 2"),
      ),
    ),
  );
```

### Update an existing element

```js
import { span, h } from "gas-html";
const myIEl = i({ class: "fas fa-spinner" })();
h(myIEl)({ class: "fas fa-exclamation-triangle" })();

const myOtherEl = document.createElement("h1");
h(myOtherEl)({ class: "this-works-too" })();

// add children to an existing element
h(myOtherEl)()(img({ src: "/dog.png" }), span()("Title"));
```
