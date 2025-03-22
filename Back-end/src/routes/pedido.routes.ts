import {
  createPedidos,
  filtroPedido,
  pedidosResponse,
  pedidoStatusRequest,
} from "../schemas/pedido-schema";
import { FastifyTypeInstance } from "../types";
import { tags } from "../utils/tags";
import z from "zod";

export async function routesPedido(app: FastifyTypeInstance) {
  app.get(
    "/pedido",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Lista os pedidos",
        querystring: filtroPedido,
        response: {
          200: z.array(pedidosResponse),
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

  app.post(
    "/pedido",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Cria um novo pedido",
        body: createPedidos,
        response: {
          201: pedidosResponse,
          401: z.string(),
          404: z.string(),
          500: z.string(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send();
    }
  );

  app.put(
    "/pedido",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Atualiza o status do pedido",
        body: pedidoStatusRequest,
        response: {
          200: pedidosResponse,
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

  app.delete(
    "/pedido",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Deleta um item de pedidos atraves do Id",
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
    },
    async (request, reply) => {
      return reply.status(204).send("Pedido removido com sucesso.");
    }
  );

  app.get(
    "/pedido/historico",
    {
      schema: {
        tags: [tags.PEDIDO],
        description: "Lista historico dos pedidos",
        querystring: filtroPedido,
        response: {
          200: z.array(pedidosResponse),
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
