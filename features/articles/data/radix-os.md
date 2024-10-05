---
title: Radix OS
date: 2024-10-5
summary: >
  Radix OS is a operating system simulated in browser, built using Radix, Zustand and React.
img: /images/radix-os.jpg
---

Radix OS is a project that I developed as a fun UX exercise while vacationing between jobs. It is a simulated in-browser operating system, made using [Radix](https://www.radix-ui.com/), [Zustand](https://github.com/pmndrs/zustand), [DnD kit](https://dndkit.com/) & [React](https://react.dev).

![Radix OS preview](/images/radix-os.jpg)

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

Click any of these links to [view the source](https://github.com/imp-dance/radix-os), or [check out the demo](https://imp-dance.github.io/radix-os/).

### Drag & Drop

[`dnd kit`](https://dndkit.com/) was a great solution for implementing drag and drop. Previously, I have implemented this manually by listening to all relevant events, tracking mouse position while dragging, etc. `dnd kit` allows me to think in simpler terms (`X` is _draggable_, `Y` is _droppable_). This made it trivial to add options for where you can drag and drop folders.

I would love to look more into dragging _between different apps_, as the overflow of the current application window would make this difficult to implement currently.

It is also possible to rearrange the icons on the desktop by dragging and dropping, but this grid-like behaviour has many issues that I have yet to resolve.

### Persisting data

I decided to only use local storage for persisting data between reloads, instead of hosting a proper backend and requiring login for public use. To do this easily with Zustand, I used [persist](https://zustand.docs.pmnd.rs/integrations/persisting-store-data) with `createJSONStorage(() => localStorage)`.

Believe it or not, this is my first time using Zustand. Seems like a good option for client-side state, in the few scenarios I normally need that.
