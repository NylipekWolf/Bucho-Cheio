import z from "zod";
import { statusPedido } from "../enums/status.enum";

//Padronização do Schema dos pedidos
//Os Schemas de Response precisam ter o mesmo nome das colunas na tabela de dados
export const zPedidosResponse = z
  .object({
    id: z.number(),
    id_produto: z.number(),
    id_comanda: z.number(),
    status: statusPedido.describe("Status da comanda"),
    data_hora: z.string().describe("Data do pedido"),
  })
  .describe("Pedido Response");

export const zCreatePedidos = z
  .object({
    idProduto: z.coerce.number(),
    idComanda: z.coerce.number(),
    data_hora: z.string()
  })
  .describe("Create Pedidos");

export const zPedidoStatusRequest = z.object({
  id: z.coerce.number(),
  status: statusPedido
}).describe("Request para modificar o status do pedido.")

export const zFiltroPedido = z.object({
  id: z.coerce.number().optional(),
  status: statusPedido.optional(),
  produto: z.coerce.number().int().optional(),
  data: z.string().optional()
}).describe("Filtro para métodos de listagem.")

//Exportação desses schemas como tipo para uso em funções de controllers
export type filtroPedido = z.infer<typeof zFiltroPedido>;
export type createPedido = z.infer<typeof zCreatePedidos>;
export type pedidoStatusRequest = z.infer<typeof zPedidoStatusRequest>;
export type pedidosResponse = z.infer<typeof zPedidosResponse>;