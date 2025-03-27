import {
  createMesa,
  filtroMesa,
  mesaRequest,
  mesaResponse,
} from "../schemas/mesa-schema";
import { FastifyTypeInstance } from "../config/types";
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
        querystring: filtroMesa,
        response: {
          200: z.array(mesaResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
      } catch (error) {}
    }
  );

  app.post(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para adicionar uma nova mesa",
        body: createMesa,
        response: {
          200: mesaResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
      } catch (error) {}
    }
  );
  app.delete(
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para deletar uma mesa",
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
    "/mesa",
    {
      schema: {
        tags: [tags.MESA],
        description: "Metodo para atualizar uma mesa",
        body: mesaRequest,
        response: {
          200: z.string(),
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
export const zodMesa = zodToJsonSchema(mesaResponse);
