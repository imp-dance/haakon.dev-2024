"use client";
import { styled } from "@pigment-css/react";
import { initToast } from "@ryfylke-react/toast";

type Toast = {
  message: string;
  bg?: string;
  color?: string;
};

const { ToastProvider: _ToastProvider, toast: _toast } =
  initToast<Toast>();

export const toast = _toast;

export function ToastProvider() {
  return (
    <_ToastProvider
      renderToasts={RenderToasts}
      portal={
        typeof document !== undefined ? document.body : undefined
      }
    />
  );
}

function RenderToasts(props: {
  toasts: (Toast & {
    id: string;
  })[];
  onRemoveToast: (id: string) => void;
  cancelToastTimeout: (id: string) => void;
  restartToastTimeout: (
    id: string,
    removeAfterMs?: number | undefined
  ) => void;
}) {
  return (
    <Container>
      {props.toasts.map((toast) => (
        <Toast
          key={toast.id}
          style={{ background: toast.bg, color: toast.color }}
          onClick={() => props.onRemoveToast(toast.id)}
        >
          {toast.message}
        </Toast>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Toast = styled.div`
  background: var(--surface-3);
  color: var(--text-1);
  padding: var(--size-3);
  border-radius: var(--radius-1);
  font-weight: var(--font-weight-8);
  letter-spacing: var(--font-letterspacing-1);
`;
