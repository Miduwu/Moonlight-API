import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as F from "fastify";
import fs, { lstatSync } from "node:fs";
import { join } from "node:path";
import { Endpoint } from "../classes/Endpoint";
import { Context } from "../classes/Context";

export default (fastify: F.FastifyInstance, ops: unknown, done: F.DoneFuncWithErrOrRes) => {
    fs.readdirSync("./lib/routes").forEach(folder => {
        if(!lstatSync(join(process.cwd(), "lib", "routes", folder)).isDirectory()) return;
        fs.readdirSync(`./lib/routes/${folder}`).forEach(file => {
            const CLS: typeof Endpoint | undefined = require(join(process.cwd(), `/lib/routes/${folder}/${file}`))?.Route
            if(!CLS) return
            const route = new CLS().assign()
            fastify.withTypeProvider<ZodTypeProvider>().route({
                url: route.options!.path,
                method: route.options!.method,
                schema: route.options!.schema,
                // @ts-ignore
                handler: async(req, res) => await route.handler!(new Context(req, res)),
                // @ts-ignore
                preHandler: route.preHandler ? async(req, res) => await route.preHandler!(new Context(req, res)): undefined
            })
        })
    })
    done()
}