import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastify from "fastify";
import { Auxiliar } from "./classes/Auxiliar";

const server = fastify().setValidatorCompiler(validatorCompiler).setSerializerCompiler(serializerCompiler)
const aux = new Auxiliar(server)

aux.setErrorHandlers()
aux.setSwagger()
aux.loadImages()

server.register(require("./routes/main"))

server.listen({
    host: "0.0.0.0",
    port: Number(process.env.PORT || "3000")
}).then(() => console.log("API online"))

export { Endpoint } from "./classes/Endpoint";
export { Context } from "./classes/Context";
export * from "./classes/Frame";
export { server, aux }