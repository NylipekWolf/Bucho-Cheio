import { request } from "http";
import { createIngrediente, ingredientesResponse } from "../schemas/ingrediente-schema";
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
        response: {
          200: ingredientesResponse,
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
        body: createIngrediente.describe("Create Ingrediente"),
        response: {
          200: ingredientesResponse
        }
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
            qtd: z.number({}).negative() //Não existe schema só para quantidade
        }),
        response: {
          200: ingredientesResponse
        }
      }
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  )

  app.delete(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Deleta um item de ingredientes atraves do Id",
        body: z.object({
          id: z.number({}).positive(), //Placeholder até implementação da intregação com a base de dados
        }),
        response: {
          200: ingredientesResponse.describe("O seguinte item foi deletado")
        }
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  )
}
