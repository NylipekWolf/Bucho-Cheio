import { sql } from "../database";

export async function serviceGetPedido(status: number[] | undefined, produto: number[] | undefined, data: string | undefined) {
    try{ //Implementar filtro
        const dados = await sql`SELECT * FROM bucho_cheio.pedido ORDER BY id ASC`;
        return dados;
    } catch (err) {
        // console.log(err);
        return [];
    }
}

export async function servicePostPedido(idProduto: number, idComanda: number) {
    try {
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
    try {//Implementar checagem se id existe
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