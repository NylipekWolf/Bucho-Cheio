import z from "zod";

export const comandaResponse = z
  .object({
    id: z.number({}),
    nome: z.string(),
    pedido: z.array(z.number()).describe("Pedido da comanda"),
    preco: z.number({}).positive().describe("Preco da comanda"),
    status: z.number({}).int().max(2).min(0).describe("Status da comanda"),
    mesa: z.number().optional(),
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