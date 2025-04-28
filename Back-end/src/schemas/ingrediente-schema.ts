import z from "zod";

export const zIngredientesResponse = z
  .object({
    nome: z.string().describe("Nome do Ingrediente"),
    quantidade: z.number().positive().describe("Quantidade do Ingrediente"),
    vencimento: z.string().date().describe("Data de validade do Ingrediente"),
    fornecedor: z.string().describe("Infos do Fornecedor"), //String na tabela, substituir por fornecedor_id e criar foreign key
    preco: z.number().positive().describe("Preco do Ingrediente"),
  })
  .describe("Ingredientes Response");

export const zCreateIngrediente = z
  .object({
    nome: z.string().max(50).min(1),
    quantidade: z.coerce.number().max(500).min(0),
    vencimento: z.string().date(),
    fornecedor: z.string(), //String na tabela, substituir por fornecedor_id e criar foreign key
    preco: z.number().positive(),
  })
  .describe("Criar Ingredientes");

export const zFiltroIngrediente = z.object({
  nome: z.string().max(50).min(1).optional(),
  vencimento: z.union([
    z.string().date(),
    z.array(z.string().date())
  ]).transform(val => (Array.isArray(val) ? val : val ? [val] : [])).optional(),
  fornecedor: z.union([
    z.string(),
    z.array(z.string())
  ]).transform(val => (Array.isArray(val) ? val : val ? [val] : [])).optional() //String na tabela, substituir por fornecedor_id e criar foreign key
}).describe("Filtro para métodos de listagem.")

export const zIngredienteRequest = z.object({
  id: z.number().positive(),
  quantidade: z.number().positive()
});

export type filtroIngrediente = z.infer<typeof zFiltroIngrediente>
export type createIngrediente = z.infer<typeof zCreateIngrediente>
export type ingredienteRequest = z.infer<typeof zIngredienteRequest>