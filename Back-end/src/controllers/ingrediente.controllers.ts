import { FastifyReply, FastifyRequest } from "fastify";
import {
  createIngrediente,
  filtroIngrediente,
  ingredienteRequest,
} from "../schemas/ingrediente-schema";

export async function getIngredienteController(
  request: FastifyRequest<{ Querystring: filtroIngrediente }>,
  reply: FastifyReply
) {
  const query = request.query;

  try {
    if (query) {
      return reply.status(404).send("Nenhum ingrediente encontrado");
    } else {
      return reply.status(200).send(query);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postIngredienteController(
  request: FastifyRequest<{ Body: createIngrediente }>,
  reply: FastifyReply
) {
  const ingredienteCriado = request.body;

  try {
    if (ingredienteCriado === null) {
      return reply.status(404).send("Erro de validação");
    } else {
      return reply.status(201).send(ingredienteCriado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putIngredienteController(
  request: FastifyRequest<{ Body: ingredienteRequest }>,
  reply: FastifyReply
) {
  const ingredienteModificado = request.body;

  try {
    if (ingredienteModificado === null) {
      return reply.status(404).send("Ingrediente não existe");
    } else {
      return reply.status(200).send(ingredienteModificado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteIngredienteController(
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const ingredienteDeletado = request.body.id;

  try {
    if (ingredienteDeletado) {
      return reply.status(204).send("Ingrediente removido com sucesso.");
    } else {
      return reply.status(404).send("Ingrediente não existe");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}
