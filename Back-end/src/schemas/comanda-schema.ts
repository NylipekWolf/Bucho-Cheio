import z from "zod";
import { statusComanda } from "../enums/status.enum";

export const zComandaResponse = z
  .object({
    id: z.number(),
    nome: z.string().nullable(),
    preco: z.number().describe("Preco da comanda"),
    status: z.string().describe("Status da comanda"),
    id_mesa: z.number().optional().nullable(),
    id_usuario: z.number().optional(),
    pedidos: z.array(z.number()).nullable()
  })
  .describe("Comanda Response");

export const zComandaRequest = z
  .object({
    id: z.coerce.number(),
    pedidos: z.array(z.coerce.number()),
  })
  .describe("Request para adicionar pedidos para comanda");

export const zComandaStatusRequest = z
  .object({
    id: z.coerce.number(),
    status: statusComanda
  }).describe("Request para mudar status da comanda.")

export const zComandaCreate = z.object({
  nome: z.string().optional(),
  pedido: z.array(z.coerce.number()),
  mesa: z.coerce.number().optional(),
}).describe("Criação de Comanda");

export const zComandaImprimirResponse = z.object({
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

export const zFiltroComanda = z.object({
  id: z.coerce.number().optional(),
  status: z.union([
      z.array(statusComanda),
      statusComanda
    ]).transform(val => (Array.isArray(val) ? val : val ? [val] : [])).optional(),
  mesa: z.coerce.number().optional(),
}).describe("Filtro para métodos de listagem.");

export type filtroComanda = z.infer<typeof zFiltroComanda>;
export type comandaCreate = z.infer<typeof zComandaCreate>;
export type comandaRequest = z.infer<typeof zComandaRequest>;
export type comandaStatusRequest = z.infer<typeof zComandaStatusRequest>;