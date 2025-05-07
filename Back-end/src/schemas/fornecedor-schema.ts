import z from "zod";
import { zContatoCreate } from "./contato-schema";
import { zEnderecoRequest } from "./endereco-schema";

export const zFornecedorResponse = z
  .object({
    id: z.number().int().positive().describe("ID do Fornecedor"),
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    email: z.string().nullable(),
    telefone: z.string().nullable(),
    endereco: z.string().describe("Endereço do Fornecedor"),
  })
  .describe("Fornecedor Response");

export const zFornecedorCreate = z
  .object({
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    endereco: zEnderecoRequest,
    contatos: z.array(zContatoCreate),
  })
  .describe("Criar Fornecedor");

export const zFornecedorFiltro = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().optional(),
});

export const zFornecedorEndereco = z.object({
  endereco: zEnderecoRequest,
});

export const zFornecedorContatos = z.object({
  id: z.coerce.number(),
  contatos: z.array(zContatoCreate),
});

export type FornecedorFiltro = z.infer<typeof zFornecedorFiltro>;
export type FornecedorResponse = z.infer<typeof zFornecedorResponse>;
export type FornecedorEndereco = z.infer<typeof zFornecedorEndereco>;
export type FornecedorCreate = z.infer<typeof zFornecedorCreate>;
export type FornecedorContatos = z.infer<typeof zFornecedorContatos>;
