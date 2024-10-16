---
title: Radix OS
date: 2024-10-5
summary: >
  Radix OS is a operating system simulated in browser, built using Radix, Zustand and React.
img: /images/radix-os.jpg
---

Radix OS is a project that I developed as a fun UX exercise while vacationing between jobs. It is a simulated in-browser operating system, made using [Radix](https://www.radix-ui.com/), [Zustand](https://github.com/pmndrs/zustand), [DnD kit](https://dndkit.com/) & [React](https://react.dev).

### [Try out the live demo](https://imp-dance.github.io/radix-os/)

![Radix OS preview](/images/radix-os.jpg)

The source is available as always on [github](https://github.com/imp-dance/radix-os).

Some features include...

- **Window management**
  - Minimize, maximize, rearrange, tile
- **Customization**
  - Background, dark/light mode
- **File system**
  - Create files and folders, drag and drop moving
  - Persisted in localStorage
- **Apps**
  - Image preview
  - Web browser (barely functional)
  - Code editor
  - Terminal

### Drag & Drop

I have manually implemented drag & drop enough times to know that I was better off using a library here, so I did a bit of research and landed on [dnd kit](https://dndkit.com/).

[`dnd kit`](https://dndkit.com/) ended up being a great solution. The package allows me to think in simpler terms (`X` is _draggable_, `Y` is _droppable_). Adding restrictions to the draggable elements was straight forward enough, by utilizing [modifiers](https://docs.dndkit.com/api-documentation/modifiers).

I would love to look more into dragging _between different apps_, as the overflow of the current application window would make this difficult to implement currently.

It is also possible to rearrange the icons on the desktop by dragging and dropping, but this grid-like behaviour has a few issues that I have yet to resolve. 💩

### Persisting data

I decided to only use local storage for persisting data between reloads, instead of hosting a proper backend and requiring login for public use. To do this easily with Zustand, I used [persist](https://zustand.docs.pmnd.rs/integrations/persisting-store-data) with `createJSONStorage(() => localStorage)`.

Believe it or not, this is my first time using Zustand. Seems like a good option for client-side state, in the few scenarios I normally need that.

The project is built with lots of isolated layers that utilize eachother. These layers each have their own store:

- File system
- Window management
- Settings

### The file system

A `file` looks like this:

```typescript
type File = {
  name: string;
  launcher: Launcher[];
  data: string;
};
```

#### Launching files

The `data` property on files is a string value that can be read and understood by different _launchers_.

As an example, the web browser can take either _a link_, or _HTML_. The image previewer can take an _SVG_, or a _data:image string_.

:::window
Example file

```json
{
  "name": "index.html",
  "launcher": ["web", "code"],
  "data": "<h1>Hello world!</h1>"
}
```

:::

A `Launcher` is just a string union of different types of launchers. **Which launchers are available determines what apps are available to launch the file from**. You can configure this per file from the terminal app:

::: window
Terminal (radix-os)

```shell
fs [path] --ex [launcher]
# example:
fs "Documents/My cool file" --ex browser
```

:::

#### Referencing files & folders

In the Zustand store, I designed most of the actions to take in a string path to reference files or folders. I utilize a couple of helper functions that I wrote to work with these paths in the store, and in the terminal app:

- **`findNodeByPath(path: string, tree: FsNode)`**
  - Takes a tree-structure and a string path, and returns the node if found
- **`parseRelativePath(cd: string, path: string)`**
  - Takes in two string paths, an absolute _current path_ - and a _relative path_.
  - ```typescript
    const path = parseRelativePath(
      "Home/Documents",
      "../Images"
    ); // "Home/Images"
    ```

### Window management

The window management state is made up of the following:

```typescript
type Window = {...};

type WindowStore = {
    windows: Window[];
    activeWindow: Window | null;
    windowOrder: symbol[];
    // ...actions
}
```

`windowOrder` determines the Z index of the windows, and the `activeWindow` is the currently focused window (as indicated in the multi tasking bar).

The windows themselves are shell components that are draggable within the desktop bounds. If shift is held down while dragging the windows, "drop-zones" appear. Dropping the window in one of these zones will tile it accordingly.
