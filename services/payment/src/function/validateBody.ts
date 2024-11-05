import { bodyData, bodyDataSchema } from "@/types/bodyDataType";

export const validateBody = async (
  body: unknown
): Promise<bodyData | string> => {
  const validatedData = bodyDataSchema.safeParse(body);

  if (!validatedData.success) {
    return `Failed: ${validatedData.error.errors[0].path[0]} is ${validatedData.error.errors[0].message}`;
  }

  return validatedData.data;
};
