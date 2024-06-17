import { styled } from "@pigment-css/react";
import { ReactNode } from "react";

export default function BrainLayout(props: {
  children: ReactNode;
}) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  padding: var(--size-9);
  padding-top: var(--size-5);
`;
