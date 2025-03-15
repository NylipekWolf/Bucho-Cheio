import z from "zod";
import { perfilResponse } from "./perfil-schema";
export const usuariosResponse = z
  .object({
    nome: z.string().describe("Nome Usuario"),
    senha: z.string().describe("Senha do usuario"),
    perfil: perfilResponse,
  })
  .describe("Usuario Response");

export const createUsuarios = z
  .object({
    nome: z.string().max(65).min(5),
    senha: z.string().max(20).min(8),
  })
  .describe("Create Usuarios");
