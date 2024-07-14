import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape, z } from "zod";
import { GenericFormData } from "../types/formData";
import { useServerAction } from "./useServerAction";

export function useServerForm<
  TShape extends ZodRawShape,
  T extends ZodObject<TShape>,
  TReturnType extends unknown
>(
  schema: z.ZodObject<TShape>,
  action: (data: GenericFormData<TShape>) => Promise<TReturnType>
) {
  type FormData = z.infer<T>;

  const serverAction = useServerAction(action);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const formData = new FormData() as GenericFormData<TShape>;
    for (const key in values) {
      formData.append(key, values[key]);
    }
    await serverAction.runAction(formData);
  });

  return {
    onSubmit,
    form,
    isPending: serverAction.isPending,
    isFinished: serverAction.isFinished,
    result: serverAction.result,
  };
}
