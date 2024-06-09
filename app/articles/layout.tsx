import { styled } from "@pigment-css/react";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  padding: var(--size-5);
  max-width: 800px;
  margin: 0 auto;
`;
