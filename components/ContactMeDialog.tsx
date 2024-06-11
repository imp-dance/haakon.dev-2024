"use client";
import { sendEmail } from "@/services/email";
import { toast } from "@/services/toast";
import { useState } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import LeaningMan from "./svg/Leaning";

export function ContactMeDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <Dialog
      buttonText="Contact"
      renderButton={
        <Button variant="primary" style={{ flexGrow: 1 }} />
      }
      style={{ padding: 0 }}
    >
      <form
        id="contact-form"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "var(--size-5)",
        }}
      >
        <h2>Contact me</h2>
        <input
          type="text"
          disabled={isSuccess}
          name="from"
          placeholder="Name"
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
          }}
        />
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
          name="email"
          placeholder="your@email.com"
          disabled={isSuccess}
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
          }}
        />
        <textarea
          name="message"
          disabled={isSuccess}
          placeholder="Message"
          style={{
            paddingRight: "7rem",
            fontSize: "var(--font-size-fluid-1)",
            marginBottom: "var(--size-7)",
          }}
        />
        <Button
          variant="primary"
          id="close"
          type="submit"
          size="lg"
          disabled={isLoading || isSuccess}
          onClick={async (e) => {
            e.preventDefault();
            const form = document.getElementById(
              "contact-form"
            ) as HTMLFormElement;
            setIsLoading(true);
            const newSuccess = await sendEmail(
              new FormData(form)
            );
            setIsLoading(false);
            if (newSuccess) {
              setIsSuccess(true);
              toast({
                message: "Message recieved!",
                color: "var(--success-text)",
                bg: "var(--success)",
              });
            }
          }}
        >
          {isSuccess
            ? "Message recieved!"
            : isLoading
            ? "Sending..."
            : "Send"}
        </Button>
      </form>
    </Dialog>
  );
}
