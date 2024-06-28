import extractFrontmatter from "front-matter";
import fs from "fs";
import path from "path";
import { parseMarkdown } from "../../services/markdown";

export const MD_PATH = path.join(
  process.cwd(),
  "./features/portfolio/data"
);

export async function parsePortfolioMd(file: string) {
  const { attributes, body } = extractFrontmatter(file);
  const html = parseMarkdown(body);

  return {
    frontMatter: attributes as {
      id: string;
      title: string;
      subTitle: string;
      body: string;
      type: string;
      image: string;
      goto?: string;
    },
    html,
  };
}

export async function getPortfolioFiles() {
  const rawFiles = fs.readdirSync(MD_PATH);
  const files = await Promise.all(
    rawFiles.reverse().map(async (file) => {
      const contents = fs.readFileSync(
        `${MD_PATH}/${file}`,
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
