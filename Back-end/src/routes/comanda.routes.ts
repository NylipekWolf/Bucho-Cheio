import { comandaCreate, comandaRequest, comandaResponse, filtroComanda } from "../schemas/comanda-schema";
import { FastifyTypeInstance } from "../types";
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
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
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
          200: comandaResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
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
            200: comandaResponse
        }
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.put(
    "/comanda/status",
    {
        schema: {
            tags: [tags.COMANDA],
            description: "Modifica o status da comanda",
            body: z.object({
                id: z.number()
            }),
            response: {
                200: z.string()
            }
        }
    },
    async (request, reply) => {
        return reply.status(200).send("Status modificado com sucesso.");
    }
  )

  app.delete(
    "/comanda",
    {
        schema: {
            tags: [tags.COMANDA],
            description: "Remove uma comanda",
            body: z.object({
                id: z.number().positive()
            }),
            response: {
                200: z.string(),
            }
        }
    }, 
    async (request, reply) => {
        return reply.status(200).send("Comanda removida com sucesso.");
  });

  app.get(
    "/comanda/historico",
    {
      schema: {
        tags: [tags.COMANDA],
        description: "Lista o historico de comandas",
        querystring: filtroComanda,
        response: {
          200: z.array(comandaResponse)
        }
      }
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  )
}