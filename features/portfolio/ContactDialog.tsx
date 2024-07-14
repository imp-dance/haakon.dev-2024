"use client";
import { contactMe } from "../../actions/contact-me";
import { Dialog } from "../../components/Dialog";
import { MeLeaningSVG } from "../../components/svg/MeLeaningSVG";
import { SendIcon } from "../../components/svg/SendIcon";
import { Button } from "../../components/ui/Button";
import { useServerForm } from "../../hooks/useServerForm";
import { contactSchema } from "../../schemas/contactSchema";

export function ContactDialog(props: {
  variant?: "primary" | "secondary" | "ghost" | "subtle";
  size?: "sm" | "md" | "lg";
  buttonText?: string;
}) {
  const { form, result, isFinished, isPending, onSubmit } =
    useServerForm(contactSchema, contactMe);

  const error =
    result && "error" in result ? result.error : null;
  const isSuccess = isFinished && !error;
  const formDisabled = isPending || isSuccess;

  return (
    <Dialog
      buttonText={props.buttonText ?? "Contact me"}
      renderButton={
        <Button
          variant={props.variant ?? "primary"}
          size={props.size}
          style={{
            flexGrow: 1,
            position: "relative",
            zIndex: 2,
          }}
        />
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
          I&apos;ll get back to you ASAP!
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
        <MeLeaningSVG
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
          ) : isPending ? (
            "Sending..."
          ) : error ? (
            "Retry!"
          ) : (
            <>
              Send{" "}
              <SendIcon
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
