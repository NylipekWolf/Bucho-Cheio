import z from "zod";

export const zFornecedorResponse = z
  .object({
    id: z.number().int().describe("ID do Fornecedor"),
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    email: z.string(),
    telefone: z.string(),
    endereco: z.string().describe("Endereço do Fornecedor"),
  })
  .describe("Fornecedor Response");

export const zFornecedor = z
  .object({
    id: z.number(),
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    endereco: z.object({
      logradouro: z.string().describe("Nome da Rua"),
      numero: z.string(),
      cep: z.string(),
      complemento: z.string(),
    }),
    contato: z.object({
      nome: z.string().max(100).min(1),
      telefone: z.string(),
      email: z.string().email().max(255),
      principal: z.boolean(),
    }),
  })
  .describe("Criar Fornecedor");

export const zFornecedorCreate = z
  .object({
    nome: z.string().max(255).describe("Nome do Fornecedor"),
    endereco: z.object({
      logradouro: z.string().describe("Nome da Rua"),
      numero: z.string(),
      cep: z.string(),
      complemento: z.string(),
    }),
    contato: z.object({
      nome: z.string().max(100).min(1),
      telefone: z.string(),
      email: z.string().email().max(255),
      principal: z.boolean(),
    }),
  })
  .describe("Criar Fornecedor");

export const zFornecedorFiltro = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().optional(),
});

export const zFornecedorEndereco = z.object({
  id: z.coerce.number(),
  endereco: z.object({
    logradouro: z.string().describe("Nome da Rua"),
    numero: z.string(),
    cep: z.string(),
    complemento: z.string(),
  }),
});

export const zFornecedorContatos = z.object({
  id: z.coerce.number(),
  contato: z.object({
    nome: z.string().max(100).min(1),
    telefone: z.string(),
    email: z.string().email().max(255),
    principal: z.boolean(),
  }),
});

export type FornecedorFiltro = z.infer<typeof zFornecedorFiltro>;
export type FornecedorResponse = z.infer<typeof zFornecedorResponse>;
export type FornecedorEndereco = z.infer<typeof zFornecedorEndereco>;
export type Fornecedor = z.infer<typeof zFornecedor>;
export type FornecedorCreate = z.infer<typeof zFornecedorCreate>;

export type FornecedorContatos = z.infer<typeof zFornecedorContatos>;
