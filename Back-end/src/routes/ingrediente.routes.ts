import { deleteIngredienteController, getIngredienteController, postIngredienteController, putIngredienteController } from "../controllers/ingrediente.controllers";
import {
  zCreateIngrediente,
  zFiltroIngrediente,
  zIngredienteRequest,
  zIngredientesResponse,
} from "../schemas/ingrediente-schema";
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
        querystring: zFiltroIngrediente,
        response: {
          200: z.array(zIngredientesResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: getIngredienteController
    },
  );

  app.post(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Metodo para adicionar um novo ingrediente",
        body: zCreateIngrediente,
        response: {
          201: zIngredientesResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: postIngredienteController
    },
  );

  app.put(
    "/ingredientes",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Metodo para atualizar quantidade de ingrediente",
        body: zIngredienteRequest,
        response: {
          200: zIngredientesResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: putIngredienteController
    },
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
          204: z.string(),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: deleteIngredienteController
    },
  );

  app.get(
    "/ingrediente/historico",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Lista historico dos ingredientes",
        querystring: zFiltroIngrediente,
        response: {
          200: z.array(zIngredientesResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
}
