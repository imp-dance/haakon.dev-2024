import fm from "front-matter";
import showdown from "showdown";

function parseMarkdown(markdown: string) {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
}

export async function parseShowoffMd(file: string) {
  const { attributes, body } = fm(file);
  const content = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      id: string;
      title: string;
      subTitle: string;
      body: string;
      type: string;
      image: string;
    },
    content,
  };
}

export async function parseArticleMd(file: string) {
  const { attributes, body } = fm(file);
  const content = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      title: string;
      date: string;
      summary: string;
    },
    content: content,
  };
}
