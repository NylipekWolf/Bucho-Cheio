import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPedido,
  filtroPedido,
  pedidoStatusRequest,
} from "../schemas/pedido-schema";


export async function getPedidoController(
  request: FastifyRequest<{ Querystring: filtroPedido }>,
  reply: FastifyReply
) {
  const query = request.query;

  try {
  } catch (error) {}
}

export async function postPedidoController(
  request: FastifyRequest<{ Body: createPedido }>,
  reply: FastifyReply
) {
  const pedidoCriado = request.body;

  try {
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putPedidoController(
  request: FastifyRequest<{ Body: pedidoStatusRequest }>,
  reply: FastifyReply
) {
  const pedidoModificado = request.body;

  try {
    if (pedidoModificado === null) {
      return reply.status(404).send("Pedido não existe");
    } else {
      return reply.status(200).send(pedidoModificado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deletePedidoController(
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const pedidoDeletado = request.body.id;

  try {
    if (pedidoDeletado) {
      return reply.status(204).send("Pedido removido com sucesso.");
    } else {
      return reply.status(404).send("Pedido não existe");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}
