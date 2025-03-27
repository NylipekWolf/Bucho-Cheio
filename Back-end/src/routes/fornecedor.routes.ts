import { fornecedorResponse } from "../schemas/fornecedor-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesFornecedor(app: FastifyTypeInstance) {
  app.get(
    "/fornecedor",
    {
      schema: {
        tags: [tags.FORNECEDOR],
        description: "Lista todas as fornecedor",
        response: {
          200: z.array(fornecedorResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    (request, reply) => {
      try {
      } catch (error) {}
    }
  );

  app.post(
    "/fornecedor",
    {
      schema: {
        tags: [tags.FORNECEDOR],
        description: "Metodo para adicionar uma novo fornecedor",
        body: z.object({
          nome: z.string().max(60),
          quantidade: z.number().positive(),
          fornecedor: z.string(),
        }),
        response: {
          201: fornecedorResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
        return console.log(request.body);
      } catch (error) {}
    }
  );
}
