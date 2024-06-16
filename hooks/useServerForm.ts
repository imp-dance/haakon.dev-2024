import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape, z } from "zod";
import { useServerAction } from "./useServerAction";

export function useServerForm<
  TShape extends ZodRawShape,
  T extends ZodObject<TShape>
>(
  schema: z.ZodObject<TShape>,
  action: (data: FormData) => Promise<any>
) {
  const serverAction = useServerAction(action);
  type FormData = z.infer<T>;
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const formData = new FormData();
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
