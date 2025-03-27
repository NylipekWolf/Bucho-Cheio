import z from "zod";
export const enderecoResponse = z
  .object({
    logradouro: z.string().describe("Nome da Rua"),
    numero: z.number().positive(),
    cep: z.string(),
    complemento: z.string(),
  })
  .describe("Endereco Response");
export const createEndereco = z
  .object({
    logradouro: z.string().max(255).min(5),
    numero: z.number().positive(),
    cep: z.string().max(8),
    complemento: z.string().max(65).optional(),
    
  })
  .describe("Criar Endereco");
