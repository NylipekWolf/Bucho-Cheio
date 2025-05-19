import z, { number } from "zod";

export const zIngredientesResponse = z
  .object({
    id: z.number(),
    nome: z.string().describe("Nome do Ingrediente"),
    quantidade: z.number().positive().describe("Quantidade do Ingrediente"),
    vencimento: z.string().describe("Data de validade do Ingrediente"),
    preco: z.number().positive().describe("Preco do Ingrediente"),
    fornecedor: z.string().describe("Infos do Fornecedor"),
  })
  .describe("Ingredientes Response");

export const zCreateIngrediente = z
  .object({
    nome: z.string().max(50).min(1),
    quantidade: z.coerce.number().min(1),
    vencimento: z.string(),
    fornecedor: z.string(), //String na tabela, substituir por fornecedor_id e criar foreign key
    preco: z.coerce.number().positive(),
  })
  .describe("Criar Ingredientes");

export const zFiltroIngrediente = z
  .object({
    id: z.coerce.number().optional(),
    nome: z.string().max(50).min(1).optional(),
    vencimento: z.string().optional(),
    fornecedor: z.string().optional()
  }).describe("Filtro para métodos de listagem.");

export const zIngredienteRequest = z.object({
  id: z.coerce.number().positive(),
  quantidade: z.coerce.number().positive(),
});

export type filtroIngrediente = z.infer<typeof zFiltroIngrediente>;
export type createIngrediente = z.infer<typeof zCreateIngrediente>;
export type ingredienteRequest = z.infer<typeof zIngredienteRequest>;
export type ingredienteResponse = z.infer<typeof zIngredientesResponse>;