import { FastifyReply, FastifyRequest } from "fastify";
import { getUserService } from "../services/user-service";
import { idParamsSchemaType } from "../schemas/generico-schema";

export async function getUser(
  request: FastifyRequest<{ Params: idParamsSchemaType }>,
  reply: FastifyReply
) {
  try {
    const user = await getUserService(request.params.id);
    if (!user) return reply.status(400).send("Usuario não encontrado");
    return reply.send(user);
  } catch (error) {
    reply.status(404).send();
  }
}
