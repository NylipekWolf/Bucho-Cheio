import { createMesa, mesaResponse } from "../schemas/mesa-schema";
import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export async function routesMesa(app: FastifyTypeInstance) {
  app.get(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Lista todas as mesas",
        response: {
          200: mesaResponse,
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );

  app.post(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para adicionar uma nova mesa",
        body: z.object({
          numero: z.number().int().positive(),
              disponivel: z.boolean(),
              comanda: z.object({})
        }),
        response: {
          200: mesaResponse,
          201: z.string().describe("teste"),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
  app.delete(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para deletar uma mesa",
        body: z.object({
          numero: z.number().positive(),
        }),
        response: {
          200: mesaResponse,
          201: z.string().describe("teste"),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
  app.put(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para atualizar uma mesa",
        body: z.object({
          id: z.number().positive(),
          numero: z.number().positive(),
          qtdLugares: z.number().positive(),
          status: z.number().int(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
  app.put(
    "/mesa/quantidadeLugares",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para atualizar quantidade de lugares em uma mesa",
        body: z.object({
          id: z.number().positive(),
          qtdLugares: z.number().positive(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
  app.put(
    "/mesa/status",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para atualizar o status de uma mesa",
        body: z.object({
          id: z.number().positive(),
          status: z.number().int().max(2).min(0),
        }),
        response: {
          200: z.string(),

        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
}
export const zodMesa = zodToJsonSchema(mesaResponse);
