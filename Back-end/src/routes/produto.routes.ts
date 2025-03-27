import { produtoRequest, produtoResponse } from "../schemas/produto-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesProduto(app: FastifyTypeInstance) {
  app.get(
    "/produto",
    {
      schema: {
        tags: [tags.PRODUTO],
        description: "Lista todas os produtos",
        response: {
          200: produtoResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.post(
    "/produto",
    {
      schema: {
        tags: [tags.PRODUTO],
        description: "Metodo para adicionar um novo produto",
        body: produtoRequest,
        response: {
          200: produtoResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
  app.delete(
    "/produto",
    {
      schema: {
        tags: [tags.PRODUTO],
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
    "/produto",
    {
      schema: {
        tags: [tags.PRODUTO],
        description: "Metodo para atualizar um produto",
        body: produtoRequest,
        response: {
          200: produtoResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
}
