import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z, { number } from "zod";
import { zContatoCreate, zContatoResponse } from "../schemas/contato-schema";
import { zEnderecoResponse } from "../schemas/endereco-schema";
import {
  zFornecedorCreate,
  zFornecedorResponse,
  zFornecedorFiltro,
  zFornecedorEndereco,
  zFornecedorContatos,
} from "../schemas/fornecedor-schema";
import {
  getFornecedorController,
  postFornecedorController,
  putFornecedorContatoController,
  putFornecedorEnderecoController,
} from "../controllers/fornecedor.controllers";

export async function routesFornecedor(app: FastifyTypeInstance) {
  app.get("/fornecedor", {
    schema: {
      tags: [tags.FORNECEDOR],
      description: "Lista todos os fornecedores",
      querystring: zFornecedorFiltro,
      response: {
        200: z.array(zFornecedorResponse),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: getFornecedorController,
  });

  app.post("/fornecedor", {
    schema: {
      tags: [tags.FORNECEDOR],
      description: "Metodo para adicionar um novo fornecedor",
      body: zFornecedorCreate,
      response: {
        201: zFornecedorResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: postFornecedorController,
  });

  app.put("/fornecedor/endereco", {
    schema: {
      tags: [tags.FORNECEDOR],
      description: "Metodo para editar o endereço de um fornecedor",
      body: zFornecedorEndereco,
      response: {
        201: zEnderecoResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putFornecedorEnderecoController,
  });

  app.put("/fornecedor/contatos", {
    schema: {
      tags: [tags.FORNECEDOR],
      description: "Metodo para editar os contatos de um fornecedor",
      body: zFornecedorContatos,
      response: {
        201: z.array(zContatoResponse),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putFornecedorContatoController,
  });

  // app.delete(
  //   "/fornecedor/:id",
  //   {
  //     schema: {
  //       tags: [tags.FORNECEDOR],
  //       description: "Metodo para deletar um fornecedor",
  //       params: z.object({
  //         id: number().int().positive(),
  //       }),
  //       response: {
  //         204: z.string(),
  //         401: z.string(),
  //         404: z.string(),
  //         500: z.string(),
  //       },
  //     },
  //   },
  //   async (request, reply) => {}
  // );
}
