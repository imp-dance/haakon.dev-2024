---
title: Packaging web workers for NPM
date: 2025-6-2
summary: >
  asdf
img: /images/ww.png
---

I recently found myself utilizing a web worker in a project that I intended to publish as an NPM package. Based on my very limited experience working with web workers, I knew this could be difficult. I had two assumptions:

- Web workers need to be separate javascript files
- You need to load them from a given url.

If you search online, most examples you find will look something like this:

:::window
/index.html

```html
<script>
  const worker = new Worker("/my-worker.js");
  worker.postMessage("hi");
  worker.addEventListener("message", (e) => {
    console.log("foo", e.data);
  });
  // foo bar
</script>
```

:::

:::window
/my-worker.js

```js
self.onmessage = (e) => {
  if (e.data === "hi") {
    self.postMessage("bar");
  }
};
```

:::

For this to work when publishing your package, you'd need to ensure that the worker file is bundled separately, then you have to resolve the URL that the web worker should be loaded from. You might run into various issues depending on your and your consumers' build systems.

You ideally want to just have the worker code somewhere close-by in the codebase and import it using relative paths. So how can we achieve this, and completely skip around the issues around bundling?

### Just put it in a string!

Let's write a worker file:

:::window
/.../my-worker.ts

```ts
export const worker = `
    self.onmessage = (e) => {...}
`;
```

:::

And then we can use it wherever we want like this:

:::window
/.../my-service.ts

```ts
import { worker } from "./my-worker";

const decoderWorkerBlob = new Blob([worker], {
  type: "application/javascript",
});

const workerUrl = URL.createObjectURL(decoderWorkerBlob);

const workerInstance = new Worker(workerUrl);

// workerInstance.postMessage("foo")...
```

:::

So we...

- Create a `Blob` from the exported worker string
- Create an object URL from the given blob
- Pass the created URL when creating the worker instance

Now we don't need to worry at all about bundling the worker into a separate javascript file, or how to resolve the url to give the `new Worker()` call. Works like a charm!

### What about node?

If you're publishing a package for use on node (or cross compatible) - you could use the `web-worker` package, and just slightly adjust the code:

:::window
/.../my-service.ts

```ts
import Worker from "web-worker";
const worker = `
    self.onmessage = (e) => {
        console.log("Message received in worker:", e.data);
        self.postMessage("Hello from the worker!");
    };
`;

const workerInstance = new Worker(
  `data:application/javascript,${encodeURIComponent(worker)}`
);
workerInstance.postMessage("Hello from the main thread!");
workerInstance.onmessage = (e) => {
  console.log("Message from worker:", e.data);
};
// Message received in worker: Hello from the main thread!
// Message from worker: Hello from the worker!
```

:::
