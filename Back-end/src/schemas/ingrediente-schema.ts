import z from "zod";

export const ingredientesResponse = z
  .object({
    qtd: z.number().positive().describe("Quantidade do Ingrediente"),
    validade: z.date().describe("Data de validade do Ingrediente"),
    fornecedor: z.object({}).describe("Infos do Fornecedor"),
    nome: z.string().describe("Nome do Ingrediente"),
    preco: z.number().positive().describe("Preco do Ingrediente"),
  })
  .describe("Ingredientes Response");

export const createIngrediente = z
  .object({
    qtd: z.number({}).max(500).min(0),
    nome: z.string({}).max(50).min(1),
    fornecedor: z.number(),
    validade: z.date(),
    preco: z.number().positive(),
  })
  .describe("Criar Ingredientes");