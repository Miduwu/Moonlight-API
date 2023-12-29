import * as F from "fastify";
import { readdirSync } from "node:fs";
import { Image, loadImage } from "@napi-rs/canvas";
import { ParamOptions, TYPES } from "./Endpoint";
import { NumberOptions, Parser, StringOptions, StringEssentials } from "./Parser";

export type T = F.FastifyInstance
export type ImageCollection = Record<string, Image>

export class Auxiliar {
    server: T
    parser: Parser
    images: ImageCollection = {};
    constructor(server: T) {
        this.server = server
        this.parser = new Parser(this)
    }

    get Essentials() {
        return StringEssentials
    }

    noop(r: any = null) {
        return r
    }

    STRING(options?: StringOptions): ParamOptions {
        return { schema: "STRING", options }
    }

    NUMBER(options?: NumberOptions): ParamOptions {
        return { schema: "NUMBER", options }
    }

    BOOLEAN(): ParamOptions {
        return { schema: "BOOLEAN" }
    }

    LITERAL(...literals: string[] | number[]) {
        return { schema: "LITERAL" as TYPES, options: literals }
    }

    async loadImages() {
        readdirSync("./public/assets").forEach(async f => {
            let img = await loadImage(`./public/assets/${f}`)
            this.images[f.split(".")[0]] = img
        })
    }

    getImage(name: string) {
        let v = this.images[name.split(".")[0]]
        if(!v) return null
        else return v;
    }

    setErrorHandlers() {
        this.server.setErrorHandler((error, request, reply) => {
            console.log(error)
        })
    }

}