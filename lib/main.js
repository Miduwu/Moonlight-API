"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aux = exports.server = exports.Context = exports.Endpoint = void 0;
const tslib_1 = require("tslib");
const fastify_1 = tslib_1.__importDefault(require("fastify"));
const Auxiliar_1 = require("./classes/Auxiliar");
const server = (0, fastify_1.default)();
exports.server = server;
const aux = new Auxiliar_1.Auxiliar(server);
exports.aux = aux;
aux.setErrorHandlers();
aux.loadImages();
server.register(require("./routes/main"));
server.listen({
    host: "0.0.0.0",
    port: Number(process.env.PORT || "3000")
}).then(() => console.log("API online"));
var Endpoint_1 = require("./classes/Endpoint");
Object.defineProperty(exports, "Endpoint", { enumerable: true, get: function () { return Endpoint_1.Endpoint; } });
var Context_1 = require("./classes/Context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return Context_1.Context; } });
tslib_1.__exportStar(require("./classes/Frame"), exports);
