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
        body: createMesa.describe("CreateMesa"),
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
}
export const zodMesa = zodToJsonSchema(mesaResponse);
