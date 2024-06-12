"use server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET as string
);

export async function sendEmail(formData: FormData) {
  const from = formData.get("from") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!from || !message || !email) {
    return {
      error: "Missing fields",
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
        error: "",
      };
    } else {
      return {
        error: "Failed to send",
      };
    }
  } catch {
    return {
      error: "Failed to send",
    };
  }
}
