import z from "zod";
export const pedidosResponse = z
  .object({
    status: z.number().int().min(0).max(2).describe("Status da comanda"),
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

export const pedidoStatusRequest = z.object({
  id: z.number(),
  status: z.number().min(0).max(2)
}).describe("Request para modificar o status do pedido.")

export const filtroPedido = z.object({
  status: z.array(z.number().int()).optional(),
  produto: z.array(z.number().int()).optional(),
  data: z.string().datetime().optional()
}).describe("Filtro para métodos de listagem.")