import {
  deleteComandaController,
  getComandaController,
  postComandaController,
  putComandaController,
  putComandaStatusController,
} from "../controllers/comanda.controllers";
import {
  zComandaCreate,
  zComandaRequest,
  zComandaResponse,
  zComandaStatusRequest,
  zFiltroComanda,
} from "../schemas/comanda-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesComanda(app: FastifyTypeInstance) {
  app.get("/comanda", {
    schema: {
      tags: [tags.COMANDA],
      description: "Lista as comandas",
      querystring: zFiltroComanda,
      response: {
        200: z.array(zComandaResponse),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: getComandaController,
  });

  app.post("/comanda", {
    schema: {
      tags: [tags.COMANDA],
      description: "Cadastra nova Comanda",
      body: zComandaCreate,
      response: {
        201: zComandaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: postComandaController,
  });

  app.put("/comanda", {
    schema: {
      tags: [tags.COMANDA],
      description: "Atualiza as informações da comanda",
      body: zComandaRequest,
      response: {
        201: zComandaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putComandaController,
  });

  app.put("/comanda/status", {
    schema: {
      tags: [tags.COMANDA],
      description: "Modifica o status da comanda",
      body: zComandaStatusRequest,
      response: {
        201: zComandaResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putComandaStatusController,
  });

  app.delete("/comanda", {
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
    handler: deleteComandaController,
  });
}
