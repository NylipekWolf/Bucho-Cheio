import z from "zod";
export const mesaResponse = z
  .object({
    numero: z.number().int().positive().describe("Número da mesa"),
    disponivel: z.boolean().describe("Disponibilidade da mesas"),
    comanda: z.object({}),
  })
  .describe("MesaResponse");
export const createMesa = z
  .object({
    numero: z.number({}).max(100).min(1),
  })
  .describe("CreateMesa");
