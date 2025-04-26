import { sql } from "../database";

export async function serviceGetPedido(status: string[] | undefined, produto: number[] | undefined, data: string | undefined) {
    //Filtragem
    const conditions: string[] = []; //Array de condições em formato para construção Query com Clausula Where
    const values: any[] = []; //Array de valores para ser usado Query

    //Testa se as opções de filtro existem e da push nos arrays
    if (status) {
        conditions.push(`status = ANY($${values.length + 1})`);
        values.push(status);
    }
    if (produto) {
        conditions.push(`id_produto = ANY($${values.length + 1})`);
        values.push(produto);
    }
    if (typeof data === 'string' && data.trim() !== '') {
        conditions.push(`DATE(data_hora) = DATE($${values.length + 1})`);
        values.push(data);
    }

    //Claúsula WHERE - Se não tiver consições, omitimos por completo, senão montamos com a Array de condições
    const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

    //Monta o Query a ser usado com a clausula WHERE
    const query = `
    SELECT *
    FROM bucho_cheio.pedido
    ${whereClause}`;

    try{
        //Função SQL.unsafe recebe (query, argumentos da query)
        const dados = await sql.unsafe(query, values)
        dados.forEach((item) => {item.data_hora = item.data_hora.toISOString()})
        return dados;
    } catch (err) {
        // console.log(err);
        return [];
    }
}

export async function servicePostPedido(idProduto: number, idComanda: number) {
    try {
        //Revisar manipulação de DateTime
        const data = new Date();
        const gmt3 = new Date(data.getTime() - 3 * 60 * 60 * 1000).toISOString();
        const pedidoCriado = await sql`INSERT INTO bucho_cheio.pedido(id_produto, id_comanda, status, data_hora)
        VALUES (${idProduto}, ${idComanda}, 'Pendente', ${gmt3}) returning *;`;
        return pedidoCriado[0];
    } catch (err) {
        // console.log(err);
        return null;
    }
    
}

export async function servicePutPedido(id: number, status: string) {
    try {
        const pedidoModificado = await sql`UPDATE bucho_cheio.pedido
	        SET status=${status} WHERE id=${id} returning *`;
        return pedidoModificado[0];
    } catch (err) { //Melhorar menssagens de erro para Bad Request
        // console.log(err);
        return null;
    }
}

export async function serviceDeletePedido(id: number) {
    try {
        const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.pedido WHERE id=${id};`; //Checagem se id existe
        if (testeId[0].count > 0) {
            const pedidoDeletado = await sql`DELETE FROM bucho_cheio.pedido WHERE id=${id};`;
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}