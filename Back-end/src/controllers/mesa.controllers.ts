import { FastifyReply, FastifyRequest } from "fastify";
import {
  MesaFiltro,
  MesaCreate,
  MesaUpdate,
  MesaStatus,
  MesaResponse,
} from "../schemas/mesa-schema";
import { mesaMemory } from "../memory/mesa-memory";

export async function getMesaController(
  request: FastifyRequest<{ Querystring: MesaFiltro }>,
  reply: FastifyReply
) {
  const query = request.query;
  let resultado: MesaResponse[];
  try {
    if (
      query.id == null &&
      query.quantidade_de_lugares == null &&
      query.status == null
    ) {
      resultado = mesaMemory.map((item) => {
        return {
          id: item.id,
          quantidade_de_lugares: item.quantidade_de_lugares,
          status: item.status,
        };
      });
      return reply.status(200).send(resultado);
    } else {
      resultado = mesaMemory
        .filter(
          (item) =>
            item.id == query.id ||
            item.quantidade_de_lugares == query.quantidade_de_lugares ||
            item.status == query.status
        )
        .map((item) => {
          return {
            id: item.id,
            quantidade_de_lugares: item.quantidade_de_lugares,
            status: item.status,
          };
        });
      return reply.status(200).send(resultado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postMesaController(
  request: FastifyRequest<{ Body: MesaCreate }>,
  reply: FastifyReply
) {
  const mesaCriada = request.body;

  try {
    const id = mesaMemory.length;
    mesaMemory.push({
      id: id,
      quantidade_de_lugares: mesaCriada.quantidade_de_lugares,
      status: "Disponivel",
    });
    return reply.status(201).send(mesaMemory[-1]);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putMesaController(
  request: FastifyRequest<{ Body: MesaUpdate }>,
  reply: FastifyReply
) {
  const mesaModificada = request.body;

  try {
    const itemAlterado = mesaMemory.filter(
      (item) => item.id == mesaModificada.id
    )[0];

    itemAlterado.quantidade_de_lugares = mesaModificada.quantidade_de_lugares;
    return reply.status(201).send(itemAlterado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function statusMesaController(
  request: FastifyRequest<{ Body: MesaStatus }>,
  reply: FastifyReply
) {
  const mesaModificada = request.body;

  try {
    const itemAlterado = mesaMemory.filter(
      (item) => item.id == mesaModificada.id
    )[0];

    itemAlterado.status = mesaModificada.status;
    return reply.status(201).send(itemAlterado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteMesaController(
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
