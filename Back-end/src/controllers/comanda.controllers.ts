import { FastifyReply, FastifyRequest } from "fastify";
import { comandaCreate, comandaRequest, filtroComanda, zFiltroComanda } from "../schemas/comanda-schema";
import { deleteComandaService, getComandaService, postComandaService, putComandaService, putComandaStatusService} from "../services/comanda.service";
import z from "zod";

export async function getComandaController(
  request: FastifyRequest<{ Querystring: filtroComanda }>,
  reply: FastifyReply
) {
  const listaComandas = await getComandaService(request.query);

  try {
    // response 404 e 200
    if (listaComandas.length === 0) {
      return reply.status(404).send("Nenhum pedido encontrado");
    } else {
      return reply.status(200).send(listaComandas);
    }
  } catch (error) {
    //reponse 500
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postComandaController(
  request: FastifyRequest<{ Body: comandaCreate }>,
  reply: FastifyReply
) {
  const comandaCriada = await postComandaService(request.body);

  try {
    if(comandaCriada === null) {
      return reply.status(404).send("Erro de validação"); //Qual code usar
    } else {
      return reply.status(201).send(comandaCriada);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putComandaController(
  request: FastifyRequest<{ Body: comandaRequest }>,
  reply: FastifyReply
) {
  const comandaModificada = await putComandaService(request.body);

  //Response 401
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

  try {
    if(comandaModificada === null) {
      return reply.status(404).send("Pedido não existe"); //Qual code usar
    } else {
      return reply.status(200).send(comandaModificada);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putComandaStatusController(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  const comandaModificada = await putComandaStatusService(request.body.id);

  try {
    if(comandaModificada === null) {
      return reply.status(404).send("Pedido não existe"); //Qual code usar
    } else {
      return reply.status(200).send(comandaModificada);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteComandaController(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  const pedidoDeletado = await deleteComandaService(request.body.id);

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