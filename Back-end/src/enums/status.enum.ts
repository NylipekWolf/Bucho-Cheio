import z from "zod";

export const status = z.enum(["Disponivel", "EmAndamento", "Finalizado"]);
export const statusMesa = z.enum(["Disponivel", "Indisponivel", "Limpando"]);
export const statusIngrediente = z.enum(["Fresco", "PraVencer", "Vencido"]);
export const statusPedido = z.enum([
  "Pendente",
  "Em preparo",
  "Pronto",
  "Entregue",
  "Cancelado",
]);
export const statusComanda = z.enum(["Aberta", "Fechada", "Cancelada"]);
