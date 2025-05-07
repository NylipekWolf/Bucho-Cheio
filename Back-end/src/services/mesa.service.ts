import { sql } from "../database";
import {
  RegistroCreateMesa,
  RegistroFiltroMesa,
  RegistroStatusMesa,
  RegistroUpdateMesa,
} from "../schemas/registro-mesa-schema";

export async function getMesaService(request: RegistroFiltroMesa) {
  try {
    const conditions: string[] = [];
    const values: any[] = [];
    if (request.id) {
      conditions.push(`id = $${values.length + 1}`);
      values.push(request.id);
    }
    if (request.quantidade_de_lugares) {
      conditions.push(`quantidade_de_lugares = $${values.length + 1}`);
      values.push(request.quantidade_de_lugares);
    }
    if (request.status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(request.status);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(` AND `)}`
      : ``;

    const query = `
      SELECT 
      id,
      status,
      quantidade_de_lugares
      FROM bucho_cheio.mesa
      ${whereClause}
       order by id ASC`;

    const dados = await sql.unsafe(query, values);

    return dados;
  } catch (erro) {
    console.error(erro);
    return [];
  }
}
export async function postMesaService(request: RegistroCreateMesa) {
  try {
    const params = {
      quantidade_de_lugares: request.quantidade_de_lugares,
      status: "Disponivel",
    };
    const dados =
      await sql`INSERT INTO bucho_cheio.mesa (quantidade_de_lugares, status)
      VALUES (${params.quantidade_de_lugares}, ${params.status})
      RETURNING *;`;

    const resposta = {
      id: dados[0].id,
      status: dados[0].status,
      quantidade_de_lugares: dados[0].quantidade_de_lugares,
    };
    return resposta;
  } catch (erro) {
    console.log(erro);
    return erro;
  }
}
export async function putMesaService(request: RegistroUpdateMesa) {
  try {
    const params = {
      quantidade_de_lugares: request.quantidade_de_lugares,
    };

    const dados = await sql`UPDATE bucho_cheio.mesa set ${sql(
      params,
      "quantidade_de_lugares"
    )}
      where id = ${request.id}
      RETURNING *;`;

    const resposta = {
      id: dados[0].id,
      status: dados[0].status,
      quantidade_de_lugares: dados[0].quantidade_de_lugares,
    };
    return resposta;
  } catch (erro) {
    console.log(erro);
    return erro;
  }
}
export async function statusMesaService(request: RegistroStatusMesa) {
  try {
    const script = `UPDATE bucho_cheio.mesa ${sql(request, "status")}
      where id = ${request.id}`;
    const dados = await sql`${script}`;
    return dados;
  } catch (erro) {
    console.log(erro);
    return erro;
  }
}

export async function deleteMesaService(id: number) {
  try {
    let script = `DELETE FROM bucho_cheio.mesa where id = ${id}`;
    const dados = await sql`${script}`;
    return dados;
  } catch (erro) {
    console.log(erro);
    return erro;
  }
}
