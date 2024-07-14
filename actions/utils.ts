import { z } from "zod";
import { GenericFormData } from "../types/formData";

export enum ResponseStatus {
  INVALID_FORM_DATA = "INVALID_FORM_DATA",
  SERVER_ERROR = "SERVER_ERROR",
  SUCCESS = "SUCCESS",
}

type ResponseFormat<TData = undefined, TError = undefined> = {
  success: boolean;
  status: ResponseStatus;
  error?: TError;
  data?: TData;
};

export function createServerFormAction<
  TShape extends z.ZodRawShape,
  T extends z.ZodObject<TShape>,
  TReturnType extends unknown,
  TReturnError extends unknown
>(args: {
  schema: z.ZodObject<TShape>;
  action: (
    data: z.infer<T>
  ) => Promise<ResponseFormat<TReturnType, TReturnError>>;
}) {
  const action = async function (
    formData: GenericFormData<z.infer<T>>
  ) {
    const values = {};
    for (const [key, value] of formData.entries()) {
      // @ts-ignore
      values[key] = value;
    }

    const fields = args.schema.safeParse(values as TShape);

    if (!fields.success) {
      return {
        status: ResponseStatus.INVALID_FORM_DATA,
        success: false,
        error: fields.error.errors
          .flatMap((err) => err.message)
          .join(", "),
      } satisfies ResponseFormat<undefined, string>;
    }

    return args.action(fields.data);
  };
  return action;
}
