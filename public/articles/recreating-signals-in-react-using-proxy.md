---
title: Recreating Signals for React using Proxy
date: 2024-06-04
summary: >
  Proxies in Javascript are really interesting. What if we could recreate signals in React by utilizing them?
---

So Javascript has this interesting feature called Proxy. This will allow you to intercept value-getting and -setting on a given object.

```tsx {1,2,3}
const signal = new Proxy(
  {
    value: undefined,
  },
  {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      // notify listeners?
    },
  }
);
```

This can be used to achieve Signals in React. By notifying listeners whenever the value property is set.

For there to be listeners, we should also add a subscribe function that returns a cleanup function.

```tsx
export const createSignal = <T extends unknown>(
  initialValue: T
): Signal<T> => {
  const listeners = new Set<() => void>();
  const signal = new Proxy(
    {
      value: initialValue,
      subscribe: (callback: () => void) => {
        listeners.add(callback);
        return () => {
          listeners.delete(callback);
        };
      },
    },
    {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, newValue) {
        target[prop] = newValue;
        listeners.forEach((cb) => cb());
        return true;
      },
    }
  );
  return signal;
};
```

![Cat meme](https://preview.redd.it/fc4x6a195rtb1.jpg?auto=webp&s=77e30d580f9d64a3f643f2e8701cec6d461c57b8)

Now that we can create signals, how can we tell React to subscribe to updates on a component to component basis?

There is a hook called useSyncExternalStore which will take a subscribe function, as well as a function to determine whether or not to trigger a rerender. By storing the previous value in a ref, and incrementing a renderCount whenever the previous value is not equal to the new one – we basically tell React to trigger a rerender.

```tsx
export function useSignal<T>(signal: Signal<T>) {
  const prevValue = useRef<T>(signal.value);
  const renderCount = useRef(0);

  useSyncExternalStore(signal.subscribe, () => {
    const isEqual = signal.value === prevValue.current;
    prevValue.current = signal.value;
    if (!isEqual) {
      renderCount.current += 1;
    }
    return renderCount.current;
  });

  return signal;
}
```

Now, we should be able to use our signals in React:

```tsx
const countSignal = createSignal(0);

function App() {
  const count = useSignal(countSignal);

  return (
    <button onClick={() => (count.value += 1)}>
      {count.value}
    </button>
  );
}
```

I think mutating a variable will always feel wrong to me when working with React, but interesting none the less.

### Effects & automatic dependencies

Another neat thing you could do with this is automatic effect dependencies. With some caveats. Before I get into the caveats, let me explain how it works.

First, we add a global variable that indicates whether or not we are currently running an effect – and then we check this variable in the getter of the signal proxy.

```tsx
let isRunningEffect = false;
const effectDependencies = new Set<Signal<unknown>>();

export const createSignal = <T extends unknown>(
  initialValue: T
): Signal<T> => {
  const listeners = new Set<() => void>();
  const signal = new Proxy(
    {
      value: initialValue,
      subscribe: (callback: () => void) => {
        listeners.add(callback);
        return () => {
          listeners.delete(callback);
        };
      },
    },
    {
      get(target, prop) {
        // log signal as dependency if effect is running
        if (isRunningEffect && prop ==== "value") {
           effectDependencies.add(signal);
        }
        return target[prop];
      },
      set(target, prop, newValue) {
        target[prop] = newValue;
        listeners.forEach((cb) => cb());
        return true;
      },
    }
  );
  return signal;
};
```

Now we can sort of deduce dependencies by doing something like this:

```tsx
function getDependenciesFromEffect(callback: () => void) {
  isRunningEffect = true;
  callback();
  isRunningEffect = false;
  const dependencies = Array.from(effectDependencies);
  effectDependencies.clear();
  return dependencies;
}
```

We will now use this to create an effect that automatically picks up dependencies, with one giant caveat: it will not pick up conditionally accessed signals. We also have to run the effect once on registration to be able to derive dependencies.

```tsx
export function signalEffect(callback: () => void) {
  const dependencies = getDependenciesFromEffect(callback);
  const unsubscribes = dependencies.map((signal) =>
    signal.subscribe(callback)
  );
  return () => { // return a function to unregister the effect
    unsubscribes.forEach((unsubscribe) => unsubscribe());
  };
}

const disableLogging = signalEffect(() => {
   console.log("This will be called whenever count is changed: ", countSignal.value);
});
// This will be called whenever count is changed: 0
countSignal.value += 1;
// This will be called whenever count is changed: 1
countSignal.value += 1;
// This will be called whenever count is changed: 2
disableLogging();
countSignal.value += 1;
countSignal.value += 1;
Creating a wrapper for React is simple enough:

export function useSignalEffect(
  callback: () => void | (() => void)
) {
  return useEffect(() => signalEffect(callback), []);
}
```

### That’s all

I ended up publishing a package called `@ryfylke-react/proxy-signal` – which you can install through NPM if you want to test this for fun. It also includes useComputed which looks like this in use:

```tsx
const state = createSignal({ count: 0 });

function App() {
  const count = useComputed(state, (s) => s.count); // only rerender when count changes
  return (
    <button
      onClick={() => {
        state.value = { count: count + 1 };
      }}
    >
      {count}
    </button>
  );
}
```

But, be aware that this was mostly just an exercise and an experiment, and **should not be used in serious projects** (in favour of other better state management solutions).
