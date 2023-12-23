import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import * as F from "fastify";
import { readdirSync } from 'node:fs';
import { Image, loadImage } from '@napi-rs/canvas';
import { ZodError } from "zod";

export type T = F.FastifyInstance
export type ImageCollection = Record<string, Image>

export class Auxiliar {
    server: T
    images: ImageCollection = {};
    constructor(server: T) {
        this.server = server
    }

    noop(r: any = null) {
        return r
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

    async setSwagger() {
        await this.server.register(require("@fastify/swagger"), {
            openapi: {
              info: {
                title: "Moonlight API",
                description: "The next version of APY.",
                version: '1.0.0',
              },
              servers: [],
            },
            tags: [{ name: "JSON", description: "JSON-related endpoints" }, { name: "Image", description: "Image-related endpoints" }],
            
            transform: jsonSchemaTransform
        })
        await this.server.register(require("@fastify/swagger-ui"), {
            routePrefix: '/docs'
          })
    }

    setErrorHandlers() {
        this.server.setErrorHandler((error, request, reply) => {
            if(!(error instanceof ZodError)) {
                reply.status(error.statusCode!).send({
                    statusCode: error.statusCode,
                    data: error.message,
                    success: false
                })
            } else {
                let [message, path] = [error.errors[0].message, error.errors[0].path[0]]
                reply.status(error.statusCode!).send({
                    statusCode: error.statusCode,
                    data: `There was a validation error (${message}) in parameter: ${path}`,
                    success: false
                })
            }
        })
    }

}