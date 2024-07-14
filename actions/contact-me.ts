"use server";
import { contactSchema } from "../schemas/contactSchema";
import { sendMail } from "../services/email";
import { createServerFormAction, ResponseStatus } from "./utils";

export const contactMe = createServerFormAction({
  schema: contactSchema,
  action: async (values) => {
    try {
      const response = await sendMail(values);
      if (!response.body)
        return {
          status: ResponseStatus.SERVER_ERROR,
          success: false,
        };
    } catch (err) {
      return {
        error: "Unknown error",
        success: false,
        status: ResponseStatus.SERVER_ERROR,
      };
    }
    return { success: true, status: ResponseStatus.SUCCESS };
  },
});
