import { controllerDeleteComanda, controllerGetComanda, controllerPostComanda, controllerPutComanda, controllerPutComandaStatus } from "../controllers/comanda.controllers";
import {
  comandaCreate,
  comandaRequest,
  comandaResponse,
  filtroComanda,
} from "../schemas/comanda-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesComanda(app: FastifyTypeInstance) {
  app.get(
    "/comanda",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Lista as comandas",
        querystring: filtroComanda,
        response: {
          200: z.array(comandaResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: controllerGetComanda
    }
  );

  app.post(
    "/comanda",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Cadastra nova Comanda",
        body: comandaCreate,
        response: {
          201: comandaResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: controllerPostComanda
    }
  );

  app.put(
    "/comanda",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Atualiza as informações da comanda",
        body: comandaRequest,
        response: {
          200: comandaResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: controllerPutComanda
    },
  );

  app.put(
    "/comanda/status",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Modifica o status da comanda",
        body: z.object({
          id: z.number(),
        }),
        response: {
          200: z.string(),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
      handler: controllerPutComandaStatus
    },
  );

  app.delete(
    "/comanda",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Remove uma comanda",
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
      handler: controllerDeleteComanda
    },
  );

  app.get(
    "/comanda/historico",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Lista o historico de comandas",
        querystring: filtroComanda,
        response: {
          200: z.array(comandaResponse),
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
