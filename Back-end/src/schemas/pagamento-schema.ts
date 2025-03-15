import z from "zod";
export const pagamentoResponse = z
  .object({
    id: z.number().int().positive().describe("Id"),
    idComanda: z.boolean().describe("ID da Comanda"),
    valorPago: z.number().positive().describe("Valor A Pagar"),
    metodoPagamento: z.string().describe("Método de Pagamento"),
    dataPagamento: z.string().datetime(),
  })
  .describe("PagamentoResponse");
export const createPagamento = z
  .object({
    valorPago: z.number().positive(),
    metodoPagamento: z.string(),
  })
  .describe("PagamentoMesa");
