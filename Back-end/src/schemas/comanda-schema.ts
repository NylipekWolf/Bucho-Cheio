import z from "zod";

export const comandaResponse = z
  .object({
    id: z.number(),
    nome: z.string().nullable(),
    preco: z.number().describe("Preco da comanda"),
    status: z.string().describe("Status da comanda"),
    id_mesa: z.number().optional().nullable(),
    id_usuario: z.number().optional()
  })
  .describe("Comanda Response");

export const comandaRequest = z
  .object({
    id: z.number(),
    pedidos: z.array(z.number()),
  })
  .describe("Request para adicionar pedidos");

export const comandaCreate = z.object({
  nome: z.string().optional(),
  pedido: z.array(z.number()),
  mesa: z.number().optional(),
}).describe("Criação de Comanda");

export const comandaImprimirResponse = z.object({
  pedidos: z.array(
    z.object({
      nomeProduto: z.string(),
      qtd: z.number(),
      preco: z.number(),
    })
  ),
  precoTotal: z.number(),
  dataInicio: z.string().date(),
  dataFim: z.string().date()
}).describe("Response para imprimir a comanda");

export const filtroComanda = z.object({
  id: z.number().optional(),
  status: z.array(z.number().int()).optional(),
  mesa: z.number().optional(),
}).describe("Filtro para métodos de listagem.");

export type filtroComandaQuery = z.infer<typeof filtroComanda>;
export type createComandaBody = z.infer<typeof comandaCreate>;
export type pedidoComandaBody = z.infer<typeof comandaRequest>;
