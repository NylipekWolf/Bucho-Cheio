import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z, { number } from "zod";
import { createContato } from "../schemas/contato-schema";
import { createFornecedor } from "../schemas/fornecedor-schema";

export async function routesFornecedor(app: FastifyTypeInstance) {
  app.get(
    "/fornecedor",
    {
      schema: {
        tags: [tags.FORNECEDOR],
        description: "Lista todos os fornecedores",
        response: {
          200: z.array(fornecedorResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
     async (request, reply) => {
      try {
     /*   const fornecedores = await findAllFornecedores(); 
        if (fornecedores.length === 0) {
          return reply.status(404).send("Nenhum fornecedor encontrado");
        }
        return reply.status(200).send(fornecedores);
      } catch (error) {
        return reply.status(500).send("Erro no servidor");*/
    }
  );

  app.post(        
    "/fornecedor",
    {
      schema: {
        tags: [tags.FORNECEDOR],
        description: "Metodo para adicionar um novo fornecedor",
       /* body: z.object({
          nome: z.string().max(60),
          quantidade: z.number().positive(),
          validade: z.date(),
          fornecedor: z.string(),
        }),
        response: {
          201: fornecedorResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
        }),*/
        response: {
          201: z.string(),
          400: z.string(),
          500: z.string(),
      },
     },
    },
    async (request, reply) => {
    }
  );

  app.put(
    "/fornecedor/id", //ou /:id; criar mais de um put para modificações especificas
    {
      schema: {
      tags:[tags.FORNECEDOR],
      description: "Metodo para editar um fornecedor",
      body: createFornecedor,
      },
    },
    async (request, reply) => {
     
    }
  );

  app.delete(
    "/fornecedor/:id", 
    {
      schema: {
      tags: [tags.FORNECEDOR],
      description: "Metodo para deletar um fornecedor",
      params: z.object({
        id: number().int().positive(),
      }),
      response: {
        204: z.string(),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      }
    },
  },
    async (request, reply) => {
      
    }
  );
}