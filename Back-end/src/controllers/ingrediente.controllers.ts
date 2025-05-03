import { FastifyReply, FastifyRequest } from "fastify";
import { createIngrediente, filtroIngrediente, ingredienteRequest } from "../schemas/ingrediente-schema";
import { deleteIngredienteService, getIngredienteService, postIngredienteService, putIngredienteService } from "../services/ingrediente.service";

export async function getIngredienteController(
  request: FastifyRequest<{ Querystring: filtroIngrediente }>,
  reply: FastifyReply
) {
  const listaIngredientes = await getIngredienteService(request.query);

  try {
    // response 404 e 200
    if (listaIngredientes.length === 0) {
      return reply.status(404).send("Nenhum ingrediente encontrado");
    } else {
      return reply.status(200).send(listaIngredientes);
    }
  } catch (error) {
    //reponse 500
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postIngredienteController(
  request: FastifyRequest<{ Body: createIngrediente }>,
  reply: FastifyReply
) {
  const ingredienteCriado = await postIngredienteService(request.body);

  try {
    if(ingredienteCriado === null) {
      return reply.status(404).send("Erro de validação"); //Qual code usar
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
  const ingredienteModificado = await putIngredienteService(request.body);

  try {
    if(ingredienteModificado === null) {
      return reply.status(404).send("Ingrediente não existe"); //Confirmar qual code usar
    } else {
      return reply.status(200).send(ingredienteModificado);
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteIngredienteController(
  request: FastifyRequest<{ Body: {id: number} }>,
  reply: FastifyReply
) {
  const ingredienteDeletado = await deleteIngredienteService(request.body.id);

  try {
    if(ingredienteDeletado) {
      return reply.status(204).send("Ingrediente removido com sucesso.");
    } else {
      return reply.status(404).send("Ingrediente não existe");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}