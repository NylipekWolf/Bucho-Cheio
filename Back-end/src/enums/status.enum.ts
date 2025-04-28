import z from "zod";

export enum status{
    Disponivel,
    EmAndamento,
    Finalizado
} 
export enum statusMesa{
    Disponivel,
    Indisponivel,
    Limpando
}
export enum statusIngrediente{
    Fresco,
    PraVencer,
    Vencido
 }

export const statusPedido = z.enum([
    'Pendente',
    'Em preparo',
    'Pronto',
    'Entregue',
    'Cancelado'
]);

export const statusComanda = z.enum([
    'Aberta',
    'Fechada', 
    'Cancelada'
]);