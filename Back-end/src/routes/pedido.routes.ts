import {
  deletePedidoController,
  getPedidoController,
  postPedidoController,
  putPedidoController,
} from "../controllers/pedido.controllers";
import {
  zCreatePedidos,
  zFiltroPedido,
  zPedidosResponse,
  zPedidoStatusRequest,
} from "../schemas/pedido-schema";
import { FastifyTypeInstance } from "../config/types";
import { tags } from "../utils/tags";
import z from "zod";

//Definição de rotas de pedidos
export async function routesPedido(app: FastifyTypeInstance) {
  app.get("/pedido", {
    schema: {
      tags: [tags.PEDIDO],
      description: "Lista os pedidos",
      querystring: zFiltroPedido,
      response: {
        200: z.array(zPedidosResponse),
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: getPedidoController,
  });

  app.post("/pedido", {
    schema: {
      tags: [tags.PEDIDO],
      description: "Cria um novo pedido",
      body: zCreatePedidos,
      response: {
        201: zPedidosResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: postPedidoController,
  });

  app.put("/pedido", {
    schema: {
      tags: [tags.PEDIDO],
      description: "Atualiza o status do pedido",
      body: zPedidoStatusRequest,
      response: {
        200: zPedidosResponse,
        401: z.string(),
        404: z.string(),
        500: z.string(),
      },
    },
    handler: putPedidoController,
  });

  app.delete("/pedido", {
    schema: {
      tags: [tags.PEDIDO],
      description: "Deleta um item de pedidos através do Id",
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
    handler: deletePedidoController,
  });

  app.get(
    "/pedido/historico",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Lista historico dos pedidos",
        querystring: zFiltroPedido,
        response: {
          200: z.array(zPedidosResponse),
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
}
