import { sql } from "../database";
import { createIngrediente, filtroIngrediente, ingredienteRequest } from "../schemas/ingrediente-schema";

export async function getIngredienteService(request: filtroIngrediente) {
    //Filtragem
    const conditions: string[] = []; //Array de condições em formato para construção Query com Clausula Where
    const values: any[] = []; //Array de valores para ser usado Query

    //Testa se as opções de filtro existem e da push nos arrays
    if (request.nome) {
        conditions.push(`nome = $${values.length + 1}`);
        values.push(request.nome);
    }
    if (request.vencimento) {
        conditions.push(`DATE(vencimento) = DATE($${values.length + 1})`);
        values.push(request.vencimento);
    }
    if (request.fornecedor) {
        conditions.push(`fornecedor = $${values.length + 1}`);
        values.push(request.fornecedor);
    }

    //Claúsula WHERE - Se não tiver consições, omitimos por completo, senão montamos com a Array de condições
    const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

    //Monta o Query a ser usado com a clausula WHERE
    const query = `
    SELECT *
    FROM bucho_cheio.ingrediente
    ${whereClause}`;

    try{
        //Função SQL.unsafe recebe (query, argumentos da query)
        const dados = await sql.unsafe(query, values)
        dados.forEach((item) => {item.vencimento = item.vencimento.toISOString().slice(0, 10)}) //Tranforma as datas de vencimento para o padrão "YYYY-MM-DD"
        return dados;
    } catch (err) {
        console.log(err)
        return [];
    }
}

export async function postIngredienteService(request: createIngrediente) {
    try {
        const ingredienteCriado = await sql`INSERT INTO bucho_cheio.ingrediente(nome, quantidade, vencimento, fornecedor, preco)
        VALUES (${request.nome}, ${request.quantidade}, ${request.vencimento}, ${request.fornecedor}, ${request.preco}) RETURNING *;`;
        
        ingredienteCriado[0].vencimento = ingredienteCriado[0].vencimento.toISOString().slice(0, 10);

        return ingredienteCriado[0];
    } catch (err) {
        // console.log(err);
        return null;
    }
    
}

export async function putIngredienteService(request: ingredienteRequest) {
    try {
        const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.pedido WHERE id=${request.id};`; //Checagem se id existe
        if (testeId[0].count > 0) {
            const ingredienteModificado = await sql`UPDATE bucho_cheio.ingrediente
                SET quantidade=${request.quantidade} WHERE id=${request.id} returning *`;

            ingredienteModificado[0].vencimento = ingredienteModificado[0].vencimento.toISOString().slice(0, 10);

            return ingredienteModificado[0];
        } else {
            return null;
        }
    } catch (err) { //Melhorar menssagens de erro para Bad Request
        // console.log(err);
        return null;
    }
}

export async function deleteIngredienteService(id: number) {
    try {
        const testeId = await sql`SELECT COUNT(*) FROM bucho_cheio.ingrediente WHERE id=${id};`; //Checagem se id existe
        if (testeId[0].count > 0) {
            const ingredienteDeletado = await sql`DELETE FROM bucho_cheio.ingrediente WHERE id=${id};`;
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}