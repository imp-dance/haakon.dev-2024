import { styled } from "@pigment-css/react";
import sanitizeHtml from "sanitize-html";

export function RawHTML(props: { html: string }) {
  return (
    <HTMLStyles>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(props.html, {
            allowedTags: [...defaultAllowedTags, "img"],
          }),
        }}
      />
    </HTMLStyles>
  );
}

const defaultAllowedTags = [
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "main",
  "nav",
  "section",
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "main",
  "ol",
  "p",
  "pre",
  "ul",
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
];

const HTMLStyles = styled.div`
  & > div {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);

    & h3 {
      font-size: var(--font-size-4);
      font-weight: var(--font-weight-5);
    }

    & h3 {
      font-size: var(--font-size-3);
      font-weight: var(--font-weight-6);
    }

    & p,
    & ul,
    & li,
    & ol {
      font-size: var(--font-size-3);
      line-height: var(--font-lineheight-2);
      color: var(--text-4);
    }
  }
`;
