import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesIngrediente(app: FastifyTypeInstance) {
  app.get(
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Lista todas as ingredientes",
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
    "/ingrediente",
    {
      schema: {
        tags: [tags.INGREDIENTE],
        description: "Metodo para adicionar uma novo ingrediente",
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
