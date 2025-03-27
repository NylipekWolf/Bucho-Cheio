import { createEndereco } from "../schemas/endereco-schema";
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
          200: z.object({}), // ou array
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
          fornecedor: z.string(),
        }),*/
        response: {
          201: z.string(),
          400: z.string(),
          500: z.string(),
      },
     },
    },
    async (request, reply) => {
      try {
      /*  const fornecedorData = request.body; 
        await createFornecedor(fornecedorData); 
        return reply.status(201).send("Fornecedor criado com sucesso");
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send("Erro de validação com os dados fornecidos");
        }
        return reply.status(500).send("Erro no servidor");
      }*/
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
      try { const { id } = request.params as { id: number };

      
     /* const fornecedor = await findFornecedorById(id); 
      if (!fornecedor) {
        return reply.status(404).send("Fornecedor não encontrado");
      }
        
      const hasPermission = await checkUserPermission(request.user, fornecedor); 
      if (!hasPermission) {
        return reply.status(401).send("Não autorizado");
      }

      await deleteFornecedorById(id); 
      return reply.status(204).send("Fornecedor deletado com sucesso");
    } catch (error) {

      }
      catch (error) {
        return reply.status(500).send("Erro no servidor");
      }*/
    }
  );
}