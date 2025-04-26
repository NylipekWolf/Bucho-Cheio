import z from "zod";
export const categoriaResponse = z
  .object({
    nome: z.string().describe("Nome da Categoria"),
    id: z.number({}),
  })
  .describe("Categoria Response");