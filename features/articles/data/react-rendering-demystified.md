---
title: Demystifying React rendering
date: 2025-02-02
summary: >
  Let's demystify React rendering
img: /images/react-render-counter.jpg
draft: true
---

## What does it mean to "render"?

When we talk about a component "rendering", we typically mean the step where React internally _executes_ the function component with the given props. This is what this article is referencing, not _mounting HTML elements_ or any of the other stuff around the rendering process.

## When will my component render?

There are only three things that will cause a React component to rerender:

1. #### The initial render
   `root.render()` is typically called once in your React app.
2. #### A render has been queued by a state update

   This can be done from official React APIs like [`setState`](https://react.dev/reference/react/useState), [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore), [`dispatch`](https://react.dev/reference/react/useReducer)...

3. #### The parent component renders
   \*Unless the component is memoized _and_ its props have not changed.

That's _it_. Frameworks and libraries might hide the implementation details from you, but really these are the only ways to render react components.

So that really only leaves one question...

### How does React determine that props have changed?

As I've already mentioned, a component will (unless memoized) always render if its parent renders. But, let's say you do memoize the component, using [`React.memo`](https://react.dev/reference/react/memo). This changes the rules a bit, as now the component will not render when its parent renders, unless the props also change.

You can imagine that React does the following:

```tsx
const propsHaveChanged = (nextProps, prevProps) => {
  let hasChanged = false;
  for (const [key] of nextProps) {
    if (Object.is(prevProps[key], nextProps[key]) === false) {
      hasChanged = true;
    }
  }
  return hasChanged;
};

let componentReturn = cachedReturn;
if (propsHaveChanged(nextProps, prevProps)) {
  componentReturn = Component(nextProps);
  cachedReturn = componentReturn;
  prevProps = nextProps;
}
```

As you can see, React runs `Object.is(a, b)` on every key of the props, which is [almost equivalent](https://www.30secondsofcode.org/js/s/object-is-triple-equals/) to doing `a === b`.

### Referential equality

If you're not already familiar, **object and functions are only equal by reference**. Let's illustrate what that means:

```tsx
const stringA = "abc";
const stringB = "abc";

console.log(Object.is(stringA, stringB)); // true. Strings are equal by value.

const objA = { foo: "bar" };
const objB = { foo: "bar" };

console.log(Object.is(objA, objB)); // false. Different references, although values are practically equivalent.
```

This means that even if your component is memoized - if you pass a function or object that is not equal by reference across renders, React will read this as an entirely different object / function and render the component.

So how do you ensure that the reference of an object or function is kept across renders? For this, we have a few methods:

1. Move the definition outside of the component.

   > If you can define the function or object outside of the React component, you should!

   &nbsp;

2. Utilize `useMemo` or `useCallback` to memoize the value based on dependencies.
   > This ensures that the reference of the value is kept between renders, unless the dependecy array changes.
3. Use React compiler to automatically memoize values and components.
