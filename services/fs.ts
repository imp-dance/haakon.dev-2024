import fs from "fs";
import { redirect } from "next/navigation";
import { parseArticleMd, parseShowoffMd } from "./markdown";

export const paths = {
  showoff: "./public/showoff",
  articles: "./public/articles",
};

export async function getShowoffFiles() {
  const rawFiles = fs.readdirSync(paths.showoff);
  const files = await Promise.all(
    rawFiles.reverse().map(async (file) => {
      const contents = fs.readFileSync(
        `${paths.showoff}/${file}`,
        "utf-8"
      );
      const md = await parseShowoffMd(contents);

      return {
        name: file,
        ...md,
      };
    })
  );
  return files;
}

export async function getArticles() {
  const rawFiles = fs.readdirSync(paths.articles);
  const files = await Promise.all(
    rawFiles.reverse().map(async (file) => {
      const contents = fs.readFileSync(
        `${paths.articles}//${file}`,
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
      `${paths.articles}/${name}.md`,
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
