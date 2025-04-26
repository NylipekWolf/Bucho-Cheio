import { sql } from "../database";

export async function serviceGetComanda(id: number | undefined, status: string[] | undefined, mesa: number | undefined) {
    try{
        //Filtragem
        if (id) {
            const dados = await sql`SELECT * FROM bucho_cheio.comanda WHERE id=${id}`;
            return dados;
        } else if (mesa) {
            const dados = await sql`SELECT * FROM bucho_cheio.comanda WHERE id_mesa=${mesa}`;
            return dados;
        } else if(status) {
            const dados = await sql`SELECT * FROM bucho_cheio.comanda WHERE status=ANY(${status})`;
            return dados;
        } else {
            const dados = await sql`SELECT * FROM bucho_cheio.comanda`;
            return dados;
        }
    } catch (err) {
        // console.log(err);
        return [];
    }
}

export async function servicePostComanda(nome: string | undefined, pedido: number[], mesa: number | undefined) {
    //Testes if para nome e mesa
    //precisa fazer uma correção na tabela pois não existe espaço para pedidos
    //Como vamos lidar com id_usuario, é NOT NULL no pgsql
    try {
        const comandaCriada = await sql`INSERT INTO bucho_cheio.comanda(
            preco, status, id_usuario)
	        VALUES (0, 'Fechada', 1) returning *;`;
        // console.log(comandaCriada[0])
        return comandaCriada[0];
    } catch (err) {
        // console.log(err);
        return null;
    }
}

export async function servicePutComanda(id: number, pedidos: number[]) {
    try { //Precisa atualizar banco de dados para adicionar pedidos
        // const comandaModificada = await sql`UPDATE bucho_cheio.comanda
	    //     SET pedidos=${pedidos} WHERE id=${id} returning *`;
        const comandaModificada = await sql`SELECT * FROM bucho_cheio.comanda WHERE id=${id}`;
        return comandaModificada[0];
    } catch (err) { //Melhorar menssagens de erro para Bad Request
        // console.log(err);
        return null;
    }
}

export async function servicePutComandaStatus(id: number) {
    try {
        const comandaModificada = await sql`SELECT * FROM bucho_cheio.comanda WHERE id=${id}`;
        return comandaModificada[0];
    } catch (err) { //Melhorar menssagens de erro para Bad Request
        // console.log(err);
        return null;
    }
}

export async function serviceDeleteComanda(id: number) {
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