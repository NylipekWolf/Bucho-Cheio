import { FastifyReply, FastifyRequest } from "fastify";
import { createPedido, filtroPedido, pedidoStatusRequest } from "../schemas/pedido-schema";
import { deletePedidoService, getPedidoService, postPedidoService, putPedidoService } from "../services/pedido.service";
import z from "zod";

export async function getPedidoController(
  request: FastifyRequest<{ Querystring: filtroPedido }>,
  reply: FastifyReply
) {
  const listaPedidos = await getPedidoService(request.query);

  try {
    // response 404 e 200
    if (listaPedidos.length === 0) {
      return reply.status(404).send("Nenhum pedido encontrado");
    } else {
      return reply.status(200).send(listaPedidos);
    }
  } catch (error) {
    //reponse 500
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postPedidoController(
  request: FastifyRequest<{ Body: createPedido }>,
  reply: FastifyReply
) {
  const pedidoCriado = await postPedidoService(request.body);

  try {
    if(pedidoCriado === null) {
      return reply.status(404).send("Erro de validação"); //Qual code usar
    } else {
      return reply.status(201).send(pedidoCriado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putPedidoController(
  request: FastifyRequest<{ Body: pedidoStatusRequest }>,
  reply: FastifyReply
) {
  const pedidoModificado = await putPedidoService(request.body);

  try {
    if(pedidoModificado === null) {
      return reply.status(404).send("Pedido não existe"); //Confirmar qual code usar
    } else {
      return reply.status(200).send(pedidoModificado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deletePedidoController(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  const pedidoDeletado = await deletePedidoService(request.body.id);

  try {
    if(pedidoDeletado) {
      return reply.status(204).send("Pedido removido com sucesso.");
    } else {
      return reply.status(404).send("Pedido não existe");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}