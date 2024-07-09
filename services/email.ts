"use server";
import Mailjet from "node-mailjet";
import { z } from "zod";
import { contactSchema } from "../schemas/contactSchema";
import { GenericFormData } from "../types/formData";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET as string
);

export async function sendEmail(
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
  try {
    const response = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "mail@ryfylke.dev",
              Name: from,
            },
            To: [
              {
                Email: "hakon@ryfylke.dev",
                Name: "Håkon",
              },
            ],
            Subject: "Message (haakon.dev) from " + from,
            TextPart: message,
            HTMLPart: `From ${email}.<br/><br/>${message}`,
            CustomID: "FromHaakonDev",
          },
        ],
      });
    if (response.body) {
      return {
        error: null,
        success: true as const,
      };
    } else {
      return {
        error: "Failed to send",
        success: false as const,
      };
    }
  } catch {
    return {
      error: "Failed to send",
      success: false as const,
    };
  }
}
