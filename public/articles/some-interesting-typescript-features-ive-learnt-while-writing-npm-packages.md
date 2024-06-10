---
title: Some interesting Typescript features I’ve learnt while writing NPM packages
date: 2023-03-10
summary: Typescript is great, for many reasons. I think everyone will agree with that statement if they’ve given it a proper try.
---

Typescript is great, for many reasons. I think everyone will agree with that statement if they’ve given it a proper try. While writing type-safe NPM-packages, I’ve learnt a few tips and tricks that can help you utilize it for it’s full worth.

### Generics are magic

Generics let you essentially tell Typescript that “I’m not sure what type this is yet, but I want to use it somehow”. A very simple example:

```ts
const giveMe = <T extends unknown>(value: T): T => value;

const five = giveMe(5);
// Typescript knows that `five` is a number.
const text = giveMe("some text");
// Typescript knows that `text` is a string.
```

This lets you “capture” some type that’s defined by the consumer of the function, and then use that type to do interesting stuff. Combining this with Typescript’s keyof operator, you could give suggestion for object properties for example:

```ts
const pick = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  obj: T,
  key: K
): T[K] => obj[key];

const testObj = {
  keyOne: "value1",
  keyTwo: "value2",
};

const secondValue = pick(testObj, "keyTwo");
// Here, Typescript will give you a list of suggestion in the second argument, constrained to the keys of the object given in the first argument.
```

The above example might look a bit intimidating and hard to read for beginners, but if we break it up into parts it’s quite straight forward.

First, we define our generics:

![Image of code](https://impedans.me/web/wp-content/uploads/2022/11/generic-defs.png)

- `T extends Record<string, unknown>` defines our first generic, `T`. `extends Record<string, unknown>` means that the shape of `T` should be in the shape of `Record<string, unknown>`. You will commonly see extends unknown as a way to say that a generic could be anything.
- `K extends keyof T` defines our second generic, `K`. It is in the shape of `keyof T`, meaning that it should essentially be a key of T.

Then, we use our generics. First, as we define the arguments of the function to be of the generic types:

![Image of code](https://impedans.me/web/wp-content/uploads/2022/11/assign-generics.png)

Then we also use the generics in the return type:

![Image of code](https://impedans.me/web/wp-content/uploads/2022/11/return-type.png)

`T[K]` means that the return type should be the value of `obj[key]`, which typescript can infer. This gives us two nice advantages when using this function:

- Auto-complete when selecting a key of any given object in the second argument.
- The proper return type of the value the consumer picks.

> Although we use T and K in the example, these are arbitrary names and can be anything. It is, however, common practise to use a single letter to name a generic, so that it’s easy to recognise it in big types as a generic and not just a normal/imported type.

### Using as const

Let’s use the previous example to illustrate:

```ts
const obj1 = {
  keyOne: "value1",
  keyTwo: "value2" as const,
};

const testValue = pick(obj1, "keyOne");
// testValue is of type `string`

const testValue = pick(obj1, "keyTwo");
// testValue is of type `"value2"`
```

As you can see, you can force Typescript to be “more specific” when deriving the type of a value. If you define a string as const, then the actual contents of the string will be used as the type. You could do the same with a number, to say that the number is of type 10. You could also do it to lists to force typescript to take the order and length into consideration:

```ts
const obj1 = {
  keyOne: ["some string", 123],
  keyTwo: ["some string", 123] as const,
  keyThree: ["some string" as const, 123] as const,
};

const testValue = pick(obj1, "keyOne");
// ^ is of type `Array<string | number>`

const testValueTwo = pick(obj1, "keyTwo");
// ^ is of type `readonly [string, number]`

const testValueThree = pick(obj1, "keyTwo");
// ^ is of type `readonly ["some string", number]`
```

This is very useful when you want to capture the more specific constant type, rather than the overarching primitive type. I use this in rtk-query-loader so that the user can return an array of queries like this:

```ts
createLoader({
  queries: () => [useGetPokemon(), useGetUsers()] as const,
});
```

Which will let the user know the order, values and length of the list later on when consuming them:

```ts
createLoader({
  queries: () => [useGetPokemon(), useGetUsers()] as const,
  transform: (queries) => ({
    pokemon: queries[0].data,
    users: queries[1].data,
  }),
});
```

### Optional generic function arguments

Lets say you have a function that might take an argument, and if it does, the argument is required and it is of a generic type. A naive solution might be something like this:

```ts
const funcWithPossibleArg = <T extends unknown>(arg?: T) => {};

const funcA = funcWithPossibleArg<string>;
const funcB = funcWithPossibleArg<number>;

// Problem is that neither of these _require_ an argument of the given type.
funcA();
funcB(); // perfectly fine for all Typescript knows
```

A more proper solution, would be something like this:

```ts
const funcWithPossibleArg = <T = never>(
  ...args: T extends never ? [] : [T]
) => {};

const noArgFunc = funcWithPossibleArg<never>;
const requiredStringArg = funcWithPossibleArg<string>;

noArgFunc(); // properly does not require any argument
requiredStringArg(""); // properly requires string
```

So what does `T extends never ? [] : [T]` actually do? It is basically saying that the list of arguments should be empty if T extends `never`, but if it does not extend `never` then the list of args should be no more and no less than one, of the type `T`.

Using `extends` like that is a great way to “test” if a generic is of a given type, and then conditionally type your function accordingly. In [RTK-query-loader](https://github.com/ryfylke-react-as/rtk-query-loader) I use this method to properly determine the return type of the loaderData, depending on whether or not the loader is extended, and which arguments are passed to the extended loader.
