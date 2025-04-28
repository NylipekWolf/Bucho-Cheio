import z from "zod";
import { statusPedido } from "../enums/status.enum";

//Padronização do Schema dos pedidos
//Os Schemas de Response precisam ter o mesmo nome das colunas na tabela de dados
export const zPedidosResponse = z
  .object({
    id: z.number(),
    id_produto: z.number(),
    id_comanda: z.number(),
    status: z.string().describe("Status da comanda"),
    data_hora: z.string().datetime().describe("Data do pedido"),
    //Originalmente z.string().datetime().describe("Data do pedido"), mas causa erro de validação com o valor retornado pelo SQL
  })
  .describe("Pedido Response");

export const zCreatePedidos = z
  .object({
    idProduto: z.number(),
    idComanda: z.number(),
  })
  .describe("Create Pedidos");

export const zPedidoStatusRequest = z.object({
  id: z.number(),
  status: z.string()
}).describe("Request para modificar o status do pedido.")

export const zFiltroPedido = z.object({
  //Union para aceitar tanto array de Strings e só uma String
  //função transform para tranformar String em Array de Strings (Para facilitar com a lógica da filtragem na camada Service)
  status: z.union([
    z.array(statusPedido),
    statusPedido
  ]).transform(val => (Array.isArray(val) ? val : val ? [val] : [])).optional(),

  //Função coerce tranforma o input do JSON, que vem no formato string no Integer valido
  produto: z.union([
    z.array(z.coerce.number().int()),
    z.coerce.number().int()
  ]).transform(val => (Array.isArray(val) ? val : val ? [val] : [])).optional(),

  data: z.string().datetime().optional()
}).describe("Filtro para métodos de listagem.")

//Exportação desses schemas como tipo para uso em funções de controllers
export type filtroPedido = z.infer<typeof zFiltroPedido>;
export type createPedido = z.infer<typeof zCreatePedidos>;
export type pedidoStatusRequest = z.infer<typeof zPedidoStatusRequest>;