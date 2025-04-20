import { FastifyReply, FastifyRequest } from "fastify";
import { createPedidoBody, createPedidos, filtroPedido, filtroPedidoQuery, pedidoStatusRequest, putPedidoBody } from "../schemas/pedido-schema";
import { serviceDeletePedido, serviceGetPedido, servicePostPedido, servicePutPedido } from "../services/pedido.service";
import z from "zod";

export async function controllerGetPedido(
  request: FastifyRequest<{ Querystring: filtroPedidoQuery }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { status, produto, data } = filtroPedido.parse(request.query);
  const listaPedidos = await serviceGetPedido(status, produto, data);

  //Response 401 - Se tiver
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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

export async function controllerPostPedido(
  request: FastifyRequest<{ Body: createPedidoBody }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { idProduto, idComanda } = createPedidos.parse(request.body);
  const pedidoCriado = await servicePostPedido(idProduto, idComanda);

  //Response 401
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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

export async function controllerPutPedido(
  request: FastifyRequest<{ Body: putPedidoBody }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id, status } = pedidoStatusRequest.parse(request.body);
  const pedidoModificado = await servicePutPedido(id, status);

  //Response 401
  // if(!hasPermission){
  //   return reply.status(401).send("Não autorizado");
  // }

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

export async function controllerDeletePedido(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  //const hasPermission = await checkUserPermission();
  const { id } = z.object({id: z.number().positive()}).parse(request.body);
  const pedidoDeletado = await serviceDeletePedido(id);

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