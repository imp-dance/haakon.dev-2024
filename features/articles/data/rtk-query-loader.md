---
title: RTK Query Loader
date: 2023-06-01
summary: A NPM package that lets you write components as if they're already loaded.
img: https://ryfylke.dev/static/logo-dm.svg
---

RTK Query Loader is a NPM package that I have written and maintained for over a year now. I wanted to write an article about the experience, stuff I've learned and where this package is at now.

## Origins

It all started with an abstraction at work which looked something like this:

::: window
app.tsx

```tsx
const App = () => (
    <RTKLoader
        queries=[[query1, query2]]
        onSuccess={(data) => <LoadedComponent data={data} />}
        onLoading={() => <InlineLoading />}
        onError={(error) => <ErrorView error={error} />}
    />
)
```

:::

### Pros & Cons

This was very helpful, some parts of it I loved but other parts of the pattern were very annoying.

- I have to create a wrapper, and an internal `<LoadedComponent>` whenever I use the pattern
- Setting up loading/error views all the time is annoying, and I mostly reuse the loading and error view anyways
- I have to manually type data, and specify that it is `NonNullable`

So I wanted to rethink and redesign this pattern a bit to be more reusable and elegant.

## HOC

> I know, I know, we do not want to go back to the days of wrapping your React components with multiple layers of higher order components - but just take a look at this:

::: window
drafts.tsx

```tsx
const loader = createLoader(...); // somewhere

// Component.tsx
const Component = withLoader((props, data) => {
    return <div>...</div>
}, loader);
```

:::

Data-loading is one of the few cases where HOC make sense, in my opinion.

We want to be able to write the component **as if the data has loaded already** - I don't want to...

- 💩 Have lots of checks inside of the body to see if the data is defined
- 💩 Supply fallback values,
- 💩 Cast types
- 💩 Have lots of inline ternary loading states (`data ? (...) : null`)

The only way to achieve this is to simply await mounting the component until the data exists, and treat it more as a prop. Higher order components allow for this pattern.

### Creating an initial design

I started working on a new design by using the old implementation as reference.

::: window

> #### Lesson learned ✅
>
> I found that defining terms, such as a "**_loader_**" and "**_consumer_**" helps people wrap their head around what is going on and how it all plays together.

:::

::: window
drafts.tsx

```tsx
// You create a "loader"
const loader = createLoader({
  // it needs: queries, loading state, error state
  queries: () => [useSomeQuery(), useSomeOtherQuery()] as const,
  onLoading: () => <div>Loading...</div>,
  onError: () => <div>Error!</div>,
});

// And then "consume" it
const Component = withLoader((props, data) => {
  const [query1, query2] = data;
  // ...
}, loader);
```

:::

So this design solved atleast one of my initial issues: I no longer have to create a wrapper component. But it's still not feature complete, and after having used this API for a while I had annoyances with it.

- You can't pass arguments to the loader from the consumer
- I still have to manually declare loading/error states for every individual loader
- It's not obvious that the `queries` argument is a hook
- Adding `as const` is tedious and easy to forget.

### Passing arguments

This was simple enough, I just needed some way to transform the props of the _consumer_ into arguments for the _loader_. So let us add that to `createLoader`:

::: window
examples/args.tsx

```tsx
type ComponentProps = {
  userId: string;
};

const loader = createLoader({
  queriesArg: (props: ComponentProps) => props.userId,
  // `queries` -> `useQueries` for clarity
  useQueries: (userId) => [useGetUser(userId)] as const,
});
```

:::

![Passing arguments illustration](https://rtk-query-loader.ryfylke.dev/assets/images/queriesArg-207621a6c91c7e0661fadc4fac4879ab.png)

There you go, we now have a way for loaders to utilize their consumers' props inside the loader.

We have also hinted at the fact that the `queries` argument is a loader by renaming it to `useQueries`.

## Extending existing loaders

Now this was a really challenging (and interesting) Typescript task that taught me a lot about generics, but after a lot of work and debugging - I was able to implement the feature while maintaining the strong types.

::: window
examples/extend.tsx

```tsx
const baseLoader = createLoader({
  onLoading: () => <div>...</div>,
  onError: () => <div>...</div>,
});

const userLoader = baseLoader.extend({
  useQueries: () => [useSomeQuery()] as const,
}); // no need to add anything else!
```

:::

This allows for a very nice pattern where you create a base loader with default loading and error states, and extend from that. This will more easily allow you to configure all loaders at once as well - and reuse and extend existing loaders.

In my own experience, I have set up a `baseLoader`, as well as a `baseRouteLoader` and `baseDialogLoader` (both extended from `baseLoader`). You can set it up however you want.

### Rethinking some of the API

At this point, I was about 4 months and 4 versions into writing the package. I felt it was time for a major update. This also meant that I could take a look back at the interface and fix things that were bothering me. Notably, having to specify `as const` after the `useQueries` argument.

I solved this by returning an object instead of an array. I also implemented `deferredQueries` as an optional way of returning queries from the loader - hinting that the queries should not block the consumer from loading.

::: window
examples/v1.tsx

```tsx
const loader = baseLoader.extend({
  useQueries: () => ({
    queries: {
      user: useGetUserQuery(),
    },
    deferredQueries: {
      extraData: useGetGiantDataset(),
    },
    payload: {
      any: {
        arbitrary: "data",
      },
    },
  }),
});
```

:::

Now this is starting to look more feature complete. Adding `payload` as a way to pass _anything_ from the loader to the consumer opens up the possibility for stateful and controlled loaders as well. 🔥

### Maintaining the package

When dealing with component loading, it is kind of critical that you don't push bugs. For this reason, I ended up writing a test suite of about 30 tests that verify that everything is working correctly in the package.

I also wrote [extensive documentation](https://rtk-query-loader.ryfylke.dev/) by using Docusaurus. I'm very pleased with how that turned out, and have had some nice feedback on it.

### Final thoughts

Writing RTK Query Loader taught me a bunch about Typescript, package maintenance, open source and writing good documentation. I've also **really enjoyed** writing a cohesive API that solves a concrete issue that _I cared about_.

**Do I still use the package?**

- If I'm writing a single page application or doing data loading through the client, then _yes, absolutely_.
- If I'm using react server components or using some other suspense enabled framework... _probably not_.
