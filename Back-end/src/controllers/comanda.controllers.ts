import { FastifyReply, FastifyRequest } from "fastify";
import { comandaCreate, comandaRequest, createComandaBody, filtroComanda, filtroComandaQuery, pedidoComandaBody } from "../schemas/comanda-schema";
import { serviceDeleteComanda, serviceGetComanda, servicePostComanda, servicePutComanda, servicePutComandaStatus } from "../services/comanda.service";
import z from "zod";

export async function controllerGetComanda(
  request: FastifyRequest<{ Querystring: filtroComandaQuery }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id, status, mesa } = filtroComanda.parse(request.query);
  const listaComandas = await serviceGetComanda(id, status, mesa);

  //Response 401 - Se tiver
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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

export async function controllerPostComanda(
  request: FastifyRequest<{ Body: createComandaBody }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { nome, pedido, mesa } = comandaCreate.parse(request.body);
  const comandaCriada = await servicePostComanda(nome, pedido, mesa);

  //Response 401
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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

export async function controllerPutComanda(
  request: FastifyRequest<{ Body: pedidoComandaBody }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id, pedidos } = comandaRequest.parse(request.body);
  const comandaModificada = await servicePutComanda(id, pedidos);

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

export async function controllerPutComandaStatus(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id } = z.object({id: z.number().positive()}).parse(request.body);
  const comandaModificada = await servicePutComandaStatus(id);

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

export async function controllerDeleteComanda(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id } = z.object({id: z.number().positive()}).parse(request.body);
  const pedidoDeletado = await serviceDeleteComanda(id);

  //Response 401
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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