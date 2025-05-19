import z from "zod";
import { statusMesa } from "../enums/status.enum";
export const zMesaResponse = z
  .object({
    id: z.number().int(),
    status: statusMesa.describe("Disponibilidade da mesas"),
    quantidade_de_lugares: z
      .number()
      .positive()
      .describe("Quantidade de lugares"),
  })
  .describe("MesaResponse");

export const zMesaCreate = z
  .object({
    quantidade_de_lugares: z.coerce.number().positive(),
  })
  .describe("CreateMesa");

export const zUpdateMesa = z.object({
  id: z.coerce.number(),
  quantidade_de_lugares: z.coerce.number().positive(),
});

export const zMesaStatus = z.object({
  id: z.coerce.number(),
  status: statusMesa,
});

export const zMesaFiltro = z.object({
  id: z.coerce.number().optional(),
  quantidade_de_lugares: z.coerce.number().optional(),
  status: statusMesa.optional(),
});

export type MesaResponse = z.infer<typeof zMesaResponse>;
export type MesaFiltro = z.infer<typeof zMesaFiltro>;
export type MesaCreate = z.infer<typeof zMesaCreate>;
export type MesaUpdate = z.infer<typeof zUpdateMesa>;
export type MesaStatus = z.infer<typeof zMesaStatus>;
