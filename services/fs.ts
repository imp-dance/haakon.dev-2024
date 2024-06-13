import fs from "fs";
import { redirect } from "next/navigation";
import path from "path";
import { parseArticleMd, parsePortfolioMd } from "./markdown";

const base = process.cwd();

export const paths = {
  portfolio: path.join(base, "./public/portfolio"),
  articles: path.join(base, "./public/articles"),
};

export async function getPortfolioFiles() {
  const rawFiles = fs.readdirSync(paths.portfolio);
  const files = await Promise.all(
    rawFiles.reverse().map(async (file) => {
      const contents = fs.readFileSync(
        `${paths.portfolio}/${file}`,
        "utf-8"
      );
      const md = await parsePortfolioMd(contents);

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
