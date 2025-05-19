import { FastifyReply, FastifyRequest } from "fastify";
import {
  comandaCreate,
  comandaRequest,
  comandaStatusRequest,
  filtroComanda,
  comandaResponse,
} from "../schemas/comanda-schema";
import z from "zod";

import { ComandaMemory } from "../memory/comanda-memory";

export async function getComandaController(
  request: FastifyRequest<{ Querystring: filtroComanda }>,
  reply: FastifyReply
) {
  const query = request.query;
  let resultado: comandaResponse[];

  try {
    if (!query.id && !query.mesa && !query.status) {
      resultado = ComandaMemory.map((item) => {
        return {
          id: item.id,
          status: item.status,
          nome: item.nome,
          preco: item.preco,
          pedidos: item.pedidos,
          id_mesa: item.id_mesa,
        };
      });
      return reply.status(200).send(resultado);
    }
    resultado = ComandaMemory.filter(
      (item) =>
        item.id == query.id ||
        item.id_mesa == query.mesa ||
        item.status.includes(query.status)
    ).map((item) => {
      return {
        id: item.id,
        status: item.status,
        nome: item.nome,
        preco: item.preco,
        pedidos: item.pedidos,
        id_mesa: item.id_mesa,
      };
    });
    return reply.status(200).send(resultado);
  } catch (error) {
    //reponse 500
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postComandaController(
  request: FastifyRequest<{ Body: comandaCreate }>,
  reply: FastifyReply
) {
  const comandaCriada = request.body;

  try {
    const id = ComandaMemory.length;
    ComandaMemory.push({
      ...comandaCriada,
      id: id,
      status: "Aberta",
      preco: 0,
    });
    return reply.status(201).send(comandaCriada);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putComandaController(
  request: FastifyRequest<{ Body: comandaRequest }>,
  reply: FastifyReply
) {
  const comandaModificada = request.body;

  try {
    const itemAlterado = ComandaMemory.filter(
      (item) => item.id == comandaModificada.id
    )[0];

    if (itemAlterado.pedidos == null) {
      itemAlterado.pedidos = comandaModificada.pedidos;
    } else {
      itemAlterado.pedidos.push(...comandaModificada.pedidos);
    }

    return reply.status(201).send(itemAlterado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putComandaStatusController(
  request: FastifyRequest<{ Body: comandaStatusRequest }>,
  reply: FastifyReply
) {
  const comandaModificada = request.body;

  try {
    const itemAlterado = ComandaMemory.filter(
      (item) => item.id == comandaModificada.id
    )[0];

    itemAlterado.status = comandaModificada.status;

    return reply.status(201).send(itemAlterado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteComandaController(
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const comandaDeletada = request.body.id;

  try {
    //Método delete

    return reply.status(204).send("Comanda removida com sucesso.");
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}
