import { z } from "zod";

export const idParams = z.object({
  id: z.string().regex(/^d+$/, ""),
});
export type idParamsSchemaType = z.infer<typeof idParams>;
