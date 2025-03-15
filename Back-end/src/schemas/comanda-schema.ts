import z from "zod";
import { pedidosResponse } from "./pedido-schema";
import { produtoResponse } from "./produto-schema";
export const comandaResponse = z
  .object({
    pedido: pedidosResponse.describe("Pedido da comanda"),
    preco: z.number({}).positive().describe("Preco da comanda"),
    status: z.number({}).int().positive().describe("Status da comanda"),
    id: z.number({}),
  })
  .describe("Comanda Response");

export const createComanda = z
  .object({
    produtos: z.array(produtoResponse),
  })
  .describe("Create Comanda");
