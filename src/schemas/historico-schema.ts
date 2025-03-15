import z from "zod";
export const historicoResponse = z
  .object({
    tags: z.string().describe("Tags do historico"),
    descricao: z.string().describe("Descrição do historico"),
    usuario: z.object({}).describe("Tipo do Usuario"),
    idUsuario: z.number().int().positive().describe("Id do usuario"),
    DataCriacao: z.string().datetime().describe("Data de criação do historico"),
  })
  .describe("Historico Response");

export const createHistorico = z
  .object({
    tags: z.string().max(50).min(1),
    descricao: z.string().max(150).min(1),
    dataCriacao: z.string().datetime(),
  })
  .describe("Create Historico");
