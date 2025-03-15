import z from "zod";
export const permissoesResponse = z
  .object({
    nome: z.string().describe("Nome Tipo Permissoes"),
    id: z.number().positive(),
  })
  .describe("Permissoes Response");

export const createPermissoes = z
  .object({
    nome: z.string().max(50).min(5),
  })
  .describe("Create Permissoes");
