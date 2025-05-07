import { FastifyReply, FastifyRequest } from "fastify";
import {
  RegistroFiltroMesa,
  RegistroCreateMesa,
  RegistroUpdateMesa,
  RegistroStatusMesa,
} from "../schemas/registro-mesa-schema";
import {
  getMesaService,
  postMesaService,
  putMesaService,
  deleteMesaService,
  statusMesaService,
} from "../services/mesa.service";

export async function getMesaController(
  request: FastifyRequest<{ Querystring: RegistroFiltroMesa }>,
  reply: FastifyReply
) {
  const listaMesa = await getMesaService(request.query);
  try {
    return reply.status(200).send(listaMesa);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postMesaController(
  request: FastifyRequest<{ Body: RegistroCreateMesa }>,
  reply: FastifyReply
) {
  const comandaCriada = await postMesaService(request.body);
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
  request: FastifyRequest<{ Body: RegistroUpdateMesa }>,
  reply: FastifyReply
) {
  console.log("entrou aqui");

  const mesaModificada = await putMesaService(request.body);

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
  request: FastifyRequest<{ Body: RegistroStatusMesa }>,
  reply: FastifyReply
) {
  const mesaModificada = await statusMesaService(request.body);

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
  const pedidoDeletado = await deleteMesaService(request.body.id);

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
