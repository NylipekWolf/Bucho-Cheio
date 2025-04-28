import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routesMesa, zodMesa } from "./routes/mesa.routes";
import { createMesa, mesaResponse } from "./schemas/mesa-schema";
import { routesIngrediente } from "./routes/ingrediente.routes";
import { routesFornecedor } from "./routes/fornecedor.routes";
import { routesPedido } from "./routes/pedido.routes";
import { routesComanda } from "./routes/comanda.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*", methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']});
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Bucho cheio API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.addSchema({ $id: "MesaResponse", ...zodMesa });
app.addSchema({ $id: "CreateMesa", ...createMesa });

app.register(routesMesa);
app.register(routesIngrediente);
// app.register(routesFornecedor);
app.register(routesPedido);
app.register(routesComanda);

const start = async () => {
  await app.listen({ port: 3000 });
  console.log("API rodando em http://localhost:3000");
  console.log("Documentação: http://localhost:3000/docs");
};
start();