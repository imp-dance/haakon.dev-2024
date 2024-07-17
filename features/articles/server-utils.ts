import extractFrontmatter from "front-matter";
import fs from "fs";
import { redirect } from "next/navigation";
import path from "path";
import { parseMarkdown } from "../../services/markdown";
import { Article } from "./types";

const MD_PATH = path.join(
  process.cwd(),
  "./features/articles/data"
);

export async function parseArticleMd(
  file: string
): Promise<Omit<Article, "name">> {
  const { attributes, body } = extractFrontmatter(file);
  const html = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      title: string;
      date: string;
      summary: string;
      img?: string;
    },
    html,
  };
}

export async function getArticles(): Promise<Article[]> {
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

export async function getArticle(
  name: string
): Promise<Article> {
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
