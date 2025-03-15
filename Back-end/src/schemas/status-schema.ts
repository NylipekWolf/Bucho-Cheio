import z from "zod";
export const statusResponse = z
  .object({
    nome: z.string().describe("Nome do Status"),
    id: z.number({}),
  })
  .describe("Status Response");