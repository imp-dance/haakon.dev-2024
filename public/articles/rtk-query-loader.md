---
title: RTK Query Loader
date: 2023-06-01
summary: A NPM package that lets you write components as if they're already loaded.
---

RTK Query Loader is a NPM package that I have written and maintained for over a year now. I wanted to write an article about the experience, stuff I've learned and where this package is at now.

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

This was very helpful, some parts of it I loved but other parts of the pattern were very annoying.

- I have to create a wrapper, and an internal `<LoadedComponent>` whenever I use the pattern
- Setting up loading/error views all the time is annoying, and I mostly reuse the loading and error view anyways
- I have to manually type data, and specify that it is `NonNullable`

::: window
routes/user.tsx

```tsx
const UserPage = () => {
  const query = useSomeQuery();
  return (
    <Loader
      queries={[query]}
      onSuccess={(data) => <LoadedUserPage data={data} />}
    />
  );
};

const LoadedUserPage = (props: { data: SomeType }) => {
  // ... finally have my data loaded
};
```

:::

And so a thought was born...

::: window
drafts.tsx

```tsx
// what if I had a higher order component...
// and I guess it must take in some sort of config
const Component = loaded(..., config);

// it should be clear that it is a HOC
const Component = withLoader((props, data) => {
    return <div>...</div>
}, loader);
// mm that's more like it
```

:::

### Creating an initial design

Using the old implementation (`RTKLoader`) as a reference, I started working on a design. This was what I first landed on:

::: window
drafts.tsx

```tsx
// You create a "loader"
const loader = createLoader({
  // it needs: queries, loading state, error state
  // rtk queries are hooks, so it should be a hook.
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

> When using the old design, `as const` was a requirement to get proper types in the component. Otherwise, the return-type of `queries` would just be `UseQueryResult[]` instead of `[UseQueryResult<T>, UseQueryResult<B>]`

I found that defining terms, such as a "_loader_" or a "_consumer_" helps people wrap their head around what is going on.

> I also renamed `queries` to `useQueries` around this point to make it more clear that this argument is in fact a hook.

So this design solved atleast one of my initial issues: I no longer have to create a wrapper component. But it's also very limiting:

- I can't pass arguments to the loader
- I still have to manually declare loading/error states for every component

### Passing arguments

This was simple enough, I just needed some way to transform the props of the _consumer_ into arguments for the _loader_. So let us add that to `createLoader`:

::: window
examples/args.tsx

```tsx
type ComponentProps = {
    userId: string;
    // ...other props
};

const loader = createLoader({
    queriesArg: (props: ComponentProps) => props.userId,
    useQueries: (userId) => [...] as const,
})
```

:::

Now that we can pass arguments, how do we solve not having to redeclare loading and error states excessively? I ended up going with `.extend` to create a copy of the loader that inherits certain properties.

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

### Rounding up the changes in a major version

At this point, I was about 4 months and 4 versions into writing the package. I felt it was time for a major update. This also meant that I could take a look back at the interface and fix things that were bothering me. Notably, having to specify `as const` after the `useQueries` argument.

I solved this by returning an object instead of an array. I also added `deferredQueries` as a optional way of returning queries from the loader - meaning that the queries don't block the consumer from loading.

::: window
examples/v1.tsx

```tsx
const loader = baseLoader.extend({
  useQueries: () => ({
    queries: {
      user: useGetUserQuery(),
    },
  }),
});
```

:::

Sure it might be a bit more to write, but I definitely still prefer this to the old design of returning a read only array.

### Maintaining the package

When dealing with component loading, it is kind of critical that you don't push bugs. For this reason, I ended up writing a test suite of about 30 tests that verify that everything is working correctly in the package.

I also wrote [extensive documentation](https://rtk-query-loader.ryfylke.dev/) for the package by using Docusaurus.

### Final thoughts

Writing RTK Query Loader taught me a lot about typescript, package maintenance and writing good documentation. I've also just really enjoyed writing a cohesive API that solves a concrete issue that _I cared about_.

**Do I still use the package?**

- If I'm writing a single page application or doing data loading through the client, then _yes, absolutely_.
- If I'm using react server components or using some other suspense enabled framework... _probably not_.
