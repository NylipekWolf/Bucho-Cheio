import z from "zod";

//Padronização do Schema dos pedidos
export const pedidosResponse = z
  .object({
    id: z.number(),
    id_produto: z.number(),
    id_comanda: z.number(),
    status: z.string().describe("Status da comanda"),
    data_hora: z.unknown().describe("Data do pedido"), //Originalmente z.string().datetime().describe("Data do pedido"), mas causa erro de validação
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
  status: z.string()
}).describe("Request para modificar o status do pedido.")

export const filtroPedido = z.object({
  status: z.array(z.number().int()).optional(),
  produto: z.array(z.number().int()).optional(),
  data: z.string().datetime().optional()
}).describe("Filtro para métodos de listagem.")

//Exportação desses schemas como tipo para uso em funções de controllers
export type filtroPedidoQuery = z.infer<typeof filtroPedido>;
export type createPedidoBody = z.infer<typeof createPedidos>;
export type putPedidoBody = z.infer<typeof pedidoStatusRequest>;