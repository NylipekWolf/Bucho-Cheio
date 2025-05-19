import {
  zMesaCreate,
  zMesaFiltro,
  zMesaResponse,
  zMesaStatus,
} from "../schemas/mesa-schema";
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
      querystring: zMesaFiltro,
      response: {
        200: z.array(zMesaResponse),
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
      body: zMesaCreate,
      response: {
        201: zMesaResponse,
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
        201: zMesaResponse,
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
      body: zMesaStatus,
      response: {
        201: zMesaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: statusMesaController,
  });
}
export const zodMesa = zodToJsonSchema(zMesaResponse);
