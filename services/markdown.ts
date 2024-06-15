import hljs from "highlight.js";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import markdownit from "markdown-it";
import container from "markdown-it-container";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);

const md = markdownit({
  html: true,
  linkify: true,
  langPrefix: "language-",
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return "";
  },
});

md.use(container, "window");
md.use(container, "gallery");

export function parseMarkdown(markdown: string) {
  return md.render(markdown);
}
