import { sql } from "../database";
import {
  FornecedorContatos,
  FornecedorCreate,
  FornecedorFiltro,
  FornecedorEndereco,
} from "../schemas/fornecedor-schema";

export async function getFornecedor(request: FornecedorFiltro) {
  try {
    const conditions: string[] = [];
    const values: any[] = [];
    if (request.id) {
      conditions.push(`id = $${values.length + 1}`);
      values.push(request.id);
    }
    if (request.email) {
      conditions.push(`fc.email ILIKE $${values.length + 1}`);
      values.push(`%${request.email}%`);
    }
    if (request.telefone) {
      conditions.push(`fc.telefone ILIKE $${values.length + 1}`);
      values.push(`%${request.telefone}%`);
    }
    if (request.nome) {
      conditions.push(`f.nome ILIKE $${values.length + 1}`);
      values.push(`%${request.nome}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(` AND `)}`
      : ``;

    const query = `
          SELECT 
          f.id as id,
          f.nome as nome,
          COALESCE(fc.email, '') as email,
          COALESCE(fc.telefone, '') as telefone,
          CONCAT(fe.logradouro,' ',fe.numero,' ',COALESCE(fe.complemento, '')) as endereco
          FROM bucho_cheio.fornecedor f
          LEFT JOIN bucho_cheio.fornecedor_contato fc ON fc.fornecedor_id = f.id
          JOIN bucho_cheio.fornecedor_endereco fe ON fe.id = f.endereco_id
          ${whereClause}
          `;

    const dados = await sql.unsafe(query, values);
    return dados;
  } catch (erro) {
    console.error(erro);
    return [];
  }
}
export async function postFornecedor(request: FornecedorCreate) {
  try {
    const fornecedor_endereco =
      await sql`INSERT INTO bucho_cheio.fornecedor_endereco(cep,logradouro,complemento,numero)
      VALUES(${request.endereco.cep},${request.endereco.logradouro},${
        request.endereco.complemento ?? ""
      },${request.endereco.numero}) RETURNING id`;

    console.log(fornecedor_endereco);

    const fornecedor =
      await sql`INSERT INTO bucho_cheio.fornecedor(nome,endereco_id)
    VALUES(${request.nome}, ${fornecedor_endereco[0].id}) RETURNING id`;
    console.log(fornecedor);

    request.contatos.forEach(async (contato) => {
      await sql`INSERT INTO bucho_cheio.fornecedor_contato(telefone, email, fornecedor_id,nome,principal)
        VALUES(${contato.telefone},${contato.email},${fornecedor[0].id},${contato.nome},${contato.principal})`;
    });

    const resposta = await sql`SELECT 
          f.id as id,
          f.nome as nome,
          COALESCE(fc.email, '') as email,
          COALESCE(fc.telefone, '') as telefone,
          CONCAT(fe.logradouro,' ',fe.numero,' ',COALESCE(fe.complemento, '')) as endereco
          FROM bucho_cheio.fornecedor f
          LEFT JOIN bucho_cheio.fornecedor_contato fc ON fc.fornecedor_id = f.id
          JOIN bucho_cheio.fornecedor_endereco fe ON fe.id = f.endereco_id
          WHERE f.id = ${fornecedor[0].id}`;

    return resposta[0];
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export async function putFornecedorEndereco(request: FornecedorEndereco) {
  try {
    const resposta = await sql`UPDATE bucho_cheio.fornecedor_endereco set ${sql(
      request.endereco
    )} WHERE id = ${request.endereco.id} RETURNING *`;
    return resposta[0];
  } catch (erro) {
    console.log(erro);
  }
}

export async function putFornecedorContatos(request: FornecedorContatos) {
  try {
    await sql`DELETE FROM bucho_cheio.fornecedor_contato WHERE fornecedor_id = ${request.id}`;
    request.contatos.forEach(async (contato) => {
      await sql`INSERT INTO bucho_cheio.fornecedor_contato(telefone, email, fornecedor_id,nome,principal)
          VALUES(${contato.telefone},${contato.email},${request.id},${contato.nome},${contato.principal})`;
    });
    const resposta =
      await sql`Select id, nome, email, telefone, principal from bucho_cheio.fornecedor_contato WHERE fornecedor_id = ${request.id}`;
    console.log(resposta);

    return resposta;
  } catch (erro) {
    console.log(erro);
  }
}
