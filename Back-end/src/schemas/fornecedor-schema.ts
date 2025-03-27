import z, { number } from "zod";
import { contatoResponse, createContato } from "./contato-schema";
import { enderecoRequest, enderecoResponse } from "./endereco-schema";
export const fornecedorResponse = z
  .object({
    id: z.number().int().positive().describe("ID do Fornecedor"),
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    contato: z.array(contatoResponse),
    endereco: enderecoResponse.describe("Endereço do Fornecedor"),
  })
  .describe("Fornecedor Response");
export const createFornecedor = z
  .object({
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    endereco: createEndereco,
    contato: z.array(createContato),
  })
  .describe("Criar Fornecedor");
