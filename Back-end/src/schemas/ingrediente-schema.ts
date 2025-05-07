import z, { number } from "zod";

export const zIngredientesResponse = z
  .object({
    id: z.number(),
    nome: z.string().describe("Nome do Ingrediente"),
    quantidade: z.number().positive().describe("Quantidade do Ingrediente"),
    vencimento: z.date().describe("Data de validade do Ingrediente"),
    preco: z.number().positive().describe("Preco do Ingrediente"),
    fornecedor: z.string().describe("Infos do Fornecedor"),
  })
  .describe("Ingredientes Response");

export const zCreateIngrediente = z
  .object({
    nome: z.string().max(50).min(1),
    quantidade: z.coerce.number().min(1),
    vencimento: z.date(),
    fornecedor: z.string(), //String na tabela, substituir por fornecedor_id e criar foreign key
    preco: z.number().positive(),
  })
  .describe("Criar Ingredientes");

export const zFiltroIngrediente = z
  .object({
    id: z.number().optional(),
    nome: z.string().max(50).min(1).optional(),
    vencimento: z
      .union([z.string().date(), z.array(z.string().date())])
      .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
      .optional(),
    fornecedor: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
      .optional(), //String na tabela, substituir por fornecedor_id e criar foreign key
  })
  .describe("Filtro para métodos de listagem.");

export const zIngredienteRequest = z.object({
  id: z.number().positive(),
  quantidade: z.number().positive(),
});

export type filtroIngrediente = z.infer<typeof zFiltroIngrediente>;
export type createIngrediente = z.infer<typeof zCreateIngrediente>;
export type ingredienteRequest = z.infer<typeof zIngredienteRequest>;
