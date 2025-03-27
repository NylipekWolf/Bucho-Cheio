import { getUserById } from "../repositories/fornecedor-repository";
import { usuarioRequest, usuariosResponse } from "../schemas/usuarios-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";
import { getUser } from "../controllers/user-controllers";

export async function routesUsuario(app: FastifyTypeInstance) {
  app.get(
    "/usuario",
    {
      schema: {
        tags: [tags.USUARIO],
        description: "Lista todas as usuarios",
        querystring: z.object({
          id: z.string(),
        }),
        response: {
          200: usuariosResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    getUser
  );

  app.post(
    "/usuario",
    {
      schema: {
        tags: [tags.USUARIO],
        description: "Metodo para adicionar um novo usuario",
        body: usuarioRequest,
        response: {
          201: usuariosResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
      } catch (error) {
        return reply.status(500).send("Erro interno no servidor");
      }
    }
  );
  app.delete(
    "/usuario",
    {
      schema: {
        tags: [tags.USUARIO],
        description: "Metodo para deletar um usuario",
        body: z.object({
          numero: z.number().positive().int(),
        }),
        response: {
          204: z.string(),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
      } catch (error) {
        return reply.status(500).send("Erro interno no servidor");
      }
    }
  );
  app.put(
    "/usuario",
    {
      schema: {
        tags: [tags.USUARIO],
        description: "Metodo para atualizar um usuario",
        body: usuarioRequest,
        response: {
          200: usuariosResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
      } catch (error) {
        return reply.status(500).send("Erro interno no servidor");
      }
    }
  );
}
