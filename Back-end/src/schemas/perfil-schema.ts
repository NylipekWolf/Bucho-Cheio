import z from "zod";
import { permissoesResponse } from "./permissoes-schema";
export const perfilResponse = z
  .object({
    nome: z.string().describe("Nome do perfil"),
    permissoes: z.array(permissoesResponse).describe("Permissões do perfil"),
  })
  .describe("Perfil Response");

export const createPerfil = z
  .object({
    nome: z.string().max(65).min(5),
    permissoes: z.array(permissoesResponse),
  })
  .describe("Create Perfil");
