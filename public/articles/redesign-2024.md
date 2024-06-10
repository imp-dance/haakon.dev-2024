---
title: 2024 Redesign
date: 2024-06-10
summary: Yet another redesign
---

It was about time for a new redesign/revamp of this website (I think this is the... fifth redesign?). The last version of my portfolio was made using NextJS pages router, and this time around I really wanted to try out RSC via NextJS's app router - so I did.

![New design screenshot](/24-website.jpg)

### RSC is awesome

Using React Server Components feels great. The tight coupling between server and client retrospectively feels super natural. No regrets here.

```html
<look-mom> Server rendered syntax highlighting! </look-mom>
```

More than anything, the fact that I don't have to manually stitch up lots of API calls (and deal with everything that comes with that) to create a simple website like this one - is what sells me on the concept.

> SEO is nice too 🙂

### Begone, Wordpress!

If you didn't know, I've been using Wordpress as a headless CMS for the last few iterations of this website. I decided to scrap this, and use a folder with markdown files instead. I've become very accustomed to writing articles in markdown, and I enjoy the simplicity of this method.

- I write articles in markdown files in a given folder
  - And enrich the markdown files with frontmatter (title, date, summary)
- I retrieve the list of files, using `fs`
  - [`front-matter`](https://www.npmjs.com/package/front-matter) to extract the frontmatter
  - [`markdown-it`](https://github.com/markdown-it/markdown-it) in combination with [`highlight.js`](https://highlightjs.org/) to parse the markdown and add syntax highlighting to code blocks.

One benefit over Wordpress is that I can more easily preview the articles as I'm writing them. Not having to deal with Wordpress at all (logging into a separate domain, navigating their solution, etc...) is a nice benefit as well. I prefer writing raw markdown over using a WYSIWYG editor.

I've kept [`giscus`](https://giscus.app/) for the comment section, as it is nice and simple solution to adding some form of reader-feedback on my articles. It's loaded in a client component, of course.

### Less motion all around?

My previous iteration heavily utilized the [`motion`](https://motion.dev/) library to add page transitions and animations. I've decided to remove motion entirely, and scale down on the animations generally. This is mostly because I wanted the website to feel faster and more snappy.

### Open Props rock

I'm a big fan of technologies that try to harmonize with the standard web API. [Remix](https://remix.run/) is one of them, and if remix/react-router had RSC support when this iteration was started I probably would've went with that framework instead.

[Open Props](https://open-props.style/) is another of these technologies. It's a set of CSS tokens that can be used as a design system. I have wanted to try this out since I first heard about it - and I can safely say that I'm a huge fan.

### Not the _most_ creative design

I decided to keep a lot of the old ideas in lieu of redesigning the whole website. The landing page header is very similar, but I decided to simplify the "my experience" and "about me" sections. The typography is also nicer and more responsive, thanks to open props.

### Archiving my old website

I'm a sentimental and nostalgic person. So I can't just let the old website dissapear into the void that is no-longer-online websites. Therefore, I've taken a lot of screenshots for reference (and the code will always be available at my github). Take a look!

![Screenshot #1](/old_website/1.jpg)
![Screenshot #2](/old_website/2.jpg)
![Screenshot #3](/old_website/3.jpg)
![Screenshot #4](/old_website/4.jpg)
![Screenshot #5](/old_website/5.jpg)
![Screenshot #6](/old_website/6.jpg)

### What about the old articles?

For now, I redirect directly to the old wordpress instance for 404 article routes. I will migrate old articles (and probably pick and choose a bit) eventually.
