---
date: 2023-07-10
title: Typesafe Custom Events
summary: >
  Here’s a useful abstraction on top of custom events that let you more easily set up typesafe channels to communicate between.
---

Here’s a useful abstraction on top of custom events that let you more easily set up typesafe channels to communicate between.

```ts
type UnsubscribeFunction = () => void;
const prefix = "global-prefix"; // To prevent event-name collision
const generateId = () => {
  /* should return a unique id */
};

export class CustomEventChannel<T> {
  name: string;
  id: string;
  send: (args: T) => void;
  subscribe: (onEvent: (event: T) => any) => UnsubscribeFunction;

  constructor(name?: string) {
    this.id = generateId();
    this.name = name ?? `${prefix}-${this.id}`;
    this.send = (args: T) => {
      if (args === undefined) return;
      document.dispatchEvent(
        new CustomEvent(this.name, { detail: args })
      );
    };
    this.subscribe = (
      onEvent: (event: T) => void
    ): UnsubscribeFunction => {
      const listener = (e: Event) => {
        const event = e as Event & {
          detail?: T;
        };
        if (event.detail !== undefined) {
          onEvent(event.detail);
        }
      };
      document.addEventListener(this.name, listener);
      return () => {
        document.removeEventListener(this.name, listener);
      };
    };
  }
}

// use
type MyEventFormat = {
  message: string;
  isCool: boolean;
};
const channel = new CustomEventChannel<MyEventFormat>(
  "coolChannel"
);

channel.subscribe((event) => {
  console.log("New message: ", event.message, event.isCool);
});

channel.send({
  message: "Foobar",
  isCool: true,
});
// "New message: Foobar, true"
```

This can be used in React like a hook:

```tsx
const useChannel = <T extends unknown>(
  channel: CustomEventChannel<T>
) => {
  const [state, setState] = React.useState<T[]>([]);
  React.useEffect(() => {
    const unsubscribe = channel.subscribe((event) => {
      setState((p) => [...p, event]);
    });
    return unsubscribe;
  }, []);
  return state;
};

// use
const myChannel = new CustomEventChannel<{
  content: React.ReactNode;
}>("my-channel");

const App = () => {
  const events = useChannel(channel);
  // ...
};
```

It’s worth noting that the events collected in the hook are cleared when the component is unmounted, and it only start listening once the component is mounted.

I’ve also published this as an NPM package, `typesafe-custom-events`, which you can check out [here](https://typesafe-custom-events.ryfylke.dev/).
