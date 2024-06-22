---
title: scoped-css-react
date: 2024-6-22
summary: >
  "styled-syntax" CSS-in-JS solution using `@scope`
---

I'm a big fan of `styled-components`-like syntax, and by that I mean...

```tsx
const SomeComponent = styled.div`
  color: red;
`;
```

This syntax does a few things for me that I really love:

- It lets me style descendants as if using a normal CSS selector
- I don't have to manually enforce that the "classname" matches, since Typescript will let me know if I use a undefined component
- This allows me to have styles colocated with my component, and makes it very easy to write new styles

...But, it kind of sucks that it's all handled on the client. For my portfolio (this site) I use [Pigment CSS](https://github.com/mui/pigment-css?tab=readme-ov-file#coming-from-emotion-or-styled-components) - which does almost the equivalent on the server.

## Enter `@scope`

So I was watching [a Kevin Powell video](https://www.youtube.com/watch?v=PkFuytYVqI8) the other day on CSS's new `@scope` feature, and when he mentioned CSS-in-JS in the video it made me think about how little code actually needs to be written to achieve a styled-like syntax using CSS scope.

Consider this syntax:

```html
<div>
  <style>
    @scope {
      :scope {
        background: black;
      }
    }
  </style>
  Hello!
</div>
```

This will apply the background style to the `div` element. You can also style descendants in the scope accordingly.

```html
<div>
  <style>
    @scope {
      span {
        color: red;
      }
    }
  </style>
  <span>I am red!</span>
</div>
<span>I am not red...</span>
```

Very interesting, this means that we don't need to hook the styles up to **any** classname, we just colocate them in the markdown.

So how would be go about creating our library?

## Creating a proof of concept

Styled components uses what we call a _tagged template function_. A tagged template function lets you input arguments as a tagged template string:

```tsx
const myFunc = (strings, ...args) => {
  /* ... */
};

myFunc`
    I input my arguments ${"in"} here!
`;
```

The arguments for a tagged template string work like this:

- The first argument is a `string[]`. This is a collection of all the strings in the tagged template, split up whenever you pass a `${value}`
- The rest of the arguments is everything passed inbetween `${}`

So for our library we want the _args_ to be of type `(props: T) => string`, and we want to join everything to a final string like such:

```tsx
const scoped = (
  strings: TemplateStringsArray,
  ...args: ((props: T) => string)[]
) => {
  return function Component(props) {
    const styles = strings.reduce(
      (acc, string, i) => acc + string + (args[i](props) ?? ""),
      ""
    );
    return (
      <div {...props}>
        <style>{`@scope { ${styles} }`}</style>
        {props.children}
      </div>
    );
  };
};
```

### Making it isomorphic

> To reduce complexity, I won't include the types

```tsx
export const createScoped = (element) => {
  const scoped = (strings, ...args) =>
    function Component(props) {
      const resolved = args.map((arg) => arg(props));
      const styles = strings.reduce(
        (acc, string, i) => acc + string + (resolved[i] ?? ""),
        ""
      );
      const Element = element;

      return (
        <Element {...props}>
          <style>{`@scope { ${styles} }`}</style>
          {props.children}
        </Element>
      );
    };
  return scoped;
};
```

### Using the library

Now that we can make isomorphic components, and apply styles to them, lets try it out!

```tsx
const Container = createScoped("div")`
    :scope { background: black; }
    span { color: ${(props) => props.color}; }
`;

export default function App() {
  const [color, setColor] = useState("red");
  return (
    <Container color={color}>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <span>Foobar</span>
    </Container>
  );
}
```

### That's it!

This was a fun exercise, and a neat look into a possible future of CSS styling. I can't wait for Firefox to finally support `@scope`.

If you want to play around with this package, you can install it using `npm i scoped-css-react`
