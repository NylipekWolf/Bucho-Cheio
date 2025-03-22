import { createIngrediente, filtroIngrediente, ingredientesResponse } from "../schemas/ingrediente-schema";
import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesIngrediente(app: FastifyTypeInstance) {
  app.get(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Lista todas as ingredientes",
        querystring: filtroIngrediente,
        response: {
          200: z.array(ingredientesResponse),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.post(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Metodo para adicionar um novo ingrediente",
        body: createIngrediente,
        response: {
          200: ingredientesResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.put(
    "/ingredientes",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Metodo para atualizar quantidade de ingrediente",
        body: z.object({
          id: z.number().positive(),
          qtd: z.number().positive(), //Não existe schema só para quantidade
        }),
        response: {
          200: ingredientesResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.delete(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Deleta um item de ingredientes atraves do Id",
        body: z.object({
          id: z.number().positive(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send("Ingrediente removido com sucesso.");
    }
  );

  app.get(
    "/ingrediente/historico",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Lista historico dos ingredientes",
        querystring: filtroIngrediente,
        response: {
          200: z.array(ingredientesResponse),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
}
