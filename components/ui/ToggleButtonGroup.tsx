import { styled } from "@pigment-css/react";

export function ToggleButtonGroup(
  props: {
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return <Container {...props}>{props.children}</Container>;
}

const Container = styled.div`
  display: flex;
  gap: 0 !important;
  align-items: center;
  & ._btn {
    flex: 1;
    border-radius: 0;
    &:first-child {
      border-top-left-radius: var(--radius-2);
      border-bottom-left-radius: var(--radius-2);
    }
    &:last-child {
      border-top-right-radius: var(--radius-2);
      border-bottom-right-radius: var(--radius-2);
    }
    &:active {
      transform: scale(1) !important;
    }
  }
`;
