"use client";
import { useServerAction } from "@/hooks/useServerAction";
import { sendEmail } from "@/services/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import LeaningMan from "./svg/Leaning";
import { Send } from "./svg/Send";

const schema = z.object({
  from: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required"),
  message: z.string().min(20, "A little longer please..."),
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
        <p
          style={{
            paddingRight: "7rem",
            color: "var(--text-4)",
          }}
        >
          I&apos;ll get back to you asap!
        </p>
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
        <label>
          Name
          <input
            type="text"
            disabled={formDisabled}
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
        </label>
        <LeaningMan
          style={{
            position: "absolute",
            right: 0,
            bottom: 63,
            pointerEvents: "none",
            filter: "grayscale(0.7)",
          }}
        />
        <label>
          Email
          <input
            type="email"
            disabled={formDisabled}
            required
            style={{
              paddingRight: "7rem",
              fontSize: "var(--font-size-fluid-1)",
            }}
            {...form.register("email")}
          />{" "}
          {form.formState.errors?.email?.message && (
            <ErrorMessage
              message={form.formState.errors.email.message}
            />
          )}
        </label>

        <label>
          Message
          <textarea
            disabled={formDisabled}
            required
            style={{
              paddingRight: "7rem",
              fontSize: "var(--font-size-fluid-1)",
              minHeight: "170px",
            }}
            {...form.register("message")}
          />
          {form.formState.errors?.message?.message && (
            <ErrorMessage
              message={form.formState.errors.message.message}
            />
          )}
        </label>
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
          {isSuccess ? (
            "Message recieved!"
          ) : emailAction.isPending ? (
            "Sending..."
          ) : error ? (
            "Retry!"
          ) : (
            <>
              Send{" "}
              <Send
                style={{ width: ".75em", height: ".75em" }}
              />
            </>
          )}
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
        animation: "var(--animation-bounce)",
        animationIterationCount: 1,
      }}
    >
      {props.message}
    </div>
  );
}
