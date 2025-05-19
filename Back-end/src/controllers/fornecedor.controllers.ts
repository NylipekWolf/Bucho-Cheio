import { FastifyReply, FastifyRequest } from "fastify";
import {
  FornecedorFiltro,
  FornecedorEndereco,
  FornecedorContatos,
  FornecedorCreate,
  FornecedorResponse,
} from "../schemas/fornecedor-schema";
import { fornecedorMemory } from "../memory/fornecedor-memory";
import { log } from "console";

export async function getFornecedorController(
  request: FastifyRequest<{ Querystring: FornecedorFiltro }>,
  reply: FastifyReply
) {
  const nome = request.query.nome;
  const id = request.query.id;
  const email = request.query.email;
  const telefone = request.query.telefone;
  let resultado!: FornecedorResponse[];
  try {
    if (nome == null && id == null && email == null && telefone == null) {
      resultado = fornecedorMemory.map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          telefone: item.contato.telefone,
          email: item.contato.email,
          endereco: `${item.endereco.logradouro} n${item.endereco.numero}`,
        };
      });
      return reply.status(200).send(resultado);
    }
    resultado = fornecedorMemory
      .filter(
        (item) =>
          item.id == id ||
          item.contato.telefone.includes(telefone as string) ||
          item.contato.email.includes(email as string) ||
          item.nome.includes(nome as string)
      )
      .map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          telefone: item.contato.telefone,
          email: item.contato.email,
          endereco: `${item.endereco.logradouro} n${item.endereco.numero}`,
        };
      });
    return reply.status(200).send(resultado);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function postFornecedorController(
  request: FastifyRequest<{ Body: FornecedorCreate }>,
  reply: FastifyReply
) {
  const fornecedorCriado = request.body;
  try {
    const ultimoId = fornecedorMemory.length;
    fornecedorMemory.push({ ...fornecedorCriado, id: ultimoId });
    return reply.status(201).send(fornecedorMemory[-1]);
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putFornecedorEnderecoController(
  request: FastifyRequest<{ Body: FornecedorEndereco }>,
  reply: FastifyReply
) {
  const fornecedorModificado = request.body;

  try {
    const itemAlterado: FornecedorEndereco = fornecedorMemory.filter(
      (item) => item.id == fornecedorModificado.id
    )[0];
    if (itemAlterado) {
      itemAlterado.endereco.cep = fornecedorModificado.endereco.cep;
      itemAlterado.endereco.complemento =
        fornecedorModificado.endereco.complemento;
      itemAlterado.endereco.logradouro =
        fornecedorModificado.endereco.logradouro;
      itemAlterado.endereco.numero = fornecedorModificado.endereco.numero;
      return reply.status(201).send(itemAlterado.endereco);
    } else {
      return reply.status(404).send("Nenhum item encontrado com esse id");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function putFornecedorContatoController(
  request: FastifyRequest<{ Body: FornecedorContatos }>,
  reply: FastifyReply
) {
  const fornecedorModificado = request.body;

  try {
    const itemAlterado: FornecedorContatos = fornecedorMemory.filter(
      (item) => item.id == fornecedorModificado.id
    )[0];
    if (itemAlterado) {
      itemAlterado.contato.email = fornecedorModificado.contato.email;
      itemAlterado.contato.telefone = fornecedorModificado.contato.telefone;
      itemAlterado.contato.nome = fornecedorModificado.contato.nome;
      itemAlterado.contato.principal = fornecedorModificado.contato.principal;
      return reply.status(201).send(itemAlterado.contato);
    } else {
      return reply.status(404).send("Nenhum item encontrado com esse id");
    }
  } catch (error) {
    return reply.status(500).send("Erro no servidor.");
  }
}

export async function deleteFornecedorController (
  request: FastifyRequest<{ Body: { id: number } }>,
  reply: FastifyReply
) {
  const fornecedorDeletado = fornecedorMemory.find((item) => item.id == request.body.id)
    try {
      if (fornecedorDeletado != undefined) {
        fornecedorMemory.splice(fornecedorMemory.indexOf(fornecedorDeletado), 1);
        return reply.status(204).send("Comanda removida com sucesso.");
      }
      return reply.status(404).send("Comanda não existe");
    } catch (error) {
      return reply.status(500).send("Erro no servidor.");
    }
}