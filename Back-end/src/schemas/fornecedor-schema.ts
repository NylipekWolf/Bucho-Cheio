import z, { number } from "zod";
import { contatoResponse, createContato } from "./contato-schema";
import { enderecoRequest, enderecoResponse } from "./endereco-schema";
export const fornecedorResponse = z
  .object({
    id: number().int(),
    contato: z.array(contatoResponse),
    endereco: enderecoResponse.describe("Endereço do Fornecedor"),
  })
  .describe("Fornecedor Response");
export const createFornecedor = z
  .object({
    id: number().int().optional(),
    endereco: enderecoRequest,
    contato: z.array(createContato),
  })
  .describe("Criar Fornecedor");
