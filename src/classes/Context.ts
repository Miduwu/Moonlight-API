import * as F from "fastify";

export type ContextSendOptions = { status?: number, type?: string, success?: boolean }
export type Param = { name?: string, value?: any }

export class Context {
    req: F.FastifyRequest;
    res: F.FastifyReply
    param: Param = {};
    constructor(req: F.FastifyRequest, res: F.FastifyReply) {
        this.req = req
        this.res = res
    }

    getParam<R = string>(param: string, defaultValue: any = null): R {
        let v = (this.req.query as Record<string, string>)[param] || defaultValue
        this.param = { name: param, value: v }
        return v
    }

    send(payload: unknown, options?: ContextSendOptions) {
        let type = options?.type || "application/json"
        if(type == "application/json") return this.res.type(type).status(options?.status || 200).send({ statusCode: options?.status || 200, data: payload, success: options?.success ?? true })
        else return this.res.type(type).status(options?.status || 200).send(payload)
    }

    redirect(url: string, status: number = 200) {
        return this.res.redirect(status, url)
    }
}