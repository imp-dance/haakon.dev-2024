import { getArticles } from "../../features/articles/server-utils";

export async function GET() {
  const articles = await getArticles();
  const baseUrl = "https://haakon.dev";

  const items = articles
    .map((article) => {
      const slug = article.name.replace(/\.md$/, "");
      const pubDate = new Date(
        article.frontMatter.date,
      ).toUTCString();
      return `
        <item>
          <title><![CDATA[${article.frontMatter.title}]]></title>
          <link>${baseUrl}/articles/${slug}</link>
          <guid>${baseUrl}/articles/${slug}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${article.frontMatter.summary ?? ""}]]></description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Articles - Håkon Svennes Underbakke</title>
    <link>${baseUrl}</link>
    <description>A blog focused on the development of a Norwegian frontend engineer.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
