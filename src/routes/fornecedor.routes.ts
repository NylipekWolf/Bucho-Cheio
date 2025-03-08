import { FastifyTypeInstance } from "../types";
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
          200: z.object({}),
        },
      },
    },
    () => {
      return [];
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
          validade: z.date(),
          fornecedor: z.string(),
        }),
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );
}
