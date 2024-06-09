import fm from "front-matter";
import { marked } from "marked";

export async function parseShowoffMd(file: string) {
  const { attributes, body } = fm(file);
  const content = await marked.parse(body);

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
  const content = await marked.parse(body);

  return {
    frontMatter: attributes as {
      title: string;
      date: string;
      summary: string;
    },
    content: content,
  };
}
