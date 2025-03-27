import { perfilResponse } from "../schemas/perfil-schema";
import { produtoRequest } from "../schemas/produto-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesProduto(app: FastifyTypeInstance) {
  app.get(
    "/perfil",
    {
      schema: {
        tags: [tags.PERFIL],
        description: "Lista todas os produtos",
        response: {
          200: z.array(perfilResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
        const query = request.query;
      } catch (error) {}
    }
  );

  app.post(
    "/perfil",
    {
      schema: {
        tags: [tags.PERFIL],
        description: "Metodo para adicionar um novo produto",
        body: produtoRequest,
        response: {
          200: perfilResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
  app.delete(
    "/perfil",
    {
      schema: {
        tags: [tags.PERFIL],
        description: "Metodo para deletar um produto",
        body: z.object({
          numero: z.number().positive(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
  app.put(
    "/perfil",
    {
      schema: {
        tags: [tags.PERFIL],
        description: "Metodo para atualizar um produto",
        body: produtoRequest,
        response: {
          200: perfilResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
}
