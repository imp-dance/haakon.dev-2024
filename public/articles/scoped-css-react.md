---
title: scoped-css-react
date: 2024-6-22
summary: >
  "styled-syntax" CSS-in-JS solution using `@scope`
---

I'm a big fan of `styled-components`-like syntax, and by that I mean...

:::window
app.tsx

```tsx
const SomeComponent = styled.div`
  color: red;
`;
```

:::

This syntax does a few things for me that I really love:

- It lets me style descendants as if using a normal CSS selector
- I don't have to manually enforce that the "classname" matches between multiple files
- I can have my styles colocated with my component
- Writing new styles is quick and effortless

...But, it kind of sucks that it's all handled on the client. For my portfolio (this site) I use [Pigment CSS](https://github.com/mui/pigment-css?tab=readme-ov-file#coming-from-emotion-or-styled-components) - which does almost the equivalent on the server.

## Enter `@scope`

<iframe width="100%" height="315" src="https://www.youtube.com/embed/PkFuytYVqI8?si=fikmlufKD7GyNKAj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

So I was watching [↑ this Kevin Powell video](https://www.youtube.com/watch?v=PkFuytYVqI8) the other day on CSS's new `@scope` feature, where he briefly mentions CSS-in-JS. This made me think about how little code actually needs to be written to achieve a styled-like syntax using CSS scope.

Consider this syntax:

:::window
index.html

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

:::

This will apply the background style to the `div` element. You can also style descendants in the scope accordingly.

:::window
index.html

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

:::

Very interesting, this means that we don't need to hook the styles up to **any** classname, we just colocate them in the markdown.

So how would be go about creating our library?

## Creating a proof of concept

Styled components uses what we call a _tagged template function_. A tagged template function lets you input arguments as a tagged template string:

:::window
example.tsx

```tsx
const myFunc = (strings, ...args) => {
  /* ... */
};

myFunc`
    I input my arguments ${"in"} here!
`;
```

:::

The arguments for a tagged template string work like this:

- The first argument is a `string[]`. This is a collection of all the strings in the tagged template, split up whenever you pass a `${value}`
- The rest of the arguments is everything passed inbetween `${}`

So for our library we want the _args_ to be of type `(props: T) => string`, and we want to join everything to a final string like such:

:::window
scoped-css.tsx

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

:::

### Making it isomorphic

> To reduce complexity, I won't include the types

:::window
scoped-css.tsx

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

:::

### Conditional styles? You got it!

If you didn't notice, this is already implemented!

:::window
example.tsx

```tsx
const StyledButton = createScoped(Button)`
    :scope { 
        ${(props) =>
          props.variant === "ghost" ? "color:red;" : ""}
    }
`;
```

:::

### Using the library

Now that we can make isomorphic components, utilize props, and apply styles to them, let us give it a try.

:::window
app.tsx

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

:::

### That's it!

![Ta-da gif](/images/tada.gif)

This was a fun exercise, and a neat look into a possible future of CSS styling. I can't wait for [Firefox to finally support `@scope`](https://caniuse.com/css-cascade-scope).

I'm sure there are lots of gotchas that I haven't thought about yet, I wrote this package yesterday. But honestly, I would love to have this DX when writing styles - and would probably prefer it over other styled syntax solutions - mainly because scope doesn't muddy up the specificity as much as other styling solutions do (and it's closer to native!).

One major downside to this solution is that you end up deploying duplicate CSS for every component that uses it. Basically, whenever you mount a component - you also mount the CSS.

It would be interesting to look at possible solutions to that downside.

If you want to play around with this package, you can install it using [`npm i scoped-css-react`](https://www.npmjs.com/package/scoped-css-react) - or you can [contribute through Github](https://github.com/ryfylke-react-as/scoped-css-react) 🧑‍💻
