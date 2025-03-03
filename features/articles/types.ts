export type Article = {
  name: string;
  frontMatter: {
    title: string;
    date: string;
    summary: string;
    img?: string;
    draft?: boolean;
  };
  html: string;
};
