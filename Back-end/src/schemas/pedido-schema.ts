import z from "zod";
export const pedidosResponse = z
  .object({
    status: z.number({}).int().positive().describe("Status da comanda"),
    id: z.number(),
    idComanda: z.number(),
    idProduto: z.number(),
    dataHora: z.string().datetime().describe("Data do pedido"),
  })
  .describe("Pedido Response");

export const createPedidos = z
  .object({
    idProduto: z.number(),
    idComanda: z.number(),
  })
  .describe("Create Pedidos");
