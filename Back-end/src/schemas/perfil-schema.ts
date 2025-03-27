import z, { number } from "zod";
import { permissoesResponse } from "./permissoes-schema";
export const perfilResponse = z
  .object({
    id: number(),
    nome: z.string().describe("Nome do perfil"),
    permissoes: z.array(permissoesResponse).describe("Permissões do perfil"),
  })
  .describe("Perfil Response");

export const perfilRequest = z
  .object({
    id: number().int().optional(),
    nome: z.string().max(65).min(5),
    permissoes: z.array(permissoesResponse),
  })
  .describe("Create Perfil");
