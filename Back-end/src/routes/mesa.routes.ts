import {
  zRegistroCreateMesa,
  zRegistroFiltroMesa,
  zRegistroMesaResponse,
} from "../schemas/registro-mesa-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  getMesaController,
  postMesaController,
  putMesaController,
  statusMesaController,
} from "../controllers/mesa.controllers";

export async function routesMesa(app: FastifyTypeInstance) {
  app.get("/mesa", {
    schema: {
      tags: [tags.MESA],
      description: "Lista todas as mesas",
      querystring: zRegistroFiltroMesa,
      response: {
        200: z.array(zRegistroMesaResponse),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: getMesaController,
  });

  app.post("/mesa", {
    schema: {
      tags: [tags.MESA],
      description: "Método para adicionar uma nova mesa",
      body: zRegistroCreateMesa,
      response: {
        200: zRegistroMesaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: postMesaController,
  });

  app.put("/mesa/quantidadeLugares", {
    schema: {
      tags: [tags.MESA],
      description: "Método para atualizar quantidade de lugares em uma mesa",
      body: z.object({
        id: z.number().positive(),
        quantidade_de_lugares: z.number().positive(),
      }),
      response: {
        200: zRegistroMesaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putMesaController,
  });

  app.put("/mesa/status", {
    schema: {
      tags: [tags.MESA],
      description: "Método para atualizar o status de uma mesa",
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
    handler: statusMesaController,
  });
}
export const zodMesa = zodToJsonSchema(zRegistroMesaResponse);
