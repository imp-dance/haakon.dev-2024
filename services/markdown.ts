import extractFrontmatter from "front-matter";
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

export async function parsePortfolioMd(file: string) {
  const { attributes, body } = extractFrontmatter(file);
  const highlightedLines = body.matchAll(/{([\d,]+)}/g);
  for (const match of highlightedLines) {
    const [full, lines] = match;
    console.log(full, lines);
  }

  const html = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      id: string;
      title: string;
      subTitle: string;
      body: string;
      type: string;
      image: string;
    },
    html,
  };
}

export async function parseArticleMd(file: string) {
  const { attributes, body } = extractFrontmatter(file);
  const html = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      title: string;
      date: string;
      summary: string;
    },
    html,
  };
}
