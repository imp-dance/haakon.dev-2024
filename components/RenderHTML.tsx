import { styled } from "@pigment-css/react";
import sanitizeHtml from "sanitize-html";

export function RenderHTML(props: { html: string }) {
  return (
    <HTMLStyles>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(props.html),
        }}
      />
    </HTMLStyles>
  );
}

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
