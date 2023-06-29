import { h } from "../src/index";

describe("h", () => {
  it("should create an element", () => {
    const span = h("span")()();

    expect(span.tagName).toBe("SPAN");
  });

  it("should create an element with child from render option fn", () => {
    const span = h("span")()(h("div")());

    expect(span.tagName).toBe("SPAN");
    expect(span.children.length).toBe(1);
    expect(span.firstElementChild?.tagName).toBe("DIV");
  });

  it("should create an element with child from render fn", () => {
    const span = h("span")()(h("div"));

    expect(span.tagName).toBe("SPAN");
    expect(span.children.length).toBe(1);
    expect(span.firstElementChild?.tagName).toBe("DIV");
  });

  it("should create a an element with child from string", () => {
    const span = h("span")()("This is a child");
    expect(span.tagName).toBe("SPAN");
    expect(span.innerHTML).toBe("This is a child");
  });

  it("should create an element with element child", () => {
    const span = h("span")()(h("div")()());

    expect(span.tagName).toBe("SPAN");
    expect(span.children.length).toBe(1);
    expect(span.firstElementChild?.tagName).toBe("DIV");
  });

  it("should create an element with multiple children", () => {
    const span = h("span")()(h("div")()(), "Some text", h("h1")());

    expect(span.tagName).toBe("SPAN");
    expect(span.childNodes.length).toBe(3);
    expect((span.firstChild as HTMLElement).tagName).toBe("DIV");
    expect((span.childNodes.item(1) as Text).textContent).toBe("Some text");
    expect((span.childNodes.item(2) as HTMLElement).tagName).toBe("H1");
  });

  it("should add styles", () => {
    const span = h("span")({ style: { height: "100%", padding: "1rem" } })();

    expect(span.style.height).toBe("100%");
    expect(span.style.padding).toBe("1rem");
  });

  it("should add classes given as a string", () => {
    const span = h("span")({ cls: "this-is-a-class" })();
    expect(span.className).toBe("this-is-a-class");
  });

  it("should add classes given as a object", () => {
    const span = h("span")({
      cls: { "this-is-a-class": true, "nice-try-buddy": false },
    })();
    expect(span.classList.contains("this-is-a-class")).toBe(true);
    expect(span.classList.contains("nice-try-buddy")).toBe(false);
  });

  it("should add classes given as an array", () => {
    const span = h("span")({
      cls: [
        { "this-is-a-class": true, "nice-try-buddy": false },
        "str-class",
        ["str-class-2"],
      ],
    })();
    expect(span.classList.contains("this-is-a-class")).toBe(true);
    expect(span.classList.contains("nice-try-buddy")).toBe(false);
    expect(span.classList.contains("str-class")).toBe(true);
    expect(span.classList.contains("str-class-2")).toBe(true);
  });

  it("should add other attributes", () => {
    const span = h("span")({
      id: "id",
      disabled: true,
      rows: 6,
    })();

    expect(span.id).toBe("id");
    expect(span.getAttribute("disabled")).toBe("true");
    expect(span.getAttribute("rows")).toBe("6");
  });

  it("should apply updates to an existing el", () => {
    const span = h("span")()();

    h(span)({ cls: "new-class" })();
    expect(span.className).toBe("new-class");
  });

  it("should remove and add new children to an el, if provided", () => {
    const span = h("span")()(h("div"));

    h(span)()(h("h1"));
    expect(span.children.length).toBe(1);
    expect(span.firstElementChild?.tagName).toBe("H1");
  });

  it("should not remove existing children if update an element without new children", () => {
    const span = h("span")()(h("div"));

    h(span)({ cls: "new-class" })();
    expect(span.children.length).toBe(1);
    expect(span.firstElementChild?.tagName).toBe("DIV");
  });

  it("show work with proxy", () => {
    const component = (id) => {
      const onClick = (event) => {
        event.target.gas.id = "newId";
        event.target.gas.style = undefined;
        event.target.gas.cls = { newnew: true, booboo: true };
      };
      const p = {
        cls: "new-class",
        style: { fontSize: "12px" },
        id: id,
        on: { click: onClick },
      };
      const span = h("span")(p)(h("div"));
      return span;
    };

    const span = component("12");
    expect(span.id).toBe("12");
    expect(span.className).toBe("new-class");
    expect(span.style.fontSize).toBe("12px");
    span.click();
    expect(span.id).toBe("newId");
    expect(span.className).toBe("newnew booboo");
    expect(span.style.fontSize).toBe("");
  });

  it("should add events to element", () => {
    let testRes = "";
    const onClick = () => {
      testRes = "Clicked";
    };
    const btn = h("button")({
      on: {
        click: onClick,
      },
    })("Button");
    btn.click();

    expect(testRes).toBe("Clicked");
  });

  it("should replace event with new event", () => {
    let testRes = "";
    let testResTwo = "";
    const onClick = () => {
      testRes += "Clicked";
    };
    const onClickTwo = () => {
      testResTwo += "Clicked";
    };

    // first event trigger
    const btn = h("button")({
      on: {
        click: onClick,
      },
    })("Button");
    btn.click();
    expect(testRes).toBe("Clicked");

    // new event
    h(btn)({
      on: {
        click: onClickTwo,
      },
    })();
    // trigger new event
    btn.click();
    expect(testRes).toBe("Clicked");
    expect(testResTwo).toBe("Clicked");

    // remove event
    h(btn)({
      on: {
        click: undefined,
      },
    })();
    btn.click();
    // values should stay the same
    expect(testRes).toBe("Clicked");
    expect(testResTwo).toBe("Clicked");
  });
});
