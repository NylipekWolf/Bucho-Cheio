import z, { number } from "zod";

export const zEnderecoResponse = z
  .object({
    id: number().int(),
    logradouro: z.string().describe("Nome da Rua"),
    numero: z.string(),
    cep: z.string(),
    complemento: z.string(),
  })
  .describe("Endereco Response");

export const zEnderecoRequest = z
  .object({
    id: z.coerce.number().optional(),
    logradouro: z.string().max(255).min(5),
    numero: z.number().positive(),
    cep: z.string().max(8),
    complemento: z.string().max(65).optional(),
  })
  .describe("Criar Endereco");
