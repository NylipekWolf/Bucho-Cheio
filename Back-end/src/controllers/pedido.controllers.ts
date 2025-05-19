import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPedido,
  filtroPedido,
  pedidosResponse,
  pedidoStatusRequest,
} from "../schemas/pedido-schema";
import { pedidoMemory } from "../memory/pedido-memory";

export async function getPedidoController(
  request: FastifyRequest<{ Querystring: filtroPedido }>,
  reply: FastifyReply
) {
  const query = request.query;
  let resultado: pedidosResponse[];
  try {
    if (
      query.id == null &&
      query.status == null &&
      query.produto == null &&
      query.data == null
    ) {
      resultado = pedidoMemory.map((item) => {
        return {
          id: item.id,
          status: item.status,
          id_produto: item.id_produto,
          id_comanda: item.id_comanda,
          data_hora: item.data_hora,
        };
      });
      return reply.status(200).send(resultado);
    } else {
      resultado = pedidoMemory
        .filter(
          (item) =>
            item.id == query.id ||
            item.status == query.status ||
            item.id_produto == query.produto ||
            item.data_hora == query.data
        )
        .map((item) => {
          return {
            id: item.id,
            status: item.status,
            id_produto: item.id_produto,
            id_comanda: item.id_comanda,
            data_hora: item.data_hora,
          };
        });
      return reply.status(200).send(resultado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postPedidoController(
  request: FastifyRequest<{ Body: createPedido }>,
  reply: FastifyReply
) {
  const pedidoCriado = request.body;

  try {
    const id = pedidoMemory.length;
    pedidoMemory.push({
      id: id,
      id_produto: pedidoCriado.idProduto,
      id_comanda: pedidoCriado.idComanda,
      status: "Pendente",
      data_hora: pedidoCriado.data_hora,
    });
    return reply.status(201).send(pedidoMemory[-1]);
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
    const itemAlterado = pedidoMemory.filter(
      (item) => item.id == pedidoModificado.id
    )[0];

    itemAlterado.status = pedidoModificado.status;

    return reply.status(201).send(itemAlterado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deletePedidoController(
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const pedidoDeletado = pedidoMemory.find((item) => item.id == request.body.id)
    try {
      if (pedidoDeletado != undefined) {
        pedidoMemory.splice(pedidoMemory.indexOf(pedidoDeletado), 1);
        return reply.status(204).send("Comanda removida com sucesso.");
      }
      return reply.status(404).send("Comanda não existe");
    } catch (error) {
      return reply.status(500).send("Erro no servidor.");
    }
}
