import z from "zod";

export const zContatoResponse = z
  .object({
    id: z.number(),
    nome: z.string().describe("Nome do contato"),
    telefone: z.string().describe("Telefone do contato"),
    email: z.string().describe("Email do contato"),
    principal: z.boolean(),
  })
  .describe("Contato Response");

export const zContatoCreate = z
  .object({
    nome: z.string().max(100).min(1),
    telefone: z.string(),
    email: z.string().email().max(255),
    principal: z.boolean(),
  })
  .describe("Create Contato");
