import { historicoResponse } from "../schemas/historico-schema";
import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesHistorico(app: FastifyTypeInstance) {
    app.get(
        "/historico",
        {
          schema: {
            tags: [tags.HISTORICO],
            description: "Lista todo o historico",
            response: {
              200: historicoResponse,
            },
          },
        },
        async (request, reply) => {
          return reply.status(200).send();
        }
    );

    //É preciso atualizar o diagrama de classes para o historico
}