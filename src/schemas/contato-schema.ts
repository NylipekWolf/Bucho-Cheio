import z from "zod";
export const contatoResponse = (
    z.object({
      nome: z.string().describe("Nome do contato"),
      telefone: z.number().int().describe("Telefone do contato"),
      email: z.string().describe("Email do contato"),  
    }) 
    .describe("Contato Response")
);
export const createContato = z.object({
    nome: z.string({}).max(100).min(1),
    telefone: z.number({}).max(13).min(9),
    email: z.string({}).max(100).min(11),
}) . describe("Create Contato");
