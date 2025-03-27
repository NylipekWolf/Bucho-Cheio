import z from "zod";
export const mesaResponse = z
  .object({
    numero: z.number().int().positive().describe("Número da mesa"),
    status: z.number().int().describe("Disponibilidade da mesas"),
    qtdLugares: z.number().positive().describe("Quantidade de lugares"),
    comanda: z.object({}),
  })
  .describe("MesaResponse");

export const createMesa = z
  .object({
    numero: z.number({}),
    lugares: z.number().positive(),
  })
  .describe("CreateMesa");

export const mesaRequest = z.object({
  id: z.number().positive(),
  numero: z.number().positive(),
  qtdLugares: z.number().positive(),
});

export const filtroMesa = z.object({
  qtdLugares: z.number().positive().int(),
  numero: z.number().positive().int(),
});
