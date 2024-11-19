---
title: Custom properties in React's style tag
date: 2024-11-19
summary: >
  Have you ever met the dreaded Object literal may only specify known properties, and '"--test"' does not exist in type 'Properties<string | number, string & {}>'? Fixing this is actually quite simple
img: /koding-no.svg
---

## TL;DR

Add a `index.d.ts` file in the root of your project (if you don't already have one), and in it add the following:

```tsx
import "csstype";

declare module "csstype" {
  interface Properties {
    [index: `--${string}`]: string | number;
  }
}
```

You do not need to add `csstype` as a dependency for this to work.

## Why isn't this "fixed"?

React uses `csstype`'s `CSS.Properties` type in their source code to define their `CSSProperties` type, which is used on HTML elements' `style` attribute. The devs actually left a comment in the source code definition for the type that throws the error:

> The index signature was removed to enable closed typing for style using CSSType. You're able to use type assertion or module augmentation to add properties or an index signature of your own.
>
> For examples and more information, visit:
> [https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors](https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors)

If you follow the link, you'll see that `csstype` recommends that you set this up yourself in a `.d.ts` file. **This comes with the benefit of being able to restrict which properties are allowed**:

:::window
index.d.ts

```ts
import "csstype";

declare module "csstype" {
  interface Properties {
    // Add specific properties
    "--theme-color"?: "black" | "white";
    // Or allow namespaced CSS Custom Properties
    [index: `--theme-${string}`]: string | number;
    // Or allow any custom properties
    [index: `--${string}`]: string | number;
  }
}
```

:::

In the actual examples, `csstype` uses `any` as the value type, while I prefer using `string | number` - you do as you wish.
