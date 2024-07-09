import { z } from "zod";

export const contactSchema = z.object({
  from: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required"),
  message: z.string().min(20, "A little longer please..."),
});
