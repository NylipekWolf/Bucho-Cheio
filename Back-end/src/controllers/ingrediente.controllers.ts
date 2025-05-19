import { FastifyReply, FastifyRequest } from "fastify";
import {
  createIngrediente,
  filtroIngrediente,
  ingredienteRequest,
  ingredienteResponse
} from "../schemas/ingrediente-schema";
import { ingredienteMemory } from "../memory/ingrediente-memory";

export async function getIngredienteController(
  request: FastifyRequest<{ Querystring: filtroIngrediente }>,
  reply: FastifyReply
) {
  const query = request.query;
  let resultado: ingredienteResponse[];

  try {
  if (query.id == null && query.nome == null && query.vencimento == null && query.fornecedor == null) {
        resultado = ingredienteMemory.map((item) => {
          return {
            id: item.id,
            nome: item.nome,
            vencimento: item.vencimento,
            fornecedor: item.fornecedor,
            quantidade: item.quantidade,
            preco: item.preco,
          };
        });
        return reply.status(200).send(resultado);
      } else {
        resultado = ingredienteMemory.filter(
          (item) =>
            item.id == query.id ||
            item.nome == query.nome ||
            item.vencimento == query.vencimento ||
            item.fornecedor == query.fornecedor
        ).map((item) => {
          return {
            id: item.id,
            nome: item.nome,
            vencimento: item.vencimento,
            fornecedor: item.fornecedor,
            quantidade: item.quantidade,
            preco: item.preco,
          };
        });
        return reply.status(200).send(resultado);
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
      const id = ingredienteMemory.length;
      ingredienteMemory.push({
        ...ingredienteCriado,
        id: id,
      });
      return reply.status(201).send(ingredienteMemory[-1]);
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
      const itemAlterado = ingredienteMemory.filter(
        (item) => item.id == ingredienteModificado.id
      )[0];
  
      
      itemAlterado.quantidade = ingredienteModificado.quantidade;
  
      return reply.status(201).send(itemAlterado);
    } catch (error) {
      return reply.status(500).send("Erro no servidor.");
    }
}

export async function deleteIngredienteController(
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const ingredienteDeletado = ingredienteMemory.find((item) => item.id == request.body.id)

    try {
      if (ingredienteDeletado != undefined) {
        ingredienteMemory.splice(ingredienteMemory.indexOf(ingredienteDeletado), 1);
        return reply.status(204).send("Comanda removida com sucesso.");
      }
      return reply.status(404).send("Comanda não existe");
    } catch (error) {
      return reply.status(500).send("Erro no servidor.");
    }
}
