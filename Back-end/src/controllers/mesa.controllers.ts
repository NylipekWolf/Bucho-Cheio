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
  const id = request.query.id;
  const quantidade_de_lugares = request.query.quantidade_de_lugares;
  const status = request.query.status;
  let resultado!: MesaResponse[];
  try {
    if (!id && !quantidade_de_lugares && !status) {
      resultado = mesaMemory;
      return reply.status(200).send(resultado);
    }
    resultado = mesaMemory;
    return reply.status(200).send(resultado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postMesaController(
  request: FastifyRequest<{ Body: MesaCreate }>,
  reply: FastifyReply
) {
  const comandaCriada = request.body;
  console.log(comandaCriada);

  try {
    if (comandaCriada === null) {
      return reply.status(404).send("Erro de validação"); //Qual code usar
    } else {
      return reply.status(201).send(comandaCriada);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putMesaController(
  request: FastifyRequest<{ Body: MesaUpdate }>,
  reply: FastifyReply
) {
  console.log("entrou aqui");

  const mesaModificada = request.body;

  try {
    if (mesaModificada === null) {
      return reply.status(404).send("Comanda não existe");
    } else {
      console.log("entrou aqui ");

      return reply.status(200).send(mesaModificada);
    }
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
    if (mesaModificada === null) {
      return reply.status(404).send("Comanda não existe");
    } else {
      return reply.status(200).send(mesaModificada);
    }
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
