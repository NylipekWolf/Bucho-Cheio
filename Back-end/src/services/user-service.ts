import { getUserById } from "../repositories/fornecedor-repository";

export async function getUserService(id: string) {
  const user = await getUserById(id);
  if (!user) throw new Error("Usuário não encontrado");
  return user;
}
