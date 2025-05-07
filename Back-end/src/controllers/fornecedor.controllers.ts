import { FastifyReply, FastifyRequest } from "fastify";
import {
  FornecedorFiltro,
  FornecedorCreate,
  FornecedorEndereco,
  FornecedorContatos,
} from "../schemas/fornecedor-schema";
import {
  getFornecedor,
  postFornecedor,
  putFornecedorEndereco,
  putFornecedorContatos,
} from "../services/fornecedor.service";

export async function getFornecedorController(
  request: FastifyRequest<{ Querystring: FornecedorFiltro }>,
  reply: FastifyReply
) {
  const listaFornecedor = await getFornecedor(request.query);
  try {
    return reply.status(200).send(listaFornecedor);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postFornecedorController(
  request: FastifyRequest<{ Body: FornecedorCreate }>,
  reply: FastifyReply
) {
  const fornecedorCriado = await postFornecedor(request.body);
  try {
    return reply.status(201).send(fornecedorCriado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putFornecedorEnderecoController(
  request: FastifyRequest<{ Body: FornecedorEndereco }>,
  reply: FastifyReply
) {
  const fornecedorModificado = await putFornecedorEndereco(request.body);

  try {
    return reply.status(201).send(fornecedorModificado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putFornecedorContatoController(
  request: FastifyRequest<{ Body: FornecedorContatos }>,
  reply: FastifyReply
) {
  const fornecedorModificado = await putFornecedorContatos(request.body);

  try {
    return reply.status(201).send(fornecedorModificado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}
