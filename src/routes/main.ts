import * as F from "fastify";
import fs, { lstatSync } from "node:fs";
import { join } from "node:path";
import { Endpoint } from "../classes/Endpoint";
import { Context } from "../classes/Context";
import { aux } from "../main";
import { StringOptions, NumberOptions } from "../classes/Parser";

export default (fastify: F.FastifyInstance, ops: unknown, done: F.DoneFuncWithErrOrRes) => {
    fs.readdirSync("./lib/routes").forEach(folder => {
        if(!lstatSync(join(process.cwd(), "lib", "routes", folder)).isDirectory()) return;
        fs.readdirSync(`./lib/routes/${folder}`).forEach(file => {
            const CLS: typeof Endpoint | undefined = require(join(process.cwd(), `/lib/routes/${folder}/${file}`))?.Route
            if(!CLS) return
            const route = new CLS().assign()
            console.log(10)
            fastify.route({
                url: route.options!.path,
                method: route.options!.method,
                schema: route.options!.schema,
                // @ts-ignore
                handler: async(req, res) => await route.handler!(new Context(req, res)),
                preHandler: async (req, res, donePre) => {
                    console.log(0)
                    if(route.options?.query) {
                        for(const key of Object.keys(route.options.query)) {
                            let v = (req.query as Record<string, string>)[key]
                            const options = route.options.query[key]
                            if(!v && options.required) throw new Error(`Missing query parameter "${key}"`)
                            if(!v && options.default) v = options.default
                            let parsed;
                            if(options.type.schema == "NUMBER") parsed = aux.parser.NUMBER(key, v, options.type.options as NumberOptions)
                            else if(options.type.schema == "BOOLEAN") parsed = aux.parser.BOOLEAN(key, v)
                            else if(options.type.schema == "LITERAL") parsed = aux.parser.LITERAL(key, v, ...(options.type.options as string[]))
                            else parsed = aux.parser.STRING(key, v, options.type.options as StringOptions);
                            (req.query as Record<string, any>)[key] = parsed
                        }
                    }
                    console.log(1)
                    donePre()
                }
            })
        })
    })
    done()
}