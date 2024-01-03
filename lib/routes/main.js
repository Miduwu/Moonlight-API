"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importStar(require("node:fs"));
const node_path_1 = require("node:path");
const Context_1 = require("../classes/Context");
const main_1 = require("../main");
exports.default = (fastify, ops, done) => {
    node_fs_1.default.readdirSync("./lib/routes").forEach(folder => {
        if (!(0, node_fs_1.lstatSync)((0, node_path_1.join)(process.cwd(), "lib", "routes", folder)).isDirectory())
            return;
        node_fs_1.default.readdirSync(`./lib/routes/${folder}`).forEach(file => {
            const CLS = require((0, node_path_1.join)(process.cwd(), `/lib/routes/${folder}/${file}`))?.Route;
            if (!CLS)
                return;
            const route = new CLS().assign();
            fastify.route({
                url: route.options.path,
                method: route.options.method,
                schema: route.options.schema,
                handler: async (req, res) => await route.handler(new Context_1.Context(req, res)),
                preHandler: async (req, res, donePre) => {
                    if (route.options?.query) {
                        for (const key of Object.keys(route.options.query)) {
                            let v = req.query[key];
                            const options = route.options.query[key];
                            if (!v && options.required)
                                throw new Error(`Missing query parameter "${key}"`);
                            if (!v && options.default)
                                v = options.default;
                            let parsed;
                            if (options.type.schema == "NUMBER")
                                parsed = main_1.aux.parser.NUMBER(key, v, options.type.options);
                            else if (options.type.schema == "BOOLEAN")
                                parsed = main_1.aux.parser.BOOLEAN(key, v);
                            else if (options.type.schema == "LITERAL")
                                parsed = main_1.aux.parser.LITERAL(key, v, ...options.type.options);
                            else
                                parsed = main_1.aux.parser.STRING(key, v, options.type.options);
                            req.query[key] = parsed;
                        }
                    }
                    donePre();
                }
            });
        });
    });
    done();
};
