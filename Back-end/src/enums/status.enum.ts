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