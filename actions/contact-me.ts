"use server";
import { z } from "zod";
import { contactSchema } from "../schemas/contactSchema";
import { sendMail } from "../services/email";
import { GenericFormData } from "../types/formData";

export async function contactMe(
  formData: GenericFormData<z.infer<typeof contactSchema>>
) {
  const from = formData.get("from") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const fields = contactSchema.safeParse({
    from,
    email,
    message,
  });

  if (!fields.success) {
    return {
      error: fields.error.errors[0].message,
      success: false as const,
    };
  }

  return await sendMail({ from, email, message });
}
