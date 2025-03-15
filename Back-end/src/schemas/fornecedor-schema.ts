import z from "zod";
import { contatoResponse, createContato } from "./contato-schema";
import { createEndereco, enderecoResponse } from "./Endereco-schema";
export const fornecedorResponse = z
  .object({
    contato: z.array(contatoResponse),
    endereco: enderecoResponse.describe("Endereço do Fornecedor"),
  })
  .describe("Fornecedor Response");
export const createFornecedor = z
  .object({
    endereco: createEndereco,
    contato: z.array(createContato),
  })
  .describe("Criar Fornecedor");
