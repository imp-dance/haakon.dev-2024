"use client";
import { useServerAction } from "@/hooks/useServerAction";
import { sendEmail } from "@/services/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import LeaningMan from "./svg/Leaning";

const schema = z.object({
  from: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

export function ContactMeDialog() {
  const emailAction = useServerAction(sendEmail);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const error = emailAction.result?.error;
  const isSuccess = emailAction.isFinished && !error;
  const formDisabled = emailAction.isPending || isSuccess;

  const onSubmit = form.handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append("from", values.from);
    formData.append("email", values.email);
    formData.append("message", values.message);
    await emailAction.runAction(formData);
  });

  return (
    <Dialog
      buttonText="Contact"
      renderButton={
        <Button variant="primary" style={{ flexGrow: 1 }} />
      }
      style={{ padding: 0 }}
    >
      <form
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "var(--size-5)",
        }}
      >
        <h2>Contact me</h2>
        {error && (
          <p style={{ marginBlock: "var(--size-3)" }}>
            <strong
              style={{
                color: "var(--error-text)",
                background: "var(--error)",
                padding: "var(--size-3)",
                maxWidth: "calc(100% - 7rem)",
                display: "block",
              }}
            >
              {error}
            </strong>
          </p>
        )}
        <input
          type="text"
          disabled={formDisabled}
          placeholder="Name"
          required
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
          }}
          {...form.register("from")}
        />
        {form.formState.errors?.from?.message && (
          <ErrorMessage
            message={form.formState.errors.from.message}
          />
        )}
        <LeaningMan
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            pointerEvents: "none",
          }}
        />
        <input
          type="email"
          placeholder="your@email.com"
          disabled={formDisabled}
          required
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
          }}
          {...form.register("email")}
        />
        {form.formState.errors?.email?.message && (
          <ErrorMessage
            message={form.formState.errors.email.message}
          />
        )}
        <textarea
          disabled={formDisabled}
          placeholder="Message"
          required
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
          }}
          {...form.register("message")}
        />
        {form.formState.errors?.message?.message && (
          <ErrorMessage
            message={form.formState.errors.message.message}
          />
        )}
        <Button
          variant="primary"
          type="button"
          size="lg"
          disabled={formDisabled}
          style={{ marginTop: "var(--size-7)" }}
          onClick={async (e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {isSuccess
            ? "Message recieved!"
            : emailAction.isPending
            ? "Sending..."
            : error
            ? "Retry!"
            : "Send"}
        </Button>
      </form>
    </Dialog>
  );
}

function ErrorMessage(props: { message: string }) {
  return (
    <div
      style={{
        fontWeight: "var(--font-weight-5)",
        color: "var(--red-9)",
      }}
    >
      {props.message}
    </div>
  );
}
