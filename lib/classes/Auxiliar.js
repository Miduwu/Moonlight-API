"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auxiliar = void 0;
const node_fs_1 = require("node:fs");
const canvas_1 = require("@napi-rs/canvas");
const Parser_1 = require("./Parser");
class Auxiliar {
    server;
    parser;
    images = {};
    constructor(server) {
        this.server = server;
        this.parser = new Parser_1.Parser(this);
    }
    get Essentials() {
        return Parser_1.StringEssentials;
    }
    noop(r = null) {
        return r;
    }
    STRING(options) {
        return { schema: "STRING", options };
    }
    NUMBER(options) {
        return { schema: "NUMBER", options };
    }
    BOOLEAN() {
        return { schema: "BOOLEAN" };
    }
    LITERAL(...literals) {
        return { schema: "LITERAL", options: literals };
    }
    async loadImages() {
        (0, node_fs_1.readdirSync)("./public/assets").forEach(async (f) => {
            let img = await (0, canvas_1.loadImage)(`./public/assets/${f}`);
            this.images[f.split(".")[0]] = img;
        });
    }
    getImage(name) {
        let v = this.images[name.split(".")[0]];
        if (!v)
            return null;
        else
            return v;
    }
    setErrorHandlers() {
        this.server.setErrorHandler((error, request, reply) => {
            console.log(error);
        });
    }
}
exports.Auxiliar = Auxiliar;
