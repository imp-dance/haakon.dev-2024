import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET as string
);

export async function sendMail({
  from,
  email,
  message,
}: {
  from: string;
  email: string;
  message: string;
}) {
  return await mailjet
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
}
