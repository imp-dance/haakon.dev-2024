import extractFrontmatter from "front-matter";
import fs from "fs";
import { redirect } from "next/navigation";
import path from "path";
import { parseMarkdown } from "../../services/markdown";

export const MD_PATH = path.join(
  process.cwd(),
  `./public/articles`
);

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

export async function getArticles() {
  const rawFiles = fs.readdirSync(MD_PATH);
  const files = await Promise.all(
    rawFiles.reverse().map(async (file) => {
      const contents = fs.readFileSync(
        `${MD_PATH}//${file}`,
        "utf-8"
      );
      const md = await parseArticleMd(contents);

      return {
        name: file,
        ...md,
      };
    })
  );

  files.sort(
    (a, b) =>
      // @ts-ignore
      new Date(b.frontMatter.date) - new Date(a.frontMatter.date)
  );
  return files;
}

export async function getArticle(name: string) {
  try {
    const contents = fs.readFileSync(
      `${MD_PATH}/${name}.md`,
      "utf-8"
    );
    const md = await parseArticleMd(contents);
    return {
      name,
      ...md,
    };
  } catch (err) {
    redirect(`https://impedans.me/web/${name}`);
  }
}
