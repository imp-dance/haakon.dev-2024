---
title: Implementing audio/video in RadixOS
date: 2025-6-3
summary: >
  asdf
img: /images/radix-os.jpg
---

[RadixOS](https://radix-os.netlify.app/) is a NPM package that provides a extendable and customizable OS-like user experience. I started on this project about one year ago and have been incrementally tweaking it and adding new features.

The file system of RadixOS is a tree of folders and files that look like this:

```json
{
  "name": "Documents",
  "children": [
    {
      "name": "my homepage",
      "launcher": ["web", "code"],
      "data": "<!DOCTYPE HTML>\n..."
    }
  ]
}
```

Which means that the file data is serializable and transferrable over the web, it's literally just a string.

Different applications in RadixOS can launch different types of files. What technically determines what apps different files can be opened with are the file's `launcher`s. Since the applications themselves are just React components, they simply receive the file as a prop.

:::window
my-custom-app.tsx

```tsx

export const MyApp = createApp((props) => {
    const fileContent = props.file?.file?.data;
    const filePath = props.file?.path;
    if (fileContent) {
        return (
            // do something with the file
        )
    }
});
```

:::

This all begs the question, how are files uploaded?

## Encoding files for the system

Some file types are handled by the default apps RadixOS provides. You can extend this with [your own handler](https://radix-os.netlify.app/fs#system-file-upload).

The latest addition to RadixOS has been the ability to encode and decode audio and video files so that they can be played when launched by the video player and audio player respectively. This came with a couple of interesting challenges.

### The naive approach

You could use `atob` and `btoa` on the main thread to encode and decode the files into base64 synchronously. This was my first approach, and it worked well enough though it had an issue. When I launched a file from the explorer app - the ui would freeze while the file was decoding.

This isn't great user experience, and felt unacceptable - so I had to find some other solution.

### Moving over to a web worker

Web workers are neat. They let us offload expensive work to another thread, making it not affect the rendering of the page. They work by communicating back and forward with the main thread using events.

I figured if I just posted a message with the base64 encoded string, and waited for a decoded blob back from the worker - this could work. If you wrap this logic in a promise, it's easy for the component to show a loading state while the worker is doing the hard work.

**Next problem**

After trying out this new code in excitement - I'm met with a white screen of death. The page crashed. After a bit of research, I realised the issue was that I was sending a _huge_ string to the worker, all at once, seemingly freezing up the tab.

My approach to solving this was to split up the string into chunks that I could send to the worker one by one until the worker had the entire thing. Once the worker had received the whole string, it would do the work and post a response.

**This finally worked** 🤩

_Until I tried opening two files in quick succession_ 💩

But, solving this last problem was a piece of cake. Instead of having a global buffer for the base64 string in the worker, I made it into an object that could be indexed into by "request id". This way I could create an ID for every "request" and pass it along with the messages, ensuring that the worker appended the content onto the correct buffer.

### That's a lot of talk and not much code.

**Fine**. If that's all I am to you... _Just a_... just a silly code monkey..._åøæålp_. here to give you the snippets! **FEED YOU THE _bYtEs_**.

```tsx
01100111 01101001 01110100 00100000 01110010 01101001 01100011 01101011 01110010 01101111 01101100 01101100 01100100 00100000 01101110 01100101 01110010 01100100
```

Jokes aside, [this file](https://github.com/imp-dance/radix-os/blob/main/packages/radix-os/src/services/base64/base64.ts) contains most of the logic for decoding and encoding the files. I figured the most interesting parts of this aren't the code implementation details themselves, moreso the problems I encountered along the way.
