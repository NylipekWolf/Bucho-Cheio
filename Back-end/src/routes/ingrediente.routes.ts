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
            qtd: z.number({}).max(500).min(0) //Não existe schema só para quantidade
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

  //Tinhamos pensado anteirormente, melhor revisar com as mudanças dos diagramas de classe
  app.get(
    "ingredientes/historico",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Lista historico dos ingredientes",
        response: {
          200: ingredientesResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  )
}
