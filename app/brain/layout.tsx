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

  @media screen and (max-width: 768px) {
    padding: var(--size-6);
  }
`;
