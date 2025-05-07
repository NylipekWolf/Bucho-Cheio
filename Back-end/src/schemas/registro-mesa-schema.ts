import z from "zod";
import { statusMesa } from "../enums/status.enum";
export const zRegistroMesaResponse = z
  .object({
    id: z.number().int().positive(),
    status: z.string().describe("Disponibilidade da mesas"),
    quantidade_de_lugares: z
      .number()
      .positive()
      .describe("Quantidade de lugares"),
  })
  .describe("MesaResponse");

export const zRegistroCreateMesa = z
  .object({
    quantidade_de_lugares: z.number().positive(),
  })
  .describe("CreateMesa");

export const zRegistroUpdateMesa = z.object({
  id: z.number().positive(),
  quantidade_de_lugares: z.number().positive(),
});

export const zRegistroStatusMesa = z.object({
  id: z.number().positive(),
  status: z.string(),
});

export const zRegistroFiltroMesa = z.object({
  quantidade_de_lugares: z.coerce.number().optional(),
  id: z.coerce.number().optional(),
  status: statusMesa.optional(),
});

export type RegistroFiltroMesa = z.infer<typeof zRegistroFiltroMesa>;
export type RegistroCreateMesa = z.infer<typeof zRegistroCreateMesa>;
export type RegistroUpdateMesa = z.infer<typeof zRegistroUpdateMesa>;
export type RegistroStatusMesa = z.infer<typeof zRegistroStatusMesa>;
