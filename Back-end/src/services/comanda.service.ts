import { sql } from "../database";
import {
  comandaCreate,
  comandaRequest,
  comandaStatusRequest,
  filtroComanda,
} from "../schemas/comanda-schema";

export async function getComandaService(filtro: filtroComanda) {
  //Filtragem
  const conditions: string[] = []; //Array de condições em formato para construção Query com Clausula Where
  const values: any[] = [];

  if (filtro.id) {
    conditions.push(`id = $${values.length + 1}`);
    values.push(filtro.id);
  }
  if (filtro.mesa) {
    conditions.push(`id_mesa = $${values.length + 1}`);
    values.push(filtro.mesa);
  }
  if (filtro.status) {
    conditions.push(`status = ANY($${values.length + 1})`);
    values.push(filtro.status);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const query = `
    SELECT *
    FROM bucho_cheio.comanda
    ${whereClause}`;

  try {
    //Função SQL.unsafe recebe (query, argumentos da query)
    const dados = await sql.unsafe(query, values);
    return dados;
  } catch (err) {
    // console.log(err);
    return [];
  }
}

export async function postComandaService(request: comandaCreate) {
  //Testes if para nome e mesa
  //precisa fazer uma correção na tabela pois não existe espaço para pedidos
  //Como vamos lidar com id_usuario, é NOT NULL no pgsql
  try {
    const comandaCriada = await sql`INSERT INTO bucho_cheio.comanda(
            preco, status, id_usuario)
	        VALUES (0, 'Aberta', 1) returning *;`;
    // console.log(comandaCriada[0])
    return comandaCriada[0];
  } catch (err) {
    // console.log(err);
    return null;
  }
}

export async function putComandaService(request: comandaRequest) {
  try {
    const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.comanda WHERE id=${request.id};`;
    if (testeId[0].count > 0) {
        const comandaModificada = await sql`UPDATE bucho_cheio.comanda 
            SET pedidos=${request.pedidos} WHERE id=${request.id} returning *`;
        return comandaModificada[0];
    } else {
        return null;
    }
    
  } catch (err) {
    //Melhorar menssagens de erro para Bad Request
    // console.log(err);
    return null;
  }
}

export async function putComandaStatusService(request: comandaStatusRequest) {
  try {
    const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.comanda WHERE id=${request.id};`;
    if (testeId[0].count > 0) {
      const comandaModificada = await sql`UPDATE bucho_cheio.comanda SET status=${request.status} WHERE id=${request.id} RETURNING *`;
      return comandaModificada[0];
    } else {
      return null;
    }
  } catch (err) {
    //Melhorar menssagens de erro para Bad Request
    // console.log(err);
    return null;
  }
}

export async function deleteComandaService(id: number) {
  try {
    const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.comanda WHERE id=${id};`; //Checagem se id existe
    if (testeId[0].count > 0) {
      const pedidoDeletado = await sql`DELETE FROM bucho_cheio.comanda WHERE id=${id};`;
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
